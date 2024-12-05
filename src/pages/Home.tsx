import React from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import TopIslands from '../components/sections/TopIslands';
import FeaturedListings from '../components/sections/FeaturedListings';
import CarRentals from '../components/sections/CarRentals';
import Activities from '../components/sections/Activities';
import Partners from '../components/sections/Partners';
import SEO from '../components/SEO';
import { generateHomeSEO } from '../utils/seo';

export default function Home() {
  const seoData = generateHomeSEO();
  
  return (
    <>
      <SEO {...seoData} image="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80" />

      <div>
        <Hero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <SearchBar />
          </div>
        </div>

        <TopIslands />
        <FeaturedListings />
        <CarRentals />
        <Activities />
        <Partners />
      </div>
    </>
  );
}