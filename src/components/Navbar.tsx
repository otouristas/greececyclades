import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  ChevronDown, 
  Menu, 
  X, 
  Globe,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import Logo from './Logo';
import MobileMenuNew from './navigation/MobileMenuNew';

interface NavbarProps {
  onAuthClick: () => void;
}

interface NavItem {
  path: string;
  label: string;
  megaMenu: boolean;
  children?: Array<{
    path: string;
    label: string;
    type?: 'guide' | 'island' | 'tool';
  }>;
}

const navigationItems: NavItem[] = [
  {
    path: '/islands',
    label: 'Destinations',
    megaMenu: true,
    children: [
      // Travel Guides Section
      { path: '/guides/santorini', label: 'Santorini Guide', type: 'guide' },
      { path: '/guides/mykonos', label: 'Mykonos Guide', type: 'guide' },
      { path: '/guides/naxos', label: 'Naxos Guide', type: 'guide' },
      { path: '/guides/paros', label: 'Paros Guide', type: 'guide' },
      { path: '/guides/sifnos', label: 'Sifnos Guide', type: 'guide' },
      { path: '/guides/ios', label: 'Ios Guide', type: 'guide' },
      // Popular Islands Section
      { path: '/islands/santorini', label: 'Santorini', type: 'island' },
      { path: '/islands/mykonos', label: 'Mykonos', type: 'island' },
      { path: '/islands/naxos', label: 'Naxos', type: 'island' },
      { path: '/islands/paros', label: 'Paros', type: 'island' },
      { path: '/islands/sifnos', label: 'Sifnos', type: 'island' },
      { path: '/islands/ios', label: 'Ios', type: 'island' }
    ]
  },
  {
    path: '/plan',
    label: 'Plan Your Trip',
    megaMenu: true,
    children: [
      { path: '/touristas-ai', label: 'Touristas AI', type: 'tool' },
      { path: '/activities', label: 'Activities', type: 'tool' },
      { path: '/hotels', label: 'Hotels', type: 'tool' },
      { path: '/ferry-tickets', label: 'Ferry Tickets', type: 'tool' },
      { path: '/ferry-guide', label: 'Ferry Guide', type: 'tool' },
      { path: '/flights', label: 'Flight Tickets', type: 'tool' },
      { path: '/rent-a-car', label: 'Rent a Car', type: 'tool' },
      { path: '/weather', label: 'Weather Guide', type: 'tool' },
      { path: '/budget-calculator', label: 'Budget Calculator', type: 'tool' },
      { path: '/greek-phrases', label: 'Greek Phrases', type: 'tool' },
      { path: '/resources', label: 'Travel Resources', type: 'tool' },
      { path: '/transfers', label: 'Taxi Transfers', type: 'tool' }
    ]
  },
  {
    path: '/blog',
    label: 'Travel Tips',
    megaMenu: false
  }
];

// Commented out as it's currently unused
/* const mobileOnlyItems: NavItem[] = [
  {
    path: '/about',
    label: 'About',
    icon: <User className="h-4 w-4" />,
    megaMenu: false,
    children: [
      { path: '/about/team', label: 'Our Team', type: 'tool', icon: <User className="w-4 h-4" /> },
      { path: '/about/mission', label: 'Our Mission', type: 'tool', icon: <Compass className="w-4 h-4" /> }
    ]
  },
  {
    path: '/contact',
    label: 'Contact',
    icon: <MapPin className="h-4 w-4" />,
    megaMenu: false,
    children: [
      { path: '/contact/support', label: 'Support', type: 'tool', icon: <User className="w-4 h-4" /> },
      { path: '/contact/partnerships', label: 'Partnerships', type: 'tool', icon: <Building2 className="w-4 h-4" /> }
    ]
  }
]; */

export default function Navbar({}: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMegaMenu = (label: string) => {
    setActiveMegaMenu(activeMegaMenu === label ? null : label);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 w-full z-[9999] bg-white shadow-sm h-14 md:h-[72px]"
    >
      <div className="max-w-[2000px] mx-auto h-full pl-0">
        <div className="flex items-center h-full">
          {/* Logo and Main Navigation */}
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex-shrink-0 pl-4">
              <Logo />
            </Link>

            {/* Main Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.path} className="relative">
                  {item.megaMenu ? (
                    <button
                      onClick={() => toggleMegaMenu(item.path)}
                      className="text-gray-700 hover:text-primary-500 px-3 py-2 text-base font-medium flex items-center space-x-1.5 group"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4 group-hover:text-primary-500" />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-gray-700 hover:text-primary-500 px-3 py-2 text-base font-medium flex items-center space-x-1.5 group"
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4 ml-auto pr-4">
            <Globe className="h-5 w-5 text-gray-600 hidden md:block" />
            <Link to="/help" className="hidden md:block">
              <HelpCircle className="h-5 w-5 text-gray-600 hover:text-primary-500 transition-colors" />
            </Link>
            
            {/* User Profile & Sign In - Desktop */}
            <div className="hidden md:block">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-500"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">{user?.name || user?.email?.split('@')[0] || 'User'}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/my-trips"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My Trips
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/signin"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      {activeMegaMenu && (
        <div className="fixed inset-0 top-16 w-screen h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
          <div className="w-full h-full">
            <div className="flex h-full">
              {/* Left Column - 30% */}
              <div className="w-[30%] h-full p-16 border-r border-white/10">
                {activeMegaMenu === '/islands' ? (
                  <>
                    <h2 className="text-4xl font-bold text-white mb-6">
                      Destinations
                    </h2>
                    <p className="text-xl text-white/90 leading-relaxed">
                      Explore the beautiful islands of Greece.
                    </p>
                    <div className="mt-8 space-y-6">
                      <div className="bg-white/10 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Featured Islands</h3>
                        <p className="text-white/90">Discover the most popular islands in Greece.</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-4xl font-bold text-white mb-6">
                      Plan Your Trip
                    </h2>
                    <p className="text-xl text-white/90 leading-relaxed">
                      Get ready for your next adventure.
                    </p>
                    <div className="mt-8 space-y-6">
                      <div className="bg-white/10 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Travel Tips</h3>
                        <p className="text-white/80 text-sm">Get the most out of your trip with our expert tips.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right Column - 70% */}
              <div className="w-[70%] h-full p-16 overflow-y-auto">
                {activeMegaMenu === '/islands' ? (
                  <div className="grid grid-cols-3 gap-12">
                    {/* Travel Guides */}
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-8">Travel Guides</h3>
                      <ul className="space-y-6 mb-8">
                        {navigationItems
                          .find(item => item.path === activeMegaMenu)
                          ?.children?.filter(child => child.type === 'guide')
                          .map((child) => (
                            <li key={child.path}>
                              <Link
                                to={child.path}
                                className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                                onClick={() => setActiveMegaMenu(null)}
                              >
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          ))}
                      </ul>
                      <Link
                        to="/guides"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        All Guides
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Popular Islands */}
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-8">Popular Islands</h3>
                      <ul className="space-y-6 mb-8">
                        {navigationItems
                          .find(item => item.path === activeMegaMenu)
                          ?.children?.filter(child => child.type === 'island')
                          .map((child) => (
                            <li key={child.path}>
                              <Link
                                to={child.path}
                                className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                                onClick={() => setActiveMegaMenu(null)}
                              >
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          ))}
                      </ul>
                      <Link
                        to="/islands"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        All Islands
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Featured Content */}
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-8">Featured Content</h3>
                      <div className="space-y-6">
                        <Link
                          to="/blog/best-cyclades-islands"
                          className="block group bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-colors"
                          onClick={() => setActiveMegaMenu(null)}
                        >
                          <h4 className="text-lg font-semibold text-white mb-2">Best Cyclades Islands</h4>
                          <p className="text-white/80 text-sm">Discover the best islands in the Cyclades.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-12">
                    {/* Planning Tools */}
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-8">Planning Tools</h3>
                      <ul className="space-y-6 mb-8">
                        {navigationItems
                          .find(item => item.path === activeMegaMenu)
                          ?.children?.map((child) => (
                            <li key={child.path}>
                              <Link
                                to={child.path}
                                className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                                onClick={() => setActiveMegaMenu(null)}
                              >
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          ))}
                      </ul>
                      <Link
                        to="/touristas-ai"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        Plan Your Trip
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Travel Resources */}
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-8">Travel Resources</h3>
                      <ul className="space-y-6 mb-8">
                        <li>
                          <Link
                            to="/ferry-guide"
                            className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                            onClick={() => setActiveMegaMenu(null)}
                          >
                            <span>Ferry Guide</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/weather"
                            className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                            onClick={() => setActiveMegaMenu(null)}
                          >
                            <span>Weather Guide</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/budget-calculator"
                            className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                            onClick={() => setActiveMegaMenu(null)}
                          >
                            <span>Budget Calculator</span>
                          </Link>
                        </li>
                      </ul>
                      <Link
                        to="/resources"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        All Resources
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Featured Content */}
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-8">Featured Content</h3>
                      <div className="space-y-6">
                        <Link
                          to="/guides/island-hopping"
                          className="block group bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-colors"
                          onClick={() => setActiveMegaMenu(null)}
                        >
                          <h4 className="text-lg font-semibold text-white mb-2">Island Hopping Guide</h4>
                          <p className="text-white/80 text-sm">Discover the best islands to visit in Greece.</p>
                        </Link>
                        <Link
                          to="/guides/best-time-to-visit"
                          className="block group bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-colors"
                          onClick={() => setActiveMegaMenu(null)}
                        >
                          <h4 className="text-lg font-semibold text-white mb-2">Best Time to Visit</h4>
                          <p className="text-white/80 text-sm">Find out the best time to visit Greece.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <MobileMenuNew isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </nav>
  );
}