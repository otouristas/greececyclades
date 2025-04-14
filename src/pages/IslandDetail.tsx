import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, 
  Sun, 
  Plane, 
  Ship, 
  Calendar, 
  Users, 
  ArrowRight, 
  BookOpen,
  Waves,
  Mountain,
  Church,
  Home,
  Music,
  Utensils,
  Footprints,
  MapPinned,
  Car,
  Building
} from 'lucide-react';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';
import { cyclades } from '../data/islandsData';
import type { Island } from '../types/island';

export default function IslandDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedIsland, setSelectedIsland] = useState<Partial<Island> | null>(null);

  useEffect(() => {
    console.log('IslandDetail - Current slug:', slug);
    console.log('IslandDetail - Available islands:', cyclades);
    
    if (slug) {
      const island = cyclades.find(island => island.slug === slug);
      console.log('IslandDetail - Found island:', island);
      
      if (island) {
        setSelectedIsland(island);
      } else {
        console.log('IslandDetail - Island not found, navigating to /islands');
        navigate('/islands');
      }
    }
  }, [slug, navigate]);

  if (!selectedIsland) {
    console.log('IslandDetail - No selected island, returning null');
    return null;
  }

  console.log('IslandDetail - Rendering with selectedIsland:', selectedIsland);

  return (
    <>
      <SEO 
        title={`Visit ${selectedIsland.name} in the Cyclades ${SITE_TAGLINE}`}
        description={`Discover the beauty of ${selectedIsland.name}. Plan your perfect vacation with our comprehensive guide including best beaches, activities, hotels, and travel tips.`}
        ogImage={selectedIsland.image}
      />
      
      {/* Hero Section with Parallax */}
      <div className="relative min-h-[60vh] md:h-[85vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${selectedIsland.heroImage || selectedIsland.image}")`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        
        {/* Content overlay */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex flex-col justify-between pt-24 md:pt-8 pb-8 md:pb-12">
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-sm md:text-base">Cyclades, Greece</span>
            </div>
            
            <div className="max-w-3xl space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 md:mb-4 font-display">
                Welcome to {selectedIsland.name}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light">
                {selectedIsland.quote}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 pt-4 md:pt-6">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4 text-white">
                  <Calendar className="h-4 w-4 md:h-5 md:w-5 mb-1.5 md:mb-2" />
                  <p className="text-xs md:text-sm font-medium">Best Time</p>
                  <p className="text-[10px] md:text-xs opacity-80">{selectedIsland.bestTime?.months.join(', ')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4 text-white">
                  <Sun className="h-4 w-4 md:h-5 md:w-5 mb-1.5 md:mb-2" />
                  <p className="text-xs md:text-sm font-medium">Weather</p>
                  <p className="text-[10px] md:text-xs opacity-80">{selectedIsland.weather?.summer}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4 text-white">
                  <Plane className="h-4 w-4 md:h-5 md:w-5 mb-1.5 md:mb-2" />
                  <p className="text-xs md:text-sm font-medium">Transport</p>
                  <p className="text-[10px] md:text-xs opacity-80">Ferry & Local Bus</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4 text-white">
                  <Users className="h-4 w-4 md:h-5 md:w-5 mb-1.5 md:mb-2" />
                  <p className="text-xs md:text-sm font-medium">Perfect For</p>
                  <p className="text-[10px] md:text-xs opacity-80">{selectedIsland.idealFor?.[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">About {selectedIsland.name}</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{selectedIsland.description}</p>
            
            {/* Activities */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedIsland.activities?.map((activity) => {
                // Get icon based on activity
                const getActivityIcon = (activity: string) => {
                  switch (activity) {
                    case 'swimming':
                      return <Waves className="h-6 w-6" />;
                    case 'beach-hopping':
                      return <MapPinned className="h-6 w-6" />;
                    case 'hiking':
                      return <Mountain className="h-6 w-6" />;
                    case 'rock-climbing':
                      return <Mountain className="h-6 w-6" />;
                    case 'monastery-visits':
                      return <Church className="h-6 w-6" />;
                    case 'traditional-villages':
                      return <Home className="h-6 w-6" />;
                    case 'nightlife':
                      return <Music className="h-6 w-6" />;
                    case 'local-cuisine':
                      return <Utensils className="h-6 w-6" />;
                    default:
                      return <Footprints className="h-6 w-6" />;
                  }
                };

                // Get description based on activity
                const getActivityDescription = (activity: string) => {
                  switch (activity) {
                    case 'swimming':
                      return 'Crystal clear waters perfect for swimming';
                    case 'beach-hopping':
                      return 'Explore multiple pristine beaches';
                    case 'hiking':
                      return 'Scenic trails with breathtaking views';
                    case 'rock-climbing':
                      return 'Challenging climbs for all levels';
                    case 'monastery-visits':
                      return 'Historic monasteries with rich heritage';
                    case 'traditional-villages':
                      return 'Authentic Greek village experiences';
                    case 'nightlife':
                      return 'Vibrant evening entertainment';
                    case 'local-cuisine':
                      return 'Delicious traditional Greek dishes';
                    default:
                      return 'Explore and enjoy';
                  }
                };

                return (
                  <div 
                    key={activity} 
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="text-blue-600 mb-3">
                      {getActivityIcon(activity)}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 capitalize mb-1">
                      {activity.replace(/-/g, ' ')}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {getActivityDescription(activity)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="bg-gray-50 rounded-xl p-6 h-fit">
            <h3 className="text-xl font-semibold mb-4">Essential Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Best Time to Visit</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIsland.bestTime?.months.map((month) => (
                    <span key={month} className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded">
                      {month}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Weather</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p> Summer: {selectedIsland.weather?.summer}</p>
                  <p> Autumn: {selectedIsland.weather?.autumn}</p>
                  <p> Winter: {selectedIsland.weather?.winter}</p>
                  <p> Spring: {selectedIsland.weather?.spring}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Perfect For</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIsland.idealFor?.map((ideal) => (
                    <span key={ideal} className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded">
                      {ideal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transportation & Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Transportation */}
          {selectedIsland.transportation && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-semibold mb-4">Getting Around</h3>
              {selectedIsland.transportation.localBus && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Local Bus Service</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-20 text-sm font-medium">Routes:</span>
                      <span className="text-sm">{selectedIsland.transportation.localBus.routes.join(', ')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-20 text-sm font-medium">Schedule:</span>
                      <span className="text-sm">{selectedIsland.transportation.localBus.frequency}</span>
                    </li>
                  </ul>
                </div>
              )}
              {selectedIsland.transportation.facilities && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Local Facilities</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedIsland.transportation.facilities).map(([key, value]) => (
                      value && (
                        <div key={key} className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="text-xs text-gray-500">{value}</p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Contacts */}
          {selectedIsland.contacts && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-semibold mb-4">Important Contacts</h3>
              <div className="grid gap-4">
                {Object.entries(selectedIsland.contacts).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <a 
                      href={`tel:${value}`}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Connected Islands */}
        {selectedIsland.connectedIslands && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Island Connections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Direct Connections */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Ship className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold">Direct Ferry Routes</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedIsland.connectedIslands.direct.map((islandSlug) => {
                    const island = cyclades.find(i => i.slug === islandSlug);
                    return island ? (
                      <Link
                        key={islandSlug}
                        to={`/islands/${islandSlug}`}
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 py-1"
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                          <img 
                            src={`/images/islands/${islandSlug}.jpg`}
                            alt={island.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {island.name}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Nearby Islands */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-semibold">Nearby Islands</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedIsland.connectedIslands.nearby.map((islandSlug) => {
                    const island = cyclades.find(i => i.slug === islandSlug);
                    return island ? (
                      <Link
                        key={islandSlug}
                        to={`/islands/${islandSlug}`}
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 py-1"
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                          <img 
                            src={`/images/islands/${islandSlug}.jpg`}
                            alt={island.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {island.name}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Other Connections */}
              {selectedIsland.connectedIslands.other && (
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Plane className="h-6 w-6 text-indigo-600" />
                    <h3 className="text-xl font-semibold">Other Connections</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedIsland.connectedIslands.other.map((islandName) => (
                      <span 
                        key={islandName}
                        className="text-sm text-gray-600 flex items-center gap-1.5 py-1"
                      >
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                        {islandName}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Ferry Information */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
              <p className="flex items-center gap-2">
                <Ship className="h-4 w-4" />
                Ferry schedules and routes may vary by season. Check with local operators for current timetables.
              </p>
            </div>
          </div>
        )}

        {/* Highlights Grid */}
        {selectedIsland.highlights && selectedIsland.highlights.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Island Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedIsland.highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                >
                  <img 
                    src={`/images/islands/${selectedIsland.slug}/${index + 1}.jpg`}
                    alt={highlight}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-semibold text-white">{highlight}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services CTA Section - 2 columns */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Plan Your {selectedIsland.name} Trip</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Car Rental CTA */}
            <div className="relative overflow-hidden rounded-xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
              <img 
                src="/images/car-rental-cta.jpg" 
                alt="Rent a car in Cyclades" 
                className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative p-8 md:p-10 h-full flex flex-col justify-between min-h-[320px]">
                <div>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Explore {selectedIsland.name} at Your Own Pace</h3>
                  <p className="text-white/90 mb-6">
                    Discover hidden gems and scenic routes with the freedom of your own vehicle. 
                    Choose from a wide range of cars perfect for island exploration.
                  </p>
                </div>
                <Link 
                  to="/rent-a-car"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors duration-300 w-fit"
                >
                  Find Your Perfect Car
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Hotels CTA */}
            <div className="relative overflow-hidden rounded-xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
              <img 
                src="/images/hotel-cta.jpg" 
                alt="Book hotels in Cyclades" 
                className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative p-8 md:p-10 h-full flex flex-col justify-between min-h-[320px]">
                <div>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Stay in the Heart of {selectedIsland.name}</h3>
                  <p className="text-white/90 mb-6">
                    From luxury resorts to charming boutique hotels, find the perfect accommodation 
                    for your dream island getaway.
                  </p>
                </div>
                <Link 
                  to="/hotels"
                  className="inline-flex items-center gap-2 bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition-colors duration-300 w-fit"
                >
                  Browse Accommodations
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Guide CTA */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="relative px-6 py-12 sm:px-12 lg:px-16">
            <div className="md:pr-12 lg:pr-16 xl:pr-20">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Plan Your Perfect {selectedIsland.name} Experience
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Everything you need to know about {selectedIsland.name} - from insider tips to detailed itineraries.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link 
                  to={`/guides/${selectedIsland.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <BookOpen className="h-5 w-5" />
                  Travel Guide
                </Link>
                <Link 
                  to={`/planner?island=${selectedIsland.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Calendar className="h-5 w-5" />
                  Trip Planner
                </Link>
                <Link 
                  to={`/tips/${selectedIsland.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-400/20 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-400/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Sun className="h-5 w-5" />
                  Travel Tips
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}