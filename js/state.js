// État global de l'application : données par défaut, persistance localStorage.
const DEFAULT_STATE = {
    settings: {
        companyName: "Martin Thomas - Micro Studio",
        siret: "892 345 678 00012",
        ape: "6201Z",
        address: "15 Avenue des Champs-Élysées, 75008 Paris",
        contact: "06 12 34 56 78 - contact@martin-studio.fr",
        iban: "FR76 1234 5678 9012 3456 7890 123",
        tvaExempt: true, // Default Micro-entrepreneur exemption
        terms: "Paiement à 30 jours à compter de la date d'émission. Pas d'escompte pour paiement anticipé.",
        nextInvoiceSeq: 3
    },
    clients: [
        {
            id: "c_1",
            name: "Acura Conseil EURL",
            address: "42 Rue de la Paix, 69002 Lyon",
            siret: "901 234 567 00019",
            email: "comptabilite@acura-conseil.fr"
        },
        {
            id: "c_2",
            name: "Boulangerie Artisanale Dupont",
            address: "8 Place du Marché, 33000 Bordeaux",
            siret: "812 987 654 00021",
            email: "contact@dupont-boulangerie.fr"
        }
    ],
    products: [
        {
            id: "p_1",
            name: "Création de Site Internet Vitrine",
            desc: "Développement web responsive 5 pages, optimisation SEO et formation d'administration.",
            price: 1200.00,
            tva: 0
        },
        {
            id: "p_2",
            name: "Audit & Maintenance Mensuelle",
            desc: "Sauvegardes hebdomadaires, mises à jour de sécurité et support prioritaire 2h/mois.",
            price: 150.00,
            tva: 0
        },
        {
            id: "p_3",
            name: "Identité Visuelle & Logo",
            desc: "Création de logo vectoriel, charte graphique et déclinables réseaux sociaux.",
            price: 650.00,
            tva: 0
        }
    ],
    invoices: [
        {
            id: "inv_1",
            number: "FACT-2026-001",
            date: "2026-09-15",
            dueDate: "2026-10-15",
            clientName: "Acura Conseil EURL",
            clientAddress: "42 Rue de la Paix, 69002 Lyon",
            clientSiret: "901 234 567 00019",
            clientEmail: "comptabilite@acura-conseil.fr",
            items: [
                { desc: "Création de Site Internet Vitrine", qty: 1, unitPrice: 1200.00, tva: 0, totalHt: 1200.00 }
            ],
            subtotalHt: 1200.00,
            discountPercent: 0,
            discountVal: 0,
            tvaTotal: 0,
            totalNet: 1200.00,
            status: "Payée",
            terms: "Paiement à 30 jours à compter de la date d'émission.",
            iban: "FR76 1234 5678 9012 3456 7890 123"
        },
        {
            id: "inv_2",
            number: "FACT-2026-002",
            date: "2026-10-01",
            dueDate: "2026-10-31",
            clientName: "Boulangerie Artisanale Dupont",
            clientAddress: "8 Place du Marché, 33000 Bordeaux",
            clientSiret: "812 987 654 00021",
            clientEmail: "contact@dupont-boulangerie.fr",
            items: [
                { desc: "Identité Visuelle & Logo", qty: 1, unitPrice: 650.00, tva: 0, totalHt: 650.00 }
            ],
            subtotalHt: 650.00,
            discountPercent: 5,
            discountVal: 32.50,
            tvaTotal: 0,
            totalNet: 617.50,
            status: "En attente",
            terms: "Paiement à 30 jours.",
            iban: "FR76 1234 5678 9012 3456 7890 123"
        }
    ]
};

// Active State
let state = JSON.parse(localStorage.getItem('factura_micro_state')) || DEFAULT_STATE;

function saveState() {
    localStorage.setItem('factura_micro_state', JSON.stringify(state));
    updateBadges();
    applyTvaDisplaySettings();
}
