const CACHE_VERSION = '2.0.9';
const CACHE_NAME = `teacher-toolkit-v${CACHE_VERSION}`;

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/src/css/styles.css',
  '/src/css/index.css',
  '/src/js/student-manager.js',
  '/src/js/i18n.js',
  '/src/js/index.js',
  '/assets/images/briefcase-192x192.png',
  '/assets/images/briefcase-512x512.png',
  '/manifest.json'
];

const SKIP_CACHE_PATTERNS = [
  '/GONGGAO.md',
  '/api/',
  'umami.is',
  'cloudflareinsights.com'
];

const STATIC_ASSET_PATTERN = /\.(?:css|js|mjs|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf)$/i;

function shouldSkipCache(url) {
  return SKIP_CACHE_PATTERNS.some(pattern => url.includes(pattern));
}

function isCacheableResponse(response) {
  return response && response.status === 200 && (response.type === 'basic' || response.type === 'cors');
}

async function addCoreAssets(cache) {
  for (const asset of CORE_ASSETS) {
    try {
      await cache.add(asset);
    } catch {
      // Ignore missing optional assets during install.
    }
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (!shouldSkipCache(request.url) && isCacheableResponse(response)) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then(response => {
      if (isCacheableResponse(response)) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  if (cached) {
    return cached;
  }

  const networkResponse = await networkPromise;
  if (networkResponse) {
    return networkResponse;
  }

  if (request.mode === 'navigate') {
    return caches.match('/index.html');
  }

  return new Response('Offline', { status: 503, statusText: 'Offline' });
}

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => addCoreAssets(cache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName.startsWith('teacher-toolkit-') && cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      }),
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (!request.url.startsWith('http')) return;
  if (shouldSkipCache(request.url)) return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isStaticAsset = isSameOrigin && STATIC_ASSET_PATTERN.test(url.pathname);

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isStaticAsset) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  event.respondWith(networkFirst(request));
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION' && event.ports && event.ports[0]) {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
});
