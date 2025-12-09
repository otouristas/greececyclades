import React from 'react';
import { 
  FaUmbrellaBeach, 
  FaWineGlass, 
  FaMapMarkedAlt, 
  FaShip, 
  FaUtensils, 
  FaHistory,
  FaSun, 
  FaCameraRetro, 
  FaLeaf,
  FaCalendarAlt,
  FaGlassCheers,
  FaSwimmer,
  FaHiking
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';
import RelatedDestinationsSection from '../components/seo/RelatedDestinationsSection';
import { siteLinks } from '../data/siteLinks';

const MilosGuide: React.FC = () => {
  const milos = islandGuides.find(island => island.id === 'milos');

  if (!milos) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Milos Travel Guide 2026 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Milos vacation with our comprehensive 2026 travel guide. Discover the best hotels, restaurants, beaches, and activities. From lunar landscapes to colorful fishing villages and stunning beaches.",
    keywords: [
      'Milos travel guide',
      'Milos beaches',
      'Sarakiniko Milos',
      'Kleftiko',
      'Greek islands',
      'Milos villages',
      'Plaka Milos',
      'Milos catacombs',
      'Milos restaurants',
      'best time to visit Milos'
    ],
    ogImage: milos.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/milos/gallery/milos-sarakiniko.jpg",
      alt: "The lunar landscape of Sarakiniko"
    },
    {
      src: "/images/islands/milos/gallery/milos-kleftiko.jpg",
      alt: "The impressive rock formations of Kleftiko"
    },
    {
      src: "/images/islands/milos/gallery/milos-plaka.jpg",
      alt: "The picturesque village of Plaka"
    },
    {
      src: "/images/islands/milos/gallery/milos-firiplaka.jpg",
      alt: "The colorful beach of Firiplaka"
    },
    {
      src: "/images/islands/milos/gallery/milos-klima.jpg",
      alt: "Traditional boat houses in Klima"
    },
    {
      src: "/images/islands/milos/gallery/milos-catacombs.jpg",
      alt: "The ancient catacombs of Milos"
    },
    {
      src: "/images/islands/milos/gallery/milos-tsigrado.jpg",
      alt: "The secluded beach of Tsigrado"
    },
    {
      src: "/images/islands/milos/gallery/milos-aerial.jpg",
      alt: "Aerial view of Milos island"
    }
  ];

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
      description: 'Wines and delicacies',
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
    <>
      <SEO {...seoData} />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        <IslandGuideHero {...milos} />
        
        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Milos</h2>
              <p className="text-gray-700 leading-relaxed">
                Milos, the volcanic gem of the Cyclades, is an island of extraordinary geological beauty and rich history. 
                Famous for being the discovery site of the Venus de Milo statue, this horseshoe-shaped island captivates 
                visitors with its surreal landscapes, colorful fishing villages, and over 70 stunning beaches.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the otherworldly white rock formations of Sarakiniko to the multicolored cliffs of Paleochori, 
                and from the traditional syrmata houses of Klima to the ancient catacombs, Milos offers a diverse and 
                unforgettable Greek island experience. Our comprehensive guide will help you discover the best of what 
                this magical volcanic island has to offer.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/milos/landscape.jpg" 
                  alt="Milos Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/islands/milos/sarakiniko-detail.jpg" 
                    alt="Sarakiniko Detail" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((category, index) => (
                <a 
                  key={index}
                  href={category.link} 
                  className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 dark:bg-cyan-600/10 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">When to Visit Milos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaSun className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">High Season</h3>
                <p className="text-gray-600 dark:text-white/60">July to August</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Perfect beach weather</li>
                  <li>• All facilities open</li>
                  <li>• Vibrant atmosphere</li>
                  <li>• Busiest period</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaCameraRetro className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Shoulder Season</h3>
                <p className="text-gray-600 dark:text-white/60">May-June, September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Pleasant weather</li>
                  <li>• Fewer tourists</li>
                  <li>• Better rates</li>
                  <li>• Perfect for photography</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaLeaf className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Spring</h3>
                <p className="text-gray-600 dark:text-white/60">April to May</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Wildflowers blooming</li>
                  <li>• Mild temperatures</li>
                  <li>• Perfect for hiking</li>
                  <li>• Easter celebrations</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaCalendarAlt className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Water Temperature</h3>
                <p className="text-gray-600 dark:text-white/60">Best swimming months</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Charming Villages of Milos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/milos/villages/plaka.jpg" 
                    alt="Plaka Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Plaka</h3>
                  <p className="text-gray-600 mb-4">
                    The picturesque capital of Milos sits on a hill overlooking the Gulf of Milos, offering breathtaking sunset views. 
                    Its narrow, winding streets are lined with traditional Cycladic houses, charming boutiques, and tavernas. 
                    Visit the Folklore Museum, the Church of Panagia Korfiatissa, and the remains of the Venetian Castle at the top of the hill.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sunset Views</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Venetian Castle</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Museums</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/milos/villages/klima.jpg" 
                    alt="Klima Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Klima</h3>
                  <p className="text-gray-600 mb-4">
                    This traditional fishing village is famous for its colorful syrmata - traditional boat houses with brightly painted doors 
                    where fishermen store their boats on the ground floor and live on the upper floor. Built right on the water's edge, 
                    these unique dwellings create one of the most photogenic spots on the island, especially during sunset.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Syrmata Houses</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Fishing Village</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Photography</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/milos/villages/pollonia.jpg" 
                    alt="Pollonia Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Pollonia</h3>
                  <p className="text-gray-600 mb-4">
                    Located on the northeastern tip of Milos, Pollonia is a charming seaside village with a relaxed atmosphere. 
                    It features a sandy beach, excellent seafood restaurants, and a small fishing port. It's also the departure 
                    point for boats to nearby Kimolos island. The village is known for its family-friendly environment and beautiful sunsets.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Seafood Restaurants</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sandy Beach</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/milos/villages/adamas.jpg" 
                    alt="Adamas Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Adamas</h3>
                  <p className="text-gray-600 mb-4">
                    The main port of Milos is a bustling hub with numerous restaurants, cafes, shops, and travel agencies. 
                    The natural harbor, one of the largest in the Mediterranean, played an important role during World War II. 
                    Visit the Mining Museum to learn about the island's rich mining history, or explore the early Christian catacombs nearby.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Main Port</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Mining Museum</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Restaurants & Shops</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Beautiful Beaches of Milos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/milos/beaches/sarakiniko.jpg" 
                    alt="Sarakiniko Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Sarakiniko</h3>
                  <p className="text-gray-600 mb-4">
                    The most iconic beach on Milos features a surreal, moon-like landscape of smooth, white volcanic rock formations 
                    sculpted by wind and waves. The stark white landscape against the deep blue sea creates a dramatic contrast that 
                    makes it a photographer's paradise. Though there's little sand, visitors can swim in the crystal-clear waters or 
                    jump from the rocks into the sea.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Lunar Landscape</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Cliff Jumping</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Photography</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/milos/beaches/kleftiko.jpg" 
                    alt="Kleftiko" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Kleftiko</h3>
                  <p className="text-gray-600 mb-4">
                    Accessible only by boat, Kleftiko features impressive white rock formations, sea caves, and arches rising from 
                    the turquoise waters. Once a hideout for pirates, this stunning location offers excellent snorkeling opportunities 
                    with visibility often exceeding 40 meters. Join a boat tour from Adamas to explore this natural wonder and swim 
                    through the caves and tunnels.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Boat Access Only</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sea Caves</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Snorkeling</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/milos/beaches/firiplaka.jpg" 
                    alt="Firiplaka Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Firiplaka</h3>
                  <p className="text-gray-600 mb-4">
                    One of the most beautiful beaches on Milos, Firiplaka features a long stretch of fine white sand and crystal-clear 
                    turquoise waters. The beach is backed by impressive multicolored volcanic cliffs that provide a stunning backdrop. 
                    Partially organized with sunbeds and umbrellas, it also has a beach bar serving refreshments and light meals.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sandy Beach</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Colorful Cliffs</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Bar</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/milos/beaches/paleochori.jpg" 
                    alt="Paleochori Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Paleochori</h3>
                  <p className="text-gray-600 mb-4">
                    Known for its impressive red and yellow cliffs and thermal springs, Paleochori is a long, sandy beach with 
                    crystal-clear waters. The beach is famous for its volcanic activity - the sand is hot in some spots, and there 
                    are underwater hot springs. Don't miss the opportunity to try food cooked in the volcanic sand at the beachside tavernas.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Volcanic Activity</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Colorful Cliffs</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Restaurants</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Local Cuisine Section */}
          <section id="cuisine" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Local Cuisine of Milos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden h-full">
                  <div className="p-6">
                    <FaGlassCheers className="text-3xl text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-4">Traditional Dishes</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-blue-500 font-bold mr-2">•</span>
                        <div>
                          <span className="font-medium">Pitarakia</span> - Small cheese pies made with local cheese and herbs, a Milos specialty.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 font-bold mr-2">•</span>
                        <div>
                          <span className="font-medium">Karpouzopita</span> - A unique watermelon pie dessert made with watermelon, honey, cinnamon, and flour.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 font-bold mr-2">•</span>
                        <div>
                          <span className="font-medium">Koufeto</span> - A traditional sweet served at weddings, made with honey and almonds.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 font-bold mr-2">•</span>
                        <div>
                          <span className="font-medium">Bonatsas</span> - A local cheese pie with a unique spiral shape.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 font-bold mr-2">•</span>
                        <div>
                          <span className="font-medium">Volcanic Cooking</span> - Food cooked in the hot volcanic sand, especially at Paleochori Beach.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Where to Eat in Milos</h3>
                      <p className="text-gray-600 mb-4">
                        Milos offers a diverse culinary scene, from traditional Greek tavernas to modern restaurants. 
                        Here are some of the best places to enjoy local cuisine:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-blue-500 font-bold mr-2">•</span>
                          <div>
                            <span className="font-medium">O Hamos</span> (Adamas) - A family-run taverna using ingredients from their own farm, with handwritten menus and rustic atmosphere.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 font-bold mr-2">•</span>
                          <div>
                            <span className="font-medium">Medusa</span> (Mandrakia) - Seaside taverna with fresh seafood and views of the traditional syrmata.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 font-bold mr-2">•</span>
                          <div>
                            <span className="font-medium">Sirocco</span> (Paleochori) - Famous for its volcanic cooking, where food is cooked in the hot sand.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 font-bold mr-2">•</span>
                          <div>
                            <span className="font-medium">Ergina</span> (Tripiti) - Traditional taverna with panoramic views and excellent local dishes.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 font-bold mr-2">•</span>
                          <div>
                            <span className="font-medium">Barriello</span> (Pollonia) - Wine bar with excellent local wines and tapas-style dishes.
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="aspect-w-16 aspect-h-9 md:aspect-auto">
                      <img 
                        src="/images/islands/milos/cuisine/milos-cuisine.jpg" 
                        alt="Traditional Milos Cuisine" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6 bg-blue-50 dark:bg-cyan-600/10">
                    <h4 className="font-semibold mb-2">Local Products to Try</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white dark:bg-dark-card p-3 rounded-lg shadow-sm">
                        <span className="font-medium text-blue-800 dark:text-cyclades-turquoise">Milos Cheese</span>
                        <p className="text-sm text-gray-600 mt-1">Local soft cheese with distinctive flavor</p>
                      </div>
                      <div className="bg-white dark:bg-dark-card p-3 rounded-lg shadow-sm">
                        <span className="font-medium text-blue-800 dark:text-cyclades-turquoise">Watermelon</span>
                        <p className="text-sm text-gray-600 mt-1">Famous sweet watermelons of Milos</p>
                      </div>
                      <div className="bg-white dark:bg-dark-card p-3 rounded-lg shadow-sm">
                        <span className="font-medium text-blue-800 dark:text-cyclades-turquoise">Honey</span>
                        <p className="text-sm text-gray-600 mt-1">Local thyme honey with unique aroma</p>
                      </div>
                      <div className="bg-white dark:bg-dark-card p-3 rounded-lg shadow-sm">
                        <span className="font-medium text-blue-800 dark:text-cyclades-turquoise">Koufeto</span>
                        <p className="text-sm text-gray-600 mt-1">Traditional almond sweet</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Things to Do in Milos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaSwimmer className="text-3xl text-blue-500 mr-4" />
                    <h3 className="text-xl font-semibold">Water Activities</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Boat Tour to Kleftiko</span> - A must-do activity in Milos. Full-day or half-day boat tours take you to the impressive sea caves and rock formations of Kleftiko, with stops for swimming and snorkeling in the crystal-clear waters.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Sailing Around the Island</span> - Rent a sailboat or join a sailing tour to explore the coastline of Milos, visiting beaches that are only accessible by sea.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Snorkeling and Diving</span> - The clear waters around Milos offer excellent visibility for underwater exploration. Several diving centers offer courses and guided dives to underwater caves and reefs.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Sea Kayaking</span> - Paddle along the coastline, exploring sea caves and secluded beaches. Guided kayak tours are available from Adamas and other locations.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/milos/activities/boat-tour.jpg" 
                    alt="Boat Tour in Milos" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaHiking className="text-3xl text-blue-500 mr-4" />
                    <h3 className="text-xl font-semibold">Land Activities</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Hiking Trails</span> - Milos has numerous hiking paths that lead to spectacular viewpoints and secluded beaches. The trail from Plaka to Klima and the path to Papafragas Beach are particularly scenic.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Visit the Catacombs</span> - Explore the early Christian catacombs near Tripiti, dating back to the 1st-5th centuries AD. These are among the most important early Christian monuments in Greece.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Mining Museum</span> - Learn about the island's rich mining history at the Mining Museum in Adamas, which showcases the geological wealth of Milos and its exploitation through the centuries.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium">Archaeological Museum</span> - Visit the Archaeological Museum in Plaka to see a replica of the famous Venus de Milo statue (the original is in the Louvre) and other artifacts from the island's long history.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/milos/activities/hiking.jpg" 
                    alt="Hiking in Milos" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="p-6 md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Unique Experiences in Milos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 dark:bg-cyan-600/10 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Sunset at Plaka Castle</h4>
                        <p className="text-sm text-gray-600 dark:text-white/60">
                          Hike up to the Venetian Castle in Plaka for one of the most spectacular sunset views in the Cyclades, 
                          overlooking the entire island and the Aegean Sea.
                        </p>
                      </div>
                      <div className="bg-blue-50 dark:bg-cyan-600/10 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Moonscape Photography</h4>
                        <p className="text-sm text-gray-600 dark:text-white/60">
                          Visit Sarakiniko at sunrise or sunset for otherworldly photography opportunities. The white volcanic 
                          rocks against the blue sea create a lunar landscape unlike anywhere else.
                        </p>
                      </div>
                      <div className="bg-blue-50 dark:bg-cyan-600/10 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Volcanic Cooking</h4>
                        <p className="text-sm text-gray-600 dark:text-white/60">
                          Experience traditional food cooked in the volcanic sand at Paleochori Beach, where restaurants like 
                          Sirocco use the natural heat from the ground to cook dishes.
                        </p>
                      </div>
                      <div className="bg-blue-50 dark:bg-cyan-600/10 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Village Hopping</h4>
                        <p className="text-sm text-gray-600 dark:text-white/60">
                          Rent a car or scooter to explore the many charming villages of Milos, each with its own unique character, 
                          from the colorful syrmata of Klima to the hilltop charm of Tripiti.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-w-16 aspect-h-9 md:aspect-auto">
                    <img 
                      src="/images/islands/milos/activities/sunset-plaka.jpg" 
                      alt="Sunset at Plaka Castle" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Photo Gallery Section */}
          <section id="gallery" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Milos Photo Gallery</h2>
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
                    <p className="text-sm text-gray-600 dark:text-white/60">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600 italic">
                Experience the breathtaking beauty of Milos through our curated photo gallery. From the lunar landscapes of Sarakiniko 
                to the colorful fishing villages and stunning beaches, these images showcase the diverse natural beauty of this volcanic island.
              </p>
            </div>
          </section>
          
          {/* Call to Action Section */}
          <section id="cta" className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md overflow-hidden">
            <div className="container mx-auto px-6 py-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Experience Milos?</h2>
                  <p className="text-lg mb-6">
                    Book your accommodations and plan your journey to this extraordinary volcanic island. 
                    Milos offers a perfect blend of stunning landscapes, beautiful beaches, and authentic Greek hospitality.
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
                    src="/images/islands/milos/cta-image.jpg" 
                    alt="Milos Island View" 
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg">
                    <p className="text-blue-600 font-semibold">Best time to visit: May-October</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <RelatedDestinationsSection groups={[
            siteLinks.popularIslands,
            siteLinks.topActivities,
            siteLinks.travelServices
          ]} />
        </div>
      </div>
    </>
  );
};

export default MilosGuide;


