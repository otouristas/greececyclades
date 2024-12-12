import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Navigation, Sun, Waves, Hotel as HotelIcon, Car, Map, Compass, Calendar, Clock, Users, Sailboat, Info } from 'lucide-react';
import { useIslandStore } from '../store/islandStore';
import { useHotelStore } from '../store/hotelStore';
import { useVehicleStore } from '../store/vehicleStore';
import TransportInfo from '../components/islands/TransportInfo';
import BestTimeToVisit from '../components/islands/BestTimeToVisit';
import IslandHighlights from '../components/islands/IslandHighlights';
import LocalTips from '../components/islands/LocalTips';
import HotelCard from '../components/cards/HotelCard';
import VehicleCard from '../components/vehicles/VehicleCard';
import SEO from '../components/SEO';
import { Hotel } from '../types/hotel';
import { getIslandSlug } from '../utils/slugify';
import { generateIslandDetailSEO } from '../utils/seo';

export default function IslandDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { islands, selectedIsland, setSelectedIsland } = useIslandStore();
  const { hotels } = useHotelStore();
  const { vehicles } = useVehicleStore();

  useEffect(() => {
    if (slug && islands.length > 0) {
      const island = islands.find(
        island => getIslandSlug(island.name) === slug
      );
      if (island) {
        setSelectedIsland(island);
      } else {
        navigate('/islands');
      }
    }
  }, [slug, islands, navigate, setSelectedIsland]);

  if (!selectedIsland) return null;

  return (
    <>
      <SEO {...generateIslandDetailSEO(
        selectedIsland.name,
        selectedIsland.description,
        selectedIsland.image
      )} />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative h-[70vh]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${selectedIsland.image}")`
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-full flex flex-col justify-center py-12">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-white/90 mb-4">
                  <MapPin className="h-5 w-5" />
                  <span>Cyclades, Greece</span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-6">
                  {selectedIsland.name}
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  {selectedIsland.shortDescription}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5" />
                    <span>{selectedIsland.weather.temp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Waves className="h-5 w-5" />
                    <span>{selectedIsland.weather.condition}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>Best Time: {selectedIsland.bestTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>Ideal for: {selectedIsland.idealFor.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow-lg py-6 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="#hotels" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <HotelIcon className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-blue-900">Book Hotels</span>
              </Link>
              <Link to="#car-rental" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Car className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-blue-900">Rent a Car</span>
              </Link>
              <Link to="#transport" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Sailboat className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-blue-900">Ferry Times</span>
              </Link>
              <Link to={`/guides/${selectedIsland.name.toLowerCase()}`} className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Info className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-blue-900">Full Guide</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Where to Stay */}
          <section id="hotels" className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Where to Stay</h2>
                <p className="text-gray-600">Best hotels and accommodations in {selectedIsland.name}</p>
              </div>
              <Link to="/hotels" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View all hotels
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.slice(0, 3).map((hotel) => {
                const mappedHotel: Hotel = {
                  id: hotel.id || '',
                  name: hotel.name || '',
                  location: {
                    island: selectedIsland?.name || '',
                    area: selectedIsland?.name || '',
                    coordinates: {
                      latitude: 0,
                      longitude: 0
                    }
                  },
                  category: 'Resort',
                  priceRange: {
                    min: hotel.priceRange?.min || 0,
                    max: hotel.priceRange?.max || 0,
                    currency: hotel.priceRange?.currency || 'EUR'
                  },
                  starRating: 4,
                  keyFeatures: [],
                  shortDescription: hotel.description || '',
                  description: hotel.description || '',
                  rooms: [],
                  amenities: [],
                  images: {
                    main: '',
                    gallery: []
                  }
                };
                return <HotelCard key={hotel.id} hotel={mappedHotel} />;
              })}
            </div>
          </section>

          {/* Transport Section */}
          <section id="transport" className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Getting Here</h2>
                <p className="text-gray-600">Ferry schedules and transportation options</p>
              </div>
              <a href="#" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Book Ferry
              </a>
            </div>
            <TransportInfo island={selectedIsland} />
          </section>

          {/* Car Rental */}
          <section id="car-rental" className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Rent a Car</h2>
                <p className="text-gray-600">Available vehicles in {selectedIsland.name}</p>
              </div>
              <Link to="/rent-a-car" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View all vehicles
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {vehicles.slice(0, 3).map((vehicle) => (
                <Link key={vehicle.id} to={`/rent-a-car/${vehicle.id}`}>
                  <VehicleCard vehicle={vehicle} compact />
                </Link>
              ))}
            </div>
          </section>

          {/* Highlights Section */}
          <section id="highlights" className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Island Highlights</h2>
                <p className="text-gray-600">Must-see places and experiences</p>
              </div>
              <Link to={`/guides/${selectedIsland.name.toLowerCase()}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Read full guide
              </Link>
            </div>
            <IslandHighlights island={selectedIsland} />
          </section>
        </div>
      </div>
    </>
  );
}