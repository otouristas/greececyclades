import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useVehicleStore } from '../../store/vehicleStore';
import VehicleCard from '../vehicles/VehicleCard';

export default function CarRentals() {
  const { vehicles } = useVehicleStore();
  const featuredVehicles = vehicles.slice(0, 3);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Car Rentals</h2>
            <p className="mt-2 text-gray-600">Explore the islands with our trusted rental partners</p>
          </div>
          <Link 
            to="/rent-a-car"
            className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
          >
            View all vehicles
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle) => (
            <div key={vehicle.id}>
              <VehicleCard vehicle={vehicle} compact />
              <div className="mt-2 text-center">
                <img
                  src="https://rentacarantiparos.gr/wp-content/uploads/2024/03/Aggelos-Rentals-Logo-Small.png"
                  alt="AGGELOS Rentals"
                  className="h-6 mx-auto"
                />
                <div className="text-xs text-gray-600 mt-1">
                  Provided by AGGELOS Rentals
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}