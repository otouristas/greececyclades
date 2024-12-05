import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useIslandStore } from '../store/islandStore';
import { useHotelStore } from '../store/hotelStore';
import { MapPin, Sun, Cloud, Umbrella } from 'lucide-react';
import HotelCard from '../components/hotels/HotelCard';
import { getIslandSlug, compareSlug } from '../utils/slugify';

const Island = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { islands } = useIslandStore();
  const { hotels } = useHotelStore();

  const island = React.useMemo(() => {
    if (!slug) return null;
    return islands.find(island => compareSlug(getIslandSlug(island.name), slug));
  }, [islands, slug]);

  // Get hotels for this island
  const islandHotels = React.useMemo(() => {
    if (!island) return [];
    return hotels.filter(hotel => hotel.island === island.name);
  }, [hotels, island]);

  // Handle loading and not found states
  if (!island) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Island Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the island you're looking for.</p>
          <button 
            onClick={() => navigate('/islands')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Islands
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${island.name} Travel Guide - Greece Cyclades`}
        description={island.metaDescription}
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <img
            src={island.image}
            alt={island.name}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-5xl font-bold mb-4">{island.name}</h1>
            <p className="text-xl max-w-2xl mx-auto">{island.shortDescription}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">About {island.name}</h2>
            <p className="text-gray-600 mb-6">{island.description}</p>
            <div className="flex flex-wrap gap-4">
              {island.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Located in the Cyclades, Greece</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sun className="h-5 w-5 text-yellow-500" />
                  <span>Average temperature: {island.weather.temp}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cloud className="h-5 w-5 text-gray-500" />
                  <span>{island.weather.condition}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Umbrella className="h-5 w-5 text-blue-500" />
                  <span>{island.activities} activities available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hotels */}
        {islandHotels.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Where to Stay</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {islandHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Island;
