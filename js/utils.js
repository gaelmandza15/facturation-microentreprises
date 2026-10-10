// Traduction des statuts de facture (valeur interne FR stable, libellé affiché traduit)
function statusLabel(v) {
    const map = { "Brouillon": "status.draft", "En attente": "status.pending", "Payée": "status.paid" };
    return t(map[v] || "status.draft");
}

// Utilitaires transversaux : notifications toast.
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';

    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
