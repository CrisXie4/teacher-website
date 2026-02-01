// 本地数据存储模块
const fs = require('fs');
const path = require('path');

class LocalStorage {
    constructor() {
        this.dataDir = path.join(__dirname, 'data');
        this.roomsFile = path.join(this.dataDir, 'rooms.json');
        this.ensureDataDir();
        this.rooms = this.loadRooms();
    }

    // 确保数据目录存在
    ensureDataDir() {
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }
    }

    // 加载房间数据
    loadRooms() {
        try {
            if (fs.existsSync(this.roomsFile)) {
                const data = fs.readFileSync(this.roomsFile, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('加载房间数据失败:', error);
        }
        return {};
    }

    // 保存房间数据
    saveRooms() {
        try {
            fs.writeFileSync(this.roomsFile, JSON.stringify(this.rooms, null, 2));
        } catch (error) {
            console.error('保存房间数据失败:', error);
        }
    }

    // 创建房间
    createRoom(roomCode, teacherId) {
        this.rooms[roomCode] = {
            room_code: roomCode,
            teacher_id: teacherId,
            created_at: new Date().toISOString(),
            status: 'active',
            viewer_count: 0
        };
        this.saveRooms();
        return this.rooms[roomCode];
    }

    // 获取房间
    getRoom(roomCode) {
        return this.rooms[roomCode] || null;
    }

    // 更新观看者数量
    updateViewerCount(roomCode, count) {
        if (this.rooms[roomCode]) {
            this.rooms[roomCode].viewer_count = count;
            this.rooms[roomCode].last_updated = new Date().toISOString();
            this.saveRooms();
        }
    }

    // 关闭房间
    closeRoom(roomCode) {
        if (this.rooms[roomCode]) {
            this.rooms[roomCode].status = 'closed';
            this.rooms[roomCode].closed_at = new Date().toISOString();
            this.saveRooms();
        }
    }

    // 获取房间统计
    getRoomStats() {
        const activeRooms = Object.values(this.rooms).filter(room => room.status === 'active');
        const totalViewers = activeRooms.reduce((sum, room) => sum + (room.viewer_count || 0), 0);

        return {
            activeRooms: activeRooms.length,
            totalViewers: totalViewers
        };
    }

    // 清理过期房间
    cleanupExpiredRooms() {
        const maxDuration = parseInt(process.env.MAX_ROOM_DURATION_HOURS || '2') * 60 * 60 * 1000;
        const expireTime = Date.now() - maxDuration;

        let cleaned = 0;
        for (const [roomCode, room] of Object.entries(this.rooms)) {
            if (room.status === 'active' && new Date(room.created_at).getTime() < expireTime) {
                room.status = 'expired';
                cleaned++;
            }
        }

        if (cleaned > 0) {
            this.saveRooms();
            console.log(`清理了${cleaned}个过期房间`);
        }
    }
}

module.exports = { LocalStorage };