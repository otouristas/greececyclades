import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cyclades } from '../../data/islandsData';
import { Search } from 'lucide-react';

interface SearchResult {
  type: 'island' | 'activity' | 'guide';
  title: string;
  description: string;
  path: string;
}

interface SearchResultsProps {
  query: string;
  onResultClick: () => void;
}

export default function SearchResults({ query, onResultClick }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search through islands
    cyclades.forEach(island => {
      if (
        island.name?.toLowerCase().includes(searchQuery) ||
        island.description?.toLowerCase().includes(searchQuery)
      ) {
        searchResults.push({
          type: 'island',
          title: island.name || '',
          description: island.shortDescription || '',
          path: `/islands/${island.slug}`
        });
      }

      // Search through activities
      island.activities?.forEach(activity => {
        if (activity.toLowerCase().includes(searchQuery)) {
          searchResults.push({
            type: 'activity',
            title: `${activity} in ${island.name}`,
            description: `Experience ${activity} on the beautiful island of ${island.name}`,
            path: `/islands/${island.slug}#activities`
          });
        }
      });
    });

    setResults(searchResults);
  }, [query]);

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
      <div className="max-h-96 overflow-y-auto">
        {results.map((result, index) => (
          <Link
            key={index}
            to={result.path}
            onClick={onResultClick}
            className="block p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-start gap-3">
              <Search className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">{result.title}</h3>
                {result.description && (
                  <p className="text-sm text-gray-600 mt-0.5">{result.description}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
