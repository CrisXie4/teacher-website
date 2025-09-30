# 房间码摄像头连接系统部署指南

## 功能说明

这个系统实现了基于房间码的摄像头直播功能：

1. **教师端** (`teacher-camera.html`):
   - 启动摄像头
   - 创建房间并获得6位数字房间码
   - 向观看者实时传输视频流

2. **观看者端** (`viewer.html`):
   - 输入房间码加入房间
   - 观看教师的摄像头直播

3. **数据存储**:
   - 支持 Supabase 云数据库存储房间信息
   - 如果未配置 Supabase，自动降级到内存存储

## 部署到 Vercel

### 1. 配置 Supabase（可选）

如果你想使用持久化存储，需要先配置 Supabase：

1. 在 [Supabase](https://supabase.com) 创建项目
2. 在项目中创建 `rooms` 表：

```sql
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  room_code VARCHAR(6) UNIQUE NOT NULL,
  teacher_id VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  viewer_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closed_at TIMESTAMP WITH TIME ZONE
);

-- 创建索引以提高查询性能
CREATE INDEX idx_rooms_code_status ON rooms(room_code, status);
CREATE INDEX idx_rooms_created_at ON rooms(created_at);
```

### 2. 部署到 Vercel

1. **方法一：通过 Vercel CLI**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

2. **方法二：通过 GitHub 部署**
   - 将代码推送到 GitHub
   - 在 Vercel 中连接 GitHub 仓库
   - 选择项目进行部署

### 3. 配置环境变量

在 Vercel 后台配置以下环境变量：

**必需的环境变量（如果使用 Supabase）：**
- `SUPABASE_URL`: 你的 Supabase 项目 URL（Project URL）
- `SUPABASE_ANON_KEY`: 你的 Supabase 公开密钥（anon public key / Publishable key）

**可选的环境变量：**
- `MAX_ROOM_DURATION_HOURS`: 房间最大持续时间（默认：2小时）
- `ROOM_CLEANUP_INTERVAL_MINUTES`: 清理过期房间的间隔（默认：30分钟）

### 4. 设置环境变量的步骤

1. 登录 Vercel 控制台
2. 选择你的项目
3. 进入 Settings → Environment Variables
4. 添加以下变量：

```
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_ANON_KEY = your-anon-key-here
MAX_ROOM_DURATION_HOURS = 2
ROOM_CLEANUP_INTERVAL_MINUTES = 30
```

## 本地开发

### 1. 安装依赖
```bash
npm install
```

### 2. 创建环境变量文件
复制 `.env.example` 到 `.env` 并填入你的配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：
```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
MAX_ROOM_DURATION_HOURS=2
ROOM_CLEANUP_INTERVAL_MINUTES=30
```

### 3. 启动开发服务器
```bash
node server.js
```

### 4. 访问应用
- 教师端：`http://localhost:3000/teacher-camera.html`
- 观看者端：`http://localhost:3000/viewer.html`
- 服务器状态：`http://localhost:3000/api/status`

## 系统架构

```
用户端 → WebSocket 连接 → Node.js 服务器 → Supabase 数据库
                        ↓
                    WebRTC P2P 连接
```

### 核心功能流程

1. **创建房间**：
   - 教师启动摄像头
   - 点击"创建房间"
   - 系统生成6位数字房间码
   - 房间信息存储到数据库

2. **加入房间**：
   - 观看者输入房间码
   - 系统验证房间是否存在且有效
   - 建立 WebRTC P2P 连接
   - 开始接收视频流

3. **数据存储**：
   - 主要使用 Supabase 存储房间信息
   - 如果 Supabase 不可用，自动降级到内存存储
   - 定期清理过期房间

## 故障排除

### 1. 摄像头无法启动
- 检查浏览器权限设置
- 确保使用 HTTPS 协议（生产环境）
- 检查设备摄像头是否被其他应用占用

### 2. 房间连接失败
- 检查房间码是否正确（6位数字）
- 确认教师端是否在线
- 检查网络连接状态

### 3. Supabase 连接问题
- 验证环境变量配置
- 检查 Supabase 项目状态
- 查看服务器日志确认错误信息

### 4. WebRTC 连接失败
- 检查防火墙设置
- 确认 STUN 服务器可访问
- 对于企业网络，可能需要配置 TURN 服务器

## 安全注意事项

1. **环境变量保护**：
   - 不要在代码中硬编码敏感信息
   - 使用 Vercel 的环境变量功能

2. **房间访问控制**：
   - 房间码采用随机生成
   - 房间有时效性限制
   - 支持自动清理过期房间

3. **网络安全**：
   - 生产环境使用 HTTPS
   - WebRTC 连接加密
   - 输入验证和错误处理

## 监控和维护

1. **服务器状态监控**：
   - 访问 `/api/status` 端点查看系统状态
   - 监控活跃房间数和用户数

2. **日志分析**：
   - 查看 Vercel 函数日志
   - 监控错误率和性能指标

3. **数据库维护**：
   - 定期清理过期房间记录
   - 监控数据库使用量

## 扩展功能

系统设计支持以下扩展：

1. **用户认证**：可以集成用户登录系统
2. **房间权限**：可以添加房间密码或权限控制
3. **录制功能**：可以添加直播录制功能
4. **多媒体支持**：可以支持屏幕共享、文件传输等
5. **移动端优化**：可以开发原生移动应用

## 技术栈

- **后端**：Node.js + Express + WebSocket
- **前端**：原生 HTML/CSS/JavaScript
- **实时通信**：WebRTC + WebSocket
- **数据库**：Supabase (PostgreSQL)
- **部署**：Vercel
- **依赖**：@supabase/supabase-js, ws, express