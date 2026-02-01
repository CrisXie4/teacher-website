// Supabase 配置模块
const { createClient } = require('@supabase/supabase-js');

// 从环境变量读取 Supabase 配置
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;
let connectionStatus = 'disconnected'; // disconnected, connecting, connected, error
let lastConnectionAttempt = null;
let connectionRetryCount = 0;
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000; // 2秒

// 连接状态监听器
const connectionListeners = [];

// 环境变量验证
function validateEnvironmentVariables() {
    const errors = [];

    if (!supabaseUrl) {
        errors.push('SUPABASE_URL 环境变量未设置');
    } else if (!isValidUrl(supabaseUrl)) {
        errors.push('SUPABASE_URL 格式无效');
    }

    if (!supabaseKey) {
        errors.push('SUPABASE_ANON_KEY 环境变量未设置');
    } else if (supabaseKey.length < 32) {
        errors.push('SUPABASE_ANON_KEY 长度不足，可能无效');
    }

    return errors;
}

// URL格式验证
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// 触发连接状态变化事件
function notifyConnectionStatusChange(status, error = null) {
    connectionStatus = status;
    connectionListeners.forEach(listener => {
        try {
            listener(status, error);
        } catch (e) {
            console.error('连接状态监听器执行失败:', e);
        }
    });
}

// 添加连接状态监听器
function addConnectionListener(callback) {
    if (typeof callback === 'function') {
        connectionListeners.push(callback);
    }
}

// 移除连接状态监听器
function removeConnectionListener(callback) {
    const index = connectionListeners.indexOf(callback);
    if (index > -1) {
        connectionListeners.splice(index, 1);
    }
}

// 延迟函数
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 初始化 Supabase 客户端（带重试机制）
async function initializeSupabase(retryCount = 0) {
    // 验证环境变量
    const validationErrors = validateEnvironmentVariables();
    if (validationErrors.length > 0) {
        console.log('Supabase 配置验证失败:', validationErrors.join(', '));
        console.log('使用内存存储模式');
        notifyConnectionStatusChange('disconnected', new Error('配置验证失败'));
        return null;
    }

    try {
        notifyConnectionStatusChange('connecting');
        lastConnectionAttempt = new Date();

        supabase = createClient(supabaseUrl, supabaseKey, {
            auth: {
                persistSession: false // 服务端不需要持久化会话
            },
            realtime: {
                params: {
                    eventsPerSecond: 10 // 限制实时事件频率
                }
            }
        });

        // 测试连接
        const { data, error } = await supabase
            .from('rooms')
            .select('count')
            .limit(1);

        if (error && error.code !== 'PGRST116') { // PGRST116 是表不存在的错误，可以忽略
            throw error;
        }

        console.log('Supabase 客户端初始化成功');
        connectionRetryCount = 0;
        notifyConnectionStatusChange('connected');
        return supabase;

    } catch (error) {
        console.error('Supabase 客户端初始化失败:', error);

        // 如果还有重试次数，则进行重试
        if (retryCount < MAX_RETRY_ATTEMPTS) {
            connectionRetryCount = retryCount + 1;
            console.log(`${RETRY_DELAY / 1000}秒后进行第${connectionRetryCount}次重连尝试...`);

            await delay(RETRY_DELAY * Math.pow(2, retryCount)); // 指数退避
            return await initializeSupabase(retryCount + 1);
        } else {
            console.log('达到最大重试次数，切换到内存存储模式');
            notifyConnectionStatusChange('error', error);
            return null;
        }
    }
}

// 检查连接状态
async function checkConnection() {
    if (!supabase) {
        return false;
    }

    try {
        const { error } = await supabase
            .from('rooms')
            .select('count')
            .limit(1);

        if (error && error.code !== 'PGRST116') {
            throw error;
        }

        if (connectionStatus !== 'connected') {
            notifyConnectionStatusChange('connected');
        }
        return true;
    } catch (error) {
        console.error('连接检查失败:', error);
        if (connectionStatus !== 'error') {
            notifyConnectionStatusChange('error', error);
        }
        return false;
    }
}

// 自动重连
async function attemptReconnection() {
    if (connectionStatus === 'connecting') {
        return; // 已在连接中
    }

    console.log('尝试重新连接到 Supabase...');
    supabase = await initializeSupabase();
    return supabase !== null;
}

// 房间数据库操作
class RoomDatabase {
    constructor() {
        this.supabase = null;
        this.memoryRooms = new Map(); // 备用内存存储
        this.operationQueue = []; // 操作队列，用于离线时缓存操作
        this.isInitialized = false;
        this.init();
    }

    // 初始化数据库连接
    async init() {
        this.supabase = await initializeSupabase();
        this.isInitialized = true;

        // 如果连接成功，处理队列中的操作
        if (this.supabase) {
            await this.processQueuedOperations();
        }

        // 监听连接状态变化
        addConnectionListener((status, error) => {
            if (status === 'connected' && this.supabase) {
                this.processQueuedOperations();
            }
        });
    }

    // 处理队列中的操作
    async processQueuedOperations() {
        if (this.operationQueue.length === 0) {
            return;
        }

        console.log(`处理${this.operationQueue.length}个队列操作...`);
        const operations = [...this.operationQueue];
        this.operationQueue = [];

        for (const operation of operations) {
            try {
                await this.executeQueuedOperation(operation);
            } catch (error) {
                console.error('执行队列操作失败:', error);
                // 重新加入队列
                this.operationQueue.push(operation);
            }
        }
    }

    // 执行队列中的操作
    async executeQueuedOperation(operation) {
        switch (operation.type) {
            case 'create':
                return await this.createRoom(operation.roomCode, operation.teacherId);
            case 'updateViewerCount':
                return await this.updateViewerCount(operation.roomCode, operation.viewerCount);
            case 'close':
                return await this.closeRoom(operation.roomCode);
            default:
                console.warn('未知的队列操作类型:', operation.type);
        }
    }

    // 添加操作到队列
    queueOperation(operation) {
        this.operationQueue.push({
            ...operation,
            timestamp: new Date().toISOString()
        });
    }

    // 带重试的数据库操作
    async executeWithRetry(operation, maxRetries = 2) {
        let lastError = null;

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                // 检查连接状态
                if (this.supabase && !(await checkConnection())) {
                    // 尝试重连
                    await attemptReconnection();
                }

                if (!this.supabase) {
                    throw new Error('数据库连接不可用');
                }

                return await operation();
            } catch (error) {
                lastError = error;
                console.error(`数据库操作失败 (尝试 ${attempt + 1}/${maxRetries + 1}):`, error);

                if (attempt < maxRetries) {
                    // 等待后重试
                    await delay(1000 * Math.pow(2, attempt));
                }
            }
        }

        throw lastError;
    }

    // 创建房间记录
    async createRoom(roomCode, teacherId) {
        const roomData = {
            room_code: roomCode,
            teacher_id: teacherId,
            created_at: new Date().toISOString(),
            status: 'active',
            viewer_count: 0
        };

        try {
            const result = await this.executeWithRetry(async () => {
                const { data, error } = await this.supabase
                    .from('rooms')
                    .insert(roomData)
                    .select();

                if (error) {
                    throw error;
                }

                return data[0];
            });

            console.log('房间记录已保存到数据库:', result);
            // 同时保存到内存作为备份
            this.memoryRooms.set(roomCode, result);
            return result;

        } catch (error) {
            console.error('创建房间记录失败:', error);

            // 降级到内存存储
            this.memoryRooms.set(roomCode, roomData);

            // 如果是网络错误，加入队列稍后重试
            if (this.isNetworkError(error)) {
                this.queueOperation({
                    type: 'create',
                    roomCode,
                    teacherId
                });
            }

            return roomData;
        }
    }

    // 获取房间信息
    async getRoom(roomCode) {
        try {
            const result = await this.executeWithRetry(async () => {
                const { data, error } = await this.supabase
                    .from('rooms')
                    .select('*')
                    .eq('room_code', roomCode)
                    .eq('status', 'active')
                    .single();

                if (error) {
                    throw error;
                }

                return data;
            });

            // 更新内存缓存
            if (result) {
                this.memoryRooms.set(roomCode, result);
            }

            return result;

        } catch (error) {
            console.error('获取房间信息失败:', error);
            // 降级到内存存储
            return this.memoryRooms.get(roomCode);
        }
    }

    // 更新观看者数量
    async updateViewerCount(roomCode, viewerCount) {
        try {
            await this.executeWithRetry(async () => {
                const { error } = await this.supabase
                    .from('rooms')
                    .update({
                        viewer_count: viewerCount,
                        last_updated: new Date().toISOString()
                    })
                    .eq('room_code', roomCode);

                if (error) {
                    throw error;
                }
            });

            // 更新内存存储
            const room = this.memoryRooms.get(roomCode);
            if (room) {
                room.viewer_count = viewerCount;
                room.last_updated = new Date().toISOString();
            }

        } catch (error) {
            console.error('更新观看者数量失败:', error);

            // 更新内存存储
            const room = this.memoryRooms.get(roomCode);
            if (room) {
                room.viewer_count = viewerCount;
                room.last_updated = new Date().toISOString();
            }

            // 如果是网络错误，加入队列稍后重试
            if (this.isNetworkError(error)) {
                this.queueOperation({
                    type: 'updateViewerCount',
                    roomCode,
                    viewerCount
                });
            }
        }
    }

    // 关闭房间
    async closeRoom(roomCode) {
        try {
            await this.executeWithRetry(async () => {
                const { error } = await this.supabase
                    .from('rooms')
                    .update({
                        status: 'closed',
                        closed_at: new Date().toISOString()
                    })
                    .eq('room_code', roomCode);

                if (error) {
                    throw error;
                }
            });

            // 从内存删除
            this.memoryRooms.delete(roomCode);

        } catch (error) {
            console.error('关闭房间失败:', error);

            // 从内存删除
            this.memoryRooms.delete(roomCode);

            // 如果是网络错误，加入队列稍后重试
            if (this.isNetworkError(error)) {
                this.queueOperation({
                    type: 'close',
                    roomCode
                });
            }
        }
    }

    // 判断是否为网络错误
    isNetworkError(error) {
        if (!error) return false;

        const networkErrorCodes = [
            'NETWORK_ERROR',
            'TIMEOUT',
            'CONNECTION_ERROR',
            'ECONNREFUSED',
            'ENOTFOUND',
            'ETIMEDOUT'
        ];

        return networkErrorCodes.some(code =>
            error.code === code ||
            error.message?.includes(code.toLowerCase()) ||
            error.name?.includes('NetworkError')
        );
    }

    // 清理过期房间
    async cleanupExpiredRooms() {
        const maxDuration = parseInt(process.env.MAX_ROOM_DURATION_HOURS || '2') * 60 * 60 * 1000;
        const expireTime = new Date(Date.now() - maxDuration).toISOString();

        if (this.supabase) {
            try {
                await this.executeWithRetry(async () => {
                    const { error } = await this.supabase
                        .from('rooms')
                        .update({ status: 'expired' })
                        .eq('status', 'active')
                        .lt('created_at', expireTime);

                    if (error) {
                        throw error;
                    }
                });
            } catch (error) {
                console.error('清理过期房间失败:', error);
            }
        }

        // 清理内存中的过期房间
        const now = Date.now();
        for (const [roomCode, room] of this.memoryRooms.entries()) {
            if (new Date(room.created_at).getTime() + maxDuration < now) {
                this.memoryRooms.delete(roomCode);
                console.log(`清理过期内存房间: ${roomCode}`);
            }
        }
    }

    // 获取房间统计信息
    async getRoomStats() {
        try {
            const result = await this.executeWithRetry(async () => {
                const { data, error } = await this.supabase
                    .from('rooms')
                    .select('status, viewer_count')
                    .eq('status', 'active');

                if (error) {
                    throw error;
                }

                const activeRooms = data.length;
                const totalViewers = data.reduce((sum, room) => sum + (room.viewer_count || 0), 0);

                return { activeRooms, totalViewers };
            });

            return result;

        } catch (error) {
            console.error('获取房间统计失败:', error);
            return this.getMemoryStats();
        }
    }

    // 获取内存统计
    getMemoryStats() {
        const activeRooms = this.memoryRooms.size;
        const totalViewers = Array.from(this.memoryRooms.values())
            .reduce((sum, room) => sum + (room.viewer_count || 0), 0);

        return { activeRooms, totalViewers };
    }

    // 获取连接状态
    getConnectionStatus() {
        return {
            status: connectionStatus,
            lastAttempt: lastConnectionAttempt,
            retryCount: connectionRetryCount,
            hasSupabase: !!this.supabase,
            queuedOperations: this.operationQueue.length,
            memoryRooms: this.memoryRooms.size
        };
    }
}

module.exports = {
    RoomDatabase,
    supabase: () => supabase,
    getConnectionStatus: () => connectionStatus,
    addConnectionListener,
    removeConnectionListener,
    checkConnection,
    attemptReconnection,
    initializeSupabase
};