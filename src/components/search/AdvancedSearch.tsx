import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X, Clock, TrendingUp, Filter, MapPin, Calendar, DollarSign, Star } from 'lucide-react';
import { SearchResult, searchAll } from '../../data/searchData';
import { searchAll as searchAllAPI } from '../../lib/api';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchFilters {
  category: 'all' | 'island' | 'hotel' | 'activity' | 'ferry' | 'car';
  priceRange: [number, number];
  rating: number;
  location: string;
  dateRange: {
    start: string;
    end: string;
  };
}

interface AdvancedSearchProps {
  onResultSelect?: (result: SearchResult) => void;
  placeholder?: string;
  showFilters?: boolean;
  className?: string;
}

const STORAGE_KEY = 'discovercyclades_search_history';
const MAX_HISTORY = 10;
const POPULAR_SEARCHES = [
  'Santorini hotels',
  'Mykonos beaches',
  'Ferry tickets',
  'Naxos activities',
  'Paros restaurants'
];

export default function AdvancedSearch({
  onResultSelect,
  placeholder = 'Search islands, hotels, activities, ferries, or cars...',
  showFilters = true,
  className = ''
}: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    priceRange: [0, 1000],
    rating: 0,
    location: '',
    dateRange: {
      start: '',
      end: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Load search history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSearchHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load search history:', e);
      }
    }
  }, []);

  // Load filters from URL params
  useEffect(() => {
    const category = searchParams.get('category') as SearchFilters['category'] || 'all';
    const priceMin = parseInt(searchParams.get('priceMin') || '0');
    const priceMax = parseInt(searchParams.get('priceMax') || '1000');
    const rating = parseInt(searchParams.get('rating') || '0');
    const location = searchParams.get('location') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';

    setFilters({
      category,
      priceRange: [priceMin, priceMax],
      rating,
      location,
      dateRange: {
        start: startDate,
        end: endDate
      }
    });
  }, [searchParams]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string, currentFilters: SearchFilters) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        let searchResults: SearchResult[] = [];

        // Search local data (islands, activities)
        const localResults = searchAll(searchQuery);
        searchResults = [...localResults];

        // Search API data (hotels, cars) if category allows
        if (currentFilters.category === 'all' || currentFilters.category === 'hotel' || currentFilters.category === 'car') {
          try {
            const apiResults = await searchAllAPI(searchQuery);
            
            // Transform API results to SearchResult format
            if (apiResults.hotels) {
              const hotelResults: SearchResult[] = apiResults.hotels.map((hotel: any) => ({
                id: hotel.id,
                title: hotel.name,
                type: 'hotel' as const,
                description: hotel.description || '',
                link: `/hotels/${hotel.id}`,
                image: hotel.image_url,
                category: 'Hotel',
                location: hotel.location
              }));
              searchResults = [...searchResults, ...hotelResults];
            }

            if (apiResults.cars) {
              const carResults: SearchResult[] = apiResults.cars.map((car: any) => ({
                id: car.id,
                title: car.name,
                type: 'car' as const,
                description: car.description || '',
                link: `/rent-a-car/${car.id}`,
                image: car.image_url,
                category: 'Car Rental',
                location: car.location
              }));
              searchResults = [...searchResults, ...carResults];
            }
          } catch (error) {
            console.error('API search error:', error);
          }
        }

        // Apply filters
        let filteredResults = searchResults;
        
        if (currentFilters.category !== 'all') {
          filteredResults = filteredResults.filter(r => r.type === currentFilters.category);
        }

        if (currentFilters.location) {
          filteredResults = filteredResults.filter(r => 
            r.location?.toLowerCase().includes(currentFilters.location.toLowerCase())
          );
        }

        setResults(filteredResults.slice(0, 10));
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  // Update search when query or filters change
  useEffect(() => {
    if (query.trim()) {
      debouncedSearch(query, filters);
    } else {
      setResults([]);
    }
  }, [query, filters, debouncedSearch]);

  // Save to search history
  const saveToHistory = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    const updated = [
      searchQuery,
      ...searchHistory.filter(h => h.toLowerCase() !== searchQuery.toLowerCase())
    ].slice(0, MAX_HISTORY);
    
    setSearchHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Handle search input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  // Handle result selection
  const handleResultSelect = (result: SearchResult) => {
    saveToHistory(query);
    setIsOpen(false);
    setQuery('');
    
    if (onResultSelect) {
      onResultSelect(result);
    } else {
      navigate(result.link);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        saveToHistory(query);
        navigate(`/search?q=${encodeURIComponent(query)}`);
        setIsOpen(false);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleResultSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setQuery('');
        break;
    }
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Clear filters
  const handleClearFilters = () => {
    const defaultFilters: SearchFilters = {
      category: 'all',
      priceRange: [0, 1000],
      rating: 0,
      location: '',
      dateRange: {
        start: '',
        end: ''
      }
    };
    setFilters(defaultFilters);
    setSearchParams({});
  };

  // Update URL params when filters change
  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    
    const params = new URLSearchParams();
    if (updated.category !== 'all') params.set('category', updated.category);
    if (updated.priceRange[0] > 0) params.set('priceMin', updated.priceRange[0].toString());
    if (updated.priceRange[1] < 1000) params.set('priceMax', updated.priceRange[1].toString());
    if (updated.rating > 0) params.set('rating', updated.rating.toString());
    if (updated.location) params.set('location', updated.location);
    if (updated.dateRange.start) params.set('startDate', updated.dateRange.start);
    if (updated.dateRange.end) params.set('endDate', updated.dateRange.end);
    
    setSearchParams(params);
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveFilters = filters.category !== 'all' || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 1000 ||
    filters.rating > 0 ||
    filters.location !== '' ||
    filters.dateRange.start !== '' ||
    filters.dateRange.end !== '';

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-20 py-4 bg-white/10 backdrop-blur-md text-white placeholder-gray-400 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2">
          {query && (
            <button
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          {showFilters && (
            <button
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`p-1.5 rounded transition-colors ${
                hasActiveFilters
                  ? 'text-blue-400 bg-blue-400/20'
                  : 'text-gray-400 hover:text-white'
              }`}
              aria-label="Toggle filters"
            >
              <Filter className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && showFiltersPanel && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50"
        >
          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => updateFilters({ category: e.target.value as SearchFilters['category'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="island">Islands</option>
                <option value="hotel">Hotels</option>
                <option value="activity">Activities</option>
                <option value="ferry">Ferries</option>
                <option value="car">Cars</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: €{filters.priceRange[0]} - €{filters.priceRange[1]}
              </label>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={filters.priceRange[1]}
                  onChange={(e) => updateFilters({ 
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
                  })}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <select
                  value={filters.rating}
                  onChange={(e) => updateFilters({ rating: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="0">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => updateFilters({ location: e.target.value })}
                  placeholder="Enter location..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => updateFilters({ 
                      dateRange: { ...filters.dateRange, start: e.target.value } 
                    })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => updateFilters({ 
                      dateRange: { ...filters.dateRange, end: e.target.value } 
                    })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
          >
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="max-h-[60vh] overflow-y-auto">
                {results.map((result, index) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultSelect(result)}
                    className={`w-full text-left p-4 hover:bg-blue-50/80 transition-colors duration-150 ${
                      index === selectedIndex ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {result.type === 'island' ? (
                          <MapPin className="h-5 w-5 text-blue-500" />
                        ) : result.type === 'hotel' ? (
                          <Star className="h-5 w-5 text-yellow-500" />
                        ) : result.type === 'activity' ? (
                          <Calendar className="h-5 w-5 text-green-500" />
                        ) : (
                          <Search className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-medium text-gray-900 text-left">
                          {result.title}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2 text-left">
                          {result.description}
                        </p>
                        {result.location && (
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-xs text-gray-500">{result.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {result.category || result.type}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="p-8 text-center text-gray-500">
                <p>No results found for "{query}"</p>
                <p className="text-sm mt-2">Try different keywords or adjust your filters</p>
              </div>
            ) : (
              <div className="p-4">
                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2 px-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <h3 className="text-sm font-medium text-gray-700">Recent Searches</h3>
                    </div>
                    <div className="space-y-1">
                      {searchHistory.slice(0, 5).map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setQuery(item);
                            setIsOpen(true);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <div className="flex items-center gap-2 mb-2 px-2">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-700">Popular Searches</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(item);
                          setIsOpen(true);
                        }}
                        className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}


