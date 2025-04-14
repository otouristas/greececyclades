import React from 'react';
import { 
  FaUmbrellaBeach, 
  FaWineGlass, 
  FaMapMarkedAlt, 
  FaShip, 
  FaUtensils, 
  FaSun, 
  FaCameraRetro, 
  FaLeaf,
  FaCalendarAlt,
  FaGlassCheers,
  FaSwimmer,
  FaHiking,
  FaHistory
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { cyclades } from '../data/islandsData';

const SikinosGuide: React.FC = () => {
  const sikinos = cyclades.find(island => island.slug === 'sikinos');

  if (!sikinos) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Sikinos Travel Guide 2025 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Sikinos vacation with our comprehensive 2025 travel guide. Discover the best hotels, restaurants, beaches, and activities. Experience authentic Greek island life in this untouched Cycladic gem.",
    keywords: [
      'Sikinos travel guide',
      'Sikinos beaches',
      'Chora Sikinos',
      'Episkopi Monastery',
      'Greek islands',
      'Sikinos villages',
      'Malta Beach',
      'hiking Sikinos',
      'Sikinos wine',
      'best time to visit Sikinos'
    ],
    ogImage: sikinos.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/sikinos/gallery/sikinos-chora.jpg",
      alt: "The traditional village of Chora"
    },
    {
      src: "/images/islands/sikinos/gallery/sikinos-episkopi.jpg",
      alt: "The ancient Episkopi Monastery"
    },
    {
      src: "/images/islands/sikinos/gallery/sikinos-malta-beach.jpg",
      alt: "Crystal clear waters at Malta Beach"
    },
    {
      src: "/images/islands/sikinos/gallery/sikinos-alopronia.jpg",
      alt: "The port village of Alopronia"
    },
    {
      src: "/images/islands/sikinos/gallery/sikinos-winery.jpg",
      alt: "The ancient winery of Sikinos"
    },
    {
      src: "/images/islands/sikinos/gallery/sikinos-food.jpg",
      alt: "Traditional Greek cuisine with local products"
    },
    {
      src: "/images/islands/sikinos/gallery/sikinos-hiking.jpg",
      alt: "Hiking trails with panoramic views"
    },
    {
      src: "/images/islands/sikinos/gallery/sikinos-aerial.jpg",
      alt: "Aerial view of Sikinos coastline"
    }
  ];

  const categories = [
    {
      icon: <FaShip className="text-blue-500" />,
      title: 'How to Get There?',
      description: 'Ferry routes and travel options',
      link: '#transport',
      id: 'transport'
    },
    {
      icon: <FaUmbrellaBeach className="text-blue-500" />,
      title: 'Where to Swim?',
      description: 'Best beaches and swimming spots',
      link: '#beaches',
      id: 'beaches'
    },
    {
      icon: <FaMapMarkedAlt className="text-blue-500" />,
      title: 'What to Do?',
      description: 'Activities and attractions',
      link: '#activities',
      id: 'activities'
    },
    {
      icon: <FaUtensils className="text-blue-500" />,
      title: 'Where to Eat & Drink?',
      description: 'Restaurants and bars',
      link: '#cuisine',
      id: 'cuisine'
    },
    {
      icon: <FaWineGlass className="text-blue-500" />,
      title: 'Local Products',
      description: 'Wines and delicacies',
      link: '#products',
      id: 'products'
    },
    {
      icon: <FaHistory className="text-blue-500" />,
      title: 'History & Culture',
      description: 'Island heritage',
      link: '#history',
      id: 'history'
    }
  ];

  // Create hero props from sikinos data
  const heroProps = {
    name: sikinos.name || "Sikinos",
    description: sikinos.shortDescription || "Untouched traditional island life",
    image: sikinos.image || "/images/islands/sikinos.jpg",
    bestTime: sikinos.bestTime?.description || "May to September",
    idealFor: sikinos.idealFor || ["Nature lovers", "Peace seekers", "Hikers"]
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="min-h-screen bg-gray-50">
        <IslandGuideHero {...heroProps} />
        
        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Welcome to Sikinos</h2>
              <p className="text-gray-700 leading-relaxed">
                Sikinos, a hidden gem in the Cyclades, offers unspoiled beauty, traditional architecture, and a peaceful escape from modern life. 
                This small island between Ios and Folegandros provides an authentic Greek island experience far from the crowds of more popular destinations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the charming Chora perched on the hillside to the ancient Episkopi Monastery and pristine beaches like Malta, 
                Sikinos offers a glimpse into traditional Cycladic life. Our comprehensive guide will help you discover the best of what this 
                tranquil island has to offer.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/sikinos/landscape.jpg" 
                  alt="Sikinos Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/islands/sikinos/chora-detail.jpg" 
                    alt="Chora Detail" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((category, index) => (
                <a 
                  key={index}
                  href={category.link} 
                  className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
                >
                  <div className="text-2xl mb-2">
                    {category.icon}
                  </div>
                  <span className="font-medium text-sm">{category.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Photo Gallery Section */}
          <section id="gallery" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Sikinos Photo Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="aspect-w-16 aspect-h-12">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-gray-600">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* When to Visit Section */}
          <section id="when-to-visit" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">When to Visit Sikinos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaSun className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">High Season</h3>
                <p className="text-gray-600">July to August</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Warmest weather</li>
                  <li>• All facilities open</li>
                  <li>• More frequent ferries</li>
                  <li>• Still relatively quiet</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaCameraRetro className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Shoulder Season</h3>
                <p className="text-gray-600">May-June, September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Pleasant weather</li>
                  <li>• Very few tourists</li>
                  <li>• Better rates</li>
                  <li>• Perfect for hiking</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaLeaf className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Spring</h3>
                <p className="text-gray-600">April to May</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Wildflowers blooming</li>
                  <li>• Mild temperatures</li>
                  <li>• Green landscapes</li>
                  <li>• Easter celebrations</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaCalendarAlt className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Water Temperature</h3>
                <p className="text-gray-600">Best swimming months</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• June: 21°C (70°F)</li>
                  <li>• July: 23°C (73°F)</li>
                  <li>• August: 24°C (75°F)</li>
                  <li>• September: 23°C (73°F)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Villages Section */}
          <section id="villages" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Charming Villages of Sikinos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sikinos/villages/chora.jpg" 
                    alt="Chora Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Chora</h3>
                  <p className="text-gray-600 mb-4">
                    The main settlement of Sikinos is a picturesque village perched on a hillside with stunning views of the Aegean Sea. 
                    Chora consists of two connected settlements: Kastro and Chorio. Wander through the narrow whitewashed alleys, 
                    admire the traditional Cycladic architecture, and enjoy the peaceful atmosphere of this authentic Greek village.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Traditional Architecture</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Panoramic Views</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Village Square</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sikinos/villages/alopronia.jpg" 
                    alt="Alopronia Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Alopronia</h3>
                  <p className="text-gray-600 mb-4">
                    The port village of Sikinos is a small, peaceful settlement with a few tavernas, cafes, and accommodations. 
                    This is where ferries arrive and depart, and it's connected to Chora by a winding road. Alopronia has a small 
                    beach and offers basic amenities for visitors, making it a convenient base for exploring the island.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Port</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tavernas</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Beautiful Beaches of Sikinos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sikinos/beaches/malta.jpg" 
                    alt="Malta Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Malta Beach</h3>
                  <p className="text-gray-600 mb-4">
                    The most popular beach on Sikinos, Malta offers crystal clear waters and a peaceful atmosphere. 
                    This pebble beach is accessible by a short hike or by boat and provides a serene swimming experience 
                    with stunning views of the surrounding cliffs.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Pebble Beach</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Natural Shade</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Secluded</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaSwimmer className="mr-2" /> Great for swimming
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sikinos/beaches/alopronia.jpg" 
                    alt="Alopronia Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Alopronia Beach</h3>
                  <p className="text-gray-600 mb-4">
                    Located right next to the port, Alopronia Beach is the most accessible beach on the island. 
                    This small pebble beach offers basic amenities and is convenient for a quick swim. Several tavernas 
                    and cafes are within walking distance, making it perfect for a relaxed day by the sea.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Easy Access</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Amenities Nearby</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaUtensils className="mr-2" /> Tavernas nearby
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sikinos/beaches/dialiskari.jpg" 
                    alt="Dialiskari Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Dialiskari Beach</h3>
                  <p className="text-gray-600 mb-4">
                    A remote and untouched beach accessible by boat or a hiking trail. Dialiskari offers a truly 
                    secluded experience with its pristine waters and peaceful atmosphere. The beach is not organized, 
                    so bring your own supplies for a day of complete relaxation in nature.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Remote</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Pristine Waters</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">No Facilities</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaHiking className="mr-2" /> Hiking required
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Things to Do in Sikinos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaHiking className="text-blue-500 mr-3" /> Hiking Adventures
                </h3>
                <p className="text-gray-600 mb-4">
                  Sikinos offers excellent hiking opportunities with well-marked trails connecting the villages and leading to remote beaches. 
                  The island's rugged landscape and minimal development make it perfect for nature lovers. Don't miss the trail from Chora to 
                  Episkopi Monastery, which offers breathtaking views of the Aegean Sea.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Chora to Episkopi Monastery (1.5 hours)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Alopronia to Chora (45 minutes)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Chora to Malta Beach (1 hour)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Ancient Winery Trail (2 hours)</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaHistory className="text-blue-500 mr-3" /> Historical Exploration
                </h3>
                <p className="text-gray-600 mb-4">
                  Visit the remarkable Episkopi Monastery, a Roman-era mausoleum converted into a Byzantine church. 
                  This unique structure dates back to the 3rd century AD and offers a fascinating glimpse into the island's 
                  rich history. Also explore the ancient winery, one of the best-preserved in the Cyclades.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Episkopi Monastery (3rd century AD)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Ancient Winery of Sikinos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Folk Museum in Chora</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Traditional windmills</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaWineGlass className="text-blue-500 mr-3" /> Wine Tasting
                </h3>
                <p className="text-gray-600 mb-4">
                  Sikinos has a long tradition of winemaking dating back to ancient times. Visit the local winery to taste 
                  the island's distinctive wines made from indigenous grape varieties. The dry, volcanic soil gives these 
                  wines their unique character and flavor profile.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Manalis Winery tours and tastings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Local wine varieties: Assyrtiko, Aidani, Mandilaria</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Traditional wine-making demonstrations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Wine pairing with local products</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaGlassCheers className="text-blue-500 mr-3" /> Local Festivals
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience authentic Greek culture by attending one of Sikinos' traditional festivals (panigiria). 
                  The most important is the feast of Panagia Pantanassa on August 15th, featuring live music, traditional 
                  dancing, and local delicacies. These celebrations offer a genuine glimpse into local customs and traditions.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Panagia Pantanassa Festival (August 15)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Feast of Agios Ioannis (May 8)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Cultural events at the Monastery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Traditional music and dance performances</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* Cuisine Section */}
          <section id="cuisine" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Local Cuisine & Dining</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Sikinos offers an authentic culinary experience with dishes prepared using locally-sourced ingredients. 
                  The island's cuisine is characterized by its simplicity and focus on high-quality products, including 
                  fresh fish, locally-raised meat, and vegetables grown in the island's gardens.
                </p>
                <h3 className="text-xl font-semibold mb-3">Must-Try Local Specialties:</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">•</span>
                    <div>
                      <span className="font-medium">Marathopita:</span> Traditional fennel pie made with wild fennel, onions, and local cheese.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">•</span>
                    <div>
                      <span className="font-medium">Ladenia:</span> A local version of focaccia with tomatoes, onions, and olive oil.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">•</span>
                    <div>
                      <span className="font-medium">Ksinotiri:</span> A tangy, soft white cheese unique to Sikinos.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">•</span>
                    <div>
                      <span className="font-medium">Favas:</span> Yellow split pea puree with olive oil and capers.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">•</span>
                    <div>
                      <span className="font-medium">Honey:</span> Local thyme honey with a distinctive aroma and flavor.
                    </div>
                  </li>
                </ul>
                <h3 className="text-xl font-semibold mb-3 mt-6">Where to Eat:</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">•</span>
                    <div>
                      <span className="font-medium">Taverna Manalis:</span> Traditional taverna in Chora serving authentic local dishes.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">•</span>
                    <div>
                      <span className="font-medium">To Steki:</span> Casual eatery in Alopronia with fresh seafood and mezedes.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">•</span>
                    <div>
                      <span className="font-medium">Lucas Taverna:</span> Family-run restaurant with homemade specialties.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="/images/islands/sikinos/food/local-dishes.jpg" 
                    alt="Local Sikinos Dishes" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="/images/islands/sikinos/food/wine.jpg" 
                    alt="Sikinos Wine" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="/images/islands/sikinos/food/taverna.jpg" 
                    alt="Traditional Taverna" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="/images/islands/sikinos/food/honey.jpg" 
                    alt="Local Honey" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Transport Section */}
          <section id="transport" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Getting to Sikinos</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaShip className="text-blue-500 mr-3" /> By Ferry
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Sikinos is accessible by ferry from Piraeus (Athens) and other Cycladic islands. Ferry schedules vary by season, 
                    with more frequent connections during the summer months.
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">From Piraeus:</span> 7-9 hours depending on the type of ferry
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">From Ios:</span> 1 hour
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">From Folegandros:</span> 1 hour
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">From Santorini:</span> 2-3 hours
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaMapMarkedAlt className="text-blue-500 mr-3" /> Getting Around
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Sikinos is a small island with limited transportation options. Here are the best ways to explore the island:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">Local Bus:</span> Connects Alopronia (port) with Chora, with limited schedules
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">Taxi:</span> Limited taxis available, best arranged in advance
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">Walking:</span> Many attractions are accessible via hiking trails
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">Rental:</span> Limited scooter and car rentals available in Alopronia
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* Call to Action Section */}
          <section className="mb-16 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-500 bg-opacity-30 text-white text-sm font-medium mb-4">
                      Best time to visit: May to September
                    </div>
                    <h2 className="text-3xl font-bold mb-6">Ready to Experience Sikinos?</h2>
                    <p className="text-lg mb-8 text-blue-100">
                      Discover the authentic charm of this untouched Cycladic gem. Plan your perfect getaway to Sikinos and experience 
                      traditional island life, stunning landscapes, and genuine Greek hospitality.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a 
                        href="/hotels/" 
                        className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg shadow-md hover:bg-blue-50 transition duration-300"
                      >
                        Find Accommodations
                      </a>
                      <a 
                        href="/ferry-tickets/" 
                        className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-300"
                      >
                        How to get there
                      </a>
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src="/images/islands/sikinos/cta-image.jpg" 
                      alt="Sikinos Island View" 
                      className="rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SikinosGuide;
