import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Compass, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchResult, searchAll } from '../../data/searchData';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    setResults(searchAll(value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && results.length > 0) {
      navigate(results[0].link);
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Search islands, activities, or destinations..."
          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md text-white placeholder-gray-400 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
          <div className="max-h-[60vh] overflow-y-auto">
            {results.map((result) => (
              <Link
                key={`${result.type}-${result.id}`}
                to={result.link}
                className="block hover:bg-blue-50/80 transition-colors duration-150"
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {result.type === 'island' ? (
                        <Compass className="h-5 w-5 text-blue-500" />
                      ) : (
                        <Calendar className="h-5 w-5 text-blue-500" />
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
                        {result.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
