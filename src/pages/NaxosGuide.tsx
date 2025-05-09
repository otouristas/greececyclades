import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaShip, FaHotel, FaMapMarkedAlt, FaUmbrellaBeach, FaRoute, FaUtensils } from 'react-icons/fa';
import { useIslandStore } from '../store/islandStore';
import SEO from '../components/SEO';
import { generateGuideSEO } from '../utils/seoMetadata';

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
      <SEO 
        title="Naxos Travel Guide 2025 - Best Beaches, Mountains & Things to Do"
        description="Experience the diverse beauty of Naxos with our comprehensive 2025 travel guide. From pristine beaches and mountain villages to ancient ruins and local gastronomy."
        keywords={[
          'Naxos travel guide',
          'Naxos beaches',
          'Mount Zeus',
          'Chora Naxos',
          'Greek islands',
          'Naxos villages',
          'ancient ruins',
          'hiking Naxos',
          'Naxos food',
          'best time to visit Naxos'
        ]}
        ogImage={naxos.image}
        ogType="article"
      />
      
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* SEO Description */}
        <section className="mb-16">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to Naxos, the largest and most fertile island of the Cyclades. Known for its 
              stunning beaches, ancient ruins, and traditional mountain villages, Naxos offers a perfect 
              blend of history, culture, and natural beauty. This comprehensive guide will help you 
              discover everything from the iconic Portara gateway and the winding streets of Chora to 
              the pristine beaches of Plaka and Agios Prokopios. Whether you're a history enthusiast, 
              beach lover, or outdoor adventurer, Naxos provides an authentic Greek island experience 
              for every visitor.
            </p>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Best Time to Visit</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            {naxos.bestTime}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Weather</h3>
              <p>{naxos.weather.temp}, {naxos.weather.condition}</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Peak Season</h3>
              <p>June to September</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Shoulder Season</h3>
              <p>April-May, October</p>
            </div>
          </div>
        </section>

        {/* Must Visit Locations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Must Visit Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {naxos.highlights.map((highlight, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{highlight}</h3>
                  <p className="text-gray-600">Explore this amazing location</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Getting Around */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Getting Around</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Transportation Options</h3>
              <ul className="space-y-3">
                <li>Local buses connecting major towns</li>
                <li>Rental cars and ATVs</li>
                <li>Taxi services</li>
                <li>Organized tours</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Tips</h3>
              <ul className="space-y-3">
                <li>Book transportation in advance during peak season</li>
                <li>Consider renting a vehicle for flexibility</li>
                <li>Use the bus system for budget-friendly travel</li>
                <li>Walking is possible between some nearby attractions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Explore Naxos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => navigate(category.link)}
                className="group cursor-pointer bg-white rounded-lg shadow-md p-6 hover:bg-blue-500 transition-colors duration-300"
              >
                <div className="flex items-center space-x-4">
                  {category.icon}
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-white">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-white">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Trip?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Start planning your perfect Naxos getaway today
          </p>
          <button
            onClick={() => navigate('/trip-planner')}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Plan My Trip
          </button>
        </section>
      </div>
    </div>
  );
};

export default NaxosGuide;
