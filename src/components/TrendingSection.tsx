import React from 'react';
import { ArrowRight } from 'lucide-react';
import IslandCard from './cards/IslandCard';
import ActivityCard from './cards/ActivityCard';
import HotelCard from './cards/HotelCard';
import { useIslandStore } from '../store/islandStore';

export default function TrendingSection() {
  const { islands } = useIslandStore();
  const trendingIslands = islands.slice(0, 2); // Show first 2 islands

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