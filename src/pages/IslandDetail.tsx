import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Navigation, Sun, Waves, Hotel as HotelIcon, Car, Map, Compass, Calendar } from 'lucide-react';
import { useIslandStore } from '../store/islandStore';
import { useHotelStore } from '../store/hotelStore';
import { useVehicleStore } from '../store/vehicleStore';
import SearchBar from '../components/SearchBar';
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
  const { id: slug } = useParams();
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

      <div className="bg-white pt-16">
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
            <div className="h-full flex flex-col justify-between py-12">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-white/90 mb-4">
                  <MapPin className="h-5 w-5" />
                  <span>Cyclades, Greece</span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-6">
                  {selectedIsland.name}
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  {selectedIsland.quote}
                </p>
                <div className="flex items-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5" />
                    <span>{selectedIsland.weather.temp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Waves className="h-5 w-5" />
                    <span>{selectedIsland.weather.condition}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="h-5 w-5" />
                    <span>{selectedIsland.activities} Activities</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full max-w-2xl mx-auto">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="border-b sticky top-16 bg-white z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto py-4 gap-8">
              <a href="#highlights" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 whitespace-nowrap">
                <Compass className="h-5 w-5" />
                <span>Highlights</span>
              </a>
              <a href="#transport" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 whitespace-nowrap">
                <Navigation className="h-5 w-5" />
                <span>Getting Here</span>
              </a>
              <a href="#best-time" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 whitespace-nowrap">
                <Calendar className="h-5 w-5" />
                <span>Best Time to Visit</span>
              </a>
              <a href="#hotels" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 whitespace-nowrap">
                <HotelIcon className="h-5 w-5" />
                <span>Where to Stay</span>
              </a>
              <a href="#activities" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 whitespace-nowrap">
                <Map className="h-5 w-5" />
                <span>Things to Do</span>
              </a>
              <a href="#car-rental" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 whitespace-nowrap">
                <Car className="h-5 w-5" />
                <span>Car Rental</span>
              </a>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Highlights Section */}
          <section id="highlights">
            <h2 className="text-3xl font-bold mb-8">Highlights of {selectedIsland.name}</h2>
            <IslandHighlights island={selectedIsland} />
          </section>

          {/* Transport Section */}
          <section id="transport">
            <h2 className="text-3xl font-bold mb-8">Getting to {selectedIsland.name}</h2>
            <TransportInfo island={selectedIsland} />
          </section>

          {/* Best Time to Visit */}
          <section id="best-time">
            <h2 className="text-3xl font-bold mb-8">Best Time to Visit</h2>
            <BestTimeToVisit island={selectedIsland} />
          </section>

          {/* Where to Stay */}
          <section id="hotels">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Where to Stay in {selectedIsland.name}</h2>
              <Link to="/hotels" className="text-blue-600 hover:text-blue-700">
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

          {/* Car Rental */}
          <section id="car-rental">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold">Rent a Car in {selectedIsland.name}</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Provided by</span>
                <img
                  src="https://rentacarantiparos.gr/wp-content/uploads/2024/03/Aggelos-Rentals-Logo-Small.png"
                  alt="AGGELOS Rentals"
                  className="h-8"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {vehicles.slice(0, 3).map((vehicle) => (
                <Link key={vehicle.id} to={`/rent-a-car/${vehicle.id}`}>
                  <VehicleCard vehicle={vehicle} compact />
                </Link>
              ))}
            </div>
          </section>

          {/* Local Tips Section */}
          <section id="tips">
            <h2 className="text-3xl font-bold mb-8">Local Tips</h2>
            <LocalTips island={selectedIsland} />
          </section>
        </div>
      </div>
    </>
  );
}