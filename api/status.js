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
        const stats = await roomDB.getRoomStats();

        res.json({
            status: 'running',
            timestamp: new Date().toISOString(),
            platform: 'vercel',
            activeRooms: stats.activeRooms || 0,
            totalViewers: stats.totalViewers || 0,
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
            message: error.message,
            platform: 'vercel'
        });
    }
};