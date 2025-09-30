# 完整教师工具箱 - 上传文件清单

## 需要上传的文件（按重要性分类）

### 核心服务器文件
```
server.js                    # 主服务器（包含房间码功能）
supabase-config.js          # Supabase 数据库配置
package.json                # 依赖配置
vercel.json                 # Vercel 部署配置
```

### 主要页面文件
```
index.html                  # 主页入口
teacher-camera.html         # 房间码摄像头（教师端）
viewer.html                 # 房间码摄像头（观看者端）
teacher-view.html           # 原有的教师观看页面
```

### JavaScript 文件
```
teacher-camera.js           # 房间码摄像头逻辑
teacher-view.js             # 教师观看页面逻辑
student-manager.js          # 学生管理模块
data-test.js               # 数据测试模块
sw.js                      # Service Worker
```

### 教师工具页面
```
timer.html                  # 计时器工具
whiteboard.html             # 白板工具
roll-call.html              # 点名工具
grouping.html               # 分组工具
classroom-tracker.html      # 课堂追踪
math-generator.html         # 数学题生成器
copybook-generator.html     # 字帖生成器
handwriting-generator.html  # 手写体生成器
sound-detector.html         # 声音检测器
3d-viewer.html             # 3D 查看器
new-features.html          # 新功能页面
donation.html              # 捐赠页面
test-data-sync.html        # 数据同步测试
```

### 样式和资源文件
```
styles.css                  # 主样式文件
manifest.json              # PWA 应用配置
briefcase-192x192.png      # 应用图标 192x192
briefcase-512x512.png      # 应用图标 512x512
basic-alarm-ringtone.mp3   # 闹铃音频文件
1.png                      # 图片资源
2.jpg                      # 图片资源
```

### 可选文档文件
```
README.md                  # 项目说明
LICENSE                    # 许可证
sitemap.xml               # 网站地图
DEPLOYMENT.md             # 部署文档
UPLOAD_GUIDE.md           # 上传指南
```

## 不需要上传的文件
```
node_modules/              # 依赖包（Vercel 会自动安装）
.env                       # 环境变量（在服务器后台配置）
.env.example              # 环境变量示例
test-api.js               # 测试文件
package-lock.json         # 依赖锁定文件（可选）
```

## 上传方式建议

### 方式1：全部上传到 Vercel
1. 将所有需要的文件打包
2. 上传到 GitHub 仓库
3. 在 Vercel 中连接仓库
4. 配置环境变量并部署

### 方式2：分离部署
- **Vercel**：服务器文件（server.js, supabase-config.js 等）
- **静态托管**：所有 HTML/CSS/JS 文件

### 方式3：传统服务器
如果你有支持 Node.js 的服务器，直接上传所有文件

## 访问地址结构

部署后的功能访问地址：
```
https://your-domain.com/                          # 主页
https://your-domain.com/teacher-camera.html       # 房间码摄像头（教师）
https://your-domain.com/viewer.html               # 房间码摄像头（观看者）
https://your-domain.com/timer.html                # 计时器
https://your-domain.com/whiteboard.html           # 白板
https://your-domain.com/roll-call.html            # 点名
https://your-domain.com/grouping.html             # 分组
https://your-domain.com/classroom-tracker.html    # 课堂追踪
https://your-domain.com/math-generator.html       # 数学题生成器
https://your-domain.com/copybook-generator.html   # 字帖生成器
https://your-domain.com/handwriting-generator.html # 手写体生成器
https://your-domain.com/sound-detector.html       # 声音检测器
https://your-domain.com/3d-viewer.html           # 3D 查看器
https://your-domain.com/teacher-view.html         # 教师观看页面
https://your-domain.com/api/status               # 服务器状态API
```

## 环境变量配置

在部署平台设置以下环境变量：
```
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
MAX_ROOM_DURATION_HOURS=2
ROOM_CLEANUP_INTERVAL_MINUTES=30
```