document.addEventListener(
    "DOMContentLoaded",
    async () => {

        StorageManager.init();

        await LanguageManager.init();

        ThemeManager.init();

        InstallManager.init();

        OnboardingManager.init();

        NavigationManager.init();

        console.log(
            "Ludosphere gestartet"
        );

    }
);