// i18n : dictionnaires FR/EN + application de la langue (anglais par défaut).
// Les clés sont partagées avec le vérificateur automatique (scripts/check-i18n.js)
// qui bloque le commit en cas d'oubli de traduction.

const I18N = {
    en: {
        "app.title": "FacturaMicro - Micro-Enterprise Invoicing Tool",
        "brand.subtitle": "Micro-Enterprise",

        // Sidebar navigation
        "nav.facture": "Create Invoice",
        "nav.historique": "Invoice History",
        "nav.clients": "Client List",
        "nav.produits": "Product List",
        "nav.parametres": "My Business & VAT",
        "nav.instructions": "Instructions & Tutorial",
        "badge.invoice.tooltip": "Total number of invoices saved in the history",
        "badge.client.tooltip": "Total number of registered clients",
        "footer.tvaRegime": "VAT regime:",
        "footer.exempt": "Exempt",
        "footer.taxable": "VAT taxable",
        "footer.autosave": "Auto-save:",
        "footer.local": "Local",

        // Header
        "header.newInvoice": "New Invoice",

        // Page titles & subtitles (tab switching)
        "title.facture": "Invoice Generator",
        "subtitle.facture": "Create and edit a compliant invoice in seconds.",
        "title.historique": "Invoice History",
        "subtitle.historique": "Track your payments and revenue.",
        "title.clients": "Client File",
        "subtitle.clients": "Manage your client list and their details.",
        "title.produits": "Product & Service Catalog",
        "subtitle.produits": "Save your rates to save time.",
        "title.parametres": "My Business & VAT",
        "subtitle.parametres": "Manage your mandatory mentions and VAT options.",
        "title.instructions": "Instructions & FAQ",
        "subtitle.instructions": "Legal guidance for managing your micro-enterprise.",

        // Tab 1: invoice form
        "invoice.cardTitle": "New invoice",
        "invoice.cardSubtitle": "Fill in the required information, add your services, then save.",
        "invoice.number": "Invoice Number",
        "invoice.numberHint": "Sequential format recommended (e.g.: INV-2026-001)",
        "invoice.date": "Issue Date",
        "invoice.dueDate": "Due Date / Payment",
        "invoice.emitter": "Sender (Your business)",
        "invoice.edit": "Edit",
        "invoice.client": "Recipient Client",
        "invoice.createClient": "+ Create a client",
        "invoice.selectClient": "-- Select a saved client --",
        "invoice.clientNamePh": "Client name or company *",
        "invoice.clientAddressPh": "Full postal address of the client",
        "invoice.clientTaxIdPh": "Tax ID / VAT number",
        "invoice.clientEmailPh": "Contact email",
        "invoice.itemsTitle": "Services / Products",
        "invoice.addFromCatalog": "+ Add from product list...",
        "invoice.colDescription": "Service / product description",
        "invoice.colQty": "Qty",
        "invoice.colUnitPrice": "Unit Price excl. tax",
        "invoice.colTva": "VAT %",
        "invoice.colTotalHt": "Total excl. tax",
        "invoice.descPlaceholder": "Service or product name...",
        "invoice.deleteRowTitle": "Delete this line",
        "invoice.defaultRateLabel": "Default VAT rate for new lines:",
        "invoice.addLine": "Add a custom line",
        "invoice.terms": "Payment terms & late penalties",
        "invoice.bankDetails": "Bank details (RIB / IBAN)",
        "invoice.subtotal": "Subtotal excl. tax:",
        "invoice.discountGlobal": "Overall discount (%):",
        "invoice.discountAmount": "Discount amount:",
        "invoice.tvaAmount": "VAT amount:",
        "invoice.netToPay": "NET AMOUNT DUE:",
        "invoice.status": "Status:",
        "invoice.reset": "Reset",
        "invoice.print": "Preview & Print / PDF",
        "invoice.save": "Save Invoice",

        // Invoice statuses
        "status.draft": "Draft",
        "status.pending": "Pending payment",
        "status.paid": "Paid",
        "history.statusOption.pending": "Pending",

        // Tab 2: history
        "history.statCaTitle": "Total Revenue (Paid)",
        "history.statCaHint": "Total of invoices paid by your clients.",
        "history.statPendingTitle": "Awaiting payment",
        "history.statCountTitle": "Total number of invoices",
        "history.searchPh": "Search (No., Client...)",
        "history.filterLabel": "Filter by status:",
        "history.filterAll": "All statuses",
        "history.colNumber": "Invoice No.",
        "history.colDate": "Date",
        "history.colClient": "Client",
        "history.colAmount": "NET Amount",
        "history.colStatus": "Status",
        "history.colActions": "Actions",
        "history.empty": "No invoice saved in the history yet.",
        "history.editTitle": "Edit / View",
        "history.deleteTitle": "Delete",

        // Tab 3: clients
        "clients.dbTitle": "Client Database",
        "clients.dbSubtitle": "Manage your client list and their details.",
        "clients.new": "New Client",
        "clients.taxIdMissing": "Tax identifier not provided",
        "clients.noEmail": "No email",
        "clients.invoiceBtn": "Invoice",
        "clients.editTitle": "Edit",
        "clients.deleteTitle": "Delete",
        "clients.empty": "No client registered. Add your first client to speed up invoicing.",
        "clients.modalEdit": "Edit Client",
        "clients.modalNew": "New Client",
        "clients.formName": "Name / Company *",
        "clients.formAddress": "Postal Address *",
        "clients.formEmail": "Email",
        "clients.cancel": "Cancel",
        "clients.save": "Save",

        // Tab 4: products
        "products.catalogTitle": "Service & Product Catalog",
        "products.catalogSubtitle": "Pre-set your recurring offers to insert them in 1 click into your invoices.",
        "products.new": "New Product/Service",
        "products.colRef": "Reference / Name",
        "products.colDesc": "Description",
        "products.colPrice": "Unit Price excl. tax",
        "products.modalEdit": "Edit Product",
        "products.modalNew": "New Product / Service",
        "products.formName": "Designation / Name *",
        "products.formDesc": "Detailed description",
        "products.formPrice": "Unit Price excl. tax",
        "products.formTva": "VAT rate (%)",

        // Tab 5: settings
        "settings.profileTitle": "Micro-Enterprise Profile",
        "settings.profileSubtitle": "This mandatory information will appear in the header of your invoices.",
        "settings.companyName": "Business Name / Full Name *",
        "settings.contact": "Phone & Email",
        "settings.address": "Full registered address *",
        "settings.ibanDefault": "Default RIB / IBAN",
        "settings.optional": "(Optional)",
        "settings.locTitle": "Location & Currency",
        "settings.locSubtitle": "Automatically adapts VAT legal mentions, the tax identifier, currency and amount formatting on your invoices.",
        "settings.country": "Country of taxation *",
        "settings.currency": "Display currency",
        "settings.numberFormat": "Number format",
        "settings.euNote": "EU country: for a cross-border service to a business client, check the reverse charge mechanism and mention your intra-community VAT number. The thresholds and rates shown are indicative — confirm with your local tax administration.",
        "settings.countryConfigTitle": "Custom country configuration",
        "settings.countryConfigBadge": "Customized",
        "settings.countryConfigIntro": "The built-in VAT rates and legal mentions are <strong>indicative</strong>: regulations change constantly. Freely modify these values if needed — they will apply immediately to the selected country (rates offered in invoice lines, exemption mention printed on the invoice, tax identifier...).",
        "settings.vatRates": "Applicable rates (%) — separated by commas",
        "settings.taxIdLabel": "Tax identifier label",
        "settings.taxIdExample": "Format / example of this identifier",
        "settings.altIdLabel": "Secondary identifier (empty = hidden)",
        "settings.exemptNoteLabel": "Exemption legal mention (printed on the invoice)",
        "settings.lateNoteLabel": "Late-payment penalty mention (printed on the invoice)",
        "settings.saveCountryConfig": "Save country configuration",
        "settings.restoreDefaults": "Restore default values",
        "settings.tvaRegime": "VAT Regime",
        "settings.tvaExemptTitle": "Exempt from VAT / TVH / GST / TPS (franchise en base of the selected country)",
        "settings.tvaExemptHelp": "Check this box if you benefit from micro-entrepreneur status not liable for VAT. The VAT columns will be hidden and the mandatory mention will be added automatically.",
        "settings.backupTitle": "Data Security & Backup",
        "settings.backupSubtitle": "All your data is securely stored locally in your browser (localStorage).",
        "settings.export": "Export all data (JSON)",
        "settings.import": "Import a backup (JSON)",
        "settings.saveProfile": "Save profile",

        // Region group labels (country dropdown)
        "region.europe": "Europe",
        "region.afrique": "Francophone Africa",
        "region.amerique": "Americas",
        "region.asie": "Asia-Pacific",

        // Tab 6: instructions
        "instr.videoTag": "Video Tutorial & Quick Guide",
        "instr.videoTitle": "Get started in 3 minutes",
        "instr.videoText": "Learn to set up your tax-ID profile, create clients, issue your first invoice and print it as a PDF compliant with micro-enterprise legal standards.",
        "instr.watchDemo": "Watch the demo",
        "instr.stepsTitle": "Steps to get started",
        "instr.step1a": "Enter your tax ID:",
        "instr.step1b": "Go to the My Business & VAT tab and save your exact details.",
        "instr.step2a": "Set the VAT regime:",
        "instr.step2b": "If you do not charge VAT, leave the exemption checked (Art. 293 B of the French CGI).",
        "instr.step3a": "Add a client:",
        "instr.step3b": "In the Client File, enter your client's company name and address.",
        "instr.step4a": "Generate the invoice:",
        "instr.step4b": "In the Create Invoice tab, choose the client, add the services, then click Preview & Print / PDF.",
        "instr.checklistTitle": "Mandatory mentions in {country}",
        "instr.check1": "Issuer's tax ID number ({taxid}) and address.",
        "instr.check2": "Unique, chronological numbering without gaps.",
        "instr.check3": "Mention <em>\"TVA non applicable, art. 293 B du CGI\"</em> (or the local exemption wording of your country) if exempt.",
        "instr.check4": "Due date and late-payment penalty conditions.",

        "locale.fr": "1 234.56 (French)",
        "locale.en": "1,234.56 (English/US)",
        "locale.es": "1,234.56 (Spanish)",
        "locale.de": "1,234.56 (German)",
        "locale.pt": "1,234.56 (Portuguese)",
        "locale.ja": "1,234.56 (Japanese/Chinese)",
        "print.discount": "Discount:",
        "print.tva": "VAT:",

        // Printable invoice overlay
        "print.badge": "INVOICE",
        "print.date": "Date:",
        "print.due": "Due date:",
        "print.billTo": "BILLED TO:",
        "print.colDescription": "Description",
        "print.colUnitPrice": "Unit Price excl. tax",
        "print.colTotalHt": "Total excl. tax",
        "print.paymentBy": "Payment by bank transfer:",
        "print.totalNet": "TOTAL NET AMOUNT DUE:",

        // Toasts & confirms (JS strings)
        "toast.formReset": "Invoice form reset.",
        "toast.missingClientName": "Please provide at least the client name.",
        "toast.invoiceSaved": "Invoice {number} saved to history!",
        "toast.clientMissingFields": "Please enter the client's name and address.",
        "toast.clientSaved": "Client saved successfully.",
        "toast.confirmDeleteClient": "Do you really want to delete this client from your file?",
        "toast.clientDeleted": "Client deleted.",
        "toast.productMissingFields": "Please fill in the product name and price.",
        "toast.productSaved": "Product/Service saved.",
        "toast.confirmDeleteProduct": "Do you want to delete this product from the catalog?",
        "toast.productDeleted": "Product deleted.",
        "toast.statusUpdated": "Status of invoice {number} updated: {status}",
        "toast.confirmDeleteInvoice": "Are you sure you want to delete this invoice from the history?",
        "toast.invoiceDeleted": "Invoice deleted.",
        "toast.invoiceLoaded": "Invoice {number} loaded into the editor.",
        "toast.profileUpdated": "Business profile updated.",
        "toast.countryChanged": "Country: {name} — currency {currency}, VAT mention updated.",
        "toast.exportDownloaded": "Backup export downloaded.",
        "toast.importOk": "Backup imported successfully!",
        "toast.importInvalid": "Invalid JSON file.",
        "toast.importError": "Error while reading the JSON file.",
        "toast.countryConfigSaved": "Custom country configuration saved.",
        "toast.countryConfigReset": "{name} configuration reset (indicative values).",
        "toast.openTutorial": "Opening the interactive video tutorial...",
        "settings.defaultCompanyName": "My Business",
        "settings.notProvided": "Not provided",
        "print.tvaPaidNote": "VAT due on debits.",
        "print.otherTaxNote": "Indirect tax where applicable under the regulations of {country}."
    },

    fr: {
        "app.title": "FacturaMicro - Outil de Facturation Micro-Entreprise",
        "brand.subtitle": "Micro-Entreprise",

        "nav.facture": "Créer une Facture",
        "nav.historique": "Historique Factures",
        "nav.clients": "Fichier Clients",
        "nav.produits": "Liste de Produits",
        "nav.parametres": "Mon Entreprise & TVA",
        "nav.instructions": "Instructions & Tuto",
        "badge.invoice.tooltip": "Nombre total de factures enregistrées dans l'historique",
        "badge.client.tooltip": "Nombre total de clients enregistrés",
        "footer.tvaRegime": "Régime TVA :",
        "footer.exempt": "Non Assujetti",
        "footer.taxable": "Assujetti TVA",
        "footer.autosave": "Sauvegarde auto :",
        "footer.local": "Locale",

        "header.newInvoice": "Nouvelle Facture",

        "title.facture": "Générateur de Facture",
        "subtitle.facture": "Créez et éditez une facture conforme en quelques secondes.",
        "title.historique": "Historique des Factures",
        "subtitle.historique": "Suivez vos règlements et chiffre d'affaires.",
        "title.clients": "Fichier Clients",
        "subtitle.clients": "Gérez la liste de vos clients et leurs informations.",
        "title.produits": "Catalogue de Produits & Services",
        "subtitle.produits": "Mémorisez vos tarifs pour un gain de temps.",
        "title.parametres": "Mon Entreprise & TVA",
        "subtitle.parametres": "Gérez vos mentions obligatoires et options TVA.",
        "title.instructions": "Instructions & FAQ",
        "subtitle.instructions": "Conseils légaux pour la gestion de votre micro-entreprise.",

        "invoice.cardTitle": "Nouvelle facture",
        "invoice.cardSubtitle": "Renseignez les informations obligatoires, ajoutez vos prestations puis enregistrez.",
        "invoice.number": "Numéro de Facture",
        "invoice.numberHint": "Format séquentiel recommandé (ex: FACT-2026-001)",
        "invoice.date": "Date d'Émission",
        "invoice.dueDate": "Date d'Échéance / Règlement",
        "invoice.emitter": "Émetteur (Votre entreprise)",
        "invoice.edit": "Modifier",
        "invoice.client": "Client Destinataire",
        "invoice.createClient": "+ Créer un client",
        "invoice.selectClient": "-- Sélectionner un client enregistré --",
        "invoice.clientNamePh": "Nom ou Raison Sociale du client *",
        "invoice.clientAddressPh": "Adresse postale complète du client",
        "invoice.clientTaxIdPh": "SIRET / Num TVA",
        "invoice.clientEmailPh": "Email de contact",
        "invoice.itemsTitle": "Prestations / Produits",
        "invoice.addFromCatalog": "+ Ajouter depuis la liste de produits...",
        "invoice.colDescription": "Description de la prestation / produit",
        "invoice.colQty": "Qté",
        "invoice.colUnitPrice": "Prix Unit. HT",
        "invoice.colTva": "TVA %",
        "invoice.colTotalHt": "Total HT",
        "invoice.descPlaceholder": "Désignation du service ou bien...",
        "invoice.deleteRowTitle": "Supprimer la ligne",
        "invoice.defaultRateLabel": "Taux TVA par défaut des nouvelles lignes :",
        "invoice.addLine": "Ajouter une ligne personnalisée",
        "invoice.terms": "Conditions de règlement & Pénalités",
        "invoice.bankDetails": "Coordonnées bancaires (RIB / IBAN)",
        "invoice.subtotal": "Sous-Total HT :",
        "invoice.discountGlobal": "Remise globale (%) :",
        "invoice.discountAmount": "Montant Remise :",
        "invoice.tvaAmount": "Montant TVA :",
        "invoice.netToPay": "NET À PAYER :",
        "invoice.status": "Statut :",
        "invoice.reset": "Réinitialiser",
        "invoice.print": "Aperçu & Imprimer / PDF",
        "invoice.save": "Enregistrer la Facture",

        "status.draft": "Brouillon",
        "status.pending": "En attente de paiement",
        "status.paid": "Payée",
        "history.statusOption.pending": "En attente",

        "history.statCaTitle": "Chiffre d'Affaires Total (Payé)",
        "history.statCaHint": "Total des factures réglées par vos clients.",
        "history.statPendingTitle": "En attente de règlement",
        "history.statCountTitle": "Nombre total de factures",
        "history.searchPh": "Rechercher (N°, Client...)",
        "history.filterLabel": "Filtrer par statut :",
        "history.filterAll": "Tous les statuts",
        "history.colNumber": "N° Facture",
        "history.colDate": "Date",
        "history.colClient": "Client",
        "history.colAmount": "Montant NET",
        "history.colStatus": "Statut",
        "history.colActions": "Actions",
        "history.empty": "Aucune facture enregistrée dans l'historique pour le moment.",
        "history.editTitle": "Éditer / Voir",
        "history.deleteTitle": "Supprimer",

        "clients.dbTitle": "Base de données Clients",
        "clients.dbSubtitle": "Gérez la liste de vos clients et leurs informations.",
        "clients.new": "Nouveau Client",
        "clients.taxIdMissing": "Identifiant fiscal non renseigné",
        "clients.noEmail": "Pas d'email",
        "clients.invoiceBtn": "Facturer",
        "clients.editTitle": "Modifier",
        "clients.deleteTitle": "Supprimer",
        "clients.empty": "Aucun client enregistré. Ajoutez votre premier client pour accélérer la rédaction de factures.",
        "clients.modalEdit": "Modifier le Client",
        "clients.modalNew": "Nouveau Client",
        "clients.formName": "Nom / Raison Sociale *",
        "clients.formAddress": "Adresse Postale *",
        "clients.formEmail": "Email",
        "clients.cancel": "Annuler",
        "clients.save": "Enregistrer",

        "products.catalogTitle": "Catalogue de Prestations & Produits",
        "products.catalogSubtitle": "Préréglez vos offres récurrentes pour les insérer en 1 clic dans vos factures.",
        "products.new": "Nouveau Produit/Service",
        "products.colRef": "Référence / Nom",
        "products.colDesc": "Description",
        "products.colPrice": "Prix Unitaire HT",
        "products.modalEdit": "Modifier le Produit",
        "products.modalNew": "Nouveau Produit",
        "products.formName": "Désignation / Nom *",
        "products.formDesc": "Description détaillée",
        "products.formPrice": "Prix Unit. HT",
        "products.formTva": "Taux TVA (%)",

        "settings.profileTitle": "Profil de la Micro-Entreprise",
        "settings.profileSubtitle": "Ces informations obligatoires figureront sur l'en-tête de vos factures.",
        "settings.companyName": "Nom Commercial / Prénom Nom *",
        "settings.contact": "Téléphone & Email",
        "settings.address": "Adresse complète du siège social *",
        "settings.ibanDefault": "RIB / IBAN par défaut",
        "settings.optional": "(Optionnel)",
        "settings.locTitle": "Localisation & Devise",
        "settings.locSubtitle": "Adapte automatiquement les mentions légales TVA, l'identifiant fiscal, la devise et le format des montants sur vos factures.",
        "settings.country": "Pays d'imposition *",
        "settings.currency": "Devise d'affichage",
        "settings.numberFormat": "Format des nombres",
        "settings.euNote": "Pays UE : pour une prestation transfrontalière à un client professionnel, vérifiez l'autoliquidation (reverse charge) et mentionnez votre numéro de TVA intracommunautaire. Les seuils et taux affichés sont indicatifs — confirmez avec votre administration fiscale locale.",
        "settings.countryConfigTitle": "Configuration personnalisée du pays",
        "settings.countryConfigBadge": "Personnalisée",
        "settings.countryConfigIntro": "Les taux de TVA et mentions légales intégrés sont <strong>indicatifs</strong> : les réglementations évoluent en permanence. Modifiez librement ces valeurs si nécessaire — elles s'appliqueront immédiatement au pays sélectionné (taux proposés dans les lignes de facture, mention d'exonération imprimée, identifiant fiscal...).",
        "settings.vatRates": "Taux applicables (%) — séparés par des virgules",
        "settings.taxIdLabel": "Libellé de l'identifiant fiscal",
        "settings.taxIdExample": "Format / exemple de cet identifiant",
        "settings.altIdLabel": "Identifiant secondaire (vide = masqué)",
        "settings.exemptNoteLabel": "Mention légale d'exonération (imprimée sur la facture)",
        "settings.lateNoteLabel": "Mention pénalités de retard (imprimée sur la facture)",
        "settings.saveCountryConfig": "Enregistrer la configuration pays",
        "settings.restoreDefaults": "Rétablir les valeurs par défaut",
        "settings.tvaRegime": "Régime de TVA",
        "settings.tvaExemptTitle": "Exonéré de TVA / TVH / GST / TPS (franchise en base du pays sélectionné)",
        "settings.tvaExemptHelp": "Cochez cette case si vous bénéficiez du statut de micro-entrepreneur non assujetti à la TVA. Les colonnes TVA seront masquées et la mention obligatoire sera ajoutée automatiquement.",
        "settings.backupTitle": "Sécurité & Sauvegarde des données",
        "settings.backupSubtitle": "Toutes vos données sont stockées de façon sécurisée localement dans votre navigateur (localStorage).",
        "settings.export": "Exporter toutes les données (JSON)",
        "settings.import": "Importer une sauvegarde (JSON)",
        "settings.saveProfile": "Enregistrer le profil",

        "region.europe": "🇪🇺 Europe",
        "region.afrique": "🌍 Afrique francophone",
        "region.amerique": "🌎 Amériques",
        "region.asie": "🌏 Asie-Pacifique",

        "instr.videoTag": "Tutoriel Vidéo & Guide Rapide",
        "instr.videoTitle": "Prise en main en 3 minutes",
        "instr.videoText": "Apprenez à paramétrer votre profil d'identifiant fiscal ({taxid}), créer vos clients, émettre votre première facture et l'imprimer au format PDF conforme aux normes légales de la micro-entreprise.",
        "instr.watchDemo": "Visionner la démo",
        "instr.stepsTitle": "Étapes pour démarrer",
        "instr.step1a": "Renseignez votre identifiant fiscal ({taxid}) :",
        "instr.step1b": "Allez dans l'onglet Mon Entreprise & TVA et enregistrez vos coordonnées exactes.",
        "instr.step2a": "Configurez le régime TVA :",
        "instr.step2b": "Si vous ne facturez pas la TVA, laissez l'exonération cochée (Art. 293 B du CGI).",
        "instr.step3a": "Ajoutez un client :",
        "instr.step3b": "Dans le Fichier Clients, saisissez la raison sociale et l'adresse de votre client.",
        "instr.step4a": "Générez la facture :",
        "instr.step4b": "Dans l'onglet Créer une Facture, choisissez le client, ajoutez les prestations, puis cliquez sur Aperçu & Imprimer / PDF.",
        "instr.checklistTitle": "Mentions obligatoires en {country}",
        "instr.check1": "Numéro d'identifiant fiscal ({taxid}) et adresse de l'émetteur.",
        "instr.check2": "Numérotation unique et chronologique sans rupture.",
        "instr.check3": "Mention <em>\"TVA non applicable, art. 293 B du CGI\"</em> (ou la mention d'exonération locale de votre pays) si exonéré.",
        "instr.check4": "Date d'échéance et conditions de pénalités de retard.",

        "locale.fr": "1 234,56 (français)",
        "locale.en": "1,234.56 (anglais/US)",
        "locale.es": "1.234,56 (espagnol)",
        "locale.de": "1.234,56 (allemand)",
        "locale.pt": "1.234,56 (portugais)",
        "locale.ja": "1,234.56 (japonais/chinois)",
        "print.discount": "Remise :",
        "print.tva": "TVA :",

        "print.badge": "FACTURE",
        "print.date": "Date :",
        "print.due": "Échéance :",
        "print.billTo": "FACTURÉ À :",
        "print.colDescription": "Description",
        "print.colUnitPrice": "Prix Unit. HT",
        "print.colTotalHt": "Total HT",
        "print.paymentBy": "Règlement par virement bancaire :",
        "print.totalNet": "TOTAL NET À PAYER :",

        "toast.formReset": "Formulaire de facture réinitialisé.",
        "toast.missingClientName": "Veuillez indiquer au moins le nom du client.",
        "toast.invoiceSaved": "Facture {number} enregistrée dans l'historique !",
        "toast.clientMissingFields": "Veuillez saisir le nom et l'adresse du client.",
        "toast.clientSaved": "Client enregistré avec succès.",
        "toast.confirmDeleteClient": "Voulez-vous vraiment supprimer ce client de votre fichier ?",
        "toast.clientDeleted": "Client supprimé.",
        "toast.productMissingFields": "Veuillez remplir le nom et le prix du produit.",
        "toast.productSaved": "Produit/Prestation enregistré.",
        "toast.confirmDeleteProduct": "Voulez-vous supprimer ce produit du catalogue ?",
        "toast.productDeleted": "Produit supprimé.",
        "toast.statusUpdated": "Statut de la facture {number} mis à jour : {status}",
        "toast.confirmDeleteInvoice": "Êtes-vous sûr de vouloir supprimer cette facture de l'historique ?",
        "toast.invoiceDeleted": "Facture supprimée.",
        "toast.invoiceLoaded": "Facture {number} chargée dans l'éditeur.",
        "toast.profileUpdated": "Profil entreprise mis à jour.",
        "toast.countryChanged": "Pays : {name} — devise {currency}, mention TVA mise à jour.",
        "toast.exportDownloaded": "Export de sauvegarde téléchargé.",
        "toast.importOk": "Sauvegarde importée avec succès !",
        "toast.importInvalid": "Fichier JSON invalide.",
        "toast.importError": "Erreur lors de la lecture du fichier JSON.",
        "toast.countryConfigSaved": "Configuration pays personnalisée enregistrée.",
        "toast.countryConfigReset": "Configuration de {name} réinitialisée (valeurs indicatives).",
        "toast.openTutorial": "Ouverture du tutoriel vidéo interactif...",
        "settings.defaultCompanyName": "Mon Entreprise",
        "settings.notProvided": "Non renseigné",
        "print.tvaPaidNote": "TVA acquittée sur les débits.",
        "print.otherTaxNote": "Taxe indirecte le cas échéant selon la réglementation du {country}."
    }
};

// --- API ---
function currentLang() {
    return state.settings.lang || "en"; // anglais par défaut
}

function t(key, params) {
    const lang = currentLang();
    let s = (I18N[lang] && I18N[lang][key]);
    if (s === undefined) s = I18N.en[key]; // filet de sécurité : clé absente de la langue active
    if (s === undefined) return key;       // clé totalement inconnue -> affichage brut + repérable
    // Paramètre auto : {taxid} = libellé de l'identifiant fiscal du pays
    // (SIRET en France, NINEA au Sénégal, EIN aux USA...) — jamais codé en dur.
    if (typeof currentCountry === 'function') {
        const taxIdLabel = (currentCountry().taxIdLabel || "").replace(/\s*\([^)]*\)\s*$/, "");
        s = s.replace(/\{taxid\}/g, taxIdLabel);
    }
    if (params) {
        Object.keys(params).forEach(p => { s = s.replace(new RegExp(`\\{${p}\\}`, "g"), params[p]); });
    }
    return s;
}

// Applique la langue sur tout le DOM statique (attributs data-i18n* dans index.html)
function applyLanguage(lang) {
    if (lang) state.settings.lang = lang;
    const L = currentLang();
    document.documentElement.lang = L;

    document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.getAttribute('data-i18n')));
    document.querySelectorAll('[data-i18n-html]').forEach(el => el.innerHTML = t(el.getAttribute('data-i18n-html')));
    document.querySelectorAll('[data-i18n-ph]').forEach(el => el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))));
    document.querySelectorAll('[data-i18n-title]').forEach(el => el.setAttribute('title', t(el.getAttribute('data-i18n-title'))));
    const titleEl = document.querySelector('[data-i18n-doc-title]');
    if (titleEl) document.title = t(titleEl.getAttribute('data-i18n-doc-title'));

    // Ré-application des libellés dépendant du pays (taxId...) après changement de langue
    if (typeof applyCountrySettings === 'function') applyCountrySettings();
    // Re-rendu des vues dynamiques dans la nouvelle langue
    if (typeof renderSellerSummary === 'function') renderSellerSummary();
    if (typeof populateCountrySelect === 'function') populateCountrySelect();
    if (typeof updateBadges === 'function') updateBadges();
    if (document.getElementById('tab-historique')?.classList.contains('active')) renderHistoryTable();
    if (document.getElementById('tab-clients')?.classList.contains('active')) renderClientsGrid();
    if (document.getElementById('tab-produits')?.classList.contains('active')) renderProductsTable();
    if (document.getElementById('tab-parametres')?.classList.contains('active')) loadSettingsForm();
    if (typeof refreshPageTitles === 'function') refreshPageTitles();
}

// Sélecteur de langue dans l'en-tête (créé dynamiquement, pas de texte en dur)
function ensureLangSwitch() {
    const actions = document.querySelector('.header-actions');
    if (!actions || document.getElementById('lang-switch')) return;
    const sel = document.createElement('select');
    sel.id = 'lang-switch';
    sel.className = 'input-pill';
    sel.style.cssText = 'width:auto;padding:6px 12px;font-weight:700;cursor:pointer;';
    sel.innerHTML = '<option value="en">English</option><option value="fr">Français</option>';
    sel.value = currentLang();
    sel.onchange = () => {
        state.settings.lang = sel.value;
        saveState();
        applyLanguage(sel.value);
    };
    actions.prepend(sel);
}
