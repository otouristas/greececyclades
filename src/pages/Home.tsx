import { Link } from 'react-router-dom';
import { ArrowRight, Sun, Map, Compass, Plane, Building2, Car, Camera, UtensilsCrossed, Sparkles, Waves, MessageSquare, Ship, ChevronDown, Search } from 'lucide-react';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import '../styles/swiper.css';
import SearchBar from '../components/search/SearchBar';
import { cyclades } from '../data/cyclades';

interface SearchResult {
  type: 'island' | 'activity' | 'hotel' | 'ferry';
  title: string;
  description: string;
  path: string;
}

export default function Home() {
  const seoData = {
    title: `Discover Cyclades Islands ${SITE_TAGLINE}`,
    description: "Discover the magic of the Cyclades islands with our AI-powered travel guide. Plan your perfect Greek island-hopping adventure today."
  };

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Greececyclades.com",
    "description": "Your complete guide to the Cyclades islands in Greece",
    "url": "https://greececyclades.com",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Cyclades Islands",
      "containedInPlace": {
        "@type": "Country",
        "name": "Greece"
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    if (!query.trim()) {
      // Handle empty query
      return;
    }

    const results: SearchResult[] = [];
    const searchQueryLower = query.toLowerCase();

    // Search through islands
    cyclades.forEach(island => {
      if (
        island.name?.toLowerCase().includes(searchQueryLower) ||
        island.description?.toLowerCase().includes(searchQueryLower)
      ) {
        results.push({
          type: 'island',
          title: island.name || '',
          description: island.shortDescription || '',
          path: `/islands/${island.slug}`
        });
      }

      // Search through activities
      island.activities?.forEach(activity => {
        if (activity.toLowerCase().includes(searchQueryLower)) {
          results.push({
            type: 'activity',
            title: `${activity} in ${island.name}`,
            description: `Experience ${activity} on the beautiful island of ${island.name}`,
            path: `/islands/${island.slug}#activities`
          });
        }
      });
    });

    // Handle results
    console.log(results);
  };

  return (
    <>
      <SEO 
        {...seoData}
        structuredData={JSON.stringify(jsonLD)}
      />

      <div>
        {/* Hero Section */}
        <div className="relative min-h-screen">
          {/* Background Video/Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/home-hero-final.jpg" 
              alt="Greek Islands" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1E2E48]/70 via-[#1E2E48]/50 to-[#1E2E48]/80" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                Experience the Magic of{' '}
                <span className="bg-gradient-to-r from-[#E3D7C3] to-[#E3D7C3]/80 bg-clip-text text-transparent drop-shadow-none">
                  Greece
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-lg">
                Discover the enchanting Cyclades islands. From pristine beaches to ancient ruins, 
                plan your perfect Greek island adventure with us.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-16">
                <SearchBar />
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-[#1E2E48]/10 backdrop-blur-md rounded-2xl p-6 text-white hover:bg-[#1E2E48]/20 transition-colors cursor-pointer group shadow-lg">
                  <div className="bg-[#E3D7C3]/20 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Map className="w-6 h-6 text-[#E3D7C3]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">24 Islands</h3>
                  <p className="text-white/90">To Explore</p>
                </div>

                <div className="bg-[#1E2E48]/10 backdrop-blur-md rounded-2xl p-6 text-white hover:bg-[#1E2E48]/20 transition-colors cursor-pointer group shadow-lg">
                  <div className="bg-[#E3D7C3]/20 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Compass className="w-6 h-6 text-[#E3D7C3]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">Local Tips</h3>
                  <p className="text-white/90">From Experts</p>
                </div>

                <div className="bg-[#1E2E48]/10 backdrop-blur-md rounded-2xl p-6 text-white hover:bg-[#1E2E48]/20 transition-colors cursor-pointer group shadow-lg">
                  <div className="bg-[#E3D7C3]/20 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plane className="w-6 h-6 text-[#E3D7C3]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">Travel Info</h3>
                  <p className="text-white/90">Made Easy</p>
                </div>

                <div className="bg-[#1E2E48]/10 backdrop-blur-md rounded-2xl p-6 text-white hover:bg-[#1E2E48]/20 transition-colors cursor-pointer group shadow-lg">
                  <div className="bg-[#E3D7C3]/20 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Sun className="w-6 h-6 text-[#E3D7C3]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">Best Times</h3>
                  <p className="text-white/90">To Visit</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-12">
                <Link 
                  to="/touristas-ai"
                  className="inline-flex items-center px-8 py-4 bg-[#1E2E48] text-white rounded-xl font-medium hover:bg-[#1E2E48]/90 transition-all transform hover:scale-105 shadow-lg"
                >
                  Meet Touristas AI
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/islands"
                  className="inline-flex items-center px-8 py-4 bg-[#E3D7C3] text-[#1E2E48] rounded-xl font-medium hover:bg-[#E3D7C3]/90 transition-all transform hover:scale-105 shadow-lg"
                >
                  Explore Islands
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#E3D7C3]/70 animate-bounce">
            <ChevronDown className="h-6 w-6" />
          </div>
        </div>

        {/* Featured Services Section */}
        <section className="bg-gradient-to-b from-white to-[#E3D7C3]/20 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-[#1E2E48] mb-4">Plan Your Perfect Cyclades Getaway</h2>
              <p className="text-lg text-[#1E2E48]/80">Everything you need for an unforgettable Greek island experience</p>
            </div>
            
            {/* SEO Text for Services */}
            <div className="prose prose-lg mx-auto mb-12">
              <p className="text-[#1E2E48]/80 text-center">
                From practical travel tips and weather information to immersive cultural experiences and off-the-beaten-path adventures, GreeceCyclades.com provides everything you need to transform your Cyclades dreams into unforgettable memories. Start planning your journey today and discover why the Cyclades islands continue to captivate travelers year after year.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link to="/hotels" className="group transform transition-all duration-300 hover:-translate-y-2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <img 
                    src="/images/services/luxury-hotel.jpeg" 
                    alt="Luxury Hotels" 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2E48]/80 via-[#1E2E48]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <Building2 className="h-8 w-8 mb-3 transform group-hover:scale-110 transition-transform text-[#E3D7C3]" />
                    <h3 className="text-2xl font-semibold mb-1">Luxury Stays</h3>
                    <p className="text-white/90">Handpicked hotels & villas</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                    <img 
                      src="https://www.logoshape.com/wp-content/uploads/2024/09/agoda-logo-vector_logoshape.png" 
                      alt="Agoda" 
                      className="h-6 w-auto"
                    />
                  </div>
                </div>
              </Link>

              <Link to="/ferry-tickets" className="group transform transition-all duration-300 hover:-translate-y-2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <img 
                    src="/images/services/ferry-tickets.webp" 
                    alt="Ferry Tickets" 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2E48]/80 via-[#1E2E48]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <Ship className="h-8 w-8 mb-3 transform group-hover:scale-110 transition-transform text-[#E3D7C3]" />
                    <h3 className="text-2xl font-semibold mb-1">Ferry Tickets</h3>
                    <p className="text-white/90">Island hopping made easy</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                    <img 
                      src="https://cdn1.ferryhopper.com/img/ferryhopper-logo-small.svg" 
                      alt="FerryHopper" 
                      className="h-6 w-auto"
                    />
                  </div>
                </div>
              </Link>

              <Link to="/activities" className="group transform transition-all duration-300 hover:-translate-y-2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <img 
                    src="/images/services/activities.jpg" 
                    alt="Activities" 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2E48]/80 via-[#1E2E48]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <Camera className="h-8 w-8 mb-3 transform group-hover:scale-110 transition-transform text-[#E3D7C3]" />
                    <h3 className="text-2xl font-semibold mb-1">Activities</h3>
                    <p className="text-white/90">Unforgettable experiences</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                    <img 
                      src="https://www.vhv.rs/dpng/d/611-6116095_getyourguide-logo-logo-get-your-guide-hd-png.png" 
                      alt="GetYourGuide" 
                      className="h-6 w-auto"
                    />
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <Link to="/rent-a-car" className="group transform transition-all duration-300 hover:-translate-y-2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <img 
                    src="/images/services/car-rental.jpg" 
                    alt="Car Rentals" 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2E48]/80 via-[#1E2E48]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <Car className="h-8 w-8 mb-3 transform group-hover:scale-110 transition-transform text-[#E3D7C3]" />
                    <h3 className="text-2xl font-semibold mb-1">Car Rentals</h3>
                    <p className="text-white/90">Explore at your own pace</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-[#E3D7C3]/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-medium text-[#1E2E48]">
                    From €35/day
                  </div>
                </div>
              </Link>
              
              <div className="col-span-2">
                <div className="h-full flex flex-col justify-center px-8 bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-[#1E2E48] mb-4">Complete Travel Services</h3>
                  <p className="text-lg text-[#1E2E48]/80 mb-6">
                    From ferry tickets and accommodations to car rentals and activities, we provide everything you need for a seamless Greek island experience.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E3D7C3]/20 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-[#1E2E48]" />
                      </div>
                      <span className="text-[#1E2E48]">Hotels & Villas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E3D7C3]/20 flex items-center justify-center">
                        <Ship className="w-5 h-5 text-[#1E2E48]" />
                      </div>
                      <span className="text-[#1E2E48]">Ferry Tickets</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E3D7C3]/20 flex items-center justify-center">
                        <Car className="w-5 h-5 text-[#1E2E48]" />
                      </div>
                      <span className="text-[#1E2E48]">Car Rentals</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E3D7C3]/20 flex items-center justify-center">
                        <Camera className="w-5 h-5 text-[#1E2E48]" />
                      </div>
                      <span className="text-[#1E2E48]">Activities</span>
                    </div>
                  </div>
                  <Link 
                    to="/touristas-ai" 
                    className="inline-flex items-center text-[#1E2E48] font-medium hover:text-[#1E2E48]/80 transition-colors group"
                  >
                    Consult Touristas AI
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Experiences Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#E3D7C3]/20 text-[#1E2E48] text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>Unforgettable Moments</span>
              </div>
              <h2 className="text-4xl font-bold text-[#1E2E48] mb-4">Featured Experiences</h2>
              <p className="text-lg text-[#1E2E48]/80">Discover unique activities and create lasting memories in the Cyclades</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Paros Antiparos: Full-Day Boat Tour",
                  location: "Paros",
                  image: "/images/experience/paros-tour.webp",
                  price: "From €85",
                  duration: "8 hours",
                  rating: 4.9,
                  reviews: 319,
                  link: "https://www.getyourguide.com/antiparos-l163280/paros-antiparos-full-day-boat-tour-with-lunch-drinks-t456735/?ranking_uuid=e02854d1-81dc-419d-a895-54eb6470f376"
                },
                {
                  title: "Guided Day Cruise to Kleftiko",
                  location: "Milos",
                  image: "/images/experience/milos-kleftiko-tour.webp",
                  price: "From €95",
                  duration: "7 hours",
                  rating: 5.0,
                  reviews: 444,
                  link: "https://www.getyourguide.com/milos-l32653/from-adamas-port-day-cruise-to-kleftiko-caves-with-lunch-t247102/?ranking_uuid=08ca27d3-0268-478d-8561-b89ae92c0466"
                },
                {
                  title: "Santorini: Catamaran Tour with BBQ",
                  location: "Santorini",
                  image: "/images/experience/santorini-tour.webp",
                  price: "From €120",
                  duration: "5 hours",
                  rating: 4.6,
                  reviews: 4633,
                  link: "https://www.getyourguide.com/santorini-l753/ocean-voyager-74-sunset-tour-t31512/?ranking_uuid=fa7d77f6-3417-4c4a-8097-5f184d97606e"
                }
              ].map((experience) => (
                <a 
                  key={experience.title} 
                  href={experience.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E2E48]/90 via-[#1E2E48]/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                      <img 
                        src="https://www.vhv.rs/dpng/d/611-6116095_getyourguide-logo-logo-get-your-guide-hd-png.png" 
                        alt="GetYourGuide" 
                        className="h-6 w-auto"
                      />
                    </div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-[#E3D7C3]/90 text-[#1E2E48] text-sm font-medium rounded-full">
                          {experience.duration}
                        </span>
                        <span className="px-3 py-1 bg-[#E3D7C3]/90 text-[#1E2E48] text-sm font-medium rounded-full">
                          {experience.location}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-[#E3D7C3]">{experience.rating}</span>
                          <span className="text-[#E3D7C3]/80">({experience.reviews} reviews)</span>
                        </div>
                        <span className="text-[#E3D7C3] font-medium">{experience.price}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/activities" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E2E48] text-white rounded-xl hover:bg-[#1E2E48]/90 transition duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                View All Experiences
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Island Guides Section */}
        <section className="bg-gradient-to-b from-white to-[#E3D7C3]/20 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#E3D7C3]/20 text-[#1E2E48] text-sm font-medium mb-6">
                <Map className="h-4 w-4 mr-2" />
                <span>Island Discovery</span>
              </div>
              <h2 className="text-4xl font-bold text-[#1E2E48] mb-4">Explore Our Island Guides</h2>
              <p className="text-lg text-[#1E2E48]/80">Detailed guides to help you discover the unique charm of each Cycladic island</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Santorini', 
                  route: '/guides/santorini', 
                  image: '/images/islands/santorini-island.webp',
                  description: 'Iconic sunsets & white-washed buildings',
                  highlights: ['Caldera Views', 'Wine Tours', 'Ancient Ruins'],
                  color: 'from-[#1E2E48]/90 to-[#1E2E48]/70'
                },
                { 
                  name: 'Mykonos', 
                  route: '/guides/mykonos', 
                  image: '/images/islands/mykonos-island.jpg',
                  description: 'Vibrant nightlife & cosmopolitan charm',
                  highlights: ['Beach Clubs', 'Windmills', 'Little Venice'],
                  color: 'from-[#1E2E48]/90 to-[#1E2E48]/70'
                },
                { 
                  name: 'Paros', 
                  route: '/guides/paros', 
                  image: '/images/islands/paros-island.jpg',
                  description: 'Perfect blend of tradition & luxury',
                  highlights: ['Golden Beaches', 'Marble Art', 'Windsurfing'],
                  color: 'from-[#1E2E48]/90 to-[#1E2E48]/70'
                },
                { 
                  name: 'Naxos', 
                  route: '/guides/naxos', 
                  image: '/images/islands/naxos-island.jpg',
                  description: 'Largest island with diverse landscapes',
                  highlights: ['Mount Zeus', 'Local Cuisine', 'Ancient Temples'],
                  color: 'from-[#1E2E48]/90 to-[#1E2E48]/70'
                },
                { 
                  name: 'Milos', 
                  route: '/guides/milos', 
                  image: '/images/islands/milos.jpg',
                  description: 'Volcanic beauty & hidden beaches',
                  highlights: ['Sarakiniko', 'Catacombs', 'Fishing Villages'],
                  color: 'from-[#1E2E48]/90 to-[#1E2E48]/70'
                },
                { 
                  name: 'Ios', 
                  route: '/guides/ios', 
                  image: '/images/islands/ios.jpg',
                  description: 'Party paradise with ancient history',
                  highlights: ['Nightlife', 'Homer\'s Tomb', 'Beaches'],
                  color: 'from-[#1E2E48]/90 to-[#1E2E48]/70'
                }
              ].map((island) => (
                <Link 
                  key={island.name} 
                  to={island.route} 
                  className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={island.image}
                      alt={`${island.name} Guide`} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${island.color} opacity-90 group-hover:opacity-95 transition-opacity`} />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="text-2xl font-bold text-white mb-2">{island.name}</h3>
                      <p className="text-white/90 mb-4">{island.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {island.highlights.map((highlight) => (
                          <span 
                            key={highlight}
                            className="px-3 py-1 bg-[#E3D7C3]/20 backdrop-blur-sm rounded-full text-sm text-white"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 rounded-full bg-[#E3D7C3]/90 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-5 h-5 text-[#1E2E48]" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/guides" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E2E48] text-white rounded-xl hover:bg-[#1E2E48]/90 transition duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                View All Island Guides
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* SEO Text for Island Hopping */}
            <div className="prose prose-lg mx-auto mt-16">
              <p className="text-[#1E2E48]/80">
                Island hopping in the Cyclades is one of the most rewarding ways to experience this magical region. With our detailed <Link to="/ferry-tickets" className="text-[#1E2E48] hover:text-[#1E2E48]/80">ferry guides</Link>, <Link to="/hotels" className="text-[#1E2E48] hover:text-[#1E2E48]/80">accommodation recommendations</Link>, and <Link to="/local-insights" className="text-[#1E2E48] hover:text-[#1E2E48]/80">local insights</Link>, you can easily navigate between islands to create your own perfect itinerary. Whether you have a week or a month to explore, our expert guides will help you make the most of your time in the Greek islands.
              </p>
            </div>
          </div>
        </section>
          
        {/* Touristas AI Planner Promotional Banner */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#1E2E48] to-[#1E2E48]/95">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-3 text-white">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#E3D7C3]/20 backdrop-blur-sm text-[#E3D7C3] text-sm font-medium mb-6 border border-[#E3D7C3]/30">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span>AI-Powered Travel Planning</span>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src="/touristas-ai-logo.svg" 
                    alt="Touristas AI Logo" 
                    className="h-16 w-auto drop-shadow-lg"
                  />
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      Your Personal <span className="bg-gradient-to-r from-[#E3D7C3] to-[#E3D7C3]/80 bg-clip-text text-transparent">AI Travel Assistant</span>
                </h2>
                    <p className="text-[#E3D7C3] text-xl font-medium">Powered by Touristas AI</p>
                  </div>
                </div>
                <p className="text-xl text-[#E3D7C3] mb-8 max-w-2xl leading-relaxed">
                  Experience Touristas AI - the world's first mystical Greek islands oracle that plans, books, and guides your perfect Cyclades adventure with revolutionary AI intelligence.
                </p>
                <div className="flex flex-wrap gap-4 mb-12">
                  <Link 
                    to="/touristas-ai" 
                    className="inline-flex items-center px-8 py-4 rounded-xl bg-[#E3D7C3] text-[#1E2E48] font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    Experience Touristas AI
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link 
                    to="/touristas-ai/chat" 
                    className="inline-flex items-center px-8 py-4 rounded-xl bg-[#1E2E48]/10 backdrop-blur-sm text-[#E3D7C3] font-medium hover:bg-[#1E2E48]/20 transition-all duration-300 border border-[#E3D7C3]/20"
                  >
                    Chat with Touristas AI
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E3D7C3]/20 flex items-center justify-center">
                      <Compass className="w-5 h-5 text-[#E3D7C3]" />
                    </div>
                    <span className="text-[#E3D7C3]">Personalized Plans</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E3D7C3]/20 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-[#E3D7C3]" />
                    </div>
                    <span className="text-[#E3D7C3]">24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E3D7C3]/20 flex items-center justify-center">
                      <UtensilsCrossed className="w-5 h-5 text-[#E3D7C3]" />
                    </div>
                    <span className="text-[#E3D7C3]">Local Insights</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E3D7C3]/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#E3D7C3]" />
                    </div>
                    <span className="text-[#E3D7C3]">Smart Suggestions</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="bg-[#1E2E48]/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl relative border border-[#E3D7C3]/20">
                  <div className="absolute -top-3 -right-3 bg-[#E3D7C3] text-[#1E2E48] text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    Beta v2.34.32
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-[#E3D7C3]/20 flex items-center justify-center flex-shrink-0">
                        <Compass className="h-5 w-5 text-[#E3D7C3]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Personalized Itineraries</h4>
                        <p className="text-sm text-[#E3D7C3]">Custom plans based on your travel style and preferences</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-[#E3D7C3]/20 flex items-center justify-center flex-shrink-0">
                        <UtensilsCrossed className="h-5 w-5 text-[#E3D7C3]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Local Recommendations</h4>
                        <p className="text-sm text-[#E3D7C3]">Discover hidden gems and authentic experiences</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-[#E3D7C3]/20 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-5 w-5 text-[#E3D7C3]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Interactive Chat</h4>
                        <p className="text-sm text-[#E3D7C3]">Ask questions and refine your plans in real-time</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[#E3D7C3]/10">
                      <div className="flex items-center justify-between text-sm text-[#E3D7C3]">
                        <span>Trusted by 10,000+ travelers</span>
                        <span>4.9/5 rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="bg-gradient-to-b from-[#E3D7C3]/20 to-white py-12 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#E3D7C3]/20 text-[#1E2E48] text-sm font-medium mb-6">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span>Unforgettable Experiences</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1E2E48] mb-6">Experience the Best of Cyclades</h2>
                <p className="text-base md:text-lg text-[#1E2E48]/80 mb-8 leading-relaxed">
                  From pristine beaches and crystal-clear waters to charming villages and ancient ruins, 
                  the Cyclades offers a perfect blend of relaxation, culture, and adventure.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="p-3 bg-[#E3D7C3]/20 rounded-xl group-hover:scale-110 transition-transform">
                        <Waves className="h-6 w-6 text-[#1E2E48]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1E2E48] mb-1">Beach Life</h3>
                        <p className="text-sm text-[#1E2E48]/80">World-famous beaches & crystal waters</p>
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="p-3 bg-[#E3D7C3]/20 rounded-xl group-hover:scale-110 transition-transform">
                        <UtensilsCrossed className="h-6 w-6 text-[#1E2E48]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1E2E48] mb-1">Local Cuisine</h3>
                        <p className="text-sm text-[#1E2E48]/80">Authentic Greek gastronomy</p>
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="p-3 bg-[#E3D7C3]/20 rounded-xl group-hover:scale-110 transition-transform">
                        <Sparkles className="h-6 w-6 text-[#1E2E48]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1E2E48] mb-1">Rich Culture</h3>
                        <p className="text-sm text-[#1E2E48]/80">Ancient history & traditions</p>
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="p-3 bg-[#E3D7C3]/20 rounded-xl group-hover:scale-110 transition-transform">
                        <Sun className="h-6 w-6 text-[#1E2E48]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1E2E48] mb-1">Perfect Weather</h3>
                        <p className="text-sm text-[#1E2E48]/80">300+ days of sunshine</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  <div className="text-center p-3 md:p-4 rounded-2xl bg-white shadow-sm">
                    <div className="text-2xl md:text-3xl font-bold text-[#1E2E48] mb-1">24</div>
                    <div className="text-xs md:text-sm text-[#1E2E48]/80">Islands to Explore</div>
                  </div>
                  <div className="text-center p-3 md:p-4 rounded-2xl bg-white shadow-sm">
                    <div className="text-2xl md:text-3xl font-bold text-[#1E2E48] mb-1">300+</div>
                    <div className="text-xs md:text-sm text-[#1E2E48]/80">Days of Sunshine</div>
                  </div>
                  <div className="text-center p-3 md:p-4 rounded-2xl bg-white shadow-sm">
                    <div className="text-2xl md:text-3xl font-bold text-[#1E2E48] mb-1">5000+</div>
                    <div className="text-xs md:text-sm text-[#1E2E48]/80">Years of History</div>
                  </div>
                </div>
              </div>
              <div className="relative order-1 md:order-2 mb-12 md:mb-0">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="/images/experience/santorini-view.jpg" 
                    alt="Santorini View" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2E48]/90 via-[#1E2E48]/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-semibold mb-1">Santorini</h3>
                    <p className="text-white/90">Iconic sunset views</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-2/3 transform hover:-translate-y-2 transition-transform duration-300 hidden md:block">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src="/images/experience/beach-life.jpg" 
                      alt="Beach Life" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E2E48]/90 via-[#1E2E48]/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-semibold mb-1">Beach Life</h3>
                      <p className="text-white/90">Crystal clear waters</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-1/2 transform hover:-translate-y-2 transition-transform duration-300 hidden md:block">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src="/images/experience/local-cuisine.jpg" 
                      alt="Local Cuisine" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E2E48]/90 via-[#1E2E48]/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-semibold mb-1">Local Food</h3>
                      <p className="text-white/90">Authentic flavors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Text for Experiences */}
            <div className="prose prose-lg mx-auto mt-16">
              <p className="text-[#1E2E48]/80">
                The Cyclades islands offer an incredible diversity of experiences for every type of traveler. History enthusiasts can explore ancient ruins and archaeological sites dating back thousands of years. Beach lovers can discover some of the Mediterranean's most stunning coastlines, from organized beaches with water sports to secluded coves accessible only by boat. Food connoisseurs can indulge in authentic Greek cuisine featuring fresh seafood, locally-produced cheeses, and traditional recipes passed down through generations.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gradient-to-b from-[#E3D7C3]/20 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#E3D7C3]/20 text-[#1E2E48] text-sm font-medium mb-6">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>Traveler Stories</span>
              </div>
              <h2 className="text-4xl font-bold text-[#1E2E48] mb-4">What Our Travelers Say</h2>
              <p className="text-lg text-[#1E2E48]/80">Real experiences from people who explored the Cyclades with us</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah & John",
                  location: "United States",
                  image: "/images/testimonials/couple-1.jpg",
                  quote: "The AI planner helped us create the perfect itinerary for our honeymoon. Every recommendation was spot on!",
                  rating: 5,
                  date: "June 2023"
                },
                {
                  name: "Maria & Family",
                  location: "Spain",
                  image: "/images/testimonials/family-1.jpg",
                  quote: "As a family of four, planning was crucial. The ferry guides and hotel recommendations were invaluable.",
                  rating: 5,
                  date: "August 2023"
                },
                {
                  name: "David",
                  location: "United Kingdom",
                  image: "/images/testimonials/solo-1.jpg",
                  quote: "The local insights helped me discover hidden gems I would have never found on my own. Amazing experience!",
                  rating: 5,
                  date: "September 2023"
                }
              ].map((testimonial) => (
                <div key={testimonial.name} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-[#1E2E48]">{testimonial.name}</h3>
                      <p className="text-[#1E2E48]/60">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-[#1E2E48]/80 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Sparkles key={i} className="w-4 h-4 text-[#E3D7C3]" />
              ))}
            </div>
                    <span className="text-[#1E2E48]/60 text-sm">{testimonial.date}</span>
            </div>
          </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}