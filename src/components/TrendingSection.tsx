import React from 'react';
import { ArrowRight } from 'lucide-react';
import IslandCard from './cards/IslandCard';
import ActivityCard from './cards/ActivityCard';
import HotelCard from './cards/HotelCard';

const trendingIslands = [
  {
    id: 1,
    name: 'Santorini',
    description: 'Famous for its dramatic views, stunning sunsets, and volcanic beaches',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80',
    highlights: ['Caldera Views', 'Sunset in Oia', 'Black Sand Beaches'],
    weather: { temp: '24°C', condition: 'Sunny' },
    activities: 85
  },
  {
    id: 2,
    name: 'Mykonos',
    description: 'Known for its summer party atmosphere and picturesque villages',
    image: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&q=80',
    highlights: ['Little Venice', 'Windmills', 'Paradise Beach'],
    weather: { temp: '22°C', condition: 'Windy' },
    activities: 92
  }
];

export default function TrendingSection() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
          <button className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
            View all
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {trendingIslands.map((island) => (
            <IslandCard key={island.id} island={island} />
          ))}
        </div>
      </div>
    </div>
  );
}