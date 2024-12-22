import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { islands } from '../../data/islandsData';
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
    islands.forEach(island => {
      if (
        island.name.toLowerCase().includes(searchQuery) ||
        island.description.toLowerCase().includes(searchQuery)
      ) {
        searchResults.push({
          type: 'island',
          title: island.name,
          description: island.shortDescription,
          path: `/islands/${island.slug}`
        });
      }

      // Search through activities
      island.activities.forEach(activity => {
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

  if (!query.trim()) {
    return null;
  }

  return (
    <div className="mt-4">
      {results.length > 0 ? (
        <div className="space-y-2">
          {results.map((result, index) => (
            <Link
              key={index}
              to={result.path}
              onClick={onResultClick}
              className="flex items-start gap-4 p-4 hover:bg-white/10 rounded-lg transition-colors group"
            >
              <div className="p-2 rounded-full bg-white/10 text-white group-hover:bg-white/20">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-white font-medium">{result.title}</h4>
                <p className="text-white/70 text-sm">{result.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-white/70">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
