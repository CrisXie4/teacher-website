'use strict';

let deferredPrompt = null;

let currentLanguage = 'zh';
let donationShowCount = 0;

let currentAnnouncementContent = '';
let currentAnnouncementHash = '';

const donationConfig = {
    probability: 0.45,
    minInterval: 1800000,
    maxShowPerSession: 3,
    excludePages: ['src/pages/donation.html']
};

const languages = {
    zh: {
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
        footer_text: '© 2025 教师工具箱 - 专为教师设计',
        teachers_day_title: '教师节快乐！',
        teachers_day_message: '祝您教师节快乐！感谢您对教育事业的无私奉献和辛勤付出。',
        announcement_center: '公告'
    },
    en: {
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
        footer_text: '© 2025 Teacher Toolkit - Designed for Teachers',
        teachers_day_title: "Happy Teacher's Day!",
        teachers_day_message: "Happy Teacher's Day! Thank you for your selfless dedication and hard work in education.",
        announcement_center: 'Announcement'
    }
};

function $(id) {
    return document.getElementById(id);
}

function applyLanguage() {
    const languageSwitcher = $('languageSwitcher');
    if (languageSwitcher) {
        languageSwitcher.textContent = currentLanguage === 'zh' ? 'English' : '中文';
    }

    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        const val = languages[currentLanguage] && languages[currentLanguage][key];
        if (val) el.textContent = val;
    });

    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        const val = languages[currentLanguage] && languages[currentLanguage][key];
        if (val) el.placeholder = val;
    });
}

function switchLanguage() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    localStorage.setItem('preferredLanguage', currentLanguage);
    applyLanguage();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeSwitcher = $('themeSwitcher');
    if (themeSwitcher) {
        themeSwitcher.textContent = document.body.classList.contains('dark-mode')
            ? (currentLanguage === 'zh' ? '日间模式' : 'Light Mode')
            : (currentLanguage === 'zh' ? '黑夜模式' : 'Dark Mode');
    }

    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function checkTeachersDay() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    if (month === 9 && day === 10) {
        const hasShown = localStorage.getItem('hasShownTeachersDay');
        if (!hasShown) {
            alert(`${languages[currentLanguage].teachers_day_title}\n\n${languages[currentLanguage].teachers_day_message}`);
            localStorage.setItem('hasShownTeachersDay', 'true');
        }
    } else {
        localStorage.removeItem('hasShownTeachersDay');
    }
}

function showCustomModal(title, message, callback) {
    alert(`${title}\n\n${message}`);
    if (callback && typeof callback === 'function') callback();
}

function showConfirmModal(title, message, onConfirm) {
    const ok = confirm(`${title}\n\n${message}`);
    if (ok && typeof onConfirm === 'function') onConfirm();
}

function updateSummary() {
    const students = StudentManager.getStudents();
    const totalStudentsEl = $('totalStudents');
    const totalGroupsEl = $('totalGroups');
    if (totalStudentsEl) totalStudentsEl.textContent = String(students.length);
    if (totalGroupsEl) totalGroupsEl.textContent = String(Math.max(1, Math.floor(students.length / 5)));
}

function renderStudentList() {
    const studentList = $('studentList');
    if (!studentList) return;

    const students = StudentManager.getStudents();
    studentList.innerHTML = '';

    const urlParams = new URLSearchParams(window.location.search);
    const fromTracker = urlParams.get('from') === 'tracker';
    const fromRollCall = urlParams.get('from') === 'rollcall';
    const fromGrouping = urlParams.get('from') === 'grouping';
    const fromOtherTool = fromTracker || fromRollCall || fromGrouping;

    if (students.length === 0) {
        const noStudentsText = currentLanguage === 'zh' ? '暂无学生，请添加学生' : 'No students, please add students';
        studentList.innerHTML = `<div class="empty-list">${noStudentsText}</div>`;
        return;
    }

    students.forEach((student, index) => {
        const studentItem = document.createElement('div');
        studentItem.className = 'student-item';

        const escapedId = student.id ? StudentManager.escapeHtml(student.id) : '';
        const escapedName = StudentManager.escapeHtml(student.name);

        const studentInfo = student.id
            ? `<span class="student-info"><span class="student-id">${escapedId}</span> - ${escapedName}</span>`
            : `<span class="student-info">${escapedName}</span>`;

        const deleteText = currentLanguage === 'zh' ? '删除' : 'Delete';
        if (fromOtherTool && fromTracker) {
            const selectText = currentLanguage === 'zh' ? '选择' : 'Select';
            studentItem.innerHTML = `${studentInfo}
                <button class="btn" onclick="selectStudentForTracker(${index})" style="padding: 0.5rem 1rem; font-size: 0.9rem;">${selectText}</button>
                <button class="remove-student" onclick="removeStudent(${index})">${deleteText}</button>`;
        } else {
            studentItem.innerHTML = `${studentInfo}
                <button class="remove-student" onclick="removeStudent(${index})">${deleteText}</button>`;
        }
        studentList.appendChild(studentItem);
    });
}

function addStudent() {
    const studentId = $('studentId');
    const studentName = $('studentName');
    const addStudentBtn = $('addStudentBtn');
    if (!studentName || !addStudentBtn) return;

    const id = studentId ? studentId.value.trim() : '';
    const name = studentName.value.trim();

    if (!name) {
        showCustomModal(currentLanguage === 'zh' ? '提示' : 'Notice', currentLanguage === 'zh' ? '请输入学生姓名' : 'Please enter student name');
        return;
    }

    addStudentBtn.disabled = true;
    addStudentBtn.textContent = currentLanguage === 'zh' ? '添加中...' : 'Adding...';

    const ok = StudentManager.addStudent({ id, name });
    if (ok) {
        renderStudentList();
        updateSummary();
        if (studentId) studentId.value = '';
        studentName.value = '';
        studentName.focus();
        addStudentBtn.disabled = false;
        addStudentBtn.textContent = currentLanguage === 'zh' ? '添加学生' : 'Add Student';
    } else {
        showCustomModal(currentLanguage === 'zh' ? '提示' : 'Notice', currentLanguage === 'zh' ? '学生已存在（学号或姓名重复）' : 'Student already exists (duplicate ID or name)');
        addStudentBtn.disabled = false;
        addStudentBtn.textContent = currentLanguage === 'zh' ? '添加学生' : 'Add Student';
    }
}

function importStudents() {
    const csvInput = $('csvInput');
    const importBtn = $('importBtn');
    if (!csvInput || !importBtn) return;

    const csvText = csvInput.value.trim();
    if (!csvText) {
        showCustomModal(currentLanguage === 'zh' ? '提示' : 'Notice', currentLanguage === 'zh' ? '请输入CSV数据' : 'Please enter CSV data');
        return;
    }

    importBtn.disabled = true;
    importBtn.textContent = currentLanguage === 'zh' ? '导入中...' : 'Importing...';

    try {
        const students = StudentManager.parseCSV(csvText);
        if (!students.length) {
            showCustomModal(currentLanguage === 'zh' ? '提示' : 'Notice', currentLanguage === 'zh' ? '未解析到有效学生数据' : 'No valid student data parsed');
            return;
        }
        const addedCount = StudentManager.addStudents(students);
        renderStudentList();
        updateSummary();
        csvInput.value = '';
        showCustomModal(currentLanguage === 'zh' ? '成功' : 'Success', currentLanguage === 'zh' ? `成功导入 ${addedCount} 名学生` : `Successfully imported ${addedCount} students`);
    } catch (e) {
        showCustomModal(currentLanguage === 'zh' ? '错误' : 'Error', currentLanguage === 'zh' ? `导入失败：${e.message}` : `Import failed: ${e.message}`);
    } finally {
        importBtn.disabled = false;
        importBtn.textContent = currentLanguage === 'zh' ? '导入CSV' : 'Import CSV';
    }
}

function importFromFile() {
    const fileInput = $('fileInput');
    const importFileBtn = $('importFileBtn');
    const fileInfo = $('fileInfo');
    if (!fileInput || !importFileBtn) return;

    const file = fileInput.files && fileInput.files[0];
    if (!file) {
        showCustomModal(currentLanguage === 'zh' ? '提示' : 'Notice', currentLanguage === 'zh' ? '请选择一个文件' : 'Please select a file');
        return;
    }

    const lowerName = file.name.toLowerCase();
    if (!lowerName.endsWith('.csv') && !lowerName.endsWith('.txt') && !lowerName.endsWith('.json')) {
        showCustomModal(currentLanguage === 'zh' ? '错误' : 'Error', currentLanguage === 'zh' ? '文件格式不支持，请使用CSV、TXT或JSON格式的文件' : 'File format not supported, please use CSV, TXT or JSON format files');
        fileInput.value = '';
        if (fileInfo) fileInfo.textContent = '';
        return;
    }

    const fileNameLabel = currentLanguage === 'zh' ? '文件名' : 'File name';
    const fileSizeLabel = currentLanguage === 'zh' ? '大小' : 'Size';
    const fileTypeLabel = currentLanguage === 'zh' ? '类型' : 'Type';
    const unknown = currentLanguage === 'zh' ? '未知' : 'Unknown';
    if (fileInfo) {
        fileInfo.textContent = `${fileNameLabel}: ${file.name} | ${fileSizeLabel}: ${(file.size / 1024).toFixed(1)} KB | ${fileTypeLabel}: ${file.type || unknown}`;
    }

    importFileBtn.disabled = true;
    importFileBtn.textContent = currentLanguage === 'zh' ? '导入中...' : 'Importing...';

    const reader = new FileReader();
    reader.onload = e => {
        try {
            const content = String(e.target.result || '');
            const students = lowerName.endsWith('.json') ? StudentManager.parseJSON(content) : StudentManager.parseCSV(content);
            if (!students.length) {
                showCustomModal(currentLanguage === 'zh' ? '提示' : 'Notice', currentLanguage === 'zh' ? '未解析到有效学生数据' : 'No valid student data parsed');
                return;
            }
            const addedCount = StudentManager.addStudents(students);
            renderStudentList();
            updateSummary();
            fileInput.value = '';
            if (fileInfo) fileInfo.textContent = '';
            showCustomModal(currentLanguage === 'zh' ? '成功' : 'Success', currentLanguage === 'zh' ? `成功导入 ${addedCount} 名学生` : `Successfully imported ${addedCount} students`);
        } catch (err) {
            showCustomModal(currentLanguage === 'zh' ? '错误' : 'Error', currentLanguage === 'zh' ? `导入失败：${err.message}` : `Import failed: ${err.message}`);
        } finally {
            importFileBtn.disabled = false;
            importFileBtn.textContent = currentLanguage === 'zh' ? '导入文件' : 'Import File';
        }
    };
    reader.readAsText(file, 'UTF-8');
}

function removeStudent(index) {
    showConfirmModal(currentLanguage === 'zh' ? '确认删除' : 'Confirm Delete', currentLanguage === 'zh' ? '确定要删除这个学生吗？' : 'Are you sure you want to delete this student?', () => {
        StudentManager.removeStudent(index);
        renderStudentList();
        updateSummary();
    });
}

function clearStudents() {
    showConfirmModal(currentLanguage === 'zh' ? '确认清空' : 'Confirm Clear', currentLanguage === 'zh' ? '确定要清空所有学生吗？' : 'Are you sure you want to clear all students?', () => {
        StudentManager.clearStudents();
        renderStudentList();
        updateSummary();
    });
}

function selectStudentForTracker(index) {
    const students = StudentManager.getStudents();
    if (index < 0 || index >= students.length) return;
    const student = students[index];
    try {
        localStorage.setItem('classroom_tracker_current_student', JSON.stringify(student));
        window.location.href = 'src/pages/classroom-tracker.html';
    } catch (e) {
        showCustomModal(currentLanguage === 'zh' ? '错误' : 'Error', currentLanguage === 'zh' ? '选择学生失败，请重试' : 'Failed to select student, please retry');
    }
}

function toggleStudentManagement(event) {
    const container = document.querySelector('.student-management-container');
    const toggleBtn = $('toggleStudentsBtn');
    if (!container || !toggleBtn) return;

    const isHidden = container.classList.contains('hidden');
    if (isHidden) {
        container.classList.remove('hidden');
        toggleBtn.textContent = currentLanguage === 'zh' ? '隐藏学生管理' : 'Hide Student Management';
        renderStudentList();
    } else {
        container.classList.add('hidden');
        toggleBtn.textContent = currentLanguage === 'zh' ? '管理学生信息' : 'Manage Students';
    }

    if (event && event.stopPropagation) event.stopPropagation();
}

function showEmailPrompt() {
    const email = 'crisweiming@hotmail.com';
    const message1 = currentLanguage === 'zh' ? '请发送邮件至：' : 'Please send email to: ';
    const message2 = currentLanguage === 'zh' ? '我们非常期待您的宝贵意见！' : 'We look forward to your valuable feedback!';
    alert(`${message1}${email}\n\n${message2}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shouldShowDonationModal(targetPage) {
    if (donationConfig.excludePages.some(page => targetPage.includes(page))) return false;
    if (donationShowCount >= donationConfig.maxShowPerSession) return false;

    const lastShowTime = localStorage.getItem('donationLastShowTime');
    if (lastShowTime) {
        const timeSinceLastShow = Date.now() - parseInt(lastShowTime, 10);
        if (timeSinceLastShow < donationConfig.minInterval) return false;
    }
    return Math.random() < donationConfig.probability;
}

function showDonationModal(targetPage) {
    window.pendingNavigationPage = targetPage;
    const modalTitle = $('donationModalTitle');
    const modalMessage = $('donationModalMessage');
    const modalBtn = $('donationModalBtn');
    const modalLater = $('donationModalLater');
    const modalTip = $('donationModalTip');

    if (currentLanguage === 'zh') {
        if (modalTitle) modalTitle.textContent = '喜欢这个工具吗？';
        if (modalMessage) modalMessage.textContent = '如果这些工具对您的教学有帮助，欢迎打赏支持作者继续开发更多实用功能！';
        if (modalBtn) modalBtn.textContent = '去支持一下';
        if (modalLater) modalLater.textContent = '下次再说';
        if (modalTip) modalTip.textContent = '💡 您的支持是作者持续更新的动力';
    } else {
        if (modalTitle) modalTitle.textContent = 'Like this tool?';
        if (modalMessage) modalMessage.textContent = 'If these tools help your teaching, please consider supporting the author to develop more useful features!';
        if (modalBtn) modalBtn.textContent = 'Support Now';
        if (modalLater) modalLater.textContent = 'Maybe Later';
        if (modalTip) modalTip.textContent = '💡 Your support motivates the author to keep updating';
    }

    const modal = $('donationModal');
    if (modal) modal.classList.add('show');

    donationShowCount++;
    localStorage.setItem('donationLastShowTime', Date.now().toString());
}

function closeDonationModal() {
    const modal = $('donationModal');
    if (modal) modal.classList.remove('show');

    if (window.pendingNavigationPage) {
        const target = window.pendingNavigationPage;
        window.pendingNavigationPage = null;
        setTimeout(() => {
            window.location.href = target;
        }, 300);
    }
}

function goToDonation() {
    const modal = $('donationModal');
    if (modal) modal.classList.remove('show');
    window.pendingNavigationPage = null;

    setTimeout(() => {
        const fromLinuxDo = localStorage.getItem('fromLinuxDo') === 'true';
        if (fromLinuxDo) {
            window.open('https://credit.linux.do/paying/online?token=20d0b15ff86a8c20de460fb2cd5cd5208c0f1063571629227f5ddd1fdeae0815', '_blank');
        } else {
            window.location.href = 'src/pages/donation.html';
        }
    }, 300);
}

function navigateTo(page) {
    if (page === 'src/pages/donation.html') {
        const fromLinuxDo = localStorage.getItem('fromLinuxDo') === 'true';
        if (fromLinuxDo) {
            window.open('https://credit.linux.do/paying/online?token=20d0b15ff86a8c20de460fb2cd5cd5208c0f1063571629227f5ddd1fdeae0815', '_blank');
            return;
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const fromTracker = urlParams.get('from') === 'tracker';
    const fromRollCall = urlParams.get('from') === 'rollcall';
    const fromGrouping = urlParams.get('from') === 'grouping';
    if (fromTracker || fromRollCall || fromGrouping) {
        let message = currentLanguage === 'zh'
            ? '请在下方学生列表中添加或选择学生'
            : 'Please add or select students from the list below';
        if (fromTracker) {
            message = currentLanguage === 'zh'
                ? '请在下方学生列表中选择要记录表现的学生'
                : 'Please select a student to track performance from the list below';
        } else if (fromRollCall) {
            message = currentLanguage === 'zh'
                ? '请在下方学生列表中添加学生，然后返回随机点名器'
                : 'Please add students to the list below, then return to the roll call tool';
        } else if (fromGrouping) {
            message = currentLanguage === 'zh'
                ? '请在下方学生列表中添加学生，然后返回小组分组器'
                : 'Please add students to the list below, then return to the group generator';
        }
        alert(message);
        const container = document.querySelector('.student-management-container');
        if (container && container.classList.contains('hidden')) {
            toggleStudentManagement();
        }
        return;
    }

    if (shouldShowDonationModal(page)) {
        showDonationModal(page);
        return;
    }

    window.location.href = page;
}

class FireworkParticle {
    constructor(x, y, color, velocity, size, decay) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.size = size;
        this.decay = decay;
        this.alpha = 1;
        this.gravity = 0.05;
    }

    update() {
        this.velocity.x *= 0.99;
        this.velocity.y *= 0.99;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class Firework {
    constructor(canvas, x, targetY) {
        this.canvas = canvas;
        this.x = x;
        this.y = canvas.height;
        this.targetY = targetY;
        this.speed = 8 + Math.random() * 4;
        this.exploded = false;
        this.particles = [];
        this.color = this.getRandomColor();
        this.trail = [];
    }

    getRandomColor() {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3',
            '#F38181', '#AA96DA', '#FCBAD3', '#A8D8EA',
            '#FF9F43', '#EE5A24', '#00D2D3', '#54A0FF',
            '#5F27CD', '#FF6B81', '#FFC312', '#C4E538'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        if (!this.exploded) {
            this.trail.push({ x: this.x, y: this.y, alpha: 1 });
            if (this.trail.length > 10) this.trail.shift();
            this.trail.forEach((point, index) => {
                point.alpha = index / this.trail.length;
            });
            this.y -= this.speed;
            if (this.y <= this.targetY) this.explode();
        } else {
            this.particles = this.particles.filter(p => p.alpha > 0);
            this.particles.forEach(p => p.update());
        }
    }

    explode() {
        this.exploded = true;
        const particleCount = 80 + Math.floor(Math.random() * 40);
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 / particleCount) * i;
            const speed = 2 + Math.random() * 4;
            this.particles.push(new FireworkParticle(
                this.x,
                this.y,
                this.color,
                { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
                2 + Math.random() * 2,
                0.015 + Math.random() * 0.01
            ));
        }
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;
            this.particles.push(new FireworkParticle(
                this.x,
                this.y,
                '#FFFFFF',
                { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
                1 + Math.random(),
                0.02 + Math.random() * 0.01
            ));
        }
    }

    draw(ctx) {
        if (!this.exploded) {
            this.trail.forEach(point => {
                ctx.save();
                ctx.globalAlpha = point.alpha * 0.5;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
        } else {
            this.particles.forEach(p => p.draw(ctx));
        }
    }

    isDead() {
        return this.exploded && this.particles.length === 0;
    }
}

function launchFireworks() {
    const canvas = document.createElement('canvas');
    canvas.id = 'fireworksCanvas';
    canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 99999; pointer-events: none;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    let animationId;
    const startTime = Date.now();
    const duration = 5000;

    function createFirework() {
        const x = Math.random() * canvas.width;
        const targetY = 100 + Math.random() * (canvas.height * 0.4);
        fireworks.push(new Firework(canvas, x, targetY));
    }

    function animate() {
        const elapsed = Date.now() - startTime;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (elapsed < 3000 && Math.random() < 0.1) createFirework();

        fireworks.forEach(fw => {
            fw.update();
            fw.draw(ctx);
        });

        for (let i = fireworks.length - 1; i >= 0; i--) {
            if (fireworks[i].isDead()) fireworks.splice(i, 1);
        }

        if (elapsed < duration || fireworks.length > 0) {
            animationId = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationId);
            canvas.remove();
        }
    }

    for (let i = 0; i < 5; i++) {
        setTimeout(() => createFirework(), i * 200);
    }
    animate();
}

function triggerEasterEgg() {
    const messages = {
        zh: [
            '🎉 恭喜你发现了彩蛋！',
            '🌟 你真是一个细心的用户！',
            '💖 感谢你对教师工具箱的支持！',
            '📚 希望这些工具对你的教学有帮助！',
            '🎊 祝你教学愉快，工作顺利！'
        ],
        en: [
            '🎉 Congratulations on finding the easter egg!',
            "🌟 You're really a careful user!",
            '💖 Thank you for your support of the Teacher Toolkit!',
            '📚 Hope these tools are helpful for your teaching!',
            '🎊 Wish you a happy teaching and smooth work!'
        ]
    };

    launchFireworks();
    setTimeout(() => {
        const list = messages[currentLanguage] || messages.zh;
        const message = list[Math.floor(Math.random() * list.length)];
        alert(message);
    }, 1500);
}

function parseMarkdown(markdown) {
    let html = markdown;
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    html = html.replace(/^\s*[-*+]\s+(.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    html = html.replace(/^---$/gim, '<hr>');
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    html = html.replace(/<p>\s*<\/p>/g, '');
    html = html.replace(/<p>\s*<(h[1-3]|ul|hr)/g, '<$1');
    html = html.replace(/<\/(h[1-3]|ul|hr)>\s*<\/p>/g, '</$1>');
    html = html.replace(/<\/li>\s*<li>/g, '</li><li>');
    html = html.replace(/<p><li>/g, '<ul><li>');
    html = html.replace(/<\/li><\/p>/g, '</li></ul>');
    return html;
}

function generateHash(content) {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
        const char = content.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
}

function updateAnnouncementBadge(hasUnread) {
    const badge = $('announcementBadge');
    if (!badge) return;
    if (hasUnread) badge.classList.remove('hidden');
    else badge.classList.add('hidden');
}

function showAnnouncementModal() {
    if (!currentAnnouncementContent) return;

    const modalTitle = $('announcementModalTitle');
    const closeBtn = $('announcementCloseBtn');
    const permanentBtn = $('announcementPermanentBtn');
    if (currentLanguage === 'zh') {
        if (modalTitle) modalTitle.textContent = '📢 公告';
        if (closeBtn) closeBtn.textContent = '我知道了';
        if (permanentBtn) permanentBtn.textContent = '不再显示此公告';
    } else {
        if (modalTitle) modalTitle.textContent = '📢 Announcement';
        if (closeBtn) closeBtn.textContent = 'Got it';
        if (permanentBtn) permanentBtn.textContent = "Don't show again";
    }

    const contentEl = $('announcementModalContent');
    if (contentEl) contentEl.innerHTML = parseMarkdown(currentAnnouncementContent);

    const modal = $('announcementModal');
    if (modal) modal.classList.add('show');
}

function closeAnnouncementModal() {
    const modal = $('announcementModal');
    if (modal) modal.classList.remove('show');
    sessionStorage.setItem('announcementSessionClosed', currentAnnouncementHash);
    updateAnnouncementBadge(false);
}

function permanentlyCloseAnnouncement() {
    const modal = $('announcementModal');
    if (modal) modal.classList.remove('show');
    localStorage.setItem('announcementPermanentlyClosed', currentAnnouncementHash);
    updateAnnouncementBadge(false);
}

async function loadAnnouncement() {
    if (window.location.protocol === 'file:') return;
    try {
        const response = await fetch('GONGGAO.md?t=' + Date.now());
        if (!response.ok) return;
        const content = await response.text();
        if (!content || !content.trim()) return;

        currentAnnouncementContent = content;
        currentAnnouncementHash = generateHash(content);

        const announcementCenterBtn = $('announcementCenterBtn');
        if (announcementCenterBtn) announcementCenterBtn.style.display = 'flex';

        const permanentlyClosedHash = localStorage.getItem('announcementPermanentlyClosed');
        if (permanentlyClosedHash === currentAnnouncementHash) {
            updateAnnouncementBadge(false);
            return;
        }
        const sessionClosedHash = sessionStorage.getItem('announcementSessionClosed');
        if (sessionClosedHash === currentAnnouncementHash) {
            updateAnnouncementBadge(false);
            return;
        }

        updateAnnouncementBadge(true);
        showAnnouncementModal();
    } catch {
        return;
    }
}

function openAnnouncementCenter() {
    if (currentAnnouncementContent) {
        showAnnouncementModal();
        return;
    }
    loadAnnouncement().then(() => {
        if (currentAnnouncementContent) showAnnouncementModal();
        else alert(currentLanguage === 'zh' ? '暂无公告' : 'No announcements');
    });
}

function setupPWAInstall() {
    const installPwaBtn = $('installPwaBtn');
    if (!installPwaBtn) return;

    window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault();
        deferredPrompt = e;
        installPwaBtn.style.display = 'block';
    });

    installPwaBtn.addEventListener('click', () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                installPwaBtn.style.display = 'none';
                localStorage.setItem('pwaInstalled', 'true');
            }
            deferredPrompt = null;
        });
    });

    window.addEventListener('appinstalled', () => {
        installPwaBtn.style.display = 'none';
        deferredPrompt = null;
    });
}

function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    if (window.location.protocol === 'file:') return;

    navigator.serviceWorker.register('sw.js').then(registration => {
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (!newWorker) return;

            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    const ask = currentLanguage === 'zh'
                        ? '发现新版本！是否立即刷新页面以获取最新内容？'
                        : 'New version available! Refresh the page to get the latest content?';
                    if (confirm(ask)) {
                        newWorker.postMessage({ type: 'SKIP_WAITING' });
                        window.location.reload();
                    }
                }
            });
        });

        setInterval(() => {
            registration.update();
        }, 5 * 60 * 1000);
    }).catch(() => {
        return;
    });
}

function bindEventListeners() {
    const languageSwitcher = $('languageSwitcher');
    if (languageSwitcher) languageSwitcher.addEventListener('click', switchLanguage);
    const themeSwitcher = $('themeSwitcher');
    if (themeSwitcher) themeSwitcher.addEventListener('click', toggleTheme);

    const toggleStudentsBtn = $('toggleStudentsBtn');
    if (toggleStudentsBtn) toggleStudentsBtn.addEventListener('click', toggleStudentManagement);

    const addStudentBtn = $('addStudentBtn');
    if (addStudentBtn) addStudentBtn.addEventListener('click', e => { e.stopPropagation(); addStudent(); });

    const studentName = $('studentName');
    if (studentName) {
        studentName.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                addStudent();
                e.stopPropagation();
            }
        });
    }

    const importBtn = $('importBtn');
    if (importBtn) importBtn.addEventListener('click', e => { e.stopPropagation(); importStudents(); });

    const importFileBtn = $('importFileBtn');
    if (importFileBtn) importFileBtn.addEventListener('click', e => { e.stopPropagation(); importFromFile(); });

    const clearStudentsBtn = $('clearStudentsBtn');
    if (clearStudentsBtn) clearStudentsBtn.addEventListener('click', e => { e.stopPropagation(); clearStudents(); });

    const feedbackBtn = $('feedbackBtn');
    if (feedbackBtn) feedbackBtn.addEventListener('click', e => { e.stopPropagation(); showEmailPrompt(); });

    const fileInput = $('fileInput');
    const fileInfo = $('fileInfo');
    if (fileInput && fileInfo) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                const file = this.files[0];
                const fileNameLabel = currentLanguage === 'zh' ? '文件名' : 'File name';
                const fileSizeLabel = currentLanguage === 'zh' ? '大小' : 'Size';
                const fileTypeLabel = currentLanguage === 'zh' ? '类型' : 'Type';
                const unknown = currentLanguage === 'zh' ? '未知' : 'Unknown';
                fileInfo.textContent = `${fileNameLabel}: ${file.name} | ${fileSizeLabel}: ${(file.size / 1024).toFixed(1)} KB | ${fileTypeLabel}: ${file.type || unknown}`;
            } else {
                fileInfo.textContent = '';
            }
        });
    }
}

function setupEasterEgg() {
    const eggButton = $('eggButton');
    const saved = parseInt(localStorage.getItem('eggClickCount') || '0', 10);
    if (eggButton && saved >= 5) eggButton.style.display = 'block';

    const easterEggTrigger = $('easterEggTrigger');
    if (!easterEggTrigger || !eggButton) return;
    let clickCount = 0;
    easterEggTrigger.addEventListener('click', () => {
        clickCount++;
        if (clickCount >= 5) {
            localStorage.setItem('eggClickCount', String(clickCount));
            eggButton.style.display = 'block';
            const message = currentLanguage === 'zh'
                ? '恭喜你解锁了彩蛋功能！点击顶部的"彩蛋"按钮查看惊喜。'
                : 'Congratulations on unlocking the easter egg! Click the "Easter Egg" button at the top to see the surprise.';
            alert(message);
        }
    });
}

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer || '';
    if (referrer.includes('linux.do') || urlParams.get('from') === 'linux.do') {
        localStorage.setItem('fromLinuxDo', 'true');
    }

    const browserLanguage = navigator.language || navigator.userLanguage;
    currentLanguage = browserLanguage && browserLanguage.startsWith('zh') ? 'zh' : 'en';
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage === 'zh' || savedLanguage === 'en') currentLanguage = savedLanguage;
    applyLanguage();

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    const themeSwitcher = $('themeSwitcher');
    if (themeSwitcher) {
        themeSwitcher.textContent = document.body.classList.contains('dark-mode')
            ? (currentLanguage === 'zh' ? '日间模式' : 'Light Mode')
            : (currentLanguage === 'zh' ? '黑夜模式' : 'Dark Mode');
    }

    if (StudentManager && typeof StudentManager.init === 'function') {
        StudentManager.init();
    }

    checkTeachersDay();
    loadAnnouncement();
    setupPWAInstall();
    registerServiceWorker();
    bindEventListeners();
    setupEasterEgg();
    renderStudentList();
    updateSummary();
}

window.navigateTo = navigateTo;
window.triggerEasterEgg = triggerEasterEgg;
window.closeDonationModal = closeDonationModal;
window.goToDonation = goToDonation;
window.openAnnouncementCenter = openAnnouncementCenter;
window.closeAnnouncementModal = closeAnnouncementModal;
window.permanentlyCloseAnnouncement = permanentlyCloseAnnouncement;
window.removeStudent = removeStudent;
window.clearStudents = clearStudents;
window.selectStudentForTracker = selectStudentForTracker;

window.addEventListener('load', init);
