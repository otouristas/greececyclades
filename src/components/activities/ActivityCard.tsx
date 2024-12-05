import { MapPin, Star, Clock } from 'lucide-react';
import { Activity } from '../../types';
import { Link } from 'react-router-dom';

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/activities/${activity.id}`}>
        <div className="relative aspect-[4/3]">
          <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
            {activity.price}
          </div>
        </div>

        <div className="p-5">
          {/* Category and Duration */}
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
              {activity.category}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {activity.duration}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {activity.title}
          </h3>

          {/* Location */}
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {activity.location}
          </div>

          {/* Description */}
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {activity.description}
          </p>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 text-sm font-medium text-gray-900">
                  {activity.rating}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({activity.reviews} reviews)
              </span>
            </div>
            <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
