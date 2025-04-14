import React from 'react';
import { 
  FaUmbrellaBeach, 
  FaMapMarkedAlt, 
  FaShip, 
  FaUtensils, 
  FaSun, 
  FaCameraRetro, 
  FaSwimmer,
  FaHiking,
  FaHome,
  FaHotel
} from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { islandGuides } from '../data/islandsData';

const AmorgosGuide: React.FC = () => {
  const amorgos = islandGuides.find(island => island.id === 'amorgos');

  if (!amorgos) {
    return <div>Island not found</div>;
  }

  const seoData = {
    title: "Amorgos Travel Guide 2025 - Best Places to Visit & Things to Do",
    description: "Plan your perfect Amorgos vacation with our comprehensive 2025 travel guide. Discover the best hotels, restaurants, beaches, and activities. From the iconic monastery of Hozoviotissa to pristine beaches and authentic Cycladic villages.",
    keywords: [
      'Amorgos travel guide',
      'Amorgos beaches',
      'Hozoviotissa monastery',
      'Greek islands',
      'Amorgos villages',
      'Chora Amorgos',
      'Cycladic islands',
      'Amorgos hiking',
      'Amorgos restaurants',
      'best time to visit Amorgos'
    ],
    ogImage: amorgos.image,
    ogType: 'article'
  };

  // Photo gallery images
  const galleryImages = [
    {
      src: "/images/islands/amorgos/gallery/amorgos-monastery.jpg",
      alt: "The iconic Hozoviotissa Monastery clinging to the cliffside"
    },
    {
      src: "/images/islands/amorgos/gallery/amorgos-chora.jpg",
      alt: "The picturesque Chora of Amorgos with its whitewashed buildings"
    },
    {
      src: "/images/islands/amorgos/gallery/amorgos-agia-anna.jpg",
      alt: "The stunning beach of Agia Anna made famous by 'The Big Blue' movie"
    },
    {
      src: "/images/islands/amorgos/gallery/amorgos-aegiali.jpg",
      alt: "The beautiful bay of Aegiali with its sandy beach"
    },
    {
      src: "/images/islands/amorgos/gallery/amorgos-hiking.jpg",
      alt: "Hiking on one of Amorgos' scenic trails with breathtaking views"
    },
    {
      src: "/images/islands/amorgos/gallery/amorgos-katapola.jpg",
      alt: "The port village of Katapola with traditional fishing boats"
    }
  ];

  // Categories for Quick Navigation
  const categories = [
    {
      icon: <FaShip className="text-blue-500" />,
      title: 'How to Get There',
      description: 'Ferry and travel info',
      link: '#transportation',
      id: 'transportation'
    },
    {
      icon: <FaUmbrellaBeach className="text-blue-500" />,
      title: 'Where to Swim',
      description: 'Best beaches',
      link: '#beaches',
      id: 'beaches'
    },
    {
      icon: <FaHiking className="text-blue-500" />,
      title: 'What to Do',
      description: 'Activities and attractions',
      link: '#activities',
      id: 'activities'
    },
    {
      icon: <FaUtensils className="text-blue-500" />,
      title: 'Where to Eat & Drink',
      description: 'Restaurants and bars',
      link: '#cuisine',
      id: 'cuisine'
    },
    {
      icon: <FaHome className="text-blue-500" />,
      title: 'Local Products',
      description: 'Specialties and delicacies',
      link: '#products',
      id: 'products'
    },
    {
      icon: <FaHotel className="text-blue-500" />,
      title: 'Where to Stay',
      description: 'Accommodations',
      link: '#accommodations',
      id: 'accommodations'
    }
  ];

  return (
    <>
      <SEO {...seoData} />
      
      <div className="bg-gray-50">
        <IslandGuideHero 
          name={amorgos.name || "Amorgos"}
          description={amorgos.description || "The Dramatic Island of the Big Blue"}
          image={amorgos.image}
          bestTime={amorgos.bestTime || "April to October, with May-June and September being ideal"}
          idealFor={amorgos.idealFor || ["Nature Lovers", "Hikers", "Spiritual Seekers", "Authentic Experience"]}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Welcome to Amorgos</h2>
              <p className="text-gray-700 leading-relaxed">
                Discover Amorgos, a captivating island in the eastern Cyclades known for its dramatic landscapes, 
                crystal-clear waters, and authentic Greek charm. Made famous by Luc Besson's film "The Big Blue," 
                this elongated island offers a perfect blend of natural beauty, spiritual energy, and traditional 
                Cycladic culture.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From the breathtaking Monastery of Hozoviotissa clinging to a cliff face to 
                picturesque villages and pristine beaches, Amorgos provides an unforgettable experience for 
                travelers seeking to connect with the authentic spirit of the Greek islands.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/islands/amorgos/landscape.jpg" 
                  alt="Amorgos Landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/islands/amorgos/monastery-detail.jpg" 
                    alt="Monastery of Hozoviotissa Detail" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((category, index) => (
                <a 
                  key={index}
                  href={category.link} 
                  className="flex items-center justify-center flex-col text-center px-4 py-3 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition duration-300"
                >
                  <div className="text-2xl mb-2">
                    {category.icon}
                  </div>
                  <span className="font-medium text-sm">{category.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* When to Visit Section */}
          <section id="when-to-visit" className="mb-16">
            <div className="flex items-center mb-6">
              <FaSun className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">When to Visit</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Amorgos enjoys a typical Mediterranean climate with hot, dry summers and mild winters. 
                  The island's weather is influenced by the meltemi winds that can be quite strong during 
                  the peak summer months.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">High Season (July-August)</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Warmest weather with temperatures between 25-30°C (77-86°F)</li>
                      <li>• Busiest period with more tourists and higher prices</li>
                      <li>• Strong meltemi winds can affect ferry schedules</li>
                      <li>• All facilities, restaurants, and accommodations operating</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Shoulder Season (May-June, September-October)</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Pleasant temperatures between 20-25°C (68-77°F)</li>
                      <li>• Fewer tourists but most facilities still open</li>
                      <li>• Ideal conditions for hiking and exploring</li>
                      <li>• More affordable accommodations</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Low Season (November-April)</h3>
                  <p className="text-gray-600 mb-3">
                    Winter in Amorgos is quiet but still charming:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Mild temperatures between 10-15°C (50-59°F)</li>
                    <li>• Many businesses close for the season</li>
                    <li>• Limited ferry connections</li>
                    <li>• Authentic local experience with few tourists</li>
                    <li>• Occasional rainfall, especially December through February</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Best Time to Visit</h3>
                  <p className="text-gray-600">
                    The ideal times to visit Amorgos are late May to early July and September, when the 
                    weather is warm but not too hot, the meltemi winds are less intense, and there are 
                    fewer tourists. These periods are perfect for hiking the island's many trails and 
                    enjoying its beaches without the crowds.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Villages Section */}
          <section id="villages" className="mb-16">
            <div className="flex items-center mb-6">
              <FaHome className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">Villages</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Amorgos is home to charming villages that showcase authentic Cycladic architecture and 
                  offer a glimpse into traditional island life. Each settlement has its own unique character 
                  and attractions worth exploring.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img 
                        src="/images/islands/amorgos/chora.jpg" 
                        alt="Chora of Amorgos" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Chora</h3>
                    <p className="text-gray-600 mb-3">
                      The capital of Amorgos is a stunning example of Cycladic architecture, perched on a hill 
                      with panoramic views. Its maze-like streets, whitewashed houses, blue-domed churches, and 
                      Venetian castle (Kastro) create a picturesque setting. Chora is known for:
                    </p>
                    <ul className="space-y-1 text-gray-600 mb-3">
                      <li>• Windmills offering spectacular views</li>
                      <li>• Traditional tavernas and cafes</li>
                      <li>• Loza square, the village's central meeting point</li>
                      <li>• Local shops selling handmade products</li>
                      <li>• The Archaeological Collection of Amorgos</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img 
                        src="/images/islands/amorgos/katapola.jpg" 
                        alt="Katapola port" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Katapola</h3>
                    <p className="text-gray-600 mb-3">
                      One of the main ports of Amorgos, Katapola is a picturesque harbor village with a 
                      relaxed atmosphere. The village is actually composed of three smaller settlements: 
                      Katapola, Rachidi, and Xylokeratidi. Highlights include:
                    </p>
                    <ul className="space-y-1 text-gray-600 mb-3">
                      <li>• Beautiful waterfront with fishing boats</li>
                      <li>• Seafood tavernas serving fresh catch</li>
                      <li>• Ancient Minoa archaeological site</li>
                      <li>• Nearby beaches within walking distance</li>
                      <li>• Traditional bakeries and cafes</li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img 
                        src="/images/islands/amorgos/aegiali.jpg" 
                        alt="Aegiali village and bay" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Aegiali</h3>
                    <p className="text-gray-600 mb-3">
                      The second main port of Amorgos, Aegiali is a beautiful bay with a sandy beach and 
                      a vibrant village. It's known for its relaxed atmosphere and is popular with younger 
                      travelers. The area includes:
                    </p>
                    <ul className="space-y-1 text-gray-600 mb-3">
                      <li>• Long sandy beach with clear waters</li>
                      <li>• Beachfront restaurants and bars</li>
                      <li>• Nearby mountain villages of Tholaria, Langada, and Potamos</li>
                      <li>• Starting point for many hiking trails</li>
                      <li>• Yoga and wellness centers</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img 
                        src="/images/islands/amorgos/tholaria.jpg" 
                        alt="Tholaria village" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Tholaria & Langada</h3>
                    <p className="text-gray-600 mb-3">
                      These traditional mountain villages above Aegiali offer authentic experiences and 
                      breathtaking views. Connected by scenic hiking paths, they provide a glimpse into 
                      traditional Amorgian life:
                    </p>
                    <ul className="space-y-1 text-gray-600 mb-3">
                      <li>• Traditional architecture with stone houses</li>
                      <li>• Panoramic views of Aegiali Bay</li>
                      <li>• Local festivals (panigyria) during summer</li>
                      <li>• Authentic tavernas serving local cuisine</li>
                      <li>• Access to the famous hiking trail to Stavros</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Other Notable Settlements</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Arkesini</h4>
                      <p className="text-sm text-gray-600">Ancient settlement with the Tower of Agia Triada nearby</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Vroutsi</h4>
                      <p className="text-sm text-gray-600">Traditional village with panoramic views and the Panagia Chozoviotissa church</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Kamari</h4>
                      <p className="text-sm text-gray-600">Small coastal settlement near Katapola with a peaceful atmosphere</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Xylokeratidi</h4>
                      <p className="text-sm text-gray-600">Part of Katapola bay with traditional houses and tavernas</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Potamos</h4>
                      <p className="text-sm text-gray-600">Small village near Aegiali with traditional character</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Kolofana</h4>
                      <p className="text-sm text-gray-600">Abandoned village that offers a glimpse into the past</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <div className="flex items-center mb-6">
              <FaUmbrellaBeach className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">Beaches</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Amorgos is known for its pristine beaches with crystal-clear waters. While not as famous for 
                  sandy beaches as other Cycladic islands, Amorgos offers unique swimming spots with dramatic 
                  backdrops and unspoiled natural beauty.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img 
                        src="/images/islands/amorgos/agia-anna.jpg" 
                        alt="Agia Anna Beach" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Agia Anna</h3>
                    <p className="text-gray-600 mb-3">
                      Made famous by Luc Besson's film "The Big Blue," this small pebble beach features 
                      dramatic cliffs and incredibly clear deep blue waters. Located near the Monastery 
                      of Hozoviotissa, it's one of the most photographed spots on the island.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Pebbles</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">No facilities</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Dramatic scenery</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Deep waters</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img 
                        src="/images/islands/amorgos/aegiali-beach.jpg" 
                        alt="Aegiali Beach" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Aegiali Beach</h3>
                    <p className="text-gray-600 mb-3">
                      The largest sandy beach on Amorgos, Aegiali offers a long stretch of golden sand 
                      and shallow waters, making it ideal for families. With full amenities and beachfront 
                      tavernas, it's the most organized beach on the island.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Sandy</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Sunbeds & umbrellas</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Beachfront tavernas</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Water sports</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Family-friendly</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img 
                        src="/images/islands/amorgos/mouros.jpg" 
                        alt="Mouros Beach" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Mouros Beach</h3>
                    <p className="text-gray-600 mb-3">
                      A stunning beach with large pebbles and crystal-clear turquoise waters. Surrounded by 
                      impressive rock formations and accessible by a path from the main road, Mouros offers 
                      a secluded swimming experience with dramatic natural beauty.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Pebbles</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Limited facilities</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Natural shade</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Scenic</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img 
                        src="/images/islands/amorgos/kalotaritissa.jpg" 
                        alt="Kalotaritissa Beach" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Kalotaritissa</h3>
                    <p className="text-gray-600 mb-3">
                      Located at the southwestern tip of Amorgos, this remote beach offers a peaceful 
                      environment with shallow waters. Nearby is the shipwreck of "Olympia," which can 
                      be visited by boat. The area includes several small coves to explore.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Sand & pebbles</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Basic taverna</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Remote location</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Shipwreck nearby</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Other Notable Beaches</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Levrossos</h4>
                      <p className="text-sm text-gray-600">Sandy beach near Aegiali with beach bars and tavernas</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Maltezi</h4>
                      <p className="text-sm text-gray-600">Small pebble beach near Katapola with crystal waters</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Plakes</h4>
                      <p className="text-sm text-gray-600">Rocky swimming spot with platforms and incredibly clear waters</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Paradisia</h4>
                      <p className="text-sm text-gray-600">Remote beach accessible by boat or hiking trail</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Kambi</h4>
                      <p className="text-sm text-gray-600">Quiet pebble beach on the northeastern coast</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Agios Pavlos</h4>
                      <p className="text-sm text-gray-600">Small beach with a chapel, near Katapola</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <div className="flex items-center mb-6">
              <FaHiking className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">Activities</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Amorgos offers a variety of activities beyond its beaches, with a particular focus on 
                  outdoor adventures, cultural experiences, and spiritual exploration. The island's dramatic 
                  landscapes and rich heritage provide the perfect backdrop for memorable experiences.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Hiking & Nature</h3>
                    <p className="text-gray-600 mb-3">
                      Amorgos is a hiker's paradise with an extensive network of well-marked trails that 
                      connect villages and traverse stunning landscapes:
                    </p>
                    <ul className="space-y-2 text-gray-600 mb-4">
                      <li>• <span className="font-medium">Ancient Paved Paths</span> - Follow the traditional stone-paved paths (kalderimia) that have connected island settlements for centuries</li>
                      <li>• <span className="font-medium">Chora to Hozoviotissa</span> - A short but spectacular path to the monastery with breathtaking sea views</li>
                      <li>• <span className="font-medium">Aegiali to Langada to Tholaria</span> - A circular route connecting mountain villages</li>
                      <li>• <span className="font-medium">The Amorgos Trail</span> - A long-distance path traversing the entire island</li>
                      <li>• <span className="font-medium">Asfontylitis Windmills</span> - Hike to the abandoned windmills for panoramic views</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Cultural & Spiritual Experiences</h3>
                    <p className="text-gray-600 mb-3">
                      Explore the rich cultural and spiritual heritage of Amorgos:
                    </p>
                    <ul className="space-y-2 text-gray-600 mb-4">
                      <li>• <span className="font-medium">Monastery of Hozoviotissa</span> - Visit the dazzling white 11th-century monastery built into a cliff face 300 meters above the sea</li>
                      <li>• <span className="font-medium">Archaeological Sites</span> - Explore ancient Minoa near Katapola and the Tower of Agia Triada</li>
                      <li>• <span className="font-medium">Local Festivals</span> - Experience traditional panigyria (religious festivals) with music, dance, and food</li>
                      <li>• <span className="font-medium">Yoga Retreats</span> - Join one of the many yoga and wellness centers, particularly around Aegiali</li>
                      <li>• <span className="font-medium">Local Crafts</span> - Watch demonstrations of traditional crafts like weaving and herb collection</li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Water Activities</h3>
                    <p className="text-gray-600 mb-3">
                      The crystal-clear waters around Amorgos are perfect for various water activities:
                    </p>
                    <ul className="space-y-2 text-gray-600 mb-4">
                      <li>• <span className="font-medium">Snorkeling & Diving</span> - Explore underwater caves, reefs, and the shipwreck of "Olympia"</li>
                      <li>• <span className="font-medium">Boat Tours</span> - Take a tour around the island to access remote beaches and coves</li>
                      <li>• <span className="font-medium">Sea Kayaking</span> - Paddle along the dramatic coastline and discover hidden caves</li>
                      <li>• <span className="font-medium">Fishing</span> - Join local fishermen for a traditional fishing experience</li>
                      <li>• <span className="font-medium">Swimming</span> - Enjoy the exceptionally clear waters at various beaches and coves</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Food & Shopping</h3>
                    <p className="text-gray-600 mb-3">
                      Taste and take home the flavors and crafts of Amorgos:
                    </p>
                    <ul className="space-y-2 text-gray-600 mb-4">
                      <li>• <span className="font-medium">Cooking Classes</span> - Learn to prepare traditional Amorgian dishes</li>
                      <li>• <span className="font-medium">Herb Collection</span> - Join guided tours to learn about and collect local herbs</li>
                      <li>• <span className="font-medium">Rakomelo Tasting</span> - Try the local specialty of raki with honey and herbs</li>
                      <li>• <span className="font-medium">Local Products</span> - Shop for psimeni raki (aged spirit), thyme honey, herbs, and handmade textiles</li>
                      <li>• <span className="font-medium">Farmers' Markets</span> - Visit local markets for fresh produce and homemade products</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Organized Activities & Tours</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Guided Hiking Tours</h4>
                      <p className="text-sm text-gray-600">Explore ancient paths with knowledgeable local guides</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Diving Excursions</h4>
                      <p className="text-sm text-gray-600">Certified diving centers offering courses and guided dives</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Island Boat Tours</h4>
                      <p className="text-sm text-gray-600">Full or half-day cruises around the island's coastline</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Yoga & Meditation</h4>
                      <p className="text-sm text-gray-600">Daily classes and retreats for all levels</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Photography Tours</h4>
                      <p className="text-sm text-gray-600">Capture the island's most photogenic locations</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Monastery Visits</h4>
                      <p className="text-sm text-gray-600">Guided tours of Hozoviotissa with historical context</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cuisine Section */}
          <section id="cuisine" className="mb-16">
            <div className="flex items-center mb-6">
              <FaUtensils className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">Cuisine</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Amorgos offers a rich culinary tradition that reflects its agricultural heritage and maritime location. 
                  The island's cuisine is characterized by fresh ingredients, simple preparation methods, and bold flavors.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Local Specialties</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Patatato</span> - A traditional meat stew with potatoes, 
                          cooked with onions, tomatoes, and local herbs.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Xerotigana</span> - Sweet pastries made of thin dough, 
                          fried and then dipped in honey and sprinkled with cinnamon and walnuts.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Ladotyri</span> - A local cheese preserved in olive oil, 
                          giving it a unique flavor and texture.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Psimeni Raki</span> - A traditional spirit flavored with 
                          honey, herbs, and cinnamon, often served as a digestif.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Pasteli</span> - A sweet made with sesame seeds and honey, 
                          a healthy energy snack enjoyed throughout Greece.
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Seafood & Main Dishes</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Fresh Fish</span> - Grilled or fried, served with local olive oil and lemon.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Kakavia</span> - A traditional fisherman's soup made with 
                          the catch of the day, potatoes, and vegetables.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Amorgian Fava</span> - Yellow split pea puree topped with 
                          onions, capers, and olive oil.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Goat with Herbs</span> - Slow-cooked goat meat with local herbs and wine.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <div>
                          <span className="font-medium">Marathotiganites</span> - Fennel fritters, a delicious appetizer 
                          made with local wild fennel.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Where to Eat</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Chora</h4>
                      <p className="text-sm text-gray-600">Traditional guesthouses with authentic character</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Katapola</h4>
                      <p className="text-sm text-gray-600">Waterfront hotels and apartments</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Aegiali</h4>
                      <p className="text-sm text-gray-600">Beach resorts and yoga retreats</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Culinary Experiences</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Visit local bakeries for fresh bread and traditional pastries</li>
                    <li>• Join a cooking class to learn how to prepare Amorgian specialties</li>
                    <li>• Experience a traditional Greek coffee preparation</li>
                    <li>• Tour the local distilleries that produce psimeni raki</li>
                    <li>• Participate in seasonal agricultural activities like olive or herb harvesting</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Photo Gallery */}
          <section id="gallery" className="mb-16">
            <div className="flex items-center mb-6">
              <FaCameraRetro className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">Photo Gallery</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-gray-600">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Transportation Section */}
          <section id="transportation" className="mb-16">
            <div className="flex items-center mb-6">
              <FaShip className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">How to Get There</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Amorgos is accessible primarily by ferry from Athens and other nearby islands. The island 
                  has two main ports: Katapola and Aegiali, both serving ferries from various destinations.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">By Ferry</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• <span className="font-medium">From Athens (Piraeus)</span> - Regular ferry connections, journey takes 7-9 hours</li>
                      <li>• <span className="font-medium">From Naxos</span> - Frequent connections, journey takes 1.5-2 hours</li>
                      <li>• <span className="font-medium">From Santorini</span> - Several weekly connections, journey takes 2-3 hours</li>
                      <li>• <span className="font-medium">From Mykonos</span> - Limited connections, usually with a stop at another island</li>
                      <li>• <span className="font-medium">From Small Cyclades</span> - Regular connections to Koufonisia, Donoussa, etc.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Getting Around</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• <span className="font-medium">Local Buses</span> - Connect the main villages and beaches</li>
                      <li>• <span className="font-medium">Taxis</span> - Available at both ports and in Chora</li>
                      <li>• <span className="font-medium">Car/Scooter Rental</span> - Several rental agencies in Katapola and Aegiali</li>
                      <li>• <span className="font-medium">Hiking</span> - Many destinations are accessible via the island's trail network</li>
                      <li>• <span className="font-medium">Boat Taxis</span> - Available for reaching remote beaches</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Accommodation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <FaHotel className="text-blue-500 mb-2" />
                      <h4 className="font-medium mb-1">Chora</h4>
                      <p className="text-sm text-gray-600">Traditional guesthouses with authentic character</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <FaHotel className="text-blue-500 mb-2" />
                      <h4 className="font-medium mb-1">Katapola</h4>
                      <p className="text-sm text-gray-600">Waterfront hotels and apartments</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <FaHotel className="text-blue-500 mb-2" />
                      <h4 className="font-medium mb-1">Aegiali</h4>
                      <p className="text-sm text-gray-600">Beach resorts and yoga retreats</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Water Activities Section */}
          <section id="water-activities" className="mb-16">
            <div className="flex items-center mb-6">
              <FaSwimmer className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">Water Activities</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  The crystal-clear waters surrounding Amorgos offer excellent opportunities for various water activities.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Swimming & Snorkeling</h3>
                    <p className="text-gray-600 mb-3">
                      The incredibly clear waters of Amorgos are perfect for swimming and snorkeling. Best spots include:
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Agia Anna - Deep blue waters with underwater rock formations</li>
                      <li>• Mouros Beach - Clear turquoise waters with rich marine life</li>
                      <li>• Maltezi - Protected cove with calm waters</li>
                      <li>• Plakes - Rocky platforms with direct access to deep waters</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Diving</h3>
                    <p className="text-gray-600 mb-3">
                      Amorgos gained fame as a diving destination after "The Big Blue" movie. Key diving sites:
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• The "Olympia" Shipwreck - Near Kalotaritissa beach</li>
                      <li>• Blue Caves - Along the eastern coastline</li>
                      <li>• Gramvousa Reef - Rich marine biodiversity</li>
                      <li>• Nikouria Island - Clear waters and underwater formations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Exploration Map */}
          <section id="map" className="mb-16">
            <div className="flex items-center mb-6">
              <FaMapMarkedAlt className="text-2xl text-blue-500 mr-3" />
              <h2 className="text-3xl font-bold">Exploration Map</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Use this map to plan your exploration of Amorgos. The island is elongated, with a length of about 33 km, 
                  and features dramatic landscapes, charming villages, and beautiful beaches.
                </p>
                
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img 
                    src="/images/islands/amorgos/amorgos-map.jpg" 
                    alt="Map of Amorgos Island" 
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-1">Northern Region</h4>
                    <p className="text-sm text-gray-600">Aegiali, Tholaria, Langada, Potamos</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-1">Central Region</h4>
                    <p className="text-sm text-gray-600">Chora, Katapola, Monastery of Hozoviotissa</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-1">Southern Region</h4>
                    <p className="text-sm text-gray-600">Arkesini, Kalotaritissa, Vroutsi</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-16 overflow-hidden rounded-2xl">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready to Experience Amorgos?</h2>
                    <p className="text-lg mb-8 opacity-90">
                      Start planning your perfect getaway to this dramatic Cycladic island with its stunning monastery, 
                      crystal-clear waters, and authentic Greek charm.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a 
                        href="/hotels/" 
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-block font-medium"
                      >
                        Find Accommodations
                      </a>
                      <a 
                        href="/ferry-tickets/" 
                        className="bg-transparent text-white border border-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors inline-block font-medium"
                      >
                        How to get there
                      </a>
                    </div>
                  </div>
                  <div className="relative hidden lg:block">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                      <img 
                        src="/images/islands/amorgos/best-time.jpg" 
                        alt="Best time to visit Amorgos" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-6 text-white">
                          <p className="text-sm font-medium mb-1">Best time to visit</p>
                          <p className="text-xl font-bold">April to October, with May-June and September being ideal</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AmorgosGuide;
