// 缓存版本号 - 每次部署时手动更新此版本号
const CACHE_VERSION = '2.0.5';
const CACHE_NAME = 'teacher-toolkit-v' + CACHE_VERSION;

// 需要缓存的核心资源
const urlsToCache = [
  '/',
  '/index.html',
  '/src/css/styles.css',
  '/src/js/student-manager.js',
  '/assets/images/briefcase-192x192.png',
  '/assets/images/briefcase-512x512.png'
];

// 不需要缓存的路径（始终从网络获取）
const noCachePaths = [
  '/GONGGAO.md',
  '/api/',
  'umami.is',
  'cloudflareinsights.com'
];

// 检查URL是否应该跳过缓存
function shouldSkipCache(url) {
  return noCachePaths.some(path => url.includes(path));
}

// 安装服务工作者
self.addEventListener('install', event => {
  console.log('[SW] Installing new version:', CACHE_VERSION);
  // 移除自动 skipWaiting，防止自动接管导致的前端逻辑混乱
  // self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching core resources');
        return cache.addAll(urlsToCache).catch(err => {
          console.log('[SW] Cache addAll error:', err);
        });
      })
  );
});

// 拦截网络请求 - 使用"网络优先，缓存备用"策略
self.addEventListener('fetch', event => {
  const requestUrl = event.request.url;
  
  // 只处理 http 和 https 请求
  if (!requestUrl.startsWith('http')) {
    return;
  }
  
  // 跳过 POST 请求和其他非 GET 请求
  if (event.request.method !== 'GET') {
    return;
  }
  
  // 跳过不需要缓存的路径
  if (shouldSkipCache(requestUrl)) {
    return;
  }
  
  event.respondWith(
    // 始终先尝试网络请求
    fetch(event.request)
      .then(response => {
        // 如果网络请求成功，更新缓存
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            })
            .catch(err => {
              console.log('[SW] Cache put error:', err);
            });
        }
        return response;
      })
      .catch(() => {
        // 网络请求失败时，从缓存获取
        console.log('[SW] Network failed, trying cache for:', requestUrl);
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return cached;
        });
      })
  );
});

// 激活服务工作者
self.addEventListener('activate', event => {
  console.log('[SW] Activating new version:', CACHE_VERSION);
  event.waitUntil(
    Promise.all([
      // 删除所有旧版本的缓存
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName.startsWith('teacher-toolkit-')) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // 立即接管所有客户端
      self.clients.claim()
    ])
  );
});

// 监听来自页面的消息
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
});
