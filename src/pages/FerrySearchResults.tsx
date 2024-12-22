import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaWifi, FaCoffee, FaWind, FaRegClock, FaShip, FaBolt } from 'react-icons/fa';
import { ChevronRight } from 'lucide-react';
import type { FerryRoute } from '../types/ferry';
import { ferryCompanies } from '../data/ferryCompanies.ts';
import SEO from '../components/SEO';

const FerrySearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromIsland = searchParams.get('from') || '';
  const toIsland = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  const passengers = searchParams.get('passengers') || '1';

  // Mock data - replace with actual API call
  const searchResults: FerryRoute[] = [
    {
      id: '1',
      company: 'Blue Star Ferries',
      departureTime: '07:30',
      arrivalTime: '13:45',
      duration: '6h 15m',
      price: 39.50,
      amenities: ['wifi', 'cafe', 'air-conditioning'],
      availableSeats: 45,
      vessel: 'Blue Star Paros',
      isIslandHopping: true,
      intermediateStops: [
        {
          port: 'Serifos',
          arrivalTime: '10:15',
          departureTime: '10:25'
        },
        {
          port: 'Sifnos',
          arrivalTime: '11:10',
          departureTime: '11:20'
        }
      ]
    },
    {
      id: '2',
      company: 'SeaJets',
      departureTime: '09:00',
      arrivalTime: '11:30',
      duration: '2h 30m',
      price: 59.90,
      amenities: ['wifi', 'cafe', 'air-conditioning', 'premium-seats'],
      availableSeats: 32,
      vessel: 'WorldChampion Jet'
    },
    {
      id: '3',
      company: 'Golden Star Ferries',
      departureTime: '10:15',
      arrivalTime: '14:00',
      duration: '3h 45m',
      price: 44.00,
      amenities: ['wifi', 'cafe', 'air-conditioning'],
      availableSeats: 28,
      vessel: 'Superferry II'
    },
    {
      id: '4',
      company: 'Fast Ferries',
      departureTime: '11:30',
      arrivalTime: '15:15',
      duration: '3h 45m',
      price: 42.50,
      amenities: ['wifi', 'cafe', 'air-conditioning'],
      availableSeats: 35,
      vessel: 'Fast Ferries Andros'
    },
    {
      id: '5',
      company: 'Hellenic Seaways',
      departureTime: '13:00',
      arrivalTime: '16:45',
      duration: '3h 45m',
      price: 45.00,
      amenities: ['wifi', 'cafe', 'air-conditioning', 'premium-seats'],
      availableSeats: 40,
      vessel: 'Flyingcat 4'
    },
    {
      id: '6',
      company: 'ANEK Lines',
      departureTime: '14:30',
      arrivalTime: '18:45',
      duration: '4h 15m',
      price: 41.00,
      amenities: ['wifi', 'cafe', 'air-conditioning', 'premium-seats'],
      availableSeats: 50,
      vessel: 'Prevelis'
    },
    {
      id: '7',
      company: 'Aegean Sea Lines',
      departureTime: '16:00',
      arrivalTime: '19:30',
      duration: '3h 30m',
      price: 43.50,
      amenities: ['wifi', 'cafe', 'air-conditioning'],
      availableSeats: 25,
      vessel: 'Speed Runner'
    },
    {
      id: '8',
      company: 'Zante Ferries',
      departureTime: '17:30',
      arrivalTime: '21:15',
      duration: '3h 45m',
      price: 40.00,
      amenities: ['wifi', 'cafe', 'air-conditioning'],
      availableSeats: 38,
      vessel: 'Dionisios Solomos'
    }
  ];

  // Helper function to convert duration string to minutes
  const durationToMinutes = (duration: string): number => {
    const [hours, minutes] = duration.split('h ');
    return parseInt(hours) * 60 + parseInt(minutes.replace('m', ''));
  };

  // Find the fastest route
  const fastestRoute = searchResults.reduce((fastest, current) => {
    const fastestDuration = durationToMinutes(fastest.duration);
    const currentDuration = durationToMinutes(current.duration);
    return currentDuration < fastestDuration ? current : fastest;
  }, searchResults[0]);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <FaWifi className="text-gray-600" />;
      case 'cafe':
        return <FaCoffee className="text-gray-600" />;
      case 'air-conditioning':
        return <FaWind className="text-gray-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <SEO
        title={`Ferry Routes: ${fromIsland} to ${toIsland} | Greece Cyclades`}
        description={`Find the best ferry routes from ${fromIsland} to ${toIsland}. Compare prices and book your tickets online.`}
      />
      
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">
            Ferry Routes: {fromIsland} to {toIsland}
          </h1>
          <div className="flex items-center gap-4 text-blue-100">
            <div className="flex items-center gap-2">
              <FaRegClock />
              <span>{new Date(date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers />
              <span>{passengers} passenger{parseInt(passengers) > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {searchResults.map((route) => {
            const isFastest = route.id === fastestRoute.id;
            
            return (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-lg overflow-hidden relative
                ${isFastest 
                  ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-100' 
                  : 'shadow-md hover:shadow-lg'
                } 
                transition-all duration-300`
              }
            >
              {isFastest && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-bl-lg shadow-md flex items-center gap-2 z-10">
                  <FaBolt className="text-yellow-300" />
                  <span className="text-sm font-medium">Fastest Route</span>
                </div>
              )}
              
              <div className={`p-4 sm:p-6 ${isFastest ? 'bg-blue-50/50' : ''}`}>
                {/* Island Hopping Badge */}
                {route.isIslandHopping && Array.isArray(route.intermediateStops) && route.intermediateStops.length > 0 && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full">
                      Island Hopping
                    </span>
                  </div>
                )}

                {/* Company and Price Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className={`w-16 h-16 flex-shrink-0 rounded-lg p-2 flex items-center justify-center
                      ${isFastest ? 'bg-white shadow-md' : 'bg-gray-50'}`}>
                      <img 
                        src={ferryCompanies[route.company]?.logo} 
                        alt={route.company} 
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{route.company}</h3>
                      <div className="flex items-center gap-2 text-gray-500">
                        <FaShip className="text-gray-400" />
                        <p className="text-sm">{route.vessel}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full sm:w-auto sm:block text-right">
                    <p className="text-2xl font-bold text-blue-600">€{route.price.toFixed(2)}</p>
                    <div>
                      <p className="text-sm text-gray-500">per person</p>
                      <p className="text-sm text-green-600 mt-1">
                        {route.availableSeats} seats left
                      </p>
                    </div>
                  </div>
                </div>

                {/* Time and Duration Row */}
                <div className={`flex items-center justify-between mb-6 rounded-lg p-4
                  ${isFastest ? 'bg-white shadow-sm' : 'bg-gray-50'}`}>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <div>
                        <p className="text-xl sm:text-2xl font-semibold text-gray-900">{route.departureTime}</p>
                        <p className="text-sm text-gray-500">{fromIsland}</p>
                      </div>
                      <div className="hidden sm:block flex-1 px-4">
                        <div className="relative">
                          <div className={`absolute w-full h-0.5 top-1/2 transform -translate-y-1/2
                            ${isFastest ? 'bg-blue-200' : 'bg-gray-300'}`}></div>
                          <div className={`absolute left-0 -ml-1 w-2 h-2 rounded-full
                            ${isFastest ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
                          <div className={`absolute right-0 -mr-1 w-2 h-2 rounded-full
                            ${isFastest ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
                          
                          {/* Intermediate Stops */}
                          {route.intermediateStops && Array.isArray(route.intermediateStops) && route.intermediateStops.map((stop, index) => {
                            const stopsLength = route.intermediateStops?.length || 0;
                            const percentage = (index + 1) / (stopsLength + 1) * 100;
                            return (
                              <div 
                                key={stop.port}
                                className="absolute w-2 h-2 bg-blue-600 rounded-full transform -translate-x-1"
                                style={{ left: `${percentage}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
                              >
                                <div className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2">
                                  <p className="text-xs text-blue-600 whitespace-nowrap">{stop.port}</p>
                                  <p className="text-[10px] text-blue-500/80">{stop.arrivalTime}</p>
                                </div>
                              </div>
                            );
                          })}
                          
                          <p className={`text-sm font-medium text-center mt-14
                            ${isFastest ? 'text-blue-500' : 'text-blue-600'}`}>
                            {route.duration}
                            {route.isIslandHopping && Array.isArray(route.intermediateStops) && route.intermediateStops.length > 0 && (
                              <span className="block text-xs text-emerald-600 mt-0.5">
                                Includes {route.intermediateStops.length} stops
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-xl sm:text-2xl font-semibold text-gray-900">{route.arrivalTime}</p>
                        <p className="text-sm text-gray-500">{toIsland}</p>
                      </div>
                      <div className="block sm:hidden w-full">
                        <p className={`text-sm font-medium text-center mt-2
                          ${isFastest ? 'text-blue-500' : 'text-blue-600'}`}>
                          Duration: {route.duration}
                          {route.isIslandHopping && Array.isArray(route.intermediateStops) && route.intermediateStops.length > 0 && (
                            <span className="text-xs text-emerald-600">
                              Stops: {route.intermediateStops.map(stop => stop.port).join(', ')}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities and Action Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    {route.amenities.map((amenity, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-2 px-3 py-1 rounded-full
                          ${isFastest ? 'bg-white shadow-sm' : 'bg-gray-50'}`}
                      >
                        {getAmenityIcon(amenity)}
                        <span className="text-sm text-gray-600 capitalize">
                          {amenity.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button 
                    className={`w-full sm:w-auto text-white px-6 py-3 rounded-lg 
                      transition-all duration-300 flex items-center justify-center gap-2
                      ${isFastest 
                        ? 'shadow-lg shadow-blue-100 hover:shadow-xl hover:shadow-blue-200' 
                        : 'hover:opacity-90'
                      }`}
                    style={{ 
                      backgroundColor: ferryCompanies[route.company]?.primaryColor 
                    }}
                  >
                    Select
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )})} 
        </div>
      </div>
    </div>
  );
};

export default FerrySearchResults;
