import React from 'react';
import { 
  FaUmbrellaBeach, 
  FaWineGlass, 
  FaMapMarkedAlt, 
  FaShip, 
  FaUtensils, 
  FaSun, 
  FaCameraRetro, 
  FaSwimmer,
  FaHiking,
  FaHistory,
  FaHome
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';

const SyrosGuide: React.FC = () => {
  const syros = islandGuides.find(island => island.id === 'syros');

  if (!syros) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Syros Travel Guide 2025 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Syros vacation with our comprehensive 2025 travel guide. Discover the best hotels, restaurants, beaches, and activities. From the neoclassical architecture of Ermoupolis to pristine beaches and rich cultural heritage.",
    keywords: [
      'Syros travel guide',
      'Syros beaches',
      'Ermoupolis Syros',
      'Greek islands',
      'Syros villages',
      'Ano Syros',
      'Cycladic islands',
      'Syros culture',
      'Syros restaurants',
      'best time to visit Syros'
    ],
    ogImage: syros.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/syros/gallery/syros-ermoupolis.jpg",
      alt: "The impressive neoclassical buildings of Ermoupolis"
    },
    {
      src: "/images/islands/syros/gallery/syros-ano-syros.jpg",
      alt: "The medieval settlement of Ano Syros with its narrow streets"
    },
    {
      src: "/images/islands/syros/gallery/syros-beach.jpg",
      alt: "Crystal clear waters at one of Syros' beautiful beaches"
    },
    {
      src: "/images/islands/syros/gallery/syros-apollo-theater.jpg",
      alt: "The historic Apollo Theater, a miniature of La Scala in Milan"
    },
    {
      src: "/images/islands/syros/gallery/syros-food.jpg",
      alt: "Traditional Syros cuisine with local specialties"
    },
    {
      src: "/images/islands/syros/gallery/syros-sunset.jpg",
      alt: "Breathtaking sunset view over Syros"
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
      description: 'Loukoumi and delicacies',
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
      
      <div className="bg-gray-50">
        <IslandGuideHero 
          name={syros.name || "Syros"}
          description={syros.description || "The Capital of the Cyclades with Neoclassical Elegance"}
          image={syros.image}
          bestTime={syros.bestTime || "April to October, with July and August being the peak months"}
          idealFor={syros.idealFor || ["Beach Lovers", "Culture Enthusiasts", "Architecture Fans", "Foodies"]}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Welcome to Syros</h2>
              <p className="text-gray-700 leading-relaxed">
                Discover Syros, the captivating capital of the Cyclades islands, where neoclassical grandeur 
                meets traditional Greek charm. This unique island combines the elegance of Ermoupolis, 
                its stunning capital, with authentic Cycladic villages, pristine beaches, and a rich cultural 
                heritage.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the medieval settlement of Ano Syros to the impressive Apollo Theater, 
                from bustling ports to secluded coves, this guide will help you explore an island that 
                perfectly balances history, culture, and natural beauty.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/syros/landscape.jpg" 
                  alt="Syros Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/islands/syros/ermoupolis-detail.jpg" 
                    alt="Ermoupolis Detail" 
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
            <div className="flex items-center mb-6">
              <FaSun className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">When to Visit</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Syros enjoys a Mediterranean climate with mild winters and warm, sunny summers. Unlike some 
                  other Cycladic islands, Syros maintains a vibrant atmosphere year-round thanks to its status 
                  as the administrative center of the Cyclades.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">High Season (June-August)</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Warmest weather with temperatures between 25-30°C (77-86°F)</li>
                      <li>• Bustling atmosphere with many cultural events and festivals</li>
                      <li>• All restaurants, shops, and attractions operating at full capacity</li>
                      <li>• Higher prices and more crowded beaches</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Shoulder Season (April-May, September-October)</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Pleasant temperatures between 18-25°C (64-77°F)</li>
                      <li>• Fewer tourists but most facilities still open</li>
                      <li>• Better deals on accommodations</li>
                      <li>• Ideal for exploring and hiking</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Low Season (November-March)</h3>
                  <p className="text-gray-600 mb-3">
                    Unlike many Greek islands that practically shut down in winter, Syros maintains a lively 
                    atmosphere year-round. With around 20,000 permanent residents, the island offers:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Mild winter temperatures between 10-15°C (50-59°F)</li>
                    <li>• An authentic local experience with few tourists</li>
                    <li>• Lower prices for accommodations</li>
                    <li>• Many restaurants and cafes remain open, especially in Ermoupolis</li>
                    <li>• Cultural events at the Apollo Theater and other venues</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Water Temperature</h3>
                  <p className="text-gray-600">
                    The sea is warmest from July to September (23-25°C/73-77°F), pleasant for swimming from 
                    May to October, and quite cold during winter months (15-17°C/59-63°F).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Villages Section */}
          <section id="villages" className="mb-16">
            <div className="flex items-center mb-6">
              <FaHome className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">Villages</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/syros/villages/ermoupolis.jpg" 
                    alt="Ermoupolis, the capital of Syros" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Ermoupolis</h3>
                  <p className="text-gray-600 mb-4">
                    The capital of Syros and the Cyclades, Ermoupolis is a stunning neoclassical town built 
                    amphitheatrically around the harbor. Highlights include:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• Miaouli Square with its grand Town Hall</li>
                    <li>• Apollo Theater, a miniature replica of La Scala in Milan</li>
                    <li>• Impressive mansions and neoclassical buildings</li>
                    <li>• The Church of Saint Nicholas with its blue dome</li>
                    <li>• Bustling waterfront with restaurants and cafes</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/syros/villages/ano-syros.jpg" 
                    alt="The medieval settlement of Ano Syros" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Ano Syros</h3>
                  <p className="text-gray-600 mb-4">
                    Perched on a hill above Ermoupolis, this medieval settlement was founded in the 13th century 
                    and maintains its distinct character:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• Narrow winding streets and whitewashed houses</li>
                    <li>• Catholic Cathedral of Saint George at the top</li>
                    <li>• Panoramic views of Ermoupolis and the Aegean</li>
                    <li>• Birthplace of famous rebetiko musician Markos Vamvakaris</li>
                    <li>• Traditional tavernas serving local cuisine</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/syros/villages/galissas.jpg" 
                    alt="The beach resort of Galissas" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Galissas</h3>
                  <p className="text-gray-600 mb-4">
                    A popular seaside village on the west coast of Syros, known for:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• A long sandy beach with shallow waters</li>
                    <li>• Family-friendly atmosphere</li>
                    <li>• Variety of accommodations from hotels to rooms for rent</li>
                    <li>• Waterfront tavernas and cafes</li>
                    <li>• Beautiful sunset views</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/syros/villages/kini.jpg" 
                    alt="The fishing village of Kini" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Kini</h3>
                  <p className="text-gray-600 mb-4">
                    A charming fishing village on the west coast offering:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• A picturesque harbor with fishing boats</li>
                    <li>• A sandy beach with clear waters</li>
                    <li>• Excellent seafood tavernas</li>
                    <li>• Relaxed, authentic atmosphere</li>
                    <li>• Boat trips to nearby beaches</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <div className="flex items-center mb-6">
              <FaSwimmer className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">Beaches</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/syros/beaches/galissas-beach.jpg" 
                    alt="Galissas Beach" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Galissas Beach</h3>
                  <p className="text-gray-600 mb-4">
                    A popular and well-organized beach on the west coast:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• Long stretch of golden sand</li>
                    <li>• Shallow waters ideal for families</li>
                    <li>• Blue Flag certified</li>
                    <li>• Sunbeds, umbrellas, and water sports</li>
                    <li>• Beachfront tavernas and cafes</li>
                    <li>• Easily accessible by bus from Ermoupolis</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/syros/beaches/kini-beach.jpg" 
                    alt="Kini Beach" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Kini Beach</h3>
                  <p className="text-gray-600 mb-4">
                    A charming beach in the fishing village of Kini:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• Sandy beach with crystal clear waters</li>
                    <li>• Traditional fishing boats in the harbor</li>
                    <li>• Excellent seafood tavernas along the shore</li>
                    <li>• Beautiful sunset views</li>
                    <li>• Regular bus service from Ermoupolis</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/syros/beaches/vari-beach.jpg" 
                    alt="Vari Beach" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Vari Beach</h3>
                  <p className="text-gray-600 mb-4">
                    A family-friendly beach close to Ermoupolis:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• Sandy beach with shallow waters</li>
                    <li>• Well-organized with amenities</li>
                    <li>• Trees providing natural shade</li>
                    <li>• Several tavernas and cafes</li>
                    <li>• Easy access by bus or car</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/syros/beaches/delfini-beach.jpg" 
                    alt="Delfini Beach" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Delfini Beach</h3>
                  <p className="text-gray-600 mb-4">
                    A more secluded beach for those seeking tranquility:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• Beautiful pebbly beach with turquoise waters</li>
                    <li>• Less crowded than other beaches</li>
                    <li>• Limited facilities - bring your own supplies</li>
                    <li>• Natural shade from surrounding cliffs</li>
                    <li>• Accessible by car or boat</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">More Beaches to Explore</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <li className="bg-white p-4 rounded shadow-sm">Azolimnos - Family-friendly, organized</li>
                <li className="bg-white p-4 rounded shadow-sm">Megas Gialos - Sheltered bay, calm waters</li>
                <li className="bg-white p-4 rounded shadow-sm">Posidonia/Dellagrazia - Upscale area, clean waters</li>
                <li className="bg-white p-4 rounded shadow-sm">Agathopes - Golden sand, shallow waters</li>
                <li className="bg-white p-4 rounded shadow-sm">Komito - Secluded, natural beauty</li>
                <li className="bg-white p-4 rounded shadow-sm">Finikas - Protected harbor, facilities</li>
              </ul>
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <div className="flex items-center mb-6">
              <FaHiking className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">Activities & Attractions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/syros/activities/apollo-theater.jpg" 
                    alt="Apollo Theater" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Cultural Experiences</h3>
                  <p className="text-gray-600 mb-4">
                    Syros offers a rich cultural scene throughout the year:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• Visit the Apollo Theater, a miniature of La Scala in Milan</li>
                    <li>• Attend performances during the Syros International Film Festival</li>
                    <li>• Explore the Industrial Museum of Ermoupolis</li>
                    <li>• Visit the Archaeological Museum of Syros</li>
                    <li>• Experience the Ano Syros Medieval Fest (summer)</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/syros/activities/hiking.jpg" 
                    alt="Hiking in Syros" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Outdoor Activities</h3>
                  <p className="text-gray-600 mb-4">
                    Explore the natural beauty of Syros through various activities:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• Hiking on marked trails connecting villages</li>
                    <li>• Water sports at Galissas and other organized beaches</li>
                    <li>• Scuba diving and snorkeling in crystal clear waters</li>
                    <li>• Boat tours around the island</li>
                    <li>• Mountain biking on scenic routes</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/syros/activities/ermoupolis-architecture.jpg" 
                    alt="Ermoupolis Architecture Tour" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Architectural Tours</h3>
                  <p className="text-gray-600 mb-4">
                    Discover the unique architectural heritage of Syros:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• Walking tour of Ermoupolis' neoclassical buildings</li>
                    <li>• Visit the Town Hall at Miaouli Square</li>
                    <li>• Explore both Orthodox and Catholic churches</li>
                    <li>• Tour the historic Vaporia district with captain's mansions</li>
                    <li>• Visit the renovated Tarsanas shipyard</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/syros/activities/local-products.jpg" 
                    alt="Syros Local Products" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Food & Shopping</h3>
                  <p className="text-gray-600 mb-4">
                    Taste and take home the flavors of Syros:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-4">
                    <li>• Visit a loukoumi factory to see how this traditional sweet is made</li>
                    <li>• Tour the San Michali cheese production facilities</li>
                    <li>• Take a cooking class featuring local recipes</li>
                    <li>• Explore the local market in Ermoupolis</li>
                    <li>• Join a food tour to sample various local specialties</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cuisine Section */}
          <section id="cuisine" className="mb-16">
            <div className="flex items-center mb-6">
              <FaUtensils className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">Cuisine</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Syros has a unique culinary tradition that blends Cycladic flavors with influences from 
                  both the Orthodox and Catholic communities that have coexisted on the island for centuries.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Local Specialties</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">San Michali Cheese</span> - A PDO-protected hard cheese 
                          made from cow's milk, similar to parmesan but with a spicier flavor.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Loukoumi</span> - The famous Greek delight (similar to 
                          Turkish delight) with various flavors, a tradition since the 19th century.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Halva Pie</span> - A sweet pie made with layers of 
                          phyllo dough, almonds, and honey.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Marathopites</span> - Savory pies made with fennel, 
                          onions, and olive oil.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Aetopita</span> - A traditional Easter pie with rice and herbs.
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Seafood & Main Dishes</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Fresh Seafood</span> - Try the catch of the day at 
                          the waterfront tavernas in Kini or Ermoupolis.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Syros Sausage</span> - Made with pork, fennel seeds, 
                          and savory spices.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Kaparosalata</span> - A salad made with capers, 
                          a plant that grows abundantly on the island.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Maintanosalata</span> - A refreshing parsley salad.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Fourtalia</span> - An omelet with potatoes, local sausage, 
                          and herbs.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Where to Eat</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Ermoupolis</h4>
                      <p className="text-sm text-gray-600">Upscale restaurants and traditional tavernas around Miaouli Square</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Ano Syros</h4>
                      <p className="text-sm text-gray-600">Authentic tavernas with panoramic views</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Kini</h4>
                      <p className="text-sm text-gray-600">Seafood restaurants by the water</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Galissas</h4>
                      <p className="text-sm text-gray-600">Beach tavernas serving fresh fish</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Posidonia</h4>
                      <p className="text-sm text-gray-600">Upscale dining options</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Vaporia</h4>
                      <p className="text-sm text-gray-600">Elegant cafes with sea views</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Culinary Experiences</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Visit a loukoumi factory to see how this traditional sweet is made</li>
                    <li>• Tour the San Michali cheese production facilities</li>
                    <li>• Take a cooking class featuring local recipes</li>
                    <li>• Explore the local market in Ermoupolis</li>
                    <li>• Join a food tour to sample various local specialties</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Photo Gallery */}
          <section id="gallery" className="mb-16">
            <div className="flex items-center mb-6">
              <FaCameraRetro className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">Photo Gallery</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-gray-600">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action Section */}
          <section id="cta" className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md overflow-hidden">
            <div className="container mx-auto px-6 py-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-4">Ready to Experience Syros?</h2>
                  <p className="text-lg mb-6">
                    Book your accommodations, tours, and activities for an unforgettable Greek island getaway.
                    Syros offers the perfect blend of neoclassical elegance, vibrant culture, and authentic Greek hospitality.
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
                    src="/images/islands/syros/cta-image.jpg" 
                    alt="Syros Island View" 
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

export default SyrosGuide;
