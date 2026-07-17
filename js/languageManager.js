/*
=========================================================
LUDOSPHERE LANGUAGE MANAGER
=========================================================
*/

const LanguageManager = {

    currentLanguage: null,

    translations: {},



    /*
    =========================================================
    INIT
    =========================================================
    */

    async init() {

        const savedLanguage =
            StorageManager.getLanguage();

        await this.loadLanguage(
            savedLanguage
        );

        console.log(
            "[LanguageManager] Initialized"
        );

    },



    /*
    =========================================================
    LOAD LANGUAGE
    =========================================================
    */

    async loadLanguage(languageCode) {

        try {

            const response =
                await fetch(
                    `languages/${languageCode}.json`
                );

            if (!response.ok) {

                throw new Error(
                    "Language file not found"
                );

            }

            this.translations =
                await response.json();

            this.currentLanguage =
                languageCode;

            StorageManager.setLanguage(
                languageCode
            );

            this.translatePage();

        }

        catch (error) {

            console.error(
                "[LanguageManager]",
                error
            );

            if (languageCode !== "de") {

                await this.loadLanguage(
                    "de"
                );

            }

        }

    },



    /*
    =========================================================
    GET TRANSLATION
    =========================================================
    */

    get(key) {

        return (
            this.translations[key]
            || key
        );

    },



    /*
    =========================================================
    TRANSLATE PAGE
    =========================================================
    */

    translatePage() {

        const elements =
            document.querySelectorAll(
                "[data-i18n]"
            );

        elements.forEach(element => {

            const key =
                element.dataset.i18n;

            element.textContent =
                this.get(key);

        });

    },



    /*
    =========================================================
    CHANGE LANGUAGE
    =========================================================
    */

    async changeLanguage(languageCode) {

        await this.loadLanguage(
            languageCode
        );

    },



    /*
    =========================================================
    CURRENT LANGUAGE
    =========================================================
    */

    getCurrentLanguage() {

        return this.currentLanguage;

    }

};