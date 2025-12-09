import { useParams } from 'react-router-dom';
import { Sun, MapPin, CalendarDays, Users, Clock, Euro, Star, Navigation } from 'lucide-react';
import SEO from '../components/SEO';
import { generateGuideSEO } from '../utils/seoMetadata';
import { useIslandStore } from '../store/islandStore';

const IslandGuide: React.FC = () => {
  const { slug } = useParams();
  const { islands } = useIslandStore();
  
  // Find the island by converting the slug to a name (e.g., "antiparos" -> "Antiparos")
  const island = islands.find(
    island => island.name.toLowerCase() === (slug || '').toLowerCase()
  );

  if (!island) {
    return <div>Island not found</div>;
  }

  const sections = [
    {
      title: 'Must-Visit Locations',
      items: island.highlights.map(highlight => ({
        name: highlight,
        description: 'Explore this amazing location'
      }))
    },
    {
      title: 'Local Experiences',
      items: [
        { name: 'Local Cuisine', description: 'Try traditional dishes and local specialties' },
        { name: 'Cultural Tours', description: 'Discover the island\'s rich history and traditions' },
        { name: 'Outdoor Activities', description: 'Enjoy nature and outdoor adventures' }
      ]
    }
  ];

  const travelTips = [
    'Book accommodations well in advance, especially for peak season',
    `Best time to visit is ${island.bestTime.months.join(', ')} - ${island.bestTime.reason}`,
    'Rent a vehicle to explore the island fully',
    'Try local specialties and traditional dishes'
  ];

  const costs = {
    budget: '€80/day',
    midRange: '€150/day',
    luxury: '€300+/day'
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO {...generateGuideSEO(island.name)} />

      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${island.image})`,
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center px-4">
            {island.name} Travel Guide
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="prose max-w-none">
          <p className="text-xl leading-relaxed mb-8">
            {island.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
            <div className="flex items-center space-x-4">
              <Sun className="w-8 h-8 text-cyan-600 dark:text-cyclades-turquoise" />
              <div>
                <h3 className="font-semibold">Weather</h3>
                <p>{island.weather.temp}, {island.weather.condition}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <CalendarDays className="w-8 h-8 text-cyan-600 dark:text-cyclades-turquoise" />
              <div>
                <h3 className="font-semibold">Best Time to Visit</h3>
                <p>{island.bestTime.months.join(', ')} - {island.bestTime.reason}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-cyan-600 dark:text-cyclades-turquoise" />
              <div>
                <h3 className="font-semibold">Perfect For</h3>
                <p>{island.idealFor.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Star className="w-8 h-8 text-cyan-600 dark:text-cyclades-turquoise" />
              <div>
                <h3 className="font-semibold">Activities</h3>
                <p>{island.activities}+ things to do</p>
              </div>
            </div>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{section.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600 dark:text-white/60">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Travel Tips</h2>
            <ul className="space-y-4">
              {travelTips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Navigation className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Estimated Daily Costs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Budget</h3>
                <p className="text-3xl font-bold text-cyan-600 dark:text-cyclades-turquoise">{costs.budget}</p>
                <p className="text-gray-600 mt-2">Hostels, local food, public transport</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Mid-Range</h3>
                <p className="text-3xl font-bold text-cyan-600 dark:text-cyclades-turquoise">{costs.midRange}</p>
                <p className="text-gray-600 mt-2">Hotels, restaurants, some activities</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Luxury</h3>
                <p className="text-3xl font-bold text-cyan-600 dark:text-cyclades-turquoise">{costs.luxury}</p>
                <p className="text-gray-600 mt-2">Luxury resorts, fine dining, private tours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IslandGuide;


