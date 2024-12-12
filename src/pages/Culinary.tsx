import React, { useState } from 'react';
import { UtensilsCrossed, Search } from 'lucide-react';
import { culinaryData } from '../data/culinaryData';
import { CulinaryCategory } from '../types/culinary';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';

export default function Culinary() {
  const [selectedCategory, setSelectedCategory] = useState<CulinaryCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Experiences', count: culinaryData.length },
    ...Object.values(CulinaryCategory).map(category => ({
      id: category,
      name: category,
      count: culinaryData.filter(exp => exp.category === category).length
    }))
  ];

  const filteredExperiences = culinaryData.filter((experience) => {
    const matchesCategory = selectedCategory === 'all' || experience.category === selectedCategory;
    const matchesSearch = experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`Cyclades Food & Dining Guide ${SITE_TAGLINE}`}
        description="Discover the rich culinary heritage of the Cyclades islands. Find the best restaurants, local dishes, cooking classes, and food experiences."
        ogImage="/images/culinary-hero.jpg"
      />

      {/* Hero Section */}
      <div className="relative bg-blue-600 h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/culinary/hero.jpg"
            alt="Cyclades Culinary Experiences"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cyclades Culinary Experiences
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Discover the authentic flavors of Greek cuisine through immersive experiences
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
                onClick={() => setSelectedCategory(category.id as CulinaryCategory | 'all')}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                } transition-colors duration-200`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((experience) => (
            <div key={experience.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {experience.category}
                  </span>
                  <span className="text-sm text-gray-500">{experience.duration}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {experience.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {experience.shortDescription}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-blue-600">
                    {experience.price.display}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <div className="text-center py-12">
            <UtensilsCrossed className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No experiences found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
