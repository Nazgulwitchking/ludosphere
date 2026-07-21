/*
=========================================================
LUDOSPHERE ONBOARDING MANAGER
=========================================================
*/

const OnboardingManager = {

    currentStep: 0,

    steps: [
        "welcome-step",
        "group-step",
        "gender-step",
        "language-step"
    ],

    selectedGroup: null,
    selectedGender: null,
    selectedLanguage: null,

    /*
    =========================================================
    INIT
    =========================================================
    */
    init() {
    // 1. ZUERST alle Event-Listener laden (damit Klicks immer funktionieren):
    this.setupSelections();
    this.setupButtons();

    // 2. Danach prüfen, welcher Screen gezeigt wird:
    if (!InstallManager.isRunningAsApp()) {
        document.getElementById("landing-page").style.display = "block";
        document.getElementById("onboarding").style.display = "none";
        document.getElementById("app").style.display = "none";
        return;
    }

    if (StorageManager.isOnboardingDone()) {
        this.showApp();
        return;
    }

    this.showOnboarding();
    console.log("[OnboardingManager] Initialized");
},

    /*
    =========================================================
    SHOW ONBOARDING
    =========================================================
    */
    showOnboarding() {
        const landing = document.getElementById("landing-page");
        const onboarding = document.getElementById("onboarding");

        if (landing) landing.style.display = "none";
        if (onboarding) onboarding.style.display = "block";

        this.showStep(0);
    },

    /*
    =========================================================
    SHOW STEP
    =========================================================
    */
    showStep(index) {
        this.steps.forEach(stepId => {
            const element = document.getElementById(stepId);
            if (element) {
                element.style.display = "none";
            }
        });

        const current = document.getElementById(this.steps[index]);
        if (current) {
            current.style.display = "block";
        }

        this.currentStep = index;
    },

    /*
    =========================================================
    NEXT STEP
    =========================================================
    */
    nextStep() {
        const next = this.currentStep + 1;
        if (next >= this.steps.length) {
            return;
        }
        this.showStep(next);
    },

        /*
    ========================================================================
    BUTTONS
    ========================================================================
    */
    setupButtons() {
        document.querySelectorAll(".next-step").forEach(button => {
            button.addEventListener("click", () => {
                this.nextStep();
            });
        });

        const finishButton = document.getElementById("finishOnboarding");
        if (finishButton) {
            finishButton.addEventListener("click", () => {
                this.finish();
            });
        }
    },

    /*
    ========================================================================
    SELECTIONS
    ========================================================================
    */
    setupSelections() {
        // --- 1. Gruppen-Auswahl (#group-step) ---
        document.querySelectorAll("#group-step .select-option").forEach(button => {
            button.addEventListener("click", (e) => {
                // Glow-Effekt: .selected bei anderen entfernen, bei diesem hinzufügen
                document.querySelectorAll("#group-step .select-option").forEach(btn => btn.classList.remove("selected"));
                e.currentTarget.classList.add("selected");

                // Daten speichern
                this.selectedGroup = button.dataset.value;
                StorageManager.setPlayGroup(this.selectedGroup);
            });
        });

        // --- 2. Geschlechts-Auswahl (#gender-step) ---
        document.querySelectorAll("#gender-step .select-option").forEach(button => {
            button.addEventListener("click", (e) => {
                // Glow-Effekt
                document.querySelectorAll("#gender-step .select-option").forEach(btn => btn.classList.remove("selected"));
                e.currentTarget.classList.add("selected");

                // Daten speichern
                this.selectedGender = button.dataset.value;
                StorageManager.setGender(this.selectedGender);
            });
        });

        // --- 3. Sprach-Auswahl ([data-lang]) ---
        document.querySelectorAll("[data-lang]").forEach(button => {
            button.addEventListener("click", async (e) => {
                // Glow-Effekt
                document.querySelectorAll("[data-lang]").forEach(btn => btn.classList.remove("selected"));
                e.currentTarget.classList.add("selected");

                // Sprache wechseln
                this.selectedLanguage = button.dataset.lang;
                await LanguageManager.changeLanguage(this.selectedLanguage);
            });
        });
    },

    /*
    =========================================================
    FINISH
    =========================================================
    */
    finish() {
        StorageManager.setOnboardingDone(true);
        this.showApp();
    },

    /*
    =========================================================
    SHOW APP
    =========================================================
    */
    showApp() {
        const landing = document.getElementById("landing-page");
        const onboarding = document.getElementById("onboarding");
        const app = document.getElementById("app");

        if (landing) landing.style.display = "none";
        if (onboarding) onboarding.style.display = "none";
        if (app) app.style.display = "block";

        if (typeof LanguageManager !== "undefined") {
            LanguageManager.translatePage();
        }
    }
};
