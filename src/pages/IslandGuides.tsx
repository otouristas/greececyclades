import { Sun, ArrowRight, CalendarDays, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { GUIDES_SEO } from '../utils/seoMetadata';

// Import island images
import santoriniImage from '../assets/images/islands/santorini-island.webp';
import mykonosImage from '../assets/images/islands/mykonos-island.jpg';
import parosImage from '../assets/images/islands/paros-island.jpg';
import sifnosImage from '../assets/images/islands/sifnos-island.jpg';
import naxosImage from '../assets/images/islands/naxos-island.jpg';

// Temporarily reuse existing images for new islands
const antiparosImage = parosImage;
const koufonisiaImage = naxosImage;
const kimolosImage = sifnosImage;
const syrosImage = mykonosImage;
const androsImage = naxosImage;
const tinosImage = santoriniImage;
const keaImage = parosImage;

const guides = [
  {
    id: 'santorini',
    name: 'Santorini',
    description: 'Famous for its dramatic views, stunning sunsets, and volcanic beaches.',
    image: santoriniImage,
    weather: { temp: '24°C', condition: 'Sunny' },
    bestTime: 'April to October',
    idealFor: ['Couples', 'Photographers', 'Wine Lovers']
  },
  {
    id: 'mykonos',
    name: 'Mykonos',
    description: 'The cosmopolitan gem of the Cyclades, known for its vibrant nightlife and iconic windmills.',
    image: mykonosImage,
    weather: { temp: '26°C', condition: 'Sunny' },
    bestTime: 'May to September',
    idealFor: ['Party Lovers', 'Luxury Travelers', 'Beach Enthusiasts']
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
    id: 'paros',
    name: 'Paros',
    description: 'Perfect blend of traditional charm and modern amenities, ideal for families and water sports.',
    image: parosImage,
    weather: { temp: '25°C', condition: 'Sunny' },
    bestTime: 'June to September',
    idealFor: ['Families', 'Water Sports Fans', 'Culture Lovers']
  },
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
    description: 'The closest Cycladic island to Athens, offering hiking trails, diving spots, and ancient ruins.',
    image: keaImage,
    weather: { temp: '25°C', condition: 'Sunny' },
    bestTime: 'April to October',
    idealFor: ['Weekend Travelers', 'Divers', 'History Enthusiasts']
  },
  {
    id: 'sifnos',
    name: 'Sifnos',
    description: 'A foodie paradise with rich culinary traditions, beautiful hiking trails, and serene beaches.',
    image: sifnosImage,
    weather: { temp: '23°C', condition: 'Sunny' },
    bestTime: 'May to October',
    idealFor: ['Food Lovers', 'Hikers', 'Cultural Travelers']
  }
];

export default function IslandGuides() {
  return (
    <>
      <SEO {...GUIDES_SEO} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-blue-600 text-white py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Discover Your Perfect Island
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Comprehensive travel guides for the most beautiful islands in the Aegean Sea.
                Plan your dream vacation with local insights, tips, and recommendations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/trip-planner"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Start Planning
                </Link>
                <Link 
                  to="/islands"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-400 transition-colors"
                >
                  View All Islands
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Island Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            {guides.map((guide) => (
              <Link 
                key={guide.id}
                to={`/guides/${guide.id}`}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 relative">
                    <img
                      src={guide.image}
                      alt={`${guide.name} Island`}
                      className="h-48 md:h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {guide.name} Guide
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {guide.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Sun className="h-5 w-5 text-blue-500" />
                        <span>{guide.weather.temp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-blue-500" />
                        <span>{guide.bestTime}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      <span className="text-gray-600">Perfect for: {guide.idealFor[0]}</span>
                    </div>
                    <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      Read More <ArrowRight className="h-5 w-5 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}