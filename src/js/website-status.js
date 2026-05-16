'use strict';

const STATUS_API = '/api/status-teachertool';
const STATUS_TIMEOUT_MS = 8000;
const STATUS_REFRESH_MS = 30000;
let statusLoading = false;

function statusEl(id) {
    return document.getElementById(id);
}

function setText(id, text) {
    const el = statusEl(id);
    if (el) el.textContent = text;
}

/* ── 心跳图表渲染 ────────────────────────────────────────────── */

function renderHeartbeatChart(heartbeatList) {
    const container = statusEl('heartbeatChart');
    if (!container || !heartbeatList) return;

    const all = [];
    for (const monitorId of Object.keys(heartbeatList)) {
        for (const hb of heartbeatList[monitorId]) {
            all.push(hb);
        }
    }
    all.sort((a, b) => new Date(a.time) - new Date(b.time));
    const recent = all.slice(-30);

    if (recent.length === 0) {
        container.innerHTML = '<p style="color:#94a3b8;text-align:center;">暂无心跳数据</p>';
        return;
    }

    const maxPing = Math.max(...recent.map(h => h.ping || 0), 100);

    let html = '<div class="hb-bars">';
    for (const hb of recent) {
        const height = Math.max(4, Math.round(((hb.ping || 0) / maxPing) * 80));
        const isUp = hb.status === 1;
        const color = isUp ? '#16a34a' : '#dc2626';
        const time = new Date(hb.time).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        html += `<div class="hb-bar-wrap" title="${time}\n${isUp ? '正常' : '异常'} · ${hb.ping || 0} ms">`;
        html += `<div class="hb-bar" style="height:${height}px;background:${color};"></div>`;
        html += `</div>`;
    }
    html += '</div>';

    container.innerHTML = html;
}

/* ── Ping 统计渲染 ─────────────────────────────────────────── */

function renderPingStats(heartbeatList) {
    const container = statusEl('pingStats');
    if (!container || !heartbeatList) return;

    const all = [];
    for (const monitorId of Object.keys(heartbeatList)) {
        for (const hb of heartbeatList[monitorId]) {
            if (hb.status === 1 && hb.ping > 0) all.push(hb.ping);
        }
    }

    if (all.length === 0) {
        container.innerHTML = '';
        return;
    }

    all.sort((a, b) => a - b);
    const avg = Math.round(all.reduce((s, v) => s + v, 0) / all.length);
    const min = all[0];
    const max = all[all.length - 1];
    const p95 = all[Math.floor(all.length * 0.95)] || max;

    container.innerHTML = `
        <div class="ping-grid">
            <div class="ping-item"><span class="ping-label">平均</span><span class="ping-value">${avg} ms</span></div>
            <div class="ping-item"><span class="ping-label">最低</span><span class="ping-value">${min} ms</span></div>
            <div class="ping-item"><span class="ping-label">最高</span><span class="ping-value">${max} ms</span></div>
            <div class="ping-item"><span class="ping-label">P95</span><span class="ping-value">${p95} ms</span></div>
        </div>
    `;
}

/* ── 主加载逻辑 ──────────────────────────────────────────── */

async function loadWebsiteStatus() {
    if (statusLoading) return;
    statusLoading = true;

    const refreshBtn = statusEl('refreshBtn');
    if (refreshBtn) {
        refreshBtn.disabled = true;
        refreshBtn.textContent = '检测中...';
    }

    const badge = statusEl('statusBadge');
    if (badge) { badge.className = 'status-badge loading'; badge.textContent = '检测中'; }
    setText('statusMessage', '正在检测服务状态...');
    setText('uptimeValue', '--');
    setText('pingValue', '--');
    setText('lastChecked', '最后检测：--');

    try {
        const response = await fetch(STATUS_API, {
            cache: 'no-store',
            signal: AbortSignal.timeout(STATUS_TIMEOUT_MS)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.ok) {
            throw new Error(data.message || '接口返回错误');
        }

        const isUp = data.status === 'up';
        const checkedAt = new Date(data.checkedAt).toLocaleString('zh-CN');

        if (badge) {
            badge.className = `status-badge ${isUp ? 'online' : 'offline'}`;
            badge.textContent = isUp ? '正常运行' : '服务异常';
        }

        setText('statusMessage', isUp
            ? `${data.monitor || '教师工具箱'} 运行正常`
            : `${data.monitor || '教师工具箱'} 当前异常`);
        setText('lastChecked', `最后检测：${checkedAt}`);

        if (data.uptime24h !== null && data.uptime24h !== undefined) {
            setText('uptimeValue', (data.uptime24h * 100).toFixed(2) + '%');
        }

        setText('pingValue', data.ping > 0 ? `${data.ping} ms` : '--');

        renderHeartbeatChart(data.heartbeatList);
        renderPingStats(data.heartbeatList);

    } catch (err) {
        if (badge) { badge.className = 'status-badge offline'; badge.textContent = '检测失败'; }
        setText('statusMessage', '无法获取状态数据');
        setText('uptimeValue', '--');
        setText('pingValue', '--');
        setText('lastChecked', `最后检测：${new Date().toLocaleString('zh-CN')}`);

        const chart = statusEl('heartbeatChart');
        if (chart) chart.innerHTML = `<p style="color:#dc2626;text-align:center;">${err.message || '网络错误'}</p>`;
    } finally {
        statusLoading = false;
        if (refreshBtn) {
            refreshBtn.disabled = false;
            refreshBtn.textContent = '立即刷新';
        }
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
