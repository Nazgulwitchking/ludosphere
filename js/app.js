document.addEventListener(
    "DOMContentLoaded",
    async () => {

        if (
    "serviceWorker"
    in navigator
) {

    navigator.serviceWorker
        .register("sw.js")
        .then(() => {

            console.log(
                "[PWA] Service Worker Registered"
            );

        });

}

        StorageManager.init();

        ApiManager.init();

        await LanguageManager.init();
        
        ThemeManager.init();

        InstallManager.init();

        NavigationManager.init();

        SearchManager.init();

        AccountManager.init();

        UpdateManager.init();

        await GameManager.init();

        OnboardingManager.init();

        console.log(
            "Ludosphere gestartet"
        );

    }
);