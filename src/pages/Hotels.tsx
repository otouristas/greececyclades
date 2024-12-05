import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Star, MapPin, Wifi, Waves, UtensilsCrossed, Sparkles, Building2, Home, Hotel, Umbrella, Palmtree, Moon, Mountain, Car, LucideIcon } from 'lucide-react';
import { useHotelStore } from '../store/hotelStore';
import { generateSlug, generateHotelsSEO, generateHotelsListingJsonLD } from '../utils/seo';
import { formatPrice } from '../utils/price';

const amenityIcons: Record<string, LucideIcon> = {
  'WiFi': Wifi,
  'Pool': Waves,
  'Restaurant': UtensilsCrossed,
  'Spa': Sparkles,
  'Private Pool': Waves,
  'Fine Dining': UtensilsCrossed,
  'Bar': UtensilsCrossed,
  'Sea View': Mountain,
  'Room Service': UtensilsCrossed,
  'Airport Transfer': Car,
  'Infinity Pool': Waves
};

const propertyTypes = [
  { id: 'all', label: 'All', icon: Building2 },
  { id: 'hotel', label: 'Hotels', icon: Hotel },
  { id: 'villa', label: 'Villas', icon: Home },
  { id: 'resort', label: 'Resorts', icon: Umbrella },
  { id: 'boutique', label: 'Boutique', icon: Hotel }
];

const features = [
  { id: 'beach', label: 'Near Beach', icon: Palmtree },
  { id: 'quiet', label: 'Quiet Area', icon: Moon },
  { id: 'view', label: 'Sea View', icon: Mountain },
  { id: 'parking', label: 'Free Parking', icon: Car }
];

const islands = ['All Islands', 'Santorini', 'Mykonos', 'Naxos', 'Milos', 'Paros'];

export default function Hotels() {
  const { hotels } = useHotelStore();
  const [selectedType, setSelectedType] = useState('all');
  const [selectedIsland, setSelectedIsland] = useState('All Islands');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
  };

  const filteredHotels = hotels.filter(hotel => {
    // Filter by property type
    if (selectedType !== 'all' && hotel.type !== selectedType) return false;
    
    // Filter by island
    if (selectedIsland !== 'All Islands' && hotel.island !== selectedIsland) return false;
    
    // Filter by price range
    const priceValue = typeof hotel.price === 'object' ? hotel.price.from : parseFloat(hotel.price);
    if (priceValue < priceRange[0] || priceValue > priceRange[1]) return false;
    
    // Filter by selected features
    if (selectedFeatures.length > 0) {
      const hotelFeatures = hotel.amenities.map(a => a.toLowerCase());
      const hasAllFeatures = selectedFeatures.every(feature => {
        switch (feature) {
          case 'beach':
            return hotelFeatures.some(f => f.includes('beach') || f.includes('seaside'));
          case 'quiet':
            return hotelFeatures.some(f => f.includes('quiet') || f.includes('private'));
          case 'view':
            return hotelFeatures.some(f => f.includes('view'));
          case 'parking':
            return hotelFeatures.some(f => f.includes('parking') || f.includes('valet'));
          default:
            return false;
        }
      });
      if (!hasAllFeatures) return false;
    }
    
    return true;
  });

  const seoData = generateHotelsSEO();
  const structuredData = generateHotelsListingJsonLD(filteredHotels.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    description: hotel.description,
    type: hotel.type,
    island: hotel.island,
    image: hotel.images[0]
  })));

  return (
    <>
      <SEO {...seoData} structuredData={structuredData} />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative h-[50vh] min-h-[400px] bg-cover bg-center" 
             style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80")' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              Luxury Stays in the Cyclades
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Discover handpicked luxury accommodations across the stunning Cyclades islands. 
              From clifftop hotels in Santorini to beachfront villas in Mykonos.
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white shadow-lg relative -mt-10 max-w-6xl mx-auto rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {propertyTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                        selectedType === type.id
                          ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                          : 'bg-gray-50 text-gray-600 border-2 border-gray-100 hover:bg-gray-100'
                      }`}
                    >
                      <type.icon className="h-4 w-4" />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Island</label>
                <select
                  value={selectedIsland}
                  onChange={(e) => setSelectedIsland(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-gray-50"
                >
                  {islands.map(island => (
                    <option key={island} value={island}>{island}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                <div className="grid grid-cols-2 gap-2">
                  {features.map(feature => (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`p-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                        selectedFeatures.includes(feature.id)
                          ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                          : 'bg-gray-50 text-gray-600 border-2 border-gray-100 hover:bg-gray-100'
                      }`}
                    >
                      <feature.icon className="h-4 w-4" />
                      {feature.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: €{priceRange[0]} - €{priceRange[1]}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>€0</span>
                  <span>€1000</span>
                  <span>€2000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              {filteredHotels.length === 0 ? (
                'No properties found matching your criteria'
              ) : (
                `Showing ${filteredHotels.length} ${filteredHotels.length === 1 ? 'property' : 'properties'}`
              )}
            </p>
          </div>

          {/* Featured Hotels Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Properties</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {filteredHotels.filter(hotel => hotel.featured).map((hotel) => (
                <Link key={hotel.id} to={`/hotels/${generateSlug(hotel.name, hotel.island)}`}>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                    <div className="relative md:w-2/5 h-64 md:h-auto">
                      <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                        From {formatPrice(hotel.price)}/night
                      </div>
                      <div className="absolute bottom-4 right-4 px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                        Featured
                      </div>
                    </div>

                    <div className="p-6 md:w-3/5">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        {hotel.island}
                      </div>

                      <h3 className="mt-2 text-xl font-semibold text-gray-900">
                        {hotel.name}
                      </h3>

                      <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        {hotel.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3">
                        {hotel.amenities.slice(0, 4).map((amenity) => {
                          const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                          return (
                            <div
                              key={amenity}
                              className="flex items-center gap-1 text-sm text-gray-600"
                            >
                              {Icon && <Icon className="h-4 w-4" />}
                              <span>{amenity}</span>
                            </div>
                          );
                        })}
                        {hotel.amenities.length > 4 && (
                          <span className="text-sm text-blue-600">
                            +{hotel.amenities.length - 4} more
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">{hotel.rating}</span>
                          <span className="text-sm text-gray-500">
                            Exceptional
                          </span>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* All Hotels Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Properties</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {filteredHotels.map((hotel) => (
                <Link key={hotel.id} to={`/hotels/${generateSlug(hotel.name, hotel.island)}`}>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                    <div className="relative md:w-2/5 h-64 md:h-auto">
                      <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                        From {formatPrice(hotel.price)}/night
                      </div>
                    </div>

                    <div className="p-6 md:w-3/5">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        {hotel.island}
                      </div>

                      <h3 className="mt-2 text-xl font-semibold text-gray-900">
                        {hotel.name}
                      </h3>

                      <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        {hotel.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3">
                        {hotel.amenities.slice(0, 4).map((amenity) => {
                          const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                          return (
                            <div
                              key={amenity}
                              className="flex items-center gap-1 text-sm text-gray-600"
                            >
                              {Icon && <Icon className="h-4 w-4" />}
                              <span>{amenity}</span>
                            </div>
                          );
                        })}
                        {hotel.amenities.length > 4 && (
                          <span className="text-sm text-blue-600">
                            +{hotel.amenities.length - 4} more
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">{hotel.rating}</span>
                          <span className="text-sm text-gray-500">
                            Exceptional
                          </span>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}