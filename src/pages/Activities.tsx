import { useState, useEffect } from 'react';
import { Ship, Mountain, Wine, Camera, SlidersHorizontal } from 'lucide-react';
import { useActivityStore } from '../store/activityStore';
import ActivityCard from '../components/activities/ActivityCard';
import FilterSidebar from '../components/activities/FilterSidebar';
import { Activity } from '../types';

const mockActivities: Activity[] = [
  {
    id: 1,
    title: 'Sunset Sailing Cruise',
    description: 'Experience the magic of Santorinis famous sunset aboard a luxury catamaran. Enjoy swimming, snorkeling, and a BBQ dinner with wine.',
    location: 'Santorini',
    image: 'https://images.unsplash.com/photo-1588401667987-e06480c453b9?auto=format&fit=crop&q=80',
    price: '€120',
    duration: '5 hours',
    rating: 4.9,
    reviews: 245,
    category: 'Water Activities'
  },
  {
    id: 2,
    title: 'Wine Tasting Tour',
    description: 'Discover Santorinis unique wine culture with visits to three traditional wineries. Learn about volcanic wines and enjoy local delicacies.',
    location: 'Santorini',
    image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&q=80',
    price: '€85',
    duration: '4 hours',
    rating: 4.8,
    reviews: 189,
    category: 'Food & Wine'
  },
  {
    id: 3,
    title: 'Photography Workshop',
    description: 'Capture the beauty of Mykonos with a professional photographer. Perfect for all skill levels, includes camera tips and local insights.',
    location: 'Mykonos',
    image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80',
    price: '€95',
    duration: '3 hours',
    rating: 4.7,
    reviews: 156,
    category: 'Arts & Culture'
  },
  {
    id: 4,
    title: 'Hiking Adventure',
    description: 'Explore the ancient trails of Naxos with an experienced guide. Discover hidden villages, Byzantine churches, and breathtaking viewpoints.',
    location: 'Naxos',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80',
    price: '€65',
    duration: '6 hours',
    rating: 4.9,
    reviews: 132,
    category: 'Adventure'
  }
];

const categories = [
  { icon: Ship, name: 'Water Activities' },
  { icon: Mountain, name: 'Adventure' },
  { icon: Wine, name: 'Food & Wine' },
  { icon: Camera, name: 'Arts & Culture' }
];

export default function Activities() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { activities, filters, setActivities, setFilters } = useActivityStore();

  useEffect(() => {
    // In a real app, this would be an API call
    setActivities(mockActivities);
  }, [setActivities]);

  const filteredActivities = activities.filter((activity) => {
    if (filters.category && activity.category !== filters.category) return false;
    if (filters.location && activity.location !== filters.location) return false;
    if (filters.rating && activity.rating < filters.rating) return false;
    if (
      filters.priceRange &&
      parseFloat(activity.price.replace('€', '')) > filters.priceRange.max
    ) {
      return false;
    }
    if (filters.duration && activity.duration !== filters.duration) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Activities</h1>
            <p className="mt-2 text-gray-600">
              Discover unique experiences in the Cyclades
            </p>
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() =>
                setFilters({
                  category: filters.category === category.name ? null : category.name,
                })
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
                filters.category === category.name
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white hover:bg-gray-50 text-gray-700'
              }`}
            >
              <category.icon className="h-5 w-5" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          {filteredActivities.length} activities found
          {Object.values(filters).some((f) => f !== null) && (
            <button
              onClick={() => setFilters({})}
              className="ml-3 text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Activity Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>

        {/* No Results */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No activities found matching your filters</p>
            <button
              onClick={() => setFilters({})}
              className="text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

      {/* Backdrop */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
}