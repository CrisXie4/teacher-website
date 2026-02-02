'use strict';

(function() {
    const languages = {
        zh: {
            // Common
            back_to_home: '← 返回主页',
            teacher_toolkit: '教师工具箱',
            toolkit_desc: '专为教师设计的实用工具集合',
            site_title: '教师工具箱',
            site_subtitle: '专为教师设计的实用工具集合',
            footer_designed_for_teachers: '© 2025 教师工具箱 - 专为教师设计',
            notice: '提示',
            success: '成功',
            error: '错误',
            confirm: '确定',
            cancel: '取消',
            
            // Home Page (from index.js)
            sound_detector_title: '声音检测器',
            sound_detector_desc: '实时检测环境声音强度，声音越高小球越高',
            roll_call_title: '随机点名器',
            roll_call_desc: '随机选择学生回答问题，增加课堂互动',
            timer_title: '课堂计时器',
            timer_desc: '管理课堂活动时间，提高教学效率',
            clock_title: '全屏时钟',
            clock_desc: '超大显示时钟，支持多种颜色和格式，一键全屏',
            grouping_title: '小组分组器',
            grouping_desc: '随机分组学生，便于小组活动',
            whiteboard_title: '电子白板',
            whiteboard_desc: '在线绘制和演示，支持多点触控',
            tracker_title: '课堂表现记录器',
            tracker_desc: '记录学生课堂表现，提升教学效果',
            copybook_title: '临摹本生成器',
            copybook_desc: '生成中英文临摹本，支持自定义字体',
            math_title: '计算题生成器',
            math_desc: '生成自定义计算题，支持多种运算符',
            '3d_viewer_title': '3D观察物体',
            '3d_viewer_desc': '创建、编辑和观察3D物体，支持多角度查看',
            periodic_table_title: '元素周期表',
            periodic_table_desc: '交互式元素周期表，点击查看元素详情',
            chart_generator_title: '图表生成器',
            chart_generator_desc: '自定义数据、颜色和图表类型，生成专业图表',
            teacher_camera_title: '教师摄像头',
            teacher_camera_desc: '将教师手机摄像头画面投屏到电脑上',
            analytics_title: '流量统计',
            analytics_desc: '查看网站访问趋势与关键指标',
            analytics_open: '打开面板',
            donation_title: '打赏支持',
            donation_desc: '如果您喜欢这些工具，欢迎打赏支持',
            use_now: '立即使用',
            support_now: '前往支持',
            student_management: '学生管理',
            student_id_placeholder: '学号（可选）',
            student_name_placeholder: '学生姓名',
            add_student: '添加学生',
            batch_import_title: '批量导入（CSV格式：学号,姓名）',
            csv_example: '例如：\n2021001,张三\n2021002,李四\n2021003,王五',
            import_csv: '导入CSV',
            file_import_title: '文件导入（支持CSV、TXT、JSON格式）',
            import_file: '导入文件',
            clear_students: '清空学生列表',
            no_students: '暂无学生，请添加学生',
            total_students: '总学生数',
            suggested_groups: '建议分组数',
            manage_students: '管理学生信息',
            feedback: '反馈建议',
            instructions: '使用说明',
            student_management_guide: '学生管理',
            student_management_desc: '点击"管理学生信息"按钮显示学生管理界面，支持单个添加、批量导入和文件导入',
            sound_detector_guide: '声音检测器',
            sound_detector_desc2: '实时检测环境声音强度，声音越高小球越高，可用于课堂活跃度监测',
            roll_call_guide: '随机点名器',
            roll_call_desc2: '随机选择学生回答问题，增加课堂互动，支持导入学生名单',
            timer_guide: '课堂计时器',
            timer_desc2: '管理课堂活动时间，提高教学效率，支持全屏模式和预设时间',
            clock_guide: '全屏时钟',
            clock_desc2: '超大显示时钟，支持8种颜色主题、12/24小时制切换、一键全屏显示',
            grouping_guide: '小组分组器',
            grouping_desc2: '随机分组学生，便于小组活动，支持自定义分组人数',
            whiteboard_guide: '电子白板',
            whiteboard_desc2: '在线绘制和演示，支持多点触控、多种颜色和线条粗细调节',
            tracker_guide: '课堂表现记录器',
            tracker_desc2: '记录学生课堂表现，帮助教师了解学生参与度',
            feedback_guide: '反馈建议',
            feedback_desc: '点击"反馈建议"按钮提交您的宝贵意见',
            footer_text: '© 2025 教师工具箱 - 专为教师设计 · ⭐️ Made By CrisXie & Zhang Monday ⭐️',
            teachers_day_title: '教师节快乐！',
            teachers_day_message: '祝您教师节快乐！感谢您对教育事业的无私奉献和辛勤付出。',
            announcement_center: '公告',
            theme_dark: '黑夜模式',
            theme_light: '日间模式',
            install_app: '安装应用',
            easter_egg: '彩蛋',
            install_pwa: '安装应用',
            egg: '彩蛋',
            please_input_student_name: '请输入学生姓名',
            student_exists: '学生已存在（学号或姓名重复）',
            import_success: '成功导入 {count} 名学生',
            import_failed: '导入失败：{error}',
            select_file: '请选择一个文件',
            file_format_not_supported: '文件格式不支持，请使用CSV、TXT或JSON格式的文件',
            no_valid_data: '未解析到有效学生数据',
            confirm_delete_student: '确定要删除这个学生吗？',
            confirm_clear_students: '确定要清空所有学生吗？',
            select_student_failed: '选择学生失败，请重试',
            hide_student_management: '隐藏学生管理',
            
            // Handwriting Generator
            handwriting_generator_title: '字帖生成器',
            handwriting_generator_desc: '支持中英文，可自定义字体和样式',
            input_text_content: '输入文字内容：',
            input_text_placeholder: '请输入要生成字帖的文字内容，支持中文和英文',
            font_selection: '字体选择：',
            font_kaiti: '楷体（推荐）',
            font_songti: '宋体',
            font_fangsong: '仿宋',
            font_heiti: '黑体',
            font_size: '字体大小：',
            line_height: '行高：',
            text_align: '对齐方式：',
            align_left: '左对齐',
            align_center: '居中',
            align_right: '右对齐',
            generate_handwriting: '生成字帖',
            print_handwriting: '打印字帖',
            clear_content: '清空内容',
            preview_placeholder: '请在上方输入文字内容并点击"生成字帖"按钮',
            handwriting_instruction_1: '<strong>输入文字内容</strong> - 在文本框中输入您想要生成字帖的文字，支持中英文',
            handwriting_instruction_2: '<strong>选择字体</strong> - 从下拉菜单中选择合适的字体，楷体适合中文练习',
            handwriting_instruction_3: '<strong>调整样式</strong> - 使用滑块调整字体大小和行高，选择文本对齐方式',
            handwriting_instruction_4: '<strong>生成字帖</strong> - 点击"生成字帖"按钮预览效果',
            handwriting_instruction_5: '<strong>打印字帖</strong> - 点击"打印字帖"按钮打印生成的字帖用于练习',
            handwriting_instruction_6: '<strong>清空内容</strong> - 点击"清空内容"按钮清除所有输入和预览',
            please_input_text: '请输入文字内容',

            // Roll Call
            current_selected_student: '当前选中学生',
            click_to_start_roll_call: '点击"开始点名"选择学生',
            roll_speed_adjustment: '滚动速度调节',
            speed_label: '速度',
            start_roll_call: '开始点名',
            stop_roll_call: '停止点名',
            reset_roll_call: '重置点名',
            roll_call_history: '点名历史',
            no_history_record: '暂无点名记录',
            roll_call_instruction_1: '<strong>准备工作</strong> - 请先在主页添加学生信息',
            roll_call_instruction_2: '<strong>开始点名</strong> - 点击"开始点名"按钮开始随机选择学生',
            roll_call_instruction_3: '<strong>停止点名</strong> - 点击"停止点名"按钮停止滚动并选定学生',
            roll_call_instruction_4: '<strong>重置功能</strong> - 点击"重置"按钮清除当前选择和历史记录',
            roll_call_instruction_5: '<strong>历史记录</strong> - 查看下方的点名历史，了解已选择的学生',
            roll_call_instruction_6: '<strong>重复避免</strong> - 系统会尽量避免重复选择同一学生',
            roll_call_add_students_notice: '请先在主页添加学生信息。是否跳转到主页？',

            // Timer
            timer_countdown: '倒计时器',
            minutes: '分钟',
            seconds: '秒钟',
            timer_start: '开始',
            timer_pause: '暂停',
            timer_reset: '重置',
            timer_fullscreen: '全屏',
            timer_exit_fullscreen: '退出全屏',
            timer_invalid_time: '请设置有效的时间',
            timer_instruction_1: '<strong>设置时间</strong> - 使用输入框设置倒计时时间（分钟和秒钟）',
            timer_instruction_2: '<strong>快速设置</strong> - 点击预设时间按钮快速设置常见时间',
            timer_instruction_3: '<strong>开始计时</strong> - 点击"开始"按钮启动计时器',
            timer_instruction_4: '<strong>暂停计时</strong> - 点击"暂停"按钮暂停计时器',
            timer_instruction_5: '<strong>重置计时</strong> - 点击"重置"按钮重置计时器到初始设置时间',
            timer_instruction_6: '<strong>全屏模式</strong> - 点击"全屏"按钮进入全屏模式，ESC键退出',
            timer_instruction_7: '<strong>时间提醒</strong> - 倒计时结束时会有强烈的视觉提醒效果',

            // Sound Detector
            sound_detector_viz: '声音可视化',
            sound_detector_start: '开始检测',
            sound_detector_stop: '停止检测',
            sound_detector_threshold_setting: '声音阈值设置:',
            sound_detector_current_threshold: '当前阈值:',
            sound_detector_warning: '警告：声音超过设定阈值！',
            sound_detector_current_volume: '当前音量:',
            sound_detector_max_volume: '最大音量',
            sound_detector_exceed_count: '超阈值次数',
            sound_detector_avg_volume: '平均音量',
            sound_detector_log: '检测日志',
            sound_detector_clear_log: '清空日志',
            sound_detector_status_init: '请点击"开始检测"按钮启动声音检测',
            sound_detector_status_request: '正在请求麦克风权限...',
            sound_detector_status_detecting: '正在检测声音...',
            sound_detector_status_stopped: '声音检测已停止',
            sound_detector_status_error: '无法访问麦克风，请检查权限设置',
            sound_detector_instruction_1: '点击"开始检测"按钮启动声音检测功能',
            sound_detector_instruction_2: '浏览器可能会询问是否允许访问麦克风，请点击"允许"',
            sound_detector_instruction_3: '对着麦克风说话或发出声音，观察小球随着音量升高而上升',
            sound_detector_instruction_4: '使用滑块设置声音阈值，当声音超过阈值时会显示警告',
            sound_detector_instruction_5: '在右侧日志面板中查看检测历史和超过阈值的详细记录',
            sound_detector_instruction_6: '点击"停止检测"按钮结束声音检测',
            sound_detector_log_start: '开始声音检测',
            sound_detector_log_stop: '停止声音检测',
            sound_detector_log_threshold: '阈值设置为 {threshold}%',
            sound_detector_log_exceed: '超过阈值（{volume}% > {threshold}%）',
            sound_detector_log_recover: '声音恢复到阈值以下（{volume}% <= {threshold}%）',

            // Clock
            clock_format_12: '12小时制',
            clock_format_24: '24小时制',
            clock_hide_seconds: '隐藏秒',
            clock_show_seconds: '显示秒',
            clock_enter_fullscreen: '进入全屏',
            clock_exit_fullscreen: '退出全屏',
            clock_date_format: '{year}年{month}月{date}日',
            weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },
        en: {
            // Common
            back_to_home: '← Back to Home',
            teacher_toolkit: 'Teacher Toolkit',
            toolkit_desc: 'A collection of practical tools designed for teachers',
            site_title: 'Teacher Toolkit',
            site_subtitle: 'A collection of practical tools designed for teachers',
            footer_designed_for_teachers: '© 2025 Teacher Toolkit - Designed for Teachers',
            notice: 'Notice',
            success: 'Success',
            error: 'Error',
            confirm: 'OK',
            cancel: 'Cancel',

            // Home Page
            sound_detector_title: 'Sound Detector',
            sound_detector_desc: 'Real-time detection of ambient sound intensity, the higher the sound, the higher the ball',
            roll_call_title: 'Random Roll Call',
            roll_call_desc: 'Randomly select students to answer questions, increase classroom interaction',
            timer_title: 'Classroom Timer',
            timer_desc: 'Manage classroom activity time, improve teaching efficiency',
            clock_title: 'Fullscreen Clock',
            clock_desc: 'Large display clock with multiple colors and formats, one-click fullscreen',
            grouping_title: 'Group Generator',
            grouping_desc: 'Randomly group students for group activities',
            whiteboard_title: 'Digital Whiteboard',
            whiteboard_desc: 'Online drawing and presentation, supports multi-touch',
            tracker_title: 'Classroom Performance Tracker',
            tracker_desc: 'Record student classroom performance, improve teaching effectiveness',
            copybook_title: 'Copybook Generator',
            copybook_desc: 'Generate Chinese and English copybooks, support custom fonts',
            math_title: 'Math Problem Generator',
            math_desc: 'Generate customizable math problems, supports multiple operators',
            '3d_viewer_title': '3D Object Viewer',
            '3d_viewer_desc': 'Create, edit and view 3D objects, support multi-angle viewing',
            periodic_table_title: 'Periodic Table',
            periodic_table_desc: 'Interactive periodic table, click to view element details',
            chart_generator_title: 'Chart Generator',
            chart_generator_desc: 'Customize data, colors and chart type to generate professional charts',
            teacher_camera_title: 'Teacher Camera',
            teacher_camera_desc: "Stream teacher's mobile camera feed to computer screen",
            analytics_title: 'Analytics',
            analytics_desc: 'View visit trends and key metrics',
            analytics_open: 'Open Dashboard',
            donation_title: 'Support Donation',
            donation_desc: 'If you like these tools, please consider supporting us',
            use_now: 'Use Now',
            support_now: 'Go to Support',
            student_management: 'Student Management',
            student_id_placeholder: 'Student ID (optional)',
            student_name_placeholder: 'Student Name',
            add_student: 'Add Student',
            batch_import_title: 'Batch Import (CSV format: ID,Name)',
            csv_example: 'Example:\n2021001,John\n2021002,Jane\n2021003,Bob',
            import_csv: 'Import CSV',
            file_import_title: 'File Import (supports CSV, TXT, JSON formats)',
            import_file: 'Import File',
            clear_students: 'Clear Student List',
            no_students: 'No students, please add students',
            total_students: 'Total Students',
            suggested_groups: 'Suggested Groups',
            manage_students: 'Manage Students',
            feedback: 'Feedback',
            instructions: 'Instructions',
            student_management_guide: 'Student Management',
            student_management_desc: 'Click the "Manage Students" button to show the student management interface, supports single add, batch import and file import',
            sound_detector_guide: 'Sound Detector',
            sound_detector_desc2: 'Real-time detection of ambient sound intensity, the higher the sound, the higher the ball, can be used for classroom activity monitoring',
            roll_call_guide: 'Random Roll Call',
            roll_call_desc2: 'Randomly select students to answer questions, increase classroom interaction, supports importing student list',
            timer_guide: 'Classroom Timer',
            timer_desc2: 'Manage classroom activity time, improve teaching efficiency, supports fullscreen mode and preset time',
            clock_guide: 'Fullscreen Clock',
            clock_desc2: 'Large display clock with 8 color themes, 12/24 hour format switching, one-click fullscreen',
            grouping_guide: 'Group Generator',
            grouping_desc2: 'Randomly group students for group activities, supports custom group size',
            whiteboard_guide: 'Digital Whiteboard',
            whiteboard_desc2: 'Online drawing and presentation, supports multi-touch, multiple colors and line thickness adjustment',
            tracker_guide: 'Classroom Performance Tracker',
            tracker_desc2: 'Record student classroom performance, help teachers understand student participation',
            feedback_guide: 'Feedback',
            feedback_desc: 'Click the "Feedback" button to submit your valuable opinions',
            footer_text: '© 2025 Teacher Toolkit - Designed for Teachers · ⭐️ Made By CrisXie & Zhang Monday ⭐️',
            teachers_day_title: "Happy Teacher's Day!",
            teachers_day_message: "Happy Teacher's Day! Thank you for your selfless dedication and hard work in education.",
            announcement_center: 'Announcement',
            theme_dark: 'Dark Mode',
            theme_light: 'Light Mode',
            install_app: 'Install App',
            easter_egg: 'Easter Egg',
            install_pwa: 'Install App',
            egg: 'Easter Egg',
            please_input_student_name: 'Please enter student name',
            student_exists: 'Student already exists (duplicate ID or name)',
            import_success: 'Successfully imported {count} students',
            import_failed: 'Import failed: {error}',
            select_file: 'Please select a file',
            file_format_not_supported: 'File format not supported, please use CSV, TXT or JSON format files',
            no_valid_data: 'No valid student data parsed',
            confirm_delete_student: 'Are you sure you want to delete this student?',
            confirm_clear_students: 'Are you sure you want to clear all students?',
            select_student_failed: 'Failed to select student, please retry',
            hide_student_management: 'Hide Student Management',

            // Modal & Announcements
            announcement_title: 'Announcement',
            announcement_close: 'Got it',
            announcement_permanent: "Don't show again",
            donation_modal_title: 'Do you like this tool?',
            donation_modal_message: 'If these tools help your teaching, please consider supporting the author to develop more useful features!',
            donation_modal_btn: 'Go support',
            donation_modal_later: 'Maybe later',
            donation_modal_tip: '💡 Your support is the motivation for the author to keep updating',

            // Handwriting Generator
            handwriting_generator_title: 'Copybook Generator',
            handwriting_generator_desc: 'Supports Chinese and English, customizable fonts and styles',
            input_text_content: 'Input Text Content:',
            input_text_placeholder: 'Enter text to generate copybook, supports Chinese and English',
            font_selection: 'Font Selection:',
            font_kaiti: 'KaiTi (Recommended)',
            font_songti: 'SimSun',
            font_fangsong: 'FangSong',
            font_heiti: 'SimHei',
            font_size: 'Font Size:',
            line_height: 'Line Height:',
            text_align: 'Text Align:',
            align_left: 'Left',
            align_center: 'Center',
            align_right: 'Right',
            generate_handwriting: 'Generate',
            print_handwriting: 'Print',
            clear_content: 'Clear',
            preview_placeholder: 'Enter text above and click "Generate" button',
            handwriting_instruction_1: '<strong>Input Text</strong> - Enter the text you want to practice in the text box',
            handwriting_instruction_2: '<strong>Select Font</strong> - Choose a suitable font from the dropdown menu',
            handwriting_instruction_3: '<strong>Adjust Style</strong> - Use sliders to adjust font size and line height',
            handwriting_instruction_4: '<strong>Generate</strong> - Click the "Generate" button to preview',
            handwriting_instruction_5: '<strong>Print</strong> - Click the "Print" button to print the copybook',
            handwriting_instruction_6: '<strong>Clear</strong> - Click the "Clear" button to clear all input and preview',
            please_input_text: 'Please input text content',

            // Roll Call
            current_selected_student: 'Selected Student',
            click_to_start_roll_call: 'Click "Start" to select student',
            roll_speed_adjustment: 'Roll Speed Adjustment',
            speed_label: 'Speed',
            start_roll_call: 'Start Roll Call',
            stop_roll_call: 'Stop Roll Call',
            reset_roll_call: 'Reset Roll Call',
            roll_call_history: 'Roll Call History',
            no_history_record: 'No history records',
            roll_call_instruction_1: '<strong>Preparation</strong> - Please add students on the home page first',
            roll_call_instruction_2: '<strong>Start</strong> - Click the "Start" button to begin random selection',
            roll_call_instruction_3: '<strong>Stop</strong> - Click the "Stop" button to stop and select a student',
            roll_call_instruction_4: '<strong>Reset</strong> - Click the "Reset" button to clear current selection and history',
            roll_call_instruction_5: '<strong>History</strong> - View history below to see previously selected students',
            roll_call_instruction_6: '<strong>Avoid Repetition</strong> - The system avoids repeating the same student',
            roll_call_add_students_notice: 'Please add students on the home page first. Go to home page now?',

            // Timer
            timer_countdown: 'Countdown Timer',
            minutes: 'Minutes',
            seconds: 'Seconds',
            timer_start: 'Start',
            timer_pause: 'Pause',
            timer_reset: 'Reset',
            timer_fullscreen: 'Fullscreen',
            timer_exit_fullscreen: 'Exit Fullscreen',
            timer_invalid_time: 'Please set a valid time',
            timer_instruction_1: '<strong>Set Time</strong> - Use input boxes to set countdown time (minutes and seconds)',
            timer_instruction_2: '<strong>Quick Set</strong> - Click preset time buttons to quickly set common times',
            timer_instruction_3: '<strong>Start</strong> - Click "Start" button to start the timer',
            timer_instruction_4: '<strong>Pause</strong> - Click "Pause" button to pause the timer',
            timer_instruction_5: '<strong>Reset</strong> - Click "Reset" button to reset the timer to initial settings',
            timer_instruction_6: '<strong>Fullscreen</strong> - Click "Fullscreen" button to enter fullscreen mode, ESC to exit',
            timer_instruction_7: '<strong>Time Alert</strong> - There will be a strong visual alert when countdown ends',

            sound_detector_viz: 'Sound Visualization',
            sound_detector_start: 'Start Detection',
            sound_detector_stop: 'Stop Detection',
            sound_detector_threshold_setting: 'Threshold Setting:',
            sound_detector_current_threshold: 'Current Threshold:',
            sound_detector_warning: 'Warning: Volume exceeds threshold!',
            sound_detector_current_volume: 'Current Volume:',
            sound_detector_max_volume: 'Max Volume',
            sound_detector_exceed_count: 'Exceed Count',
            sound_detector_avg_volume: 'Avg Volume',
            sound_detector_log: 'Detection Log',
            sound_detector_clear_log: 'Clear Log',
            sound_detector_status_init: 'Click "Start Detection" to begin',
            sound_detector_status_request: 'Requesting microphone permission...',
            sound_detector_status_detecting: 'Detecting sound...',
            sound_detector_status_stopped: 'Detection stopped',
            sound_detector_status_error: 'Cannot access microphone, please check permissions',
            sound_detector_instruction_1: 'Click "Start Detection" to start sound detection',
            sound_detector_instruction_2: 'The browser may ask for microphone access, please click "Allow"',
            sound_detector_instruction_3: 'Speak into the microphone and watch the ball rise with volume',
            sound_detector_instruction_4: 'Use the slider to set a threshold, a warning shows when exceeded',
            sound_detector_instruction_5: 'View detection history and threshold alerts in the log panel',
            sound_detector_instruction_6: 'Click "Stop Detection" to end sound detection',
            sound_detector_log_start: 'Started sound detection',
            sound_detector_log_stop: 'Stopped sound detection',
            sound_detector_log_threshold: 'Threshold set to {threshold}%',
            sound_detector_log_exceed: 'Exceeded threshold ({volume}% > {threshold}%)',
            sound_detector_log_recover: 'Sound recovered below threshold ({volume}% <= {threshold}%)',

            // Clock
            clock_format_12: '12-Hour',
            clock_format_24: '24-Hour',
            clock_hide_seconds: 'Hide Seconds',
            clock_show_seconds: 'Show Seconds',
            clock_enter_fullscreen: 'Fullscreen',
            clock_exit_fullscreen: 'Exit Fullscreen',
            clock_date_format: '{month}/{date}/{year}',
            weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }
    };

    let currentLanguage = localStorage.getItem('preferredLanguage') || 
                       (navigator.language && navigator.language.startsWith('zh') ? 'zh' : 'en');

    function applyLanguage() {
        const langData = languages[currentLanguage];
        if (!langData) return;

        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            const val = langData[key];
            if (val) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = val;
                } else {
                    el.innerHTML = val;
                }
            }
        });

        document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
            const key = el.getAttribute('data-lang-placeholder');
            const val = langData[key];
            if (val) el.placeholder = val;
        });

        document.querySelectorAll('[data-lang-title]').forEach(el => {
            const key = el.getAttribute('data-lang-title');
            const val = langData[key];
            if (val) el.title = val;
        });

        // Update page title if data-lang-title exists on head title
        const headTitle = document.querySelector('title[data-lang]');
        if (headTitle) {
            const key = headTitle.getAttribute('data-lang');
            const val = langData[key];
            if (val) document.title = val;
        }

        // Update language switcher text if exists
        const switcher = document.getElementById('languageSwitcher');
        if (switcher) {
            switcher.textContent = currentLanguage === 'zh' ? 'English' : '中文';
        }
    }

    function switchLanguage() {
        currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
        localStorage.setItem('preferredLanguage', currentLanguage);
        applyLanguage();
        
        // Dispatch a custom event for other scripts to respond
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: currentLanguage }));
    }

    function getTranslation(key) {
        return (languages[currentLanguage] && languages[currentLanguage][key]) || key;
    }

    // Initial apply
    document.addEventListener('DOMContentLoaded', applyLanguage);

    // Export for other scripts
    window.i18n = {
        languages,
        currentLanguage: () => currentLanguage,
        applyLanguage,
        switchLanguage,
        getTranslation
    };
})();
