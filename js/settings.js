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
}

function saveSettings() {
    state.settings.companyName = document.getElementById('set-company-name').value.trim();
    state.settings.siret = document.getElementById('set-company-siret').value.trim();
    state.settings.ape = document.getElementById('set-company-ape').value.trim();
    state.settings.contact = document.getElementById('set-company-contact').value.trim();
    state.settings.address = document.getElementById('set-company-address').value.trim();
    state.settings.iban = document.getElementById('set-company-iban').value.trim();
    state.settings.tvaExempt = document.getElementById('set-tva-exempt').checked;

    saveState();
    renderSellerSummary();
    showToast("Profil entreprise mis à jour.");
}

function toggleTvaRegime() {
    state.settings.tvaExempt = document.getElementById('set-tva-exempt').checked;
    saveState();
    calculateInvoiceTotals();
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
    document.getElementById('badge-invoice-count').textContent = state.invoices.length;
    document.getElementById('badge-client-count').textContent = state.clients.length;
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
                saveState();
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
