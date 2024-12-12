import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <SEO 
        title="404 - Page Not Found | Greece Cyclades"
        description="The page you're looking for doesn't exist. But don't worry, you can find plenty of other things on our homepage."
      />
      
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Oops! Looks like you've ventured into uncharted waters. 
            Don't worry though, our homepage is just a click away.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Homepage
            </Link>
            
            <div className="flex justify-center space-x-4 text-sm text-gray-600">
              <Link to="/contact" className="hover:text-blue-600 transition-colors">
                Contact Support
              </Link>
              <span>•</span>
              <Link to="/sitemap" className="hover:text-blue-600 transition-colors">
                View Sitemap
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
