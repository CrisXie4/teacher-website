# 教师工具箱 🎓

> 一个专为教师设计的轻量级、开箱即用的教学工具集合

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## ✨ 项目简介

教师工具箱是一款纯前端、零依赖的教学辅助工具集，致力于让教师的日常教学更加高效便捷。所有工具均可离线使用，数据完全保存在本地，保护您的隐私。

### 为什么选择教师工具箱？

- **🚀 开箱即用** - 无需安装，打开浏览器即可使用
- **📱 全平台支持** - 手机、平板、电脑均可流畅运行
- **🔒 隐私保护** - 所有数据本地存储，绝不上传云端
- **🎨 界面友好** - 现代化设计，操作简单直观
- **🌍 双语支持** - 中英文无缝切换
- **🌙 护眼模式** - 支持日间/夜间主题切换

## 🛠️ 核心功能

### 📊 课堂管理工具

| 工具 | 功能说明 | 特色 |
|------|----------|------|
| **随机点名器** | 公平随机选择学生回答问题 | 支持导入学生名单，酷炫动画效果 |
| **小组分组器** | 快速将学生随机分组 | 可自定义分组人数，一键生成 |
| **课堂表现记录器** | 记录学生课堂参与情况 | 四级评价系统，数据统计分析 |
| **声音检测器** | 实时监测课堂环境音量 | 可视化音量指示，维持课堂秩序 |

### ⏰ 时间管理工具

| 工具 | 功能说明 | 特色 |
|------|----------|------|
| **课堂计时器** | 管理课堂活动时间 | 支持倒计时，全屏模式，视觉提醒 |
| **全屏时钟** | 大屏显示当前时间 | 8种颜色主题，12/24小时制切换 |

### ✍️ 教学内容生成器

| 工具 | 功能说明 | 特色 |
|------|----------|------|
| **临摹本生成器** | 生成汉字/字母练习字帖 | 60%透明度，多种字体，可打印 |
| **计算题生成器** | 批量生成数学练习题 | 自定义难度，多种运算符，可导出 |
| **图表生成器** | 制作各类统计图表 | 支持柱状图、折线图、饼图等 |

### 🎨 互动与特殊工具

| 工具 | 功能说明 | 特色 |
|------|----------|------|
| **电子白板** | 在线绘制和演示 | 多点触控，多色画笔，橡皮擦 |
| **3D观察物体** | 创建、编辑和观察3D物体 | 支持多角度查看，适合数学几何教学 |
| **元素周期表** | 交互式元素周期表 | 点击查看元素详情，化学教学必备 |

## 🚀 快速开始

### 在线使用

直接访问项目主页，无需任何配置：

```
打开 index.html 即可使用所有功能
```

### 本地部署

**方法一：直接打开**
```bash
# 下载项目
git clone https://github.com/CrisXie4/teacher-website.git

# 用浏览器打开 index.html
```

**方法二：本地服务器**
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

然后访问 `http://localhost:8000`

## 📚 使用指南

### 学生管理系统

所有涉及学生名单的工具（点名器、分组器、表现记录器）共享同一个学生数据库。

**添加学生的三种方式：**

1. **单个添加**
   - 输入学号和姓名
   - 点击"添加学生"

2. **CSV批量导入**
   ```
   格式：学号,姓名
   示例：
   001,张三
   002,李四
   003,王五
   ```

3. **文件导入**
   - 支持 `.json`、`.csv`、`.txt` 格式
   - 自动解析学生信息

### 临摹本生成器

1. 输入要练习的文字
2. 选择字体（楷体、宋体、黑体等）
3. 调整字号和行高
4. 点击"生成临摹本"
5. 打印或保存为PDF

**小提示**：生成的字帖具有60%透明度，方便学生在下方描摹。

### 图表生成器

1. 选择图表类型（柱状图、折线图、饼图等）
2. 输入数据标签和数值
3. 自定义颜色方案
4. 实时预览图表
5. 导出为PNG图片

## 🗂️ 项目结构

```
teacher-website/
├── index.html                      # 主页入口
├── src/
│   ├── css/
│   │   └── styles.css              # 全局样式
│   ├── js/
│   │   └── student-manager.js      # 学生管理核心
│   └── pages/                      # 各功能页面
│       ├── roll-call.html          # 随机点名器
│       ├── grouping.html           # 小组分组器
│       ├── classroom-tracker.html  # 课堂表现记录器
│       ├── timer.html              # 课堂计时器
│       ├── clock.html              # 全屏时钟
│       ├── sound-detector.html     # 声音检测器
│       ├── whiteboard.html         # 电子白板
│       ├── copybook-generator.html # 临摹本生成器
│       ├── math-generator.html     # 计算题生成器
│       ├── chart-generator.html    # 图表生成器
│       ├── 3d-viewer.html          # 3D观察物体
│       ├── periodic-table.html     # 元素周期表
│       └── donation.html           # 打赏支持
├── assets/
│   └── images/                     # 图片资源
├── config/
│   └── manifest.json               # PWA配置
└── README.md                       # 本文件
```

## 🔧 技术栈

- **前端框架**：原生 HTML5 + CSS3 + JavaScript (ES6+)
- **图表库**：Chart.js
- **数据存储**：LocalStorage
- **PWA支持**：Service Worker
- **无第三方依赖**：除图表功能外，其他工具均为纯原生代码

## 🌐 浏览器兼容性

| 浏览器 | 最低版本 | 推荐版本 |
|--------|----------|----------|
| Chrome | 70+ | 最新版 |
| Firefox | 65+ | 最新版 |
| Safari | 12+ | 最新版 |
| Edge | 79+ | 最新版 |

## 📱 PWA 支持

本项目支持PWA（渐进式Web应用），可以安装到桌面使用：

1. 在支持的浏览器中打开网站
2. 点击地址栏右侧的"安装"图标
3. 添加到主屏幕
4. 享受类原生应用的体验

## 🤝 贡献指南

我们欢迎任何形式的贡献！

### 如何贡献

1. **Fork** 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m '✨ Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 **Pull Request**

### 提交规范

建议使用以下前缀：

- `✨ feat:` 新功能
- `🐛 fix:` 修复bug
- `📝 docs:` 文档更新
- `💄 style:` 样式调整
- `♻️ refactor:` 代码重构
- `⚡️ perf:` 性能优化
- `✅ test:` 测试相关
- `🔧 chore:` 构建/工具链相关

## 🗓️ 开发计划

### 近期计划 (v2.0)

- [ ] 📊 成绩统计分析工具
- [ ] 📅 课程表生成器
- [ ] 🎯 作业管理系统
- [ ] 🔔 课堂提醒助手
- [ ] 📤 数据导出功能增强

### 长期规划

- [ ] 🌐 多语言支持（西班牙语、法语等）
- [ ] ☁️ 可选云同步功能
- [ ] 🤖 AI智能推荐
- [ ] 📊 更多图表类型
- [ ] 🎮 课堂互动游戏

## 💡 常见问题

**Q: 数据会丢失吗？**
A: 所有数据保存在浏览器本地存储中。建议定期导出备份，清理浏览器缓存时注意保留网站数据。

**Q: 可以在手机上使用吗？**
A: 完全可以！所有工具都针对移动设备进行了优化。

**Q: 需要联网吗？**
A: 所有工具都可以完全离线使用（图表生成器需要首次加载Chart.js库）。

**Q: 是否收费？**
A: 完全免费开源！如果觉得有用，欢迎打赏支持作者继续开发。

**Q: 可以二次开发吗？**
A: 当然！本项目采用MIT许可证，您可以自由使用、修改和分发。

## 👨‍💻 作者

**Cris Xie** - 初中生开发者

- GitHub: [@CrisXie4](https://github.com/CrisXie4)
- 项目初衷：看到老师们经常需要各种小工具，于是在暑假期间开发了这个项目

## ❤️ 支持项目

如果这个项目对您有帮助，欢迎：

- ⭐ Star 本仓库
- 🐛 提交 Issue 反馈问题
- 💡 提出新功能建议
- 💰 打赏支持（访问打赏页面）
- 📢 推荐给更多老师使用

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源

```
MIT License - 您可以自由地：
✅ 使用 - 商业或个人项目
✅ 修改 - 根据需求定制
✅ 分发 - 分享给他人
✅ 私用 - 作为私有项目
```

## 🙏 致谢

- 感谢所有使用和支持本项目的老师们
- 感谢提出宝贵建议和反馈的用户们
- 感谢开源社区提供的优秀工具和库
- 特别感谢 Chart.js 提供的图表功能

## 📮 联系方式

- **问题反馈**：在 GitHub 提交 [Issue](https://github.com/CrisXie4/teacher-website/issues)
- **功能建议**：在 GitHub 发起 [Discussion](https://github.com/CrisXie4/teacher-website/discussions)
- **在线演示**：访问项目主页体验

---

<div align="center">

**🎓 教师工具箱 - 让教学更简单**

Made with ❤️ by Cris Xie

© 2025 All Rights Reserved

[⭐ Star](https://github.com/CrisXie4/teacher-website) · [🐛 Report Bug](https://github.com/CrisXie4/teacher-website/issues) · [💡 Request Feature](https://github.com/CrisXie4/teacher-website/issues)

</div>
