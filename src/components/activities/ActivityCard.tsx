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
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
            {activity.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{activity.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{activity.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{activity.duration}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{activity.rating}</span>
              <span className="text-gray-500">({activity.reviews})</span>
            </div>
            <span className="text-sm text-gray-500">{activity.category}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
