import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavigationMenu from './navigation/NavigationMenu';
import { useAuthStore } from '../store/authStore';
import { User, LogOut, ChevronDown, MapPin } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
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

export default function Navbar({ onAuthClick }: NavbarProps) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigationItems = getNavigationItems(isAuthenticated);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-gray-600 hover:text-blue-600 ${
                  location.pathname === item.path ? 'text-blue-600' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Auth Button - Desktop Only */}
            <div className="hidden md:block">
              {isAuthenticated && user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="font-medium">{user.name}</span>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 border">
                      <div className="px-4 py-2 border-b">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <User className="h-4 w-4 mr-2" />
                          My Profile
                        </Link>
                        <Link
                          to="/my-trips"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          My Trips
                        </Link>
                      </div>
                      <div className="border-t py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <NavigationMenu onAuthClick={onAuthClick} />
          </div>
        </div>
      </div>
    </nav>
  );
}