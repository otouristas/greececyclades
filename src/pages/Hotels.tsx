import { useState, useEffect } from 'react';
import { Building2, Car, Search, MapPin, Wifi, Waves, UtensilsCrossed, Sparkles, Umbrella, Users, CalendarDays } from 'lucide-react';
import { useHotelStore } from '../store/hotelStore';
import HotelCard from '../components/cards/HotelCard';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE_TAGLINE } from '../constants/seo';

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

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Hotels in Cyclades Islands",
    "description": "Browse and book hotels across the Cyclades islands of Greece",
    "itemListElement": hotels.map((hotel, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Hotel",
        "name": hotel.name,
        "description": hotel.description,
        "image": hotel.images[0],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": hotel.location.area,
          "addressRegion": hotel.location.island,
          "addressCountry": "Greece"
        },
        "priceRange": hotel.priceRange,
        "amenityFeature": hotel.amenities.map(amenity => ({
          "@type": "LocationFeatureSpecification",
          "name": amenity
        }))
      }
    }))
  };

  return (
    <>
      <SEO 
        title="Hotels in Cyclades | Greece Cyclades"
        description={`Find and book hotels in the Greek Islands. ${SITE_TAGLINE}`}
      />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2670&auto=format&fit=crop"
            alt="Luxury Hotel in Cyclades"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        </div>

        {/* Hero Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content */}
          <div className="pt-32 lg:pt-40 pb-40 lg:pb-48">
            <div className="max-w-2xl mx-auto text-center text-white space-y-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Find Perfect Hotels in<br />
                <span className="text-blue-400">Greek Islands</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl mx-auto">
                Discover luxury hotels, boutique resorts, and stunning villas across the Cyclades islands.
              </p>
            </div>

            {/* Search Form */}
            <div className="max-w-3xl mx-auto mt-12">
              <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/20 shadow-xl">
                <form onSubmit={(e) => { e.preventDefault(); handleFiltersChange(); }} className="space-y-6">
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Island
                        </label>
                        <div className="relative">
                          <select
                            value={selectedIsland}
                            onChange={(e) => setSelectedIsland(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white appearance-none"
                            style={{
                              backgroundImage: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none'
                            }}
                          >
                            {islands.map(island => (
                              <option key={island} value={island} className="text-gray-900">
                                {island}
                              </option>
                            ))}
                          </select>
                          <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Property Type
                        </label>
                        <div className="relative">
                          <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white appearance-none"
                            style={{
                              backgroundImage: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none'
                            }}
                          >
                            {propertyTypes.map(type => (
                              <option key={type.id} value={type.id} className="text-gray-900">
                                {type.label}
                              </option>
                            ))}
                          </select>
                          <Building2 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Check In
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white appearance-none [color-scheme:dark]"
                            style={{
                              backgroundImage: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none'
                            }}
                          />
                          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Check Out
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            min={checkIn || new Date().toISOString().split('T')[0]}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white appearance-none [color-scheme:dark]"
                            style={{
                              backgroundImage: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none'
                            }}
                          />
                          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out"
                  >
                    Search Hotels
                  </button>
                </form>
              </div>
            </div>

            {/* Features */}
            <div className="max-w-4xl mx-auto mt-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 text-center">
                  <div className="bg-blue-400/20 rounded-full p-2 w-10 h-10 mx-auto mb-2">
                    <Building2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-sm text-white">Best Selection</h3>
                  <p className="text-xs text-white/80">Handpicked hotels</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 text-center">
                  <div className="bg-blue-400/20 rounded-full p-2 w-10 h-10 mx-auto mb-2">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-sm text-white">Best Price</h3>
                  <p className="text-xs text-white/80">Price match guarantee</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 text-center">
                  <div className="bg-blue-400/20 rounded-full p-2 w-10 h-10 mx-auto mb-2">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-sm text-white">24/7 Support</h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Listings */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Available Properties</h2>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-blue-600">{hotels.length}</span>
                  <span className="text-gray-600">{hotels.length === 1 ? 'property' : 'properties'} found</span>
                  {selectedIsland !== 'All Islands' && (
                    <span className="text-gray-600">in {selectedIsland}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-600 text-sm">Sort by:</span>
                <select 
                  className="min-w-[180px] pl-4 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-colors cursor-pointer"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                  }}
                >
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Rating: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
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