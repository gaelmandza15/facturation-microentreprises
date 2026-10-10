// Couche desktop Tauri : détecte l'environnement et remplace les comportements
// web par leurs équivalents natifs quand ils existent. En mode web (ouverture
// de index.html dans un navigateur ou en file://), la détection échoue
// silencieusement et Desktop.isDesktop reste false : AUCUN changement de
// comportement pour le site existant.
//
// L'API Tauri est chargée en ES modules depuis vendor/tauri (copie figée de
// @tauri-apps/api 2.x, imports relatifs autonomes) — pas de bundler requis.

const Desktop = (() => {
    const state = { isDesktop: false, core: null, win: null };

    // Promesse résolue(true/false) dès que la détection est terminée ;
    // signalReady() et invoke() l'attendent avant d'agir.
    const ready = new Promise((resolve) => {
        let timer = null;
        const done = (ok) => { if (!done.called) { done.called = true; clearTimeout(timer); resolve(ok); } };
        timer = setTimeout(() => done(false), 2500); // filet si les modules ne se chargent pas

        Promise.all([
            import('../vendor/tauri/core.js'),
            import('../vendor/tauri/window.js'),
        ]).then(([core, win]) => {
            // En vraie app Tauri, cet appel IPC répond toujours. Dans un
            // navigateur, il rejette (pas d'window.__TAURI_INTERNALS__) -> mode web.
            return core.invoke('plugin:core|version')
                .then(() => {
                    state.core = core; state.win = win; state.isDesktop = true;
                    document.documentElement.classList.add('is-desktop');
                    done(true);
                })
                .catch(() => done(false));
        }).catch(() => done(false));
    });

    async function invoke(cmd, args) {
        await ready;
        if (!state.isDesktop) throw new Error('invoke hors application desktop');
        return state.core.invoke(cmd, args || {});
    }

    // Signale que la WebView est prête -> affiche la fenêtre principale
    // (démarrée visible:false dans tauri.conf.json) seulement à ce moment-là :
    // pas de flash blanc au lancement. Filet côté Rust : show forcé après 3 s.
    async function signalReady() {
        await ready;
        if (!state.isDesktop) return;
        try {
            const w = state.win.getCurrentWindow();
            await w.show();
            await w.setFocus();
        } catch (e) { /* déjà visible ou API indisponible : sans gravité */ }
    }

    return { get isDesktop() { return state.isDesktop; }, ready, invoke, signalReady };
})();

// --- Export de sauvegarde : dialogue "Enregistrer sous..." natif en desktop. ---
async function desktopSaveBackup(defaultName, content) {
    const path = await Desktop.invoke('save_backup', { defaultName, content });
    return path || null; // null si l'utilisateur a annulé
}

// --- Import de sauvegarde : dialogue "Ouvrir" natif en desktop. ---
async function desktopOpenBackup() {
    return await Desktop.invoke('open_backup') || null;
}

// --- Impression : hook unique, identique web/desktop aujourd'hui
// (la WebView native offre le même dialogue "Imprimer -> PDF").
function desktopPrint() {
    window.print();
}
