import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Mail, Award, Users, Globe, Heart, Shield, Star, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const stats = [
  { number: '10+', label: 'Years Experience', icon: Award },
  { number: '25+', label: 'Islands Covered', icon: MapPin },
  { number: '50K+', label: 'Happy Travelers', icon: Users },
  { number: '4.9', label: 'User Rating', icon: Star },
];

const values = [
  {
    icon: Heart,
    title: 'Passion for Greece',
    description: 'We live and breathe the Cyclades. Our love for these islands drives everything we do.'
  },
  {
    icon: Shield,
    title: 'Trust & Reliability',
    description: 'Accurate information, honest recommendations, and dependable service every time.'
  },
  {
    icon: Globe,
    title: 'Sustainable Tourism',
    description: 'Promoting responsible travel that preserves island cultures and environments.'
  },
  {
    icon: Users,
    title: 'Local Expertise',
    description: 'Strong partnerships with local businesses and communities across the Cyclades.'
  },
];

export default function About() {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title="About Discover Cyclades: AI-Powered Greek Island Experts"
        description="Meet the team behind Discover Cyclades. Local experts + AI technology = the world's best Cyclades travel resource. Our story, mission & commitment to authentic travel."
        ogImage="/images/about/about-hero.jpg"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' }
        ]}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-cyan-600 via-cyan-600 to-cyclades-turquoise text-white pt-24 md:pt-32 pb-16 md:pb-24">
          <div className="absolute inset-0">
            <img
              src="/images/about/about-hero.jpg"
              alt="Cyclades Islands View"
              className="w-full h-full object-cover opacity-20"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/80 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
                {t('about.hero.title', 'Your Gateway to the Cyclades')}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed px-1">
                {t('about.hero.subtitle', "We're passionate travelers, local experts, and technology enthusiasts united by our love for the Greek islands.")}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-6 text-center">
                <stat.icon className="w-8 h-8 text-cyan-600 dark:text-cyclades-turquoise mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-white/80 text-lg leading-relaxed">
                  <p>
                    At Discover Cyclades, we believe that traveling to Greece should be more than just visiting tourist spots.
                    It should be an immersive experience that connects you with the authentic culture, history, and people of the islands.
                  </p>
                  <p>
                    Our mission is to help travelers discover the hidden gems, traditional villages, and local experiences
                    that make the Cyclades truly magical – while promoting sustainable tourism that benefits local communities.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/islands"
                    className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-cyan-600/90 transition-colors"
                  >
                    Explore Islands <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 border-2 border-gray-200 dark:border-white/20 text-gray-700 dark:text-white px-6 py-3 rounded-xl font-medium hover:border-cyan-600 dark:hover:border-cyclades-turquoise transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/about/team.jpg"
                    alt="Our Team"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/islands/santorini/1.jpg';
                    }}
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">Made with love</p>
                      <p className="text-sm text-gray-600 dark:text-white/60">From Athens, Greece</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('about.values.title', 'Our Values')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-white/60 max-w-2xl mx-auto">
                {t('about.values.subtitle', 'The principles that guide everything we do')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, idx) => (
                <div key={idx} className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-white/60">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t('about.story.title', 'Our Story')}
            </h2>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                Founded in 2014, Discover Cyclades began with a simple vision: to share the authentic beauty
                and culture of the Greek islands with travelers from around the world. What started as a
                small team of passionate local guides has grown into a comprehensive travel platform,
                serving thousands of visitors annually.
              </p>
              <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                Our team consists of experienced travel professionals, local experts, and technology
                specialists who work together to provide you with the most comprehensive and up-to-date
                information about the Cyclades islands. We take pride in our deep understanding of each
                island's unique character and our ability to create personalized travel experiences.
              </p>
              <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                Today, we continue to innovate with tools like our AI travel assistant, Touristas,
                making it easier than ever to plan your perfect Greek island adventure.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="py-20 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('about.cta.title', "Let's Plan Your Adventure")}</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {t('about.cta.subtitle', 'Have questions? Want personalized recommendations? Our team is here to help you create the perfect Cyclades experience.')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-cyan-600 px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Contact Us
                </Link>
                <Link
                  to="/touristas-ai"
                  className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  Chat with AI Assistant
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="py-12 bg-gray-100 dark:bg-dark-card border-t border-gray-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/guides" className="group flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-xl hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyclades-turquoise transition-colors">Travel Guides</h3>
                  <p className="text-sm text-gray-600 dark:text-white/60">Explore our island guides</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link to="/ferry-tickets" className="group flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-xl hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyclades-turquoise transition-colors">Ferry Tickets</h3>
                  <p className="text-sm text-gray-600 dark:text-white/60">Book your ferry crossings</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link to="/hotels" className="group flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-xl hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyclades-turquoise transition-colors">Hotels & Stays</h3>
                  <p className="text-sm text-gray-600 dark:text-white/60">Find perfect accommodations</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

