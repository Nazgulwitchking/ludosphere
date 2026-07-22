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

        document.body.classList.remove(
            ...CONFIG.SUPPORTED_THEMES.map(theme => `theme-${theme}`)
        );

        document.body.classList.add(`theme-${themeName}`);
        this.currentTheme = themeName;
        StorageManager.setTheme(themeName);

        this.updateBackground(themeName);
        this.updateOverlay(themeName);

        // Dropdown-Wert im Modal mit aktuellem Theme synchronisieren
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
       OVERLAY STEUERUNG (ANIMATIONEN & SPEZIAL-ELEMENTE)
       ========================================================= */
    updateOverlay(themeName) {
        let overlay = document.getElementById("themeOverlay");
        
        // SICHERHEITS-FIX: Nicht am Ende des Bodys anfügen, da es sonst
        // über der Landingpage liegt und Klicks/Install-Button blockiert!
        if (!overlay) return;

        overlay.innerHTML = "";

        if (themeName === "midnight") {
            this.buildMidnightOverlay(overlay);
        } else if (themeName === "sunny") {
            this.buildSunnyOverlay(overlay);
        } else if (themeName === "cyberpunk") {
            this.buildCyberpunkOverlay(overlay);
        }
    },

    /* ==================== 2. MIDNIGHT ==================== */
    buildMidnightOverlay(container) {
        const moon = document.createElement("div");
        moon.className = "midnight-moon";
        container.appendChild(moon);

        const castle = document.createElement("div");
        castle.className = "midnight-castle";
        container.appendChild(castle);

        for (let i = 0; i < 3; i++) {
            const bat = document.createElement("div");
            bat.className = "animated-bat";
            bat.style.top = `${20 + i * 15}%`;
            bat.style.animationDelay = `${i * 4}s`;
            bat.style.animationDuration = `${10 + i * 3}s`;
            container.appendChild(bat);
        }

        const cloud = document.createElement("div");
        cloud.className = "animated-cloud";
        container.appendChild(cloud);
    },

    /* ==================== 3. SUNNY ==================== */
    buildSunnyOverlay(container) {
        const sun = document.createElement("div");
        sun.className = "sunny-sun";
        container.appendChild(sun);

        const beach = document.createElement("div");
        beach.className = "sunny-beach";
        container.appendChild(beach);

        for (let i = 0; i < 2; i++) {
            const seagull = document.createElement("div");
            seagull.className = "animated-seagull";
            seagull.style.top = `${15 + i * 20}%`;
            seagull.style.animationDelay = `${i * 6}s`;
            container.appendChild(seagull);
        }
    },

    /* ==================== 4. CYBERPUNK ==================== */
    buildCyberpunkOverlay(container) {
        const grid = document.createElement("div");
        grid.className = "cyberpunk-grid";
        container.appendChild(grid);

        const skyline = document.createElement("div");
        skyline.className = "cyberpunk-skyline";
        container.appendChild(skyline);

        const rainContainer = document.createElement("div");
        rainContainer.className = "cyberpunk-rain";
        for (let i = 0; i < 15; i++) {
            const drop = document.createElement("div");
            drop.className = "rain-drop";
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDuration = `${0.6 + Math.random() * 0.5}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            rainContainer.appendChild(drop);
        }
        container.appendChild(rainContainer);
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

            // NEU: Reagiert SOFORT, sobald im Dropdown ein Theme ausgewählt wird
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
