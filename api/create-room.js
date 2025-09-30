const { RoomDatabase } = require('../supabase-config');

const roomDB = new RoomDatabase();

// 生成6位数字房间码
function generateRoomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

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
        const teacherId = Date.now().toString() + Math.random().toString(36).substr(2, 5);

        // 生成唯一房间码
        let roomCode;
        let attempts = 0;
        do {
            roomCode = generateRoomCode();
            attempts++;
            if (attempts > 10) {
                throw new Error('生成房间码失败');
            }
        } while (await roomDB.getRoom(roomCode));

        // 创建房间
        await roomDB.createRoom(roomCode, teacherId);

        const response = {
            success: true,
            roomCode: roomCode,
            teacherId: teacherId,
            message: '房间创建成功'
        };

        res.json(response);
    } catch (error) {
        console.error('创建房间失败:', error);
        res.status(500).json({
            success: false,
            message: '创建房间失败: ' + error.message
        });
    }
};