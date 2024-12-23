import { Sun, ArrowRight, CalendarDays, Users, Map, Compass, PlaneLanding } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SearchBar from '../components/search/SearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import { islandGuides } from '../data/islandsData';
import { SITE_TAGLINE } from '../constants/seo';

export default function IslandGuides() {
  return (
    <>
      <SEO 
        title={`Cyclades Islands Travel Guides ${SITE_TAGLINE}`}
        description="Comprehensive travel guides for all Cyclades islands. Find insider tips, local recommendations, and detailed information for your perfect Greek island vacation."
        ogImage="/images/guides-hero.jpg"
      />
      
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: 'Guides', path: '/guides' }
            ]}
          />
        </div>
      </div>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative min-h-[85vh] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div className="relative h-full w-full">
              <img
                src="/images/guides-hero.jpg"
                alt="Cyclades Islands"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Your Guide to the <span className="text-blue-400">Cyclades</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Discover the magic of Greek island life. From hidden beaches to charming villages, 
                find your perfect island escape with our comprehensive guides.
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <Map className="h-6 w-6 text-blue-400 mb-2 mx-auto" />
                  <div className="text-white font-medium">23 Islands</div>
                  <div className="text-sm text-gray-300">To Explore</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <Compass className="h-6 w-6 text-blue-400 mb-2 mx-auto" />
                  <div className="text-white font-medium">Local Tips</div>
                  <div className="text-sm text-gray-300">From Experts</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <PlaneLanding className="h-6 w-6 text-blue-400 mb-2 mx-auto" />
                  <div className="text-white font-medium">Travel Info</div>
                  <div className="text-sm text-gray-300">Made Easy</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <Sun className="h-6 w-6 text-blue-400 mb-2 mx-auto" />
                  <div className="text-white font-medium">Best Times</div>
                  <div className="text-sm text-gray-300">To Visit</div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="w-full max-w-2xl mb-8">
                <SearchBar />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/trip-planner"
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  Start Planning Your Trip
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/islands"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/20 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  View All Islands
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Island Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {islandGuides.map((guide) => (
              <Link 
                key={guide.id}
                to={`/guides/${guide.id}`}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-48">
                    <img
                      src={guide.image}
                      alt={`${guide.name} Island`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{guide.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{guide.description}</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDays className="h-4 w-4" />
                        <span>Best Time: {guide.bestTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>Ideal For: {guide.idealFor.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}