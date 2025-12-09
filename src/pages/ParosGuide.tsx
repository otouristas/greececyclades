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
import RelatedDestinationsSection from '../components/seo/RelatedDestinationsSection';
import { siteLinks } from '../data/siteLinks';

const ParosGuide: React.FC = () => {
  const paros = islandGuides.find(island => island.id === 'paros');

  if (!paros) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Paros Travel Guide 2026 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Paros vacation with our comprehensive 2026 travel guide. Discover the best hotels, restaurants, beaches, and activities. From charming Naoussa to golden beaches and traditional villages.",
    keywords: [
      'Paros travel guide',
      'Paros beaches',
      'Naoussa Paros',
      'Parikia',
      'Greek islands',
      'Paros villages',
      'Golden Beach',
      'water sports Paros',
      'Paros restaurants',
      'best time to visit Paros'
    ],
    ogImage: paros.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/paros/gallery/paros-naoussa.jpg",
      alt: "The picturesque fishing village of Naoussa"
    },
    {
      src: "/images/islands/paros/gallery/paros-parikia.jpg",
      alt: "The charming capital of Parikia"
    },
    {
      src: "/images/islands/paros/gallery/paros-golden-beach.jpg",
      alt: "Crystal clear waters at Golden Beach"
    },
    {
      src: "/images/islands/paros/gallery/paros-lefkes.jpg",
      alt: "Traditional whitewashed village of Lefkes"
    },
    {
      src: "/images/islands/paros/gallery/paros-kolymbithres.jpg",
      alt: "Unique rock formations at Kolymbithres Beach"
    },
    {
      src: "/images/islands/paros/gallery/paros-food.jpg",
      alt: "Traditional Greek cuisine with local products"
    },
    {
      src: "/images/islands/paros/gallery/paros-butterfly-valley.jpg",
      alt: "The lush Butterfly Valley nature reserve"
    },
    {
      src: "/images/islands/paros/gallery/paros-aerial.jpg",
      alt: "Aerial view of Paros coastline"
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
        <IslandGuideHero {...paros} />
        
        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Paros</h2>
              <p className="text-gray-700 leading-relaxed">
                Paros, sitting at the heart of the Cyclades, is an island that masterfully balances cosmopolitan flair with traditional Greek island life. 
                Famous since antiquity for its fine white marble, used in masterpieces like the Venus de Milo and Napoleon's tomb, the island continues 
                to charm visitors with its elegant architecture and golden beaches.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the vibrant waterfront of Parikia to the picturesque fishing village of Naoussa, and from the mountain village of Lefkes to the 
                world-class beaches like Golden Beach, Paros offers a complete Greek island experience. Our comprehensive guide will help you 
                discover the best of what this magical island has to offer.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/paros/landscape.jpg" 
                  alt="Paros Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/islands/paros/naoussa-detail.jpg" 
                    alt="Naoussa Detail" 
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">When to Visit Paros</h2>
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Charming Villages of Paros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/villages/naoussa.jpg" 
                    alt="Naoussa Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Naoussa</h3>
                  <p className="text-gray-600 mb-4">
                    Once a small fishing village, Naoussa has transformed into one of the most picturesque and cosmopolitan spots in the Cyclades. 
                    Its charming harbor lined with fishing boats, maze-like whitewashed streets, and vibrant nightlife make it a must-visit destination. 
                    Explore the Venetian fortress at the entrance of the harbor, shop at boutique stores, and enjoy fresh seafood at waterfront tavernas.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Venetian Harbor</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Restaurants</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Nightlife</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/villages/parikia.jpg" 
                    alt="Parikia Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Parikia</h3>
                  <p className="text-gray-600 mb-4">
                    The capital and main port of Paros offers a perfect blend of traditional Cycladic architecture and modern amenities. 
                    Visit the impressive 13th-century Venetian castle built with ancient temple materials, the historic Church of Ekatontapiliani (Church of 100 Doors), 
                    and stroll through the charming old town with its narrow streets, white-washed houses, and blue-domed churches.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Venetian Castle</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Ekatontapiliani Church</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Old Town</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/villages/lefkes.jpg" 
                    alt="Lefkes Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Lefkes</h3>
                  <p className="text-gray-600 mb-4">
                    Nestled in the mountains at the highest point of Paros, Lefkes offers breathtaking panoramic views of the island and the Aegean Sea. 
                    This traditional village with its marble-paved streets, neoclassical houses, and the impressive Church of Agia Triada provides a 
                    glimpse into authentic island life away from the coastal tourist centers. The Byzantine Road, an ancient marble path connecting 
                    Lefkes to Prodromos, is perfect for hiking enthusiasts.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Mountain Village</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Byzantine Road</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Panoramic Views</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/villages/marpissa.jpg" 
                    alt="Marpissa Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Marpissa</h3>
                  <p className="text-gray-600 mb-4">
                    One of the oldest villages on Paros, Marpissa is a well-preserved settlement with traditional Cycladic architecture, 
                    windmills, and Byzantine churches. Visit the nearby Monastery of Agios Antonios on the hill of Kefalos for spectacular views, 
                    and explore the village's narrow alleys adorned with bougainvillea. The village hosts cultural events and festivals throughout the summer.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Traditional Architecture</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Windmills</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Byzantine Churches</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Beautiful Beaches of Paros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/beaches/golden-beach.jpg" 
                    alt="Golden Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Golden Beach (Chryssi Akti)</h3>
                  <p className="text-gray-600 mb-4">
                    A paradise for windsurfers and kitesurfers, Golden Beach is a long stretch of golden sand with crystal-clear turquoise waters. 
                    The beach hosts international windsurfing competitions due to its ideal wind conditions. With plenty of beach bars, tavernas, 
                    and water sports centers, it's perfect for both action-seekers and those looking to relax.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Windsurfing</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Water Sports</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Bars</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/beaches/kolymbithres.jpg" 
                    alt="Kolymbithres Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Kolymbithres</h3>
                  <p className="text-gray-600 mb-4">
                    Famous for its unique granite rock formations sculpted by the wind and sea over thousands of years, Kolymbithres consists of small 
                    sandy coves with shallow, crystal-clear waters. The unusual landscape creates natural swimming pools and offers excellent snorkeling 
                    opportunities. Located in Naoussa Bay, it's easily accessible by boat or car.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Rock Formations</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Snorkeling</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/beaches/santa-maria.jpg" 
                    alt="Santa Maria Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Santa Maria</h3>
                  <p className="text-gray-600 mb-4">
                    Located on the northeastern coast of Paros, Santa Maria is a popular beach with fine golden sand and clear blue waters. 
                    It's a hub for water sports enthusiasts, offering windsurfing, water skiing, and diving facilities. The beach is well-organized 
                    with sunbeds, umbrellas, and beachfront bars and restaurants, making it ideal for a full day of beach enjoyment.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Water Sports</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Diving</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Bars</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/beaches/lageri.jpg" 
                    alt="Lageri Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Lageri</h3>
                  <p className="text-gray-600 mb-4">
                    For those seeking a more secluded experience, Lageri is a pristine, unorganized beach north of Naoussa. 
                    This long stretch of fine sand is surrounded by cedar trees providing natural shade. The beach is known for its 
                    stunning sunset views and relaxed atmosphere. It's accessible by foot (a 20-minute walk from Naoussa) or by boat.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Secluded</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Natural Shade</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sunset Views</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/beaches/pounda.jpg" 
                    alt="Pounda Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Pounda</h3>
                  <p className="text-gray-600 mb-4">
                    Located on the western coast of Paros, Pounda Beach is famous for its beach clubs and vibrant atmosphere. 
                    It's a hotspot for kitesurfing due to the strong winds, with several schools offering lessons. The beach is known 
                    for its parties and music events during the summer, attracting a younger crowd looking for fun and entertainment.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Kitesurfing</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Clubs</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Parties</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/beaches/monastiri.jpg" 
                    alt="Monastiri Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Monastiri</h3>
                  <p className="text-gray-600 mb-4">
                    Nestled in a protected cove near Naoussa, Monastiri Beach takes its name from the nearby monastery of Agios Ioannis. 
                    The beach offers calm, shallow waters ideal for families with children. The picturesque setting with the small church 
                    on the rocky peninsula makes it a favorite spot for photographers. There's a beach bar and restaurant serving refreshments and meals.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Scenic Views</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Protected Cove</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Local Cuisine Section */}
          <section id="cuisine" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Local Cuisine of Paros</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-w-1 aspect-h-1">
                    <img 
                      src="/images/islands/paros/cuisine/paros-food.jpg" 
                      alt="Traditional Parian Cuisine" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Paros offers a rich culinary tradition that combines fresh local ingredients with time-honored cooking methods. 
                  The island's cuisine is characterized by simplicity and authenticity, allowing the natural flavors of the ingredients to shine through.
                </p>
                <h3 className="font-semibold text-xl mt-6 mb-4">Local Specialties</h3>
                <ul className="space-y-2">
                  <li><strong>Gouna</strong> - Sun-dried mackerel, a traditional Parian dish with a unique flavor</li>
                  <li><strong>Karavalous</strong> - Snails cooked with tomato sauce and herbs</li>
                  <li><strong>Marathopites</strong> - Fennel pies made with local cheese</li>
                  <li><strong>Kakavia</strong> - Traditional fisherman's soup made with the catch of the day</li>
                  <li><strong>Revithada</strong> - Slow-cooked chickpea stew prepared in clay pots</li>
                </ul>
                
                <h3 className="font-semibold text-xl mt-6 mb-4">Local Products</h3>
                <ul className="space-y-2">
                  <li><strong>Parian Cheese</strong> - Try the local mizithra, xinotyro, and kefalotyri</li>
                  <li><strong>Parian Wine</strong> - Made from local grape varieties like Monemvasia and Mandilaria</li>
                  <li><strong>Soumada</strong> - A traditional almond-based drink</li>
                  <li><strong>Thyme Honey</strong> - Produced from the abundant thyme plants on the island</li>
                  <li><strong>Local Herbs</strong> - Capers, sage, oregano, and other herbs grow wild on the island</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaWineGlass className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Wine Tasting</h3>
                <p className="text-gray-600 mb-4">
                  Visit local wineries to taste Parian wines made from indigenous grape varieties. 
                  The island has a long tradition of winemaking dating back to ancient times.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Moraitis Winery</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Wine Tours</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaUtensils className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Tavernas by the Sea</h3>
                <p className="text-gray-600 mb-4">
                  Experience authentic Greek dining at seaside tavernas where you can enjoy fresh seafood 
                  and local specialties with your feet nearly in the sand.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Fresh Fish</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sea View</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaGlassCheers className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Dining in Naoussa</h3>
                <p className="text-gray-600 mb-4">
                  The picturesque harbor of Naoussa offers some of the island's finest dining experiences, 
                  from traditional tavernas to upscale restaurants with creative Greek cuisine.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Harbor View</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Gourmet Options</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* Photo Gallery Section */}
          <section id="gallery" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Paros Photo Gallery</h2>
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
                Images showcase the natural beauty, architecture, and vibrant culture of Paros Island
              </p>
            </div>
          </section>
          
          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Things to Do in Paros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/activities/water-sports.jpg" 
                    alt="Water Sports in Paros" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaSwimmer className="text-2xl text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold">Water Sports</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Paros is a water sports paradise, especially for windsurfing and kitesurfing. Golden Beach and New Golden Beach 
                    are world-renowned spots that host international competitions. Santa Maria and Pounda beaches also offer excellent 
                    conditions for water sports, with schools providing lessons for all skill levels.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Windsurfing</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Kitesurfing</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">SUP</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/activities/hiking.jpg" 
                    alt="Hiking in Paros" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaHiking className="text-2xl text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold">Hiking</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Explore Paros on foot through its network of well-marked hiking trails. The Byzantine Road, 
                    an ancient marble-paved path connecting Lefkes to Prodromos, offers stunning views and historical 
                    significance. Other popular routes include the trail to Agios Antonios Monastery and the coastal 
                    path from Naoussa to Kolymbithres.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Byzantine Road</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Nature Trails</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Mountain Views</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/activities/boat-tour.jpg" 
                    alt="Boat Tours in Paros" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaShip className="text-2xl text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold">Boat Tours</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Take a boat tour around Paros to discover hidden coves and beaches accessible only by sea. 
                    Day trips to nearby Antiparos, with its famous cave, or to the uninhabited islands of Despotiko 
                    and Panteronisia offer unforgettable experiences. Sailing around the Cyclades is also a popular 
                    option for those looking to explore multiple islands.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Antiparos</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Blue Lagoon</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sailing</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/activities/cultural-tour.jpg" 
                    alt="Cultural Experiences in Paros" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaHistory className="text-2xl text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold">Cultural Experiences</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Immerse yourself in Parian culture by visiting the Archaeological Museum in Parikia, 
                    the Marble Quarries Museum, and the Byzantine Museum. Don't miss the Church of Panagia Ekatontapiliani, 
                    one of the oldest Christian churches in Greece. Traditional festivals (panigiria) throughout the summer 
                    offer authentic cultural experiences with music, dance, and local food.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Museums</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Ancient Sites</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Local Festivals</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/activities/wine-tasting.jpg" 
                    alt="Wine Tasting in Paros" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaCalendarAlt className="text-2xl text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold">Seasonal Events</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Plan your visit around Paros' vibrant calendar of events. The Paros Festival in July features 
                    cultural performances and exhibitions. August brings the Feast of the Assumption with religious 
                    processions and celebrations. The Paros Park Festival hosts outdoor cinema, concerts, and theater 
                    performances throughout the summer in a beautiful natural setting.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Summer Festivals</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Cultural Events</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Religious Celebrations</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/paros/activities/cooking-class.jpg" 
                    alt="Cooking Classes in Paros" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaUtensils className="text-2xl text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold">Cooking Classes</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Learn to prepare traditional Greek and Cycladic dishes in a cooking class. Several local 
                    restaurants and culinary schools offer hands-on experiences where you can discover the 
                    secrets of Greek cuisine, from moussaka to baklava. Many classes include visits to local 
                    markets to select fresh ingredients and wine pairings with your meal.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Greek Cuisine</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Local Ingredients</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Culinary Traditions</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Call to Action Section */}
          <section id="cta" className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md overflow-hidden">
            <div className="container mx-auto px-6 py-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Experience Paros?</h2>
                  <p className="text-lg mb-6">
                    Book your accommodations, tours, and activities for an unforgettable Greek island getaway.
                    Paros offers the perfect blend of natural beauty, rich history, and authentic Greek hospitality.
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
                    src="/images/islands/paros/cta-image.jpg" 
                    alt="Paros Island View" 
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

export default ParosGuide;


