import React, { useState, useEffect } from 'react';
import { Calendar, Car, User } from 'lucide-react';
import { VehicleType } from '../../types/vehicle';
import { useVehicleStore } from '../../store/vehicleStore';
import LocationAutocomplete from './LocationAutocomplete';

export default function SearchForm() {
  const { setFilters } = useVehicleStore();
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType>(VehicleType.CAR);
  const [age, setAge] = useState('25+');

  // Update filters whenever search form values change
  useEffect(() => {
    setFilters({
      vehicleType: vehicleType,
      location: location || null,
      pickupDate: pickupDate || null,
      returnDate: returnDate || null
    });
  }, [location, pickupDate, returnDate, vehicleType, setFilters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Pick-up Location
          </label>
          <LocationAutocomplete 
            value={location}
            onChange={setLocation}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Pick-up Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white [color-scheme:dark]"
              />
              <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-white/60" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Return Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={pickupDate || new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white [color-scheme:dark]"
              />
              <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-white/60" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Vehicle Type
            </label>
            <div className="relative">
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value as VehicleType)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white appearance-none"
              >
                {Object.values(VehicleType).map((type) => (
                  <option key={type} value={type} className="text-gray-900">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              <Car className="absolute left-3 top-3.5 h-5 w-5 text-white/60" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Driver's Age
            </label>
            <div className="relative">
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white appearance-none"
              >
                <option value="18-24" className="text-gray-900">18-24 years</option>
                <option value="25+" className="text-gray-900">25+ years</option>
              </select>
              <User className="absolute left-3 top-3.5 h-5 w-5 text-white/60" />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        <Car className="h-5 w-5" />
        Search Vehicles
      </button>
    </form>
  );
}