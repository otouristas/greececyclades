import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaShip, FaHotel, FaMapMarkedAlt, FaUmbrellaBeach, FaRoute, FaUtensils } from 'react-icons/fa';
import { useIslandStore } from '../store/islandStore';

const NaxosGuide: React.FC = () => {
  const navigate = useNavigate();
  const { islands } = useIslandStore();
  const naxos = islands.find(island => island.name === 'Naxos');

  if (!naxos) return null;

  const categories = [
    {
      icon: <FaShip className="w-12 h-12 text-blue-500" />,
      title: 'How to Get There?',
      description: 'Ferry routes and travel options',
      link: '/transport',
      count: null
    },
    {
      icon: <FaHotel className="w-12 h-12 text-blue-500" />,
      title: 'Best Hotels',
      description: 'Accommodations for every budget',
      link: '/hotels',
      count: 18
    },
    {
      icon: <FaMapMarkedAlt className="w-12 h-12 text-blue-500" />,
      title: 'What to Do?',
      description: 'Activities and attractions',
      link: '/activities',
      count: 15
    },
    {
      icon: <FaUmbrellaBeach className="w-12 h-12 text-blue-500" />,
      title: 'Where to Swim?',
      description: 'Best beaches and swimming spots',
      link: '/beaches',
      count: 20
    },
    {
      icon: <FaRoute className="w-12 h-12 text-blue-500" />,
      title: 'Tours & Activities',
      description: 'Guided experiences',
      link: '/tours',
      count: 20
    },
    {
      icon: <FaUtensils className="w-12 h-12 text-blue-500" />,
      title: 'Where to Eat & Drink?',
      description: 'Restaurants and bars',
      link: '/dining',
      count: 30
    }
  ];

  const services = [
    {
      title: 'Ferry Tickets',
      description: 'Book your ferry to Naxos',
      link: '/ferry-tickets'
    },
    {
      title: 'Car Rentals',
      description: 'Explore the island freely',
      link: '/car-rentals'
    },
    {
      title: 'Island Hopping',
      description: 'Visit multiple islands',
      link: '/island-hopping'
    },
    {
      title: 'Custom Services',
      description: 'Tailor-made experiences',
      link: '/custom-services'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url(${naxos.image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-4"
            >
              EXPLORE NAXOS ISLAND!
            </motion.h1>
            <p className="text-xl max-w-2xl">{naxos.description}</p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => navigate(category.link)}
            >
              <div className="flex items-center mb-4">
                {category.icon}
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  {category.count && <span className="text-blue-500">+{category.count}</span>}
                </div>
              </div>
              <p className="text-gray-600">{category.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">OUR TRAVEL SERVICES IN NAXOS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => navigate(service.link)}
              >
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">ABOUT NAXOS GREECE</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 mb-4">
            Despite being relatively low-profile compared to the neighboring Cycladic islands, Naxos is one of the most enticing
            destinations in Greece! It sits in the center of the Cyclades islands group, in the heart of the Aegean sea, and is also the biggest of them.
          </p>
          <p className="text-gray-700 mb-4">
            Its glorious ancient past positions it among the strongest influences of the Venetians and has left behind some remarkable
            ancient sites. The most iconic of them - and the trademark of Naxos - is Portara, the remaining gate of an ancient temple dedicated to
            the Olympian god Apollo.
          </p>
          <p className="text-gray-700">
            Apart from its impressive monuments though, the island boasts a beautiful natural landscape, as it is the greenest of
            the Cyclades. Imposing mountains, green valleys, beautiful beaches, and rural villages will steal every nature lover's
            heart!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NaxosGuide;
