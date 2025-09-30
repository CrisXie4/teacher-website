const { RoomDatabase } = require('../supabase-config');

const roomDB = new RoomDatabase();

module.exports = async (req, res) => {
    // 设置CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: '只支持GET请求'
        });
    }

    try {
        const { roomCode } = req.query;

        if (!roomCode || !/^\d{6}$/.test(roomCode)) {
            return res.status(400).json({
                success: false,
                message: '无效的房间码'
            });
        }

        const room = await roomDB.getRoom(roomCode);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: '房间不存在'
            });
        }

        if (room.status !== 'active') {
            return res.status(404).json({
                success: false,
                message: '房间已关闭'
            });
        }

        res.json({
            success: true,
            room: {
                roomCode: roomCode,
                viewerCount: room.viewer_count || 0,
                isActive: true,
                created: new Date(room.created_at).getTime()
            }
        });
    } catch (error) {
        console.error('获取房间信息失败:', error);
        res.status(500).json({
            success: false,
            message: '获取房间信息失败: ' + error.message
        });
    }
};