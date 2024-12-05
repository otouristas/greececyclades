import React from 'react';
import { Plane, Ship, Bus, Car } from 'lucide-react';
import { Island } from '../../types';

interface TransportInfoProps {
  island: Island;
}

export default function TransportInfo({ island }: TransportInfoProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">By Air</h3>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Plane className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600 mb-4">
              Direct flights available from Athens International Airport (ATH) to {island.name} Airport.
              Flight duration: approximately 45 minutes.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Multiple daily flights during peak season</li>
              <li>Major airlines: Aegean Airlines, Olympic Air</li>
              <li>Book in advance during summer months</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">By Ferry</h3>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Ship className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600 mb-4">
              Regular ferry services from Piraeus Port (Athens) to {island.name}.
              Journey time: 4-8 hours depending on ferry type.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>High-speed and conventional options</li>
              <li>Multiple daily departures in summer</li>
              <li>Operators: Blue Star Ferries, SeaJets</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Local Transport</h3>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Bus className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600 mb-4">
              Public buses connect major villages and beaches on {island.name}.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Regular service during peak season</li>
              <li>Air-conditioned buses</li>
              <li>Affordable ticket prices</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Car Rental</h3>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Car className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600 mb-4">
              Multiple car rental agencies available on {island.name}.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>International and local rental companies</li>
              <li>Wide range of vehicles available</li>
              <li>Book in advance during peak season</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}