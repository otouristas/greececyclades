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

  // Hotel pages
  { from: '/hotels/kavos-naxos', to: '/', permanent: true },
  { from: '/hotels/andronis-luxury-suites-santorini', to: '/', permanent: true },
  { from: '/hotels/naxian-collection-naxos', to: '/', permanent: true },
  { from: '/hotels/niriedes-hotel-sifnos', to: '/', permanent: true },
  { from: '/hotels/kamaroti-suites-sifnos', to: '/', permanent: true },
  { from: '/hotels/parilio-hotel-paros', to: '/', permanent: true },
  { from: '/hotels/naxos-resort-naxos', to: '/', permanent: true },
  { from: '/hotels/beach-house-antiparos', to: '/', permanent: true },
  { from: '/hotels/grace-santorini-santorini', to: '/', permanent: true },
  { from: '/hotels/myconian-villa-collection-mykonos', to: '/', permanent: true },
  { from: '/hotels/nissaki-beach-hotel-naxos', to: '/', permanent: true },
  { from: '/hotels/grace-santorini', to: '/', permanent: true },
  { from: '/hotels/naxian-collection', to: '/', permanent: true },
  { from: '/hotels/absolute-bliss', to: '/', permanent: true },
  { from: '/hotels/naxos-resort', to: '/', permanent: true },
  { from: '/hotels/niriedes-hotel', to: '/', permanent: true },
  { from: '/hotels/beach-house', to: '/', permanent: true },

  // Hotel location filters
  { from: '/hotels?location=Parasporos', to: '/', permanent: true },
  { from: '/hotels?location=St. George Beach', to: '/', permanent: true },
  { from: '/hotels?location=Imerovigli', to: '/', permanent: true },
  { from: '/hotels?location=Agios Ioannis', to: '/', permanent: true },
  { from: '/hotels?location=Mykonos Town', to: '/', permanent: true },
  { from: '/hotels?location=Parikia', to: '/', permanent: true },
  { from: '/hotels?location=Stelida', to: '/', permanent: true },
  { from: '/hotels?location=Naoussa', to: '/', permanent: true },
  { from: '/hotels?location=Skinopi', to: '/', permanent: true },
  { from: '/hotels?location=Punda Beach', to: '/', permanent: true },
  { from: '/hotels?location=Soros Beach', to: '/', permanent: true },
  { from: '/hotels?location=Pollonia', to: '/', permanent: true },
  { from: '/hotels?location=Agios Prokopios', to: '/', permanent: true },
  { from: '/hotels?location=Agios Georgios', to: '/', permanent: true },
  { from: '/hotels?location=Kamares', to: '/', permanent: true },
  { from: '/hotels?location=Poulati', to: '/', permanent: true },
  { from: '/hotels?location=Platys Gialos', to: '/', permanent: true },

  // Activity pages
  { from: '/activities/paros-diving', to: '/', permanent: true },
  { from: '/activities/kitron-tour', to: '/', permanent: true },
  { from: '/activities/oia-sunset', to: '/', permanent: true },
  { from: '/activities/fira-cable-car', to: '/', permanent: true },
  { from: '/activities/naxos-hiking', to: '/', permanent: true },
  { from: '/activities/zeus-cave-hike', to: '/', permanent: true },
  { from: '/activities/ekatontapiliani', to: '/', permanent: true },
  { from: '/activities/paros-sailing', to: '/', permanent: true },
  { from: '/activities/jackie-o-beach', to: '/', permanent: true },
  { from: '/activities/antiparos-hiking', to: '/', permanent: true },
  { from: '/activities/lefkes-hiking', to: '/', permanent: true },
  { from: '/activities/antiparos-water-sports', to: '/', permanent: true },
  { from: '/activities/mykonos-beach-hopping', to: '/', permanent: true },
  { from: '/activities/delos-day-trip', to: '/', permanent: true },
  { from: '/activities/mykonos-town-tour', to: '/', permanent: true },
  { from: '/activities/antiparos-cave', to: '/', permanent: true },
  { from: '/activities/antiparos-boat-tours', to: '/', permanent: true },
  { from: '/activities/soros-beach-club', to: '/', permanent: true },
  { from: '/activities/hiking-trails', to: '/', permanent: true },
  { from: '/activities/sifnos-cooking-class', to: '/', permanent: true },
  { from: '/activities/sifnos-churches', to: '/', permanent: true },
  { from: '/activities/pottery-workshop', to: '/', permanent: true },

  // Other pages
  { from: '/en/guide/excursions/beaches/agios_prokopios_beach-naxos_cyclades', to: '/', permanent: true },
  { from: '/tips/sikinos', to: '/', permanent: true },
  { from: '/tips/thirasia', to: '/', permanent: true },
  { from: '/planner?island=thirasia', to: '/', permanent: true },
  { from: '/auth', to: '/', permanent: true }
];

export default redirects;
