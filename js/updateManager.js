const UpdateManager = {

    currentVersion: null,

    async init() {

        console.log(
            "[UpdateManager] Initialized"
        );

        this.currentVersion =
            APP_CONFIG.version;

        await this.checkForUpdates();

        this.startAutoCheck();

    },

    async checkForUpdates() {

        try {

            const response =
                await fetch(
                    "version.json?t=" +
                    Date.now(),
                    {
                        cache: "no-store"
                    }
                );

            const data =
                await response.json();

            if(
                data.version !==
                this.currentVersion
            ) {

                console.log(
                    "[UpdateManager] New Version Found"
                );

                await this.performUpdate(
                    data.version
                );

            }

        }

        catch(error) {

            console.error(
                "[UpdateManager]",
                error
            );

        }

    },

    async performUpdate(
        newVersion
    ) {

        console.log(
            "[UpdateManager] Updating..."
        );

        try {

            if(
                "serviceWorker"
                in navigator
            ) {

                const registration =
                    await navigator
                        .serviceWorker
                        .getRegistration();

                if(
                    registration
                ) {

                    await registration.update();

                }

            }

            StorageManager.set(
                "lastVersion",
                newVersion
            );

            window.location.reload(
                true
            );

        }

        catch(error) {

            console.error(
                error
            );

        }

    },

    startAutoCheck() {

        setInterval(
            () => {

                this.checkForUpdates();

            },

            APP_CONFIG.updateCheckInterval
        );

    }

};