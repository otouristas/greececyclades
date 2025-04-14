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
  FaHistory
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';

const IrakliaGuide: React.FC = () => {
  const iraklia = islandGuides.find(island => island.id === 'iraklia');

  if (!iraklia) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Iraklia Travel Guide 2025 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Iraklia vacation with our comprehensive 2025 travel guide. Discover the best beaches, hiking trails, and authentic experiences on this tranquil Small Cyclades island.",
    keywords: [
      'Iraklia travel guide',
      'Iraklia beaches',
      'Small Cyclades',
      'Agios Georgios Iraklia',
      'Greek islands',
      'Iraklia hiking',
      'Livadi Beach',
      'Cave of Agios Ioannis',
      'Iraklia restaurants',
      'best time to visit Iraklia'
    ],
    canonicalUrl: "https://greececyclades.com/iraklia-guide",
    ogImage: iraklia.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/iraklia/gallery/iraklia-agios-georgios.jpg",
      alt: "The picturesque port village of Agios Georgios"
    },
    {
      src: "/images/islands/iraklia/gallery/iraklia-livadi-beach.jpg",
      alt: "The golden sands of Livadi Beach"
    },
    {
      src: "/images/islands/iraklia/gallery/iraklia-cave.jpg",
      alt: "The impressive Cave of Agios Ioannis"
    },
    {
      src: "/images/islands/iraklia/gallery/iraklia-panagia.jpg",
      alt: "Traditional whitewashed village of Panagia"
    },
    {
      src: "/images/islands/iraklia/gallery/iraklia-alimia-beach.jpg",
      alt: "Crystal clear waters at Alimia Beach"
    },
    {
      src: "/images/islands/iraklia/gallery/iraklia-food.jpg",
      alt: "Traditional Greek cuisine with local products"
    },
    {
      src: "/images/islands/iraklia/gallery/iraklia-hiking.jpg",
      alt: "Scenic hiking trails with panoramic views"
    },
    {
      src: "/images/islands/iraklia/gallery/iraklia-aerial.jpg",
      alt: "Aerial view of Iraklia coastline"
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
      description: 'Honey and delicacies',
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
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl={seoData.canonicalUrl}
        ogImage={seoData.ogImage}
        ogType={seoData.ogType}
      />

      <div className="bg-gray-100">
        <IslandGuideHero
          name="Iraklia"
          description="A tranquil Small Cyclades island offering pristine beaches, hiking trails, and authentic experiences"
          image="/images/islands/iraklia.jpg"
          bestTime="May to September"
          idealFor={["Nature lovers", "hikers", "those seeking tranquility"]}
        />

        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Welcome to Iraklia</h2>
              <p className="text-gray-700 leading-relaxed">
                Iraklia, the smallest of the Small Cyclades, is a tranquil paradise that offers an authentic Greek island experience away from the crowds. With just two charming villages, pristine beaches, and a network of hiking trails, this hidden gem is perfect for travelers seeking peace, natural beauty, and simplicity.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The island's main settlement, Agios Georgios, serves as both the port and the center of local life, with a handful of traditional tavernas, small shops, and accommodations. The second village, Panagia, perched on a hillside, offers stunning panoramic views of the surrounding Aegean Sea. Iraklia's untouched natural environment, with its crystal-clear waters, diverse hiking paths, and the impressive Cave of Agios Ioannis, makes it an ideal destination for nature lovers and those looking to experience the authentic, unhurried rhythm of Greek island life.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/iraklia/landscape.jpg" 
                  alt="Iraklia Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/islands/iraklia/agios-georgios-detail.jpg" 
                    alt="Agios Georgios Detail" 
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
            <h2 className="text-3xl font-bold mb-8">When to Visit Iraklia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaSun className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">High Season</h3>
                <p className="text-gray-600">July to August</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Perfect beach weather</li>
                  <li>• All facilities open</li>
                  <li>• More ferry connections</li>
                  <li>• Busiest period (still quiet)</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaLeaf className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Shoulder Season</h3>
                <p className="text-gray-600">May-June & September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Pleasant temperatures</li>
                  <li>• Ideal for hiking</li>
                  <li>• Fewer visitors</li>
                  <li>• Lower accommodation prices</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaCalendarAlt className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Low Season</h3>
                <p className="text-gray-600">October to April</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Very few tourists</li>
                  <li>• Limited ferry connections</li>
                  <li>• Many businesses closed</li>
                  <li>• Authentic local experience</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaCameraRetro className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Best For Photography</h3>
                <p className="text-gray-600">April-May & September-October</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Beautiful light conditions</li>
                  <li>• Spring wildflowers (April-May)</li>
                  <li>• Clear visibility for landscapes</li>
                  <li>• Dramatic cloud formations</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-xl mb-4">Weather Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-lg mb-2">Temperature Ranges</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Summer (June-August): 25-30°C (77-86°F)</li>
                    <li>• Spring/Autumn: 18-25°C (64-77°F)</li>
                    <li>• Winter (December-February): 10-15°C (50-59°F)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-2">Practical Tips</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• The meltemi winds can be strong in July and August</li>
                    <li>• Ferry services are reduced in winter months</li>
                    <li>• Many businesses close from November to Easter</li>
                    <li>• Book accommodation in advance for July-August</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Villages Section */}
          <section id="villages" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Villages of Iraklia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Agios Georgios</h3>
                <p className="text-gray-700 leading-relaxed">
                  The main port and largest settlement on Iraklia, Agios Georgios is a picturesque fishing village that serves as the island's gateway. This charming hamlet wraps around a natural bay with crystal-clear waters and features a small harbor where fishing boats and yachts dock side by side.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The village center consists of a handful of traditional tavernas, small shops, and accommodations, all within walking distance of the port. The laid-back atmosphere is immediately apparent, with locals and visitors alike embracing the slow pace of island life.
                </p>
              </div>
              <div>
                <img 
                  src="/images/islands/iraklia/agios-georgios.jpg" 
                  alt="The picturesque port village of Agios Georgios" 
                  className="rounded-lg shadow-md w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <img 
                  src="/images/islands/iraklia/panagia-village.jpg" 
                  alt="The hillside village of Panagia" 
                  className="rounded-lg shadow-md w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Panagia</h3>
                <p className="text-gray-700 leading-relaxed">
                  Perched on a hillside about 3.5 km from Agios Georgios, Panagia is the second and smaller village of Iraklia. This traditional settlement offers stunning panoramic views of the surrounding islands and the Aegean Sea, making it a perfect spot for photographers and sunset enthusiasts.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Named after the church of Panagia (Virgin Mary) that stands at its center, the village features narrow winding paths, traditional Cycladic architecture with whitewashed houses, and blue-painted doors and windows. The peaceful atmosphere is occasionally interrupted only by the sound of goat bells from nearby farms.
                </p>
              </div>
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Beaches of Iraklia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Livadi Beach</h3>
                <p className="text-gray-700 leading-relaxed">
                  Livadi is the most popular and accessible beach on Iraklia, located just a 15-minute walk from Agios Georgios port. This beautiful sandy beach stretches along a sheltered bay with shallow, crystal-clear waters that are perfect for families with children.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The beach is partially organized with a few sunbeds and umbrellas during the summer months, and there's a small cantina serving refreshments and snacks. The surrounding landscape features a wetland area that attracts various bird species, adding to the natural beauty of the location.
                </p>
              </div>
              <div>
                <img 
                  src="/images/islands/iraklia/livadi-beach-full.jpg" 
                  alt="The golden sands of Livadi Beach" 
                  className="rounded-lg shadow-md w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <img 
                  src="/images/islands/iraklia/alimia-beach.jpg" 
                  alt="The secluded Alimia Beach" 
                  className="rounded-lg shadow-md w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Alimia Beach</h3>
                <p className="text-gray-700 leading-relaxed">
                  Alimia is a secluded beach on the northeastern coast of Iraklia, accessible via a hiking trail (approximately 1 hour from Agios Georgios) or by boat. This untouched pebbled beach offers privacy and tranquility even during the peak summer months.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The beach features crystal-clear deep blue waters that are perfect for snorkeling and exploring the rich marine life. The surrounding cliffs and underwater caves add to the adventurous appeal of this hidden gem. There are no facilities on the beach, so visitors should come prepared with water and supplies.
                </p>
              </div>
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Activities on Iraklia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Hiking & Nature</h3>
                <p className="text-gray-700 leading-relaxed">
                  Iraklia features well-marked hiking paths that connect villages, beaches, and points of interest. The most popular routes include Agios Georgios to Panagia (3.5 km), and the path to Papas Beach (4 km).
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The island's diverse terrain, with its gentle hills and coastal paths, makes hiking accessible to most fitness levels. Along the trails, hikers are rewarded with panoramic views, encounters with local wildlife, and the discovery of hidden coves and historical sites.
                </p>
              </div>
              <div>
                <img 
                  src="/images/islands/iraklia/hiking-trail.jpg" 
                  alt="Scenic hiking trail on Iraklia" 
                  className="rounded-lg shadow-md w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <img 
                  src="/images/islands/iraklia/cave-agios-ioannis.jpg" 
                  alt="The impressive Cave of Agios Ioannis" 
                  className="rounded-lg shadow-md w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Cave of Agios Ioannis</h3>
                <p className="text-gray-700 leading-relaxed">
                  One of Iraklia's most significant attractions is the Cave of Agios Ioannis, located on the northeastern part of the island. This impressive cave features spectacular stalactites and stalagmites formed over thousands of years.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The cave can be reached via a moderately challenging hiking trail (approximately 1 hour from Agios Georgios) that offers stunning views along the way. Inside, visitors can see the small chapel dedicated to St. John (Agios Ioannis) that gives the cave its name. Guided tours are available during the summer months.
                </p>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaSwimmer className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Swimming & Snorkeling</h3>
                <p className="text-gray-600 mb-4">
                  The crystal-clear waters surrounding Iraklia are perfect for swimming and snorkeling. The island's beaches and coves offer excellent visibility and diverse marine life to explore.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Clear Waters</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Marine Life</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaHistory className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Birdwatching</h3>
                <p className="text-gray-600 mb-4">
                  Iraklia is a haven for birdwatchers, with its wetland area near Livadi Beach attracting numerous species of migratory and resident birds throughout the year.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Wetland Birds</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Migratory Species</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaShip className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Boat Trips</h3>
                <p className="text-gray-600 mb-4">
                  During the summer months, local boat operators offer day trips around Iraklia and to neighboring Small Cyclades islands, providing a different perspective of this beautiful archipelago.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Island Hopping</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Coastal Exploration</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* Local Cuisine Section */}
          <section id="cuisine" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Local Cuisine of Iraklia</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-w-1 aspect-h-1">
                    <img 
                      src="/images/islands/iraklia/cuisine/iraklia-food.jpg" 
                      alt="Traditional Iraklian Cuisine" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Iraklia's cuisine is characterized by simplicity, freshness, and authentic flavors. The island's small size and limited resources have shaped a culinary tradition that makes the most of local ingredients, particularly fresh seafood, locally raised meat, and seasonal produce.
                </p>
                <h3 className="font-semibold text-xl mt-6 mb-4">Local Specialties</h3>
                <ul className="space-y-2">
                  <li><strong>Fresh Fish</strong> - Caught daily by local fishermen and served in the tavernas of Agios Georgios</li>
                  <li><strong>Goat with Potatoes</strong> - Slow-cooked in a wood-fired oven with herbs and lemon</li>
                  <li><strong>Fava</strong> - Yellow split pea puree with olive oil, lemon, and capers</li>
                  <li><strong>Marathotiganites</strong> - Fennel fritters, a traditional Cycladic appetizer</li>
                  <li><strong>Mizithra Cheese</strong> - Local soft cheese made from goat's milk</li>
                </ul>
                
                <h3 className="font-semibold text-xl mt-6 mb-4">Local Products</h3>
                <ul className="space-y-2">
                  <li><strong>Thyme Honey</strong> - Produced from the abundant thyme plants on the island's hills</li>
                  <li><strong>Goat Cheese</strong> - Made by local families using traditional methods</li>
                  <li><strong>Olive Oil</strong> - Extra virgin olive oil from the island's small groves</li>
                  <li><strong>Wild Herbs</strong> - Oregano, sage, and other herbs grow wild on the island</li>
                  <li><strong>Homemade Preserves</strong> - Seasonal fruit preserves made by local women</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaUtensils className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Tavernas by the Sea</h3>
                <p className="text-gray-600 mb-4">
                  Experience authentic Greek dining at the waterfront tavernas in Agios Georgios, where you can enjoy fresh seafood and local specialties with views of the harbor.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Fresh Fish</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sea View</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaWineGlass className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Local Wines</h3>
                <p className="text-gray-600 mb-4">
                  While Iraklia doesn't have commercial wineries, you can taste homemade wines produced by locals from small vineyards on the island.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Homemade Wine</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Local Tradition</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaLeaf className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Farm to Table</h3>
                <p className="text-gray-600 mb-4">
                  Many of the ingredients used in Iraklia's tavernas come directly from local farms and gardens, ensuring freshness and supporting the island's small-scale agriculture.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Seasonal Produce</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sustainable Dining</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* Photo Gallery Section */}
          <section id="gallery" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Iraklia Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600 italic">
                Images showcase the natural beauty, traditional villages, and pristine beaches of Iraklia Island
              </p>
            </div>
          </section>
          
          {/* Call to Action Section */}
          <section id="cta" className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md overflow-hidden">
            <div className="container mx-auto px-6 py-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-4">Ready to Experience Iraklia?</h2>
                  <p className="text-lg mb-6">
                    Book your accommodations, tours, and activities for an unforgettable Greek island getaway.
                    Iraklia offers the perfect blend of natural beauty, tranquility, and authentic Greek hospitality.
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
                    src="/images/islands/iraklia/cta-image.jpg" 
                    alt="Iraklia Island View" 
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg">
                    <p className="text-blue-600 font-semibold">Best time to visit: May-September</p>
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

export default IrakliaGuide;
