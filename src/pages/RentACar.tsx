import React from 'react';
import SearchForm from '../components/vehicles/SearchForm';
import FilterSidebar from '../components/vehicles/FilterSidebar';
import VehicleGrid from '../components/vehicles/VehicleGrid';
import { useVehicleStore } from '../store/vehicleStore';

export default function RentACar() {
  const { vehicles } = useVehicleStore();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80"
            alt="Luxury car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Find Your Perfect Rental Car
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Explore the Cyclades islands with our premium fleet of vehicles. 
              Best rates guaranteed.
            </p>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar />
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Available Vehicles</h2>
                <p className="text-gray-600">
                  {vehicles.length} vehicles found
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="https://rentacarantiparos.gr/wp-content/uploads/2024/03/Aggelos-Rentals-Logo-Small.png"
                  alt="AGGELOS Rentals"
                  className="h-8"
                />
                <span className="text-sm text-gray-600">Provided by</span>
              </div>
            </div>

            <VehicleGrid vehicles={vehicles} />
          </div>
        </div>
      </div>
    </div>
  );
}