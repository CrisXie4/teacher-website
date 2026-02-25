'use strict';

const STATUS_APIS = [
    '/api/status-teachertool',
    '/api/status-teachertool/',
    '/api/status-teachertool.js',
    '/.netlify/functions/status-teachertool',
    'https://status.crisxie.top/status/teachertool',
    'https://status.crisxie.top/api/status/teachertool',
    'https://status.crisxie.top/api/status',
    '/api/status'
];
const STATUS_TIMEOUT_MS = 7000;
const STATUS_REFRESH_MS = 30000;
let statusLoading = false;

function statusEl(id) {
    return document.getElementById(id);
}

function setText(id, text) {
    const el = statusEl(id);
    if (el) el.textContent = text;
}

function toDisplayText(value) {
    if (value === null || typeof value === 'undefined') return '';
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
}

function truncateText(text, maxLength) {
    if (!text || text.length <= maxLength) return text || '';
    return `${text.slice(0, maxLength)}\n...（内容已截断）`;
}

function setRefreshState(loading) {
    const refreshBtn = statusEl('refreshBtn');
    if (!refreshBtn) return;
    refreshBtn.disabled = loading;
    refreshBtn.textContent = loading ? '检测中...' : '立即刷新';
}

function updateActionList(actions) {
    const list = statusEl('statusActions');
    if (!list) return;
    list.innerHTML = '';
    const safeActions = Array.isArray(actions) && actions.length > 0
        ? actions
        : ['稍后点击“立即刷新”再次检测。'];
    for (const item of safeActions) {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    }
}

function getBadgeText(type) {
    if (type === 'online') return '正常';
    if (type === 'loading') return '检测中';
    return '异常';
}

function setStatusView({
    type,
    message,
    meaning,
    actions,
    detail,
    checkedAt,
    endpoint,
    httpCode,
    latencyMs
}) {
    const badge = statusEl('statusBadge');

    if (badge) {
        badge.className = `status-badge ${type}`;
        badge.textContent = getBadgeText(type);
    }

    setText('statusMessage', message || '--');
    setText('statusMeaning', meaning || '--');
    setText('statusDetail', detail || '--');
    setText('statusEndpoint', endpoint || '--');
    setText('statusHttpCode', httpCode ? `HTTP ${httpCode}` : '--');
    setText('statusLatency', Number.isFinite(latencyMs) ? `${latencyMs} ms` : '--');

    const time = checkedAt ? new Date(checkedAt).toLocaleString() : new Date().toLocaleString();
    setText('lastChecked', `最后检测：${time}`);

    updateActionList(actions);
}

function buildPayloadSummary(payload) {
    if (payload === null || typeof payload === 'undefined') {
        return '无返回内容';
    }
    if (typeof payload === 'string') {
        return payload.trim() || '字符串内容为空';
    }
    if (typeof payload !== 'object') {
        return String(payload);
    }

    const priorityKeys = ['status', 'message', 'service', 'name', 'uptime', 'version'];
    const lines = [];
    for (const key of priorityKeys) {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
            lines.push(`${key}: ${toDisplayText(payload[key])}`);
        }
    }

    if (lines.length > 0) {
        return lines.join('\n');
    }
    return '返回了 JSON 对象，但没有常见状态字段';
}

function buildOnlineDetail({ endpoint, responseStatus, checkedAt, latencyMs, payload, rawData }) {
    return [
        '检测结论: 正常',
        `检测接口: ${endpoint}`,
        `HTTP 状态: ${responseStatus}`,
        `检测时间: ${new Date(checkedAt).toLocaleString()}`,
        `响应耗时: ${latencyMs} ms`,
        '',
        '返回摘要:',
        truncateText(buildPayloadSummary(payload), 1200),
        '',
        '原始响应:',
        truncateText(toDisplayText(rawData), 3000)
    ].join('\n');
}

function buildOfflineDetail({ checkedAt, lastError, triedEndpoints }) {
    const triedList = triedEndpoints.length > 0 ? triedEndpoints.join('\n- ') : '无';
    return [
        '检测结论: 异常',
        `检测时间: ${new Date(checkedAt).toLocaleString()}`,
        `最后错误: ${lastError || '未知错误'}`,
        '',
        '已尝试接口:',
        triedEndpoints.length > 0 ? `- ${triedList}` : triedList
    ].join('\n');
}

function getOfflineActions() {
    return [
        '点击“立即刷新”重试一次（可能是临时网络抖动）。',
        '确认当前网络可用，必要时切换到其他网络后再试。',
        '如果持续异常，请将“技术详情”截图发给管理员。'
    ];
}

function getOnlineActions() {
    return [
        '当前可正常使用网站功能。',
        '若个别页面仍报错，可先刷新该页面再试。',
        '问题持续时，把“技术详情”反馈给管理员定位。'
    ];
}

function getLoadingActions() {
    return [
        '系统正在自动检测，请稍等 1-3 秒。',
        '如果长时间停留在“检测中”，点击“立即刷新”。'
    ];
}

async function loadWebsiteStatus() {
    if (statusLoading) return;
    statusLoading = true;
    setRefreshState(true);
    try {
        const checkedAt = new Date().toISOString();
        setStatusView({
            type: 'loading',
            message: '正在检测服务状态...',
            meaning: '这一步会依次尝试多个状态接口。',
            actions: getLoadingActions(),
            detail: '请稍候...',
            checkedAt: checkedAt,
            endpoint: '--',
            httpCode: null,
            latencyMs: null
        });

        let lastError = '状态服务请求失败，请稍后再试。';
        const triedEndpoints = [];

        for (const endpoint of STATUS_APIS) {
            triedEndpoints.push(endpoint);
            const controller = new AbortController();
            const start = Date.now();
            const timer = setTimeout(() => controller.abort(), STATUS_TIMEOUT_MS);
            try {
                const response = await fetch(endpoint, {
                    method: 'GET',
                    cache: 'no-store',
                    signal: controller.signal
                });
                clearTimeout(timer);
                const latencyMs = Date.now() - start;

                const contentType = response.headers.get('content-type') || '';
                if (!contentType.includes('application/json')) {
                    const text = await response.text();
                    const maybeHtml = /<!doctype html>|<html/i.test(text);
                    lastError = maybeHtml ? `接口 ${endpoint} 返回了页面 HTML` : `接口 ${endpoint} 未返回 JSON`;
                    continue;
                }

                const data = await response.json();
                if (!response.ok || !data || data.ok === false) {
                    lastError = data && data.message ? data.message : `HTTP ${response.status}`;
                    continue;
                }

                const payload = Object.prototype.hasOwnProperty.call(data, 'payload') ? data.payload : data;
                const finalCheckedAt = data.checkedAt || new Date().toISOString();
                setStatusView({
                    type: 'online',
                    message: '服务运行正常',
                    meaning: '你现在可以正常使用教师工具箱。',
                    actions: getOnlineActions(),
                    detail: buildOnlineDetail({
                        endpoint: endpoint,
                        responseStatus: response.status,
                        checkedAt: finalCheckedAt,
                        latencyMs: latencyMs,
                        payload: payload,
                        rawData: data
                    }),
                    checkedAt: finalCheckedAt,
                    endpoint: endpoint,
                    httpCode: response.status,
                    latencyMs: latencyMs
                });
                return;
            } catch (error) {
                clearTimeout(timer);
                lastError = error && error.name === 'AbortError' ? '请求超时，请稍后重试。' : '状态服务请求失败，请稍后再试。';
            }
        }

        const finalCheckedAt = new Date().toISOString();
        setStatusView({
            type: 'offline',
            message: '暂时无法确认服务可用',
            meaning: '这通常是接口超时、网络不稳定或服务临时故障导致。',
            actions: getOfflineActions(),
            detail: buildOfflineDetail({
                checkedAt: finalCheckedAt,
                lastError: lastError,
                triedEndpoints: triedEndpoints
            }),
            checkedAt: finalCheckedAt,
            endpoint: triedEndpoints.length > 0 ? triedEndpoints[triedEndpoints.length - 1] : '--',
            httpCode: null,
            latencyMs: null
        });
    } finally {
        statusLoading = false;
        setRefreshState(false);
    }
}

function initWebsiteStatusPage() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    const refreshBtn = statusEl('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadWebsiteStatus);
    }

    loadWebsiteStatus();
    setInterval(loadWebsiteStatus, STATUS_REFRESH_MS);
}

window.addEventListener('load', initWebsiteStatusPage);
