import { Sun, MapPin, Calendar, Users, ArrowRight, Heart, Camera, Ship } from 'lucide-react';
import { Link } from 'react-router-dom';

interface IslandGuideHeroProps {
  name: string;
  description: string;
  image: string;
  weather: {
    temp: string;
    condition: string;
  };
  bestTime: string;
  idealFor: string[];
}

export default function IslandGuideHero({
  name,
  description,
  image,
  weather,
  bestTime,
  idealFor,
}: IslandGuideHeroProps) {
  return (
    <div className="relative min-h-[85vh] flex items-end pb-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <img
            src={image}
            alt={`${name} Island`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Quick Info Bar */}
            <div className="flex flex-wrap gap-4 mb-6 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>Cyclades, Greece</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-blue-400" />
                <span>{weather.temp} · {weather.condition}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-400" />
                <span>Best Time: {bestTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span>Perfect for: {idealFor.join(', ')}</span>
              </div>
            </div>

            {/* Title and Description */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {name}
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to={`/trip-planner?island=${name.toLowerCase()}`}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                Plan Your Visit
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/20 transition-all transform hover:scale-105 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Save to Favorites
              </button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="#photos"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <Camera className="h-5 w-5" />
                <span>View Photos</span>
              </Link>
              <Link
                to="#activities"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <Ship className="h-5 w-5" />
                <span>Explore Activities</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
