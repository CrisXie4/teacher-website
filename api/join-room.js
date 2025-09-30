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

    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: '只支持POST请求'
        });
    }

    try {
        const { roomCode } = req.body;
        const viewerId = Date.now().toString() + Math.random().toString(36).substr(2, 5);

        if (!roomCode || !/^\d{6}$/.test(roomCode)) {
            return res.status(400).json({
                success: false,
                message: '无效的房间码'
            });
        }

        // 检查房间是否存在且处于活跃状态
        const room = await roomDB.getRoom(roomCode);
        if (!room || room.status !== 'active') {
            return res.status(404).json({
                success: false,
                message: '房间不存在或已关闭'
            });
        }

        // 更新观看者数量
        await roomDB.updateViewerCount(roomCode, (room.viewer_count || 0) + 1);

        res.json({
            success: true,
            viewerId: viewerId,
            roomCode: roomCode,
            message: '成功加入房间'
        });
    } catch (error) {
        console.error('加入房间失败:', error);
        res.status(500).json({
            success: false,
            message: '加入房间失败: ' + error.message
        });
    }
};