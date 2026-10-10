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
        'facture': ['Générateur de Facture', 'Éditez une facture claire pour votre client.'],
        'historique': ['Historique des Factures', 'Suivez vos règlements et chiffre d\'affaires.'],
        'clients': ['Fichier Clients', 'Gérez la liste de vos clients et leurs informations.'],
        'produits': ['Catalogue de Produits & Services', 'Mémorisez vos tarifs pour un gain de temps.'],
        'parametres': ['Mon Entreprise & TVA', 'Gérez vos mentions obligatoires et options TVA.'],
        'instructions': ['Instructions & FAQ', 'Conseils légaux pour la gestion de votre micro-entreprise.']
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
    const regions = { europe: '🇪🇺 Europe', afrique: '🌍 Afrique francophone', amerique: '🌎 Amériques', asie: '🌏 Asie-Pacifique' };
    sel.innerHTML = Object.entries(regions).map(([key, label]) =>
        `<optgroup label="${label}">` +
        COUNTRIES.filter(c => c.region === key).map(c => `<option value="${c.code}">${c.name}</option>`).join('') +
        '</optgroup>').join('');
}

window.onload = function() {
    populateCountrySelect();
    initInvoiceForm();
    updateBadges();
    applyTvaDisplaySettings();
    applyCountrySettings();
};
