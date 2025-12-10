/**
 * Touristas AI - Intent Router & Function Calling System
 * Implements the training framework from perplexity.md
 * 
 * Three-Tier Intent Detection:
 * Tier 1: Primary category (FERRIES, HOTELS, ACTIVITIES, WEATHER, etc.)
 * Tier 2: Sub-intent (SEARCH, FILTER, COMPARE, TROUBLESHOOT, ADVICE)
 * Tier 3: Context preservation for multi-turn flows
 */

import { findIslandByInput, cycladesDB } from '@/data/cycladesNormalization';

// ============================================
// TYPES & SCHEMAS
// ============================================

export type PrimaryCategory = 
  | 'FERRIES' 
  | 'HOTELS' 
  | 'ACTIVITIES' 
  | 'WEATHER' 
  | 'GUIDES' 
  | 'RENT_CAR' 
  | 'FLIGHTS'
  | 'VESSEL_TRACKING'
  | 'EMERGENCY'
  | 'GENERAL';

export type SubIntent = 
  | 'SEARCH' 
  | 'FILTER' 
  | 'COMPARE' 
  | 'TROUBLESHOOT' 
  | 'ADVICE' 
  | 'BOOKING'
  | 'INFO'
  | 'REAL_TIME_POSITION'
  | 'ETA_QUERY'
  | 'DELAY_CHECK'
  | 'PORT_STATUS';

export type APITrigger = 
  | 'Ferryhopper' 
  | 'LiteAPI' 
  | 'GetYourGuide' 
  | 'WeatherAPI' 
  | 'Perplexity'
  | 'RentacarAPI'
  | 'FlightAPI'
  | 'VesselFinder';

export interface DetectedIntent {
  primaryCategory: PrimaryCategory;
  subIntent: SubIntent;
  detectedParameters: {
    origin?: string;
    destination?: string;
    dates?: string[];
    passengers?: number;
    adults?: number;
    children?: number;
    preferences?: Record<string, any>;
    location?: string;
    checkin?: string;
    checkout?: string;
  };
  missingRequiredFields: string[];
  confidence: number;
  apiTrigger: APITrigger;
  nextAction: 'CALL_API' | 'ASK_CLARIFICATION';
  clarificationQuestion?: string;
}

export interface SessionContext {
  sessionId: string;
  createdAt: string;
  userProfile: {
    language: string;
    travelStyle: 'budget' | 'mid' | 'luxury';
    groupSize: number;
    groupComposition: 'couple' | 'family' | 'friends' | 'solo';
  };
  activeSearch: {
    type: PrimaryCategory | null;
    origin?: string;
    destination?: string;
    checkin?: string;
    checkout?: string;
    passengers?: number;
    location?: string;
  };
  conversationHistory: Array<{
    turn: number;
    userMessage: string;
    detectedIntent: PrimaryCategory;
    aiResponse: string;
    timestamp: string;
  }>;
  savedSearches: Record<string, any>;
}

// ============================================
// FUNCTION CALLING SCHEMAS (OpenAI-style)
// ============================================

export const functionSchemas = {
  search_ferries: {
    name: 'search_ferries',
    description: 'Search for ferry routes between Cycladic islands',
    parameters: {
      type: 'object',
      properties: {
        origin: {
          type: 'string',
          enum: cycladesDB.map(i => i.name),
          description: 'Departure island or port'
        },
        destination: {
          type: 'string',
          enum: cycladesDB.map(i => i.name),
          description: 'Arrival island or port'
        },
        departure_date: {
          type: 'string',
          format: 'YYYY-MM-DD',
          description: 'Travel date'
        },
        passengers: {
          type: 'integer',
          minimum: 1,
          maximum: 10,
          description: 'Number of passengers'
        },
        return_date: {
          type: 'string',
          format: 'YYYY-MM-DD',
          nullable: true,
          description: 'Return date for round trip'
        }
      },
      required: ['origin', 'destination', 'departure_date', 'passengers']
    }
  },

  search_hotels: {
    name: 'search_hotels',
    description: 'Search for hotels in Cycladic islands',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'Island or city name'
        },
        check_in: {
          type: 'string',
          format: 'YYYY-MM-DD',
          description: 'Check-in date'
        },
        check_out: {
          type: 'string',
          format: 'YYYY-MM-DD',
          description: 'Check-out date'
        },
        guests: {
          type: 'integer',
          minimum: 1,
          description: 'Number of guests'
        },
        rooms: {
          type: 'integer',
          minimum: 1,
          default: 1,
          description: 'Number of rooms'
        },
        max_price: {
          type: 'number',
          nullable: true,
          description: 'Maximum price per night in EUR'
        },
        star_rating: {
          type: 'array',
          items: { type: 'integer', minimum: 1, maximum: 5 },
          description: 'Filter by star ratings'
        },
        amenities: {
          type: 'array',
          items: { type: 'string' },
          description: 'Required amenities (pool, wifi, breakfast, etc.)'
        }
      },
      required: ['location', 'check_in', 'check_out', 'guests']
    }
  },

  search_activities: {
    name: 'search_activities',
    description: 'Search for tours and activities',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'Island or city name'
        },
        date: {
          type: 'string',
          format: 'YYYY-MM-DD',
          nullable: true,
          description: 'Activity date'
        },
        participants: {
          type: 'integer',
          minimum: 1,
          description: 'Number of participants'
        },
        category: {
          type: 'string',
          enum: ['boat', 'cruise', 'walking', 'food', 'adventure', 'museum', 'all'],
          description: 'Activity category'
        }
      },
      required: ['location']
    }
  },

  get_weather: {
    name: 'get_weather',
    description: 'Get weather forecast for a location',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'Island or port name'
        },
        date: {
          type: 'string',
          format: 'YYYY-MM-DD',
          description: 'Forecast date'
        }
      },
      required: ['location', 'date']
    }
  },

  search_car_rentals: {
    name: 'search_car_rentals',
    description: 'Search for car rentals on Cycladic islands',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'Island or pickup location'
        },
        pickup_date: {
          type: 'string',
          format: 'YYYY-MM-DD',
          description: 'Pickup date'
        },
        dropoff_date: {
          type: 'string',
          format: 'YYYY-MM-DD',
          description: 'Return date'
        },
        driver_age: {
          type: 'integer',
          minimum: 21,
          description: 'Driver age'
        },
        transmission: {
          type: 'string',
          enum: ['automatic', 'manual', 'any'],
          description: 'Transmission preference'
        },
        car_class: {
          type: 'string',
          enum: ['economy', 'compact', 'suv', 'van', 'luxury', 'any'],
          description: 'Vehicle class'
        }
      },
      required: ['location', 'pickup_date', 'dropoff_date']
    }
  },

  search_flights: {
    name: 'search_flights',
    description: 'Search for flights to/from Cyclades',
    parameters: {
      type: 'object',
      properties: {
        origin: {
          type: 'string',
          description: 'Departure airport (IATA or city)'
        },
        destination: {
          type: 'string',
          description: 'Arrival airport (IATA or city)'
        },
        date: {
          type: 'string',
          format: 'YYYY-MM-DD',
          description: 'Flight date'
        },
        passengers: {
          type: 'integer',
          minimum: 1,
          description: 'Number of passengers'
        },
        cabin_class: {
          type: 'string',
          enum: ['economy', 'business'],
          default: 'economy',
          description: 'Cabin class'
        }
      },
      required: ['origin', 'destination', 'date', 'passengers']
    }
  }
};

// ============================================
// INTENT DETECTION PATTERNS
// ============================================

const intentPatterns: Record<PrimaryCategory, RegExp[]> = {
  FERRIES: [
    /ferr(y|ies)/i,
    /boat\s*(from|to)/i,
    /sail(ing)?\s*(from|to)/i,
    /piraeus\s*(to|→)/i,
    /→.*port/i,
    /island.hop/i,
    /blue\s*star/i,
    /seajets/i,
    /highspeed/i,
    /ferry\s*ticket/i,
  ],
  HOTELS: [
    /hotel/i,
    /stay(ing)?/i,
    /accommodation/i,
    /where\s*to\s*stay/i,
    /room/i,
    /book.*stay/i,
    /villa/i,
    /resort/i,
    /airbnb/i,
    /check.?in/i,
    /night(s)?\s*(in|at)/i,
  ],
  ACTIVITIES: [
    /activit(y|ies)/i,
    /tour(s)?/i,
    /things\s*to\s*do/i,
    /sunset\s*(cruise|tour)/i,
    /catamaran/i,
    /wine\s*tast/i,
    /cook(ing)?\s*class/i,
    /snorkel/i,
    /diving/i,
    /excursion/i,
    /boat\s*tour/i,
    /kayak/i,
    /hiking/i,
  ],
  WEATHER: [
    /weather/i,
    /wind/i,
    /meltemi/i,
    /forecast/i,
    /sea\s*condition/i,
    /beaufort/i,
    /rough\s*sea/i,
    /wave/i,
    /safe\s*to\s*(sail|travel)/i,
    /storm/i,
    /rain/i,
    /temperature/i,
    /uv/i,
  ],
  RENT_CAR: [
    /rent\s*(a\s*)?car/i,
    /car\s*rental/i,
    /hire\s*(a\s*)?car/i,
    /scooter/i,
    /quad/i,
    /atv/i,
    /vehicle/i,
    /driving/i,
    /automatic\s*car/i,
  ],
  FLIGHTS: [
    /flight(s)?/i,
    /fly(ing)?/i,
    /airplane/i,
    /athen(s|a).*airport/i,
    /jtr|jmk|pas|mlo|jnx/i, // IATA codes
    /aegean/i,
    /sky\s*express/i,
    /→.*airport/i,
  ],
  GUIDES: [
    /best\s*(island|beach|place)/i,
    /compare/i,
    /recommend/i,
    /suggest/i,
    /which\s*island/i,
    /itinerary/i,
    /plan\s*(my|a)?\s*trip/i,
    /\d+\s*day(s)?/i,
    /hidden\s*gem/i,
    /nightlife/i,
    /romantic/i,
    /family\s*friendly/i,
    /budget/i,
  ],
  VESSEL_TRACKING: [
    /where\s*(is|are)\s*(my|the)?\s*(ferry|boat|ship)/i,
    /track(ing)?\s*(my|the)?\s*(ferry|boat|vessel)/i,
    /my\s*(ferry|boat)\s*location/i,
    /vessel\s*position/i,
    /imo\s*\d{7}/i,
    /current\s*location\s*of/i,
    /is\s*(my|the)\s*(ferry|boat)\s*(on\s*schedule|delayed|late)/i,
    /how\s*(much\s*)?longer\s*until/i,
    /when\s*(do|will)\s*(we|i)\s*arrive/i,
    /eta|arrival\s*time/i,
    /champions\s*jet/i,
    /blue\s*star.*where/i,
    /seajets.*location/i,
    /notify\s*me\s*(when|if)/i,
    /alert\s*me/i,
  ],
  EMERGENCY: [
    /emergency/i,
    /help/i,
    /lost/i,
    /miss(ed)?\s*(my)?\s*ferry/i,
    /cancel(led|ed)?/i,
    /overboo(k|ked)/i,
    /stuck/i,
    /broke\s*down/i,
    /pharmacy/i,
    /hospital/i,
    /police/i,
  ],
  GENERAL: [], // Fallback
};

// ============================================
// CORE INTENT DETECTION
// ============================================

export function detectIntent(
  userMessage: string, 
  sessionContext?: SessionContext
): DetectedIntent {
  const lowerMessage = userMessage.toLowerCase();
  
  // Step 1: Detect primary category
  let primaryCategory: PrimaryCategory = 'GENERAL';
  let maxMatches = 0;
  
  for (const [category, patterns] of Object.entries(intentPatterns)) {
    const matches = patterns.filter(p => p.test(userMessage)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      primaryCategory = category as PrimaryCategory;
    }
  }
  
  // Step 2: Detect sub-intent
  let subIntent: SubIntent = 'SEARCH';
  if (/compare|vs|versus|difference|better/i.test(userMessage)) subIntent = 'COMPARE';
  if (/problem|issue|help|wrong|cancel|miss/i.test(userMessage)) subIntent = 'TROUBLESHOOT';
  if (/advice|recommend|suggest|best|should\s*i/i.test(userMessage)) subIntent = 'ADVICE';
  if (/book|reserve|confirm/i.test(userMessage)) subIntent = 'BOOKING';
  if (/what\s*is|tell\s*me|explain|how\s*(do|does)/i.test(userMessage)) subIntent = 'INFO';
  if (/filter|only|under|over|max|min|star/i.test(userMessage)) subIntent = 'FILTER';
  
  // Step 3: Extract parameters
  const detectedParameters = extractParameters(userMessage, sessionContext);
  
  // Step 4: Determine missing fields
  const missingFields = getMissingFields(primaryCategory, detectedParameters);
  
  // Step 5: Determine API trigger
  const apiTrigger = getAPITrigger(primaryCategory, subIntent);
  
  // Step 6: Calculate confidence
  const confidence = maxMatches > 0 ? Math.min(0.5 + (maxMatches * 0.15), 0.98) : 0.3;
  
  // Step 7: Generate clarification question if needed
  let clarificationQuestion: string | undefined;
  if (missingFields.length > 0) {
    clarificationQuestion = generateClarificationQuestion(missingFields[0], primaryCategory);
  }
  
  return {
    primaryCategory,
    subIntent,
    detectedParameters,
    missingRequiredFields: missingFields,
    confidence,
    apiTrigger,
    nextAction: missingFields.length > 0 ? 'ASK_CLARIFICATION' : 'CALL_API',
    clarificationQuestion,
  };
}

// ============================================
// PARAMETER EXTRACTION
// ============================================

function extractParameters(
  message: string, 
  context?: SessionContext
): DetectedIntent['detectedParameters'] {
  const params: DetectedIntent['detectedParameters'] = {};
  
  // Extract islands/locations
  for (const island of cycladesDB) {
    const regex = new RegExp(`\\b(${island.name}|${island.aliases.join('|')})\\b`, 'i');
    if (regex.test(message)) {
      // Determine if origin or destination
      if (/from\s+/i.test(message) && message.toLowerCase().indexOf('from') < message.toLowerCase().indexOf(island.name.toLowerCase())) {
        params.origin = island.name;
      } else if (/to\s+/i.test(message)) {
        params.destination = island.name;
      } else if (!params.location) {
        params.location = island.name;
      }
    }
  }
  
  // Extract route pattern: X → Y or X to Y
  const routeMatch = message.match(/(\w+)\s*(?:→|->|to)\s*(\w+)/i);
  if (routeMatch) {
    const from = findIslandByInput(routeMatch[1]);
    const to = findIslandByInput(routeMatch[2]);
    if (from) params.origin = from.name;
    if (to) params.destination = to.name;
  }
  
  // Extract dates
  const datePatterns = [
    /(\d{4}-\d{2}-\d{2})/g, // YYYY-MM-DD
    /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/g, // DD/MM/YYYY
    /next\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/gi,
    /tomorrow/gi,
    /next\s+week(end)?/gi,
    /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+\d{1,2}/gi,
  ];
  
  const dates: string[] = [];
  for (const pattern of datePatterns) {
    const matches = message.match(pattern);
    if (matches) {
      dates.push(...matches);
    }
  }
  if (dates.length > 0) {
    params.dates = dates;
    // First date is usually checkin/departure
    params.checkin = dates[0];
    if (dates.length > 1) {
      params.checkout = dates[1];
    }
  }
  
  // Extract passenger/guest count
  const passengerMatch = message.match(/(\d+)\s*(adult|person|people|passenger|guest|traveler)/i);
  if (passengerMatch) {
    params.passengers = parseInt(passengerMatch[1]);
    params.adults = parseInt(passengerMatch[1]);
  }
  
  // Check for "2 of us" pattern
  const ofUsMatch = message.match(/(\d+)\s*of\s*us/i);
  if (ofUsMatch) {
    params.passengers = parseInt(ofUsMatch[1]);
  }
  
  // Extract children
  const childrenMatch = message.match(/(\d+)\s*(child|children|kid)/i);
  if (childrenMatch) {
    params.children = parseInt(childrenMatch[1]);
  }
  
  // Preserve context from session
  if (context?.activeSearch) {
    if (!params.origin && context.activeSearch.origin) {
      params.origin = context.activeSearch.origin;
    }
    if (!params.destination && context.activeSearch.destination) {
      params.destination = context.activeSearch.destination;
    }
    if (!params.location && context.activeSearch.location) {
      params.location = context.activeSearch.location;
    }
    if (!params.passengers && context.activeSearch.passengers) {
      params.passengers = context.activeSearch.passengers;
    }
  }
  
  // Handle "there" and "that place" references
  if (/\b(there|that\s*place|same\s*island)\b/i.test(message) && context?.activeSearch) {
    params.location = context.activeSearch.destination || context.activeSearch.location;
  }
  
  return params;
}

// ============================================
// MISSING FIELDS DETECTION
// ============================================

function getMissingFields(
  category: PrimaryCategory, 
  params: DetectedIntent['detectedParameters']
): string[] {
  const missing: string[] = [];
  
  switch (category) {
    case 'FERRIES':
      if (!params.origin) missing.push('origin');
      if (!params.destination) missing.push('destination');
      if (!params.dates?.length && !params.checkin) missing.push('date');
      if (!params.passengers) missing.push('passengers');
      break;
      
    case 'HOTELS':
      if (!params.location && !params.destination) missing.push('location');
      if (!params.checkin && !params.dates?.length) missing.push('checkin');
      if (!params.checkout && (!params.dates || params.dates.length < 2)) missing.push('checkout');
      if (!params.passengers && !params.adults) missing.push('guests');
      break;
      
    case 'FLIGHTS':
      if (!params.origin) missing.push('origin');
      if (!params.destination) missing.push('destination');
      if (!params.dates?.length && !params.checkin) missing.push('date');
      if (!params.passengers) missing.push('passengers');
      break;
      
    case 'ACTIVITIES':
      if (!params.location && !params.destination) missing.push('location');
      // Date and participants are optional for activities
      break;
      
    case 'WEATHER':
      if (!params.location && !params.destination) missing.push('location');
      // Date defaults to today
      break;
      
    case 'RENT_CAR':
      if (!params.location && !params.destination) missing.push('location');
      if (!params.checkin && !params.dates?.length) missing.push('pickup_date');
      if (!params.checkout && (!params.dates || params.dates.length < 2)) missing.push('dropoff_date');
      break;
  }
  
  return missing;
}

// ============================================
// API TRIGGER MAPPING
// ============================================

function getAPITrigger(category: PrimaryCategory, subIntent: SubIntent): APITrigger {
  // If it's advice/info, use Perplexity
  if (subIntent === 'ADVICE' || subIntent === 'INFO') {
    return 'Perplexity';
  }
  
  switch (category) {
    case 'FERRIES': return 'Ferryhopper';
    case 'HOTELS': return 'LiteAPI';
    case 'ACTIVITIES': return 'GetYourGuide';
    case 'WEATHER': return 'WeatherAPI';
    case 'RENT_CAR': return 'RentacarAPI';
    case 'FLIGHTS': return 'FlightAPI';
    case 'VESSEL_TRACKING': return 'VesselFinder';
    case 'GUIDES': return 'Perplexity';
    case 'EMERGENCY': return 'Perplexity';
    default: return 'Perplexity';
  }
}

// ============================================
// CLARIFICATION QUESTION GENERATOR
// ============================================

function generateClarificationQuestion(field: string, category: PrimaryCategory): string {
  const questions: Record<string, Record<string, string>> = {
    FERRIES: {
      origin: "Where are you traveling from? 🛳️",
      destination: "Which island are you heading to?",
      date: "When would you like to travel? 📅",
      passengers: "How many travelers? Just you or bringing company? 👥",
    },
    HOTELS: {
      location: "Which island are you looking to stay in? 🏝️",
      checkin: "What's your check-in date? 📅",
      checkout: "And when are you checking out?",
      guests: "How many guests will be staying?",
    },
    FLIGHTS: {
      origin: "Where are you flying from? ✈️",
      destination: "Which island are you flying to?",
      date: "When would you like to fly? 📅",
      passengers: "How many travelers?",
    },
    ACTIVITIES: {
      location: "Which island are you exploring? 🎯",
    },
    WEATHER: {
      location: "Which island's weather would you like to check? 🌤️",
    },
    RENT_CAR: {
      location: "Which island do you need a car on? 🚗",
      pickup_date: "When do you need to pick up the car?",
      dropoff_date: "And when will you return it?",
    },
  };
  
  return questions[category]?.[field] || `Could you tell me the ${field}?`;
}

// ============================================
// SESSION MANAGEMENT
// ============================================

export function createSession(): SessionContext {
  return {
    sessionId: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    userProfile: {
      language: 'en',
      travelStyle: 'mid',
      groupSize: 2,
      groupComposition: 'couple',
    },
    activeSearch: {
      type: null,
    },
    conversationHistory: [],
    savedSearches: {},
  };
}

export function updateSessionContext(
  session: SessionContext,
  userMessage: string,
  intent: DetectedIntent,
  aiResponse: string
): SessionContext {
  // Update active search with detected parameters
  session.activeSearch = {
    ...session.activeSearch,
    ...intent.detectedParameters,
    type: intent.primaryCategory, // Override type last
  };
  
  // Add to conversation history
  session.conversationHistory.push({
    turn: session.conversationHistory.length + 1,
    userMessage,
    detectedIntent: intent.primaryCategory,
    aiResponse,
    timestamp: new Date().toISOString(),
  });
  
  // Keep only last 10 turns
  if (session.conversationHistory.length > 10) {
    session.conversationHistory = session.conversationHistory.slice(-10);
  }
  
  return session;
}

// ============================================
// VALIDATION
// ============================================

export function validateParameters(
  category: PrimaryCategory,
  params: DetectedIntent['detectedParameters']
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate islands exist
  if (params.origin) {
    const island = findIslandByInput(params.origin);
    if (!island) {
      errors.push(`'${params.origin}' is not a valid Cycladic island. Did you mean Santorini, Mykonos, or Paros?`);
    }
  }
  
  if (params.destination) {
    const island = findIslandByInput(params.destination);
    if (!island) {
      errors.push(`'${params.destination}' is not a valid Cycladic island.`);
    }
  }
  
  // Origin !== Destination
  if (params.origin && params.destination && params.origin === params.destination) {
    errors.push("Origin and destination cannot be the same island.");
  }
  
  // Validate dates
  if (params.checkin) {
    const checkinDate = new Date(params.checkin);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkinDate < today) {
      errors.push("Travel date cannot be in the past.");
    }
    
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    if (checkinDate > maxDate) {
      errors.push("Travel date is too far in the future (max 365 days).");
    }
  }
  
  // Validate passengers
  if (params.passengers && (params.passengers < 1 || params.passengers > 10)) {
    errors.push(`Passengers must be between 1 and 10. You specified: ${params.passengers}`);
  }
  
  return { valid: errors.length === 0, errors };
}

// Types already exported above
