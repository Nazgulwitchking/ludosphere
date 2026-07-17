/*
=========================================================
LUDOSPHERE INSTALL MANAGER
=========================================================
*/

const InstallManager = {

    deferredPrompt: null,



    /*
    =========================================================
    INIT
    =========================================================
    */

    init() {

        this.detectInstalledState();

        this.setupInstallPrompt();

        this.setupInstallButton();

        console.log(
            "[InstallManager] Initialized"
        );

    },



    /*
    =========================================================
    APP INSTALLATION DETECTION
    =========================================================
    */

    detectInstalledState() {

        const isStandalone =
            window.matchMedia(
                "(display-mode: standalone)"
            ).matches;

        const isIOSStandalone =
            window.navigator.standalone === true;

        if (
            isStandalone ||
            isIOSStandalone
        ) {

            StorageManager.setInstalled(
                true
            );

        }

    },



    /*
    =========================================================
    BEFORE INSTALL PROMPT
    =========================================================
    */

    setupInstallPrompt() {

        window.addEventListener(
            "beforeinstallprompt",
            (event) => {

                event.preventDefault();

                this.deferredPrompt =
                    event;

                const button =
                    document.getElementById(
                        "installButton"
                    );

                if (button) {

                    button.style.display =
                        "block";

                }

            }
        );

    },



    /*
    =========================================================
    INSTALL BUTTON
    =========================================================
    */

    setupInstallButton() {

        const button =
            document.getElementById(
                "installButton"
            );

        if (!button) return;

        button.addEventListener(
            "click",
            async () => {

                await this.install();

            }
        );

    },



    /*
    =========================================================
    INSTALL APP
    =========================================================
    */

    async install() {

        if (
            !this.deferredPrompt
        ) {

            if (
                this.isIOS()
            ) {

                this.showIOSGuide();

            }

            return;

        }

        this.deferredPrompt.prompt();

        const result =
            await this.deferredPrompt.userChoice;

        if (
            result.outcome ===
            "accepted"
        ) {

            StorageManager.setInstalled(
                true
            );

            console.log(
                "[InstallManager] Installed"
            );

        }

        this.deferredPrompt =
            null;

    },



    /*
    =========================================================
    IOS DETECTION
    =========================================================
    */

    isIOS() {

        return /iPad|iPhone|iPod/.test(
            navigator.userAgent
        );

    },



    /*
    =========================================================
    IOS GUIDE
    =========================================================
    */

    showIOSGuide() {

        alert(
            "Öffne Safari und tippe auf 'Zum Home-Bildschirm'."
        );

    },



    /*
    =========================================================
    APP MODE
    =========================================================
    */

    isRunningAsApp() {

        return (
            window.matchMedia(
                "(display-mode: standalone)"
            ).matches
            ||
            window.navigator.standalone
        );

    },



    /*
    =========================================================
    WEBSITE MODE
    =========================================================
    */

    isRunningInBrowser() {

        return !this.isRunningAsApp();

    }

};