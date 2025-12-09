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
import RelatedDestinationsSection from '../components/seo/RelatedDestinationsSection';
import { siteLinks } from '../data/siteLinks';

const TinosGuide: React.FC = () => {
  const tinos = cyclades.find(island => island.slug === 'tinos');

  if (!tinos) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Tinos Travel Guide 2026 - Religious Heritage & Marble Villages",
    description: "Plan your perfect Tinos vacation with our comprehensive 2026 travel guide. Discover religious sites, marble villages, beautiful beaches, and authentic Greek culture.",
    keywords: [
      'Tinos travel guide',
      'Church of Panagia Evangelistria',
      'Tinos marble villages',
      'Pyrgos Tinos',
      'Tinos beaches',
      'Tinos dovecotes',
      'religious tourism Greece',
      'Tinos pilgrimage',
      'marble craftsmanship',
      'best time to visit Tinos'
    ],
    ogImage: tinos.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/tinos/gallery/tinos-church.jpg",
      alt: "The Church of Panagia Evangelistria"
    },
    {
      src: "/images/islands/tinos/gallery/tinos-pyrgos.jpg",
      alt: "The marble village of Pyrgos"
    },
    {
      src: "/images/islands/tinos/gallery/tinos-dovecotes.jpg",
      alt: "Traditional dovecotes of Tinos"
    },
    {
      src: "/images/islands/tinos/gallery/tinos-beach.jpg",
      alt: "Beautiful beach in Tinos"
    },
    {
      src: "/images/islands/tinos/gallery/tinos-sculpture.jpg",
      alt: "Marble sculpture in Pyrgos"
    },
    {
      src: "/images/islands/tinos/gallery/tinos-village.jpg",
      alt: "Traditional village in Tinos"
    },
    {
      src: "/images/islands/tinos/gallery/tinos-pilgrimage.jpg",
      alt: "Pilgrims at the Church of Panagia Evangelistria"
    },
    {
      src: "/images/islands/tinos/gallery/tinos-panorama.jpg",
      alt: "Panoramic view of Tinos landscape"
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

  // Create hero props from tinos data
  const heroProps = {
    name: tinos.name || "Tinos",
    description: tinos.shortDescription || "Religious heritage and marble artistry",
    image: tinos.image || "/images/islands/tinos.jpg",
    bestTime: tinos.bestTime?.description || "April to October",
    idealFor: tinos.idealFor || ["Religious pilgrims", "Art lovers", "Culture enthusiasts"]
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
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome to Tinos</h2>
              <p className="text-gray-700 leading-relaxed">
                Tinos, a spiritual island in the heart of the Cyclades, is renowned for its religious significance 
                and rich artistic heritage. Home to the Church of Panagia Evangelistria, one of Greece's most important 
                pilgrimage sites, the island welcomes thousands of visitors each year who come to venerate the miraculous icon.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Beyond its religious significance, Tinos is famous for its traditional marble craftsmanship, 
                with the village of Pyrgos being a center for marble sculpture. The island's landscape is dotted 
                with over 1,000 artistic dovecotes, picturesque villages, and beautiful beaches, offering a perfect 
                blend of cultural experiences and natural beauty.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/tinos/intro.jpg" 
                  alt="Tinos Island Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-1/2 aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-4 border-white">
                <img 
                  src="/images/islands/tinos/intro-2.jpg" 
                  alt="Church of Panagia Evangelistria" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Quick Navigation Section */}
          <section id="quick-nav" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Explore Tinos</h2>
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">When to Visit Tinos</h2>
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <FaCalendarAlt className="text-blue-500 mr-2" />
                    <h3 className="text-xl font-semibold">Best Time: April to October</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    The ideal time to visit Tinos is from late April to early October when the weather is warm and perfect for exploring the island's villages and beaches.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Summer (June to August)</h4>
                      <p className="text-gray-600 dark:text-white/60">Hot and dry with temperatures around 25-30°C. August 15th is the major religious celebration of the Dormition of the Virgin Mary, attracting thousands of pilgrims.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Spring (April to May)</h4>
                      <p className="text-gray-600 dark:text-white/60">Mild temperatures (18-24°C) with blooming wildflowers. Perfect for hiking and exploring villages.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Fall (September to October)</h4>
                      <p className="text-gray-600 dark:text-white/60">Warm sea temperatures and fewer tourists. Ideal for a more authentic experience.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Winter (November to March)</h4>
                      <p className="text-gray-600 dark:text-white/60">Quiet and authentic but with limited ferry connections and some businesses closed.</p>
                    </div>
                  </div>
                </div>
                <div className="relative h-full">
                  <img 
                    src="/images/islands/tinos/seasons.jpg" 
                    alt="Tinos in different seasons" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Transportation Section */}
          <section id="transport" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">How to Get to Tinos</h2>
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-full min-h-[300px]">
                  <img 
                    src="/images/islands/tinos/ferry.jpg" 
                    alt="Ferry to Tinos" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">By Ferry</h3>
                      <p className="text-gray-700 dark:text-white/80">
                        Tinos is well-connected to the mainland and other islands by ferry. Regular connections are available from:
                      </p>
                      <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                        <li>Rafina (Athens) - approximately 2-4 hours</li>
                        <li>Piraeus (Athens) - approximately 4-5 hours</li>
                        <li>Mykonos - approximately 30 minutes</li>
                        <li>Other Cycladic islands with varying frequency</li>
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
                        <li>Local bus network connecting major villages</li>
                        <li>Taxi service</li>
                        <li>Car and motorbike rental</li>
                        <li>Organized tours to main attractions</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-cyan-600/10 p-4 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-cyclades-turquoise">
                        <strong>Tip:</strong> If you plan to visit during the August 15th celebration, book your ferry tickets and accommodation well in advance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Villages Section */}
          <section id="villages" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Villages of Tinos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/tinos/pyrgos.jpg" 
                    alt="Pyrgos Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Pyrgos</h3>
                  <p className="text-gray-700 mb-4">
                    The marble village of Pyrgos is the center of Tinos' marble craftsmanship tradition. 
                    Home to the School of Fine Arts, the village features marble details on every building, 
                    from doorways to fountains. Don't miss the Museum of Marble Crafts and the cemetery with 
                    its remarkable marble tombstones.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/tinos/volax.jpg" 
                    alt="Volax Village" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Volax</h3>
                  <p className="text-gray-700 mb-4">
                    Set in a lunar-like landscape surrounded by round granite boulders, Volax is one of the most 
                    unique villages in Greece. The village is known for its traditional basket weaving and the 
                    surreal landscape that looks like it belongs on another planet.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Beaches in Tinos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/tinos/kolympithra.jpg" 
                    alt="Kolympithra Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Kolympithra</h3>
                  <p className="text-gray-700 mb-4">
                    A beautiful bay with two sandy beaches separated by a small peninsula. 
                    The northern beach is popular with surfers due to its consistent winds, 
                    while the southern beach is more protected and family-friendly.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="/images/islands/tinos/agios-ioannis.jpg" 
                    alt="Agios Ioannis Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Agios Ioannis</h3>
                  <p className="text-gray-700 mb-4">
                    A long, sandy beach with crystal-clear waters, located near the village of Porto. 
                    It's well-organized with sunbeds, umbrellas, and beach bars, making it perfect for families.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Things to Do in Tinos</h2>
            <div className="space-y-8">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Visit the Church of Panagia Evangelistria</h3>
                    <p className="text-gray-700 mb-4">
                      The most important religious site in Tinos, this church houses the miraculous icon of the Virgin Mary. 
                      Thousands of pilgrims visit annually, with many crawling the uphill path from the port to the church 
                      as an act of devotion.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Explore the church's impressive marble architecture</li>
                      <li>Visit the museum with its collection of valuable offerings</li>
                      <li>Witness the August 15th celebration if possible</li>
                      <li>Observe the unique tradition of tamata (metal votive offerings)</li>
                    </ul>
                  </div>
                  <div className="relative h-full min-h-[300px]">
                    <img 
                      src="/images/islands/tinos/church.jpg" 
                      alt="Church of Panagia Evangelistria" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-full min-h-[300px] order-2 lg:order-1">
                    <img 
                      src="/images/islands/tinos/dovecotes.jpg" 
                      alt="Traditional Dovecotes" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 order-1 lg:order-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Explore the Dovecotes</h3>
                    <p className="text-gray-700 mb-4">
                      Tinos is famous for its ornate dovecotes, with over 1,000 scattered across the island. 
                      These architectural marvels combine functionality with artistic expression, featuring 
                      intricate geometric patterns.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Take a guided tour to see the best examples</li>
                      <li>Visit the Dovecote Valley between Tarampados and Karkados</li>
                      <li>Learn about their historical significance</li>
                      <li>Photograph these unique structures against the Cycladic landscape</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section id="gallery" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Tinos Photo Gallery</h2>
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
                  <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Tinos?</h2>
                  <p className="text-white/90 mb-6">
                    Plan your perfect getaway to this island of religious heritage, marble villages, and beautiful beaches.
                  </p>
                  <div className="bg-blue-50 dark:bg-cyan-600/100/30 rounded-lg p-4 mb-6 inline-block w-auto">
                    <span className="text-white font-medium flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      Best time to visit: April to October
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
                    src="/images/islands/tinos/cta-image.jpg" 
                    alt="Tinos Island View" 
                    className="h-full w-full object-cover"
                  />
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

export default TinosGuide;


