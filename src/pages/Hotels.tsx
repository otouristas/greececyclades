import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Building2, Home, Hotel, Umbrella, Palmtree, Moon, Mountain, Car, Search, MapPin } from 'lucide-react';
import { useHotelStore } from '../store/hotelStore';
import { generateHotelsSEO, generateHotelsListingJsonLD } from '../utils/seoMetadata';
import HotelCard from '../components/hotels/HotelCard';

const propertyTypes = [
  { id: 'all', label: 'All', icon: Building2 },
  { id: 'Luxury', label: 'Luxury', icon: Hotel },
  { id: 'Boutique', label: 'Boutique', icon: Home },
  { id: 'Mid-range', label: 'Mid-range', icon: Umbrella },
  { id: 'Budget', label: 'Budget', icon: Hotel }
];

const features = [
  { id: 'beach', label: 'Near Beach', icon: Palmtree },
  { id: 'quiet', label: 'Quiet Area', icon: Moon },
  { id: 'view', label: 'Sea View', icon: Mountain },
  { id: 'parking', label: 'Free Parking', icon: Car }
];

const islands = ['All Islands', 'Santorini', 'Mykonos', 'Naxos', 'Milos', 'Paros', 'Sifnos'];

export default function Hotels() {
  const { hotels, searchHotels, fetchHotelsByIsland } = useHotelStore();
  const [selectedType, setSelectedType] = useState('all');
  const [selectedIsland, setSelectedIsland] = useState('All Islands');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  useEffect(() => {
    fetchHotelsByIsland(selectedIsland);
  }, []);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
  };

  const handleFiltersChange = () => {
    searchHotels({
      island: selectedIsland,
      category: selectedType === 'all' ? undefined : selectedType,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      amenities: selectedFeatures
    });
  };

  useEffect(() => {
    handleFiltersChange();
  }, [selectedType, selectedIsland, priceRange, selectedFeatures]);

  const seoData = generateHotelsSEO();
  const structuredData = generateHotelsListingJsonLD(hotels.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    description: hotel.description,
    category: hotel.category,
    island: hotel.location.island,
    image: hotel.images.main
  })));

  return (
    <>
      <SEO {...seoData} structuredData={structuredData} />
      
      {/* Hero Section with Search */}
      <div className="relative">
        <div className="absolute inset-0">
          <img 
            src="/images/hero/santorini-hotels.jpg" 
            alt="Luxury hotels in Cyclades" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Find Your Perfect Stay in Paradise
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover handpicked luxury hotels and boutique stays across the stunning Cyclades islands
            </p>

            {/* Quick Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <select
                    value={selectedIsland}
                    onChange={(e) => setSelectedIsland(e.target.value)}
                    className="w-full border-0 focus:ring-0"
                  >
                    {islands.map((island) => (
                      <option key={island} value={island}>{island}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">Property Type</label>
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full border-0 focus:ring-0"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                onClick={handleFiltersChange}
              >
                <Search className="h-5 w-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Advanced Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Advanced Filters</h2>
            <button 
              onClick={() => {
                setSelectedType('all');
                setSelectedIsland('All Islands');
                setPriceRange([0, 2000]);
                setSelectedFeatures([]);
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Reset All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (€)</label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Min"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Features Filter */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              <div className="flex flex-wrap gap-2">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  const isSelected = selectedFeatures.includes(feature.id);
                  return (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-colors ${
                        isSelected
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {feature.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            {hotels.length} {hotels.length === 1 ? 'Property' : 'Properties'} Found
          </h2>
          <div className="text-gray-600">
            Showing all results in {selectedIsland}
          </div>
        </div>

        {/* Hotel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </>
  );
}