import { useState } from 'react';
import { X, Ship, Mountain, Wine, Camera, Star, Clock, MapPin } from 'lucide-react';
import { useActivityStore } from '../../store/activityStore';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { icon: Ship, name: 'Water Activities' },
  { icon: Mountain, name: 'Adventure' },
  { icon: Wine, name: 'Food & Wine' },
  { icon: Camera, name: 'Arts & Culture' }
];

const locations = ['Santorini', 'Mykonos', 'Naxos', 'Paros', 'Milos'];
const durations = ['1-2 hours', '2-4 hours', '4-6 hours', '6+ hours'];
const ratings = [5, 4, 3];

export default function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const { filters, setFilters, resetFilters } = useActivityStore();
  const [priceRange, setPriceRange] = useState(filters.priceRange?.max || 300);

  const handleReset = () => {
    resetFilters();
    setPriceRange(300);
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-[360px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() =>
                    setFilters({
                      category:
                        filters.category === category.name ? null : category.name,
                    })
                  }
                  className={`flex items-center w-full gap-2 px-3 py-2 rounded-lg transition-colors ${
                    filters.category === category.name
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <category.icon className="h-5 w-5" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="300"
                value={priceRange}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setPriceRange(value);
                  setFilters({
                    priceRange: { min: 0, max: value },
                  });
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>€0</span>
                <span>Up to €{priceRange}</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-medium mb-3">Location</h3>
            <div className="space-y-2">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() =>
                    setFilters({
                      location: filters.location === location ? null : location,
                    })
                  }
                  className={`flex items-center w-full gap-2 px-3 py-2 rounded-lg transition-colors ${
                    filters.location === location
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <h3 className="font-medium mb-3">Duration</h3>
            <div className="space-y-2">
              {durations.map((duration) => (
                <button
                  key={duration}
                  onClick={() =>
                    setFilters({
                      duration: filters.duration === duration ? null : duration,
                    })
                  }
                  className={`flex items-center w-full gap-2 px-3 py-2 rounded-lg transition-colors ${
                    filters.duration === duration
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  <span>{duration}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-medium mb-3">Rating</h3>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <button
                  key={rating}
                  onClick={() =>
                    setFilters({
                      rating: filters.rating === rating ? null : rating,
                    })
                  }
                  className={`flex items-center w-full gap-2 px-3 py-2 rounded-lg transition-colors ${
                    filters.rating === rating
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Star className="h-4 w-4" />
                  <span>{rating}+ stars</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
}
