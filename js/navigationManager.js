/*
=========================================================
LUDOSPHERE NAVIGATION MANAGER
=========================================================
*/

const NavigationManager = {

    currentPage: "library",

    // Mapping für schöne Sprach-Namen im Label
    langNames: {
        de: "Deutsch",
        en: "English",
        es: "Español",
        fr: "Français",
        it: "Italiano",
        nl: "Nederlands",
        pl: "Polski",
        pt: "Português",
        ru: "Русский",
        tr: "Türkçe"
    },

    init() {
        this.setupNavigation();
        this.setupOverlayNavigation();
        this.setupLanguageSelectionEvents();
        this.setupThemeSelectionEvents();

        this.showPage("library");

        console.log("[NavigationManager] Initialized");
    },

    setupNavigation() {
        const libraryBtn = document.getElementById("libraryTab");
        const myGamesBtn = document.getElementById("myGamesTab");

        if (libraryBtn) {
            libraryBtn.addEventListener("click", () => {
                this.showPage("library");
            });
        }

        if (myGamesBtn) {
            myGamesBtn.addEventListener("click", () => {
                this.showPage("myGames");
            });
        }
    },

    setupOverlayNavigation() {
        // IDs korrigiert für HTML Match
        const settingsBtn = document.getElementById("settingsBtn");
        const settingsOverlay = document.getElementById("settingsOverlayModal"); // Korrigiert!
        const closeSettingsBtn = document.getElementById("closeSettingsBtn");

        const linkAccountBtn = document.getElementById("linkAccountBtn");
        const accountOverlayModal = document.getElementById("accountOverlayModal");

        const themeOptionBtn = document.getElementById("openThemeBtn"); // Korrigiert!
        const themeOverlayModal = document.getElementById("themeOverlayModal");
        const backFromThemesBtn = document.getElementById("backFromThemesBtn");

        const languageOptionBtn = document.getElementById("openLanguageBtn"); // Korrigiert!
        const languageOverlayModal = document.getElementById("languageOverlayModal");
        const backFromLanguagesBtn = document.getElementById("backFromLanguagesBtn");

        // Settings öffnen / schließen (Zahnrad)
        if (settingsBtn && settingsOverlay) {
            settingsBtn.addEventListener("click", (e) => {
                e.preventDefault();
                settingsOverlay.classList.remove("hidden");
                settingsOverlay.style.setProperty("display", "block", "important");
            });
        }

        if (closeSettingsBtn && settingsOverlay) {
            closeSettingsBtn.addEventListener("click", (e) => {
                e.preventDefault();
                settingsOverlay.classList.add("hidden");
                settingsOverlay.style.setProperty("display", "none", "important");
            });
        }

        // Konto-Overlay öffnen
        if (linkAccountBtn && accountOverlayModal) {
            linkAccountBtn.addEventListener("click", (e) => {
                e.preventDefault();
                accountOverlayModal.classList.remove("hidden");
                accountOverlayModal.style.setProperty("display", "block", "important");
            });
        }

        // Theme-Overlay öffnen / zurück
        if (themeOptionBtn && themeOverlayModal) {
            themeOptionBtn.addEventListener("click", (e) => {
                e.preventDefault();
                themeOverlayModal.classList.remove("hidden");
                themeOverlayModal.style.setProperty("display", "block", "important");
            });
        }

        if (backFromThemesBtn && themeOverlayModal) {
            backFromThemesBtn.addEventListener("click", (e) => {
                e.preventDefault();
                themeOverlayModal.classList.add("hidden");
                themeOverlayModal.style.setProperty("display", "none", "important");
            });
        }

        // Sprach-Overlay öffnen / zurück
        if (languageOptionBtn && languageOverlayModal) {
            languageOptionBtn.addEventListener("click", (e) => {
                e.preventDefault();
                languageOverlayModal.classList.remove("hidden");
                languageOverlayModal.style.setProperty("display", "block", "important");
            });
        }

        if (backFromLanguagesBtn && languageOverlayModal) {
            backFromLanguagesBtn.addEventListener("click", (e) => {
                e.preventDefault();
                languageOverlayModal.classList.add("hidden");
                languageOverlayModal.style.setProperty("display", "none", "important");
            });
        }
    },

    setupLanguageSelectionEvents() {
        const langBtns = document.querySelectorAll(".lang-option-btn");
        const currentLangLabel = document.getElementById("currentLangLabel");

        langBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const selectedLang = btn.getAttribute("data-lang");
                
                // Active-Klasse für Grünen Rahmen/Haken setzen
                langBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                // Label-Vorschau im Hauptmenü direkt aktualisieren
                if (currentLangLabel && this.langNames[selectedLang]) {
                    currentLangLabel.textContent = this.langNames[selectedLang];
                }

                // Sprache über LanguageManager anwenden
                if (typeof LanguageManager !== "undefined" && LanguageManager.setLanguage) {
                    LanguageManager.setLanguage(selectedLang);
                }
            });
        });
    },

    setupThemeSelectionEvents() {
        const themeBtns = document.querySelectorAll(".theme-option-btn");
        const currentThemeBadge = document.getElementById("currentThemeBadge");

        themeBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const selectedTheme = btn.getAttribute("data-theme");

                // Active-Klasse umschalten
                themeBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                // Text des ausgewählten Themes holen & Badge aktualisieren
                const themeNameSpan = btn.querySelector("span[data-i18n]");
                if (currentThemeBadge && themeNameSpan) {
                    currentThemeBadge.textContent = themeNameSpan.textContent;
                }

                // Theme über ThemeManager anwenden
                if (typeof ThemeManager !== "undefined" && ThemeManager.setTheme) {
                    ThemeManager.setTheme(selectedTheme);
                }
            });
        });
    },

    showPage(pageName) {
        const libraryPage = document.getElementById("libraryPage");
        const myGamesPage = document.getElementById("myGamesPage");

        const libraryBtn = document.getElementById("libraryTab");
        const myGamesBtn = document.getElementById("myGamesTab");

        if (pageName === "library") {
            libraryPage?.classList.add("active-page");
            myGamesPage?.classList.remove("active-page");
            libraryBtn?.classList.add("active");
            myGamesBtn?.classList.remove("active");
        }

        if (pageName === "myGames") {
            myGamesPage?.classList.add("active-page");
            libraryPage?.classList.remove("active-page");
            myGamesBtn?.classList.add("active");
            libraryBtn?.classList.remove("active");
        }

        this.currentPage = pageName;
    },

    getCurrentPage() {
        return this.currentPage;
    }
};
