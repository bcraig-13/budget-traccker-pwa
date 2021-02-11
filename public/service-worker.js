var CACHE_NAME = "my-site-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";
var urlsToCache = ["/", "/db.js", "/index.js", "/manifest.json", "/styles.css", "/icons/icon-192x192.png", "/icons/icon-512x512.png"];

//When install runs, wait until CACHE_NAME is opened to add all urlsToCache
self.addEventListener("install", function (event) {
  event.waitUntil(
    cachese.open(CACHE_NAME).then(function (cache) {
      //V===To make sure it works===V
      console.log("Cache opened");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches
        .open(DATA_CACHE_NAME)
        .then((cache) => {
          return fetch(event.request)
            .then((response) => {
              if (response.status === 200) {
                cache.put(event.request.url, response.clone());
              }
              return response;
            })
            .catch((err) => {
              return cache.match(evt.request);
            });
        })
        .catch((err) => console.log(err))
    );
    return;
  }

  evt.respondWith(
    caches.match(evt.request).then(function (response) {
      return response || fetch(evt.request);
    })
  );
});
