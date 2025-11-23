import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  ChevronDown, 
  Sun, 
  Compass, 
  Sailboat, 
  UtensilsCrossed,
  Hotel,
  Menu, 
  X, 
  ChevronRight,
  MapPin,
  Building2,
  Globe,
  HelpCircle,
  ArrowRight,
  Ship,
  Cloud,
  Wallet,
  Plane,
  Car,
  Calculator,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import Logo from './Logo';

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

export default function Navbar({ onAuthClick }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
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
    setActiveSection(null);
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
    setActiveSection(null);
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
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
                    <span className="text-sm font-medium">{user?.displayName || user?.name || user?.email?.split('@')[0] || 'User'}</span>
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
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col h-full">
          {/* Header with Logo and Close Button */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white sticky top-0">
            <Link to="/" onClick={toggleMobileMenu} className="flex-shrink-0">
              <Logo />
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Main Navigation Area */}
          <div className="flex-1 overflow-y-auto">
            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-2 p-4 border-b border-gray-100">
              <Link 
                to="/ferry-tickets" 
                onClick={toggleMobileMenu}
                className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-primary-50 transition-colors text-center"
              >
                <Sailboat className="h-6 w-6 text-primary-600 mb-2" />
                <span className="text-xs font-medium text-gray-700">Ferries</span>
              </Link>
              <Link 
                to="/activities" 
                onClick={toggleMobileMenu}
                className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-primary-50 transition-colors text-center"
              >
                <Compass className="h-6 w-6 text-primary-600 mb-2" />
                <span className="text-xs font-medium text-gray-700">Activities</span>
              </Link>
              <Link 
                to="/flights" 
                onClick={toggleMobileMenu}
                className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-primary-50 transition-colors text-center"
              >
                <Plane className="h-6 w-6 text-primary-600 mb-2" />
                <span className="text-xs font-medium text-gray-700">Flights</span>
              </Link>
              <Link 
                to="/rent-a-car" 
                onClick={toggleMobileMenu}
                className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-primary-50 transition-colors text-center"
              >
                <Car className="h-6 w-6 text-primary-600 mb-2" />
                <span className="text-xs font-medium text-gray-700">Cars</span>
              </Link>
            </div>

            {/* Main Navigation Items */}
            <div className="p-4">
              {/* Destinations Section */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('/islands')}
                  className="flex items-center justify-between w-full py-3 text-gray-800 hover:text-primary-600 transition-colors"
                >
                  <div className="flex items-center">
                    <Sun className="h-5 w-5 text-primary-600 mr-3" />
                    <span className="text-base font-medium">Destinations</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${activeSection === '/islands' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeSection === '/islands' && (
                  <div className="mt-2 ml-8 space-y-1 animate-fadeIn">
                    <div className="flex items-center justify-between mb-2 mt-4">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Popular Islands</h4>
                      <Link 
                        to="/islands" 
                        onClick={toggleMobileMenu}
                        className="text-xs font-medium text-primary-600 flex items-center hover:text-primary-700"
                      >
                        View All
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                    {navigationItems
                      .find(item => item.path === '/islands')
                      ?.children?.filter(child => child.type === 'island')
                      .slice(0, 4) // Limit to 4 islands
                      .map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="flex items-center py-2 px-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          onClick={toggleMobileMenu}
                        >
                          <span>{child.label}</span>
                        </Link>
                      ))}
                      
                    <div className="flex items-center justify-between mb-2 mt-4">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Travel Guides</h4>
                      <Link 
                        to="/guides" 
                        onClick={toggleMobileMenu}
                        className="text-xs font-medium text-primary-600 flex items-center hover:text-primary-700"
                      >
                        View All
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                    {navigationItems
                      .find(item => item.path === '/islands')
                      ?.children?.filter(child => child.type === 'guide')
                      .slice(0, 4) // Limit to 4 guides
                      .map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="flex items-center py-2 px-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          onClick={toggleMobileMenu}
                        >
                          <span>{child.label}</span>
                        </Link>
                      ))}
                  </div>
                )}
              </div>
              
              {/* Plan Your Trip Section */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('/plan')}
                  className="flex items-center justify-between w-full py-3 text-gray-800 hover:text-primary-600 transition-colors"
                >
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary-600 mr-3" />
                    <span className="text-base font-medium">Plan Your Trip</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${activeSection === '/plan' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeSection === '/plan' && (
                  <div className="mt-2 ml-8 space-y-1 animate-fadeIn">
                    {navigationItems
                      .find(item => item.path === '/plan')
                      ?.children?.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="flex items-center py-2 px-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          onClick={toggleMobileMenu}
                        >
                          <span>{child.label}</span>
                        </Link>
                      ))}
                  </div>
                )}
              </div>
              
              {/* Travel Tips */}
              <Link
                to="/blog"
                className="flex items-center py-3 text-gray-800 hover:text-primary-600 transition-colors"
                onClick={toggleMobileMenu}
              >
                <Compass className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-base font-medium">Travel Tips</span>
              </Link>
              
              {/* Other Links */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  to="/about"
                  className="flex items-center py-3 text-gray-800 hover:text-primary-600 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  <User className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-base font-medium">About</span>
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center py-3 text-gray-800 hover:text-primary-600 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  <MapPin className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-base font-medium">Contact</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Footer with Auth Buttons */}
          <div className="p-4 border-t border-gray-100 bg-white space-y-3">
            <Link
              to="/signin"
              onClick={toggleMobileMenu}
              className="w-full flex items-center justify-center rounded-lg border border-primary-600 px-4 py-3 text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={toggleMobileMenu}
              className="w-full flex items-center justify-center rounded-lg bg-primary-600 px-4 py-3 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
            >
              <User className="h-5 w-5 mr-2" />
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}