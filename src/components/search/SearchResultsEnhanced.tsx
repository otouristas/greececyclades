import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, ArrowUpDown, MapPin, Star, Calendar, Hotel, Car, Compass } from 'lucide-react';
import { SearchResult } from '../../data/searchData';
import { motion } from 'framer-motion';

interface SearchResultsEnhancedProps {
  results: SearchResult[];
  query: string;
  onResultClick?: (result: SearchResult) => void;
  className?: string;
}

type SortOption = 'relevance' | 'price' | 'rating' | 'popularity' | 'distance';
type ViewMode = 'grid' | 'list';

export default function SearchResultsEnhanced({
  results,
  query,
  onResultClick,
  className = ''
}: SearchResultsEnhancedProps) {
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sort results
  const sortedResults = useMemo(() => {
    const sorted = [...results];
    
    switch (sortBy) {
      case 'price':
        return sorted.sort((a, b) => {
          // Assuming price is in a property, adjust based on actual data structure
          return 0; // Placeholder
        });
      case 'rating':
        return sorted.sort((a, b) => {
          // Assuming rating is in a property, adjust based on actual data structure
          return 0; // Placeholder
        });
      case 'popularity':
        return sorted.sort((a, b) => {
          // Assuming popularity is in a property, adjust based on actual data structure
          return 0; // Placeholder
        });
      case 'distance':
        return sorted.sort((a, b) => {
          // Assuming distance is in a property, adjust based on actual data structure
          return 0; // Placeholder
        });
      default:
        return sorted;
    }
  }, [results, sortBy]);

  // Paginate results
  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedResults.slice(start, start + itemsPerPage);
  }, [sortedResults, currentPage]);

  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);

  // Highlight search query in text
  const highlightText = (text: string, searchQuery: string) => {
    if (!searchQuery.trim()) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Get icon for result type
  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'island':
        return <Compass className="h-5 w-5 text-blue-500" />;
      case 'hotel':
        return <Hotel className="h-5 w-5 text-yellow-500" />;
      case 'activity':
        return <Calendar className="h-5 w-5 text-green-500" />;
      case 'ferry':
        return <Compass className="h-5 w-5 text-blue-500" />;
      case 'car':
        return <Car className="h-5 w-5 text-gray-500" />;
      default:
        return <MapPin className="h-5 w-5 text-gray-500" />;
    }
  };

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    paginatedResults.forEach((result) => {
      const category = result.category || result.type;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(result);
    });
    return groups;
  }, [paginatedResults]);

  if (results.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="max-w-md mx-auto">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No results found
          </h3>
          <p className="text-gray-600 mb-4">
            We couldn't find any results for "{query}"
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Try:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Checking your spelling</li>
              <li>• Using different keywords</li>
              <li>• Removing filters</li>
              <li>• Searching for a specific island or activity</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-600">
            Found <span className="font-medium text-gray-900">{results.length}</span> results
            {query && (
              <>
                {' '}for <span className="font-medium text-gray-900">"{query}"</span>
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortOption);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
              <option value="popularity">Sort by Popularity</option>
              <option value="distance">Sort by Distance</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Grid view"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results by Category */}
      {Object.keys(groupedResults).length > 1 ? (
        <div className="space-y-8">
          {Object.entries(groupedResults).map(([category, categoryResults]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {category} ({categoryResults.length})
              </h3>
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {categoryResults.map((result, index) => (
                  <ResultCard
                    key={`${result.type}-${result.id}`}
                    result={result}
                    query={query}
                    viewMode={viewMode}
                    onResultClick={onResultClick}
                    index={index}
                    highlightText={highlightText}
                    getTypeIcon={getTypeIcon}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {paginatedResults.map((result, index) => (
            <ResultCard
              key={`${result.type}-${result.id}`}
              result={result}
              query={query}
              viewMode={viewMode}
              onResultClick={onResultClick}
              index={index}
              highlightText={highlightText}
              getTypeIcon={getTypeIcon}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

interface ResultCardProps {
  result: SearchResult;
  query: string;
  viewMode: ViewMode;
  onResultClick?: (result: SearchResult) => void;
  index: number;
  highlightText: (text: string, query: string) => React.ReactNode;
  getTypeIcon: (type: SearchResult['type']) => React.ReactElement;
}

function ResultCard({
  result,
  query,
  viewMode,
  onResultClick,
  index,
  highlightText,
  getTypeIcon
}: ResultCardProps) {
  const handleClick = () => {
    if (onResultClick) {
      onResultClick(result);
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Link
          to={result.link}
          onClick={handleClick}
          className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
        >
          {result.image && (
            <img
              src={result.image}
              alt={result.title}
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {highlightText(result.title, query)}
              </h3>
              {getTypeIcon(result.type)}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {highlightText(result.description, query)}
            </p>
            {result.location && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3 w-3" />
                <span>{result.location}</span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {result.category || result.type}
            </span>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={result.link}
        onClick={handleClick}
        className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all"
      >
        {result.image && (
          <div className="aspect-video overflow-hidden bg-gray-100">
            <img
              src={result.image}
              alt={result.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {highlightText(result.title, query)}
            </h3>
            {getTypeIcon(result.type)}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {highlightText(result.description, query)}
          </p>
          {result.location && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
              <MapPin className="h-3 w-3" />
              <span>{result.location}</span>
            </div>
          )}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {result.category || result.type}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}


