import { Droplets, Wind, Sun, Cloud, CloudRain, Thermometer } from 'lucide-react';
import { Weather, IslandActivity } from '../types/island';
import { motion } from 'framer-motion';

interface WeatherCardProps {
  weather: Weather;
  activities: IslandActivity[];
  compact?: boolean;
  className?: string;
}

export default function WeatherCard({ weather, activities, compact = false, className = '' }: WeatherCardProps) {
  if (!weather) {
    return (
      <div className={`flex items-center gap-2 text-sm text-gray-400 ${className}`}>
        <div>No weather data available</div>
      </div>
    );
  }

  const getWeatherIcon = () => {
    const { condition } = weather;
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-5 h-5 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      default:
        return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getRecommendedActivities = () => {
    if (!activities || activities.length === 0) return [];

    const { condition } = weather;
    switch (condition.toLowerCase()) {
      case 'sunny':
        return activities.filter(activity => 
          ['swimming', 'hiking', 'sightseeing', 'beach'].includes(activity.toLowerCase())
        );
      case 'cloudy':
        return activities.filter(activity => 
          ['sightseeing', 'hiking', 'cultural'].includes(activity.toLowerCase())
        );
      case 'rainy':
        return activities.filter(activity => 
          ['museum', 'cultural', 'indoor'].includes(activity.toLowerCase())
        );
      default:
        return activities;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-sm p-4 ${className} ${compact ? 'w-48' : 'w-64'}`}
    >
      <div className="flex items-center gap-3 mb-3">
        {getWeatherIcon()}
        <div className="text-sm font-medium">{weather.condition}</div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Thermometer className="w-4 h-4" />
          <span>{weather.temperature}°C</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Wind className="w-4 h-4" />
          <span>{weather.windSpeed} km/h</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Droplets className="w-4 h-4" />
          <span>{weather.humidity}%</span>
        </div>
      </div>

      {!compact && activities && activities.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Recommended Activities</h4>
          <div className="flex flex-wrap gap-1">
            {getRecommendedActivities().map((activity, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
