import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { getRedirect } from '../utils/redirectHandler';
import redirects from '../utils/redirects';

/**
 * Component that generates redirect routes based on the redirects configuration
 * To be included in the main Router component
 */
const RedirectRoutes: React.FC = () => {
  return (
    <Routes>
      {redirects.map((redirect) => (
        <Route 
          key={redirect.from} 
          path={redirect.from} 
          element={getRedirect(redirect.from)} 
        />
      ))}
    </Routes>
  );
};

export default RedirectRoutes;
