import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight, MapPin, Phone } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Logo from '../Logo';

interface NavigationMenuProps {
  onAuthClick: () => void;
}

const navigationItems = [
  { path: '/islands', label: 'Islands' },
  { path: '/guides', label: 'Travel Guides' },
  { path: '/activities', label: 'Activities' },
  { path: '/hotels', label: 'Hotels' },
  { path: '/rent-a-car', label: 'Rent A Car' },
  { path: '/list-property', label: 'List Your Property' },
];

export default function NavigationMenu({ onAuthClick }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

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
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0" style={{ zIndex: 999 }}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-[100dvh] w-[280px] bg-white shadow-xl overflow-y-auto"
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
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {user?.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Link
                          to="/profile"
                          onClick={closeMenu}
                          className="flex items-center justify-between w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                        >
                          <span>My Profile</span>
                          <ChevronRight className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        onAuthClick();
                        closeMenu();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Sign In
                    </button>
                  )}
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 py-4">
                  <div className="px-4 space-y-1">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeMenu}
                        className="flex items-center justify-between w-full p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg group"
                      >
                        <span className="font-medium">{item.label}</span>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t bg-gray-50">
                  <div className="space-y-3">
                    <Link 
                      to="/contact" 
                      onClick={closeMenu} 
                      className="flex items-center gap-3 p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                    >
                      <MapPin className="h-5 w-5" />
                      <span>Find a Location</span>
                    </Link>
                    <Link 
                      to="/support" 
                      onClick={closeMenu} 
                      className="flex items-center gap-3 p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                    >
                      <Phone className="h-5 w-5" />
                      <span>Contact Support</span>
                    </Link>
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