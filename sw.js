/* ============================================================
   SERVICE WORKER — cache basique pour installation PWA + hors-ligne
   partiel. Stratégie volontairement simple :
   - Cache-first pour les fichiers statiques (CSS/JS/icônes), qui ne
     changent qu'au déploiement.
   - Network-first pour tout le reste (HTML, data/*.json, i18n/*.json)
     : on veut toujours la version la plus fraîche en ligne (le
     contenu de data/veille.json change chaque matin), le cache ne
     sert que de secours hors ligne.
   ============================================================ */
const CACHE_NAME = 'portfolio-v1';

const STATIC_ASSETS = [
  '/style.css',
  '/mediaqueries.css',
  '/tailwind.css',
  '/js/main.js',
  '/js/i18n.js',
  '/js/nav.js',
  '/js/particles.js',
  '/js/reveal.js',
  '/js/projects.js',
  '/js/project-detail.js',
  '/js/docs.js',
  '/js/veille.js',
  '/js/contact.js',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // laisse passer les ressources externes (fonts Google, etc.)

  const isStaticAsset = STATIC_ASSETS.includes(url.pathname);

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
  } else {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
  }
});
