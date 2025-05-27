import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import redirects from '../utils/redirects';

export default function RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    const redirect = redirects.find(r => r.from === currentPath);
    
    if (redirect) {
      navigate(redirect.to, { replace: true });
    }
  }, [location, navigate]);

  return null;
} 