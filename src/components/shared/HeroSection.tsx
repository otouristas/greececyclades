import { ReactNode } from 'react';
import SearchBar from '../search/SearchBar';

interface HeroSectionProps {
  title: string;
  titleAccent?: string;
  description: string;
  backgroundImage: string;
  featureCards?: {
    icon: ReactNode;
    title: string;
    subtitle: string;
  }[];
  showSearch?: boolean;
  actionButtons?: {
    primary?: {
      text: string;
      link: string;
      icon?: ReactNode;
    };
    secondary?: {
      text: string;
      link: string;
      icon?: ReactNode;
    };
  };
}

export default function HeroSection({
  title,
  titleAccent,
  description,
  backgroundImage,
  featureCards,
  showSearch = true,
  actionButtons,
}: HeroSectionProps) {
  return (
    <div className="relative min-h-[85vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <img
            src={backgroundImage}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {titleAccent ? (
              <>
                {title} <span className="text-blue-400">{titleAccent}</span>
              </>
            ) : (
              title
            )}
          </h1>
          <p className="text-xl text-gray-200 mb-8">{description}</p>

          {/* Feature Cards */}
          {featureCards && featureCards.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full">
              {featureCards.map((card, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
                  <div className="h-6 w-6 text-blue-400 mb-2 mx-auto">
                    {card.icon}
                  </div>
                  <div className="text-white font-medium">{card.title}</div>
                  <div className="text-sm text-gray-300">{card.subtitle}</div>
                </div>
              ))}
            </div>
          )}

          {/* Search Bar */}
          {showSearch && (
            <div className="w-full max-w-2xl mb-8">
              <SearchBar />
            </div>
          )}

          {/* Action Buttons */}
          {actionButtons && (
            <div className="flex flex-wrap gap-4">
              {actionButtons.primary && (
                <a
                  href={actionButtons.primary.link}
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  {actionButtons.primary.text}
                  {actionButtons.primary.icon}
                </a>
              )}
              {actionButtons.secondary && (
                <a
                  href={actionButtons.secondary.link}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/20 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  {actionButtons.secondary.text}
                  {actionButtons.secondary.icon}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
