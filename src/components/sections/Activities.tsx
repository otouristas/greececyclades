import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Ship, Mountain, Wine, Camera } from 'lucide-react';
import ActivityCard from '../cards/ActivityCard';

const featuredActivities = [
  {
    id: 1,
    title: 'Sunset Sailing Cruise',
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
    location: 'Mykonos',
    image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80',
    price: '€95',
    duration: '3 hours',
    rating: 4.7,
    reviews: 156,
    category: 'Arts & Culture'
  }
];

const categories = [
  { icon: Ship, name: 'Water Activities' },
  { icon: Mountain, name: 'Adventure' },
  { icon: Wine, name: 'Food & Wine' },
  { icon: Camera, name: 'Arts & Culture' }
];

export default function Activities() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Popular Activities</h2>
            <p className="mt-2 text-gray-600">Unforgettable experiences in the Cyclades</p>
          </div>
          <Link 
            to="/activities"
            className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
          >
            View all activities
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category.name}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full hover:bg-gray-50 whitespace-nowrap"
            >
              <category.icon className="h-5 w-5 text-blue-600" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  );
}