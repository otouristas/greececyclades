import { useParams } from 'react-router-dom';
import { Sun, MapPin, CalendarDays, Users, Clock, Euro, Star, Navigation } from 'lucide-react';
import SEO from '../components/SEO';
import { generateGuideSEO } from '../utils/seoMetadata';

// Import island images
import santoriniImage from '../assets/images/islands/santorini-island.webp';
import mykonosImage from '../assets/images/islands/mykonos-island.jpg';
import parosImage from '../assets/images/islands/paros-island.jpg';
import sifnosImage from '../assets/images/islands/sifnos-island.jpg';

const islandData = {
  santorini: {
    name: 'Santorini',
    description: 'Famous for its dramatic views, stunning sunsets, and volcanic beaches. Experience the magic of the most romantic island in Greece.',
    longDescription: `Santorini is one of the most iconic Greek islands, known worldwide for its whitewashed, cube-shaped buildings adorned with blue accents, steep cliffs and stunning sunsets. The island is actually a giant volcano caldera, offering unique beaches with red, white and black sand.`,
    image: santoriniImage,
    highlights: ['Caldera Views', 'Sunset in Oia', 'Black Sand Beaches', 'Wine Tours'],
    weather: { temp: '24°C', condition: 'Sunny' },
    activities: 85,
    bestTime: 'April to October',
    idealFor: ['Couples', 'Photographers', 'Wine Lovers'],
    sections: [
      {
        title: 'Must-Visit Locations',
        items: [
          { name: 'Oia Village', description: 'Famous for its blue-domed churches and sunset views' },
          { name: 'Red Beach', description: 'Unique volcanic beach with red cliffs and sand' },
          { name: 'Ancient Akrotiri', description: 'Prehistoric settlement preserved by volcanic ash' }
        ]
      },
      {
        title: 'Local Experiences',
        items: [
          { name: 'Wine Tasting', description: 'Visit traditional wineries and taste volcanic wines' },
          { name: 'Sunset Sailing', description: 'Cruise around the caldera during sunset' },
          { name: 'Cooking Classes', description: 'Learn to make traditional Santorinian dishes' }
        ]
      }
    ],
    travelTips: [
      'Book accommodations well in advance, especially for summer',
      'Visit in shoulder season (May or September) for better prices and fewer crowds',
      'Rent a car or ATV to explore the island fully',
      'Make dinner reservations for sunset times'
    ],
    costs: {
      budget: '€150/day',
      midRange: '€300/day',
      luxury: '€500+/day'
    }
  },
  mykonos: {
    name: 'Mykonos',
    description: 'The cosmopolitan gem of the Cyclades, known for its vibrant nightlife, pristine beaches, and iconic windmills.',
    longDescription: `Mykonos combines glamorous beaches, award-winning restaurants, and legendary nightlife with traditional Cycladic charm. From celebrity spotting in Little Venice to watching the sunset at the windmills, the island offers a perfect blend of luxury and authenticity.`,
    image: mykonosImage,
    highlights: ['Windmills', 'Little Venice', 'Paradise Beach', 'Luxury Shopping'],
    weather: { temp: '26°C', condition: 'Sunny' },
    activities: 95,
    bestTime: 'May to September',
    idealFor: ['Party Lovers', 'Luxury Travelers', 'Beach Enthusiasts'],
    sections: [
      {
        title: 'Must-Visit Locations',
        items: [
          { name: 'Little Venice', description: 'Picturesque waterfront with restaurants and bars' },
          { name: 'Paradise Beach', description: 'Famous beach club and party destination' },
          { name: 'Windmills', description: 'Iconic 16th-century windmills with sunset views' }
        ]
      },
      {
        title: 'Local Experiences',
        items: [
          { name: 'Beach Clubs', description: 'Experience world-famous beach parties and DJs' },
          { name: 'Food Tours', description: 'Taste traditional Greek cuisine and local specialties' },
          { name: 'Boat Tours', description: 'Visit nearby islands and hidden beaches' }
        ]
      }
    ],
    travelTips: [
      'Book clubs and restaurants in advance during peak season',
      'Stay in Mykonos Town for easy access to nightlife',
      'Use water taxis to reach popular beaches',
      'Be prepared for premium prices everywhere'
    ],
    costs: {
      budget: '€200/day',
      midRange: '€400/day',
      luxury: '€800+/day'
    }
  },
  paros: {
    name: 'Paros',
    description: 'The perfect blend of traditional Cycladic charm and modern amenities, ideal for families and water sports enthusiasts.',
    longDescription: `Paros offers the perfect balance of everything that makes Greek islands special. With its pristine beaches, charming villages, excellent water sports, and vibrant cultural scene, it's an island that caters to every type of traveler.`,
    image: parosImage,
    highlights: ['Naoussa Village', 'Golden Beach', 'Windsurfing', 'Traditional Villages'],
    weather: { temp: '25°C', condition: 'Sunny' },
    activities: 75,
    bestTime: 'June to September',
    idealFor: ['Families', 'Water Sports Fans', 'Culture Lovers'],
    sections: [
      {
        title: 'Must-Visit Locations',
        items: [
          { name: 'Naoussa', description: 'Charming fishing village with great restaurants' },
          { name: 'Golden Beach', description: 'Perfect for windsurfing and water sports' },
          { name: 'Parikia', description: 'Historic port town with Venetian castle' }
        ]
      },
      {
        title: 'Local Experiences',
        items: [
          { name: 'Windsurfing', description: 'World-class conditions at Golden Beach' },
          { name: 'Village Tours', description: 'Explore traditional mountain villages' },
          { name: 'Cooking Classes', description: 'Learn to make local Parian dishes' }
        ]
      }
    ],
    travelTips: [
      'Book windsurfing lessons in advance during summer',
      'Use local buses to explore the island',
      'Visit the marble quarries for unique history',
      'Try local wine varieties at traditional wineries'
    ],
    costs: {
      budget: '€100/day',
      midRange: '€200/day',
      luxury: '€400+/day'
    }
  },
  sifnos: {
    name: 'Sifnos',
    description: 'A foodie paradise with rich culinary traditions, beautiful hiking trails, and serene beaches.',
    longDescription: `Sifnos is renowned for its exceptional cuisine and pottery traditions. The island combines beautiful beaches with a network of ancient walking paths connecting traditional villages, making it perfect for both relaxation and active holidays.`,
    image: sifnosImage,
    highlights: ['Gastronomy', 'Pottery', 'Hiking Trails', 'Traditional Villages'],
    weather: { temp: '23°C', condition: 'Sunny' },
    activities: 60,
    bestTime: 'May to October',
    idealFor: ['Food Lovers', 'Hikers', 'Cultural Travelers'],
    sections: [
      {
        title: 'Must-Visit Locations',
        items: [
          { name: 'Kastro', description: 'Medieval village with amazing sea views' },
          { name: 'Apollonia', description: 'Charming capital with great restaurants' },
          { name: 'Chrysopigi Monastery', description: 'Iconic monastery by the sea' }
        ]
      },
      {
        title: 'Local Experiences',
        items: [
          { name: 'Cooking Workshops', description: 'Learn traditional Sifnian recipes' },
          { name: 'Pottery Classes', description: 'Create traditional ceramics' },
          { name: 'Hiking Tours', description: 'Explore ancient trails and villages' }
        ]
      }
    ],
    travelTips: [
      'Try the local specialty "mastelo" (lamb or goat)',
      'Book pottery workshops in advance',
      'Bring good walking shoes for the trails',
      'Visit during the Cycladic Food Festival in September'
    ],
    costs: {
      budget: '€80/day',
      midRange: '€150/day',
      luxury: '€300+/day'
    }
  }
};

export default function IslandGuide() {
  const { slug } = useParams<{ slug: string }>();
  const islandName = slug?.toLowerCase();
  const island = islandData[islandName as keyof typeof islandData];

  if (!island) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Island Guide Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find a guide for this island.</p>
          <a href="/guides" className="text-blue-600 hover:text-blue-700 font-medium">
            View All Island Guides
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO {...generateGuideSEO(island.name)} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={island.image}
            alt={island.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-5xl font-bold text-white mb-4">{island.name}</h1>
              <p className="text-xl text-gray-200 max-w-2xl">{island.description}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-600 mb-6">{island.longDescription}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-blue-500" />
                    <span>{island.weather.temp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-blue-500" />
                    <span>{island.bestTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-500" />
                    <span>{island.activities} Activities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span>{island.idealFor[0]}</span>
                  </div>
                </div>
              </div>

              {/* Sections */}
              {island.sections.map((section) => (
                <div key={section.title} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
                  <div className="grid gap-6">
                    {section.items.map((item) => (
                      <div key={item.name} className="flex gap-4">
                        <MapPin className="h-6 w-6 text-blue-500 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Travel Tips */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Travel Tips</h2>
                <ul className="space-y-3">
                  {island.travelTips.map((tip, index) => (
                    <li key={index} className="flex gap-3">
                      <Navigation className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cost Guide */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Cost Guide</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Euro className="h-5 w-5 text-blue-500" />
                      <span>Budget</span>
                    </div>
                    <span className="font-medium">{island.costs.budget}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Euro className="h-5 w-5 text-blue-500" />
                      <span>Mid-Range</span>
                    </div>
                    <span className="font-medium">{island.costs.midRange}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Euro className="h-5 w-5 text-blue-500" />
                      <span>Luxury</span>
                    </div>
                    <span className="font-medium">{island.costs.luxury}</span>
                  </div>
                </div>
              </div>

              {/* Best Time to Visit */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Best Time to Visit</h2>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-blue-500" />
                  <span className="text-lg">{island.bestTime}</span>
                </div>
                <p className="text-gray-600">
                  This is when you'll find the best weather conditions and can enjoy all the outdoor activities the island has to offer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
