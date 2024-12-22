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
    <div className="relative min-h-[80vh] flex items-center py-16 lg:py-20">
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
      <div className="relative w-full pt-8 md:pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-6 md:gap-8">
            {/* Hero Text */}
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {title} {titleAccent && <span className="text-blue-400">{titleAccent}</span>}
              </h1>
              <p className="mt-4 text-base md:text-lg text-white/90">
                {description}
              </p>
            </div>

            {/* Feature Cards */}
            {featureCards && featureCards.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl mt-2">
                {featureCards.map((card, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
                    <div className="h-5 w-5 text-blue-400 mb-1.5 mx-auto">
                      {card.icon}
                    </div>
                    <div className="text-sm font-medium text-white">{card.title}</div>
                    <div className="text-xs text-gray-300">{card.subtitle}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Search Bar */}
            {showSearch && (
              <div className="w-full max-w-xl mt-2">
                <SearchBar />
              </div>
            )}

            {/* Action Buttons */}
            {actionButtons && (
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {actionButtons.primary && (
                  <a
                    href={actionButtons.primary.link}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all transform hover:scale-105 flex items-center gap-2 text-sm"
                  >
                    {actionButtons.primary.text}
                    {actionButtons.primary.icon}
                  </a>
                )}
                {actionButtons.secondary && (
                  <a
                    href={actionButtons.secondary.link}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/20 transition-all transform hover:scale-105 flex items-center gap-2 text-sm"
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
    </div>
  );
}
