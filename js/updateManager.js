/*
=========================================================
LUDOSPHERE UPDATE MANAGER (Offline & SW Compatible)
=========================================================
*/

const UpdateManager = {
    i18n: {
        de: {
            title: "Update verfügbar",
            text: "Eine neue Version von Ludosphere ist verfügbar. Ein Neustart ist erforderlich.",
            btn: "Jetzt neustarten"
        },
        en: {
            title: "Update Available",
            text: "A new version of Ludosphere is available. A restart is required.",
            btn: "Restart Now"
        },
        es: {
            title: "Actualización disponible",
            text: "Una nueva versión de Ludosphere está disponible. Es necesario reiniciar.",
            btn: "Reiniciar ahora"
        },
        fr: {
            title: "Mise à jour disponible",
            text: "Une nouvelle version de Ludosphere est disponible. Un redémarrage est requis.",
            btn: "Redémarrer maintenant"
        },
        it: {
            title: "Aggiornamento disponibile",
            text: "È disponibile una nuova versione di Ludosphere. È necessario riavviare.",
            btn: "Riavvia ora"
        },
        nl: {
            title: "Update beschikbaar",
            text: "Er is een nieuwe versie van Ludosphere beschikbaar. Herstarten is vereist.",
            btn: "Nu herstarten"
        },
        pl: {
            title: "Dostępna aktualizacja",
            text: "Dostępna jest nowa wersja aplikacji Ludosphere. Wymagany jest ponowny uruchomienie.",
            btn: "Uruchom ponownie"
        },
        pt: {
            title: "Atualização disponível",
            text: "Uma nova versão do Ludosphere está disponível. É necessário reiniciar.",
            btn: "Reiniciar agora"
        },
        ru: {
            title: "Доступно обновление",
            text: "Доступна новая версия Ludosphere. Требуется перезапуск.",
            btn: "Перезапустить"
        },
        tr: {
            title: "Güncelleme Mevcut",
            text: "Ludosphere'in yeni bir sürümü mevcut. Yeniden başlatma gereklidir.",
            btn: "Yeniden Başlat"
        }
    },

    waitingWorker: null,
    isRefreshing: false,

    async init() {
        if (!("serviceWorker" in navigator)) return;

        // Auto-Reload verhindern, wenn die Seite bereits einmal neu geladen wurde
        navigator.serviceWorker.addEventListener("controllerchange", () => {
            if (this.isRefreshing) return;
            this.isRefreshing = true;
            window.location.reload();
        });

        // Service Worker Events verarbeiten
        const registration = await navigator.serviceWorker.getRegistration();

        if (registration) {
            // 1. Wenn bereits eine fertige Version im Hintergrund wartet
            if (registration.waiting) {
                this.waitingWorker = registration.waiting;
                this.showUpdateModal();
            }

            // 2. Auf neue Updates im laufenden Betrieb lauschen
            registration.addEventListener("updatefound", () => {
                const newWorker = registration.installing;
                if (!newWorker) return;

                newWorker.addEventListener("statechange", () => {
                    if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                        this.waitingWorker = newWorker;
                        this.showUpdateModal();
                    }
                });
            });
        }

        // Regelmäßig im Hintergrund prüfen (nur wenn online)
        this.startAutoCheck();

        console.log("[UpdateManager] Initialized");
    },

    async checkForUpdates() {
        if (!navigator.onLine) return; // Wenn offline, gar nicht versuchen zu fetchen

        try {

            // ServiceWorker auffordern, nach einer neuen sw.js auf dem Server zu suchen
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                await registration.update();
            }

            // Zusätzlich version.json prüfen
            const response = await fetch("version.json?t=" + Date.now(), { cache: "no-store" });
            const data = await response.json();

            if (data.version !== APP_CONFIG.version && this.waitingWorker) {
                this.showUpdateModal();
            }
        } catch (error) {
            // Offline oder Server kurz unreichbar -> Stille Toleranz
            console.log("[UpdateManager] Offline or update check skipped:", error.message);
        }
    },

    showUpdateModal() {
        if (document.getElementById("updateModalOverlay")) return;

        let currentLang = "de";
        if (typeof LanguageManager !== "undefined" && LanguageManager.currentLanguage) {
            currentLang = LanguageManager.currentLanguage;
        } else if (localStorage.getItem("ludosphere_language")) {
            currentLang = localStorage.getItem("ludosphere_language");
        }

        const labels = this.i18n[currentLang] || this.i18n["de"];

        // Vollbild-Overlay (Blockiert die gesamte App, unschließbar)
        const modalOverlay = document.createElement("div");
        modalOverlay.id = "updateModalOverlay";
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.88);
            backdrop-filter: blur(8px);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
            touch-action: none;
        `;

        const modalBox = document.createElement("div");
        modalBox.style.cssText = `
            background-color: #1c1c1e;
            border: 1px solid #2c2c2e;
            border-radius: 16px;
            padding: 24px;
            max-width: 360px;
            width: 100%;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.6);
            color: #ffffff;
        `;

        modalBox.innerHTML = `
            <div style="font-size: 40px; margin-bottom: 12px;">🚀</div>
            <h3 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">${labels.title}</h3>
            <p style="margin: 0 0 20px 0; font-size: 14px; color: #a1a1a6; line-height: 1.5;">${labels.text}</p>
            <button id="updateConfirmBtn" style="
                width: 100%;
                background-color: #34c759;
                color: #ffffff;
                border: none;
                padding: 14px;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
            ">${labels.btn}</button>
        `;

        modalOverlay.appendChild(modalBox);
        document.body.appendChild(modalOverlay);

        document.getElementById("updateConfirmBtn").addEventListener("click", () => {
            this.applyUpdate();
        });
    },

    applyUpdate() {
        if (this.waitingWorker) {
            // Sendet 'SKIP_WAITING' an die wartende sw.js
            this.waitingWorker.postMessage({ type: "SKIP_WAITING" });
        } else {
            window.location.reload();
        }
    },

    startAutoCheck() {
        const interval = (typeof APP_CONFIG !== "undefined" && APP_CONFIG.updateCheckInterval) 
            ? APP_CONFIG.updateCheckInterval 
            : 600000; // Fallback: 10 Min

        setInterval(() => {
            this.checkForUpdates();
        }, interval);
    }
};

// Automatischer Start
document.addEventListener("DOMContentLoaded", () => {
    UpdateManager.init();
});
