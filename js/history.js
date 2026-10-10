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

    document.getElementById('stat-total-ca').textContent = fmtMoney(totalCa);
    document.getElementById('stat-pending-ca').textContent = fmtMoney(pendingCa);
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
            <td class="text-right cell-mono cell-strong">${fmtMoney(inv.totalNet)}</td>
            <td class="text-center">
                <select onchange="updateInvoiceStatus('${inv.id}', this.value)" class="status-select ${statusClass}">
                    <option value="Brouillon" ${inv.status === 'Brouillon' ? 'selected' : ''}>${t('status.draft')}</option>
                    <option value="En attente" ${inv.status === 'En attente' ? 'selected' : ''}>${t('history.statusOption.pending')}</option>
                    <option value="Payée" ${inv.status === 'Payée' ? 'selected' : ''}>${t('status.paid')}</option>
                </select>
            </td>
            <td class="text-right">
                <button onclick="loadInvoiceIntoEditor('${inv.id}')" title="${t('history.editTitle')}" class="icon-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="deleteInvoice('${inv.id}')" title="${t('history.deleteTitle')}" class="icon-btn danger"><i class="fa-solid fa-trash"></i></button>
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
        showToast(t("toast.statusUpdated", { number: inv.number, status: statusLabel(newStatus) }));
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
    showToast(t("toast.invoiceLoaded", { number: inv.number }));
}

function deleteInvoice(id) {
    if (confirm(t("toast.confirmDeleteInvoice"))) {
        state.invoices = state.invoices.filter(i => i.id !== id);
        saveState();
        renderHistoryTable();
        showToast(t("toast.invoiceDeleted"));
    }
}
