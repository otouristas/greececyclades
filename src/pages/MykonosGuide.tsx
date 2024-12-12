import React from 'react';
import { Link } from 'react-router-dom';
import { FaShip, FaHotel, FaMapMarkedAlt, FaUmbrellaBeach, FaRoute, FaUtensils, FaWineGlass, FaCameraRetro, FaSun, FaCalendarAlt, FaMusic, FaGlassCheers } from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';

const MykonosGuide: React.FC = () => {
  const mykonos = islandGuides.find(island => island.id === 'mykonos');

  if (!mykonos) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Mykonos Travel Guide 2025 - Best Beaches, Nightlife & Things to Do",
    description: "Plan your perfect Mykonos vacation with our comprehensive 2025 travel guide. From pristine beaches and vibrant nightlife to traditional villages and luxury experiences.",
    keywords: [
      'Mykonos travel guide',
      'Mykonos beaches',
      'Mykonos nightlife',
      'Little Venice Mykonos',
      'Mykonos windmills',
      'Greek islands',
      'luxury hotels Mykonos',
      'beach clubs Mykonos',
      'Mykonos restaurants',
      'best time to visit Mykonos'
    ],
    ogImage: mykonos.image,
    ogType: 'article'
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="min-h-screen bg-gray-50">
        <IslandGuideHero {...mykonos} />
        
        {/* Introduction Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-3xl font-bold mb-6">Welcome to Mykonos</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Mykonos, Greece's most glamorous island destination. Known for its vibrant nightlife, 
              pristine beaches, and cosmopolitan atmosphere, Mykonos perfectly blends traditional Cycladic charm 
              with modern luxury and excitement.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From the iconic windmills and the charming Little Venice to world-famous beach clubs and 
              gourmet restaurants, Mykonos offers an unforgettable experience for luxury seekers, party enthusiasts, 
              and culture lovers alike.
            </p>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaUmbrellaBeach className="text-3xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Famous Beaches</h3>
              <p className="text-gray-600 mb-4">Discover world-renowned beaches from Paradise to Super Paradise.</p>
              <Link to="#beaches" className="text-blue-500 hover:text-blue-600">Explore beaches →</Link>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaGlassCheers className="text-3xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Vibrant Nightlife</h3>
              <p className="text-gray-600 mb-4">Experience the legendary parties and beach clubs.</p>
              <Link to="#nightlife" className="text-blue-500 hover:text-blue-600">Discover nightlife →</Link>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaHotel className="text-3xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Luxury Stays</h3>
              <p className="text-gray-600 mb-4">Find the perfect boutique hotel or luxury resort.</p>
              <Link to="#accommodation" className="text-blue-500 hover:text-blue-600">View hotels →</Link>
            </div>
          </div>

          {/* When to Visit Section */}
          <section id="when-to-visit" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">When to Visit Mykonos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaSun className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Peak Season</h3>
                <p className="text-gray-600">July to August</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Vibrant atmosphere</li>
                  <li>• Best nightlife</li>
                  <li>• Warmest weather</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaCalendarAlt className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Shoulder Season</h3>
                <p className="text-gray-600">May-June, September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Pleasant weather</li>
                  <li>• Fewer crowds</li>
                  <li>• Better rates</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaMusic className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Party Season</h3>
                <p className="text-gray-600">June to September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Beach parties</li>
                  <li>• Famous DJs</li>
                  <li>• Club events</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaCameraRetro className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Best for Photos</h3>
                <p className="text-gray-600">April-May, September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Golden light</li>
                  <li>• Clear skies</li>
                  <li>• Less crowded</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Must-Visit Locations */}
          <section id="locations" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Must-Visit Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://source.unsplash.com/1600x900/?mykonos,windmills" 
                  alt="Mykonos Windmills" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Windmills & Little Venice</h3>
                  <p className="text-gray-600 mb-4">
                    The iconic windmills and the picturesque Little Venice quarter are the most 
                    photographed spots in Mykonos, offering stunning sunset views.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Sunset viewpoint</li>
                    <li>• Historic landmarks</li>
                    <li>• Waterfront dining</li>
                    <li>• Art galleries</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://source.unsplash.com/1600x900/?mykonos,beach" 
                  alt="Paradise Beach" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Paradise Beach</h3>
                  <p className="text-gray-600 mb-4">
                    The most famous beach in Mykonos, known for its crystal-clear waters, 
                    golden sand, and legendary beach parties.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Beach clubs</li>
                    <li>• Water sports</li>
                    <li>• Beachfront bars</li>
                    <li>• Sunset parties</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Top Things to Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-4">Beach Life</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Paradise Beach parties</li>
                  <li>• Super Paradise Beach</li>
                  <li>• Psarou Beach lounging</li>
                  <li>• Water sports activities</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-4">Cultural Experiences</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Windmills tour</li>
                  <li>• Little Venice exploration</li>
                  <li>• Delos archaeological site</li>
                  <li>• Local art galleries</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-4">Nightlife & Entertainment</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Beach club parties</li>
                  <li>• Sunset cocktails</li>
                  <li>• Live music venues</li>
                  <li>• Club hopping</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Travel Tips */}
          <section id="tips" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Essential Travel Tips</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Getting Around</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Rent an ATV for beach hopping</li>
                    <li>• Use water taxis between beaches</li>
                    <li>• Book airport transfers ahead</li>
                    <li>• Walk in Mykonos Town</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Money Saving Tips</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Book accommodations early</li>
                    <li>• Visit in shoulder season</li>
                    <li>• Use local buses</li>
                    <li>• Eat at local tavernas</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Mykonos?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Start planning your perfect getaway to the island of winds and luxury
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/trip-planner" 
                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Plan My Trip
              </Link>
              <Link 
                to="/hotels?location=mykonos" 
                className="bg-white text-blue-500 border border-blue-500 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Find Hotels
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default MykonosGuide;
