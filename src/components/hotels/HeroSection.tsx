import React from 'react';
import { Play, Calendar, Phone } from 'lucide-react';
import { Hotel } from '../../types';

interface HeroSectionProps {
  hotel: Hotel;
  onBookNow: () => void;
}

export default function HeroSection({ hotel, onBookNow }: HeroSectionProps) {
  return (
    <div className="relative h-screen">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {hotel.name}
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Luxurious Beachfront Hotel in {hotel.location}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onBookNow}
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Book Now
            </button>
            <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Check Availability
            </button>
            <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Us
            </button>
          </div>

          <button className="mt-12 flex items-center gap-3 text-white/90 hover:text-white">
            <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
              <Play className="h-6 w-6 fill-current" />
            </div>
            <span className="text-lg">Watch Hotel Tour</span>
          </button>
        </div>
      </div>
    </div>
  );
}