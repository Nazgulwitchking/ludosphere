/*
=========================================================
LUDOSPHERE THEME MANAGER
=========================================================
*/

const ThemeManager = {

    currentTheme: null,

    init() {
        const savedTheme = StorageManager.getTheme();
        this.applyTheme(savedTheme);
        this.setupThemeSelectionEvents(); // Initialisiert Klick-Events für die Theme-Buttons im Overlay
        console.log("[ThemeManager] Initialized");
    },

    applyTheme(themeName) {
        if (!CONFIG.SUPPORTED_THEMES.includes(themeName)) {
            themeName = CONFIG.DEFAULT_THEME;
        }

        const themeClasses = CONFIG.SUPPORTED_THEMES.map(theme => `theme-${theme}`);

        // Setzt die Klasse auf html UND body
        document.documentElement.classList.remove(...themeClasses);
        document.body.classList.remove(...themeClasses);

        document.documentElement.classList.add(`theme-${themeName}`);
        document.body.classList.add(`theme-${themeName}`);

        this.currentTheme = themeName;
        StorageManager.setTheme(themeName);

        this.updateBackground(themeName);
        this.updateOverlay(themeName);
        this.updateUISelection(themeName); // Aktualisiert Badges & Häkchen im Overlay
        
        // Dynamische Anpassung der Browser-Statusleiste
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            const colors = {
                neutral: "#4f78db",
                midnight: "#081026",
                sunny: "#38bdf8",
                cyberpunk: "#090514",
                lava: "#1a0500"
            };
            themeColorMeta.setAttribute("content", colors[themeName] || "#081026");
        }
    },

    updateBackground(themeName) {
        const background = document.getElementById("backgroundLayer");
        if (!background) return;
        background.className = `background-layer ${themeName}`;
    },

    /* =========================================================
       OVERLAY STEUERUNG (BEREINIGT FÜR HIGH-RES THEMES)
       ========================================================= */
    updateOverlay(themeName) {
        let overlay = document.getElementById("themeOverlay");
        if (!overlay) return;

        overlay.innerHTML = ""; // Leert alte Elemente

        if (themeName === "midnight") {
            this.buildMidnightOverlay(overlay);
        } else if (themeName === "sunny") {
            this.buildSunnyOverlay(overlay);
        } else if (themeName === "cyberpunk") {
            this.buildCyberpunkOverlay(overlay);
        } else if (themeName === "lava")  {
            this.buildLavaOverlay(overlay);
        } else if (themeName === "royal") {
            this.buildRoyalOverlay(overlay);
        } else if (themeName === "aurora") {
            this.buildAuroraOverlay(overlay);
        } else if (themeName === "sakura") {
            this.buildSakuraOverlay(overlay);
        } else if (themeName === "galaxy") {
            this.buildGalaxyOverlay(overlay);
        } else if (themeName === "forest") {
            this.buildForestOverlay(overlay);
        } else if (themeName === "winter") {
            this.buildWinterOverlay(overlay);
        }
    },

    /* ==================== 2. MIDNIGHT ==================== */
    buildMidnightOverlay(container) {
        // Hintergrund wird vollständig via CSS (bg.PNG) geregelt.
        // Hier folgen später die animierten Fledermäuse!
    },

    /* ==================== 3. SUNNY ==================== */
    buildSunnyOverlay(container) {
        // Platzhalter für spätere Sunny-Animationen
    },

    /* ==================== 4. CYBERPUNK ==================== */
    buildCyberpunkOverlay(container) {
        // Platzhalter für spätere Cyberpunk-Animationen
    },

    /* ==================== 5. Lava ======================= */
    buildLavaOverlay(container) {
        // Platzhalter für spätere Lava-Animationen
    },

    /* ==================== 6. Royal ====================== */
    buildRoyalOverlay(container) {
        // Platzhalter für spätere Royal-Animationen
    },
    
    /* ==================== 7. Aurora ==================== */
    buildAuroraOverlay(container) {
        // Platzhalter für spätere Aurora-Animationen
    },

    /* ==================== 8. Sakura ==================== */
    buildSakuraOverlay(container) {
        // Platzhalter für spätere Sakura-Animationen
    },

    /* ==================== 9. Galaxy ==================== */
    buildGalaxyOverlay(container) {
        // Platzhalter für spätere Galaxy-Animationen
    },

    /* ==================== 10. Forest =================== */
    buildForestOverlay(container) {
        // Platzhalter für spätere Forest-Animationen
    },

    /* ==================== 11. Winter =================== */
    buildWinterOverlay(container) {
        // Platzhalter für spätere Winter-Animationen
    },

    /* =========================================================
       THEME SELECTION EVENT HANDLER & UI UPDATE
       ========================================================= */
    setupThemeSelectionEvents() {
        const themeOptionBtns = document.querySelectorAll(".theme-option-btn");
        themeOptionBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const selectedTheme = btn.getAttribute("data-theme");
                if (selectedTheme) {
                    this.applyTheme(selectedTheme);
                }
            });
        });
    },

    updateUISelection(themeName) {
        // 1. Text-Badge auf der Haupt-Einstellungsseite aktualisieren
        const currentThemeBadge = document.getElementById("currentThemeBadge");
        if (currentThemeBadge) {
            currentThemeBadge.textContent = themeName;
        }

        // 2. Aktiven Button im Theme-Overlay hervorheben
        const themeOptionBtns = document.querySelectorAll(".theme-option-btn");
        themeOptionBtns.forEach(btn => {
            if (btn.getAttribute("data-theme") === themeName) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    },

    getCurrentTheme() {
        return this.currentTheme;
    }
};
