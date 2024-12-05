import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

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
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900"
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
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* User Section */}
                <div className="p-4 border-b bg-gray-50">
                  {isAuthenticated ? (
                    <div className="flex items-center space-x-3">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        onAuthClick();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Sign In</span>
                    </button>
                  )}
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-gray-50"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full px-4 py-2 text-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    Close Menu
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}