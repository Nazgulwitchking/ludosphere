// ACHTUNG: Bei jedem neuen Release diesen Cache-Namen hochzählen! (z.B. v3, v4...)
const CACHE_NAME = "ludosphere-cache-v6";

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

// INSTALL (Nicht sofort skipWaiting rufen, sondern auf Signal warten!)
self.addEventListener("install", event => {
    console.log("[PWA] Service Worker installiert new version");
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return Promise.allSettled(
                CORE_FILES.map(file => cache.add(file))
            );
        })
    );
});

// MESSAGES (Signale vom UpdateManager empfangen)
self.addEventListener("message", event => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

// AKTIVIEREN + ALTE CACHES LÖSCHEN
self.addEventListener("activate", event => {
    console.log("[PWA] Service Worker aktiviert");
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
    ).then(() => self.clients.claim());
});

// FETCH SYSTEM (Cache First, dann Network Fallback)
self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then(networkResponse => {
                return networkResponse;
            }).catch(() => {
                // Offline-Handling falls Netzwerk fehlschlägt
            });
        })
    );
});
