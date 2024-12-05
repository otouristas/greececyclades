import React from 'react';
import { Sliders } from 'lucide-react';
import { useVehicleStore } from '../../store/vehicleStore';
import { VehicleType } from '../../types/vehicle';

export default function FilterSidebar() {
  const { filters, setFilters, resetFilters } = useVehicleStore();

  return (
    <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold">Filters</h2>
        <Sliders className="h-5 w-5 text-gray-500" />
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (€/day)
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="200"
              step="10"
              value={filters.priceRange.max}
              onChange={(e) => setFilters({ 
                priceRange: { ...filters.priceRange, max: Number(e.target.value) }
              })}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>€0</span>
              <span>€{filters.priceRange.max}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Type
          </label>
          <select
            value={filters.vehicleType || ''}
            onChange={(e) => setFilters({ 
              vehicleType: e.target.value ? e.target.value as VehicleType : null 
            })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value={VehicleType.CAR}>Car</option>
            <option value={VehicleType.BIKE}>Bike</option>
            <option value={VehicleType.MOTO}>Motorcycle</option>
            <option value={VehicleType.SCOOTER}>Scooter</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transmission
          </label>
          <select
            value={filters.transmission || ''}
            onChange={(e) => setFilters({ 
              transmission: e.target.value || null 
            })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Passengers
          </label>
          <select
            value={filters.passengers || ''}
            onChange={(e) => setFilters({ 
              passengers: e.target.value ? Number(e.target.value) : null 
            })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="2">2+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="7">7+</option>
          </select>
        </div>

        <button
          onClick={resetFilters}
          className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}