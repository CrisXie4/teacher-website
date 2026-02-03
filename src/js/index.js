'use strict';

let deferredPrompt = null;

let donationShowCount = 0;

let currentAnnouncementContent = '';
let currentAnnouncementHash = '';

const donationConfig = {
    probability: 0.45,
    minInterval: 1800000,
    maxShowPerSession: 3,
    excludePages: ['src/pages/donation.html']
};

function $(id) {
    return document.getElementById(id);
}

function applyLanguage() {
    if (window.i18n && typeof window.i18n.applyLanguage === 'function') {
        window.i18n.applyLanguage();
    }
}

function switchLanguage() {
    if (window.i18n && typeof window.i18n.switchLanguage === 'function') {
        window.i18n.switchLanguage();
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeSwitcher = $('themeSwitcher');
    if (themeSwitcher) {
        const isDark = document.body.classList.contains('dark-mode');
        const key = isDark ? 'theme_light' : 'theme_dark';
        themeSwitcher.textContent = window.i18n ? window.i18n.getTranslation(key) : (isDark ? '日间模式' : '黑夜模式');
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
            const currentLanguage = window.i18n ? window.i18n.currentLanguage() : 'zh';
            const title = window.i18n ? window.i18n.getTranslation('teachers_day_title') : '教师节快乐！';
            const message = window.i18n ? window.i18n.getTranslation('teachers_day_message') : '祝您教师节快乐！感谢您对教育事业的无私奉献和辛勤付出。';
            alert(`${title}\n\n${message}`);
            localStorage.setItem('hasShownTeachersDay', 'true');
        }
    } else {
        localStorage.removeItem('hasShownTeachersDay');
    }
}

const SPRING_FESTIVAL_DATES = {
    2024: '02-10',
    2025: '01-29',
    2026: '02-17',
    2027: '02-06',
    2028: '01-26',
    2029: '02-13',
    2030: '02-03',
    2031: '01-23',
    2032: '02-11'
};

const SPRING_FESTIVAL_THEME_PRE_DAYS = 21;
const SPRING_FESTIVAL_THEME_POST_DAYS = 21;
const SPRING_FESTIVAL_GREETING_POST_DAYS = 21;

function applySpringFestivalTheme() {
    document.body.classList.add('spring-festival-theme');

    if (document.getElementById('spring-festival-decor')) return;

    const decor = document.createElement('div');
    decor.id = 'spring-festival-decor';
    decor.className = 'spring-festival-decor';

    const lanternLeft = document.createElement('div');
    lanternLeft.className = 'spring-festival-lantern left';
    lanternLeft.textContent = '🏮';

    const lanternRight = document.createElement('div');
    lanternRight.className = 'spring-festival-lantern right';
    lanternRight.textContent = '🏮';

    const coupletLeft = document.createElement('div');
    coupletLeft.className = 'spring-festival-couplet left';
    coupletLeft.textContent = '新春快乐';

    const coupletRight = document.createElement('div');
    coupletRight.className = 'spring-festival-couplet right';
    coupletRight.textContent = '阖家安康';

    decor.appendChild(lanternLeft);
    decor.appendChild(lanternRight);
    decor.appendChild(coupletLeft);
    decor.appendChild(coupletRight);

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
        const colors = ['#ffd700', '#ff5252', '#ffffff', '#ffb300'];
        for (let i = 0; i < 18; i++) {
            const piece = document.createElement('div');
            piece.className = 'spring-festival-confetti';
            const left = Math.random() * 100;
            const size = 6 + Math.random() * 7;
            const rot = Math.floor(Math.random() * 180) - 90;
            const delay = Math.random() * 3.5;
            const duration = 5.5 + Math.random() * 4;
            const color = colors[i % colors.length];
            piece.style.setProperty('--sf-left', `${left}%`);
            piece.style.setProperty('--sf-size', `${size}px`);
            piece.style.setProperty('--sf-rot', `${rot}deg`);
            piece.style.setProperty('--sf-delay', `${delay}s`);
            piece.style.setProperty('--sf-duration', `${duration}s`);
            piece.style.setProperty('--sf-color', color);
            decor.appendChild(piece);
        }
    }

    document.body.appendChild(decor);
}

function clearSpringFestivalTheme() {
    document.body.classList.remove('spring-festival-theme');
    const decor = document.getElementById('spring-festival-decor');
    if (decor) decor.remove();
}

function triggerSpringFestival() {
    applySpringFestivalTheme();
    setTimeout(() => {
        showSpringFestivalModal();
        launchFireworks();
    }, 300);
}

function setupSpringFestivalButton() {
    const btn = $('springFestivalBtn');
    if (!btn) return;

    const urlParams = new URLSearchParams(window.location.search);
    const isTest = urlParams.get('test_spring') === 'true';

    const yearTime = (typeof YEAR_TIME !== 'undefined' && YEAR_TIME)
        ? YEAR_TIME
        : (SPRING_FESTIVAL_DATES[new Date().getFullYear()] || '');

    if (!yearTime) {
        btn.style.display = isTest ? 'inline-flex' : 'none';
        return;
    }

    const [month, day] = String(yearTime).split('-').map(Number);
    if (!month || !day) {
        btn.style.display = isTest ? 'inline-flex' : 'none';
        return;
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const festivalDate = new Date(currentYear, month - 1, day);
    const themeStartDate = new Date(festivalDate);
    themeStartDate.setDate(festivalDate.getDate() - SPRING_FESTIVAL_THEME_PRE_DAYS);
    const themeEndDate = new Date(festivalDate);
    themeEndDate.setDate(festivalDate.getDate() + SPRING_FESTIVAL_THEME_POST_DAYS);

    now.setHours(0, 0, 0, 0);
    themeStartDate.setHours(0, 0, 0, 0);
    themeEndDate.setHours(0, 0, 0, 0);

    btn.style.display = (isTest || (now >= themeStartDate && now <= themeEndDate)) ? 'inline-flex' : 'none';
}

function checkSpringFestival() {
    const urlParams = new URLSearchParams(window.location.search);
    const isTest = urlParams.get('test_spring') === 'true';

    const yearTime = (typeof YEAR_TIME !== 'undefined' && YEAR_TIME)
        ? YEAR_TIME
        : (SPRING_FESTIVAL_DATES[new Date().getFullYear()] || '');

    if (!yearTime) {
        if (isTest) triggerSpringFestival();
        return;
    }

    const [month, day] = String(yearTime).split('-').map(Number);
    if (!month || !day) {
        if (isTest) triggerSpringFestival();
        return;
    }
    const now = new Date();
    const currentYear = now.getFullYear();

    const festivalDate = new Date(currentYear, month - 1, day);
    const themeStartDate = new Date(festivalDate);
    themeStartDate.setDate(festivalDate.getDate() - SPRING_FESTIVAL_THEME_PRE_DAYS);
    const themeEndDate = new Date(festivalDate);
    themeEndDate.setDate(festivalDate.getDate() + SPRING_FESTIVAL_THEME_POST_DAYS);

    const greetingEndDate = new Date(festivalDate);
    greetingEndDate.setDate(festivalDate.getDate() + SPRING_FESTIVAL_GREETING_POST_DAYS);
    
    // Set hours to ignore time of day for range check
    now.setHours(0, 0, 0, 0);
    festivalDate.setHours(0, 0, 0, 0);
    themeStartDate.setHours(0, 0, 0, 0);
    themeEndDate.setHours(0, 0, 0, 0);
    greetingEndDate.setHours(0, 0, 0, 0);

    console.log('[SpringFestival] Checking date:', now.toLocaleDateString());
    console.log('[SpringFestival] Festival:', festivalDate.toLocaleDateString());
    console.log('[SpringFestival] Theme Range:', themeStartDate.toLocaleDateString(), '-', themeEndDate.toLocaleDateString());
    console.log('[SpringFestival] Greeting Range:', festivalDate.toLocaleDateString(), '-', greetingEndDate.toLocaleDateString());

    if (isTest || (now >= themeStartDate && now <= themeEndDate)) {
        applySpringFestivalTheme();
    } else {
        clearSpringFestivalTheme();
    }

    if (isTest || (now >= festivalDate && now <= greetingEndDate)) {
        // Check if already shown in this session (ignore if testing)
        if (!isTest && sessionStorage.getItem('springFestivalShown')) {
            console.log('[SpringFestival] Already shown in this session');
            return;
        }
        
        console.log('[SpringFestival] Showing greeting!');
        // Short delay to ensure page is loaded
        setTimeout(() => {
            triggerSpringFestival();
            if (!isTest) sessionStorage.setItem('springFestivalShown', 'true');
        }, 1000);
    } else {
        console.log('[SpringFestival] Not in greeting range');
    }
}

function showSpringFestivalModal() {
    if (document.getElementById('spring-festival-modal-overlay')) return;

    // Inject styles
    if (!document.getElementById('spring-festival-style')) {
        const style = document.createElement('style');
        style.id = 'spring-festival-style';
        style.innerHTML = `
            .spring-festival-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.5s ease;
            }
            .spring-festival-modal {
                background: linear-gradient(135deg, #d32f2f, #b71c1c);
                color: #ffd700;
                padding: 2.5rem 2rem;
                border-radius: 20px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                max-width: 90%;
                width: 450px;
                border: 3px solid #ffd700;
                position: relative;
                animation: slideUp 0.5s ease;
            }
            .spring-festival-modal h2 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                font-family: "Microsoft YaHei", sans-serif;
            }
            .spring-festival-modal p {
                font-size: 1.3rem;
                color: #fff;
                margin-bottom: 2rem;
                line-height: 1.6;
            }
            .spring-festival-btn {
                background: linear-gradient(135deg, #ffd700, #ffb300);
                color: #d32f2f;
                border: none;
                padding: 0.8rem 2.5rem;
                font-size: 1.2rem;
                border-radius: 50px;
                cursor: pointer;
                font-weight: bold;
                transition: transform 0.2s;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            }
            .spring-festival-btn:hover {
                transform: scale(1.05);
            }
            .lantern {
                position: absolute;
                font-size: 3.5rem;
                top: -25px;
                filter: drop-shadow(0 5px 5px rgba(0,0,0,0.3));
            }
            .lantern-left { left: 15px; transform: rotate(-15deg); }
            .lantern-right { right: 15px; transform: rotate(15deg); }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Create Modal HTML
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'spring-festival-modal-overlay';
    modalOverlay.className = 'spring-festival-modal-overlay';
    
    modalOverlay.innerHTML = `
        <div class="spring-festival-modal">
            <div class="lantern lantern-left">🏮</div>
            <div class="lantern lantern-right">🏮</div>
            <h2>春节快乐！！</h2>
            <p>祝您新春大吉，阖家欢乐！<br>愿新的一年桃李满天下！</p>
            <button class="spring-festival-btn" onclick="closeSpringFestivalModal(this)">收下祝福</button>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    window.closeSpringFestivalModal = function(btn) {
        const overlay = btn.closest('.spring-festival-modal-overlay');
        overlay.style.transition = 'opacity 0.5s ease';
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 500);
    };
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
        const noStudentsText = window.i18n ? window.i18n.getTranslation('no_students') : '暂无学生，请添加学生';
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

        const deleteText = window.i18n ? window.i18n.getTranslation('error').replace('error', '删除').replace('Error', 'Delete') : '删除'; // Fallback to delete
        // Actually I should have a 'delete' key. Let's add it.
        const delKey = 'confirm_delete_student'; // We'll use this for the button text too for now or add a 'delete' key.
        const delBtnText = window.i18n ? (window.i18n.currentLanguage() === 'zh' ? '删除' : 'Delete') : '删除';

        if (fromOtherTool && fromTracker) {
            const selectText = window.i18n ? (window.i18n.currentLanguage() === 'zh' ? '选择' : 'Select') : '选择';
            studentItem.innerHTML = `${studentInfo}
                <button class="btn" onclick="selectStudentForTracker(${index})" style="padding: 0.5rem 1rem; font-size: 0.9rem;">${selectText}</button>
                <button class="remove-student" onclick="removeStudent(${index})">${delBtnText}</button>`;
        } else {
            studentItem.innerHTML = `${studentInfo}
                <button class="remove-student" onclick="removeStudent(${index})">${delBtnText}</button>`;
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
        const title = window.i18n ? window.i18n.getTranslation('notice') : '提示';
        const msg = window.i18n ? window.i18n.getTranslation('please_input_student_name') : '请输入学生姓名';
        showCustomModal(title, msg);
        return;
    }

    addStudentBtn.disabled = true;
    const addingText = window.i18n ? (window.i18n.currentLanguage() === 'zh' ? '添加中...' : 'Adding...') : '添加中...';
    addStudentBtn.textContent = addingText;

    const ok = StudentManager.addStudent({ id, name });
    if (ok) {
        renderStudentList();
        updateSummary();
        if (studentId) studentId.value = '';
        studentName.value = '';
        studentName.focus();
        addStudentBtn.disabled = false;
        addStudentBtn.textContent = window.i18n ? window.i18n.getTranslation('add_student') : '添加学生';
    } else {
        const title = window.i18n ? window.i18n.getTranslation('notice') : '提示';
        const msg = window.i18n ? window.i18n.getTranslation('student_exists') : '学生已存在（学号或姓名重复）';
        showCustomModal(title, msg);
        addStudentBtn.disabled = false;
        addStudentBtn.textContent = window.i18n ? window.i18n.getTranslation('add_student') : '添加学生';
    }
}

function importStudents() {
    const csvInput = $('csvInput');
    const importBtn = $('importBtn');
    if (!csvInput || !importBtn) return;

    const csvText = csvInput.value.trim();
    if (!csvText) {
        const title = window.i18n ? window.i18n.getTranslation('notice') : '提示';
        const msg = window.i18n ? (window.i18n.currentLanguage() === 'zh' ? '请输入CSV数据' : 'Please enter CSV data') : '请输入CSV数据';
        showCustomModal(title, msg);
        return;
    }

    importBtn.disabled = true;
    const importingText = window.i18n ? (window.i18n.currentLanguage() === 'zh' ? '导入中...' : 'Importing...') : '导入中...';
    importBtn.textContent = importingText;

    try {
        const students = StudentManager.parseCSV(csvText);
        if (!students.length) {
            const title = window.i18n ? window.i18n.getTranslation('notice') : '提示';
            const msg = window.i18n ? window.i18n.getTranslation('no_valid_data') : '未解析到有效学生数据';
            showCustomModal(title, msg);
            return;
        }
        const addedCount = StudentManager.addStudents(students);
        renderStudentList();
        updateSummary();
        csvInput.value = '';
        const title = window.i18n ? window.i18n.getTranslation('success') : '成功';
        const msg = window.i18n ? window.i18n.getTranslation('import_success').replace('{count}', addedCount) : `成功导入 ${addedCount} 名学生`;
        showCustomModal(title, msg);
    } catch (e) {
        const title = window.i18n ? window.i18n.getTranslation('error') : '错误';
        const msg = window.i18n ? window.i18n.getTranslation('import_failed').replace('{error}', e.message) : `导入失败：${e.message}`;
        showCustomModal(title, msg);
    } finally {
        importBtn.disabled = false;
        importBtn.textContent = window.i18n ? window.i18n.getTranslation('import_csv') : '导入CSV';
    }
}

function importFromFile() {
    const fileInput = $('fileInput');
    const importFileBtn = $('importFileBtn');
    const fileInfo = $('fileInfo');
    if (!fileInput || !importFileBtn) return;

    const file = fileInput.files && fileInput.files[0];
    if (!file) {
        const title = window.i18n ? window.i18n.getTranslation('notice') : '提示';
        const msg = window.i18n ? window.i18n.getTranslation('select_file') : '请选择一个文件';
        showCustomModal(title, msg);
        return;
    }

    const lowerName = file.name.toLowerCase();
    if (!lowerName.endsWith('.csv') && !lowerName.endsWith('.txt') && !lowerName.endsWith('.json')) {
        const title = window.i18n ? window.i18n.getTranslation('error') : '错误';
        const msg = window.i18n ? window.i18n.getTranslation('file_format_not_supported') : '文件格式不支持，请使用CSV、TXT或JSON格式的文件';
        showCustomModal(title, msg);
        fileInput.value = '';
        if (fileInfo) fileInfo.textContent = '';
        return;
    }

    const lang = window.i18n ? window.i18n.currentLanguage() : 'zh';
    const fileNameLabel = lang === 'zh' ? '文件名' : 'File name';
    const fileSizeLabel = lang === 'zh' ? '大小' : 'Size';
    const fileTypeLabel = lang === 'zh' ? '类型' : 'Type';
    const unknown = lang === 'zh' ? '未知' : 'Unknown';
    if (fileInfo) {
        fileInfo.textContent = `${fileNameLabel}: ${file.name} | ${fileSizeLabel}: ${(file.size / 1024).toFixed(1)} KB | ${fileTypeLabel}: ${file.type || unknown}`;
    }

    importFileBtn.disabled = true;
    const importingText = window.i18n ? (window.i18n.currentLanguage() === 'zh' ? '导入中...' : 'Importing...') : '导入中...';
    importFileBtn.textContent = importingText;

    const reader = new FileReader();
    reader.onload = e => {
        try {
            const content = String(e.target.result || '');
            const students = lowerName.endsWith('.json') ? StudentManager.parseJSON(content) : StudentManager.parseCSV(content);
            if (!students.length) {
                const title = window.i18n ? window.i18n.getTranslation('notice') : '提示';
                const msg = window.i18n ? window.i18n.getTranslation('no_valid_data') : '未解析到有效学生数据';
                showCustomModal(title, msg);
                return;
            }
            const addedCount = StudentManager.addStudents(students);
            renderStudentList();
            updateSummary();
            fileInput.value = '';
            if (fileInfo) fileInfo.textContent = '';
            const title = window.i18n ? window.i18n.getTranslation('success') : '成功';
            const msg = window.i18n ? window.i18n.getTranslation('import_success').replace('{count}', addedCount) : `成功导入 ${addedCount} 名学生`;
            showCustomModal(title, msg);
        } catch (err) {
            const title = window.i18n ? window.i18n.getTranslation('error') : '错误';
            const msg = window.i18n ? window.i18n.getTranslation('import_failed').replace('{error}', err.message) : `导入失败：${err.message}`;
            showCustomModal(title, msg);
        } finally {
            importFileBtn.disabled = false;
            importFileBtn.textContent = window.i18n ? window.i18n.getTranslation('import_file') : '导入文件';
        }
    };
    reader.readAsText(file, 'UTF-8');
}

function removeStudent(index) {
    const title = window.i18n ? window.i18n.getTranslation('confirm') : '确认删除';
    const msg = window.i18n ? window.i18n.getTranslation('confirm_delete_student') : '确定要删除这个学生吗？';
    showConfirmModal(title, msg, () => {
        StudentManager.removeStudent(index);
        renderStudentList();
        updateSummary();
    });
}

function clearStudents() {
    const title = window.i18n ? window.i18n.getTranslation('confirm') : '确认清空';
    const msg = window.i18n ? window.i18n.getTranslation('confirm_clear_students') : '确定要清空所有学生吗？';
    showConfirmModal(title, msg, () => {
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
        const title = window.i18n ? window.i18n.getTranslation('error') : '错误';
        const msg = window.i18n ? window.i18n.getTranslation('select_student_failed') : '选择学生失败，请重试';
        showCustomModal(title, msg);
    }
}

function toggleStudentManagement(event) {
    const container = document.querySelector('.student-management-container');
    const toggleBtn = $('toggleStudentsBtn');
    if (!container || !toggleBtn) return;

    const isHidden = container.classList.contains('hidden');
    if (isHidden) {
        container.classList.remove('hidden');
        toggleBtn.textContent = window.i18n ? window.i18n.getTranslation('hide_student_management') : '隐藏学生管理';
        renderStudentList();
    } else {
        container.classList.add('hidden');
        toggleBtn.textContent = window.i18n ? window.i18n.getTranslation('manage_students') : '管理学生信息';
    }

    if (event && event.stopPropagation) event.stopPropagation();
}

function showEmailPrompt() {
    const email = 'crisweiming@hotmail.com';
    const lang = window.i18n ? window.i18n.currentLanguage() : 'zh';
    const message1 = lang === 'zh' ? '请发送邮件至：' : 'Please send email to: ';
    const message2 = lang === 'zh' ? '我们非常期待您的宝贵意见！' : 'We look forward to your valuable feedback!';
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

    if (window.i18n && window.i18n.currentLanguage() === 'zh') {
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
        const lang = window.i18n ? window.i18n.currentLanguage() : 'zh';
        let message = lang === 'zh'
            ? '请在下方学生列表中添加或选择学生'
            : 'Please add or select students from the list below';
        if (fromTracker) {
            message = lang === 'zh'
                ? '请在下方学生列表中选择要记录表现的学生'
                : 'Please select a student to track performance from the list below';
        } else if (fromRollCall) {
            message = lang === 'zh'
                ? '请在下方学生列表中添加学生，然后返回随机点名器'
                : 'Please add students to the list below, then return to the roll call tool';
        } else if (fromGrouping) {
            message = lang === 'zh'
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
        const currentLang = window.i18n ? window.i18n.currentLanguage() : 'zh';
        const list = messages[currentLang] || messages.zh;
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
    if (window.i18n && window.i18n.currentLanguage() === 'zh') {
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
        else alert(window.i18n && window.i18n.currentLanguage() === 'zh' ? '暂无公告' : 'No announcements');
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
        // 自动更新检查
        setInterval(() => {
            registration.update();
        }, 60 * 60 * 1000); // 每小时检查一次

        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (!newWorker) return;

            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('[SW] New version available.');
                    // 不再自动弹窗刷新，避免无限循环。
                    // 可以在这里添加一个 UI 提示，让用户手动点击刷新。
                    // 目前仅记录日志，由用户下次访问时自动生效（如果 sw.js skipWaiting 被移除）
                    // 或者如果 sw.js 保留 skipWaiting，用户下次刷新即可。
                    
                    // 如果需要强制更新，可以使用非阻塞的 Toast 提示
                    // showToast('发现新版本，请刷新页面', () => window.location.reload());
                }
            });
        });
    }).catch(err => {
        console.log('[SW] Registration failed:', err);
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
                const currentLang = window.i18n ? window.i18n.currentLanguage() : 'zh';
                const fileNameLabel = currentLang === 'zh' ? '文件名' : 'File name';
                const fileSizeLabel = currentLang === 'zh' ? '大小' : 'Size';
                const fileTypeLabel = currentLang === 'zh' ? '类型' : 'Type';
                const unknown = currentLang === 'zh' ? '未知' : 'Unknown';
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
            const currentLang = window.i18n ? window.i18n.currentLanguage() : 'zh';
            const message = currentLang === 'zh'
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

    applyLanguage();

    setupSpringFestivalButton();

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    const themeSwitcher = $('themeSwitcher');
    if (themeSwitcher) {
        const currentLang = window.i18n ? window.i18n.currentLanguage() : 'zh';
        themeSwitcher.textContent = document.body.classList.contains('dark-mode')
            ? (currentLang === 'zh' ? '日间模式' : 'Light Mode')
            : (currentLang === 'zh' ? '黑夜模式' : 'Dark Mode');
    }

   if (StudentManager && typeof StudentManager.init === 'function') {
        StudentManager.init();
    }

    checkSpringFestival(); // 自动检查
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
window.checkSpringFestival = checkSpringFestival;
window.triggerSpringFestival = triggerSpringFestival;
window.showSpringFestivalModal = showSpringFestivalModal;

window.addEventListener('load', init);
