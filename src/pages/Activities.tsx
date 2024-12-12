import { useState } from 'react';
import activities from '../data/activitiesData';
import { ActivityCategory } from '../types/activity';
import { Search } from 'lucide-react';
import SEO from '../components/SEO';
import { generateActivitiesSEO } from '../utils/seo';
import ActivityCard from '../components/activities/ActivityCard';

interface CategoryOption {
  id: ActivityCategory | 'all';
  name: string;
}

export default function Activities() {
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: CategoryOption[] = [
    { id: 'all', name: 'All Activities' },
    { id: ActivityCategory.WaterSports, name: 'Water Sports' },
    { id: ActivityCategory.Tours, name: 'Tours' },
    { id: ActivityCategory.Cultural, name: 'Cultural' },
    { id: ActivityCategory.FoodWine, name: 'Food & Wine' },
    { id: ActivityCategory.Adventure, name: 'Adventure' }
  ];

  const filteredActivities = activities.filter((activity) => {
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO {...generateActivitiesSEO()} />
      {/* Hero Section */}
      <div className="relative bg-blue-600 h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/activities/activities-hero.jpg"
            alt="Cyclades Activities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Cyclades Activities
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Experience the best of Greek island life with our curated selection of activities
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                } transition-colors duration-200`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((activity, index) => (
            <ActivityCard key={`${activity.id}-${index}`} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
}