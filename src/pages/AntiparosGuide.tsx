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

const AntiparosGuide: React.FC = () => {
  const antiparos = islandGuides.find(island => island.id === 'antiparos');

  if (!antiparos) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Antiparos Travel Guide 2026 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Antiparos vacation with our comprehensive 2026 travel guide. Discover the best hotels, restaurants, beaches, and activities. From the famous cave to golden beaches and traditional villages.",
    keywords: [
      'Antiparos travel guide',
      'Antiparos beaches',
      'Antiparos cave',
      'Antiparos village',
      'Greek islands',
      'Antiparos activities',
      'water sports Antiparos',
      'Antiparos restaurants',
      'best time to visit Antiparos'
    ],
    ogImage: antiparos.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/antiparos/gallery/antiparos-village.jpg",
      alt: "The charming main village of Antiparos"
    },
    {
      src: "/images/islands/antiparos/gallery/antiparos-cave.jpg",
      alt: "The impressive stalactites in Antiparos Cave"
    },
    {
      src: "/images/islands/antiparos/gallery/antiparos-beach.jpg",
      alt: "Crystal clear waters at Soros Beach"
    },
    {
      src: "/images/islands/antiparos/gallery/antiparos-castle.jpg",
      alt: "The Venetian Castle in Antiparos Chora"
    },
    {
      src: "/images/islands/antiparos/gallery/antiparos-sunset.jpg",
      alt: "Breathtaking sunset views from Antiparos"
    },
    {
      src: "/images/islands/antiparos/gallery/antiparos-food.jpg",
      alt: "Traditional Greek cuisine with local products"
    },
    {
      src: "/images/islands/antiparos/gallery/antiparos-boat.jpg",
      alt: "Boat trip around Antiparos coastline"
    },
    {
      src: "/images/islands/antiparos/gallery/antiparos-aerial.jpg",
      alt: "Aerial view of Antiparos island"
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
        <IslandGuideHero {...antiparos} />
        
        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Antiparos</h2>
              <p className="text-gray-700 leading-relaxed">
                Antiparos, a small gem in the heart of the Cyclades, is a charming island known for its beautiful beaches, 
                impressive cave, and laid-back atmosphere. Just a short ferry ride from its larger neighbor Paros, Antiparos 
                offers an authentic Greek island experience with a perfect blend of natural beauty and traditional charm.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the famous Antiparos Cave with its stunning stalactites and stalagmites to the picturesque main village 
                with its Venetian castle, and from golden sandy beaches to excellent water sports opportunities, Antiparos 
                provides a complete island experience in a more relaxed setting than some of its more famous neighbors. 
                Our comprehensive guide will help you discover the best of what this magical island has to offer.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/antiparos/landscape.jpg" 
                  alt="Antiparos Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/islands/antiparos/village-detail.jpg" 
                    alt="Antiparos Village Detail" 
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">When to Visit Antiparos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaSun className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">High Season</h3>
                <p className="text-gray-600 dark:text-white/60">July to August</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Perfect beach weather</li>
                  <li>• All facilities open</li>
                  <li>• Vibrant atmosphere</li>
                  <li>• Busier but still relaxed</li>
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
                  <li>• Comfortable sightseeing</li>
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Villages of Antiparos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/antiparos/chora.jpg" 
                    alt="Antiparos Chora" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">Chora (Main Village)</h3>
                  <p className="text-gray-600 mb-4">
                    The charming main settlement of Antiparos features a 15th-century Venetian castle at its center, 
                    surrounded by traditional Cycladic houses with blue doors and windows. The pedestrian street is 
                    lined with shops, tavernas, and cafes, creating a lively atmosphere especially in the evenings.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Venetian Castle</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Shopping</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Dining</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/antiparos/agios-georgios.jpg" 
                    alt="Agios Georgios" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">Agios Georgios</h3>
                  <p className="text-gray-600 mb-4">
                    A small fishing village on the southern tip of the island, Agios Georgios offers a peaceful 
                    retreat with a beautiful beach, a few tavernas serving fresh seafood, and stunning sunset views. 
                    It's also the departure point for boat trips to the nearby uninhabited island of Despotiko.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Fishing Village</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Boat Trips</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Seafood</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Beaches in Antiparos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/antiparos/soros-beach.jpg" 
                    alt="Soros Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">Soros Beach</h3>
                  <p className="text-gray-600 mb-4">
                    One of the most popular beaches on the island, featuring golden sand, 
                    crystal clear waters, and beach bars offering sunbeds and refreshments.
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <FaSwimmer className="mr-1" /> Good for swimming
                    </span>
                    <span>Organized</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/antiparos/psaraliki-beach.jpg" 
                    alt="Psaraliki Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">Psaraliki Beach</h3>
                  <p className="text-gray-600 mb-4">
                    Located close to the main town, this sandy beach is family-friendly 
                    with shallow waters and convenient facilities. Perfect for those staying in Chora.
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <FaSwimmer className="mr-1" /> Family-friendly
                    </span>
                    <span>Organized</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/antiparos/livadia-beach.jpg" 
                    alt="Livadia Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">Livadia Beach</h3>
                  <p className="text-gray-600 mb-4">
                    A long sandy beach on the eastern coast with beautiful turquoise waters. 
                    Less crowded than other beaches, offering a more peaceful experience.
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <FaSwimmer className="mr-1" /> Tranquil setting
                    </span>
                    <span>Semi-organized</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Things to Do in Antiparos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/antiparos/cave.jpg" 
                    alt="Antiparos Cave" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">Explore Antiparos Cave</h3>
                  <p className="text-gray-600 mb-4">
                    One of the oldest and most spectacular caves in Europe, featuring impressive 
                    stalactites and stalagmites. Descend 411 steps to explore this natural wonder 
                    that has been visited by notable figures throughout history.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaHiking className="mr-2" />
                    <span>Moderate difficulty, wear comfortable shoes</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/antiparos/boat-trip.jpg" 
                    alt="Boat Trip to Despotiko" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">Boat Trip to Despotiko</h3>
                  <p className="text-gray-600 mb-4">
                    Take a boat trip to the uninhabited island of Despotiko, home to an important 
                    archaeological site with ancient temple ruins dedicated to Apollo. The island 
                    also features pristine beaches with crystal clear waters.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaHiking className="mr-2" />
                    <span>Half-day excursion, bring water and sun protection</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/antiparos/watersports.jpg" 
                    alt="Water Sports" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">Water Sports</h3>
                  <p className="text-gray-600 mb-4">
                    Enjoy various water sports activities available on the beaches of Antiparos, 
                    including windsurfing, kitesurfing, paddleboarding, and kayaking. Equipment 
                    rental and lessons are available for all skill levels.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaSwimmer className="mr-2" />
                    <span>Available at Psaraliki and Soros beaches</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/antiparos/hiking.jpg" 
                    alt="Hiking Trails" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">Hiking Trails</h3>
                  <p className="text-gray-600 mb-4">
                    Explore the island's natural beauty through its network of hiking trails. 
                    Walk from Chora to the cave, hike to Profitis Ilias hill for panoramic views, 
                    or follow coastal paths to discover hidden coves and beaches.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaHiking className="mr-2" />
                    <span>Best in spring and autumn, bring water and sun protection</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cuisine Section */}
          <section id="cuisine" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Local Cuisine & Dining</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Antiparos offers a delightful culinary experience with fresh seafood, traditional Greek dishes, 
                  and local specialties. The island's tavernas and restaurants serve authentic cuisine using locally 
                  sourced ingredients, while the laid-back beach bars provide refreshing drinks with sea views.
                </p>
                <h3 className="font-semibold text-xl mt-6 mb-3">Must-Try Local Dishes</h3>
                <ul className="space-y-2">
                  <li>Fresh fish and seafood caught daily by local fishermen</li>
                  <li>Revithada (traditional chickpea soup slow-cooked in clay pots)</li>
                  <li>Local cheese, including kopanisti (spicy soft cheese) and xinomizithra</li>
                  <li>Karavoli (snails cooked with rosemary)</li>
                  <li>Marathotiganites (fennel fritters)</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/images/islands/antiparos/food-1.jpg" 
                    alt="Fresh Seafood" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/images/islands/antiparos/food-2.jpg" 
                    alt="Greek Salad" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/images/islands/antiparos/food-3.jpg" 
                    alt="Local Cheese" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/images/islands/antiparos/food-4.jpg" 
                    alt="Traditional Desserts" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl mb-4">Where to Eat & Drink</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
                  <h4 className="font-medium text-lg mb-2 flex items-center">
                    <FaGlassCheers className="text-blue-500 mr-2" /> Beachfront Tavernas
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Enjoy fresh seafood and Greek specialties with your feet in the sand at tavernas 
                    along Psaraliki and Soros beaches.
                  </p>
                </div>
                <div className="border-b md:border-b-0 md:border-r border-gray-200 py-4 md:py-0 md:px-4">
                  <h4 className="font-medium text-lg mb-2 flex items-center">
                    <FaGlassCheers className="text-blue-500 mr-2" /> Chora Restaurants
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Explore the main street of Chora for traditional tavernas, international cuisine, 
                    and cozy cafes with charming courtyard settings.
                  </p>
                </div>
                <div className="pt-4 md:pt-0 md:pl-4">
                  <h4 className="font-medium text-lg mb-2 flex items-center">
                    <FaGlassCheers className="text-blue-500 mr-2" /> Sunset Bars
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Watch the sunset with a cocktail or local wine at bars offering panoramic views 
                    of the Aegean Sea and neighboring islands.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Photo Gallery */}
          <section id="gallery" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Antiparos Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="rounded-xl overflow-hidden shadow-xl mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 lg:p-12">
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-cyan-600/100 bg-opacity-30 text-white text-sm font-medium mb-4">
                    Best time to visit: May-June, September
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Experience Antiparos?</h2>
                  <p className="text-lg mb-8 text-blue-100">
                    Plan your perfect getaway to this charming Cycladic gem with crystal clear waters, 
                    golden beaches, and authentic Greek atmosphere.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="/hotels/" 
                      className="inline-block px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 dark:bg-cyan-600/10 transition-colors"
                    >
                      Find Accommodations
                    </a>
                    <a 
                      href="/ferry-tickets/" 
                      className="inline-block px-6 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                    >
                      How to get there
                    </a>
                  </div>
                </div>
                <div className="hidden lg:block relative">
                  <img 
                    src="/images/islands/antiparos/cta-image.jpg" 
                    alt="Antiparos Beach Scene" 
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

export default AntiparosGuide;


