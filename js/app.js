// Point d'entrée : navigation entre onglets et initialisation.
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

    document.getElementById(`tab-${tabId}`).classList.add('active');
    const activeNavBtn = document.getElementById(`nav-${tabId}`);
    if (activeNavBtn) {
        activeNavBtn.classList.add('active');
    }

    // Page Titles update
    const titles = {
        'facture': [t('title.facture'), t('subtitle.facture')],
        'historique': [t('title.historique'), t('subtitle.historique')],
        'clients': [t('title.clients'), t('subtitle.clients')],
        'produits': [t('title.produits'), t('subtitle.produits')],
        'parametres': [t('title.parametres'), t('subtitle.parametres')],
        'instructions': [t('title.instructions'), t('subtitle.instructions')]
    };

    if (titles[tabId]) {
        document.getElementById('page-title').textContent = titles[tabId][0];
        document.getElementById('page-subtitle').textContent = titles[tabId][1];
    }

    // Render specific views on switch
    if (tabId === 'historique') renderHistoryTable();
    if (tabId === 'clients') renderClientsGrid();
    if (tabId === 'produits') renderProductsTable();
    if (tabId === 'parametres') loadSettingsForm();
}

// Remplit la liste déroulante des pays groupés par région
function populateCountrySelect() {
    const sel = document.getElementById('set-country');
    if (!sel) return;
    const regions = { europe: t('region.europe'), afrique: t('region.afrique'), amerique: t('region.amerique'), asie: t('region.asie') };
    sel.innerHTML = Object.entries(regions).map(([key, label]) =>
        `<optgroup label="${label}">` +
        COUNTRIES.filter(c => c.region === key).map(c => `<option value="${c.code}">${c.name}</option>`).join('') +
        '</optgroup>').join('');
}

window.onload = function() {
    ensureLangSwitch();
    applyLanguage(); // applique la langue (anglais par défaut) sur tout le DOM
    populateCountrySelect();
    initInvoiceForm();
    updateBadges();
    applyTvaDisplaySettings();
    applyCountrySettings();
    Desktop.signalReady(); // en app Tauri : affiche la fenêtre une fois l'UI prête (pas de flash blanc)
};
