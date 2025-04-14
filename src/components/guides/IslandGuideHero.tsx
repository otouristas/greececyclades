import { Calendar, Users, Camera, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface IslandGuideHeroProps {
  name: string;
  description: string;
  image: string;
  bestTime: string;
  idealFor: string[];
}

export default function IslandGuideHero({
  name,
  description,
  image,
  bestTime,
  idealFor,
}: IslandGuideHeroProps) {
  return (
    <div className="relative min-h-[75vh] md:min-h-[85vh] flex items-end pb-12 md:pb-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10" />
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title and Description */}
          <div className="max-w-3xl mt-8 sm:mt-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {name}
            </h1>
            <p className="text-lg text-white/90 mb-8">
              {description}
            </p>
          </div>

          {/* Action Buttons and Info */}
          <div className="space-y-6">
            {/* Primary Action */}
            <div className="flex">
              <Link
                to={`/trip-planner?island=${name.toLowerCase()}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors"
              >
                Plan Your Trip
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="#photos"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium transition-colors"
              >
                <Camera className="h-5 w-5 mr-2" />
                View Photos
              </Link>
              <Link
                to="#activities"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium transition-colors"
              >
                <Clock className="h-5 w-5 mr-2" />
                Explore Activities
              </Link>
            </div>

            {/* Info Bar */}
            <div className="flex flex-col sm:flex-row gap-4 text-white/90 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span>Best Time: {bestTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span>Perfect for: {idealFor.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
