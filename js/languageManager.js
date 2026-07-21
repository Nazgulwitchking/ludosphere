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
        // Falls noch keine Sprache gespeichert ist, nutzen wir "de" als Standard
        const savedLanguage = StorageManager.getLanguage() || "de";
        await this.loadLanguage(savedLanguage);
        console.log("[LanguageManager] Initialized");
    },

    /* ========================================================= LOAD LANGUAGE ========================================================= */
    async loadLanguage(languageCode) {
        try {
            // Relativer Pfad explizit für iOS PWA abgesichert
            const response = await fetch(`./languages/${languageCode}.json`);
            if (!response.ok) {
                throw new Error(`Language file not found: languages/${languageCode}.json`);
            }

            this.translations = await response.json();
            this.currentLanguage = languageCode;
            StorageManager.setLanguage(languageCode);
            this.translatePage();
        } catch (error) {
            console.error("[LanguageManager] Error loading language:", error);
            
            // Fallback auf Deutsch, falls das Laden einer anderen Sprache fehlschlägt
            if (languageCode !== "de") {
                console.log("[LanguageManager] Falling back to 'de'");
                await this.loadLanguage("de");
            }
        }
    },

    /* ========================================================= GET TRANSLATION ========================================================= */
    get(key) {
        if (!this.translations || Object.keys(this.translations).length === 0) {
            return key;
        }
        return this.translations[key] || key;
    },

    /* ========================================================= TRANSLATE PAGE ========================================================= */
    translatePage() {
        if (!this.translations || Object.keys(this.translations).length === 0) {
            console.warn("[LanguageManager] keine Übersetzungen geladen!");
            return;
        }

        // 1. Normalen Text übersetzen ([data-i18n]) - Nutzt direkt getAttribute
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.getAttribute("data-i18n");
            if (key) {
                element.textContent = this.get(key);
            }
        });

        // 2. Platzhalter in Suchfeldern übersetzen ([data-i18n-placeholder])
        document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
            const key = element.getAttribute("data-i18n-placeholder");
            if (key) {
                element.placeholder = this.get(key);
            }
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
