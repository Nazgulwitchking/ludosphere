document.addEventListener(
    "DOMContentLoaded",
    async () => {

        StorageManager.init();

        await LanguageManager.init();

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