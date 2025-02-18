import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#1B3358]">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />
      </div>

      {/* Main content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Windmill */}
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-[url('/images/windmill.png')] bg-contain bg-no-repeat opacity-10" />
          {/* Church dome */}
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[url('/images/dome.png')] bg-contain bg-no-repeat opacity-10" />
        </div>

        {/* Content */}
        <div className="relative max-w-2xl text-center">
          <h1 className="font-greek text-[200px] leading-none font-bold text-white opacity-20">404</h1>
          <div className="relative -mt-20 bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="px-8 pt-8 pb-10">
              <div className="mx-auto w-24 h-1 bg-blue-500 mb-8" />
              <h2 className="text-3xl font-greek font-medium text-gray-900 mb-4">
                Page Not Found
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Like a lost traveler in the Cyclades, this page seems to have drifted away. 
                Let's guide you back to familiar shores.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#1B3358] rounded-md hover:bg-[#2B4368] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Return Home
                </Link>
                <Link
                  to="/islands"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[#1B3358] bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Explore Islands
                </Link>
              </div>
            </div>
            {/* Greek key pattern */}
            <div className="h-4 bg-[url('/images/greek-key.png')] bg-repeat-x opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
