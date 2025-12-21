// 缓存名称
const CACHE_NAME = 'teacher-toolkit-v1.3.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/student-manager.js',
  '/sound-detector.html',
  '/roll-call.html',
  '/timer.html',
  '/grouping.html',
  '/whiteboard.html',
  '/classroom-tracker.html',
  '/copybook-generator.html',
  '/math-generator.html',
  '/donation.html',
  '/new-features.html',
  '/3d-viewer.html',
  '/basic-alarm-ringtone.mp3',
  '/briefcase-192x192.png',
  '/briefcase-512x512.png'
];

// 安装服务工作者
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果在缓存中找到响应，则返回缓存的版本
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// 激活服务工作者
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});