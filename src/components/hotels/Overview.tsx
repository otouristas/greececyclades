import React from 'react';
import { Hotel } from '../../types';
import { Star, Users, Clock, Wifi } from 'lucide-react';

interface OverviewProps {
  hotel: Hotel;
}

export default function Overview({ hotel }: OverviewProps) {
  return (
    <section id="overview" className="py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-lg font-medium">{hotel.rating}</span>
            <span className="text-gray-500">({hotel.reviews} reviews)</span>
          </div>

          <h2 className="text-3xl font-bold mb-6">About {hotel.name}</h2>
          <p className="text-gray-600 mb-8">
            {hotel.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium">Check-in</div>
                <div className="text-sm text-gray-500">From 15:00</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium">Check-out</div>
                <div className="text-sm text-gray-500">Until 11:00</div>
              </div>
            </div>
            {hotel.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-3">
                <Wifi className="h-5 w-5 text-blue-600" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-96 rounded-xl overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}