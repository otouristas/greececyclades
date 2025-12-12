import React from 'react';
import { useTranslation } from 'react-i18next';
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

const FolegandrosGuide: React.FC = () => {
  const { t } = useTranslation();
  const folegandros = islandGuides.find(island => island.id === 'folegandros');

  if (!folegandros) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Folegandros Travel Guide 2026 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Folegandros vacation with our comprehensive 2026 travel guide. Discover the best hotels, restaurants, beaches, and activities. From dramatic cliffs to pristine beaches and traditional villages.",
    keywords: [
      'Folegandros travel guide',
      'Folegandros beaches',
      'Chora Folegandros',
      'Greek islands',
      'Folegandros villages',
      'Katergo beach',
      'Cycladic islands',
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
      alt: "The picturesque Chora of Folegandros perched on a cliff"
    },
    {
      src: "/images/islands/folegandros/gallery/folegandros-katergo.jpg",
      alt: "The pristine Katergo beach with crystal-clear waters"
    },
    {
      src: "/images/islands/folegandros/gallery/folegandros-panagia.jpg",
      alt: "The iconic Church of Panagia with panoramic views"
    },
    {
      src: "/images/islands/folegandros/gallery/folegandros-kastro.jpg",
      alt: "The medieval Kastro district with traditional architecture"
    },
    {
      src: "/images/islands/folegandros/gallery/folegandros-livadaki.jpg",
      alt: "The secluded Livadaki beach surrounded by cliffs"
    },
    {
      src: "/images/islands/folegandros/gallery/folegandros-sunset.jpg",
      alt: "Spectacular sunset view from Chora"
    },
    {
      src: "/images/islands/folegandros/gallery/folegandros-agali.jpg",
      alt: "The beautiful Agali beach with its turquoise waters"
    },
    {
      src: "/images/islands/folegandros/gallery/folegandros-hiking.jpg",
      alt: "Scenic hiking trail with views of the Aegean Sea"
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
      description: 'Traditional delicacies',
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
        <IslandGuideHero {...folegandros} />

        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Folegandros</h2>
              <p className="text-gray-700 leading-relaxed">
                Folegandros, a small but dramatic island between Milos and Santorini, captures the essence of
                Cycladic beauty with its stunning cliff-top Chora and unspoiled landscapes. This hidden gem
                offers a perfect blend of authentic Greek island life, breathtaking natural scenery, and
                tranquil beaches.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the medieval Kastro district with its Venetian heritage to the zigzagging path leading
                to the iconic church of Panagia, Folegandros reveals its rich history and culture at every turn.
                Whether you're seeking adventure along ancient hiking paths, relaxation on secluded beaches, or
                authentic local cuisine, our comprehensive guide will help you discover the best of what this
                captivating island has to offer.
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">When to Visit Folegandros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaSun className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">High Season</h3>
                <p className="text-gray-600 dark:text-white/60">July to August</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Perfect beach weather</li>
                  <li>• All facilities open</li>
                  <li>• Lively atmosphere</li>
                  <li>• More ferry connections</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaCameraRetro className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Shoulder Season</h3>
                <p className="text-gray-600 dark:text-white/60">May-June, September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Pleasant weather</li>
                  <li>• Fewer crowds</li>
                  <li>• Better rates</li>
                  <li>• Ideal for hiking</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaLeaf className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Spring</h3>
                <p className="text-gray-600 dark:text-white/60">April to May</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Wildflowers blooming</li>
                  <li>• Mild temperatures</li>
                  <li>• Green landscapes</li>
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Charming Villages of Folegandros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
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
                    Perched dramatically on the edge of a 200-meter cliff, Chora is one of the most beautiful and
                    well-preserved traditional settlements in the Cyclades. The village is unique for its three
                    connected squares (plateias) - Piazza, Dounavides, and Pounta - each with its own distinct character.
                    The medieval Kastro district, still inhabited, preserves the island's Venetian heritage with its
                    defensive architecture and ancient walls. Wander through the narrow, winding alleys lined with
                    whitewashed houses adorned with colorful bougainvillea, and enjoy panoramic views of the Aegean Sea.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Cliff-top Location</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Medieval Kastro</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Three Squares</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
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
                    Located in the northern part of the island, Ano Meria is a traditional agricultural settlement
                    that offers a glimpse into authentic rural life on Folegandros. The village is characterized by
                    scattered farmhouses called "themonia," traditional complexes that include the main house, storage
                    areas, and animal pens. The Ecological and Folklore Museum showcases traditional farming tools,
                    household items, and exhibits on local customs. Ano Meria is also known for its excellent tavernas
                    serving authentic local cuisine made with ingredients from nearby farms.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Rural Settlement</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Folklore Museum</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Traditional Farms</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
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
                    Karavostasis is the main port and gateway to Folegandros. This small coastal settlement offers a
                    relaxed atmosphere with a few tavernas, cafes, and accommodations along its waterfront. The village
                    features a small beach with crystal-clear waters, perfect for a quick swim upon arrival. Karavostasis
                    serves as a transportation hub, with buses connecting to Chora and other parts of the island. The
                    area is also the starting point for boat trips to beaches that are not accessible by road, such as
                    the famous Katergo beach.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Main Port</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Waterfront Dining</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Transportation Hub</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/folegandros/villages/agali.jpg"
                    alt="Agali Village"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Agali</h3>
                  <p className="text-gray-600 mb-4">
                    Agali is a small seaside settlement built around one of the most accessible beaches on the island.
                    This peaceful village offers a handful of tavernas, rooms to rent, and a relaxed atmosphere away
                    from the more touristy areas. Agali serves as a starting point for paths leading to other beautiful
                    beaches, including Fira and Galifos. The area is particularly popular among those seeking a quiet
                    retreat while still having access to basic amenities. The beach at Agali features fine sand and
                    crystal-clear waters, protected from strong winds by the surrounding landscape.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Settlement</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Relaxed Atmosphere</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Access to Hiking Trails</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Beautiful Beaches of Folegandros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
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
                    Katergo is widely considered the most beautiful beach on Folegandros. This remote beach is accessible
                    only by boat from Karavostasis or via a challenging 20-minute hike down a steep path. The effort is
                    well worth it, as visitors are rewarded with crystal-clear turquoise waters, fine pebbles, and dramatic
                    cliffs. The beach is completely unspoiled with no facilities, so bring everything you need for the day.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Boat Access</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">No Facilities</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Secluded</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
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
                    Agali is one of the most accessible beaches on Folegandros, with regular bus service from Chora during
                    the summer months. This sandy beach offers crystal-clear waters and is sheltered from strong winds.
                    Several tavernas and accommodations are available nearby, making it a convenient option for families.
                    From Agali, you can also access the nearby beaches of Fira and Galifos via short hiking paths.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Bus Access</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tavernas</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
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
                    Livadaki is a small, secluded beach accessible via a 20-minute hike from Ano Meria. The trail offers
                    stunning views of the Aegean Sea before descending to this hidden gem. The beach features crystal-clear
                    waters and smooth pebbles, surrounded by impressive rock formations. There are no facilities, so come
                    prepared with water, food, and sun protection for a day of peaceful relaxation.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Hiking Required</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">No Facilities</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Secluded</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/folegandros/beaches/karavostasis.jpg"
                    alt="Karavostasis Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Karavostasis Beach</h3>
                  <p className="text-gray-600 mb-4">
                    Located right at the port, Karavostasis Beach offers convenience and accessibility. This sandy beach
                    with shallow waters is perfect for families with children. The beach is well-organized with sunbeds,
                    umbrellas, and several tavernas and cafes nearby. It's an ideal spot for a quick swim upon arrival or
                    departure from the island, or for those who prefer to stay close to amenities.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Port Location</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Facilities</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
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
                    Vardia is a small, pebbly beach located near Karavostasis. It's less crowded than the main port beach
                    and offers a more relaxed atmosphere. The beach features clear waters and natural shade from the
                    surrounding cliffs in the afternoon. While there are no organized facilities, its proximity to
                    Karavostasis means you can easily access tavernas and shops within a short walking distance.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Easy Access</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Natural Shade</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Less Crowded</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/folegandros/beaches/fira.jpg"
                    alt="Fira Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Fira Beach</h3>
                  <p className="text-gray-600 mb-4">
                    Fira Beach is accessible via a short hiking path from Agali. This small, pebbly beach is known for its
                    crystal-clear turquoise waters and impressive rock formations. The beach is partially organized with a
                    few sunbeds and umbrellas, and there's a small taverna serving refreshments and light meals during the
                    summer season. Fira is popular with nudists, particularly at its northern end.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Hiking Access</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Basic Facilities</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Nudist-Friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Local Cuisine Section */}
          <section id="cuisine" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Local Cuisine & Dining</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaGlassCheers className="text-3xl text-blue-500 mr-4" />
                    <h3 className="text-xl font-semibold">Traditional Dishes</h3>
                  </div>
                  <ul className="space-y-4">
                    <li>
                      <span className="font-medium block">Matsata</span>
                      <p className="text-gray-600 dark:text-white/60">Handmade pasta served with rabbit, goat, or rooster in red sauce, a specialty of Folegandros.</p>
                    </li>
                    <li>
                      <span className="font-medium block">Souroto</span>
                      <p className="text-gray-600 dark:text-white/60">A soft, white cheese with a slightly sour taste, similar to cottage cheese but with more character.</p>
                    </li>
                    <li>
                      <span className="font-medium block">Kalasouna</span>
                      <p className="text-gray-600 dark:text-white/60">A savory cheese pie with wild greens, unique to Folegandros.</p>
                    </li>
                    <li>
                      <span className="font-medium block">Karavoli</span>
                      <p className="text-gray-600 dark:text-white/60">Snails cooked with garlic, rosemary, and vinegar, a traditional delicacy.</p>
                    </li>
                    <li>
                      <span className="font-medium block">Melopita</span>
                      <p className="text-gray-600 dark:text-white/60">A traditional honey pie made with local thyme honey and soft cheese.</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaUtensils className="text-3xl text-blue-500 mr-4" />
                    <h3 className="text-xl font-semibold">Where to Eat</h3>
                  </div>
                  <ul className="space-y-4">
                    <li>
                      <span className="font-medium block">Chora</span>
                      <p className="text-gray-600 dark:text-white/60">
                        The main town offers the widest selection of dining options, from traditional tavernas in the three
                        squares to more upscale restaurants with panoramic views. Try "Pounta" for authentic local cuisine
                        or "Eva's Garden" for a romantic setting.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium block">Ano Meria</span>
                      <p className="text-gray-600 dark:text-white/60">
                        For the most authentic experience, visit the tavernas in Ano Meria where you'll find traditional
                        dishes made with locally-sourced ingredients. "Irini's" is known for excellent matsata and meat dishes.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium block">Agali & Beaches</span>
                      <p className="text-gray-600 dark:text-white/60">
                        The tavernas near the beaches offer fresh seafood and Greek classics. "Agali Restaurant" serves
                        catch-of-the-day specialties with a view of the beach.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaLeaf className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold">Local Products & Must-Try Experiences</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Local Products</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-white/60">
                      <li>• <span className="font-medium">Thyme Honey</span>: The island's aromatic honey is produced from the abundant thyme that grows on its hills.</li>
                      <li>• <span className="font-medium">Souroto Cheese</span>: Take home this distinctive local cheese, available at small markets in Chora and Ano Meria.</li>
                      <li>• <span className="font-medium">Capers</span>: Wild capers grow throughout the island and are used in many local dishes.</li>
                      <li>• <span className="font-medium">Herbs</span>: Local herbs like thyme, oregano, and sage are dried and sold in bundles.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Culinary Experiences</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-white/60">
                      <li>• Visit a traditional bakery in Chora to try freshly baked bread and pastries.</li>
                      <li>• Attend the Rakizio festival in September, when locals distill raki (a grape-based spirit).</li>
                      <li>• Take a cooking class to learn how to make matsata pasta from scratch.</li>
                      <li>• Join a local family for dinner through experiences offered by some guesthouses.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Things to Do in Folegandros</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaSwimmer className="text-3xl text-blue-500 mr-4" />
                    <h3 className="text-xl font-semibold">Water Activities</h3>
                  </div>
                  <ul className="space-y-4">
                    <li>
                      <span className="font-medium block">Beach Hopping</span>
                      <p className="text-gray-600 dark:text-white/60">
                        Explore the diverse beaches of Folegandros, from organized beaches near settlements to remote
                        coves accessible only by boat or hiking trails. Don't miss Katergo, widely considered the most
                        beautiful beach on the island.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium block">Boat Tours</span>
                      <p className="text-gray-600 dark:text-white/60">
                        Take a boat tour around the island to discover secluded beaches and impressive sea caves.
                        Full-day and half-day tours depart from Karavostasis port during the summer season.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium block">Snorkeling</span>
                      <p className="text-gray-600 dark:text-white/60">
                        The crystal-clear waters around Folegandros offer excellent visibility for snorkeling.
                        Agali, Katergo, and Livadaki beaches are particularly good spots to observe marine life.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium block">Sea Kayaking</span>
                      <p className="text-gray-600 dark:text-white/60">
                        Rent a sea kayak to explore the dramatic coastline at your own pace. Guided kayak tours
                        are also available, offering insights into the island's geology and hidden spots.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaHiking className="text-3xl text-blue-500 mr-4" />
                    <h3 className="text-xl font-semibold">Land Activities</h3>
                  </div>
                  <ul className="space-y-4">
                    <li>
                      <span className="font-medium block">Hiking</span>
                      <p className="text-gray-600 dark:text-white/60">
                        Folegandros offers excellent hiking opportunities along ancient paths connecting villages and
                        beaches. The path from Chora to the Church of Panagia provides breathtaking views, while the
                        trail network around Ano Meria takes you through traditional farmlands and rugged landscapes.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium block">Visit the Church of Panagia</span>
                      <p className="text-gray-600 dark:text-white/60">
                        Follow the zigzagging path from Chora to this iconic whitewashed church perched on a hill.
                        The panoramic views are spectacular, especially at sunset. The church houses a small ecclesiastical
                        museum with Byzantine icons and artifacts.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium block">Explore Kastro</span>
                      <p className="text-gray-600 dark:text-white/60">
                        Wander through the medieval Kastro district in Chora, with its narrow alleys, ancient walls,
                        and traditional architecture dating back to Venetian times. This is one of the oldest and best-preserved
                        medieval settlements in the Cyclades.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium block">Folklore Museum</span>
                      <p className="text-gray-600 dark:text-white/60">
                        Visit the Ecological and Folklore Museum in Ano Meria to learn about traditional island life.
                        The museum is housed in a typical "themonia" (farmhouse) and displays agricultural tools, household
                        items, and exhibits on local customs and crafts.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section id="gallery" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Folegandros Photo Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          </section>

          {/* Call to Action Section */}
          <section id="cta" className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md overflow-hidden">
            <div className="container mx-auto px-6 py-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Experience Folegandros?</h2>
                  <p className="text-lg mb-6">
                    Book your accommodations, tours, and activities for an unforgettable Greek island getaway.
                    Folegandros offers the perfect blend of natural beauty, authentic village life, and tranquil beaches.
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

export default FolegandrosGuide;


