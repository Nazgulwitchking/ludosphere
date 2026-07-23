/*
=========================================================
LUDOSPHERE ACCOUNT MANAGER (Supabase + Google Login)
=========================================================
*/

const AccountManager = {
    supabase: null,
    currentMode: 'login', // 'login' oder 'register'

    init() {
        if (typeof supabase !== 'undefined' && typeof CONFIG !== 'undefined' && CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY) {
            this.supabase = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
            this.checkSession();
        } else {
            console.warn("Supabase SDK oder Konfiguration in config.js fehlt.");
        }

        this.bindEvents();
    },

    bindEvents() {
        const linkBtn = document.getElementById("linkAccountBtn");
        const accountOverlay = document.getElementById("accountOverlayModal");
        const backBtn = document.getElementById("backFromAccountBtn");

        const authChoiceSection = document.getElementById("authChoiceSection");
        const emailFormSection = document.getElementById("emailFormSection");
        const showRegisterBtn = document.getElementById("showEmailRegisterBtn");
        const showLoginBtn = document.getElementById("showEmailLoginBtn");
        const cancelEmailBtn = document.getElementById("cancelEmailModeBtn");

        const formTitle = document.getElementById("formTitle");
        const formSubtitle = document.getElementById("formSubtitle");
        const submitAuthBtn = document.getElementById("submitAuthBtn");
        const authForm = document.getElementById("authForm");

        const googleBtn = document.getElementById("googleLoginBtn");
        const appleBtn = document.getElementById("appleLoginBtn");
        const logoutBtn = document.getElementById("logoutBtn");

        // Overlay öffnen/schließen
        if (linkBtn && accountOverlay) {
            linkBtn.addEventListener("click", () => accountOverlay.classList.remove("hidden"));
        }
        if (backBtn && accountOverlay) {
            backBtn.addEventListener("click", () => {
                this.resetToChoice();
                accountOverlay.classList.add("hidden");
            });
        }

        // Wechsel zu E-Mail Registrierung
        if (showRegisterBtn) {
            showRegisterBtn.addEventListener("click", () => {
                this.currentMode = 'register';
                formTitle.textContent = "Konto erstellen";
                formSubtitle.textContent = "Erstelle ein neues Konto mit deiner E-Mail-Adresse.";
                submitAuthBtn.textContent = "Registrieren";
                submitAuthBtn.style.backgroundColor = "#0a84ff";
                
                authChoiceSection.style.display = "none";
                emailFormSection.style.display = "block";
            });
        }

        // Wechsel zu E-Mail Login
        if (showLoginBtn) {
            showLoginBtn.addEventListener("click", () => {
                this.currentMode = 'login';
                formTitle.textContent = "Anmelden";
                formSubtitle.textContent = "Melde dich mit deinen Zugangsdaten an.";
                submitAuthBtn.textContent = "Anmelden";
                submitAuthBtn.style.backgroundColor = "#34c759";

                authChoiceSection.style.display = "none";
                emailFormSection.style.display = "block";
            });
        }

        // Zurück zur Auswahl
        if (cancelEmailBtn) {
            cancelEmailBtn.addEventListener("click", () => this.resetToChoice());
        }

        // Formular Absenden
        if (authForm) {
            authForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const email = document.getElementById("authEmail").value;
                const password = document.getElementById("authPassword").value;

                if (!this.supabase) {
                    alert("Supabase ist noch nicht in config.js konfiguriert.");
                    return;
                }

                if (this.currentMode === 'register') {
                    const { data, error } = await this.supabase.auth.signUp({ email, password });
                    if (error) {
                        alert("Registrierungsfehler: " + error.message);
                    } else {
                        alert("Registrierung erfolgreich! Falls nötig, wende dich an dein Postfach zur E-Mail-Bestätigung.");
                        this.checkSession();
                    }
                } else {
                    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
                    if (error) {
                        alert("Login-Fehler: " + error.message);
                    } else {
                        this.checkSession();
                    }
                }
            });
        }

        // Social Logins
        if (googleBtn) {
            googleBtn.addEventListener("click", async () => {
                if (!this.supabase) return alert("Supabase-Verbindung fehlt.");
                await this.supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.href } });
            });
        }

        if (appleBtn) {
            appleBtn.addEventListener("click", async () => {
                if (!this.supabase) return alert("Supabase-Verbindung fehlt.");
                await this.supabase.auth.signInWithOAuth({ provider: 'apple', options: { redirectTo: window.location.href } });
            });
        }

        // Logout
        if (logoutBtn) {
            logoutBtn.addEventListener("click", async () => {
                if (!this.supabase) return;
                await this.supabase.auth.signOut();
                this.resetToChoice();
                this.checkSession();
            });
        }
    },

    resetToChoice() {
        const authChoiceSection = document.getElementById("authChoiceSection");
        const emailFormSection = document.getElementById("emailFormSection");
        if (authChoiceSection) authChoiceSection.style.display = "block";
        if (emailFormSection) emailFormSection.style.display = "none";
    },

    async checkSession() {
        if (!this.supabase) return;

        const { data: { session } } = await this.supabase.auth.getSession();
        const authChoiceSection = document.getElementById("authChoiceSection");
        const emailFormSection = document.getElementById("emailFormSection");
        const userSection = document.getElementById("userSection");
        const userEmailDisplay = document.getElementById("userEmailDisplay");
        const statusText = document.getElementById("accountStatusText");

        if (session && session.user) {
            if (authChoiceSection) authChoiceSection.style.display = "none";
            if (emailFormSection) emailFormSection.style.display = "none";
            if (userSection) userSection.style.display = "block";
            if (userEmailDisplay) userEmailDisplay.textContent = session.user.email;
            if (statusText) statusText.textContent = session.user.email;
        } else {
            if (userSection) userSection.style.display = "none";
            if (statusText) statusText.textContent = "Nicht verknüpft";
            this.resetToChoice();
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    AccountManager.init();
});
