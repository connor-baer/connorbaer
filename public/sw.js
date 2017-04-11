(function () {
  'use strict';
  const version = 'cb1.4::';
  const staticCacheName = version + 'static';
  const pagesCacheName = version + 'pages';
  const imagesCacheName = version + 'images';
  const offlinePages = [
    '/offline',
    '/',
    '/404',
    '/work',
    '/blog',
  ];

  function stashInCache(cacheName, request, response) {
    caches.open(cacheName).then(cache=>cache.put(request, response));
  }

  function updateStaticCache() {
    caches.open(staticCacheName).then(cache=> {
      return cache.addAll(offlinePages.map(url=>new Request(url, {
        credentials: 'same-origin',
      })));
    });
  }

  function trimCache(cacheName, maxItems) {
    caches.open(cacheName).then(cache=> {
      cache.keys().then(keys=> {
        if (keys.length > maxItems) {
          cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
        }
      });
    });
  }

  function clearOldCaches() {
    return caches.keys().then(keys=> {
      return Promise.all(keys.filter(key=>key.indexOf(version) !== 0).map(key=>caches.delete(key)));
    });
  }

  self.addEventListener('message', event=> {
    if (event.data.command === 'trimCaches') {
      trimCache(pagesCacheName, 35);
      trimCache(imagesCacheName, 20);
    }
  });
})();
