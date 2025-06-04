import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';

interface PopularRoute {
  id: number;
  from: string;
  to: string;
  duration: string;
  price: string;
  type: string;
  image: string;
  bookUrl: string;
}

interface PopularRoutesProps {
  className?: string;
}

const PopularRoutes: React.FC<PopularRoutesProps> = ({ className }) => {
  // Popular ferry routes data
  const popularRoutes: PopularRoute[] = [
    {
      id: 1,
      from: 'Athens (Piraeus)',
      to: 'Mykonos',
      duration: '3-5 hours',
      price: '40',
      type: 'High-speed & Conventional',
      image: '/images/ferries/athens-mykonos.jpg',
      bookUrl: 'https://www.ferryscanner.com/en/ferry/results?departure_port=Athens+%28Piraeus%29&arrival_port=Mykonos&ref=ztdimtue&utm_source=georgekasiotis&utm_campaign=Ferryscanner+affiliate+program+EN'
    },
    {
      id: 2,
      from: 'Athens (Piraeus)',
      to: 'Santorini',
      duration: '5-8 hours',
      price: '45',
      type: 'High-speed & Conventional',
      image: '/images/ferries/athens-santorini.jpg',
      bookUrl: 'https://www.ferryscanner.com/en/ferry/results?departure_port=Athens+%28Piraeus%29&arrival_port=Santorini&ref=ztdimtue&utm_source=georgekasiotis&utm_campaign=Ferryscanner+affiliate+program+EN'
    },
    {
      id: 3,
      from: 'Mykonos',
      to: 'Santorini',
      duration: '2-3 hours',
      price: '60',
      type: 'High-speed',
      image: '/images/ferries/mykonos-santorini.jpg',
      bookUrl: 'https://www.ferryscanner.com/en/ferry/results?departure_port=Mykonos&arrival_port=Santorini&ref=ztdimtue&utm_source=georgekasiotis&utm_campaign=Ferryscanner+affiliate+program+EN'
    },
    {
      id: 4,
      from: 'Athens (Piraeus)',
      to: 'Paros',
      duration: '3-4 hours',
      price: '35',
      type: 'High-speed & Conventional',
      image: '/images/ferries/athens-paros.jpg',
      bookUrl: 'https://www.ferryscanner.com/en/ferry/results?departure_port=Athens+%28Piraeus%29&arrival_port=Paros&ref=ztdimtue&utm_source=georgekasiotis&utm_campaign=Ferryscanner+affiliate+program+EN'
    },
    {
      id: 5,
      from: 'Athens (Piraeus)',
      to: 'Naxos',
      duration: '3.5-6 hours',
      price: '38',
      type: 'High-speed & Conventional',
      image: '/images/ferries/athens-naxos.jpg',
      bookUrl: 'https://www.ferryscanner.com/en/ferry/results?departure_port=Athens+%28Piraeus%29&arrival_port=Naxos&ref=ztdimtue&utm_source=georgekasiotis&utm_campaign=Ferryscanner+affiliate+program+EN'
    },
    {
      id: 6,
      from: 'Paros',
      to: 'Naxos',
      duration: '30-45 min',
      price: '15',
      type: 'High-speed & Conventional',
      image: '/images/ferries/paros-naxos.jpg',
      bookUrl: 'https://www.ferryscanner.com/en/ferry/results?departure_port=Paros&arrival_port=Naxos&ref=ztdimtue&utm_source=georgekasiotis&utm_campaign=Ferryscanner+affiliate+program+EN'
    }
  ];

  const openUrl = (url: string): void => {
    window.open(url, '_blank');
  };

  return (
    <div className={`${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Ferry Routes</h2>
      <p className="text-gray-600 mb-6">
        Choose from the most popular ferry routes in the Cyclades islands:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularRoutes.map((route) => (
          <motion.div
            key={route.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300 cursor-pointer"
            onClick={() => openUrl(route.bookUrl)}
          >
            <div className="relative h-40">
              <img 
                src={route.image} 
                alt={`${route.from} to ${route.to} ferry`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-bold">{route.from} - {route.to}</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{route.duration}</span>
                </div>
                <div className="text-blue-600 font-semibold">
                  From €{route.price}
                </div>
              </div>
              <div className="text-sm text-gray-500">{route.type}</div>
              <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center">
                Book Now <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a 
          href="https://www.ferryscanner.com/en/ferry/results?ref=ztdimtue&utm_source=georgekasiotis&utm_campaign=Ferryscanner+affiliate+program+EN" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View All Routes →
        </a>
      </div>
    </div>
  );
};

export default PopularRoutes;
