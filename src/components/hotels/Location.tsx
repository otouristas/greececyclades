import React from 'react';
import { Hotel } from '../../types';
import { MapPin, Plane, Ship, Bus, Car } from 'lucide-react';

interface LocationProps {
  hotel: Hotel;
}

export default function Location({ hotel }: LocationProps) {
  return (
    <section id="location" className="py-16 border-t">
      <h2 className="text-3xl font-bold mb-8">Location & Access</h2>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="flex items-start gap-3 mb-6">
            <MapPin className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium mb-1">Address</h3>
              <p className="text-gray-600">{hotel.location}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Plane className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium mb-1">From Airport</h3>
                <p className="text-gray-600">15 minutes by car (10 km)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Ship className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium mb-1">From Port</h3>
                <p className="text-gray-600">10 minutes by car (5 km)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Bus className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium mb-1">Public Transport</h3>
                <p className="text-gray-600">Bus stop within 200m</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Car className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium mb-1">Parking</h3>
                <p className="text-gray-600">Free private parking available</p>
              </div>
            </div>
          </div>

          <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Get Directions
          </button>
        </div>

        <div className="h-96 bg-gray-100 rounded-xl">
          <div className="w-full h-full rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80"
              alt="Map"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}