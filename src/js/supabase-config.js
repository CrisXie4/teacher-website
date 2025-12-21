// Supabase 配置模块
const { createClient } = require('@supabase/supabase-js');

// 从环境变量读取 Supabase 配置
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;

// 初始化 Supabase 客户端
function initializeSupabase() {
    if (!supabaseUrl || !supabaseKey) {
        console.log('Supabase 环境变量未配置，使用内存存储');
        return null;
    }

    try {
        supabase = createClient(supabaseUrl, supabaseKey);
        console.log('Supabase 客户端初始化成功');
        return supabase;
    } catch (error) {
        console.error('Supabase 客户端初始化失败:', error);
        return null;
    }
}

// 房间数据库操作
class RoomDatabase {
    constructor() {
        this.supabase = initializeSupabase();
        this.memoryRooms = new Map(); // 备用内存存储
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

        if (this.supabase) {
            try {
                const { data, error } = await this.supabase
                    .from('rooms')
                    .insert(roomData)
                    .select();

                if (error) {
                    console.error('创建房间记录失败:', error);
                    // 降级到内存存储
                    this.memoryRooms.set(roomCode, roomData);
                    return roomData;
                }

                console.log('房间记录已保存到数据库:', data[0]);
                return data[0];
            } catch (error) {
                console.error('数据库操作失败:', error);
                // 降级到内存存储
                this.memoryRooms.set(roomCode, roomData);
                return roomData;
            }
        } else {
            // 使用内存存储
            this.memoryRooms.set(roomCode, roomData);
            console.log('房间记录已保存到内存:', roomData);
            return roomData;
        }
    }

    // 获取房间信息
    async getRoom(roomCode) {
        if (this.supabase) {
            try {
                const { data, error } = await this.supabase
                    .from('rooms')
                    .select('*')
                    .eq('room_code', roomCode)
                    .eq('status', 'active')
                    .single();

                if (error) {
                    console.error('获取房间信息失败:', error);
                    // 降级到内存存储
                    return this.memoryRooms.get(roomCode);
                }

                return data;
            } catch (error) {
                console.error('数据库查询失败:', error);
                // 降级到内存存储
                return this.memoryRooms.get(roomCode);
            }
        } else {
            // 使用内存存储
            return this.memoryRooms.get(roomCode);
        }
    }

    // 更新观看者数量
    async updateViewerCount(roomCode, viewerCount) {
        if (this.supabase) {
            try {
                const { error } = await this.supabase
                    .from('rooms')
                    .update({ viewer_count: viewerCount })
                    .eq('room_code', roomCode);

                if (error) {
                    console.error('更新观看者数量失败:', error);
                    // 更新内存存储
                    const room = this.memoryRooms.get(roomCode);
                    if (room) {
                        room.viewer_count = viewerCount;
                    }
                }
            } catch (error) {
                console.error('数据库更新失败:', error);
                // 更新内存存储
                const room = this.memoryRooms.get(roomCode);
                if (room) {
                    room.viewer_count = viewerCount;
                }
            }
        } else {
            // 更新内存存储
            const room = this.memoryRooms.get(roomCode);
            if (room) {
                room.viewer_count = viewerCount;
            }
        }
    }

    // 关闭房间
    async closeRoom(roomCode) {
        if (this.supabase) {
            try {
                const { error } = await this.supabase
                    .from('rooms')
                    .update({
                        status: 'closed',
                        closed_at: new Date().toISOString()
                    })
                    .eq('room_code', roomCode);

                if (error) {
                    console.error('关闭房间失败:', error);
                    // 从内存删除
                    this.memoryRooms.delete(roomCode);
                }
            } catch (error) {
                console.error('数据库更新失败:', error);
                // 从内存删除
                this.memoryRooms.delete(roomCode);
            }
        } else {
            // 从内存删除
            this.memoryRooms.delete(roomCode);
        }
    }

    // 清理过期房间
    async cleanupExpiredRooms() {
        const maxDuration = parseInt(process.env.MAX_ROOM_DURATION_HOURS || '2') * 60 * 60 * 1000;
        const expireTime = new Date(Date.now() - maxDuration).toISOString();

        if (this.supabase) {
            try {
                const { error } = await this.supabase
                    .from('rooms')
                    .update({ status: 'expired' })
                    .eq('status', 'active')
                    .lt('created_at', expireTime);

                if (error) {
                    console.error('清理过期房间失败:', error);
                }
            } catch (error) {
                console.error('数据库清理失败:', error);
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
        if (this.supabase) {
            try {
                const { data, error } = await this.supabase
                    .from('rooms')
                    .select('status, viewer_count')
                    .eq('status', 'active');

                if (error) {
                    console.error('获取房间统计失败:', error);
                    return this.getMemoryStats();
                }

                const activeRooms = data.length;
                const totalViewers = data.reduce((sum, room) => sum + (room.viewer_count || 0), 0);

                return { activeRooms, totalViewers };
            } catch (error) {
                console.error('数据库统计失败:', error);
                return this.getMemoryStats();
            }
        } else {
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
}

module.exports = {
    RoomDatabase,
    supabase: () => supabase
};