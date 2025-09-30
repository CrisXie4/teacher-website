// 缓存名称 - 使用时间戳确保每次部署都更新
const CACHE_NAME = 'teacher-toolkit-v' + new Date().getTime();
const urlsToCache = [
  '/',
  '/index.html',
  '/src/css/styles.css',
  '/src/js/student-manager.js',
  '/src/pages/sound-detector.html',
  '/src/pages/roll-call.html',
  '/src/pages/timer.html',
  '/src/pages/grouping.html',
  '/src/pages/whiteboard.html',
  '/src/pages/classroom-tracker.html',
  '/src/pages/copybook-generator.html',
  '/src/pages/math-generator.html',
  '/src/pages/donation.html',
  '/src/pages/new-features.html',
  '/src/pages/3d-viewer.html',
  '/src/pages/periodic-table.html',
  '/assets/sounds/basic-alarm-ringtone.mp3',
  '/assets/images/briefcase-192x192.png',
  '/assets/images/briefcase-512x512.png'
];

// 安装服务工作者 - 立即激活新版本
self.addEventListener('install', event => {
  // 跳过等待，立即激活
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache:', CACHE_NAME);
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Cache addAll error:', err);
        });
      })
  );
});

// 拦截网络请求 - 使用"网络优先，缓存备用"策略
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 如果网络请求成功，克隆响应并更新缓存
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // 如果网络请求失败，尝试从缓存中获取
        return caches.match(event.request);
      })
  );
});

// 激活服务工作者 - 立即控制所有客户端
self.addEventListener('activate', event => {
  // 立即接管所有页面
  event.waitUntil(
    Promise.all([
      // 删除旧缓存
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
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