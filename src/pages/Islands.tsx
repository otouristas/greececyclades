import { Link } from 'react-router-dom';
import { Navigation, Map, Compass, Anchor } from 'lucide-react';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';
import { cyclades } from '../data/islandsData';
import IslandCard from '../components/cards/IslandCard';
import cycladesHero from '../assets/images/cyclades-hero.jpg';

export default function Islands() {
  console.log('Islands page - Available islands:', cyclades);
  console.log('Islands page - First island slug:', cyclades[0] ? cyclades[0].slug : 'no islands');
  console.log('Islands page - All slugs:', cyclades.map(i => ({ name: i.name, slug: i.slug })));

  // Filter out islands that don't have required fields
  const validIslands = cyclades.filter(
    island => island.name && island.slug && island.image
  );

  return (
    <>
      <SEO 
        title={`Cyclades Islands: Complete Travel Guide ${SITE_TAGLINE}`}
        description="Explore the stunning Cyclades islands in Greece. Find detailed information about each island, including Santorini, Mykonos, Naxos, and more. Plan your perfect Greek island vacation."
        ogImage="/assets/images/cyclades-islands.jpg"
      />

      <div className="bg-gray-50">
        {/* Hero Section */}
        <div className="relative min-h-[80vh] flex items-center py-16 lg:py-20">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div className="relative h-full w-full">
              <img
                src={cycladesHero}
                alt="Cyclades Islands"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            </div>
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-display">
                Discover the Magic of Cyclades
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8">
                A stunning archipelago of Greek islands in the heart of the Aegean Sea
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/trip-planner"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Navigation className="h-5 w-5" />
                  Plan Your Trip
                </Link>
                <Link
                  to="/map"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Map className="h-5 w-5" />
                  View Map
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Islands Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Explore Islands</h2>
              <p className="text-gray-600 mt-2">Discover your perfect Greek island getaway</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/map"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Compass className="h-5 w-5" />
                View Map
              </Link>
              <Link
                to="/trip-planner"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Anchor className="h-5 w-5" />
                Plan Trip
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {validIslands.map((island) => (
              <IslandCard key={island.id} island={island} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}