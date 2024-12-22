import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronDown, MapPin, User, LogOut, Globe, Search, Sun, Compass, Sailboat, UtensilsCrossed, Camera, Hotel, Car } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Logo from '../Logo';

interface NavigationMenuProps {
  onAuthClick: () => void;
}

const popularIslands = [
  { name: 'Santorini', image: '/assets/images/islands/santorini.jpg', path: '/islands/santorini', description: 'Iconic sunsets & white architecture' },
  { name: 'Mykonos', image: '/assets/images/islands/mykonos.jpg', path: '/islands/mykonos', description: 'Vibrant nightlife & pristine beaches' },
  { name: 'Naxos', image: '/assets/images/islands/naxos.jpg', path: '/islands/naxos', description: 'Traditional villages & ancient ruins' },
  { name: 'Paros', image: '/assets/images/islands/paros.jpg', path: '/islands/paros', description: 'Charming ports & water sports' },
];

const quickLinks = [
  { icon: <Sun className="w-5 h-5" />, label: 'Best Time to Visit', path: '/guides/best-time' },
  { icon: <Compass className="w-5 h-5" />, label: 'Island Hopping', path: '/guides/island-hopping' },
  { icon: <Sailboat className="w-5 h-5" />, label: 'Ferry Routes', path: '/ferry-tickets' },
  { icon: <UtensilsCrossed className="w-5 h-5" />, label: 'Local Cuisine', path: '/culinary' },
  { icon: <Camera className="w-5 h-5" />, label: 'Photo Spots', path: '/guides/photo-spots' },
  { icon: <Hotel className="w-5 h-5" />, label: 'Where to Stay', path: '/hotels' },
];

const navigationItems = [
  { 
    path: '/islands', 
    label: 'Destinations',
    icon: <Globe className="h-5 w-5" />,
    megaMenu: true
  },
  { 
    path: '/plan', 
    label: 'Plan Your Trip',
    icon: <Compass className="h-5 w-5" />,
    children: [
      { path: '/activities', label: 'Activities', icon: <Compass className="w-4 h-4" /> },
      { path: '/hotels', label: 'Hotels', icon: <Hotel className="w-4 h-4" /> },
      { path: '/rent-a-car', label: 'Car Rental', icon: <Car className="w-4 h-4" /> },
      { path: '/ferry-tickets', label: 'Ferry Tickets', icon: <Sailboat className="w-4 h-4" /> }
    ]
  }
];

const islandCategories = [
  { label: 'Popular Islands', items: ['Santorini', 'Mykonos', 'Naxos', 'Paros'] },
  { label: 'Off the Beaten Path', items: ['Antiparos', 'Koufonisia', 'Sifnos', 'Folegandros'] },
  { label: 'Family Friendly', items: ['Naxos', 'Milos', 'Syros', 'Andros'] },
  { label: 'Beach Paradise', items: ['Milos', 'Koufonisia', 'Ios', 'Antiparos'] },
];

export default function NavigationMenu({ onAuthClick }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedItem(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeMenu();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <Link to="/" onClick={closeMenu}>
                      <Logo />
                    </Link>
                    <button
                      onClick={closeMenu}
                      className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 text-gray-900 placeholder-gray-500 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 py-4 overflow-y-auto">
                  <div className="px-4 space-y-4">
                    {navigationItems.map((item) => (
                      <div key={item.path} className="space-y-2">
                        <button
                          onClick={() => setExpandedItem(expandedItem === item.path ? null : item.path)}
                          className={`flex items-center w-full gap-3 p-3 text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors ${
                            location.pathname.startsWith(item.path) ? 'text-blue-600 font-medium' : ''
                          }`}
                        >
                          {item.icon}
                          {item.label}
                          <ChevronDown 
                            className={`h-5 w-5 ml-auto transition-transform duration-200 ${
                              expandedItem === item.path ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {expandedItem === item.path && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                          >
                            {item.megaMenu ? (
                              <>
                                {/* Featured Islands */}
                                <div className="space-y-3">
                                  <h3 className="text-sm font-semibold text-gray-900 px-3">Popular Islands</h3>
                                  <div className="grid grid-cols-2 gap-3">
                                    {popularIslands.map((island) => (
                                      <Link
                                        key={island.name}
                                        to={island.path}
                                        onClick={closeMenu}
                                        className="relative rounded-lg overflow-hidden aspect-[4/3]"
                                      >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
                                        <img 
                                          src={island.image}
                                          alt={island.name}
                                          className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-2 z-20">
                                          <h4 className="text-white font-medium text-sm">{island.name}</h4>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>

                                {/* Quick Links */}
                                <div className="space-y-3">
                                  <h3 className="text-sm font-semibold text-gray-900 px-3">Quick Links</h3>
                                  <div className="grid grid-cols-2 gap-2">
                                    {quickLinks.map((link) => (
                                      <Link
                                        key={link.label}
                                        to={link.path}
                                        onClick={closeMenu}
                                        className="flex items-center gap-2 p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                      >
                                        {link.icon}
                                        <span>{link.label}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>

                                {/* Categories */}
                                <div className="space-y-3">
                                  <h3 className="text-sm font-semibold text-gray-900 px-3">Categories</h3>
                                  <div className="space-y-4">
                                    {islandCategories.map((category) => (
                                      <div key={category.label} className="space-y-2">
                                        <h4 className="text-sm font-medium text-gray-900 px-3">{category.label}</h4>
                                        <div className="grid grid-cols-2 gap-1">
                                          {category.items.map((island) => (
                                            <Link
                                              key={island}
                                              to={`/islands/${island.toLowerCase()}`}
                                              onClick={closeMenu}
                                              className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                            >
                                              {island}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="ml-4 space-y-1">
                                {item.children?.map((child) => (
                                  <Link
                                    key={child.path}
                                    to={child.path}
                                    onClick={closeMenu}
                                    className={`flex items-center gap-3 p-3 text-base text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors ${
                                      location.pathname === child.path ? 'text-blue-600 font-medium' : ''
                                    }`}
                                  >
                                    {child.icon}
                                    {child.label}
                                    <ChevronRight className="h-4 w-4 ml-auto" />
                                  </Link>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Auth Section */}
                <div className="border-t">
                  <div className="p-4">
                    {user ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center ring-2 ring-white">
                              <span className="text-white font-medium">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Link
                            to="/profile"
                            onClick={closeMenu}
                            className="flex items-center w-full gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                          >
                            <User className="h-5 w-5" />
                            My Profile
                            <ChevronRight className="h-4 w-4 ml-auto" />
                          </Link>
                          <Link
                            to="/my-trips"
                            onClick={closeMenu}
                            className="flex items-center w-full gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                          >
                            <MapPin className="h-5 w-5" />
                            My Trips
                            <ChevronRight className="h-4 w-4 ml-auto" />
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <LogOut className="h-5 w-5" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          onAuthClick();
                          closeMenu();
                        }}
                        className="w-full py-3 px-4 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-colors"
                      >
                        Sign In
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}