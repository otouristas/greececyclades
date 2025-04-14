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

const SerifosGuide: React.FC = () => {
  const serifos = islandGuides.find(island => island.id === 'serifos');

  if (!serifos) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Serifos Travel Guide 2025 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Serifos vacation with our comprehensive 2025 travel guide. Discover the best hotels, restaurants, beaches, and activities. From rugged landscapes to pristine beaches and traditional villages.",
    keywords: [
      'Serifos travel guide',
      'Serifos beaches',
      'Chora Serifos',
      'Livadi',
      'Greek islands',
      'Serifos villages',
      'Psili Ammos',
      'mining history Serifos',
      'Serifos restaurants',
      'best time to visit Serifos'
    ],
    ogImage: serifos.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/serifos/gallery/serifos-chora.jpg",
      alt: "The hilltop Chora of Serifos"
    },
    {
      src: "/images/islands/serifos/gallery/serifos-livadi.jpg",
      alt: "The port town of Livadi"
    },
    {
      src: "/images/islands/serifos/gallery/serifos-psili-ammos.jpg",
      alt: "The golden sands of Psili Ammos beach"
    },
    {
      src: "/images/islands/serifos/gallery/serifos-ganema.jpg",
      alt: "Ganema beach with crystal clear waters"
    },
    {
      src: "/images/islands/serifos/gallery/serifos-mines.jpg",
      alt: "Historic mining facilities of Serifos"
    },
    {
      src: "/images/islands/serifos/gallery/serifos-megalo-livadi.jpg",
      alt: "The historic bay of Megalo Livadi"
    },
    {
      src: "/images/islands/serifos/gallery/serifos-sunset.jpg",
      alt: "Spectacular sunset view from Chora"
    },
    {
      src: "/images/islands/serifos/gallery/serifos-aerial.jpg",
      alt: "Aerial view of Serifos coastline"
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
      description: 'Traditional delicacies',
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
        <IslandGuideHero {...serifos} />
        
        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Welcome to Serifos</h2>
              <p className="text-gray-700 leading-relaxed">
                Serifos, with its rugged landscapes and authentic Cycladic charm, offers a peaceful escape from the more 
                crowded Greek islands. Known for its rich mining history, stunning beaches, and the impressive hilltop 
                Chora, Serifos provides a perfect blend of relaxation, adventure, and cultural experiences.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the bustling port of Livadi to the tranquil beaches of Psili Ammos and Ganema, from hiking trails 
                with breathtaking views to traditional tavernas serving local delicacies, Serifos has something for every 
                traveler. Our comprehensive guide will help you discover the best of what this authentic Cycladic gem has to offer.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/serifos/landscape.jpg" 
                  alt="Serifos Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/islands/serifos/chora-detail.jpg" 
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

          {/* When to Visit Section */}
          <section id="when-to-visit" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">When to Visit Serifos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaSun className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">High Season</h3>
                <p className="text-gray-600">July to August</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Perfect beach weather</li>
                  <li>• All facilities open</li>
                  <li>• Vibrant atmosphere</li>
                  <li>• Busier but still relaxed</li>
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
                  <li>• Ideal for hiking</li>
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
            <h2 className="text-3xl font-bold mb-8">Charming Villages of Serifos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/serifos/villages/chora.jpg" 
                    alt="Chora Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Chora</h3>
                  <p className="text-gray-600 mb-4">
                    The capital of Serifos, Chora is an impressive hilltop village that cascades down the slopes of a rocky hill, 
                    offering breathtaking views of the Aegean Sea. With its whitewashed houses, blue-domed churches, and narrow 
                    winding alleys, Chora embodies the quintessential Cycladic aesthetic. Visit the Venetian castle at the top, 
                    explore the Archaeological Museum, and enjoy the sunset from one of the panoramic cafes.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Hilltop Views</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Venetian Castle</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Traditional Architecture</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/serifos/villages/livadi.jpg" 
                    alt="Livadi Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Livadi</h3>
                  <p className="text-gray-600 mb-4">
                    The main port and commercial center of Serifos, Livadi is a picturesque seaside settlement with a long sandy beach. 
                    This is where most of the island's accommodations, restaurants, cafes, and shops are located. The waterfront promenade 
                    is perfect for evening strolls, while the beach offers various water sports activities. Livadi is also the starting point 
                    for boat excursions around the island.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Main Port</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sandy Beach</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Waterfront Dining</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/serifos/villages/megalo-livadi.jpg" 
                    alt="Megalo Livadi Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Megalo Livadi</h3>
                  <p className="text-gray-600 mb-4">
                    Once the industrial center of Serifos, Megalo Livadi is a historic settlement that tells the story of the island's mining past. 
                    The abandoned mining facilities, the neoclassical building of the mining company, and the workers' memorial create a unique 
                    atmosphere. The village is set in a beautiful bay with a small beach and a few tavernas serving fresh seafood. It's a must-visit 
                    for those interested in industrial heritage.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Mining History</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Historic Buildings</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Scenic Bay</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/serifos/villages/panagia.jpg" 
                    alt="Panagia Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Panagia</h3>
                  <p className="text-gray-600 mb-4">
                    A small, traditional village located on the road between Livadi and Chora, Panagia offers a glimpse into authentic island life. 
                    Named after the church of Panagia (Virgin Mary) that dominates the village, it features traditional Cycladic architecture with 
                    whitewashed houses and narrow streets. The village square with its old plane tree is a perfect spot to enjoy a coffee or local 
                    delicacies at one of the few tavernas.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Traditional Village</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Local Church</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Authentic Atmosphere</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Beautiful Beaches of Serifos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/serifos/beaches/psili-ammos.jpg" 
                    alt="Psili Ammos Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Psili Ammos</h3>
                  <p className="text-gray-600 mb-4">
                    Considered one of the most beautiful beaches on Serifos, Psili Ammos (meaning "fine sand") lives up to its name 
                    with soft golden sand and crystal-clear turquoise waters. Protected from strong winds, this beach offers ideal 
                    swimming conditions and is perfect for families with children. There are a few tavernas nearby where you can 
                    enjoy fresh seafood and local specialties while taking in the beautiful sea views.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Golden Sand</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Shallow Waters</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/serifos/beaches/livadakia.jpg" 
                    alt="Livadakia Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Livadakia</h3>
                  <p className="text-gray-600 mb-4">
                    Located near the port of Livadi, Livadakia is a popular and easily accessible beach with fine sand and shallow waters. 
                    Well-organized with sunbeds, umbrellas, and beach bars, it's perfect for those who want convenience without sacrificing 
                    beauty. The beach is lined with tamarisk trees providing natural shade, and there are several tavernas and cafes nearby 
                    for refreshments and meals.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Organized</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Easy Access</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Bars</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/serifos/beaches/ganema.jpg" 
                    alt="Ganema Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Ganema</h3>
                  <p className="text-gray-600 mb-4">
                    Ganema is a beautiful beach with coarse sand and pebbles, known for its crystal-clear deep blue waters. 
                    The beach is partially organized with some sunbeds and umbrellas, and there's a charming taverna serving delicious 
                    local cuisine. What makes Ganema special is the impressive backdrop of rocky hills and the remains of old 
                    mining facilities, adding a touch of industrial heritage to the natural beauty.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Scenic Views</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Crystal Waters</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Mining History</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/serifos/beaches/agios-sostis.jpg" 
                    alt="Agios Sostis Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Agios Sostis</h3>
                  <p className="text-gray-600 mb-4">
                    Agios Sostis is a secluded beach with fine sand and shallow turquoise waters, ideal for those seeking tranquility. 
                    Named after the small white chapel that stands on the rocky peninsula at the edge of the beach, it offers a 
                    picturesque setting that's perfect for photography. The beach is not organized, so bring your own supplies, 
                    and there are no facilities nearby, adding to its unspoiled charm.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Secluded</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">White Chapel</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Natural Beauty</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/serifos/beaches/vagia.jpg" 
                    alt="Vagia Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Vagia</h3>
                  <p className="text-gray-600 mb-4">
                    Vagia is a long, sandy beach with crystal-clear waters, located on the eastern side of the island. 
                    Relatively quiet even during high season, it's perfect for those who want to escape the crowds. 
                    The beach is partially organized with some sunbeds and umbrellas, and there's a taverna nearby for 
                    refreshments. The surrounding landscape of rocky hills creates a dramatic setting.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sandy Beach</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Quiet</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Dramatic Landscape</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/serifos/beaches/kalo-ampeli.jpg" 
                    alt="Kalo Ampeli Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Kalo Ampeli</h3>
                  <p className="text-gray-600 mb-4">
                    Kalo Ampeli is a small, secluded beach with a mix of sand and pebbles, surrounded by impressive rock formations. 
                    Accessible by a dirt road or by boat, this hidden gem offers privacy and natural beauty. The waters are deep and 
                    crystal-clear, perfect for snorkeling enthusiasts. There are no facilities on the beach, so come prepared with 
                    everything you need for a day of complete relaxation.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Hidden Gem</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Rock Formations</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Snorkeling</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Local Cuisine Section */}
          <section id="cuisine" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Local Cuisine & Gastronomy</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <p className="mb-4">
                    Serifos offers a delightful culinary experience that combines traditional Cycladic flavors with local specialties. 
                    Fresh seafood, locally-sourced ingredients, and time-honored recipes create a gastronomic journey that's an essential 
                    part of experiencing the island's culture.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-4">Traditional Dishes</h3>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                      <strong>Marathon Pie (Marathopita)</strong> - A traditional herb pie made with fennel, local cheese, and olive oil, 
                      baked to perfection.
                    </li>
                    <li>
                      <strong>Revithada</strong> - Chickpeas slow-cooked in clay pots with olive oil, onions, and herbs, a Sunday tradition 
                      in many Cycladic homes.
                    </li>
                    <li>
                      <strong>Gouna</strong> - Sun-dried mackerel that's lightly salted and grilled, a specialty of the Cyclades islands.
                    </li>
                    <li>
                      <strong>Mizithra Cheese</strong> - A fresh, soft cheese made from sheep or goat milk, often served with honey and nuts.
                    </li>
                    <li>
                      <strong>Chtapodi Krasato</strong> - Octopus cooked in red wine sauce with herbs and spices, a delicious seafood specialty.
                    </li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-4">Local Products</h3>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                      <strong>Thyme Honey</strong> - The island's rocky terrain is perfect for beekeeping, producing aromatic thyme honey.
                    </li>
                    <li>
                      <strong>Capers</strong> - Wild capers grow abundantly on Serifos and are used in many local dishes.
                    </li>
                    <li>
                      <strong>Local Wines</strong> - Though not as famous as other Cycladic islands for wine, Serifos has a small but 
                      growing wine production.
                    </li>
                    <li>
                      <strong>Olive Oil</strong> - High-quality olive oil is produced from the island's olive groves and is a staple in local cuisine.
                    </li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-4">Where to Eat</h3>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                      <strong>Chora</strong> - Visit traditional tavernas with panoramic views, serving authentic local dishes.
                    </li>
                    <li>
                      <strong>Livadi</strong> - The port area offers a variety of dining options, from seafood tavernas to modern restaurants.
                    </li>
                    <li>
                      <strong>Megalo Livadi</strong> - Enjoy fresh seafood at the waterfront tavernas with views of the historic bay.
                    </li>
                    <li>
                      <strong>Beach Tavernas</strong> - Many beaches like Psili Ammos and Ganema have excellent tavernas serving fresh, local cuisine.
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <FaGlassCheers className="text-3xl text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Must-Try Experiences</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <p>Try a traditional Greek coffee at a kafeneio in Chora while enjoying panoramic views</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <p>Sample fresh fish at a waterfront taverna in Livadi as the sun sets</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <p>Taste local thyme honey drizzled over fresh mizithra cheese</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <p>Enjoy a glass of ouzo with meze (small dishes) at a traditional taverna</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <p>Experience a local panigiri (festival) with traditional food, music, and dancing</p>
                    </li>
                  </ul>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Best Restaurants</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium">Kyklopas</h4>
                        <p className="text-sm text-gray-600">Traditional taverna in Chora with stunning views</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium">Aloni</h4>
                        <p className="text-sm text-gray-600">Farm-to-table cuisine using local ingredients</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium">Takis</h4>
                        <p className="text-sm text-gray-600">Seafood specialist in Livadi port</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium">Stamatis</h4>
                        <p className="text-sm text-gray-600">Family-run taverna at Psili Ammos beach</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Things to Do in Serifos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaSwimmer className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Water Activities</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <p className="font-medium">Beach Hopping</p>
                      <p className="text-sm text-gray-600">Explore the diverse beaches of Serifos, from organized sandy shores to secluded coves accessible only by boat or hiking trails.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <p className="font-medium">Snorkeling & Diving</p>
                      <p className="text-sm text-gray-600">Discover the underwater world around Serifos, with crystal-clear waters, interesting rock formations, and diverse marine life.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <p className="font-medium">Boat Tours</p>
                      <p className="text-sm text-gray-600">Take a boat tour around the island to visit inaccessible beaches, sea caves, and enjoy swimming in secluded bays.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <p className="font-medium">Fishing</p>
                      <p className="text-sm text-gray-600">Join local fishermen for a traditional fishing experience or rent equipment for your own fishing adventure.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaHiking className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Land Activities</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <p className="font-medium">Hiking Trails</p>
                      <p className="text-sm text-gray-600">Explore the extensive network of hiking paths that cross the island, offering stunning views and access to remote beaches and historical sites.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <p className="font-medium">Mining History Tour</p>
                      <p className="text-sm text-gray-600">Visit the abandoned mining facilities and learn about Serifos' rich industrial heritage and the miners' strike of 1916.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <p className="font-medium">Village Exploration</p>
                      <p className="text-sm text-gray-600">Wander through the narrow streets of Chora and other traditional villages, discovering local architecture, churches, and hidden squares.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <p className="font-medium">Archaeological Sites</p>
                      <p className="text-sm text-gray-600">Visit the Archaeological Museum in Chora and explore ancient ruins scattered around the island, including the White Tower and Cyclops' Throne.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Unique Experiences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Sunset at Chora Castle</h4>
                  <p className="text-sm text-gray-600">Watch the sun set from the highest point of Chora, offering panoramic views of the Aegean Sea.</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Local Festivals</h4>
                  <p className="text-sm text-gray-600">Experience traditional panigiri festivals with music, dancing, and local food, usually held during summer months.</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Cyclops' Throne</h4>
                  <p className="text-sm text-gray-600">Hike to this mythical rock formation that, according to legend, was the throne of the Cyclops from Greek mythology.</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Stargazing</h4>
                  <p className="text-sm text-gray-600">With minimal light pollution, Serifos is perfect for observing the night sky, especially from remote beaches or hilltops.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Photo Gallery Section */}
          <section id="gallery" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Serifos Photo Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg shadow-md aspect-w-4 aspect-h-3">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-sm">{image.alt}</p>
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
                  <h2 className="text-3xl font-bold mb-4">Ready to Experience Serifos?</h2>
                  <p className="text-lg mb-6">
                    Book your accommodations, tours, and activities for an unforgettable Greek island getaway.
                    Serifos offers the perfect blend of authentic Cycladic charm, beautiful beaches, and rich history.
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
                    src="/images/islands/serifos/cta-image.jpg" 
                    alt="Serifos Island View" 
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

export default SerifosGuide;
