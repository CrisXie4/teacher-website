# 教师工具箱 (Teacher Toolkit)

专为教师设计的实用工具集合，提供多种教学辅助功能。

## 功能特点 (Features)

### 📚 核心工具
- **声音检测器** - 实时检测环境声音强度，声音越高小球越高
- **随机点名器** - 随机选择学生回答问题，增加课堂互动
- **课堂计时器** - 管理课堂活动时间，提高教学效率
- **小组分组器** - 随机分组学生，便于小组活动
- **电子白板** - 在线绘制和演示，支持多点触控
- **课堂表现记录器** - 记录学生课堂表现，提升教学效果
- **临摹本生成器** - 生成中英文临摹本，支持自定义字体
- **计算题生成器** - 生成自定义计算题，支持多种运算符
- **教材下载器** - 免登录下载国家中小学智慧教育平台电子教材

### 🎨 设计特色
- **响应式设计** - 适配各种设备屏幕尺寸
- **多语言支持** - 中英文双语界面
- **主题切换** - 日间/黑夜模式自由切换
- **现代化UI** - 简洁美观的渐变色彩设计
- **交互体验** - 流畅的动画过渡效果

## 技术栈 (Tech Stack)

- **前端技术**: HTML5, CSS3, JavaScript (ES6+)
- **样式框架**: 原生CSS，无第三方依赖
- **兼容性**: 支持现代主流浏览器
- **存储方式**: localStorage本地数据存储
- **实时通信**: WebRTC, WebSocket (用于摄像头投屏功能)

## 快速开始 (Quick Start)

### 在线访问
直接打开 `index.html` 文件即可使用所有功能。

### 本地部署
```bash
# 克隆仓库
git clone https://github.com/CrisXie4/teacher-website.git

# 进入项目目录
cd teacher-website

# 启动本地服务器 (任选其一)
python -m http.server 8000
# 或
npx serve
# 或使用任何你喜欢的本地服务器
```

## 使用说明 (Usage Guide)

### 字帖生成器优化
- 生成的字帖具有60%左右的透明度，便于学生临摹练习
- 支持中英文字符，可自定义字体、大小和行高
- 提供打印功能，方便制作纸质练习材料

### 学生管理系统
- 支持单个添加、批量导入(CSV)和文件导入(JSON/TXT)
- 数据自动保存到浏览器本地存储
- 可视化统计学生总数和建议分组数

### 多语言切换
- 点击页面顶部"English"按钮可在中英文之间切换
- 所有界面文字均支持双语显示

### 主题模式
- 点击"黑夜模式"/"日间模式"按钮切换主题
- 根据环境光线自动适配视觉效果

## 文件结构 (File Structure)

```
teacher-website/
├── index.html              # 主页
├── styles.css              # 全局样式文件
├── student-manager.js      # 学生管理核心逻辑
├── classroom-tracker.html   # 课堂表现记录器
├── copybook-generator.html # 临摹本生成器
├── donation.html           # 打赏支持页面
├── grouping.html            # 小组分组器
├── handwriting-generator.html # 手写生成器
├── math-generator.html    # 计算题生成器
├── new-features.html      # 新功能介绍
├── roll-call.html          # 随机点名器
├── sound-detector.html     # 声音检测器
├── timer.html              # 课堂计时器
├── whiteboard.html         # 电子白板
├── textbook-downloader.html # 教材下载器
├── server.js              # WebRTC服务器端代码
├── teacher-camera.html    # 教师摄像头页面（手机端）
├── teacher-camera.js      # 教师摄像头控制脚本
├── teacher-view.html      # 教师摄像头查看页面（电脑端）
├── teacher-view.js        # 教师摄像头查看控制脚本
├── start-server.bat       # 启动WebRTC服务器脚本
├── 启动教材下载器.bat        # Windows系统一键启动脚本
├── Jiaocai-Downlaoder-main # 教材下载器原始代码（Python版本）
│   ├── Jiaocai-Downlaoder.py # 教材下载器主程序
│   ├── README.md           # 教材下载器说明文档
│   └── icon.ico            # 程序图标
└── README.md               # 项目说明文档
```

## 教师摄像头投屏功能使用说明

### 准备工作
1. 确保已安装Node.js环境
2. 确保手机和电脑在同一局域网内

### 启动服务
1. 双击运行`start-server.bat`脚本启动服务器
2. 服务器启动后，控制台会显示访问地址

### 使用方法
1. **手机端（教师）**：
   - 在手机浏览器中访问`http://[电脑IP地址]:3000/teacher-camera.html`
   - 点击"开始广播"按钮，允许摄像头访问权限
   - 手机屏幕上会显示摄像头画面

2. **电脑端（观看者）**：
   - 在电脑浏览器中访问`http://localhost:3000/teacher-view.html`
   - 当教师端开始广播后，点击"连接教师摄像头"按钮
   - 电脑屏幕上会显示教师手机摄像头的实时画面

### 注意事项
- 确保手机和电脑在同一局域网内
- 如果连接失败，请检查防火墙设置
- 首次使用时需要允许摄像头访问权限
- 为获得最佳体验，建议使用Chrome或Firefox浏览器

## 教材下载器使用说明

由于网站服务器的安全限制，直接在浏览器中下载教材可能会遇到403 Forbidden错误。为了解决这个问题，我们提供了专用的Python下载工具。

### 运行环境要求
- Python 3.6 或更高版本
- Windows、macOS 或 Linux 操作系统

### Windows系统一键启动（推荐）
对于Windows用户，我们提供了一键启动脚本：
1. 双击运行 `启动教材下载器.bat` 文件
2. 脚本会自动检查Python环境和依赖库，并在需要时自动安装
3. 启动下载器程序

### 手动运行方法
1. 确保您的电脑已安装Python。如果没有，请访问 [python.org](https://www.python.org/downloads/) 下载并安装。
2. 打开命令提示符（CMD）或PowerShell，导航到项目根目录
3. 安装依赖库：
   ```
   pip install -r Jiaocai-Downlaoder-main\requirements.txt
   ```
4. 运行下载器：
   ```
   python Jiaocai-Downlaoder-main\Jiaocai-Downlaoder.py
   ```
5. 在打开的程序窗口中：
   - 复制教材页面的完整URL到输入框
   - 点击"START"按钮
   - 选择保存位置并等待下载完成

### 注意事项
- 如果双击无法运行程序，可以尝试右键点击文件并选择"使用Python运行"
- 首次运行时会自动安装依赖库（requests和ttkbootstrap）
- 如果自动安装失败，请以管理员身份运行命令提示符，然后手动安装：
  ```
  pip install requests ttkbootstrap
  ```
- 下载的教材为PDF格式，保存在您选择的位置

## 特色功能详解

## 特色功能详解

### 🔤 临摹本生成器
- 生成具有60%透明度的字帖，便于临摹练习
- 支持多种中英文字体选择
- 可调节字体大小(20-80px)和行高(1.5-3)
- 提供打印功能，一键生成练习材料

### 👥 小组分组器
- 随机将学生分组成指定人数的小组
- 支持自定义分组人数
- 可视化展示分组结果

### 🎲 随机点名器
- 公平随机选择学生回答问题
- 支持导入学生名单
- 动画效果增强课堂趣味性

### ⏱️ 课堂计时器
- 可设置倒计时时间
- 全屏模式专注计时
- 视觉化时间进度展示

### 📊 课堂表现记录器
- 记录学生课堂参与情况
- 支持优秀、良好、一般、需改进四级评价
- 数据统计分析功能

## 浏览器兼容性

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 开发计划 (Roadmap)

- [ ] 添加更多学科工具
- [ ] 增加数据导出功能
- [ ] 优化移动端体验
- [ ] 添加更多语言支持
- [ ] 增强数据同步功能

## 贡献指南 (Contributing)

欢迎任何形式的贡献！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 作者 (Authors)

**Cris Xie** - *主要开发者* - [CrisXie4](https://github.com/CrisXie4)

## 许可证 (License)

该项目基于 MIT 许可证 - 查看 [LICENSE.md](LICENSE) 文件了解详情

## 致谢 (Acknowledgements)

- 感谢所有使用和支持本项目的教师朋友们
- 特别感谢提出宝贵建议的用户们
- 本项目将持续更新，欢迎关注！

---
© 2025 教师工具箱 - 专为教师设计