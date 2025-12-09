import React from 'react';
import { Link } from 'react-router-dom';

interface LinkGroup {
  title: string;
  links: Array<{
    label: string;
    url: string;
  }>;
}

interface RelatedDestinationsSectionProps {
  groups: LinkGroup[];
}

const RelatedDestinationsSection: React.FC<RelatedDestinationsSectionProps> = ({ groups }) => {
  return (
    <section className="py-16 bg-white border-t border-gray-100" data-track="link-box">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {groups.map((group, index) => (
            <div key={index} className="seo-links-group">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.url}
                      className="text-sm text-gray-600 hover:text-blue-600 hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedDestinationsSection;

