import React from 'react';
import { Users, Fuel, Cog, Star } from 'lucide-react';
import { CarRental } from '../../types';

interface RentACarCardProps {
  car: CarRental;
}

export default function RentACarCard({ car }: RentACarCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
      <div className="relative aspect-[4/3]">
        <img
          src={car.image}
          alt={car.model}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
          From {car.price}/day
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            {car.category}
          </span>
        </div>

        <h3 className="mt-2 text-xl font-semibold text-gray-900">
          {car.make} {car.model}
        </h3>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Cog className="h-4 w-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Fuel className="h-4 w-4" />
            <span>{car.fuelType}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium">{car.rating}</span>
            <span className="text-sm text-gray-500">
              ({car.reviews} reviews)
            </span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}