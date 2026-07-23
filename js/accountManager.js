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

        // Event listener für Google-Button
        const googleBtn = document.getElementById("googleLoginBtn");
        if (googleBtn) {
            googleBtn.addEventListener("click", () => {
                this.signInWithGoogle();
            });
        }

        // Formular-Submit: Login & Registrierung
        const authForm = document.getElementById("authForm");
        if (authForm) {
            authForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const email = document.getElementById("authEmail").value;
                const password = document.getElementById("authPassword").value;
                const action = e.submitter ? e.submitter.value : "login";

                if (action === "register") {
                    this.signUp(email, password);
                } else {
                    this.signIn(email, password);
                }
            });
        }

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                this.signOut();
            });
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

        if (accountStatusText) accountStatusText.textContent = "Aktiv";
        if (authSection) authSection.style.display = "none";
        if (userSection) userSection.style.display = "block";
        if (userEmailDisplay) userEmailDisplay.textContent = user.email;
    },

    updateUILoggedOut() {
        const accountStatusText = document.getElementById("accountStatusText");
        const authSection = document.getElementById("authSection");
        const userSection = document.getElementById("userSection");

        if (accountStatusText) accountStatusText.textContent = "Nicht verknüpft";
        if (authSection) authSection.style.display = "block";
        if (userSection) userSection.style.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    AccountManager.init();
});

// UI-Steuerung für die Auswahl zwischen Login und Registrierung
document.addEventListener("DOMContentLoaded", () => {
    const choiceStep = document.getElementById("authChoiceStep");
    const formStep = document.getElementById("authFormStep");
    
    const showLoginBtn = document.getElementById("showLoginChoiceBtn");
    const showRegisterBtn = document.getElementById("showRegisterChoiceBtn");
    const backToChoiceBtn = document.getElementById("backToAuthChoiceBtn");
    
    const authSubmitBtn = document.getElementById("authSubmitBtn");
    const authFormTitle = document.getElementById("authFormTitle");

    // Wechsel zu Anmelden Formular
    if (showLoginBtn) {
        showLoginBtn.addEventListener("click", () => {
            choiceStep.style.display = "none";
            formStep.style.display = "block";
            
            authSubmitBtn.value = "login";
            authSubmitBtn.setAttribute("data-i18n", "BTN_LOGIN");
            authSubmitBtn.style.backgroundColor = "#34c759";

            if (authFormTitle) {
                authFormTitle.setAttribute("data-i18n", "BTN_LOGIN");
            }

            // Sprach-Update für das Formular auslösen, falls LanguageManager geladen ist
            if (typeof LanguageManager !== "undefined" && LanguageManager.updateUI) {
                LanguageManager.updateUI();
            }
        });
    }

    // Wechsel zu Registrieren Formular
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener("click", () => {
            choiceStep.style.display = "none";
            formStep.style.display = "block";
            
            authSubmitBtn.value = "register";
            authSubmitBtn.setAttribute("data-i18n", "BTN_REGISTER");
            authSubmitBtn.style.backgroundColor = "#0a84ff";

            if (authFormTitle) {
                authFormTitle.setAttribute("data-i18n", "BTN_REGISTER");
            }

            // Sprach-Update für das Formular auslösen, falls LanguageManager geladen ist
            if (typeof LanguageManager !== "undefined" && LanguageManager.updateUI) {
                LanguageManager.updateUI();
            }
        });
    }

    // Zurück zur Auswahl
    if (backToChoiceBtn) {
        backToChoiceBtn.addEventListener("click", () => {
            formStep.style.display = "none";
            choiceStep.style.display = "flex";
        });
    }
});
