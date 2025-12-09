import React from 'react';

const FerryHero: React.FC = () => {
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="/images/ferry-hero.jpg"
          alt="Ferry to Cyclades Islands"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Ferry Tickets to Cyclades Islands
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          Find and book ferry tickets to all Cyclades islands. Compare prices, schedules, and ferry companies for the best deals on your island-hopping adventure.
        </p>
        <div className="mt-8">
          <a 
            href="https://www.ferryhopper.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyclades-turquoise hover:bg-cyclades-turquoise/90"
          >
            Search Ferries on FerryHopper
          </a>
        </div>
      </div>
    </div>
  );
};

export default FerryHero;
