import React from 'react';
import {
  FaUmbrellaBeach,
  FaShip,
  FaUtensils,
  FaHistory,
  FaHiking,
  FaLandmark
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { cyclades } from '../data/islandsData';

const DonousaGuide: React.FC = () => {
  const donousa = cyclades.find(island => island.slug === 'donousa');

  if (!donousa) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Donousa Travel Guide 2026 - Pristine Beaches & Tranquility",
    description: "Plan your perfect Donousa vacation with our comprehensive 2026 travel guide. Discover pristine beaches, hiking trails, and authentic Greek island tranquility.",
    keywords: [
      'Donousa travel guide',
      'Small Cyclades',
      'Donousa beaches',
      'Kedros beach',
      'Stavros village',
      'Donousa hiking',
      'Small Cyclades islands',
      'unspoiled Greek islands',
      'remote Cyclades',
      'best time to visit Donousa'
    ],
    ogImage: donousa.image,
    ogType: 'article'
  };

  const categories = [
    {
      icon: <FaShip className="text-cyan-600 dark:text-cyclades-turquoise" />,
      title: 'How to Get There',
      description: 'Ferry routes and options',
      link: '#getting-there',
      id: 'getting-there'
    },
    {
      icon: <FaUmbrellaBeach className="text-cyan-600 dark:text-cyclades-turquoise" />,
      title: 'Where to Swim',
      description: 'Best beaches and coves',
      link: '#beaches',
      id: 'beaches'
    },
    {
      icon: <FaHiking className="text-cyan-600 dark:text-cyclades-turquoise" />,
      title: 'What to Do',
      description: 'Activities and attractions',
      link: '#activities',
      id: 'activities'
    },
    {
      icon: <FaUtensils className="text-cyan-600 dark:text-cyclades-turquoise" />,
      title: 'Where to Eat & Drink',
      description: 'Restaurants and bars',
      link: '#cuisine',
      id: 'cuisine'
    },
    {
      icon: <FaLandmark className="text-cyan-600 dark:text-cyclades-turquoise" />,
      title: 'Local Products',
      description: 'Local delicacies',
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

  // Create hero props from donousa data
  const heroProps = {
    name: donousa.name || "Donousa",
    description: donousa.shortDescription || "Pristine beaches and tranquility",
    image: donousa.image || "/images/islands/donousa.jpg",
    bestTime: donousa.bestTime?.description || "June to September",
    idealFor: donousa.idealFor || ["Nature lovers", "Peace seekers", "Hikers"]
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        <IslandGuideHero {...heroProps} />
        
        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Donousa</h2>
              <p className="text-gray-700 leading-relaxed">
                Donousa, the northernmost of the Small Cyclades, is a tiny paradise that embodies the 
                essence of island solitude and natural beauty. This remote gem maintains an unspoiled 
                charm that is increasingly rare in the Aegean.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The island's main village, Stavros, is a picturesque settlement of white-washed houses 
                and narrow paths that lead to windswept hills and pristine beaches. With crystal-clear 
                waters, excellent hiking trails, and an authentic island atmosphere, Donousa offers a 
                perfect escape for those seeking to disconnect from the modern world.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/donousa/intro.jpg" 
                  alt="Donousa Island Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-1/2 aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-4 border-white">
                <img 
                  src="/images/islands/donousa/intro-2.jpg" 
                  alt="Stavros Village in Donousa" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Quick Navigation Section */}
          <section id="quick-nav" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Explore Donousa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <a 
                  key={index} 
                  href={category.link} 
                  className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-blue-50 dark:bg-cyan-600/10 p-3">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{category.title}</h3>
                      <p className="text-gray-600 dark:text-white/60">{category.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* When to Visit Section */}
          <section id="when-to-visit" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">When to Visit Donousa</h2>
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4">Best Time to Visit</h3>
                  <p className="text-gray-700 mb-4">
                    The best time to visit Donousa is during the summer months from June to September when the 
                    weather is warm and perfect for swimming and outdoor activities. The island is at its most 
                    vibrant during this period, though still peaceful compared to larger Cycladic islands.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-cyan-600 dark:text-cyclades-turquoise">Summer (June to September)</h4>
                      <p className="text-gray-700 dark:text-white/80">Warm temperatures perfect for swimming and beach activities. 
                      Ferry connections are more frequent, and all facilities are open. Water temperatures are 
                      ideal for swimming.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-cyan-600 dark:text-cyclades-turquoise">Spring (April to May)</h4>
                      <p className="text-gray-700 dark:text-white/80">Pleasant temperatures with the island in full bloom. 
                      Fewer tourists and lower prices, though some facilities may be limited.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-cyan-600 dark:text-cyclades-turquoise">Autumn (October)</h4>
                      <p className="text-gray-700 dark:text-white/80">Still warm enough for swimming with fewer tourists. 
                      The sea remains warm from the summer months.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-cyan-600 dark:text-cyclades-turquoise">Winter (November to March)</h4>
                      <p className="text-gray-700 dark:text-white/80">Very quiet with limited ferry connections and most 
                      facilities closed. Only recommended for those seeking complete solitude.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-600">
                  <img 
                    src="/images/islands/donousa/seasons.jpg" 
                    alt="Donousa in summer" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Transportation Section */}
          <section id="transport" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Getting to Donousa</h2>
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Ferry Connections</h3>
                <p className="text-gray-700 mb-6">
                  Donousa is accessible by ferry from various ports in the Cyclades and mainland Greece. 
                  The most common routes are:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">From Piraeus (Athens)</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>2-3 weekly connections</li>
                      <li>Journey time: 7-9 hours</li>
                      <li>Operated by Blue Star Ferries and Small Cyclades Lines</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">From Naxos</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>3-5 weekly connections</li>
                      <li>Journey time: 1.5-2 hours</li>
                      <li>Operated by Express Skopelitis and other local ferries</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">From Amorgos</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>2-3 weekly connections</li>
                      <li>Journey time: 1-1.5 hours</li>
                      <li>Operated by Express Skopelitis</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">From Other Small Cyclades</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Regular connections with Koufonisia, Schinoussa, and Iraklia</li>
                      <li>Journey time: 30 minutes - 1 hour</li>
                      <li>Operated by Express Skopelitis and local boats</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Getting Around Donousa</h3>
                <p className="text-gray-700 mb-6">
                  Donousa is a small island with limited transportation options:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">On Foot</h4>
                    <p className="text-gray-700 dark:text-white/80">
                      The most common way to explore Donousa. Well-marked hiking paths connect the main village 
                      to beaches and other points of interest.
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">Water Taxis</h4>
                    <p className="text-gray-700 dark:text-white/80">
                      Available during summer to reach remote beaches. Depart from Stavros port.
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">Limited Bus Service</h4>
                    <p className="text-gray-700 dark:text-white/80">
                      A mini-bus operates during summer months connecting Stavros with the main beaches.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Beaches in Donousa</h2>
            <p className="text-gray-700 mb-8">
              Donousa is home to some of the most pristine and unspoiled beaches in the Cyclades, 
              offering crystal-clear turquoise waters and a peaceful atmosphere.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/donousa/kedros.jpg" 
                    alt="Kedros Beach" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">Kedros Beach</h3>
                  <p className="text-gray-700 mb-4">
                    The most famous beach on Donousa, Kedros features stunning turquoise waters, 
                    fine golden sand, and impressive rock formations. It's a 30-minute walk from 
                    Stavros or accessible by water taxi during summer.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Unorganized</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Natural Shade</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Crystal Waters</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/donousa/livadi.jpg" 
                    alt="Livadi Beach" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">Livadi Beach</h3>
                  <p className="text-gray-700 mb-4">
                    The closest beach to Stavros village, Livadi is a beautiful sandy beach with 
                    shallow waters, making it ideal for families. There's a small taverna nearby 
                    and some natural shade from trees.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Family-friendly</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Taverna</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Easy Access</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/donousa/kalotaritissa.jpg" 
                    alt="Kalotaritissa Beach" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">Kalotaritissa Beach</h3>
                  <p className="text-gray-700 mb-4">
                    Located on the southwestern tip of the island, this remote beach offers 
                    incredible views and peaceful surroundings. It's a longer hike from Stavros 
                    but worth the effort for the seclusion.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Remote</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Secluded</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Hiking Required</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/donousa/fykio.jpg" 
                    alt="Fykio Beach" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">Fykio Beach</h3>
                  <p className="text-gray-700 mb-4">
                    A small, pebbled beach with emerald waters, Fykio is perfect for those 
                    seeking tranquility. The beach is accessible via a hiking path and offers 
                    good snorkeling opportunities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Pebbled</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Snorkeling</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Quiet</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Things to Do in Donousa</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">Hiking</h3>
                  <p className="text-gray-700 mb-4">
                    Donousa offers excellent hiking opportunities with well-marked trails 
                    connecting villages and beaches. The island's small size makes it perfect 
                    for day hikes with stunning views of the Aegean Sea.
                  </p>
                  <h4 className="font-semibold text-blue-600 mb-2">Popular Hiking Routes:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Stavros to Kedros Beach (30 minutes)</li>
                    <li>Stavros to Kalotaritissa (2 hours)</li>
                    <li>Circular route around the island (4-5 hours)</li>
                    <li>Mersini Spring trail (1 hour)</li>
                  </ul>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/donousa/hiking.jpg" 
                    alt="Hiking in Donousa" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">Swimming & Snorkeling</h3>
                  <p className="text-gray-700 mb-4">
                    The crystal-clear waters around Donousa are perfect for swimming and snorkeling. 
                    The island's remote location means minimal water pollution and excellent visibility.
                  </p>
                  <h4 className="font-semibold text-blue-600 mb-2">Best Spots for Snorkeling:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>The caves near Kedros Beach</li>
                    <li>Fykio Beach rocky areas</li>
                    <li>Livadi Beach eastern side</li>
                    <li>The shipwreck near Kalotaritissa</li>
                  </ul>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/donousa/swimming.jpg" 
                    alt="Swimming in Donousa" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3">Explore Stavros Village</h3>
                <p className="text-gray-700 dark:text-white/80">
                  Wander through the charming main village with its traditional Cycladic architecture, 
                  small shops, and local tavernas. Visit the Church of Panagia with its beautiful views.
                </p>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3">Visit Mersini Spring</h3>
                <p className="text-gray-700 dark:text-white/80">
                  A natural freshwater spring that has been vital to the island for centuries. 
                  The area around the spring is lush with vegetation, unusual for the Cyclades.
                </p>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3">Local Festivals</h3>
                <p className="text-gray-700 dark:text-white/80">
                  Experience traditional Greek celebrations, especially the Panagia festival on August 15th 
                  with music, dancing, and local food in Stavros village.
                </p>
              </div>
            </div>
          </section>

          {/* Ready to Experience Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8">
                  <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                    Best Time: June - September
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Donousa?</h2>
                  <p className="text-white mb-6">
                    Discover the untouched beauty of Donousa, where pristine beaches, clear waters, and 
                    authentic Greek island life await. Plan your escape to this tranquil paradise.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="/hotels/" 
                      className="inline-block bg-white text-blue-700 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 dark:bg-cyan-600/10 transition duration-300"
                    >
                      Find Accommodations
                    </a>
                    <a 
                      href="/ferry-tickets/" 
                      className="inline-block bg-transparent text-white border border-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      How to get there
                    </a>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <img 
                    src="/images/islands/donousa/cta-image.jpg" 
                    alt="Experience Donousa" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DonousaGuide;


