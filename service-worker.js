const CACHE_NAME = 'note-app-cache-v1';
const urlsToCache = [
  'note.html',
  'show_note.html',
  'manifest.json',
  'icon.png',
  'font/FkAprilBold.ttf',
  'img/cat.png',
  // เพิ่มไฟล์อื่น ๆ ที่ต้องการ cache เช่น css หรือ js
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
