import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { activities, Activity, ActivityCategory } from '../data/activitiesData';
import { Filter, Search, MapPin, Clock } from 'lucide-react';

interface CategoryOption {
  id: ActivityCategory | 'all';
  name: string;
}

export default function Activities() {
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: CategoryOption[] = [
    { id: 'all', name: 'All Activities' },
    { id: 'water-sports', name: 'Water Sports' },
    { id: 'tours', name: 'Tours' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'food-wine', name: 'Food & Wine' },
    { id: 'adventure', name: 'Adventure' }
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
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ActivityCardProps {
  activity: Activity;
}

function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Link
      to={`/activities/${activity.slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <div className="relative h-48">
        <img
          src={activity.images.main}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="inline-block px-3 py-1 text-sm text-white bg-blue-600 rounded-full">
            {activity.price.display}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{activity.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{activity.shortDescription}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {activity.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {activity.duration}
          </span>
        </div>
      </div>
    </Link>
  );
}