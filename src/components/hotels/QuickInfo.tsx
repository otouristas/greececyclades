import { MapPin, Star, Share2, Bookmark, Map } from 'lucide-react';
import { HotelCategory } from '../../types/hotel';

interface QuickInfoProps {
  name: string;
  location: {
    area: string;
    island: string;
  };
  category: HotelCategory;
  rating: number;
  reviewCount: number;
  onShare: () => void;
  onSave: () => void;
  onViewMap: () => void;
}

export default function QuickInfo({
  name,
  location,
  category,
  rating,
  reviewCount,
  onShare,
  onSave,
  onViewMap,
}: QuickInfoProps) {
  return (
    <div className="absolute bottom-8 left-0 right-0 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              {/* Hotel Name and Category */}
              <div>
                <h1 className="text-4xl font-bold mb-2">{name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-1" />
                    {location.area}, {location.island}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-1 text-yellow-400" />
                    {category}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="bg-blue-500 text-white px-2 py-1 rounded">
                  {rating.toFixed(1)}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">Excellent</span>
                  <span className="mx-1">·</span>
                  <span>{reviewCount} reviews</span>
                </div>
              </div>

              {/* Key Features */}
              <div className="flex space-x-4 text-sm">
                <span className="px-3 py-1 bg-white/20 rounded-full">Adults Only</span>
                <span className="px-3 py-1 bg-white/20 rounded-full">Beach Access</span>
                <span className="px-3 py-1 bg-white/20 rounded-full">Infinity Pool</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-2">
              <button
                onClick={onShare}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                title="Share"
              >
                <Share2 className="w-6 h-6" />
              </button>
              <button
                onClick={onSave}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                title="Save"
              >
                <Bookmark className="w-6 h-6" />
              </button>
              <button
                onClick={onViewMap}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                title="View Map"
              >
                <Map className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
