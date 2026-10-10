// Fichier clients : grille de cartes, modale d'édition, suppression.
function renderClientsGrid() {
    const container = document.getElementById('clients-grid');
    const emptyState = document.getElementById('clients-empty-state');
    container.innerHTML = '';

    if (state.clients.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    state.clients.forEach(c => {
        const card = document.createElement('div');
        card.className = "client-card";
        card.innerHTML = `
            <div class="client-head">
                <div>
                    <div class="client-name">${c.name}</div>
                    <span class="client-meta">${c.siret ? currentCountry().taxIdLabel + ' : ' + c.siret : t('clients.taxIdMissing')}</span>
                </div>
                <div style="display:flex;gap:6px;">
                    <button onclick="editClient('${c.id}')" class="icon-btn" title="${t('clients.editTitle')}"><i class="fa-solid fa-pen"></i></button>
                    <button onclick="deleteClient('${c.id}')" class="icon-btn danger" title="${t('clients.deleteTitle')}"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <p class="client-address">${c.address}</p>
            <div class="client-footer">
                <span>${c.email || t('clients.noEmail')}</span>
                <button onclick="invoiceThisClient('${c.id}')" class="btn-primary-pill btn-sm">
                    ${t('clients.invoiceBtn')} <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function openClientModal(clientId = null) {
    document.getElementById('modal-client').classList.remove('hidden');
    if (clientId) {
        const c = state.clients.find(x => x.id === clientId);
        document.getElementById('modal-client-title').textContent = t('clients.modalEdit');
        document.getElementById('modal-client-id').value = c.id;
        document.getElementById('modal-client-name').value = c.name;
        document.getElementById('modal-client-address').value = c.address;
        document.getElementById('modal-client-siret').value = c.siret || '';
        document.getElementById('modal-client-email').value = c.email || '';
    } else {
        document.getElementById('modal-client-title').textContent = t('clients.modalNew');
        document.getElementById('modal-client-id').value = '';
        document.getElementById('modal-client-name').value = '';
        document.getElementById('modal-client-address').value = '';
        document.getElementById('modal-client-siret').value = '';
        document.getElementById('modal-client-email').value = '';
    }
}

function closeClientModal() {
    document.getElementById('modal-client').classList.add('hidden');
}

function saveClientFromModal() {
    const id = document.getElementById('modal-client-id').value;
    const name = document.getElementById('modal-client-name').value.trim();
    const address = document.getElementById('modal-client-address').value.trim();

    if (!name || !address) {
        showToast(t("toast.clientMissingFields"), "error");
        return;
    }

    const clientData = {
        id: id || "c_" + Date.now(),
        name,
        address,
        siret: document.getElementById('modal-client-siret').value.trim(),
        email: document.getElementById('modal-client-email').value.trim()
    };

    if (id) {
        const idx = state.clients.findIndex(c => c.id === id);
        state.clients[idx] = clientData;
    } else {
        state.clients.push(clientData);
    }

    saveState();
    closeClientModal();
    renderClientsGrid();
    populateClientDropdown();
    showToast(t("toast.clientSaved"));
}

function editClient(id) {
    openClientModal(id);
}

function deleteClient(id) {
    if (confirm(t("toast.confirmDeleteClient"))) {
        state.clients = state.clients.filter(c => c.id !== id);
        saveState();
        renderClientsGrid();
        populateClientDropdown();
        showToast(t("toast.clientDeleted"));
    }
}

function invoiceThisClient(clientId) {
    switchTab('facture');
    document.getElementById('inv-client-select').value = clientId;
    loadSelectedClientIntoInvoice();
}
