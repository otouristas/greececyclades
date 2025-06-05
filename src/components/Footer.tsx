import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Shield,
  CreditCard,
  CheckCircle,
  Star,
  Users,
  Award,
  Globe,
  Download,
  MessageCircle,
  Headphones,
  TrendingUp,
  BookOpen,
  Camera,
  Map,
  Plane,
  Ship,
  Car,
  Hotel,
  Calendar,
  Sun,
  Smartphone,
  Wifi,
  Lock
} from 'lucide-react';
import { getIslandSlug } from '../utils/slugify';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // All Cyclades islands data
  const popularIslands = [
    { name: 'Santorini', slug: getIslandSlug('Santorini') },
    { name: 'Mykonos', slug: getIslandSlug('Mykonos') },
    { name: 'Paros', slug: getIslandSlug('Paros') },
    { name: 'Naxos', slug: getIslandSlug('Naxos') },
    { name: 'Milos', slug: getIslandSlug('Milos') },
    { name: 'Ios', slug: getIslandSlug('Ios') }
  ];

  const moreIslands = [
    { name: 'Amorgos', slug: getIslandSlug('Amorgos') },
    { name: 'Folegandros', slug: getIslandSlug('Folegandros') },
    { name: 'Sifnos', slug: getIslandSlug('Sifnos') },
    { name: 'Andros', slug: getIslandSlug('Andros') },
    { name: 'Tinos', slug: getIslandSlug('Tinos') },
    { name: 'Syros', slug: getIslandSlug('Syros') },
    { name: 'Serifos', slug: getIslandSlug('Serifos') },
    { name: 'Antiparos', slug: getIslandSlug('Antiparos') },
    { name: 'Koufonisia', slug: getIslandSlug('Koufonisia') },
    { name: 'Sikinos', slug: getIslandSlug('Sikinos') },
    { name: 'Anafi', slug: getIslandSlug('Anafi') },
    { name: 'Kea', slug: getIslandSlug('Kea') }
  ];

  return (
    <footer className="bg-primary-800 text-white">
      {/* Newsletter & Statistics Section */}
      <div className="bg-primary-700 border-b border-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Newsletter Signup */}
            <div>
              <h3 className="text-2xl font-bold mb-2">Get Greek Islands Travel Tips</h3>
              <p className="text-primary-200 mb-4">Subscribe for exclusive deals, insider guides, and the latest updates from the Cyclades islands.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary-400"
                />
                <button className="px-6 py-3 bg-secondary-500 text-primary-800 font-semibold rounded-lg hover:bg-secondary-400 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-secondary-300">500+</div>
                <div className="text-sm text-primary-200">Activities</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-300">24</div>
                <div className="text-sm text-primary-200">Islands</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-300">10K+</div>
                <div className="text-sm text-primary-200">Happy Travelers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-300">4.8★</div>
                <div className="text-sm text-primary-200">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & About */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo variant="white" />
            </div>
            <p className="text-primary-200 text-sm mb-4">
              Your most trusted guide to exploring the Greek Cyclades islands. We provide authentic experiences, 
              curated accommodations, and local insights to make your Greek island adventure unforgettable.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-primary-200 text-sm mb-6">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-secondary-400" />
                <span>Kifisia, Athens 14562, Greece</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-secondary-400" />
                <span>+30 210 1234567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-secondary-400" />
                <span>greececycladesgr@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-3 text-secondary-400" />
                <span>Mon-Sun: 9:00 AM - 8:00 PM (EET)</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center bg-primary-700 px-3 py-1 rounded-full text-xs">
                <Award className="h-3 w-3 mr-1 text-secondary-400" />
                <span>TripAdvisor Excellence</span>
              </div>
              <div className="flex items-center bg-primary-700 px-3 py-1 rounded-full text-xs">
                <Star className="h-3 w-3 mr-1 text-secondary-400" />
                <span>4.8/5 Google Reviews</span>
              </div>
            </div>
          </div>

          {/* Greek Islands */}
          <div>
            <h4 className="font-semibold mb-4 text-secondary-300">Popular Islands</h4>
            <ul className="space-y-2 text-primary-200 text-sm">
              {popularIslands.map((island, index) => (
                <li key={index}>
                  <Link to={`/islands/${island.slug}`} className="hover:text-white transition-colors hover:text-secondary-300">
                    {island.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h5 className="font-semibold mt-6 mb-3 text-secondary-300">More Islands</h5>
            <ul className="space-y-1 text-primary-200 text-sm">
              {moreIslands.slice(0, 6).map((island, index) => (
                <li key={index}>
                  <Link to={`/islands/${island.slug}`} className="hover:text-white transition-colors hover:text-secondary-300">
                    {island.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/guides" className="text-secondary-400 hover:text-secondary-300 transition-colors font-medium">
                  View All Islands →
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Services */}
          <div>
            <h4 className="font-semibold mb-4 text-secondary-300">Travel Services</h4>
            <ul className="space-y-2 text-primary-200 text-sm">
              <li>
                <Link to="/ferry-tickets" className="flex items-center hover:text-secondary-300 transition-colors">
                  <Ship className="h-3 w-3 mr-2" />
                  Ferry Tickets
                </Link>
              </li>
              <li>
                <Link to="/flights" className="flex items-center hover:text-secondary-300 transition-colors">
                  <Plane className="h-3 w-3 mr-2" />
                  Flight Bookings
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="flex items-center hover:text-secondary-300 transition-colors">
                  <Hotel className="h-3 w-3 mr-2" />
                  Hotels & Resorts
                </Link>
              </li>
              <li>
                <Link to="/rent-a-car" className="flex items-center hover:text-secondary-300 transition-colors">
                  <Car className="h-3 w-3 mr-2" />
                  Car Rentals
                </Link>
              </li>
              <li>
                <Link to="/activities" className="flex items-center hover:text-secondary-300 transition-colors">
                  <Camera className="h-3 w-3 mr-2" />
                  Island Activities
                </Link>
              </li>
              <li>
                <Link to="/transfers" className="flex items-center hover:text-secondary-300 transition-colors">
                  <MapPin className="h-3 w-3 mr-2" />
                  Airport Transfers
                </Link>
              </li>
            </ul>

            <h5 className="font-semibold mt-6 mb-3 text-secondary-300">Travel Planning</h5>
            <ul className="space-y-1 text-primary-200 text-sm">
              <li><Link to="/trip-planner" className="hover:text-secondary-300 transition-colors">Trip Planner</Link></li>
              <li><Link to="/weather" className="hover:text-secondary-300 transition-colors">Weather Forecast</Link></li>
              <li><Link to="/packages" className="hover:text-secondary-300 transition-colors">Travel Packages</Link></li>
            </ul>
          </div>
        </div>

        {/* Second Row */}
        <div className="border-t border-primary-600 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Travel Information */}
            <div>
              <h4 className="font-semibold mb-4 text-secondary-300">Travel Information</h4>
              <ul className="space-y-2 text-primary-200 text-sm">
                <li>
                  <Link to="/guides" className="flex items-center hover:text-secondary-300 transition-colors">
                    <BookOpen className="h-3 w-3 mr-2" />
                    Travel Guides
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="flex items-center hover:text-secondary-300 transition-colors">
                    <TrendingUp className="h-3 w-3 mr-2" />
                    Travel Blog
                  </Link>
                </li>
                <li>
                  <Link to="/best-time-to-visit" className="flex items-center hover:text-secondary-300 transition-colors">
                    <Sun className="h-3 w-3 mr-2" />
                    Best Time to Visit
                  </Link>
                </li>
                <li>
                  <Link to="/greek-culture" className="flex items-center hover:text-secondary-300 transition-colors">
                    <Globe className="h-3 w-3 mr-2" />
                    Greek Culture
                  </Link>
                </li>
                <li>
                  <Link to="/transportation" className="flex items-center hover:text-secondary-300 transition-colors">
                    <Map className="h-3 w-3 mr-2" />
                    Transportation
                  </Link>
                </li>
                <li>
                  <Link to="/travel-tips" className="flex items-center hover:text-secondary-300 transition-colors">
                    <CheckCircle className="h-3 w-3 mr-2" />
                    Travel Tips
                  </Link>
                </li>
              </ul>

              <h5 className="font-semibold mt-6 mb-3 text-secondary-300">Practical Info</h5>
              <ul className="space-y-1 text-primary-200 text-sm">
                <li><Link to="/visa-requirements" className="hover:text-secondary-300 transition-colors">Visa Requirements</Link></li>
                <li><Link to="/currency-exchange" className="hover:text-secondary-300 transition-colors">Currency & Money</Link></li>
                <li><Link to="/emergency-contacts" className="hover:text-secondary-300 transition-colors">Emergency Contacts</Link></li>
              </ul>
            </div>

            {/* Customer Support */}
            <div>
              <h4 className="font-semibold mb-4 text-secondary-300">Customer Support</h4>
              <ul className="space-y-2 text-primary-200 text-sm">
                <li>
                  <Link to="/contact" className="flex items-center hover:text-secondary-300 transition-colors">
                    <Headphones className="h-3 w-3 mr-2" />
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="flex items-center hover:text-secondary-300 transition-colors">
                    <MessageCircle className="h-3 w-3 mr-2" />
                    FAQ & Help
                  </Link>
                </li>
                <li>
                  <Link to="/booking-help" className="flex items-center hover:text-secondary-300 transition-colors">
                    <Calendar className="h-3 w-3 mr-2" />
                    Booking Help
                  </Link>
                </li>
                <li>
                  <Link to="/reviews" className="flex items-center hover:text-secondary-300 transition-colors">
                    <Star className="h-3 w-3 mr-2" />
                    Customer Reviews
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="flex items-center hover:text-secondary-300 transition-colors">
                    <Users className="h-3 w-3 mr-2" />
                    About Us
                  </Link>
                </li>
              </ul>

              <h5 className="font-semibold mt-6 mb-3 text-secondary-300">Legal & Business</h5>
              <ul className="space-y-1 text-primary-200 text-sm">
                <li><Link to="/privacy" className="hover:text-secondary-300 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-secondary-300 transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-secondary-300 transition-colors">Cookie Policy</Link></li>
                <li><Link to="/gdpr" className="hover:text-secondary-300 transition-colors">GDPR Compliance</Link></li>
                <li><Link to="/list-property" className="hover:text-secondary-300 transition-colors">List Your Property</Link></li>
                <li><Link to="/partnerships" className="hover:text-secondary-300 transition-colors">Partnerships</Link></li>
                <li><Link to="/sitemap" className="hover:text-secondary-300 transition-colors">Sitemap</Link></li>
              </ul>
            </div>

            {/* Resources & Digital Tools */}
            <div>
              <h4 className="font-semibold mb-4 text-secondary-300">Resources</h4>
              <ul className="space-y-2 text-primary-200 text-sm">
                <li>
                  <Link to="/photo-gallery" className="flex items-center hover:text-secondary-300 transition-colors">
                    <Camera className="h-3 w-3 mr-2" />
                    Photo Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/downloadable-maps" className="flex items-center hover:text-secondary-300 transition-colors">
                    <Download className="h-3 w-3 mr-2" />
                    Island Maps
                  </Link>
                </li>
                <li>
                  <Link to="/travel-checklist" className="flex items-center hover:text-secondary-300 transition-colors">
                    <CheckCircle className="h-3 w-3 mr-2" />
                    Travel Checklist
                  </Link>
                </li>
                <li>
                  <Link to="/greek-phrases" className="flex items-center hover:text-secondary-300 transition-colors">
                    <Globe className="h-3 w-3 mr-2" />
                    Greek Phrases
                  </Link>
                </li>
                <li>
                  <Link to="/weather-app" className="flex items-center hover:text-secondary-300 transition-colors">
                    <Sun className="h-3 w-3 mr-2" />
                    Weather App
                  </Link>
                </li>
                <li>
                  <Link to="/currency-converter" className="flex items-center hover:text-secondary-300 transition-colors">
                    <TrendingUp className="h-3 w-3 mr-2" />
                    Currency Converter
                  </Link>
                </li>
              </ul>

              <h5 className="font-semibold mt-6 mb-3 text-secondary-300">Digital Tools</h5>
              <ul className="space-y-1 text-primary-200 text-sm">
                <li><Link to="/itinerary-builder" className="hover:text-secondary-300 transition-colors">Itinerary Builder</Link></li>
                <li><Link to="/ferry-tracker" className="hover:text-secondary-300 transition-colors">Ferry Tracker</Link></li>
                <li><Link to="/budget-calculator" className="hover:text-secondary-300 transition-colors">Budget Calculator</Link></li>
                <li><Link to="/packing-list" className="hover:text-secondary-300 transition-colors">Smart Packing List</Link></li>
              </ul>
            </div>

            {/* Mobile Apps & Language */}
            <div>
              <h4 className="font-semibold mb-4 text-secondary-300">Mobile Apps</h4>
              <div className="space-y-3 mb-6">
                <a href="#" className="flex items-center text-primary-200 text-sm hover:text-secondary-300 transition-colors">
                  <Smartphone className="h-4 w-4 mr-2 text-secondary-400" />
                  Download for iOS
                </a>
                <a href="#" className="flex items-center text-primary-200 text-sm hover:text-secondary-300 transition-colors">
                  <Smartphone className="h-4 w-4 mr-2 text-secondary-400" />
                  Download for Android
                </a>
              </div>

              <h5 className="font-semibold mb-4 text-secondary-300">Follow Us</h5>
              <div className="flex gap-3 mb-6">
                <a href="https://facebook.com/discovercyclades" className="text-primary-300 hover:text-secondary-300 transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://instagram.com/discovercyclades" className="text-primary-300 hover:text-secondary-300 transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://youtube.com/discovercyclades" className="text-primary-300 hover:text-secondary-300 transition-colors" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="https://twitter.com/discovercyclades" className="text-primary-300 hover:text-secondary-300 transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>

              <h5 className="font-semibold mb-3 text-secondary-300">Language</h5>
              <div className="grid grid-cols-2 gap-2">
                <button className="text-xs px-3 py-2 bg-primary-700 rounded hover:bg-primary-600 transition-colors">🇺🇸 EN</button>
                <button className="text-xs px-3 py-2 bg-primary-700 rounded hover:bg-primary-600 transition-colors">🇬🇷 GR</button>
                <button className="text-xs px-3 py-2 bg-primary-700 rounded hover:bg-primary-600 transition-colors">🇩🇪 DE</button>
                <button className="text-xs px-3 py-2 bg-primary-700 rounded hover:bg-primary-600 transition-colors">🇫🇷 FR</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features & Trust Section */}
      <div className="border-t border-primary-600 bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-6 w-6 text-secondary-400 mb-2" />
              <div className="text-sm font-medium">Secure Booking</div>
              <div className="text-xs text-primary-200">SSL Protected</div>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="h-6 w-6 text-secondary-400 mb-2" />
              <div className="text-sm font-medium">Free Cancellation</div>
              <div className="text-xs text-primary-200">Most Bookings</div>
            </div>
            <div className="flex flex-col items-center">
              <Headphones className="h-6 w-6 text-secondary-400 mb-2" />
              <div className="text-sm font-medium">24/7 Support</div>
              <div className="text-xs text-primary-200">Always Here</div>
            </div>
            <div className="flex flex-col items-center">
              <TrendingUp className="h-6 w-6 text-secondary-400 mb-2" />
              <div className="text-sm font-medium">Best Price</div>
              <div className="text-xs text-primary-200">Guaranteed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Social & Legal */}
      <div className="border-t border-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Copyright & Legal Links */}
            <div className="text-primary-200 text-sm text-center lg:text-left">
              <div className="mb-2 flex flex-col lg:flex-row items-center lg:items-start gap-2">
                <span>© {currentYear} Discover Cyclades. All rights reserved. Made with ❤️ by</span>
                <a 
                  href="https://anotherseoguru.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img 
                    src="https://anotherseoguru.com/logo.svg" 
                    alt="Another SEO Guru" 
                    className="h-6 w-auto inline-block filter brightness-0 invert"
                  />
                </a>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs">
                <span className="flex items-center">
                  <Lock className="h-3 w-3 mr-1" />
                  Secure & GDPR Compliant
                </span>
                <span>•</span>
                <Link to="/accessibility" className="hover:text-secondary-300 transition-colors">Accessibility</Link>
                <span>•</span>
                <Link to="/affiliate-disclosure" className="hover:text-secondary-300 transition-colors">Affiliate Disclosure</Link>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex justify-center lg:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary-200">We Accept:</span>
                <div className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4 text-primary-300" />
                  <span className="text-xs text-primary-200">Visa, MC, PayPal</span>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Footer Text */}
          <div className="mt-6 pt-6 border-t border-primary-600 text-xs text-primary-300 text-center">
            <p>
              Discover Cyclades is your premier Greek islands travel guide, specializing in Santorini hotels, Mykonos activities, 
              Paros family vacations, Naxos authentic experiences, and Milos hidden gems. We offer comprehensive travel services 
              including ferry tickets, flight bookings, car rentals, and curated island tours across all 24 Cyclades islands. 
              Plan your perfect Greek island getaway with local insights, best price guarantees, and 24/7 customer support.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}