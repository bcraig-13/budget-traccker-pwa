
var CACHE_NAME = "my-site-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";
var urlsToCache = [
  "/",
  "/db.js",
  "/index.js",
  "/manifest.json",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

//When install runs, wait until CACHE_NAME is opened to add all urlsToCache
self.addEventListener("install", function(event) {
    event.waitUntil(
        cachese.open(CACHE_NAME).then(function(cache) {
            console.log("Cache opened");
            return cache.addAll(urlsToCache);
        })
    )
})