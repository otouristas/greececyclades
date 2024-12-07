import antiparosImage from '../assets/images/islands/antiparos-island.jpg';
import koufonisiaImage from '../assets/images/islands/koufonisia-island.jpg';
import kimolosImage from '../assets/images/islands/kimolos-island.jpg';
import syrosImage from '../assets/images/islands/syros-island.jpg';
import naxosImage from '../assets/images/islands/naxos-island.jpg';
import androsImage from '../assets/images/islands/andros-island.jpg';
import tinosImage from '../assets/images/islands/tinos-island.jpg';
import keaImage from '../assets/images/islands/kea-island.jpg';

export const islandGuides = [
  {
    id: 'antiparos',
    name: 'Antiparos',
    description: 'A charming small island known for its peaceful atmosphere, beautiful caves, and pristine beaches.',
    image: antiparosImage,
    weather: { temp: '24°C', condition: 'Sunny' },
    bestTime: 'May to September',
    idealFor: ['Peace Seekers', 'Beach Lovers', 'Cave Explorers']
  },
  {
    id: 'koufonisia',
    name: 'Koufonisia',
    description: 'A hidden gem with turquoise waters, white sandy beaches, and authentic island life.',
    image: koufonisiaImage,
    weather: { temp: '25°C', condition: 'Sunny' },
    bestTime: 'June to September',
    idealFor: ['Beach Enthusiasts', 'Swimmers', 'Relaxation Seekers']
  },
  {
    id: 'kimolos',
    name: 'Kimolos',
    description: 'An unspoiled volcanic island with unique geology, thermal springs, and traditional villages.',
    image: kimolosImage,
    weather: { temp: '23°C', condition: 'Sunny' },
    bestTime: 'May to October',
    idealFor: ['Nature Lovers', 'Geology Enthusiasts', 'Authentic Experience Seekers']
  },
  {
    id: 'syros',
    name: 'Syros',
    description: 'The capital of Cyclades, featuring neoclassical architecture, vibrant culture, and year-round life.',
    image: syrosImage,
    weather: { temp: '24°C', condition: 'Sunny' },
    bestTime: 'April to October',
    idealFor: ['Culture Enthusiasts', 'Architecture Lovers', 'Urban Explorers']
  },
  {
    id: 'naxos',
    name: 'Naxos',
    description: 'The largest Cycladic island, famous for its ancient ruins, mountain villages, and endless beaches.',
    image: naxosImage,
    weather: { temp: '25°C', condition: 'Sunny' },
    bestTime: 'May to October',
    idealFor: ['Families', 'History Buffs', 'Beach Lovers']
  },
  {
    id: 'andros',
    name: 'Andros',
    description: 'A hiker\'s paradise with lush valleys, waterfalls, and a rich maritime heritage.',
    image: androsImage,
    weather: { temp: '23°C', condition: 'Sunny' },
    bestTime: 'April to October',
    idealFor: ['Hikers', 'Nature Lovers', 'Art Enthusiasts']
  },
  {
    id: 'tinos',
    name: 'Tinos',
    description: 'Known for its religious significance, traditional marble crafts, and picturesque villages.',
    image: tinosImage,
    weather: { temp: '24°C', condition: 'Sunny' },
    bestTime: 'May to September',
    idealFor: ['Pilgrims', 'Art Lovers', 'Food Enthusiasts']
  },
  {
    id: 'kea',
    name: 'Kea',
    description: 'The closest Cycladic island to Athens, offering hiking trails, ancient sites, and diving spots.',
    image: keaImage,
    weather: { temp: '25°C', condition: 'Sunny' },
    bestTime: 'April to October',
    idealFor: ['Weekend Travelers', 'Divers', 'History Enthusiasts']
  }
];
