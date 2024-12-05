import React from 'react';
import { Star, MapPin } from 'lucide-react';

const listings = [
  {
    id: 1,
    title: 'Mystique Hotel',
    location: 'Santorini',
    image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews: 128,
    price: '€450',
    type: 'Luxury Hotel'
  },
  {
    id: 2,
    title: 'Traditional Windmill Villa',
    location: 'Mykonos',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80',
    rating: 4.8,
    reviews: 89,
    price: '€380',
    type: 'Unique Stay'
  },
  {
    id: 3,
    title: 'Seaside Restaurant',
    location: 'Naxos',
    image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80',
    rating: 4.7,
    reviews: 156,
    price: '€€€',
    type: 'Restaurant'
  }
];

export default function FeaturedListings() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Listings</h2>
            <p className="mt-2 text-gray-600">Discover our hand-picked selection of top-rated places</p>
          </div>
          <button className="text-blue-600 font-medium hover:text-blue-700">
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <div key={listing.id} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                  {listing.price}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {listing.type}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.location}
                  </div>
                </div>
                
                <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {listing.title}
                </h3>
                
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{listing.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({listing.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}