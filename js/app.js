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
        LanguageManager.translatePage();
        
        ThemeManager.init();

        InstallManager.init();

        OnboardingManager.init();

        NavigationManager.init();

        SearchManager.init();

        AccountManager.init();

        UpdateManager.init();

        await GameManager.init();

        console.log(
            "Ludosphere gestartet"
        );

    }
);