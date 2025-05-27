import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, X, Building2, Ship, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  type: 'island' | 'hotel' | 'activity' | 'ferry';
  description: string;
  url: string;
}

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock search results - replace with actual API call
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Santorini',
      type: 'island',
      description: 'Iconic Greek island with stunning sunsets',
      url: '/guides/santorini'
    },
    {
      id: '2',
      title: 'Mystique, a Luxury Collection Hotel',
      type: 'hotel',
      description: 'Luxury hotel in Oia, Santorini',
      url: '/hotels/mystique'
    },
    {
      id: '3',
      title: 'Santorini to Mykonos Ferry',
      type: 'ferry',
      description: 'Fast ferry connection between islands',
      url: '/ferry-tickets/santorini-mykonos'
    },
    {
      id: '4',
      title: 'Wine Tasting Tour',
      type: 'activity',
      description: 'Experience local wineries in Santorini',
      url: '/activities/wine-tasting'
    }
  ];

  const getCurrentLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
        }
      );
    }
  };

  // Instant search without debounce
  const handleSearch = (value: string) => {
    setLocation(value);
    if (value.trim()) {
      const filteredResults = mockResults.filter(result =>
        result.title.toLowerCase().includes(value.toLowerCase()) ||
        result.description.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selectedResult = results[selectedIndex];
      window.location.href = selectedResult.url;
    } else if (e.key === 'Escape') {
      setLocation('');
      setResults([]);
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && searchRef.current) {
      const selectedElement = searchRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative max-w-3xl mx-auto" ref={searchRef}>
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search destinations, hotels, activities..."
          value={location}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 pl-12 pr-32 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 shadow-sm"
        />
        <Search className="absolute left-4 h-5 w-5 text-gray-400" />
        {location && (
          <button
            onClick={() => {
              setLocation('');
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-32 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
        <button
          onClick={getCurrentLocation}
          className="absolute right-4 flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          {isLocating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          <span className="text-sm">Near Me</span>
        </button>
      </div>

      {/* Search Results */}
      {location && (
        <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          {results.length > 0 ? (
            results.map((result, index) => (
              <Link
                key={result.id}
                to={result.url}
                className={`flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors ${
                  index === selectedIndex ? 'bg-blue-50' : ''
                }`}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="p-2 bg-blue-50 rounded-lg">
                  {result.type === 'island' && <MapPin className="h-5 w-5 text-blue-600" />}
                  {result.type === 'hotel' && <Building2 className="h-5 w-5 text-blue-600" />}
                  {result.type === 'ferry' && <Ship className="h-5 w-5 text-blue-600" />}
                  {result.type === 'activity' && <Camera className="h-5 w-5 text-blue-600" />}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{result.title}</h3>
                  <p className="text-sm text-gray-500">{result.description}</p>
                  <span className="inline-block mt-1 text-xs font-medium text-blue-600">
                    {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found for "{location}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}