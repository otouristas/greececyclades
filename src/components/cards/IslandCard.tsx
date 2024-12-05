import React from 'react';
import { MapPin, Sun, Navigation } from 'lucide-react';
import { Island } from '../../types';

interface IslandCardProps {
  island: Island;
}

export default function IslandCard({ island }: IslandCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
      <div className="relative h-48">
        <img
          src={island.image}
          alt={island.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
          <span className="text-gray-500">{island.weather.condition}</span>
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
          Explore {island.name}
        </button>
      </div>
    </div>
  );
}