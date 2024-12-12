import { useState, useEffect } from 'react';
import { Building2, Car, Search, MapPin, Wifi, Waves, UtensilsCrossed, Sparkles, Umbrella, Users, CalendarDays } from 'lucide-react';
import { useHotelStore } from '../store/hotelStore';
import HotelCard from '../components/cards/HotelCard';
import SEO from '../components/SEO';

const propertyTypes = [
  { id: 'all', label: 'All Properties' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'boutique', label: 'Boutique' },
  { id: 'resort', label: 'Resort' },
  { id: 'villa', label: 'Villa' },
  { id: 'apartment', label: 'Apartment' }
];

const amenities = [
  { id: 'WiFi', label: 'WiFi', icon: Wifi },
  { id: 'Pool', label: 'Pool', icon: Waves },
  { id: 'Restaurant', label: 'Restaurant', icon: UtensilsCrossed },
  { id: 'Spa', label: 'Spa', icon: Sparkles },
  { id: 'Airport Transfer', label: 'Airport Transfer', icon: Car },
  { id: 'Room Service', label: 'Room Service', icon: UtensilsCrossed },
  { id: 'Beach Access', label: 'Beach Access', icon: Umbrella },
  { id: 'Fitness Center', label: 'Fitness Center', icon: Users },
  { id: 'Bar', label: 'Bar', icon: UtensilsCrossed },
  { id: 'Concierge', label: 'Concierge', icon: Users }
];

const islands = [
  'All Islands',
  'Amorgos',
  'Anafi',
  'Andros',
  'Antiparos',
  'Delos',
  'Folegandros',
  'Ios',
  'Kea',
  'Kimolos',
  'Koufonisia',
  'Kythnos',
  'Milos',
  'Mykonos',
  'Naxos',
  'Paros',
  'Santorini',
  'Serifos',
  'Sifnos',
  'Sikinos',
  'Syros',
  'Tinos'
];

const generateHotelsSEO = () => ({
  title: "Luxury Hotels in the Cyclades Islands | Touristas AI",
  description: "Discover the finest luxury hotels and resorts across the Cyclades islands. From Santorini's caldera views to Mykonos' beachfront villas."
});

const generateHotelsJsonLD = () => ({
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "Cyclades Luxury Hotels",
  "description": "Luxury hotels and resorts in the Cyclades islands",
  "url": "https://touristas.ai/hotels",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Cyclades Islands",
    "containedInPlace": {
      "@type": "Country",
      "name": "Greece"
    }
  }
});

export default function Hotels() {
  const { hotels, searchHotels, fetchHotelsByIsland } = useHotelStore();
  const [selectedType, setSelectedType] = useState('all');
  const [selectedIsland, setSelectedIsland] = useState('All Islands');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [priceRange] = useState([0, 2000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  useEffect(() => {
    fetchHotelsByIsland(selectedIsland);
  }, []);

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(a => a !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleFiltersChange = () => {
    searchHotels({
      island: selectedIsland,
      category: selectedType === 'all' ? undefined : selectedType,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      amenities: selectedAmenities,
      checkIn,
      checkOut
    });
  };

  useEffect(() => {
    handleFiltersChange();
  }, [selectedType, selectedIsland, priceRange, selectedAmenities, checkIn, checkOut]);

  const seoData = generateHotelsSEO();
  const jsonLD = generateHotelsJsonLD();

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        jsonLD={jsonLD}
      />
      
      {/* Hero Section with Search */}
      <div className="relative min-h-[85vh] lg:h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero/santorini-hotels.jpg" 
            alt="Luxury hotels in Cyclades" 
            className="w-full h-full object-cover brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
          <div className="h-full grid lg:grid-cols-2 gap-8 items-center">
            {/* Hero Content */}
            <div className="text-white space-y-4 lg:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Luxury Stays in<br />
                <span className="text-blue-400">The Cyclades</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed">
                Experience unparalleled luxury in the heart of the Greek islands. 
                From boutique hotels to stunning resorts, find your perfect stay.
              </p>
              
              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 lg:mt-8">
                <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/20">
                  <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mb-2" />
                  <h3 className="font-semibold text-sm sm:text-base">Premium Properties</h3>
                  <p className="text-xs sm:text-sm text-white/80">Hand-picked luxury accommodations</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/20">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mb-2" />
                  <h3 className="font-semibold text-sm sm:text-base">Exclusive Amenities</h3>
                  <p className="text-xs sm:text-sm text-white/80">World-class facilities and services</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/20">
                  <Waves className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mb-2" />
                  <h3 className="font-semibold text-sm sm:text-base">Sea Views</h3>
                  <p className="text-xs sm:text-sm text-white/80">Breathtaking Aegean vistas</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/20">
                  <Car className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mb-2" />
                  <h3 className="font-semibold text-sm sm:text-base">Transfer Service</h3>
                  <p className="text-xs sm:text-sm text-white/80">Complimentary airport transfers</p>
                </div>
              </div>
            </div>

            {/* Search Form */}
            <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20">
              <div className="space-y-3 sm:space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedIsland}
                    onChange={(e) => setSelectedIsland(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-lg border border-white/30 text-gray-800 focus:ring-2 focus:ring-blue-500"
                  >
                    {islands.map((island) => (
                      <option key={island} value={island}>{island}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-lg border border-white/30 text-gray-800 focus:ring-2 focus:ring-blue-500"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-lg border border-white/30 text-gray-800 focus:ring-2 focus:ring-blue-500"
                      placeholder="Check-in"
                    />
                  </div>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-lg border border-white/30 text-gray-800 focus:ring-2 focus:ring-blue-500"
                      placeholder="Check-out"
                    />
                  </div>
                </div>

                <button
                  onClick={handleFiltersChange}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200"
                >
                  <Search className="w-5 h-5" />
                  Search Hotels
                </button>

                <div className="flex flex-wrap gap-2 mt-4">
                  {amenities.slice(0, 5).map((amenity) => (
                    <button
                      key={amenity.id}
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition duration-200 ${
                        selectedAmenities.includes(amenity.id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <amenity.icon className="w-4 h-4" />
                      {amenity.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Listings */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Available Properties</h2>
              <p className="mt-2 text-lg text-gray-600">
                {hotels.length} {hotels.length === 1 ? 'property' : 'properties'} found
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <span className="text-gray-600">Sort by:</span>
              <select className="pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          {/* Hotel Grid */}
          {hotels.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {hotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
              {/* Load More Button */}
              <div className="mt-12 text-center">
                <button className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Load More Properties
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto">
                <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No properties found</h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your search criteria or exploring different dates.
                </p>
                <button
                  onClick={() => {
                    setSelectedIsland('All Islands');
                    setSelectedType('all');
                    setSelectedAmenities([]);
                    setCheckIn('');
                    setCheckOut('');
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}