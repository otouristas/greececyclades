import React, { useState } from 'react';
import { Calendar, Users, Ship, MapPin, Search } from 'lucide-react';

// Port codes data
const portCodes = [
  { code: 'ATH', name: 'Athens (Piraeus)' },
  { code: 'RAF', name: 'Athens (Rafina)' },
  { code: 'LAV', name: 'Athens (Lavrio)' },
  { code: 'JMK', name: 'Mykonos' },
  { code: 'JTR', name: 'Santorini' },
  { code: 'PAS', name: 'Paros' },
  { code: 'NAX', name: 'Naxos' },
  { code: 'IOS', name: 'Ios' },
  { code: 'MIL', name: 'Milos' },
  { code: 'SYR', name: 'Syros' },
  { code: 'TIN', name: 'Tinos' },
  { code: 'AND', name: 'Andros' },
  { code: 'KIM', name: 'Kythnos' },
  { code: 'KIM', name: 'Kimolos' },
  { code: 'FOL', name: 'Folegandros' },
  { code: 'SIF', name: 'Sifnos' },
  { code: 'SEF', name: 'Serifos' },
  { code: 'AMO', name: 'Amorgos' },
  { code: 'DON', name: 'Donoussa' },
  { code: 'KOU', name: 'Koufonissi' },
  { code: 'SCH', name: 'Schinoussa' },
  { code: 'IRA', name: 'Iraklia' },
  { code: 'SIK', name: 'Sikinos' },
  { code: 'ANF', name: 'Anafi' },
  { code: 'KEA', name: 'Kea' }
];

interface FerrySearchFormProps {
  className?: string;
}

const FerrySearchForm: React.FC<FerrySearchFormProps> = ({ className }) => {
  const [from, setFrom] = useState('Athens (Piraeus)');
  const [to, setTo] = useState('Mykonos');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [vehicles, setVehicles] = useState(0);
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Base URL
    const baseUrl = 'https://www.ferryscanner.com/en/ferry/results';
    const affiliateParams = 'ref=ztdimtue&utm_source=georgekasiotis&utm_campaign=Ferryscanner+affiliate+program+EN';
    
    // Construct search parameters
    const params = new URLSearchParams();
    params.append('departure_port', from);
    params.append('arrival_port', to);
    
    if (departDate) {
      params.append('departure_date', departDate);
    }
    
    if (isRoundTrip && returnDate) {
      params.append('return_date', returnDate);
    }
    
    params.append('adults', passengers.toString());
    
    // Add vehicle parameter if selected
    if (vehicles > 0) {
      const vehicleTypes = ['', 'car_up_to_4m', 'car_up_to_5m', 'motorcycle'];
      params.append('vehicles', vehicleTypes[vehicles]);
    }
    
    // Construct final URL with affiliate parameters
    const searchParams = params.toString();
    const finalUrl = `${baseUrl}?${searchParams}&${affiliateParams}`;
    
    // Open in new tab
    window.open(finalUrl, '_blank');
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Search Ferry Tickets</h2>
      <form onSubmit={handleSearch} className="space-y-6">
        {/* From/To */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="inline-block mr-1 h-4 w-4" />
              From
            </label>
            <select
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {portCodes.map((port) => (
                <option key={`from-${port.code}`} value={port.name}>
                  {port.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="inline-block mr-1 h-4 w-4" />
              To
            </label>
            <select
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {portCodes.map((port) => (
                <option key={`to-${port.code}`} value={port.name}>
                  {port.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="departDate" className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="inline-block mr-1 h-4 w-4" />
              Depart Date
            </label>
            <input
              type="date"
              id="departDate"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label 
              htmlFor="returnDate" 
              className={`block text-sm font-medium mb-1 ${isRoundTrip ? 'text-gray-700' : 'text-gray-400'}`}
            >
              <Calendar className="inline-block mr-1 h-4 w-4" />
              Return Date
            </label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              disabled={!isRoundTrip}
              className={`w-full p-3 border rounded-md ${isRoundTrip ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-100 border-gray-200 text-gray-400'}`}
            />
          </div>
        </div>

        {/* Passengers & Vehicles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
              <Users className="inline-block mr-1 h-4 w-4" />
              Passengers
            </label>
            <select
              id="passengers"
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={`passengers-${num}`} value={num}>
                  {num} {num === 1 ? 'Passenger' : 'Passengers'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="vehicles" className="block text-sm font-medium text-gray-700 mb-1">
              <Ship className="inline-block mr-1 h-4 w-4" />
              Vehicles
            </label>
            <select
              id="vehicles"
              value={vehicles}
              onChange={(e) => setVehicles(parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="0">No Vehicle</option>
              <option value="1">Car up to 4m</option>
              <option value="2">Car up to 5m</option>
              <option value="3">Motorcycle</option>
            </select>
          </div>
        </div>

        {/* Round Trip Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="roundTrip"
            checked={isRoundTrip}
            onChange={(e) => setIsRoundTrip(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="roundTrip" className="ml-2 block text-sm text-gray-700">
            Round Trip
          </label>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 flex items-center justify-center"
        >
          <Search className="mr-2 h-5 w-5" />
          Search Ferries
        </button>
      </form>
    </div>
  );
};

export default FerrySearchForm;
