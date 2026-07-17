const AccountManager = {

    currentUser: null,

    init() {

        console.log(
            "[AccountManager] Initialized"
        );

        this.loadLocalUser();

    },

    loadLocalUser() {

        this.currentUser =
            StorageManager.get(
                "user",
                null
            );

    },

    isLoggedIn() {

        return this.currentUser !== null;

    },

    getUser() {

        return this.currentUser;

    },

    login(userData) {

        this.currentUser = {

            id: userData.id,

            name: userData.name,

            email: userData.email,

            provider: userData.provider,

            createdAt: Date.now()

        };

        StorageManager.set(
            "user",
            this.currentUser
        );

        console.log(
            "[AccountManager] Login successful"
        );

    },

    logout() {

        this.currentUser = null;

        StorageManager.remove(
            "user"
        );

        console.log(
            "[AccountManager] Logout"
        );

    },

    saveCloudData() {

        if(!this.isLoggedIn()) {

            return;

        }

        const cloudData = {

            settings:
                StorageManager.get(
                    "settings",
                    {}
                ),

            myGames:
                StorageManager.get(
                    "myGames",
                    []
                ),

            language:
                StorageManager.get(
                    "language",
                    APP_CONFIG.defaultLanguage
                ),

            theme:
                StorageManager.get(
                    "theme",
                    APP_CONFIG.defaultTheme
                )

        };

        console.log(
            "[AccountManager] Cloud Sync",
            cloudData
        );

        /*
        Später:

        fetch(
            API_URL + "/sync",
            {
                method: "POST",
                body: JSON.stringify(
                    cloudData
                )
            }
        )
        */

    }

};