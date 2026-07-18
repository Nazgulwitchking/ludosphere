const CACHE_NAME = "ludosphere-cache-v1";


const CORE_FILES = [

    "/",
    "/index.html",

    "/css/core.css",

    "/js/config.js",
    "/js/storageManager.js",
    "/js/languageManager.js",
    "/js/themeManager.js",
    "/js/installManager.js",
    "/js/onboardingManager.js",
    "/js/navigationManager.js",
    "/js/searchManager.js",
    "/js/accountManager.js",
    "/js/gameManager.js",
    "/js/updateManager.js",
    "/js/app.js",

    "/manifest.json"

];



// INSTALL

self.addEventListener(
    "install",
    event => {

        console.log(
            "Ludosphere Service Worker installiert"
        );


        self.skipWaiting();


        event.waitUntil(

            caches.open(CACHE_NAME)

            .then(cache => {

                return cache.addAll(
                    CORE_FILES
                );

            })

        );

    }

);





// AKTIVIEREN + ALTE CACHES LÖSCHEN

self.addEventListener(
    "activate",
    event => {


        event.waitUntil(

            caches.keys()

            .then(cacheNames => {


                return Promise.all(

                    cacheNames.map(cache => {


                        if(
                            cache !== CACHE_NAME
                        ){

                            console.log(
                                "Alter Cache gelöscht:",
                                cache
                            );


                            return caches.delete(
                                cache
                            );

                        }


                    })

                );


            })

        );


        self.clients.claim();


    }

);






// FETCH SYSTEM

self.addEventListener(
    "fetch",
    event => {


        event.respondWith(


            fetch(event.request)

            .then(response => {


                return response;


            })

            .catch(() => {


                return caches.match(
                    event.request
                );


            })


        );


    }

);