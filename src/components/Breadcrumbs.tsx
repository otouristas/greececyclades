import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
  variant?: 'light' | 'dark';
}

export default function Breadcrumbs({ 
  items, 
  className = '', 
  showHomeIcon = true,
  variant = 'dark'
}: BreadcrumbsProps) {
  const location = useLocation();
  
  // If no items provided, generate from current path
  const breadcrumbs = items || location.pathname
    .split('/')
    .filter(Boolean)
    .map((path, index, array) => {
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      const fullPath = '/' + array.slice(0, index + 1).join('/');
      
      return {
        label,
        path: fullPath
      };
    });

  // Add home as first item if showHomeIcon is true
  const allItems = showHomeIcon 
    ? [{ label: 'Home', path: '/' }, ...breadcrumbs]
    : breadcrumbs;

  // Variants for text color based on variant prop
  const textColors = {
    light: 'text-white',
    dark: 'text-gray-600'
  };

  const activeColors = {
    light: 'text-blue-200',
    dark: 'text-blue-600'
  };

  const hoverColors = {
    light: 'hover:text-white',
    dark: 'hover:text-blue-600'
  };

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${window.location.origin}${item.path}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav 
        aria-label="Breadcrumb"
        className={`${className} flex items-center space-x-2 text-sm font-medium ${textColors[variant]}`}
      >
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;
        
        return (
          <motion.div
            key={item.path}
            className="flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {index > 0 && (
              <ChevronRight className={`mx-2 h-4 w-4 flex-shrink-0 ${textColors[variant]}`} />
            )}
            
            <div className="flex items-center">
              {index === 0 && showHomeIcon ? (
                <Home className="h-4 w-4 flex-shrink-0" />
              ) : null}
              
              {isLast ? (
                <span className={`${activeColors[variant]} ${index === 0 ? 'ml-1' : ''}`}>
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className={`${textColors[variant]} ${hoverColors[variant]} transition-colors duration-200 ${index === 0 ? 'ml-1' : ''}`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          </motion.div>
        );
      })}
    </nav>
    </>
  );
}
