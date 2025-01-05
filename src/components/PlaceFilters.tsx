import { useState } from 'react';
import { Filter, Star } from 'lucide-react';
import { PlaceCategory, PlaceCategories } from '../services/openTripMapService';

interface PlaceFiltersProps {
  onFilterChange: (filters: PlaceFilters) => void;
  currentFilters: PlaceFilters;
}

export interface PlaceFilters {
  radius: number;
  rating: string;
  categories: PlaceCategory[];
}

const DISTANCE_OPTIONS = [
  { value: 1000, label: '1 km' },
  { value: 2000, label: '2 km' },
  { value: 5000, label: '5 km' },
  { value: 10000, label: '10 km' }
];

const RATING_OPTIONS = [
  { value: '1', label: ' Any' },
  { value: '2', label: ' Good' },
  { value: '3', label: ' Very Good' },
  { value: '4', label: ' Excellent' }
];

export default function PlaceFilters({ onFilterChange, currentFilters }: PlaceFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (category: PlaceCategory) => {
    const newCategories = currentFilters.categories.includes(category)
      ? currentFilters.categories.filter(c => c !== category)
      : [...currentFilters.categories, category];

    onFilterChange({
      ...currentFilters,
      categories: newCategories
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <Filter className="w-5 h-5" />
        <span>Filters</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
          {/* Distance Filter */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Distance</h3>
            <div className="space-y-2">
              {DISTANCE_OPTIONS.map(option => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    checked={currentFilters.radius === option.value}
                    onChange={() => onFilterChange({
                      ...currentFilters,
                      radius: option.value
                    })}
                    className="text-blue-600"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Rating</h3>
            <div className="space-y-2">
              {RATING_OPTIONS.map(option => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    checked={currentFilters.rating === option.value}
                    onChange={() => onFilterChange({
                      ...currentFilters,
                      rating: option.value
                    })}
                    className="text-blue-600"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories Filter */}
          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(PlaceCategories) as [string, PlaceCategory][]).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={currentFilters.categories.includes(value)}
                    onChange={() => handleCategoryChange(value)}
                    className="text-blue-600"
                  />
                  <span>{key.toLowerCase().replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
