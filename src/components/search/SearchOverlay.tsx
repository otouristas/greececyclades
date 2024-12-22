import React, { useState, useEffect, useRef } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  title: string;
  description: string;
  url: string;
  type: 'island' | 'hotel' | 'activity' | 'guide';
  image?: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Simulated search results - replace with actual API call
      const mockResults: SearchResult[] = [
        {
          title: 'Santorini',
          description: 'Iconic island known for its stunning sunsets and white architecture',
          url: '/islands/santorini',
          type: 'island',
          image: '/images/santorini.jpg'
        },
        {
          title: 'Mykonos Beach Hotel',
          description: 'Luxury beachfront accommodation in Mykonos',
          url: '/hotels/mykonos-beach',
          type: 'hotel',
          image: '/images/mykonos-hotel.jpg'
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      setResults(mockResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 z-[9999] overflow-hidden"
        >
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

          <div className="relative z-10">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Search Container */}
            <div className="max-w-3xl mx-auto px-4 pt-32">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-light text-white mb-2">
                  Search <span className="text-blue-300">Cyclades</span>
                </h2>
                <p className="text-lg text-blue-100/80">
                  Discover islands, hotels, activities, and more
                </p>
              </div>

              {/* Search Input */}
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full bg-white/10 text-white placeholder-white/50 py-4 pl-12 pr-4 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white/20 transition-all"
                />
              </div>

              {/* Results */}
              <div className="mt-8">
                {isLoading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="grid gap-4">
                    {results.map((result, index) => (
                      <Link
                        key={index}
                        to={result.url}
                        onClick={onClose}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] transition-colors group border border-white/10"
                      >
                        {result.image && (
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={result.image}
                              alt={result.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors">
                            {result.title}
                          </h3>
                          <p className="text-sm text-blue-100/70">{result.description}</p>
                          <span className="inline-block mt-2 text-xs text-blue-200/50 uppercase tracking-wider">
                            {result.type}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : searchQuery.length > 0 && (
                  <p className="text-center text-blue-100/70">No results found</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
