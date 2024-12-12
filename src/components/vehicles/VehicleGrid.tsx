import React from 'react';
import { Link } from 'react-router-dom';
import VehicleCard from './VehicleCard';
import { Vehicle } from '../../types/vehicle';
import { getVehicleSlug } from '../../utils/slugs';

interface VehicleGridProps {
  vehicles: Vehicle[];
}

export default function VehicleGrid({ vehicles }: VehicleGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {vehicles.map((vehicle) => (
        <Link key={vehicle.id} to={`/rent-a-car/${getVehicleSlug(vehicle.make, vehicle.model)}`}>
          <VehicleCard vehicle={vehicle} />
          <div className="mt-2 text-center">
            <img
              src="https://rentacarantiparos.gr/wp-content/uploads/2024/03/Aggelos-Rentals-Logo-Small.png"
              alt="AGGELOS Rentals"
              className="h-5 sm:h-6 mx-auto"
            />
            <div className="text-xs text-gray-600 mt-1">
              Provided by AGGELOS Rentals
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}