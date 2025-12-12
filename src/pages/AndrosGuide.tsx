import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaUmbrellaBeach,
  FaShip,
  FaUtensils,
  FaSun,
  FaHome,
  FaRoute,
  FaHistory,
  FaCameraRetro,
  FaLeaf,
  FaCalendarAlt,
  FaGlassCheers,
  FaSwimmer,
  FaHiking,
  FaWineGlass
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';
import RelatedDestinationsSection from '../components/seo/RelatedDestinationsSection';
import { siteLinks } from '../data/siteLinks';

const AndrosGuide: React.FC = () => {
  const { t } = useTranslation();
  const andros = islandGuides.find(island => island.id === 'andros');

  if (!andros) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Andros Travel Guide 2026 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Andros vacation with our comprehensive 2026 travel guide. Discover the best hotels, restaurants, beaches, and activities on this beautiful Cycladic island.",
    keywords: [
      'Andros travel guide',
      'Andros beaches',
      'Andros villages',
      'Greek islands',
      'Cycladic islands',
      'Andros hiking',
      'Andros restaurants',
      'best time to visit Andros',
      'Chora Andros',
      'Batsi Andros'
    ],
    ogImage: andros.image,
    ogType: 'article'
  };

  // Categories for Quick Navigation
  const categories = [
    {
      icon: <FaShip className="text-cyan-600 dark:text-cyclades-turquoise" />,
      title: 'How to Get There?',
      description: 'Ferry and travel info',
      link: '#transportation',
      id: 'transportation'
    },
    {
      icon: <FaUmbrellaBeach className="text-cyan-600 dark:text-cyclades-turquoise" />,
      title: 'Where to Swim?',
      description: 'Best beaches',
      link: '#beaches',
      id: 'beaches'
    },
    {
      icon: <FaRoute className="text-cyan-600 dark:text-cyclades-turquoise" />,
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
      icon: <FaHome className="text-cyan-600 dark:text-cyclades-turquoise" />,
      title: 'Local Products',
      description: 'Specialties and delicacies',
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
      <div className="bg-gray-50">
        <IslandGuideHero
          name={andros.name}
          description={andros.description}
          image={andros.heroImage}
          bestTime={andros.bestTimeToVisit}
          idealFor={andros.idealFor}
        />

        <div className="container mx-auto px-4 py-12">
          {/* Introduction Section */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Andros Island Travel Guide</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="text-lg leading-relaxed mb-6">
                  Andros, the northernmost island of the Cyclades, stands apart from its neighbors with its lush landscapes,
                  abundant water sources, and elegant architecture. Known as the "Island of the Captains" due to its rich maritime history,
                  Andros offers a perfect blend of natural beauty, cultural heritage, and authentic Greek island life.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Unlike the typical arid Cycladic islands, Andros is blessed with flowing streams, waterfalls, and verdant valleys.
                  Its diverse terrain ranges from pristine beaches to mountainous hiking trails, making it an ideal destination for
                  nature lovers and outdoor enthusiasts. The island's main town, Chora, impresses visitors with its neoclassical mansions,
                  marble-paved square, and the iconic Maritime Museum.
                </p>
                <p className="text-lg leading-relaxed">
                  Whether you're seeking relaxation on golden beaches, adventure on hiking paths, or cultural immersion in traditional villages,
                  Andros offers an authentic Greek island experience away from the crowds. This comprehensive guide will help you discover the best
                  of what this captivating island has to offer.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/images/islands/andros/landscape.jpg"
                    alt="Andros Landscape"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 w-2/3">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="/images/islands/andros/chora-detail.jpg"
                      alt="Chora Detail"
                      className="w-full h-full object-cover"
                    />
                  </div>
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">When to Visit Andros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaSun className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">High Season</h3>
                <p className="text-gray-600 dark:text-white/60">July to August</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Warm beach weather</li>
                  <li>• All facilities open</li>
                  <li>• Cultural festivals</li>
                  <li>• Busiest period</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaCameraRetro className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Shoulder Season</h3>
                <p className="text-gray-600 dark:text-white/60">May-June, September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Mild temperatures</li>
                  <li>• Fewer tourists</li>
                  <li>• Better rates</li>
                  <li>• Ideal for hiking</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaLeaf className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Spring</h3>
                <p className="text-gray-600 dark:text-white/60">April to May</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Lush green landscapes</li>
                  <li>• Flowing streams</li>
                  <li>• Wildflowers blooming</li>
                  <li>• Easter celebrations</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaCalendarAlt className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Water Temperature</h3>
                <p className="text-gray-600 dark:text-white/60">Best swimming months</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Charming Villages of Andros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/villages/chora.jpg"
                    alt="Chora Village"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Chora (Andros Town)</h3>
                  <p className="text-gray-600 mb-4">
                    The elegant capital of Andros is known for its neoclassical mansions, marble-paved main square, and impressive
                    maritime heritage. Built on a narrow peninsula with the sea on both sides, Chora features a unique stone bridge
                    connecting to a small islet with the ruins of a Venetian castle. The town is home to several museums, including
                    the renowned Museum of Contemporary Art, the Maritime Museum, and the Archaeological Museum.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Neoclassical Architecture</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Museums</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Venetian Castle</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/villages/batsi.jpg"
                    alt="Batsi Village"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Batsi</h3>
                  <p className="text-gray-600 mb-4">
                    Once a small fishing village, Batsi has developed into the island's main tourist resort without losing its
                    traditional charm. Built amphitheatrically around a beautiful bay with a sandy beach, the village offers a
                    picturesque setting with white-washed houses cascading down the hillside. Batsi is known for its lively
                    waterfront with tavernas, cafes, and bars, making it an ideal base for exploring the island.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tourist Resort</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sandy Beach</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Waterfront Dining</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/villages/stenies.jpg"
                    alt="Stenies Village"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Stenies</h3>
                  <p className="text-gray-600 mb-4">
                    Located just 4 km from Chora, Stenies is one of the most beautiful villages on Andros. This historic settlement
                    was once home to wealthy ship owners, as evidenced by the impressive mansions that still stand today. The village
                    is built on the slopes of a verdant valley with a stream running through it, creating a lush environment with stone
                    bridges, watermills, and abundant vegetation that's rare in the Cyclades.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Historic Mansions</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Lush Valley</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Stone Bridges</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/villages/korthi.jpg"
                    alt="Korthi Village"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Korthi</h3>
                  <p className="text-gray-600 mb-4">
                    Situated on the southeastern coast of Andros, Korthi (or Ormos Korthiou) is a peaceful coastal village built around
                    a beautiful bay. The area offers a more authentic, laid-back atmosphere compared to the more developed parts of the island.
                    Nearby, you'll find the ruins of a Venetian castle (Faneromeni) perched on a hill, offering panoramic views of the Aegean Sea.
                    The surrounding area is known for its beautiful beaches and traditional inland villages.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Coastal Village</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Venetian Castle</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Authentic Atmosphere</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Beautiful Beaches of Andros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/beaches/golden-sand.jpg"
                    alt="Golden Sand Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Golden Sand (Chryssi Ammos)</h3>
                  <p className="text-gray-600 mb-4">
                    As its name suggests, Golden Sand is known for its beautiful golden sand and crystal-clear turquoise waters.
                    Located near Batsi, this organized beach offers sunbeds, umbrellas, and water sports facilities. The beach is
                    partially protected from winds, making it a good option even on breezier days. With several tavernas and beach
                    bars nearby, it's perfect for spending a full day by the sea.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Golden Sand</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Water Sports</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Bars</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/beaches/achla.jpg"
                    alt="Achla Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Achla</h3>
                  <p className="text-gray-600 mb-4">
                    Often cited as one of the most beautiful beaches in Greece, Achla is a pristine stretch of sand where a river meets
                    the sea, creating a unique ecosystem. Surrounded by lush greenery and accessible primarily by boat or a challenging
                    dirt road, this beach remains relatively unspoiled. The combination of crystal-clear waters, white pebbles, and the
                    verdant backdrop makes it a paradise for nature lovers seeking tranquility.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Pristine</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">River Estuary</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Natural Beauty</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/beaches/tis-grias.jpg"
                    alt="Tis Grias to Pidima Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Tis Grias to Pidima (Old Lady's Jump)</h3>
                  <p className="text-gray-600 mb-4">
                    This small but stunning beach gets its unusual name from a local legend about an old woman who jumped from the
                    distinctive rock formation that rises from the sea. The beach features a mix of sand and small pebbles, with
                    emerald waters that are perfect for swimming and snorkeling. The dramatic rock pillar standing in the water makes
                    it one of the most photographed spots on Andros.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Scenic</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Rock Formation</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Photography Spot</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/beaches/zorkos.jpg"
                    alt="Zorkos Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Zorkos</h3>
                  <p className="text-gray-600 mb-4">
                    Located on the northern coast of Andros, Zorkos is a large, sandy beach with crystal-clear waters. Despite being
                    somewhat remote, it has basic facilities including a taverna serving fresh seafood. The beach is partially organized
                    with sunbeds and umbrellas but maintains its natural beauty and relaxed atmosphere. It's ideal for those seeking a
                    less crowded beach experience with stunning scenery.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sandy Beach</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Seafood Taverna</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Relaxed Atmosphere</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/beaches/fellos.jpg"
                    alt="Fellos Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Fellos</h3>
                  <p className="text-gray-600 mb-4">
                    Just a short drive from Gavrio port, Fellos is a sheltered sandy beach with calm waters, making it ideal for families
                    with children. The beach is surrounded by trees providing natural shade and has a relaxed atmosphere. While it offers
                    basic amenities including a beach bar and taverna, it remains relatively quiet even during the high season, offering a
                    peaceful alternative to the more popular beaches.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Natural Shade</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Calm Waters</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/beaches/vitali.jpg"
                    alt="Vitali Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Vitali</h3>
                  <p className="text-gray-600 mb-4">
                    Nestled in a picturesque cove on the northeastern coast of Andros, Vitali is a beautiful beach with coarse sand and
                    pebbles. The crystal-clear waters and stunning landscape make it a favorite among locals and visitors who appreciate
                    natural beauty. The beach has a small taverna serving traditional Greek cuisine and limited facilities, preserving its
                    authentic character and peaceful ambiance.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Scenic Cove</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Traditional Taverna</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Clear Waters</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Local Cuisine Section */}
          <section id="cuisine" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Local Cuisine of Andros</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src="/images/islands/andros/cuisine/andros-food.jpg"
                      alt="Traditional Andrian Cuisine"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Andros offers a distinctive culinary tradition that reflects its unique position as a fertile, water-rich island in the typically arid Cyclades.
                  The island's cuisine combines fresh local ingredients with traditional cooking methods, creating dishes that are both authentic and delicious.
                </p>
                <h3 className="font-semibold text-xl mt-6 mb-4">Local Specialties</h3>
                <ul className="space-y-2">
                  <li><strong>Froutalia</strong> - A hearty omelet made with potatoes, local sausage, and fresh herbs</li>
                  <li><strong>Fourtalia</strong> - A specialty from Andros made with eggs, potatoes, and local sausage</li>
                  <li><strong>Lampriatis</strong> - A traditional Easter bread stuffed with cheese</li>
                  <li><strong>Kaltsounia</strong> - Sweet cheese pies with honey and cinnamon</li>
                  <li><strong>Amygdalota</strong> - Almond sweets that are a specialty of the island</li>
                </ul>

                <h3 className="font-semibold text-xl mt-6 mb-4">Local Products</h3>
                <ul className="space-y-2">
                  <li><strong>Andros Cheeses</strong> - Try the local volaki, a soft, white cheese similar to mozzarella</li>
                  <li><strong>Petroti</strong> - A hard cheese aged in clay pots</li>
                  <li><strong>Andros Honey</strong> - Known for its exceptional quality and unique flavor from local herbs</li>
                  <li><strong>Pasteli</strong> - Traditional sesame and honey bars</li>
                  <li><strong>Local Herbs</strong> - Sage, thyme, and oregano grow wild on the island's hillsides</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaWineGlass className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Local Drinks</h3>
                <p className="text-gray-600 mb-4">
                  Sample local spirits including "Koumaro," a traditional drink made from arbutus berries,
                  and "Rakomelo," a warming blend of raki and honey with cinnamon and herbs.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Koumaro</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Rakomelo</span>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaUtensils className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Seaside Tavernas</h3>
                <p className="text-gray-600 mb-4">
                  Enjoy authentic Greek cuisine at traditional tavernas in Batsi, Chora, and coastal villages,
                  where fresh seafood and local specialties are served with stunning sea views.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Fresh Fish</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sea View</span>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaGlassCheers className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Dining in Chora</h3>
                <p className="text-gray-600 mb-4">
                  The capital offers some of the island's finest dining experiences, from traditional tavernas
                  in the old town to upscale restaurants serving creative Greek cuisine with a modern twist.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Gourmet Options</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Traditional Flavors</span>
                </div>
              </div>
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Things to Do in Andros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/activities/hiking.jpg"
                    alt="Hiking in Andros"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaHiking className="text-2xl text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold">Hiking</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Andros is known as a hiker's paradise with over 300 km of well-maintained and signposted trails.
                    The "Andros Routes" network includes paths that cross verdant valleys, pass by waterfalls, and connect
                    traditional villages. The island's diverse landscape offers trails for all levels, from easy coastal walks
                    to challenging mountain hikes with breathtaking views.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Andros Routes</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Waterfalls</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Nature Trails</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/activities/water-sports.jpg"
                    alt="Water Sports in Andros"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaSwimmer className="text-2xl text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold">Water Sports</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    The island's coastline offers excellent conditions for various water sports. Golden Sand Beach is popular
                    for windsurfing and kitesurfing, with schools providing equipment and lessons. Snorkeling and diving enthusiasts
                    can explore the clear waters around Andros, discovering underwater caves, reefs, and marine life. Kayaking along
                    the coast allows you to discover secluded beaches and impressive rock formations.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Windsurfing</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Snorkeling</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Kayaking</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/activities/museums.jpg"
                    alt="Museums in Andros"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaHistory className="text-2xl text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold">Museums & Culture</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Andros has a rich cultural scene with several notable museums. The Museum of Contemporary Art in Chora hosts
                    exhibitions by renowned Greek and international artists. The Maritime Museum showcases the island's naval heritage,
                    while the Archaeological Museum displays artifacts from ancient times. Don't miss the Cyclades Olive Museum in Ano Pitrofos,
                    offering insights into traditional olive oil production.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Contemporary Art</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Maritime History</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Olive Museum</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/activities/monasteries.jpg"
                    alt="Monasteries in Andros"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaHome className="text-2xl text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold">Monasteries</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Explore the island's spiritual heritage by visiting its historic monasteries. The Monastery of Panachrantou,
                    founded in the 10th century and perched at an altitude of 750 meters, offers breathtaking views and houses
                    important religious relics. The Monastery of Zoodochos Pigi near Batsi and the Monastery of Agia Marina are also
                    worth visiting for their architecture, frescoes, and peaceful atmosphere.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Byzantine Architecture</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Religious Heritage</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Panoramic Views</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/activities/boat-tour.jpg"
                    alt="Boat Tours in Andros"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaShip className="text-2xl text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold">Boat Tours</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Take a boat tour around Andros to discover hidden coves and beaches accessible only by sea.
                    Day trips from Batsi or Chora allow you to explore the island's rugged coastline, visit secluded
                    beaches like Achla, and enjoy swimming in crystal-clear waters. Some tours include stops for snorkeling,
                    fishing, or lunch at seaside tavernas in remote locations.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Coastal Exploration</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Hidden Beaches</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sea Caves</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/andros/activities/springs.jpg"
                    alt="Springs and Waterfalls in Andros"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaLeaf className="text-2xl text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold">Springs & Waterfalls</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Discover the natural freshwater sources that make Andros unique among the Cyclades. Visit the picturesque
                    Pithara waterfalls near Apikia village, where water cascades down moss-covered rocks into natural pools.
                    Explore the Sariza spring in Apikia, known for its healing mineral water that's bottled and sold throughout Greece.
                    The lush valleys around Menites village feature springs with water flowing from lion-head spouts.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Pithara Waterfalls</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sariza Spring</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Menites Springs</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section id="gallery" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <img
                  src="/images/islands/andros/gallery/andros-chora.jpg"
                  alt="Chora, Andros"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm font-medium">Chora</p>
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <img
                  src="/images/islands/andros/gallery/andros-batsi.jpg"
                  alt="Batsi, Andros"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm font-medium">Batsi</p>
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <img
                  src="/images/islands/andros/gallery/andros-achla-beach.jpg"
                  alt="Achla Beach, Andros"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm font-medium">Achla Beach</p>
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <img
                  src="/images/islands/andros/gallery/andros-tis-grias-to-pidima.jpg"
                  alt="Tis Grias to Pidima, Andros"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm font-medium">Tis Grias to Pidima</p>
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <img
                  src="/images/islands/andros/gallery/andros-monastery.jpg"
                  alt="Monastery, Andros"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm font-medium">Monastery of Panachrantou</p>
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <img
                  src="/images/islands/andros/gallery/andros-hiking.jpg"
                  alt="Hiking Trail, Andros"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm font-medium">Hiking Trail</p>
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <img
                  src="/images/islands/andros/gallery/andros-waterfalls.jpg"
                  alt="Waterfalls, Andros"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm font-medium">Pithara Waterfalls</p>
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <img
                  src="/images/islands/andros/gallery/andros-cuisine.jpg"
                  alt="Local Cuisine, Andros"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm font-medium">Local Cuisine</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section id="cta" className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md overflow-hidden">
            <div className="container mx-auto px-6 py-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Experience Andros?</h2>
                  <p className="text-lg mb-6">
                    Book your accommodations, tours, and activities for an unforgettable Greek island getaway.
                    Andros offers the perfect blend of natural beauty, rich history, and authentic Greek hospitality.
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
                    src="/images/islands/santorini/santorini-view.jpg"
                    alt="Andros Island View"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                  {/* Note: Replace with Andros-specific image when available at /images/islands/andros/cta-image.jpg */}
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

export default AndrosGuide;


