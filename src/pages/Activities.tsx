import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Star, Info, Compass, Sailboat, Utensils, ArrowRight, Waves } from 'lucide-react';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import RelatedLinks from '../components/RelatedLinks';
import GetYourGuideWidget, { GYG_LOCATIONS } from '../components/activities/GetYourGuideWidget';

export default function Activities() {
  const categories = [
    {
      title: 'Sailing & Boat Tours',
      description: 'Explore stunning coastlines and hidden coves',
      icon: Sailboat,
      image: '/images/activities/santorini-catamaran-main.jpg',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Cultural Experiences',
      description: 'Discover rich history and traditions',
      icon: Compass,
      image: '/images/islands/santorini/akrotiri.jpg',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Water Sports',
      description: 'Thrilling adventures on crystal-clear waters',
      icon: Waves,
      image: '/images/activities/milos-kayaking-main.jpg',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Food & Wine',
      description: 'Taste authentic Greek cuisine and wines',
      icon: Utensils,
      image: '/images/activities/photo-1657049871092-092b2bfd4094.avif',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const destinations = [
    { name: 'Santorini', image: '/images/islands/santorini-island.webp', desc: 'Caldera sailing, wine tours, volcanic springs', slug: 'santorini' },
    { name: 'Mykonos', image: '/images/islands/mykonos-island.jpg', desc: 'Water sports, Delos trips, beach activities', slug: 'mykonos' },
    { name: 'Naxos', image: '/images/islands/naxos-island.jpg', desc: 'Hiking trails, cooking classes, culture', slug: 'naxos' },
    { name: 'Paros', image: '/images/islands/paros-island.jpg', desc: 'Windsurfing, diving, village tours', slug: 'paros' },
    { name: 'Milos', image: '/images/islands/milos-island.jpg', desc: 'Kayaking, boat tours, hidden beaches', slug: 'milos' },
    { name: 'Ios', image: '/images/islands/ios-island.jpg', desc: 'Beach parties, hiking, water sports', slug: 'ios' },
  ];

  const faqs = [
    {
      question: 'What are the most popular activities in the Cyclades?',
      answer: 'The most popular activities include sailing tours around Santorini\'s caldera, wine tasting, cooking classes, water sports like kayaking and paddleboarding, hiking ancient trails, and guided archaeological tours.'
    },
    {
      question: 'When is the best time to book activities?',
      answer: 'For peak season (July-August), book 1-2 weeks in advance. For unique experiences like private sailing, book 3-4 weeks ahead. In shoulder seasons, a few days notice is usually sufficient.'
    },
    {
      question: 'Are activities family-friendly?',
      answer: 'Many activities welcome families, including sailing tours, beach activities, and cultural experiences. Age restrictions may apply for adventure activities - check with providers.'
    }
  ];

  return (
    <>
      <SEO
        title="Best Cyclades Activities 2025: Water Sports, Hiking, Tours & More"
        description="Top things to do in Cyclades: sailing, diving, hiking, cooking classes, wine tours. Book activities on any island with local experts. Unforgettable experiences await."
        canonicalUrl="https://discovercyclades.gr/activities"
        pageType="activities"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Activities', url: '/activities' }
        ]}
        faqs={[
          { question: 'What are the best activities in Cyclades?', answer: 'Top activities include sailing tours, wine tasting in Santorini, diving in Milos, hiking in Amorgos, cooking classes in Sifnos, and beach hopping across islands.' },
          { question: 'How do I book activities in Cyclades?', answer: 'Book through our platform or directly with local operators. Popular tours (caldera cruises, wine tours) should be booked 1-2 weeks ahead in summer.' },
          { question: 'Are activities expensive in Cyclades?', answer: 'Prices vary: group tours €30-60, private tours €150-400, diving €60-100, cooking classes €80-120. Shoulder season offers better rates.' }
        ]}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
          <div className="absolute inset-0">
            <img
              src="/images/activites.webp"
              alt="Activities in the Cyclades Islands"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
            <div className="max-w-3xl mb-10 md:mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                Unforgettable <span className="text-cyclades-turquoise">Experiences</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed px-1">
                Discover and book the best tours, experiences, and things to do across the Greek islands.
                From sailing adventures to cultural immersion.
              </p>
            </div>

            {/* Activity Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <a
                  key={index}
                  href="https://gyg.me/8JOjW1PH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all hover:scale-105"
                >
                  <div className="h-32 overflow-hidden relative">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`} />
                  </div>
                  <div className="p-5">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-3">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{category.title}</h3>
                    <p className="text-white/70 text-sm">{category.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* GetYourGuide Widget Section */}
        <div className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Browse & Book Activities</h2>
              <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
                Find the perfect experiences for your island adventure with our curated selection
              </p>
            </div>

            <div id="activities-widget" className="min-h-[600px] bg-gray-50 dark:bg-white/5 rounded-2xl p-4">
              <GetYourGuideWidget
                locationId={GYG_LOCATIONS.CYCLADES}
                numberOfItems={15}
                columns={3}
              />
            </div>
          </div>
        </div>

        {/* Why Book Section */}
        <div className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Book With Us</h2>
              <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
                We partner with the best local providers for exceptional experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Calendar, title: 'Free Cancellation', desc: 'Most activities offer free cancellation up to 24 hours before.', color: 'blue' },
                { icon: Star, title: 'Verified Reviews', desc: 'All reviews come from real travelers who experienced the activity.', color: 'yellow' },
                { icon: Users, title: 'Local Expertise', desc: 'Knowledgeable local guides provide authentic experiences.', color: 'green' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 text-center group hover:shadow-xl transition-shadow">
                  <div className={`w-16 h-16 bg-${item.color}-100 dark:bg-${item.color}-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <item.icon className={`w-8 h-8 text-${item.color}-600 dark:text-${item.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Destinations */}
        <div className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Top Destinations</h2>
                <p className="text-lg text-gray-600 dark:text-white/60">
                  Explore the most popular islands for activities
                </p>
              </div>
              <Link to="/islands" className="hidden md:flex items-center gap-2 text-cyan-600 dark:text-cyclades-turquoise font-medium hover:underline">
                View all islands <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest, idx) => (
                <Link
                  key={idx}
                  to={`/islands/${dest.slug}`}
                  className="group relative h-72 rounded-2xl overflow-hidden"
                >
                  <img
                    src={dest.image}
                    alt={`Activities in ${dest.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center text-white mb-2">
                      <MapPin className="h-5 w-5 mr-2 text-cyclades-turquoise" />
                      <h3 className="text-2xl font-bold">{dest.name}</h3>
                    </div>
                    <p className="text-white/80 text-sm">{dest.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-white/60">
                Everything you need to know about activities in the Cyclades
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/10">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-start gap-3">
                    <Info className="w-6 h-6 text-cyan-600 dark:text-cyclades-turquoise shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-gray-600 dark:text-white/70 ml-9">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-20 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready for Your Island Adventure?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Book your activities now and create unforgettable memories in the Cyclades
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#activities-widget"
                className="inline-flex items-center px-8 py-4 bg-white text-cyan-600 rounded-xl font-semibold hover:bg-white/90 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('activities-widget')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Compass className="mr-2 h-5 w-5" />
                Browse Activities
              </a>
              <Link
                to="/islands"
                className="inline-flex items-center px-8 py-4 bg-white/20 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-colors"
              >
                Explore Islands
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection
          faqs={[
            { question: 'What are the best activities in Cyclades?', answer: 'Top activities include sailing tours, wine tasting in Santorini, diving in Milos, hiking in Amorgos, cooking classes in Sifnos, and beach hopping across islands.' },
            { question: 'How do I book activities in Cyclades?', answer: 'Book through our platform or directly with local operators. Popular tours (caldera cruises, wine tours) should be booked 1-2 weeks ahead in summer.' },
            { question: 'Are activities expensive in Cyclades?', answer: 'Prices vary: group tours €30-60, private tours €150-400, diving €60-100, cooking classes €80-120. Shoulder season offers better rates.' },
            { question: 'Which island has the best water sports?', answer: 'Naxos and Paros are windsurfing/kitesurfing capitals. Milos is best for diving. Santorini for sailing tours. Ios for water parks and jet skis.' }
          ]}
          title="Activities FAQ"
          subtitle="Common questions about Cyclades activities and tours"
        />

        {/* Related Links */}
        <RelatedLinks variant="cards" pageType="activity" title="Continue Planning" />
      </div>
    </>
  );
}
