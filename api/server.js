const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const { RoomDatabase } = require('./supabase-config');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 存储连接的客户端和房间
const clients = new Map();
const rooms = new Map(); // 房间存储：房间码 -> {teacher: clientId, viewers: [clientId]}
const roomDB = new RoomDatabase(); // Supabase 数据库实例

// 提供静态文件
app.use(express.static(path.join(__dirname)));

// 生成6位数字房间码
function generateRoomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// 创建房间
async function createRoom(teacherId) {
    let roomCode;
    do {
        roomCode = generateRoomCode();
    } while (rooms.has(roomCode));

    const roomData = {
        teacher: teacherId,
        viewers: [],
        created: Date.now()
    };

    rooms.set(roomCode, roomData);

    // 保存到数据库
    try {
        await roomDB.createRoom(roomCode, teacherId);
    } catch (error) {
        console.error('保存房间到数据库失败:', error);
    }

    return roomCode;
}

// 加入房间
async function joinRoom(roomCode, viewerId) {
    if (rooms.has(roomCode)) {
        const room = rooms.get(roomCode);
        if (!room.viewers.includes(viewerId)) {
            room.viewers.push(viewerId);

            // 更新数据库观看者数量
            try {
                await roomDB.updateViewerCount(roomCode, room.viewers.length);
            } catch (error) {
                console.error('更新观看者数量失败:', error);
            }
        }
        return true;
    }

    // 尝试从数据库加载房间信息
    try {
        const dbRoom = await roomDB.getRoom(roomCode);
        if (dbRoom && dbRoom.status === 'active') {
            // 从数据库恢复房间，但教师必须在线
            const teacherOnline = Array.from(clients.values()).some(client =>
                client.id === dbRoom.teacher_id && client.role === 'teacher'
            );

            if (teacherOnline) {
                rooms.set(roomCode, {
                    teacher: dbRoom.teacher_id,
                    viewers: [viewerId],
                    created: new Date(dbRoom.created_at).getTime()
                });

                await roomDB.updateViewerCount(roomCode, 1);
                return true;
            }
        }
    } catch (error) {
        console.error('从数据库获取房间信息失败:', error);
    }

    return false;
}

// 离开房间
async function leaveRoom(roomCode, clientId) {
    if (rooms.has(roomCode)) {
        const room = rooms.get(roomCode);
        if (room.teacher === clientId) {
            // 教师离开，通知所有观看者并删除房间
            room.viewers.forEach(viewerId => {
                if (clients.has(viewerId)) {
                    clients.get(viewerId).ws.send(JSON.stringify({
                        type: 'room-closed',
                        roomCode: roomCode
                    }));
                }
            });

            // 关闭数据库房间记录
            try {
                await roomDB.closeRoom(roomCode);
            } catch (error) {
                console.error('关闭数据库房间失败:', error);
            }

            rooms.delete(roomCode);
        } else {
            // 观看者离开
            const index = room.viewers.indexOf(clientId);
            if (index > -1) {
                room.viewers.splice(index, 1);

                // 更新数据库观看者数量
                try {
                    await roomDB.updateViewerCount(roomCode, room.viewers.length);
                } catch (error) {
                    console.error('更新观看者数量失败:', error);
                }
            }
        }
    }
}

// WebSocket连接处理
wss.on('connection', (ws) => {
    console.log('客户端已连接');

    // 为每个连接分配唯一ID
    const clientId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    clients.set(clientId, { ws, roomCode: null, id: clientId });

    // 发送ID给客户端
    ws.send(JSON.stringify({
        type: 'connection',
        id: clientId
    }));

    // 处理消息
    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            console.log(`收到消息类型: ${data.type} 来自客户端: ${clientId}`);

            // 根据消息类型处理
            switch (data.type) {
                case 'create-room':
                    // 创建房间（教师端）
                    const roomCode = await createRoom(clientId);
                    clients.get(clientId).roomCode = roomCode;
                    clients.get(clientId).role = 'teacher';

                    ws.send(JSON.stringify({
                        type: 'room-created',
                        roomCode: roomCode
                    }));
                    break;

                case 'join-room':
                    // 加入房间（观看者）
                    const { roomCode: joinRoomCode } = data;
                    if (await joinRoom(joinRoomCode, clientId)) {
                        clients.get(clientId).roomCode = joinRoomCode;
                        clients.get(clientId).role = 'viewer';

                        ws.send(JSON.stringify({
                            type: 'room-joined',
                            roomCode: joinRoomCode
                        }));

                        // 通知教师有新的观看者
                        const room = rooms.get(joinRoomCode);
                        if (room && clients.has(room.teacher)) {
                            clients.get(room.teacher).ws.send(JSON.stringify({
                                type: 'viewer-joined',
                                viewerId: clientId
                            }));
                        }
                    } else {
                        ws.send(JSON.stringify({
                            type: 'error',
                            message: '房间不存在或已关闭'
                        }));
                    }
                    break;

                case 'offer':
                case 'answer':
                case 'ice-candidate':
                    // 转发信令消息
                    const client = clients.get(clientId);
                    if (client && client.roomCode && rooms.has(client.roomCode)) {
                        const room = rooms.get(client.roomCode);

                        if (data.target && clients.has(data.target)) {
                            // 直接发送到指定目标
                            clients.get(data.target).ws.send(message.toString());
                        } else if (client.role === 'teacher') {
                            // 教师发送给所有观看者
                            room.viewers.forEach(viewerId => {
                                if (clients.has(viewerId)) {
                                    const forwardMessage = { ...data, from: clientId };
                                    clients.get(viewerId).ws.send(JSON.stringify(forwardMessage));
                                }
                            });
                        } else if (client.role === 'viewer') {
                            // 观看者发送给教师
                            if (clients.has(room.teacher)) {
                                const forwardMessage = { ...data, from: clientId };
                                clients.get(room.teacher).ws.send(JSON.stringify(forwardMessage));
                            }
                        }
                    }
                    break;

                case 'register-teacher':
                    // 注册为教师端（保持兼容性）
                    clients.get(clientId).role = 'teacher';
                    broadcastTeacherAvailable(clientId);
                    break;

                case 'register-viewer':
                    // 注册为观看端（保持兼容性）
                    clients.get(clientId).role = 'viewer';
                    sendAvailableTeachers(ws);
                    break;

                case 'get-room-stats':
                    // 获取房间统计信息
                    try {
                        const stats = await roomDB.getRoomStats();
                        ws.send(JSON.stringify({
                            type: 'room-stats',
                            stats: stats
                        }));
                    } catch (error) {
                        console.error('获取房间统计失败:', error);
                    }
                    break;
            }
        } catch (error) {
            console.error('处理消息时出错:', error);
            ws.send(JSON.stringify({
                type: 'error',
                message: '消息处理失败'
            }));
        }
    });

    // 处理连接关闭
    ws.on('close', async () => {
        console.log(`客户端 ${clientId} 已断开连接`);

        const client = clients.get(clientId);
        if (client && client.roomCode) {
            await leaveRoom(client.roomCode, clientId);
        }

        // 如果是教师端断开，通知所有观看者（保持兼容性）
        if (client && client.role === 'teacher') {
            broadcastTeacherUnavailable(clientId);
        }

        // 移除客户端
        clients.delete(clientId);
    });
});

// 广播教师可用（保持兼容性）
function broadcastTeacherAvailable(teacherId) {
    const message = JSON.stringify({
        type: 'teacher-available',
        teacherId: teacherId
    });

    for (const [id, client] of clients.entries()) {
        if (client.role === 'viewer') {
            client.ws.send(message);
        }
    }
}

// 广播教师不可用（保持兼容性）
function broadcastTeacherUnavailable(teacherId) {
    const message = JSON.stringify({
        type: 'teacher-unavailable',
        teacherId: teacherId
    });

    for (const [id, client] of clients.entries()) {
        if (client.role === 'viewer') {
            client.ws.send(message);
        }
    }
}

// 发送可用教师列表（保持兼容性）
function sendAvailableTeachers(ws) {
    const teachers = [];

    for (const [id, client] of clients.entries()) {
        if (client.role === 'teacher') {
            teachers.push(id);
        }
    }

    ws.send(JSON.stringify({
        type: 'available-teachers',
        teachers: teachers
    }));
}

// 清理过期房间
async function cleanupExpiredRooms() {
    try {
        await roomDB.cleanupExpiredRooms();

        // 清理内存中的过期房间
        const maxDuration = parseInt(process.env.MAX_ROOM_DURATION_HOURS || '2') * 60 * 60 * 1000;
        const now = Date.now();

        for (const [roomCode, room] of rooms.entries()) {
            if (now - room.created > maxDuration) {
                // 通知房间内的用户
                room.viewers.forEach(viewerId => {
                    if (clients.has(viewerId)) {
                        clients.get(viewerId).ws.send(JSON.stringify({
                            type: 'room-expired',
                            roomCode: roomCode
                        }));
                    }
                });

                if (clients.has(room.teacher)) {
                    clients.get(room.teacher).ws.send(JSON.stringify({
                        type: 'room-expired',
                        roomCode: roomCode
                    }));
                }

                rooms.delete(roomCode);
                console.log(`清理过期房间: ${roomCode}`);
            }
        }
    } catch (error) {
        console.error('清理过期房间失败:', error);
    }
}

// 定期清理过期房间
const cleanupInterval = parseInt(process.env.ROOM_CLEANUP_INTERVAL_MINUTES || '30') * 60 * 1000;
setInterval(cleanupExpiredRooms, cleanupInterval);

// 提供API端点获取服务器状态
app.get('/api/status', async (req, res) => {
    try {
        const stats = await roomDB.getRoomStats();
        const connectedClients = clients.size;

        res.json({
            status: 'running',
            timestamp: new Date().toISOString(),
            connectedClients: connectedClients,
            activeRooms: stats.activeRooms,
            totalViewers: stats.totalViewers,
            environment: {
                supabaseConfigured: !!process.env.SUPABASE_URL,
                maxRoomDuration: process.env.MAX_ROOM_DURATION_HOURS || '2',
                cleanupInterval: process.env.ROOM_CLEANUP_INTERVAL_MINUTES || '30'
            }
        });
    } catch (error) {
        console.error('获取服务器状态失败:', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log(`请在手机上访问 http://[你的电脑IP地址]:${PORT}/teacher-camera.html`);
    console.log(`请在电脑上访问 http://localhost:${PORT}/viewer.html`);
    console.log(`API状态: http://localhost:${PORT}/api/status`);

    // 输出环境变量配置状态
    console.log('环境配置:');
    console.log('- Supabase URL:', process.env.SUPABASE_URL ? '已配置' : '未配置（使用内存存储）');
    console.log('- 最大房间持续时间:', process.env.MAX_ROOM_DURATION_HOURS || '2', '小时');
    console.log('- 清理间隔:', process.env.ROOM_CLEANUP_INTERVAL_MINUTES || '30', '分钟');
});