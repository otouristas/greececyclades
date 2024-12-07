import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight, MapPin, Phone, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Logo from '../Logo';

interface NavigationMenuProps {
  onAuthClick: () => void;
}

const getNavigationItems = (isAuthenticated: boolean) => [
  { path: '/islands', label: 'Islands' },
  { path: '/guides', label: 'Travel Guides' },
  { path: '/activities', label: 'Activities' },
  { path: '/hotels', label: 'Hotels' },
  { path: '/rent-a-car', label: 'Rent A Car' },
  ...(isAuthenticated ? [{ path: '/blog', label: 'Blog' }] : []),
  { path: '/contact', label: 'Contact' },
];

export default function NavigationMenu({ onAuthClick }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigationItems = getNavigationItems(isAuthenticated);

  const closeMenu = () => setIsOpen(false);

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
          <div className="fixed inset-0 z-[90]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-[100dvh] w-full sm:w-[280px] bg-white shadow-xl overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <Link to="/" onClick={closeMenu} className="flex-shrink-0">
                    <Logo />
                  </Link>
                  <button
                    onClick={closeMenu}
                    className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* User Section */}
                <div className="p-4 border-b">
                  {isAuthenticated && user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-lg">
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
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                        >
                          <User className="h-4 w-4 mr-2" />
                          My Profile
                        </Link>
                        <Link
                          to="/my-trips"
                          onClick={closeMenu}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          My Trips
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={onAuthClick}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                      Sign In
                    </button>
                  )}
                </div>

                {/* Navigation Links */}
                <div className="flex-1 py-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMenu}
                      className="flex items-center justify-between px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {item.label}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Phone className="h-4 w-4" />
                    <span>Need help? Call us</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}