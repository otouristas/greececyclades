import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import SEO, { FAQItem, BreadcrumbItem } from '../SEO';
import { IslandGuide } from '../../types/island';
import { generateGuideSEO } from '../../utils/seoMetadata';
import FAQSection from '../FAQSection';
import RelatedLinks from '../RelatedLinks';
import GetYourGuideWidget, { GYG_LOCATIONS } from '../activities/GetYourGuideWidget';
import {
  Heart, ArrowRight, Utensils, MapPin, Calendar,
  Camera, Waves, Mountain, Compass, Sparkles, Ship,
  Hotel, Car, ChevronRight, Thermometer, Clock,
  Wine, Sunset, Plane, Info, CheckCircle,
  ExternalLink, Navigation, Globe, Sun,
  CloudSun, Snowflake, Leaf, Phone, Map
} from 'lucide-react';

// Types
interface QuickLink {
  iconType: IconType;
  title: string;
  description: string;
  link: string;
}

interface WhenToVisit {
  iconType: IconType;
  title: string;
  period: string;
  bullets: string[];
}

interface Village {
  name: string;
  description: string;
  imageQuery: string;
  highlights: string[];
}

interface Activity {
  title: string;
  items: string[];
}

interface Beach {
  name: string;
  description: string;
  imageQuery: string;
  highlights: string[];
}

interface Dining {
  name: string;
  description: string;
  recommendations: string[];
}

interface IslandContent {
  introduction: { text1: string; text2: string };
  quickLinks: QuickLink[];
  whenToVisit: WhenToVisit[];
  villages: Village[];
  activities: Activity[];
  beaches: Beach[];
  dining: Dining[];
}

interface Props {
  island: IslandGuide;
  content: IslandContent;
}

// Get actual image path for an island
const getIslandImagePath = (islandId: string, imageName: string) => {
  // Check if island has a subfolder
  const islandsWithSubfolders = ['santorini', 'mykonos', 'naxos', 'milos', 'paros'];
  if (islandsWithSubfolders.includes(islandId.toLowerCase())) {
    return `/images/islands/${islandId.toLowerCase()}/${imageName}`;
  }
  return `/images/islands/${islandId.toLowerCase()}.jpg`;
};

// Floating Navigation Sidebar (User likes this!)
const FloatingNav = ({ sections, islandName }: { sections: { id: string; label: string; icon: React.ReactNode }[]; islandName: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections_els = document.querySelectorAll('section[id]');
      let current = 'hero';
      sections_els.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < 200) {
          current = section.getAttribute('id') || 'hero';
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <motion.div
        initial={false}
        animate={{ width: isOpen ? 240 : 60 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-white dark:bg-dark-card shadow-2xl rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 flex items-center gap-3 border-b border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        >
          <div className="w-7 h-7 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-lg flex items-center justify-center shrink-0">
            <Navigation className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 text-left"
              >
                <span className="font-bold text-gray-900 dark:text-white text-sm block">{islandName}</span>
                <span className="text-xs text-gray-500 dark:text-white/50">Travel Guide</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <nav className="py-2">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 transition-all ${isActive
                  ? 'bg-cyan-600/10 dark:bg-cyclades-turquoise/10 text-cyan-600 dark:text-cyclades-turquoise border-r-2 border-cyan-600 dark:border-cyclades-turquoise'
                  : 'text-gray-600 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                <span className={`shrink-0 ${isActive ? 'scale-110' : ''} transition-transform`}>
                  {section.icon}
                </span>
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {section.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </a>
            );
          })}
        </nav>
      </motion.div>
    </div>
  );
};

// Image Gallery Component
const ImageGallery = ({ images, islandId }: { images: { src: string; alt: string; caption?: string }[]; islandId: string }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedImage(idx)}
            className={`relative overflow-hidden rounded-xl ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            <img
              src={getIslandImagePath(islandId, img.src)}
              alt={img.alt}
              className="w-full h-full object-cover aspect-square"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `/images/islands/${islandId}.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
              <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={getIslandImagePath(islandId, images[selectedImage].src)}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Quick Booking Bar
const QuickBookingBar = ({ islandName }: { islandName: string }) => (
  <div className="bg-white dark:bg-dark-card border-y border-gray-200 dark:border-white/10 sticky top-16 z-30 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 shrink-0">
          <MapPin className="w-5 h-5 text-cyan-600 dark:text-cyclades-turquoise" />
          <span className="font-semibold text-gray-900 dark:text-white">{islandName}</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/hotels"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-lg text-gray-800 dark:text-white text-sm font-medium transition-colors whitespace-nowrap"
          >
            <Hotel className="w-4 h-4 text-gray-600 dark:text-white/70" />
            Hotels
          </Link>
          <Link
            to="/ferry-tickets"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-lg text-gray-800 dark:text-white text-sm font-medium transition-colors whitespace-nowrap"
          >
            <Ship className="w-4 h-4 text-gray-600 dark:text-white/70" />
            Ferries
          </Link>
          <Link
            to="/flights"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-lg text-gray-800 dark:text-white text-sm font-medium transition-colors whitespace-nowrap"
          >
            <Plane className="w-4 h-4 text-gray-600 dark:text-white/70" />
            Flights
          </Link>
          <Link
            to="/rent-a-car"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-lg text-gray-800 dark:text-white text-sm font-medium transition-colors whitespace-nowrap"
          >
            <Car className="w-4 h-4 text-gray-600 dark:text-white/70" />
            Rent Car
          </Link>
        </div>
      </div>
    </div>
  </div>
);

// Main Component
const IslandGuideTemplateNew: React.FC<Props> = ({ island, content }) => {
  const islandId = island.id || island.name.toLowerCase();

  // Define images based on available files
  const galleryImages = [
    { src: 'hero.jpg', alt: `${island.name} panoramic view` },
    { src: 'oia.jpg', alt: 'Oia village' },
    { src: 'blue-domes.jpg', alt: 'Blue domes' },
    { src: 'caldera-view.jpg', alt: 'Caldera view' },
    { src: 'fira.jpg', alt: 'Fira town' },
    { src: 'red-beach.jpg', alt: 'Red Beach' },
    { src: 'vineyard.jpg', alt: 'Vineyard' },
    { src: 'sunset.jpg', alt: 'Sunset view' },
  ];

  const navSections = [
    { id: 'overview', label: 'Overview', icon: <Compass className="w-5 h-5" /> },
    { id: 'gallery', label: 'Photo Gallery', icon: <Camera className="w-5 h-5" /> },
    { id: 'villages', label: 'Villages', icon: <MapPin className="w-5 h-5" /> },
    { id: 'beaches', label: 'Beaches', icon: <Waves className="w-5 h-5" /> },
    { id: 'when-to-visit', label: 'Best Time', icon: <Calendar className="w-5 h-5" /> },
    { id: 'activities', label: 'Activities', icon: <Mountain className="w-5 h-5" /> },
    { id: 'dining', label: 'Food & Wine', icon: <Wine className="w-5 h-5" /> },
    { id: 'travel-info', label: 'Travel Info', icon: <Info className="w-5 h-5" /> },
  ];

  // Generate optimized SEO data using our high-CTR meta strategy
  const baseSeoData = generateGuideSEO(island.name);

  // Island-specific FAQs for rich snippets
  const islandFaqs: FAQItem[] = [
    {
      question: `How many days should I spend in ${island.name}?`,
      answer: `3-5 days is ideal for ${island.name}. This gives you time to explore the main attractions, beaches, villages, and local restaurants without rushing. For a quick visit, 2 days works, but you'll miss some hidden gems.`
    },
    {
      question: `What is the best time to visit ${island.name}?`,
      answer: `September-October offers the perfect balance of warm weather (22-28°C), fewer crowds, and reasonable prices. May-June is also excellent. Avoid July-August unless you love crowds and peak prices.`
    },
    {
      question: `How do I get to ${island.name} from Athens?`,
      answer: `The most common way is by ferry from Piraeus port (2-5 hours depending on ferry type). Fast ferries are quicker but pricier. You can also fly to nearby islands with airports and take a short ferry connection.`
    },
    {
      question: `Is ${island.name} expensive to visit?`,
      answer: `${island.name} offers options for all budgets. Budget travelers can manage €50-80/day with hostels and tavernas. Mid-range is €100-150/day. Luxury experiences start at €200+/day. Shoulder season offers 30-50% savings.`
    },
    {
      question: `What are the must-see attractions in ${island.name}?`,
      answer: `Top attractions include the main village/town, best beaches, local restaurants serving traditional cuisine, sunset viewpoints, and any unique cultural sites. Check our detailed guide above for specific recommendations.`
    },
    {
      question: `Do I need a car in ${island.name}?`,
      answer: `It depends on the island size. Smaller islands are walkable or have good bus service. Larger islands benefit from car/ATV rental to explore hidden beaches and villages. We recommend booking in advance during peak season.`
    }
  ];

  // Breadcrumbs for navigation schema
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Island Guides', url: '/guides' },
    { name: island.name, url: `/guides/${islandId}` }
  ];

  const seoData = {
    title: baseSeoData.title,
    description: baseSeoData.description,
    keywords: baseSeoData.keywords,
    ogImage: `/images/islands/${islandId}/hero.jpg`,
    ogType: 'article' as const,
    pageType: 'guides' as const,
    islandData: {
      name: island.name,
      description: baseSeoData.description
    },
    faqs: islandFaqs,
    breadcrumbs: breadcrumbItems,
    lastModified: new Date().toISOString().split('T')[0]
  };

  return (
    <>
      <SEO {...seoData} />

      <div className="min-h-screen bg-white dark:bg-dark-bg">
        {/* HERO SECTION */}
        <section id="hero" className="relative h-[85vh] min-h-[600px]">
          {/* Hero Image */}
          <div className="absolute inset-0">
            <img
              src={islandId === 'santorini' ? '/images/islands/santorini/fira-view.jpg' : `/images/islands/${islandId}/hero.jpg`}
              alt={island.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `/images/islands/${islandId}.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-white text-sm font-medium">
                    <Globe className="w-4 h-4" />
                    Cyclades, Greece
                  </span>
                  <span className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-full px-4 py-2 text-white text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    Updated December 2026
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
                  {island.name}
                </h1>

                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-8">
                  {island.description}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {island.idealFor?.slice(0, 4).map((tag: string, idx: number) => (
                    <span key={idx} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/hotels"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg"
                  >
                    <Hotel className="w-5 h-5" />
                    Find Hotels in {island.name}
                  </Link>
                  <Link
                    to="/ferry-tickets"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-all"
                  >
                    <Ship className="w-5 h-5" />
                    Book Ferry Tickets
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Quick Booking Bar */}
        <QuickBookingBar islandName={island.name} />

        {/* Floating Navigation */}
        <FloatingNav sections={navSections} islandName={island.name} />

        {/* OVERVIEW SECTION */}
        <section id="overview" className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Discover {island.name}
                  </h2>

                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-white/70 text-lg leading-relaxed mb-6">
                      {content.introduction.text1}
                    </p>
                    <p className="text-gray-600 dark:text-white/70 text-lg leading-relaxed mb-8">
                      {content.introduction.text2}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid sm:grid-cols-2 gap-4 mt-8">
                    {[
                      { icon: Sunset, label: 'World-Famous Sunsets', desc: 'Oia sunset viewpoint' },
                      { icon: Wine, label: 'Local Wineries', desc: 'Volcanic wine tours' },
                      { icon: Waves, label: 'Unique Beaches', desc: 'Red, black & white sand' },
                      { icon: Camera, label: 'Iconic Views', desc: 'Blue domes & caldera' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-white/10">
                        <div className="w-12 h-12 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 rounded-xl flex items-center justify-center shrink-0">
                          <item.icon className="w-6 h-6 text-cyan-600 dark:text-cyclades-turquoise" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{item.label}</h4>
                          <p className="text-sm text-gray-600 dark:text-white/60">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Facts Card */}
                <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/10 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-cyclades-turquoise" />
                    Quick Facts
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-white/60">Best Time</span>
                      <span className="font-medium text-gray-900 dark:text-white">{typeof island.bestTime === 'string' ? island.bestTime : 'Apr - Oct'}</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-white/60">Weather</span>
                      <span className="font-medium text-gray-900 dark:text-white">25-30°C Summer</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-white/60">Language</span>
                      <span className="font-medium text-gray-900 dark:text-white">Greek, English</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-white/60">Currency</span>
                      <span className="font-medium text-gray-900 dark:text-white">Euro (€)</span>
                    </li>
                  </ul>
                </div>

                {/* Book Now Card */}
                <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-lg">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">Plan Your Trip</h3>
                  <p className="text-gray-600 dark:text-white/70 text-sm mb-4">Find the best deals on hotels, ferries, and activities.</p>
                  <div className="space-y-2">
                    <Link to="/hotels" className="flex items-center justify-between p-3 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 rounded-xl hover:bg-cyan-600/20 dark:hover:bg-cyclades-turquoise/30 transition-colors text-cyan-600 dark:text-cyclades-turquoise font-medium">
                      <span className="flex items-center gap-2">
                        <Hotel className="w-4 h-4" />
                        Hotels
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/ferry-tickets" className="flex items-center justify-between p-3 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 rounded-xl hover:bg-cyan-600/20 dark:hover:bg-cyclades-turquoise/30 transition-colors text-cyan-600 dark:text-cyclades-turquoise font-medium">
                      <span className="flex items-center gap-2">
                        <Ship className="w-4 h-4" />
                        Ferry Tickets
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/activities" className="flex items-center justify-between p-3 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 rounded-xl hover:bg-cyan-600/20 dark:hover:bg-cyclades-turquoise/30 transition-colors text-cyan-600 dark:text-cyclades-turquoise font-medium">
                      <span className="flex items-center gap-2">
                        <Mountain className="w-4 h-4" />
                        Activities
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PHOTO GALLERY SECTION */}
        <section id="gallery" className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Photo Gallery
                  </h2>
                  <p className="text-gray-600 dark:text-white/60">Discover the beauty of {island.name}</p>
                </div>
                <Link
                  to={`/islands/${islandId}`}
                  className="hidden md:flex items-center gap-2 text-cyan-600 dark:text-cyclades-turquoise hover:underline"
                >
                  View more photos <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              <ImageGallery images={galleryImages} islandId={islandId} />
            </motion.div>
          </div>
        </section>

        {/* VILLAGES SECTION */}
        <section id="villages" className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Villages & Towns
              </h2>
              <p className="text-gray-600 dark:text-white/60 mb-10 max-w-2xl">
                Explore the charming villages of {island.name}, each with its own unique character and atmosphere.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {content.villages.map((village, idx) => {
                  // Map village names to actual image files
                  const villageImages: Record<string, string> = {
                    'Oia': 'oia.jpg',
                    'Fira': 'fira.jpg',
                    'Imerovigli': 'imerovigli.jpg',
                    'Pyrgos': 'pyrgos.jpg',
                    'Megalochori': 'megalochori.jpg',
                  };
                  const imageName = villageImages[village.name] || `${village.name.toLowerCase()}.jpg`;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-white/10"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={getIslandImagePath(islandId, imageName)}
                          alt={village.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `/images/islands/${islandId}.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-2xl font-bold text-white mb-1">{village.name}</h3>
                          <div className="flex items-center gap-2 text-white/80 text-sm">
                            <MapPin className="w-4 h-4" />
                            {island.name}, Cyclades
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 dark:text-white/70 mb-4">{village.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {village.highlights.map((h, i) => (
                            <span key={i} className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/70 rounded-full">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* BEACHES SECTION */}
        <section id="beaches" className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Best Beaches
              </h2>
              <p className="text-gray-600 dark:text-white/60 mb-10 max-w-2xl">
                {island.name}'s beaches are unlike any others, featuring volcanic sand in stunning colors.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.beaches.map((beach, idx) => {
                  // Map beach names to actual image files
                  const beachImages: Record<string, string> = {
                    'Red Beach': 'red-beach.jpg',
                    'Perissa Beach': 'perissa-beach.jpg',
                    'Kamari Beach': 'kamari-beach.jpg',
                    'White Beach': 'white-beach.jpg',
                    'Vlychada Beach': 'vlychada-beach.jpg',
                    'Monolithos Beach': 'monolithos-beach.jpg',
                  };
                  const imageName = beachImages[beach.name] || `${beach.name.toLowerCase().replace(' ', '-')}.jpg`;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-gray-50 dark:bg-white/5 rounded-2xl overflow-hidden hover:shadow-lg transition-all border border-gray-100 dark:border-white/10"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={getIslandImagePath(islandId, imageName)}
                          alt={beach.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `/images/islands/${islandId}.jpg`;
                          }}
                        />
                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-xs font-medium text-cyan-600 dark:text-cyclades-turquoise flex items-center gap-1">
                            <Waves className="w-3 h-3" /> Beach
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">{beach.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-white/60 mb-3">{beach.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {beach.highlights.map((h, i) => (
                            <span key={i} className="text-xs px-2.5 py-1 bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 rounded-full">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* WHEN TO VISIT SECTION */}
        <section id="when-to-visit" className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Best Time to Visit
              </h2>
              <p className="text-gray-600 dark:text-white/60 mb-10 max-w-2xl">
                Plan your trip according to the season that best suits your preferences.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { season: 'Spring', months: 'Apr - May', icon: Leaf, temp: '18-24°C', color: 'emerald', desc: 'Wildflowers, fewer crowds, pleasant weather' },
                  { season: 'Summer', months: 'Jun - Aug', icon: Sun, temp: '25-32°C', color: 'amber', desc: 'Peak season, all amenities open, beach weather' },
                  { season: 'Autumn', months: 'Sep - Oct', icon: CloudSun, temp: '20-28°C', color: 'orange', desc: 'Wine harvest, perfect photos, warm sea' },
                  { season: 'Winter', months: 'Nov - Mar', icon: Snowflake, temp: '10-16°C', color: 'blue', desc: 'Quiet, authentic, lowest prices' },
                ].map((s, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:shadow-lg transition-all"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${s.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-500/20' :
                      s.color === 'amber' ? 'bg-amber-100 dark:bg-amber-500/20' :
                        s.color === 'orange' ? 'bg-orange-100 dark:bg-orange-500/20' :
                          'bg-blue-100 dark:bg-blue-500/20'
                      }`}>
                      <s.icon className={`w-7 h-7 ${s.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                        s.color === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                          s.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                            'text-blue-600 dark:text-blue-400'
                        }`} />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">{s.season}</h3>
                    <p className={`font-medium mb-3 ${s.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                      s.color === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                        s.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                          'text-blue-600 dark:text-blue-400'
                      }`}>{s.months}</p>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-white/60 text-sm mb-3">
                      <Thermometer className="w-4 h-4" />
                      {s.temp}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-white/60">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ACTIVITIES SECTION */}
        <section id="activities" className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Things to Do
                  </h2>
                  <p className="text-gray-600 dark:text-white/60">Activities and experiences in {island.name}</p>
                </div>
                <Link
                  to="/activities"
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 text-cyan-600 dark:text-cyclades-turquoise rounded-xl hover:bg-cyan-600/20 dark:hover:bg-cyclades-turquoise/30 transition-colors font-medium"
                >
                  Browse All Activities <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Two Column Layout: Activities List (40%) + GetYourGuide Widget (60%) */}
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Activities List - 40% */}
                <div className="lg:col-span-2 space-y-6">
                  {content.activities.map((activity, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10"
                    >
                      <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-cyclades-turquoise" />
                        {activity.title}
                      </h3>
                      <ul className="space-y-2">
                        {activity.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-white/70 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                {/* GetYourGuide Widget - 60% */}
                <div className="lg:col-span-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 h-full"
                  >
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-cyclades-turquoise" />
                      Book Tours & Activities
                    </h3>
                    <p className="text-gray-600 dark:text-white/60 text-sm mb-4">
                      Discover top-rated tours and experiences in {island.name} from verified providers.
                    </p>
                    <div className="min-h-[400px] bg-white dark:bg-dark-card rounded-xl overflow-hidden">
                      <GetYourGuideWidget
                        locationId={GYG_LOCATIONS.CYCLADES}
                        numberOfItems={3}
                        columns={1}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* DINING SECTION */}
        <section id="dining" className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Food & Wine
              </h2>
              <p className="text-gray-600 dark:text-white/60 mb-10 max-w-2xl">
                Savor the authentic flavors of {island.name}'s cuisine and world-renowned wines.
              </p>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Dining Cards */}
                <div className="space-y-6">
                  {content.dining.map((d, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/10"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-amber-100 dark:bg-amber-500/20 rounded-2xl flex items-center justify-center shrink-0">
                          <Utensils className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{d.name}</h3>
                          <p className="text-gray-600 dark:text-white/60 text-sm mb-4">{d.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {d.recommendations.map((r, i) => (
                              <span key={i} className="text-xs px-3 py-1.5 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 rounded-full flex items-center gap-1">
                                <Heart className="w-3 h-3" /> {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Wine & Winery Image */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative rounded-2xl overflow-hidden h-[400px] lg:h-auto"
                >
                  <img
                    src={getIslandImagePath(islandId, 'winery.jpg')}
                    alt={`${island.name} winery`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `/images/islands/${islandId}.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                    <div className="text-white">
                      <h4 className="text-2xl font-bold mb-2">Local Wine & Cuisine</h4>
                      <p className="text-white/80 mb-4">Discover {island.name}'s unique flavors and local culinary traditions.</p>
                      <Link
                        to="/activities"
                        className="inline-flex items-center gap-2 text-white bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                      >
                        Book a Food Tour <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TRAVEL INFO SECTION */}
        <section id="travel-info" className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">
                Travel Information
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Getting There */}
                <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-cyan-600 dark:text-cyclades-turquoise" />
                    Getting There
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3 text-gray-600 dark:text-white/70">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Direct flights from Athens (45 min) and major European cities</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-600 dark:text-white/70">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Ferry from Piraeus (5-8 hours) or Rafina</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-600 dark:text-white/70">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>High-speed catamarans available in summer</span>
                    </li>
                  </ul>
                  <div className="flex gap-2 mt-4">
                    <Link to="/flights" className="flex-1 text-center py-2 bg-cyclades-turquoise hover:bg-cyclades-turquoise/90 text-dark-bg rounded-lg text-sm font-semibold transition-colors">
                      Flights
                    </Link>
                    <Link to="/ferry-tickets" className="flex-1 text-center py-2 bg-cyclades-turquoise hover:bg-cyclades-turquoise/90 text-dark-bg rounded-lg text-sm font-semibold transition-colors">
                      Ferries
                    </Link>
                  </div>
                </div>

                {/* Getting Around */}
                <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Car className="w-5 h-5 text-cyan-600 dark:text-cyclades-turquoise" />
                    Getting Around
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3 text-gray-600 dark:text-white/70">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Rent a car or ATV for flexibility</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-600 dark:text-white/70">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Public buses connect main villages</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-600 dark:text-white/70">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Taxis available but limited</span>
                    </li>
                  </ul>
                  <Link to="/rent-a-car" className="block mt-4 text-center py-2 bg-cyclades-turquoise hover:bg-cyclades-turquoise/90 text-dark-bg rounded-lg text-sm font-semibold transition-colors">
                    Rent a Car
                  </Link>
                </div>

                {/* Useful Info */}
                <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-cyan-600 dark:text-cyclades-turquoise" />
                    Useful Information
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center justify-between text-gray-600 dark:text-white/70">
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Time Zone</span>
                      <span className="font-medium text-gray-900 dark:text-white">GMT+2/+3</span>
                    </li>
                    <li className="flex items-center justify-between text-gray-600 dark:text-white/70">
                      <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> Emergency</span>
                      <span className="font-medium text-gray-900 dark:text-white">112</span>
                    </li>
                    <li className="flex items-center justify-between text-gray-600 dark:text-white/70">
                      <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> Visa</span>
                      <span className="font-medium text-gray-900 dark:text-white">Schengen</span>
                    </li>
                  </ul>
                  <Link to="/help" className="block mt-4 text-center py-2 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    Help & Support
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <FAQSection
          faqs={islandFaqs}
          title={`${island.name} Travel FAQs`}
          subtitle={`Common questions about visiting ${island.name} answered by local experts`}
        />

        {/* Related Links for Internal SEO */}
        <RelatedLinks
          pageType="guide"
          islandName={island.name}
          variant="cards"
          title="Plan Your Trip"
        />

        {/* FINAL CTA */}
        <section className="py-20 bg-gray-900 dark:bg-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #38bdf8 1px, transparent 0)', backgroundSize: '40px 40px' }} />

          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-12 h-12 text-cyclades-turquoise mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Ready to Visit {island.name}?
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Start planning your dream vacation today. Find the best hotels, book ferries, and discover unforgettable experiences.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/hotels"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-cyclades-turquoise text-gray-900 rounded-xl font-semibold hover:bg-cyclades-turquoise/90 transition-all shadow-lg"
                >
                  <Hotel className="w-5 h-5" />
                  Find Hotels
                </Link>
                <Link
                  to="/trip-planner"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all"
                >
                  <Map className="w-5 h-5" />
                  Plan My Trip
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IslandGuideTemplateNew;
