import React from 'react';
import { Ship, Mountain, Wine, Camera, SlidersHorizontal } from 'lucide-react';

const activities = [
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
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Activities</h1>
            <p className="mt-2 text-gray-600">Discover unique experiences in the Cyclades</p>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </button>
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative aspect-[4/3]">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                  {activity.price}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {activity.category}
                  </span>
                  <span className="text-sm text-gray-500">{activity.duration}</span>
                </div>

                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {activity.title}
                </h3>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{activity.rating}</span>
                      <span className="ml-1 text-yellow-400">★</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({activity.reviews} reviews)
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}