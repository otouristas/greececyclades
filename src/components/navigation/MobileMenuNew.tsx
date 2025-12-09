import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight, Sparkles, Search, Ship, Calendar, MapPin, Home, HelpCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface MobileMenuNewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenuNew({ isOpen, onClose }: MobileMenuNewProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setActiveCategory(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = [
    {
      id: 'islands',
      name: 'Destinations',
      icon: MapPin,
      description: 'Explore 24 Cyclades islands',
      links: [
        { name: 'All Islands', path: '/islands' },
        { name: 'Santorini', path: '/guides/santorini' },
        { name: 'Mykonos', path: '/guides/mykonos' },
        { name: 'Naxos', path: '/guides/naxos' },
        { name: 'Paros', path: '/guides/paros' },
        { name: 'Milos', path: '/guides/milos' },
        { name: 'Sifnos', path: '/guides/sifnos' },
      ]
    },
    {
      id: 'planning',
      name: 'Plan Your Trip',
      icon: Calendar,
      description: 'Tools & resources',
      links: [
        { name: 'Trip Planner', path: '/trip-planner' },
        { name: 'Hotels', path: '/hotels' },
        { name: 'Activities', path: '/activities' },
        { name: 'Ferry Tickets', path: '/ferry-tickets' },
        { name: 'Rent a Car', path: '/rent-a-car' },
        { name: 'Flights', path: '/flights' },
      ]
    },
  ];

  return (
    <div className="fixed inset-0 z-[1000]">
      {/* Full-screen backdrop */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-dark-bg via-dark-card to-cyclades-caldera' 
          : 'bg-gradient-to-br from-cyclades-deep-blue via-cyclades-sea-blue to-cyclades-caldera'
      }`} />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyclades-turquoise/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Logo" className="h-8 w-8" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white leading-tight">
                Discover Cyclades
              </span>
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-cyclades-turquoise" />
                <span className="text-[10px] text-white/50">Powered by Touristas AI</span>
              </div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {!activeCategory ? (
            // Main Menu View
            <div className="p-4 space-y-6">
              {/* Hero CTAs */}
              <div className="space-y-3">
                {/* Plan Trip AI - Featured */}
                <Link
                  to="/trip-planner"
                  onClick={onClose}
                  className="flex items-center gap-4 p-5 bg-gradient-to-r from-cyclades-turquoise to-cyan-600 rounded-2xl group hover:scale-[1.01] transition-transform"
                >
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-white text-lg block">Plan Trip AI</span>
                    <span className="text-sm text-white/70">AI-powered trip planner</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/60" />
                </Link>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/hotels"
                    onClick={onClose}
                    className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl text-center group hover:scale-[1.02] transition-transform"
                  >
                    <div className="w-11 h-11 bg-cyclades-deep-blue/10 rounded-xl flex items-center justify-center mb-2 group-hover:bg-cyclades-deep-blue transition-colors">
                      <Search className="w-5 h-5 text-cyclades-deep-blue group-hover:text-white" />
                    </div>
                    <span className="font-bold text-cyclades-deep-blue text-sm">Find Hotels</span>
                    <span className="text-xs text-gray-500 mt-0.5">1000+ options</span>
                  </Link>
                  <Link
                    to="/touristas-ai"
                    onClick={onClose}
                    className="flex flex-col items-center justify-center p-5 bg-cyclades-deep-blue rounded-2xl text-center group hover:scale-[1.02] transition-transform"
                  >
                    <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-white text-sm">Touristas AI</span>
                    <span className="text-xs text-white/70 mt-0.5">Instant answers</span>
                  </Link>
                </div>
              </div>

              {/* Category Cards */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider px-1">Explore</h3>
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className="w-full flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/15 transition-all group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-cyclades-turquoise to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-bold text-white block">{cat.name}</span>
                        <span className="text-sm text-white/60">{cat.description}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })}
              </div>

              {/* Quick Links */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider px-1">Quick Links</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    to="/"
                    onClick={onClose}
                    className="flex flex-col items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <Home className="w-5 h-5 text-white/70 mb-1" />
                    <span className="text-xs text-white/70">Home</span>
                  </Link>
                  <Link
                    to="/ferry-tickets"
                    onClick={onClose}
                    className="flex flex-col items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <Ship className="w-5 h-5 text-white/70 mb-1" />
                    <span className="text-xs text-white/70">Ferries</span>
                  </Link>
                  <Link
                    to="/help"
                    onClick={onClose}
                    className="flex flex-col items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <HelpCircle className="w-5 h-5 text-white/70 mb-1" />
                    <span className="text-xs text-white/70">Help</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            // Category Detail View
            <div className="p-4">
              {/* Back Button */}
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span className="text-sm font-medium">Back to menu</span>
              </button>

              {(() => {
                const cat = categories.find(c => c.id === activeCategory);
                if (!cat) return null;
                const Icon = cat.icon;

                return (
                  <div className="space-y-6">
                    {/* Category Header */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyclades-turquoise to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{cat.name}</h2>
                        <p className="text-white/60 text-sm">{cat.description}</p>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-1">
                      {cat.links.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={onClose}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <span className="text-white font-medium">{link.name}</span>
                          <ChevronRight className="w-5 h-5 text-white/40" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
            <Sparkles className="h-4 w-4 text-cyclades-turquoise" />
            <span>Powered by Touristas AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
