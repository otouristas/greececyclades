import { useParams, useNavigate } from 'react-router-dom';
import { useIslandStore } from '../store/islandStore';
import { useHotelStore } from '../store/hotelStore';
import { MapPin, Sun, Cloud, Umbrella, UtensilsCrossed } from 'lucide-react';
import HotelCard from '../components/hotels/HotelCard';
import SEO from '../components/SEO';
import { generateIslandDetailSEO } from '../utils/seo';
import { getIslandSlug } from '../utils/slugify';
import { useMemo } from 'react';
import { culinaryData } from '../data/culinaryData';
import { CulinaryCategory } from '../types/culinary';

const IslandDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { islands } = useIslandStore();
  const { hotels } = useHotelStore();

  console.log('Island detail page - Current slug:', slug);
  console.log('Island detail page - Available islands:', islands);
  console.log('Island detail page - Available slugs:', islands.map(i => getIslandSlug(i.name)));
  console.log('Island detail page - Looking for slug:', slug);

  const island = useMemo(() => {
    if (!slug) return null;
    const foundIsland = islands.find(island => {
      const generatedSlug = getIslandSlug(island.name);
      console.log('Comparing:', { slug, generatedSlug, name: island.name });
      return generatedSlug === slug;
    });
    console.log('Island detail page - Found island:', foundIsland);
    if (foundIsland && foundIsland.bestTime) {
      console.log('Best time data:', {
        bestTime: foundIsland.bestTime,
        months: foundIsland.bestTime.months,
        isArray: Array.isArray(foundIsland.bestTime.months),
        monthValues: foundIsland.bestTime.months?.map(m => ({ value: m, type: typeof m }))
      });
    }
    return foundIsland;
  }, [islands, slug]);

  // Get hotels for this island
  const islandHotels = useMemo(() => {
    if (!island) return [];
    return hotels.filter(hotel => hotel.location.island === island.name);
  }, [hotels, island]);

  // Get culinary experiences for this island
  const islandCulinary = useMemo(() => {
    if (!island) return [];
    return culinaryData.filter(exp => 
      exp.location.toLowerCase().includes(island.name.toLowerCase())
    );
  }, [island]);

  const groupedCulinary = useMemo(() => {
    return islandCulinary.reduce((acc, exp) => {
      const category = exp.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(exp);
      return acc;
    }, {} as Record<CulinaryCategory, typeof islandCulinary>);
  }, [islandCulinary]);

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
    <>
      <SEO {...generateIslandDetailSEO(island.name, island.image)} />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full mt-0">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">About {island.name}</h2>
              <p className="text-gray-600 mb-6">{island.description}</p>
              <div className="flex flex-wrap gap-4">
                {island.highlights.map((highlight: string) => (
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
                    <span>Summer: {island.weather.summer}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Cloud className="h-5 w-5 text-gray-500" />
                    <span>Winter: {island.weather.winter}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Umbrella className="h-5 w-5 text-blue-500" />
                    <span>{island.activities.length} activities available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    <span>Best Time: {island.bestTime?.months ? island.bestTime.months.map(m => m.toString()).join(', ') : ''}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>Best Time Reason: {island.bestTime?.reason || ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Culinary Experiences Section */}
          {islandCulinary.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-8">
                  <UtensilsCrossed className="h-6 w-6 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Local Culinary Experiences</h2>
                </div>

                {Object.entries(groupedCulinary).map(([category, experiences]) => (
                  <div key={category} className="mb-12 last:mb-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {experiences.map((experience) => (
                        <div key={experience.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                {experience.category}
                              </span>
                              <span className="text-sm text-gray-500">{experience.duration}</span>
                            </div>
                            
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {experience.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-4">
                              {experience.shortDescription}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-semibold text-blue-600">
                                {experience.price.display}
                              </span>
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

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
    </>
  );
};

export default IslandDetail;
