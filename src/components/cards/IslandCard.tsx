import { Link } from 'react-router-dom';
import { MapPin, Sun } from 'lucide-react';
import { Island } from '../../types';

interface IslandCardProps {
  island: Partial<Island>;
}

export default function IslandCard({ island }: IslandCardProps) {
  if (!island.name || !island.slug || !island.image) {
    return null;
  }

  return (
    <Link to={`/islands/${island.slug}`} className="block group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="relative aspect-[16/9]">
          <img
            src={island.image}
            alt={island.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {island.weather?.temp && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-1">
              <Sun className="h-4 w-4 text-yellow-500" />
              <span>{island.weather.temp}°C</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin className="h-4 w-4" />
            <span>Cyclades, Greece</span>
          </div>

          <h2 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {island.name}
          </h2>
          
          {island.shortDescription && (
            <p className="mt-1.5 text-sm text-gray-600 line-clamp-2">
              {island.shortDescription}
            </p>
          )}

          {island.highlights && island.highlights.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {island.highlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}