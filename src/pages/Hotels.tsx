import { useState, useEffect } from 'react';
import { Search, Star, MapPin, Building2, CalendarDays } from 'lucide-react';
import { hotels } from '../data/hotelsData';
import { cyclades } from '../data/islandsData';
import HotelCard from '../components/cards/HotelCard';
import SEO from '../components/SEO';
import { Hotel } from '../types/hotel';

const propertyTypes = [
  { id: 'all', name: 'All Properties' },
  { id: 'hotel', name: 'Hotels' },
  { id: 'resort', name: 'Resorts' },
  { id: 'villa', name: 'Villas' },
  { id: 'apartment', name: 'Apartments' }
];

export default function Hotels() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedIsland, setSelectedIsland] = useState('All Islands');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(hotels);
  const [visibleHotels, setVisibleHotels] = useState<Hotel[]>([]);
  const [page, setPage] = useState(1);
  const hotelsPerPage = 8;

  // Get unique islands that have hotels
  const availableIslands = Array.from(new Set(hotels.map(hotel => hotel.location.island))).sort();

  // Get all Cyclades islands
  const allIslands = cyclades
    .map(island => island.name)
    .filter((name): name is string => name !== undefined)
    .sort();

  // Create island options with availability status
  const islandOptions = allIslands.map(island => ({
    name: island,
    hasHotels: availableIslands.includes(island)
  }));

  const filterHotels = () => {
    let filtered = [...hotels];

    // Filter by island
    if (selectedIsland !== 'All Islands') {
      filtered = filtered.filter(hotel => hotel.location.island === selectedIsland);
    }

    // Filter by property type
    if (selectedType !== 'all') {
      filtered = filtered.filter(hotel => hotel.category.toLowerCase() === selectedType);
    }

    // Filter by dates (if implemented with availability)
    if (checkIn && checkOut) {
      // Here you would typically check against actual availability data
      // For now, we'll just keep all hotels that match other criteria
    }

    // Sort hotels
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.priceRange.min - b.priceRange.min;
        case 'price_high':
          return b.priceRange.min - a.priceRange.min;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return b.reviews - a.reviews;
      }
    });

    setFilteredHotels(filtered);
    setPage(1); // Reset to first page when filters change
  };

  useEffect(() => {
    filterHotels();
  }, [selectedType, selectedIsland, checkIn, checkOut, sortBy]);

  useEffect(() => {
    const startIndex = (page - 1) * hotelsPerPage;
    const endIndex = startIndex + hotelsPerPage;
    setVisibleHotels(filteredHotels.slice(0, endIndex));
  }, [filteredHotels, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const seoData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Hotels in Cyclades",
    "description": "Find and book the best hotels across the Cyclades islands. From luxury resorts to boutique stays.",
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Hotels in Cyclades | Find Your Perfect Stay"
        description="Book your perfect stay in the Cyclades islands. Browse our curated selection of hotels, from luxury resorts to boutique accommodations."
        jsonLD={seoData}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hotels/hero.jpg"
            alt="Luxury Hotels in Cyclades"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/80 to-blue-800/70" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-24 lg:pt-32 pb-24 lg:pb-32">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
              {/* Left Column - Text (30%) */}
              <div className="w-full lg:w-[30%] text-center lg:text-left space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                  Luxury Hotels
                </h1>
                <p className="text-base md:text-lg text-blue-100/90 leading-relaxed">
                  Experience unparalleled luxury in the heart of the Cyclades. From boutique hotels to seaside resorts, find your perfect stay.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start text-sm">
                  <div className="flex items-center gap-2 text-blue-100/80">
                    <Star className="w-5 h-5 text-blue-400" />
                    <span>5-Star Comfort</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100/80">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span>Prime Locations</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Search Form (70%) */}
              <div className="w-full lg:w-[70%] mt-8 lg:mt-0">
                <div className="bg-white/[0.08] backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <div className="space-y-6">
                    {/* Search Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Island Selection */}
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Island
                        </label>
                        <div className="relative">
                          <select
                            value={selectedIsland}
                            onChange={(e) => setSelectedIsland(e.target.value)}
                            className="w-full px-6 py-4 pl-12 bg-white/[0.06] rounded-xl border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-shadow appearance-none"
                          >
                            <option value="All Islands" className="text-gray-900">All Islands</option>
                            {islandOptions.map(island => (
                              <option 
                                key={island.name} 
                                value={island.name} 
                                className={`text-gray-900 ${!island.hasHotels ? 'text-gray-400' : ''}`}
                                disabled={!island.hasHotels}
                              >
                                {island.name} {!island.hasHotels ? '(Coming Soon)' : ''}
                              </option>
                            ))}
                          </select>
                          <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                        </div>
                      </div>

                      {/* Property Type */}
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Property Type
                        </label>
                        <div className="relative">
                          <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full px-6 py-4 pl-12 bg-white/[0.06] rounded-xl border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-shadow appearance-none"
                          >
                            {propertyTypes.map(type => (
                              <option key={type.id} value={type.id} className="text-gray-900">
                                {type.name}
                              </option>
                            ))}
                          </select>
                          <Building2 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                        </div>
                      </div>

                      {/* Check In */}
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Check In
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-6 py-4 pl-12 bg-white/[0.06] rounded-xl border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-shadow appearance-none [color-scheme:dark]"
                            placeholder="Check-in"
                          />
                          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                        </div>
                      </div>

                      {/* Check Out */}
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Check Out
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            min={checkIn || new Date().toISOString().split('T')[0]}
                            className="w-full px-6 py-4 pl-12 bg-white/[0.06] rounded-xl border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-shadow appearance-none [color-scheme:dark]"
                            placeholder="Check-out"
                          />
                          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                        </div>
                      </div>
                    </div>

                    {/* Search Button */}
                    <button
                      onClick={filterHotels}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2 mt-4"
                    >
                      <Search className="w-5 h-5" />
                      <span>Search Properties</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {filteredHotels.length} {filteredHotels.length === 1 ? 'property' : 'properties'} found
              </h2>
              {selectedIsland !== 'All Islands' && (
                <p className="text-gray-600">in {selectedIsland}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-sm">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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
                <option value="popular">Most Popular</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>
          </div>

          {/* Hotel Grid */}
          {visibleHotels.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
              {/* Load More Button */}
              {visibleHotels.length < filteredHotels.length && (
                <div className="mt-12 text-center">
                  <button 
                    onClick={loadMore}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Load More Properties
                  </button>
                </div>
              )}
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
                    setCheckIn('');
                    setCheckOut('');
                    setSortBy('popular');
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
    </div>
  );
}