import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative h-[80vh] min-h-[600px] w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30" />
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full pt-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-2xl">
            Discover the Magic of Cyclades Islands
          </h1>
          <p className="mt-6 text-xl text-white/90 max-w-xl">
            Explore pristine beaches, ancient ruins, and charming villages across the stunning Greek archipelago
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <Link 
              to="/islands"
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Start Exploring
            </Link>
            <Link
              to="/cycladestripplanner"
              className="px-8 py-3 bg-white/10 backdrop-blur-md text-white rounded-full font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              Magic Planner
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}