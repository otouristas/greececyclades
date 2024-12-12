import { Star, MapPin, Calendar, Users, Shield, Fuel, Check, Car, Gauge, Settings, Package } from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import BookingWidget from './BookingWidget';
import SEO from '../SEO';
import { generateVehicleDetailSEO } from '../../utils/seo';

interface VehicleLandingProps {
  vehicle: Vehicle;
}

export default function VehicleLanding({ vehicle }: VehicleLandingProps) {
  return (
    <>
      <SEO {...generateVehicleDetailSEO(vehicle)} />
      <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[75vh]">
        <img
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              {/* Vehicle Info */}
              <div className="text-white space-y-6">
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{vehicle.location}</span>
                </div>
                <h1 className="text-6xl font-bold">
                  {vehicle.make} {vehicle.model}
                </h1>
                <div className="flex items-center gap-8 text-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{vehicle.rating}</span>
                    <span className="text-white/90">({vehicle.reviews} reviews)</span>
                  </div>
                  <div className="px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    {vehicle.category}
                  </div>
                </div>
              </div>

              {/* Price Tag */}
              <div className="bg-white/10 backdrop-blur-sm px-8 py-6 rounded-t-2xl border border-white/20 border-b-0 text-white text-center">
                <p className="text-lg text-white/90 mb-1">Starting from</p>
                <p className="text-5xl font-bold mb-1">€{vehicle.price}</p>
                <p className="text-white/90">per day</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: 'Passengers', value: `${vehicle.seats} seats` },
              { icon: Settings, label: 'Transmission', value: vehicle.transmission },
              { icon: Fuel, label: 'Fuel Type', value: vehicle.fuelType },
              { icon: Package, label: 'Luggage', value: `${vehicle.luggage} bags` }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 transform -translate-y-8"
              >
                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="font-medium text-gray-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description and Ideal For Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">About this vehicle</h3>
            <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-4">Ideal For</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {vehicle.idealFor.map((ideal, index) => (
                <div key={index} className="flex items-center space-x-3 bg-blue-50 rounded-lg p-4">
                  <div className="flex-shrink-0">
                    {ideal.toLowerCase().includes('beach') && (
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728M16 7a7 7 0 010 10M13.636 8.364a5 5 0 010 7.272M11.293 9.707a3 3 0 010 4.586" />
                      </svg>
                    )}
                    {ideal.toLowerCase().includes('mountain') && (
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    )}
                    {ideal.toLowerCase().includes('drive') && (
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    )}
                    {ideal.toLowerCase().includes('family') && (
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                    {ideal.toLowerCase().includes('solo') && (
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                    {ideal.toLowerCase().includes('couple') && (
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                    {ideal.toLowerCase().includes('eco') && (
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {!ideal.toLowerCase().match(/(beach|mountain|drive|family|solo|couple|eco)/) && (
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-700">{ideal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vehicle Features */}
              <div className="bg-gray-50 p-8 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Vehicle Features</h2>
                <div className="grid grid-cols-1 gap-4">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-green-50 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rental Terms */}
              <div className="bg-gray-50 p-8 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Rental Terms</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Full Insurance</p>
                      <p className="text-sm text-gray-500">Comprehensive coverage included</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Gauge className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Mileage</p>
                      <p className="text-sm text-gray-500">{vehicle.mileage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Free Cancellation</p>
                      <p className="text-sm text-gray-500">Up to 48 hours before pickup</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Car className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{vehicle.company}</p>
                      <p className="text-sm text-gray-500">Premium Service Provider</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white shadow-xl rounded-xl overflow-hidden">
              <BookingWidget vehicle={vehicle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}