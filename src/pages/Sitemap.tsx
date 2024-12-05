import React from 'react';
import { Link } from 'react-router-dom';
import { useIslandStore } from '../store/islandStore';
import SEO from '../components/SEO';

export default function Sitemap() {
  const { islands } = useIslandStore();

  return (
    <>
      <SEO
        title="Sitemap - Discover Cyclades"
        description="Complete sitemap of Discover Cyclades. Find all our pages about Greek islands, hotels, activities, and travel guides."
      />

      <div className="pt-24 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Sitemap</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Main Sections */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Main Sections</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                </li>
                <li>
                  <Link to="/islands" className="text-blue-600 hover:underline">Islands</Link>
                </li>
                <li>
                  <Link to="/hotels" className="text-blue-600 hover:underline">Hotels</Link>
                </li>
                <li>
                  <Link to="/activities" className="text-blue-600 hover:underline">Activities</Link>
                </li>
                <li>
                  <Link to="/guides" className="text-blue-600 hover:underline">Travel Guides</Link>
                </li>
                <li>
                  <Link to="/rent-a-car" className="text-blue-600 hover:underline">Rent a Car</Link>
                </li>
              </ul>
            </div>

            {/* Islands */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Islands</h2>
              <ul className="space-y-2">
                {islands.map((island) => (
                  <li key={island.id}>
                    <Link 
                      to={`/islands/${island.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {island.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Links */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Additional Pages</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/list-property" className="text-blue-600 hover:underline">List Your Property</Link>
                </li>
                <li>
                  <Link to="/about" className="text-blue-600 hover:underline">About Us</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-blue-600 hover:underline">Contact</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}