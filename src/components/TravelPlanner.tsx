import React, { useState } from 'react';
import { Calendar, MapPin, Ship, Plane } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  type: 'island' | 'city';
}

export default function TravelPlanner() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDestinations, setSelectedDestinations] = useState<number[]>([]);

  const destinations: Destination[] = [
    { id: 1, name: 'Santorini', type: 'island' },
    { id: 2, name: 'Mykonos', type: 'island' },
    { id: 3, name: 'Naxos', type: 'island' },
    { id: 4, name: 'Athens', type: 'city' },
  ];

  const handleDestinationToggle = (id: number) => {
    setSelectedDestinations(prev => 
      prev.includes(id) 
        ? prev.filter(destId => destId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Plan Your Trip</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Destinations
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {destinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => handleDestinationToggle(dest.id)}
                className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                  selectedDestinations.includes(dest.id)
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                {dest.type === 'island' ? (
                  <Ship className="h-4 w-4" />
                ) : (
                  <Plane className="h-4 w-4" />
                )}
                <span>{dest.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transportation
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 p-3 rounded-lg border hover:bg-gray-50">
              <Ship className="h-5 w-5" />
              <span>Ferry</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-3 rounded-lg border hover:bg-gray-50">
              <Plane className="h-5 w-5" />
              <span>Flight</span>
            </button>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Create Itinerary
        </button>
      </div>
    </div>
  );
}