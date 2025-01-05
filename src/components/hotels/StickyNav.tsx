import { useState, useEffect } from 'react';

interface Section {
  id: string;
  label: string;
}

interface StickyNavProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export default function StickyNav({ sections, activeSection, onSectionChange }: StickyNavProps) {
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
    <nav
      className={`bg-white transition-all duration-300 ${
        isSticky
          ? 'fixed top-0 left-0 right-0 shadow-md z-40'
          : 'border-b'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                activeSection === section.id
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
