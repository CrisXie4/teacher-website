const STATUS_SOURCE_URL = process.env.TEACHER_TOOL_STATUS_URL || 'https://status.crisxie.top/status/teachertool';
const REQUEST_TIMEOUT_MS = 7000;

module.exports = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method !== 'GET') {
        res.statusCode = 405;
        return res.end(JSON.stringify({
            ok: false,
            message: 'Method Not Allowed'
        }));
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        const upstream = await fetch(STATUS_SOURCE_URL, {
            method: 'GET',
            signal: controller.signal,
            headers: { Accept: 'application/json, text/plain, */*' }
        });
        clearTimeout(timer);

        const contentType = upstream.headers.get('content-type') || '';
        let payload = null;
        if (contentType.includes('application/json')) {
            payload = await upstream.json();
        } else {
            payload = (await upstream.text()).trim();
        }

        res.statusCode = upstream.ok ? 200 : 502;
        return res.end(JSON.stringify({
            ok: upstream.ok,
            checkedAt: new Date().toISOString(),
            statusCode: upstream.status,
            payload: payload
        }));
    } catch (error) {
        clearTimeout(timer);
        const isTimeout = error && error.name === 'AbortError';
        res.statusCode = isTimeout ? 504 : 502;
        return res.end(JSON.stringify({
            ok: false,
            checkedAt: new Date().toISOString(),
            message: isTimeout ? 'Upstream request timed out' : 'Upstream request failed'
        }));
    }
};
