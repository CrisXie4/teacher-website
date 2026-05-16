const UPTIME_KUMA_BASE = process.env.UPTIME_KUMA_BASE_URL || 'https://status.crisxie.top';
const STATUS_SLUG = process.env.UPTIME_KUMA_SLUG || 'teachertool';
const REQUEST_TIMEOUT_MS = 7000;

module.exports = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        return res.end();
    }

    if (req.method !== 'GET') {
        res.statusCode = 405;
        return res.end(JSON.stringify({ ok: false, message: 'Method Not Allowed' }));
    }

    const pageUrl = `${UPTIME_KUMA_BASE}/api/status-page/${STATUS_SLUG}`;
    const heartbeatUrl = `${UPTIME_KUMA_BASE}/api/status-page/heartbeat/${STATUS_SLUG}`;

    try {
        const [pageRes, hbRes] = await Promise.all([
            fetchWithTimeout(pageUrl, REQUEST_TIMEOUT_MS),
            fetchWithTimeout(heartbeatUrl, REQUEST_TIMEOUT_MS)
        ]);

        const pageData = pageRes.ok ? await pageRes.json() : null;
        const hbData = hbRes.ok ? await hbRes.json() : null;

        if (!pageData && !hbData) {
            res.statusCode = 502;
            return res.end(JSON.stringify({
                ok: false,
                checkedAt: new Date().toISOString(),
                message: 'Both Uptime Kuma API endpoints failed'
            }));
        }

        // 从心跳数据判断最新状态
        let latestStatus = 1;
        let latestPing = 0;
        let uptime24h = null;

        if (hbData && hbData.heartbeatList) {
            for (const monitorId of Object.keys(hbData.heartbeatList)) {
                const beats = hbData.heartbeatList[monitorId];
                if (beats && beats.length > 0) {
                    const last = beats[beats.length - 1];
                    latestStatus = last.status;
                    latestPing = last.ping || 0;
                }
            }
        }

        if (hbData && hbData.uptimeList) {
            for (const key of Object.keys(hbData.uptimeList)) {
                uptime24h = hbData.uptimeList[key];
            }
        }

        const monitorName = pageData?.publicGroupList?.[0]?.monitorList?.[0]?.name
            || pageData?.config?.title
            || '教师工具箱';

        res.statusCode = 200;
        return res.end(JSON.stringify({
            ok: true,
            checkedAt: new Date().toISOString(),
            status: latestStatus === 1 ? 'up' : 'down',
            monitor: monitorName,
            ping: latestPing,
            uptime24h: uptime24h,
            heartbeatList: hbData?.heartbeatList || {},
            config: pageData?.config || null,
            incident: pageData?.incident || null,
            maintenanceList: pageData?.maintenanceList || []
        }));
    } catch (error) {
        const isTimeout = error && error.name === 'AbortError';
        res.statusCode = isTimeout ? 504 : 502;
        return res.end(JSON.stringify({
            ok: false,
            checkedAt: new Date().toISOString(),
            message: isTimeout ? 'Upstream request timed out' : 'Upstream request failed'
        }));
    }
};

async function fetchWithTimeout(url, ms) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    try {
        const resp = await fetch(url, { method: 'GET', signal: controller.signal });
        clearTimeout(timer);
        return resp;
    } catch (err) {
        clearTimeout(timer);
        throw err;
    }
}
