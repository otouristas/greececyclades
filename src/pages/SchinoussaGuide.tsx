import { islandGuides } from '../data/islandsData';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';

export default function SchinoussaGuide() {
  const schinoussa = islandGuides.find(island => island.id === 'schinoussa')!;
  
  // Gallery images
  const galleryImages = [
    { src: '/images/islands/schinoussa/schinoussa-main.jpg', alt: 'Schinoussa harbor view' },
    { src: '/images/islands/schinoussa/beach-view.jpg', alt: 'Beautiful beach in Schinoussa' },
    { src: '/images/islands/schinoussa/village.jpg', alt: 'Traditional village in Schinoussa' },
    { src: '/images/islands/schinoussa/hiking-trail.jpg', alt: 'Scenic hiking trail' },
    { src: '/images/islands/schinoussa/sunset.jpg', alt: 'Stunning sunset in Schinoussa' },
    { src: '/images/islands/schinoussa/local-cuisine.jpg', alt: 'Traditional Greek food' },
    { src: '/images/islands/schinoussa/boat-trip.jpg', alt: 'Boat trip around the island' },
    { src: '/images/islands/schinoussa/aerial-view.jpg', alt: 'Aerial view of Schinoussa' },
  ];
  
  return (
    <>
      <SEO 
        title="Schinoussa Island Guide | Greece Cyclades"
        description="Discover the untouched beauty of Schinoussa island. Pristine beaches, authentic villages, and tranquil atmosphere in this Small Cyclades gem."
        canonicalUrl="/guides/schinoussa"
      />
      
      <div className="bg-gray-50">
        {/* Hero Section */}
        <IslandGuideHero 
          name={schinoussa.name}
          description={schinoussa.description}
          image="/images/islands/schinoussa.jpg"
          bestTime={schinoussa.bestTime}
          idealFor={schinoussa.idealFor}
        />
        
        {/* Introduction Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Schinoussa</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Schinoussa is a tiny island paradise in the Small Cyclades, located south of Naxos. 
                  With its pristine beaches, crystal-clear waters, and authentic Greek atmosphere, 
                  this hidden gem offers a perfect escape from the crowds and noise of more popular destinations.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Covering just 8.5 square kilometers, Schinoussa may be small in size but is immense in natural 
                  beauty and charm. The island features gentle hills, fertile valleys, and stunning coastlines 
                  with over 15 beautiful beaches. Its two main settlements, Chora (the main village) and Messaria, 
                  preserve the traditional Cycladic architecture and way of life.
                </p>
                <p className="text-lg text-gray-600 dark:text-white/60">
                  Whether you're seeking peaceful relaxation, hiking adventures, or an authentic taste of 
                  Greek island life, Schinoussa offers a genuine experience far from mass tourism. 
                  The island's slow pace and friendly locals create an atmosphere that invites visitors 
                  to unwind and connect with nature and tradition.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                  <img 
                    src="/images/islands/schinoussa/village-view.jpg" 
                    alt="Schinoussa village view" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                  <img 
                    src="/images/islands/schinoussa/beach-cove.jpg" 
                    alt="Beautiful beach cove in Schinoussa" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md col-span-2">
                  <img 
                    src="/images/islands/schinoussa/panorama.jpg" 
                    alt="Panoramic view of Schinoussa" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* When to Visit Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">When to Visit</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Schinoussa enjoys a typical Mediterranean climate with mild winters and warm, dry summers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-blue-50 dark:bg-cyan-600/10 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Best Time to Visit</h3>
                  <p className="text-gray-600 mb-4">
                    The ideal time to visit Schinoussa is from late May to early October when the weather is warm 
                    and perfect for swimming and outdoor activities. July and August are the busiest months, 
                    though even then, Schinoussa remains relatively quiet compared to larger Cycladic islands.
                  </p>
                  <p className="text-gray-600 dark:text-white/60">
                    For those seeking complete tranquility and a more authentic experience, consider visiting in 
                    May, June, or September when the weather is still pleasant but with fewer visitors.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Summer (June-August)</h4>
                    <p className="text-gray-600 text-sm">
                      {schinoussa.weather.summer}. Perfect for beach activities and swimming.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Autumn (Sept-Nov)</h4>
                    <p className="text-gray-600 text-sm">
                      {schinoussa.weather.autumn}. Great for hiking and exploring.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Winter (Dec-Feb)</h4>
                    <p className="text-gray-600 text-sm">
                      {schinoussa.weather.winter}. Quiet season with limited services.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Spring (Mar-May)</h4>
                    <p className="text-gray-600 text-sm">
                      {schinoussa.weather.spring}. Beautiful wildflowers and mild temperatures.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Seasonal Highlights</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Panigiri Festival (July-August):</strong> Experience 
                      traditional Greek celebrations with music, dancing, and local food during the summer months.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Easter Celebrations:</strong> If you visit during Greek Orthodox 
                      Easter, you'll witness authentic religious traditions and community celebrations.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Spring Wildflowers (April-May):</strong> The island becomes 
                      carpeted with colorful wildflowers, creating stunning landscapes for hiking and photography.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Harvest Season (September-October):</strong> Witness local 
                      agricultural activities as residents harvest grapes, figs, and other produce.
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8 bg-yellow-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Traveler's Tip</h4>
                  <p className="text-gray-600 dark:text-white/60">
                    Ferry connections to Schinoussa are less frequent during the off-season (November to April). 
                    If planning a visit during these months, check ferry schedules carefully and consider potential 
                    weather disruptions. Many businesses, including restaurants and accommodations, may have limited 
                    operations or be closed during the winter months.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Beaches Section */}
        <section id="beaches" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Beautiful Beaches</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Schinoussa boasts over 15 pristine beaches with crystal-clear waters and unique characteristics.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/schinoussa/tsigouri-beach.jpg" 
                  alt="Tsigouri Beach" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Tsigouri Beach</h3>
                  <p className="text-gray-600 mb-4">
                    The most popular and accessible beach on the island, located just a short walk from Chora. 
                    This sandy beach features crystal-clear turquoise waters and is ideal for families with children 
                    due to its shallow waters and proximity to amenities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Sandy</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Organized</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Family-friendly</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/schinoussa/lioliou-beach.jpg" 
                  alt="Lioliou Beach" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Lioliou Beach</h3>
                  <p className="text-gray-600 mb-4">
                    A secluded beach on the northeastern side of the island, accessible via a short hiking path. 
                    This untouched beach offers privacy and natural beauty with its golden sand and emerald waters. 
                    Perfect for those seeking tranquility away from crowds.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Sandy</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Unorganized</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Secluded</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/schinoussa/almyros-beach.jpg" 
                  alt="Almyros Beach" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Almyros Beach</h3>
                  <p className="text-gray-600 mb-4">
                    Located on the southern coast, this beautiful beach features a mix of sand and small pebbles 
                    with crystal-clear waters. It's relatively sheltered from winds and offers natural shade from 
                    surrounding trees, making it ideal for a full day of relaxation.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Mixed</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Natural shade</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Sheltered</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/schinoussa/psili-ammos-beach.jpg" 
                  alt="Psili Ammos Beach" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Psili Ammos Beach</h3>
                  <p className="text-gray-600 mb-4">
                    True to its name ("Fine Sand"), this beach features soft golden sand and shallow, warm waters. 
                    Located on the eastern side of the island, it's ideal for families with young children. 
                    The beach is partially organized during high season with a few sunbeds and a small canteen.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Sandy</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Partially organized</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Family-friendly</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/schinoussa/fidou-beach.jpg" 
                  alt="Fidou Beach" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Fidou Beach</h3>
                  <p className="text-gray-600 mb-4">
                    A remote beach on the western coast, accessible only by boat or a challenging hiking trail. 
                    This hidden gem offers complete privacy and untouched natural beauty. The beach features 
                    impressive rock formations and crystal-clear waters perfect for snorkeling.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Mixed</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Remote</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Snorkeling</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/schinoussa/gerolimnionas-beach.jpg" 
                  alt="Gerolimnionas Beach" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Gerolimnionas Beach</h3>
                  <p className="text-gray-600 mb-4">
                    One of the most beautiful beaches on the island, featuring a small cove with emerald waters 
                    and fine sand. Located on the southwestern coast, it's accessible via a moderate hiking path 
                    and offers a sense of discovery. The surrounding cliffs provide some natural shade.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Sandy</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Unorganized</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Scenic</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-blue-50 dark:bg-cyan-600/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Beach Tips</h3>
              <ul className="space-y-2 text-gray-600 dark:text-white/60">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Most beaches on Schinoussa are unorganized, so bring water, snacks, and sun protection.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Consider packing a small umbrella for beaches without natural shade.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Wear appropriate footwear for hiking to the more remote beaches.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Respect the natural environment and take all trash with you when leaving.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Activities Section */}
        <section id="activities" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Things to Do</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Beyond its beautiful beaches, Schinoussa offers a variety of activities to enjoy the island's natural beauty and authentic culture.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/schinoussa/hiking.jpg" 
                  alt="Hiking in Schinoussa" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Hiking Trails</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    Explore Schinoussa's natural beauty on foot through a network of walking paths that connect 
                    villages, beaches, and viewpoints. The island's small size makes it perfect for hiking, with 
                    most trails offering stunning sea views. Don't miss the path from Chora to Messaria and the 
                    coastal trail connecting several beaches on the eastern shore.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/schinoussa/village-exploration.jpg" 
                  alt="Village Exploration" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Village Exploration</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    Wander through Chora, the main village, with its whitewashed houses, narrow alleys, and 
                    blue-domed churches. Visit the small folklore museum to learn about local traditions and 
                    history. Don't miss Messaria, the island's second settlement, for an authentic glimpse of 
                    traditional Cycladic village life away from tourism.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/schinoussa/boat-tour.jpg" 
                  alt="Boat Tours" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Boat Tours</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    Join a boat tour to explore Schinoussa's coastline and visit secluded beaches inaccessible by 
                    land. Many tours also include visits to neighboring Small Cyclades islands like Koufonisia, 
                    Iraklia, and Donoussa. These excursions offer opportunities for swimming in crystal-clear waters 
                    and discovering hidden caves and coves.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/schinoussa/snorkeling.jpg" 
                  alt="Snorkeling and Swimming" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Snorkeling and Swimming</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    The pristine waters around Schinoussa are perfect for snorkeling, with excellent visibility and 
                    diverse marine life. Bring your own equipment and explore the underwater world at beaches like 
                    Fidou and Gerolimnionas. The calm, clear waters also make swimming a delight at any of the 
                    island's beautiful beaches.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/schinoussa/local-products.jpg" 
                  alt="Local Products" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Products</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    Sample and purchase authentic local products including thyme honey, goat cheese, herbs, and 
                    homemade preserves. Visit the small farms and meet local producers who maintain traditional 
                    methods. These products make excellent souvenirs and offer a taste of Schinoussa's culinary 
                    heritage to take home.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/images/islands/schinoussa/stargazing.jpg" 
                  alt="Stargazing" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Stargazing</h3>
                  <p className="text-gray-600 dark:text-white/60">
                    Experience the magic of Schinoussa's night sky, unpolluted by artificial light. The island's 
                    remote location and minimal light pollution create perfect conditions for stargazing. Find a 
                    comfortable spot on one of the beaches or hilltops and witness the Milky Way and countless 
                    stars in all their glory.
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
                Discover the authentic flavors of Schinoussa through its traditional cuisine and local products.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Local Specialties</h3>
                <ul className="space-y-4 text-gray-600 dark:text-white/60">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Fresh Seafood:</strong> As a small island with a fishing tradition, Schinoussa offers excellent fresh seafood including octopus, squid, and a variety of fish caught daily by local fishermen.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Xirotiri:</strong> A local hard cheese made from goat's milk, aged and preserved in olive oil. It has a distinctive tangy flavor and is often served as a meze or grated over pasta.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Chickpea Balls:</strong> A traditional dish made from ground chickpeas mixed with herbs and spices, shaped into balls and fried. A delicious vegetarian option often served with yogurt sauce.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Thyme Honey:</strong> The island produces excellent honey with a distinctive flavor from the abundant wild thyme that grows on its hills.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Marathotiganites:</strong> Fennel fritters made with fresh fennel, herbs, and flour, then fried to golden perfection. A unique local appetizer.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Pasteli:</strong> A traditional sweet made from sesame seeds and honey, formed into bars. The perfect natural energy snack for hiking or beach days.
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                  <img 
                    src="/images/islands/schinoussa/seafood-dish.jpg" 
                    alt="Fresh seafood dish" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-white/10">
                  <img 
                    src="/images/islands/schinoussa/local-cheese.jpg" 
                    alt="Local cheese and honey" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md col-span-2">
                  <img 
                    src="/images/islands/schinoussa/taverna.jpg" 
                    alt="Traditional taverna in Schinoussa" 
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
                    <h4 className="text-xl font-medium text-gray-900 mb-3">Traditional Tavernas</h4>
                    <p className="text-gray-600 mb-4">
                      Schinoussa has several family-run tavernas serving authentic Greek cuisine with an emphasis 
                      on local ingredients. Most are located in Chora and offer homestyle cooking in a relaxed 
                      atmosphere. Try "Deli Restaurant" or "Nikolas Taverna" for excellent traditional dishes.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      Don't miss the opportunity to try the catch of the day, always fresh and simply prepared 
                      with olive oil, lemon, and herbs.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium text-gray-900 mb-3">Cafes & Bakeries</h4>
                    <p className="text-gray-600 mb-4">
                      Start your day with Greek coffee and freshly baked pastries at one of the small cafes in Chora. 
                      These establishments often double as mini-markets where you can purchase snacks and supplies 
                      for beach picnics.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      In the afternoon, enjoy a refreshing frappe (iced coffee) or fresh fruit juice while watching 
                      island life unfold around you.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium text-gray-900 mb-3">Local Farms</h4>
                    <p className="text-gray-600 mb-4">
                      Some local farms welcome visitors and offer tastings of their products, including cheese, 
                      honey, and preserves. These visits provide insight into traditional agricultural practices 
                      and the opportunity to purchase authentic products directly from producers.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      Ask at your accommodation for recommendations on which farms are currently open to visitors.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium text-gray-900 mb-3">Evening Drinks</h4>
                    <p className="text-gray-600 mb-4">
                      Schinoussa's nightlife is low-key and centered around a few casual bars in Chora. Enjoy 
                      local wines, ouzo, or creative cocktails while chatting with locals and fellow travelers 
                      in a friendly, relaxed atmosphere.
                    </p>
                    <p className="text-gray-600 dark:text-white/60">
                      "Schinoussa Bar" offers a good selection of drinks and occasional live music during the 
                      summer months.
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
                Explore the beauty of Schinoussa through our collection of stunning photographs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`rounded-lg overflow-hidden shadow-md ${
                    index === 0 || index === 7 ? 'sm:col-span-2 sm:row-span-2' : ''
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
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How to Get to Schinoussa</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Schinoussa is accessible by ferry from Athens and neighboring Cycladic islands.
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
                        <span><strong>From Athens (Piraeus):</strong> Regular ferry connections operate from the port of Piraeus, taking approximately 5-8 hours depending on the type of vessel and route.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>From Naxos:</strong> The most convenient connection is from Naxos, with more frequent ferries taking about 1-2 hours to reach Schinoussa.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>From Other Islands:</strong> Schinoussa is connected to other Small Cyclades islands (Koufonisia, Iraklia, Donoussa) as well as Amorgos with regular ferry services.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Ferry Types:</strong> Both conventional ferries and high-speed catamarans serve Schinoussa, with more frequent connections during the summer months.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Getting Around</h3>
                    <ul className="space-y-3 text-gray-600 dark:text-white/60">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>On Foot:</strong> Schinoussa is small enough to explore entirely on foot. The main village (Chora) is just a short walk from the port, and most beaches are accessible via walking paths.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Bicycle Rental:</strong> A few places in Chora offer bicycle rentals, which can be a convenient way to explore the island more quickly.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Local Transport:</strong> During summer, there is limited bus service connecting the port, Chora, and some beaches. Taxis are very limited, so it's best not to rely on them.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Boat Taxi:</strong> Small boats operate from the main port to various beaches around the island during the summer season.</span>
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
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience Schinoussa?</h2>
                <p className="text-lg text-white mb-8">
                  Plan your perfect getaway to this hidden gem of the Small Cyclades. Pristine beaches, 
                  authentic village life, and the tranquility of unspoiled nature await you on this enchanting island.
                </p>
                
                <div className="bg-blue-50 dark:bg-cyan-600/100 bg-opacity-30 rounded-lg p-4 mb-8 inline-block">
                  <span className="text-white font-medium">
                    Best time to visit: {schinoussa.bestTime}
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
                  src="/images/islands/schinoussa/schinoussa-cta.jpg" 
                  alt="Stunning view of Schinoussa" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </>
  );
}


