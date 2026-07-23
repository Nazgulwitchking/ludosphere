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
        this.setupModalEvents(); // Initialisiert die Klick-Events für das Settings-Modal
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
        
        // Dynamische Anpassung der Browser-Statusleiste
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            const colors = {
                neutral: "#4f78db",
                midnight: "#081026",
                sunny: "#38bdf8",
                cyberpunk: "#090514"
            };
            themeColorMeta.setAttribute("content", colors[themeName] || "#081026");
        }

        const themeSelect = document.getElementById("themeSelect");
        if (themeSelect) {
            themeSelect.value = themeName;
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
            this.buildInfernoOverlay(overlay);
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
       SETTINGS MODAL EVENT HANDLER & HELPER
       ========================================================= */
    setupModalEvents() {
        const bindEvents = () => {
            const settingsBtn = document.getElementById("settingsBtn");
            const closeSettingsBtn = document.getElementById("closeSettingsBtn");
            const settingsModal = document.getElementById("settingsModal");
            const themeSelect = document.getElementById("themeSelect");

            if (settingsBtn && settingsModal) {
                settingsBtn.onclick = () => {
                    if (themeSelect) {
                        themeSelect.value = this.getCurrentTheme();
                    }
                    settingsModal.style.display = "flex";
                };
            }

            if (closeSettingsBtn && settingsModal) {
                closeSettingsBtn.onclick = () => {
                    settingsModal.style.display = "none";
                };
            }

            if (themeSelect) {
                themeSelect.onchange = (e) => {
                    this.applyTheme(e.target.value);
                };
            }

            window.addEventListener("click", (event) => {
                if (event.target === settingsModal) {
                    settingsModal.style.display = "none";
                }
            });
        };

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", bindEvents);
        } else {
            bindEvents();
        }
    },

    getCurrentTheme() {
        return this.currentTheme;
    }
};
