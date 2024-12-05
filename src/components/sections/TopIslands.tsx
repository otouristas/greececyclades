import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useIslandStore } from '../../store/islandStore';
import IslandCard from '../cards/IslandCard';

export default function TopIslands() {
  const { islands } = useIslandStore();
  const topIslands = islands.slice(0, 3); // Show top 3 islands

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Top Islands</h2>
            <p className="mt-2 text-gray-600">Discover the most popular destinations in the Cyclades</p>
          </div>
          <Link 
            to="/islands"
            className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
          >
            View all islands
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topIslands.map((island) => (
            <IslandCard key={island.id} island={island} />
          ))}
        </div>
      </div>
    </section>
  );
}