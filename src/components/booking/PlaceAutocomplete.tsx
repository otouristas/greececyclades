import { useState, useEffect, useRef } from 'react';
import { MapPin, Search } from 'lucide-react';
import { searchPlaces, type Place } from '@/lib/liteapi';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PlaceAutocompleteProps {
  value: Place | null;
  onChange: (place: Place | null) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function PlaceAutocomplete({
  value,
  onChange,
  label = 'Destination',
  placeholder = 'Search for a city or destination...',
  disabled = false,
}: PlaceAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value?.displayName?.text || '');
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update input value when external value changes
  useEffect(() => {
    if (value) {
      setInputValue(value.displayName?.text || '');
    }
  }, [value]);

  async function performSearch(query: string) {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchPlaces(query);
      setSuggestions(results || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error searching places:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(newValue: string) {
    setInputValue(newValue);
    setHighlightedIndex(-1);

    // Clear selected place if input changes
    if (value && newValue !== value.displayName?.text) {
      onChange(null);
    }

    // Debounce search
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      performSearch(newValue);
    }, 300);
  }

  function handleSelectPlace(place: Place) {
    setInputValue(place.displayName?.text || '');
    onChange(place);
    setShowSuggestions(false);
    setSuggestions([]);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSelectPlace(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      {label && (
        <Label className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4" />
          {label}
        </Label>
      )}
      
      <div className="relative">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          className="pr-10"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-gray-300 border-t-sifnos-turquoise rounded-full animate-spin" />
          ) : (
            <Search className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((place, index) => (
            <button
              key={place.placeId}
              onClick={() => handleSelectPlace(place)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                highlightedIndex === index ? 'bg-sifnos-turquoise/10' : ''
              }`}
            >
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sifnos-turquoise flex-shrink-0 mt-1" />
                <div>
                  <div className="font-medium text-gray-900">
                    {place.displayName?.text}
                  </div>
                  {place.formattedAddress && (
                    <div className="text-sm text-gray-500">{place.formattedAddress}</div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && !isLoading && inputValue.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 text-center text-gray-500">
          No destinations found for "{inputValue}"
        </div>
      )}
    </div>
  );
}

