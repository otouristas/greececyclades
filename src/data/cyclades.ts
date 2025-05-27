export interface Island {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  activities: string[];
}

export const cyclades: Island[] = [
  {
    id: 'santorini',
    name: 'Santorini',
    slug: 'santorini',
    description: 'Santorini is one of the Cyclades islands in the southern Aegean Sea. It\'s known for its stunning white-washed buildings, blue-domed churches, and dramatic views of the caldera.',
    shortDescription: 'Iconic sunsets & white-washed buildings',
    image: '/images/islands/santorini-island.webp',
    activities: ['Wine Tasting', 'Sunset Viewing', 'Beach Hopping', 'Archaeological Sites']
  },
  {
    id: 'mykonos',
    name: 'Mykonos',
    slug: 'mykonos',
    description: 'Mykonos is a popular Greek island known for its vibrant nightlife, beautiful beaches, and charming old town with its iconic windmills.',
    shortDescription: 'Vibrant nightlife & cosmopolitan charm',
    image: '/images/islands/mykonos-island.jpg',
    activities: ['Beach Clubs', 'Windmills', 'Little Venice', 'Shopping']
  },
  {
    id: 'paros',
    name: 'Paros',
    slug: 'paros',
    description: 'Paros is a beautiful island in the heart of the Cyclades, known for its traditional villages, golden beaches, and excellent windsurfing conditions.',
    shortDescription: 'Perfect blend of tradition & luxury',
    image: '/images/islands/paros-island.jpg',
    activities: ['Windsurfing', 'Beach Hopping', 'Marble Art', 'Hiking']
  },
  {
    id: 'naxos',
    name: 'Naxos',
    slug: 'naxos',
    description: 'Naxos is the largest island in the Cyclades, offering a diverse landscape of mountains, beaches, and traditional villages.',
    shortDescription: 'Largest island with diverse landscapes',
    image: '/images/islands/naxos-island.jpg',
    activities: ['Mount Zeus', 'Local Cuisine', 'Ancient Temples', 'Beaches']
  },
  {
    id: 'milos',
    name: 'Milos',
    slug: 'milos',
    description: 'Milos is a volcanic island known for its unique rock formations, crystal-clear waters, and the famous Venus de Milo statue.',
    shortDescription: 'Volcanic beauty & hidden beaches',
    image: '/images/islands/milos.jpg',
    activities: ['Sarakiniko', 'Catacombs', 'Fishing Villages', 'Beach Hopping']
  },
  {
    id: 'ios',
    name: 'Ios',
    slug: 'ios',
    description: 'Ios is a popular destination for young travelers, known for its vibrant nightlife, beautiful beaches, and ancient history.',
    shortDescription: 'Party paradise with ancient history',
    image: '/images/islands/ios.jpg',
    activities: ['Nightlife', 'Homer\'s Tomb', 'Beaches', 'Hiking']
  },
  {
    id: 'sifnos',
    name: 'Sifnos',
    slug: 'sifnos',
    description: 'Sifnos is a charming island known for its traditional villages, excellent hiking trails, and renowned local cuisine.',
    shortDescription: 'Gastronomic haven & hiking trails',
    image: '/images/islands/sifnos-island.jpg',
    activities: ['Local Cuisine', 'Hiking', 'Pottery', 'Beaches']
  },
  {
    id: 'folegandros',
    name: 'Folegandros',
    slug: 'folegandros',
    description: 'Folegandros is a small, unspoiled island known for its dramatic cliffs, charming Chora, and peaceful atmosphere.',
    shortDescription: 'Authentic charm & dramatic cliffs',
    image: '/images/islands/folegandros.jpg',
    activities: ['Chora', 'Hiking', 'Sunset Views', 'Beaches']
  },
  {
    id: 'amorgos',
    name: 'Amorgos',
    slug: 'amorgos',
    description: 'Amorgos is a wild and beautiful island known for its dramatic landscapes, the famous Monastery of Hozoviotissa, and excellent diving spots.',
    shortDescription: 'Wild beauty & spiritual retreats',
    image: '/images/islands/amorgos.jpg',
    activities: ['Monastery', 'Diving', 'Hiking', 'Beaches']
  },
  {
    id: 'serifos',
    name: 'Serifos',
    slug: 'serifos',
    description: 'Serifos is a peaceful island with a rich mining history, beautiful beaches, and a charming hilltop Chora.',
    shortDescription: 'Mining history & pristine beaches',
    image: '/images/islands/serifos.jpg',
    activities: ['Mining History', 'Beaches', 'Hiking', 'Chora']
  },
  {
    id: 'kea',
    name: 'Kea',
    slug: 'kea',
    description: 'Kea is the closest Cycladic island to Athens, offering a perfect blend of natural beauty, ancient ruins, and local traditions.',
    shortDescription: 'Close to Athens & natural beauty',
    image: '/images/islands/kea.webp',
    activities: ['Hiking', 'Diving', 'Local Life', 'Ancient Ruins']
  },
  {
    id: 'kythnos',
    name: 'Kythnos',
    slug: 'kythnos',
    description: 'Kythnos is a quiet island known for its thermal springs, beautiful beaches, and traditional villages.',
    shortDescription: 'Thermal springs & hidden beaches',
    image: '/images/islands/kythnos.jpg',
    activities: ['Hot Springs', 'Beaches', 'Local Cuisine', 'Hiking']
  }
]; 