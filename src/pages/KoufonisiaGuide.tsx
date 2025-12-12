import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaUmbrellaBeach,
  FaWineGlass,
  FaMapMarkedAlt,
  FaShip,
  FaUtensils,
  FaHistory,
  FaCalendarAlt,
  FaSun
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';

const KoufonisiaGuide: React.FC = () => {
  const { t } = useTranslation();
  const koufonisia = islandGuides.find(island => island.id === 'koufonisia');

  if (!koufonisia) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Koufonisia Travel Guide 2026 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Koufonisia vacation with our comprehensive 2026 travel guide. Discover the best beaches, accommodations, and activities on this hidden gem of the Small Cyclades.",
    keywords: [
      'Koufonisia travel guide',
      'Koufonisia beaches',
      'Small Cyclades',
      'Greek islands',
      'Pano Koufonisi',
      'Kato Koufonisi',
      'turquoise waters',
      'sea caves Koufonisia',
      'Koufonisia restaurants',
      'best time to visit Koufonisia'
    ],
    ogImage: koufonisia.image,
    ogType: 'article' as const
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/koufonisia/gallery/koufonisia-beach.jpg",
      alt: "Crystal clear turquoise waters at Pori Beach"
    },
    {
      src: "/images/islands/koufonisia/gallery/koufonisia-village.jpg",
      alt: "The charming main village of Chora"
    },
    {
      src: "/images/islands/koufonisia/gallery/koufonisia-caves.jpg",
      alt: "Impressive sea caves along the coastline"
    },
    {
      src: "/images/islands/koufonisia/gallery/koufonisia-pori.jpg",
      alt: "The stunning Pori Beach with golden sand"
    },
    {
      src: "/images/islands/koufonisia/gallery/koufonisia-italida.jpg",
      alt: "Beautiful Italida Beach with crystal waters"
    },
    {
      src: "/images/islands/koufonisia/gallery/koufonisia-food.jpg",
      alt: "Fresh seafood at a local taverna"
    },
    {
      src: "/images/islands/koufonisia/gallery/koufonisia-boat.jpg",
      alt: "Traditional fishing boats in the harbor"
    },
    {
      src: "/images/islands/koufonisia/gallery/koufonisia-sunset.jpg",
      alt: "Breathtaking sunset over Koufonisia"
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
      description: 'Seafood and delicacies',
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
        <IslandGuideHero {...koufonisia} />

        {/* Introduction Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Discover Koufonisia</h2>
              <p className="text-lg text-gray-700 mb-4">
                Welcome to Koufonisia, a hidden paradise in the Lesser Cyclades known for its crystal-clear
                waters and pristine beaches. This small complex of islands, consisting of Pano Koufonisi
                (Upper Koufonisi) and Kato Koufonisi (Lower Koufonisi), offers visitors an authentic Greek
                island experience with its traditional fishing village atmosphere and stunning natural beauty.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                With its turquoise waters, golden sand beaches, and impressive sea caves, Koufonisia
                has become increasingly popular among travelers seeking a more tranquil alternative to
                the busier Cycladic islands. Despite its growing popularity, it maintains its authentic
                charm and relaxed atmosphere.
              </p>
              <p className="text-lg text-gray-700 dark:text-white/80">
                From swimming in secluded coves to exploring coastal paths, from enjoying fresh seafood
                to watching spectacular sunsets, Koufonisia provides a perfect escape for those seeking
                natural beauty and tranquility in the heart of the Aegean.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                <img
                  src="/images/islands/koufonisia/koufonisia-intro-1.jpg"
                  alt="Koufonisia village view"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                <img
                  src="/images/islands/koufonisia/koufonisia-intro-2.jpg"
                  alt="Turquoise waters of Koufonisia"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md col-span-2">
                <img
                  src="/images/islands/koufonisia/koufonisia-intro-3.jpg"
                  alt="Panoramic view of Koufonisia"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Explore Koufonisia</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <a
                  key={index}
                  href={category.link}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-50 dark:bg-cyan-600/10 p-3 rounded-full mr-4">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-white/60">{category.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* When to Visit Section */}
        <section id="when-to-visit" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">When to Visit Koufonisia</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                The best time to experience Koufonisia's beauty is from May to September when the weather is warm and perfect for swimming.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-50 dark:bg-cyan-600/10 p-3 rounded-full mr-4">
                        <FaCalendarAlt className="text-cyan-600 dark:text-cyclades-turquoise" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Seasonal Guide</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Summer (June to August)</h4>
                        <p className="text-gray-600 dark:text-white/60">{koufonisia.weather.summer}</p>
                        <p className="text-gray-600 dark:text-white/60">Peak tourist season with vibrant atmosphere and all services operating.</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Spring (April to May)</h4>
                        <p className="text-gray-600 dark:text-white/60">{koufonisia.weather.spring}</p>
                        <p className="text-gray-600 dark:text-white/60">Mild weather, fewer tourists, and blooming wildflowers make this a great time to visit.</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Autumn (September to October)</h4>
                        <p className="text-gray-600 dark:text-white/60">{koufonisia.weather.autumn}</p>
                        <p className="text-gray-600 dark:text-white/60">Pleasant swimming conditions continue with fewer crowds and lower prices.</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Winter (November to March)</h4>
                        <p className="text-gray-600 dark:text-white/60">{koufonisia.weather.winter}</p>
                        <p className="text-gray-600 dark:text-white/60">Many businesses close, ferry connections are limited, but perfect for those seeking solitude.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-50 dark:bg-cyan-600/10 p-3 rounded-full mr-4">
                        <FaSun className="text-cyan-600 dark:text-cyclades-turquoise" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Travel Tips</h3>
                    </div>

                    <ul className="space-y-3 text-gray-600 dark:text-white/60">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Book accommodations well in advance for July and August as options are limited and fill quickly.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Consider visiting in June or September for great weather with fewer crowds.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Ferry schedules are more frequent during high season (June-September).</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Pack light clothing, sunscreen, and a hat for sun protection.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Bring comfortable walking shoes for exploring the coastal paths.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>The island can be windy at times, so bring a light jacket even in summer.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Beaches Section */}
        <section id="beaches" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Beaches in Koufonisia</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Koufonisia is renowned for its pristine beaches with crystal-clear turquoise waters and golden sand.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/pori-beach.jpg"
                  alt="Pori Beach"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pori Beach</h3>
                  <p className="text-gray-600 mb-4">
                    The most famous beach on the island, with stunning turquoise waters and fine golden sand.
                    Located on the northeast side of Pano Koufonisi, it's about a 30-minute walk from the main village.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Swimming</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sunbathing</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Beach Bar</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/italida-beach.jpg"
                  alt="Italida Beach"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Italida (Fanos) Beach</h3>
                  <p className="text-gray-600 mb-4">
                    A beautiful sandy beach with shallow, crystal-clear waters, perfect for families.
                    Located on the north coast, it's easily accessible via the coastal path from the main village.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Family-Friendly</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Swimming</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Taverna Nearby</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/gala-beach.jpg"
                  alt="Gala Beach"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Gala Beach</h3>
                  <p className="text-gray-600 mb-4">
                    A unique natural pool formed by rocks, with milky blue waters (hence the name "Gala," meaning milk).
                    Located on the northeastern coast, it's accessible via the coastal path.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Natural Pool</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Swimming</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Scenic</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/pisina-beach.jpg"
                  alt="Pisina Beach"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pisina</h3>
                  <p className="text-gray-600 mb-4">
                    A natural rock pool with crystal clear waters, perfect for swimming and cliff jumping.
                    Located along the northeastern coastal path between Pori and Gala.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Rock Pool</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Cliff Jumping</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Swimming</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/platia-pounta.jpg"
                  alt="Platia Pounta Beach"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Platia Pounta</h3>
                  <p className="text-gray-600 mb-4">
                    A small, peaceful beach with fine sand and shallow waters. Located on the eastern side of the island,
                    it's less crowded than other beaches.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Quiet</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Swimming</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Relaxation</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/kato-koufonisi.jpg"
                  alt="Kato Koufonisi Beaches"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Kato Koufonisi Beaches</h3>
                  <p className="text-gray-600 mb-4">
                    The uninhabited island of Kato Koufonisi features pristine, secluded beaches.
                    Accessible by boat from Pano Koufonisi, these beaches offer complete tranquility.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Secluded</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Day Trip</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Boat Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Villages Section */}
        <section id="villages" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Villages of Koufonisia</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Discover the charming settlements of Koufonisia, where traditional Cycladic architecture meets laid-back island living.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/chora.jpg"
                  alt="Chora (Main Village)"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Chora (Main Village)</h3>
                  <p className="text-gray-600 mb-4">
                    The main settlement of Pano Koufonisi is a picturesque fishing village with whitewashed houses,
                    blue-domed churches, and narrow winding streets. Located around the port, it's where you'll find
                    most accommodations, restaurants, cafes, and shops.
                  </p>
                  <p className="text-gray-600 dark:text-white/60">
                    Don't miss the beautiful Church of Agios Georgios in the center of the village, and take time
                    to wander through the charming streets, especially during sunset when the white buildings glow
                    in the golden light.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/port.jpg"
                  alt="The Port Area"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">The Port Area</h3>
                  <p className="text-gray-600 mb-4">
                    The lively port area is the heart of the island, where fishing boats and yachts dock alongside
                    the ferry terminal. Here you'll find waterfront tavernas serving fresh seafood, cafes with
                    beautiful sea views, and shops selling local products.
                  </p>
                  <p className="text-gray-600 dark:text-white/60">
                    The port area comes alive in the evenings when locals and visitors gather for dinner and drinks,
                    creating a vibrant yet relaxed atmosphere that epitomizes the Koufonisia experience.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/kato-koufonisi-village.jpg"
                  alt="Kato Koufonisi Settlement"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Kato Koufonisi Settlement</h3>
                  <p className="text-gray-600 mb-4">
                    The smaller island of Kato Koufonisi is largely uninhabited, with just a handful of buildings
                    near the small harbor. There's a single taverna that operates during the summer months, serving
                    fresh fish and local specialties to day-trippers.
                  </p>
                  <p className="text-gray-600 dark:text-white/60">
                    The lack of development is part of its charm, offering visitors a glimpse of how the Cyclades
                    looked before tourism. It's an ideal day trip for those seeking tranquility and untouched natural beauty.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/pano-meria.jpg"
                  alt="Pano Meria"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pano Meria</h3>
                  <p className="text-gray-600 mb-4">
                    This small residential area is located on the western part of Pano Koufonisi, slightly away from
                    the main village. It offers a quieter atmosphere with beautiful views of the sea and neighboring islands.
                  </p>
                  <p className="text-gray-600 dark:text-white/60">
                    Some of the island's most charming accommodations can be found here, perfect for those who prefer
                    to stay away from the (relative) hustle and bustle of the main village while still being within
                    walking distance of amenities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section id="activities" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Things to Do in Koufonisia</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Beyond its beautiful beaches, Koufonisia offers a variety of activities for visitors to enjoy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/coastal-path.jpg"
                  alt="Coastal Path Hiking"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Coastal Path Hiking</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    Follow the well-marked coastal path that runs along the northern shore of Pano Koufonisi,
                    connecting the main village to Pori Beach. Along the way, you'll discover hidden coves,
                    natural rock formations, and stunning viewpoints. The entire path takes about 1-2 hours
                    to walk, depending on how often you stop for swimming and photos.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/boat-tour.jpg"
                  alt="Boat Tours"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Boat Tours</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    Take a boat tour around Koufonisia to explore sea caves, hidden beaches, and nearby
                    uninhabited islands. Daily excursions depart from the main port to Kato Koufonisi and
                    other Small Cyclades islands like Keros, Schinoussa, and Iraklia. These tours typically
                    include stops for swimming and sometimes lunch at a secluded beach.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/sea-kayaking.jpg"
                  alt="Sea Kayaking"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sea Kayaking</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    Explore the coastline from a different perspective by renting a sea kayak. Paddle around
                    the island to discover secluded beaches and impressive rock formations that are only
                    accessible from the sea. Several operators offer kayak rentals and guided tours, suitable
                    for both beginners and experienced paddlers.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/snorkeling.jpg"
                  alt="Snorkeling & Swimming"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Snorkeling & Swimming</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    The crystal-clear waters around Koufonisia are perfect for snorkeling, with excellent
                    visibility and diverse marine life. Bring your own equipment or rent from local shops,
                    and explore underwater caves, rock formations, and colorful fish. The natural pools of
                    Piscina and Gala are particularly good spots for snorkeling.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/fishing.jpg"
                  alt="Traditional Fishing"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Traditional Fishing</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    Experience the island's fishing tradition by joining a local fisherman for a day at sea.
                    Learn traditional fishing techniques and enjoy the catch of the day prepared fresh on
                    board or at a local taverna. These authentic experiences provide insight into the island's
                    cultural heritage and sustainable way of life.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img
                  src="/images/islands/koufonisia/sunset.jpg"
                  alt="Sunset Watching"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sunset Watching</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    Find a perfect spot to watch the spectacular Aegean sunset, painting the sky and sea in
                    vibrant colors. Popular viewpoints include the western side of the main village, Pori Beach,
                    and the coastal path. Grab a drink from a local café and find a comfortable spot on the
                    rocks for this daily natural spectacle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cuisine Section */}
        <section id="cuisine" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Cuisine & Dining</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Discover the delicious local cuisine of Koufonisia, where fresh seafood and traditional Greek dishes take center stage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Local Specialties</h3>
                <ul className="space-y-4 text-gray-600 dark:text-white/60">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Fresh Seafood:</strong> As a fishing island, Koufonisia is renowned for its fresh catch of the day, including red mullet, sea bream, octopus, squid, and lobster.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Goat Cheese:</strong> Local goat cheese is produced on the island and neighboring Small Cyclades, often served in salads or as a meze with honey.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Patatato:</strong> A traditional dish of goat meat slow-cooked with potatoes and herbs.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Fava:</strong> Yellow split pea puree topped with olive oil, onions, and capers.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Pasteli:</strong> Traditional honey and sesame seed bars, a perfect energy snack for beach days.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Rakomelo:</strong> A warm alcoholic drink made from raki (grape distillate) and honey, often flavored with cinnamon or other spices.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                  <img
                    src="/images/islands/koufonisia/seafood.jpg"
                    alt="Fresh seafood"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                  <img
                    src="/images/islands/koufonisia/greek-salad.jpg"
                    alt="Greek salad with local cheese"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md col-span-2">
                  <img
                    src="/images/islands/koufonisia/taverna.jpg"
                    alt="Traditional taverna by the sea"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Where to Eat & Drink</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-medium text-gray-900 mb-3">Waterfront Tavernas</h4>
                    <p className="text-gray-600 mb-4">
                      The port area is lined with traditional tavernas offering fresh seafood and Greek specialties.
                      Watch the fishing boats come in while enjoying dishes prepared with the day's catch. Most tavernas
                      have outdoor seating with beautiful sea views.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      Try "Kapetan Nikolas" or "Finikas" for authentic local cuisine in a charming setting.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-medium text-gray-900 mb-3">Beach Bars & Cafes</h4>
                    <p className="text-gray-600 mb-4">
                      Several beaches have small bars or cafes serving drinks, snacks, and light meals.
                      These casual spots are perfect for a refreshing drink or a quick bite between swims.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      "Kalofeggo" at Fanos Beach and "Deli" in the main village are popular choices for coffee,
                      cocktails, and light meals.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-medium text-gray-900 mb-3">Bakeries & Sweet Shops</h4>
                    <p className="text-gray-600 mb-4">
                      Start your day with fresh pastries and coffee from one of the local bakeries in the main village.
                      They also offer traditional Greek sweets and savory pies that make perfect picnic items for beach days.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      Don't miss trying "loukoumades" (Greek honey doughnuts) and "galaktoboureko" (custard-filled pastry).
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-medium text-gray-900 mb-3">Evening Drinks</h4>
                    <p className="text-gray-600 mb-4">
                      After sunset, the main village comes alive with bars and cafes offering cocktails, local wines,
                      and spirits. The atmosphere is relaxed and friendly, perfect for unwinding after a day in the sun.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      "Sorokos Bar" and "Scholio Bar" are popular spots for evening drinks with views of the port.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section id="gallery" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Photo Gallery</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Explore the beauty of Koufonisia through our collection of stunning photographs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`rounded-lg overflow-hidden shadow-md ${index === 0 || index === 7 ? 'sm:col-span-2 sm:row-span-2' : ''
                    }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transportation Section */}
        <section id="transport" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How to Get to Koufonisia</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Koufonisia is accessible by ferry from Athens and other Cycladic islands.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">By Ferry</h3>
                    <ul className="space-y-3 text-gray-600 dark:text-white/60">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>From Athens (Piraeus):</strong> Regular ferry connections operate from the port of Piraeus, taking approximately 5-7 hours depending on the type of vessel and route.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>From Athens (Rafina):</strong> Some ferries also depart from the port of Rafina, which may be more convenient if you're coming from Athens International Airport.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>From Other Islands:</strong> Koufonisia is well-connected to other Cycladic islands, including Naxos, Amorgos, and the Small Cyclades (Schinoussa, Iraklia, Donousa).</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Ferry Types:</strong> Both conventional ferries and high-speed catamarans serve Koufonisia, with more frequent connections during the summer months.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Getting Around</h3>
                    <ul className="space-y-3 text-gray-600 dark:text-white/60">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>On Foot:</strong> Pano Koufonisi is small enough to explore entirely on foot. A well-maintained coastal path connects the main village to most beaches.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Bicycle Rental:</strong> Bicycles are available for rent in the main village and provide a convenient way to get around.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Boat Taxi:</strong> Small boat taxis operate from the main port to various beaches around the island.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>To Kato Koufonisi:</strong> Small boats make daily trips to the uninhabited Kato Koufonisi during the summer months.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience Koufonisia?</h2>
                <p className="text-lg text-white mb-8">
                  Plan your perfect getaway to this hidden gem of the Cyclades. Crystal-clear waters,
                  golden beaches, and authentic Greek hospitality await you on this enchanting island.
                </p>

                <div className="bg-blue-50 dark:bg-cyan-600/100 bg-opacity-30 rounded-lg p-4 mb-8 inline-block">
                  <span className="text-white font-medium">
                    Best time to visit: {koufonisia.bestTime}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/hotels/"
                    className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block text-center"
                  >
                    Find Accommodations
                  </a>
                  <a
                    href="/ferry-tickets/"
                    className="bg-transparent text-white border border-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block text-center"
                  >
                    How to get there
                  </a>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/islands/koufonisia/koufonisia-cta.jpg"
                  alt="Stunning view of Koufonisia"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default KoufonisiaGuide;


