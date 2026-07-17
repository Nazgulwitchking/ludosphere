/*
=========================================================
LUDOSPHERE STORAGE MANAGER
=========================================================
*/

const StorageManager = {

    /*
    =========================================================
    INITIALIZATION
    =========================================================
    */

    init() {

        this.createDefaults();

        console.log(
            "[StorageManager] Initialized"
        );

    },



    /*
    =========================================================
    DEFAULT VALUES
    =========================================================
    */

    createDefaults() {

        if (!this.exists(CONFIG.STORAGE_KEYS.LANGUAGE)) {

            this.setLanguage(
                CONFIG.DEFAULT_LANGUAGE
            );

        }

        if (!this.exists(CONFIG.STORAGE_KEYS.THEME)) {

            this.setTheme(
                CONFIG.DEFAULT_THEME
            );

        }

        if (!this.exists(CONFIG.STORAGE_KEYS.PLAYGROUP)) {

            this.setPlayGroup(
                CONFIG.DEFAULT_PLAYGROUP
            );

        }

        if (!this.exists(CONFIG.STORAGE_KEYS.GENDER)) {

            this.setGender(
                CONFIG.DEFAULT_GENDER
            );

        }

        if (!this.exists(CONFIG.STORAGE_KEYS.FAVORITES)) {

            this.setFavorites([]);

        }

        if (!this.exists(CONFIG.STORAGE_KEYS.MY_GAMES)) {

            this.setMyGames([]);

        }

        if (!this.exists(CONFIG.STORAGE_KEYS.ONBOARDING_DONE)) {

            this.setOnboardingDone(false);

        }

        if (!this.exists(CONFIG.STORAGE_KEYS.APP_INSTALLED)) {

            this.setInstalled(false);

        }

    },



    /*
    =========================================================
    BASIC STORAGE
    =========================================================
    */

    set(key, value) {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    },



    get(key, fallback = null) {

        try {

            const value =
                localStorage.getItem(key);

            if (value === null) {

                return fallback;

            }

            return JSON.parse(value);

        }

        catch (error) {

            console.error(error);

            return fallback;

        }

    },



    remove(key) {

        localStorage.removeItem(key);

    },



    exists(key) {

        return localStorage.getItem(key)
            !== null;

    },



    clear() {

        localStorage.clear();

    },



    /*
    =========================================================
    LANGUAGE
    =========================================================
    */

    setLanguage(language) {

        this.set(
            CONFIG.STORAGE_KEYS.LANGUAGE,
            language
        );

    },



    getLanguage() {

        return this.get(
            CONFIG.STORAGE_KEYS.LANGUAGE,
            CONFIG.DEFAULT_LANGUAGE
        );

    },



    /*
    =========================================================
    THEME
    =========================================================
    */

    setTheme(theme) {

        this.set(
            CONFIG.STORAGE_KEYS.THEME,
            theme
        );

    },



    getTheme() {

        return this.get(
            CONFIG.STORAGE_KEYS.THEME,
            CONFIG.DEFAULT_THEME
        );

    },



    /*
    =========================================================
    PLAY GROUP
    =========================================================
    */

    setPlayGroup(group) {

        this.set(
            CONFIG.STORAGE_KEYS.PLAYGROUP,
            group
        );

    },



    getPlayGroup() {

        return this.get(
            CONFIG.STORAGE_KEYS.PLAYGROUP,
            CONFIG.DEFAULT_PLAYGROUP
        );

    },



    /*
    =========================================================
    GENDER
    =========================================================
    */

    setGender(gender) {

        this.set(
            CONFIG.STORAGE_KEYS.GENDER,
            gender
        );

    },



    getGender() {

        return this.get(
            CONFIG.STORAGE_KEYS.GENDER,
            CONFIG.DEFAULT_GENDER
        );

    },



    /*
    =========================================================
    FAVORITES
    =========================================================
    */

    setFavorites(favorites) {

        this.set(
            CONFIG.STORAGE_KEYS.FAVORITES,
            favorites
        );

    },



    getFavorites() {

        return this.get(
            CONFIG.STORAGE_KEYS.FAVORITES,
            []
        );

    },



    addFavorite(gameId) {

        const favorites =
            this.getFavorites();

        if (!favorites.includes(gameId)) {

            favorites.push(gameId);

            this.setFavorites(
                favorites
            );

        }

    },



    removeFavorite(gameId) {

        const favorites =
            this.getFavorites();

        const updated =
            favorites.filter(
                id => id !== gameId
            );

        this.setFavorites(
            updated
        );

    },



    isFavorite(gameId) {

        return this.getFavorites()
            .includes(gameId);

    },



    /*
    =========================================================
    MY GAMES
    =========================================================
    */

    setMyGames(games) {

        this.set(
            CONFIG.STORAGE_KEYS.MY_GAMES,
            games
        );

    },



    getMyGames() {

        return this.get(
            CONFIG.STORAGE_KEYS.MY_GAMES,
            []
        );

    },



    addMyGame(gameId) {

        const games =
            this.getMyGames();

        if (!games.includes(gameId)) {

            games.push(gameId);

            this.setMyGames(
                games
            );

        }

    },



    removeMyGame(gameId) {

        const games =
            this.getMyGames();

        const updated =
            games.filter(
                id => id !== gameId
            );

        this.setMyGames(
            updated
        );

    },



    /*
    =========================================================
    ONBOARDING
    =========================================================
    */

    setOnboardingDone(value) {

        this.set(
            CONFIG.STORAGE_KEYS.ONBOARDING_DONE,
            value
        );

    },



    isOnboardingDone() {

        return this.get(
            CONFIG.STORAGE_KEYS.ONBOARDING_DONE,
            false
        );

    },



    /*
    =========================================================
    INSTALLATION
    =========================================================
    */

    setInstalled(value) {

        this.set(
            CONFIG.STORAGE_KEYS.APP_INSTALLED,
            value
        );

    },



    isInstalled() {

        return this.get(
            CONFIG.STORAGE_KEYS.APP_INSTALLED,
            false
        );

    },



    /*
    =========================================================
    VERSION
    =========================================================
    */

    setLastVersion(version) {

        this.set(
            CONFIG.STORAGE_KEYS.LAST_VERSION,
            version
        );

    },



    getLastVersion() {

        return this.get(
            CONFIG.STORAGE_KEYS.LAST_VERSION,
            null
        );

    },



    /*
    =========================================================
    ACCOUNT
    =========================================================
    */

    setAccountId(id) {

        this.set(
            CONFIG.STORAGE_KEYS.ACCOUNT_ID,
            id
        );

    },



    getAccountId() {

        return this.get(
            CONFIG.STORAGE_KEYS.ACCOUNT_ID,
            null
        );

    },



    hasAccount() {

        return this.getAccountId()
            !== null;

    },



    /*
    =========================================================
    EXPORT
    =========================================================
    */

    exportUserData() {

        return {

            language:
                this.getLanguage(),

            theme:
                this.getTheme(),

            playGroup:
                this.getPlayGroup(),

            gender:
                this.getGender(),

            favorites:
                this.getFavorites(),

            myGames:
                this.getMyGames(),

            installed:
                this.isInstalled(),

            onboarding:
                this.isOnboardingDone()

        };

    }

};


/*
=========================================================
AUTO INIT
=========================================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        StorageManager.init();

    }
);