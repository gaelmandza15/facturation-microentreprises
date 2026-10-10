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
        timer = setTimeout(() => done(false), 1500); // filet si les modules ne se chargent pas

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

    // --- Anti-rechargement (bug Tauri Windows) ---------------------------
    // Sous Windows (WebView2), deux gestes rechargent la WebView et ramènent
    // l'app à son onglet initial « Créer une Facture » : F5/Ctrl+R (et Cmd+R
    // sur macOS/Linux) ainsi que le rafraîchissement du menu contextuel natif.
    // En desktop on neutralise tout ça : les données étant persistées dans le
    // localStorage, rien ne légitime un rechargement de page.
    function installReloadGuards() {
        window.addEventListener('keydown', (e) => {
            const k = (e.key || '').toLowerCase();
            if (k === 'f5' || ((e.ctrlKey || e.metaKey) && k === 'r')) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
        // Les navigateurs (WebView2/WebKit) émettent un beforeunload synthétique
        // sur reload/navigation, y compris pour les rechargements déclenchés par
        // le webview lui-même. En desktop on bloque donc tout rechargement : la
        // valeur retournée suffit à annuler le reload sans afficher de dialogue.
        // L'app reste ainsi toujours sur l'onglet actif.
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            e.returnValue = '';
        });
    }

    return {
        get isDesktop() { return state.isDesktop; },
        ready, invoke, signalReady, installReloadGuards
    };
})();

// Câblage anti-rechargement + raccourcis clavier natifs dès que la détection
// est faite (aucun effet en mode web).
Desktop.ready.then(() => {
    if (Desktop.isDesktop) Desktop.installReloadGuards();
});

// Raccourcis clavier natifs (desktop uniquement, via window/listen de Tauri) :
// Ctrl/Cmd+N nouvelle facture, Ctrl/Cmd+S enregistrer la facture en cours,
// Ctrl/Cmd+1..6 changement d'onglet.
if (typeof window !== 'undefined' && window.__TAURI_INTERNALS__) {
    import('../vendor/tauri/window.js').then(({ getCurrentWindow }) => {
        const win = getCurrentWindow();
        return win.listen('keydown', (event) => {
            const e = event.payload || {};
            const ctrl = !!(e.ctrlKey || e.metaKey);
            if (!ctrl) return;
            const key = (e.key || '').toLowerCase();
            if (key === 'n') {
                if (typeof switchTab === 'function') switchTab('facture');
                if (typeof initInvoiceForm === 'function') initInvoiceForm();
            } else if (key === 's') {
                if (typeof saveCurrentInvoice === 'function') saveCurrentInvoice();
            } else if (/^[1-6]$/.test(key)) {
                const tabs = ['facture', 'historique', 'clients', 'produits', 'parametres', 'instructions'];
                const idx = parseInt(key, 10) - 1;
                if (tabs[idx] && typeof switchTab === 'function') switchTab(tabs[idx]);
            }
        });
    }).catch(() => { /* API indisponible : sans gravité */ });
}

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

// --- Mémorisation de l'onglet actif (desktop ET web) ---------------------
// En cas de rechargement inopiné (ou redémarrage de l'app), on revient sur
// l'onglet où l'utilisateur se trouvait au lieu de repartir systématiquement
// sur « Créer une Facture ».
const ACTIVE_TAB_KEY = 'factura_micro_active_tab';
window.addEventListener('beforeunload', () => {
    try {
        const active = document.querySelector('.tab-content.active');
        if (active && active.id) localStorage.setItem(ACTIVE_TAB_KEY, active.id.replace(/^tab-/, ''));
    } catch (e) { /* stockage indisponible : sans gravité */ }
});
