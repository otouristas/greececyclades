import React from 'react';
import { Star, MapPin, Calendar, Users, Shield, Fuel, Check } from 'lucide-react';
import { Vehicle } from '../../types';
import BookingWidget from './BookingWidget';

interface VehicleLandingProps {
  vehicle: Vehicle;
}

export default function VehicleLanding({ vehicle }: VehicleLandingProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] mt-16">
        <div className="absolute inset-0">
          <img
            src={vehicle.image}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex flex-col justify-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-white/90 mb-4">
                <MapPin className="h-5 w-5" />
                <span>{vehicle.location}</span>
              </div>
              
              <h1 className="text-5xl font-bold text-white mb-4">
                {vehicle.make} {vehicle.model}
              </h1>
              
              <div className="flex items-center gap-4 text-lg text-white">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span>{vehicle.rating}</span>
                  <span className="text-white/80">({vehicle.reviews} reviews)</span>
                </div>
                <span className="text-white/60">•</span>
                <span>{vehicle.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Vehicle Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Passengers</div>
                    <div className="text-sm text-gray-600">{vehicle.seats} seats</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Fuel className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Fuel Type</div>
                    <div className="text-sm text-gray-600">{vehicle.fuelType}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Minimum Rental</div>
                    <div className="text-sm text-gray-600">1 day</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Insurance</div>
                    <div className="text-sm text-gray-600">Included</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Features & Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {vehicle.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rental Terms */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Rental Terms</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Free Cancellation</div>
                    <div className="text-sm text-gray-600">Up to 48 hours before pick-up</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Mileage</div>
                    <div className="text-sm text-gray-600">{vehicle.mileage}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Insurance Coverage</div>
                    <div className="text-sm text-gray-600">Comprehensive insurance included</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingWidget vehicle={vehicle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}