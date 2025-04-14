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
  FaHistory,
  FaHotel,
  FaRoute,
  FaWater
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';

const NaxosGuide: React.FC = () => {
  const naxos = islandGuides.find(island => island.id === 'naxos');

  if (!naxos) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Naxos Travel Guide 2025 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Naxos vacation with our comprehensive 2025 travel guide. Discover the best hotels, restaurants, beaches, and activities. From the iconic Portara to the mountain villages and golden beaches.",
    keywords: [
      'Naxos travel guide',
      'Naxos beaches',
      'Mount Zeus',
      'Chora Naxos',
      'Greek islands',
      'Naxos villages',
      'ancient ruins',
      'hiking Naxos',
      'Naxos food',
      'best time to visit Naxos'
    ],
    ogImage: naxos.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/naxos/gallery/naxos-portara.jpg",
      alt: "The iconic Portara (Apollo's Temple) at sunset"
    },
    {
      src: "/images/islands/naxos/gallery/naxos-chora.jpg",
      alt: "The charming streets of Naxos Chora"
    },
    {
      src: "/images/islands/naxos/gallery/naxos-beach.jpg",
      alt: "Crystal clear waters at Plaka Beach"
    },
    {
      src: "/images/islands/naxos/gallery/naxos-village.jpg",
      alt: "Traditional whitewashed village in Naxos"
    },
    {
      src: "/images/islands/naxos/gallery/naxos-mountain.jpg",
      alt: "Mountain landscape with view of the Aegean Sea"
    },
    {
      src: "/images/islands/naxos/gallery/naxos-food.jpg",
      alt: "Traditional Naxian cuisine with local products"
    },
    {
      src: "/images/islands/naxos/gallery/naxos-windmill.jpg",
      alt: "Historic windmill with sea view"
    },
    {
      src: "/images/islands/naxos/gallery/naxos-aerial.jpg",
      alt: "Aerial view of Naxos coastline"
    }
  ];

  return (
    <>
      <SEO {...seoData} />
      <div className="min-h-screen bg-gray-50">
        <IslandGuideHero {...naxos} />
        
        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Welcome to Naxos</h2>
              <p className="text-gray-700 leading-relaxed">
                Naxos, the largest and most fertile island of the Cyclades, offers a perfect blend of ancient history, 
                traditional mountain villages, and stunning beaches. With its rich mythology as the childhood home of Zeus 
                and the place where Theseus abandoned Ariadne, Naxos captivates visitors with its diverse landscapes and authentic charm.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the iconic Portara (Apollo's Gate) greeting visitors at the harbor to the lush valleys, marble villages, 
                and golden beaches, Naxos provides a complete Greek island experience. Our comprehensive guide will help you 
                discover the best of what this magical island has to offer.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/naxos/landscape.jpg" 
                  alt="Naxos Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/islands/naxos/portara-detail.jpg" 
                    alt="Portara Detail" 
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
              <a 
                href="#villages" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="text-2xl mb-2">
                  <FaMapMarkedAlt className="text-blue-500" />
                </div>
                <span className="font-medium text-sm">Villages</span>
              </a>
              <a 
                href="#beaches" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="text-2xl mb-2">
                  <FaUmbrellaBeach className="text-blue-500" />
                </div>
                <span className="font-medium text-sm">Beaches</span>
              </a>
              <a 
                href="#dining" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="text-2xl mb-2">
                  <FaUtensils className="text-blue-500" />
                </div>
                <span className="font-medium text-sm">Local Cuisine</span>
              </a>
              <a 
                href="#activities" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="text-2xl mb-2">
                  <FaRoute className="text-blue-500" />
                </div>
                <span className="font-medium text-sm">Activities</span>
              </a>
              <a 
                href="#gallery" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="text-2xl mb-2">
                  <FaCameraRetro className="text-blue-500" />
                </div>
                <span className="font-medium text-sm">Photo Gallery</span>
              </a>
              <a 
                href="#when-to-visit" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="text-2xl mb-2">
                  <FaCalendarAlt className="text-blue-500" />
                </div>
                <span className="font-medium text-sm">When to Visit</span>
              </a>
            </div>
          </div>

          {/* History & Geology Section */}
          <section id="history" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">History & Culture</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <FaHistory className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-2xl font-semibold">Ancient Heritage</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Naxos has been inhabited since at least 4000 BC, with evidence of Early Cycladic settlements. 
                  According to mythology, Zeus was raised in a cave on Mount Zas, and the island was where Theseus 
                  abandoned Ariadne after she helped him defeat the Minotaur.
                </p>
                <p className="text-gray-600 mb-4">
                  The island's most iconic landmark, the Portara (Apollo's Gate), is the entrance to an unfinished 
                  temple of Apollo from 530 BC. This massive marble doorway stands as a testament to the island's 
                  ancient significance and greets visitors as they enter the harbor.
                </p>
                <p className="text-gray-600">
                  Throughout its history, Naxos has been influenced by various civilizations including the Minoans, 
                  Mycenaeans, Venetians, and Ottomans. The Venetian period (1207-1566) left a particularly strong mark, 
                  evident in the Kastro area of Naxos Town and the defensive towers scattered across the island.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <FaLeaf className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-2xl font-semibold">Cultural Landscape</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Unlike many other Cycladic islands, Naxos is remarkably fertile, with abundant water sources, 
                  valleys, and mountains. This natural abundance has shaped the island's culture, with agriculture 
                  playing a central role in local life for millennia.
                </p>
                <p className="text-gray-600 mb-4">
                  The island is famous for its marble quarries, which have been in use since antiquity. The fine 
                  Naxian marble was used for sculptures and buildings throughout the ancient Greek world. Unfinished 
                  kouros statues can still be seen lying in ancient quarries at Apollonas and Melanes.
                </p>
                <p className="text-gray-600">
                  Naxos maintains strong cultural traditions, with local festivals (panigiria) celebrating patron 
                  saints in villages throughout the summer. These events feature traditional music, dance, and 
                  feasting, offering visitors an authentic glimpse into Cycladic culture.
                </p>
              </div>
            </div>
          </section>

          {/* When to Visit Section */}
          <section id="when-to-visit" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">When to Visit Naxos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaSun className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Peak Season</h3>
                <p className="text-gray-600">June to September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Perfect weather (25-30°C)</li>
                  <li>• All attractions open</li>
                  <li>• Bustling atmosphere</li>
                  <li>• Higher prices</li>
                  <li>• Busy beaches</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaCalendarAlt className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Shoulder Season</h3>
                <p className="text-gray-600">April-May, October</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Mild weather (18-25°C)</li>
                  <li>• Fewer crowds</li>
                  <li>• Better prices</li>
                  <li>• Most attractions open</li>
                  <li>• Ideal for hiking</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaCameraRetro className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Best for Photos</h3>
                <p className="text-gray-600">May, September-October</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Clear skies</li>
                  <li>• Perfect lighting</li>
                  <li>• Spring flowers (May)</li>
                  <li>• Less crowded sites</li>
                  <li>• Golden hour magic</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaRoute className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Best for Activities</h3>
                <p className="text-gray-600">May-June, September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• Ideal hiking weather</li>
                  <li>• Perfect for windsurfing</li>
                  <li>• Village festivals</li>
                  <li>• Swimming without crowds</li>
                  <li>• Harvest season (September)</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Seasonal Highlights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-800">Spring (April-May)</h5>
                  <p className="text-gray-700 text-sm">
                    The island blooms with wildflowers, and the landscape turns lush green. Easter celebrations 
                    offer a glimpse into local traditions with processions and special ceremonies.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800">Summer (June-August)</h5>
                  <p className="text-gray-700 text-sm">
                    Village festivals (panigiria) take place throughout the island. The Naxos Festival brings 
                    cultural performances to the Bazeos Tower and other venues.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800">Autumn (September-October)</h5>
                  <p className="text-gray-700 text-sm">
                    Harvest season brings special events and the chance to participate in traditional agricultural activities. 
                    The sea remains warm enough for swimming while the crowds diminish.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800">Winter (November-March)</h5>
                  <p className="text-gray-700 text-sm">
                    A quiet, authentic experience with mostly locals. The island turns green, and while some 
                    businesses close, you'll experience the true character of Naxos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Villages Section */}
          <section id="villages" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Must-Visit Villages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/naxos/chora.jpg" 
                    alt="Naxos Chora" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Chora (Naxos Town)</h3>
                  <p className="text-gray-600 mb-4">
                    The capital of Naxos welcomes visitors with its iconic Portara gateway. Explore the medieval Kastro district 
                    with its Venetian mansions, winding alleys, and the Archaeological Museum. The waterfront promenade offers 
                    numerous restaurants and shops with views of the harbor.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Portara</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Kastro</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Museums</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/naxos/apiranthos.jpg" 
                    alt="Apiranthos Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Apiranthos</h3>
                  <p className="text-gray-600 mb-4">
                    Known as the "marble village," Apiranthos is perched on the slopes of Mount Fanari. Its marble-paved streets, 
                    Venetian architecture, and distinct culture make it one of the most picturesque villages on the island. 
                    Visit its four small museums and enjoy panoramic mountain views.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Marble Streets</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Mountain Views</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Museums</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/naxos/halki.jpg" 
                    alt="Halki Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Halki (Chalki)</h3>
                  <p className="text-gray-600 mb-4">
                    Once the commercial center of Naxos, Halki is now a charming village in the Tragaia region. Visit the Vallindras 
                    Distillery to learn about kitron liqueur production, explore neoclassical buildings, and discover Byzantine churches 
                    with remarkable frescoes in the surrounding area.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Kitron Distillery</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Byzantine Churches</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Art Galleries</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/naxos/filoti.jpg" 
                    alt="Filoti Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Filoti</h3>
                  <p className="text-gray-600 mb-4">
                    The largest village in the mountainous region of Naxos sits at the foot of Mount Zas (Zeus). With its whitewashed 
                    houses cascading down the hillside, Filoti offers authentic tavernas and serves as the starting point for hiking 
                    to the highest peak in the Cyclades and the Cave of Zeus.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Mount Zas</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Hiking</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Traditional Tavernas</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Village Hopping Tips</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Rent a car to explore multiple villages in one day - most are within 30-45 minutes of each other</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Visit during morning hours to see local life in action and avoid afternoon closures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Look for village festivals (panigiria) during summer months for authentic cultural experiences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Bring water and wear comfortable shoes - many villages have steep, narrow streets</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Stunning Beaches</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/naxos/plaka-beach.jpg" 
                    alt="Plaka Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Plaka Beach</h3>
                  <p className="text-gray-600 mb-4">
                    A stunning 4km stretch of golden sand with crystal clear turquoise waters. 
                    The beach offers both organized sections with sunbeds and tavernas, as well as 
                    quieter, more secluded areas.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Golden Sand</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Bars</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sunset Views</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">Perfect for:</span>
                    <span>Families, Couples, Swimming</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/naxos/agios-prokopios.jpg" 
                    alt="Agios Prokopios Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Agios Prokopios</h3>
                  <p className="text-gray-600 mb-4">
                    Consistently rated among the best beaches in Greece, this blue flag beach 
                    features fine golden sand and shallow turquoise waters. Well-organized with 
                    plenty of amenities and water sports.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Blue Flag</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Water Sports</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Restaurants</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">Perfect for:</span>
                    <span>Families, Activities, Accessibility</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/naxos/agia-anna.jpg" 
                    alt="Agia Anna Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Agia Anna</h3>
                  <p className="text-gray-600 mb-4">
                    A continuation of Agios Prokopios, this beach offers a more laid-back atmosphere 
                    with a charming fishing port at one end. Lined with tavernas and accommodations, 
                    it's perfect for those who want convenience.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Fishing Port</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tavernas</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Relaxed Vibe</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">Perfect for:</span>
                    <span>Dining, Relaxation, Easy Access</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/naxos/mikri-vigla.jpg" 
                    alt="Mikri Vigla Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Mikri Vigla</h3>
                  <p className="text-gray-600 mb-4">
                    A windsurfer's paradise with two distinct beaches on either side of a peninsula. 
                    The north-facing beach catches the meltemi winds perfect for windsurfing, while the 
                    southern side remains calmer for swimming.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Windsurfing</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Kitesurfing</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Water Sports</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">Perfect for:</span>
                    <span>Water Sports, Adventure, Views</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/naxos/aliko.jpg" 
                    alt="Aliko Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Aliko Cedar Forest</h3>
                  <p className="text-gray-600 mb-4">
                    A unique protected area with multiple small coves and beaches surrounded by cedar trees. 
                    This natural reserve offers pristine waters and a more secluded experience away from crowds.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Cedar Forest</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Natural Reserve</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Secluded</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">Perfect for:</span>
                    <span>Nature Lovers, Privacy, Snorkeling</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/naxos/apollonas.jpg" 
                    alt="Apollonas Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Apollonas</h3>
                  <p className="text-gray-600 mb-4">
                    A picturesque beach in the northern village of the same name. Besides swimming, 
                    visitors can explore the nearby unfinished ancient kouros statue and enjoy fresh 
                    seafood at local tavernas.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Ancient Kouros</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Fishing Village</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Seafood</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">Perfect for:</span>
                    <span>History Buffs, Authentic Experience</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Beach Tips</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>The west coast beaches are more organized and accessible from Naxos Town</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Meltemi winds are strongest in July and August - check wind forecasts for water sports</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Beach buses run regularly from Naxos Town to the main west coast beaches</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>For more secluded beaches, head to the eastern and southern coasts (vehicle required)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Local Cuisine Section */}
          <section id="dining" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Local Cuisine & Wine</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <FaUtensils className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-2xl font-semibold">Naxian Specialties</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Naxos is known as the "green island" of the Cyclades due to its agricultural richness. 
                  The island's fertile soil produces exceptional ingredients that form the basis of its 
                  distinctive cuisine.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-lg mb-1">Famous Naxian Potatoes</h4>
                    <p className="text-gray-600 text-sm">
                      The island's potatoes are renowned throughout Greece for their exceptional taste and 
                      quality. Look for dishes featuring these local potatoes, from simple fried potatoes to 
                      more complex preparations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Naxian Cheeses</h4>
                    <p className="text-gray-600 text-sm">
                      Naxos produces several distinctive cheeses, including arseniko (a hard cheese similar to 
                      gruyère), xinomizithra (a soft, sour cheese), and the famous graviera Naxou (a PDO-protected 
                      sweet, buttery cheese with nutty flavors).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Kitron Liqueur</h4>
                    <p className="text-gray-600 text-sm">
                      This unique citrus liqueur is made from the leaves and fruit of the citron tree. Available 
                      in three varieties (green, yellow, and clear) with varying sweetness levels. Visit the Vallindras 
                      Distillery in Halki to learn about its production.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <FaWineGlass className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-2xl font-semibold">Must-Try Dishes</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Kalogeros</span> - A layered eggplant dish with potato, meat, and cheese
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Rooster with Sumac Sauce</span> - A traditional Sunday dish
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Sefoukloti Pie</span> - Savory pie with wild greens and herbs
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Melachrino</span> - A sweet walnut cake soaked in citrus syrup
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Rotisma</span> - Grilled local meats, especially lamb or goat
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Naxian Salad</span> - With local potatoes, eggs, and xinomizithra cheese
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/naxos/naxian-cheese.jpg" 
                    alt="Naxian Cheese" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Cheese Tasting</h3>
                  <p className="text-gray-600 mb-4">
                    Visit local dairies to sample the island's famous cheeses. Many offer tours where you can 
                    learn about traditional production methods and taste various aged varieties.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Graviera</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Arseniko</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Xinomizithra</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/naxos/kitron.jpg" 
                    alt="Kitron Liqueur" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Kitron Distillery</h3>
                  <p className="text-gray-600 mb-4">
                    The Vallindras Distillery in Halki has been producing the island's signature citrus 
                    liqueur since 1896. Take a tour to learn about the production process and sample the 
                    different varieties.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tastings</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Historic</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Souvenirs</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/naxos/taverna.jpg" 
                    alt="Traditional Taverna" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Mountain Tavernas</h3>
                  <p className="text-gray-600 mb-4">
                    For the most authentic dining experiences, head to the mountain villages where family-run 
                    tavernas serve traditional dishes made with locally-sourced ingredients and time-honored recipes.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Authentic</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Local Recipes</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Run</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Dining Tips</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Look for the "local products" sign in restaurants for authentic Naxian cuisine</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Dinner is typically served late (after 8pm) in traditional tavernas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Visit the farmers' market in Naxos Town (check days) for fresh local products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Many restaurants offer "farm-to-table" experiences using ingredients from their own farms</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section id="gallery" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`overflow-hidden rounded-lg shadow-md ${
                    index === 0 || index === 7 ? 'col-span-2 row-span-2' : ''
                  }`}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Top Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaWater className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Water Sports</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Naxos is a premier destination for windsurfing and kitesurfing, especially at Mikri Vigla 
                  and Plaka beaches. Equipment rental and lessons are available for all skill levels.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Windsurfing</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Kitesurfing</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">SUP</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaHiking className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Hiking Trails</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Explore ancient paths connecting mountain villages, with stunning views of the Aegean Sea. 
                  The hike to Mount Zeus (Zas), the highest peak in the Cyclades at 1,004m, is particularly rewarding.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Mount Zeus</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Village Paths</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Nature</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaSwimmer className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Swimming & Snorkeling</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  With crystal clear waters and diverse marine life, Naxos offers excellent swimming and 
                  snorkeling opportunities. The secluded coves around Aliko and the southern beaches are ideal spots.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Clear Waters</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Marine Life</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Hidden Coves</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaHotel className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Cultural Experiences</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Visit traditional marble workshops in Apiranthos, attend local festivals (panigiria), or explore 
                  the Archaeological Museum in Naxos Town to learn about the island's rich 5,000-year history.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Workshops</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Festivals</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Museums</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaGlassCheers className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Food & Wine Tours</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Join guided tours of local farms, cheese producers, and the Kitron distillery. Several wineries 
                  also offer tastings of wines made from indigenous grape varieties grown on the island.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tastings</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Local Products</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Culinary</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaShip className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Island Hopping</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Naxos is perfectly positioned for day trips to nearby islands. Visit the sacred island of Delos, 
                  the pristine beaches of Koufonisia, or the traditional charm of Iraklia and Schinoussa.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Day Trips</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Small Cyclades</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Boat Tours</span>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section id="cta" className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Experience Naxos?</h2>
                <p className="text-lg mb-6">
                  Book your accommodations, tours, and activities for an unforgettable Greek island getaway.
                  Discover the authentic charm, stunning landscapes, and rich traditions of this 
                  magnificent Cycladic island.
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
                  src="/images/islands/naxos/naxos-cta.jpg" 
                  alt="Naxos Island View" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg">
                  <p className="text-blue-600 font-semibold">Best time to visit: May-October</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default NaxosGuide;
