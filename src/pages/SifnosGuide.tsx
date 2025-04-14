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
import { islandGuides } from '../data/islandsData';

const SifnosGuide: React.FC = () => {
  const sifnos = islandGuides.find(island => island.id === 'sifnos');

  if (!sifnos) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Sifnos Travel Guide 2025 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Sifnos vacation with our comprehensive 2025 travel guide. Discover the best hotels, restaurants, beaches, and activities. From the culinary paradise to pristine beaches and traditional pottery.",
    keywords: [
      'Sifnos travel guide',
      'Sifnos beaches',
      'Kastro Sifnos',
      'Apollonia',
      'Greek islands',
      'Sifnos villages',
      'Chrysopigi',
      'pottery Sifnos',
      'Sifnos restaurants',
      'best time to visit Sifnos'
    ],
    ogImage: sifnos.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/sifnos/gallery/sifnos-kastro.jpg",
      alt: "The medieval village of Kastro"
    },
    {
      src: "/images/islands/sifnos/gallery/sifnos-apollonia.jpg",
      alt: "The charming capital of Apollonia"
    },
    {
      src: "/images/islands/sifnos/gallery/sifnos-chrysopigi.jpg",
      alt: "The iconic Chrysopigi Monastery"
    },
    {
      src: "/images/islands/sifnos/gallery/sifnos-artemonas.jpg",
      alt: "Traditional whitewashed village of Artemonas"
    },
    {
      src: "/images/islands/sifnos/gallery/sifnos-vathi.jpg",
      alt: "The beautiful beach of Vathi"
    },
    {
      src: "/images/islands/sifnos/gallery/sifnos-food.jpg",
      alt: "Traditional Sifnian cuisine with local products"
    },
    {
      src: "/images/islands/sifnos/gallery/sifnos-pottery.jpg",
      alt: "Traditional pottery workshop"
    },
    {
      src: "/images/islands/sifnos/gallery/sifnos-aerial.jpg",
      alt: "Aerial view of Sifnos coastline"
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
      description: 'Pottery and delicacies',
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

  return (
    <>
      <SEO {...seoData} />
      <div className="min-h-screen bg-gray-50">
        <IslandGuideHero {...sifnos} />
        
        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Welcome to Sifnos</h2>
              <p className="text-gray-700 leading-relaxed">
                Sifnos, the gastronomic capital of the Cyclades, is an island where culinary tradition meets architectural elegance. 
                The island's rich clay deposits have fostered a long tradition of pottery making, evident in its distinctive chimney pots 
                and the earthenware casseroles used in its famous slow-cooked recipes.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the medieval village of Kastro to the vibrant capital of Apollonia, and from the iconic Chrysopigi Monastery to 
                the beautiful beaches like Vathi and Platis Gialos, Sifnos offers a complete Greek island experience. Our comprehensive 
                guide will help you discover the best of what this magical island has to offer.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/sifnos/landscape.jpg" 
                  alt="Sifnos Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/islands/sifnos/kastro-detail.jpg" 
                    alt="Kastro Detail" 
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

          {/* When to Visit Section */}
          <section id="when-to-visit" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">When to Visit Sifnos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaSun className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">High Season</h3>
                <p className="text-gray-600">July to August</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Perfect beach weather</li>
                  <li>• All facilities open</li>
                  <li>• Vibrant atmosphere</li>
                  <li>• Busiest period</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaCameraRetro className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Shoulder Season</h3>
                <p className="text-gray-600">May-June, September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Pleasant weather</li>
                  <li>• Fewer tourists</li>
                  <li>• Better rates</li>
                  <li>• Comfortable sightseeing</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaLeaf className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Spring</h3>
                <p className="text-gray-600">April to May</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Wildflowers blooming</li>
                  <li>• Mild temperatures</li>
                  <li>• Perfect for hiking</li>
                  <li>• Easter celebrations</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaCalendarAlt className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Water Temperature</h3>
                <p className="text-gray-600">Best swimming months</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• June: 22°C (72°F)</li>
                  <li>• July: 24°C (75°F)</li>
                  <li>• August: 25°C (77°F)</li>
                  <li>• September: 24°C (75°F)</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* Villages Section */}
          <section id="villages" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Charming Villages of Sifnos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sifnos/villages/kastro.jpg" 
                    alt="Kastro Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Kastro</h3>
                  <p className="text-gray-600 mb-4">
                    The medieval village of Kastro, built on top of an ancient acropolis, stands as a remarkable example of continuous 
                    habitation from ancient times. Its walls incorporate ancient marble columns and architectural elements. Wander through 
                    the narrow streets, visit the Archaeological Museum, and enjoy breathtaking views of the Aegean Sea from this 
                    amphitheatrically built settlement.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Medieval Architecture</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sea Views</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Archaeological Museum</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sifnos/villages/apollonia.jpg" 
                    alt="Apollonia Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Apollonia</h3>
                  <p className="text-gray-600 mb-4">
                    The capital of Sifnos, Apollonia, comes alive at night with its string of bars and restaurants along the "Steno" (narrow street). 
                    This charming settlement is a maze of whitewashed houses, blue-domed churches, and narrow alleys. Visit the Folklore Museum, 
                    shop at boutique stores, and enjoy the island's vibrant nightlife in this central hub.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Island Capital</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Nightlife</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Folklore Museum</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sifnos/villages/artemonas.jpg" 
                    alt="Artemonas Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Artemonas</h3>
                  <p className="text-gray-600 mb-4">
                    Known for its neoclassical architecture and aristocratic character, Artemonas is one of the most elegant villages on Sifnos. 
                    Stroll through its marble-paved streets lined with impressive mansions and beautiful gardens. The village is also famous for 
                    its traditional pastry shops where you can taste local sweets like almond cookies and honey pie.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Neoclassical Architecture</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Traditional Sweets</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Elegant Mansions</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sifnos/villages/faros.jpg" 
                    alt="Faros Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Faros</h3>
                  <p className="text-gray-600 mb-4">
                    This picturesque fishing village on the southeastern coast of Sifnos features a natural harbor and three consecutive sandy beaches. 
                    Once the main port of the island, Faros now offers a peaceful retreat with excellent seafood tavernas and a relaxed atmosphere. 
                    It's also the starting point for scenic hiking trails leading to Chrysopigi Monastery and Apokofto Beach.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Fishing Village</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sandy Beaches</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Hiking Trails</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Beautiful Beaches of Sifnos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sifnos/beaches/platis-gialos.jpg" 
                    alt="Platis Gialos Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Platis Gialos</h3>
                  <p className="text-gray-600 mb-4">
                    The longest beach on Sifnos, Platis Gialos is a family-friendly stretch of golden sand with shallow, crystal-clear waters. 
                    The beach is well-organized with sunbeds, umbrellas, and water sports facilities. The beachfront is lined with tavernas, 
                    cafes, and accommodations, making it perfect for a full day of beach enjoyment.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Water Sports</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Restaurants</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sifnos/beaches/vathi.jpg" 
                    alt="Vathi Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Vathi</h3>
                  <p className="text-gray-600 mb-4">
                    Nestled in a protected bay on the southwestern coast of Sifnos, Vathi is a picturesque beach with fine golden sand and 
                    turquoise waters. The beach is surrounded by a traditional village with a beautiful church right on the sand. The calm, 
                    shallow waters make it ideal for families with children, while the beachfront tavernas serve fresh seafood and local specialties.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Protected Bay</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Traditional Village</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sifnos/beaches/chrysopigi.jpg" 
                    alt="Chrysopigi Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Chrysopigi</h3>
                  <p className="text-gray-600 mb-4">
                    Named after the iconic monastery that stands on a rocky peninsula nearby, Chrysopigi is a beautiful beach with crystal-clear 
                    waters. The beach is divided into two parts by the monastery's promontory, offering both organized and more secluded areas. 
                    The unique landscape makes it a favorite spot for photographers, while the clear waters are perfect for snorkeling.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Scenic Views</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Snorkeling</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Historic Monastery</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sifnos/beaches/kamares.jpg" 
                    alt="Kamares Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Kamares</h3>
                  <p className="text-gray-600 mb-4">
                    The main port of Sifnos, Kamares boasts a long, sandy beach with shallow waters, making it ideal for families. 
                    The beach is well-organized with sunbeds, umbrellas, and water sports facilities. The surrounding area offers a 
                    variety of accommodations, restaurants, cafes, and shops, making it a convenient base for exploring the island.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Main Port</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Amenities</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Local Cuisine Section */}
          <section id="cuisine" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Local Cuisine of Sifnos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                  <div className="p-6">
                    <FaGlassCheers className="text-3xl text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-4">Traditional Dishes</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-blue-500 font-bold mr-2">•</span>
                        <div>
                          <span className="font-medium">Mastelo</span> - Lamb slow-cooked in a special clay pot with red wine and dill, a traditional Easter dish.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 font-bold mr-2">•</span>
                        <div>
                          <span className="font-medium">Revithada</span> - Chickpeas slow-cooked overnight in a clay pot, traditionally served on Sundays.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 font-bold mr-2">•</span>
                        <div>
                          <span className="font-medium">Manoura</span> - A local cheese aged in wine dregs, giving it a distinctive flavor and aroma.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 font-bold mr-2">•</span>
                        <div>
                          <span className="font-medium">Melopita</span> - A traditional honey pie made with local cheese and honey, flavored with cinnamon.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 font-bold mr-2">•</span>
                        <div>
                          <span className="font-medium">Amygdalota</span> - Almond cookies that are a specialty of Sifnos, often served at weddings and celebrations.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Where to Eat in Sifnos</h3>
                      <p className="text-gray-600 mb-4">
                        Sifnos is known as the culinary capital of the Cyclades, with a rich gastronomic tradition that dates back centuries. 
                        The island's pottery tradition is closely linked to its cuisine, with many dishes slow-cooked in traditional clay pots.
                      </p>
                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold">Fine Dining</h4>
                          <p className="text-sm text-gray-600">
                            <strong>Omega3</strong> in Platis Gialos offers creative fish and seafood dishes with a modern twist. 
                            <strong>Cayenne</strong> in Apollonia serves Mediterranean cuisine with local ingredients in an elegant setting.
                          </p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold">Traditional Tavernas</h4>
                          <p className="text-sm text-gray-600">
                            <strong>Leonidas</strong> in Kastro serves authentic Sifnian dishes in a historic setting. 
                            <strong>Drimoni</strong> in Apollonia offers fresh seafood right on the beach. 
                            <strong>To Tsikali</strong> in Vathi beach serves traditional dishes cooked in clay pots.
                          </p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold">Sweet Treats</h4>
                          <p className="text-sm text-gray-600">
                            <strong>Theodorou Sweet Shop</strong> in Artemonas is famous for its traditional almond cookies and honey pie. 
                            <strong>Grigoris</strong> in Apollonia offers excellent pastries and local sweets.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="aspect-w-16 aspect-h-9 md:aspect-auto">
                      <img 
                        src="/images/islands/sifnos/cuisine/sifnos-food.jpg" 
                        alt="Traditional Sifnian Cuisine" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6 bg-blue-50">
                    <h3 className="text-lg font-semibold mb-3">Local Products to Try</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium text-blue-800 mb-2">Sifnian Pottery</h4>
                        <p className="text-sm text-gray-600">
                          Not edible, but essential to Sifnian cuisine! The island's famous clay pots are used for cooking many traditional dishes.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium text-blue-800 mb-2">Local Honey</h4>
                        <p className="text-sm text-gray-600">
                          Thyme honey from Sifnos has a distinctive flavor and aroma, used in many traditional desserts.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium text-blue-800 mb-2">Capers</h4>
                        <p className="text-sm text-gray-600">
                          Wild capers grow abundantly on the island and are used in many local dishes for their distinctive tangy flavor.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Things to Do in Sifnos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaSwimmer className="text-3xl text-blue-500 mr-4" />
                    <h3 className="text-xl font-semibold">Water Activities</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Beach Hopping</span> - With over 40 beaches around the island, rent a car or take the local bus to explore different beaches each day, from organized ones like Platis Gialos to secluded coves.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Snorkeling</span> - The clear waters around Chrysopigi and Fasolou are perfect for snorkeling, with rich marine life and underwater visibility.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Kayaking</span> - Explore the coastline by kayak, with rentals available at Platis Gialos and Vathi beaches. Paddle to secluded coves and the impressive sea caves.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Sailing</span> - Join a sailing tour around the island or to nearby islands like Kimolos and Polyaigos, known for their pristine beaches and crystal waters.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sifnos/activities/water-activities.jpg" 
                    alt="Water Activities in Sifnos" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaHiking className="text-3xl text-blue-500 mr-4" />
                    <h3 className="text-xl font-semibold">Land Activities</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Hiking Trails</span> - Sifnos has an extensive network of well-marked hiking trails connecting villages and beaches. The trail from Apollonia to Kastro and the path to Chrysopigi Monastery are particularly scenic.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Pottery Workshops</span> - Take a pottery class and learn about the island's famous ceramic tradition that dates back thousands of years. Several workshops in Vathi offer classes for beginners.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Cooking Classes</span> - Learn to prepare traditional Sifnian dishes in cooking classes offered in Apollonia and Artemonas, often using local ingredients and traditional clay pots.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Church Hopping</span> - Explore the 365 churches and monasteries scattered across the island, many with impressive architecture, beautiful icons, and panoramic views.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/sifnos/activities/hiking.jpg" 
                    alt="Hiking in Sifnos" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="p-6 md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Unique Experiences in Sifnos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Panigiri Festivals</h4>
                        <p className="text-sm text-gray-600">
                          Experience a traditional Greek festival at one of the many church celebrations throughout summer. 
                          Enjoy local music, dancing, and free food and wine in a joyful atmosphere.
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Sunset at Kastro</h4>
                        <p className="text-sm text-gray-600">
                          Climb to the Church of Seven Martyrs near Kastro for one of the most spectacular sunset views in the Cyclades, 
                          with the church silhouetted against the golden sky.
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Sifnos Gastronomy Festival</h4>
                        <p className="text-sm text-gray-600">
                          Visit during the annual food festival in September to taste dishes prepared by local and guest chefs, 
                          attend cooking demonstrations, and participate in food-related events.
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Monastery of Chrysopigi</h4>
                        <p className="text-sm text-gray-600">
                          Visit the island's patron saint monastery built on a dramatic rock formation jutting into the sea. 
                          The monastery celebrates its feast day on Ascension Day with special events.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-w-16 aspect-h-9 md:aspect-auto">
                    <img 
                      src="/images/islands/sifnos/activities/chrysopigi-monastery.jpg" 
                      alt="Chrysopigi Monastery" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Photo Gallery Section */}
          <section id="gallery" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Sifnos Photo Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-w-4 aspect-h-3">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <p className="text-sm text-gray-600">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600 italic">
                Experience the beauty of Sifnos through our curated photo gallery. From the medieval village of Kastro to the 
                iconic Chrysopigi Monastery, the charming capital of Apollonia, and the beautiful beaches, these images showcase 
                the diverse beauty of this culinary paradise in the Cyclades.
              </p>
            </div>
          </section>
          
          {/* Call to Action Section */}
          <section id="cta" className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md overflow-hidden">
            <div className="container mx-auto px-6 py-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-4">Ready to Experience Sifnos?</h2>
                  <p className="text-lg mb-6">
                    Book your accommodations, tours, and activities for an unforgettable Greek island getaway.
                    Sifnos offers the perfect blend of culinary excellence, natural beauty, and authentic Greek hospitality.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="/hotels/" 
                      className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 text-center"
                    >
                      Find Accommodations
                    </a>
                    <a 
                      href="/ferry-tickets/" 
                      className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 text-center"
                    >
                      How to get there
                    </a>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <img 
                    src="/images/islands/sifnos/cta-image.jpg" 
                    alt="Sifnos Island View" 
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg">
                    <p className="text-blue-600 font-semibold">Best time to visit: May-October</p>
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

export default SifnosGuide;
