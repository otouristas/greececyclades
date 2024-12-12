import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Sun, Waves, Map, Compass, ArrowRight, Anchor } from 'lucide-react';
import { useIslandStore } from '../store/islandStore';
import SEO from '../components/SEO';

export default function Islands() {
  const { islands } = useIslandStore();

  const getIslandSlug = (name: string) => {
    return name.toLowerCase().replace(' ', '-');
  };

  return (
    <>
      <SEO 
        title="Cyclades Islands | Your Guide to Greek Island Paradise"
        description="Explore the stunning Cyclades islands in Greece. Find detailed information about each unique island, from popular destinations like Santorini and Mykonos to hidden gems."
        image="/images/cyclades-islands.jpg"
      />

      <div className="bg-gray-50">
        {/* Hero Section */}
        <div className="relative min-h-[85vh] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div className="relative h-full w-full">
              <img
                src="/images/santorini-hero.jpg"
                alt="Cyclades Islands"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Discover Our <span className="text-blue-400">Islands</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Explore the unique character of each Cycladic island. From bustling Mykonos to serene Sifnos, 
                find your perfect island getaway.
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <Map className="h-6 w-6 text-blue-400 mb-2 mx-auto" />
                  <div className="text-white font-medium">13 Islands</div>
                  <div className="text-sm text-gray-300">To Explore</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <Anchor className="h-6 w-6 text-blue-400 mb-2 mx-auto" />
                  <div className="text-white font-medium">Beaches</div>
                  <div className="text-sm text-gray-300">& Activities</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <Compass className="h-6 w-6 text-blue-400 mb-2 mx-auto" />
                  <div className="text-white font-medium">Local Tips</div>
                  <div className="text-sm text-gray-300">& Insights</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <Sun className="h-6 w-6 text-blue-400 mb-2 mx-auto" />
                  <div className="text-white font-medium">Weather</div>
                  <div className="text-sm text-gray-300">Information</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/trip-planner"
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  Start Planning Your Trip
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/guides"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/20 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  View Detailed Guides
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Island Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {islands.map((island) => (
              <Link 
                key={island.id}
                to={`/islands/${getIslandSlug(island.name)}`}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={island.image}
                    alt={`${island.name} Island`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{island.name}</h3>
                    <p className="text-gray-200 text-sm">{island.shortDescription}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Sun className="h-4 w-4" />
                      {island.bestTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation className="h-4 w-4" />
                      {island.activities} Activities
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{island.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {island.idealFor.map((ideal, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                      >
                        {ideal}
                      </span>
                    ))}
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