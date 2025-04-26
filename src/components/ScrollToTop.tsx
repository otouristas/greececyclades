import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ensure we scroll to the top of the page on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    
    // Force scroll to top for specific routes that might have issues
    if (pathname === '/trip-planner') {
      // Use setTimeout to ensure this happens after the component renders
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto'
        });
      }, 0);
    }
  }, [pathname]);

  return null;
}