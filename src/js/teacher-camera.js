// DOM元素
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const statusMessage = document.getElementById('statusMessage');
const startCameraButton = document.getElementById('startCameraButton');
const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const createRoomButton = document.getElementById('createRoomButton');
const roomCodeDisplay = document.getElementById('roomCodeDisplay');
const languageSwitcher = document.getElementById('languageSwitcher');
const themeSwitcher = document.getElementById('themeSwitcher');

// 媒体流变量
let localStream = null;
let peerConnections = new Map(); // 支持多个观看者连接

// WebSocket连接
let socket = null;
let clientId = null;
let currentRoomCode = null;

// 多语言支持
const languages = {
    zh: {
        title: "教师摄像头",
        local_video: "本地摄像头画面",
        remote_video: "远程投屏画面",
        not_connected: "未连接到服务器",
        connected: "已连接到服务器",
        connecting: "正在连接服务器...",
        disconnected: "与服务器断开连接",
        start_camera: "启动摄像头",
        create_room: "创建房间",
        connect_screen: "连接并开始投屏",
        disconnect: "断开连接",
        camera_started: "摄像头已启动",
        camera_error: "无法访问摄像头:",
        offer_error: "创建offer失败:",
        answer_error: "创建answer失败:",
        connection_success: "连接成功",
        connection_error: "连接失败:",
        room_created: "房间已创建，房间码:",
        room_error: "创建房间失败",
        viewer_joined: "有观看者加入了房间",
        room_closed: "房间已关闭",
        theme_light: "日间模式",
        theme_dark: "黑夜模式"
    },
    en: {
        title: "Teacher Camera",
        local_video: "Local Camera View",
        remote_video: "Remote Screen View",
        not_connected: "Not connected to server",
        connected: "Connected to server",
        connecting: "Connecting to server...",
        disconnected: "Disconnected from server",
        start_camera: "Start Camera",
        create_room: "Create Room",
        connect_screen: "Connect and Start Screen Sharing",
        disconnect: "Disconnect",
        camera_started: "Camera started",
        camera_error: "Cannot access camera:",
        offer_error: "Failed to create offer:",
        answer_error: "Failed to create answer:",
        connection_success: "Connection successful",
        connection_error: "Connection failed:",
        room_created: "Room created, room code:",
        room_error: "Failed to create room",
        viewer_joined: "A viewer joined the room",
        room_closed: "Room closed",
        theme_light: "Light Mode",
        theme_dark: "Dark Mode"
    }
};

let currentLanguage = 'zh';

// 语言切换
function switchLanguage() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    applyLanguage();
    localStorage.setItem('preferredLanguage', currentLanguage);
}

// 应用语言
function applyLanguage() {
    const lang = languages[currentLanguage];

    // 更新按钮文本
    startCameraButton.textContent = lang.start_camera;
    if (createRoomButton) createRoomButton.textContent = lang.create_room;
    connectButton.textContent = lang.connect_screen;
    disconnectButton.textContent = lang.disconnect;

    // 更新语言切换按钮
    languageSwitcher.textContent = currentLanguage === 'zh' ? 'English' : '中文';

    // 更新主题切换按钮
    if (document.body.classList.contains('dark-mode')) {
        themeSwitcher.textContent = lang.theme_light;
    } else {
        themeSwitcher.textContent = lang.theme_dark;
    }
}

// 主题切换
function toggleTheme() {
    document.body.classList.toggle('dark-mode');

    // 更新主题切换按钮文本
    const lang = languages[currentLanguage];
    if (document.body.classList.contains('dark-mode')) {
        themeSwitcher.textContent = lang.theme_light;
        localStorage.setItem('theme', 'dark');
    } else {
        themeSwitcher.textContent = lang.theme_dark;
        localStorage.setItem('theme', 'light');
    }
}

// 更新状态消息
function updateStatus(message, isConnected = false) {
    statusMessage.textContent = message;
    statusMessage.className = 'status ' + (isConnected ? 'connected' : 'disconnected');
}

// 连接到WebSocket服务器
function connectToServer() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const urlParams = new URLSearchParams(window.location.search);
    const override = urlParams.get('ws') || urlParams.get('wsUrl') || urlParams.get('server') || localStorage.getItem('teacher_toolkit_ws');

    let wsUrl;
    if (override && typeof override === 'string') {
        wsUrl = override.trim();
        if (wsUrl.startsWith('http://')) wsUrl = 'ws://' + wsUrl.slice('http://'.length);
        if (wsUrl.startsWith('https://')) wsUrl = 'wss://' + wsUrl.slice('https://'.length);
        if (wsUrl.startsWith('//')) wsUrl = protocol + wsUrl;
        if (!wsUrl.startsWith('ws://') && !wsUrl.startsWith('wss://')) {
            wsUrl = `${protocol}//${wsUrl}`;
        }
        localStorage.setItem('teacher_toolkit_ws', wsUrl);
    } else {
        wsUrl = `${protocol}//${window.location.host}`;
    }

    console.log('尝试连接到:', wsUrl);
    updateStatus(languages[currentLanguage].connecting, false);

    socket = new WebSocket(wsUrl);

    socket.onopen = () => {
        updateStatus(languages[currentLanguage].connected, true);
        console.log('WebSocket连接已建立');
    };

    socket.onmessage = (event) => {
        handleWebSocketMessage(JSON.parse(event.data));
    };

    socket.onclose = () => {
        updateStatus(languages[currentLanguage].disconnected, false);
        console.log('WebSocket连接已断开');
        socket = null;

        // 如果不是主动断开，尝试重连
        if (clientId && currentRoomCode) {
            console.log('尝试重新连接...');
            setTimeout(connectToServer, 3000);
        }
    };

    socket.onerror = (error) => {
        console.error('WebSocket错误:', error);
        updateStatus(languages[currentLanguage].connection_error + ' 连接服务器失败', false);

        // 如果连接失败，提供本地测试提示
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            updateStatus('无法连接到服务器，请检查服务器是否运行', false);
        }
    };
}

// 处理WebSocket消息
function handleWebSocketMessage(data) {
    console.log('收到WebSocket消息:', data);

    switch (data.type) {
        case 'connection':
            clientId = data.id;
            console.log('获得客户端ID:', clientId);
            break;

        case 'room-created':
            currentRoomCode = data.roomCode;
            if (roomCodeDisplay) {
                roomCodeDisplay.textContent = `房间码: ${currentRoomCode}`;
                roomCodeDisplay.style.display = 'block';
            }
            updateStatus(languages[currentLanguage].room_created + ' ' + currentRoomCode, true);

            // 更新按钮状态
            if (createRoomButton) createRoomButton.disabled = true;
            disconnectButton.disabled = false;
            break;

        case 'viewer-joined':
            console.log('观看者加入:', data.viewerId);
            updateStatus(languages[currentLanguage].viewer_joined, true);

            // 为新观看者创建PeerConnection
            createPeerConnectionForViewer(data.viewerId);
            break;

        case 'answer':
            // 处理观看者的answer
            if (data.from && peerConnections.has(data.from)) {
                const pc = peerConnections.get(data.from);
                pc.setRemoteDescription(new RTCSessionDescription(data));
            }
            break;

        case 'ice-candidate':
            // 处理ICE候选
            if (data.from && peerConnections.has(data.from)) {
                const pc = peerConnections.get(data.from);
                pc.addIceCandidate(new RTCIceCandidate(data.candidate));
            }
            break;

        case 'error':
            console.error('服务器错误:', data.message);
            updateStatus(languages[currentLanguage].connection_error + ' ' + data.message, false);
            break;
    }
}

// 启动本地摄像头
async function startCamera() {
    try {
        // 获取摄像头权限
        localStream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'environment' // 后置摄像头
            },
            audio: true
        });

        // 显示本地视频流
        localVideo.srcObject = localStream;

        // 更新UI状态
        startCameraButton.disabled = true;
        if (createRoomButton) createRoomButton.disabled = false;
        updateStatus(languages[currentLanguage].camera_started, false);

        console.log("摄像头已启动");
    } catch (error) {
        console.error("无法访问摄像头:", error);
        updateStatus(languages[currentLanguage].camera_error + " " + error.message, false);
    }
}

// 创建房间
function createRoom() {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        connectToServer();
        // 等待连接建立后再创建房间
        socket.addEventListener('open', () => {
            socket.send(JSON.stringify({ type: 'create-room' }));
        });
    } else {
        socket.send(JSON.stringify({ type: 'create-room' }));
    }
}

// 为观看者创建PeerConnection
async function createPeerConnectionForViewer(viewerId) {
    try {
        const peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        });

        // 添加本地流到连接
        if (localStream) {
            localStream.getTracks().forEach(track => {
                peerConnection.addTrack(track, localStream);
            });
        }

        // 监听ICE候选
        peerConnection.onicecandidate = event => {
            if (event.candidate && socket) {
                socket.send(JSON.stringify({
                    type: 'ice-candidate',
                    candidate: event.candidate,
                    target: viewerId
                }));
            }
        };

        // 监听连接状态变化
        peerConnection.onconnectionstatechange = () => {
            console.log(`与观看者 ${viewerId} 的连接状态:`, peerConnection.connectionState);
            if (peerConnection.connectionState === 'failed') {
                // 重新连接逻辑可以在这里添加
                console.log(`与观看者 ${viewerId} 的连接失败`);
            }
        };

        // 存储PeerConnection
        peerConnections.set(viewerId, peerConnection);

        // 创建并发送offer
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        if (socket) {
            socket.send(JSON.stringify({
                type: 'offer',
                ...offer,
                target: viewerId
            }));
        }

        console.log(`为观看者 ${viewerId} 创建了PeerConnection并发送了offer`);
    } catch (error) {
        console.error(`为观看者 ${viewerId} 创建PeerConnection失败:`, error);
    }
}

// 断开连接
function disconnect() {
    // 关闭所有PeerConnection
    peerConnections.forEach((pc, viewerId) => {
        pc.close();
        console.log(`关闭与观看者 ${viewerId} 的连接`);
    });
    peerConnections.clear();

    // 关闭WebSocket连接
    if (socket) {
        socket.close();
        socket = null;
    }

    // 停止本地流
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }

    // 清除视频源
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;

    // 隐藏房间码
    if (roomCodeDisplay) {
        roomCodeDisplay.style.display = 'none';
    }

    // 重置变量
    currentRoomCode = null;
    clientId = null;

    // 更新UI状态
    startCameraButton.disabled = false;
    if (createRoomButton) createRoomButton.disabled = true;
    connectButton.disabled = true;
    disconnectButton.disabled = true;
    updateStatus(languages[currentLanguage].not_connected, false);

    console.log("所有连接已断开");
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    // 检查是否保存了语言偏好
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }

    // 应用语言设置
    applyLanguage();

    // 检查并应用保存的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const lang = languages[currentLanguage];
        themeSwitcher.textContent = lang.theme_light;
    }

    // 绑定事件监听器
    startCameraButton.addEventListener('click', startCamera);
    if (createRoomButton) createRoomButton.addEventListener('click', createRoom);
    connectButton.addEventListener('click', () => {
        // 保持兼容性的连接功能
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            connectToServer();
        }
    });
    disconnectButton.addEventListener('click', disconnect);
    languageSwitcher.addEventListener('click', switchLanguage);
    themeSwitcher.addEventListener('click', toggleTheme);

    // 自动连接到服务器
    connectToServer();
});
