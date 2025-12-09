import React from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import SEO from '../SEO';
import IslandGuideHero from './IslandGuideHero';
import { Island } from '../../types/island';
import { Star, Heart, ArrowRight, Utensils } from 'lucide-react';

interface QuickLink {
  iconType: IconType;
  title: string;
  description: string;
  link: string;
}

interface WhenToVisit {
  iconType: IconType;
  title: string;
  period: string;
  bullets: string[];
}

interface Village {
  name: string;
  description: string;
  imageQuery: string;
  highlights: string[];
}

interface Activity {
  title: string;
  items: string[];
}

interface Beach {
  name: string;
  description: string;
  imageQuery: string;
  highlights: string[];
}

interface Dining {
  name: string;
  description: string;
  recommendations: string[];
}

interface IslandContent {
  introduction: {
    text1: string;
    text2: string;
  };
  quickLinks: QuickLink[];
  whenToVisit: WhenToVisit[];
  villages: Village[];
  activities: Activity[];
  beaches: Beach[];
  dining: Dining[];
}

interface Props {
  island: Island;
  content: IslandContent;
}

const IslandGuideTemplate: React.FC<Props> = ({ island, content }) => {
  const seoData = {
    title: `${island.name} Travel Guide 2026 - Best Places to Visit & Things to Do`,
    description: `Plan your perfect ${island.name} vacation with our comprehensive 2026 travel guide. Discover the best hotels, restaurants, beaches, and activities.`,
    keywords: [
      `${island.name} travel guide`,
      `${island.name} hotels`,
      'Greek islands',
      `best time to visit ${island.name}`,
      `${island.name} activities`,
      `${island.name} beaches`,
      'Cyclades islands',
      'Greece travel'
    ],
    ogImage: island.heroImage || island.image,
    ogType: 'article' as const
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        <IslandGuideHero
          name={island.name}
          description={island.description}
          image={island.heroImage || island.image}
          bestTime={island.bestTime?.description || 'May to October'}
          idealFor={island.idealFor || ['All travelers']}
        />

        {/* Introduction Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-white/10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome to {island.name}</h2>
              <div className="space-y-4 text-gray-600 dark:text-white/70 leading-relaxed">
                <p>{content.introduction.text1}</p>
                <p>{content.introduction.text2}</p>
              </div>
            </div>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {content.quickLinks.map((link, index) => {
              const Icon = link.iconType;
              return (
                <div key={index} className="group bg-white dark:bg-dark-card rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-white/10 hover:shadow-xl hover:border-cyan-600/30 dark:hover:border-cyclades-turquoise/30 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-xl flex items-center justify-center mb-4">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{link.title}</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">{link.description}</p>
                  <Link to={link.link} className="inline-flex items-center text-cyan-600 dark:text-cyclades-turquoise font-medium hover:gap-2 transition-all">
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* When to Visit Section */}
          <section id="when-to-visit" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">When to Visit {island.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.whenToVisit.map((period, index) => {
                const Icon = period.iconType;
                return (
                  <div key={index} className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-white/10">
                    <div className="w-12 h-12 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="text-2xl text-cyan-600 dark:text-cyclades-turquoise" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{period.title}</h3>
                    <p className="text-cyan-600 dark:text-cyclades-turquoise font-medium mb-4">{period.period}</p>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                      {period.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyclades-turquoise" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Must-Visit Villages Section */}
          <section id="villages" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Must-Visit Villages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.villages.map((village, index) => (
                <div key={index} className="group bg-white dark:bg-dark-card rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-xl transition-all">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={`https://source.unsplash.com/1600x900/?${village.imageQuery}`}
                      alt={`${village.name} Village`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">{village.name}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-white/70 mb-4">{village.description}</p>
                    <ul className="space-y-2">
                      {village.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/60">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Things to Do in {island.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.activities.map((activity, index) => (
                <div key={index} className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-white/10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{activity.title}</h3>
                  <ul className="space-y-3">
                    {activity.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-600 dark:text-white/60">
                        <div className="w-2 h-2 rounded-full bg-cyclades-turquoise" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Best Beaches in {island.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.beaches.map((beach, index) => (
                <div key={index} className="group bg-white dark:bg-dark-card rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-white/10">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`https://source.unsplash.com/1600x900/?${beach.imageQuery}`}
                      alt={`${beach.name} Beach`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs font-medium text-cyan-600 dark:text-cyclades-turquoise">Beach</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{beach.name}</h3>
                    <p className="text-gray-600 dark:text-white/60 mb-4 text-sm">{beach.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {beach.highlights.map((highlight, idx) => (
                        <span key={idx} className="text-xs bg-cyan-600/10 dark:bg-cyclades-turquoise/20 text-cyan-600 dark:text-cyclades-turquoise px-3 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Dining Section */}
          <section id="dining" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Where to Eat in {island.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.dining.map((dining, index) => (
                <div key={index} className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 rounded-xl flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-cyan-600 dark:text-cyclades-turquoise" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{dining.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-white/60 mb-4">{dining.description}</p>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">What to Try:</h4>
                  <ul className="space-y-2">
                    {dining.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/60">
                        <Heart className="w-4 h-4 text-red-400" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore {island.name}?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Start planning your perfect trip with our booking tools and travel guides.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/hotels" className="inline-flex items-center px-6 py-3 bg-white text-cyan-600 rounded-xl font-semibold hover:bg-white/90 transition-colors">
                Find Hotels
              </Link>
              <Link to="/ferry-tickets" className="inline-flex items-center px-6 py-3 bg-white/20 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                Book Ferry
              </Link>
              <Link to="/activities" className="inline-flex items-center px-6 py-3 bg-white/20 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                View Activities
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default IslandGuideTemplate;

