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
  Ship,
  Cloud,
  Building2,
  Wallet,
  ArrowRight,
  Globe,
  HelpCircle
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { auth } from '../config/firebase';
import Logo from './Logo';

interface NavbarProps {
  onAuthClick: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon?: React.ReactElement;
  megaMenu: boolean;
  children?: Array<{
    path: string;
    label: string;
    icon: React.ReactElement;
  }>;
}

const navigationItems: NavItem[] = [
  {
    path: '/islands',
    label: 'Destinations',
    icon: <Sun className="h-4 w-4" />,
    megaMenu: true,
    children: [
      { path: '/islands/santorini', label: 'Santorini', icon: <Sun className="w-4 h-4" /> },
      { path: '/islands/mykonos', label: 'Mykonos', icon: <Sailboat className="w-4 h-4" /> },
      { path: '/islands/naxos', label: 'Naxos', icon: <UtensilsCrossed className="w-4 h-4" /> },
      { path: '/islands/paros', label: 'Paros', icon: <Compass className="w-4 h-4" /> },
      { path: '/islands/sifnos', label: 'Sifnos', icon: <UtensilsCrossed className="w-4 h-4" /> },
      { path: '/islands/ios', label: 'Ios', icon: <Sun className="w-4 h-4" /> }
    ]
  },
  {
    path: '/plan',
    label: 'Plan Your Trip',
    icon: <MapPin className="h-4 w-4" />,
    megaMenu: true,
    children: [
      { path: '/activities', label: 'Activities', icon: <Compass className="w-4 h-4" /> },
      { path: '/hotels', label: 'Hotels', icon: <Hotel className="w-4 h-4" /> },
      { path: '/ferry-tickets', label: 'Ferry Tickets', icon: <Sailboat className="w-4 h-4" /> }
    ]
  },
  {
    path: '/blog',
    label: 'Travel Tips',
    icon: <Compass className="h-4 w-4" />,
    megaMenu: false
  }
];

const mobileOnlyItems: NavItem[] = [
  {
    path: '/about',
    label: 'About',
    icon: <User className="h-4 w-4" />,
    megaMenu: false,
    children: [
      { path: '/about/team', label: 'Our Team', icon: <User className="w-4 h-4" /> },
      { path: '/about/mission', label: 'Our Mission', icon: <Compass className="w-4 h-4" /> }
    ]
  },
  {
    path: '/contact',
    label: 'Contact',
    icon: <MapPin className="h-4 w-4" />,
    megaMenu: false,
    children: [
      { path: '/contact/support', label: 'Support', icon: <User className="w-4 h-4" /> },
      { path: '/contact/partnerships', label: 'Partnerships', icon: <Building2 className="w-4 h-4" /> }
    ]
  }
];

export default function Navbar({ onAuthClick }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await auth.signOut();
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
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium flex items-center space-x-1.5 group"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4 group-hover:text-blue-600" />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium flex items-center space-x-1.5 group"
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}
                  {/* Mega Menu */}
                  {activeMegaMenu === item.path && item.megaMenu && (
                    <div className="fixed inset-0 top-16 w-screen h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
                      <div className="w-full h-full">
                        <div className="flex h-full">
                          {/* Left Column - 30% */}
                          <div className="w-[30%] h-full p-16 border-r border-white/10">
                            {item.path === '/islands' ? (
                              <>
                                <h2 className="text-4xl font-bold text-white mb-6">
                                  Greek Islands
                                </h2>
                                <p className="text-xl text-white/90 leading-relaxed">
                                  Explore the enchanting Greek islands, where ancient history meets 
                                  crystal-clear waters and vibrant culture.
                                </p>
                                <div className="mt-8 space-y-6">
                                  <div className="bg-white/10 rounded-xl p-6">
                                    <h3 className="text-xl font-semibold text-white mb-2">Featured Islands</h3>
                                    <p className="text-white/90">Discover our handpicked selection of the most beautiful Greek islands</p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <h2 className="text-4xl font-bold text-white mb-6">
                                  Plan Your Journey
                                </h2>
                                <p className="text-xl text-white/90 leading-relaxed">
                                  Create your perfect Greek island adventure with our comprehensive 
                                  travel planning tools and guides.
                                </p>
                                <div className="mt-8 space-y-6">
                                  <div className="bg-white/10 rounded-xl p-6">
                                    <h3 className="text-xl font-semibold text-white mb-2">Travel Tips</h3>
                                    <p className="text-white/80 text-sm">Expert advice to help you make the most of your Greek island experience</p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Right Column - 70% */}
                          <div className="w-[70%] h-full p-16 overflow-y-auto">
                            {item.path === '/islands' ? (
                              <div className="grid grid-cols-3 gap-12">
                                {/* Travel Guides */}
                                <div>
                                  <h3 className="text-2xl font-semibold text-white mb-8">Travel Guides</h3>
                                  <ul className="space-y-6 mb-8">
                                    {item.children?.map((child) => (
                                      <li key={child.path}>
                                        <Link
                                          to={child.path}
                                          className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                                          onClick={() => setActiveMegaMenu(null)}
                                        >
                                          <span className="mr-3 text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all">
                                            {child.icon}
                                          </span>
                                          <span>{child.label} Guide</span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                  <Link
                                    to="/blog"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                    onClick={() => setActiveMegaMenu(null)}
                                  >
                                    All Travel Guides
                                    <ArrowRight className="w-4 h-4" />
                                  </Link>
                                </div>

                                {/* Popular Islands */}
                                <div>
                                  <h3 className="text-2xl font-semibold text-white mb-8">Popular Islands</h3>
                                  <ul className="space-y-6 mb-8">
                                    {item.children?.map((child) => (
                                      <li key={child.path}>
                                        <Link
                                          to={child.path}
                                          className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                                          onClick={() => setActiveMegaMenu(null)}
                                        >
                                          <span className="mr-3 text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all">
                                            {child.icon}
                                          </span>
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
                                    All Cyclades Islands
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
                                      <p className="text-white/80 text-sm">Discover the top islands to visit in the Cyclades</p>
                                    </Link>
                                    <Link
                                      to="/blog/island-hopping-guide"
                                      className="block group bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-colors"
                                      onClick={() => setActiveMegaMenu(null)}
                                    >
                                      <h4 className="text-lg font-semibold text-white mb-2">Island Hopping Guide</h4>
                                      <p className="text-white/80 text-sm">Plan your perfect island-hopping adventure</p>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="grid grid-cols-3 gap-12">
                                {/* Travel Essentials */}
                                <div>
                                  <h3 className="text-2xl font-semibold text-white mb-8">Travel Essentials</h3>
                                  <ul className="space-y-6">
                                    {item.children?.map((child) => (
                                      <li key={child.path}>
                                        <Link
                                          to={child.path}
                                          className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                                          onClick={() => setActiveMegaMenu(null)}
                                        >
                                          <span className="mr-3 text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all">
                                            {child.icon}
                                          </span>
                                          <span>{child.label}</span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Trip Planning */}
                                <div>
                                  <h3 className="text-2xl font-semibold text-white mb-8">Trip Planning</h3>
                                  <ul className="space-y-6">
                                    <li>
                                      <Link 
                                        to="/itineraries" 
                                        className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                                        onClick={() => setActiveMegaMenu(null)}
                                      >
                                        <MapPin className="w-6 h-6 mr-3 text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all" />
                                        <div>
                                          <span className="block">Suggested Routes</span>
                                          <span className="text-sm text-white/70">1-3 week itineraries</span>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link 
                                        to="/island-hopping" 
                                        className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                                        onClick={() => setActiveMegaMenu(null)}
                                      >
                                        <Ship className="w-6 h-6 mr-3 text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all" />
                                        <div>
                                          <span className="block">Island Hopping</span>
                                          <span className="text-sm text-white/70">Ferry routes & tips</span>
                                        </div>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>

                                {/* Resources */}
                                <div>
                                  <h3 className="text-2xl font-semibold text-white mb-8">Resources</h3>
                                  <ul className="space-y-6">
                                    <li>
                                      <Link 
                                        to="/weather" 
                                        className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                                        onClick={() => setActiveMegaMenu(null)}
                                      >
                                        <Cloud className="w-6 h-6 mr-3 text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all" />
                                        <div>
                                          <span className="block">Weather Guide</span>
                                          <span className="text-sm text-white/70">Best time to visit</span>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link 
                                        to="/budget" 
                                        className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                                        onClick={() => setActiveMegaMenu(null)}
                                      >
                                        <Wallet className="w-6 h-6 mr-3 text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all" />
                                        <div>
                                          <span className="block">Budget Tips</span>
                                          <span className="text-sm text-white/70">Cost planning</span>
                                        </div>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Icons and Sign In */}
          <div className="hidden md:flex items-center ml-auto">
            <div className="flex items-center space-x-4">
              <Globe className="h-5 w-5 text-gray-600" />
              <HelpCircle className="h-5 w-5 text-gray-600" />
              <span className="text-gray-300">|</span>
            </div>
            <div className="pl-4 pr-4">
              <button
                onClick={onAuthClick}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <User className="h-5 w-5 mr-2" />
                Sign in
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto pr-4">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex md:items-center">
            {isAuthenticated && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <User className="h-5 w-5" />
                  <span>{user?.displayName || user?.name || 'User'}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/my-trips"
                      className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    >
                      My Trips
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 z-50">
          <div className="flex flex-col h-full">
            <div className="flex justify-end items-center p-4 border-b border-white/10">
              <button
                onClick={toggleMobileMenu}
                className="text-white/90 hover:text-white p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-8 px-6">
              {/* Mobile Icons and Sign In */}
              <div className="flex items-center justify-center space-x-6 mb-8 pt-2">
                <Globe className="h-6 w-6 text-white/80" />
                <HelpCircle className="h-6 w-6 text-white/80" />
                <button
                  onClick={onAuthClick}
                  className="inline-flex items-center justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
                >
                  <User className="h-5 w-5 mr-2" />
                  Sign in
                </button>
              </div>

              {[...navigationItems, ...mobileOnlyItems].map((item) => (
                <div key={item.path} className="mb-8">
                  {item.megaMenu ? (
                    <button
                      onClick={() => toggleSection(item.path)}
                      className="flex items-center justify-between w-full py-3 text-white/90 hover:text-white"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all">
                          {item.icon}
                        </span>
                        <span className="text-xl font-medium">{item.label}</span>
                      </div>
                      <ChevronRight className={`h-5 w-5 transform transition-transform ${activeSection === item.path ? 'rotate-90' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="flex items-center justify-between w-full py-3 text-white/90 hover:text-white"
                      onClick={() => toggleSection(item.path)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all">
                          {item.icon}
                        </span>
                        <span className="text-xl font-medium">{item.label}</span>
                      </div>
                      {item.children && (
                        <ChevronRight className={`h-5 w-5 transform transition-transform ${activeSection === item.path ? 'rotate-90' : ''}`} />
                      )}
                    </Link>
                  )}
                  {activeSection === item.path && item.children && (
                    <div className="mt-2 ml-6 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="group flex items-center text-lg text-white/90 hover:text-white transition-colors py-2"
                          onClick={() => {
                            toggleMobileMenu();
                            setActiveMegaMenu(null);
                          }}
                        >
                          <span className="mr-3 text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all">
                            {child.icon}
                          </span>
                          <div>
                            <span className="block">{child.label}</span>
                            <span className="text-sm text-white/70">Explore more</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 p-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-white/90 hover:text-white"
                    onClick={toggleMobileMenu}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-trips"
                    className="block px-4 py-2 text-white/90 hover:text-white"
                    onClick={toggleMobileMenu}
                  >
                    My Trips
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="w-full text-left px-4 py-2 text-white/90 hover:text-white"
                  >
                    Sign Out
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}