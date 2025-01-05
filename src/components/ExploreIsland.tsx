import { useState, useEffect } from 'react';
import { MapPin, Info } from 'lucide-react';
import {
  getPlacesNearby,
  getPlaceDetails,
  getPlacesByName,
  Place,
  PlaceDetails,
  PlaceCategories,
  PlaceCategory
} from '../services/openTripMapService';

// Example coordinates for Santorini
const SANTORINI = {
  lat: 36.3932,
  lon: 25.4615
};

export default function ExploreIsland() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | ''>('');

  // Example 1: Get places nearby with category filter
  const searchNearbyPlaces = async (category?: PlaceCategory) => {
    setLoading(true);
    try {
      const nearbyPlaces = await getPlacesNearby({
        lat: SANTORINI.lat,
        lon: SANTORINI.lon,
        radius: 2000,
        kinds: category ? [category] : [],
        limit: 20
      });
      setPlaces(nearbyPlaces);
      setActiveCategory(category || '');
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    } finally {
      setLoading(false);
    }
  };

  // Example 2: Search places by name
  const searchPlacesByName = async (name: string) => {
    setLoading(true);
    try {
      const foundPlaces = await getPlacesByName(name);
      setPlaces(foundPlaces);
      setActiveCategory('');
    } catch (error) {
      console.error('Error searching places:', error);
    } finally {
      setLoading(false);
    }
  };

  // Example 3: Get detailed information about a place
  const showPlaceDetails = async (xid: string) => {
    try {
      const details = await getPlaceDetails(xid);
      setSelectedPlace(details);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  // Load initial data
  useEffect(() => {
    searchNearbyPlaces();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Explore Santorini</h2>
        
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(PlaceCategories).map(([key, value]) => (
            <button
              key={key}
              onClick={() => searchNearbyPlaces(value)}
              className={`px-4 py-2 rounded-full text-sm ${
                activeCategory === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {key.toLowerCase().replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search by name */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search places by name..."
            className="w-full p-2 border rounded-lg"
            onChange={(e) => searchPlacesByName(e.target.value)}
          />
        </div>

        {/* Places list */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading places...</p>
            </div>
          ) : places.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              No places found. Try a different search or category.
            </div>
          ) : (
            places.map((place) => (
              <div
                key={place.xid}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => showPlaceDetails(place.xid)}
              >
                <h3 className="font-semibold text-lg mb-2">{place.name}</h3>
                {place.kinds && (
                  <p className="text-sm text-gray-600 mb-2">
                    {place.kinds.split(',')[0]}
                  </p>
                )}
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{place.dist ? `${(place.dist / 1000).toFixed(1)} km away` : 'Distance unknown'}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected place details */}
        {selectedPlace && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{selectedPlace.name}</h3>
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              {selectedPlace.preview && (
                <img
                  src={selectedPlace.preview.source}
                  alt={selectedPlace.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              {selectedPlace.wikipedia_extracts && (
                <div className="prose max-w-none mb-4">
                  <p>{selectedPlace.wikipedia_extracts.text}</p>
                </div>
              )}

              <div className="space-y-2">
                {selectedPlace.url && (
                  <a
                    href={selectedPlace.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Visit website
                  </a>
                )}
                {selectedPlace.wikipedia && (
                  <a
                    href={selectedPlace.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Read on Wikipedia
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
