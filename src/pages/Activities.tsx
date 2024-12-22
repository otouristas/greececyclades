import { useState } from 'react';
import activities from '../data/activitiesData';
import { ActivityCategory } from '../types/activity';
import { Search } from 'lucide-react';
import SEO from '../components/SEO';
import { generateActivitiesSEO } from '../utils/seo';
import { SITE_TAGLINE } from '../constants/seo';
import ActivityCard from '../components/activities/ActivityCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { Waves } from 'lucide-react';
import { MapPin } from 'lucide-react';

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
      <SEO 
        title={`Best Activities in Cyclades ${SITE_TAGLINE}`}
        description="Discover amazing activities and experiences in the Cyclades islands. From water sports to cultural tours, find your perfect island adventure."
        keywords="cyclades activities, greek island activities, water sports, cultural tours, island adventures"
      />
      
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: 'Activities', path: '/activities' }
            ]}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/activities/hero.jpg"
            alt="Activities in Cyclades"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/80 to-blue-800/70" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-24 lg:pt-32 pb-24 lg:pb-32">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
              {/* Left Column - Text (30%) */}
              <div className="w-full lg:w-[30%] text-center lg:text-left space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                  Island Activities
                </h1>
                <p className="text-base md:text-lg text-blue-100/90 leading-relaxed">
                  Discover unforgettable experiences in the Cyclades. From thrilling water sports to cultural tours, find your perfect island adventure.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start text-sm">
                  <div className="flex items-center gap-2 text-blue-100/80">
                    <Waves className="w-5 h-5 text-blue-400" />
                    <span>Water Sports</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100/80">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span>Guided Tours</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Search Form (70%) */}
              <div className="w-full lg:w-[70%] mt-8 lg:mt-0">
                <div className="bg-white/[0.08] backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <div className="space-y-6">
                    {/* Search Bar */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search activities..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-6 py-5 pl-14 bg-white/[0.06] rounded-2xl border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-shadow text-lg"
                      />
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-200/50 w-6 h-6" />
                    </div>

                    {/* Category Pills */}
                    <div>
                      <h3 className="text-blue-200/70 text-sm font-medium mb-4 uppercase tracking-wider">Filter by Category</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id as ActivityCategory | 'all')}
                            className={`px-5 py-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                              selectedCategory === category.id
                                ? 'bg-blue-500/20 text-blue-200 border border-blue-400/30'
                                : 'bg-white/[0.06] text-blue-100/70 border border-white/10 hover:bg-white/[0.1]'
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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