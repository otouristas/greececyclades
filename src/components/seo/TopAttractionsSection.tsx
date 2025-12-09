import React from 'react';
import { Link } from 'react-router-dom';

interface TopAttraction {
  id: string;
  name: string;
  url: string;
  rank: number;
}

interface TopAttractionsSectionProps {
  title: string;
  attractions: TopAttraction[];
}

const TopAttractionsSection: React.FC<TopAttractionsSectionProps> = ({ title, attractions }) => {
  return (
    <section className="py-12 bg-gray-50" data-test-id="seo-location-link-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8" data-test-id="seo-location-links-title">
          {title}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {attractions.map((attraction) => (
            <li key={attraction.id} className="group">
              <Link 
                to={attraction.url}
                className="flex items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
              >
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 text-xs font-bold rounded-full mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {attraction.rank}
                </span>
                <span className="text-gray-700 font-medium group-hover:text-blue-700 transition-colors text-sm line-clamp-1">
                  {attraction.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TopAttractionsSection;

