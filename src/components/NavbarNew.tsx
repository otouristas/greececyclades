import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Menu, ChevronRight, ChevronDown, Search, Sparkles,
    MapPin, Compass, Ship, User, Calendar, Hotel
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import MobileMenuNew from './navigation/MobileMenuNew';
import { ThemeToggle, useTheme } from '../contexts/ThemeContext';
import { useTouristas } from '../contexts/TouristasContext';
import { useAuthStore } from '../stores/authStore';

// ========================================
// MEGA MENU CONFIGURATION FOR 24 ISLANDS
// ========================================

export const megaMenuConfig = {
    islands: {
        name: 'Destinations',
        icon: MapPin,
        path: '/islands',
        featured: {
            title: 'Discover the Cyclades',
            description: 'Explore 24 stunning Greek islands',
            image: '/photos/santorini-oia-sunset.jpg',
            cta: { text: 'View All Islands', path: '/islands' }
        },
        columns: [
            {
                title: 'Popular Islands',
                links: [
                    { name: 'Santorini', path: '/islands/santorini', badge: 'Most Popular' },
                    { name: 'Mykonos', path: '/islands/mykonos', badge: 'Party' },
                    { name: 'Naxos', path: '/islands/naxos' },
                    { name: 'Paros', path: '/islands/paros', badge: 'Trending' },
                    { name: 'Milos', path: '/islands/milos', badge: 'Beaches' },
                    { name: 'Ios', path: '/islands/ios' },
                ]
            },
            {
                title: 'Hidden Gems',
                links: [
                    { name: 'Folegandros', path: '/islands/folegandros', badge: 'Authentic' },
                    { name: 'Sifnos', path: '/islands/sifnos', badge: 'Foodie' },
                    { name: 'Serifos', path: '/islands/serifos' },
                    { name: 'Amorgos', path: '/islands/amorgos' },
                    { name: 'Koufonisia', path: '/islands/koufonisia', badge: 'Quiet' },
                    { name: 'Tinos', path: '/islands/tinos' },
                ]
            },
            {
                title: 'Guides & Resources',
                links: [
                    { name: 'All Island Guides', path: '/guides', badge: 'New' },
                    { name: 'Best Cyclades Islands', path: '/best-cyclades-islands-to-visit' },
                    { name: 'Island Hopping Tips', path: '/ferry-guide' },
                    { name: 'Compare Islands', path: '/islands#compare' },
                ]
            }
        ],
        banner: {
            text: '🏝️ 24 Cyclades Islands Covered',
            subtext: 'Expert guides for every destination'
        }
    },
    experiences: {
        name: 'Things to Do',
        icon: Compass,
        path: '/activities',
        featured: {
            title: 'Unforgettable Experiences',
            description: 'Tours, cruises & activities across the islands',
            image: '/photos/santorini-sunset-cruise.jpg',
            cta: { text: 'Browse Activities', path: '/activities' }
        },
        columns: [
            {
                title: 'Popular',
                links: [
                    { name: 'Sunset Cruises', path: '/activities?cat=cruises', badge: 'Top Rated' },
                    { name: 'Volcano Tours', path: '/activities?cat=volcano' },
                    { name: 'Wine Tasting', path: '/activities?cat=wine' },
                    { name: 'Water Sports', path: '/activities?cat=watersports' },
                ]
            },
            {
                title: 'By Interest',
                links: [
                    { name: 'Romance & Couples', path: '/activities?cat=romance' },
                    { name: 'Photography Tours', path: '/activities?cat=photo' },
                    { name: 'Culture & History', path: '/activities?cat=culture' },
                    { name: 'Adventure', path: '/activities?cat=adventure' },
                ]
            },
            {
                title: 'Plan',
                links: [
                    { name: 'Ask Touristas AI', path: '/touristas-ai', badge: 'AI' },
                    { name: 'Trip Planner', path: '/trip-planner' },
                    { name: 'Day Itineraries', path: '/guides/santorini#itinerary' },
                ]
            }
        ],
        banner: {
            text: '✨ Book with confidence',
            subtext: 'Free cancellation on most tours'
        }
    },
    transport: {
        name: 'Getting There',
        icon: Ship,
        path: '/ferry-tickets',
        featured: {
            title: 'Travel to the Islands',
            description: 'Ferries, flights & island hopping',
            image: '/photos/ferry-greece.jpg',
            cta: { text: 'Search Ferries', path: '/ferry-tickets' }
        },
        columns: [
            {
                title: 'By Ferry',
                links: [
                    { name: 'Ferry Tickets', path: '/ferry-tickets', badge: 'Book Now' },
                    { name: 'Ferry Guide', path: '/ferry-guide' },
                    { name: 'Athens to Santorini', path: '/ferry-guide#athens-santorini' },
                    { name: 'Island Hopping Routes', path: '/ferry-guide#routes' },
                ]
            },
            {
                title: 'By Air',
                links: [
                    { name: 'Flight Search', path: '/flights' },
                    { name: 'Santorini Airport', path: '/guides/santorini#airport' },
                    { name: 'Mykonos Airport', path: '/guides/mykonos#airport' },
                ]
            },
            {
                title: 'On Island',
                links: [
                    { name: 'Rent a Car', path: '/rent-a-car' },
                    { name: 'Taxi Transfers', path: '/transfers' },
                    { name: 'Bus Info', path: '/guides/santorini#transport' },
                ]
            }
        ],
        banner: {
            text: '🚢 Compare all ferry operators',
            subtext: 'Best prices guaranteed'
        }
    },
    stay: {
        name: 'Where to Stay',
        icon: Hotel,
        path: '/hotels',
        featured: {
            title: 'Find Your Perfect Stay',
            description: 'Hotels, villas & boutique accommodations',
            image: '/photos/santorini-hotel-pool.jpg',
            cta: { text: 'Search Hotels', path: '/hotels' }
        },
        columns: [
            {
                title: 'By Island',
                links: [
                    { name: 'Santorini Hotels', path: '/hotels?island=santorini', badge: 'Popular' },
                    { name: 'Mykonos Hotels', path: '/hotels?island=mykonos' },
                    { name: 'Paros Hotels', path: '/hotels?island=paros' },
                    { name: 'Naxos Hotels', path: '/hotels?island=naxos' },
                    { name: 'Milos Hotels', path: '/hotels?island=milos', badge: 'New' },
                ]
            },
            {
                title: 'By Type',
                links: [
                    { name: 'Luxury Villas', path: '/hotels?type=villa' },
                    { name: 'Cave Hotels', path: '/hotels?type=cave', badge: 'Unique' },
                    { name: 'Boutique Hotels', path: '/hotels?type=boutique' },
                    { name: 'Budget-Friendly', path: '/hotels?type=budget' },
                ]
            },
            {
                title: 'Explore',
                links: [
                    { name: 'Book Hotels', path: '/book', badge: 'LiteAPI' },
                    { name: 'All Hotels', path: '/hotels' },
                    { name: 'Business Directory', path: '/directory', badge: 'New' },
                    { name: 'Restaurants & Bars', path: '/directory?type=restaurant' },
                    { name: 'List Your Property', path: '/list-property' },
                ]
            }
        ],
        banner: {
            text: '🏨 Best price guarantee',
            subtext: 'Compare rates from top booking sites'
        }
    },
    planning: {
        name: 'Plan Your Trip',
        icon: Calendar,
        path: '/touristas-ai',
        featured: {
            title: 'AI-Powered Trip Planning',
            description: 'Get personalized recommendations instantly',
            image: '/photos/santorini-caldera-view.jpg',
            cta: { text: 'Start Planning with AI', path: '/touristas-ai' }
        },
        columns: [
            {
                title: 'Essentials',
                links: [
                    { name: 'Best Time to Visit', path: '/weather' },
                    { name: 'Budget Calculator', path: '/budget-calculator' },
                    { name: 'Greek Phrases', path: '/greek-phrases' },
                    { name: 'Travel Resources', path: '/resources' },
                ]
            },
            {
                title: 'AI Tools',
                links: [
                    { name: 'Touristas AI Chat', path: '/touristas-ai/chat', badge: 'New' },
                    { name: 'Trip Planner', path: '/trip-planner', badge: 'AI' },
                    { name: 'Hotel Finder', path: '/hotels' },
                ]
            },
            {
                title: 'Help',
                links: [
                    { name: 'Help Center', path: '/help' },
                    { name: 'FAQ', path: '/help#faq' },
                    { name: 'Contact Us', path: '/contact' },
                ]
            }
        ],
        banner: {
            text: '🤖 Ask Touristas AI anything',
            subtext: 'Instant answers 24/7'
        }
    }
};

type MenuKey = keyof typeof megaMenuConfig;

// ========================================
// MAIN NAVBAR COMPONENT
// ========================================

export default function NavbarNew() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { resolvedTheme } = useTheme();
    const { openChat } = useTouristas();
    const { user, logout } = useAuthStore();
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const menuKeys = Object.keys(megaMenuConfig) as MenuKey[];
    const isDark = resolvedTheme === 'dark';

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menus on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setActiveMenu(null);
        setUserMenuOpen(false);
    }, [location.pathname]);

    // Close on escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveMenu(null);
                setSearchOpen(false);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    // Body scroll lock for mobile menu
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <>
            <nav className={`sticky top-0 z-[100] w-full transition-all duration-300 ${scrolled
                ? isDark
                    ? 'bg-dark-bg/95 backdrop-blur-xl shadow-lg shadow-black/20'
                    : 'bg-white/95 backdrop-blur-xl shadow-lg'
                : isDark
                    ? 'bg-dark-bg'
                    : 'bg-white'
                }`}>
                <div className="max-w-[1800px] mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">

                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 group">
                            <Logo />
                        </Link>

                        {/* Desktop Navigation Pills */}
                        <div className="hidden lg:flex items-center justify-center flex-1 px-8">
                            <div className="flex items-center gap-1">
                                {menuKeys.map((key) => {
                                    const menu = megaMenuConfig[key];
                                    const Icon = menu.icon;
                                    const isActive = activeMenu === key;

                                    return (
                                        <button
                                            key={key}
                                            onMouseEnter={() => setActiveMenu(key)}
                                            onClick={() => setActiveMenu(isActive ? null : key)}
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${isActive
                                                ? 'bg-cyclades-turquoise text-dark-bg shadow-lg shadow-cyclades-turquoise/30'
                                                : isDark
                                                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{menu.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Desktop Right Actions */}
                        <div className="hidden lg:flex items-center gap-2">
                            {/* Search Button */}
                            <button
                                onClick={() => setSearchOpen(true)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${isDark
                                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                <Search className="w-4 h-4" />
                                <span className="text-sm hidden xl:inline">Search</span>
                            </button>

                            {/* Theme Toggle */}
                            <ThemeToggle size="sm" />

                            {/* AI Chat Button */}
                            <button
                                onClick={() => openChat()}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyclades-turquoise to-cyan-500 text-dark-bg rounded-full font-medium text-sm hover:shadow-lg hover:shadow-cyclades-turquoise/30 transition-all hover:scale-105"
                            >
                                <Sparkles className="w-4 h-4" />
                                <span>Touristas AI</span>
                            </button>

                            {/* User Menu */}
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${isDark
                                            ? 'text-white/70 hover:text-white hover:bg-white/10'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        <User className="w-4 h-4" />
                                        <span className="text-sm">{user.name?.split(' ')[0] || 'Account'}</span>
                                        <ChevronDown className="w-3 h-3" />
                                    </button>

                                    <AnimatePresence>
                                        {userMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl border overflow-hidden ${isDark
                                                    ? 'bg-dark-card border-dark-border'
                                                    : 'bg-white border-gray-200'
                                                    }`}
                                            >
                                                <Link
                                                    to="/profile"
                                                    className={`block px-4 py-3 text-sm transition-colors ${isDark
                                                        ? 'text-white hover:bg-white/10'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    My Profile
                                                </Link>
                                                <Link
                                                    to="/my-trips"
                                                    className={`block px-4 py-3 text-sm transition-colors ${isDark
                                                        ? 'text-white hover:bg-white/10'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    My Trips
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className={`w-full text-left px-4 py-3 text-sm transition-colors border-t ${isDark
                                                        ? 'text-red-400 hover:bg-white/10 border-dark-border'
                                                        : 'text-red-600 hover:bg-gray-50 border-gray-100'
                                                        }`}
                                                >
                                                    Sign Out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    to="/signin"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${isDark
                                        ? 'text-white/80 hover:text-white border border-white/20 hover:bg-white/10'
                                        : 'text-gray-700 hover:text-gray-900 border border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <User className="w-4 h-4" />
                                    <span>Sign In</span>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex lg:hidden items-center gap-2">
                            <ThemeToggle size="sm" />
                            <button
                                onClick={() => openChat()}
                                className="p-2 bg-cyclades-turquoise/20 text-cyclades-turquoise rounded-full"
                            >
                                <Sparkles className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className={`p-2 rounded-full transition-colors ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop Mega Menu Dropdown */}
                <AnimatePresence>
                    {activeMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`absolute left-0 right-0 top-full shadow-2xl z-[99] ${isDark ? 'bg-dark-card border-t border-dark-border' : 'bg-white border-t border-gray-100'
                                }`}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <div className="max-w-[1800px] mx-auto">
                                {(() => {
                                    const menu = megaMenuConfig[activeMenu];
                                    return (
                                        <div className="grid grid-cols-12 gap-0 min-h-[320px]">
                                            {/* Featured Card */}
                                            <div className="col-span-3 bg-gradient-to-br from-cyclades-turquoise to-cyan-600 p-8 relative overflow-hidden">
                                                <div className="absolute inset-0 opacity-20">
                                                    <img src={menu.featured.image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="relative z-10">
                                                    <h3 className="text-2xl font-bold text-white mb-2">{menu.featured.title}</h3>
                                                    <p className="text-white/80 text-sm mb-6">{menu.featured.description}</p>
                                                    <Link
                                                        to={menu.featured.cta.path}
                                                        className="inline-flex items-center gap-2 bg-white text-cyclades-turquoise px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-opacity-90 transition-colors group"
                                                    >
                                                        {menu.featured.cta.text}
                                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Link Columns */}
                                            <div className="col-span-7 grid grid-cols-3 gap-8 p-8">
                                                {menu.columns.map((column, idx) => (
                                                    <div key={idx}>
                                                        <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-white/50' : 'text-gray-400'
                                                            }`}>
                                                            {column.title}
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {column.links.map((link) => (
                                                                <li key={link.path}>
                                                                    <Link
                                                                        to={link.path}
                                                                        className={`group flex items-center justify-between py-1.5 transition-colors ${isDark
                                                                            ? 'text-white/80 hover:text-cyclades-turquoise'
                                                                            : 'text-gray-700 hover:text-cyclades-turquoise'
                                                                            }`}
                                                                    >
                                                                        <span className="font-medium">{link.name}</span>
                                                                        {link.badge && (
                                                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyclades-turquoise/20 text-cyclades-turquoise">
                                                                                {link.badge}
                                                                            </span>
                                                                        )}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Banner */}
                                            <div className={`col-span-2 p-8 flex flex-col justify-center ${isDark ? 'bg-dark-bg/50' : 'bg-gray-50'
                                                }`}>
                                                <div className="text-center">
                                                    <p className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                        {menu.banner.text}
                                                    </p>
                                                    <p className={`text-sm mb-6 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                                        {menu.banner.subtext}
                                                    </p>
                                                    <Link
                                                        to={menu.path}
                                                        className="inline-flex items-center gap-2 text-cyclades-turquoise font-semibold text-sm hover:underline group"
                                                    >
                                                        Explore All
                                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Backdrop for mega menu */}
            <AnimatePresence>
                {activeMenu && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 z-[98] backdrop-blur-sm"
                        onClick={() => setActiveMenu(null)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu - Premium Design */}
            <MobileMenuNew isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            {/* Search Modal */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20"
                        onClick={() => setSearchOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`w-full max-w-2xl mx-4 rounded-2xl shadow-2xl overflow-hidden ${isDark ? 'bg-dark-card' : 'bg-white'
                                }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className={`flex items-center gap-4 px-4 py-3 rounded-xl ${isDark ? 'bg-dark-bg' : 'bg-gray-100'
                                    }`}>
                                    <Search className={`w-5 h-5 ${isDark ? 'text-white/50' : 'text-gray-400'}`} />
                                    <input
                                        type="text"
                                        placeholder="Search islands, guides, activities..."
                                        autoFocus
                                        className={`flex-1 bg-transparent outline-none text-lg ${isDark ? 'text-white placeholder:text-white/40' : 'text-gray-900 placeholder:text-gray-400'
                                            }`}
                                    />
                                    <kbd className={`px-2 py-1 text-xs font-medium rounded ${isDark ? 'bg-dark-border text-white/50' : 'bg-gray-200 text-gray-500'
                                        }`}>
                                        ESC
                                    </kbd>
                                </div>
                                <p className={`mt-4 text-sm text-center ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                                    Type to search across all islands, guides, and activities
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
