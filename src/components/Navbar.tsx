import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from './navigation/NavigationMenu';
import { useAuthStore } from '../store/authStore';
import { User, LogOut, ChevronDown } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onAuthClick: () => void;
}

export default function Navbar({ onAuthClick }: NavbarProps) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/islands" className="text-gray-600 hover:text-gray-900">Islands</Link>
            <Link to="/guides" className="text-gray-600 hover:text-gray-900">Travel Guides</Link>
            <Link to="/activities" className="text-gray-600 hover:text-gray-900">Activities</Link>
            <Link to="/hotels" className="text-gray-600 hover:text-gray-900">Hotels</Link>
            <Link to="/rent-a-car" className="text-gray-600 hover:text-gray-900">Rent A Car</Link>
            <Link to="/list-property" className="text-gray-600 hover:text-gray-900">List Property</Link>
          </div>

          {/* Auth Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Auth Button - Desktop Only */}
            <div className="hidden md:block">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="font-medium">{user?.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border">
                      <Link
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu */}
            <NavigationMenu onAuthClick={onAuthClick} />
          </div>
        </div>
      </div>
    </nav>
  );
}