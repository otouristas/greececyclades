import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaShip, FaHotel, FaMapMarkedAlt, FaUmbrellaBeach, FaRoute, FaUtensils } from 'react-icons/fa';
import { useIslandStore } from '../store/islandStore';

const NaxosGuide: React.FC = () => {
  const navigate = useNavigate();
  const { islands } = useIslandStore();
  const naxos = islands.find(island => island.name === 'Naxos');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (!naxos) return null;

  const categories = [
    {
      icon: <FaShip className="w-8 h-8 text-blue-500 group-hover:text-white transition-colors" />,
      title: 'How to Get There?',
      description: 'Ferry routes and travel options',
      link: '/transport'
    },
    {
      icon: <FaHotel className="w-8 h-8 text-blue-500 group-hover:text-white transition-colors" />,
      title: 'Best Hotels',
      description: 'Accommodations for every budget',
      link: '/hotels'
    },
    {
      icon: <FaMapMarkedAlt className="w-8 h-8 text-blue-500 group-hover:text-white transition-colors" />,
      title: 'What to Do?',
      description: 'Activities and attractions',
      link: '/activities'
    },
    {
      icon: <FaUmbrellaBeach className="w-8 h-8 text-blue-500 group-hover:text-white transition-colors" />,
      title: 'Where to Swim?',
      description: 'Best beaches and swimming spots',
      link: '/beaches'
    },
    {
      icon: <FaRoute className="w-8 h-8 text-blue-500 group-hover:text-white transition-colors" />,
      title: 'Tours & Activities',
      description: 'Guided experiences',
      link: '/tours'
    },
    {
      icon: <FaUtensils className="w-8 h-8 text-blue-500 group-hover:text-white transition-colors" />,
      title: 'Where to Eat & Drink?',
      description: 'Restaurants and bars',
      link: '/dining'
    }
  ];

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      {/* Parallax Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ 
              backgroundImage: `url(${naxos.image})`,
              transform: 'scale(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        </motion.div>
        
        <div className="relative h-full flex flex-col justify-center items-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-6xl font-bold mb-6 tracking-tight">
              Welcome to Naxos
            </h1>
            <p className="text-2xl font-light mb-8 leading-relaxed">
              {naxos.quote}
            </p>
            <div className="flex gap-4 justify-center">
              {naxos.idealFor.map((ideal, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-sm"
                >
                  {ideal}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 -mt-20">
        {/* About Section */}
        <div className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-12 text-center">Discover Naxos</h2>
              <div className="prose prose-lg mx-auto">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Despite being relatively low-profile compared to the neighboring Cycladic islands,
                  Naxos is one of the most enticing destinations in Greece! It sits in the center of
                  the Cyclades islands group, in the heart of the Aegean sea, and is also the biggest of them.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Its glorious ancient past positions it among the strongest influences of the Venetians
                  and has left behind some remarkable ancient sites. The most iconic of them - and the
                  trademark of Naxos - is Portara, the remaining gate of an ancient temple dedicated to
                  the Olympian god Apollo.
                </p>
              </div>

              {/* Travel Information */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Best Time to Visit</h3>
                  <p className="text-gray-700">
                    The best time to visit Naxos is from {naxos.bestTime}. During these months, you'll enjoy:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    <li>• Perfect beach weather</li>
                    <li>• Warm sea temperatures</li>
                    <li>• Less crowded than peak season</li>
                    <li>• Ideal conditions for hiking</li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Must-Visit Locations</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Portara (Apollo's Gate)</li>
                    <li>• Plaka Beach</li>
                    <li>• Chora (Old Town)</li>
                    <li>• Mount Zeus (Za)</li>
                    <li>• Halki Village</li>
                    <li>• Agios Prokopios Beach</li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Getting Around</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Local buses connect major beaches and villages</li>
                    <li>• Rental cars for mountain village exploration</li>
                    <li>• Boat tours for beach hopping</li>
                    <li>• Walking tours in Chora</li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Local Experiences</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Traditional pottery workshops</li>
                    <li>• Kitesurfing lessons</li>
                    <li>• Wine tasting tours</li>
                    <li>• Cooking classes</li>
                    <li>• Mountain hiking tours</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container mx-auto px-4 py-24">
          <h2 className="text-4xl font-bold mb-12 text-center">Essential Travel Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer hover:bg-blue-500 hover:scale-105"
                onClick={() => navigate(category.link)}
              >
                <div className="flex items-center mb-4">
                  {category.icon}
                  <h3 className="text-xl font-semibold ml-4 group-hover:text-white transition-colors">
                    {category.title}
                  </h3>
                </div>
                <p className="text-gray-600 group-hover:text-white/90 transition-colors">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-blue-500 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6">Ready to Experience Naxos?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Best time to visit: {naxos.bestTime}
              </p>
              <button
                onClick={() => navigate('/trip-planner')}
                className="px-8 py-4 bg-white text-blue-500 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                Plan Your Trip Now
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaxosGuide;
