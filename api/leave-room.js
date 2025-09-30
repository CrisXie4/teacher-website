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
        const { roomCode, clientId } = req.body;

        if (!roomCode || !clientId) {
            return res.status(400).json({
                success: false,
                message: '缺少必要参数'
            });
        }

        // 检查房间是否存在
        const room = await roomDB.getRoom(roomCode);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: '房间不存在'
            });
        }

        // 如果是教师离开，关闭房间
        if (room.teacher_id === clientId) {
            await roomDB.closeRoom(roomCode);
        } else {
            // 观看者离开，减少观看者数量
            const newViewerCount = Math.max(0, (room.viewer_count || 1) - 1);
            await roomDB.updateViewerCount(roomCode, newViewerCount);
        }

        res.json({
            success: true,
            message: '已离开房间'
        });
    } catch (error) {
        console.error('离开房间失败:', error);
        res.status(500).json({
            success: false,
            message: '离开房间失败: ' + error.message
        });
    }
};