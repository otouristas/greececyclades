import React from 'react';
import { Link } from 'react-router-dom';
import { useHotelStore } from '../store/hotelStore';
import { useIslandStore } from '../store/islandStore';
import { getHotelSlug, getIslandSlug } from '../utils/slugs';
import { generateSitemapSEO } from '../utils/seo';
import SEO from '../components/SEO';

interface SitemapSection {
  title: string;
  links: Array<{
    title: string;
    path: string;
  }>;
}

const sitemapData: SitemapSection[] = [
  {
    title: "Main Pages",
    links: [
      { title: "Home", path: "/" },
      { title: "About Us", path: "/about" },
      { title: "Contact", path: "/contact" },
    ]
  },
  {
    title: "Travel Services",
    links: [
      { title: "Activities", path: "/activities" },
      { title: "Hotels", path: "/hotels" },
      { title: "Ferry Tickets", path: "/ferry-tickets" },
      { title: "Flight Tickets", path: "/flights" },
      { title: "Car Rentals", path: "/rent-a-car" },
      { title: "Airport Transfers", path: "/transfers" },
    ]
  },
  {
    title: "Planning Tools",
    links: [
      { title: "Trip Planner", path: "/trip-planner" },
      { title: "Weather Guide", path: "/weather" },
      { title: "Budget Calculator", path: "/budget-calculator" },
      { title: "Greek Phrases", path: "/greek-phrases" },
      { title: "Ferry Guide", path: "/ferry-guide" },
      { title: "Resources", path: "/resources" },
      { title: "Culinary Experiences", path: "/culinary" },
    ]
  },
  {
    title: "Island Guides",
    links: [
      { title: "All Islands", path: "/islands" },
      { title: "Island Guides", path: "/guides" },
      { title: "Santorini Guide", path: "/guides/santorini" },
      { title: "Mykonos Guide", path: "/guides/mykonos" },
      { title: "Naxos Guide", path: "/guides/naxos" },
      { title: "Paros Guide", path: "/guides/paros" },
    ]
  },
  {
    title: "Content & Blog",
    links: [
      { title: "Travel Blog", path: "/blog" },
    ]
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", path: "/privacy" },
      { title: "Terms of Service", path: "/terms" },
      { title: "Sitemap", path: "/sitemap" },
    ]
  }
];

const Sitemap: React.FC = () => {
  const { hotels } = useHotelStore();
  const { islands } = useIslandStore();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <SEO {...generateSitemapSEO()} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sitemap</h1>
          <p className="text-lg text-gray-600">
            Find your way around Greece Cyclades
          </p>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapData.map((section) => (
            <div key={section.title} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* All Islands Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              All Islands
            </h2>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {islands.map(island => (
                <li key={island.id}>
                  <Link 
                    to={`/islands/${getIslandSlug(island.name)}`} 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {island.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Hotels Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Featured Hotels
            </h2>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {hotels.slice(0, 20).map(hotel => (
                <li key={hotel.id}>
                  <Link 
                    to={`/hotels/${getHotelSlug(hotel.name, hotel.location.island)}`} 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {hotel.name} - {hotel.location.island}
                  </Link>
                </li>
              ))}
              {hotels.length > 20 && (
                <li className="pt-2">
                  <Link 
                    to="/hotels" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All Hotels →
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;