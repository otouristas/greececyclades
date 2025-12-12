import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaUmbrellaBeach,
  FaWineGlass,
  FaMapMarkedAlt,
  FaShip,
  FaUtensils,
  FaHistory,
  FaCalendarAlt,
  FaSun
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';

const KeaGuide: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const kea = islandGuides.find(island => island.id === 'kea');

  if (!kea) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: 'Kea Island Guide | Greece Cyclades',
    description: 'Explore Kea island with our comprehensive guide. Discover the best beaches, villages, activities, and local experiences on this authentic Greek island.',
    ogType: 'article' as const
  };

  const categories = [
    {
      icon: <FaShip className="text-cyan-600 dark:text-cyclades-turquoise" />,
      title: 'How to Get There?',
      description: 'Ferry routes and travel options',
      link: '#transport',
      id: 'transport'
    },
    {
      icon: <FaUmbrellaBeach className="text-cyan-600 dark:text-cyclades-turquoise" />,
      title: 'Where to Swim?',
      description: 'Best beaches and swimming spots',
      link: '#beaches',
      id: 'beaches'
    },
    {
      icon: <FaMapMarkedAlt className="text-cyan-600 dark:text-cyclades-turquoise" />,
      title: 'What to Do?',
      description: 'Activities and attractions',
      link: '#activities',
      id: 'activities'
    },
    {
      icon: <FaUtensils className="text-cyan-600 dark:text-cyclades-turquoise" />,
      title: 'Where to Eat & Drink?',
      description: 'Restaurants and bars',
      link: '#cuisine',
      id: 'cuisine'
    },
    {
      icon: <FaWineGlass className="text-cyan-600 dark:text-cyclades-turquoise" />,
      title: 'Local Products',
      description: 'Honey and delicacies',
      link: '#products',
      id: 'products'
    },
    {
      icon: <FaHistory className="text-cyan-600 dark:text-cyclades-turquoise" />,
      title: 'History & Culture',
      description: 'Island heritage',
      link: '#history',
      id: 'history'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO {...seoData} />

      {/* Parallax Hero Section */}
      <IslandGuideHero
        name={kea.name}
        description={kea.description}
        image={kea.image}
        bestTime={kea.bestTime}
        idealFor={kea.idealFor}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Discover Kea</h2>
              <p className="text-lg text-gray-700 mb-4">
                Welcome to Kea, also known as Tzia, the closest Cycladic island to Athens yet
                refreshingly authentic and undiscovered. Unlike the typical Cycladic scenery,
                Kea's landscape features terracotta-colored houses blending into rolling hills
                covered in ancient oak forests and almond groves.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                The main town, Ioulida, is a maze of stepped alleys and traditional architecture,
                watched over by the island's mascot - an ancient stone lion carved from the native rock.
                Kea's rich maritime history is evident in its numerous shipwrecks, including the famous
                HMHS Britannic, making it a paradise for diving enthusiasts.
              </p>
              <p className="text-lg text-gray-700 dark:text-white/80">
                The island's extensive network of ancient paths, recently restored and well-marked,
                connects four ancient city-states through landscapes of dramatic variety. Whether you're
                hiking through oak forests, exploring ancient ruins, or relaxing on golden beaches,
                Kea offers an authentic Greek island experience just a short ferry ride from Athens.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                <img
                  src="/images/islands/kea/kea-intro-1.jpg"
                  alt="Ioulida village view"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                <img
                  src="/images/islands/kea/kea-intro-2.jpg"
                  alt="Lion of Kea"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md col-span-2">
                <img
                  src="/images/islands/kea/kea-intro-3.jpg"
                  alt="Panoramic view of Kea"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Explore Kea</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <a
                  key={index}
                  href={category.link}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-50 dark:bg-cyan-600/10 p-3 rounded-full mr-4">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-white/60">{category.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* When to Visit Section */}
        <section id="when-to-visit" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">When to Visit Kea</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                The best time to experience Kea's beauty is from May to September, with May, June, and September being ideal for hiking and exploring.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-50 dark:bg-cyan-600/10 p-3 rounded-full mr-4">
                        <FaCalendarAlt className="text-cyan-600 dark:text-cyclades-turquoise" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Seasonal Guide</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Summer (June to August)</h4>
                        <p className="text-gray-600 dark:text-white/60">{kea.weather.summer}</p>
                        <p className="text-gray-600 dark:text-white/60">Peak tourist season with warm temperatures perfect for swimming and beach activities.</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Spring (April to May)</h4>
                        <p className="text-gray-600 dark:text-white/60">{kea.weather.spring}</p>
                        <p className="text-gray-600 dark:text-white/60">Ideal for hiking with mild temperatures and blooming wildflowers covering the landscape.</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Autumn (September to October)</h4>
                        <p className="text-gray-600 dark:text-white/60">{kea.weather.autumn}</p>
                        <p className="text-gray-600 dark:text-white/60">Pleasant temperatures for hiking and swimming with fewer crowds.</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Winter (November to March)</h4>
                        <p className="text-gray-600 dark:text-white/60">{kea.weather.winter}</p>
                        <p className="text-gray-600 dark:text-white/60">Quiet season with occasional rain, perfect for experiencing authentic local life.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-50 dark:bg-cyan-600/10 p-3 rounded-full mr-4">
                        <FaSun className="text-cyan-600 dark:text-cyclades-turquoise" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Travel Tips</h3>
                    </div>

                    <ul className="space-y-3 text-gray-600 dark:text-white/60">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Book accommodations in advance during July and August as options are limited.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Consider visiting in May, June, or September for ideal hiking conditions.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Ferry schedules from Lavrio port are more frequent during high season.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Bring hiking boots if you plan to explore the island's extensive trail network.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Renting a car is recommended to explore the more remote beaches and villages.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>The island can be windy at times, so bring a light jacket even in summer.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Description */}
        <section className="mb-16">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              Explore Kea, the closest Cycladic island to Athens, where ancient trails meet
              pristine beaches and traditional island life thrives year-round. Known for its
              walking paths, diving sites, and authentic Greek atmosphere, Kea offers a perfect
              escape from the mainland. From the iconic Lion of Kea carved in stone to the
              ancient city of Karthaia, from oak forests to golden beaches, this guide will help
              you discover an island that combines natural beauty with rich history and local
              traditions.
            </p>
          </div>
        </section>

        {/* Transport Section */}
        <section id="transport" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How to Get to Kea</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Kea is easily accessible from Athens, making it a perfect weekend getaway or the start of your island-hopping adventure.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">By Ferry</h3>
                    <ul className="space-y-4 text-gray-600 dark:text-white/60">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <p className="font-medium">From Lavrio Port</p>
                          <p>The main connection to Kea is from Lavrio port, located about 60km southeast of Athens.</p>
                          <p>Ferry duration: Approximately 1 hour</p>
                          <p>Frequency: Multiple daily departures in summer, reduced schedule in winter</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <p className="font-medium">Getting to Lavrio</p>
                          <p>From Athens: By KTEL bus from Pedion Areos terminal (journey time ~2 hours)</p>
                          <p>From Athens Airport: By taxi (~40 minutes) or KTEL bus with connection</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Travel Tips</h3>
                    <ul className="space-y-3 text-gray-600 dark:text-white/60">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Book ferry tickets in advance during high season (June-September).</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Check the latest ferry schedules as they can change seasonally.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Consider bringing a car on the ferry if you plan to explore the island extensively.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>The main port on Kea is Korissia, from where you can take buses or taxis to other parts of the island.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Beaches Section */}
        <section id="beaches" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Beaches in Kea</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Kea offers a variety of beaches from organized sandy shores to secluded coves with crystal-clear waters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/kea/koundouros-beach.jpg"
                  alt="Koundouros Beach"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Koundouros Beach</h3>
                  <p className="text-gray-600 mb-4">
                    A popular organized beach on the west coast with crystal clear waters and fine sand.
                    Perfect for families with beach bars, restaurants, and water sports facilities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Organized</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Water Sports</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/kea/otzias-beach.jpg"
                  alt="Otzias Beach"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Otzias Beach</h3>
                  <p className="text-gray-600 mb-4">
                    The largest sandy beach on the island, located in a sheltered bay with shallow waters.
                    Ideal for families with children and offering several tavernas nearby.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tavernas</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Shallow Waters</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/kea/pisses-beach.jpg"
                  alt="Pisses Beach"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pisses Beach</h3>
                  <p className="text-gray-600 mb-4">
                    A beautiful sandy beach with turquoise waters on the west coast of the island.
                    Partially organized with a beach bar and taverna offering fresh seafood.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Semi-Organized</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Bar</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Seafood</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Other notable beaches include Xyla (secluded), Spathi (pristine waters), and Gialiskari (family-friendly).
              </p>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section id="activities" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What to Do in Kea</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                From hiking ancient trails to exploring underwater shipwrecks, Kea offers diverse activities for every type of traveler.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/kea/hiking-trails.jpg"
                  alt="Hiking Trails in Kea"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Hiking the Ancient Trails</h3>
                  <p className="text-gray-600 mb-4">
                    Kea boasts an extensive network of well-marked hiking trails that connect ancient sites, traditional villages, and beautiful viewpoints.
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>The Lion Trail: Visit the famous stone lion carving (6th century BC)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Ancient Karthaia: Hike to the archaeological site of one of Kea's four ancient city-states</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Ioulida to Otzias: A scenic route through oak forests and traditional farmland</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/kea/diving.jpg"
                  alt="Diving in Kea"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Diving & Snorkeling</h3>
                  <p className="text-gray-600 mb-4">
                    Kea is a paradise for diving enthusiasts with its rich underwater world and famous shipwrecks.
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>HMHS Britannic: Sister ship to the Titanic, sunk in 1916 (for experienced divers)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>SS Burdigala: A French steamer torpedoed in WWI</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Koundouros Bay: Perfect for beginners with clear waters and rich marine life</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/kea/ioulida.jpg"
                  alt="Ioulida Village"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Explore Traditional Villages</h3>
                  <p className="text-gray-600 mb-4">
                    Discover the authentic charm of Kea's traditional settlements with their unique architecture and local culture.
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Ioulida: The capital with its maze of narrow streets and traditional houses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Vourkari: A picturesque fishing village with excellent seafood restaurants</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Korissia: The main port with a beautiful waterfront promenade</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/kea/local-products.jpg"
                  alt="Local Products of Kea"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Taste Local Delicacies</h3>
                  <p className="text-gray-600 mb-4">
                    Sample Kea's culinary treasures, from locally produced honey to traditional recipes passed down through generations.
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Thyme Honey: Kea is famous for its exceptional honey with a distinct aroma</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Loza: Traditional cured pork similar to Italian prosciutto</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Paspalas: A local breakfast dish with scrambled eggs and cured pork</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Acorn Cookies: Unique cookies made with acorn flour, a traditional island specialty</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Must Visit Locations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Must Visit Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kea.idealFor && kea.idealFor.map((highlight: string, index: number) => (
              <div key={index} className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{highlight}</h3>
                  <p className="text-gray-600 dark:text-white/60">Perfect for {highlight.toLowerCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Getting Around */}
        <section id="getting-around" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Getting Around Kea</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Navigating Kea is relatively easy with several transportation options available.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-50 dark:bg-cyan-600/10 p-3 rounded-full mr-4">
                      <FaShip className="text-cyan-600 dark:text-cyclades-turquoise" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">By Bus</h3>
                  </div>
                  <ul className="space-y-3 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Public buses connect the main port (Korissia) to Ioulida (the capital) and other villages.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Schedules are coordinated with ferry arrivals during summer.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Limited service in the off-season, so check schedules in advance.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-50 dark:bg-cyan-600/10 p-3 rounded-full mr-4">
                      <FaMapMarkedAlt className="text-cyan-600 dark:text-cyclades-turquoise" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">By Car or Scooter</h3>
                  </div>
                  <ul className="space-y-3 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Rental agencies available at the port and main villages.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>A car is recommended for exploring remote beaches and villages.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Roads are generally good but can be winding in mountainous areas.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Parking in Ioulida is limited as the town is car-free.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-50 dark:bg-cyan-600/10 p-3 rounded-full mr-4">
                      <FaUmbrellaBeach className="text-cyan-600 dark:text-cyclades-turquoise" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">By Taxi & Walking</h3>
                  </div>
                  <ul className="space-y-3 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Taxis are available at the port and can be booked by phone.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Walking is the only way to explore Ioulida's narrow streets.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Hiking trails connect many villages and beaches.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>The island's extensive trail network is well-marked and maintained.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section id="gallery" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Kea Photo Gallery</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Explore the beauty of Kea through our curated collection of images.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 row-span-2">
                <img
                  src="/images/islands/kea/gallery-1.jpg"
                  alt="Panoramic view of Ioulida"
                  className="w-full h-full object-cover rounded-lg shadow-md border border-gray-100 dark:border-white/10"
                />
              </div>
              <div>
                <img
                  src="/images/islands/kea/gallery-2.jpg"
                  alt="Kea beach"
                  className="w-full h-full object-cover rounded-lg shadow-md border border-gray-100 dark:border-white/10"
                />
              </div>
              <div>
                <img
                  src="/images/islands/kea/gallery-3.jpg"
                  alt="Traditional architecture"
                  className="w-full h-full object-cover rounded-lg shadow-md border border-gray-100 dark:border-white/10"
                />
              </div>
              <div>
                <img
                  src="/images/islands/kea/gallery-4.jpg"
                  alt="Lion of Kea"
                  className="w-full h-full object-cover rounded-lg shadow-md border border-gray-100 dark:border-white/10"
                />
              </div>
              <div>
                <img
                  src="/images/islands/kea/gallery-5.jpg"
                  alt="Hiking trail"
                  className="w-full h-full object-cover rounded-lg shadow-md border border-gray-100 dark:border-white/10"
                />
              </div>
              <div className="col-span-2">
                <img
                  src="/images/islands/kea/gallery-6.jpg"
                  alt="Koundouros beach"
                  className="w-full h-full object-cover rounded-lg shadow-md border border-gray-100 dark:border-white/10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Experience CTA Section */}
        <section className="relative py-16 bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-800 text-white mb-4">
                  <span className="mr-1">⏱️</span>
                  <span>Best time to visit: {kea.bestTime}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Experience Kea?
                </h2>
                <p className="text-xl text-white mb-8">
                  Book your accommodations and ferry tickets now for an unforgettable island adventure.
                  From hiking ancient trails to relaxing on golden beaches, Kea offers a unique Greek island experience.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => navigate('/hotels/')}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 dark:bg-cyan-600/10 shadow-sm"
                  >
                    Find Accommodations
                  </button>
                  <button
                    onClick={() => navigate('/ferry-tickets/')}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 bg-opacity-60 hover:bg-opacity-70 shadow-sm"
                  >
                    How to get there
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/islands/kea/cta-image.jpg"
                  alt="Kea island view"
                  className="rounded-lg shadow-xl max-h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default KeaGuide;


