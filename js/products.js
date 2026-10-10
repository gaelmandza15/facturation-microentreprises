// Catalogue de produits & services : tableau, modale d'édition, suppression.
function renderProductsTable() {
    const tbody = document.getElementById('products-table-body');
    tbody.innerHTML = '';

    state.products.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="cell-strong">${p.name}</td>
            <td class="cell-muted">${p.desc || '-'}</td>
            <td class="text-right cell-mono cell-strong">${fmtMoney(p.price)}</td>
            <td class="text-center cell-mono class-tva-col">${p.tva || 0}%</td>
            <td class="text-right">
                <button onclick="editProduct('${p.id}')" class="icon-btn" title="Modifier"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteProduct('${p.id}')" class="icon-btn danger" title="Supprimer"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openProductModal(prodId = null) {
    document.getElementById('modal-product').classList.remove('hidden');
    if (prodId) {
        const p = state.products.find(x => x.id === prodId);
        document.getElementById('modal-product-title').textContent = "Modifier le Produit";
        document.getElementById('modal-product-id').value = p.id;
        document.getElementById('modal-product-name').value = p.name;
        document.getElementById('modal-product-desc').value = p.desc || '';
        document.getElementById('modal-product-price').value = p.price;
        document.getElementById('modal-product-tva').value = p.tva || 0;
    } else {
        document.getElementById('modal-product-title').textContent = "Nouveau Produit";
        document.getElementById('modal-product-id').value = '';
        document.getElementById('modal-product-name').value = '';
        document.getElementById('modal-product-desc').value = '';
        document.getElementById('modal-product-price').value = '';
        document.getElementById('modal-product-tva').value = '0';
    }
}

function closeProductModal() {
    document.getElementById('modal-product').classList.add('hidden');
}

function saveProductFromModal() {
    const id = document.getElementById('modal-product-id').value;
    const name = document.getElementById('modal-product-name').value.trim();
    const price = parseFloat(document.getElementById('modal-product-price').value);

    if (!name || isNaN(price)) {
        showToast("Veuillez remplir le nom et le prix du produit.", "error");
        return;
    }

    const productData = {
        id: id || "p_" + Date.now(),
        name,
        desc: document.getElementById('modal-product-desc').value.trim(),
        price,
        tva: parseFloat(document.getElementById('modal-product-tva').value) || 0
    };

    if (id) {
        const idx = state.products.findIndex(p => p.id === id);
        state.products[idx] = productData;
    } else {
        state.products.push(productData);
    }

    saveState();
    closeProductModal();
    renderProductsTable();
    populateProductDropdown();
    showToast("Produit/Prestation enregistré.");
}

function editProduct(id) {
    openProductModal(id);
}

function deleteProduct(id) {
    if (confirm("Voulez-vous supprimer ce produit du catalogue ?")) {
        state.products = state.products.filter(p => p.id !== id);
        saveState();
        renderProductsTable();
        populateProductDropdown();
        showToast("Produit supprimé.");
    }
}
