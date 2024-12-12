import { motion } from 'framer-motion';
import { Ship, Moon, MapPin, Heart, Camera, Utensils } from 'lucide-react';
import { Island } from '../types/islands';
import clsx from 'clsx';

interface IslandCardProps {
  island: Island;
  id: number;
  showDuration?: boolean;
  duration?: number;
}

const activityIcons: Record<string, typeof Ship> = {
  'Photography': Camera,
  'Food Tours': Utensils,
  'Wine Tasting': Utensils,
  'Local Cuisine': Utensils,
  'Beach Time': Ship,
  'Swimming': Ship,
  'Water Sports': Ship,
  'Hiking': MapPin,
  'Village Walks': MapPin,
  'Cultural Events': Heart,
};

export default function IslandCard({ island, id, showDuration = false, duration }: IslandCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: id * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02]"
    >
      <div className="md:flex">
        <div className="md:w-2/5 relative group">
          <img
            src={island.heroImage}
            alt={island.name}
            className="h-48 w-full object-cover md:h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="font-medium italic">{island.quote}</div>
            </div>
          </div>
        </div>
        <div className="p-6 md:w-3/5">
          <div className="flex items-center gap-2 mb-2">
            <Ship className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-blue-500">Stop {id + 1}</span>
            {showDuration && duration && (
              <div className="text-sm text-blue-600 font-medium ml-2">
                {duration} days
              </div>
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2">{island.name}</h3>
          <p className="text-gray-600 mb-4">{island.shortDescription}</p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                Must-See Spots
              </h4>
              <div className="flex flex-wrap gap-2">
                {island.mustSee.slice(0, 4).map((spot) => (
                  <span
                    key={spot}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                  >
                    {spot}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                Activities
              </h4>
              <div className="flex flex-wrap gap-2">
                {island.activities.slice(0, 4).map((activity) => {
                  const Icon = activityIcons[activity] || Ship;
                  return (
                    <span
                      key={activity}
                      className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm flex items-center gap-1"
                    >
                      <Icon className="w-3 h-3" />
                      {activity}
                    </span>
                  );
                })}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4" />
                <span>Stay: {island.averageStay} days</span>
              </div>
              <div className={clsx(
                'px-2 py-1 rounded-full text-xs font-medium',
                {
                  'bg-blue-100 text-blue-700': island.size === 'MAJOR',
                  'bg-green-100 text-green-700': island.size === 'MEDIUM',
                  'bg-yellow-100 text-yellow-700': island.size === 'MINOR'
                }
              )}>
                {island.size.toLowerCase()} island
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
