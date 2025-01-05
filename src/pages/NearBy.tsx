import { useState, useEffect } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import PlaceSearch from '../components/PlaceSearch';
import PlacesMap from '../components/PlacesMap';
import PlaceFilters, { PlaceFilters as Filters } from '../components/PlaceFilters';
import { PlaceDetails, getPlacesNearby, Place } from '../services/openTripMapService';

// Example coordinates for Athens (default location)
const DEFAULT_LOCATION = {
  lat: 37.9838,
  lon: 23.7275,
  name: 'Athens'
};

const POPULAR_PLACES = [
  { name: 'Acropolis', lat: 37.9715, lon: 23.7267 },
  { name: 'Plaka', lat: 37.9692, lon: 23.7283 },
  { name: 'Temple of Olympian Zeus', lat: 37.9693, lon: 23.7327 },
  { name: 'Ancient Agora', lat: 37.9753, lon: 23.7233 },
];

const DEFAULT_FILTERS: Filters = {
  radius: 2000,
  rating: '1',
  categories: ['cultural', 'historic']
};

const ITEMS_PER_PAGE = 20;

export default function NearBy() {
  const location = useLocation();
  const initialLocation = location.state || DEFAULT_LOCATION;

  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);
  const [currentLocation, setCurrentLocation] = useState(initialLocation);
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      setLoading(true);
      try {
        const places = await getPlacesNearby({
          lat: currentLocation.lat,
          lon: currentLocation.lon,
          radius: filters.radius,
          kinds: filters.categories,
          rate: filters.rating,
          limit: ITEMS_PER_PAGE,
          offset: page * ITEMS_PER_PAGE
        });
        setNearbyPlaces(places);
      } catch (error) {
        console.error('Error fetching nearby places:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyPlaces();
  }, [currentLocation, filters, page]);

  const handlePlaceSelect = (place: PlaceDetails) => {
    setSelectedPlace(place);
    if (place.point) {
      setCurrentLocation({
        lat: place.point.lat,
        lon: place.point.lon,
        name: place.name
      });
    }
  };

  const handlePopularPlaceClick = async (place: typeof POPULAR_PLACES[0]) => {
    setCurrentLocation({
      ...place,
      name: place.name
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20">
      <SEO 
        title={`Discover Places Near ${currentLocation.name} | Greece Cyclades`}
        description={`Explore fascinating places, historic sites, and hidden gems near ${currentLocation.name} in Greece.`}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover {currentLocation.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore historic sites, cultural landmarks, and hidden gems around {currentLocation.name}. 
            From ancient temples to modern attractions, find the perfect places to visit.
          </p>
        </div>

        {/* Popular Places - Only show when on default location */}
        {currentLocation.name === DEFAULT_LOCATION.name && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Popular Places</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {POPULAR_PLACES.map((place) => (
                <button
                  key={place.name}
                  onClick={() => handlePopularPlaceClick(place)}
                  className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <h3 className="font-medium text-gray-900">{place.name}</h3>
                  <div className="flex items-center text-gray-500 mt-2 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>View nearby places</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Map and Search */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search and Filters Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <PlaceSearch
                    lat={currentLocation.lat}
                    lon={currentLocation.lon}
                    radius={filters.radius}
                    onPlaceSelect={handlePlaceSelect}
                  />
                </div>
                <PlaceFilters
                  currentFilters={filters}
                  onFilterChange={setFilters}
                />
              </div>
            </div>

            {/* Current Location */}
            <div className="flex items-center text-gray-600 bg-white p-4 rounded-xl shadow-sm">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Exploring places near <strong>{currentLocation.name}</strong></span>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl shadow-sm p-4 h-[600px]">
              <PlacesMap
                center={[currentLocation.lat, currentLocation.lon]}
                places={nearbyPlaces}
                selectedPlace={selectedPlace}
                onPlaceClick={(place) => {
                  handlePlaceSelect(place as unknown as PlaceDetails);
                }}
              />
            </div>
          </div>

          {/* Right Column - Selected Place and List */}
          <div className="space-y-4">
            {/* Selected Place Details */}
            {selectedPlace && (
              <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-200">
                <h2 className="text-2xl font-bold mb-4">{selectedPlace.name}</h2>
                
                {selectedPlace.preview && (
                  <img
                    src={selectedPlace.preview.source}
                    alt={selectedPlace.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                {selectedPlace.wikipedia_extracts && (
                  <div className="prose max-w-none">
                    <p className="line-clamp-4">{selectedPlace.wikipedia_extracts.text}</p>
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  {selectedPlace.url && (
                    <a
                      href={selectedPlace.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span className="mr-2">🌐</span>
                      <span>Official Website</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  )}
                  {selectedPlace.wikipedia && (
                    <a
                      href={selectedPlace.wikipedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span className="mr-2">📚</span>
                      <span>Read on Wikipedia</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Nearby Places List */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Nearby Places</h2>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {nearbyPlaces.slice(0, 8).map((place) => (
                  <button
                    key={place.xid}
                    onClick={() => handlePlaceSelect(place as unknown as PlaceDetails)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900 line-clamp-1">{place.name}</h3>
                    {place.kinds && (
                      <p className="text-sm text-gray-500 mt-1">
                        {place.kinds.split(',')[0]}
                      </p>
                    )}
                    {place.dist && (
                      <p className="text-sm text-gray-400 mt-1">
                        {(place.dist / 1000).toFixed(1)} km away
                      </p>
                    )}
                  </button>
                ))}
              </div>

              {/* Pagination */}
              {nearbyPlaces.length > 0 && (
                <div className="mt-4 flex justify-between items-center border-t pt-4">
                  <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className={`px-3 py-1 rounded-md text-sm ${
                      page === 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {page + 1}
                  </span>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={nearbyPlaces.length < ITEMS_PER_PAGE}
                    className={`px-3 py-1 rounded-md text-sm ${
                      nearbyPlaces.length < ITEMS_PER_PAGE
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading places...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
