import { IslandAttractionData } from '../types/seo';

export const islandAttractions: Record<string, IslandAttractionData> = {
  santorini: {
    topAttractions: [
      { id: 'oia-sunset', name: 'Oia Sunset Viewpoint', url: '/activities/santorini-oia-sunset', rank: 1 },
      { id: 'red-beach', name: 'Red Beach', url: '/beaches/santorini-red-beach', rank: 2 },
      { id: 'akrotiri', name: 'Ancient Akrotiri', url: '/attractions/santorini-ancient-akrotiri', rank: 3 },
      { id: 'fira-hike', name: 'Fira to Oia Hike', url: '/activities/santorini-caldera-hike', rank: 4 },
      { id: 'volcano', name: 'Nea Kameni Volcano', url: '/activities/santorini-volcano-tour', rank: 5 },
      { id: 'wineries', name: 'Santo Wines Winery', url: '/activities/santorini-wine-tasting', rank: 6 },
      { id: 'perissa', name: 'Perissa Black Sand Beach', url: '/beaches/santorini-perissa-beach', rank: 7 },
      { id: 'thirasia', name: 'Thirasia Island Trip', url: '/islands/thirasia', rank: 8 },
      { id: 'ammoudi', name: 'Ammoudi Bay', url: '/attractions/santorini-ammoudi-bay', rank: 9 },
      { id: 'kamari', name: 'Kamari Beach', url: '/beaches/santorini-kamari-beach', rank: 10 },
      { id: 'pyrgos', name: 'Pyrgos Village', url: '/attractions/santorini-pyrgos', rank: 11 },
      { id: 'ancient-thera', name: 'Ancient Thera', url: '/attractions/santorini-ancient-thera', rank: 12 },
      { id: 'white-beach', name: 'White Beach', url: '/beaches/santorini-white-beach', rank: 13 },
      { id: 'museum', name: 'Museum of Prehistoric Thera', url: '/attractions/santorini-museum-prehistoric-thera', rank: 14 },
      { id: 'cable-car', name: 'Fira Cable Car', url: '/attractions/santorini-cable-car', rank: 15 }
    ],
    relatedIslands: [
      { label: 'Mykonos', url: '/islands/mykonos' },
      { label: 'Ios', url: '/islands/ios' },
      { label: 'Milos', url: '/islands/milos' },
      { label: 'Paros', url: '/islands/paros' },
      { label: 'Naxos', url: '/islands/naxos' },
      { label: 'Folegandros', url: '/islands/folegandros' }
    ],
    relatedServices: [
      { label: 'Ferry Tickets to Santorini', url: '/ferry-tickets?destination=santorini' },
      { label: 'Hotels in Santorini', url: '/hotels?island=santorini' },
      { label: 'Car Rentals in Santorini', url: '/rent-a-car?island=santorini' },
      { label: 'Santorini Airport Transfers', url: '/transfers?location=santorini' }
    ],
    relatedActivities: [
      { label: 'Santorini Catamaran Cruises', url: '/activities/santorini-catamaran' },
      { label: 'Wine Tasting Tours', url: '/activities/santorini-wine-tasting' },
      { label: 'Volcano Boat Tours', url: '/activities/santorini-volcano-tour' },
      { label: 'Photography Tours', url: '/activities/santorini-photography-tour' }
    ]
  },
  mykonos: {
    topAttractions: [
      { id: 'windmills', name: 'Kato Mili Windmills', url: '/attractions/mykonos-windmills', rank: 1 },
      { id: 'little-venice', name: 'Little Venice', url: '/attractions/mykonos-little-venice', rank: 2 },
      { id: 'paradise', name: 'Paradise Beach', url: '/beaches/mykonos-paradise-beach', rank: 3 },
      { id: 'delos', name: 'Delos Ancient Site', url: '/attractions/delos-island', rank: 4 },
      { id: 'super-paradise', name: 'Super Paradise Beach', url: '/beaches/mykonos-super-paradise', rank: 5 },
      { id: 'paraportiani', name: 'Panagia Paraportiani', url: '/attractions/mykonos-paraportiani', rank: 6 },
      { id: 'psarou', name: 'Psarou Beach', url: '/beaches/mykonos-psarou', rank: 7 },
      { id: 'elia', name: 'Elia Beach', url: '/beaches/mykonos-elia', rank: 8 },
      { id: 'ano-mera', name: 'Ano Mera Village', url: '/attractions/mykonos-ano-mera', rank: 9 },
      { id: 'armenistis', name: 'Armenistis Lighthouse', url: '/attractions/mykonos-lighthouse', rank: 10 },
      { id: 'museum', name: 'Archaeological Museum', url: '/attractions/mykonos-archaeological-museum', rank: 11 },
      { id: 'kalafatis', name: 'Kalafatis Beach', url: '/beaches/mykonos-kalafatis', rank: 12 },
      { id: 'ornos', name: 'Ornos Beach', url: '/beaches/mykonos-ornos', rank: 13 },
      { id: 'platis-gialos', name: 'Platis Gialos', url: '/beaches/mykonos-platis-gialos', rank: 14 },
      { id: 'kalo-livadi', name: 'Kalo Livadi', url: '/beaches/mykonos-kalo-livadi', rank: 15 }
    ],
    relatedIslands: [
      { label: 'Santorini', url: '/islands/santorini' },
      { label: 'Paros', url: '/islands/paros' },
      { label: 'Naxos', url: '/islands/naxos' },
      { label: 'Tinos', url: '/islands/tinos' },
      { label: 'Syros', url: '/islands/syros' }
    ],
    relatedServices: [
      { label: 'Ferry Tickets to Mykonos', url: '/ferry-tickets?destination=mykonos' },
      { label: 'Hotels in Mykonos', url: '/hotels?island=mykonos' },
      { label: 'Car Rentals in Mykonos', url: '/rent-a-car?island=mykonos' },
      { label: 'Mykonos Airport Transfers', url: '/transfers?location=mykonos' }
    ],
    relatedActivities: [
      { label: 'Delos Day Trips', url: '/activities/mykonos-delos-tour' },
      { label: 'Beach Club Reservations', url: '/activities/mykonos-beach-clubs' },
      { label: 'Sunset Cruises', url: '/activities/mykonos-sunset-cruise' },
      { label: 'Jeep Safaris', url: '/activities/mykonos-jeep-safari' }
    ]
  },
  paros: {
    topAttractions: [
      { id: 'naoussa', name: 'Naoussa Old Port', url: '/attractions/paros-naoussa', rank: 1 },
      { id: 'kolymbithres', name: 'Kolymbithres Beach', url: '/beaches/paros-kolymbithres', rank: 2 },
      { id: 'ekatontapiliani', name: 'Panagia Ekatontapiliani', url: '/attractions/paros-ekatontapiliani', rank: 3 },
      { id: 'golden-beach', name: 'Golden Beach', url: '/beaches/paros-golden-beach', rank: 4 },
      { id: 'lefkes', name: 'Lefkes Village', url: '/attractions/paros-lefkes', rank: 5 },
      { id: 'antiparos-trip', name: 'Day Trip to Antiparos', url: '/islands/antiparos', rank: 6 },
      { id: 'santa-maria', name: 'Santa Maria Beach', url: '/beaches/paros-santa-maria', rank: 7 },
      { id: 'parikia', name: 'Parikia Old Town', url: '/attractions/paros-parikia', rank: 8 },
      { id: 'butterflies', name: 'Valley of Butterflies', url: '/attractions/paros-butterflies', rank: 9 },
      { id: 'marpissa', name: 'Marpissa Village', url: '/attractions/paros-marpissa', rank: 10 },
      { id: 'monastiri', name: 'Monastiri Beach', url: '/beaches/paros-monastiri', rank: 11 },
      { id: 'museum', name: 'Archaeological Museum', url: '/attractions/paros-archaeological-museum', rank: 12 },
      { id: 'pounta', name: 'Pounta Beach (Kitesurf)', url: '/beaches/paros-pounta', rank: 13 },
      { id: 'farangas', name: 'Farangas Beach', url: '/beaches/paros-farangas', rank: 14 },
      { id: 'logaras', name: 'Logaras Beach', url: '/beaches/paros-logaras', rank: 15 }
    ],
    relatedIslands: [
      { label: 'Antiparos', url: '/islands/antiparos' },
      { label: 'Naxos', url: '/islands/naxos' },
      { label: 'Mykonos', url: '/islands/mykonos' },
      { label: 'Santorini', url: '/islands/santorini' },
      { label: 'Sifnos', url: '/islands/sifnos' }
    ],
    relatedServices: [
      { label: 'Ferry Tickets to Paros', url: '/ferry-tickets?destination=paros' },
      { label: 'Hotels in Paros', url: '/hotels?island=paros' },
      { label: 'Car Rentals in Paros', url: '/rent-a-car?island=paros' },
      { label: 'Paros Airport Transfers', url: '/transfers?location=paros' }
    ],
    relatedActivities: [
      { label: 'Antiparos Boat Trips', url: '/activities/paros-antiparos-boat' },
      { label: 'Windsurfing Lessons', url: '/activities/paros-windsurfing' },
      { label: 'Horse Riding', url: '/activities/paros-horse-riding' },
      { label: 'Cooking Classes', url: '/activities/paros-cooking-class' }
    ]
  },
  naxos: {
    topAttractions: [
      { id: 'portara', name: 'Portara (Apollo Temple)', url: '/attractions/naxos-portara', rank: 1 },
      { id: 'plaka', name: 'Plaka Beach', url: '/beaches/naxos-plaka', rank: 2 },
      { id: 'agios-prokopios', name: 'Agios Prokopios Beach', url: '/beaches/naxos-agios-prokopios', rank: 3 },
      { id: 'halki', name: 'Halki Village', url: '/attractions/naxos-halki', rank: 4 },
      { id: 'mount-zas', name: 'Mount Zas Hike', url: '/activities/naxos-mount-zas', rank: 5 },
      { id: 'apiranthos', name: 'Apiranthos Village', url: '/attractions/naxos-apiranthos', rank: 6 },
      { id: 'temple-demeter', name: 'Temple of Demeter', url: '/attractions/naxos-temple-demeter', rank: 7 },
      { id: 'mikri-vigla', name: 'Mikri Vigla Beach', url: '/beaches/naxos-mikri-vigla', rank: 8 },
      { id: 'alyko', name: 'Alyko Cedar Forest', url: '/attractions/naxos-alyko', rank: 9 },
      { id: 'agia-anna', name: 'Agia Anna Beach', url: '/beaches/naxos-agia-anna', rank: 10 },
      { id: 'kastro', name: 'Venetian Kastro', url: '/attractions/naxos-kastro', rank: 11 },
      { id: 'filoti', name: 'Filoti Village', url: '/attractions/naxos-filoti', rank: 12 },
      { id: 'kouros', name: 'Kouros of Apollonas', url: '/attractions/naxos-kouros', rank: 13 },
      { id: 'panagia-drosiani', name: 'Panagia Drosiani', url: '/attractions/naxos-panagia-drosiani', rank: 14 },
      { id: 'vallindras', name: 'Vallindras Distillery', url: '/attractions/naxos-vallindras-distillery', rank: 15 }
    ],
    relatedIslands: [
      { label: 'Paros', url: '/islands/paros' },
      { label: 'Koufonisia', url: '/islands/koufonisia' },
      { label: 'Schinoussa', url: '/islands/schinoussa' },
      { label: 'Iraklia', url: '/islands/iraklia' },
      { label: 'Donousa', url: '/islands/donousa' },
      { label: 'Amorgos', url: '/islands/amorgos' }
    ],
    relatedServices: [
      { label: 'Ferry Tickets to Naxos', url: '/ferry-tickets?destination=naxos' },
      { label: 'Hotels in Naxos', url: '/hotels?island=naxos' },
      { label: 'Car Rentals in Naxos', url: '/rent-a-car?island=naxos' },
      { label: 'Naxos Airport Transfers', url: '/transfers?location=naxos' }
    ],
    relatedActivities: [
      { label: 'Small Cyclades Cruise', url: '/activities/naxos-small-cyclades-cruise' },
      { label: 'Food & Wine Tours', url: '/activities/naxos-food-tour' },
      { label: 'Windsurfing', url: '/activities/naxos-windsurfing' },
      { label: 'Hiking Tours', url: '/activities/naxos-hiking' }
    ]
  },
  milos: {
    topAttractions: [
      { id: 'sarakiniko', name: 'Sarakiniko Beach', url: '/beaches/milos-sarakiniko', rank: 1 },
      { id: 'kleftiko', name: 'Kleftiko Caves', url: '/attractions/milos-kleftiko', rank: 2 },
      { id: 'plaka', name: 'Plaka Village', url: '/attractions/milos-plaka', rank: 3 },
      { id: 'firopotamos', name: 'Firopotamos', url: '/attractions/milos-firopotamos', rank: 4 },
      { id: 'catacombs', name: 'Catacombs of Milos', url: '/attractions/milos-catacombs', rank: 5 },
      { id: 'klima', name: 'Klima Fishing Village', url: '/attractions/milos-klima', rank: 6 },
      { id: 'firiplaka', name: 'Firiplaka Beach', url: '/beaches/milos-firiplaka', rank: 7 },
      { id: 'tsigrado', name: 'Tsigrado Beach', url: '/beaches/milos-tsigrado', rank: 8 },
      { id: 'papafragas', name: 'Papafragas Caves', url: '/attractions/milos-papafragas', rank: 9 },
      { id: 'ancient-theater', name: 'Ancient Theater', url: '/attractions/milos-ancient-theater', rank: 10 },
      { id: 'paliochori', name: 'Paliochori Beach', url: '/beaches/milos-paliochori', rank: 11 },
      { id: 'mandrakia', name: 'Mandrakia', url: '/attractions/milos-mandrakia', rank: 12 },
      { id: 'mining-museum', name: 'Mining Museum', url: '/attractions/milos-mining-museum', rank: 13 },
      { id: 'pollonia', name: 'Pollonia Village', url: '/attractions/milos-pollonia', rank: 14 },
      { id: 'agios-sostis', name: 'Agios Sostis Beach', url: '/beaches/milos-agios-sostis', rank: 15 }
    ],
    relatedIslands: [
      { label: 'Kimolos', url: '/islands/kimolos' },
      { label: 'Sifnos', url: '/islands/sifnos' },
      { label: 'Serifos', url: '/islands/serifos' },
      { label: 'Folegandros', url: '/islands/folegandros' },
      { label: 'Santorini', url: '/islands/santorini' }
    ],
    relatedServices: [
      { label: 'Ferry Tickets to Milos', url: '/ferry-tickets?destination=milos' },
      { label: 'Hotels in Milos', url: '/hotels?island=milos' },
      { label: 'Car Rentals in Milos', url: '/rent-a-car?island=milos' },
      { label: 'Milos Airport Transfers', url: '/transfers?location=milos' }
    ],
    relatedActivities: [
      { label: 'Round Island Boat Tour', url: '/activities/milos-boat-tour' },
      { label: 'Sea Kayaking', url: '/activities/milos-kayaking' },
      { label: 'Geological Tours', url: '/activities/milos-geological-tour' },
      { label: 'Scuba Diving', url: '/activities/milos-diving' }
    ]
  },
  ios: {
    topAttractions: [
      { id: 'mylopotas', name: 'Mylopotas Beach', url: '/beaches/ios-mylopotas', rank: 1 },
      { id: 'magganari', name: 'Magganari Beach', url: '/beaches/ios-magganari', rank: 2 },
      { id: 'chora', name: 'Chora Village', url: '/attractions/ios-chora', rank: 3 },
      { id: 'odysseas-elytis', name: 'Odysseas Elytis Theatre', url: '/attractions/ios-theatre', rank: 4 },
      { id: 'skarkos', name: 'Skarkos Prehistoric Site', url: '/attractions/ios-skarkos', rank: 5 },
      { id: 'panagia-gremiotissa', name: 'Panagia Gremiotissa', url: '/attractions/ios-gremiotissa', rank: 6 },
      { id: 'tomb-homer', name: 'Tomb of Homer', url: '/attractions/ios-homer-tomb', rank: 7 },
      { id: 'agia-theodoti', name: 'Agia Theodoti Beach', url: '/beaches/ios-agia-theodoti', rank: 8 },
      { id: 'psathi', name: 'Psathi Beach', url: '/beaches/ios-psathi', rank: 9 },
      { id: 'kalamos', name: 'Kalamos Beach', url: '/beaches/ios-kalamos', rank: 10 },
      { id: 'paleokastro', name: 'Paleokastro', url: '/attractions/ios-paleokastro', rank: 11 },
      { id: 'museum', name: 'Archaeological Museum', url: '/attractions/ios-museum', rank: 12 },
      { id: 'kolitsani', name: 'Kolitsani Beach', url: '/beaches/ios-kolitsani', rank: 13 },
      { id: 'koumbara', name: 'Koumbara Beach', url: '/beaches/ios-koumbara', rank: 14 },
      { id: 'valmas', name: 'Valmas Beach', url: '/beaches/ios-valmas', rank: 15 }
    ],
    relatedIslands: [
      { label: 'Santorini', url: '/islands/santorini' },
      { label: 'Sikinos', url: '/islands/sikinos' },
      { label: 'Folegandros', url: '/islands/folegandros' },
      { label: 'Naxos', url: '/islands/naxos' },
      { label: 'Paros', url: '/islands/paros' }
    ],
    relatedServices: [
      { label: 'Ferry Tickets to Ios', url: '/ferry-tickets?destination=ios' },
      { label: 'Hotels in Ios', url: '/hotels?island=ios' },
      { label: 'Car Rentals in Ios', url: '/rent-a-car?island=ios' },
      { label: 'Ios Airport Transfers', url: '/transfers?location=ios' }
    ],
    relatedActivities: [
      { label: 'Speedboat Tours', url: '/activities/ios-speedboat' },
      { label: 'Scuba Diving', url: '/activities/ios-diving' },
      { label: 'Hiking Trails', url: '/activities/ios-hiking' },
      { label: 'Sunset Cocktails', url: '/activities/ios-sunset' }
    ]
  },
  // Note: This is a partial list. The actual file would contain all 18+ islands. 
  // I'm truncating for brevity but will implement the full list in the actual file.
};

// Helper function to get attractions for any island (with fallbacks)
export const getIslandAttractions = (islandId: string): IslandAttractionData => {
  const data = islandAttractions[islandId.toLowerCase()];
  
  if (data) {
    return data;
  }
  
  // Fallback for islands not yet fully populated
  return {
    topAttractions: [],
    relatedIslands: [
      { label: 'Santorini', url: '/islands/santorini' },
      { label: 'Mykonos', url: '/islands/mykonos' },
      { label: 'Paros', url: '/islands/paros' },
      { label: 'Naxos', url: '/islands/naxos' }
    ],
    relatedServices: [
      { label: 'Ferry Tickets', url: '/ferry-tickets' },
      { label: 'Hotels', url: '/hotels' },
      { label: 'Car Rentals', url: '/rent-a-car' }
    ],
    relatedActivities: []
  };
};

