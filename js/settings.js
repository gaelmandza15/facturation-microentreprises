// Paramètres : profil entreprise, régime TVA, export/import JSON, réinitialisation.
function loadSettingsForm() {
    const s = state.settings;
    document.getElementById('set-company-name').value = s.companyName || '';
    document.getElementById('set-company-siret').value = s.siret || '';
    document.getElementById('set-company-ape').value = s.ape || '';
    document.getElementById('set-company-contact').value = s.contact || '';
    document.getElementById('set-company-address').value = s.address || '';
    document.getElementById('set-company-iban').value = s.iban || '';
    document.getElementById('set-tva-exempt').checked = s.tvaExempt;
    document.getElementById('set-country').value = s.country || 'FR';
    populateCurrencySelect();
    document.getElementById('set-currency').value = s.currency || currentCountry().currency;
    document.getElementById('set-locale').value = s.locale || currentCountry().locale;
    const euOnly = document.getElementById('eu-intra-note');
    if (euOnly) euOnly.style.display = currentCountry().eu ? 'block' : 'none';
}

function saveSettings() {
    state.settings.companyName = document.getElementById('set-company-name').value.trim();
    state.settings.siret = document.getElementById('set-company-siret').value.trim();
    state.settings.ape = document.getElementById('set-company-ape').value.trim();
    state.settings.contact = document.getElementById('set-company-contact').value.trim();
    state.settings.address = document.getElementById('set-company-address').value.trim();
    state.settings.iban = document.getElementById('set-company-iban').value.trim();
    state.settings.tvaExempt = document.getElementById('set-tva-exempt').checked;
    state.settings.country = document.getElementById('set-country').value;
    state.settings.currency = document.getElementById('set-currency').value;
    state.settings.locale = document.getElementById('set-locale').value;

    saveState();
    applyCountrySettings();
    renderSellerSummary();
    showToast("Profil entreprise mis à jour.");
}

function toggleTvaRegime() {
    state.settings.tvaExempt = document.getElementById('set-tva-exempt').checked;
    saveState();
    calculateInvoiceTotals();
}

// Remplit la liste des devises compatibles avec le pays sélectionné
function populateCurrencySelect() {
    const sel = document.getElementById('set-currency');
    const country = getCountry(document.getElementById('set-country')?.value || state.settings.country || 'FR');
    const allowed = [country.currency];
    // Les pays frontaliers/zone CFA partagent souvent plusieurs devises d'affichage : on autorise aussi EUR/USD en option
    if (country.region === 'afrique') allowed.push('EUR', 'USD');
    if (country.code === 'CA') allowed.push('USD');
    if (country.code === 'GB') allowed.push('EUR');
    if (country.code === 'CH') allowed.push('EUR');
    sel.innerHTML = [...new Set(allowed)].map(c =>
        `<option value="${c}">${CURRENCIES[c].code} (${CURRENCIES[c].symbol})</option>`).join('');
}

// Changement de pays : synchronise devise + format numérique par défaut
function onCountryChange() {
    const country = getCountry(document.getElementById('set-country').value);
    state.settings.country = country.code;
    state.settings.currency = country.currency;
    state.settings.locale = country.locale;
    populateCurrencySelect();
    document.getElementById('set-currency').value = country.currency;
    document.getElementById('set-locale').value = country.locale;
    const euOnly = document.getElementById('eu-intra-note');
    if (euOnly) euOnly.style.display = country.eu ? 'block' : 'none';
    saveState();
    applyCountrySettings();
    showToast(`Pays : ${country.name} — devise ${country.currency}, mention TVA mise à jour.`);
}

function onCurrencyChange() {
    state.settings.currency = document.getElementById('set-currency').value;
    saveState();
    applyCountrySettings();
}

function onLocaleChange() {
    state.settings.locale = document.getElementById('set-locale').value;
    saveState();
    applyCountrySettings();
}

function applyTvaDisplaySettings() {
    const isExempt = state.settings.tvaExempt;
    const badge = document.getElementById('status-tva-badge');

    if (isExempt) {
        badge.textContent = "Exonéré";
        badge.style.color = "var(--status-success-text)";
        document.querySelectorAll('.class-tva-col').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.print-tva-col').forEach(el => el.style.display = 'none');
        document.getElementById('tva-legal-notice-display').style.display = 'block';
    } else {
        badge.textContent = "Assujetti TVA";
        badge.style.color = "var(--status-warning-text)";
        document.querySelectorAll('.class-tva-col').forEach(el => el.style.display = '');
        document.querySelectorAll('.print-tva-col').forEach(el => el.style.display = '');
        document.getElementById('tva-legal-notice-display').style.display = 'none';
    }
}

function updateBadges() {
    // Badge "Historique Factures" : nombre total de factures enregistrées
    const badgeInv = document.getElementById('badge-invoice-count');
    badgeInv.textContent = state.invoices.length;
    badgeInv.style.display = state.invoices.length === 0 ? 'none' : '';

    // Badge "Fichier Clients" : nombre total de clients enregistrés
    const badgeCli = document.getElementById('badge-client-count');
    badgeCli.textContent = state.clients.length;
    badgeCli.style.display = state.clients.length === 0 ? 'none' : '';
}

function exportDataJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `facturamicro_backup_${new Date().toISOString().split('T')[0]}.json`);
    dlAnchorElem.click();
    showToast("Export de sauvegarde téléchargé.");
}

function importDataJSON(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
        try {
            const importedState = JSON.parse(e.target.result);
            if (importedState.settings && importedState.invoices) {
                state = importedState;
                // Migration : anciens exports JSON sans champs de localisation
                state.settings.country = state.settings.country || "FR";
                state.settings.currency = state.settings.currency || currentCountry().currency;
                state.settings.locale = state.settings.locale || currentCountry().locale;
                saveState();
                applyCountrySettings();
                initInvoiceForm();
                showToast("Sauvegarde importée avec succès !");
            } else {
                showToast("Fichier JSON invalide.", "error");
            }
        } catch (err) {
            showToast("Erreur lors de la lecture du fichier JSON.", "error");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

function resetDataModal() {
    if (confirm("Réinitialiser les données avec les exemples de démonstration ?")) {
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        saveState();
        initInvoiceForm();
        switchTab('facture');
        showToast("Données d'exemple réinitialisées !");
    }
}
