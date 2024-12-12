import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShip, FaUsers, FaWifi, FaCoffee, FaWind, FaRegClock } from 'react-icons/fa';
import type { FerryRoute } from '../types/ferry';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';

const FerrySearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromIsland = searchParams.get('from');
  const toIsland = searchParams.get('to');
  const date = searchParams.get('date');
  const passengers = searchParams.get('passengers');
  const hasCar = searchParams.get('hasCar') === 'true';
  const carLength = searchParams.get('carLength');
  const discountCode = searchParams.get('discountCode');

  const carPrices = {
    small: 45,
    medium: 55,
    large: 65,
    suv: 75
  };

  const applyDiscount = (price: number) => {
    if (discountCode === 'SUMMER2024') {
      return price * 0.9; // 10% discount
    }
    return price;
  };

  // Calculate total price including car if selected
  const calculateTotalPrice = (basePrice: number) => {
    let total = basePrice * (passengers ? parseInt(passengers) : 1);
    if (hasCar && carLength) {
      total += carPrices[carLength as keyof typeof carPrices];
    }
    return applyDiscount(total);
  };

  // This would typically come from an API call based on the search parameters
  const searchResults: FerryRoute[] = [
    {
      id: '1',
      operator: 'Blue Star Ferries',
      logo: 'https://images.ferryhopper.com/companies/optimized/ATC-min.png',
      from: fromIsland || '',
      to: toIsland || '',
      departureTime: '07:25',
      arrivalTime: '14:45',
      duration: '7h 20m',
      price: 59.90,
      type: 'Conventional Ferry',
      amenities: ['Café', 'Restaurant', 'WiFi', 'Air conditioning'],
      availableSeats: 145
    },
    {
      id: '2',
      operator: 'SeaJets',
      logo: 'https://images.ferryhopper.com/companies/optimized/SJT-min.png',
      from: fromIsland || '',
      to: toIsland || '',
      departureTime: '07:00',
      arrivalTime: '11:50',
      duration: '4h 50m',
      price: 84.90,
      type: 'High-speed Ferry',
      amenities: ['Café', 'WiFi', 'Air conditioning'],
      availableSeats: 82
    },
    // Add more results as needed
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <FaWifi />;
      case 'café': return <FaCoffee />;
      case 'air conditioning': return <FaWind />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO 
        title={`Ferry Routes from ${searchParams.get('from')} to ${searchParams.get('to')} | Greece Cyclades`}
        description={`Find the best ferry routes from ${searchParams.get('from')} to ${searchParams.get('to')}. Compare prices and book your tickets online.`}
      />
      
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: 'Ferry Tickets', path: '/ferry-tickets' },
              { label: 'Search Results', path: `/ferry-search-results${location.search}` }
            ]}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Ferry Routes: {fromIsland} to {toIsland}
          </h1>
          <p className="mt-2 text-gray-600">
            {searchResults.length} routes found • {date} • {passengers} passenger(s)
          </p>
        </div>

        <div className="grid gap-6">
          {searchResults.map((route) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-6">
                      <div className="w-32 h-16 relative mr-4 flex-shrink-0 bg-white p-2 rounded-lg">
                        <img
                          src={route.logo}
                          alt={`${route.operator} logo`}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{route.operator}</h3>
                        <span className="inline-block mt-1 px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                          {route.type}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Departure</p>
                        <p className="text-lg font-semibold">{route.departureTime}</p>
                        <p className="text-sm text-gray-700">{route.from}</p>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="flex items-center">
                          <div className="h-px w-12 bg-gray-300"></div>
                          <FaRegClock className="mx-2 text-gray-400" />
                          <div className="h-px w-12 bg-gray-300"></div>
                        </div>
                        <span className="text-sm text-gray-500 absolute mt-6">
                          {route.duration}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Arrival</p>
                        <p className="text-lg font-semibold">{route.arrivalTime}</p>
                        <p className="text-sm text-gray-700">{route.to}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 lg:mt-0 lg:ml-6 flex flex-col items-end">
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">
                        €{calculateTotalPrice(route.price).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {passengers} passenger{parseInt(passengers || '1') > 1 ? 's' : ''}
                        {hasCar && carLength && ` + ${carLength} car`}
                        {discountCode && (
                          <span className="ml-2 text-green-600">
                            (10% OFF)
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center mt-2 space-x-1 text-gray-500">
                      {route.amenities.map((amenity, index) => {
                        const icon = getAmenityIcon(amenity);
                        return icon && (
                          <div 
                            key={index}
                            className="p-1 hover:text-blue-500 cursor-help"
                            title={amenity}
                          >
                            {icon}
                          </div>
                        );
                      })}
                    </div>
                    <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaUsers className="mr-1" />
                      <span>{route.availableSeats} seats available</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      {route.amenities.map((amenity, index) => (
                        <span key={index}>{amenity}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FerrySearchResults;
