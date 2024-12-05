import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Shield, CreditCard } from 'lucide-react';
import { Vehicle } from '../../types';

interface BookingWidgetProps {
  vehicle: Vehicle;
}

export default function BookingWidget({ vehicle }: BookingWidgetProps) {
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnTime, setReturnTime] = useState('10:00');
  const [location, setLocation] = useState('');
  const [drivers, setDrivers] = useState(1);

  const calculateTotal = () => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, days) * vehicle.price;
  };

  const total = calculateTotal();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Provider Info */}
      <div className="mb-6 text-center">
        <img
          src="https://rentacarantiparos.gr/wp-content/uploads/2024/03/Aggelos-Rentals-Logo-Small.png"
          alt="AGGELOS Rentals"
          className="h-8 mx-auto"
        />
        <div className="text-sm text-gray-600 mt-2">
          Provided by AGGELOS Rentals
        </div>
      </div>

      {/* Price Display */}
      <div className="flex items-baseline justify-center gap-2 mb-6">
        <span className="text-3xl font-bold">€{vehicle.price}</span>
        <span className="text-gray-600">/day</span>
      </div>

      {/* Booking Form */}
      <form className="space-y-4">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pick-up Location
          </label>
          <div className="relative">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Airport or City"
            />
            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Pick-up Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pick-up Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <div className="relative">
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                    {i.toString().padStart(2, '0')}:00
                  </option>
                ))}
              </select>
              <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Return Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <div className="relative">
              <select
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                    {i.toString().padStart(2, '0')}:00
                  </option>
                ))}
              </select>
              <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Number of Drivers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Drivers
          </label>
          <div className="relative">
            <select
              value={drivers}
              onChange={(e) => setDrivers(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Driver' : 'Drivers'}
                </option>
              ))}
            </select>
            <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Price Breakdown */}
        {total > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Daily Rate</span>
              <span>€{vehicle.price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Number of Days</span>
              <span>{Math.ceil(total / vehicle.price)}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Total</span>
              <span>€{total}</span>
            </div>
          </div>
        )}

        {/* Book Now Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Book Now
        </button>
      </form>

      {/* Trust Badges */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Shield className="h-5 w-5 text-green-600" />
          <span>Free cancellation up to 48h before pick-up</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CreditCard className="h-5 w-5 text-green-600" />
          <span>Secure payment through our platform</span>
        </div>
      </div>
    </div>
  );
}