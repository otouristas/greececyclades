import { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { getAutosuggestions, getPlaceDetails, Place, PlaceDetails } from '../services/openTripMapService';
import { useDebounce } from '../hooks/useDebounce';

interface PlaceSearchProps {
  lat: number;
  lon: number;
  radius?: number;
  onPlaceSelect?: (place: PlaceDetails) => void;
}

export default function PlaceSearch({ lat, lon, radius = 2000, onPlaceSelect }: PlaceSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const results = await getAutosuggestions({
          name: debouncedQuery,
          lat,
          lon,
          radius: radius.toString(),
          limit: 10
        });
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery, lat, lon, radius]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePlaceClick = async (place: Place) => {
    try {
      const details = await getPlaceDetails(place.xid);
      onPlaceSelect?.(details);
      setShowSuggestions(false);
      setQuery('');
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Search for places..."
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (query.length > 0 || loading) && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="py-2">
              {suggestions.map((place) => (
                <button
                  key={place.xid}
                  onClick={() => handlePlaceClick(place)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-start space-x-3"
                >
                  <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">{place.name}</div>
                    {place.kinds && (
                      <div className="text-sm text-gray-500">
                        {place.kinds.split(',')[0]}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : query.length >= 3 ? (
            <div className="p-4 text-center text-gray-500">
              No places found
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Type at least 3 characters to search
            </div>
          )}
        </div>
      )}
    </div>
  );
}
