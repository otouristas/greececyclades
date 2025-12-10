/**
 * Cyclades Normalization Database
 * Maps islands ⇄ ports ⇄ lat/lon ⇄ IATA codes
 * Used by Touristas AI for consistent API calls
 */

export interface IslandData {
  name: string;
  slug: string;
  aliases: string[];
  port: PortData;
  airport?: AirportData;
  coordinates: { lat: number; lon: number };
  region: 'cyclades' | 'mainland' | 'crete';
}

export interface PortData {
  name: string;
  code: string;
  coordinates: { lat: number; lon: number };
  ferryTerminal?: string;
}

export interface AirportData {
  name: string;
  iata: string;
  coordinates: { lat: number; lon: number };
}

// Main normalization database
export const cycladesDB: IslandData[] = [
  // MAINLAND HUBS
  {
    name: 'Athens',
    slug: 'athens',
    aliases: ['athens', 'athina', 'ath', 'piraeus', 'peiraeus'],
    port: {
      name: 'Piraeus Port',
      code: 'PIR',
      coordinates: { lat: 37.9475, lon: 23.6412 },
      ferryTerminal: 'E8-E9 for Cyclades fast ferries, E1-E2 for Blue Star'
    },
    airport: {
      name: 'Athens International Airport',
      iata: 'ATH',
      coordinates: { lat: 37.9364, lon: 23.9445 }
    },
    coordinates: { lat: 37.9838, lon: 23.7275 },
    region: 'mainland'
  },
  {
    name: 'Rafina',
    slug: 'rafina',
    aliases: ['rafina', 'raf'],
    port: {
      name: 'Rafina Port',
      code: 'RAF',
      coordinates: { lat: 38.0227, lon: 24.0097 }
    },
    coordinates: { lat: 38.0227, lon: 24.0097 },
    region: 'mainland'
  },
  {
    name: 'Lavrio',
    slug: 'lavrio',
    aliases: ['lavrio', 'lavrion', 'lav'],
    port: {
      name: 'Lavrio Port',
      code: 'LAV',
      coordinates: { lat: 37.7131, lon: 24.0556 }
    },
    coordinates: { lat: 37.7131, lon: 24.0556 },
    region: 'mainland'
  },

  // MAJOR CYCLADES ISLANDS
  {
    name: 'Santorini',
    slug: 'santorini',
    aliases: ['santorini', 'thira', 'thera', 'fira', 'oia', 'jtr'],
    port: {
      name: 'Athinios Port',
      code: 'JTR_PORT',
      coordinates: { lat: 36.3856, lon: 25.4322 }
    },
    airport: {
      name: 'Santorini Airport',
      iata: 'JTR',
      coordinates: { lat: 36.3992, lon: 25.4793 }
    },
    coordinates: { lat: 36.3932, lon: 25.4615 },
    region: 'cyclades'
  },
  {
    name: 'Mykonos',
    slug: 'mykonos',
    aliases: ['mykonos', 'mikonos', 'jmk', 'mykonos town'],
    port: {
      name: 'Mykonos New Port',
      code: 'JMK_PORT',
      coordinates: { lat: 37.4467, lon: 25.3289 }
    },
    airport: {
      name: 'Mykonos Airport',
      iata: 'JMK',
      coordinates: { lat: 37.4351, lon: 25.3481 }
    },
    coordinates: { lat: 37.4467, lon: 25.3289 },
    region: 'cyclades'
  },
  {
    name: 'Naxos',
    slug: 'naxos',
    aliases: ['naxos', 'jnx', 'naxos town', 'chora naxos'],
    port: {
      name: 'Naxos Port',
      code: 'JNX_PORT',
      coordinates: { lat: 37.1066, lon: 25.3756 }
    },
    airport: {
      name: 'Naxos Airport',
      iata: 'JNX',
      coordinates: { lat: 37.0811, lon: 25.3681 }
    },
    coordinates: { lat: 37.1036, lon: 25.3756 },
    region: 'cyclades'
  },
  {
    name: 'Paros',
    slug: 'paros',
    aliases: ['paros', 'pas', 'parikia', 'naousa', 'naoussa'],
    port: {
      name: 'Parikia Port',
      code: 'PAS_PORT',
      coordinates: { lat: 37.0853, lon: 25.1483 }
    },
    airport: {
      name: 'Paros Airport',
      iata: 'PAS',
      coordinates: { lat: 37.0206, lon: 25.1278 }
    },
    coordinates: { lat: 37.0853, lon: 25.1483 },
    region: 'cyclades'
  },
  {
    name: 'Milos',
    slug: 'milos',
    aliases: ['milos', 'mlo', 'adamas', 'adamantas', 'plaka milos'],
    port: {
      name: 'Adamas Port',
      code: 'MLO_PORT',
      coordinates: { lat: 36.7256, lon: 24.4489 }
    },
    airport: {
      name: 'Milos Airport',
      iata: 'MLO',
      coordinates: { lat: 36.6969, lon: 24.4769 }
    },
    coordinates: { lat: 36.7489, lon: 24.4272 },
    region: 'cyclades'
  },
  {
    name: 'Ios',
    slug: 'ios',
    aliases: ['ios', 'chora ios'],
    port: {
      name: 'Ios Port',
      code: 'IOS_PORT',
      coordinates: { lat: 36.7233, lon: 25.2811 }
    },
    coordinates: { lat: 36.7233, lon: 25.2811 },
    region: 'cyclades'
  },
  {
    name: 'Syros',
    slug: 'syros',
    aliases: ['syros', 'hermoupolis', 'ermoupoli', 'ermoupolis'],
    port: {
      name: 'Ermoupoli Port',
      code: 'SYR_PORT',
      coordinates: { lat: 37.4436, lon: 24.9419 }
    },
    coordinates: { lat: 37.4436, lon: 24.9419 },
    region: 'cyclades'
  },
  {
    name: 'Tinos',
    slug: 'tinos',
    aliases: ['tinos'],
    port: {
      name: 'Tinos Port',
      code: 'TIN_PORT',
      coordinates: { lat: 37.5361, lon: 25.1633 }
    },
    coordinates: { lat: 37.5361, lon: 25.1633 },
    region: 'cyclades'
  },
  {
    name: 'Andros',
    slug: 'andros',
    aliases: ['andros', 'gavrio', 'batsi'],
    port: {
      name: 'Gavrio Port',
      code: 'AND_PORT',
      coordinates: { lat: 37.8833, lon: 24.7333 }
    },
    coordinates: { lat: 37.8500, lon: 24.9167 },
    region: 'cyclades'
  },

  // SMALLER CYCLADES
  {
    name: 'Sifnos',
    slug: 'sifnos',
    aliases: ['sifnos', 'kamares', 'apollonia sifnos'],
    port: {
      name: 'Kamares Port',
      code: 'SIF_PORT',
      coordinates: { lat: 36.9833, lon: 24.6667 }
    },
    coordinates: { lat: 36.9667, lon: 24.7000 },
    region: 'cyclades'
  },
  {
    name: 'Folegandros',
    slug: 'folegandros',
    aliases: ['folegandros', 'karavostasis'],
    port: {
      name: 'Karavostasis Port',
      code: 'FOL_PORT',
      coordinates: { lat: 36.6167, lon: 24.9333 }
    },
    coordinates: { lat: 36.6167, lon: 24.9333 },
    region: 'cyclades'
  },
  {
    name: 'Serifos',
    slug: 'serifos',
    aliases: ['serifos', 'livadi serifos'],
    port: {
      name: 'Livadi Port',
      code: 'SER_PORT',
      coordinates: { lat: 37.1500, lon: 24.5000 }
    },
    coordinates: { lat: 37.1500, lon: 24.5000 },
    region: 'cyclades'
  },
  {
    name: 'Amorgos',
    slug: 'amorgos',
    aliases: ['amorgos', 'katapola', 'aegiali', 'chora amorgos'],
    port: {
      name: 'Katapola Port',
      code: 'AMO_PORT',
      coordinates: { lat: 36.8333, lon: 25.8500 }
    },
    coordinates: { lat: 36.8333, lon: 25.8500 },
    region: 'cyclades'
  },
  {
    name: 'Koufonisia',
    slug: 'koufonisia',
    aliases: ['koufonisia', 'koufonisi', 'pano koufonisi', 'ano koufonisi'],
    port: {
      name: 'Koufonisia Port',
      code: 'KOU_PORT',
      coordinates: { lat: 36.9333, lon: 25.6000 }
    },
    coordinates: { lat: 36.9333, lon: 25.6000 },
    region: 'cyclades'
  },
  {
    name: 'Antiparos',
    slug: 'antiparos',
    aliases: ['antiparos'],
    port: {
      name: 'Antiparos Port',
      code: 'ANT_PORT',
      coordinates: { lat: 37.0333, lon: 25.0667 }
    },
    coordinates: { lat: 37.0333, lon: 25.0667 },
    region: 'cyclades'
  },
  {
    name: 'Kea',
    slug: 'kea',
    aliases: ['kea', 'tzia', 'korissia'],
    port: {
      name: 'Korissia Port',
      code: 'KEA_PORT',
      coordinates: { lat: 37.6333, lon: 24.3333 }
    },
    coordinates: { lat: 37.6333, lon: 24.3333 },
    region: 'cyclades'
  },
  {
    name: 'Kythnos',
    slug: 'kythnos',
    aliases: ['kythnos', 'kithnos', 'merichas'],
    port: {
      name: 'Merichas Port',
      code: 'KYT_PORT',
      coordinates: { lat: 37.4167, lon: 24.4167 }
    },
    coordinates: { lat: 37.4167, lon: 24.4167 },
    region: 'cyclades'
  },
  {
    name: 'Kimolos',
    slug: 'kimolos',
    aliases: ['kimolos', 'psathi'],
    port: {
      name: 'Psathi Port',
      code: 'KIM_PORT',
      coordinates: { lat: 36.7833, lon: 24.5500 }
    },
    coordinates: { lat: 36.7833, lon: 24.5500 },
    region: 'cyclades'
  },
  {
    name: 'Sikinos',
    slug: 'sikinos',
    aliases: ['sikinos', 'alopronia'],
    port: {
      name: 'Alopronia Port',
      code: 'SIK_PORT',
      coordinates: { lat: 36.6667, lon: 25.1167 }
    },
    coordinates: { lat: 36.6667, lon: 25.1167 },
    region: 'cyclades'
  },
  {
    name: 'Anafi',
    slug: 'anafi',
    aliases: ['anafi'],
    port: {
      name: 'Anafi Port',
      code: 'ANA_PORT',
      coordinates: { lat: 36.3667, lon: 25.7667 }
    },
    coordinates: { lat: 36.3667, lon: 25.7667 },
    region: 'cyclades'
  },
  {
    name: 'Donousa',
    slug: 'donousa',
    aliases: ['donousa', 'donoussa'],
    port: {
      name: 'Donousa Port',
      code: 'DON_PORT',
      coordinates: { lat: 37.1000, lon: 25.8000 }
    },
    coordinates: { lat: 37.1000, lon: 25.8000 },
    region: 'cyclades'
  },
  {
    name: 'Schinoussa',
    slug: 'schinoussa',
    aliases: ['schinoussa', 'schinousa'],
    port: {
      name: 'Schinoussa Port',
      code: 'SCH_PORT',
      coordinates: { lat: 36.8667, lon: 25.5167 }
    },
    coordinates: { lat: 36.8667, lon: 25.5167 },
    region: 'cyclades'
  },
  {
    name: 'Iraklia',
    slug: 'iraklia',
    aliases: ['iraklia', 'heraklia', 'irakleia'],
    port: {
      name: 'Iraklia Port',
      code: 'IRA_PORT',
      coordinates: { lat: 36.8333, lon: 25.4667 }
    },
    coordinates: { lat: 36.8333, lon: 25.4667 },
    region: 'cyclades'
  },

  // CRETE (for inter-region connections)
  {
    name: 'Heraklion',
    slug: 'heraklion',
    aliases: ['heraklion', 'iraklio', 'crete', 'her'],
    port: {
      name: 'Heraklion Port',
      code: 'HER_PORT',
      coordinates: { lat: 35.3387, lon: 25.1442 }
    },
    airport: {
      name: 'Heraklion Airport',
      iata: 'HER',
      coordinates: { lat: 35.3396, lon: 25.1803 }
    },
    coordinates: { lat: 35.3387, lon: 25.1442 },
    region: 'crete'
  },
  {
    name: 'Chania',
    slug: 'chania',
    aliases: ['chania', 'hania', 'xania'],
    port: {
      name: 'Souda Port',
      code: 'CHQ_PORT',
      coordinates: { lat: 35.4847, lon: 24.0889 }
    },
    airport: {
      name: 'Chania Airport',
      iata: 'CHQ',
      coordinates: { lat: 35.5317, lon: 24.1497 }
    },
    coordinates: { lat: 35.5122, lon: 24.0156 },
    region: 'crete'
  }
];

// Utility functions for normalization
export function findIslandByInput(input: string): IslandData | undefined {
  const normalized = input.toLowerCase().trim();
  return cycladesDB.find(island => 
    island.name.toLowerCase() === normalized ||
    island.slug === normalized ||
    island.aliases.includes(normalized) ||
    island.port.code.toLowerCase() === normalized ||
    island.airport?.iata.toLowerCase() === normalized
  );
}

export function getPortCode(islandInput: string): string | undefined {
  const island = findIslandByInput(islandInput);
  return island?.port.code;
}

export function getAirportCode(islandInput: string): string | undefined {
  const island = findIslandByInput(islandInput);
  return island?.airport?.iata;
}

export function getCoordinates(islandInput: string): { lat: number; lon: number } | undefined {
  const island = findIslandByInput(islandInput);
  return island?.coordinates;
}

export function getPortCoordinates(islandInput: string): { lat: number; lon: number } | undefined {
  const island = findIslandByInput(islandInput);
  return island?.port.coordinates;
}

export function getAllCycladesIslands(): IslandData[] {
  return cycladesDB.filter(i => i.region === 'cyclades');
}

export function getIslandsWithAirports(): IslandData[] {
  return cycladesDB.filter(i => i.airport !== undefined);
}

export function getMainlandPorts(): IslandData[] {
  return cycladesDB.filter(i => i.region === 'mainland');
}

// Ferry route helpers
export interface FerryRouteInfo {
  from: IslandData;
  to: IslandData;
  estimatedDuration: string;
  estimatedPrice: string;
  operators: string[];
}

export const popularRoutes: Record<string, FerryRouteInfo> = {
  'PIR_JTR': {
    from: cycladesDB.find(i => i.port.code === 'PIR')!,
    to: cycladesDB.find(i => i.port.code === 'JTR_PORT')!,
    estimatedDuration: '5-8h (Blue Star) / 2.5h (Seajets)',
    estimatedPrice: '€40-80',
    operators: ['Blue Star Ferries', 'Seajets', 'Golden Star']
  },
  'PIR_JMK': {
    from: cycladesDB.find(i => i.port.code === 'PIR')!,
    to: cycladesDB.find(i => i.port.code === 'JMK_PORT')!,
    estimatedDuration: '4-5h (Blue Star) / 2h (Seajets)',
    estimatedPrice: '€35-70',
    operators: ['Blue Star Ferries', 'Seajets', 'Golden Star']
  },
  'PIR_JNX': {
    from: cycladesDB.find(i => i.port.code === 'PIR')!,
    to: cycladesDB.find(i => i.port.code === 'JNX_PORT')!,
    estimatedDuration: '4-5h (Blue Star) / 3h (fast)',
    estimatedPrice: '€35-65',
    operators: ['Blue Star Ferries', 'Seajets']
  },
  'PIR_PAS': {
    from: cycladesDB.find(i => i.port.code === 'PIR')!,
    to: cycladesDB.find(i => i.port.code === 'PAS_PORT')!,
    estimatedDuration: '4h (Blue Star) / 2.5h (fast)',
    estimatedPrice: '€35-60',
    operators: ['Blue Star Ferries', 'Seajets', 'Golden Star']
  },
  'PIR_MLO': {
    from: cycladesDB.find(i => i.port.code === 'PIR')!,
    to: cycladesDB.find(i => i.port.code === 'MLO_PORT')!,
    estimatedDuration: '4-7h',
    estimatedPrice: '€40-70',
    operators: ['Aegean Speed Lines', 'Seajets']
  },
  'JTR_JMK': {
    from: cycladesDB.find(i => i.port.code === 'JTR_PORT')!,
    to: cycladesDB.find(i => i.port.code === 'JMK_PORT')!,
    estimatedDuration: '2.5-3h',
    estimatedPrice: '€50-75',
    operators: ['Seajets', 'Golden Star']
  },
  'PAS_JNX': {
    from: cycladesDB.find(i => i.port.code === 'PAS_PORT')!,
    to: cycladesDB.find(i => i.port.code === 'JNX_PORT')!,
    estimatedDuration: '30min-1h',
    estimatedPrice: '€10-20',
    operators: ['Blue Star Ferries', 'Express Skopelitis']
  }
};

export function getRouteInfo(fromInput: string, toInput: string): FerryRouteInfo | undefined {
  const from = findIslandByInput(fromInput);
  const to = findIslandByInput(toInput);
  
  if (!from || !to) return undefined;
  
  const routeKey = `${from.port.code}_${to.port.code}`;
  const reverseKey = `${to.port.code}_${from.port.code}`;
  
  return popularRoutes[routeKey] || popularRoutes[reverseKey];
}
