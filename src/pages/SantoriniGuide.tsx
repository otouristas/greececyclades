import React from 'react';
import { Link } from 'react-router-dom';
import { FaHotel, FaUmbrellaBeach, FaRoute, FaWineGlass, FaCameraRetro, FaSun, FaCalendarAlt } from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';

const SantoriniGuide: React.FC = () => {
  const santorini = islandGuides.find(island => island.id === 'santorini');

  if (!santorini) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Santorini Travel Guide 2025 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Santorini vacation with our comprehensive 2025 travel guide. Discover the best hotels, restaurants, beaches, and activities. From sunset views in Oia to wine tasting in volcanic vineyards.",
    keywords: [
      'Santorini travel guide',
      'Oia sunset',
      'Santorini hotels',
      'caldera views',
      'Greek islands',
      'Fira',
      'volcanic beaches',
      'Santorini wineries',
      'Santorini activities',
      'best time to visit Santorini'
    ],
    ogImage: santorini.image,
    ogType: 'article'
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="min-h-screen bg-gray-50">
        <IslandGuideHero {...santorini} />
        
        {/* Introduction Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-3xl font-bold mb-6">Welcome to Santorini</h2>
            <p className="text-gray-700 leading-relaxed">
              Rising dramatically from the Aegean Sea, Santorini is a masterpiece of natural beauty and human architecture. 
              This crescent-shaped island, born from one of history's largest volcanic eruptions, offers a spectacular blend 
              of pristine white-washed buildings, multicolored cliffs, and the world's most breathtaking sunsets.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're seeking a romantic getaway, a photography adventure, or a cultural journey through ancient history, 
              Santorini promises an unforgettable experience. Our comprehensive guide will help you discover the best of what 
              this magical island has to offer.
            </p>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaUmbrellaBeach className="text-3xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Volcanic Beaches</h3>
              <p className="text-gray-600 mb-4">Discover unique black sand beaches and red beach formed by volcanic activity.</p>
              <Link to="#beaches" className="text-blue-500 hover:text-blue-600">Explore beaches →</Link>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaHotel className="text-3xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Luxury Stays</h3>
              <p className="text-gray-600 mb-4">Experience world-class hotels with infinity pools and caldera views.</p>
              <Link to="#accommodation" className="text-blue-500 hover:text-blue-600">Find hotels →</Link>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaWineGlass className="text-3xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Wine & Dine</h3>
              <p className="text-gray-600 mb-4">Savor local wines and cuisine with stunning caldera views.</p>
              <Link to="#dining" className="text-blue-500 hover:text-blue-600">Discover restaurants →</Link>
            </div>
          </div>

          {/* When to Visit Section */}
          <section id="when-to-visit" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">When to Visit Santorini</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaSun className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Peak Season</h3>
                <p className="text-gray-600">June to September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Perfect weather</li>
                  <li>• Bustling atmosphere</li>
                  <li>• Higher prices</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaCalendarAlt className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Shoulder Season</h3>
                <p className="text-gray-600">April-May, October</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Mild weather</li>
                  <li>• Fewer crowds</li>
                  <li>• Better prices</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaCameraRetro className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Best for Photos</h3>
                <p className="text-gray-600">September-October</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Clear skies</li>
                  <li>• Perfect lighting</li>
                  <li>• Amazing sunsets</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaRoute className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Best for Activities</h3>
                <p className="text-gray-600">May-June, September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Hiking weather</li>
                  <li>• Wine tours</li>
                  <li>• Boat trips</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Must-Visit Villages Section */}
          <section id="villages" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Must-Visit Villages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://source.unsplash.com/1600x900/?santorini,oia" 
                  alt="Oia Village" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Oia</h3>
                  <p className="text-gray-600 mb-4">
                    Famous for its stunning sunsets, blue-domed churches, and winding marble streets. 
                    The most photographed location in Santorini.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Best sunset views</li>
                    <li>• Luxury hotels</li>
                    <li>• Art galleries</li>
                    <li>• Fine dining</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://source.unsplash.com/1600x900/?santorini,fira" 
                  alt="Fira Town" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Fira</h3>
                  <p className="text-gray-600 mb-4">
                    The vibrant capital of Santorini, offering a perfect blend of shopping, 
                    dining, and nightlife with spectacular caldera views.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Shopping district</li>
                    <li>• Nightlife hub</li>
                    <li>• Cable car rides</li>
                    <li>• Museum of Prehistoric Thera</li>
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
                <h3 className="font-semibold text-xl mb-4">Sunset Experiences</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Sunset in Oia</li>
                  <li>• Sunset sailing cruise</li>
                  <li>• Caldera view dining</li>
                  <li>• Santo Wines sunset tasting</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-4">Cultural Activities</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Akrotiri archaeological site</li>
                  <li>• Wine museum</li>
                  <li>• Traditional villages tour</li>
                  <li>• Cooking classes</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-4">Adventure & Nature</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Volcano hiking</li>
                  <li>• Hot springs visit</li>
                  <li>• Scuba diving</li>
                  <li>• Sea kayaking</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Travel Tips Section */}
          <section id="tips" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Essential Travel Tips</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Getting Around</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Rent an ATV or car for flexibility</li>
                    <li>• Use local buses for budget travel</li>
                    <li>• Book airport transfers in advance</li>
                    <li>• Consider water taxis between beaches</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Money Saving Tips</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Visit during shoulder season</li>
                    <li>• Book accommodations early</li>
                    <li>• Stay in Fira or Firostefani</li>
                    <li>• Use local transportation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Santorini?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Start planning your dream vacation to this magical island
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/trip-planner" 
                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Plan My Trip
              </Link>
              <Link 
                to="/hotels?location=santorini" 
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

export default SantoriniGuide;
