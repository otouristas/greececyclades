import { useState, useEffect } from 'react';
import { MapPin, Star } from 'lucide-react';
import { HotelCategory } from '../../types/hotel';

interface Section {
  id: string;
  label: string;
}

interface StickyNavProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  hotelName?: string;
  location?: {
    area: string;
    island: string;
  };
  category?: HotelCategory;
}

export default function StickyNav({ 
  sections, 
  activeSection, 
  onSectionChange,
  hotelName,
  location,
  category
}: StickyNavProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 500); // Adjust this value based on when you want the nav to become sticky
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`
        transition-all duration-300 
        ${isSticky 
          ? 'fixed top-[3.5rem] md:top-16 left-0 right-0 bg-white shadow-md z-40' 
          : 'bg-white border-b'
        }
      `}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hotel Info - Only shown when sticky */}
        {isSticky && hotelName && (
          <div className="px-4 py-3 overflow-x-auto">
            <div className="flex items-center min-w-max">
              <div className="flex items-center space-x-4 md:divide-x md:divide-gray-300">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 md:pr-6 truncate">{hotelName}</h2>
                {location && (
                  <div className="flex items-center text-sm text-gray-600 md:px-6">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{location.area}, {location.island}</span>
                  </div>
                )}
                {category && (
                  <div className="flex items-center text-sm text-gray-600 md:pl-6">
                    <Star className="w-4 h-4 mr-2 text-yellow-400 flex-shrink-0" />
                    {category}
                    <span className="ml-2 text-gray-300">|</span>
                    <span className="ml-2 text-red-500 font-medium animate-pulse">
                      Only 1 Room Left!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Secondary Navigation */}
        <div className="h-14 px-4 bg-white/95 backdrop-blur-sm border-t">
          <div className="flex space-x-10 h-full items-center min-w-max">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`
                  py-2 px-3 text-sm font-medium transition-colors whitespace-nowrap
                  ${activeSection === section.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
