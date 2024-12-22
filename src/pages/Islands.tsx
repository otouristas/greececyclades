import { Link } from 'react-router-dom';
import { Navigation, Sun, Map, Compass, ArrowRight, Anchor } from 'lucide-react';
import { useIslandStore } from '../store/islandStore';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';

export default function Islands() {
  const { islands } = useIslandStore();
  
  console.log('Islands page - Available islands:', islands);
  console.log('Islands page - First island slug:', islands[0] ? islands[0].slug : 'no islands');
  console.log('Islands page - All slugs:', islands.map(i => ({ name: i.name, slug: i.slug })));

  return (
    <>
      <SEO 
        title={`Cyclades Islands: Complete Travel Guide ${SITE_TAGLINE}`}
        description="Explore the stunning Cyclades islands in Greece. Find detailed information about each island, including Santorini, Mykonos, Naxos, and more. Plan your perfect Greek island vacation."
        ogImage="/images/cyclades-islands.jpg"
      />

      <div className="bg-gray-50">
        {/* Hero Section */}
        <div className="relative min-h-[80vh] flex items-center py-16 lg:py-20">
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
          <div className="relative w-full pt-8 md:pt-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center gap-6 md:gap-8">
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                    Discover Our <span className="text-blue-400">Islands</span>
                  </h1>
                  <p className="mt-4 text-base md:text-lg text-white/90">
                    Explore the unique character of each Cycladic island. From bustling Mykonos to serene Sifnos, 
                    find your perfect island getaway.
                  </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl mt-2">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
                    <div className="h-5 w-5 text-blue-400 mb-1.5 mx-auto">
                      <Sun className="w-full h-full" />
                    </div>
                    <div className="text-sm font-medium text-white">20+ Islands</div>
                    <div className="text-xs text-gray-300">To Explore</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
                    <div className="h-5 w-5 text-blue-400 mb-1.5 mx-auto">
                      <Map className="w-full h-full" />
                    </div>
                    <div className="text-sm font-medium text-white">Local Tips</div>
                    <div className="text-xs text-gray-300">From Experts</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
                    <div className="h-5 w-5 text-blue-400 mb-1.5 mx-auto">
                      <Compass className="w-full h-full" />
                    </div>
                    <div className="text-sm font-medium text-white">Travel Guides</div>
                    <div className="text-xs text-gray-300">For Each Island</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
                    <div className="h-5 w-5 text-blue-400 mb-1.5 mx-auto">
                      <Anchor className="w-full h-full" />
                    </div>
                    <div className="text-sm font-medium text-white">Ferry Routes</div>
                    <div className="text-xs text-gray-300">Between Islands</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mt-4">
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
        </div>

        {/* Island Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {islands.map((island) => (
              <Link 
                key={island.id}
                to={`/islands/${island.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
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
                      {island.bestTime.months.join(', ')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation className="h-4 w-4" />
                      {island.activities.length} Activities
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