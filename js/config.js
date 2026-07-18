/*
=========================================================
LUDOSPHERE CONFIGURATION
=========================================================
*/

const CONFIG = {

    /*
    =========================================================
    APP
    =========================================================
    */

    APP_NAME: "Ludosphere",

    APP_SHORT_NAME: "Ludosphere",

    APP_DESCRIPTION:
        "Kostenlose Partyspiele für Freunde, Familie und Gruppen.",

    VERSION: "1.0.0",

    BUILD: 1,

    AUTHOR: "Ludosphere",

    DEBUG_MODE: true,


    /*
    =========================================================
    DEFAULTS
    =========================================================
    */

    DEFAULT_LANGUAGE: "de",

    DEFAULT_THEME: "neutral",

    DEFAULT_PLAYGROUP: "friends",

    DEFAULT_GENDER: "unknown",


    /*
    =========================================================
    STORAGE KEYS
    =========================================================
    */

    STORAGE_KEYS: {

        LANGUAGE: "ludosphere_language",

        THEME: "ludosphere_theme",

        PLAYGROUP: "ludosphere_playgroup",

        GENDER: "ludosphere_gender",

        FAVORITES: "ludosphere_favorites",

        MY_GAMES: "ludosphere_my_games",

        APP_INSTALLED: "ludosphere_installed",

        ONBOARDING_DONE: "ludosphere_onboarding",

        LAST_VERSION: "ludosphere_last_version",

        ACCOUNT_ID: "ludosphere_account_id"

    },


    /*
    =========================================================
    PWA
    =========================================================
    */

    PWA: {

        ENABLED: true,

        OFFLINE_ENABLED: true,

        IOS_SUPPORTED: true,

        ANDROID_SUPPORTED: true,

        INSTALL_PROMPT_ENABLED: true

    },


    /*
    =========================================================
    CACHE
    =========================================================
    */

    CACHE: {

        NAME: "ludosphere-cache-v1",

        STATIC_CACHE: "ludosphere-static-v1",

        DYNAMIC_CACHE: "ludosphere-dynamic-v1",

        OFFLINE_CACHE: "ludosphere-offline-v1",

        MAX_DYNAMIC_ITEMS: 500

    },


    /*
    =========================================================
    UPDATES
    =========================================================
    */

    UPDATE: {

        ENABLED: true,

        CHECK_ON_STARTUP: true,

        CHECK_INTERVAL: 300000,

        FORCE_RELOAD: true,

        CLEAR_CACHE_ON_UPDATE: true,

        VERSION_URL:
            "https://raw.githubusercontent.com/USERNAME/ludosphere/main/version.json"

    },


    /*
    =========================================================
    ACCOUNTS
    =========================================================
    */

    ACCOUNTS: {

        ENABLED: true,

        OPTIONAL: true,

        CLOUD_SYNC: true

    },


    /*
    =========================================================
    API
    =========================================================
    */

    API: {

        BASE_URL:
            "https://api.ludosphere.app",

        GAMES_ENDPOINT:
            "/games",

        ACCOUNT_ENDPOINT:
            "/account",

        FAVORITES_ENDPOINT:
            "/favorites",
        SYNC_ENDPOINT:
            "/sync",

        LOGIN_ENDPOINT:
            "/login",

        REGISTER_ENDPOINT:
            "/register",

        VERSION_ENDPOINT:
            "/version",
    },


    /*
    =========================================================
    SEARCH
    =========================================================
    */

    SEARCH: {

        MAX_RESULTS: 50,

        MIN_CHARACTERS: 1,

        DEBOUNCE_MS: 300

    },


    /*
    =========================================================
    LANGUAGES
    =========================================================
    */

    SUPPORTED_LANGUAGES: [

        {
            code: "de",
            name: "Deutsch"
        },

        {
            code: "en",
            name: "English"
        },

        {
            code: "es",
            name: "Español"
        },

        {
            code: "fr",
            name: "Français"
        },

        {
            code: "it",
            name: "Italiano"
        },

        {
            code: "nl",
            name: "Nederlands"
        },

        {
            code: "pl",
            name: "Polski"
        },

        {
            code: "pt",
            name: "Português"
        },

        {
            code: "ru",
            name: "Русский"
        },

        {
            code: "tr",
            name: "Türkçe"
        }

    ],


    /*
    =========================================================
    THEMES
    =========================================================
    */

    SUPPORTED_THEMES: [

        "neutral",

        "midnight",

        "sunny",

        "cyberpunk",

        "aurora",

        "sakura",

        "galaxy",

        "lava",

        "forest",

        "winter",

        "royal"

    ],


    /*
    =========================================================
    NAVIGATION
    =========================================================
    */

    PAGES: {

        LIBRARY: "library",

        MY_GAMES: "myGames"

    },


    /*
    =========================================================
    ONBOARDING
    =========================================================
    */

    ONBOARDING: {

        ENABLED: true,

        STEPS: [

            "welcome",

            "playgroup",

            "gender",

            "language"

        ]

    },


    /*
    =========================================================
    GAME CATEGORIES
    =========================================================
    */

    GAME_CATEGORIES: [

        "party",

        "friends",

        "family",

        "school",

        "couple",

        "quiz",

        "guessing",

        "drinking",

        "funny",

        "social"

    ]

};


/*
=========================================================
FREEZE CONFIG
=========================================================
*/

Object.freeze(CONFIG);