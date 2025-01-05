export interface Airport {
  iataCode: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
}

export const airports: Airport[] = [
  // Greece
  { iataCode: 'ATH', name: 'Athens International Airport', city: 'Athens', country: 'Greece', countryCode: 'GR' },
  { iataCode: 'SKG', name: 'Thessaloniki Airport', city: 'Thessaloniki', country: 'Greece', countryCode: 'GR' },
  { iataCode: 'HER', name: 'Heraklion International Airport', city: 'Heraklion', country: 'Greece', countryCode: 'GR' },
  { iataCode: 'RHO', name: 'Rhodes International Airport', city: 'Rhodes', country: 'Greece', countryCode: 'GR' },
  { iataCode: 'CHQ', name: 'Chania International Airport', city: 'Chania', country: 'Greece', countryCode: 'GR' },
  { iataCode: 'JTR', name: 'Santorini Airport', city: 'Santorini', country: 'Greece', countryCode: 'GR' },
  { iataCode: 'KGS', name: 'Kos Airport', city: 'Kos', country: 'Greece', countryCode: 'GR' },
  { iataCode: 'ZTH', name: 'Zakynthos Airport', city: 'Zakynthos', country: 'Greece', countryCode: 'GR' },
  { iataCode: 'CFU', name: 'Corfu Airport', city: 'Corfu', country: 'Greece', countryCode: 'GR' },
  { iataCode: 'MJT', name: 'Mytilene Airport', city: 'Mytilene', country: 'Greece', countryCode: 'GR' },
  { iataCode: 'JMK', name: 'Mykonos Airport', city: 'Mykonos', country: 'Greece', countryCode: 'GR' },
  { iataCode: 'PVK', name: 'Aktion Airport', city: 'Preveza', country: 'Greece', countryCode: 'GR' },
  { iataCode: 'SMI', name: 'Samos Airport', city: 'Samos', country: 'Greece', countryCode: 'GR' },
  { iataCode: 'JSI', name: 'Skiathos Airport', city: 'Skiathos', country: 'Greece', countryCode: 'GR' },
  { iataCode: 'EFL', name: 'Kefalonia Airport', city: 'Kefalonia', country: 'Greece', countryCode: 'GR' },

  // Turkey
  { iataCode: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey', countryCode: 'TR' },
  { iataCode: 'SAW', name: 'Istanbul Sabiha Gokcen Airport', city: 'Istanbul', country: 'Turkey', countryCode: 'TR' },
  { iataCode: 'AYT', name: 'Antalya Airport', city: 'Antalya', country: 'Turkey', countryCode: 'TR' },
  { iataCode: 'ADB', name: 'Izmir Adnan Menderes Airport', city: 'Izmir', country: 'Turkey', countryCode: 'TR' },
  { iataCode: 'ESB', name: 'Ankara Esenboga Airport', city: 'Ankara', country: 'Turkey', countryCode: 'TR' },

  // Italy
  { iataCode: 'FCO', name: 'Rome Fiumicino Airport', city: 'Rome', country: 'Italy', countryCode: 'IT' },
  { iataCode: 'MXP', name: 'Milan Malpensa Airport', city: 'Milan', country: 'Italy', countryCode: 'IT' },
  { iataCode: 'VCE', name: 'Venice Marco Polo Airport', city: 'Venice', country: 'Italy', countryCode: 'IT' },
  { iataCode: 'NAP', name: 'Naples International Airport', city: 'Naples', country: 'Italy', countryCode: 'IT' },
  { iataCode: 'CTA', name: 'Catania Airport', city: 'Catania', country: 'Italy', countryCode: 'IT' },

  // Cyprus
  { iataCode: 'LCA', name: 'Larnaca International Airport', city: 'Larnaca', country: 'Cyprus', countryCode: 'CY' },
  { iataCode: 'PFO', name: 'Paphos International Airport', city: 'Paphos', country: 'Cyprus', countryCode: 'CY' },

  // Bulgaria
  { iataCode: 'SOF', name: 'Sofia Airport', city: 'Sofia', country: 'Bulgaria', countryCode: 'BG' },
  { iataCode: 'BOJ', name: 'Burgas Airport', city: 'Burgas', country: 'Bulgaria', countryCode: 'BG' },
  { iataCode: 'VAR', name: 'Varna Airport', city: 'Varna', country: 'Bulgaria', countryCode: 'BG' }
];
