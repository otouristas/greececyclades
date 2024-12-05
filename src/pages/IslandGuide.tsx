import { useParams } from 'react-router-dom';
import { Sun, MapPin, CalendarDays, Users, Clock, Euro, Star, Navigation } from 'lucide-react';

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
      budget: '€100/day',
      midRange: '€200/day',
      luxury: '€400+/day'
    }
  },
  mykonos: {
    name: 'Mykonos',
    description: 'Known for its summer party atmosphere, picturesque villages, and cosmopolitan lifestyle. The perfect blend of luxury and tradition.',
    longDescription: `Mykonos is a vibrant island that perfectly balances traditional Greek charm with modern luxury. Famous for its windmills, pristine beaches, and vibrant nightlife, it attracts visitors from around the world seeking both relaxation and excitement.`,
    image: mykonosImage,
    highlights: ['Little Venice', 'Windmills', 'Paradise Beach', 'Luxury Shopping'],
    weather: { temp: '25°C', condition: 'Sunny' },
    activities: 92,
    bestTime: 'May to September',
    idealFor: ['Party Lovers', 'Beach Enthusiasts', 'Luxury Travelers'],
    sections: [
      {
        title: 'Must-Visit Locations',
        items: [
          { name: 'Little Venice', description: 'Picturesque neighborhood with buildings right on the water' },
          { name: 'Windmills', description: 'Iconic 16th-century windmills overlooking the town' },
          { name: 'Paradise Beach', description: 'Famous beach known for its parties and water sports' }
        ]
      },
      {
        title: 'Local Experiences',
        items: [
          { name: 'Beach Clubs', description: 'Experience the famous Mykonian beach party scene' },
          { name: 'Food Tours', description: 'Taste traditional Greek cuisine in local tavernas' },
          { name: 'Boat Tours', description: 'Visit nearby islands and hidden beaches' }
        ]
      }
    ],
    travelTips: [
      'Book nightclub tables in advance during peak season',
      'Expect higher prices in July and August',
      'Use water taxis to reach popular beaches',
      'Visit the town early morning for the best photos'
    ],
    costs: {
      budget: '€120/day',
      midRange: '€250/day',
      luxury: '€500+/day'
    }
  },
  paros: {
    name: 'Paros',
    description: 'A perfect blend of traditional Cycladic architecture, golden beaches, and vibrant nightlife. Discover the authentic Greek island experience.',
    longDescription: `Paros offers the perfect balance of everything that makes the Greek islands special. With its pristine beaches, charming villages, excellent water sports, and vibrant cultural scene, it's an island that caters to every type of traveler. The island's natural beauty is complemented by its rich history and warm hospitality.`,
    image: parosImage,
    highlights: ['Naoussa Village', 'Golden Beach', 'Byzantine Route', 'Water Sports'],
    weather: { temp: '26°C', condition: 'Sunny' },
    activities: 75,
    bestTime: 'May to October',
    idealFor: ['Families', 'Water Sports Enthusiasts', 'Culture Lovers'],
    sections: [
      {
        title: 'Must-Visit Locations',
        items: [
          { name: 'Naoussa', description: 'Charming fishing village with vibrant nightlife and restaurants' },
          { name: 'Parikia', description: 'Capital town with historic Venetian castle and traditional architecture' },
          { name: 'Golden Beach', description: 'Long sandy beach perfect for windsurfing and swimming' }
        ]
      },
      {
        title: 'Local Experiences',
        items: [
          { name: 'Water Sports', description: 'World-class windsurfing and kitesurfing at Golden Beach' },
          { name: 'Wine Tasting', description: 'Sample local wines at traditional Parian wineries' },
          { name: 'Valley of Butterflies', description: 'Nature walk through this unique ecological park' }
        ]
      }
    ],
    travelTips: [
      'Visit the marble quarries that supplied ancient Greek sculptures',
      'Take a day trip to nearby Antiparos',
      'Try local specialties like gouna (sun-dried mackerel)',
      'Book water sports lessons in advance during peak season'
    ],
    costs: {
      budget: '€80/day',
      midRange: '€150/day',
      luxury: '€300+/day'
    }
  },
  sifnos: {
    name: 'Sifnos',
    description: 'A gastronomic paradise with medieval villages, pristine beaches, and renowned pottery traditions. Experience authentic Cycladic culture.',
    longDescription: `Sifnos is a hidden gem of the Cyclades, famous for its exceptional cuisine, traditional pottery, and well-preserved medieval villages. The island's network of ancient walking trails connects charming whitewashed villages, offering spectacular views of the Aegean Sea. Its rich culinary heritage and strong ceramic traditions make it a unique cultural destination.`,
    image: sifnosImage,
    highlights: ['Kastro Village', 'Pottery Workshops', 'Hiking Trails', 'Local Cuisine'],
    weather: { temp: '24°C', condition: 'Sunny' },
    activities: 45,
    bestTime: 'April to October',
    idealFor: ['Food Lovers', 'Hikers', 'Culture Enthusiasts'],
    sections: [
      {
        title: 'Must-Visit Locations',
        items: [
          { name: 'Kastro', description: 'Medieval village with ancient walls and stunning sea views' },
          { name: 'Apollonia', description: 'Capital town with traditional architecture and vibrant atmosphere' },
          { name: 'Chrysopigi Monastery', description: 'Iconic monastery perched on a rocky peninsula' }
        ]
      },
      {
        title: 'Local Experiences',
        items: [
          { name: 'Cooking Classes', description: 'Learn traditional Sifnian recipes from local chefs' },
          { name: 'Pottery Workshops', description: 'Try your hand at traditional ceramic making' },
          { name: 'Hiking Trails', description: 'Explore ancient paths connecting traditional villages' }
        ]
      }
    ],
    travelTips: [
      'Try the local specialty mastelo (lamb or goat cooked in red wine)',
      'Visit during the Cycladic Gastronomy Festival in September',
      'Book pottery workshops in advance',
      'Bring good walking shoes for the hiking trails'
    ],
    costs: {
      budget: '€70/day',
      midRange: '€140/day',
      luxury: '€250+/day'
    }
  }
};

export default function IslandGuide() {
  const { slug } = useParams();
  const island = islandData[slug as keyof typeof islandData];

  if (!island) {
    return <div className="min-h-screen flex items-center justify-center">Island not found</div>;
  }

  return (
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
  );
}
