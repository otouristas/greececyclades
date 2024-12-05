import React from 'react';
import { MapPin, Navigation, Sun, Waves, Wind } from 'lucide-react';

const islands = [
  {
    name: 'Santorini',
    description: 'Famous for its dramatic views, stunning sunsets, and volcanic beaches',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80',
    highlights: ['Caldera Views', 'Sunset in Oia', 'Black Sand Beaches', 'Wine Tours'],
    weather: { temp: '24°C', condition: 'Sunny' },
    activities: 85
  },
  {
    name: 'Mykonos',
    description: 'Known for its summer party atmosphere and picturesque villages',
    image: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&q=80',
    highlights: ['Little Venice', 'Windmills', 'Paradise Beach', 'Nightlife'],
    weather: { temp: '22°C', condition: 'Windy' },
    activities: 92
  },
  {
    name: 'Naxos',
    description: 'The largest Cycladic island, perfect for authentic experiences',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80',
    highlights: ['Apollo Temple', 'Mountain Villages', 'Local Cuisine', 'Beaches'],
    weather: { temp: '23°C', condition: 'Clear' },
    activities: 67
  }
];

export default function IslandGuides() {
  return (
    <div className="pt-16 bg-gray-50">
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Cyclades Island Guides</h1>
          <p className="mt-4 text-xl text-blue-100">
            Comprehensive travel guides for the most beautiful islands in the Aegean Sea
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {islands.map((island) => (
            <div key={island.name} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-48">
                <img
                  src={island.image}
                  alt={island.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-1">
                  <Navigation className="h-4 w-4" />
                  <span>{island.activities} Activities</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Cyclades, Greece</span>
                </div>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">{island.name}</h2>
                <p className="mt-2 text-gray-600">{island.description}</p>

                <div className="mt-4 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span>{island.weather.temp}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span>{island.weather.condition}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium text-gray-900">Highlights</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {island.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Full Guide
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}