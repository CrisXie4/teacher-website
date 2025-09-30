# Vercel 部署指南

## 🚀 快速部署到 Vercel

### 1. 准备工作

确保你有：
- GitHub 账户
- Vercel 账户（可以用 GitHub 登录）
- Supabase 项目（可选，用于数据持久化）

### 2. 上传代码到 GitHub

1. 在 GitHub 创建新仓库 `teacher-camera-system`
2. 将 `upload-package` 文件夹中的所有文件上传到仓库

### 3. 在 Vercel 中部署

1. 登录 [Vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 选择你的 GitHub 仓库
4. Vercel 会自动检测这是一个 Node.js 项目

### 4. 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

#### 必需变量（如果使用 Supabase）：
```
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_ANON_KEY = your-anon-public-key
```

#### 可选变量：
```
MAX_ROOM_DURATION_HOURS = 2
ROOM_CLEANUP_INTERVAL_MINUTES = 30
```

### 5. 获取 Supabase 配置信息

1. 登录 [Supabase](https://supabase.com)
2. 进入你的项目
3. 点击左侧菜单 **Settings** → **API**
4. 复制以下信息：
   - **Project URL** → 用作 `SUPABASE_URL`
   - **anon public** key → 用作 `SUPABASE_ANON_KEY`

### 6. 创建 Supabase 数据表

在 Supabase SQL 编辑器中运行：

```sql
-- 创建房间表
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  room_code VARCHAR(6) UNIQUE NOT NULL,
  teacher_id VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  viewer_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closed_at TIMESTAMP WITH TIME ZONE
);

-- 创建索引提高性能
CREATE INDEX idx_rooms_code_status ON rooms(room_code, status);
CREATE INDEX idx_rooms_created_at ON rooms(created_at);

-- 设置 RLS 策略（可选，用于安全）
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- 允许匿名用户读取和插入房间信息
CREATE POLICY "Allow anonymous access" ON rooms
  FOR ALL USING (true);
```

### 7. 部署完成

部署完成后，你的网站会得到一个 URL，例如：
`https://your-project.vercel.app`

访问地址：
- 教师端：`https://your-project.vercel.app/teacher-camera.html`
- 观看者端：`https://your-project.vercel.app/viewer.html`
- 测试页面：`https://your-project.vercel.app/test-local.html`
- API 状态：`https://your-project.vercel.app/api/status`

### 8. 测试部署

1. 访问测试页面验证功能
2. 测试教师端创建房间
3. 测试观看者端加入房间
4. 检查 API 状态端点

### 9. 常见问题

#### Q: WebSocket 连接失败
A: Vercel 的 Serverless Functions 不支持长连接的 WebSocket。推荐使用：
- Railway.app
- Render.com
- 传统 VPS 服务器

#### Q: 房间数据丢失
A: 如果没有配置 Supabase，数据会存储在内存中，重启后丢失。建议配置 Supabase。

#### Q: 摄像头无法访问
A: 确保使用 HTTPS（Vercel 自动提供），HTTP 环境下无法访问摄像头。

### 10. 替代部署方案

如果 Vercel 的 Serverless 限制不满足需求，推荐：

#### Railway.app（推荐）
- 支持长连接 WebSocket
- 简单的环境变量配置
- 自动部署

#### Render.com
- 支持 WebSocket
- 免费套餐可用
- 容器化部署

#### 传统 VPS
- 完全控制
- 上传所有文件到服务器
- 运行 `npm install && node server.js`

### 11. 监控和维护

- 定期检查 API 状态端点
- 监控 Supabase 使用量
- 查看 Vercel 函数日志
- 根据使用情况调整房间清理策略