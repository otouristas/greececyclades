import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Hotel, Ship, Compass, Sun, Utensils, Calendar } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface RelatedLink {
  title: string;
  description: string;
  href: string;
  icon?: React.ElementType;
}

interface RelatedLinksProps {
  title?: string;
  links?: RelatedLink[];
  variant?: 'default' | 'compact' | 'cards';
  pageType?: 'island' | 'hotel' | 'activity' | 'guide' | 'general';
  islandName?: string;
}

// Pre-defined link sets for different page types
const getLinksForPageType = (pageType: string, islandName?: string): RelatedLink[] => {
  const island = islandName || 'the Cyclades';
  
  switch (pageType) {
    case 'island':
    case 'guide':
      return [
        { title: `Hotels in ${island}`, description: 'Find the perfect place to stay', href: '/hotels', icon: Hotel },
        { title: 'Ferry Tickets', description: `Get to ${island} by ferry`, href: '/ferry-tickets', icon: Ship },
        { title: 'Activities & Tours', description: `Things to do in ${island}`, href: '/activities', icon: Compass },
        { title: 'Weather Guide', description: `Best time to visit ${island}`, href: '/weather', icon: Sun },
      ];
    case 'hotel':
      return [
        { title: 'Island Guides', description: 'Explore all Cyclades islands', href: '/guides', icon: MapPin },
        { title: 'Ferry Tickets', description: 'Book your ferry transfer', href: '/ferry-tickets', icon: Ship },
        { title: 'Activities & Tours', description: 'Find things to do nearby', href: '/activities', icon: Compass },
        { title: 'Trip Planner', description: 'Plan your full itinerary', href: '/trip-planner', icon: Calendar },
      ];
    case 'activity':
      return [
        { title: 'Hotels', description: 'Where to stay in Cyclades', href: '/hotels', icon: Hotel },
        { title: 'Island Guides', description: 'Explore each island', href: '/guides', icon: MapPin },
        { title: 'Food & Dining', description: 'Best restaurants nearby', href: '/culinary', icon: Utensils },
        { title: 'Trip Planner', description: 'Create your itinerary', href: '/trip-planner', icon: Calendar },
      ];
    default:
      return [
        { title: 'Explore Islands', description: 'Discover all 25 Cyclades islands', href: '/islands', icon: MapPin },
        { title: 'Hotels', description: 'Find accommodation', href: '/hotels', icon: Hotel },
        { title: 'Ferry Tickets', description: 'Book island hopping ferries', href: '/ferry-tickets', icon: Ship },
        { title: 'Trip Planner', description: 'Plan your perfect trip', href: '/trip-planner', icon: Calendar },
      ];
  }
};

export default function RelatedLinks({
  title = "You May Also Like",
  links,
  variant = 'default',
  pageType = 'general',
  islandName
}: RelatedLinksProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const displayLinks = links || getLinksForPageType(pageType, islandName);

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap gap-3">
        {displayLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.href}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isDark 
                ? 'bg-white/10 text-white hover:bg-cyclades-turquoise hover:text-dark-bg' 
                : 'bg-gray-100 text-gray-700 hover:bg-cyan-600 hover:text-white'
            }`}
          >
            {link.icon && <link.icon className="w-4 h-4" />}
            {link.title}
          </Link>
        ))}
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <section className={`py-12 ${isDark ? 'bg-dark-card' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.href}
                className={`group p-5 rounded-2xl border transition-all hover:-translate-y-1 ${
                  isDark 
                    ? 'bg-dark-bg border-white/10 hover:border-cyclades-turquoise/50' 
                    : 'bg-white border-gray-200 hover:border-cyan-600/50 hover:shadow-lg'
                }`}
              >
                {link.icon && (
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    isDark ? 'bg-cyclades-turquoise/20' : 'bg-cyan-100'
                  }`}>
                    <link.icon className={`w-5 h-5 ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`} />
                  </div>
                )}
                <h3 className={`font-semibold mb-1 group-hover:text-cyan-600 transition-colors ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {link.title}
                </h3>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default variant - horizontal links bar
  return (
    <div className={`py-8 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
          isDark ? 'text-white/60' : 'text-gray-500'
        }`}>
          {title}
        </h3>
        <div className="flex flex-wrap gap-6">
          {displayLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.href}
              className={`group flex items-center gap-2 text-sm font-medium transition-colors ${
                isDark 
                  ? 'text-white/80 hover:text-cyclades-turquoise' 
                  : 'text-gray-600 hover:text-cyan-600'
              }`}
            >
              {link.icon && <link.icon className="w-4 h-4" />}
              <span>{link.title}</span>
              <ArrowRight className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Export helper for getting contextual links
export { getLinksForPageType };
