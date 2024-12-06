import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Sun, Waves } from 'lucide-react';
import { useIslandStore } from '../store/islandStore';
import SEO from '../components/SEO';
import SearchBar from '../components/SearchBar';
import { getIslandSlug } from '../utils/slugify';
import { generateIslandsSEO } from '../utils/seo';

export default function Islands() {
  const { islands } = useIslandStore();

  return (
    <>
      <SEO {...generateIslandsSEO()} />

      <div className="pt-16 bg-gray-50">
        <div className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Cyclades Islands</h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover the unique charm of each island in the Cyclades archipelago
            </p>
            <div className="max-w-2xl">
              <SearchBar />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {islands.map((island) => (
              <Link key={island.id} to={`/islands/${getIslandSlug(island.name)}`}>
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
                    <p className="mt-2 text-gray-600">{island.shortDescription}</p>

                    <div className="mt-4 flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Sun className="h-4 w-4 text-yellow-500" />
                        <span>{island.weather.temp}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Waves className="h-4 w-4 text-blue-500" />
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