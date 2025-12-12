/**
 * Ferryhopper Port Codes Database - COMPLETE
 * All Greek ferry ports from official Ferryhopper list
 * 
 * Affiliate UID: grclds
 * Base URL: https://www.ferryhopper.com/en/?aff_uid=grclds
 */

// ============================================
// TYPES
// ============================================

export interface PortInfo {
    code: string;
    name: string;
    region: 'attica' | 'cyclades' | 'crete' | 'dodecanese' | 'northeastern' | 'saronic' | 'sporades' | 'ionian' | 'evia' | 'mainland' | 'peloponnese' | 'other';
    displayName: string;
    popular: boolean;
}

export interface FerryCompany {
    name: string;
    type: 'conventional' | 'high-speed' | 'both';
    logo: string;
}

// ============================================
// AFFILIATE CONFIG
// ============================================

export const FERRYHOPPER_CONFIG = {
    affiliateUID: 'grclds',
    baseUrl: 'https://www.ferryhopper.com',
    brandColor: '1E2E48', // Touristas AI brand color (without #)
    languages: ['en', 'el', 'de', 'fr', 'it', 'es', 'nl'],
};

// ============================================
// FERRY COMPANIES WITH LOGOS
// ============================================

export const FERRY_COMPANIES: FerryCompany[] = [
    { name: 'Blue Star Ferries', type: 'conventional', logo: '/images/ferry/companies/blue-star.webp' },
    { name: 'SeaJets', type: 'high-speed', logo: '/images/ferry/companies/seajets.png' },
    { name: 'Golden Star Ferries', type: 'high-speed', logo: '/images/ferry/companies/golden-star.webp' },
    { name: 'Hellenic Seaways', type: 'both', logo: '/images/ferry/companies/hellenic.svg' },
    { name: 'Fast Ferries', type: 'high-speed', logo: '/images/ferry/companies/fast-ferries.webp' },
    { name: 'ANEK Lines', type: 'conventional', logo: '/images/ferry/companies/anek-lines.webp' },
    { name: 'Aegean Sea Lines', type: 'conventional', logo: '/images/ferry/companies/aegean-sea-lines.webp' },
    { name: 'Zante Ferries', type: 'conventional', logo: '/images/ferry/companies/zante-ferries.png' },
];

// ============================================
// COMPLETE PORT CODES DATABASE
// ============================================

export const GREEK_PORTS: PortInfo[] = [
    // ATTICA / MAINLAND PORTS
    { code: 'PIR', name: 'PIRAEUS', region: 'attica', displayName: 'Piraeus', popular: true },
    { code: 'RAF', name: 'RAFINA', region: 'attica', displayName: 'Rafina', popular: true },
    { code: 'LAV', name: 'LAVRIO', region: 'attica', displayName: 'Lavrio', popular: true },
    { code: 'AMN', name: 'AG.MARINA (ATTIKI)', region: 'attica', displayName: 'Ag. Marina (Attiki)', popular: false },
    { code: 'ATH', name: 'ATHENS (ALL PORTS)', region: 'attica', displayName: 'Athens (All Ports)', popular: true },
    { code: '1EV', name: 'ATHENS AIRPORT', region: 'attica', displayName: 'Athens Airport', popular: false },

    // CYCLADES - MAJOR ISLANDS
    { code: 'JTR', name: 'THIRA (SANTORINI)', region: 'cyclades', displayName: 'Santorini', popular: true },
    { code: 'JMK', name: 'MYKONOS', region: 'cyclades', displayName: 'Mykonos', popular: true },
    { code: 'PAS', name: 'PAROS', region: 'cyclades', displayName: 'Paros', popular: true },
    { code: 'JNX', name: 'NAXOS', region: 'cyclades', displayName: 'Naxos', popular: true },
    { code: 'IOS', name: 'IOS', region: 'cyclades', displayName: 'Ios', popular: true },
    { code: 'MLO', name: 'MILOS', region: 'cyclades', displayName: 'Milos', popular: true },
    { code: 'SIF', name: 'SIFNOS', region: 'cyclades', displayName: 'Sifnos', popular: true },
    { code: 'JSY', name: 'SYROS', region: 'cyclades', displayName: 'Syros', popular: true },
    { code: 'TIN', name: 'TINOS', region: 'cyclades', displayName: 'Tinos', popular: true },
    { code: 'AND', name: 'ANDROS', region: 'cyclades', displayName: 'Andros', popular: true },

    // CYCLADES - SMALLER ISLANDS
    { code: 'ANA', name: 'ANAFI', region: 'cyclades', displayName: 'Anafi', popular: false },
    { code: 'ANP', name: 'ANTIPAROS', region: 'cyclades', displayName: 'Antiparos', popular: false },
    { code: 'DEL', name: 'DELOS', region: 'cyclades', displayName: 'Delos', popular: false },
    { code: 'DON', name: 'DONOUSSA', region: 'cyclades', displayName: 'Donoussa', popular: false },
    { code: 'FOL', name: 'FOLEGANDROS', region: 'cyclades', displayName: 'Folegandros', popular: true },
    { code: 'IRK', name: 'IRAKLIA', region: 'cyclades', displayName: 'Iraklia', popular: false },
    { code: 'KEA', name: 'KEA', region: 'cyclades', displayName: 'Kea', popular: false },
    { code: 'KMS', name: 'KIMOLOS', region: 'cyclades', displayName: 'Kimolos', popular: false },
    { code: 'KOU', name: 'KOUFONISSI', region: 'cyclades', displayName: 'Koufonisia', popular: true },
    { code: 'KYT', name: 'KYTHNOS', region: 'cyclades', displayName: 'Kythnos', popular: false },
    { code: 'SER', name: 'SERIFOS', region: 'cyclades', displayName: 'Serifos', popular: true },
    { code: 'SIK', name: 'SIKINOS', region: 'cyclades', displayName: 'Sikinos', popular: false },
    { code: 'SXI', name: 'SCHINOUSSA', region: 'cyclades', displayName: 'Schinoussa', popular: false },
    { code: 'TRS', name: 'THIRASSIA', region: 'cyclades', displayName: 'Thirassia', popular: false },
    { code: 'AIG', name: 'AEGIALI', region: 'cyclades', displayName: 'Aegiali (Amorgos)', popular: false },
    { code: 'AMO', name: 'KATAPOLA', region: 'cyclades', displayName: 'Katapola (Amorgos)', popular: true },
    { code: 'AMR', name: 'AMORGOS (ALL PORTS)', region: 'cyclades', displayName: 'Amorgos (All)', popular: false },
    { code: '1PO', name: 'POUNTA', region: 'cyclades', displayName: 'Pounta (Paros)', popular: false },
    { code: 'OIA', name: 'OIA', region: 'cyclades', displayName: 'Oia', popular: false },

    // CRETE
    { code: 'HER', name: 'HERAKLIO', region: 'crete', displayName: 'Heraklion', popular: true },
    { code: 'CHA', name: 'CHANIA', region: 'crete', displayName: 'Chania', popular: true },
    { code: 'RNO', name: 'RETHIMNO', region: 'crete', displayName: 'Rethymno', popular: true },
    { code: 'AGN', name: 'AG. NIKOLAOS', region: 'crete', displayName: 'Agios Nikolaos', popular: false },
    { code: 'JSH', name: 'SITIA', region: 'crete', displayName: 'Sitia', popular: false },
    { code: 'KIS', name: 'KISSAMOS', region: 'crete', displayName: 'Kissamos', popular: false },
    { code: 'CSF', name: 'SFAKIA', region: 'crete', displayName: 'Sfakia', popular: false },
    { code: 'PSF', name: 'PALEOHORA', region: 'crete', displayName: 'Paleochora', popular: false },
    { code: 'GVD', name: 'GAVDOS', region: 'crete', displayName: 'Gavdos', popular: false },
    { code: 'GVP', name: 'GAVDOPOULA', region: 'crete', displayName: 'Gavdopoula', popular: false },
    { code: 'LTR', name: 'LOUTRO CHANION', region: 'crete', displayName: 'Loutro', popular: false },
    { code: 'NEA', name: 'NEAPOLIS', region: 'crete', displayName: 'Neapolis', popular: false },
    { code: 'ROU', name: 'AG. ROUMELI', region: 'crete', displayName: 'Agia Roumeli', popular: false },
    { code: 'SOG', name: 'SOUGIA', region: 'crete', displayName: 'Sougia', popular: false },
    { code: 'C00', name: 'CRETE', region: 'crete', displayName: 'Crete (All Ports)', popular: false },

    // DODECANESE
    { code: 'RHO', name: 'RODOS', region: 'dodecanese', displayName: 'Rhodes', popular: true },
    { code: 'KGS', name: 'KOS', region: 'dodecanese', displayName: 'Kos', popular: true },
    { code: 'KAL', name: 'KALYMNOS', region: 'dodecanese', displayName: 'Kalymnos', popular: false },
    { code: 'LER', name: 'LEROS', region: 'dodecanese', displayName: 'Leros', popular: false },
    { code: 'PMS', name: 'PATMOS', region: 'dodecanese', displayName: 'Patmos', popular: true },
    { code: 'LIP', name: 'LIPSI', region: 'dodecanese', displayName: 'Lipsi', popular: false },
    { code: 'SYM', name: 'SYMI', region: 'dodecanese', displayName: 'Symi', popular: true },
    { code: 'THL', name: 'TILOS', region: 'dodecanese', displayName: 'Tilos', popular: false },
    { code: 'NIS', name: 'NISYROS', region: 'dodecanese', displayName: 'Nisyros', popular: false },
    { code: 'JTY', name: 'ASTYPALEA', region: 'dodecanese', displayName: 'Astypalea', popular: false },
    { code: 'AOK', name: 'KARPATHOS', region: 'dodecanese', displayName: 'Karpathos', popular: false },
    { code: 'CHL', name: 'CHALKI', region: 'dodecanese', displayName: 'Chalki', popular: false },
    { code: 'KSJ', name: 'KASOS', region: 'dodecanese', displayName: 'Kasos', popular: false },
    { code: 'KAZ', name: 'KASTELLORIZO', region: 'dodecanese', displayName: 'Kastellorizo', popular: false },
    { code: 'AGA', name: 'AGATHONISI', region: 'dodecanese', displayName: 'Agathonisi', popular: false },
    { code: 'AGM', name: 'AG.MARINA (LEROS)', region: 'dodecanese', displayName: 'Ag. Marina (Leros)', popular: false },
    { code: 'ARK', name: 'ARKI', region: 'dodecanese', displayName: 'Arki', popular: false },
    { code: 'DFN', name: 'DIAFANI', region: 'dodecanese', displayName: 'Diafani', popular: false },
    { code: 'FAR', name: 'FARMAKONISI', region: 'dodecanese', displayName: 'Farmakonisi', popular: false },
    { code: 'KRM', name: 'KARDAMENA', region: 'dodecanese', displayName: 'Kardamena', popular: false },
    { code: 'LXR', name: 'KSIROKAMPOS (LEROS)', region: 'dodecanese', displayName: 'Xirokampos (Leros)', popular: false },
    { code: 'MAS', name: 'MASTIHARI', region: 'dodecanese', displayName: 'Mastihari', popular: false },
    { code: 'MKL', name: 'MYRTIES(KALYMNOY)', region: 'dodecanese', displayName: 'Myrties (Kalymnos)', popular: false },
    { code: 'PAN', name: 'PANORMITIS', region: 'dodecanese', displayName: 'Panormitis', popular: false },
    { code: 'PSE', name: 'PSERIMOS', region: 'dodecanese', displayName: 'Pserimos', popular: false },
    { code: 'SKR', name: 'SKALA KAMIROU(RHO)', region: 'dodecanese', displayName: 'Skala Kamirou', popular: false },
    { code: 'KFG', name: 'KOS (KEFALOS)', region: 'dodecanese', displayName: 'Kefalos (Kos)', popular: false },
    { code: 'AO00', name: 'KARPATHOS (ALL PORTS)', region: 'dodecanese', displayName: 'Karpathos (All)', popular: false },
    { code: 'KA00', name: 'KALYMNOS (ALL PORTS)', region: 'dodecanese', displayName: 'Kalymnos (All)', popular: false },
    { code: 'KO00', name: 'KOS (ALL PORTS)', region: 'dodecanese', displayName: 'Kos (All)', popular: false },
    { code: 'LE00', name: 'LEROS (ALL PORTS)', region: 'dodecanese', displayName: 'Leros (All)', popular: false },
    { code: 'SY00', name: 'SYMI (ALL PORTS)', region: 'dodecanese', displayName: 'Symi (All)', popular: false },

    // SARONIC ISLANDS
    { code: 'AEG', name: 'AEGINA', region: 'saronic', displayName: 'Aegina', popular: true },
    { code: 'HYD', name: 'HYDRA', region: 'saronic', displayName: 'Hydra', popular: true },
    { code: 'SPE', name: 'SPETSES', region: 'saronic', displayName: 'Spetses', popular: true },
    { code: 'POR', name: 'POROS', region: 'saronic', displayName: 'Poros', popular: true },
    { code: 'AGS', name: 'AGISTRI', region: 'saronic', displayName: 'Agistri', popular: false },
    { code: 'MET', name: 'METHANA', region: 'saronic', displayName: 'Methana', popular: false },
    { code: 'ERM', name: 'HERMIONI', region: 'saronic', displayName: 'Ermioni', popular: false },
    { code: 'AAM', name: 'AG.MARINA (AEGINA)', region: 'saronic', displayName: 'Ag. Marina (Aegina)', popular: false },
    { code: 'AGG', name: 'AGISTRI-MYLI', region: 'saronic', displayName: 'Agistri Myli', popular: false },
    { code: 'PAO', name: 'PALOUKIA', region: 'saronic', displayName: 'Paloukia (Salamina)', popular: false },
    { code: 'SVA', name: 'SOUVALA', region: 'saronic', displayName: 'Souvala', popular: false },
    { code: 'AEG00', name: 'AEGINA (ALL PORTS)', region: 'saronic', displayName: 'Aegina (All)', popular: false },
    { code: 'AG00', name: 'AGISTRI (ALL PORTS)', region: 'saronic', displayName: 'Agistri (All)', popular: false },

    // NORTHEASTERN AEGEAN
    { code: 'LES', name: 'MITILINI (LESBOS)', region: 'northeastern', displayName: 'Lesbos (Mytilene)', popular: true },
    { code: 'CHI', name: 'CHIOS', region: 'northeastern', displayName: 'Chios', popular: true },
    { code: 'SMS', name: 'SAMOS', region: 'northeastern', displayName: 'Samos', popular: true },
    { code: 'LMN', name: 'LIMNOS', region: 'northeastern', displayName: 'Limnos', popular: false },
    { code: 'THA', name: 'THASSOS', region: 'northeastern', displayName: 'Thassos', popular: true },
    { code: 'SAM', name: 'SAMOTHRAKI', region: 'northeastern', displayName: 'Samothraki', popular: false },
    { code: 'IKA', name: 'IKARIA', region: 'northeastern', displayName: 'Ikaria', popular: true },
    { code: 'FOU', name: 'FOURNI', region: 'northeastern', displayName: 'Fourni', popular: false },
    { code: 'AES', name: 'AG. EFSTRATIOS', region: 'northeastern', displayName: 'Ag. Efstratios', popular: false },
    { code: 'AGK', name: 'AG. KIRIKOS', region: 'northeastern', displayName: 'Ag. Kirikos (Ikaria)', popular: false },
    { code: 'BTH', name: 'VATHI (SAMOS)', region: 'northeastern', displayName: 'Vathi (Samos)', popular: false },
    { code: 'CHR', name: 'CHRISOMILEA (FOURNOI)', region: 'northeastern', displayName: 'Chrisomilia (Fourni)', popular: false },
    { code: 'EYD', name: 'EVDILOS', region: 'northeastern', displayName: 'Evdilos (Ikaria)', popular: false },
    { code: 'INO', name: 'OINOUSSES', region: 'northeastern', displayName: 'Oinousses', popular: false },
    { code: 'KAR', name: 'KARLOVASSI', region: 'northeastern', displayName: 'Karlovassi', popular: false },
    { code: 'MHI', name: 'MESTA (CHIOS)', region: 'northeastern', displayName: 'Mesta (Chios)', popular: false },
    { code: 'PHA', name: 'PSARA', region: 'northeastern', displayName: 'Psara', popular: false },
    { code: 'PYT', name: 'PYTHAGORIO', region: 'northeastern', displayName: 'Pythagorio', popular: false },
    { code: 'SIG', name: 'SIGRI', region: 'northeastern', displayName: 'Sigri', popular: false },
    { code: 'THY', name: 'THIMAINA (FOURNOI)', region: 'northeastern', displayName: 'Thymaina (Fourni)', popular: false },
    { code: 'CH00', name: 'CHIOS (ALL PORTS)', region: 'northeastern', displayName: 'Chios (All)', popular: false },
    { code: 'FOU00', name: 'FOURNI KORSEON (ALL PORTS)', region: 'northeastern', displayName: 'Fourni (All)', popular: false },
    { code: 'LES00', name: 'LESBOS (ALL PORTS)', region: 'northeastern', displayName: 'Lesbos (All)', popular: false },

    // SPORADES
    { code: 'JSI', name: 'SKIATHOS', region: 'sporades', displayName: 'Skiathos', popular: true },
    { code: 'SKO', name: 'SKOPELOS', region: 'sporades', displayName: 'Skopelos', popular: true },
    { code: 'ALO', name: 'ALONISSOS', region: 'sporades', displayName: 'Alonissos', popular: true },
    { code: 'SKU', name: 'SKYROS', region: 'sporades', displayName: 'Skyros', popular: false },
    { code: 'ANS', name: 'SKOPELOS (AGNONTAS)', region: 'sporades', displayName: 'Agnontas (Skopelos)', popular: false },
    { code: 'GLO', name: 'GLOSSA', region: 'sporades', displayName: 'Glossa', popular: false },
    { code: 'SK00', name: 'SKOPELOS (ALL PORTS)', region: 'sporades', displayName: 'Skopelos (All)', popular: false },

    // IONIAN ISLANDS
    { code: 'CFU', name: 'CORFU', region: 'ionian', displayName: 'Corfu', popular: true },
    { code: 'ZTH', name: 'ZAKYNTHOS', region: 'ionian', displayName: 'Zakynthos', popular: true },
    { code: 'KEF', name: 'KEFALONIA', region: 'ionian', displayName: 'Kefalonia', popular: true },
    { code: 'LEV', name: 'LEFKADA', region: 'ionian', displayName: 'Lefkada', popular: true },
    { code: 'PAX', name: 'PAXI', region: 'ionian', displayName: 'Paxos', popular: false },
    { code: 'ITH', name: 'ITHAKI', region: 'ionian', displayName: 'Ithaca', popular: false },
    { code: 'KTH', name: 'KYTHIRA', region: 'ionian', displayName: 'Kythira', popular: false },
    { code: 'AKT', name: 'ANTIKYTHIRA', region: 'ionian', displayName: 'Antikythira', popular: false },
    { code: 'ARM', name: 'ARGOSTOLI', region: 'ionian', displayName: 'Argostoli', popular: false },
    { code: 'DIA00', name: 'DIAPONTIA ISLANDS', region: 'ionian', displayName: 'Diapontia Islands', popular: false },
    { code: 'ERK', name: 'EREIKOUSSA', region: 'ionian', displayName: 'Ereikoussa', popular: false },
    { code: 'FRI', name: 'FRIKES (ITHACA)', region: 'ionian', displayName: 'Frikes (Ithaca)', popular: false },
    { code: 'FSK', name: 'FISKARDO (KEFALONIA)', region: 'ionian', displayName: 'Fiskardo', popular: false },
    { code: 'LFK', name: 'LEFKIMMI', region: 'ionian', displayName: 'Lefkimmi', popular: false },
    { code: 'LIX', name: 'LIXURI', region: 'ionian', displayName: 'Lixouri', popular: false },
    { code: 'MGN', name: 'MEGANISI', region: 'ionian', displayName: 'Meganisi', popular: false },
    { code: 'MTR', name: 'MATHRAKI', region: 'ionian', displayName: 'Mathraki', popular: false },
    { code: 'NID', name: 'NYDRI (LEFKADA)', region: 'ionian', displayName: 'Nydri', popular: false },
    { code: 'OTH', name: 'OTHONOI', region: 'ionian', displayName: 'Othonoi', popular: false },
    { code: 'PKE', name: 'POROS (KEFALONIA)', region: 'ionian', displayName: 'Poros (Kefalonia)', popular: false },
    { code: 'PSA', name: 'ITHAKI (PISAETOS)', region: 'ionian', displayName: 'Pisaetos (Ithaca)', popular: false },
    { code: 'SMI', name: 'SAMI', region: 'ionian', displayName: 'Sami', popular: false },
    { code: 'VAT', name: 'ITHAKI (VATHI)', region: 'ionian', displayName: 'Vathi (Ithaca)', popular: false },
    { code: 'VAS', name: 'VASSILIKI (LEFKADA)', region: 'ionian', displayName: 'Vassiliki', popular: false },
    { code: 'PSK', name: 'PESSADA (KEFALONIA)', region: 'ionian', displayName: 'Pessada', popular: false },
    { code: 'SHI', name: 'AG. NIKOLAOS (ZAKYNTHOS)', region: 'ionian', displayName: 'Ag. Nikolaos (Zakynthos)', popular: false },
    { code: 'CFU00', name: 'CORFU (ALL PORTS)', region: 'ionian', displayName: 'Corfu (All)', popular: false },
    { code: 'ITH00', name: 'ITHAKI (ALL PORTS)', region: 'ionian', displayName: 'Ithaca (All)', popular: false },
    { code: 'KE00', name: 'KEFALONIA (ALL PORTS)', region: 'ionian', displayName: 'Kefalonia (All)', popular: false },
    { code: 'LEF00', name: 'LEFKADA (ALL PORTS)', region: 'ionian', displayName: 'Lefkada (All)', popular: false },

    // EVIA
    { code: 'AED', name: 'AEDIPSOS', region: 'evia', displayName: 'Aidipsos', popular: false },
    { code: 'AKA', name: 'AGIOKAMPOS', region: 'evia', displayName: 'Agiokampos', popular: false },
    { code: 'KST', name: 'KARISTOS', region: 'evia', displayName: 'Karystos', popular: false },
    { code: 'KYM', name: 'KYMI', region: 'evia', displayName: 'Kymi', popular: false },
    { code: 'MRM', name: 'MARMARI', region: 'evia', displayName: 'Marmari', popular: false },
    { code: 'MTI', name: 'MANTOUDI', region: 'evia', displayName: 'Mantoudi', popular: false },
    { code: 'NST', name: 'NEA STIRA', region: 'evia', displayName: 'Nea Styra', popular: false },
    { code: 'EV00', name: 'EVIA (ALL PORTS)', region: 'evia', displayName: 'Evia (All)', popular: false },

    // MAINLAND PORTS
    { code: 'VOL', name: 'VOLOS', region: 'mainland', displayName: 'Volos', popular: true },
    { code: 'SKG', name: 'THESSALONIKI', region: 'mainland', displayName: 'Thessaloniki', popular: true },
    { code: 'KAV', name: 'KAVALA', region: 'mainland', displayName: 'Kavala', popular: false },
    { code: 'IGO', name: 'IGOUMENITSA', region: 'mainland', displayName: 'Igoumenitsa', popular: true },
    { code: 'GRA', name: 'PATRA', region: 'mainland', displayName: 'Patras', popular: true },
    { code: 'KIL', name: 'KILINI', region: 'mainland', displayName: 'Killini', popular: false },
    { code: 'AGC', name: 'AG. KONSTANTINOS', region: 'mainland', displayName: 'Ag. Konstantinos', popular: false },
    { code: 'AXL', name: 'ALEX/POLI', region: 'mainland', displayName: 'Alexandroupoli', popular: false },
    { code: 'TRI', name: 'AGIA KYRIAKH', region: 'mainland', displayName: 'Agia Kyriaki', popular: false },
    { code: 'AKR', name: 'ARKITSA', region: 'mainland', displayName: 'Arkitsa', popular: false },
    { code: 'GLY', name: 'GLYFA', region: 'mainland', displayName: 'Glyfa', popular: false },
    { code: 'AST', name: 'ASTAKOS', region: 'mainland', displayName: 'Astakos', popular: false },
    { code: 'PVK', name: 'PREVEZA', region: 'mainland', displayName: 'Preveza', popular: false },
    { code: 'GN00', name: 'NORTHERN GREECE (ALL PORTS)', region: 'mainland', displayName: 'N. Greece (All)', popular: false },
    { code: 'G00', name: 'GREECE (ALL PORTS)', region: 'mainland', displayName: 'Greece (All)', popular: false },

    // PELOPONNESE
    { code: 'GYT', name: 'GYTHIO', region: 'peloponnese', displayName: 'Gythio', popular: false },
    { code: 'PHE', name: 'PORTO HELI', region: 'peloponnese', displayName: 'Porto Heli', popular: false },
    { code: 'ELA', name: 'ELAFONISOS', region: 'peloponnese', displayName: 'Elafonisos', popular: false },
    { code: 'KLX', name: 'KALAMATA', region: 'peloponnese', displayName: 'Kalamata', popular: false },
    { code: 'MON', name: 'MONEMVASSIA', region: 'peloponnese', displayName: 'Monemvasia', popular: false },

    // HELIPORTS (for completeness)
    { code: 'HFOL', name: 'FOLEGANDROS HELIPORT', region: 'other', displayName: 'Folegandros Heliport', popular: false },
    { code: 'HSIF', name: 'SIFNOS HELIPORT', region: 'other', displayName: 'Sifnos Heliport', popular: false },
    { code: 'HJMK', name: 'MYKONOS HELIPORT', region: 'other', displayName: 'Mykonos Heliport', popular: false },
    { code: 'HANA', name: 'ANAFI HELIPORT', region: 'other', displayName: 'Anafi Heliport', popular: false },
    { code: 'HJTR', name: 'SANTORINI HELIPORT', region: 'other', displayName: 'Santorini Heliport', popular: false },
    { code: 'HIOS', name: 'IOS HELIPORT', region: 'other', displayName: 'Ios Heliport', popular: false },
    { code: 'HKEA', name: 'KEA HELIPORT', region: 'other', displayName: 'Kea Heliport', popular: false },
    { code: 'HMLO', name: 'MILOS HELIPORT', region: 'other', displayName: 'Milos Heliport', popular: false },
    { code: 'HJSY', name: 'SYROS HELIPORT', region: 'other', displayName: 'Syros Heliport', popular: false },
    { code: 'HANP', name: 'ANTIPAROS HELIPORT', region: 'other', displayName: 'Antiparos Heliport', popular: false },
    { code: 'HPMS', name: 'PATMOS HELIPORT', region: 'other', displayName: 'Patmos Heliport', popular: false },
    { code: 'HTIN', name: 'TINOS HELIPORT', region: 'other', displayName: 'Tinos Heliport', popular: false },

    // SPECIAL/FESTIVALS
    { code: 'STERNA', name: 'FESTIVAL STERNA', region: 'other', displayName: 'Sterna Festival', popular: false },
    { code: 'UPFEST', name: 'FESTIVAL UP', region: 'other', displayName: 'Up Festival', popular: false },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getPortByCode(code: string): PortInfo | undefined {
    return GREEK_PORTS.find(p => p.code === code);
}

export function getPortByName(name: string): PortInfo | undefined {
    const lower = name.toLowerCase();
    return GREEK_PORTS.find(p =>
        p.name.toLowerCase().includes(lower) ||
        p.displayName.toLowerCase().includes(lower) ||
        p.displayName.toLowerCase() === lower
    );
}

export function getPopularPorts(region?: PortInfo['region']): PortInfo[] {
    return GREEK_PORTS.filter(p => p.popular && (!region || p.region === region));
}

export function getPortsByRegion(region: PortInfo['region']): PortInfo[] {
    return GREEK_PORTS.filter(p => p.region === region);
}

export function getCycladesPorts(): PortInfo[] {
    return GREEK_PORTS.filter(p => p.region === 'cyclades');
}

export function getMainlandPorts(): PortInfo[] {
    return GREEK_PORTS.filter(p => p.region === 'attica' || p.region === 'mainland');
}

export function getAllPopularPorts(): PortInfo[] {
    return GREEK_PORTS.filter(p => p.popular);
}

// ============================================
// DEEPLINK GENERATORS (FIXED - CORRECT FORMAT)
// ============================================

/**
 * Generate basic affiliate link
 */
export function generateAffiliateLink(lang: string = 'en'): string {
    return `${FERRYHOPPER_CONFIG.baseUrl}/${lang}/?aff_uid=${FERRYHOPPER_CONFIG.affiliateUID}`;
}

/**
 * Generate ferry search deeplink with affiliate tracking
 * Format: https://www.ferryhopper.com/en/?aff_uid=grclds#/results?itinerary=PIR,JTR&dates=20251221&passengers=2&vehicles=0
 */
export function generateFerrySearchLink(params: {
    fromPort: string;
    toPort: string;
    date?: string;        // YYYYMMDD format
    passengers?: number;
    vehicles?: number;
    lang?: string;
}): string {
    const { fromPort, toPort, date, passengers = 2, vehicles = 0, lang = 'en' } = params;

    // Get port codes - use code directly if it looks like a code, otherwise search by name
    const fromCode = fromPort.length <= 4 && fromPort === fromPort.toUpperCase()
        ? fromPort
        : (getPortByName(fromPort)?.code || fromPort.toUpperCase());
    const toCode = toPort.length <= 4 && toPort === toPort.toUpperCase()
        ? toPort
        : (getPortByName(toPort)?.code || toPort.toUpperCase());

    // Build URL with affiliate UID FIRST, then hash with results
    let url = `${FERRYHOPPER_CONFIG.baseUrl}/${lang}/?aff_uid=${FERRYHOPPER_CONFIG.affiliateUID}`;
    url += `#/results?itinerary=${fromCode},${toCode}`;

    if (date) {
        url += `&dates=${date}`;
    }

    url += `&passengers=${passengers}&vehicles=${vehicles}`;

    return url;
}

/**
 * Generate search with preselected ports (homepage preselect)
 * Format: https://www.ferryhopper.com/en/?aff_uid=grclds&initial=PIR,JTR
 */
export function generatePreselectLink(params: {
    fromPort: string;
    toPort: string;
    dayOffset?: number;
    lang?: string;
}): string {
    const { fromPort, toPort, dayOffset, lang = 'en' } = params;

    const fromCode = getPortByName(fromPort)?.code || fromPort.toUpperCase();
    const toCode = getPortByName(toPort)?.code || toPort.toUpperCase();

    let url = `${FERRYHOPPER_CONFIG.baseUrl}/${lang}/?aff_uid=${FERRYHOPPER_CONFIG.affiliateUID}`;
    url += `&initial=${fromCode},${toCode}`;

    if (dayOffset !== undefined) {
        url += `&day=${dayOffset}`;
    }

    return url;
}

/**
 * Generate embed widget URL
 */
export function generateEmbedWidgetUrl(params: {
    fromPort?: string;
    toPort?: string;
    color?: string;
}): string {
    const { fromPort, toPort, color = FERRYHOPPER_CONFIG.brandColor } = params;

    let url = `${FERRYHOPPER_CONFIG.baseUrl}/en/embed/simple?aff_uid=${FERRYHOPPER_CONFIG.affiliateUID}&color=${color}`;

    if (fromPort) {
        const fromCode = getPortByName(fromPort)?.code || fromPort.toUpperCase();
        url += `&from=${fromCode}`;
    }

    if (toPort) {
        const toCode = getPortByName(toPort)?.code || toPort.toUpperCase();
        url += `&to=${toCode}`;
    }

    return url;
}

/**
 * Generate round trip link
 */
export function generateRoundTripLink(params: {
    fromPort: string;
    toPort: string;
    departDate: string;
    returnDate: string;
    passengers?: number;
    lang?: string;
}): string {
    const { fromPort, toPort, departDate, returnDate, passengers = 2, lang = 'en' } = params;

    const fromCode = getPortByName(fromPort)?.code || fromPort.toUpperCase();
    const toCode = getPortByName(toPort)?.code || toPort.toUpperCase();

    let url = `${FERRYHOPPER_CONFIG.baseUrl}/${lang}/?aff_uid=${FERRYHOPPER_CONFIG.affiliateUID}`;
    url += `#/results?itinerary=${fromCode},${toCode},${fromCode}`;
    url += `&dates=${departDate},${returnDate}`;
    url += `&passengers=${passengers}&vehicles=0`;

    return url;
}

/**
 * Generate island hopping link (multi-stop)
 */
export function generateIslandHoppingLink(params: {
    ports: string[];
    dates: string[];
    passengers?: number;
    lang?: string;
}): string {
    const { ports, dates, passengers = 2, lang = 'en' } = params;

    const portCodes = ports.map(p => getPortByName(p)?.code || p.toUpperCase());

    let url = `${FERRYHOPPER_CONFIG.baseUrl}/${lang}/?aff_uid=${FERRYHOPPER_CONFIG.affiliateUID}`;
    url += `#/results?itinerary=${portCodes.join(',')}`;
    url += `&dates=${dates.join(',')}`;
    url += `&passengers=${passengers}&vehicles=0`;

    return url;
}

// ============================================
// POPULAR ROUTES
// ============================================

export const POPULAR_CYCLADES_ROUTES = [
    { from: 'PIR', to: 'JMK', name: 'Piraeus → Mykonos', duration: '4h 45m' },
    { from: 'PIR', to: 'JTR', name: 'Piraeus → Santorini', duration: '5h 15m' },
    { from: 'PIR', to: 'PAS', name: 'Piraeus → Paros', duration: '3h 45m' },
    { from: 'PIR', to: 'JNX', name: 'Piraeus → Naxos', duration: '4h 00m' },
    { from: 'PIR', to: 'IOS', name: 'Piraeus → Ios', duration: '4h 30m' },
    { from: 'PIR', to: 'MLO', name: 'Piraeus → Milos', duration: '3h 30m' },
    { from: 'JMK', to: 'JTR', name: 'Mykonos → Santorini', duration: '2h 30m' },
    { from: 'JMK', to: 'PAS', name: 'Mykonos → Paros', duration: '45m' },
    { from: 'PAS', to: 'JNX', name: 'Paros → Naxos', duration: '30m' },
    { from: 'PAS', to: 'JTR', name: 'Paros → Santorini', duration: '2h 00m' },
    { from: 'JNX', to: 'JTR', name: 'Naxos → Santorini', duration: '1h 45m' },
    { from: 'RAF', to: 'AND', name: 'Rafina → Andros', duration: '2h 00m' },
    { from: 'RAF', to: 'TIN', name: 'Rafina → Tinos', duration: '3h 30m' },
    { from: 'RAF', to: 'JMK', name: 'Rafina → Mykonos', duration: '4h 30m' },
];

export default {
    FERRYHOPPER_CONFIG,
    FERRY_COMPANIES,
    GREEK_PORTS,
    getPortByCode,
    getPortByName,
    getPopularPorts,
    getPortsByRegion,
    getCycladesPorts,
    getMainlandPorts,
    getAllPopularPorts,
    generateAffiliateLink,
    generateFerrySearchLink,
    generatePreselectLink,
    generateEmbedWidgetUrl,
    generateRoundTripLink,
    generateIslandHoppingLink,
    POPULAR_CYCLADES_ROUTES,
};
