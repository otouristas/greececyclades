import React from 'react';
import {
  FaShip,
  FaMapMarkedAlt,
  FaUmbrellaBeach,
  FaRoute,
  FaUtensils,
  FaCameraRetro,
  FaSun,
  FaCalendarAlt,
  FaMusic,
  FaGlassCheers,
  FaHistory,
  FaLandmark
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';
import RelatedDestinationsSection from '../components/seo/RelatedDestinationsSection';
import { siteLinks } from '../data/siteLinks';

const MykonosGuide: React.FC = () => {
  const mykonos = islandGuides.find(island => island.id === 'mykonos');

  if (!mykonos) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Mykonos Travel Guide 2026 - Best Beaches, Nightlife & Things to Do",
    description: "Plan your perfect Mykonos vacation with our comprehensive 2026 travel guide. From pristine beaches and vibrant nightlife to traditional villages and luxury experiences.",
    keywords: [
      'Mykonos travel guide',
      'Mykonos beaches',
      'Mykonos nightlife',
      'Little Venice Mykonos',
      'Mykonos windmills',
      'Greek islands',
      'luxury hotels Mykonos',
      'beach clubs Mykonos',
      'Mykonos restaurants',
      'best time to visit Mykonos'
    ],
    ogImage: mykonos.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/mykonos/little-venice.jpg",
      alt: "Little Venice",
      caption: "The picturesque Little Venice quarter at sunset"
    },
    {
      src: "/images/islands/mykonos/windmills.jpg",
      alt: "Mykonos Windmills",
      caption: "The iconic windmills overlooking Mykonos Town"
    },
    {
      src: "/images/islands/mykonos/paradise-beach.jpg",
      alt: "Paradise Beach",
      caption: "The famous Paradise Beach with its crystal-clear waters"
    },
    {
      src: "/images/islands/mykonos/chora-streets.jpg",
      alt: "Mykonos Town Streets",
      caption: "The charming narrow streets of Mykonos Town"
    },
    {
      src: "/images/islands/mykonos/beach-club.jpg",
      alt: "Beach Club",
      caption: "Luxury beach clubs with sunbeds and umbrellas"
    },
    {
      src: "/images/islands/mykonos/panagia-paraportiani.jpg",
      alt: "Panagia Paraportiani Church",
      caption: "The iconic whitewashed church of Panagia Paraportiani"
    }
  ];

  return (
    <>
      <SEO {...seoData} 
        jsonLD={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          "name": "Mykonos Island, Greece",
          "description": "Welcome to Mykonos, Greece's most glamorous island destination. Known for its vibrant nightlife, pristine beaches and cosmopolitan atmosphere, Mykonos perfectly blends traditional Cycladic charm with modern luxury and excitement.",
          "url": "https://greececyclades.com/islands/mykonos",
          "touristType": {
            "@type": "Audience",
            "audienceType": [
              "Beach tourism",
              "Nightlife tourism",
              "Luxury tourism",
              "Cultural tourism"
            ]
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 37.4467,
            "longitude": 25.3289
          },
          "includesAttraction": [
            {
              "@type": "TouristAttraction",
              "name": "Little Venice",
              "description": "The picturesque Little Venice quarter at sunset with colorful buildings right at the water's edge.",
              "image": "https://greececyclades.com/images/islands/mykonos/little-venice.jpg"
            },
            {
              "@type": "TouristAttraction",
              "name": "Mykonos Windmills",
              "description": "The iconic windmills overlooking Mykonos Town, a symbol of the island's rich history.",
              "image": "https://greececyclades.com/images/islands/mykonos/windmills.jpg"
            },
            {
              "@type": "TouristAttraction",
              "name": "Paradise Beach",
              "description": "The famous Paradise Beach with its crystal-clear waters and vibrant beach clubs.",
              "image": "https://greececyclades.com/images/islands/mykonos/paradise-beach.jpg"
            },
            {
              "@type": "TouristAttraction",
              "name": "Panagia Paraportiani Church",
              "description": "The iconic whitewashed church complex, one of the most photographed churches in the world.",
              "image": "https://greececyclades.com/images/islands/mykonos/panagia-paraportiani.jpg"
            }
          ],
          "event": [
            {
              "@type": "Event",
              "name": "XLSIOR Festival",
              "description": "International music festival that kicks off the party season in May.",
              "startDate": "2026-05-01",
              "endDate": "2026-05-10",
              "location": "Mykonos Island, Greece"
            },
            {
              "@type": "Event",
              "name": "Mykonos Summer Festival",
              "description": "Cultural events throughout the summer season featuring music, dance, and art.",
              "startDate": "2026-06-01",
              "endDate": "2026-08-31",
              "location": "Various venues across Mykonos"
            }
          ],
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "name": "Best Time to Visit",
            "description": "The best time to visit Mykonos is during the shoulder seasons (May-June, September) when the weather is pleasant and there are fewer crowds.",
            "validFrom": "2026-05-01",
            "validThrough": "2026-09-30"
          }
        }}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        <IslandGuideHero {...mykonos} />

        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Mykonos</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Mykonos, Greece's most glamorous island destination. Known for its vibrant nightlife,
                pristine beaches and cosmopolitan atmosphere, Mykonos perfectly blends traditional Cycladic charm
                with modern luxury and excitement.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the iconic windmills and the charming Little Venice to world-famous beach clubs and
                gourmet restaurants, Mykonos offers an unforgettable experience for luxury seekers, party enthusiasts,
                and culture lovers alike. The island's unique energy, stunning landscapes, and celebrity appeal have
                earned it the nickname "The Island of the Winds."
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/islands/mykonos/aerial-view.jpg"
                  alt="Mykonos Aerial View"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/images/islands/mykonos/little-venice-detail.jpg"
                    alt="Little Venice Detail"
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
              <a 
                href="#villages" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 dark:bg-cyan-600/10 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="text-2xl mb-2">
                  <FaMapMarkedAlt className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">Villages</span>
              </a>
              <a 
                href="#beaches" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 dark:bg-cyan-600/10 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="text-2xl mb-2">
                  <FaUmbrellaBeach className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">Beaches</span>
              </a>
              <a 
                href="#dining" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 dark:bg-cyan-600/10 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="text-2xl mb-2">
                  <FaUtensils className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">Local Cuisine</span>
              </a>
              <a 
                href="#nightlife" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 dark:bg-cyan-600/10 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="text-2xl mb-2">
                  <FaGlassCheers className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">Nightlife</span>
              </a>
              <a 
                href="#activities" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 dark:bg-cyan-600/10 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="text-2xl mb-2">
                  <FaRoute className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">Activities</span>
              </a>
              <a 
                href="#when-to-visit" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 dark:bg-cyan-600/10 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="text-2xl mb-2">
                  <FaCalendarAlt className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">When to Visit</span>
              </a>
            </div>
          </div>

          {/* History & Culture Section - NEW */}
          <section id="history" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">History & Culture</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaHistory className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-2xl font-semibold">Rich Heritage</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Mykonos has a rich history dating back to ancient times. According to mythology, the island was named after
                  its first ruler Mykonos, a descendant of the god Apollo. The island was also said to be the location of the
                  great battle between Zeus and the Titans, and the large rocks scattered around the island were believed to be
                  the petrified corpses of the Titans.
                </p>
                <p className="text-gray-600 mb-4">
                  In the 1950s, Mykonos began to emerge as a popular destination for artists, intellectuals, and the wealthy.
                  The island's transformation into a cosmopolitan hotspot accelerated in the 1970s when it became a favorite
                  among the international jet set. Today, Mykonos is known worldwide for its vibrant nightlife, luxury
                  accommodations, and celebrity visitors.
                </p>
                <p className="text-gray-600 dark:text-white/60">
                  Despite its modern reputation, Mykonos maintains strong ties to its traditional past. The island's architecture,
                  with its iconic whitewashed buildings, narrow streets, and blue-domed churches, reflects the authentic Cycladic
                  style that has been preserved for centuries.
                </p>
              </div>
              <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaLandmark className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-2xl font-semibold">Cultural Highlights</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  The nearby island of Delos, accessible by a short boat ride from Mykonos, is one of the most important
                  archaeological sites in Greece. As the mythological birthplace of Apollo and Artemis, Delos was a major
                  religious center in ancient times. Today, visitors can explore the extensive ruins, including the Terrace
                  of the Lions and the House of Dionysus.
                </p>
                <p className="text-gray-600 mb-4">
                  Mykonos Town (Chora) is home to several museums that showcase the island's cultural heritage. The Archaeological
                  Museum houses artifacts from Delos, while the Folklore Museum offers insights into traditional Mykonian life
                  through exhibits of furniture, photographs, and handicrafts.
                </p>
                <p className="text-gray-600 dark:text-white/60">
                  The island celebrates several religious festivals throughout the year, with the most important being the
                  Feast of the Virgin Mary on August 15th. These events feature traditional music, dance, and food, providing
                  visitors with an authentic glimpse into local customs and traditions.
                </p>
              </div>
            </div>
          </section>

          {/* When to Visit Section - ENHANCED */}
          <section id="when-to-visit" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">When to Visit Mykonos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaSun className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Peak Season</h3>
                <p className="text-gray-600 dark:text-white/60">July to August</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Hot weather (28-32°C)</li>
                  <li>• Vibrant atmosphere</li>
                  <li>• Best nightlife</li>
                  <li>• All venues open</li>
                  <li>• Highest prices</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaCalendarAlt className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Shoulder Season</h3>
                <p className="text-gray-600 dark:text-white/60">May-June, September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Pleasant weather (22-28°C)</li>
                  <li>• Fewer crowds</li>
                  <li>• Better rates</li>
                  <li>• Most venues open</li>
                  <li>• Good swimming conditions</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaMusic className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Party Season</h3>
                <p className="text-gray-600 dark:text-white/60">June to September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Beach parties daily</li>
                  <li>• International DJs</li>
                  <li>• Club events</li>
                  <li>• Celebrity sightings</li>
                  <li>• Vibrant atmosphere</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaCameraRetro className="text-3xl text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Best for Photos</h3>
                <p className="text-gray-600 dark:text-white/60">April-May, September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Golden light</li>
                  <li>• Clear skies</li>
                  <li>• Less crowded landmarks</li>
                  <li>• Blooming wildflowers (spring)</li>
                  <li>• Perfect sunset conditions</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Seasonal Highlights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-800 dark:text-cyclades-turquoise">Spring (April-May)</h5>
                  <p className="text-gray-700 text-sm">
                    Mild temperatures, blooming wildflowers, and fewer tourists make this an ideal time for
                    exploring the island. The XLSIOR Festival in May kicks off the party season.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 dark:text-cyclades-turquoise">Summer (June-August)</h5>
                  <p className="text-gray-700 text-sm">
                    The height of the season brings hot weather, packed beaches, and world-class DJs at beach clubs.
                    The Mykonos Summer Festival features cultural events throughout the season.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 dark:text-cyclades-turquoise">Autumn (September-October)</h5>
                  <p className="text-gray-700 text-sm">
                    Warm sea temperatures, fewer crowds, and more moderate prices make this a perfect time to visit.
                    The Harvest Festival in September celebrates local wine and produce.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 dark:text-cyclades-turquoise">Winter (November-March)</h5>
                  <p className="text-gray-700 text-sm">
                    The quiet season offers a glimpse of authentic local life. Many businesses close, but you'll
                    experience a more traditional side of the island with mild, though sometimes rainy weather.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Must-Visit Villages Section - ENHANCED */}
          <section id="villages" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Must-Visit Villages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/mykonos/chora-streets.jpg" 
                  alt="Mykonos Town (Chora)" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Mykonos Town (Chora)</h3>
                  <p className="text-gray-600 mb-4">
                    The island's capital is a maze of narrow whitewashed streets, boutique shops, 
                    restaurants, and bars. Home to the iconic windmills and Little Venice.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                    <li>• Iconic windmills overlooking the town</li>
                    <li>• Little Venice with buildings right on the water</li>
                    <li>• Panagia Paraportiani Church complex</li>
                    <li>• Vibrant shopping and dining scene</li>
                    <li>• Matoyianni Street for boutique shopping</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/mykonos/ano-mera.jpg" 
                  alt="Ano Mera Village" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Ano Mera</h3>
                  <p className="text-gray-600 mb-4">
                    The second largest settlement on the island offers a more authentic and traditional 
                    side of Mykonos, centered around a beautiful monastery.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                    <li>• Panagia Tourliani Monastery</li>
                    <li>• Traditional tavernas around the square</li>
                    <li>• Local farmers market</li>
                    <li>• Paleokastro Monastery ruins</li>
                    <li>• Authentic Greek village atmosphere</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/mykonos/little-venice.jpg" 
                  alt="Little Venice" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Little Venice</h3>
                  <p className="text-gray-600 mb-4">
                    A picturesque neighborhood where colorful houses with balconies hang over the sea, 
                    creating one of the most romantic spots on the island.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                    <li>• Stunning sunset views</li>
                    <li>• Waterfront cocktail bars</li>
                    <li>• Former merchants' houses from the 18th century</li>
                    <li>• Art galleries and boutiques</li>
                    <li>• Perfect photography spot</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/mykonos/ornos-beach.jpg" 
                  alt="Ornos Village" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Ornos</h3>
                  <p className="text-gray-600 mb-4">
                    A family-friendly coastal village with a beautiful sheltered beach, upscale 
                    restaurants, and a more relaxed atmosphere than Mykonos Town.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                    <li>• Protected bay with calm waters</li>
                    <li>• Luxury yacht marina</li>
                    <li>• Seafood restaurants</li>
                    <li>• Water taxi connections to other beaches</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/mykonos/agios-stefanos.jpg" 
                  alt="Agios Stefanos Village" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Agios Stefanos</h3>
                  <p className="text-gray-600 mb-4">
                    A charming coastal village close to the new port with a sandy beach, 
                    tavernas, and accommodations with sunset views.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                    <li>• Sandy beach with shallow waters</li>
                    <li>• Proximity to the new port</li>
                    <li>• Relaxed atmosphere</li>
                    <li>• Family-friendly amenities</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Beaches Section - NEW */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Famous Beaches</h2>
            <p className="text-gray-700 mb-8">
              Mykonos is renowned for its stunning beaches, each with its own unique character and atmosphere. 
              From cosmopolitan party beaches to secluded coves, the island offers something for every type of traveler.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/mykonos/paradise-beach.jpg" 
                  alt="Paradise Beach" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Paradise Beach</h3>
                  <div className="flex items-center mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs mr-2">Party Scene</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">Golden Sand</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    One of the most famous party beaches in the world, with beach clubs pumping music 
                    from afternoon to dawn. Popular with a younger crowd seeking vibrant nightlife.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><span className="font-medium">Best for:</span> Partying, meeting people, water sports</li>
                    <li><span className="font-medium">Facilities:</span> Beach clubs, bars, restaurants, water sports</li>
                    <li><span className="font-medium">Getting there:</span> Bus from Mykonos Town, water taxi</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/mykonos/super-paradise.jpg" 
                  alt="Super Paradise Beach" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Super Paradise</h3>
                  <div className="flex items-center mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs mr-2">LGBTQ+ Friendly</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">Golden Sand</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Known for its crystal-clear waters, vibrant atmosphere, and inclusive environment. 
                    Home to the famous Jackie O' Beach Club and other high-energy venues.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><span className="font-medium">Best for:</span> LGBTQ+ scene, dancing, swimming</li>
                    <li><span className="font-medium">Facilities:</span> Beach clubs, restaurants, bars, sunbeds</li>
                    <li><span className="font-medium">Getting there:</span> Shuttle from Mykonos Town, water taxi</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/mykonos/psarou-beach.jpg" 
                  alt="Psarou Beach" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Psarou</h3>
                  <div className="flex items-center mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs mr-2">Luxury</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">Fine Sand</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    The most exclusive beach on the island, frequented by celebrities and the jet set. 
                    Home to the famous Nammos beach club and restaurant.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><span className="font-medium">Best for:</span> Luxury experience, people watching, fine dining</li>
                    <li><span className="font-medium">Facilities:</span> High-end beach club, gourmet restaurant, boutiques</li>
                    <li><span className="font-medium">Getting there:</span> Taxi, bus from Mykonos Town</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/mykonos/elia-beach.jpg" 
                  alt="Elia Beach" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Elia</h3>
                  <div className="flex items-center mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs mr-2">Relaxed</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">Golden Sand</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    The longest sandy beach on Mykonos, offering a more relaxed atmosphere while still 
                    providing amenities and water sports. Popular with a diverse crowd.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><span className="font-medium">Best for:</span> Relaxation, water sports, swimming</li>
                    <li><span className="font-medium">Facilities:</span> Beach bars, restaurants, water sports, sunbeds</li>
                    <li><span className="font-medium">Getting there:</span> Bus from Mykonos Town, water taxi</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/mykonos/ornos-beach.jpg" 
                  alt="Ornos Beach" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Ornos</h3>
                  <div className="flex items-center mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs mr-2">Family-Friendly</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">Golden Sand</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    A sheltered bay with calm waters, making it ideal for families with children. 
                    Surrounded by restaurants and accommodations with a cosmopolitan yet relaxed vibe.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><span className="font-medium">Best for:</span> Families, swimming, dining</li>
                    <li><span className="font-medium">Facilities:</span> Restaurants, water sports, sunbeds, shops</li>
                    <li><span className="font-medium">Getting there:</span> Regular bus service from Mykonos Town</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/mykonos/agios-stefanos.jpg" 
                  alt="Agios Stefanos Beach" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Agios Stefanos</h3>
                  <div className="flex items-center mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs mr-2">Convenient</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">Sandy</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Located close to the new port, this beach offers convenience and beautiful sunset views. 
                    A good option for those arriving or departing by ferry.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><span className="font-medium">Best for:</span> Convenience, sunset views, relaxation</li>
                    <li><span className="font-medium">Facilities:</span> Tavernas, sunbeds, umbrellas</li>
                    <li><span className="font-medium">Getting there:</span> Short bus ride from Mykonos Town</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Local Cuisine Section - NEW */}
          <section id="dining" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Local Cuisine & Dining</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaUtensils className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-2xl font-semibold">Traditional Mykonian Dishes</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Mykonos offers a blend of traditional Cycladic cuisine and international flavors. The island's 
                  culinary scene ranges from simple tavernas serving local specialties to world-class restaurants 
                  offering innovative Mediterranean cuisine.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Kopanisti</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      A spicy, peppery cheese with a strong flavor and creamy texture. This PDO-protected 
                      cheese is a Mykonian specialty, often served as a meze with bread or in salads.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Louza</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      A local cured meat made from pork fillet, marinated in spices and sun-dried. 
                      Similar to Italian prosciutto but with a distinct Mykonian flavor profile.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Kremidopita</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      A traditional onion pie made with local cheese, fresh herbs, and flaky pastry. 
                      A savory treat that showcases the island's simple yet flavorful cooking style.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Amygdalota</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      Almond cookies that are chewy on the inside and slightly crisp on the outside. 
                      These gluten-free treats are a perfect sweet ending to a Mykonian meal.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaGlassCheers className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-2xl font-semibold">Dining Experiences</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Mykonos offers diverse dining experiences, from casual beachfront tavernas to sophisticated 
                  restaurants with stunning views. The island's cosmopolitan character is reflected in its 
                  varied culinary scene, which caters to all tastes and budgets.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Seaside Dining</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      Many restaurants offer tables right on the sand or overlooking the sea. These venues 
                      combine fresh seafood with spectacular views, especially at sunset.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Little Venice Restaurants</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      Dine with waves occasionally splashing nearby at the romantic waterfront restaurants 
                      in Little Venice. Reservations are essential for the best tables at sunset.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Chora Fine Dining</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      Mykonos Town offers sophisticated dining options with creative chefs blending 
                      local ingredients with international techniques. Many restaurants feature rooftop terraces.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/mykonos/seafood.jpg" 
                  alt="Fresh Seafood" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Fresh Seafood</h3>
                  <p className="text-gray-600 mb-4">
                    As an island, Mykonos offers exceptional seafood caught daily by local fishermen. 
                    From grilled octopus to sea bass cooked in salt crust, seafood lovers will be delighted.
                  </p>
                  <p className="text-sm text-cyan-600 dark:text-cyclades-turquoise">Recommended: Kiki's Tavern, Sea Satin, Hippie Fish</p>
                </div>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/mykonos/taverna.jpg" 
                  alt="Traditional Taverna" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Traditional Tavernas</h3>
                  <p className="text-gray-600 mb-4">
                    For authentic Mykonian cuisine, head to family-run tavernas in Ano Mera or 
                    the backstreets of Mykonos Town, away from the tourist crowds.
                  </p>
                  <p className="text-sm text-cyan-600 dark:text-cyclades-turquoise">Recommended: Fokos Taverna, Nikolas Taverna, Joanna's Nikos Place</p>
                </div>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/mykonos/fine-dining.jpg" 
                  alt="Fine Dining" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Luxury Dining</h3>
                  <p className="text-gray-600 mb-4">
                    Experience world-class cuisine at Mykonos' upscale restaurants, many helmed by 
                    internationally acclaimed chefs and offering spectacular settings.
                  </p>
                  <p className="text-sm text-cyan-600 dark:text-cyclades-turquoise">Recommended: Interni, Nobu Matsuhisa, Scorpios</p>
                </div>
              </div>
            </div>
          </section>

          {/* Photo Gallery - NEW */}
          <section id="photos" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Mykonos Photo Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a 
                href="/photos/mykonos" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaCameraRetro className="h-5 w-5" />
                View Full Gallery
              </a>
            </div>
          </section>

          {/* Activities Section - ENHANCED */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Top Things to Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaGlassCheers className="text-2xl text-blue-500 mr-3" />
                  <h3 className="font-semibold text-xl">Nightlife & Entertainment</h3>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-white/60">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Beach Clubs:</span> Experience day-to-night parties at Paradise and Super Paradise</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Cavo Paradiso:</span> Dance until sunrise at this iconic cliffside club</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Little Venice Bars:</span> Enjoy cocktails with sunset views</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Scandinavian Bar:</span> Join the lively atmosphere in Mykonos Town</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Scorpios:</span> Experience bohemian luxury and sunset rituals</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaShip className="text-2xl text-blue-500 mr-3" />
                  <h3 className="font-semibold text-xl">Water Activities</h3>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-white/60">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Delos Day Trip:</span> Visit the sacred archaeological island</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Yacht Charter:</span> Sail around the island's hidden coves</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Water Sports:</span> Try jet skiing, wakeboarding, or parasailing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Snorkeling:</span> Explore underwater life at Psarou or Paradise</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Sunset Cruise:</span> Experience magical Aegean sunsets from the water</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaMapMarkedAlt className="text-2xl text-blue-500 mr-3" />
                  <h3 className="font-semibold text-xl">Cultural Experiences</h3>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-white/60">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Windmills Tour:</span> Visit the iconic symbols of Mykonos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Paraportiani Church:</span> Explore this architectural marvel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Folklore Museum:</span> Learn about traditional island life</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Cooking Classes:</span> Master Greek cuisine with local chefs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><span className="font-medium">Photography Tours:</span> Capture the island's most photogenic spots</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Travel Tips Section - ENHANCED */}
          <section id="tips" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Essential Travel Tips</h2>
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Getting Around</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Rent an ATV or scooter</span> for flexibility and to navigate narrow roads</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Public buses</span> connect Mykonos Town to major beaches and villages</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Water taxis</span> link popular beaches during summer months</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Taxis are limited</span> and can be hard to find during peak season</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Pre-book airport transfers</span> to avoid long waits</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Money Saving Tips</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Book accommodations early</span>, especially for July-August</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Visit in shoulder season</span> (May-June or September) for better rates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Stay in Ornos or Platis Gialos</span> instead of Mykonos Town for better value</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Eat at local tavernas</span> away from tourist hotspots</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Reserve beach clubs in advance</span> to avoid premium walk-in rates</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Practical Information</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Currency:</span> Euro (€) - ATMs widely available in tourist areas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Language:</span> Greek, but English is widely spoken in tourist areas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Electricity:</span> 230V, European-style plugs (Type C and F)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Tipping:</span> 5-10% in restaurants is appreciated but not mandatory</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Water:</span> Bottled water recommended for drinking</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Health & Safety</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Sunscreen:</span> Essential - the Mediterranean sun is intense</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Medical facilities:</span> Mykonos Health Center for emergencies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Road safety:</span> Drive cautiously, especially on narrow roads</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Valuables:</span> Use hotel safes and be aware of belongings in crowded areas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span><span className="font-medium">Emergency number:</span> 112 (European emergency number)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md overflow-hidden mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Experience Mykonos?</h2>
                <p className="text-lg mb-6">
                  Book your accommodations, tours, and activities for an unforgettable Greek island getaway.
                  Mykonos offers world-famous beaches, vibrant nightlife, and the perfect blend of luxury and traditional Cycladic charm.
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
                  src="/images/islands/mykonos/little-venice.jpg" 
                  alt="Mykonos Island View" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg">
                  <p className="text-blue-600 font-semibold">Best time to visit: May-October</p>
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

export default MykonosGuide;


