const CACHE = 'ruta-estudio-v2';

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
  e.waitUntil((async () => {
    // Clean old caches
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // CDN requests: network-first, fallback to cache
  if (url.hostname.includes('unpkg.com') || url.hostname.includes('cdn.')) {
    e.respondWith((async () => {
      try {
        const res = await fetch(e.request);
        if (res.ok) {
          const cache = await caches.open(CACHE);
          cache.put(e.request, res.clone());
        }
        return res;
      } catch {
        const cached = await caches.match(e.request);
        return cached || new Response('', { status: 200 });
      }
    })());
    return;
  }

  // App assets: cache-first, network fallback
  e.respondWith((async () => {
    const cached = await caches.match(e.request);
    if (cached) return cached;
    try {
      const res = await fetch(e.request);
      if (res.ok && res.type === 'basic') {
        const cache = await caches.open(CACHE);
        cache.put(e.request, res.clone());
      }
      return res;
    } catch {
      // Offline: return index.html for navigation requests
      if (e.request.mode === 'navigate') {
        return caches.match('index.html');
      }
      return new Response('', { status: 200 });
    }
  })());
});
