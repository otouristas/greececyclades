import { Navigate } from 'react-router-dom';
import redirects from './redirects';

/**
 * Handles redirects based on the current path
 * To be used within the React Router configuration
 * 
 * @param {string} path - The current path to check for redirects
 * @returns {JSX.Element | null} A Navigate component for redirect or null if no redirect needed
 */
export const getRedirect = (path: string): JSX.Element | null => {
  // Find a matching redirect
  const redirect = redirects.find(r => r.from === path);
  
  if (redirect) {
    return <Navigate to={redirect.to} replace={redirect.permanent} />;
  }
  
  return null;
};

/**
 * Utility function to check if a path should be redirected
 * Useful for conditional rendering or navigation guards
 * 
 * @param {string} path - The path to check
 * @returns {boolean} True if the path has a redirect, false otherwise
 */
export const shouldRedirect = (path: string): boolean => {
  return redirects.some(r => r.from === path);
};

/**
 * Get the destination for a redirected path
 * 
 * @param {string} path - The path to check
 * @returns {string | null} The destination path or null if no redirect exists
 */
export const getRedirectDestination = (path: string): string | null => {
  const redirect = redirects.find(r => r.from === path);
  return redirect ? redirect.to : null;
};

/**
 * Creates a catch-all route component that handles all redirects
 * To be used as a fallback in your router configuration
 */
export const RedirectHandler = () => {
  // Get the current path from window.location
  const currentPath = window.location.pathname;
  
  // Check if there's a redirect for this path
  const redirect = getRedirect(currentPath);
  
  // If there's a redirect, return it, otherwise return null
  return redirect || null;
};

export default RedirectHandler;
