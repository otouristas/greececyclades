import React from 'react';

const FlightHero: React.FC = () => {
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="/images/flight-hero.jpg"
          alt="Flight to Greek Islands"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Flight Tickets to Greek Islands
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          Find the best flight deals to the Cyclades islands. Direct flights available from Athens (ATH) to Santorini (JTR), 
          Mykonos (JMK), and other island destinations.
        </p>
      </div>
    </div>
  );
};

export default FlightHero;
