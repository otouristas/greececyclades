import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaUmbrellaBeach,
  FaRoute,
  FaWineGlass,
  FaCameraRetro,
  FaSun,
  FaCalendarAlt,
  FaUtensils,
  FaShip,
  FaHiking,
  FaMapMarkedAlt,
  FaMountain,
  FaWater
} from 'react-icons/fa';
import SEO from '../components/SEO';
import FAQSchema from '../components/FAQSchema';
import BreadcrumbSchema, { breadcrumbPaths } from '../components/BreadcrumbSchema';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';

const KimolosGuide: React.FC = () => {
  const { t } = useTranslation();
  const kimolos = islandGuides.find(island => island.id === 'kimolos');

  if (!kimolos) {
    return <div>Island not found</div>;
  }

  // FAQ data for rich snippets
  const kimolosFaqs = [
    {
      question: "Is Kimolos worth visiting?",
      answer: "Absolutely! Kimolos is perfect for travelers seeking authentic Greek island culture without mass tourism. If you prioritize tranquility, pristine beaches, and genuine hospitality over nightlife and crowds, Kimolos is an excellent choice."
    },
    {
      question: "How do I get to Kimolos from Athens?",
      answer: "Take a ferry from Piraeus port (5-7 hours, €42-130) or from Lavrio (more affordable from €20). The quickest option is to fly to Milos and take a short 25-minute ferry to Kimolos. Book in advance during summer."
    },
    {
      question: "Do I need a car in Kimolos?",
      answer: "While a small bus exists, renting a car or ATV (€25-35/day) is recommended for exploring remote beaches like Prassa and attractions like Skiadi rock. The island is small but has limited public transport."
    },
    {
      question: "What is the best beach in Kimolos?",
      answer: "Prassa (Agios Georgios) is widely considered the best - pristine white sand with turquoise waters, often rated among the best beaches in the Cyclades. Other favorites include Bonatsa for families and Mavrospilia for sunsets."
    },
    {
      question: "When is the best time to visit Kimolos?",
      answer: "May to September offers the best weather. September is ideal - warm sea for swimming, fewer tourists than summer, better prices, and most facilities still open. Avoid July-August if you dislike crowds."
    },
    {
      question: "Can I visit Kimolos as a day trip from Milos?",
      answer: "Yes! The ferry from Pollonia (Milos) to Psathi (Kimolos) takes only 25-50 minutes with 3-6 daily crossings in summer. However, staying overnight lets you experience the authentic island atmosphere."
    }
  ];

  const seoData = {
    title: "Kimolos Travel Guide 2026 - Hidden Gem of the Western Cyclades",
    description: "Discover Kimolos, Greece's best-kept secret. Explore Prassa beach, hike to Skiadi rock, and experience authentic Greek island life. Complete 2026 travel guide with beaches, restaurants, and practical tips.",
    keywords: [
      'Kimolos travel guide',
      'Kimolos beaches',
      'Prassa beach',
      'Skiadi rock',
      'Western Cyclades',
      'Greek islands',
      'Kimolos ferry',
      'Chorio village',
      'Polyaigos island',
      'best time to visit Kimolos'
    ],
    ogImage: kimolos.image,
    ogType: 'article' as const
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbPaths.islandGuide('Kimolos', 'kimolos')} />
      <FAQSchema faqs={kimolosFaqs} pageUrl="https://discovercyclades.gr/guides/kimolos" />
      <SEO {...seoData} />

      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        <IslandGuideHero {...kimolos} />

        {/* Introduction Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Kimolos</h2>
              <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                Right next to the famous island of Milos lies a gorgeous, lesser-known neighbor: Kimolos Island.
                This volcanic gem in the Aegean Sea showcases turquoise waters, charming villages, and a laid-back
                vibe that feels like stepping back in time.
              </p>
              <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                Often described as Milos's "younger, quieter sister," Kimolos has retained its authentic charm,
                avoiding the commercialism that plagues larger Greek islands. Whether you're looking for a day trip
                from Milos or a quiet vacation spot to escape the crowds, Kimolos is perfect for nature lovers and
                those seeking authentic Greek hospitality.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/islands/kimolos.jpg"
                  alt="Kimolos Island View"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <a
                href="#getting-there"
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-cyan-600/5 dark:bg-cyan-600/10 text-cyan-600 dark:text-cyclades-turquoise rounded-lg hover:bg-cyan-600/10 dark:hover:bg-cyan-600/20 transition duration-300 border border-cyan-600/10 dark:border-white/10"
              >
                <div className="text-2xl mb-2">
                  <FaShip className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">Getting There</span>
              </a>
              <a
                href="#beaches"
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-cyan-600/5 dark:bg-cyan-600/10 text-cyan-600 dark:text-cyclades-turquoise rounded-lg hover:bg-cyan-600/10 dark:hover:bg-cyan-600/20 transition duration-300 border border-cyan-600/10 dark:border-white/10"
              >
                <div className="text-2xl mb-2">
                  <FaUmbrellaBeach className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">Beaches</span>
              </a>
              <a
                href="#things-to-do"
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-cyan-600/5 dark:bg-cyan-600/10 text-cyan-600 dark:text-cyclades-turquoise rounded-lg hover:bg-cyan-600/10 dark:hover:bg-cyan-600/20 transition duration-300 border border-cyan-600/10 dark:border-white/10"
              >
                <div className="text-2xl mb-2">
                  <FaHiking className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">Things to Do</span>
              </a>
              <a
                href="#dining"
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-cyan-600/5 dark:bg-cyan-600/10 text-cyan-600 dark:text-cyclades-turquoise rounded-lg hover:bg-cyan-600/10 dark:hover:bg-cyan-600/20 transition duration-300 border border-cyan-600/10 dark:border-white/10"
              >
                <div className="text-2xl mb-2">
                  <FaUtensils className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">Food & Dining</span>
              </a>
              <a
                href="#when-to-visit"
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-cyan-600/5 dark:bg-cyan-600/10 text-cyan-600 dark:text-cyclades-turquoise rounded-lg hover:bg-cyan-600/10 dark:hover:bg-cyan-600/20 transition duration-300 border border-cyan-600/10 dark:border-white/10"
              >
                <div className="text-2xl mb-2">
                  <FaCalendarAlt className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">When to Visit</span>
              </a>
              <a
                href="#faq"
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-cyan-600/5 dark:bg-cyan-600/10 text-cyan-600 dark:text-cyclades-turquoise rounded-lg hover:bg-cyan-600/10 dark:hover:bg-cyan-600/20 transition duration-300 border border-cyan-600/10 dark:border-white/10"
              >
                <div className="text-2xl mb-2">
                  <FaRoute className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">FAQ</span>
              </a>
            </div>
          </div>

          {/* Getting There Section */}
          <section id="getting-there" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">How to Get to Kimolos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaShip className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mr-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">From Milos (Quickest)</h3>
                </div>
                <p className="text-gray-600 dark:text-white/60 mb-4">
                  The fastest way to reach Kimolos is from neighboring Milos. The ferry from Pollonia port
                  takes only 25-50 minutes to Psathi, Kimolos's main port.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-white/60">
                  <li>• <strong>Duration:</strong> 25-50 minutes</li>
                  <li>• <strong>Frequency:</strong> 3-6 daily crossings (summer)</li>
                  <li>• <strong>Cost:</strong> €4.50-€6 per adult</li>
                  <li>• <strong>With car:</strong> €63+ per vehicle</li>
                </ul>
                <Link
                  to="/ferry-tickets"
                  className="inline-flex items-center mt-4 text-cyan-600 dark:text-cyclades-turquoise hover:underline font-medium"
                >
                  Book Milos-Kimolos Ferry →
                </Link>
              </div>
              <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaShip className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mr-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">From Athens (Piraeus)</h3>
                </div>
                <p className="text-gray-600 dark:text-white/60 mb-4">
                  Direct ferries connect Athens (Piraeus port) to Kimolos. The journey is longer but avoids
                  the need to transfer through Milos.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-white/60">
                  <li>• <strong>Duration:</strong> 5-7 hours</li>
                  <li>• <strong>Frequency:</strong> 2-3 ferries per week</li>
                  <li>• <strong>Cost:</strong> €42-130+ per adult</li>
                  <li>• <strong>Operators:</strong> Aegean Sea Lines, SeaJets, Zante Ferries</li>
                </ul>
                <Link
                  to="/ferry-tickets"
                  className="inline-flex items-center mt-4 text-cyan-600 dark:text-cyclades-turquoise hover:underline font-medium"
                >
                  Search All Ferry Routes →
                </Link>
              </div>
            </div>
          </section>

          {/* When to Visit Section */}
          <section id="when-to-visit" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">When to Visit Kimolos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaSun className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mb-4" />
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Peak Season</h3>
                <p className="text-gray-600 dark:text-white/60">Late June - Early September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Temperature: 28-32°C</li>
                  <li>• Perfect beach weather</li>
                  <li>• All facilities open</li>
                  <li>• Book accommodation early</li>
                  <li>• Higher prices</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border-2 border-cyan-500">
                <FaCalendarAlt className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mb-4" />
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Best Time ★</h3>
                <p className="text-gray-600 dark:text-white/60">May-June & September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Temperature: 22-27°C</li>
                  <li>• Warm sea for swimming</li>
                  <li>• Fewer tourists</li>
                  <li>• Better prices</li>
                  <li>• Perfect balance</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaCameraRetro className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mb-4" />
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Shoulder Season</h3>
                <p className="text-gray-600 dark:text-white/60">April & October</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Cool mornings</li>
                  <li>• Minimal crowds</li>
                  <li>• Great for hiking</li>
                  <li>• Some places closed</li>
                  <li>• Photography perfect</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaWater className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mb-4" />
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Off Season</h3>
                <p className="text-gray-600 dark:text-white/60">November - March</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Temperature: 10-18°C</li>
                  <li>• Most facilities closed</li>
                  <li>• Limited ferry service</li>
                  <li>• Authentic local life</li>
                  <li>• Not for beach lovers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Things to Do Section */}
          <section id="things-to-do" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Things to Do in Kimolos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/kimolos.jpg"
                  alt="Chorio Village Kimolos"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Explore Chorio</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    The picturesque capital features whitewashed buildings, blue doors, narrow cobblestone
                    streets, and bougainvillea-draped courtyards. Visit the Archaeological Museum and
                    Folklore & Maritime Museum.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                    <li>• Medieval Kastro (fortification)</li>
                    <li>• Traditional kafeneio (coffee shops)</li>
                    <li>• Sunset views from the windmills</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/kimolos.jpg"
                  alt="Skiadi Rock Kimolos"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Hike to Skiadi Rock</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    A UNESCO-recognized giant mushroom-shaped rock formation created by thousands of years
                    of Meltemi wind erosion. One of the Mediterranean's most unique geological wonders.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                    <li>• Short route: 35-40 min from Lebounia</li>
                    <li>• Long route: 60-90 min from Agios Minas</li>
                    <li>• Best at sunset</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/kimolos.jpg"
                  alt="Polyaigos Island"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Boat Trip to Polyaigos</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    The largest uninhabited island in the Mediterranean Sea. Take a half-day or full-day
                    boat excursion to discover pristine beaches, sea caves, and monk seal colonies.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                    <li>• Ancient 5th-century BC shipwreck</li>
                    <li>• Crystal-clear swimming spots</li>
                    <li>• Untouched natural beauty</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/kimolos.jpg"
                  alt="Ellinika Underwater City"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Snorkel at Ellinika</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    A Hellenistic-era city now submerged underwater. Snorkel or scuba dive above ancient
                    houses, wells, and Mycenaean defensive walls—an unforgettable underwater archaeology experience.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                    <li>• Visible ancient structures</li>
                    <li>• Great for snorkeling</li>
                    <li>• Historical significance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Best Beaches in Kimolos</h2>
            <p className="text-gray-600 dark:text-white/70 mb-8">
              Kimolos has over 15 beaches, from organized sandy stretches to secluded coves.
              Here are the top beaches you shouldn't miss:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/kimolos.jpg"
                  alt="Prassa Beach"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Prassa Beach</h3>
                    <span className="bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs px-2 py-1 rounded">★ Top Pick</span>
                  </div>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    The crown jewel of Kimolos. White sand, turquoise waters, sea caves, and a beach bar.
                    Often rated among the best in the Cyclades.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><strong>Best for:</strong> Photography, swimming, full-day relaxation</li>
                    <li><strong>Facilities:</strong> Beach bar, sunbeds</li>
                    <li><strong>Tip:</strong> Arrive early (7-9 AM) for parking</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/kimolos.jpg"
                  alt="Bonatsa Beach"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Bonatsa Beach</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    A large sandy beach with shallow, calm waters—perfect for families with children.
                    Wind protected and home to the famous Sardis restaurant.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><strong>Best for:</strong> Families, children, calm swimming</li>
                    <li><strong>Facilities:</strong> Restaurant, sunbeds</li>
                    <li><strong>Try:</strong> Lobster pasta at Sardis</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/kimolos.jpg"
                  alt="Mavrospilia Beach"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Mavrospilia</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    A unique beach with white rock formations and the best sunset views on the island.
                    Sandy beach perfect for evening visits.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><strong>Best for:</strong> Sunset watching, photography</li>
                    <li><strong>Tip:</strong> Arrive 1-2 hours before sunset</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-cyan-600/5 dark:bg-cyan-600/10 p-6 rounded-xl border border-cyan-600/10 dark:border-white/10">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">More Beaches to Explore</h4>
              <p className="text-gray-600 dark:text-white/70">
                Aliki, Goupa, Karras, Rema (Elephant Beach), Ellinika, Agioklima, Gerakia Cave, Klima, Monastiria, Kalamitsi, and Soufi.
              </p>
            </div>
          </section>

          {/* Dining Section */}
          <section id="dining" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Where to Eat in Kimolos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaUtensils className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mr-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Local Specialties</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Ladenia</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      Traditional flatbread topped with tomatoes, onions, and oregano.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Tyrenia</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      Savory cheese pie made with local Manoura cheese.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Manoura Cheese</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      A unique cheese found only in Kimolos and Milos.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Top Restaurants</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-100 dark:border-white/10 pb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">Sardis</h4>
                    <p className="text-sm text-cyan-600 dark:text-cyclades-turquoise">Bonatsa Beach</p>
                    <p className="text-sm text-gray-600 dark:text-white/60">Famous for fresh fish and lobster pasta</p>
                  </div>
                  <div className="border-b border-gray-100 dark:border-white/10 pb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">Kali Kardia "Bohoris"</h4>
                    <p className="text-sm text-cyan-600 dark:text-cyclades-turquoise">Chorio</p>
                    <p className="text-sm text-gray-600 dark:text-white/60">Local favorite for goat stew and meatballs</p>
                  </div>
                  <div className="border-b border-gray-100 dark:border-white/10 pb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">To Kyma</h4>
                    <p className="text-sm text-cyan-600 dark:text-cyclades-turquoise">Psathi Port</p>
                    <p className="text-sm text-gray-600 dark:text-white/60">Gourmet seafood with waterfront views</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Prassonissi</h4>
                    <p className="text-sm text-cyan-600 dark:text-cyclades-turquoise">Prassa Beach</p>
                    <p className="text-sm text-gray-600 dark:text-white/60">Grouper carpaccio, seafood risotto</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {kimolosFaqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-white/60">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Discover Kimolos?</h2>
                <p className="text-lg text-white/90 mb-8">
                  Start planning your escape to this hidden gem of the Cyclades. Book your ferry,
                  find authentic accommodation, and experience real Greek island life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/ferry-tickets"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-cyan-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FaShip className="mr-2" /> Book Ferry Tickets
                  </Link>
                  <Link
                    to="/hotels"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition-colors"
                  >
                    Find Accommodation
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default KimolosGuide;
