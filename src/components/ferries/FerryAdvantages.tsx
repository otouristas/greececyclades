import React from 'react';
import { CheckCircle } from 'lucide-react';

interface FerryCompany {
  name: string;
  logo: string;
  website?: string;
}

interface FerryAdvantagesProps {
  className?: string;
}

const FerryAdvantages: React.FC<FerryAdvantagesProps> = ({ className }) => {
  // Ferry companies data
  const ferryCompanies: FerryCompany[] = [
    { name: 'Blue Star Ferries', logo: '/images/companies/blue-star.webp', website: 'https://www.bluestarferries.com/en/' },
    { name: 'SeaJets', logo: '/images/companies/seajets.webp', website: 'https://www.seajets.com/en/' },
    { name: 'Hellenic Seaways', logo: '/images/companies/hellenic.webp', website: 'https://www.hellenicseaways.gr/en/' },
    { name: 'Golden Star Ferries', logo: '/images/companies/golden-star.webp', website: 'https://goldenstarferries.gr/en/' },
    { name: 'Fast Ferries', logo: '/images/companies/fast-ferries.webp', website: 'https://www.fastferries.com.gr/en/' },
    { name: 'Aegean Speed Lines', logo: '/images/companies/aegean-speed.webp', website: 'https://www.aegeanspeedlines.gr/en/' }
  ];

  return (
    <div className={`${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Book with Ferryscanner?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="font-semibold text-lg">Best Price Guarantee</h3>
          </div>
          <p className="text-gray-600">Compare all ferry companies and find the best price without any hidden fees.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="font-semibold text-lg">Real-Time Availability</h3>
          </div>
          <p className="text-gray-600">Access up-to-date schedules and real-time availability for all Cyclades ferry routes.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="font-semibold text-lg">Secure Online Booking</h3>
          </div>
          <p className="text-gray-600">Book your ferry tickets safely with secure payment methods and instant confirmation.</p>
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Ferry Companies Serving the Cyclades</h3>
        <div className="flex flex-wrap gap-6 items-center justify-center md:justify-start">
          {ferryCompanies.map((company, index) => (
            <a 
              key={index} 
              href={company.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-200"
            >
              <img 
                src={company.logo} 
                alt={company.name} 
                className="h-12 w-auto object-contain" 
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FerryAdvantages;
