import React from 'react';
import { 
  FaUmbrellaBeach, 
  FaWineGlass, 
  FaMapMarkedAlt, 
  FaShip, 
  FaUtensils, 
  FaHistory
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';

const KimolosGuide: React.FC = () => {
  const kimolos = islandGuides.find(island => island.id === 'kimolos');

  if (!kimolos) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Kimolos Travel Guide 2026 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Kimolos vacation with our comprehensive 2026 travel guide. Discover volcanic landscapes, pristine beaches, and authentic Greek island life on this hidden gem of the Western Cyclades.",
    keywords: [
      'Kimolos travel guide',
      'Kimolos beaches',
      'Western Cyclades',
      'Greek islands',
      'Chorio village',
      'Skiadi rock',
      'Prassa beach',
      'volcanic landscapes',
      'Kimolos restaurants',
      'best time to visit Kimolos'
    ],
    ogImage: kimolos.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/kimolos/gallery/kimolos-beach.jpg",
      alt: "Crystal clear turquoise waters at Prassa Beach"
    },
    {
      src: "/images/islands/kimolos/gallery/kimolos-village.jpg",
      alt: "The charming main village of Chorio"
    },
    {
      src: "/images/islands/kimolos/gallery/kimolos-skiadi.jpg",
      alt: "The impressive Skiadi rock formation"
    },
    {
      src: "/images/islands/kimolos/gallery/kimolos-cliffs.jpg",
      alt: "White cliffs and turquoise waters"
    },
    {
      src: "/images/islands/kimolos/gallery/kimolos-food.jpg",
      alt: "Traditional ladenia, a local specialty"
    },
    {
      src: "/images/islands/kimolos/gallery/kimolos-boat.jpg",
      alt: "Traditional fishing boats in Psathi port"
    },
    {
      src: "/images/islands/kimolos/gallery/kimolos-sunset.jpg",
      alt: "Breathtaking sunset over Kimolos"
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
    <div className="min-h-screen bg-white">
      <SEO {...seoData} />
      
      {/* Parallax Hero Section */}
      <IslandGuideHero 
        name="Kimolos"
        description={kimolos.description}
        image={kimolos.image}
        bestTime={kimolos.bestTime}
        idealFor={kimolos.idealFor}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Discover Kimolos</h2>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Kimolos is a hidden gem of the Western Cyclades, located just a stone's throw away from the more famous Milos. 
                  This small volcanic island captivates visitors with its unspoiled beauty, pristine beaches with crystal-clear waters, 
                  and authentic Greek island atmosphere.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  With its traditional whitewashed houses, picturesque villages, unique geological formations, and warm hospitality, 
                  Kimolos offers an authentic Greek island experience away from the crowds. Here, you can explore untouched beaches, 
                  hike scenic trails, discover ancient ruins, and enjoy the simple pleasures of Greek island life.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/images/islands/kimolos/kimolos-village.jpg" 
                alt="Traditional village in Kimolos" 
                className="rounded-lg shadow-md h-64 w-full object-cover"
              />
              <img 
                src="/images/islands/kimolos/kimolos-beach.jpg" 
                alt="Beautiful beach in Kimolos" 
                className="rounded-lg shadow-md h-64 w-full object-cover"
              />
              <img 
                src="/images/islands/kimolos/kimolos-landscape.jpg" 
                alt="Scenic landscape of Kimolos" 
                className="rounded-lg shadow-md h-64 w-full object-cover"
              />
              <img 
                src="/images/islands/kimolos/kimolos-church.jpg" 
                alt="Traditional church in Kimolos" 
                className="rounded-lg shadow-md h-64 w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Explore Kimolos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <a 
                key={index}
                href={category.link}
                className="group bg-white rounded-lg shadow-md p-6 hover:bg-blue-50 dark:bg-cyan-600/100 transition-colors duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="group-hover:text-white transition-colors">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-white transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-white/90 transition-colors">
                      {category.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* When to Visit Section */}
        <section id="when-to-visit" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">When to Visit Kimolos</h2>
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The best time to visit Kimolos is from May to September when the weather is warm and sunny. 
              The peak tourist season is in July and August, but even then, Kimolos remains relatively uncrowded 
              compared to other Cycladic islands.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              June and September are ideal months to visit, offering warm temperatures, fewer tourists, 
              and more affordable accommodation. The sea is warm enough for swimming from late May until early October.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              If you prefer to experience the authentic local life, consider visiting in May or October. 
              While some restaurants and accommodations might be closed, you'll get to see the island at its most peaceful.
            </p>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section id="gallery" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Photo Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md border border-gray-100 dark:border-white/10">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Ready to Experience Section */}
        <section className="rounded-lg overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Experience Kimolos?</h2>
                  <p className="text-lg mb-6">
                    Plan your perfect getaway to this hidden gem of the Cyclades. Find the best accommodations
                    and discover how to reach this beautiful island.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="/hotels/" 
                      className="bg-white text-blue-700 hover:bg-blue-50 dark:bg-cyan-600/10 px-6 py-3 rounded-lg font-medium inline-block text-center transition-colors duration-300"
                    >
                      Find Accommodations
                    </a>
                    <a 
                      href="/ferry-tickets/" 
                      className="bg-transparent hover:bg-blue-700 border-2 border-white text-white px-6 py-3 rounded-lg font-medium inline-block text-center transition-colors duration-300"
                    >
                      How to get there
                    </a>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img 
                    src="/images/islands/kimolos/kimolos-cta.jpg" 
                    alt="Kimolos island view" 
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default KimolosGuide;


