import { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { searchPlaces, type Place } from '@/lib/liteapi';
import { Label } from '@/components/ui/label';

interface DestinationSearchProps {
  value: { placeId: string; name: string } | null;
  onChange: (value: { placeId: string; name: string } | null) => void;
  placeholder?: string;
}

export function DestinationSearch({ value, onChange, placeholder = 'Search destinations...' }: DestinationSearchProps) {
  const [query, setQuery] = useState(value?.name || '');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Place[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const places = await searchPlaces(query);
        setResults(places);
        setShowResults(true);
      } catch (error) {
        console.error('Failed to search places:', error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  function handleSelectPlace(place: Place) {
    const selectedValue = {
      placeId: place.placeId,
      name: place.displayName.text,
    };
    onChange(selectedValue);
    setQuery(place.displayName.text);
    setShowResults(false);
  }

  function handleInputChange(newQuery: string) {
    setQuery(newQuery);
    if (value) {
      onChange(null); // Clear selection if user starts typing again
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <Label htmlFor="destination-search" className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4" />
        Destination
      </Label>
      <div className="relative">
        <input
          id="destination-search"
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sifnos-turquoise"
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          </div>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto">
          {results.map((place) => (
            <button
              key={place.placeId}
              onClick={() => handleSelectPlace(place)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
            >
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-sifnos-turquoise flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">{place.displayName.text}</div>
                  <div className="text-sm text-gray-500">{place.formattedAddress}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showResults && !isSearching && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 text-center text-gray-500">
          No destinations found for "{query}"
        </div>
      )}
    </div>
  );
}

