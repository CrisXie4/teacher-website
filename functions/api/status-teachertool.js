const STATUS_SOURCE_URL = (globalThis.process && process.env && process.env.TEACHER_TOOL_STATUS_URL)
    ? process.env.TEACHER_TOOL_STATUS_URL
    : 'https://status.crisxie.top/status/teachertool';

const REQUEST_TIMEOUT_MS = 7000;

async function proxyStatus() {
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
        const payload = contentType.includes('application/json')
            ? await upstream.json()
            : (await upstream.text()).trim();

        return {
            status: upstream.ok ? 200 : 502,
            body: {
                ok: upstream.ok,
                checkedAt: new Date().toISOString(),
                statusCode: upstream.status,
                payload: payload
            }
        };
    } catch (error) {
        clearTimeout(timer);
        return {
            status: error && error.name === 'AbortError' ? 504 : 502,
            body: {
                ok: false,
                checkedAt: new Date().toISOString(),
                message: error && error.name === 'AbortError'
                    ? 'Upstream request timed out'
                    : 'Upstream request failed'
            }
        };
    }
}

export async function onRequestGet() {
    const result = await proxyStatus();
    return new Response(JSON.stringify(result.body), {
        status: result.status,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': 'no-store, max-age=0'
        }
    });
}
