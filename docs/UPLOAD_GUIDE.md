# 房间码摄像头系统 - 最小化部署文件清单

## 核心必需文件（7个文件）

### 服务器端
- `server.js` - 主服务器文件
- `supabase-config.js` - 数据库配置
- `package.json` - 依赖配置
- `vercel.json` - 部署配置

### 前端
- `teacher-camera.html` - 教师端页面
- `teacher-camera.js` - 教师端逻辑
- `viewer.html` - 观看者页面

## 上传步骤

### 方法1：通过 Vercel CLI
```bash
# 只上传核心文件
mkdir camera-system
cp server.js camera-system/
cp supabase-config.js camera-system/
cp package.json camera-system/
cp vercel.json camera-system/
cp teacher-camera.html camera-system/
cp teacher-camera.js camera-system/
cp viewer.html camera-system/

cd camera-system
vercel --prod
```

### 方法2：通过 GitHub + Vercel
1. 将这7个文件推送到新的 GitHub 仓库
2. 在 Vercel 中连接该仓库
3. 配置环境变量
4. 部署

### 方法3：通过 FTP/文件管理器
如果你的网站支持 Node.js，可以直接上传这些文件到服务器

## 环境变量配置

在 Vercel 或你的服务器上设置：
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `MAX_ROOM_DURATION_HOURS` (可选)
- `ROOM_CLEANUP_INTERVAL_MINUTES` (可选)

## 访问地址

部署后的访问地址：
- 教师端：`https://your-domain.com/teacher-camera.html`
- 观看者端：`https://your-domain.com/viewer.html`