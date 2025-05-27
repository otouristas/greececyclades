import { X, Search, MapPin, Calendar, Users, Building2, Ship, Camera, Car } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'island' | 'hotel' | 'activity' | 'ferry';
  description: string;
  url: string;
  icon: React.ReactNode;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Mock search results - replace with actual API call
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Santorini',
      type: 'island',
      description: 'Iconic Greek island with stunning sunsets',
      url: '/guides/santorini',
      icon: <MapPin className="h-5 w-5 text-blue-600" />
    },
    {
      id: '2',
      title: 'Mystique, a Luxury Collection Hotel',
      type: 'hotel',
      description: 'Luxury hotel in Oia, Santorini',
      url: '/hotels/mystique',
      icon: <Building2 className="h-5 w-5 text-blue-600" />
    },
    {
      id: '3',
      title: 'Santorini to Mykonos Ferry',
      type: 'ferry',
      description: 'Fast ferry connection between islands',
      url: '/ferry-tickets/santorini-mykonos',
      icon: <Ship className="h-5 w-5 text-blue-600" />
    },
    {
      id: '4',
      title: 'Wine Tasting Tour',
      type: 'activity',
      description: 'Experience local wineries in Santorini',
      url: '/activities/wine-tasting',
      icon: <Camera className="h-5 w-5 text-blue-600" />
    }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      // Simulate API call with debounce
      const timeoutId = setTimeout(() => {
        const filteredResults = mockResults.filter(result =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filteredResults);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

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
      onClose();
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h2 className="text-xl font-semibold text-gray-900">Search</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Input */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search destinations, hotels, activities..."
                className="w-full px-4 py-4 pl-12 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="max-w-3xl mx-auto mt-4">
              <div 
                ref={resultsRef}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
              >
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
                        {result.icon}
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
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Filters */}
          {!searchQuery && (
            <div className="max-w-3xl mx-auto mt-8">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Quick Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Popular Destinations</span>
                </button>
                <button className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Best Time to Visit</span>
                </button>
                <button className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Group Tours</span>
                </button>
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {!searchQuery && (
            <div className="max-w-3xl mx-auto mt-12">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Popular Searches</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Santorini', 'Mykonos', 'Paros', 'Naxos'].map((island) => (
                  <button
                    key={island}
                    onClick={() => setSearchQuery(island)}
                    className="px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    {island}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 