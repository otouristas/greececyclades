import { Vehicle } from '../../types/vehicle';
import { Star, Users, Cog, Fuel, Briefcase } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  compact?: boolean;
}

export default function VehicleCard({ vehicle, compact = false }: VehicleCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className={`relative ${compact ? 'h-[180px]' : 'h-[200px] sm:h-auto sm:aspect-[4/3]'}`}>
        <img
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium">
          €{vehicle.price}/day
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            {vehicle.category}
          </span>
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-xs sm:text-sm font-medium">{vehicle.rating}</span>
          </div>
        </div>

        <h3 className="mt-2 font-semibold text-gray-900 text-sm sm:text-base">
          {vehicle.make} {vehicle.model}
        </h3>

        <div className="mt-2 sm:mt-3 grid grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{vehicle.seats} seats</span>
          </div>
          <div className="flex items-center gap-1">
            <Cog className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{vehicle.luggage} bags</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            ({vehicle.reviews} reviews)
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Select
          </button>
        </div>
      </div>
    </div>
  );
}