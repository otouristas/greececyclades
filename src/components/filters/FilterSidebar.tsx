import { useState } from 'react';
import { X, Filter, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PriceRangeFilter from './PriceRangeFilter';
import DateRangeFilter from './DateRangeFilter';
import RatingFilter from './RatingFilter';
import FilterChips, { FilterChip } from './FilterChips';

export interface FilterState {
  category: string;
  priceRange: [number, number];
  rating: number;
  location: string;
  dateRange: {
    start: string;
    end: string;
  };
  amenities?: string[];
  features?: string[];
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearAll?: () => void;
  presets?: Array<{
    id: string;
    label: string;
    filters: Partial<FilterState>;
  }>;
  className?: string;
}

const PRESET_FILTERS = [
  {
    id: 'budget',
    label: 'Budget Friendly',
    filters: {
      priceRange: [0, 100] as [number, number],
      rating: 3
    }
  },
  {
    id: 'luxury',
    label: 'Luxury',
    filters: {
      priceRange: [200, 1000] as [number, number],
      rating: 4.5
    }
  },
  {
    id: 'family',
    label: 'Family Friendly',
    filters: {
      rating: 4,
      amenities: ['pool', 'kids_club', 'family_rooms']
    }
  }
];

export default function FilterSidebar({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onClearAll,
  presets = PRESET_FILTERS,
  className = ''
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const updateFilter = (updates: Partial<FilterState>) => {
    const newFilters = { ...localFilters, ...updates };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePresetClick = (preset: typeof presets[0]) => {
    const newFilters = { ...localFilters, ...preset.filters };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearAll = () => {
    const defaultFilters: FilterState = {
      category: 'all',
      priceRange: [0, 1000],
      rating: 0,
      location: '',
      dateRange: {
        start: '',
        end: ''
      }
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
    if (onClearAll) {
      onClearAll();
    }
  };

  const getActiveFilterChips = (): FilterChip[] => {
    const chips: FilterChip[] = [];

    if (localFilters.category && localFilters.category !== 'all') {
      chips.push({
        id: 'category',
        label: `Category: ${localFilters.category}`,
        value: localFilters.category,
        category: 'category'
      });
    }

    if (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 1000) {
      chips.push({
        id: 'price',
        label: `Price: €${localFilters.priceRange[0]}-€${localFilters.priceRange[1]}`,
        value: `${localFilters.priceRange[0]}-${localFilters.priceRange[1]}`,
        category: 'price'
      });
    }

    if (localFilters.rating > 0) {
      chips.push({
        id: 'rating',
        label: `${localFilters.rating}+ Stars`,
        value: localFilters.rating,
        category: 'rating'
      });
    }

    if (localFilters.location) {
      chips.push({
        id: 'location',
        label: `Location: ${localFilters.location}`,
        value: localFilters.location,
        category: 'location'
      });
    }

    if (localFilters.dateRange.start || localFilters.dateRange.end) {
      chips.push({
        id: 'dates',
        label: `Dates: ${localFilters.dateRange.start || 'Any'} - ${localFilters.dateRange.end || 'Any'}`,
        value: `${localFilters.dateRange.start}-${localFilters.dateRange.end}`,
        category: 'dates'
      });
    }

    return chips;
  };

  const handleChipRemove = (id: string) => {
    switch (id) {
      case 'category':
        updateFilter({ category: 'all' });
        break;
      case 'price':
        updateFilter({ priceRange: [0, 1000] });
        break;
      case 'rating':
        updateFilter({ rating: 0 });
        break;
      case 'location':
        updateFilter({ location: '' });
        break;
      case 'dates':
        updateFilter({ dateRange: { start: '', end: '' } });
        break;
    }
  };

  const activeChips = getActiveFilterChips();
  const hasActiveFilters = activeChips.length > 0;

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
          </>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col ${className} lg:relative lg:shadow-none lg:z-auto`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {activeChips.length}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors lg:hidden"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Chips */}
            {hasActiveFilters && (
              <div className="p-4 border-b bg-gray-50">
                <FilterChips
                  chips={activeChips}
                  onRemove={handleChipRemove}
                  onClearAll={handleClearAll}
                />
              </div>
            )}

            {/* Filter Presets */}
            {presets.length > 0 && (
              <div className="p-4 border-b">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Filters</h3>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetClick(preset)}
                      className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={localFilters.category}
                  onChange={(e) => updateFilter({ category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              <PriceRangeFilter
                value={localFilters.priceRange}
                onChange={(range) => updateFilter({ priceRange: range })}
              />

              {/* Rating Filter */}
              <RatingFilter
                value={localFilters.rating}
                onChange={(rating) => updateFilter({ rating })}
              />

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={localFilters.location}
                  onChange={(e) => updateFilter({ location: e.target.value })}
                  placeholder="Enter location..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Date Range */}
              <DateRangeFilter
                startDate={localFilters.dateRange.start}
                endDate={localFilters.dateRange.end}
                onChange={(start, end) => updateFilter({ dateRange: { start, end } })}
              />
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50 space-y-2">
              {hasActiveFilters && (
                <button
                  onClick={handleClearAll}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-white transition-colors"
                >
                  Clear All Filters
                </button>
              )}
              <button
                onClick={onClose}
                className="w-full px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors lg:hidden"
              >
                Apply Filters
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

