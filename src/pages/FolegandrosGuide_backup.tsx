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
  FaGlassCheers
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';

const FolegandrosGuide: React.FC = () => {
  const folegandros = islandGuides.find(island => island.id === 'folegandros');

  if (!folegandros) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Folegandros Travel Guide 2026 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Folegandros vacation with our comprehensive 2026 travel guide. Discover the best hotels, restaurants, beaches, and activities. From the dramatic clifftop Chora to pristine beaches and authentic Greek culture.",
    keywords: [
      'Folegandros travel guide',
      'Folegandros beaches',
      'Chora Folegandros',
      'Greek islands',
      'Folegandros villages',
      'Katergo beach',
      'Cyclades islands',
      'Folegandros hiking',
      'Folegandros restaurants',
      'best time to visit Folegandros'
    ],
    ogImage: folegandros.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/folegandros/gallery/folegandros-chora.jpg",
      alt: "The stunning clifftop Chora of Folegandros with traditional Cycladic architecture"
    },
    {
      src: "/images/islands/folegandros/gallery/folegandros-katergo.jpg",
      alt: "The pristine Katergo beach with crystal clear waters"
    },
    {
      src: "/images/islands/folegandros/gallery/folegandros-panagia.jpg",
      alt: "The iconic Church of Panagia on the hilltop"
    },
    {
      src: "/images/islands/folegandros/gallery/folegandros-kastro.jpg",
      alt: "The medieval Kastro district with its Venetian architecture"
    },
    {
      src: "/images/islands/folegandros/gallery/folegandros-agali.jpg",
      alt: "The beautiful Agali beach surrounded by cliffs"
    },
    {
      src: "/images/islands/folegandros/gallery/folegandros-hiking.jpg",
      alt: "Scenic hiking trails with panoramic views of the Aegean"
    },
    {
      src: "/images/islands/folegandros/gallery/folegandros-livadaki.jpg",
      alt: "The secluded Livadaki beach accessible by boat or hiking"
    },
    {
      src: "/images/islands/folegandros/gallery/folegandros-sunset.jpg",
      alt: "Breathtaking sunset view from Chora"
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
        <IslandGuideHero {...folegandros} />
        
        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Welcome to Folegandros</h2>
              <p className="text-gray-700 leading-relaxed">
                Folegandros, a small but dramatic island between Milos and Santorini, captures the essence of 
                Cycladic beauty with its stunning cliff-top Chora and unspoiled landscapes. This hidden gem 
                offers an authentic Greek island experience away from the crowds.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the breathtaking medieval Chora perched on a 200-meter cliff to the pristine beaches 
                accessible only by boat or hiking trails, Folegandros presents a perfect balance of natural 
                beauty, traditional architecture, and authentic local culture. Whether you're seeking tranquility, 
                adventure, or cultural immersion, our comprehensive guide will help you discover the best of what 
                this captivating island has to offer.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/folegandros/landscape.jpg" 
                  alt="Folegandros Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/islands/folegandros/chora-detail.jpg" 
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
        </div>
      </div>

      {/* When to Visit Section */}
      <section id="when-to-visit" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">When to Visit Folegandros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaSun className="text-3xl text-blue-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2">High Season</h3>
            <p className="text-gray-600">July to August</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>• Perfect beach weather</li>
              <li>• All facilities open</li>
              <li>• Lively atmosphere in Chora</li>
              <li>• Advance bookings recommended</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaCameraRetro className="text-3xl text-blue-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Shoulder Season</h3>
            <p className="text-gray-600">May-June, September</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>• Pleasant temperatures</li>
              <li>• Fewer tourists</li>
              <li>• Better accommodation rates</li>
              <li>• Ideal for hiking</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaLeaf className="text-3xl text-blue-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Spring</h3>
            <p className="text-gray-600">April to May</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>• Wildflowers in bloom</li>
              <li>• Lush green landscapes</li>
              <li>• Mild hiking conditions</li>
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
        <h2 className="text-3xl font-bold mb-8">Charming Villages of Folegandros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src="/images/islands/folegandros/villages/chora.jpg" 
                alt="Chora Village" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Chora</h3>
              <p className="text-gray-600 mb-4">
                The capital of Folegandros is one of the oldest and most picturesque traditional villages in the Cyclades. 
                Perched dramatically on a cliff 200 meters above the sea, Chora is a maze of narrow streets, whitewashed houses 
                with colorful doors and windows, and beautiful squares lined with tavernas. The medieval Kastro district, 
                built by the Venetians in the 13th century, offers a glimpse into the island's rich history.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Medieval Kastro</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Panoramic Views</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Traditional Tavernas</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src="/images/islands/folegandros/villages/ano-meria.jpg" 
                alt="Ano Meria Village" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Ano Meria</h3>
              <p className="text-gray-600 mb-4">
                Located in the northwestern part of the island, Ano Meria is a traditional agricultural settlement 
                that offers a glimpse into authentic rural life on Folegandros. Unlike the compact layout of Chora, 
                Ano Meria is spread out along the main road with traditional farmhouses called "themonia" - self-sufficient 
                farm complexes unique to Folegandros. The village is home to the Ecological and Folklore Museum, 
                showcasing agricultural tools, traditional costumes, and household items that illustrate the island's 
                rural heritage. Ano Meria is also known for its excellent tavernas serving authentic local cuisine 
                made with fresh, locally-grown ingredients.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Rural Settlement</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Folklore Museum</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Traditional Farmhouses</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src="/images/islands/folegandros/villages/karavostasis.jpg" 
                alt="Karavostasis Village" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Karavostasis</h3>
              <p className="text-gray-600 mb-4">
                Karavostasis is the main port and gateway to Folegandros. This small coastal settlement has 
                developed around the harbor and offers a selection of accommodations, restaurants, and shops. 
                The village features a few small, sandy beaches within walking distance, making it a convenient 
                base for travelers who prefer to stay near the sea. Karavostasis has a more relaxed atmosphere 
                compared to Chora, with beautiful sunset views and seaside tavernas serving fresh seafood. The 
                port area is well-connected to other parts of the island by the local bus service or rental vehicles, 
                making it easy to explore Folegandros while staying here.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Main Port</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Nearby Beaches</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Transportation Hub</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src="/images/islands/folegandros/villages/agali.jpg" 
                alt="Agali Settlement" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Agali</h3>
              <p className="text-gray-600 mb-4">
                Agali is a small coastal settlement built around one of the most accessible beaches on Folegandros. 
                This tranquil spot is nestled in a protected cove surrounded by steep cliffs, creating a dramatic 
                setting. The settlement consists of a few rooms to rent, tavernas, and beach bars that operate during 
                the summer season. Agali serves as a starting point for paths leading to more secluded beaches like 
                Galifos and Agios Nikolaos. The area has a laid-back atmosphere and is popular with visitors seeking 
                a quiet beach holiday. Agali is accessible by bus from Chora or by boat from Karavostasis during the 
                summer months.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Settlement</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Scenic Cove</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Access to Hiking Trails</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beaches Section */}
      <section id="beaches" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Beautiful Beaches of Folegandros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src="/images/islands/folegandros/beaches/katergo.jpg" 
                alt="Katergo Beach" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Katergo Beach</h3>
              <p className="text-gray-600 mb-4">
                Katergo is widely considered the most beautiful beach on Folegandros. This remote, pristine beach 
                features crystal-clear turquoise waters and a stunning landscape of dramatic cliffs. The beach is 
                composed of fine pebbles and is completely unorganized, preserving its natural beauty. Katergo is 
                accessible by a 20-minute hike from Livadi or by boat from Karavostasis during the summer season. 
                The lack of facilities means you should bring everything you need for your visit, including water, 
                food, and sun protection. The effort to reach this secluded paradise is well rewarded with one of 
                the most spectacular swimming spots in the Cyclades.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Pristine Waters</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Secluded</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Boat Access</span>
              </div>
            </div>
          </div>
            
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src="/images/islands/folegandros/beaches/agali.jpg" 
                alt="Agali Beach" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Agali Beach</h3>
              <p className="text-gray-600 mb-4">
                Agali is one of the most accessible beaches on Folegandros, located in a sheltered cove on the 
                island's south coast. This sandy and pebbly beach features clear, calm waters ideal for swimming. 
                Agali has some basic facilities, including tavernas and rooms to rent in the small settlement 
                behind the beach. It's accessible by bus from Chora during the summer season or by boat from 
                Karavostasis. From Agali, visitors can follow coastal paths to reach more secluded beaches like 
                Galifos and Agios Nikolaos. The beach is surrounded by impressive cliffs, creating a dramatic 
                setting for sunbathing and swimming.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Bus Access</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tavernas</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
              </div>
            </div>
          </div>
            
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src="/images/islands/folegandros/beaches/livadaki.jpg" 
                alt="Livadaki Beach" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Livadaki Beach</h3>
              <p className="text-gray-600 mb-4">
                Livadaki is a small, secluded beach with crystal-clear waters, accessible only by boat or a 
                challenging hike. This hidden gem features a mix of sand and pebbles and is surrounded by steep 
                cliffs that provide some natural shade during parts of the day. The beach has no facilities, so 
                visitors should bring their own supplies. The effort to reach Livadaki is rewarded with pristine 
                waters perfect for snorkeling and a peaceful atmosphere away from crowds. The beach is particularly 
                beautiful in the morning when the water is calmest and the colors most vibrant.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Secluded</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Hiking Required</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Snorkeling</span>
              </div>
            </div>
          </div>
            
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src="/images/islands/folegandros/beaches/vardia.jpg" 
                alt="Vardia Beach" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Vardia Beach</h3>
              <p className="text-gray-600 mb-4">
                Vardia is a small, pebbly beach located near Karavostasis port. This easily accessible beach 
                offers clear waters and a relaxed atmosphere. While not as spectacular as some of Folegandros' 
                more remote beaches, Vardia provides a convenient option for swimming near the port area. The 
                beach has no organized facilities but is within walking distance of amenities in Karavostasis. 
                Vardia is a good choice for visitors staying near the port or those looking for a quick swim 
                without venturing far. The beach is partially protected from winds, making it a reliable option 
                even on breezy days.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Easy Access</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Near Port</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Pebbly</span>
              </div>
            </div>
          </div>
            
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src="/images/islands/folegandros/beaches/agios-nikolaos.jpg" 
                alt="Agios Nikolaos Beach" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Agios Nikolaos Beach</h3>
              <p className="text-gray-600 mb-4">
                Agios Nikolaos is a small, picturesque beach accessible by a 15-minute hike from Agali. Named 
                after the small white chapel perched above it, this beach features a mix of sand and pebbles 
                and crystal-clear waters ideal for swimming and snorkeling. The beach is partially organized 
                with a few sunbeds and a small canteen operating during high season. The surrounding cliffs 
                provide some natural shade in the afternoon. Agios Nikolaos offers a good balance between 
                accessibility and seclusion, making it popular with visitors looking to escape the more 
                crowded beaches without a difficult journey.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Short Hike</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Basic Facilities</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Scenic Chapel</span>
              </div>
            </div>
          </div>
            
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src="/images/islands/folegandros/beaches/hochlidia.jpg" 
                alt="Hochlidia Beach" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Hochlidia Beach</h3>
              <p className="text-gray-600 mb-4">
                Hochlidia is a remote, unspoiled beach on the northeastern coast of Folegandros. This hidden 
                gem features a pebbly shore and emerald waters, surrounded by impressive rock formations. 
                Accessible only by boat or a challenging hike, Hochlidia remains one of the island's most 
                pristine beaches. There are no facilities here, so visitors must bring everything they need. 
                The beach offers excellent snorkeling opportunities with rich marine life and underwater 
                visibility. Hochlidia is ideal for adventurous travelers seeking to discover the wild beauty 
                of Folegandros away from tourist crowds.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Remote</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Pristine Waters</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Rock Formations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Top Activities in Folegandros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src="/images/islands/folegandros/activities/hiking.jpg" 
                alt="Hiking in Folegandros" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Hiking Adventures</h3>
              <p className="text-gray-600">
                Folegandros offers some of the most scenic hiking trails in the Cyclades. The island's network of well-marked paths connects villages, beaches, and viewpoints, allowing visitors to discover hidden corners of this beautiful island. The most popular route is the path from Chora to the Church of Panagia, offering panoramic views of the Aegean Sea. For more adventurous hikers, the trails to remote beaches like Katergo and Livadaki provide both a physical challenge and access to pristine swimming spots. The island's dramatic landscape of cliffs, terraced fields, and coastal paths creates diverse hiking experiences suitable for different fitness levels.
              </p>
              <div className="mt-4">
                <span className="text-blue-600 font-medium">Recommended trails:</span>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• Chora to Panagia Church (1 hour round trip)</li>
                  <li>• Ano Meria to Agios Georgios Beach (2-3 hours)</li>
                  <li>• Livadi to Katergo Beach (40 minutes one way)</li>
                  <li>• The Upper Path from Chora to Angali (2 hours)</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src="/images/islands/folegandros/activities/snorkeling.jpg" 
                alt="Snorkeling in Folegandros" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Snorkeling & Diving</h3>
              <p className="text-gray-600">
                The crystal-clear waters around Folegandros offer excellent snorkeling and diving opportunities. 
                The island's remote beaches and coves are home to a rich marine life, including colorful fish, 
                sea turtles, and even dolphins. The best snorkeling spots include Livadaki, Agios Nikolaos, and 
                the secluded beach of Katergo. For scuba diving, the island's rugged coastline offers numerous 
                dive sites suitable for different skill levels, from beginner-friendly shallow dives to more 
                challenging underwater explorations.
              </p>
              <div className="mt-4">
                <span className="text-blue-600 font-medium">Recommended snorkeling spots:</span>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• Livadaki Beach</li>
                  <li>• Agios Nikolaos Beach</li>
                  <li>• Katergo Beach</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Cuisine Section */}
      <section id="cuisine" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Local Cuisine & Dining</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Traditional Dishes</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-1">Matsata</h4>
                <p className="text-gray-600">
                  Handmade pasta served with rabbit or rooster in rich tomato sauce. This traditional dish is a 
                  staple of Folegandros cuisine and showcases the island's pastoral traditions.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-1">Souroto</h4>
                <p className="text-gray-600">
                  A white, creamy cheese made from goat's milk that has been left to sour. Similar to mizithra 
                  but with a distinctive tangy flavor unique to Folegandros.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-1">Kalasouna</h4>
                <p className="text-gray-600">
                  A savory pie filled with wild greens, fennel, and local cheese. This traditional pastry 
                  reflects the island's use of locally foraged ingredients.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-1">Karavoli</h4>
                <p className="text-gray-600">
                  Snails cooked with rosemary and vinegar. This delicacy is prepared during festive occasions 
                  and represents the resourcefulness of traditional island cuisine.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Local Products</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-1">Thyme Honey</h4>
                <p className="text-gray-600">
                  The island's rocky landscape is covered in wild thyme, producing honey with a distinctive 
                  aroma and flavor.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-1">Capers</h4>
                <p className="text-gray-600">
                  Wild capers grow abundantly on Folegandros and are pickled for use in salads and traditional 
                  dishes.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-1">Souroto Cheese</h4>
                <p className="text-gray-600">
                  This unique local cheese is a must-try product that represents the island's dairy tradition.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaGlassCheers className="text-blue-500 mr-2" />
            Where to Eat in Folegandros
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Chora</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <span className="font-medium">Pounta</span> - Traditional taverna with panoramic views</li>
                <li>• <span className="font-medium">Chic</span> - Modern Greek cuisine with creative twists</li>
                <li>• <span className="font-medium">Eva's Garden</span> - Charming garden setting with homemade specialties</li>
                <li>• <span className="font-medium">Piatsa</span> - Classic Greek dishes in a lively square</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Ano Meria</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <span className="font-medium">Irini's</span> - Authentic local cuisine with farm-to-table ingredients</li>
                <li>• <span className="font-medium">Mimis</span> - Family-run taverna famous for matsata</li>
                <li>• <span className="font-medium">Synantisi</span> - Traditional setting with homestyle cooking</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Karavostasis & Beaches</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <span className="font-medium">Karavostasis Restaurant</span> - Fresh seafood by the port</li>
                <li>• <span className="font-medium">Agali Beach Bar</span> - Casual dining with beach views</li>
                <li>• <span className="font-medium">Papalagi</span> - Relaxed atmosphere with Mediterranean dishes</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Dining Tips</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Reservations are recommended for popular restaurants in Chora during high season</li>
            <li>• Many tavernas in Ano Meria serve food grown in their own gardens</li>
            <li>• Look for "matsata day" specials when this traditional pasta is freshly made</li>
            <li>• Local festivals (panigiria) offer opportunities to taste traditional food and experience local culture</li>
            <li>• Restaurants in Chora often have terraces with spectacular sunset views</li>
          </ul>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Folegandros Photo Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-4 aspect-h-3">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-12 text-white">
          <div>
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Folegandros?</h2>
            <p className="text-lg mb-6">
              Book your accommodations and plan your journey to this enchanting Cycladic gem.
              Folegandros offers the perfect blend of natural beauty, tranquility, and authentic Greek hospitality.
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
              src="/images/islands/folegandros/cta-image.jpg" 
              alt="Folegandros Island View" 
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg">
              <p className="text-blue-600 font-semibold">Best time to visit: May-October</p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default FolegandrosGuide;
