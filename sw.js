const CACHE_NAME = "ludosphere-cache-v2";

// Exakt die gleichen Pfade wie in der index.html (OHNE ./ oder /)
const CORE_FILES = [
    "index.html",
    "css/core.css",
    "js/config.js",
    "js/eventBus.js",
    "js/storageManager.js",
    "js/languageManager.js",
    "js/themeManager.js",
    "js/installManager.js",
    "js/navigationManager.js",
    "js/onboardingManager.js",
    "js/searchManager.js",
    "js/gameManager.js",
    "js/accountManager.js",
    "js/apiManager.js",
    "js/updateManager.js",
    "js/app.js",
    "manifest.json",
    "languages/de.json",
    "languages/en.json"
];

// INSTALL
self.addEventListener("install", event => {
    console.log("[PWA] Service Worker installiert");
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // Caches alle Dateien einzeln abfangen, damit nicht ein einzelner Fehler alles abbricht
            return Promise.allSettled(
                CORE_FILES.map(file => cache.add(file))
            );
        })
    );
});

// AKTIVIEREN + ALTE CACHES LÖSCHEN
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log("[PWA] Alter Cache gelöscht:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// FETCH SYSTEM (Cache First, dann Network Fallback)
self.addEventListener("fetch", event => {
    // Nur GET-Anfragen cachen
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then(networkResponse => {
                return networkResponse;
            });
        })
    );
});
