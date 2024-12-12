import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronDown, MapPin, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Logo from '../Logo';

interface NavigationMenuProps {
  onAuthClick: () => void;
}

const navigationItems = [
  { path: '/islands', label: 'Cyclades Islands' },
  { path: '/guides', label: 'Travel Guides' },
  { 
    path: '/activities', 
    label: 'Activities',
    children: [
      { path: '/activities', label: 'All Activities' },
      { path: '/culinary', label: 'Culinary' }
    ]
  },
  { path: '/hotels', label: 'Hotels' },
  { path: '/rent-a-car', label: 'Rent a Car' },
  { path: '/ferry-tickets', label: 'Ferry Tickets' }
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
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
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
              className="fixed right-0 top-0 h-full w-full bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
                    <Link to="/" onClick={closeMenu}>
                      <Logo />
                    </Link>
                    <button
                      onClick={closeMenu}
                      className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 py-4 overflow-y-auto">
                  <div className="max-w-7xl mx-auto w-full px-4">
                    <div className="space-y-1">
                      {navigationItems.map((item) => (
                        <div key={item.path}>
                          {item.children ? (
                            <>
                              <button
                                onClick={() => setExpandedItem(expandedItem === item.path ? null : item.path)}
                                className={`flex items-center w-full gap-2 px-4 py-3 text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg ${
                                  location.pathname.startsWith(item.path) ? 'text-blue-600 font-medium' : ''
                                }`}
                              >
                                {item.label}
                                <ChevronDown 
                                  className={`h-4 w-4 ml-auto transition-transform duration-200 ${
                                    expandedItem === item.path ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>
                              {expandedItem === item.path && (
                                <div className="mt-1 space-y-1">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.path}
                                      to={child.path}
                                      onClick={closeMenu}
                                      className={`flex items-center gap-2 px-8 py-3 text-base text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg ${
                                        location.pathname === child.path ? 'text-blue-600 font-medium' : ''
                                      }`}
                                    >
                                      {child.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <Link
                              to={item.path}
                              onClick={closeMenu}
                              className={`flex items-center gap-2 px-4 py-3 text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg ${
                                location.pathname === item.path ? 'text-blue-600 font-medium' : ''
                              }`}
                            >
                              {item.label}
                              <ChevronRight className="h-4 w-4 ml-auto" />
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Auth Section */}
                <div className="border-t">
                  <div className="max-w-7xl mx-auto w-full px-4 py-4">
                    {user ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 px-4 py-2">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Link
                            to="/profile"
                            onClick={closeMenu}
                            className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <User className="h-5 w-5 mr-3" />
                            My Profile
                          </Link>
                          <Link
                            to="/my-trips"
                            onClick={closeMenu}
                            className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <MapPin className="h-5 w-5 mr-3" />
                            My Trips
                          </Link>
                          <button
                            onClick={() => {
                              handleLogout();
                              closeMenu();
                            }}
                            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <LogOut className="h-5 w-5 mr-3" />
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
                        className="w-full px-4 py-3 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
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