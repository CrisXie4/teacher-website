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
└── README.md               # 项目说明文档
```

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