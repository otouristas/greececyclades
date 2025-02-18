import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Car
} from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  // Add any future props here
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
    type?: 'guide' | 'island' | 'tool';
  }>;
}

const navigationItems: NavItem[] = [
  {
    path: '/islands',
    label: 'Destinations',
    icon: <Sun className="h-4 w-4" />,
    megaMenu: true,
    children: [
      // Travel Guides Section
      { path: '/guides/santorini', label: 'Santorini Guide', type: 'guide', icon: <Sun className="w-4 h-4" /> },
      { path: '/guides/mykonos', label: 'Mykonos Guide', type: 'guide', icon: <Sailboat className="w-4 h-4" /> },
      { path: '/guides/naxos', label: 'Naxos Guide', type: 'guide', icon: <UtensilsCrossed className="w-4 h-4" /> },
      { path: '/guides/paros', label: 'Paros Guide', type: 'guide', icon: <Compass className="w-4 h-4" /> },
      { path: '/guides/sifnos', label: 'Sifnos Guide', type: 'guide', icon: <UtensilsCrossed className="w-4 h-4" /> },
      { path: '/guides/ios', label: 'Ios Guide', type: 'guide', icon: <Sun className="w-4 h-4" /> },
      // Popular Islands Section
      { path: '/islands/santorini', label: 'Santorini', type: 'island', icon: <Sun className="w-4 h-4" /> },
      { path: '/islands/mykonos', label: 'Mykonos', type: 'island', icon: <Sailboat className="w-4 h-4" /> },
      { path: '/islands/naxos', label: 'Naxos', type: 'island', icon: <UtensilsCrossed className="w-4 h-4" /> },
      { path: '/islands/paros', label: 'Paros', type: 'island', icon: <Compass className="w-4 h-4" /> },
      { path: '/islands/sifnos', label: 'Sifnos', type: 'island', icon: <UtensilsCrossed className="w-4 h-4" /> },
      { path: '/islands/ios', label: 'Ios', type: 'island', icon: <Sun className="w-4 h-4" /> }
    ]
  },
  {
    path: '/plan',
    label: 'Plan Your Trip',
    icon: <MapPin className="h-4 w-4" />,
    megaMenu: true,
    children: [
      { path: '/activities', label: 'Activities', type: 'tool', icon: <Compass className="w-4 h-4" /> },
      { path: '/hotels', label: 'Hotels', type: 'tool', icon: <Hotel className="w-4 h-4" /> },
      { path: '/ferry-tickets', label: 'Ferry Tickets', type: 'tool', icon: <Sailboat className="w-4 h-4" /> },
      { path: '/flights', label: 'Flight Tickets', type: 'tool', icon: <Plane className="w-4 h-4" /> },
      { path: '/rent-a-car', label: 'Rent a Car', type: 'tool', icon: <Car className="w-4 h-4" /> },
      { path: '/transfers', label: 'Taxi Transfers', type: 'tool', icon: <Car className="w-4 h-4" /> }
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
];

export default function Navbar({  }: NavbarProps) {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const authDropdownRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
      if (authDropdownRef.current && !authDropdownRef.current.contains(event.target as Node)) {
        setShowAuthDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveSection(null);
  }, [location]);

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
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4 ml-auto pr-4">
            <Globe className="h-5 w-5 text-gray-600 hidden md:block" />
            <Link to="/help" className="hidden md:block">
              <HelpCircle className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
            </Link>

            <div className="relative" ref={authDropdownRef}>
              <button
                onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                className="group inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-full hover:bg-blue-700 hover:border-blue-700 transition-all"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showAuthDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showAuthDropdown && (
                <div className="absolute right-0 mt-2 w-64 origin-top-right overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="border-b border-gray-100 bg-gray-50 px-4 py-2">
                    <p className="text-sm font-medium text-gray-700">Choose account type</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => {
                        navigate('/signin');
                        setShowAuthDropdown(false);
                      }}
                      className="flex w-full items-center px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4 flex flex-col">
                        <span className="text-sm font-medium text-gray-900">User Account</span>
                        <span className="text-xs text-gray-500">For travelers and tourists</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/business/signin');
                        setShowAuthDropdown(false);
                      }}
                      className="flex w-full items-center px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4 flex flex-col">
                        <span className="text-sm font-medium text-gray-900">Business Account</span>
                        <span className="text-xs text-gray-500">For hotels and service providers</span>
                      </div>
                    </button>
                  </div>
                  <div className="border-t border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">New to Discover Cyclades?</span>
                      <button
                        onClick={() => {
                          navigate('/signup');
                          setShowAuthDropdown(false);
                        }}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Create account
                      </button>
                    </div>
                  </div>
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
        <div className="fixed inset-0 top-16 w-screen h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
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
                                <span className="mr-3 text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all">
                                  {child.icon}
                                </span>
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
                                <span className="mr-3 text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all">
                                  {child.icon}
                                </span>
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          ))}
                      </ul>
                      <Link
                        to="/trip-planner"
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
                            <span className="mr-3 text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all">
                              <Ship className="w-4 h-4" />
                            </span>
                            <span>Ferry Guide</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/weather"
                            className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                            onClick={() => setActiveMegaMenu(null)}
                          >
                            <span className="mr-3 text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all">
                              <Cloud className="w-4 h-4" />
                            </span>
                            <span>Weather Guide</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/budget-calculator"
                            className="group flex items-center text-lg text-white/90 hover:text-white transition-colors"
                            onClick={() => setActiveMegaMenu(null)}
                          >
                            <span className="mr-3 text-white/70 group-hover:text-white transform group-hover:scale-110 transition-all">
                              <Wallet className="w-4 h-4" />
                            </span>
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
              {/* Mobile Icons and Sign In - Only visible when menu is open */}
              <div className="flex items-center justify-between space-x-6 mb-8 pt-2 md:hidden">
                <div className="flex items-center space-x-6">
                  <Globe className="h-6 w-6 text-white/80" />
                  <Link to="/help" onClick={toggleMobileMenu}>
                    <HelpCircle className="h-6 w-6 text-white/80 hover:text-white transition-colors" />
                  </Link>
                </div>
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
                            <span className="text-sm text-white/70">Explore More</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-4 py-2 text-xs text-white/70">
                Don't have an account?{' '}
                <Link to="/signup" onClick={toggleMobileMenu} className="font-medium text-white hover:text-blue-600">
                  Sign up
                </Link>
              </div>
            </div>
            <div className="border-t border-white/10 p-4">
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}