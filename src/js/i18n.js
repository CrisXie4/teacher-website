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
            theme_dark: '黑夜模式',
            theme_light: '日间模式',
            use_now: '立即使用',
            support_now: '前往支持',
            announcement_center: '公告',
            classroom_game_title: '课堂互动游戏',
            classroom_game_desc: '随机出题、倒计时与积分榜，快速提升课堂互动',
            teachers_day_title: '教师节快乐！',
            teachers_day_message: '祝您教师节快乐！感谢您对教育事业的辛勤付出。',
            import_success: '成功导入 {count} 名学生',
            import_failed: '导入失败：{error}',
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
