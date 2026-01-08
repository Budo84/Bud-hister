const CACHE_NAME = 'cinehitster-v2'; // Ho cambiato versione per forzare l'aggiornamento
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Forza l'attivazione immediata
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim()); // Prende controllo subito della pagina
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
