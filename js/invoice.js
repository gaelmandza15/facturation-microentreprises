// Générateur de facture : formulaire, lignes, calculs, impression.
function initInvoiceForm() {
    // Set Seller Summary
    renderSellerSummary();

    // Set Default Numbering
    const year = new Date().getFullYear();
    const seq = String(state.settings.nextInvoiceSeq || 1).padStart(3, '0');
    document.getElementById('inv-number').value = `FACT-${year}-${seq}`;

    // Set Dates
    const today = new Date().toISOString().split('T')[0];
    const in30days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    document.getElementById('inv-date').value = today;
    document.getElementById('inv-duedate').value = in30days;

    // Set Default Terms & IBAN
    document.getElementById('inv-terms').value = state.settings.terms;
    document.getElementById('inv-iban').value = state.settings.iban;

    // Populate Client Dropdown
    populateClientDropdown();
    populateProductDropdown();

    // Insert initial line item
    const body = document.getElementById('invoice-items-body');
    body.innerHTML = '';
    addInvoiceItemRow();
    calculateInvoiceTotals();
}

function renderSellerSummary() {
    const s = state.settings;
    document.getElementById('seller-summary').innerHTML = `
        <strong style="display:block;color:var(--text-main);font-weight:800;">${s.companyName || t('settings.defaultCompanyName')}</strong>
        <div>${currentCountry().taxIdLabel} : ${s.siret || t('settings.notProvided')}${currentCountry().altIdLabel && s.ape ? ' (' + currentCountry().altIdLabel + ' : ' + s.ape + ')' : ''}</div>
        <div>${s.address || ''}</div>
        <div>${s.contact || ''}</div>
    `;
}

function populateClientDropdown() {
    const select = document.getElementById('inv-client-select');
    select.innerHTML = `<option value="">${t('invoice.selectClient')}</option>`;
    state.clients.forEach(c => {
        select.innerHTML += `<option value="${c.id}">${c.name}</option>`;
    });
}

function populateProductDropdown() {
    const select = document.getElementById('quick-product-select');
    select.innerHTML = `<option value="">${t('invoice.addFromCatalog')}</option>`;
    state.products.forEach(p => {
        select.innerHTML += `<option value="${p.id}">${p.name} (${fmtMoney(p.price)})</option>`;
    });
}

function loadSelectedClientIntoInvoice() {
    const clientId = document.getElementById('inv-client-select').value;
    if (!clientId) return;
    const client = state.clients.find(c => c.id === clientId);
    if (client) {
        document.getElementById('inv-client-name').value = client.name;
        document.getElementById('inv-client-address').value = client.address;
        document.getElementById('inv-client-siret').value = client.siret || '';
        document.getElementById('inv-client-email').value = client.email || '';
    }
}

function addInvoiceItemRow(desc = '', qty = 1, unitPrice = 0, tva = null) {
    // Taux par défaut : celui sélectionné "Taux TVA par défaut des nouvelles lignes"
    if (tva === null) tva = parseFloat(document.getElementById('default-tva-rate')?.value) || 0;
    const tbody = document.getElementById('invoice-items-body');
    const rowId = 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

    const tr = document.createElement('tr');
    tr.id = rowId;
    tr.innerHTML = `
        <td>
            <input type="text" value="${desc}" placeholder="${t('invoice.descPlaceholder')}" class="item-desc item-input">
        </td>
        <td>
            <input type="number" value="${qty}" min="1" step="1" oninput="calculateInvoiceTotals()" class="item-qty item-input mono text-center">
        </td>
        <td>
            <input type="number" value="${unitPrice}" step="0.01" oninput="calculateInvoiceTotals()" class="item-price item-input mono text-right">
        </td>
        <td class="class-tva-col">
            <input type="number" value="${tva}" step="0.1" oninput="calculateInvoiceTotals()" class="item-tva item-input mono text-center">
        </td>
        <td class="text-right cell-mono cell-strong item-line-total">
            —
        </td>
        <td class="text-center">
            <button onclick="removeInvoiceItemRow('${rowId}')" class="icon-btn danger" title="${t('invoice.deleteRowTitle')}"><i class="fa-solid fa-trash-can"></i></button>
        </td>
    `;
    tbody.appendChild(tr);
    calculateInvoiceTotals();
}

function addPredefinedProductToInvoice() {
    const prodId = document.getElementById('quick-product-select').value;
    if (!prodId) return;
    const p = state.products.find(item => item.id === prodId);
    if (p) {
        addInvoiceItemRow(p.name + (p.desc ? ' - ' + p.desc : ''), 1, p.price, p.tva || 0);
        document.getElementById('quick-product-select').value = '';
    }
}

function removeInvoiceItemRow(rowId) {
    const tr = document.getElementById(rowId);
    if (tr) tr.remove();
    calculateInvoiceTotals();
}

function calculateInvoiceTotals() {
    let subtotalHt = 0;
    let tvaTotal = 0;

    document.querySelectorAll('#invoice-items-body tr').forEach(row => {
        const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
        const unitPrice = parseFloat(row.querySelector('.item-price').value) || 0;
        const tva = parseFloat(row.querySelector('.item-tva').value) || 0;

        const lineTotalHt = qty * unitPrice;
        const lineTva = state.settings.tvaExempt ? 0 : (lineTotalHt * (tva / 100));

        subtotalHt += lineTotalHt;
        tvaTotal += lineTva;

        row.querySelector('.item-line-total').textContent = fmtMoney(lineTotalHt);
    });

    const discountPercent = parseFloat(document.getElementById('inv-discount').value) || 0;
    const discountVal = subtotalHt * (discountPercent / 100);
    const netSubtotalHt = subtotalHt - discountVal;

    // Recalculate TVA on discounted HT if applicable
    if (!state.settings.tvaExempt && discountPercent > 0) {
        tvaTotal = tvaTotal * (1 - (discountPercent / 100));
    }

    const totalNet = netSubtotalHt + (state.settings.tvaExempt ? 0 : tvaTotal);

    document.getElementById('calc-subtotal-ht').textContent = fmtMoney(subtotalHt);
    document.getElementById('calc-discount-val').textContent = '-' + fmtMoney(discountVal);
    document.getElementById('calc-tva-total').textContent = fmtMoney(tvaTotal);
    document.getElementById('calc-total-net').textContent = fmtMoney(totalNet);
}

function clearInvoiceForm() {
    initInvoiceForm();
    showToast(t("toast.formReset"));
}

function saveCurrentInvoice() {
    const clientName = document.getElementById('inv-client-name').value.trim();
    if (!clientName) {
        showToast(t("toast.missingClientName"), "error");
        return;
    }

    const number = document.getElementById('inv-number').value.trim();
    const date = document.getElementById('inv-date').value;
    const dueDate = document.getElementById('inv-duedate').value;
    const status = document.getElementById('inv-status').value;

    // Extract Line items
    const items = [];
    document.querySelectorAll('#invoice-items-body tr').forEach(row => {
        const desc = row.querySelector('.item-desc').value;
        const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
        const unitPrice = parseFloat(row.querySelector('.item-price').value) || 0;
        const tva = parseFloat(row.querySelector('.item-tva').value) || 0;
        if (desc) {
            items.push({ desc, qty, unitPrice, tva, totalHt: qty * unitPrice });
        }
    });

    const rawSubtotalHt = items.reduce((a, it) => a + it.totalHt, 0);
    const rawTvaTotal = state.settings.tvaExempt ? 0 : items.reduce((a, it) => a + it.totalHt * (it.tva / 100), 0);
    const discountPercent = parseFloat(document.getElementById('inv-discount').value) || 0;
    const discountVal = rawSubtotalHt * (discountPercent / 100);
    const subtotalHt = rawSubtotalHt;
    const tvaTotal = (!state.settings.tvaExempt && discountPercent > 0) ? rawTvaTotal * (1 - discountPercent / 100) : rawTvaTotal;
    const totalNet = (rawSubtotalHt - discountVal) + (state.settings.tvaExempt ? 0 : tvaTotal);

    const newInvoice = {
        id: "inv_" + Date.now(),
        number,
        date,
        dueDate,
        clientName,
        clientAddress: document.getElementById('inv-client-address').value,
        clientSiret: document.getElementById('inv-client-siret').value,
        clientEmail: document.getElementById('inv-client-email').value,
        items,
        subtotalHt,
        discountPercent,
        discountVal,
        tvaTotal,
        totalNet,
        status,
        terms: document.getElementById('inv-terms').value,
        iban: document.getElementById('inv-iban').value
    };

    // Check if existing or update
    const existingIdx = state.invoices.findIndex(i => i.number === number);
    if (existingIdx >= 0) {
        state.invoices[existingIdx] = newInvoice;
    } else {
        state.invoices.unshift(newInvoice);
        state.settings.nextInvoiceSeq = (state.settings.nextInvoiceSeq || 1) + 1;
    }

    saveState();
    showToast(t("toast.invoiceSaved", { number }));
    switchTab('historique');
}

function previewAndPrintInvoice() {
    // Populate printable HTML template
    const s = state.settings;
    document.getElementById('print-company-name').textContent = s.companyName;
    document.getElementById('print-company-details').textContent = `${s.address}\n${currentCountry().taxIdLabel} : ${s.siret} ${s.ape ? ' - APE: ' + s.ape : ''}\n${s.contact}`;

    document.getElementById('print-inv-number').textContent = document.getElementById('inv-number').value;
    document.getElementById('print-inv-date').textContent = document.getElementById('inv-date').value;
    document.getElementById('print-inv-duedate').textContent = document.getElementById('inv-duedate').value;

    const clientName = document.getElementById('inv-client-name').value;
    const clientAddress = document.getElementById('inv-client-address').value;
    const clientSiret = document.getElementById('inv-client-siret').value;
    document.getElementById('print-client-details').textContent = `${clientName}\n${clientAddress}${clientSiret ? '\n' + currentCountry().taxIdLabel + ' : ' + clientSiret : ''}`;

    const tbody = document.getElementById('print-items-body');
    tbody.innerHTML = '';

    document.querySelectorAll('#invoice-items-body tr').forEach(row => {
        const desc = row.querySelector('.item-desc').value;
        const qty = row.querySelector('.item-qty').value;
        const unitPrice = parseFloat(row.querySelector('.item-price').value).toFixed(2);
        const tva = row.querySelector('.item-tva').value;
        const totalHt = (qty * unitPrice).toFixed(2);

        if (desc) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">${desc}</td>
                <td style="padding:10px 12px;text-align:center;border-bottom:1px solid #e2e8f0;">${qty}</td>
                <td style="padding:10px 12px;text-align:right;font-variant-numeric:tabular-nums;border-bottom:1px solid #e2e8f0;">${fmtMoney(parseFloat(unitPrice))}</td>
                <td class="print-tva-col" style="padding:10px 12px;text-align:center;font-variant-numeric:tabular-nums;border-bottom:1px solid #e2e8f0;">${tva}%</td>
                <td style="padding:10px 12px;text-align:right;font-variant-numeric:tabular-nums;font-weight:700;border-bottom:1px solid #e2e8f0;">${fmtMoney(parseFloat(totalHt))}</td>
            `;
            tbody.appendChild(tr);
        }
    });

    document.getElementById('print-subtotal-ht').textContent = document.getElementById('calc-subtotal-ht').textContent;
    document.getElementById('print-discount').textContent = document.getElementById('calc-discount-val').textContent;
    document.getElementById('print-tva').textContent = document.getElementById('calc-tva-total').textContent;
    document.getElementById('print-total-net').textContent = document.getElementById('calc-total-net').textContent;

    document.getElementById('print-iban').textContent = document.getElementById('inv-iban').value;
    document.getElementById('print-terms').textContent = document.getElementById('inv-terms').value;

    const country = currentCountry();
    if (s.tvaExempt) {
        document.getElementById('print-tva-mention').textContent = country.exemptNote;
    } else {
        document.getElementById('print-tva-mention').textContent = country.eu
            ? t("print.tvaPaidNote")
            : t("print.otherTaxNote").replace("{country}", country.name);
    }
    document.querySelector(".print-late-note").textContent = country.lateNote;
    document.getElementById('print-footer-siret').textContent = `${s.companyName} - ${country.taxIdLabel} : ${s.siret}${country.altIdLabel && s.ape ? ' - ' + country.altIdLabel + ' : ' + s.ape : ''}`;

    window.print();
}
