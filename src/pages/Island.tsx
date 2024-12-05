import React from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { useIslandStore } from '../store/islandStore';
import { useHotelStore } from '../store/hotelStore';
import { MapPin, Sun, Cloud, Umbrella } from 'lucide-react';
import HotelCard from '../components/hotels/HotelCard';

const Island = () => {
  const { islandId } = useParams();
  const { islands } = useIslandStore();
  const { hotels } = useHotelStore();

  const island = islands.find(i => i.id === Number(islandId));
  const islandHotels = hotels.filter(h => h.island.toLowerCase() === island?.name.toLowerCase());

  if (!island) {
    return <div>Island not found</div>;
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

      {/* Island Information */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Weather and Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Location</h3>
            </div>
            <p>Cyclades, Aegean Sea</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              {island.weather.condition === 'sunny' ? (
                <Sun className="h-6 w-6 text-yellow-500" />
              ) : island.weather.condition === 'cloudy' ? (
                <Cloud className="h-6 w-6 text-gray-500" />
              ) : (
                <Umbrella className="h-6 w-6 text-blue-500" />
              )}
              <h3 className="text-lg font-semibold">Weather</h3>
            </div>
            <p>{island.weather.temp} • {island.weather.condition}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Umbrella className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Activities</h3>
            </div>
            <p>{island.activities} activities available</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">About {island.name}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{island.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {island.highlights.map((highlight, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        {island.quote && (
          <div className="mb-12 text-center">
            <blockquote className="text-2xl italic text-gray-600">
              "{island.quote}"
            </blockquote>
          </div>
        )}

        {/* Hotels */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Where to Stay in {island.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {islandHotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Island;
