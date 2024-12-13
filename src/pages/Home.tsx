import { Link } from 'react-router-dom';
import { ArrowRight, Sun, Map, Compass, Plane, Building2, Car, Camera, UtensilsCrossed, Sparkles, Waves } from 'lucide-react';
import HeroSection from '../components/shared/HeroSection';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';

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

  return (
    <>
      <SEO 
        {...seoData}
        structuredData={JSON.stringify(jsonLD)}
      />

      <div>
        <HeroSection
          title="Experience the Magic of"
          titleAccent="Greece"
          description="Discover the enchanting Cyclades islands. From pristine beaches to ancient ruins, plan your perfect Greek island adventure with us."
          backgroundImage="/images/islands/santorini/hero.jpg"
          featureCards={[
            {
              icon: <Map className="w-full h-full" />,
              title: "13 Islands",
              subtitle: "To Explore"
            },
            {
              icon: <Compass className="w-full h-full" />,
              title: "Local Tips",
              subtitle: "From Experts"
            },
            {
              icon: <Plane className="w-full h-full" />,
              title: "Travel Info",
              subtitle: "Made Easy"
            },
            {
              icon: <Sun className="w-full h-full" />,
              title: "Best Times",
              subtitle: "To Visit"
            }
          ]}
          actionButtons={{
            primary: {
              text: "Start Planning",
              link: "/trip-planner",
              icon: <ArrowRight className="h-5 w-5" />
            },
            secondary: {
              text: "Explore Islands",
              link: "/islands",
              icon: <ArrowRight className="h-5 w-5" />
            }
          }}
        />

        {/* Featured Services Section */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Plan Your Perfect Cyclades Getaway</h2>
              <p className="text-lg text-gray-600">Everything you need for an unforgettable Greek island experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link to="/hotels" className="group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <img 
                    src="/images/services/luxury-hotel.jpeg" 
                    alt="Luxury Hotels" 
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <Building2 className="h-8 w-8 mb-3" />
                    <h3 className="text-2xl font-semibold mb-1">Luxury Stays</h3>
                    <p className="text-white/90">Handpicked hotels & villas</p>
                  </div>
                </div>
              </Link>

              <Link to="/rent-a-car" className="group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <img 
                    src="/images/services/car-rental.jpg" 
                    alt="Car Rentals" 
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <Car className="h-8 w-8 mb-3" />
                    <h3 className="text-2xl font-semibold mb-1">Car Rentals</h3>
                    <p className="text-white/90">Explore at your own pace</p>
                  </div>
                </div>
              </Link>

              <Link to="/activities" className="group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <img 
                    src="/images/services/activities.jpg" 
                    alt="Activities" 
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <Camera className="h-8 w-8 mb-3" />
                    <h3 className="text-2xl font-semibold mb-1">Activities</h3>
                    <p className="text-white/90">Unforgettable experiences</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Experience the Best of Cyclades</h2>
                <p className="text-lg text-gray-600 mb-8">
                  From pristine beaches and crystal-clear waters to charming villages and ancient ruins, 
                  the Cyclades offers a perfect blend of relaxation, culture, and adventure.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <Waves className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Beach Life</h3>
                      <p className="text-sm text-gray-600">World-famous beaches & crystal waters</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <UtensilsCrossed className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Local Cuisine</h3>
                      <p className="text-sm text-gray-600">Authentic Greek gastronomy</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <Sparkles className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Rich Culture</h3>
                      <p className="text-sm text-gray-600">Ancient history & traditions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <Sun className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Perfect Weather</h3>
                      <p className="text-sm text-gray-600">300+ days of sunshine</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img 
                    src="/images/experience/santorini-view.jpg" 
                    alt="Santorini View" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 w-2/3">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <img 
                      src="/images/experience/beach-life.jpg" 
                      alt="Beach Life" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Island Guides Section */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Island Guides</h2>
              <p className="text-lg text-gray-600">Detailed guides to help you discover the unique charm of each Cycladic island</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Santorini', route: '/guides/santorini' },
                { name: 'Mykonos', route: '/guides/mykonos' },
                { name: 'Paros', route: '/guides/paros' }
              ].map((island) => (
                <Link key={island.name} to={island.route} className="group">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={`/images/guides/${island.name.toLowerCase()}.jpg`}
                      alt={`${island.name} Guide`} 
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-semibold mb-2">{island.name}</h3>
                      <p className="text-white/90">Complete travel guide</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/guides" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                View All Island Guides
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Stay Updated</h2>
              <p className="text-lg text-gray-600 mb-8">
                Subscribe to our newsletter for travel tips, hidden gems, and special offers
              </p>
              <form className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}