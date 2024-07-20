// service-worker.js

const CACHE_NAME = "filesystem_cache_v1";
const urlsToCache = [];

self.addEventListener("install", (event) => {
  //self.postMessage({msg: 'install', event})
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.waitUntil(
    (async function () {
      if (event.clientId) {
        const client = await self.clients.get(event.clientId);
        if (client) {
          client.postMessage("done");
        } else return;
      } else return;
    })()
  );
  //postMessage({msg: 'fetch', event})
  event.respondWith(
    fetch(event.request).then((response) => {
      // Return the cached response if found
      if (response) {
        return response;
      }
      // Otherwise, fetch from the network
      return fetch("/");
    })
  );
});

self.addEventListener("activate", (event) => {
  //self.postMessage({msg: 'activate', event})
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
