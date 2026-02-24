'use strict';

const STATUS_APIS = [
    '/api/status-teachertool',
    '/api/status-teachertool/',
    '/api/status-teachertool.js',
    '/functions/api/status-teachertool',
    '/.netlify/functions/status-teachertool',
    '/api/status'
];
const STATUS_TIMEOUT_MS = 7000;
const STATUS_REFRESH_MS = 30000;

function statusEl(id) {
    return document.getElementById(id);
}

function toDisplayText(value) {
    if (value === null || typeof value === 'undefined') return '';
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
}

function setStatusView(type, message, detail, checkedAt) {
    const badge = statusEl('statusBadge');
    const msg = statusEl('statusMessage');
    const detailEl = statusEl('statusDetail');
    const lastChecked = statusEl('lastChecked');

    if (badge) {
        badge.className = `status-badge ${type}`;
        badge.textContent = type === 'online' ? '正常' : (type === 'loading' ? '检测中' : '异常');
    }
    if (msg) msg.textContent = message;
    if (detailEl) detailEl.textContent = detail;
    if (lastChecked) {
        const time = checkedAt ? new Date(checkedAt).toLocaleString() : new Date().toLocaleString();
        lastChecked.textContent = `最后检测：${time}`;
    }
}

async function loadWebsiteStatus() {
    setStatusView('loading', '正在获取网站状态...', '请稍候...', new Date().toISOString());

    let lastError = '状态服务请求失败，请稍后再试。';
    for (const endpoint of STATUS_APIS) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), STATUS_TIMEOUT_MS);
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                cache: 'no-store',
                signal: controller.signal
            });
            clearTimeout(timer);

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
            const detail = toDisplayText(payload) || '接口已响应，但没有返回详细内容。';
            setStatusView('online', '网站状态正常', detail, data.checkedAt || new Date().toISOString());
            return;
        } catch (error) {
            clearTimeout(timer);
            lastError = error && error.name === 'AbortError' ? '请求超时，请稍后重试。' : '状态服务请求失败，请稍后再试。';
        }
    }

    setStatusView('offline', '网站状态暂时不可用', lastError, new Date().toISOString());
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
