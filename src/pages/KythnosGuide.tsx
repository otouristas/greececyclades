import React from 'react';
import { 
  FaUmbrellaBeach, 
  FaHiking, 
  FaUtensils, 
  FaShoppingBag, 
  FaLandmark,
  FaShip,
  FaBus,
  FaMapMarkerAlt
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';

const KythnosGuide: React.FC = () => {
  const kythnos = islandGuides.find(island => island.id === 'kythnos');

  if (!kythnos) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Kythnos Travel Guide 2026 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Kythnos vacation with our comprehensive 2026 travel guide. Discover thermal springs, beautiful beaches, and traditional villages on this authentic Cycladic island.",
    keywords: [
      'Kythnos travel guide',
      'Kythnos beaches',
      'Cyclades islands',
      'Greek islands',
      'Kythnos thermal springs',
      'Chora village',
      'Driopida village',
      'Kolona beach',
      'traditional villages',
      'best time to visit Kythnos'
    ],
    ogImage: kythnos.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/kythnos/kythnos-beach.jpg",
      alt: "Beautiful beach in Kythnos with crystal clear waters"
    },
    {
      src: "/images/islands/kythnos/kythnos-village.jpg",
      alt: "Traditional whitewashed village in Kythnos"
    },
    {
      src: "/images/islands/kythnos/kythnos-panorama.jpg",
      alt: "Panoramic view of Kythnos coastline"
    },
    {
      src: "/images/islands/kythnos/kythnos-thermal-springs.jpg",
      alt: "Famous thermal springs of Kythnos"
    },
    {
      src: "/images/islands/kythnos/kythnos-kolona-beach.jpg",
      alt: "The unique double-sided Kolona Beach"
    },
    {
      src: "/images/islands/kythnos/kythnos-church.jpg",
      alt: "Traditional blue-domed church in Kythnos"
    }
  ];

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords.join(', ')}
        ogImage={seoData.ogImage}
        ogType={seoData.ogType}
      />
      
      <div className="bg-gray-50">
        {/* Hero Section */}
        <IslandGuideHero 
          name={kythnos.name}
          description={kythnos.description}
          image={kythnos.heroImage || kythnos.image}
          bestTime={kythnos.bestTime.description}
          idealFor={kythnos.idealFor}
        />
        
        {/* Introduction Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Discover Kythnos</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Kythnos, also known as Thermia due to its thermal springs, is a charming Cycladic island that offers an authentic Greek experience. With its picturesque villages, golden beaches, and healing thermal waters, Kythnos provides a perfect blend of relaxation and traditional island life.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  The island is known for its traditional architecture, with whitewashed houses, narrow winding streets, and blue-domed churches. Chora (Messaria) and Driopida are the two main villages, each with their own distinct character and charm.
                </p>
                <p className="text-lg text-gray-600 dark:text-white/60">
                  What makes Kythnos truly special is its unspoiled beauty and authentic atmosphere. Despite being close to Athens, it remains relatively untouched by mass tourism, offering visitors a genuine taste of Cycladic life.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                  <img 
                    src="/images/islands/kythnos/kythnos-village.jpg" 
                    alt="Traditional village in Kythnos" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                  <img 
                    src="/images/islands/kythnos/kythnos-beach.jpg" 
                    alt="Beautiful beach in Kythnos" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md col-span-2">
                  <img 
                    src="/images/islands/kythnos/kythnos-panorama.jpg" 
                    alt="Panoramic view of Kythnos" 
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quick Navigation Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Explore Kythnos</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Discover the best of what Kythnos has to offer with our comprehensive guide.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <a href="#transport" className="group">
                <div className="bg-blue-50 dark:bg-cyan-600/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center h-full flex flex-col items-center justify-center">
                  <div className="bg-blue-100 rounded-full p-4 mb-4">
                    <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">How to Get There</h3>
                </div>
              </a>
              
              <a href="#beaches" className="group">
                <div className="bg-blue-50 dark:bg-cyan-600/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center h-full flex flex-col items-center justify-center">
                  <div className="bg-blue-100 rounded-full p-4 mb-4">
                    <FaUmbrellaBeach className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Where to Swim</h3>
                </div>
              </a>
              
              <a href="#activities" className="group">
                <div className="bg-blue-50 dark:bg-cyan-600/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center h-full flex flex-col items-center justify-center">
                  <div className="bg-blue-100 rounded-full p-4 mb-4">
                    <FaHiking className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">What to Do</h3>
                </div>
              </a>
              
              <a href="#cuisine" className="group">
                <div className="bg-blue-50 dark:bg-cyan-600/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center h-full flex flex-col items-center justify-center">
                  <div className="bg-blue-100 rounded-full p-4 mb-4">
                    <FaUtensils className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Where to Eat & Drink</h3>
                </div>
              </a>
              
              <a href="#products" className="group">
                <div className="bg-blue-50 dark:bg-cyan-600/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center h-full flex flex-col items-center justify-center">
                  <div className="bg-blue-100 rounded-full p-4 mb-4">
                    <FaShoppingBag className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Local Products</h3>
                </div>
              </a>
              
              <a href="#history" className="group">
                <div className="bg-blue-50 dark:bg-cyan-600/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center h-full flex flex-col items-center justify-center">
                  <div className="bg-blue-100 rounded-full p-4 mb-4">
                    <FaLandmark className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">History & Culture</h3>
                </div>
              </a>
            </div>
          </div>
        </section>
        
        {/* When to Visit Section */}
        <section id="when-to-visit" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">When to Visit Kythnos</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Find the perfect time for your visit to Kythnos based on weather, crowds, and activities.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">High Season (June-August)</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Warmest weather with temperatures between 25-32°C</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>All businesses, restaurants, and activities are open</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>More frequent ferry connections</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Busier beaches and higher prices</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Shoulder Season (May, September)</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Pleasant temperatures between 20-25°C</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Most businesses are open</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Fewer crowds and more reasonable prices</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Ideal for thermal springs and hiking</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Low Season (October-April)</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Cooler temperatures between 10-20°C</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Many businesses close for the season</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Limited ferry connections</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Experience authentic local life</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 dark:bg-cyan-600/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Best Time to Visit</h3>
              <p className="text-gray-600 dark:text-white/60">
                <strong>May, June, and September</strong> are considered the best months to visit Kythnos. During these months, you'll enjoy pleasant weather perfect for swimming, exploring the thermal springs, and hiking, while avoiding the peak summer crowds and high prices.
              </p>
            </div>
          </div>
        </section>

        {/* Beaches Section */}
        <section id="beaches" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Beautiful Beaches</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Kythnos is home to over 70 beaches, from organized sandy shores to secluded coves.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/kythnos/kolona-beach.jpg" 
                  alt="Kolona Beach in Kythnos" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Kolona Beach</h3>
                  <p className="text-gray-600 mb-4">
                    The most famous beach on Kythnos, Kolona is a unique sandbar connecting the island to an islet, creating two beaches with water on both sides. With its crystal-clear turquoise waters and golden sand, it's regularly featured among the most beautiful beaches in the Cyclades.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">
                      <span className="font-medium">Access:</span> By car + short walk
                    </span>
                    <span>
                      <span className="font-medium">Facilities:</span> Limited
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/kythnos/martinakia-beach.jpg" 
                  alt="Martinakia Beach in Kythnos" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Martinakia Beach</h3>
                  <p className="text-gray-600 mb-4">
                    Located near the port of Merichas, Martinakia is a small, organized beach with crystal-clear waters and fine sand. Its proximity to the port makes it easily accessible and popular with families.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">
                      <span className="font-medium">Access:</span> Easy, by car
                    </span>
                    <span>
                      <span className="font-medium">Facilities:</span> Sunbeds, tavernas
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/kythnos/apokrousi-beach.jpg" 
                  alt="Apokrousi Beach in Kythnos" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Apokrousi Beach</h3>
                  <p className="text-gray-600 mb-4">
                    One of the largest and most popular beaches on the island, Apokrousi features golden sand, crystal-clear waters, and good facilities. It's well-protected from winds, making it ideal for swimming even on breezy days.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">
                      <span className="font-medium">Access:</span> By car
                    </span>
                    <span>
                      <span className="font-medium">Facilities:</span> Sunbeds, tavernas, parking
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/kythnos/loutra-beach.jpg" 
                  alt="Loutra Beach in Kythnos" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Loutra Beach</h3>
                  <p className="text-gray-600 mb-4">
                    Located in the village of Loutra, this beach is famous for its thermal springs that flow into the sea. Visitors can enjoy the therapeutic properties of the warm springs while relaxing on the beach.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">
                      <span className="font-medium">Access:</span> Easy, in the village
                    </span>
                    <span>
                      <span className="font-medium">Facilities:</span> Full amenities nearby
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/kythnos/kalo-livadi-beach.jpg" 
                  alt="Kalo Livadi Beach in Kythnos" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Kalo Livadi</h3>
                  <p className="text-gray-600 mb-4">
                    A long, sandy beach with shallow, crystal-clear waters, making it ideal for families with children. The beach is relatively undeveloped, offering a more natural setting.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">
                      <span className="font-medium">Access:</span> By car, dirt road
                    </span>
                    <span>
                      <span className="font-medium">Facilities:</span> Limited
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/kythnos/agios-dimitrios-beach.jpg" 
                  alt="Agios Dimitrios Beach in Kythnos" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Agios Dimitrios</h3>
                  <p className="text-gray-600 mb-4">
                    One of the longest beaches on Kythnos, featuring fine sand and turquoise waters. The beach is partially organized and offers a relaxed atmosphere.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">
                      <span className="font-medium">Access:</span> By car
                    </span>
                    <span>
                      <span className="font-medium">Facilities:</span> Some tavernas, limited sunbeds
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Villages Section */}
        <section id="villages" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Charming Villages</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Explore the traditional settlements of Kythnos, each with its own unique character and charm.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <img 
                    src="/images/islands/kythnos/chora-kythnos.jpg" 
                    alt="Chora (Messaria) in Kythnos" 
                    className="w-full h-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Chora (Messaria)</h3>
                    <p className="text-gray-600 mb-4">
                      The capital of Kythnos, Chora is a picturesque village with traditional Cycladic architecture. White-washed houses with colorful doors and windows, narrow winding streets, and beautiful churches create a charming atmosphere. The village is built amphitheatrically, offering stunning views of the surrounding landscape.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      Don't miss the central square with its traditional cafes and the Church of Agia Triada with its impressive bell tower.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <img 
                    src="/images/islands/kythnos/driopida-village.jpg" 
                    alt="Driopida Village in Kythnos" 
                    className="w-full h-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Driopida</h3>
                    <p className="text-gray-600 mb-4">
                      The second largest village on the island, Driopida is a well-preserved medieval settlement with a unique character. Unlike other Cycladic villages, Driopida features tiled roofs instead of flat ones, giving it a distinctive appearance. The village is built in a valley, protected from the strong winds.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      Visit the Folk Museum and the impressive Katafiki Cave, one of the largest caves in Greece.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <img 
                    src="/images/islands/kythnos/loutra-village.jpg" 
                    alt="Loutra Village in Kythnos" 
                    className="w-full h-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Loutra</h3>
                    <p className="text-gray-600 mb-4">
                      Famous for its thermal springs, Loutra is a seaside village on the northeastern coast of Kythnos. The village takes its name from the natural hot springs that have been known for their healing properties since ancient times. Today, visitors can enjoy the therapeutic waters at the modern hydrotherapy center.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      The village also features a nice beach and several tavernas serving fresh seafood.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <img 
                    src="/images/islands/kythnos/merichas-port.jpg" 
                    alt="Merichas Port in Kythnos" 
                    className="w-full h-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Merichas</h3>
                    <p className="text-gray-600 mb-4">
                      The main port of Kythnos, Merichas is a bustling village with a natural harbor on the western coast of the island. It serves as the gateway to Kythnos, welcoming visitors with its waterfront tavernas, cafes, and shops.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      The village has developed into a tourist resort with accommodations, restaurants, and easy access to nearby beaches.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section id="activities" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Things to Do in Kythnos</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Beyond its beautiful beaches, Kythnos offers a variety of activities and attractions for visitors to enjoy.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/kythnos/kythnos-thermal-springs.jpg" 
                  alt="Thermal Springs in Loutra" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Thermal Springs</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    Visit the famous thermal springs in Loutra, known for their healing properties. The springs have been used since ancient times and are rich in minerals that are beneficial for various health conditions. You can enjoy the thermal waters at the organized spa facility or at the natural hot spring that flows directly into the sea.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/kythnos/kythnos-hiking.jpg" 
                  alt="Hiking trails in Kythnos" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Hiking Trails</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    Explore Kythnos on foot through its extensive network of hiking trails. The island features well-marked paths that connect villages, beaches, and archaeological sites. The diverse landscape offers stunning views of the Aegean Sea, traditional settlements, and the island's unique terrain. Don't miss the trail from Chora to Driopida or the coastal path to Kolona Beach.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/kythnos/kythnos-castle.jpg" 
                  alt="Medieval Castle in Kythnos" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Explore the Medieval Castle</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    Visit the remains of the medieval castle of Oria, located on a hill above Chora. Built in the 13th century by the Venetians, the castle offers panoramic views of the surrounding area and the Aegean Sea. Although mostly in ruins, you can still see parts of the fortification walls and the church of Agia Triada within the castle grounds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cuisine Section */}
        <section id="cuisine" className="py-16 bg-blue-50 dark:bg-cyan-600/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Local Cuisine</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Discover the traditional flavors and culinary specialties of Kythnos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-6">
                  <div className="col-span-3 md:col-span-1">
                    <img 
                      src="/images/islands/kythnos/sfougato.jpg" 
                      alt="Sfougato - Traditional Kythnos dish" 
                      className="w-full h-48 md:h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Sfougato</h3>
                    <p className="text-gray-600 mb-4">
                      A traditional Kythnian omelet made with local herbs, zucchini, and the island's famous cheese. This savory dish is a staple in local tavernas and homes, especially during summer when fresh vegetables are abundant.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      <strong>Where to try:</strong> Most traditional tavernas in Chora and Driopida serve authentic sfougato, with "To Steki tou Ntetzima" in Chora being particularly renowned for this dish.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-6">
                  <div className="col-span-3 md:col-span-1">
                    <img 
                      src="/images/islands/kythnos/kythnos-cheese.jpg" 
                      alt="Kythnos Cheese" 
                      className="w-full h-48 md:h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Kythnian Cheese</h3>
                    <p className="text-gray-600 mb-4">
                      The island is famous for its locally produced cheeses, particularly "Kopanisti" (a spicy, soft cheese) and "Tyrovolia" (a fresh, mild cheese). These cheeses are made from goat or sheep milk using traditional methods passed down through generations.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      <strong>Where to try:</strong> Local dairy shops in Chora and Driopida, or at the weekly farmers' market. Many tavernas serve local cheese as part of their meze platters.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-6">
                  <div className="col-span-3 md:col-span-1">
                    <img 
                      src="/images/islands/kythnos/karamelized-almonds.jpg" 
                      alt="Karamelized Almonds" 
                      className="w-full h-48 md:h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Karamelized Almonds</h3>
                    <p className="text-gray-600 mb-4">
                      A traditional sweet treat of Kythnos, these caramelized almonds (known as "koufeta") are made with local honey and are often served at celebrations and festivals. The perfect blend of crunchy and sweet makes them an irresistible delicacy.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      <strong>Where to try:</strong> Local pastry shops in Chora and Driopida, or at the "Panigiri" (local festivals) held throughout the summer.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-6">
                  <div className="col-span-3 md:col-span-1">
                    <img 
                      src="/images/islands/kythnos/loza-pasteli.jpg" 
                      alt="Loza and Pasteli" 
                      className="w-full h-48 md:h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Loza and Pasteli</h3>
                    <p className="text-gray-600 mb-4">
                      "Loza" is a local cured meat similar to Italian prosciutto, made from pork and seasoned with herbs. "Pasteli" is a traditional sweet made from sesame seeds and local honey, formed into bars or discs. Both are staples of Kythnian cuisine.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      <strong>Where to try:</strong> Local delicatessens and traditional tavernas throughout the island. "Pasteli" can also be found in most bakeries and sweet shops.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Where to Eat & Drink</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-medium text-gray-900 mb-3">Traditional Tavernas</h4>
                    <p className="text-gray-600 mb-4">
                      Kythnos is home to numerous traditional tavernas serving authentic local cuisine. Most are family-run establishments that have been operating for generations, offering fresh seafood, local meats, and island specialties.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      Try "To Steki tou Ntetzima" in Chora or "Ostria" in Merichas for authentic local dishes in a charming setting.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium text-gray-900 mb-3">Seaside Restaurants</h4>
                    <p className="text-gray-600 mb-4">
                      Many of Kythnos' best restaurants are located by the sea, offering stunning views along with delicious food. These establishments typically specialize in fresh seafood caught daily by local fishermen.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      "Martinakia" near the beach of the same name and "Meltemi" in Loutra offer excellent seafood with beautiful sea views.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transportation Section */}
        <section id="transport" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Getting to Kythnos</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about reaching Kythnos and getting around the island.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Ferry Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-medium text-gray-900 mb-3">From Athens</h4>
                    <p className="text-gray-600 mb-4">
                      Ferries to Kythnos depart from two ports in Athens:
                    </p>
                    <ul className="space-y-3 text-gray-600 dark:text-white/60">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Piraeus Port:</strong> Conventional ferries take approximately 3 hours, while high-speed ferries take about 1.5-2 hours.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Lavrio Port:</strong> Located closer to Kythnos, ferries from Lavrio take about 1-1.5 hours. This is often the preferred option for those with cars.</span>
                      </li>
                    </ul>
                    <p className="text-gray-600 mt-4">
                      During high season (June-September), there are daily ferry connections. In the off-season, ferries operate less frequently, typically 3-5 times per week.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium text-gray-900 mb-3">From Other Islands</h4>
                    <p className="text-gray-600 mb-4">
                      Kythnos is well-connected to other Cycladic islands, especially during the summer months:
                    </p>
                    <ul className="space-y-3 text-gray-600 dark:text-white/60">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Serifos, Sifnos, Milos:</strong> Regular ferry connections several times per week.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Kea (Tzia):</strong> Frequent connections, especially from Lavrio.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Other Cyclades:</strong> Less frequent connections to islands like Syros, Paros, and Naxos, often requiring a transfer.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Getting Around the Island</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-medium text-gray-900 mb-3">Public Transportation</h4>
                    <p className="text-gray-600 mb-4">
                      Kythnos has a limited public bus service that connects the main villages and beaches:
                    </p>
                    <ul className="space-y-3 text-gray-600 dark:text-white/60">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Bus Routes:</strong> The main route connects Merichas (port) with Chora, Driopida, and Loutra.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Schedule:</strong> More frequent during summer, with reduced service in the off-season. Check the latest timetables at the port or your accommodation.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium text-gray-900 mb-3">Car & Scooter Rental</h4>
                    <p className="text-gray-600 mb-4">
                      The most convenient way to explore Kythnos is by renting a vehicle:
                    </p>
                    <ul className="space-y-3 text-gray-600 dark:text-white/60">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Rental Agencies:</strong> Several rental agencies are located at the port of Merichas and in the main villages.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Road Conditions:</strong> The main roads are paved, but many beaches and attractions are accessible via dirt roads. A 4x4 vehicle is recommended for exploring remote areas.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Taxis:</strong> Limited taxi service is available on the island. Taxis can be booked at the port or through your accommodation.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience Kythnos?</h2>
                <p className="text-lg text-white mb-8">
                  Plan your perfect getaway to this authentic Cycladic gem. Thermal springs, 
                  golden beaches, and traditional Greek hospitality await you on this enchanting island.
                </p>
                
                <div className="bg-blue-50 dark:bg-cyan-600/100 bg-opacity-30 rounded-lg p-4 mb-8 inline-block">
                  <span className="text-white font-medium">
                    Best time to visit: {kythnos.bestTime.description}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/hotels/" 
                    className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block text-center"
                  >
                    Find Accommodations
                  </a>
                  <a 
                    href="/ferry-tickets/" 
                    className="bg-transparent text-white border border-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block text-center"
                  >
                    How to get there
                  </a>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/images/islands/kythnos/kythnos-cta.jpg" 
                  alt="Stunning view of Kythnos" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default KythnosGuide;


