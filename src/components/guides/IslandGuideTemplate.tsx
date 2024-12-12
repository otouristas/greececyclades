import React from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import SEO from '../SEO';
import IslandGuideHero from './IslandGuideHero';
import { Island } from '../../types/islands';

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
    title: `${island.name} Travel Guide 2025 - Best Places to Visit & Things to Do`,
    description: `Plan your perfect ${island.name} vacation with our comprehensive 2025 travel guide. Discover the best hotels, restaurants, beaches, and activities.`,
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
    ogImage: island.image,
    ogType: 'article'
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="min-h-screen bg-gray-50">
        <IslandGuideHero
          id={island.id}
          name={island.name}
          description={island.description}
          image={island.image}
          bestTime={island.bestTime.reason}
          idealFor={island.idealFor}
        />
        
        {/* Introduction Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-3xl font-bold mb-6">Welcome to {island.name}</h2>
            <p className="text-gray-700 leading-relaxed">{content.introduction.text1}</p>
            <p className="text-gray-700 leading-relaxed">{content.introduction.text2}</p>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {content.quickLinks.map((link, index) => {
              const Icon = link.iconType;
              return (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <Icon className="text-3xl text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
                  <p className="text-gray-600 mb-4">{link.description}</p>
                  <Link to={link.link} className="text-blue-500 hover:text-blue-600">Learn more →</Link>
                </div>
              );
            })}
          </div>

          {/* When to Visit Section */}
          <section id="when-to-visit" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">When to Visit {island.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.whenToVisit.map((period, index) => {
                const Icon = period.iconType;
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <Icon className="text-3xl text-blue-500 mb-4" />
                    <h3 className="font-semibold text-xl mb-2">{period.title}</h3>
                    <p className="text-gray-600">{period.period}</p>
                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                      {period.bullets.map((bullet, idx) => (
                        <li key={idx}>• {bullet}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Must-Visit Villages Section */}
          <section id="villages" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Must-Visit Villages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.villages.map((village, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/1600x900/?${village.imageQuery}`}
                    alt={`${village.name} Village`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{village.name}</h3>
                    <p className="text-gray-600 mb-4">{village.description}</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {village.highlights.map((highlight, idx) => (
                        <li key={idx}>• {highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Things to Do in {island.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.activities.map((activity, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">{activity.title}</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {activity.items.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Best Beaches in {island.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.beaches.map((beach, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/1600x900/?${beach.imageQuery}`}
                    alt={`${beach.name} Beach`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{beach.name}</h3>
                    <p className="text-gray-600 mb-4">{beach.description}</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {beach.highlights.map((highlight, idx) => (
                        <li key={idx}>• {highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Dining Section */}
          <section id="dining" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Where to Eat in {island.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.dining.map((dining, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{dining.name}</h3>
                  <p className="text-gray-600 mb-4">{dining.description}</p>
                  <h4 className="font-medium mb-2">What to Try:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {dining.recommendations.map((rec, idx) => (
                      <li key={idx}>• {rec}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default IslandGuideTemplate;
