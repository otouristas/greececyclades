import { Helmet } from 'react-helmet-async';
import { MapPin, Calendar, Users, Star, Info, Compass, Sunrise, Sailboat, Utensils } from 'lucide-react';

export default function Activities() {
  // Popular activities categories
  const categories = [
    {
      title: 'Sailing & Boat Tours',
      description: 'Explore the stunning coastlines and hidden coves of the Cyclades islands',
      icon: <Sailboat className="h-8 w-8 text-blue-500" />,
      image: '/images/activities/santorini-catamaran-main.jpg'
    },
    {
      title: 'Cultural Experiences',
      description: 'Discover the rich history and traditions of the Greek islands',
      icon: <Compass className="h-8 w-8 text-blue-500" />,
      image: '/images/islands/santorini/akrotiri.jpg'
    },
    {
      title: 'Water Sports',
      description: 'Enjoy thrilling adventures on the crystal-clear waters of the Aegean Sea',
      icon: <Sunrise className="h-8 w-8 text-blue-500" />,
      image: '/images/activities/milos-kayaking-main.jpg'
    },
    {
      title: 'Food & Wine',
      description: 'Taste authentic Greek cuisine and local wines in picturesque settings',
      icon: <Utensils className="h-8 w-8 text-blue-500" />,
      image: '/images/activities/photo-1657049871092-092b2bfd4094.avif'
    }
  ];

  // FAQs about activities in the Cyclades
  const faqs = [
    {
      question: 'What are the most popular activities in the Cyclades?',
      answer: 'The most popular activities in the Cyclades include sailing tours around Santorini\'s caldera, wine tasting experiences, cooking classes featuring local cuisine, water sports like kayaking and paddleboarding, hiking ancient trails on islands like Naxos and Amorgos, and guided archaeological tours of sites such as Delos near Mykonos.'
    },
    {
      question: 'When is the best time to book activities in the Cyclades?',
      answer: 'For peak season (July-August), it\'s recommended to book activities at least 1-2 weeks in advance, as popular tours often sell out. For unique experiences like private sailing trips or specialized workshops, booking 3-4 weeks ahead is advisable. In shoulder seasons (May-June, September-October), booking a few days in advance is usually sufficient except for highly sought-after experiences.'
    },
    {
      question: 'Are activities in the Cyclades suitable for families with children?',
      answer: 'Many activities in the Cyclades are family-friendly, though it varies by type. Most sailing tours, beach activities, and cultural experiences welcome children, with many operators offering special family rates. For water sports and adventure activities, age restrictions may apply. When booking, look for "family-friendly" labels or contact the provider to confirm suitability for your children\'s ages.'
    },
    {
      question: 'What should I bring for outdoor activities in the Cyclades?',
      answer: 'For outdoor activities in the Cyclades, essentials include sun protection (sunscreen, hat, sunglasses), water shoes for rocky beaches, a refillable water bottle, swimwear, a light cover-up for wind protection, and a small waterproof bag for valuables. For hiking, proper walking shoes are recommended. Most boat tours provide snorkeling equipment, but you may want to bring your own mask if you prefer.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Top-Rated Activities & Tours in the Cyclades Islands | Greece Cyclades</title>
        <meta name="description" content="Discover and book the best activities and tours in the Cyclades islands. From sailing adventures to cultural experiences, find unforgettable things to do in Santorini, Mykonos, and beyond." />
        <link rel="canonical" href="https://greececyclades.com/activities" />
        {/* GetYourGuide Analytics */}
        <script async defer src="https://widget.getyourguide.com/dist/pa.umd.production.min.js" data-gyg-partner-id="YFXNELL"></script>
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/activities/activities-hero.jpg" 
            alt="Activities in the Cyclades Islands" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 opacity-80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Unforgettable Activities in the Cyclades
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover and book the best tours, experiences, and things to do across the Greek islands
            </p>
          </div>
          
          {/* Activity Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {categories.map((category, index) => (
              <a 
                key={index} 
                href="https://gyg.me/8JOjW1PH" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105"
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-blue-100 text-sm">{category.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* GetYourGuide Widget Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse & Book Activities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find the perfect experiences for your island adventure with our curated selection
            </p>
          </div>
          
          {/* GetYourGuide Widget */}
          <div id="activities-widget" className="min-h-[600px]">
            <div data-gyg-href="https://widget.getyourguide.com/default/activities.frame" 
                 data-gyg-location-id="751" 
                 data-gyg-locale-code="en-US" 
                 data-gyg-widget="activities" 
                 data-gyg-number-of-items="16" 
                 data-gyg-partner-id="YFXNELL" 
                 data-gyg-columns="3" 
                 data-gyg-background-color="#ffffff" 
                 data-gyg-deal-background-color="#fff8f3" 
                 data-gyg-padding="24">
              <span>Powered by <a target="_blank" rel="sponsored" href="https://www.getyourguide.com/cyclades-l751/">GetYourGuide</a></span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Why Book With Us Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Book With Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We partner with the best local providers to offer you exceptional experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Free Cancellation</h3>
              <p className="text-gray-600">
                Plans change? No problem. Most activities offer free cancellation up to 24 hours before the experience.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Reviews</h3>
              <p className="text-gray-600">
                Book with confidence knowing that all reviews come from real travelers who have experienced the activity.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Local Expertise</h3>
              <p className="text-gray-600">
                Our activities are led by knowledgeable local guides who provide authentic and memorable experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Destinations Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Destinations for Activities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore the most popular islands for unforgettable experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <a 
              href="https://gyg.me/8JOjW1PH" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative h-80 rounded-xl overflow-hidden group"
            >
              <img 
                src="/images/islands/santorini-island.webp" 
                alt="Activities in Santorini" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center text-white mb-2">
                  <MapPin className="h-5 w-5 mr-2 text-blue-300" />
                  <h3 className="text-2xl font-bold">Santorini</h3>
                </div>
                <p className="text-gray-200 text-sm">
                  Sail around the caldera, explore volcanic hot springs, and enjoy sunset wine tours
                </p>
              </div>
            </a>
            
            <a 
              href="https://gyg.me/8JOjW1PH" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative h-80 rounded-xl overflow-hidden group"
            >
              <img 
                src="/images/islands/mykonos-island.jpg" 
                alt="Activities in Mykonos" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center text-white mb-2">
                  <MapPin className="h-5 w-5 mr-2 text-blue-300" />
                  <h3 className="text-2xl font-bold">Mykonos</h3>
                </div>
                <p className="text-gray-200 text-sm">
                  Experience water sports, day trips to Delos, and vibrant beach activities
                </p>
              </div>
            </a>
            
            <a 
              href="https://gyg.me/8JOjW1PH" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative h-80 rounded-xl overflow-hidden group"
            >
              <img 
                src="/images/islands/naxos-island.jpg" 
                alt="Activities in Naxos" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center text-white mb-2">
                  <MapPin className="h-5 w-5 mr-2 text-blue-300" />
                  <h3 className="text-2xl font-bold">Naxos</h3>
                </div>
                <p className="text-gray-200 text-sm">
                  Discover hiking trails, cooking classes, and authentic cultural experiences
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {/* SEO Content Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Activities in the Cyclades Islands</h2>
            
            <div className="prose prose-lg prose-blue max-w-none">
              <p>
                The Cyclades islands offer a diverse range of activities that cater to all types of travelers. From adrenaline-pumping water sports to relaxing cultural experiences, these iconic Greek islands provide the perfect backdrop for unforgettable adventures.
              </p>
              
              <h3>Water Activities</h3>
              
              <p>
                With their crystal-clear waters and stunning coastlines, the Cyclades are a paradise for water enthusiasts. Sailing tours around Santorini's caldera offer breathtaking views of the volcanic landscape and the opportunity to swim in natural hot springs. In Mykonos and Paros, windsurfing and kitesurfing are popular thanks to the consistent Meltemi winds that blow during summer.
              </p>
              
              <p>
                For those seeking a more relaxed experience, kayaking along the dramatic coastlines of Milos allows you to discover hidden caves and secluded beaches accessible only by sea. Snorkeling and diving reveal the rich underwater world of the Aegean, with visibility often exceeding 30 meters.
              </p>
              
              <h3>Cultural Experiences</h3>
              
              <p>
                Beyond their natural beauty, the Cyclades islands boast a rich cultural heritage dating back thousands of years. Guided tours of archaeological sites such as Ancient Delos (near Mykonos) and Ancient Thira (in Santorini) offer fascinating insights into the islands' history.
              </p>
              
              <p>
                Cooking classes featuring traditional Cycladic cuisine have become increasingly popular, allowing visitors to learn about local ingredients and techniques. In Naxos and Tinos, these culinary experiences often include visits to local farms and cheese producers, providing a comprehensive understanding of the islands' gastronomic traditions.
              </p>
              
              <h3>Outdoor Adventures</h3>
              
              <p>
                The diverse landscapes of the Cyclades make them ideal for hiking and outdoor exploration. Amorgos, with its dramatic cliffs and ancient walking paths, offers some of the most spectacular hiking routes in Greece. In Folegandros and Sifnos, well-marked trails connect traditional villages, offering glimpses into authentic island life.
              </p>
              
              <p>
                Horseback riding along beaches and through rural landscapes provides a unique perspective on the islands' natural beauty. For those seeking more adventurous experiences, rock climbing in Kalymnos and canyoning in Naxos offer thrilling challenges against stunning backdrops.
              </p>
              
              <h3>Booking Tips</h3>
              
              <p>
                When planning activities in the Cyclades, consider the season of your visit. While summer offers perfect conditions for water sports and sailing, spring and autumn provide milder temperatures ideal for hiking and cultural experiences. Many activities are weather-dependent, so building some flexibility into your itinerary is advisable.
              </p>
              
              <p>
                For the best experience, book popular activities in advance, especially during the high season (July-August). This ensures availability and often secures better rates. Many providers offer online booking with free cancellation policies, giving you peace of mind should your plans change.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQs Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about activities in the Cyclades islands
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <h3 className="text-xl font-medium text-gray-900 flex items-start">
                  <Info className="h-6 w-6 text-blue-500 flex-shrink-0 mr-2" />
                  <span>{faq.question}</span>
                </h3>
                <div className="mt-3 text-gray-600 ml-8">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready for Your Island Adventure?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Book your activities now and create unforgettable memories in the Cyclades
          </p>
          <a 
            href="#activities-widget"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            onClick={(e) => {
              e.preventDefault();
              const widget = document.getElementById('activities-widget');
              if (widget) {
                widget.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Browse Activities
            <Compass className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}