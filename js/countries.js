// Base de données pays : devises, formats, identifiants fiscaux et mentions légales TVA.
// Couvre la France (par défaut), l'Afrique francophone (UEMOA/CEMAC/Maghreb),
// l'Europe (UE / UK / Suisse), les Amériques et l'Asie de l'Est & du Sud-Est.

const CURRENCIES = {
    EUR: { symbol: "€",   code: "EUR", decimals: 2 },
    XOF: { symbol: "CFA", code: "XOF", decimals: 0 }, // Franc CFA BCEAO (Afrique de l'Ouest)
    XAF: { symbol: "FCFA",code: "XAF", decimals: 0 }, // Franc CFA BEAC (Afrique Centrale)
    MAD: { symbol: "DH",  code: "MAD", decimals: 2 }, // Dirham marocain
    TND: { symbol: "DT",  code: "TND", decimals: 3 }, // Dinar tunisien
    DZD: { symbol: "DA",  code: "DZD", decimals: 2 }, // Dinar algérien
    GNF: { symbol: "FG",  code: "GNF", decimals: 0 }, // Franc guinéen
    USD: { symbol: "$",   code: "USD", decimals: 2 },
    CAD: { symbol: "$",   code: "CAD", decimals: 2 },
    MXN: { symbol: "$",   code: "MXN", decimals: 2 },
    BRL: { symbol: "R$",  code: "BRL", decimals: 2 },
    GBP: { symbol: "£",   code: "GBP", decimals: 2 },
    CHF: { symbol: "CHF", code: "CHF", decimals: 2 },
    SEK: { symbol: "kr",  code: "SEK", decimals: 2 },
    NOK: { symbol: "kr",  code: "NOK", decimals: 2 },
    DKK: { symbol: "kr",  code: "DKK", decimals: 2 },
    PLN: { symbol: "zł",  code: "PLN", decimals: 2 },
    CZK: { symbol: "Kč",  code: "CZK", decimals: 2 },
    HUF: { symbol: "Ft",  code: "HUF", decimals: 0 },
    RON: { symbol: "lei", code: "RON", decimals: 2 },
    JPY: { symbol: "¥",   code: "JPY", decimals: 0 },
    KRW: { symbol: "₩",   code: "KRW", decimals: 0 },
    CNY: { symbol: "¥",   code: "CNY", decimals: 2 },
    HKD: { symbol: "HK$", code: "HKD", decimals: 2 },
    TWD: { symbol: "NT$", code: "TWD", decimals: 2 },
    SGD: { symbol: "S$",  code: "SGD", decimals: 2 },
    MYR: { symbol: "RM",  code: "MYR", decimals: 2 },
    THB: { symbol: "฿",   code: "THB", decimals: 2 },
    VND: { symbol: "₫",   code: "VND", decimals: 0 },
    IDR: { symbol: "Rp",  code: "IDR", decimals: 0 },
    PHP: { symbol: "₱",   code: "PHP", decimals: 2 },
    INR: { symbol: "₹",   code: "INR", decimals: 2 },
    AUD: { symbol: "A$",  code: "AUD", decimals: 2 },
    NZD: { symbol: "NZ$", code: "NZD", decimals: 2 }
};

// loc : décimale | millier | position du symbole (pre = avant, post = après)
const LOCALES = {
    fr:   { group: "fr-FR", dec: ",", sep: " ", symPos: "post" },
    en:   { group: "en-US", dec: ".", sep: ",", symPos: "pre"  },
    es:   { group: "es-ES", dec: ",", sep: ".", symPos: "post" },
    de:   { group: "de-DE", dec: ",", sep: ".", symPos: "post" },
    nl:   { group: "nl-NL", dec: ",", sep: ".", symPos: "pre"  },
    pt:   { group: "pt-BR", dec: ",", sep: ".", symPos: "post" },
    it:   { group: "it-IT", dec: ",", sep: ".", symPos: "post" },
    sv:   { group: "sv-SE", dec: ",", sep: " ", symPos: "post" },
    no:   { group: "nb-NO", dec: ",", sep: " ", symPos: "post" },
    da:   { group: "da-DK", dec: ",", sep: ".", symPos: "post" },
    pl:   { group: "pl-PL", dec: ",", sep: " ", symPos: "post" },
    cs:   { group: "cs-CZ", dec: ",", sep: " ", symPos: "post" },
    hu:   { group: "hu-HU", dec: ",", sep: " ", symPos: "post" },
    ro:   { group: "ro-RO", dec: ",", sep: ".", symPos: "post" },
    ar:   { group: "fr-FR", dec: ",", sep: " ", symPos: "post" },
    ja:   { group: "ja-JP", dec: ".", sep: ",", symPos: "pre"  },
    ko:   { group: "ko-KR", dec: ".", sep: ",", symPos: "pre"  },
    zh:   { group: "zh-CN", dec: ".", sep: ",", symPos: "pre"  },
    vi:   { group: "vi-VN", dec: ".", sep: ",", symPos: "post" },
    th:   { group: "th-TH", dec: ".", sep: ",", symPos: "post" },
    id:   { group: "id-ID", dec: ",", sep: ".", symPos: "pre"  },
    tl:   { group: "en-PH", dec: ".", sep: ",", symPos: "pre"  },
    hi:   { group: "en-IN", dec: ".", sep: ",", symPos: "pre"  }
};

// taxIdLabel : libellé de l'identifiant fiscal ; vatRates : taux indicatifs (%)
// exemptNote : mention d'exonération imprimée sur la facture
const COUNTRIES = [
    // ---- EUROPE ----
    { code: "FR", name: "France", region: "europe", currency: "EUR", locale: "fr", eu: true,
      taxIdLabel: "SIRET (14 chiffres)", taxIdPlaceholder: "123 456 789 00012", altIdLabel: "Code APE",
      vatRates: [0, 2.1, 5.5, 10, 20],
      exemptNote: "Franchise en base de TVA - TVA non applicable, art. 293 B du CGI.",
      lateNote: "En cas de retard de paiement, une pénalité égale à 3 fois le taux d'intérêt légal sera appliquée. Indemnité forfaitaire pour frais de recouvrement : 40 €." },
    { code: "BE", name: "Belgique", region: "europe", currency: "EUR", locale: "fr", eu: true,
      taxIdLabel: "Numéro BCE / TVA", taxIdPlaceholder: "BE 0123 456 789", altIdLabel: "",
      vatRates: [0, 6, 12, 21],
      exemptNote: "Exonération TVA - régime petite entreprise (art. 44 §3 Code TVA).",
      lateNote: "En cas de retard de paiement : intérêts au taux légal + indemnité forfaitaire de 40 €." },
    { code: "DE", name: "Deutschland", region: "europe", currency: "EUR", locale: "de", eu: true,
      taxIdLabel: "Steuernummer / USt-IdNr.", taxIdPlaceholder: "DE123456789", altIdLabel: "",
      vatRates: [0, 7, 19],
      exemptNote: "Umsatzsteuerbefreit nach § 19 UStG (Kleinunternehmerregelung).",
      lateNote: "Bei Zahlungsverzug fallen Mahngebühren und Verzugszinsen gemäß § 288 BGB an." },
    { code: "ES", name: "España", region: "europe", currency: "EUR", locale: "es", eu: true,
      taxIdLabel: "NIF / CIF", taxIdPlaceholder: "B12345678", altIdLabel: "",
      vatRates: [0, 4, 10, 21],
      exemptNote: "Operación exenta de IVA - artículo 293.1 Ley 37/1992 (régimen simplificado).",
      lateNote: "En caso de mora: intereses según la Ley 3/2004 + indemnización de 40 €." },
    { code: "IT", name: "Italia", region: "europe", currency: "EUR", locale: "it", eu: true,
      taxIdLabel: "Partita IVA", taxIdPlaceholder: "IT12345678901", altIdLabel: "Codice Fiscale",
      vatRates: [0, 4, 5, 10, 22],
      exemptNote: "Operazione esente IVA - regime forfettario (L. 190/2014, art. 1 c. 58).",
      lateNote: "In caso di ritardo: interessi legali (D.Lgs. 231/2002) + rimborso forfettario 40 €." },
    { code: "PT", name: "Portugal", region: "europe", currency: "EUR", locale: "pt", eu: true,
      taxIdLabel: "NIF", taxIdPlaceholder: "123 456 789", altIdLabel: "",
      vatRates: [0, 6, 13, 23],
      exemptNote: "Isento de IVA nos termos do artigo 53.º do CIVA (pequenos detalhes).",
      lateNote: "Em caso de mora: juros legais (C.Civ.) + indemnização de 40 €." },
    { code: "NL", name: "Nederland", region: "europe", currency: "EUR", locale: "nl", eu: true,
      taxIdLabel: "BTW-nummer", taxIdPlaceholder: "NL000099998B01", altIdLabel: "KVK-nummer",
      vatRates: [0, 9, 21],
      exemptNote: "Btw-vrijstelling kleine ondernemersvoortsetting art. 11 Wet OB.",
      lateNote: "Bij betalingsachterstand: wettelijke rente + € 40 incassokosten (WIK)." },
    { code: "LU", name: "Luxembourg", region: "europe", currency: "EUR", locale: "fr", eu: true,
      taxIdLabel: "Numéro TVA / RCS", taxIdPlaceholder: "LU12345678", altIdLabel: "",
      vatRates: [0, 3, 8, 14, 17],
      exemptNote: "Franchise de TVA - petit opérateur (art. 44 LIVA).",
      lateNote: "En cas de retard : intérêts légaux + indemnité de 40 €." },
    { code: "IE", name: "Ireland", region: "europe", currency: "EUR", locale: "en", eu: true,
      taxIdLabel: "VAT Number / CRO", taxIdPlaceholder: "IE1234567FA", altIdLabel: "",
      vatRates: [0, 9, 13.5, 23],
      exemptNote: "VAT exempt - small goods/services exemption (s.34(1) TCA 1997).",
      lateNote: "Late payment: statutory interest under the Prompt Payments Act 2002 + €40 compensation." },
    { code: "GB", name: "United Kingdom", region: "europe", currency: "GBP", locale: "en", eu: false,
      taxIdLabel: "UTR / VAT No.", taxIdPlaceholder: "1234 567 890 / GB123456789", altIdLabel: "Company No. (Companies House)",
      vatRates: [0, 5, 20],
      exemptNote: "No VAT charged — not registered under the VAT small business threshold (§94 VATA 1994).",
      lateNote: "Interest and costs recoverable under the Late Payment of Commercial Debts (Interest) Act 1998 (£100 fixed cost)." },
    { code: "CH", name: "Schweiz / Suisse", region: "europe", currency: "CHF", locale: "fr", eu: false,
      taxIdLabel: "IDE / MWST-Nr.", taxIdPlaceholder: "CHE-123.456.789", altIdLabel: "",
      vatRates: [0, 2.6, 3.8, 8.1],
      exemptNote: "Von der MwSt befreit — Leistungserbringer mit Umsatz unter CHF 100'000 (Art. 10 Abs. 2 MWSTG).",
      lateNote: "Bei Zahlungsverzug: Verzugszins 5% (OR Art. 104)." },
    { code: "SE", name: "Sverige", region: "europe", currency: "SEK", locale: "sv", eu: true,
      taxIdLabel: "Organisationsnummer", taxIdPlaceholder: "556677-8899", altIdLabel: "",
      vatRates: [0, 6, 12, 25],
      exemptNote: "Momsfri — omsättning under 100 000 kr (skatteverket.se).",
      lateNote: "Dröjsmålsränta enligt räntelagen (rubrikränta) + 40 kr ersättning." },
    { code: "NO", name: "Norge", region: "europe", currency: "NOK", locale: "no", eu: false,
      taxIdLabel: "Org.nr.", taxIdPlaceholder: "123 456 789", altIdLabel: "",
      vatRates: [0, 15, 25],
      exemptNote: "MVA-fritatt — omsetning under 50 000 kr (mvaloven § 3-1).",
      lateNote: "Forsinkelsesrenter etter forsinkelsesrenteloven." },
    { code: "DK", name: "Danmark", region: "europe", currency: "DKK", locale: "da", eu: true,
      taxIdLabel: "CVR-nr.", taxIdPlaceholder: "12345678", altIdLabel: "",
      vatRates: [0, 25],
      exemptNote: "Momsfrihedsordningen for små virksomheder (omsætning < DKK 500.000).",
      lateNote: "Renter og godtgørelse efter renteloven (§ 10: DKK 310)." },
    { code: "PL", name: "Polska", region: "europe", currency: "PLN", locale: "pl", eu: true,
      taxIdLabel: "NIP", taxIdPlaceholder: "123-456-78-90", altIdLabel: "REGON",
      vatRates: [0, 5, 8, 23],
      exemptNote: "Zwolnienie z VAT — limit 200 000 zł (art. 113 ust. 1 ustawy o VAT).",
      lateNote: "Odsetki ustawowe za opóźnienie + rekompensata 40 EUR (ustawa o przeciwdziałaniu zatorom)." },
    { code: "CZ", name: "Česká republika", region: "europe", currency: "CZK", locale: "cs", eu: true,
      taxIdLabel: "IČO", taxIdPlaceholder: "12345678", altIdLabel: "DIČ (VAT)",
      vatRates: [0, 10, 15, 21],
      exemptNote: "Neplátce DPH — obrat pod 2 mil. Kč (zákon č. 235/2004 Sb., § 76).",
      lateNote: "Úrok z prodlení podle občanského zákoníku + nákladná paušální částka 1200 Kč / 3000 Kč." },
    { code: "HU", name: "Magyarország", region: "europe", currency: "HUF", locale: "hu", eu: true,
      taxIdLabel: "Adószám", taxIdPlaceholder: "12345678-2-42", altIdLabel: "",
      vatRates: [0, 5, 18, 27],
      exemptNote: "Áfa-mentes kisadózó (alanyi adómentesség, áfa tv. 39. § — bevétel < 12 millió Ft).",
      lateNote: "Késedelmi kamat (Ptk.) + behajtási díj 40 EUR." },
    { code: "RO", name: "România", region: "europe", currency: "RON", locale: "ro", eu: true,
      taxIdLabel: "CUI", taxIdPlaceholder: "R12345678", altIdLabel: "",
      vatRates: [0, 9, 21],
      exemptNote: "Scutit de TVA — plafon 300.000 lei (art. 316 Cod fiscal).",
      lateNote: "Dobânzi de întârziere conform OUG 13/2012 + despăgubire 40 EUR." },

    // ---- AFRIQUE FRANCOPHONE ----
    { code: "SN", name: "Sénégal", region: "afrique", currency: "XOF", locale: "fr", eu: false,
      taxIdLabel: "NINEA / Identifiant contribuable", taxIdPlaceholder: "1234567DJ00", altIdLabel: " RCCM",
      vatRates: [0, 18],
      exemptNote: "Franchise en base de TVA — article 254 du CGI sénégalais (chiffre d'affaires ≤ 25 000 000 FCFA).",
      lateNote: "Pénalités et intérêts de retard selon le Code des obligations civiles et commerciales sénégalais." },
    { code: "CI", name: "Côte d'Ivoire", region: "afrique", currency: "XOF", locale: "fr", eu: false,
      taxIdLabel: "NCC / Identifiant CEPCI", taxIdPlaceholder: "CI-ABJ-2026-B-12345", altIdLabel: "Numéro CEPICI",
      vatRates: [0, 18],
      exemptNote: "Franchise en base de TVA — article 197 du CGI ivoirien (CA ≤ 10 000 000 FCFA).",
      lateNote: "Intérêts de retard conformément au Code de commerce OHADA (Acte uniforme contrats vente)." },
    { code: "BF", name: "Burkina Faso", region: "afrique", currency: "XOF", locale: "fr", eu: false,
      taxIdLabel: "IFU (Identifiant Financier Unique)", taxIdPlaceholder: "00012345F", altIdLabel: " RCCA",
      vatRates: [0, 18, 30],
      exemptNote: "Franchise de TVA — article 216 du CGI burkinabè (certaines prestations ≤ seuil légal).",
      lateNote: "Pénalités de retard prévues par la réglementation OHADA en vigueur." },
    { code: "ML", name: "Mali", region: "afrique", currency: "XOF", locale: "fr", eu: false,
      taxIdLabel: "IDENTIFIANT (numéro contribuable DGSI)", taxIdPlaceholder: "N° Contribuable / Stat", altIdLabel: "Numéro Stat",
      vatRates: [0, 18, 30],
      exemptNote: "Exonération TVA — franchise en base (art. 3bis CGI malien).",
      lateNote: "Retard de paiement : intérêts moratoires au taux légal en vigueur." },
    { code: "NE", name: "Niger", region: "afrique", currency: "XOF", locale: "fr", eu: false,
      taxIdLabel: "N° Patente (Contribution)", taxIdPlaceholder: "N° Patente / Carte contribuable", altIdLabel: "RCCM",
      vatRates: [0, 18, 30],
      exemptNote: "Franchise en base de TVA (CGI nigérien — seuil exonération).",
      lateNote: "Intérêts de retard selon la réglementation OHADA." },
    { code: "TG", name: "Togo", region: "afrique", currency: "XOF", locale: "fr", eu: false,
      taxIdLabel: "N° Contribuable (OTR)", taxIdPlaceholder: "P012345X", altIdLabel: "RCCM",
      vatRates: [0, 18],
      exemptNote: "Franchise en base de TVA — art. 208 CGI togolais.",
      lateNote: "Pénalités de retard prévues par le Code du commerce OHADA." },
    { code: "BJ", name: "Bénin", region: "afrique", currency: "XOF", locale: "fr", eu: false,
      taxIdLabel: "N° IFU (Identifiant Financier Unique)", taxIdPlaceholder: "13-2-1234567-N", altIdLabel: "RCCM",
      vatRates: [0, 18],
      exemptNote: "Franchise en base de TVA — art. 250 CGI béninois (micro-entreprises).",
      lateNote: "Intérêts moratoires en cas de retard de paiement (OHADA)." },
    { code: "CM", name: "Cameroun", region: "afrique", currency: "XAF", locale: "fr", eu: false,
      taxIdLabel: "N° Contribuable (carte contribuable)", taxIdPlaceholder: "M012345X", altIdLabel: "RC",
      vatRates: [0, 19.25, 30],
      exemptNote: "Franchise en base de TVA — art. 70 CGI camerounais (CA ≤ 10 000 000 FCFA).",
      lateNote: "Sanctions pécuniaires et intérêts de retard (OHADA)." },
    { code: "GA", name: "Gabon", region: "afrique", currency: "XAF", locale: "fr", eu: false,
      taxIdLabel: "N° Contribuable (DGCI)", taxIdPlaceholder: "06212345X", altIdLabel: "RCCM",
      vatRates: [0, 18.75],
      exemptNote: "Franchise en base de TVA — seuil d'exonération CGI gabonais.",
      lateNote: "Intérêts moratoires prévus par l'Acte uniforme OHADA." },
    { code: "CD", name: "RD Congo", region: "afrique", currency: "USD", locale: "fr", eu: false,
      taxIdLabel: "N° Identification Fiscale (ID.FISC.)", taxIdPlaceholder: "123-456-789 / CD", altIdLabel: "RCCM",
      vatRates: [0, 16],
      exemptNote: "Franchise de TVA — art. 203 du CGI congolais (petits contribuables).",
      lateNote: "Intérêts de retard conformément au droit commercial congolais (OHADA-like)." },
    { code: "CG", name: "Congo (Brazzaville)", region: "afrique", currency: "XAF", locale: "fr", eu: false,
      taxIdLabel: "N° Contribuable (SGD-I)", taxIdPlaceholder: "N° Carte contribuable", altIdLabel: "RCCM",
      vatRates: [0, 18],
      exemptNote: "Franchise en base de TVA — seuil d'exonération CGI congolais.",
      lateNote: "Intérêts moratoires (OHADA — Acte uniforme)." },
    { code: "CF", name: "Centrafrique", region: "afrique", currency: "XAF", locale: "fr", eu: false,
      taxIdLabel: "N° Contribuable (DGI)", taxIdPlaceholder: "N° Patente", altIdLabel: "RCCM",
      vatRates: [0, 18],
      exemptNote: "Franchise de TVA (CGI centrafricain).",
      lateNote: "Intérêts de retard (OHADA)." },
    { code: "TD", name: "Tchad", region: "afrique", currency: "XAF", locale: "fr", eu: false,
      taxIdLabel: "N° Contribuable (Impôts)", taxIdPlaceholder: "N° Carte contribuable", altIdLabel: "RCCM",
      vatRates: [0, 18],
      exemptNote: "Franchise en base de TVA — CGI tchadien.",
      lateNote: "Pénalités et intérêts de retard (OHADA)." },
    { code: "MA", name: "Maroc", region: "afrique", currency: "MAD", locale: "fr", eu: false,
      taxIdLabel: "ICE (Identifiant Commun de l'Entreprise)", taxIdPlaceholder: "001234567890", altIdLabel: "RC / IF",
      vatRates: [0, 7, 14, 20],
      exemptNote: "Exonération de TVA — article 91-I-4° du CGI marocain (auto-entrepreneur, CA ≤ 500 000 DH services).",
      lateNote: "Pénalités de retard : intérêts au taux contractuel ou légal (loi 69-12 Maroc)." },
    { code: "TN", name: "Tunisie", region: "afrique", currency: "TND", locale: "fr", eu: false,
      taxIdLabel: "Matricule Fiscal (MF)", taxIdPlaceholder: "1234567/M/000", altIdLabel: "RNE",
      vatRates: [0, 6, 12, 19],
      exemptNote: "Franchise en base de TVA — art. 294 du Code TVA tunisien (statut auto-entrepreneur).",
      lateNote: "Intérêts de retard au taux légal tunisien." },
    { code: "DZ", name: "Algérie", region: "afrique", currency: "DZD", locale: "fr", eu: false,
      taxIdLabel: "NIF (Numéro d'Identification Fiscale)", taxIdPlaceholder: "00021234567 1234", altIdLabel: "NIS / RC",
      vatRates: [0, 9, 19],
      exemptNote: "Exonération de TVA — régime de l'auto-entrepreneur (loi 22-23, seuil CA appliqué).",
      lateNote: "Pénalités de paiement différé (Code des impôts algérien art. 205)." },
    { code: "GN", name: "Guinée", region: "afrique", currency: "GNF", locale: "fr", eu: false,
      taxIdLabel: "NCC (Numéro Contribuable)", taxIdPlaceholder: "N° Contribuable DGI", altIdLabel: "RCCM",
      vatRates: [0, 18],
      exemptNote: "Franchise en base de TVA — CGI guinéen.",
      lateNote: "Intérêts de retard selon le code de commerce guinéen." },

    // ---- AMÉRIQUES ----
    { code: "CA", name: "Canada", region: "amerique", currency: "CAD", locale: "fr", eu: false,
      taxIdLabel: "N° entreprise (NE / BN)", taxIdPlaceholder: "12345 6789 RT0001", altIdLabel: "TVQ # (Québec)",
      vatRates: [0, 5, 10, 13, 15],
      exemptNote: "Non inscrit aux fins de la TPS/TVH — petit fournisseur (revenus ≤ 30 000 $, Loi sur la TPS, art. 148 / TVQ Québec : seuil 34 000 $).",
      lateNote: "Intérêts de retard au taux annuel convenu ou légal (Code civil du Québec / common law)." },
    { code: "US", name: "United States", region: "amerique", currency: "USD", locale: "en", eu: false,
      taxIdLabel: "EIN / SSN", taxIdPlaceholder: "12-3456789", altIdLabel: "State Sales Tax Permit",
      vatRates: [0],
      salesTaxNote: "Sales tax applies per state/local jurisdiction where taxable; seller may lack nexus.",
      exemptNote: "Seller has no sales-tax nexus in buyer's state — no sales tax collected.",
      lateNote: "Late payments accrue interest at the rate agreed or the applicable state usury/judgment rate (Buyer beware prompt pay acts vary by state)." },
    { code: "MX", name: "México", region: "amerique", currency: "MXN", locale: "es", eu: false,
      taxIdLabel: "RFC", taxIdPlaceholder: "XAXX010101000", altIdLabel: "",
      vatRates: [0, 8, 16],
      exemptNote: "Régimen Simplificado de Confianza / RESICO — sin traslado de IVA (art. 113-D LISR). Factura global posible.",
      lateNote: "Intereses por mora al 10% anual (CFF / Código Civil Federal)." },
    { code: "BR", name: "Brasil", region: "amerique", currency: "BRL", locale: "pt", eu: false,
      taxIdLabel: "CNPJ / CPF", taxIdPlaceholder: "12.345.678/0001-90", altIdLabel: "Inscrição Estadual",
      vatRates: [0, 17, 18],
      exemptNote: "Não contribuinte de ICMS/ISS — Simples Nacional / MEI (Lei Complementar 123/2006).",
      lateNote: "Mora: juros 1% a.m. + correção monetária (Código Civil art. 406)." },
    { code: "AR", name: "Argentina", region: "amerique", currency: "USD", locale: "es", eu: false,
      taxIdLabel: "CUIT", taxIdPlaceholder: "30-12345678-9", altIdLabel: "Ingresos Brutos",
      vatRates: [0, 10.5, 21, 27],
      exemptNote: "Responsable Monotributo — IVA no discriminado (RG ARCA monotributo).",
      lateNote: "Intereses resarcitorios según tasa pasiva BAER (Código Civil y Comercial art. 770)." },
    { code: "CO", name: "Colombia", region: "amerique", currency: "USD", locale: "es", eu: false,
      taxIdLabel: "NIT", taxIdPlaceholder: "123.456.789-0", altIdLabel: "",
      vatRates: [0, 5, 19],
      exemptNote: "Régimen Simple de Tributación / no responsable de IVA (Estatuto Tributario art. 481).",
      lateNote: "Intereses de mora comercial (C.Co. art. 884)." },

    // ---- ASIE DE L'EST & DU SUD-EST ----
    { code: "JP", name: "日本 (Japan)", region: "asie", currency: "JPY", locale: "ja", eu: false,
      taxIdLabel: "登録番号 (T+13 chiffres) / 事業者番号", taxIdPlaceholder: "T1234567890123", altIdLabel: "インボイス制度",
      vatRates: [0, 8, 10],
      exemptNote: "消費税免税事業者（基準期間の課税売上高1,000万円以下、消費税法第9条）／適格請求書発行事業者登録なし。",
      lateNote: "支払遅延：民法所定の遅延損害金（年3%〜変動、民事法定利率法）。" },
    { code: "KR", name: "대한민국 (Korea)", region: "asie", currency: "KRW", locale: "ko", eu: false,
      taxIdLabel: "사업자등록번호", taxIdPlaceholder: "123-45-67890", altIdLabel: "",
      vatRates: [0, 10],
      exemptNote: "부가가치세 면제 — 사업자 단위로 부가가치세법 제48조 간이과세 / 免税事業者.",
      lateNote: "지연이자: 상법 제63조 (연 6%) 또는 약정 이율." },
    { code: "CN", name: "中国 (China)", region: "asie", currency: "CNY", locale: "zh", eu: false,
      taxIdLabel: "统一社会信用代码", taxIdPlaceholder: "91 310000 XXXXXXXXX", altIdLabel: "纳税人识别号",
      vatRates: [0, 1, 3, 6, 9, 13],
      exemptNote: "小规模纳税人免征增值税（月销售额10万元以下，财政部税务总局公告）。发票：增值税普通发票。",
      lateNote: "逾期付款按全国银行间同业拆借中心公布的贷款市场报价利率(LPR)计息。" },
    { code: "TW", name: "臺灣 (Taiwan)", region: "asie", currency: "TWD", locale: "zh", eu: false,
      taxIdLabel: "統一編號", taxIdPlaceholder: "12345678", altIdLabel: "",
      vatRates: [0, 5],
      exemptNote: "小規模營業人免開具三聯式統一發票（營業稅法第43條之3）。",
      lateNote: "遲延利息依民法第203條（年利率5%）。" },
    { code: "HK", name: "Hong Kong", region: "asie", currency: "HKD", locale: "en", eu: false,
      taxIdLabel: "BR No. (Business Registration)", taxIdPlaceholder: "12345678-000", altIdLabel: "CR No.",
      vatRates: [0],
      salesTaxNote: "Hong Kong imposes no GST/VAT/sales tax.",
      exemptNote: "No GST/VAT — Hong Kong levies no value added or sales tax (IRD).",
      lateNote: "Late payment interest per contract or Judgments Ordinance (rate set by HK court, HK Judgments Ordinance rate applies)." },
    { code: "SG", name: "Singapore", region: "asie", currency: "SGD", locale: "en", eu: false,
      taxIdLabel: "UEN / GST No.", taxIdPlaceholder: "2026X1234N", altIdLabel: "",
      vatRates: [0, 9],
      exemptNote: "Not GST-registered — supplies below SGD 1 million annual threshold (GST Act s.23).",
      lateNote: "Late payment interest per contract; CPC / common law default if silent." },
    { code: "MY", name: "Malaysia", region: "asie", currency: "MYR", locale: "en", eu: false,
      taxIdLabel: "Co. No. (SSM) / SST No.", taxIdPlaceholder: "2026012345K", altIdLabel: "",
      vatRates: [0, 6, 8, 10],
      exemptNote: "SST registration not required — annual turnover below RM 500k service tax threshold.",
      lateNote: "Interest on debt per Contracts Act 1950 s.75 reasonable compensation." },
    { code: "TH", name: "ประเทศไทย (Thailand)", region: "asie", currency: "THB", locale: "th", eu: false,
      taxIdLabel: "เลขประจำตัวผู้เสียภาษี", taxIdPlaceholder: "0 1234 56789 123 4", altIdLabel: "",
      vatRates: [0, 7],
      exemptNote: "ผู้ประกอบการ จดทะเบียน VAT ไม่เข้าเงื่อนไข รายได้ไม่เกิน 1.8 ล้านบาท (ประมวลรัษฎากร มาตรา 85/3).",
      lateNote: "ดอกเบี้ยผิดนัด ร้อยละ 15 ต่อปี หรือตามที่ตกลง (ป.พ.พ. มาตรา 224)." },
    { code: "VN", name: "Việt Nam", region: "asie", currency: "VND", locale: "vi", eu: false,
      taxIdLabel: "Mã số thuế", taxIdPlaceholder: "0123456789", altIdLabel: "",
      vatRates: [0, 5, 8, 10],
      exemptNote: "Cá nhân/hộ kinh doanh không thuộc diện nộp thuế GTGT (doanh thu ≤ 200 triệu đồng/năm — Luật Thuế GTGT).",
      lateNote: "Lãi chậm trả theo Điều 357 BLDS 2015 (trần lãi suất theo NHNN)." },
    { code: "ID", name: "Indonesia", region: "asie", currency: "IDR", locale: "id", eu: false,
      taxIdLabel: "NPWP / NIB", taxIdPlaceholder: "12.345.678-9-123.000", altIdLabel: "",
      vatRates: [0, 11, 12],
      exemptNote: "PKP tidak wajib — UMKM omzet ≤ Rp 4,8 miliar (PP 55/2022); PPN dipungut final 0,5% bila PKP.",
      lateNote: "Bunga keterlambatan menurut KUHPerdata Pasal 1250 (max 6%/tahun) atau sesuai kontrak." },
    { code: "PH", name: "Pilipinas (Philippines)", region: "asie", currency: "PHP", locale: "tl", eu: false,
      taxIdLabel: "TIN", taxIdPlaceholder: "123-456-789-000", altIdLabel: "DTI/SEC Reg. No.",
      vatRates: [0, 12],
      exemptNote: "VAT-exempt — gross sales ≤ PHP 3 million (TRAIN Law / CREATE Act, Sec. 108).",
      lateNote: "Legal interest 6% p.a. per BSP Circular 799 + penalty as agreed." },
    { code: "IN", name: "भारत (India)", region: "asie", currency: "INR", locale: "hi", eu: false,
      taxIdLabel: "GSTIN", taxIdPlaceholder: "29ABCDE1234F1Z5", altIdLabel: "PAN / CIN",
      vatRates: [0, 3, 5, 12, 18, 28],
      exemptNote: "Composition/Threshold exempt — turnover below ₹20 lakh (₹10 lakh special states), CGST Act §22.",
      lateNote: "Interest u/s 217 IGST / as per Indian Contract Act §74; bank rate linked." },
    { code: "AU", name: "Australia", region: "asie", currency: "AUD", locale: "en", eu: false,
      taxIdLabel: "ABN", taxIdPlaceholder: "51 824 753 556", altIdLabel: "ACN",
      vatRates: [0, 10],
      exemptNote: "GST-free supplier — not registered for GST (turnover < A$75,000, GST Act s.195-1).",
      lateNote: "Interest per contract; otherwise court rate (Federal Court Rules)." },
    { code: "NZ", name: "New Zealand", region: "asie", currency: "NZD", locale: "en", eu: false,
      taxIdLabel: "NZBN", taxIdPlaceholder: "12-3456-7890-123", altIdLabel: "IRD Number",
      vatRates: [0, 15],
      exemptNote: "GST not charged — turnover below NZD 60,000 registration threshold (GST Act 2017 s.51).",
      lateNote: "Interest per contract or Judicature Modernisation Act rate." }
];

// --- Accès & helpers ---
// Les réglementations évoluent en permanence : les valeurs ci-dessus ne sont que des
// suggestions indicatives. L'utilisateur peut personnaliser (taux de TVA, mentions
// légales, identifiant fiscal...) dans Paramètres > Configuration pays personnalisée.
// Les overrides sont stockés dans state.settings.countryOverrides[code] et priment sur la base.
function getCountry(code) {
    const base = COUNTRIES.find(c => c.code === code) || COUNTRIES.find(c => c.code === "FR");
    const ov = (state.settings.countryOverrides || {})[base.code];
    if (!ov) return base;
    const merged = { ...base };
    ["vatRates", "taxIdLabel", "taxIdPlaceholder", "altIdLabel", "exemptNote", "lateNote"].forEach(k => {
        if (ov[k] !== undefined && ov[k] !== null && ov[k] !== "") merged[k] = ov[k];
    });
    merged.customized = true;
    return merged;
}

// Réinitialise la configuration d'un pays aux valeurs indicatives par défaut
function resetCountryConfig() {
    const code = document.getElementById('set-country').value;
    if (state.settings.countryOverrides) delete state.settings.countryOverrides[code];
    saveState();
    applyCountrySettings();
    renderCountryConfigForm();
    showToast(t("toast.countryConfigReset", { name: getCountry(code).name }));
}

// Remplit le formulaire de personnalisation avec les valeurs actuelles du pays sélectionné
function renderCountryConfigForm() {
    const code = document.getElementById('set-country')?.value || state.settings.country || 'FR';
    const country = getCountry(code);
    const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
    setVal('oc-vat-rates', country.vatRates.join(', '));
    setVal('oc-taxid-label', country.taxIdLabel);
    setVal('oc-taxid-placeholder', country.taxIdPlaceholder);
    setVal('oc-altid-label', country.altIdLabel || '');
    setVal('oc-exempt-note', country.exemptNote);
    setVal('oc-late-note', country.lateNote);
    const badge = document.getElementById('oc-custom-badge');
    if (badge) {
        badge.style.display = country.customized ? 'inline-flex' : 'none';
    }
}

// Enregistre les personnalisations du pays courant dans state.settings.countryOverrides
function saveCountryOverrides() {
    const code = document.getElementById('set-country').value;
    if (!state.settings.countryOverrides) state.settings.countryOverrides = {};
    const getVal = id => (document.getElementById(id)?.value || '').trim();
    // Taux TVA : liste de nombres séparés par virgules/espaces/points-virgules
    const rates = getVal('oc-vat-rates')
        .split(/[,,;\s]+/).map(s => parseFloat(s.replace(',', '.')))
        .filter(n => Number.isFinite(n) && n >= 0 && n < 100)
        .sort((a, b) => a - b);
    const ov = {
        vatRates: rates.length ? [...new Set(rates)] : undefined,
        taxIdLabel: getVal('oc-taxid-label') || undefined,
        taxIdPlaceholder: getVal('oc-taxid-placeholder') || undefined,
        altIdLabel: getVal('oc-altid-label'),
        exemptNote: getVal('oc-exempt-note') || undefined,
        lateNote: getVal('oc-late-note') || undefined
    };
    if (ov.altIdLabel === '') ov.altIdLabel = ''; // champ vide = colonne alternative masquée
    Object.keys(ov).forEach(k => { if (ov[k] === undefined) delete ov[k]; });
    state.settings.countryOverrides[code] = ov;
    saveState();
    applyCountrySettings();
    renderCountryConfigForm();
    showToast(t("toast.countryConfigSaved"));
}

function currentCountry() {
    return getCountry(state.settings.country || "FR");
}

function currentCurrency() {
    return CURRENCIES[state.settings.currency] || CURRENCIES[currentCountry().currency];
}

function currentLocaleCfg() {
    return LOCALES[state.settings.locale] || LOCALES.fr;
}

// Format monétaire international : 1 234,56 €, 1.234,56 CFA, $1,234.56, ¥12,345...
function fmtMoney(value) {
    const cur = currentCurrency();
    const loc = currentLocaleCfg();
    const v = (Number.isFinite(value) ? value : 0).toFixed(cur.decimals);
    const parts = v.split(".");
    const intDigits = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, loc.sep);
    const num = cur.decimals > 0 ? intDigits + loc.dec + parts[1] : intDigits;
    return loc.symPos === "pre" ? cur.symbol + num : num + " " + cur.symbol;
}

// Met à jour tous les champs dynamiques liés au pays/devise/locale
function applyCountrySettings() {
    const country = currentCountry();
    const cur = currentCurrency();

    // Libellés d'identifiants (ex: SIRET -> NINEA, EIN...)
    document.querySelectorAll('[data-i18n-taxid]').forEach(el => el.textContent = country.taxIdLabel);
    document.querySelectorAll('[data-i18n-altid]').forEach(el => {
        el.textContent = country.altIdLabel || "";
        el.closest('.form-group')?.style.setProperty('display', country.altIdLabel ? '' : 'none');
    });
    const siretInputs = document.querySelectorAll('[data-input="taxid"]');
    siretInputs.forEach(inp => inp.placeholder = country.taxIdPlaceholder);

    // Devise dans les labels statiques HTML
    document.querySelectorAll('[data-cur-label]').forEach(el => {
        el.textContent = `(${cur.symbol})`;
    });

    // Options de TVA suggérées dans les listes déroulantes produits/lignes
    document.querySelectorAll('[data-tva-suggest]').forEach(sel => {
        const currentVal = sel.value;
        sel.innerHTML = country.vatRates.map(r => `<option value="${r}">${r}%</option>`).join("");
        if ([...sel.options].some(o => o.value === currentVal)) sel.value = currentVal;
    });

    // Taux indicatif par défaut pour les nouvelles lignes (librement modifiable ensuite)
    const defaultTvaSel = document.getElementById('default-tva-rate');
    if (defaultTvaSel) {
        const curVal = defaultTvaSel.value;
        defaultTvaSel.innerHTML = country.vatRates.map(r => `<option value="${r}">${r}%</option>`).join("");
        if ([...defaultTvaSel.options].some(o => o.value === curVal)) defaultTvaSel.value = curVal;
    }

    // Mentions légales (exonération + retards)
    const exemptEl = document.getElementById('tva-legal-notice-display');
    if (exemptEl) exemptEl.textContent = country.exemptNote;

    updateBadges();
    applyTvaDisplaySettings();
    calculateInvoiceTotals();
    renderSellerSummary();
    refreshAllViews();
}

// Re-rendu des vues utilisant fmtMoney
function refreshAllViews() {
    if (document.getElementById('tab-historique')?.classList.contains('active')) renderHistoryTable();
    if (document.getElementById('tab-clients')?.classList.contains('active')) renderClientsGrid();
    if (document.getElementById('tab-produits')?.classList.contains('active')) renderProductsTable();
    populateProductDropdown();
}
