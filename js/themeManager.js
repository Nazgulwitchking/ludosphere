/*
=========================================================
LUDOSPHERE THEME MANAGER
=========================================================
*/

const ThemeManager = {

    currentTheme: null,

    init() {

        const savedTheme =
            StorageManager.getTheme();

        this.applyTheme(
            savedTheme
        );

        console.log(
            "[ThemeManager] Initialized"
        );

    },



    applyTheme(themeName) {

        if (
            !CONFIG.SUPPORTED_THEMES.includes(
                themeName
            )
        ) {

            themeName =
                CONFIG.DEFAULT_THEME;

        }

        document.body.classList.remove(

            ...CONFIG.SUPPORTED_THEMES.map(
                theme => `theme-${theme}`
            )

        );

        document.body.classList.add(
            `theme-${themeName}`
        );

        this.currentTheme =
            themeName;

        StorageManager.setTheme(
            themeName
        );

        this.updateBackground(
            themeName
        );

    },



    updateBackground(themeName) {

        const background =
            document.getElementById(
                "backgroundLayer"
            );

        if (!background) return;

        background.className =
            `background-layer ${themeName}`;

    },



    getCurrentTheme() {

        return this.currentTheme;

    }

};