import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { getIslandSlug } from '../utils/slugify';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo variant="white" />
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted guide to exploring the Greek islands with curated accommodations,
              activities, and local experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/list-property" className="hover:text-white transition-colors">List Your Property</Link></li>
              <li><Link to="/guides" className="hover:text-white transition-colors">Travel Guides</Link></li>
              <li><Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Popular Islands</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to={`/islands/${getIslandSlug('Santorini')}`} className="hover:text-white transition-colors">Santorini</Link></li>
              <li><Link to={`/islands/${getIslandSlug('Mykonos')}`} className="hover:text-white transition-colors">Mykonos</Link></li>
              <li><Link to={`/islands/${getIslandSlug('Paros')}`} className="hover:text-white transition-colors">Paros</Link></li>
              <li><Link to={`/islands/${getIslandSlug('Naxos')}`} className="hover:text-white transition-colors">Naxos</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get special offers and travel inspiration.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-md text-gray-900 focus:outline-none"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              {currentYear} Discover Cyclades. All rights reserved.
              <span className="mx-2">•</span>
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              <span className="mx-2">•</span>
              <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            </div>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}