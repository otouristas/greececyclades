interface Redirect {
  from: string;
  to: string;
  permanent: boolean;
}

/**
 * Redirect configuration for handling legacy URLs and common misspellings
 * Each redirect should have:
 * - from: the old/incorrect URL path
 * - to: the correct URL path to redirect to
 * - permanent: true for 301 redirects, false for 302 redirects
 */
const redirects: Redirect[] = [
  // Service page redirects
  {
    from: '/vehicles',
    to: '/rent-a-car',
    permanent: true
  },
  {
    from: '/car-rentals',
    to: '/rent-a-car',
    permanent: true
  },
  {
    from: '/ferries',
    to: '/ferry-tickets',
    permanent: true
  },
  
  // Legacy privacy policy redirect
  {
    from: '/privacy-policy',
    to: '/privacy',
    permanent: true
  },
  
  // Tips pages redirect to guides
  {
    from: '/tips/santorini',
    to: '/guides/santorini#tips',
    permanent: true
  },
  {
    from: '/tips/mykonos',
    to: '/guides/mykonos#tips',
    permanent: true
  },
  {
    from: '/tips/naxos',
    to: '/guides/naxos#tips',
    permanent: true
  },
  {
    from: '/tips/paros',
    to: '/guides/paros#tips',
    permanent: true
  },
  {
    from: '/tips/andros',
    to: '/guides/andros#tips',
    permanent: true
  },
  {
    from: '/tips/sifnos',
    to: '/guides/sifnos#tips',
    permanent: true
  },
  {
    from: '/tips/ios',
    to: '/guides/ios#tips',
    permanent: true
  },
  {
    from: '/tips/milos',
    to: '/guides/milos#tips',
    permanent: true
  },
  {
    from: '/tips/serifos',
    to: '/guides/serifos#tips',
    permanent: true
  },
  {
    from: '/tips/folegandros',
    to: '/guides/folegandros#tips',
    permanent: true
  },
  {
    from: '/tips/syros',
    to: '/guides/syros#tips',
    permanent: true
  },
  {
    from: '/tips/koufonisia',
    to: '/guides/koufonisia#tips',
    permanent: true
  },
  {
    from: '/tips/amorgos',
    to: '/guides/amorgos#tips',
    permanent: true
  },
  {
    from: '/tips/antiparos',
    to: '/guides/antiparos#tips',
    permanent: true
  },
  {
    from: '/tips/kea',
    to: '/guides/kea#tips',
    permanent: true
  },
  {
    from: '/tips/kythnos',
    to: '/guides/kythnos#tips',
    permanent: true
  },
  {
    from: '/tips/sikinos',
    to: '/guides/sikinos#tips',
    permanent: true
  },
  {
    from: '/tips/anafi',
    to: '/guides/anafi#tips',
    permanent: true
  },
  {
    from: '/tips/tinos',
    to: '/guides/tinos#tips',
    permanent: true
  },
  {
    from: '/tips/kimolos',
    to: '/guides/kimolos#tips',
    permanent: true
  },
  {
    from: '/tips/schinoussa',
    to: '/guides/schinoussa#tips',
    permanent: true
  },
  {
    from: '/tips/iraklia',
    to: '/guides/iraklia#tips',
    permanent: true
  },
  {
    from: '/tips/donousa',
    to: '/guides/donousa#tips',
    permanent: true
  },
  {
    from: '/tips/thirasia',
    to: '/guides/thirasia#tips',
    permanent: true
  },
  
  // Utility page redirects to existing pages
  {
    from: '/faq',
    to: '/help',
    permanent: true
  },
  {
    from: '/map',
    to: '/islands',
    permanent: true
  },
  {
    from: '/cookie-policy',
    to: '/privacy',
    permanent: true
  },
  {
    from: '/cookies',
    to: '/privacy',
    permanent: true
  },
  {
    from: '/gdpr',
    to: '/privacy',
    permanent: true
  },
  {
    from: '/emergency-contacts',
    to: '/help',
    permanent: true
  },
  
  // Photo galleries redirect to island pages
  {
    from: '/photos/santorini',
    to: '/islands/santorini',
    permanent: true
  },
  {
    from: '/photos/mykonos',
    to: '/islands/mykonos',
    permanent: true
  },
  {
    from: '/photos/naxos',
    to: '/islands/naxos',
    permanent: true
  },
  {
    from: '/photos/paros',
    to: '/islands/paros',
    permanent: true
  },
  {
    from: '/photos/milos',
    to: '/islands/milos',
    permanent: true
  },
  
  // Business signup redirect
  {
    from: '/business/signup',
    to: '/list-property',
    permanent: true
  },
  
  // Travel insurance redirect to resources
  {
    from: '/travel-insurance',
    to: '/resources',
    permanent: true
  },
  
  // Legacy guide URLs
  {
    from: '/schinoussa-guide',
    to: '/guides/schinoussa',
    permanent: true
  },
  
  // Terms of service redirect
  {
    from: '/terms-of-service',
    to: '/terms',
    permanent: true
  },
  
  // Transportation redirect
  {
    from: '/transportation',
    to: '/transfers',
    permanent: true
  },
  
  // Business signin redirect
  {
    from: '/business/signin',
    to: '/signin',
    permanent: true
  },
  
  // Planner redirects to trip-planner
  {
    from: '/planner',
    to: '/trip-planner',
    permanent: true
  },
  
  // Travel guide redirects to guides
  {
    from: '/travel-guide/santorini',
    to: '/guides/santorini',
    permanent: true
  },
  {
    from: '/travel-guide/mykonos',
    to: '/guides/mykonos',
    permanent: true
  },
  {
    from: '/travel-guide/naxos',
    to: '/guides/naxos',
    permanent: true
  },
  {
    from: '/travel-guide/paros',
    to: '/guides/paros',
    permanent: true
  },
  {
    from: '/travel-guide/sifnos',
    to: '/guides/sifnos',
    permanent: true
  },
  {
    from: '/travel-guide/koufonisia',
    to: '/guides/koufonisia',
    permanent: true
  },
  {
    from: '/travel-guide/antiparos',
    to: '/guides/antiparos',
    permanent: true
  },
  {
    from: '/travel-guide/kimolos',
    to: '/guides/kimolos',
    permanent: true
  },
  
  // Hotel redirects to hotels page (since specific hotels were removed)
  {
    from: '/hotels/cavo-tagoo',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/belvedere-mykonos-mykonos',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/kouros-village-mykonos',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/summer-senses-resort-paros',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/verina-astra-sifnos',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/mystique-hotel-santorini',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/kavos-naxos-naxos',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/paros-agnanti-paros',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/mykonos-breeze-mykonos',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/caldera-villas-santorini',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/skinopi-lodge-milos',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/milos-hideaway-milos',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/paros-luxury-resort-paros',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/yria-boutique-hotel-paros',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/absolute-bliss-santorini',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/katikies',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/parilio-hotel',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/paros-agnanti',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/yria-boutique-hotel',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/belvedere-mykonos',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/kouros-village',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/verina-astra',
    to: '/hotels',
    permanent: true
  },
  {
    from: '/hotels/kamaroti-suites',
    to: '/hotels',
    permanent: true
  },
  
  // Activity redirects to activities page (since specific activities were removed)
  {
    from: '/activities/paros-sup',
    to: '/activities',
    permanent: true
  },
  {
    from: '/activities/kamari-diving',
    to: '/activities',
    permanent: true
  },
  {
    from: '/activities/caldera-cruise',
    to: '/activities',
    permanent: true
  },
  
  // Restaurant/nightlife redirects to culinary page
  {
    from: '/restaurants/santorini-caldera',
    to: '/culinary',
    permanent: true
  },
  {
    from: '/restaurants/kikis-tavern',
    to: '/culinary',
    permanent: true
  },
  {
    from: '/restaurants/nammos',
    to: '/culinary',
    permanent: true
  },
  {
    from: '/restaurants/naoussa',
    to: '/culinary',
    permanent: true
  },
  {
    from: '/restaurants/naxos',
    to: '/culinary',
    permanent: true
  },
  {
    from: '/nightlife/galleraki',
    to: '/culinary',
    permanent: true
  },
  {
    from: '/nightlife/caprice',
    to: '/culinary',
    permanent: true
  },
  {
    from: '/nightlife/scarpa',
    to: '/culinary',
    permanent: true
  },
  
  // Culinary specific redirects to main culinary page
  {
    from: '/culinary/naxos-potatoes',
    to: '/culinary',
    permanent: true
  },
  {
    from: '/culinary/naxos-cheese',
    to: '/culinary',
    permanent: true
  },
  {
    from: '/culinary/sifnos-cheese',
    to: '/culinary',
    permanent: true
  },
  {
    from: '/culinary/kitron',
    to: '/culinary',
    permanent: true
  },
  
  // Ferry specific routes to main ferry page
  {
    from: '/ferry-tickets/piraeus-naxos',
    to: '/ferry-tickets',
    permanent: true
  },
  {
    from: '/ferry-tickets/piraeus-mykonos',
    to: '/ferry-tickets',
    permanent: true
  },
  {
    from: '/ferry-tickets/piraeus-milos',
    to: '/ferry-tickets',
    permanent: true
  },
  {
    from: '/ferry-tickets/piraeus-paros',
    to: '/ferry-tickets',
    permanent: true
  },
  {
    from: '/ferry-tickets/piraeus-santorini',
    to: '/ferry-tickets',
    permanent: true
  },
  
  // Legacy /en/ URLs redirect to homepage
  {
    from: '/en',
    to: '/',
    permanent: true
  },
  {
    from: '/en/',
    to: '/',
    permanent: true
  },
  
  // Legacy guide/excursions/beaches URLs redirect to islands
  {
    from: '/en/guide/excursions/beaches/kleisidi_beach-anafi_cyclades',
    to: '/islands/anafi',
    permanent: true
  },
  {
    from: '/en/guide/excursions/beaches/papas_beach-ios_cyclades_aegean_islands',
    to: '/islands/ios',
    permanent: true
  },
  {
    from: '/en/guide/excursions/beaches/agios_prokopios_beach-naxos_cyclades',
    to: '/islands/naxos',
    permanent: true
  },
  
  // Trip planner redirects to touristas-ai (query params handled in App.tsx)
  // Note: This is handled by React Router in App.tsx to preserve query parameters
  
  // Ferry tickets search redirect
  {
    from: '/ferry-tickets-search',
    to: '/ferry-tickets',
    permanent: true
  },
  
  // Blog 404s redirect to blog
  {
    from: '/blog/island-hopping-guide',
    to: '/blog',
    permanent: true
  },
  {
    from: '/blog/naxos-guide',
    to: '/blog',
    permanent: true
  },
  
  // Products redirect
  {
    from: '/products/crushing',
    to: '/',
    permanent: true
  },
  {
    from: '/products/crushing/',
    to: '/',
    permanent: true
  },
  
  // Legacy guide URLs (without /guides prefix)
  {
    from: '/sifnos-guide',
    to: '/guides/sifnos',
    permanent: true
  },
  {
    from: '/folegandros-guide',
    to: '/guides/folegandros',
    permanent: true
  },
  {
    from: '/syros-guide',
    to: '/guides/syros',
    permanent: true
  },
  {
    from: '/mykonos-guide',
    to: '/guides/mykonos',
    permanent: true
  },
  {
    from: '/naxos-guide',
    to: '/guides/naxos',
    permanent: true
  },
  {
    from: '/santorini-guide',
    to: '/guides/santorini',
    permanent: true
  },
  {
    from: '/paros-guide',
    to: '/guides/paros',
    permanent: true
  },
  {
    from: '/milos-guide',
    to: '/guides/milos',
    permanent: true
  },
  {
    from: '/ios-guide',
    to: '/guides/ios',
    permanent: true
  },
  
  // Case-sensitive island redirects
  {
    from: '/islands/Paros',
    to: '/islands/paros',
    permanent: true
  },
  {
    from: '/islands/Milos',
    to: '/islands/milos',
    permanent: true
  },
  {
    from: '/islands/Naxos',
    to: '/islands/naxos',
    permanent: true
  },
  {
    from: '/islands/Ios',
    to: '/islands/ios',
    permanent: true
  },
  {
    from: '/islands/Mykonos',
    to: '/islands/mykonos',
    permanent: true
  },
  {
    from: '/islands/Santorini',
    to: '/islands/santorini',
    permanent: true
  },
  {
    from: '/islands/Syros',
    to: '/islands/syros',
    permanent: true
  },
  {
    from: '/islands/Andros',
    to: '/islands/andros',
    permanent: true
  },
  {
    from: '/islands/Sifnos',
    to: '/islands/sifnos',
    permanent: true
  },
  {
    from: '/islands/Serifos',
    to: '/islands/serifos',
    permanent: true
  },
  {
    from: '/islands/Folegandros',
    to: '/islands/folegandros',
    permanent: true
  },
  {
    from: '/islands/Amorgos',
    to: '/islands/amorgos',
    permanent: true
  },
  {
    from: '/islands/Koufonisia',
    to: '/islands/koufonisia',
    permanent: true
  },
  {
    from: '/islands/Antiparos',
    to: '/islands/antiparos',
    permanent: true
  },
  {
    from: '/islands/Kea',
    to: '/islands/kea',
    permanent: true
  },
  {
    from: '/islands/Kythnos',
    to: '/islands/kythnos',
    permanent: true
  },
  {
    from: '/islands/Sikinos',
    to: '/islands/sikinos',
    permanent: true
  },
  {
    from: '/islands/Anafi',
    to: '/islands/anafi',
    permanent: true
  },
  {
    from: '/islands/Kimolos',
    to: '/islands/kimolos',
    permanent: true
  },
  {
    from: '/islands/Schinoussa',
    to: '/islands/schinoussa',
    permanent: true
  },
  {
    from: '/islands/Iraklia',
    to: '/islands/iraklia',
    permanent: true
  },
  {
    from: '/islands/Donousa',
    to: '/islands/donousa',
    permanent: true
  },
  {
    from: '/islands/Thirasia',
    to: '/islands/thirasia',
    permanent: true
  },
  {
    from: '/islands/Tinos',
    to: '/islands/tinos',
    permanent: true
  }
];

export default redirects; 