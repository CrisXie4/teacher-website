'use strict';

(function() {
    const I18N = {
        en: {
            title: 'Chart Generator - Teacher Toolkit',
            back_home: '← Back to Home',
            language_label: 'Language',
            header_title: '📊 Chart Generator',
            header_desc: 'Customize data, colors and chart types',
            section_chart_type: 'Chart Types',
            chart_type_bar: '📊 Bar',
            chart_type_line: '📈 Line',
            chart_type_area: '🌊 Area',
            chart_type_pie: '🥧 Pie',
            chart_type_doughnut: '🍩 Doughnut',
            chart_type_radar: '🎯 Radar',
            chart_type_polar: '⭕ Polar Area',
            chart_type_hbar: '↔️ Horizontal Bar',
            chart_type_scatter: '🔹 Scatter',
            chart_type_bubble: '🫧 Bubble',
            section_chart_info: 'Chart Info',
            chart_title_label: 'Chart Title',
            chart_title_placeholder: 'Enter chart title',
            section_data: 'Data Settings',
            input_method_label: 'Input Method',
            input_manual: 'Manual Input',
            input_upload: 'Upload File',
            labels_label: 'Labels (comma-separated)',
            labels_placeholder: 'e.g. Chinese,Math,English',
            labels_help: 'Separate labels with commas',
            data_label: 'Values (comma-separated)',
            data_placeholder: 'e.g. 85,90,78',
            data_help: 'Value count should match label count',
            upload_label: 'Upload data file (CSV/JSON)',
            upload_help: 'CSV: Label,Value; JSON: {"labels":[...],"data":[...]}',
            section_colors: 'Colors',
            color_scheme_label: 'Color Scheme',
            scheme_custom: 'Custom',
            scheme_vibrant: 'Vibrant',
            scheme_pastel: 'Pastel',
            scheme_ocean: 'Ocean',
            scheme_sunset: 'Sunset',
            scheme_forest: 'Forest',
            custom_color_label: 'Custom Colors',
            add_color: '+ Add Color',
            section_export: 'Export',
            image_format_label: 'Image Format',
            data_format_label: 'Data Format',
            btn_generate: '🎨 Generate Chart',
            btn_download: '💾 Download Chart',
            btn_export_data: '📤 Export Data',
            btn_reset: '🔄 Reset'
        },
        es: {
            title: 'Generador de Gráficos - Caja de Herramientas Docente',
            back_home: '← Volver al inicio',
            language_label: 'Idioma',
            header_title: '📊 Generador de Gráficos',
            header_desc: 'Personaliza datos, colores y tipos de gráfico',
            section_chart_type: 'Tipos de gráfico',
            chart_type_bar: '📊 Barras',
            chart_type_line: '📈 Líneas',
            chart_type_area: '🌊 Área',
            chart_type_pie: '🥧 Circular',
            chart_type_doughnut: '🍩 Dona',
            chart_type_radar: '🎯 Radar',
            chart_type_polar: '⭕ Polar',
            chart_type_hbar: '↔️ Barras horizontales',
            chart_type_scatter: '🔹 Dispersión',
            chart_type_bubble: '🫧 Burbujas',
            section_chart_info: 'Información del gráfico',
            chart_title_label: 'Título del gráfico',
            chart_title_placeholder: 'Introduce el título',
            section_data: 'Configuración de datos',
            input_method_label: 'Método de entrada',
            input_manual: 'Entrada manual',
            input_upload: 'Subir archivo',
            labels_label: 'Etiquetas (separadas por comas)',
            labels_placeholder: 'ej.: Lengua,Matemáticas,Inglés',
            labels_help: 'Separa con comas',
            data_label: 'Valores (separados por comas)',
            data_placeholder: 'ej.: 85,90,78',
            data_help: 'La cantidad debe coincidir',
            upload_label: 'Subir archivo de datos (CSV/JSON)',
            upload_help: 'CSV: Etiqueta,Valor; JSON: {"labels":[...],"data":[...]}',
            section_colors: 'Colores',
            color_scheme_label: 'Paleta',
            scheme_custom: 'Personalizado',
            scheme_vibrant: 'Vibrante',
            scheme_pastel: 'Pastel',
            scheme_ocean: 'Océano',
            scheme_sunset: 'Atardecer',
            scheme_forest: 'Bosque',
            custom_color_label: 'Colores personalizados',
            add_color: '+ Añadir color',
            section_export: 'Exportación',
            image_format_label: 'Formato de imagen',
            data_format_label: 'Formato de datos',
            btn_generate: '🎨 Generar gráfico',
            btn_download: '💾 Descargar gráfico',
            btn_export_data: '📤 Exportar datos',
            btn_reset: '🔄 Restablecer'
        },
        fr: {
            title: 'Générateur de Graphiques - Boîte à Outils Enseignant',
            back_home: '← Retour à l\'accueil',
            language_label: 'Langue',
            header_title: '📊 Générateur de Graphiques',
            header_desc: 'Personnalisez les données, couleurs et types de graphiques',
            section_chart_type: 'Types de graphiques',
            chart_type_bar: '📊 Histogramme',
            chart_type_line: '📈 Courbe',
            chart_type_area: '🌊 Aire',
            chart_type_pie: '🥧 Camembert',
            chart_type_doughnut: '🍩 Anneau',
            chart_type_radar: '🎯 Radar',
            chart_type_polar: '⭕ Polaire',
            chart_type_hbar: '↔️ Histogramme horizontal',
            chart_type_scatter: '🔹 Nuage de points',
            chart_type_bubble: '🫧 Bulles',
            section_chart_info: 'Informations du graphique',
            chart_title_label: 'Titre du graphique',
            chart_title_placeholder: 'Saisir le titre',
            section_data: 'Paramètres des données',
            input_method_label: 'Méthode de saisie',
            input_manual: 'Saisie manuelle',
            input_upload: 'Téléverser',
            labels_label: 'Étiquettes (séparées par des virgules)',
            labels_placeholder: 'ex.: Français,Mathématiques,Anglais',
            labels_help: 'Séparez avec des virgules',
            data_label: 'Valeurs (séparées par des virgules)',
            data_placeholder: 'ex.: 85,90,78',
            data_help: 'Le nombre doit correspondre',
            upload_label: 'Téléverser un fichier (CSV/JSON)',
            upload_help: 'CSV: Étiquette,Valeur; JSON: {"labels":[...],"data":[...]}',
            section_colors: 'Couleurs',
            color_scheme_label: 'Palette',
            scheme_custom: 'Personnalisé',
            scheme_vibrant: 'Vif',
            scheme_pastel: 'Pastel',
            scheme_ocean: 'Océan',
            scheme_sunset: 'Coucher de soleil',
            scheme_forest: 'Forêt',
            custom_color_label: 'Couleurs personnalisées',
            add_color: '+ Ajouter une couleur',
            section_export: 'Export',
            image_format_label: 'Format d\'image',
            data_format_label: 'Format des données',
            btn_generate: '🎨 Générer le graphique',
            btn_download: '💾 Télécharger le graphique',
            btn_export_data: '📤 Exporter les données',
            btn_reset: '🔄 Réinitialiser'
        }
    };

    const defaults = {
        zh: { title: '学生成绩统计', labels: '语文,数学,英语,物理,化学', values: '85,92,88,76,81' },
        en: { title: 'Student Score Overview', labels: 'Chinese,Math,English,Physics,Chemistry', values: '85,92,88,76,81' },
        es: { title: 'Resumen de Calificaciones', labels: 'Lengua,Matemáticas,Inglés,Física,Química', values: '85,92,88,76,81' },
        fr: { title: 'Aperçu des Notes des Élèves', labels: 'Français,Mathématiques,Anglais,Physique,Chimie', values: '85,92,88,76,81' }
    };

    const schemes = {
        vibrant: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'],
        pastel: ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFD8B3', '#E0BBE4', '#FFDFD3', '#C7CEEA'],
        ocean: ['#006494', '#0582CA', '#13A8FE', '#00B4D8', '#48CAE4', '#90E0EF', '#ADE8F4', '#CAF0F8'],
        sunset: ['#FF6B35', '#F7931E', '#FDC830', '#F37335', '#E94B3C', '#C73E1D', '#A4243B', '#6A1B4D'],
        forest: ['#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2', '#B7E4C7', '#D8F3DC', '#A7C957']
    };

    const state = { chart: null, type: 'bar', lang: detectLanguage() };

    function el(id) { return document.getElementById(id); }
    function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || null; }
    function detectLanguage() {
        const saved = localStorage.getItem('chartGeneratorLanguage');
        if (saved && ['zh', 'en', 'es', 'fr'].includes(saved)) return saved;
        const nav = (navigator.language || 'en').toLowerCase();
        if (nav.startsWith('zh')) return 'zh';
        if (nav.startsWith('es')) return 'es';
        if (nav.startsWith('fr')) return 'fr';
        return 'en';
    }

    function setFeedback(text, type) {
        const node = el('feedbackMessage');
        if (!node) return;
        const map = { info: ['#eff6ff', '#bfdbfe', '#1e3a8a'], success: ['#ecfdf3', '#86efac', '#14532d'], warn: ['#fff7ed', '#fdba74', '#7c2d12'] };
        const palette = map[type || 'info'];
        node.style.background = palette[0];
        node.style.borderColor = palette[1];
        node.style.color = palette[2];
        node.textContent = text;
    }

    function setupLanguageNodes() {
        document.querySelectorAll('[data-i18n]').forEach(node => {
            if (!node.dataset.zhText) node.dataset.zhText = node.textContent;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
            if (!node.dataset.zhPlaceholder) node.dataset.zhPlaceholder = node.placeholder;
        });
    }

    function applyLanguage() {
        document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : state.lang;
        document.title = t('title') || '图表生成器 - 教师工具箱';
        document.querySelectorAll('[data-i18n]').forEach(node => {
            const key = node.getAttribute('data-i18n');
            node.textContent = t(key) || node.dataset.zhText || node.textContent;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
            const key = node.getAttribute('data-i18n-placeholder');
            node.placeholder = t(key) || node.dataset.zhPlaceholder || node.placeholder;
        });
        if (el('languageSelector')) el('languageSelector').value = state.lang;
    }

    function matchesAnyDefault(field, value) {
        const s = String(value || '').trim();
        if (!s) return true;
        return Object.values(defaults).some(d => d[field] === s);
    }

    function applyDefaultInputs(force) {
        const d = defaults[state.lang] || defaults.zh;
        if (force || matchesAnyDefault('title', el('chartTitle').value)) el('chartTitle').value = d.title;
        if (force || matchesAnyDefault('labels', el('labels').value)) el('labels').value = d.labels;
        if (force || matchesAnyDefault('values', el('dataValues').value)) el('dataValues').value = d.values;
    }

    function parseLabels(text) { return String(text || '').split(',').map(s => s.trim()).filter(Boolean); }
    function parseValues(text) { return String(text || '').split(',').map(s => parseFloat(s.trim())).filter(n => !Number.isNaN(n)); }
    function toRGBA(hex, alpha) {
        const raw = String(hex || '').replace('#', '');
        if (raw.length !== 6) return `rgba(79,172,254,${alpha})`;
        const r = parseInt(raw.slice(0, 2), 16);
        const g = parseInt(raw.slice(2, 4), 16);
        const b = parseInt(raw.slice(4, 6), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    }

    function initColorInputs() {
        const list = el('colorList');
        list.innerHTML = '';
        ['#4facfe', '#00c2ff', '#43e97b', '#f59e0b', '#f43f5e'].forEach(c => addColorInput(c));
    }

    function addColorInput(color) {
        const list = el('colorList');
        const value = color || '#4facfe';
        const row = document.createElement('div');
        row.className = 'color-inputs';
        row.innerHTML = `<div class="color-input"><input type="color" class="color-picker" value="${value}"><input type="text" value="${value}" placeholder="#4facfe"></div><button class="remove-color-btn" type="button">×</button>`;
        const picker = row.querySelector('.color-picker');
        const text = row.querySelector('input[type="text"]');
        const remove = row.querySelector('.remove-color-btn');
        picker.addEventListener('input', () => { text.value = picker.value; updateChart(); });
        text.addEventListener('input', () => {
            if (/^#[0-9A-F]{6}$/i.test(text.value)) {
                picker.value = text.value;
                updateChart();
            }
        });
        remove.addEventListener('click', () => {
            if (list.querySelectorAll('.color-inputs').length <= 1) return;
            row.remove();
            updateChart();
        });
        list.appendChild(row);
    }

    function getColorList(targetCount) {
        const selectedScheme = el('colorScheme').value;
        const source = selectedScheme === 'custom'
            ? Array.from(document.querySelectorAll('.color-picker')).map(node => node.value).filter(Boolean)
            : (schemes[selectedScheme] || schemes.vibrant);
        const base = source.length ? source : schemes.vibrant;
        const output = [];
        for (let i = 0; i < targetCount; i++) output.push(base[i % base.length]);
        return output;
    }

    function getInputData() {
        const labelsRaw = parseLabels(el('labels').value);
        const valuesRaw = parseValues(el('dataValues').value);
        const length = Math.min(labelsRaw.length, valuesRaw.length);
        return {
            title: (el('chartTitle').value || '').trim() || defaults[state.lang].title,
            labels: labelsRaw.slice(0, length),
            values: valuesRaw.slice(0, length),
            trimmed: labelsRaw.length !== valuesRaw.length
        };
    }

    function buildChartConfig(data) {
        const colors = getColorList(data.values.length);
        let type = state.type;
        let dataset = { label: data.title, data: data.values, backgroundColor: colors, borderColor: colors, borderWidth: 2, tension: 0.35 };
        const options = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: ['pie', 'doughnut', 'polarArea', 'radar'].includes(state.type), position: 'bottom' },
                title: { display: true, text: data.title, font: { size: 24, weight: 'bold' }, padding: 20 }
            }
        };

        if (state.type === 'line') {
            dataset = { label: data.title, data: data.values, borderColor: colors[0], backgroundColor: colors[0], pointBackgroundColor: colors, borderWidth: 3, fill: false, tension: 0.35 };
        }
        if (state.type === 'area') {
            type = 'line';
            dataset = { label: data.title, data: data.values, borderColor: colors[0], backgroundColor: toRGBA(colors[0], 0.25), borderWidth: 3, fill: true, tension: 0.35 };
        }
        if (state.type === 'horizontalBar') {
            type = 'bar';
            options.indexAxis = 'y';
        }
        if (state.type === 'scatter') {
            type = 'scatter';
            dataset = { label: data.title, data: data.values.map((v, i) => ({ x: i + 1, y: v })), pointBackgroundColor: colors, pointRadius: 6 };
            options.plugins.legend.display = false;
        }
        if (state.type === 'bubble') {
            type = 'bubble';
            dataset = {
                label: data.title,
                data: data.values.map((v, i) => ({ x: i + 1, y: v, r: Math.max(6, Math.min(24, Math.abs(v) / 3)) })),
                backgroundColor: colors.map(c => toRGBA(c, 0.65)),
                borderColor: colors,
                borderWidth: 1.5
            };
            options.plugins.legend.display = false;
        }

        if (!['pie', 'doughnut', 'polarArea', 'radar'].includes(state.type)) {
            options.scales = { y: { beginAtZero: true }, x: {} };
        }
        if (state.type === 'scatter' || state.type === 'bubble') {
            options.scales = {
                y: { beginAtZero: true },
                x: { ticks: { stepSize: 1, callback: (value) => data.labels[Number(value) - 1] || value } }
            };
        }

        return { type, data: { labels: data.labels, datasets: [dataset] }, options };
    }

    function updateChart() {
        const canvas = el('chartCanvas');
        const ctx = canvas.getContext('2d');
        if (state.chart) {
            state.chart.destroy();
            state.chart = null;
        }
        const data = getInputData();
        if (!data.labels.length || !data.values.length) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = '20px Arial';
            ctx.fillStyle = '#999';
            ctx.textAlign = 'center';
            ctx.fillText(state.lang === 'zh' ? '请输入有效的标签和数据' : 'Please enter valid labels and values', canvas.width / 2, canvas.height / 2);
            setFeedback(state.lang === 'zh' ? '请输入有效的标签和数据。' : 'Please enter valid labels and values.', 'warn');
            return;
        }
        setFeedback(data.trimmed ? (state.lang === 'zh' ? '标签和数据数量不一致，已自动按最短长度匹配。' : 'Label/value mismatch. Auto trimmed to shorter length.') : (state.lang === 'zh' ? '图表已更新。' : 'Chart updated.'), data.trimmed ? 'warn' : 'success');
        state.chart = new Chart(ctx, buildChartConfig(data));
    }

    function buildExportCanvas() {
        const original = el('chartCanvas');
        const canvas = document.createElement('canvas');
        canvas.width = original.width;
        canvas.height = original.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(original, 0, 0);
        return canvas;
    }

    function fileBase(prefix) {
        const defaultName = state.lang === 'zh' ? (prefix === 'data' ? '图表数据' : '图表') : (prefix === 'data' ? 'chart_data' : 'chart');
        const title = (el('chartTitle').value || '').trim() || defaultName;
        const safeTitle = title.replace(/[\\/:*?"<>|]/g, '_').replace(/\s+/g, '_').slice(0, 80);
        const now = new Date();
        const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
        return `${safeTitle}_${stamp}`;
    }

    function saveBlob(content, name, type) {
        const blob = content instanceof Blob ? content : new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function downloadChart() {
        if (!state.chart) {
            alert(state.lang === 'zh' ? '请先生成图表！' : 'Please generate a chart first.');
            return;
        }
        const format = el('imageFormat').value;
        const base = fileBase('chart');
        const canvas = buildExportCanvas();
        if (format === 'svg') {
            const png = canvas.toDataURL('image/png');
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}"><rect width="100%" height="100%" fill="#ffffff"/><image href="${png}" x="0" y="0" width="${canvas.width}" height="${canvas.height}"/></svg>`;
            saveBlob(svg, `${base}.svg`, 'image/svg+xml;charset=utf-8');
            setFeedback(`${state.lang === 'zh' ? '图表已导出: ' : 'Chart exported: '}${base}.svg`, 'success');
            return;
        }
        const mime = { png: 'image/png', jpeg: 'image/jpeg', webp: 'image/webp' }[format] || 'image/png';
        const ext = { png: 'png', jpeg: 'jpg', webp: 'webp' }[format] || 'png';
        const a = document.createElement('a');
        a.href = canvas.toDataURL(mime, 0.92);
        a.download = `${base}.${ext}`;
        a.click();
        setFeedback(`${state.lang === 'zh' ? '图表已导出: ' : 'Chart exported: '}${base}.${ext}`, 'success');
    }

    function exportData() {
        const data = getInputData();
        if (!data.labels.length || !data.values.length) {
            alert(state.lang === 'zh' ? '请输入有效的标签和数据。' : 'Please enter valid labels and values.');
            return;
        }
        const format = el('dataFormat').value;
        const base = fileBase('data');
        const colors = getColorList(data.values.length);
        if (format === 'csv') {
            const header = state.lang === 'zh' ? '标签,数值,颜色' : 'Label,Value,Color';
            const body = data.labels.map((label, i) => `"${String(label).replace(/"/g, '""')}",${data.values[i]},"${colors[i]}"`).join('\n');
            saveBlob(`\uFEFF${header}\n${body}`, `${base}.csv`, 'text/csv;charset=utf-8');
            setFeedback(`${state.lang === 'zh' ? '数据已导出: ' : 'Data exported: '}${base}.csv`, 'success');
            return;
        }
        const payload = { title: data.title, chartType: state.type, labels: data.labels, data: data.values, colors, language: state.lang, exportedAt: new Date().toISOString() };
        saveBlob(JSON.stringify(payload, null, 2), `${base}.json`, 'application/json;charset=utf-8');
        setFeedback(`${state.lang === 'zh' ? '数据已导出: ' : 'Data exported: '}${base}.json`, 'success');
    }

    function parseCsv(content) {
        const lines = content.trim().split(/\r?\n/).filter(Boolean);
        const labels = [];
        const values = [];
        lines.forEach((line, idx) => {
            const parts = line.split(',').map(s => s.trim());
            if (parts.length < 2) return;
            const n = Number(parts[1]);
            if (Number.isNaN(n)) {
                if (idx === 0) return;
                return;
            }
            labels.push(parts[0]);
            values.push(n);
        });
        return { labels, values };
    }

    function parseJson(content) {
        const data = JSON.parse(content);
        if (Array.isArray(data)) {
            const labels = [];
            const values = [];
            data.forEach(item => {
                if (!item || typeof item !== 'object') return;
                const label = item.label || item.name;
                const value = Number(item.value);
                if (label && !Number.isNaN(value)) {
                    labels.push(String(label));
                    values.push(value);
                }
            });
            return { labels, values };
        }
        return {
            labels: Array.isArray(data.labels) ? data.labels.map(v => String(v)) : [],
            values: Array.isArray(data.data) ? data.data.map(v => Number(v)).filter(v => !Number.isNaN(v)) : (Array.isArray(data.values) ? data.values.map(v => Number(v)).filter(v => !Number.isNaN(v)) : [])
        };
    }

    function handleFileUpload(event) {
        const file = event && event.target && event.target.files ? event.target.files[0] : null;
        if (!file) return;
        const name = file.name.toLowerCase();
        if (!name.endsWith('.csv') && !name.endsWith('.json')) {
            alert(state.lang === 'zh' ? '仅支持 CSV 或 JSON 文件。' : 'Only CSV or JSON files are supported.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = name.endsWith('.json') ? parseJson(e.target.result) : parseCsv(e.target.result);
                if (!parsed.labels.length || !parsed.values.length) {
                    alert(state.lang === 'zh' ? '文件格式错误，请检查内容。' : 'Invalid file format.');
                    return;
                }
                el('labels').value = parsed.labels.join(',');
                el('dataValues').value = parsed.values.join(',');
                updateChart();
            } catch (error) {
                alert((state.lang === 'zh' ? '文件解析失败: ' : 'Failed to parse file: ') + error.message);
            }
        };
        reader.readAsText(file);
    }

    function toggleInputMethod() {
        const manual = el('inputMethod').value === 'manual';
        el('manualInput').style.display = manual ? 'block' : 'none';
        el('uploadInput').style.display = manual ? 'none' : 'block';
    }

    function resetChart() {
        el('colorScheme').value = 'custom';
        el('inputMethod').value = 'manual';
        toggleInputMethod();
        document.querySelectorAll('.chart-type-btn').forEach(btn => btn.classList.remove('active'));
        const first = document.querySelector('.chart-type-btn[data-type="bar"]');
        if (first) first.classList.add('active');
        state.type = 'bar';
        initColorInputs();
        applyDefaultInputs(true);
        updateChart();
    }

    function debounce(fn, wait) {
        let timer = null;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), wait);
        };
    }

    function bindEvents() {
        document.querySelectorAll('.chart-type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.chart-type-btn').forEach(node => node.classList.remove('active'));
                btn.classList.add('active');
                state.type = btn.dataset.type;
                updateChart();
            });
        });
        el('colorScheme').addEventListener('change', () => {
            el('customColors').style.display = el('colorScheme').value === 'custom' ? 'block' : 'none';
            updateChart();
        });
        ['chartTitle', 'labels', 'dataValues'].forEach(id => el(id).addEventListener('input', debounce(updateChart, 350)));
        el('inputMethod').addEventListener('change', toggleInputMethod);
        el('fileUpload').addEventListener('change', handleFileUpload);
        el('languageSelector').addEventListener('change', () => {
            state.lang = el('languageSelector').value;
            localStorage.setItem('chartGeneratorLanguage', state.lang);
            applyLanguage();
            applyDefaultInputs(false);
            updateChart();
        });
    }

    function init() {
        setupLanguageNodes();
        applyLanguage();
        bindEvents();
        resetChart();
        setFeedback(state.lang === 'zh' ? '准备就绪，可开始生成图表。' : 'Ready to generate chart.', 'info');
    }

    window.addColorInput = addColorInput;
    window.updateChart = updateChart;
    window.downloadChart = downloadChart;
    window.exportData = exportData;
    window.resetChart = resetChart;
    window.toggleInputMethod = toggleInputMethod;
    window.handleFileUpload = handleFileUpload;
    window.onload = init;
})();
