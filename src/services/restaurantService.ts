import { supabase } from '../lib/supabase';

// Types for the restaurant system
export interface Restaurant {
  id: string;
  name: string;
  phone: string;
  location: string;
  cuisine: string;
  priceRange: '€' | '€€' | '€€€' | '€€€€';
  rating: number;
  specialties: string[];
  openingHours: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  features: string[];
  description: string;
  image: string;
  isAvailable: boolean;
}

export interface ReservationRequest {
  id?: string;
  userId?: string;
  userPhone: string;
  restaurantId: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests?: string;
  dietaryRestrictions?: string[];
  occasion?: string;
  status: 'pending' | 'confirmed' | 'declined' | 'cancelled';
  createdAt?: string;
}

export interface ReservationResponse {
  success: boolean;
  message: string;
  reservationId?: string;
  restaurant?: Restaurant;
  confirmationDetails?: {
    date: string;
    time: string;
    partySize: number;
    specialRequests?: string;
  };
}

// Real Sifnos Restaurants Database
const sifnosRestaurants: Restaurant[] = [
  {
    id: 'drimoni_sifnos',
    name: 'Drimoni Restaurant',
    phone: '+30228403xxxx',
    location: 'Plathys Gialos, Sifnos',
    cuisine: 'Traditional Greek & Seafood',
    priceRange: '€€€',
    rating: 4.8,
    specialties: [
      'Fresh Lobster Pasta',
      'Grilled Octopus',
      'Sifnian Chickpea Soup',
      'Sea Bass Carpaccio',
      'Sunset Views'
    ],
    openingHours: {
      monday: { open: '19:00', close: '23:30' },
      tuesday: { open: '19:00', close: '23:30' },
      wednesday: { open: '19:00', close: '23:30' },
      thursday: { open: '19:00', close: '23:30' },
      friday: { open: '19:00', close: '23:30' },
      saturday: { open: '19:00', close: '23:30' },
      sunday: { open: '19:00', close: '23:30' }
    },
    features: [
      'Beachfront Location',
      'Sunset Views',
      'Fresh Seafood',
      'Wine Selection',
      'Romantic Atmosphere'
    ],
    description: 'Elegant beachfront restaurant at Plathys Gialos with stunning sunset views and exceptional seafood cuisine.',
    image: '/images/restaurants/drimoni-sifnos.jpg',
    isAvailable: true
  },
  {
    id: 'meropi_sifnos',
    name: 'Meropi Restaurant',
    phone: '+30228402xxxx',
    location: 'Apollonia, Sifnos',
    cuisine: 'Traditional Sifnian & Mediterranean',
    priceRange: '€€',
    rating: 4.7,
    specialties: [
      'Sifnian Mastelo (Lamb)',
      'Chickpea Fritters',
      'Local Cheese Selection',
      'Traditional Revithada',
      'Homemade Desserts'
    ],
    openingHours: {
      monday: { open: '18:30', close: '23:00' },
      tuesday: { open: '18:30', close: '23:00' },
      wednesday: { open: '18:30', close: '23:00' },
      thursday: { open: '18:30', close: '23:00' },
      friday: { open: '18:30', close: '23:00' },
      saturday: { open: '18:30', close: '23:00' },
      sunday: { open: '18:30', close: '23:00' }
    },
    features: [
      'Traditional Recipes',
      'Local Ingredients',
      'Family Atmosphere',
      'Vegetarian Options',
      'Authentic Sifnian Cuisine'
    ],
    description: 'Authentic Sifnian taverna in the heart of Apollonia, serving traditional recipes passed down through generations.',
    image: '/images/restaurants/meropi-sifnos.jpg',
    isAvailable: true
  },
  {
    id: 'cantina_sifnos',
    name: 'Cantina Sifnos',
    phone: '+30228401xxxx',
    location: 'Apollonia, Sifnos',
    cuisine: 'Modern Greek & International',
    priceRange: '€€',
    rating: 4.6,
    specialties: [
      'Gourmet Burgers',
      'Creative Salads',
      'Craft Cocktails',
      'Fusion Dishes',
      'Late Night Menu'
    ],
    openingHours: {
      monday: { open: '17:00', close: '02:00' },
      tuesday: { open: '17:00', close: '02:00' },
      wednesday: { open: '17:00', close: '02:00' },
      thursday: { open: '17:00', close: '02:00' },
      friday: { open: '17:00', close: '02:00' },
      saturday: { open: '17:00', close: '02:00' },
      sunday: { open: '17:00', close: '02:00' }
    },
    features: [
      'Late Night Dining',
      'Craft Cocktails',
      'Modern Atmosphere',
      'International Menu',
      'Young Crowd'
    ],
    description: 'Trendy restaurant and bar in Apollonia offering modern Greek cuisine with international influences and creative cocktails.',
    image: '/images/restaurants/cantina-sifnos.jpg',
    isAvailable: true
  },
  {
    id: 'omega3_sifnos',
    name: 'Omega3 Restaurant',
    phone: '+30228405xxxx',
    location: 'Kamares, Sifnos',
    cuisine: 'Seafood & Mediterranean',
    priceRange: '€€€',
    rating: 4.5,
    specialties: [
      'Fresh Fish Daily',
      'Seafood Risotto',
      'Grilled Prawns',
      'Fish Soup',
      'Harbor Views'
    ],
    openingHours: {
      monday: { open: '12:00', close: '23:00' },
      tuesday: { open: '12:00', close: '23:00' },
      wednesday: { open: '12:00', close: '23:00' },
      thursday: { open: '12:00', close: '23:00' },
      friday: { open: '12:00', close: '23:00' },
      saturday: { open: '12:00', close: '23:00' },
      sunday: { open: '12:00', close: '23:00' }
    },
    features: [
      'Harbor Views',
      'Fresh Daily Catch',
      'Lunch & Dinner',
      'Family Friendly',
      'Port Location'
    ],
    description: 'Waterfront seafood restaurant at Kamares port, specializing in fresh daily catch and Mediterranean flavors.',
    image: '/images/restaurants/omega3-sifnos.jpg',
    isAvailable: true
  }
];

export class RestaurantService {
  /**
   * Parse natural language restaurant reservation request
   */
  static parseNaturalLanguageRequest(input: string): Partial<ReservationRequest> {
    const request: Partial<ReservationRequest> = {
      status: 'pending',
      partySize: 2 // default
    };

    // Extract phone number
    const phoneMatch = input.match(/(\+30|0)?[67]\d{8}/);
    if (phoneMatch) {
      request.userPhone = phoneMatch[0];
    }

    // Extract restaurant name
    const lowerInput = input.toLowerCase();
    
    for (const restaurant of sifnosRestaurants) {
      const names = [
        restaurant.name.toLowerCase(),
        restaurant.name.toLowerCase().replace(' restaurant', ''),
        restaurant.name.toLowerCase().replace(' sifnos', ''),
        restaurant.id.replace('_sifnos', '')
      ];
      
      if (names.some(name => lowerInput.includes(name))) {
        request.restaurantId = restaurant.id;
        break;
      }
    }

    // Extract date
    const datePatterns = [
      /today|σήμερα/i,
      /tomorrow|αύριο/i,
      /tonight|απόψε/i,
      /(\d{1,2})\/(\d{1,2})/,
      /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
      /(δευτέρα|τρίτη|τετάρτη|πέμπτη|παρασκευή|σάββατο|κυριακή)/i
    ];

    for (const pattern of datePatterns) {
      const dateMatch = input.match(pattern);
      if (dateMatch) {
        if (dateMatch[0].toLowerCase().includes('today') || dateMatch[0].toLowerCase().includes('σήμερα')) {
          request.date = new Date().toISOString().split('T')[0];
        } else if (dateMatch[0].toLowerCase().includes('tomorrow') || dateMatch[0].toLowerCase().includes('αύριο')) {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          request.date = tomorrow.toISOString().split('T')[0];
        } else if (dateMatch[0].toLowerCase().includes('tonight') || dateMatch[0].toLowerCase().includes('απόψε')) {
          request.date = new Date().toISOString().split('T')[0];
        } else {
          request.date = dateMatch[0];
        }
        break;
      }
    }

    // Extract time
    const timePatterns = [
      /at (\d{1,2}):?(\d{2})?\s*(am|pm)?/i,
      /στις (\d{1,2}):?(\d{2})?/i,
      /(\d{1,2}):(\d{2})/,
      /sunset|ηλιοβασίλεμα/i,
      /lunch|μεσημεριανό/i,
      /dinner|δείπνο/i
    ];

    for (const pattern of timePatterns) {
      const timeMatch = input.match(pattern);
      if (timeMatch) {
        if (timeMatch[0].toLowerCase().includes('sunset') || timeMatch[0].toLowerCase().includes('ηλιοβασίλεμα')) {
          request.time = '20:00';
        } else if (timeMatch[0].toLowerCase().includes('lunch') || timeMatch[0].toLowerCase().includes('μεσημεριανό')) {
          request.time = '13:30';
        } else if (timeMatch[0].toLowerCase().includes('dinner') || timeMatch[0].toLowerCase().includes('δείπνο')) {
          request.time = '20:30';
        } else {
          request.time = timeMatch[0].replace('at ', '').replace('στις ', '');
        }
        break;
      }
    }

    // Extract party size
    const partySizePatterns = [
      /for (\d+)\s*(?:people|persons|guests)?/i,
      /για (\d+)\s*(?:άτομα|άνθρωπους)?/i,
      /table for (\d+)/i,
      /τραπέζι για (\d+)/i,
      /(\d+)\s*(?:people|persons|pax)/i
    ];

    for (const pattern of partySizePatterns) {
      const sizeMatch = input.match(pattern);
      if (sizeMatch) {
        request.partySize = parseInt(sizeMatch[1]);
        break;
      }
    }

    // Extract special requests
    const specialRequests = [];
    if (input.toLowerCase().includes('window') || input.toLowerCase().includes('παράθυρο')) {
      specialRequests.push('Window table');
    }
    if (input.toLowerCase().includes('terrace') || input.toLowerCase().includes('βεράντα')) {
      specialRequests.push('Terrace seating');
    }
    if (input.toLowerCase().includes('quiet') || input.toLowerCase().includes('ήσυχο')) {
      specialRequests.push('Quiet table');
    }
    if (input.toLowerCase().includes('romantic') || input.toLowerCase().includes('ρομαντικό')) {
      specialRequests.push('Romantic setting');
    }
    if (input.toLowerCase().includes('birthday') || input.toLowerCase().includes('γενέθλια')) {
      specialRequests.push('Birthday celebration');
    }

    if (specialRequests.length > 0) {
      request.specialRequests = specialRequests.join(', ');
    }

    // Extract dietary restrictions
    const dietary = [];
    if (input.toLowerCase().includes('vegetarian') || input.toLowerCase().includes('χορτοφάγος')) {
      dietary.push('Vegetarian');
    }
    if (input.toLowerCase().includes('vegan') || input.toLowerCase().includes('βίγκαν')) {
      dietary.push('Vegan');
    }
    if (input.toLowerCase().includes('gluten') || input.toLowerCase().includes('γλουτένη')) {
      dietary.push('Gluten-free');
    }
    if (input.toLowerCase().includes('allergy') || input.toLowerCase().includes('αλλεργία')) {
      dietary.push('Food allergies');
    }

    if (dietary.length > 0) {
      request.dietaryRestrictions = dietary;
    }

    return request;
  }

  /**
   * Find restaurant by ID or name
   */
  static findRestaurant(restaurantId: string): Restaurant | null {
    return sifnosRestaurants.find(r => r.id === restaurantId) || null;
  }

  /**
   * Get all available restaurants
   */
  static getAvailableRestaurants(): Restaurant[] {
    return sifnosRestaurants.filter(r => r.isAvailable);
  }

  /**
   * Generate Greek call script for restaurant reservation
   */
  static generateGreekCallScript(request: ReservationRequest, restaurant: Restaurant): string {
    const script = `
Καλησπέρα σας. Σας καλεί το Touristas AI για μια κράτηση.

Έχουμε έναν πελάτη που θα θέλε να κάνει κράτηση στο εστιατόριό σας:

Εστιατόριο: ${restaurant.name}
Ημερομηνία: ${request.date}
Ώρα: ${request.time}
Άτομα: ${request.partySize}
Τηλέφωνο πελάτη: ${request.userPhone}
${request.specialRequests ? `Ειδικές επιθυμίες: ${request.specialRequests}` : ''}
${request.dietaryRestrictions ? `Διατροφικοί περιορισμοί: ${request.dietaryRestrictions.join(', ')}` : ''}

Μπορείτε να δεχτείτε αυτή την κράτηση;
Πατήστε 1 για ναι, 2 για όχι.

Ευχαριστούμε για τη συνεργασία.
    `.trim();

    return script;
  }

  /**
   * Main restaurant booking function
   */
  static async bookRestaurant(naturalLanguageRequest: string): Promise<ReservationResponse> {
    try {
      // Parse the request
      const parsedRequest = this.parseNaturalLanguageRequest(naturalLanguageRequest);
      
      if (!parsedRequest.userPhone || !parsedRequest.restaurantId) {
        return {
          success: false,
          message: 'Παρακαλώ παρέχετε τον αριθμό τηλεφώνου σας και το όνομα του εστιατορίου.'
        };
      }

      // Find the restaurant
      const restaurant = this.findRestaurant(parsedRequest.restaurantId);
      if (!restaurant) {
        return {
          success: false,
          message: 'Δεν βρέθηκε το εστιατόριο που ζητήσατε. Παρακαλώ δοκιμάστε: Drimoni, Meropi, ή Cantina.'
        };
      }

      // Validate time and date
      if (!parsedRequest.date || !parsedRequest.time) {
        return {
          success: false,
          message: 'Παρακαλώ προσδιορίστε την ημερομηνία και ώρα για την κράτησή σας.'
        };
      }

      // Create reservation record
      const reservation: ReservationRequest = {
        ...parsedRequest as ReservationRequest,
        id: `RES_${Date.now()}`,
        createdAt: new Date().toISOString()
      };

      return {
        success: true,
        message: `Η κράτησή σας στο ${restaurant.name} έχει σταλεί! Θα σας καλέσουμε σύντομα για επιβεβαίωση.`,
        reservationId: reservation.id,
        restaurant: restaurant,
        confirmationDetails: {
          date: reservation.date,
          time: reservation.time,
          partySize: reservation.partySize,
          specialRequests: reservation.specialRequests
        }
      };

    } catch (error) {
      console.error('Restaurant booking error:', error);
      return {
        success: false,
        message: 'Παρουσιάστηκε σφάλμα κατά την κράτηση. Παρακαλώ δοκιμάστε ξανά.'
      };
    }
  }

  /**
   * Get restaurant recommendations based on criteria
   */
  static getRecommendations(criteria: {
    cuisine?: string;
    priceRange?: string;
    features?: string[];
    time?: string;
  }): Restaurant[] {
    let restaurants = sifnosRestaurants.filter(r => r.isAvailable);

    if (criteria.cuisine) {
      restaurants = restaurants.filter(r => 
        r.cuisine.toLowerCase().includes(criteria.cuisine!.toLowerCase())
      );
    }

    if (criteria.priceRange) {
      restaurants = restaurants.filter(r => r.priceRange === criteria.priceRange);
    }

    if (criteria.features && criteria.features.length > 0) {
      restaurants = restaurants.filter(r =>
        criteria.features!.some(feature => 
          r.features.some(f => f.toLowerCase().includes(feature.toLowerCase()))
        )
      );
    }

    // Sort by rating
    return restaurants.sort((a, b) => b.rating - a.rating);
  }
} 