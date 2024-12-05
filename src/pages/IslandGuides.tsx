import { Sun, ArrowRight, CalendarDays, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const islands = [
  {
    name: 'Santorini',
    description: 'Famous for its dramatic views, stunning sunsets, and volcanic beaches. Experience the magic of the most romantic island in Greece.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80',
    highlights: ['Caldera Views', 'Sunset in Oia', 'Black Sand Beaches', 'Wine Tours'],
    weather: { temp: '24°C', condition: 'Sunny' },
    activities: 85,
    bestTime: 'April to October',
    idealFor: ['Couples', 'Photographers', 'Wine Lovers'],
    slug: 'santorini'
  },
  {
    name: 'Mykonos',
    description: 'Known for its summer party atmosphere, picturesque villages, and cosmopolitan lifestyle. The perfect blend of luxury and tradition.',
    image: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&q=80',
    highlights: ['Little Venice', 'Windmills', 'Paradise Beach', 'Nightlife'],
    weather: { temp: '22°C', condition: 'Windy' },
    activities: 92,
    bestTime: 'June to September',
    idealFor: ['Party Lovers', 'Beach Goers', 'Luxury Seekers'],
    slug: 'mykonos'
  },
  {
    name: 'Naxos',
    description: 'The largest Cycladic island, perfect for authentic experiences. Discover ancient temples, traditional villages, and endless beaches.',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80',
    highlights: ['Apollo Temple', 'Mountain Villages', 'Local Cuisine', 'Beaches'],
    weather: { temp: '23°C', condition: 'Clear' },
    activities: 67,
    bestTime: 'May to October',
    idealFor: ['Families', 'History Buffs', 'Food Lovers'],
    slug: 'naxos'
  },
  {
    name: 'Milos',
    description: 'A volcanic island known for its stunning beaches, colorful fishing villages, and unique lunar landscapes.',
    image: 'https://images.unsplash.com/photo-1602088693260-78f2c76287c1?auto=format&fit=crop&q=80',
    highlights: ['Sarakiniko Beach', 'Kleftiko Caves', 'Fishing Villages', 'Boat Tours'],
    weather: { temp: '23°C', condition: 'Clear' },
    activities: 55,
    bestTime: 'May to October',
    idealFor: ['Beach Lovers', 'Photographers', 'Adventure Seekers'],
    slug: 'milos'
  }
];

export default function IslandGuides() {
  return (
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
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Start Planning
              </button>
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-400 transition-colors">
                View All Islands
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Island Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {islands.map((island) => (
            <Link 
              key={island.name}
              to={`/guides/${island.slug}`}
              className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/5 relative">
                  <img
                    src={island.image}
                    alt={island.name}
                    className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-blue-600">
                    {island.activities} Activities
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {island.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <Sun className="h-4 w-4" />
                        <span>{island.weather.temp}</span>
                        <span>•</span>
                        <span>{island.weather.condition}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {island.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays className="h-4 w-4 text-gray-400" />
                      <span>Best Time: {island.bestTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>Perfect for: {island.idealFor.join(', ')}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {island.highlights.slice(0, 3).map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}