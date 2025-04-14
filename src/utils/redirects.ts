/**
 * Redirects configuration for the Greece Cyclades website
 * This file defines redirects for pages that are not implemented or have been moved
 */

export interface Redirect {
  from: string;
  to: string;
  permanent: boolean; // true for 301 (permanent), false for 302 (temporary)
}

/**
 * List of redirects to be applied across the site
 * - Use permanent: true for content that has been permanently moved
 * - Use permanent: false for temporary redirects or not-yet-implemented pages
 */
const redirects: Redirect[] = [
  // Main service pages that aren't implemented yet
  { from: '/hotels', to: '/', permanent: false },
  { from: '/blog', to: '/', permanent: false },
  { from: '/guides', to: '/islands', permanent: false },
  { from: '/help', to: '/contact', permanent: false },
  { from: '/transfers', to: '/', permanent: false },
  { from: '/ferry-tickets/tracking', to: '/ferry-tickets', permanent: false },
  { from: '/culinary', to: '/', permanent: false },
  
  // Island pages redirects - only keep the top 5 islands implemented
  // Redirect all other island pages to the main islands page
  { from: '/islands/ios', to: '/islands', permanent: false },
  { from: '/islands/sifnos', to: '/islands', permanent: false },
  { from: '/islands/amorgos', to: '/islands', permanent: false },
  { from: '/islands/syros', to: '/islands', permanent: false },
  { from: '/islands/tinos', to: '/islands', permanent: false },
  { from: '/islands/serifos', to: '/islands', permanent: false },
  { from: '/islands/andros', to: '/islands', permanent: false },
  { from: '/islands/kea', to: '/islands', permanent: false },
  { from: '/islands/sikinos', to: '/islands', permanent: false },
  { from: '/islands/kimolos', to: '/islands', permanent: false },
  { from: '/islands/kythnos', to: '/islands', permanent: false },
  { from: '/islands/folegandros', to: '/islands', permanent: false },
  { from: '/islands/anafi', to: '/islands', permanent: false },
  { from: '/islands/koufonisia', to: '/islands', permanent: false },
  { from: '/islands/antiparos', to: '/islands', permanent: false },
  { from: '/islands/donousa', to: '/islands', permanent: false },
  { from: '/islands/iraklia', to: '/islands', permanent: false },
  { from: '/islands/schinoussa', to: '/islands', permanent: false },
  { from: '/islands/thirasia', to: '/islands', permanent: false },
  
  // Guide pages redirects - redirect to corresponding island page when available
  { from: '/guides/santorini', to: '/islands/santorini', permanent: false },
  { from: '/guides/mykonos', to: '/islands/mykonos', permanent: false },
  { from: '/guides/naxos', to: '/islands/naxos', permanent: false },
  { from: '/guides/paros', to: '/islands/paros', permanent: false },
  { from: '/guides/milos', to: '/islands/milos', permanent: false },
  
  // Other guide pages redirect to main islands page
  { from: '/guides/ios', to: '/islands', permanent: false },
  { from: '/guides/sifnos', to: '/islands', permanent: false },
  { from: '/guides/amorgos', to: '/islands', permanent: false },
  { from: '/guides/syros', to: '/islands', permanent: false },
  { from: '/guides/tinos', to: '/islands', permanent: false },
  { from: '/guides/serifos', to: '/islands', permanent: false },
  { from: '/guides/andros', to: '/islands', permanent: false },
  { from: '/guides/kea', to: '/islands', permanent: false },
  { from: '/guides/sikinos', to: '/islands', permanent: false },
  { from: '/guides/kimolos', to: '/islands', permanent: false },
  { from: '/guides/kythnos', to: '/islands', permanent: false },
  { from: '/guides/folegandros', to: '/islands', permanent: false },
  { from: '/guides/anafi', to: '/islands', permanent: false },
  { from: '/guides/koufonisia', to: '/islands', permanent: false },
  
  // Legacy URLs or potential typos
  { from: '/ferries', to: '/ferry-tickets', permanent: true },
  { from: '/car-rentals', to: '/rent-a-car', permanent: true },
  { from: '/car-rental', to: '/rent-a-car', permanent: true },
];

export default redirects;
