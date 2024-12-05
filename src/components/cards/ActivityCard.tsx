import React from 'react';
import { Clock, Star } from 'lucide-react';
import { Activity } from '../../types';

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
      <div className="relative aspect-[4/3]">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {activity.duration}
          </div>
        </div>

        <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
          {activity.title}
        </h3>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium">{activity.rating}</span>
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
  );
}