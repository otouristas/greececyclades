import React from 'react';
import { 
  FaUmbrellaBeach, 
  FaRoute, 
  FaWineGlass, 
  FaCameraRetro, 
  FaSun, 
  FaCalendarAlt, 
  FaUtensils, 
  FaHistory, 
  FaWater, 
  FaHiking, 
  FaMapMarkedAlt 
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';
import RelatedDestinationsSection from '../components/seo/RelatedDestinationsSection';
import { siteLinks } from '../data/siteLinks';

const SantoriniGuide: React.FC = () => {
  const santorini = islandGuides.find(island => island.id === 'santorini');

  if (!santorini) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Santorini Travel Guide 2026 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Santorini vacation with our comprehensive 2026 travel guide. Discover the best hotels, restaurants, beaches, and activities. From sunset views in Oia to wine tasting in volcanic vineyards.",
    keywords: [
      'Santorini travel guide',
      'Oia sunset',
      'Santorini hotels',
      'caldera views',
      'Greek islands',
      'Fira',
      'volcanic beaches',
      'Santorini wineries',
      'Santorini activities',
      'best time to visit Santorini'
    ],
    ogImage: santorini.image,
    ogType: 'article' as const
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/santorini/oia-sunset.jpg",
      alt: "Sunset in Oia",
      caption: "The world-famous sunset view from Oia"
    },
    {
      src: "/images/islands/santorini/red-beach.jpg",
      alt: "Red Beach",
      caption: "The dramatic Red Beach with its volcanic cliffs"
    },
    {
      src: "/images/islands/santorini/blue-domes.jpg",
      alt: "Blue Domes",
      caption: "Iconic blue domes against the Aegean Sea"
    },
    {
      src: "/images/islands/santorini/fira-view.jpg",
      alt: "Fira View",
      caption: "Panoramic view of Fira town"
    },
    {
      src: "/images/islands/santorini/vineyard.jpg",
      alt: "Santorini Vineyard",
      caption: "Unique basket-trained vines in volcanic soil"
    },
    {
      src: "/images/islands/santorini/akrotiri.jpg",
      alt: "Akrotiri Archaeological Site",
      caption: "Ancient ruins of Akrotiri, the 'Minoan Pompeii'"
    }
  ];

  return (
    <>
      <SEO {...seoData} 
        jsonLD={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          "name": "Santorini Island, Greece",
          "description": "Rising dramatically from the Aegean Sea, Santorini is a masterpiece of natural beauty and human architecture. This crescent-shaped island, born from one of history's largest volcanic eruptions, offers a spectacular blend of pristine white-washed buildings, multicolored cliffs, and the world's most breathtaking sunsets.",
          "url": "https://discovercyclades.gr/islands/santorini",
          "touristType": {
            "@type": "Audience",
            "audienceType": [
              "Romantic tourism",
              "Cultural tourism",
              "Luxury tourism",
              "Photography tourism"
            ]
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 36.3932,
            "longitude": 25.4615
          },
          "includesAttraction": [
            {
              "@type": "TouristAttraction",
              "name": "Oia Village",
              "description": "Famous for its stunning sunsets, blue-domed churches, and winding marble streets. The most photographed location in Santorini.",
              "image": "https://discovercyclades.gr/images/islands/santorini/oia-sunset.jpg"
            },
            {
              "@type": "TouristAttraction",
              "name": "Akrotiri Archaeological Site",
              "description": "Ancient ruins of Akrotiri, the 'Minoan Pompeii', preserved under layers of volcanic ash from the eruption around 1600 BC.",
              "image": "https://discovercyclades.gr/images/islands/santorini/akrotiri.jpg"
            },
            {
              "@type": "TouristAttraction",
              "name": "Red Beach",
              "description": "The dramatic Red Beach with its volcanic cliffs and distinctive red sand, surrounded by steep red cliffs.",
              "image": "https://discovercyclades.gr/images/islands/santorini/red-beach.jpg"
            },
            {
              "@type": "TouristAttraction",
              "name": "Santorini Wineries",
              "description": "Unique vineyards with basket-trained vines growing in volcanic soil, producing distinctive wines like Assyrtiko.",
              "image": "https://discovercyclades.gr/images/islands/santorini/vineyard.jpg"
            }
          ],
          "event": [
            {
              "@type": "Event",
              "name": "Santorini International Music Festival",
              "description": "Classical performances in unique venues around the island during the summer months.",
              "startDate": "2026-06-15",
              "endDate": "2026-08-15",
              "location": "Various venues across Santorini"
            },
            {
              "@type": "Event",
              "name": "Ifestia Festival",
              "description": "Annual festival in September featuring fireworks that recreate the volcanic eruption that shaped the island.",
              "startDate": "2026-09-15",
              "endDate": "2026-09-15",
              "location": "Santorini Caldera"
            }
          ],
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "name": "Best Time to Visit",
            "description": "The best time to visit Santorini is during the shoulder seasons (April-May, September-October) when the weather is mild and there are fewer crowds.",
            "validFrom": "2026-04-01",
            "validThrough": "2026-10-31"
          }
        }}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        <IslandGuideHero {...santorini} />
        
        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Santorini</h2>
              <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                Rising dramatically from the Aegean Sea, Santorini is a masterpiece of natural beauty and human architecture. 
                This crescent-shaped island, born from one of history's largest volcanic eruptions, offers a spectacular blend 
                of pristine white-washed buildings, multicolored cliffs, and the world's most breathtaking sunsets.
              </p>
              <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                Whether you're seeking a romantic getaway, a photography adventure, or a cultural journey through ancient history, 
                Santorini promises an unforgettable experience. Our comprehensive guide will help you discover the best of what 
                this magical island has to offer.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/santorini/caldera-view.jpg" 
                  alt="Santorini Caldera View" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/islands/santorini/oia-detail.jpg" 
                    alt="Oia Detail" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Navigation */}
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <a 
                href="#villages" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-cyan-600/5 dark:bg-cyan-600/10 text-cyan-600 dark:text-cyclades-turquoise rounded-lg hover:bg-cyan-600/10 dark:hover:bg-cyan-600/20 transition duration-300 border border-cyan-600/10 dark:border-white/10"
              >
                <div className="text-2xl mb-2">
                  <FaMapMarkedAlt className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">Villages</span>
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
                href="#dining" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-cyan-600/5 dark:bg-cyan-600/10 text-cyan-600 dark:text-cyclades-turquoise rounded-lg hover:bg-cyan-600/10 dark:hover:bg-cyan-600/20 transition duration-300 border border-cyan-600/10 dark:border-white/10"
              >
                <div className="text-2xl mb-2">
                  <FaUtensils className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">Local Cuisine</span>
              </a>
              <a 
                href="#activities" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-cyan-600/5 dark:bg-cyan-600/10 text-cyan-600 dark:text-cyclades-turquoise rounded-lg hover:bg-cyan-600/10 dark:hover:bg-cyan-600/20 transition duration-300 border border-cyan-600/10 dark:border-white/10"
              >
                <div className="text-2xl mb-2">
                  <FaHiking className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">Activities</span>
              </a>
              <a 
                href="#photos" 
                className="flex items-center justify-center flex-col text-center px-4 py-3 bg-cyan-600/5 dark:bg-cyan-600/10 text-cyan-600 dark:text-cyclades-turquoise rounded-lg hover:bg-cyan-600/10 dark:hover:bg-cyan-600/20 transition duration-300 border border-cyan-600/10 dark:border-white/10"
              >
                <div className="text-2xl mb-2">
                  <FaCameraRetro className="text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <span className="font-medium text-sm">Photo Gallery</span>
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
            </div>
          </div>

          {/* History & Geology Section - NEW */}
          <section id="history" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">History & Geology</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaHistory className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mr-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Ancient Origins</h3>
                </div>
                <p className="text-gray-600 dark:text-white/60 mb-4">
                  Santorini's history dates back to the 3rd millennium BC when it was home to the advanced Minoan civilization. 
                  The catastrophic volcanic eruption around 1600 BC, one of the largest in recorded history, shaped the island's 
                  current crescent form and may have contributed to the decline of the Minoan civilization on Crete.
                </p>
                <p className="text-gray-600 dark:text-white/60 mb-4">
                  The ancient city of Akrotiri, often called the "Minoan Pompeii," was preserved under layers of volcanic ash, 
                  providing a remarkable glimpse into Bronze Age life. The settlement featured multi-story buildings, advanced 
                  plumbing systems, and beautiful frescoes that can still be admired today.
                </p>
                <p className="text-gray-600 dark:text-white/60">
                  Throughout its history, Santorini has been influenced by various civilizations including the Phoenicians, 
                  Dorians, Romans, Byzantines, Venetians, and Ottomans, each leaving their mark on the island's culture and architecture.
                </p>
              </div>
              <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaWater className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mr-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Volcanic Landscape</h3>
                </div>
                <p className="text-gray-600 dark:text-white/60 mb-4">
                  Santorini sits on the Aegean Volcanic Arc, formed by the subduction of the African tectonic plate beneath the Eurasian plate. 
                  The island's distinctive caldera (volcanic crater) was created by the Minoan eruption, which caused the center of the 
                  original island to collapse into the emptied magma chamber below.
                </p>
                <p className="text-gray-600 dark:text-white/60 mb-4">
                  The dramatic cliffs of the caldera, rising up to 300 meters from the sea, showcase layers of volcanic deposits in 
                  striking colors of red, black, and white. These layers tell the story of different eruptions throughout the island's 
                  geological history.
                </p>
                <p className="text-gray-600 dark:text-white/60">
                  The volcano remains active, with the most recent significant eruption occurring in 1950. The volcanic islands of 
                  Palea Kameni and Nea Kameni in the center of the caldera continue to exhibit geothermal activity, with hot springs 
                  and gas emissions that attract visitors for their therapeutic properties.
                </p>
              </div>
            </div>
          </section>

          {/* When to Visit Section - ENHANCED */}
          <section id="when-to-visit" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">When to Visit Santorini</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaSun className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mb-4" />
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Peak Season</h3>
                <p className="text-gray-600 dark:text-white/60">June to September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Perfect weather (25-30°C)</li>
                  <li>• All attractions open</li>
                  <li>• Bustling atmosphere</li>
                  <li>• Higher prices</li>
                  <li>• Crowded popular spots</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaCalendarAlt className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mb-4" />
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Shoulder Season</h3>
                <p className="text-gray-600 dark:text-white/60">April-May, October</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Mild weather (18-25°C)</li>
                  <li>• Fewer crowds</li>
                  <li>• Better prices</li>
                  <li>• Most attractions open</li>
                  <li>• Comfortable hiking conditions</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaCameraRetro className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mb-4" />
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Best for Photos</h3>
                <p className="text-gray-600 dark:text-white/60">September-October</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Clear skies</li>
                  <li>• Perfect lighting</li>
                  <li>• Amazing sunsets</li>
                  <li>• Less crowded viewpoints</li>
                  <li>• Golden hour magic</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <FaRoute className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mb-4" />
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Best for Activities</h3>
                <p className="text-gray-600 dark:text-white/60">May-June, September</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-white/60">
                  <li>• Ideal hiking weather</li>
                  <li>• Wine harvest (September)</li>
                  <li>• Comfortable boat trips</li>
                  <li>• Swimming without crowds</li>
                  <li>• Cultural festivals</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 bg-cyan-600/5 dark:bg-cyan-600/10 p-6 rounded-xl border border-cyan-600/10 dark:border-white/10">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Seasonal Highlights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-cyan-600 dark:text-cyclades-turquoise">Spring (April-May)</h5>
                  <p className="text-gray-600 dark:text-white/70 text-sm">
                    Wildflowers bloom across the island, creating a colorful landscape. Easter celebrations 
                    offer a glimpse into local traditions with candlelit processions and special ceremonies.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-cyan-600 dark:text-cyclades-turquoise">Summer (June-August)</h5>
                  <p className="text-gray-600 dark:text-white/70 text-sm">
                    The Santorini Arts Factory hosts cultural events and exhibitions. The International Music Festival 
                    brings classical performances to unique venues around the island.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-cyan-600 dark:text-cyclades-turquoise">Autumn (September-October)</h5>
                  <p className="text-gray-600 dark:text-white/70 text-sm">
                    Wine harvest season brings special events at local wineries. The Ifestia Festival in September 
                    features fireworks that recreate the volcanic eruption.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-cyan-600 dark:text-cyclades-turquoise">Winter (November-March)</h5>
                  <p className="text-gray-600 dark:text-white/70 text-sm">
                    A quiet, authentic experience with mostly locals. Christmas and New Year celebrations offer 
                    a unique perspective on island traditions.
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
                  src="/images/islands/santorini/oia.jpg" 
                  alt="Oia Village" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Oia</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    Famous for its stunning sunsets, blue-domed churches, and winding marble streets. 
                    The most photographed location in Santorini.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                    <li>• Best sunset views at Oia Castle</li>
                    <li>• Luxury cave hotels with infinity pools</li>
                    <li>• Art galleries and boutique shops</li>
                    <li>• Fine dining with caldera views</li>
                    <li>• Naval Maritime Museum</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/santorini/fira.jpg" 
                  alt="Fira Town" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fira</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    The vibrant capital of Santorini, offering a perfect blend of shopping, 
                    dining, and nightlife with spectacular caldera views.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                    <li>• Main shopping district</li>
                    <li>• Nightlife hub with bars and clubs</li>
                    <li>• Cable car rides to the old port</li>
                    <li>• Museum of Prehistoric Thera</li>
                    <li>• Orthodox Metropolitan Cathedral</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/santorini/pyrgos.jpg" 
                  alt="Pyrgos Village" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Pyrgos</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    A well-preserved medieval village built around a Venetian castle, offering panoramic views 
                    of the entire island from its hilltop location.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                    <li>• Kasteli Castle ruins</li>
                    <li>• Traditional architecture</li>
                    <li>• Authentic tavernas</li>
                    <li>• Santos Wines nearby</li>
                    <li>• Profitis Ilias Monastery</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/santorini/imerovigli.jpg" 
                  alt="Imerovigli Village" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Imerovigli</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    Known as "The Balcony to the Aegean," this quiet village offers some of the most 
                    spectacular views of the caldera and the Aegean Sea.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                    <li>• Skaros Rock for hiking and views</li>
                    <li>• Luxury honeymoon suites</li>
                    <li>• Peaceful atmosphere</li>
                    <li>• Stunning sunset views without crowds</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/santorini/megalochori.jpg" 
                  alt="Megalochori Village" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Megalochori</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    A picturesque village with neoclassical mansions, traditional cave houses, and 
                    beautiful bell towers, surrounded by vineyards.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                    <li>• Wine tasting at local vineyards</li>
                    <li>• Bell tower square</li>
                    <li>• Traditional architecture</li>
                    <li>• Authentic local experience</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Beaches Section - NEW */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Volcanic Beaches</h2>
            <p className="text-gray-600 dark:text-white/70 mb-8">
              Santorini's beaches are unlike any others in Greece, featuring volcanic sand and pebbles in various colors, 
              dramatic cliffs, and crystal-clear waters. Each beach has its own unique character and atmosphere.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/santorini/perissa-beach.jpg" 
                  alt="Perissa Beach" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Perissa Beach</h3>
                  <div className="flex items-center mb-4">
                    <span className="px-2 py-1 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 text-cyan-600 dark:text-cyclades-turquoise rounded text-xs mr-2">Organized</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/70 rounded text-xs">Black Sand</span>
                  </div>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    A long stretch of black sand backed by Mesa Vouno mountain, offering water sports, 
                    beach bars, and tavernas. Perfect for families and those seeking amenities.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><span className="font-medium">Best for:</span> Swimming, sunbathing, water sports</li>
                    <li><span className="font-medium">Facilities:</span> Sunbeds, umbrellas, showers, restaurants</li>
                    <li><span className="font-medium">Getting there:</span> Bus from Fira, parking available</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/santorini/red-beach.jpg" 
                  alt="Red Beach" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Red Beach</h3>
                  <div className="flex items-center mb-4">
                    <span className="px-2 py-1 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 text-cyan-600 dark:text-cyclades-turquoise rounded text-xs mr-2">Partially Organized</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/70 rounded text-xs">Red Sand</span>
                  </div>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    Famous for its striking red cliffs and sand, this small beach offers a unique 
                    landscape. Access requires a short hike, and caution is advised due to occasional rockfalls.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><span className="font-medium">Best for:</span> Photography, snorkeling</li>
                    <li><span className="font-medium">Facilities:</span> Limited sunbeds, small canteen</li>
                    <li><span className="font-medium">Getting there:</span> Bus to Akrotiri, then 10-minute walk</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/santorini/kamari-beach.jpg" 
                  alt="Kamari Beach" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Kamari Beach</h3>
                  <div className="flex items-center mb-4">
                    <span className="px-2 py-1 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 text-cyan-600 dark:text-cyclades-turquoise rounded text-xs mr-2">Fully Organized</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/70 rounded text-xs">Black Sand</span>
                  </div>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    A cosmopolitan beach with a beautiful promenade lined with shops, restaurants, and bars. 
                    The dark volcanic sand and clear waters make it popular with tourists.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><span className="font-medium">Best for:</span> Swimming, dining, nightlife</li>
                    <li><span className="font-medium">Facilities:</span> Full amenities, water sports, diving center</li>
                    <li><span className="font-medium">Getting there:</span> Regular bus service from Fira</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/santorini/white-beach.jpg" 
                  alt="White Beach" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">White Beach</h3>
                  <div className="flex items-center mb-4">
                    <span className="px-2 py-1 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 text-cyan-600 dark:text-cyclades-turquoise rounded text-xs mr-2">Secluded</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/70 rounded text-xs">Dark Sand/White Cliffs</span>
                  </div>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    Named for its towering white cliffs, this small, secluded beach is accessible only by boat. 
                    Its isolation makes it perfect for those seeking tranquility.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><span className="font-medium">Best for:</span> Privacy, snorkeling, relaxation</li>
                    <li><span className="font-medium">Facilities:</span> Very limited, bring supplies</li>
                    <li><span className="font-medium">Getting there:</span> Water taxi from Red Beach or boat tour</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/santorini/vlychada-beach.jpg" 
                  alt="Vlychada Beach" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Vlychada Beach</h3>
                  <div className="flex items-center mb-4">
                    <span className="px-2 py-1 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 text-cyan-600 dark:text-cyclades-turquoise rounded text-xs mr-2">Partially Organized</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/70 rounded text-xs">Dark Sand</span>
                  </div>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    Known for its lunar-like landscape with sculpted cliffs, this quieter beach offers a more 
                    relaxed atmosphere away from the crowds.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><span className="font-medium">Best for:</span> Photography, relaxation</li>
                    <li><span className="font-medium">Facilities:</span> Some sunbeds, taverna, marina nearby</li>
                    <li><span className="font-medium">Getting there:</span> Bus from Fira, then short walk</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/santorini/monolithos-beach.jpg" 
                  alt="Monolithos Beach" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Monolithos Beach</h3>
                  <div className="flex items-center mb-4">
                    <span className="px-2 py-1 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 text-cyan-600 dark:text-cyclades-turquoise rounded text-xs mr-2">Family-Friendly</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/70 rounded text-xs">Black Sand</span>
                  </div>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    A family-friendly beach with shallow waters and a playground, making it ideal for 
                    those traveling with children. Less crowded than other beaches.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-white/60">
                    <li><span className="font-medium">Best for:</span> Families, relaxation</li>
                    <li><span className="font-medium">Facilities:</span> Sunbeds, tavernas, playground</li>
                    <li><span className="font-medium">Getting there:</span> Bus from Fira, ample parking</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Local Cuisine Section - NEW */}
          <section id="dining" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Local Cuisine & Wine</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaUtensils className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mr-4" />
                  <h3 className="text-2xl font-semibold">Traditional Santorinian Dishes</h3>
                </div>
                <p className="text-gray-600 dark:text-white/60 mb-4">
                  Santorini's cuisine is shaped by its volcanic soil, limited rainfall, and strong winds, resulting in 
                  intensely flavored local products. The island's culinary tradition focuses on simple preparations 
                  that highlight these unique ingredients.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Fava</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      A velvety yellow split pea purée, often topped with capers, onions, and olive oil. 
                      Santorini's volcanic soil gives the local fava beans a distinctive sweet flavor.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Tomatokeftedes</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      Tomato fritters made with the island's famous small, sweet tomatoes, mixed with herbs, 
                      onions, and flour, then fried to perfection.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">White Eggplant</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      A local variety that's sweeter and less bitter than purple eggplants, often grilled 
                      and served with garlic and herbs.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Chlorotyri</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      A soft, creamy goat cheese with a slightly sour taste, often used in salads or as a spread.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaWineGlass className="text-3xl text-cyan-600 dark:text-cyclades-turquoise mr-4" />
                  <h3 className="text-2xl font-semibold">Volcanic Wines</h3>
                </div>
                <p className="text-gray-600 dark:text-white/60 mb-4">
                  Santorini's winemaking tradition dates back over 3,500 years. The island's unique viticulture 
                  involves training the vines into basket-like shapes (kouloura) close to the ground to protect 
                  them from strong winds and to capture morning dew.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Assyrtiko</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      The flagship grape variety of Santorini, producing crisp, mineral-driven white wines with 
                      high acidity and citrus notes. Perfect with seafood.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Vinsanto</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      A traditional sweet wine made from sun-dried grapes, aged in oak barrels for at least 
                      24 months. Rich with flavors of dried fruits, honey, and caramel.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Nykteri</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      Traditionally harvested at night ("nykta" means night in Greek), this white wine is 
                      barrel-aged and has a fuller body than typical Assyrtiko.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/santorini/winery.jpg" 
                  alt="Santorini Winery" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Wine Tasting</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    Visit one of Santorini's many wineries for a tasting experience with caldera views. 
                    Most offer tours explaining the unique kouloura vine-training method.
                  </p>
                  <p className="text-sm text-cyan-600 dark:text-cyclades-turquoise">Recommended: Santo Wines, Venetsanos Winery, Domaine Sigalas</p>
                </div>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/santorini/taverna.jpg" 
                  alt="Traditional Taverna" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Traditional Tavernas</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    For authentic local cuisine, head to family-run tavernas in villages like Megalochori, 
                    Pyrgos, or Exo Gonia, away from tourist centers.
                  </p>
                  <p className="text-sm text-cyan-600 dark:text-cyclades-turquoise">Recommended: Metaxi Mas, To Psaraki, Raki Restaurant</p>
                </div>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/santorini/fine-dining.jpg" 
                  alt="Fine Dining" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Fine Dining</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">
                    Experience gourmet interpretations of local ingredients at Santorini's upscale 
                    restaurants, many offering spectacular sunset views.
                  </p>
                  <p className="text-sm text-cyan-600 dark:text-cyclades-turquoise">Recommended: Lycabettus, Selene, La Maison</p>
                </div>
              </div>
            </div>
          </section>

          {/* Photo Gallery - NEW */}
          <section id="photos" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Santorini Photo Gallery</h2>
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
                href="/photos/santorini" 
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
                  <FaSun className="text-2xl text-cyan-600 dark:text-cyclades-turquoise mr-3" />
                  <h3 className="font-semibold text-xl">Sunset Experiences</h3>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-white/60">
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Oia Sunset:</span> Watch from the castle ruins for the classic view</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Sunset Cruise:</span> See the caldera glow from the water</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Santo Wines:</span> Enjoy a wine tasting with sunset views</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Skaros Rock:</span> Hike for a less crowded sunset spot</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Caldera Restaurants:</span> Dine with a view of the setting sun</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaHistory className="text-2xl text-cyan-600 dark:text-cyclades-turquoise mr-3" />
                  <h3 className="font-semibold text-xl">Cultural Activities</h3>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-white/60">
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Akrotiri:</span> Explore the preserved Bronze Age settlement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Wine Museum:</span> Learn about 3,500 years of winemaking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Prehistoric Museum:</span> See artifacts from ancient Thera</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Cooking Classes:</span> Learn to make traditional dishes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Art Galleries:</span> Discover local artists in Oia</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <div className="flex items-center mb-4">
                  <FaHiking className="text-2xl text-cyan-600 dark:text-cyclades-turquoise mr-3" />
                  <h3 className="font-semibold text-xl">Adventure & Nature</h3>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-white/60">
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Volcano Hiking:</span> Visit Nea Kameni's active crater</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Hot Springs:</span> Swim in therapeutic volcanic waters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Fira to Oia Hike:</span> Walk the caldera path (3-4 hours)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Sea Kayaking:</span> Paddle along the dramatic coastline</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                    <span><span className="font-medium">Scuba Diving:</span> Explore underwater volcanic formations</span>
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
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Rent an ATV or car</span> for flexibility and to reach remote spots</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Public buses</span> connect major villages and beaches (KTEL Santorini)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Book airport transfers</span> in advance, especially during high season</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Water taxis</span> connect some beaches during summer months</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Taxis are limited</span> and can be hard to find during peak times</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Money Saving Tips</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Visit during shoulder season</span> (April-May or September-October)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Book accommodations early</span>, especially for caldera views</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Stay in Fira or Firostefani</span> instead of premium-priced Oia</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Eat at local tavernas</span> away from tourist hotspots</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Buy a bus pass</span> if you plan to use public transportation frequently</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Practical Information</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Electricity:</span> 230V, European-style plugs (Type C and F)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Currency:</span> Euro (€) - ATMs widely available in tourist areas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Language:</span> Greek, but English is widely spoken in tourist areas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Tipping:</span> 5-10% in restaurants is appreciated but not mandatory</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Water:</span> Tap water is not recommended for drinking - buy bottled</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Health & Safety</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-white/60">
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Sunscreen:</span> Essential - the Greek sun is intense, especially in summer</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Medical facilities:</span> Santorini General Hospital in Fira for emergencies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Pharmacies:</span> Well-stocked and can help with minor issues</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Walking:</span> Wear comfortable shoes - many paths are steep and uneven</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 dark:text-cyclades-turquoise mr-2">•</span>
                      <span><span className="font-medium">Emergency number:</span> 112 (European emergency number)</span>
                    </li>
                  </ul>
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

export default SantoriniGuide;



