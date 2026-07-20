/*
=========================================================
LUDOSPHERE LANGUAGE MANAGER
=========================================================
*/

const LanguageManager = {
    currentLanguage: null,
    translations: {},

    /* ========================================================= INIT ========================================================= */
    async init() {
        // Falls noch keine Sprache gespeichert ist (erster Start), nutzen wir "de" als Standard
        const savedLanguage = StorageManager.getLanguage() || "de";
        await this.loadLanguage(savedLanguage);
        console.log("[LanguageManager] Initialized");
    },

    /* ========================================================= LOAD LANGUAGE ========================================================= */
    async loadLanguage(languageCode) {
        try {
            const response = await fetch(`languages/${languageCode}.json`);
            if (!response.ok) {
                throw new Error(`Language file not found: languages/${languageCode}.json`);
            }

            this.translations = await response.json();
            this.currentLanguage = languageCode;
            StorageManager.setLanguage(languageCode);
            this.translatePage();
        } catch (error) {
            console.error("[LanguageManager] Error loading language:", error);
            
            // Wenn das Laden fehlschlägt und es nicht schon "de" war, versuche "de" zu laden
            if (languageCode !== "de") {
                console.log("[LanguageManager] Falling back to 'de'");
                await this.loadLanguage("de");
            }
        }
    },

    /* ========================================================= GET TRANSLATION ========================================================= */
    get(key) {
        return this.translations[key] || key;
    },

    /* ========================================================= TRANSLATE PAGE ========================================================= */
    translatePage() {
        // 1. Normalen Text übersetzen ([data-i18n])
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.dataset.i18n;
            element.textContent = this.get(key);
        });

        // 2. Platzhalter in Suchfeldern übersetzen ([data-i18n-placeholder])
        document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
            const key = element.dataset.i18nPlaceholder;
            element.placeholder = this.get(key);
        });
    },

    /* ========================================================= CHANGE LANGUAGE ========================================================= */
    async changeLanguage(languageCode) {
        await this.loadLanguage(languageCode);
    },

    /* ========================================================= CURRENT LANGUAGE ========================================================= */
    getCurrentLanguage() {
        return this.currentLanguage;
    }
};
