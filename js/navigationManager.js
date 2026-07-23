/*
=========================================================
LUDOSPHERE NAVIGATION MANAGER
=========================================================
*/

const NavigationManager = {

    currentPage: "library",

    init() {
        this.setupNavigation();
        this.setupOverlayNavigation();
        this.setupLanguageSelectionEvents();

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
        const settingsBtn = document.getElementById("settingsBtn");
        const settingsOverlay = document.getElementById("settingsOverlay");
        const closeSettingsBtn = document.getElementById("closeSettingsBtn");

        const themeOptionBtn = document.getElementById("themeOptionBtn");
        const themeOverlayModal = document.getElementById("themeOverlayModal");
        const backFromThemesBtn = document.getElementById("backFromThemesBtn");

        const languageOptionBtn = document.getElementById("languageOptionBtn");
        const languageOverlayModal = document.getElementById("languageOverlayModal");
        const backFromLanguagesBtn = document.getElementById("backFromLanguagesBtn");

        // Settings öffnen / schließen
        if (settingsBtn && settingsOverlay) {
            settingsBtn.addEventListener("click", () => {
                settingsOverlay.classList.remove("hidden");
            });
        }

        if (closeSettingsBtn && settingsOverlay) {
            closeSettingsBtn.addEventListener("click", () => {
                settingsOverlay.classList.add("hidden");
            });
        }

        // Theme-Overlay öffnen / zurück
        if (themeOptionBtn && themeOverlayModal) {
            themeOptionBtn.addEventListener("click", () => {
                themeOverlayModal.classList.remove("hidden");
            });
        }

        if (backFromThemesBtn && themeOverlayModal) {
            backFromThemesBtn.addEventListener("click", () => {
                themeOverlayModal.classList.add("hidden");
            });
        }

        // Sprach-Overlay öffnen / zurück
        if (languageOptionBtn && languageOverlayModal) {
            languageOptionBtn.addEventListener("click", () => {
                languageOverlayModal.classList.remove("hidden");
            });
        }

        if (backFromLanguagesBtn && languageOverlayModal) {
            backFromLanguagesBtn.addEventListener("click", () => {
                languageOverlayModal.classList.add("hidden");
            });
        }
    },

    setupLanguageSelectionEvents() {
        const langBtns = document.querySelectorAll(".lang-option-btn");
        langBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const selectedLang = btn.getAttribute("data-lang");
                
                // Sprach-Klassen umschalten (Grüner Rahmen & Haken)
                langBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                // Falls LanguageManager vorhanden ist, Sprache wechseln
                if (typeof LanguageManager !== "undefined" && LanguageManager.setLanguage) {
                    LanguageManager.setLanguage(selectedLang);
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
