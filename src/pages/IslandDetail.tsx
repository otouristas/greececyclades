import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Sun, Plane, Ship, Calendar, Users, ArrowRight, BookOpen } from 'lucide-react';
import { useIslandStore } from '../store/islandStore';
import { useHotelStore } from '../store/hotelStore';
import { useVehicleStore } from '../store/vehicleStore';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import HotelCard from '../components/cards/HotelCard';
import VehicleCard from '../components/vehicles/VehicleCard';
import { slugify } from '../utils/slugify';
import { SITE_TAGLINE } from '../constants/seo';

export default function IslandDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { islands, selectedIsland, setSelectedIsland } = useIslandStore();
  const { hotels, fetchHotelsByIsland } = useHotelStore();
  const { vehicles } = useVehicleStore();

  useEffect(() => {
    if (slug && islands.length > 0) {
      const island = islands.find(
        island => slugify(island.name) === slug
      );
      if (island) {
        setSelectedIsland(island);
        // Fetch hotels for this specific island
        fetchHotelsByIsland(island.name);
      } else {
        navigate('/islands');
      }
    }
  }, [slug, islands, navigate, setSelectedIsland, fetchHotelsByIsland]);

  if (!selectedIsland) return null;

  // Filter vehicles for this specific island
  const islandVehicles = vehicles.filter(vehicle => 
    vehicle.location === 'All Locations' || 
    vehicle.location.toLowerCase().includes(selectedIsland.name.toLowerCase())
  );

  // Get only the first 3 hotels and vehicles for preview
  const previewHotels = hotels.slice(0, 3);
  const previewVehicles = islandVehicles.slice(0, 3);

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
          className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-1000"
          style={{
            backgroundImage: `url("${selectedIsland.heroImage}")`,
            transform: 'translateZ(0)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        
        {/* Content overlay */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex flex-col justify-between py-8 md:py-12">
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
                  <p className="text-[10px] md:text-xs opacity-80">{selectedIsland.bestTime.months.join(', ')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4 text-white">
                  <Sun className="h-4 w-4 md:h-5 md:w-5 mb-1.5 md:mb-2" />
                  <p className="text-xs md:text-sm font-medium">Weather</p>
                  <p className="text-[10px] md:text-xs opacity-80">{selectedIsland.weather.summer}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4 text-white">
                  <Users className="h-4 w-4 md:h-5 md:w-5 mb-1.5 md:mb-2" />
                  <p className="text-xs md:text-sm font-medium">Perfect For</p>
                  <p className="text-[10px] md:text-xs opacity-80">{selectedIsland.idealFor.slice(0, 2).join(', ')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4 text-white">
                  <Ship className="h-4 w-4 md:h-5 md:w-5 mb-1.5 md:mb-2" />
                  <p className="text-xs md:text-sm font-medium">Getting Here</p>
                  <p className="text-[10px] md:text-xs opacity-80">Ferry & Air Travel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: 'Islands', path: '/islands' },
              { label: selectedIsland.name, path: `/islands/${slug}` }
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="prose prose-lg max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Discover {selectedIsland.name}</h2>
          <p className="text-gray-600 leading-relaxed">
            {selectedIsland.description}
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedIsland.highlights.map((highlight, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <p className="font-medium text-gray-900">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Where to Stay */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Where to Stay in {selectedIsland.name}</h2>
              <p className="text-gray-600 mt-2">Handpicked accommodations for your perfect stay</p>
            </div>
            <button className="text-blue-600 flex items-center gap-2 hover:text-blue-700">
              View all accommodations <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          {previewHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {previewHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No hotels available for {selectedIsland.name} at the moment.</p>
            </div>
          )}
        </section>

        {/* How to Get Here */}
        <section className="mb-16 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8">How to Get Here</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Ship className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-xl mb-2">By Ferry</h3>
                  <p className="text-gray-600">Regular ferry connections from Piraeus port in Athens, with journey times varying from 3 to 5 hours depending on the type of ferry.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Plane className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-xl mb-2">By Air</h3>
                  <p className="text-gray-600">Direct flights available from Athens International Airport, with flight duration of approximately 45 minutes.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-xl mb-4">Travel Tips</h3>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Book ferry tickets in advance during peak season</li>
                <li>✓ Check multiple ferry operators for best prices</li>
                <li>✓ Consider flying for shorter travel time</li>
                <li>✓ Look for combo tickets with island hopping options</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Car Rental */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Rent a Vehicle in {selectedIsland.name}</h2>
              <p className="text-gray-600 mt-2">Explore the island at your own pace</p>
            </div>
            <button className="text-blue-600 flex items-center gap-2 hover:text-blue-700">
              View all vehicles <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          {previewVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {previewVehicles.map((vehicle) => (
                <Link 
                  key={vehicle.id} 
                  to="/rent-a-car"
                  className="block transform transition-transform hover:scale-105"
                >
                  <VehicleCard vehicle={vehicle} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No vehicles available for {selectedIsland.name} at the moment.</p>
            </div>
          )}
        </section>

        {/* Travel Guide Call-to-Action */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="absolute inset-0 mix-blend-multiply opacity-20" 
                 style={{
                   backgroundImage: `url(${selectedIsland.image})`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 }} 
            />
            <div className="relative px-8 py-12 flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">
                  Discover {selectedIsland.name} Like a Local
                </h2>
                <p className="text-white/90 text-lg max-w-xl">
                  Get insider tips, hidden gems, and detailed guides for making the most of your stay in {selectedIsland.name}. 
                  Our comprehensive travel guide has everything you need to know.
                </p>
              </div>
              <Link 
                to={`/travel-guide/${slugify(selectedIsland.name)}`}
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                Read Travel Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Island Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {selectedIsland.mustSee.map((highlight, index) => (
              <div 
                key={index}
                className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer"
              >
                <img 
                  src={`/images/highlights/${slugify(highlight)}.jpg`} 
                  alt={highlight}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-semibold text-white">{highlight}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}