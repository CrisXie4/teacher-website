'use strict';

(function () {
    const languages = {
        zh: {
            notice: '提示',
            success: '成功',
            error: '错误',
            confirm: '确定',
            cancel: '取消',
            back_to_home: '→ 返回首页',
            site_title: '教师工具箱',
            site_subtitle: '专为教师设计的实用工具集合',
            footer_text: '© 2025 教师工具箱 - 专为教师设计',
            theme_dark: '黑夜模式',
            theme_light: '日间模式',
            use_now: '立即使用',
            support_now: '前往支持',
            announcement_center: '公告',
            hero_eyebrow: 'CLASSROOM OPERATING SYSTEM',
            hero_description: '一套面向真实课堂场景的轻量工作台，把互动、演示、生成、管理这些高频动作整理到同一个入口里。',
            hero_tag_1: '课堂互动',
            hero_tag_2: '教学演示',
            hero_tag_3: '班级管理',
            hero_primary_cta: '开始选工具',
            hero_secondary_cta: '管理学生名单',
            hero_console_kicker: '今日课堂工作台',
            hero_console_title: '把常用动作放到手边',
            hero_metric_tools: '教学工具',
            hero_metric_zones: '场景分区',
            hero_metric_device: '多端可用',
            hero_item_1_title: '先找课堂节奏工具',
            hero_item_1_desc: '点名、分组、计时、时钟放在第一屏。',
            hero_item_2_title: '再进教学演示区',
            hero_item_2_desc: '白板、课堂记录、手写与图表生成集中管理。',
            hero_item_3_title: '最后处理名单与反馈',
            hero_item_3_desc: '学生数据在首页直接维护，不用来回跳转。',
            search_eyebrow: '快速检索',
            search_title: '直接搜工具名称或用途',
            search_meta_default: '当前共 16 个工具',
            quick_chip_rollcall: '随机点名',
            quick_chip_timer: '课堂计时',
            quick_chip_whiteboard: '电子白板',
            quick_chip_grouping: '快速分组',
            quick_chip_clock: '全屏时钟',
            quick_chip_sound: '声音检测',
            quick_chip_game: '课堂游戏',
            feature_1_eyebrow: '互动',
            feature_1_title: '把课堂节奏放在前台',
            feature_1_desc: '把点名、分组、计时、声音监测整理成一套顺手的启动区，开课就能用。',
            feature_2_eyebrow: '演示',
            feature_2_title: '演示与生成分层清楚',
            feature_2_desc: '白板、图表、手写、题目生成器统一放到教学制作区，不再四处找入口。',
            feature_3_eyebrow: '管理',
            feature_3_title: '首页就能维护学生数据',
            feature_3_desc: '名单录入、批量导入、文件导入和汇总都在同一块区域，适合直接备课时处理。',
            tools_eyebrow: '工具目录',
            tools_title: '按课堂场景重新组织',
            tools_subtitle: '不按原来的顺序堆卡片，改成更接近日常使用路径的四个分区。',
            category_interactive: '课堂互动与节奏',
            category_interactive_desc: '开课即用，高频、快触达。',
            category_teaching: '教学演示与记录',
            category_teaching_desc: '讲解、展示、记录在一个工作区。',
            category_subject: '学科生成与素材',
            category_subject_desc: '适合备课、练习单与课堂素材制作。',
            category_system: '支持与服务',
            category_system_desc: '围绕站点使用本身的补充入口。',
            workspace_eyebrow: '学生数据',
            workspace_title: '把名单管理也收进首页',
            workspace_subtitle: '点名、分组、课堂记录都依赖学生数据，这里直接维护，减少重复录入。',
            student_management_eyebrow: '名单工作台',
            student_management_note: '支持手动录入、CSV 粘贴和文件导入。',
            instructions_eyebrow: '使用建议',
            instructions_intro: '建议按这个顺序使用首页，启动更快，也更不容易漏操作。',
            instruction_1_title: '先维护学生名单',
            instruction_1_desc: '在首页录入或导入学生数据，点名、分组和课堂记录会直接复用。',
            instruction_2_title: '再按场景选择工具',
            instruction_2_desc: '互动区适合开课使用，演示区适合讲解，学科区适合备课与生成。',
            instruction_3_title: '用搜索代替翻找',
            instruction_3_desc: '直接输入“计时”“白板”“分组”等关键词，可以更快定位入口。',
            instruction_4_title: '用状态和反馈维持可用性',
            instruction_4_desc: '如果发现异常，先检查网站状态，再通过反馈入口提交问题。',
            card_chip_live: '实时',
            card_chip_hot: '高频',
            card_chip_focus: '节奏',
            card_chip_display: '展示',
            card_chip_fast: '快速',
            card_chip_team: '团队',
            card_chip_draw: '演示',
            card_chip_data: '记录',
            card_chip_visual: '可视化',
            card_chip_camera: '投屏',
            card_chip_admin: '后台',
            card_chip_generate: '生成',
            card_chip_practice: '练习',
            card_chip_model: '模型',
            card_chip_reference: '参考',
            card_chip_service: '服务',
            card_chip_support: '支持',
            classroom_game_title: '课堂互动游戏',
            classroom_game_desc: '随机出题、倒计时与积分榜，快速提升课堂互动',
            teachers_day_title: '教师节快乐！',
            teachers_day_message: '祝您教师节快乐！感谢您对教育事业的辛勤付出。',
            import_success: '成功导入 {count} 名学生',
            import_failed: '导入失败：{error}',
            tool_search_label: '搜索工具',
            tool_search_placeholder: '搜索工具，例如计时、点名、白板',
            tool_search_clear: '清除',
            tool_search_no_result: '未找到匹配工具，请换一个关键词',
            student_management: '学生管理',
            student_id_placeholder: '学号（可选）',
            student_name_placeholder: '学生姓名',
            add_student: '添加学生',
            batch_import_title: '批量导入（CSV 格式：学号,姓名）',
            csv_example: '例如：\n2021001,张三\n2021002,李四',
            import_csv: '导入 CSV',
            file_import_title: '文件导入（支持 CSV、TXT、JSON）',
            import_file: '导入文件',
            clear_students: '清空学生列表',
            no_students: '暂无学生，请添加学生',
            total_students: '总学生数',
            suggested_groups: '建议分组数',
            manage_students: '管理学生信息',
            hide_student_management: '隐藏学生管理',
            feedback: '反馈建议',
            instructions: '使用说明',
            install_pwa: '安装应用',
            spring_festival: '春节',
            egg: '彩蛋',
            donation_modal_title: '喜欢这个工具吗？',
            donation_modal_message: '如果这些工具对您的教学有帮助，欢迎支持作者继续维护与开发。',
            donation_modal_btn: '去支持一下',
            donation_modal_later: '下次再说',
            donation_modal_tip: '你的支持会让这个项目更新得更稳定。',
            website_status_online: '网站状态正常',
            website_status_unavailable: '暂时无法获取网站状态',
            website_status_http_error: '状态接口返回错误',
            website_status_timeout: '请求超时，请稍后重试。',
            website_status_empty: '接口已响应，但没有返回详细内容。',
            please_input_student_name: '请输入学生姓名',
            student_exists: '学生已存在（学号或姓名重复）',
            select_file: '请选择文件',
            file_format_not_supported: '不支持的文件格式，请使用 CSV、TXT 或 JSON。',
            no_valid_data: '未解析到有效学生数据',
            confirm_delete_student: '确定要删除这名学生吗？',
            confirm_clear_students: '确定要清空所有学生吗？',
            select_student_failed: '选择学生失败，请重试',
            clock_date_format: '{year}年{month}月{date}日',
            weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },
        en: {
            // Common
            notice: 'Notice',
            success: 'Success',
            error: 'Error',
            confirm: 'OK',
            cancel: 'Cancel',
            back_to_home: '→ Back to Home',
            site_title: 'Teacher Toolkit',
            site_subtitle: 'A collection of practical tools designed for teachers',
            footer_text: '© 2025 Teacher Toolkit - Designed for Teachers',
            hero_eyebrow: 'CLASSROOM OPERATING SYSTEM',
            hero_description: 'A lightweight workspace for real classroom use, bringing interaction, presentation, generation, and management into one clear entry point.',
            hero_tag_1: 'Classroom Flow',
            hero_tag_2: 'Teaching Demo',
            hero_tag_3: 'Student Data',
            hero_primary_cta: 'Browse Tools',
            hero_secondary_cta: 'Manage Students',
            hero_console_kicker: 'Today\'s Classroom Workspace',
            hero_console_title: 'Keep common actions within reach',
            hero_metric_tools: 'Teaching Tools',
            hero_metric_zones: 'Use Zones',
            hero_metric_device: 'Multi-device',
            hero_item_1_title: 'Start with classroom flow tools',
            hero_item_1_desc: 'Roll call, grouping, timer, and clock stay on the first screen.',
            hero_item_2_title: 'Move into the teaching area',
            hero_item_2_desc: 'Whiteboard, tracking, handwriting, and charts are grouped together.',
            hero_item_3_title: 'Handle student data last',
            hero_item_3_desc: 'Student records can be maintained right on the homepage.',
            search_eyebrow: 'Quick Search',
            search_title: 'Search by tool name or task',
            search_meta_default: '16 tools available right now',
            quick_chip_rollcall: 'Roll Call',
            quick_chip_timer: 'Timer',
            quick_chip_whiteboard: 'Whiteboard',
            quick_chip_grouping: 'Grouping',
            quick_chip_clock: 'Fullscreen Clock',
            quick_chip_sound: 'Sound Detector',
            quick_chip_game: 'Classroom Game',
            feature_1_eyebrow: 'Interaction',
            feature_1_title: 'Put classroom rhythm upfront',
            feature_1_desc: 'Roll call, grouping, timer, and sound monitoring are arranged as a fast launch zone for the start of class.',
            feature_2_eyebrow: 'Presentation',
            feature_2_title: 'Separate demo from generation',
            feature_2_desc: 'Whiteboard, charts, handwriting, and worksheet generators sit in one production-focused area.',
            feature_3_eyebrow: 'Management',
            feature_3_title: 'Maintain student data on the homepage',
            feature_3_desc: 'Manual entry, batch import, file import, and summary stay in the same place for prep work.',
            tools_eyebrow: 'Directory',
            tools_title: 'Reorganized by classroom scenario',
            tools_subtitle: 'Instead of the old card pile, the homepage now follows a more realistic teaching workflow.',
            category_interactive: 'Interaction and Timing',
            category_interactive_desc: 'High-frequency tools for the start of class.',
            category_teaching: 'Presentation and Tracking',
            category_teaching_desc: 'Keep explanation, display, and records in one area.',
            category_subject: 'Subject Generators and Materials',
            category_subject_desc: 'Designed for prep, practice sheets, and teaching assets.',
            category_system: 'Support and Services',
            category_system_desc: 'Supplementary entrances around site usage itself.',
            workspace_eyebrow: 'Student Data',
            workspace_title: 'Keep roster management on the homepage',
            workspace_subtitle: 'Roll call, grouping, and classroom tracking all depend on student data, so manage it here once.',
            student_management_eyebrow: 'Roster Workspace',
            student_management_note: 'Supports manual entry, pasted CSV, and file import.',
            instructions_eyebrow: 'Usage Flow',
            instructions_intro: 'This order keeps the homepage faster to use and reduces missed steps.',
            instruction_1_title: 'Maintain the roster first',
            instruction_1_desc: 'Add or import students on the homepage so roll call, grouping, and tracking can reuse the same data.',
            instruction_2_title: 'Choose tools by scenario',
            instruction_2_desc: 'The interaction area is for live teaching, the teaching area is for explanation, and the subject area is for preparation.',
            instruction_3_title: 'Search instead of scanning',
            instruction_3_desc: 'Type keywords like timer, whiteboard, or grouping to reach the right entry faster.',
            instruction_4_title: 'Use status and feedback to keep it stable',
            instruction_4_desc: 'If something feels wrong, check site status first and then submit feedback from the homepage.',
            card_chip_live: 'Live',
            card_chip_hot: 'Core',
            card_chip_focus: 'Pacing',
            card_chip_display: 'Display',
            card_chip_fast: 'Fast',
            card_chip_team: 'Teams',
            card_chip_draw: 'Explain',
            card_chip_data: 'Records',
            card_chip_visual: 'Visual',
            card_chip_camera: 'Casting',
            card_chip_admin: 'Admin',
            card_chip_generate: 'Generate',
            card_chip_practice: 'Practice',
            card_chip_model: 'Model',
            card_chip_reference: 'Reference',
            card_chip_service: 'Service',
            card_chip_support: 'Support',

            // Home
            sound_detector_title: 'Sound Detector',
            sound_detector_desc: 'Monitor ambient volume in real time',
            roll_call_title: 'Random Roll Call',
            roll_call_desc: 'Randomly pick students to answer',
            timer_title: 'Classroom Timer',
            timer_desc: 'Manage activity time in class',
            clock_title: 'Fullscreen Clock',
            clock_desc: 'Large classroom clock with multiple modes',
            grouping_title: 'Group Generator',
            grouping_desc: 'Group students quickly and fairly',
            whiteboard_title: 'Digital Whiteboard',
            whiteboard_desc: 'Online drawing and presentation',
            tracker_title: 'Classroom Tracker',
            tracker_desc: 'Track class participation',
            copybook_title: 'Copybook Generator',
            copybook_desc: 'Generate handwriting practice sheets',
            math_title: 'Math Generator',
            math_desc: 'Generate custom math worksheets',
            '3d_viewer_title': '3D Object Viewer',
            '3d_viewer_desc': 'Create and view 3D objects',
            periodic_table_title: 'Periodic Table',
            periodic_table_desc: 'Interactive periodic table',
            chart_generator_title: 'Chart Generator',
            chart_generator_desc: 'Build charts from your data',
            teacher_camera_title: 'Teacher Camera',
            teacher_camera_desc: 'Cast mobile camera to desktop',
            analytics_title: 'Analytics',
            analytics_desc: 'View traffic trends',
            analytics_open: 'Open Dashboard',
            website_status_title: 'Website Status',
            website_status_desc: 'Check if service is online',
            website_status_check: 'Check Status',
            donation_title: 'Support Donation',
            donation_desc: 'Support ongoing maintenance',
            classroom_game_title: 'Classroom Interactive Game',
            classroom_game_desc: 'Random prompts, countdown, and live team scoring',

            // Generic controls
            tool_search_label: 'Search tools',
            tool_search_placeholder: 'Search tools (e.g. timer, roll call, whiteboard)',
            tool_search_clear: 'Clear',
            tool_search_no_result: 'No tools matched. Try another keyword.',
            student_management: 'Student Management',
            student_id_placeholder: 'Student ID (optional)',
            student_name_placeholder: 'Student Name',
            add_student: 'Add Student',
            batch_import_title: 'Batch Import (CSV: ID,Name)',
            csv_example: 'Example:\n2021001,John\n2021002,Jane',
            import_csv: 'Import CSV',
            file_import_title: 'File Import (CSV/TXT/JSON)',
            import_file: 'Import File',
            clear_students: 'Clear Student List',
            no_students: 'No students, please add students',
            total_students: 'Total Students',
            suggested_groups: 'Suggested Groups',
            manage_students: 'Manage Students',
            hide_student_management: 'Hide Student Management',
            feedback: 'Feedback',
            instructions: 'Instructions',
            install_pwa: 'Install App',
            spring_festival: 'Spring Festival',
            egg: 'Easter Egg',
            announcement_center: 'Announcement',

            // Modal
            donation_modal_title: 'Do you like this tool?',
            donation_modal_message: 'If these tools help your teaching, consider supporting us.',
            donation_modal_btn: 'Go support',
            donation_modal_later: 'Maybe later',
            donation_modal_tip: 'Your support keeps this project improving.',

            // Status and alerts
            website_status_online: 'Website status is healthy',
            website_status_unavailable: 'Unable to fetch website status right now',
            website_status_http_error: 'Status endpoint returned an error',
            website_status_timeout: 'Request timed out. Please try again later.',
            website_status_empty: 'Endpoint responded, but no details were returned.',
            please_input_student_name: 'Please enter student name',
            student_exists: 'Student already exists (duplicate ID or name)',
            import_success: 'Successfully imported {count} students',
            import_failed: 'Import failed: {error}',
            select_file: 'Please select a file',
            file_format_not_supported: 'Unsupported file format. Use CSV, TXT, or JSON.',
            no_valid_data: 'No valid student data parsed',
            confirm_delete_student: 'Are you sure you want to delete this student?',
            confirm_clear_students: 'Are you sure you want to clear all students?',
            select_student_failed: 'Failed to select student, please retry',
            teachers_day_title: 'Happy Teacher\'s Day!',
            teachers_day_message: 'Thank you for your dedication to education.',

            // Clock and timer
            minutes: 'Minutes',
            seconds: 'Seconds',
            timer_countdown: 'Countdown Timer',
            timer_start: 'Start',
            timer_pause: 'Pause',
            timer_reset: 'Reset',
            timer_fullscreen: 'Fullscreen',
            timer_exit_fullscreen: 'Exit Fullscreen',
            clock_format_12: '12-Hour',
            clock_format_24: '24-Hour',
            clock_hide_seconds: 'Hide Seconds',
            clock_show_seconds: 'Show Seconds',
            clock_enter_fullscreen: 'Fullscreen',
            clock_exit_fullscreen: 'Exit Fullscreen',
            clock_date_format: '{month}/{date}/{year}',
            weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            // Roll call and sound detector
            no_history_record: 'No history records',
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
            sound_detector_log_threshold: 'Threshold set to {threshold}%'
        }
    };

    languages.es = {
        ...languages.en,
        site_title: 'Kit de Herramientas Docentes',
        site_subtitle: 'Una coleccion de herramientas practicas para docentes',
        classroom_game_title: 'Juego Interactivo de Clase',
        classroom_game_desc: 'Retos aleatorios, cuenta regresiva y marcador por equipos',
        use_now: 'Usar Ahora',
        support_now: 'Ir a Apoyar',
        announcement_center: 'Anuncios',
        tool_search_label: 'Buscar herramientas',
        tool_search_placeholder: 'Buscar herramientas (ej.: temporizador, lista, pizarra)',
        tool_search_no_result: 'No hay coincidencias. Prueba otra palabra.',
        theme_dark: 'Modo Oscuro',
        theme_light: 'Modo Claro',
        install_pwa: 'Instalar App',
        back_to_home: '→ Volver al Inicio'
    };

    languages.fr = {
        ...languages.en,
        site_title: 'Boite a Outils Enseignant',
        site_subtitle: 'Collection d outils pratiques pour les enseignants',
        classroom_game_title: 'Jeu Interactif en Classe',
        classroom_game_desc: 'Questions aleatoires, compte a rebours et score en direct',
        use_now: 'Utiliser',
        support_now: 'Soutenir',
        announcement_center: 'Annonces',
        tool_search_label: 'Rechercher des outils',
        tool_search_placeholder: 'Rechercher des outils (ex.: minuteur, appel, tableau)',
        tool_search_no_result: 'Aucun outil trouve. Essayez un autre mot.',
        theme_dark: 'Mode Sombre',
        theme_light: 'Mode Clair',
        install_pwa: 'Installer App',
        back_to_home: '→ Retour a l accueil'
    };

    const languageOrder = ['zh', 'en', 'es', 'fr'];
    const languageLabels = {
        zh: '中文',
        en: 'English',
        es: 'Español',
        fr: 'Français'
    };

    function detectDefaultLanguage() {
        const browserLang = (navigator.language || '').toLowerCase();
        if (browserLang.startsWith('zh')) return 'zh';
        if (browserLang.startsWith('es')) return 'es';
        if (browserLang.startsWith('fr')) return 'fr';
        return 'en';
    }

    function normalizeLanguage(lang) {
        return languageOrder.includes(lang) ? lang : detectDefaultLanguage();
    }

    let currentLanguage = normalizeLanguage(localStorage.getItem('preferredLanguage') || '');

    function humanizeKey(key) {
        return String(key || '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }

    function resolveForDom(key) {
        const currentLangData = languages[currentLanguage] || {};
        if (Object.prototype.hasOwnProperty.call(currentLangData, key) && currentLangData[key] !== undefined) {
            return currentLangData[key];
        }

        if (currentLanguage !== 'zh') {
            const fallbackEn = languages.en || {};
            if (Object.prototype.hasOwnProperty.call(fallbackEn, key) && fallbackEn[key] !== undefined) {
                return fallbackEn[key];
            }
        }

        return null;
    }

    function resolveForScript(key) {
        const currentLangData = languages[currentLanguage] || {};
        if (Object.prototype.hasOwnProperty.call(currentLangData, key) && currentLangData[key] !== undefined) {
            return currentLangData[key];
        }

        const fallbackEn = languages.en || {};
        if (Object.prototype.hasOwnProperty.call(fallbackEn, key) && fallbackEn[key] !== undefined) {
            return fallbackEn[key];
        }

        return humanizeKey(key);
    }

    function applyLanguage() {
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            const val = resolveForDom(key);

            if (el.dataset.i18nDefaultText === undefined) {
                el.dataset.i18nDefaultText = el.innerHTML;
            }

            if (val !== null) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = val;
                } else {
                    el.innerHTML = val;
                }
            } else if (el.dataset.i18nDefaultText !== undefined && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
                el.innerHTML = el.dataset.i18nDefaultText;
            }
        });

        document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
            const key = el.getAttribute('data-lang-placeholder');
            const val = resolveForDom(key);

            if (el.dataset.i18nDefaultPlaceholder === undefined) {
                el.dataset.i18nDefaultPlaceholder = el.placeholder || '';
            }

            if (val !== null) {
                el.placeholder = val;
            } else if (el.dataset.i18nDefaultPlaceholder !== undefined) {
                el.placeholder = el.dataset.i18nDefaultPlaceholder;
            }
        });

        document.querySelectorAll('[data-lang-title]').forEach(el => {
            const key = el.getAttribute('data-lang-title');
            const val = resolveForDom(key);

            if (el.dataset.i18nDefaultTitle === undefined) {
                el.dataset.i18nDefaultTitle = el.title || '';
            }

            if (val !== null) {
                el.title = val;
            } else if (el.dataset.i18nDefaultTitle !== undefined) {
                el.title = el.dataset.i18nDefaultTitle;
            }
        });

        const headTitle = document.querySelector('title[data-lang]');
        if (headTitle) {
            const key = headTitle.getAttribute('data-lang');
            if (headTitle.dataset.i18nDefaultTitle === undefined) {
                headTitle.dataset.i18nDefaultTitle = headTitle.textContent || document.title;
            }

            const val = resolveForDom(key);
            if (val !== null) {
                document.title = val;
            } else if (headTitle.dataset.i18nDefaultTitle) {
                document.title = headTitle.dataset.i18nDefaultTitle;
            }
        }

        const switcher = document.getElementById('languageSwitcher');
        if (switcher) {
            switcher.textContent = languageLabels[currentLanguage] || 'Language';
            switcher.title = 'Switch Language';
        }
    }

    function switchLanguage() {
        const currentIndex = languageOrder.indexOf(currentLanguage);
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % languageOrder.length;
        currentLanguage = languageOrder[nextIndex];
        localStorage.setItem('preferredLanguage', currentLanguage);
        applyLanguage();
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: currentLanguage }));
    }

    function getTranslation(key) {
        return resolveForScript(key);
    }

    document.addEventListener('DOMContentLoaded', applyLanguage);

    window.i18n = {
        languages,
        currentLanguage: () => currentLanguage,
        applyLanguage,
        switchLanguage,
        getTranslation
    };
})();
