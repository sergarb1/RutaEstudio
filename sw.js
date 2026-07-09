const CACHE = 'ruta-estudio-v1';
const FALLBACK = '/fallback/';

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll([
      'index.html',
      'manifest.json',
      'img/icon.svg',
      'css/app.css',
      'fallback/tailwind.min.css',
      'fallback/vue.global.prod.js',
      'fallback/vis-network.min.js',
      'js/app.js',
      'js/store.js',
      'js/graph-engine.js',
      'js/study-plan.js',
      'js/helpers.js',
      'js/i18n.js',
      'js/templates.js',
      'js/editor.js',
      'js/study.js',
      'js/gamification.js',
      'components/subject-list.js',
      'components/global-graph.js',
      'components/suggestions-panel.js',
      'components/help-modal.js',
      'components/ai-generator.js'
    ]);
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith((async () => {
    try {
      const cached = await caches.match(e.request);
      if (cached) return cached;
      const res = await fetch(e.request);
      if (res.ok && res.type === 'basic') {
        const cache = await caches.open(CACHE);
        cache.put(e.request, res.clone());
      }
      return res;
    } catch {
      const cached = await caches.match(e.request);
      if (cached) return cached;
      return new Response('Offline', { status: 503 });
    }
  })());
});
