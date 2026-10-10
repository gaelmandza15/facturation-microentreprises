// Historique des factures : statistiques, recherche, filtre, édition, suppression.
function renderHistoryTable() {
    const tbody = document.getElementById('history-table-body');
    const search = document.getElementById('history-search').value.toLowerCase();
    const filterStatus = document.getElementById('history-filter-status').value;
    const emptyState = document.getElementById('history-empty-state');

    tbody.innerHTML = '';

    let totalCa = 0;
    let pendingCa = 0;

    const filteredInvoices = state.invoices.filter(inv => {
        const matchesSearch = inv.number.toLowerCase().includes(search) || inv.clientName.toLowerCase().includes(search);
        const matchesStatus = filterStatus === 'ALL' || inv.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    state.invoices.forEach(inv => {
        if (inv.status === 'Payée') totalCa += inv.totalNet;
        if (inv.status === 'En attente') pendingCa += inv.totalNet;
    });

    document.getElementById('stat-total-ca').textContent = totalCa.toFixed(2) + ' €';
    document.getElementById('stat-pending-ca').textContent = pendingCa.toFixed(2) + ' €';
    document.getElementById('stat-total-invoices').textContent = state.invoices.length;

    if (filteredInvoices.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    filteredInvoices.forEach(inv => {
        const tr = document.createElement('tr');

        let statusClass = "brouillon";
        if (inv.status === 'Payée') statusClass = "payee";
        if (inv.status === 'En attente') statusClass = "en-attente";

        tr.innerHTML = `
            <td class="cell-mono cell-strong" style="color:var(--primary-blue);">${inv.number}</td>
            <td class="cell-muted">${inv.date}</td>
            <td>${inv.clientName}</td>
            <td class="text-right cell-mono cell-strong">${inv.totalNet.toFixed(2)} €</td>
            <td class="text-center">
                <select onchange="updateInvoiceStatus('${inv.id}', this.value)" class="status-select ${statusClass}">
                    <option value="Brouillon" ${inv.status === 'Brouillon' ? 'selected' : ''}>Brouillon</option>
                    <option value="En attente" ${inv.status === 'En attente' ? 'selected' : ''}>En attente</option>
                    <option value="Payée" ${inv.status === 'Payée' ? 'selected' : ''}>Payée</option>
                </select>
            </td>
            <td class="text-right">
                <button onclick="loadInvoiceIntoEditor('${inv.id}')" title="Éditer / Voir" class="icon-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="deleteInvoice('${inv.id}')" title="Supprimer" class="icon-btn danger"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function updateInvoiceStatus(id, newStatus) {
    const inv = state.invoices.find(i => i.id === id);
    if (inv) {
        inv.status = newStatus;
        saveState();
        renderHistoryTable();
        showToast(`Statut de la facture ${inv.number} mis à jour : ${newStatus}`);
    }
}

function loadInvoiceIntoEditor(id) {
    const inv = state.invoices.find(i => i.id === id);
    if (!inv) return;

    document.getElementById('inv-number').value = inv.number;
    document.getElementById('inv-date').value = inv.date;
    document.getElementById('inv-duedate').value = inv.dueDate;
    document.getElementById('inv-client-name').value = inv.clientName;
    document.getElementById('inv-client-address').value = inv.clientAddress || '';
    document.getElementById('inv-client-siret').value = inv.clientSiret || '';
    document.getElementById('inv-client-email').value = inv.clientEmail || '';
    document.getElementById('inv-discount').value = inv.discountPercent || 0;
    document.getElementById('inv-status').value = inv.status;
    document.getElementById('inv-terms').value = inv.terms || '';
    document.getElementById('inv-iban').value = inv.iban || '';

    const tbody = document.getElementById('invoice-items-body');
    tbody.innerHTML = '';
    inv.items.forEach(item => {
        addInvoiceItemRow(item.desc, item.qty, item.unitPrice, item.tva);
    });

    switchTab('facture');
    showToast(`Facture ${inv.number} chargée dans l'éditeur.`);
}

function deleteInvoice(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette facture de l'historique ?")) {
        state.invoices = state.invoices.filter(i => i.id !== id);
        saveState();
        renderHistoryTable();
        showToast("Facture supprimée.");
    }
}
