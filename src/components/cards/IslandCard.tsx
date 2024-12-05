import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Sun } from 'lucide-react';
import { Island } from '../../types';
import { getIslandSlug } from '../../utils/slugify';

interface IslandCardProps {
  island: Island;
}

export default function IslandCard({ island }: IslandCardProps) {
  const slug = getIslandSlug(island.name);
  
  return (
    <Link to={`/islands/${slug}`} className="block">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div className="relative h-48">
          <img
            src={island.image}
            alt={island.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin className="h-4 w-4" />
            <span>Cyclades, Greece</span>
          </div>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">{island.name}</h2>
          <p className="mt-2 text-gray-600 line-clamp-2">{island.shortDescription}</p>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Sun className="h-4 w-4 text-yellow-500" />
              <span>{island.weather.temp}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}