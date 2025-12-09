import React from 'react';
import { 
  FaUmbrellaBeach, 
  FaWineGlass, 
  FaMapMarkedAlt, 
  FaShip, 
  FaUtensils, 
  FaCalendarAlt,
  FaHistory
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { cyclades } from '../data/islandsData';

const AnafiGuide: React.FC = () => {
  const anafi = cyclades.find(island => island.slug === 'anafi');

  if (!anafi) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Anafi Travel Guide 2026 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Anafi vacation with our comprehensive 2026 travel guide. Discover the best hotels, restaurants, beaches, and activities. Experience authentic Greek island life in this untouched Cycladic gem.",
    keywords: [
      'Anafi travel guide',
      'Anafi beaches',
      'Chora Anafi',
      'Mount Kalamos',
      'Greek islands',
      'Anafi villages',
      'Roukounas Beach',
      'hiking Anafi',
      'Apollo Aegletes temple',
      'best time to visit Anafi'
    ],
    ogImage: anafi.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/anafi/gallery/anafi-chora.jpg",
      alt: "The traditional village of Chora"
    },
    {
      src: "/images/islands/anafi/gallery/anafi-kalamos.jpg",
      alt: "The impressive Mount Kalamos"
    },
    {
      src: "/images/islands/anafi/gallery/anafi-roukounas.jpg",
      alt: "Golden sands at Roukounas Beach"
    },
    {
      src: "/images/islands/anafi/gallery/anafi-monastery.jpg",
      alt: "The Monastery of Panagia Kalamiotissa"
    },
    {
      src: "/images/islands/anafi/gallery/anafi-apollo-temple.jpg",
      alt: "Ancient temple of Apollo Aegletes"
    },
    {
      src: "/images/islands/anafi/gallery/anafi-food.jpg",
      alt: "Traditional Greek cuisine with local products"
    },
    {
      src: "/images/islands/anafi/gallery/anafi-hiking.jpg",
      alt: "Hiking trails with panoramic views"
    },
    {
      src: "/images/islands/anafi/gallery/anafi-aerial.jpg",
      alt: "Aerial view of Anafi coastline"
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
      description: 'Local delicacies',
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

  // Create hero props from anafi data
  const heroProps = {
    name: anafi.name || "Anafi",
    description: anafi.shortDescription || "Untouched Cycladic beauty",
    image: anafi.image || "/images/islands/anafi.jpg",
    bestTime: anafi.bestTime?.description || "May to September",
    idealFor: anafi.idealFor || ["Nature lovers", "Peace seekers", "Hikers"]
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        <IslandGuideHero {...heroProps} />
        
        {/* Introduction Section with Enhanced Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Anafi</h2>
              <p className="text-gray-700 leading-relaxed">
                Anafi, a hidden gem in the southeastern Cyclades, is a testament to untouched Greek island beauty. 
                This small paradise rises dramatically from the Aegean Sea, crowned by Mount Kalamos, one of the largest monoliths in the Mediterranean.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the pristine Chora perched on the hillside to the ancient temple of Apollo Aegletes and golden beaches like Roukounas, 
                Anafi offers a glimpse into authentic Cycladic life. Our comprehensive guide will help you discover the best of what this 
                tranquil island has to offer.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/anafi/intro.jpg" 
                  alt="Anafi Island Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-1/2 aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-4 border-white">
                <img 
                  src="/images/islands/anafi/intro-2.jpg" 
                  alt="Anafi Chora" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Quick Navigation Section */}
          <section id="quick-nav" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Explore Anafi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <a 
                  key={index} 
                  href={category.link} 
                  className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-blue-50 dark:bg-cyan-600/10 p-3">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{category.title}</h3>
                      <p className="text-gray-600 dark:text-white/60">{category.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* When to Visit Section */}
          <section id="when-to-visit" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">When to Visit Anafi</h2>
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <FaCalendarAlt className="text-blue-500 mr-2" />
                    <h3 className="text-xl font-semibold">Best Time: May to September</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    The ideal time to visit Anafi is from late May to early September when the weather is warm and perfect for swimming and outdoor activities.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Summer (June to August)</h4>
                      <p className="text-gray-600 dark:text-white/60">Hot and dry with temperatures around 25-30°C. Perfect for beach activities but can get crowded in August.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Spring (April to May)</h4>
                      <p className="text-gray-600 dark:text-white/60">Mild temperatures (18-24°C) with blooming wildflowers. Ideal for hiking and exploring.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Fall (September to October)</h4>
                      <p className="text-gray-600 dark:text-white/60">Warm sea temperatures and fewer tourists. Perfect for a more authentic experience.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Winter (November to March)</h4>
                      <p className="text-gray-600 dark:text-white/60">Quiet and authentic but with limited ferry connections and some businesses closed.</p>
                    </div>
                  </div>
                </div>
                <div className="relative h-full">
                  <img 
                    src="/images/islands/anafi/seasons.jpg" 
                    alt="Anafi in different seasons" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Transportation Section */}
          <section id="transport" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">How to Get to Anafi</h2>
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-full min-h-[300px]">
                  <img 
                    src="/images/islands/anafi/ferry.jpg" 
                    alt="Ferry to Anafi" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">By Ferry</h3>
                      <p className="text-gray-700 dark:text-white/80">
                        The only way to reach Anafi is by ferry. Regular connections are available from:
                      </p>
                      <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                        <li>Piraeus (Athens) - approximately 9-12 hours</li>
                        <li>Santorini - approximately 1-2 hours</li>
                        <li>Other Cycladic islands with less frequent connections</li>
                      </ul>
                      <p className="text-gray-700 mt-2">
                        Ferry frequency increases during the summer months (June-September).
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Local Transportation</h3>
                      <p className="text-gray-700 dark:text-white/80">
                        On the island, transportation options include:
                      </p>
                      <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                        <li>Local bus connecting the port to Chora (limited schedule)</li>
                        <li>Taxi service (limited availability)</li>
                        <li>Car and motorbike rental</li>
                        <li>Walking trails connecting main points of interest</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-cyan-600/10 p-4 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-cyclades-turquoise">
                        <strong>Tip:</strong> Book your ferry tickets in advance during high season as they can sell out quickly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Beaches in Anafi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/anafi/roukounas.jpg" 
                    alt="Roukounas Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Roukounas Beach</h3>
                  <p className="text-gray-700 mb-4">
                    The main beach of Anafi, featuring golden sand and crystal-clear waters. 
                    It's partially organized with some umbrellas and a taverna nearby.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/anafi/kleisidi.jpg" 
                    alt="Kleisidi Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Kleisidi Beach</h3>
                  <p className="text-gray-700 mb-4">
                    A small, secluded beach near the port with calm waters and fine sand.
                    Perfect for a quick swim after arriving on the island.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/anafi/katalimatsa.jpg" 
                    alt="Katalimatsa Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Katalimatsa Beach</h3>
                  <p className="text-gray-700 mb-4">
                    A remote beach on the southern side of the island, accessible by hiking trail.
                    Offers complete privacy and untouched natural beauty.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/anafi/monastery-beach.jpg" 
                    alt="Monastery Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Monastery Beach</h3>
                  <p className="text-gray-700 mb-4">
                    Located near the Monastery of Panagia Kalamiotissa, this small beach
                    offers stunning views of Mount Kalamos and the monastery above.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Things to Do in Anafi</h2>
            <div className="space-y-8">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Hiking to Mount Kalamos</h3>
                    <p className="text-gray-700 mb-4">
                      Mount Kalamos, the second-largest monolith in the Mediterranean after Gibraltar,
                      offers an unforgettable hiking experience with panoramic views of the Aegean.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Trail starts from Chora and takes about 2-3 hours each way</li>
                      <li>Visit the Monastery of Panagia Kalamiotissa at the summit</li>
                      <li>Spectacular views of neighboring islands on clear days</li>
                      <li>Best hiked in morning hours to avoid afternoon heat</li>
                    </ul>
                  </div>
                  <div className="relative h-full min-h-[300px]">
                    <img 
                      src="/images/islands/anafi/hiking.jpg" 
                      alt="Hiking to Mount Kalamos" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-full min-h-[300px] order-2 lg:order-1">
                    <img 
                      src="/images/islands/anafi/apollo-temple.jpg" 
                      alt="Temple of Apollo Aegletes" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 order-1 lg:order-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Explore Ancient Ruins</h3>
                    <p className="text-gray-700 mb-4">
                      Discover the archaeological treasures of Anafi, including the ancient
                      temple of Apollo Aegletes dating back to the 7th century BC.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Visit the Temple of Apollo Aegletes on Cape Kalamos</li>
                      <li>Explore the ancient city ruins near Kastelli</li>
                      <li>See the remains of the Venetian castle in Chora</li>
                      <li>Discover ancient inscriptions and artifacts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section id="gallery" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Anafi Photo Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="bg-white dark:bg-dark-card rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                  <div className="aspect-w-16 aspect-h-12">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-gray-600 dark:text-white/60">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action Section */}
          <section id="cta" className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Anafi?</h2>
                  <p className="text-white/90 mb-6">
                    Plan your perfect getaway to this hidden gem of the Cyclades. Discover authentic Greek island life away from the crowds.
                  </p>
                  <div className="bg-blue-50 dark:bg-cyan-600/100/30 rounded-lg p-4 mb-6 inline-block w-auto">
                    <span className="text-white font-medium flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      Best time to visit: May to September
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="/hotels/" 
                      className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 dark:bg-cyan-600/10 transition-colors"
                    >
                      Find Accommodations
                    </a>
                    <a 
                      href="/ferry-tickets/" 
                      className="inline-flex items-center justify-center px-6 py-3 bg-blue-50 dark:bg-cyan-600/100 text-white rounded-lg font-medium hover:bg-blue-400 transition-colors"
                    >
                      How to get there
                    </a>
                  </div>
                </div>
                <div className="hidden lg:block relative">
                  <img 
                    src="/images/islands/anafi/cta-image.jpg" 
                    alt="Anafi Island View" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AnafiGuide;


