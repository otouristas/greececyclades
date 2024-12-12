import React from 'react';
import { Link } from 'react-router-dom';
import { useHotelStore } from '../store/hotelStore';
import { useIslandStore } from '../store/islandStore';
import { getHotelSlug, getIslandSlug } from '../utils/slugs';
import { generateSitemapSEO } from '../utils/seo';
import SEO from '../components/SEO';

const Sitemap: React.FC = () => {
  const { hotels } = useHotelStore();
  const { islands } = useIslandStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO {...generateSitemapSEO()} />
      <h1 className="text-3xl font-bold mb-8">Sitemap</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Main Navigation</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><Link to="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li><Link to="/islands" className="text-blue-600 hover:underline">Cyclades Islands</Link></li>
            <li><Link to="/guides" className="text-blue-600 hover:underline">Travel Guides</Link></li>
            <li>
              <Link to="/activities" className="text-blue-600 hover:underline">Activities</Link>
              <ul className="list-circle pl-5 mt-2 space-y-2">
                <li><Link to="/activities" className="text-blue-600 hover:underline">All Activities</Link></li>
                <li><Link to="/culinary" className="text-blue-600 hover:underline">Culinary</Link></li>
              </ul>
            </li>
            <li><Link to="/hotels" className="text-blue-600 hover:underline">Hotels</Link></li>
            <li><Link to="/rent-a-car" className="text-blue-600 hover:underline">Rent a Car</Link></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Additional Pages</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><Link to="/blog" className="text-blue-600 hover:underline">Blog</Link></li>
            <li><Link to="/contact" className="text-blue-600 hover:underline">Contact</Link></li>
            <li><Link to="/about" className="text-blue-600 hover:underline">About Us</Link></li>
            <li><Link to="/list-property" className="text-blue-600 hover:underline">List Your Property</Link></li>
            <li><Link to="/trip-planner" className="text-blue-600 hover:underline">Trip Planner</Link></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Islands</h2>
          <ul className="list-disc pl-5 space-y-2">
            {islands.map(island => (
              <li key={island.id}>
                <Link 
                  to={`/islands/${getIslandSlug(island.name)}`} 
                  className="text-blue-600 hover:underline"
                >
                  {island.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Hotels</h2>
          <ul className="list-disc pl-5 space-y-2">
            {hotels.map(hotel => (
              <li key={hotel.id}>
                <Link 
                  to={`/hotels/${getHotelSlug(hotel.name, hotel.location.island)}`} 
                  className="text-blue-600 hover:underline"
                >
                  {hotel.name} - {hotel.location.island}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Legal</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Sitemap;