/*
=========================================================
LUDOSPHERE APP INITIALIZER (SAFE BOOT)
=========================================================
*/

// Globale Airbag-Funktion: Fängt Modulabstürze einzeln ab
async function safeInit(moduleName, initFunction) {
    try {
        if (typeof initFunction === "function") {
            await initFunction();
            console.log(`[App] ${moduleName} erfolgreich gestartet.`);
        } else {
            console.warn(`[App] ${moduleName} existiert nicht oder hat keine init()-Methode.`);
        }
    } catch (error) {
        // Der Fehler wird abgefangen & protokolliert, blockiert aber NICHT die anderen Module!
        console.error(`[App Guard] Fehler in ${moduleName} abgefangen:`, error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {

    // 1. Service Worker Registrierung (PWA)
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("sw.js")
            .then(() => {
                console.log("[PWA] Service Worker Registered");
            })
            .catch((err) => {
                console.warn("[PWA] Service Worker Fehler:", err);
            });
    }

    // 2. Isolierte Modul-Starts (Absturzsicher)
    await safeInit("StorageManager", () => StorageManager?.init?.());
    await safeInit("ApiManager", () => ApiManager?.init?.());
    await safeInit("LanguageManager", async () => await LanguageManager?.init?.());
    await safeInit("ThemeManager", () => ThemeManager?.init?.());
    await safeInit("InstallManager", () => InstallManager?.init?.());
    await safeInit("NavigationManager", () => NavigationManager?.init?.());
    await safeInit("SearchManager", () => SearchManager?.init?.());
    await safeInit("AccountManager", () => AccountManager?.init?.());
    await safeInit("UpdateManager", () => UpdateManager?.init?.());
    await safeInit("GameManager", async () => await GameManager?.init?.());
    await safeInit("OnboardingManager", () => OnboardingManager?.init?.());

    console.log("Ludosphere erfolgreich und sicher gestartet 🚀");
});
