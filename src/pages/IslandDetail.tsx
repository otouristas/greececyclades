import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Calendar, Sun, Users, Ship, ArrowRight, Car, Building, BookOpen,
  Plane, Clock, Star, Camera, Utensils, Heart, ChevronRight, ExternalLink
} from 'lucide-react';
import { cyclades } from '../data/islandsData';
import SEO from '../components/SEO';

export default function IslandDetail() {
  const { slug } = useParams<{ slug: string }>();
  const island = cyclades.find(i => i.slug === slug);

  // Get related islands (excluding current)
  const relatedIslands = cyclades
    .filter(i => i.slug !== slug)
    .slice(0, 4);

  if (!island) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Island Not Found</h1>
          <p className="text-gray-600 dark:text-white/70 mb-8">We couldn't find an island with the slug: {slug}</p>
          <Link
            to="/islands"
            className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-cyan-600/90 transition-colors"
          >
            View All Islands
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <SEO
        title={`${island.name} Island 2025: Complete Travel Guide | Cyclades Greece`}
        description={`Everything about ${island.name}: best beaches, where to stay, top restaurants, ferry info & travel tips. Expert 2025 guide with insider recommendations.`}
        ogImage={island.heroImage || island.image}
        pageType="islands"
        islandData={{
          name: island.name || '',
          description: island.description || ''
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Islands', url: '/islands' },
          { name: island.name || '', url: `/islands/${slug || ''}` }
        ]}
        faqs={[
          { question: `What is ${island.name} known for?`, answer: island.shortDescription || `${island.name} is a beautiful Cycladic island known for its stunning beaches, traditional villages, and authentic Greek atmosphere.` },
          { question: `How do I get to ${island.name}?`, answer: `Reach ${island.name} by ferry from Athens (Piraeus) or nearby islands. Ferry times vary by operator and season.` },
          { question: `When is the best time to visit ${island.name}?`, answer: `September-October for perfect weather and fewer crowds. May-June is also excellent. July-August is peak season.` }
        ]}
      />

      {/* Hero Section */}
      <div
        className="relative min-h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${island.heroImage || island.image || '/images/placeholder-island.jpg'})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center gap-2 text-white/80 text-sm">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/islands" className="hover:text-white transition-colors">Islands</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{island.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full min-h-[70vh] max-w-7xl mx-auto px-4 flex flex-col justify-end pb-16">
          <div className="flex items-center gap-2 text-white/80 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">Cyclades, Greece</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            {island.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed">
            {island.quote || island.shortDescription}
          </p>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
              <Calendar className="w-6 h-6 text-cyclades-turquoise mb-3" />
              <p className="text-white font-semibold mb-1">Best Time</p>
              <p className="text-white/70 text-sm">{island.bestTime?.months?.slice(0, 2).join(' - ') || 'May - October'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
              <Sun className="w-6 h-6 text-yellow-400 mb-3" />
              <p className="text-white font-semibold mb-1">Weather</p>
              <p className="text-white/70 text-sm">25-32°C in Summer</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
              <Ship className="w-6 h-6 text-blue-400 mb-3" />
              <p className="text-white font-semibold mb-1">Getting There</p>
              <p className="text-white/70 text-sm">Ferry from Piraeus</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
              <Users className="w-6 h-6 text-green-400 mb-3" />
              <p className="text-white font-semibold mb-1">Perfect For</p>
              <p className="text-white/70 text-sm">{island.idealFor?.[0] || 'All Travelers'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-16">
            {/* About Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-12 h-1 bg-cyan-600 rounded-full"></span>
                About {island.name}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-white/80 leading-relaxed text-lg">
                  {island.description}
                </p>
              </div>
            </section>

            {/* Highlights Section */}
            {island.highlights && island.highlights.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <Star className="w-8 h-8 text-yellow-500" />
                  Top Highlights
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {island.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-dark-card rounded-xl p-5 border border-gray-100 dark:border-white/10 hover:border-cyan-600/30 dark:hover:border-cyclades-turquoise/30 transition-all hover:shadow-lg group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-gray-800 dark:text-white/90 font-medium group-hover:text-cyan-600 dark:group-hover:text-cyclades-turquoise transition-colors">
                          {highlight}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Activities Section */}
            {island.activities && island.activities.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Heart className="w-8 h-8 text-red-500" />
                    Things to Do
                  </h2>
                  <Link
                    to="/activities"
                    className="text-cyan-600 dark:text-cyclades-turquoise hover:underline flex items-center gap-1 font-medium"
                  >
                    View all activities <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex flex-wrap gap-3">
                  {island.activities.map((activity, idx) => (
                    <Link
                      key={idx}
                      to={`/activities?type=${String(activity)}`}
                      className="bg-gradient-to-r from-cyan-600/10 to-cyclades-turquoise/10 dark:from-cyan-600/20 dark:to-cyclades-turquoise/20 text-cyan-600 dark:text-cyclades-turquoise px-5 py-2.5 rounded-full text-sm font-medium capitalize hover:from-cyan-600/20 hover:to-cyclades-turquoise/20 dark:hover:from-cyan-600/30 dark:hover:to-cyclades-turquoise/30 transition-all border border-cyan-600/20 dark:border-cyclades-turquoise/20"
                    >
                      {String(activity).replace(/-/g, ' ')}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Island Connections */}
            {island.connectedIslands?.direct && island.connectedIslands.direct.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Ship className="w-8 h-8 text-blue-500" />
                    Ferry Connections
                  </h2>
                  <Link
                    to="/ferry-tickets"
                    className="text-cyan-600 dark:text-cyclades-turquoise hover:underline flex items-center gap-1 font-medium"
                  >
                    Book ferry tickets <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {island.connectedIslands.direct.slice(0, 6).map((connectedSlug, idx) => {
                    const connected = cyclades.find(i => i.slug === connectedSlug || i.name === connectedSlug);
                    if (!connected) return null;
                    return (
                      <Link
                        key={idx}
                        to={`/islands/${connected.slug}`}
                        className="group bg-white dark:bg-dark-card rounded-xl p-4 border border-gray-100 dark:border-white/10 hover:border-cyan-600/30 dark:hover:border-cyclades-turquoise/30 transition-all hover:shadow-lg flex items-center gap-4"
                      >
                        <div className="w-14 h-14 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${connected.image})` }} />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyclades-turquoise transition-colors truncate">
                            {connected.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-white/50">Ferry available</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyclades-turquoise group-hover:translate-x-1 transition-all" />
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Related Islands */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Camera className="w-8 h-8 text-purple-500" />
                Explore More Islands
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {relatedIslands.map((related) => (
                  <Link
                    key={related.slug}
                    to={`/islands/${related.slug}`}
                    className="group relative h-48 rounded-2xl overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${related.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-xl font-bold text-white mb-1">{related.name}</h3>
                      <p className="text-white/70 text-sm line-clamp-1">{related.shortDescription}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Actions Card */}
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Plan Your Trip</h3>

                <div className="space-y-3">
                  <Link
                    to={`/hotels?location=${island.slug}`}
                    className="flex items-center gap-3 w-full bg-gradient-to-r from-cyan-600 to-cyclades-turquoise text-white py-3.5 px-4 rounded-xl font-medium hover:opacity-90 transition-opacity group"
                  >
                    <Building className="w-5 h-5" />
                    <span>Find Hotels in {island.name}</span>
                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/ferry-tickets"
                    className="flex items-center gap-3 w-full bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white py-3.5 px-4 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-colors group"
                  >
                    <Ship className="w-5 h-5" />
                    <span>Book Ferry Tickets</span>
                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to={`/rent-a-car?location=${island.name}`}
                    className="flex items-center gap-3 w-full bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white py-3.5 px-4 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-colors group"
                  >
                    <Car className="w-5 h-5" />
                    <span>Rent a Car</span>
                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to={`/guides/${island.slug}`}
                    className="flex items-center gap-3 w-full border-2 border-gray-200 dark:border-white/20 text-gray-700 dark:text-white py-3.5 px-4 rounded-xl font-medium hover:border-cyan-600 dark:hover:border-cyclades-turquoise transition-colors group"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Full Travel Guide</span>
                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Best Time Card */}
              {island.bestTime?.months && island.bestTime.months.length > 0 && (
                <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-cyan-600" />
                    Best Time to Visit
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {island.bestTime.months.map((month, idx) => (
                      <span
                        key={idx}
                        className="bg-cyan-600/10 dark:bg-cyclades-turquoise/20 text-cyan-600 dark:text-cyclades-turquoise text-sm px-3 py-1.5 rounded-lg font-medium"
                      >
                        {String(month)}
                      </span>
                    ))}
                  </div>
                  {island.bestTime.description && (
                    <p className="mt-4 text-gray-600 dark:text-white/60 text-sm">
                      {island.bestTime.description}
                    </p>
                  )}
                </div>
              )}

              {/* Ideal For Card */}
              {island.idealFor && island.idealFor.length > 0 && (
                <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-500" />
                    Perfect For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {island.idealFor.map((ideal, idx) => (
                      <span
                        key={idx}
                        className="bg-green-50 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-sm px-3 py-1.5 rounded-lg font-medium"
                      >
                        {ideal}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Need Help Planning?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Our AI travel assistant can help you create the perfect {island.name} itinerary.
                </p>
                <Link
                  to="/touristas-ai"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors py-2.5 px-4 rounded-lg text-sm font-medium"
                >
                  <span>Chat with Touristas AI</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gray-100 dark:bg-dark-card border-t border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to explore {island.name}?
            </h2>
            <p className="text-gray-600 dark:text-white/70 mb-8 max-w-2xl mx-auto">
              Book your accommodation, ferry tickets, and activities all in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={`/hotels?location=${island.slug}`}
                className="bg-cyan-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-cyan-600/90 transition-colors"
              >
                Find Hotels
              </Link>
              <Link
                to="/ferry-tickets"
                className="bg-white dark:bg-dark-bg text-gray-900 dark:text-white px-8 py-3 rounded-xl font-medium border border-gray-200 dark:border-white/20 hover:border-cyan-600 dark:hover:border-cyclades-turquoise transition-colors"
              >
                Book Ferries
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

