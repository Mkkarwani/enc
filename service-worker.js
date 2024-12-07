const CACHE_NAME = 'enc-viewer-cache-v1';
const OFFLINE_FILES = [
  './Hariji/',
  './Hariji/index.html',
  './Hariji/pdfjs/pdf.mjs',
  './Hariji/pdfjs/pdf.worker.mjs',
  './Hariji/manifest.json',
  './Hariji/icons/icon-192x192.png',
  './Hariji/icons/icon-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_FILES);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
