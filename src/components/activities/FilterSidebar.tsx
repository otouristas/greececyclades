import { X } from 'lucide-react';
import { useActivityStore } from '../../store/activityStore';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const locations = ['Santorini', 'Mykonos', 'Naxos', 'Paros', 'Milos'];
const durations = ['2-4 hours', '4-6 hours', '6+ hours'];
const categories = ['Water Activities', 'Adventure', 'Food & Wine', 'Arts & Culture'];

export default function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const { filters, setFilters } = useActivityStore();

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div
      className={`fixed right-0 top-0 h-screen w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category}
                  onChange={() => handleFilterChange('category', category)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-600">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Location</h3>
          <div className="space-y-2">
            {locations.map((location) => (
              <label key={location} className="flex items-center">
                <input
                  type="radio"
                  name="location"
                  checked={filters.location === location}
                  onChange={() => handleFilterChange('location', location)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-600">{location}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Duration</h3>
          <div className="space-y-2">
            {durations.map((duration) => (
              <label key={duration} className="flex items-center">
                <input
                  type="radio"
                  name="duration"
                  checked={filters.duration === duration}
                  onChange={() => handleFilterChange('duration', duration)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-600">{duration}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
          <input
            type="range"
            min="0"
            max="500"
            step="50"
            value={filters.priceRange?.max || 500}
            onChange={(e) =>
              handleFilterChange('priceRange', {
                min: 0,
                max: parseInt(e.target.value),
              })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">€0</span>
            <span className="text-sm text-gray-600">
              €{filters.priceRange?.max || 500}
            </span>
          </div>
        </div>

        {/* Reset Filters */}
        <button
          onClick={() => setFilters({})}
          className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
