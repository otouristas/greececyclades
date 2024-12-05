import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const getCurrentLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Here you would typically reverse geocode the coordinates
          // For now, we'll just show the coordinates
          setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
        }
      );
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search destinations, hotels, activities..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-3 pl-12 pr-32 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 shadow-sm"
        />
        <Search className="absolute left-4 h-5 w-5 text-gray-400" />
        <button
          onClick={getCurrentLocation}
          className="absolute right-4 flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          {isLocating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          <span className="text-sm">Near Me</span>
        </button>
      </div>
    </div>
  );
}