/*
=========================================================
LUDOSPHERE ACCOUNT MANAGER (Supabase + Google Login)
=========================================================
*/

const AccountManager = {
    supabase: null,
    currentUser: null,

    init() {
        if (typeof supabase !== "undefined" && window.supabase) {
            this.supabase = window.supabase.createClient(
                CONFIG.supabaseUrl,
                CONFIG.supabaseKey
            );
            console.log("[AccountManager] Supabase Client initialized");
            
            this.checkSession();
            this.listenToAuthChanges();
        } else {
            console.error("[AccountManager] Supabase SDK nicht geladen!");
        }

        this.setupUIEvents();
    },

    async checkSession() {
        if (!this.supabase) return;

        const { data: { session }, error } = await this.supabase.auth.getSession();
        if (error) {
            console.error("[AccountManager] Fehler beim Laden der Session:", error.message);
            return;
        }

        if (session) {
            this.currentUser = session.user;
            this.updateUILoggedIn(session.user);
        } else {
            this.updateUILoggedOut();
        }
    },

    listenToAuthChanges() {
        if (!this.supabase) return;

        this.supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) {
                this.currentUser = session.user;
                this.updateUILoggedIn(session.user);
            } else if (event === "SIGNED_OUT") {
                this.currentUser = null;
                this.updateUILoggedOut();
            }
        });
    },

    // 🔴 Google-Login Funktion
    async signInWithGoogle() {
        if (!this.supabase) return;

        const { data, error } = await this.supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) {
            alert("Google-Login fehlgeschlagen: " + error.message);
        }
    },

    // Registrierung per E-Mail & Passwort
    async signUp(email, password) {
        if (!this.supabase) return;

        const { data, error } = await this.supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            alert("Registrierung fehlgeschlagen: " + error.message);
            return;
        }

        alert("Registrierung erfolgreich! Bitte überprüfe deine E-Mails zur Bestätigung.");
    },

    // Login per E-Mail & Passwort
    async signIn(email, password) {
        if (!this.supabase) return;

        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            alert("Login fehlgeschlagen: " + error.message);
            return;
        }

        this.closeAccountOverlay();
    },

    // Abmelden
    async signOut() {
        if (!this.supabase) return;

        const { error } = await this.supabase.auth.signOut();
        if (error) {
            alert("Fehler beim Abmelden: " + error.message);
        } else {
            this.closeAccountOverlay();
        }
    },

    // ⭐️ HIER IST DIE SCHALTZENTRALE FÜR LOGIN/REGISTRIEREN
    switchAuthMode(mode) {
        const choiceStep = document.getElementById("authChoiceStep");
        const formStep = document.getElementById("authFormStep");
        const authSubmitBtn = document.getElementById("authSubmitBtn");
        const authFormTitle = document.getElementById("authFormTitle");

        if (choiceStep) choiceStep.style.display = "none";
        if (formStep) formStep.style.display = "block";

        const i18nKey = mode === "register" ? "BTN_REGISTER" : "BTN_LOGIN";
        const bgColor = mode === "register" ? "#0a84ff" : "#34c759";

        if (authSubmitBtn) {
            authSubmitBtn.value = mode;
            authSubmitBtn.setAttribute("data-i18n", i18nKey);
            authSubmitBtn.style.backgroundColor = bgColor;
        }

        if (authFormTitle) {
            authFormTitle.setAttribute("data-i18n", i18nKey);
        }

        if (typeof LanguageManager !== "undefined" && LanguageManager.updatePageTranslations) {
            LanguageManager.updatePageTranslations();
        }
    },

    setupUIEvents() {
        const linkAccountBtn = document.getElementById("linkAccountBtn");
        const accountOverlay = document.getElementById("accountOverlayModal");
        const backFromAccountBtn = document.getElementById("backFromAccountBtn");

        if (linkAccountBtn && accountOverlay) {
            linkAccountBtn.addEventListener("click", () => {
                accountOverlay.classList.remove("hidden");
            });
        }

        if (backFromAccountBtn && accountOverlay) {
            backFromAccountBtn.addEventListener("click", () => {
                this.closeAccountOverlay();
            });
        }

        // Google Button
        const googleBtn = document.getElementById("googleLoginBtn");
        if (googleBtn) {
            googleBtn.onclick = (e) => {
                e.preventDefault();
                this.signInWithGoogle();
            };
        }

        // Formular Absenden
        const authForm = document.getElementById("authForm");
        if (authForm) {
            authForm.onsubmit = (e) => {
                e.preventDefault();
                const email = document.getElementById("authEmail").value;
                const password = document.getElementById("authPassword").value;
                const action = document.getElementById("authSubmitBtn") ? document.getElementById("authSubmitBtn").value : "login";

                if (action === "register") {
                    this.signUp(email, password);
                } else {
                    this.signIn(email, password);
                }
            };
        }

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.onclick = (e) => {
                e.preventDefault();
                this.signOut();
            };
        }

        // ⭐️ DIE KLICK-EVENTS FÜR DEN MOUS-WECHSEL:
        const showLoginBtn = document.getElementById("showLoginChoiceBtn") || document.getElementById("showLoginBtn");
        const showRegisterBtn = document.getElementById("showRegisterChoiceBtn") || document.getElementById("showRegisterBtn");
        const backToChoiceBtn = document.getElementById("backToAuthChoiceBtn");

        if (showLoginBtn) {
            showLoginBtn.onclick = (e) => {
                e.preventDefault();
                this.switchAuthMode("login");
            };
        }

        if (showRegisterBtn) {
            showRegisterBtn.onclick = (e) => {
                e.preventDefault();
                this.switchAuthMode("register");
            };
        }

        if (backToChoiceBtn) {
            backToChoiceBtn.onclick = (e) => {
                e.preventDefault();
                const choiceStep = document.getElementById("authChoiceStep");
                const formStep = document.getElementById("authFormStep");
                if (formStep) formStep.style.display = "none";
                if (choiceStep) choiceStep.style.display = "flex";
            };
        }
    },

    closeAccountOverlay() {
        const accountOverlay = document.getElementById("accountOverlayModal");
        if (accountOverlay) {
            accountOverlay.classList.add("hidden");
        }
    },

    updateUILoggedIn(user) {
        const accountStatusText = document.getElementById("accountStatusText");
        const authSection = document.getElementById("authSection");
        const userSection = document.getElementById("userSection");
        const userEmailDisplay = document.getElementById("userEmailDisplay");

        if (accountStatusText) {
            accountStatusText.setAttribute("data-i18n", "STATUS_ACTIVE");
        }
        if (authSection) authSection.style.display = "none";
        if (userSection) userSection.style.display = "block";
        if (userEmailDisplay) userEmailDisplay.textContent = user.email;

        if (typeof LanguageManager !== "undefined" && LanguageManager.updatePageTranslations) {
            LanguageManager.updatePageTranslations();
        }
    },

    updateUILoggedOut() {
        const accountStatusText = document.getElementById("accountStatusText");
        const authSection = document.getElementById("authSection");
        const userSection = document.getElementById("userSection");

        if (accountStatusText) {
            accountStatusText.setAttribute("data-i18n", "STATUS_NOT_LINKED");
        }
        if (authSection) authSection.style.display = "block";
        if (userSection) userSection.style.display = "none";

        if (typeof LanguageManager !== "undefined" && LanguageManager.updatePageTranslations) {
            LanguageManager.updatePageTranslations();
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    AccountManager.init();
});
