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

const IosGuide: React.FC = () => {
  const { t } = useTranslation();
  const ios = islandGuides.find(island => island.id === 'ios');

  if (!ios) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Ios Travel Guide 2026 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Ios vacation with our comprehensive 2026 travel guide. Discover the best hotels, restaurants, beaches, and activities. From vibrant nightlife to pristine beaches and traditional villages.",
    keywords: [
      'Ios travel guide',
      'Ios beaches',
      'Ios nightlife',
      'Chora Ios',
      'Greek islands',
      'Ios villages',
      'Mylopotas beach',
      'Ios party',
      'Ios restaurants',
      'best time to visit Ios'
    ],
    ogImage: ios.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/ios/gallery/ios-chora.jpg",
      alt: "The picturesque Chora of Ios with traditional Cycladic architecture"
    },
    {
      src: "/images/islands/ios/gallery/ios-mylopotas.jpg",
      alt: "The popular Mylopotas beach with golden sands"
    },
    {
      src: "/images/islands/ios/gallery/ios-manganari.jpg",
      alt: "The pristine waters of Manganari beach"
    },
    {
      src: "/images/islands/ios/gallery/ios-nightlife.jpg",
      alt: "Vibrant nightlife scene in Ios"
    },
    {
      src: "/images/islands/ios/gallery/ios-sunset.jpg",
      alt: "Spectacular sunset view from Chora"
    },
    {
      src: "/images/islands/ios/gallery/ios-homer-tomb.jpg",
      alt: "The historic site of Homer's Tomb"
    },
    {
      src: "/images/islands/ios/gallery/ios-agia-theodoti.jpg",
      alt: "The tranquil Agia Theodoti beach"
    },
    {
      src: "/images/islands/ios/gallery/ios-aerial.jpg",
      alt: "Aerial view of Ios coastline and landscape"
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
        <IslandGuideHero {...ios} />

        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Ios</h2>
              <p className="text-gray-700 leading-relaxed">
                Ios, known as the party island of the Cyclades, offers much more than its vibrant nightlife.
                With its golden beaches, crystal-clear waters, and picturesque Cycladic architecture, Ios
                provides a perfect blend of relaxation and entertainment for all types of travelers.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the lively Chora with its winding alleys and white-washed buildings to the tranquil
                beaches of Manganari and Psathi, Ios offers diverse experiences. Whether you're seeking
                adventure, cultural exploration, or simply a beach getaway, our comprehensive guide will
                help you discover the best of what this captivating island has to offer.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/islands/ios/landscape.jpg"
                  alt="Ios Landscape"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/images/islands/ios/chora-detail.jpg"
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">When to Visit Ios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaSun className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">High Season</h3>
                <p className="text-gray-600 dark:text-white/60">July to August</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Perfect beach weather</li>
                  <li>• Peak nightlife scene</li>
                  <li>• All facilities open</li>
                  <li>• Busiest and most vibrant</li>
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
                  <li>• Still lively atmosphere</li>
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Charming Villages of Ios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/ios/villages/chora.jpg"
                    alt="Chora Village"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Chora</h3>
                  <p className="text-gray-600 mb-4">
                    The capital of Ios, Chora is a picturesque village perched on a hillside between the port and Mylopotas beach.
                    With its whitewashed houses, blue-domed churches, and narrow winding alleys, it embodies the quintessential
                    Cycladic aesthetic. By day, explore its charming streets, visit the 12 windmills, and enjoy panoramic views
                    of the island. By night, experience the vibrant nightlife with numerous bars, clubs, and restaurants that
                    have made Ios famous among young travelers.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Nightlife Hub</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Cycladic Architecture</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Panoramic Views</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/ios/villages/ormos.jpg"
                    alt="Ormos (Port) Village"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Ormos (Port)</h3>
                  <p className="text-gray-600 mb-4">
                    Ormos is the main port and gateway to Ios, offering a more relaxed atmosphere compared to Chora.
                    This seaside village features a small beach, several tavernas, cafes, and shops along its waterfront.
                    It's the perfect place to watch ferries come and go while enjoying fresh seafood at a local taverna.
                    Ormos is also home to many accommodations and serves as a transportation hub with buses connecting
                    to Chora and the island's beaches.
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
                    src="/images/islands/ios/villages/mylopotas.jpg"
                    alt="Mylopotas Village"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Mylopotas</h3>
                  <p className="text-gray-600 mb-4">
                    Located just 3 km from Chora, Mylopotas is a vibrant beach settlement that has developed around one of the
                    most popular beaches on the island. With its golden sand and crystal-clear waters, the area attracts many
                    visitors during summer. The beachfront is lined with restaurants, bars, and water sports facilities, creating
                    a lively atmosphere. Mylopotas offers a wide range of accommodations, from luxury hotels to budget-friendly
                    options, making it a convenient base for exploring the island.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Resort</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Water Sports</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Bars</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/ios/villages/koumbara.jpg"
                    alt="Koumbara Village"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Koumbara</h3>
                  <p className="text-gray-600 mb-4">
                    Koumbara is a small, peaceful settlement on the western side of Ios, known for its beautiful sandy beach and
                    spectacular sunsets. This area offers a more relaxed atmosphere compared to the bustling Mylopotas and Chora.
                    The beach is less crowded and features a few laid-back beach bars and tavernas serving fresh seafood. Koumbara
                    is perfect for those seeking a quieter experience while still being close to the main attractions of the island.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sunset Views</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Relaxed Atmosphere</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sandy Beach</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Beautiful Beaches of Ios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/ios/beaches/mylopotas.jpg"
                    alt="Mylopotas Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Mylopotas Beach</h3>
                  <p className="text-gray-600 mb-4">
                    Mylopotas is the most famous and developed beach on Ios, located just 3 km from Chora. This long, golden
                    sandy beach with crystal-clear turquoise waters offers excellent facilities including sunbeds, umbrellas,
                    water sports, beach bars, and restaurants. The beach is easily accessible by bus or on foot from Chora,
                    making it popular among all types of travelers. Despite its popularity, the beach is spacious enough to
                    accommodate many visitors without feeling overcrowded.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Water Sports</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Bars</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Golden Sand</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/ios/beaches/manganari.jpg"
                    alt="Manganari Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Manganari Beach</h3>
                  <p className="text-gray-600 mb-4">
                    Located on the southern coast of Ios, about 23 km from Chora, Manganari is often considered one of the most
                    beautiful beaches in Greece. This remote paradise features a series of five consecutive sandy coves with
                    shallow, crystal-clear waters, protected from winds by the surrounding hills. Despite its distance from the
                    main town, Manganari offers basic facilities including sunbeds, umbrellas, and a few tavernas. The beach
                    gained fame after being featured in the movie "Le Grand Bleu."
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Pristine Waters</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Multiple Coves</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/ios/beaches/koumbara.jpg"
                    alt="Koumbara Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Koumbara Beach</h3>
                  <p className="text-gray-600 mb-4">
                    Koumbara is a beautiful sandy beach on the western side of Ios, known for its spectacular sunsets and
                    relaxed atmosphere. Located about 3 km from Chora, this beach offers a more laid-back alternative to
                    the bustling Mylopotas. The beach features golden sand and clear blue waters, with basic facilities
                    including sunbeds, umbrellas, and a few beach bars and tavernas. Koumbara is particularly popular among
                    those looking to escape the crowds while still enjoying quality amenities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sunset Views</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Relaxed Vibe</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Bars</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/ios/beaches/agia-theodoti.jpg"
                    alt="Agia Theodoti Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Agia Theodoti Beach</h3>
                  <p className="text-gray-600 mb-4">
                    Agia Theodoti is a long, pebbly beach on the eastern coast of Ios, about 9 km from Chora. This secluded
                    beach offers a peaceful retreat away from the island's more touristy areas. With its crystal-clear waters
                    and beautiful natural surroundings, it's perfect for swimming and snorkeling. The beach has minimal
                    facilities, with just a couple of tavernas serving fresh seafood. Nearby, you can explore the remains of
                    an ancient tower and a small Byzantine church dedicated to Agia Theodoti.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Secluded</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Snorkeling</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Archaeological Site</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/ios/beaches/psathi.jpg"
                    alt="Psathi Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Psathi Beach</h3>
                  <p className="text-gray-600 mb-4">
                    Psathi is a remote, unspoiled beach on the eastern side of Ios, about 15 km from Chora. This long, sandy
                    beach with crystal-clear waters offers a tranquil escape from the island's more popular spots. Psathi is
                    known for its excellent windsurfing conditions due to the consistent winds in the area. The beach has
                    minimal facilities, with just a small taverna operating during the summer months. The surrounding landscape
                    is rugged and beautiful, perfect for nature lovers and those seeking solitude.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Windsurfing</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Unspoiled</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Remote</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/ios/beaches/kalamos.jpg"
                    alt="Kalamos Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Kalamos Beach</h3>
                  <p className="text-gray-600 mb-4">
                    Kalamos is a secluded beach on the southeastern coast of Ios, accessible only by boat or via a dirt road
                    followed by a short hike. This hidden gem offers complete privacy and natural beauty with its golden sand
                    and turquoise waters. The beach has no facilities, so visitors should come prepared with water, food, and
                    sun protection. The surrounding cliffs and clear waters make it an excellent spot for snorkeling and
                    exploring the underwater world. Kalamos is perfect for adventurous travelers seeking an authentic,
                    untouched beach experience.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Hidden Gem</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">No Facilities</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Natural Beauty</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Local Cuisine Section */}
          <section id="cuisine" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Local Cuisine & Dining</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <div className="flex items-start mb-4">
                  <FaGlassCheers className="text-3xl text-blue-500 mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Traditional Dishes</h3>
                    <ul className="space-y-3 text-gray-600 dark:text-white/60">
                      <li>
                        <span className="font-medium">Tsimetia</span> - Traditional Ios cheese pies made with local goat cheese, herbs, and honey
                      </li>
                      <li>
                        <span className="font-medium">Skordalia</span> - Garlic dip made with potatoes, olive oil, and vinegar
                      </li>
                      <li>
                        <span className="font-medium">Revithada</span> - Slow-cooked chickpea stew, a Sunday tradition in the Cyclades
                      </li>
                      <li>
                        <span className="font-medium">Ios Sausages</span> - Local sausages flavored with fennel and other herbs
                      </li>
                      <li>
                        <span className="font-medium">Mostra</span> - Barley rusk topped with soft cheese, tomato, and capers
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="aspect-w-16 aspect-h-9 mt-4">
                  <img
                    src="/images/islands/ios/cuisine/traditional-dishes.jpg"
                    alt="Traditional Ios Dishes"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <div className="flex items-start mb-4">
                  <FaWineGlass className="text-3xl text-blue-500 mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Local Products</h3>
                    <ul className="space-y-3 text-gray-600 dark:text-white/60">
                      <li>
                        <span className="font-medium">Skotiri</span> - Soft, creamy cheese unique to Ios, made from goat's milk
                      </li>
                      <li>
                        <span className="font-medium">Thyme Honey</span> - Locally produced honey with distinct aroma and flavor
                      </li>
                      <li>
                        <span className="font-medium">Rakomelo</span> - Traditional alcoholic drink made with raki and honey
                      </li>
                      <li>
                        <span className="font-medium">Capers</span> - Wild capers harvested from the rocky landscapes of the island
                      </li>
                      <li>
                        <span className="font-medium">Pasteli</span> - Traditional sweet made with sesame seeds and local honey
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="aspect-w-16 aspect-h-9 mt-4">
                  <img
                    src="/images/islands/ios/cuisine/local-products.jpg"
                    alt="Local Products of Ios"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Where to Eat in Ios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-lg mb-2">Chora</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-white/60">
                    <li>• <span className="font-medium">Lord Byron Restaurant</span> - Traditional Greek cuisine with panoramic views</li>
                    <li>• <span className="font-medium">Grandma's</span> - Homestyle cooking in a cozy setting</li>
                    <li>• <span className="font-medium">The Nest</span> - Creative Mediterranean dishes with a modern twist</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-lg mb-2">Mylopotas Beach</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-white/60">
                    <li>• <span className="font-medium">Drakos Taverna</span> - Fresh seafood right on the beach</li>
                    <li>• <span className="font-medium">Salt</span> - Upscale dining with Mediterranean flavors</li>
                    <li>• <span className="font-medium">Free Beach Bar</span> - Casual dining and cocktails with beach views</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-lg mb-2">Port Area & Beyond</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-white/60">
                    <li>• <span className="font-medium">Octopus Tree</span> - Seafood specialties in the port area</li>
                    <li>• <span className="font-medium">Koumbara Restaurant</span> - Sunset dining at Koumbara Beach</li>
                    <li>• <span className="font-medium">Manganari Restaurant</span> - Simple taverna serving fresh food at Manganari Beach</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-cyan-600/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Dining Tips for Ios</h3>
              <ul className="space-y-3 text-gray-700 dark:text-white/80">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>For the most authentic experience, look for tavernas frequented by locals, especially in Chora's back streets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Seafood is freshest at restaurants near the fishing port or beach tavernas that source directly from fishermen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Many restaurants offer early bird specials or complimentary desserts during shoulder season (May-June, September)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Reservations are recommended for popular restaurants in Chora during high season (July-August)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Don't miss trying rakomelo, the local spirit, as a digestif after your meal</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Things to Do in Ios</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <div className="flex items-start mb-4">
                  <FaSwimmer className="text-3xl text-blue-500 mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Water Activities</h3>
                    <ul className="space-y-3 text-gray-600 dark:text-white/60">
                      <li>
                        <span className="font-medium">Beach Hopping</span> - Explore the diverse beaches of Ios, from the popular Mylopotas to the secluded Manganari
                      </li>
                      <li>
                        <span className="font-medium">Water Sports</span> - Try windsurfing, paddleboarding, or jet skiing at Mylopotas Beach
                      </li>
                      <li>
                        <span className="font-medium">Boat Tours</span> - Take a day cruise around the island to discover hidden coves and beaches accessible only by sea
                      </li>
                      <li>
                        <span className="font-medium">Snorkeling & Diving</span> - Explore the underwater world at Koumbara and Manganari beaches
                      </li>
                      <li>
                        <span className="font-medium">Fishing Trips</span> - Join local fishermen for traditional fishing experiences
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="aspect-w-16 aspect-h-9 mt-4">
                  <img
                    src="/images/islands/ios/activities/water-activities.jpg"
                    alt="Water Activities in Ios"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <div className="flex items-start mb-4">
                  <FaHiking className="text-3xl text-blue-500 mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Land Activities</h3>
                    <ul className="space-y-3 text-gray-600 dark:text-white/60">
                      <li>
                        <span className="font-medium">Hiking Trails</span> - Explore ancient paths connecting villages and beaches, with stunning views of the Aegean Sea
                      </li>
                      <li>
                        <span className="font-medium">Homer's Tomb</span> - Visit the alleged burial site of the famous poet Homer, located in the northeastern part of the island
                      </li>
                      <li>
                        <span className="font-medium">Archaeological Museum</span> - Discover artifacts from the island's prehistoric settlement at Skarkos
                      </li>
                      <li>
                        <span className="font-medium">Paleokastro</span> - Explore the medieval castle ruins with panoramic views
                      </li>
                      <li>
                        <span className="font-medium">Sunset at Chora</span> - Experience the magical sunset from the windmills or Panagia Gremiotissa church
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="aspect-w-16 aspect-h-9 mt-4">
                  <img
                    src="/images/islands/ios/activities/land-activities.jpg"
                    alt="Land Activities in Ios"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Unique Experiences in Ios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-lg mb-2">Cultural Experiences</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-white/60">
                    <li>• <span className="font-medium">Skarkos Archaeological Site</span> - One of the best-preserved prehistoric settlements in the Aegean</li>
                    <li>• <span className="font-medium">Traditional Festivals</span> - Experience local "panigiria" celebrations with music, dance, and food</li>
                    <li>• <span className="font-medium">Cooking Classes</span> - Learn to prepare traditional Cycladic dishes with local ingredients</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-lg mb-2">Nightlife & Entertainment</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-white/60">
                    <li>• <span className="font-medium">Beach Parties</span> - Join the famous beach parties at Mylopotas during summer</li>
                    <li>• <span className="font-medium">Bar Hopping in Chora</span> - Experience the legendary nightlife scene in the town center</li>
                    <li>• <span className="font-medium">Sunset Cocktails</span> - Enjoy signature cocktails with spectacular sunset views</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-cyan-600/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Activity Tips</h3>
              <ul className="space-y-3 text-gray-700 dark:text-white/80">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Book water sports and boat tours in advance during high season (July-August)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>For hiking, start early in the morning to avoid the midday heat, especially in summer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Rent a scooter or car to explore the more remote beaches and attractions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Visit Homer's Tomb in the late afternoon for the best lighting and views</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>For a more authentic experience, visit during May-June or September when the island is less crowded</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section id="gallery" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Ios Photo Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Experience Ios?</h2>
                  <p className="text-lg mb-6">
                    Book your accommodations, tours, and activities for an unforgettable Greek island getaway.
                    Ios offers the perfect blend of vibrant nightlife, stunning beaches, and authentic Greek hospitality.
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
                    src="/images/islands/ios/cta-image.jpg"
                    alt="Ios Island View"
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

export default IosGuide;


