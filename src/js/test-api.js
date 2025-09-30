const http = require('http');

// 测试 API 状态端点
function testApiStatus() {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/status',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                console.log('✅ API 状态测试成功');
                console.log('响应数据:', JSON.stringify(response, null, 2));

                // 验证响应结构
                if (response.status === 'running' &&
                    typeof response.connectedClients === 'number' &&
                    typeof response.activeRooms === 'number') {
                    console.log('✅ API 响应结构正确');
                } else {
                    console.log('❌ API 响应结构不正确');
                }
            } catch (error) {
                console.log('❌ JSON 解析失败:', error.message);
            }
        });
    });

    req.on('error', (error) => {
        console.log('❌ API 请求失败:', error.message);
    });

    req.end();
}

// 延迟测试，让服务器先启动
setTimeout(testApiStatus, 2000);

console.log('开始测试 API 状态端点...');