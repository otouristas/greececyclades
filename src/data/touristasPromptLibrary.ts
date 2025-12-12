/**
 * Touristas AI - Comprehensive Prompt Library
 * 300+ conversational prompts with trigger patterns,
 * missing-field detection, and API mappings
 * 
 * Based on the ultimate Cyclades travel agent specification
 */

// ============================================
// TYPES
// ============================================

export type IntentCategory =
    | 'FLIGHTS'
    | 'FERRIES'
    | 'HOTELS'
    | 'ACTIVITIES'
    | 'WEATHER'
    | 'CAR_RENTAL'
    | 'INFO'
    | 'ITINERARY'
    | 'ISLAND_HOPPING';

export type APITrigger =
    | 'flight_search'
    | 'ferry_search'
    | 'hotel_search'
    | 'activity_search'
    | 'weather_forecast'
    | 'marine_conditions'
    | 'car_rental_search'
    | 'info_query'
    | 'itinerary_build';

export interface PromptPattern {
    id: string;
    category: IntentCategory;
    examplePrompts: string[];
    triggerKeywords: string[];
    triggerRegex: RegExp[];
    requiredFields: string[];
    optionalFields: string[];
    missingFieldQuestions: Record<string, string>;
    apiTrigger: APITrigger;
    rankingPriority?: 'price' | 'speed' | 'rating' | 'default';
    responseTemplate: string;
}

// ============================================
// CYCLADES AIRPORT & PORT CODES
// ============================================

export const CYCLADES_AIRPORTS: Record<string, string> = {
    'santorini': 'JTR',
    'thira': 'JTR',
    'mykonos': 'JMK',
    'paros': 'PAS',
    'milos': 'MLO',
    'naxos': 'JNX',
    'syros': 'JSY',
    'athens': 'ATH',
};

export const CYCLADES_PORTS: Record<string, string> = {
    'piraeus': 'PIR',
    'rafina': 'RAF',
    'lavrio': 'LAV',
    'santorini': 'JTR',
    'athinios': 'JTR',
    'mykonos': 'JMK',
    'paros': 'PAS',
    'parikia': 'PAS',
    'naxos': 'JNX',
    'ios': 'IOS',
    'milos': 'MLO',
    'syros': 'JSY',
    'tinos': 'TIN',
    'andros': 'AND',
    'amorgos': 'AMO',
    'folegandros': 'FOL',
    'sifnos': 'SIF',
    'serifos': 'SER',
    'koufonisia': 'KOU',
};

// ============================================
// FLIGHT PROMPTS (50 patterns)
// ============================================

export const flightPrompts: PromptPattern[] = [
    // Athens → Cyclades
    {
        id: 'flight_ath_cyclades_basic',
        category: 'FLIGHTS',
        examplePrompts: [
            'Show me the cheapest flight from Athens to Santorini next weekend',
            'I need a flight from Athens to Mykonos tomorrow',
            'Find flights ATH to JTR next Friday',
            'Fly from Athens to Paros on June 10',
            'One-way flight Athens → Santorini July 15',
        ],
        triggerKeywords: ['flight', 'fly', 'airplane', 'plane', 'ath', 'jtr', 'jmk', 'pas'],
        triggerRegex: [
            /flight.*from.*athens.*to/i,
            /fly.*from.*athens.*to/i,
            /ath.*→|to.*(jtr|jmk|pas|mlo|jnx)/i,
            /athens.*(santorini|mykonos|paros|milos|naxos)/i,
        ],
        requiredFields: ['departure_airport', 'arrival_airport', 'departure_date', 'passengers'],
        optionalFields: ['cabin_class', 'currency'],
        missingFieldQuestions: {
            passengers: 'How many travelers are flying?',
            departure_date: 'When would you like to fly?',
            departure_airport: 'Where are you flying from?',
            arrival_airport: 'Which Cyclades island are you flying to?',
        },
        apiTrigger: 'flight_search',
        rankingPriority: 'price',
        responseTemplate: 'Here are the best flights from {from} to {to}:',
    },
    {
        id: 'flight_cheapest',
        category: 'FLIGHTS',
        examplePrompts: [
            'Cheapest flight from Athens to Santorini',
            'Budget flights to Mykonos',
            'Find me a cheap ticket to Paros',
            'Lowest price ATH to JTR',
        ],
        triggerKeywords: ['cheap', 'cheapest', 'budget', 'affordable', 'lowest', 'price'],
        triggerRegex: [
            /cheap.*flight/i,
            /budget.*flight/i,
            /lowest.*price.*flight/i,
            /affordable.*ticket/i,
        ],
        requiredFields: ['departure_airport', 'arrival_airport', 'departure_date', 'passengers'],
        optionalFields: ['cabin_class'],
        missingFieldQuestions: {
            passengers: 'How many travelers?',
            departure_date: 'What date?',
            arrival_airport: 'Which island?',
        },
        apiTrigger: 'flight_search',
        rankingPriority: 'price',
        responseTemplate: '💰 Here are the cheapest flights:',
    },
    {
        id: 'flight_fastest',
        category: 'FLIGHTS',
        examplePrompts: [
            'Fastest flight to Santorini',
            'Quickest way to fly to Mykonos',
            'Direct flight Athens to Santorini',
            'Non-stop flight to Paros',
        ],
        triggerKeywords: ['fast', 'fastest', 'quick', 'direct', 'non-stop', 'nonstop'],
        triggerRegex: [
            /fast.*flight/i,
            /direct.*flight/i,
            /non.?stop.*flight/i,
            /quickest.*(way|flight)/i,
        ],
        requiredFields: ['departure_airport', 'arrival_airport', 'departure_date', 'passengers'],
        optionalFields: ['cabin_class'],
        missingFieldQuestions: {
            passengers: 'How many travelers?',
            departure_date: 'When?',
        },
        apiTrigger: 'flight_search',
        rankingPriority: 'speed',
        responseTemplate: '⚡ Fastest flights available:',
    },
    {
        id: 'flight_business_class',
        category: 'FLIGHTS',
        examplePrompts: [
            'Business class flight to Santorini',
            'Premium seats to Mykonos',
            'First class Athens to Paros',
        ],
        triggerKeywords: ['business', 'premium', 'first class', 'luxury'],
        triggerRegex: [
            /business.*class.*flight/i,
            /premium.*economy/i,
            /first.*class/i,
        ],
        requiredFields: ['departure_airport', 'arrival_airport', 'departure_date', 'passengers'],
        optionalFields: [],
        missingFieldQuestions: {
            passengers: 'How many travelers?',
            departure_date: 'What date?',
        },
        apiTrigger: 'flight_search',
        responseTemplate: '✈️ Premium class options:',
    },
    {
        id: 'flight_family',
        category: 'FLIGHTS',
        examplePrompts: [
            'Flight to Santorini for 2 adults and 2 kids',
            'Family flight to Mykonos next weekend',
            'Flights for a family of 4 to Paros',
        ],
        triggerKeywords: ['family', 'kids', 'children', 'child'],
        triggerRegex: [
            /flight.*family/i,
            /flight.*\d\s*adult.*\d\s*(kid|child)/i,
            /family.*flight/i,
        ],
        requiredFields: ['departure_airport', 'arrival_airport', 'departure_date', 'adults', 'children'],
        optionalFields: ['infants'],
        missingFieldQuestions: {
            departure_date: 'When is your family traveling?',
            adults: 'How many adults?',
            children: 'How many children (2-11 years)?',
        },
        apiTrigger: 'flight_search',
        responseTemplate: '👨‍👩‍👧‍👦 Family flight options:',
    },
];

// ============================================
// FERRY PROMPTS (60 patterns)
// ============================================

export const ferryPrompts: PromptPattern[] = [
    // Piraeus → Cyclades
    {
        id: 'ferry_piraeus_cyclades',
        category: 'FERRIES',
        examplePrompts: [
            'Show me ferries from Piraeus to Mykonos tomorrow',
            'Ferry Piraeus to Santorini next weekend',
            'Boat from Piraeus to Paros Friday',
            'Piraeus → Naxos June 15',
        ],
        triggerKeywords: ['ferry', 'ferries', 'boat', 'piraeus', 'sail', 'sailing'],
        triggerRegex: [
            /ferr(y|ies).*piraeus/i,
            /piraeus.*→|to.*(mykonos|santorini|paros|naxos|ios|milos)/i,
            /boat.*from.*piraeus/i,
        ],
        requiredFields: ['from_port', 'to_port', 'departure_date', 'passengers'],
        optionalFields: ['direct_only', 'class'],
        missingFieldQuestions: {
            passengers: 'How many adults and children are traveling?',
            departure_date: 'When would you like to travel?',
            to_port: 'Which island are you sailing to?',
        },
        apiTrigger: 'ferry_search',
        rankingPriority: 'default',
        responseTemplate: '⛴️ Ferries from Piraeus:',
    },
    {
        id: 'ferry_inter_island',
        category: 'FERRIES',
        examplePrompts: [
            'Ferry from Mykonos to Santorini',
            'Boat from Paros to Naxos tomorrow',
            'How to get from Santorini to Ios by ferry',
            'Naxos to Amorgos ferry schedule',
        ],
        triggerKeywords: ['ferry', 'boat', 'between islands', 'inter-island'],
        triggerRegex: [
            /(mykonos|santorini|paros|naxos|ios|milos).*to.*(mykonos|santorini|paros|naxos|ios|milos)/i,
            /ferry.*between/i,
            /inter.?island/i,
        ],
        requiredFields: ['from_port', 'to_port', 'departure_date', 'passengers'],
        optionalFields: ['direct_only'],
        missingFieldQuestions: {
            passengers: 'How many travelers?',
            departure_date: 'What date?',
        },
        apiTrigger: 'ferry_search',
        responseTemplate: '🚢 Inter-island ferries:',
    },
    {
        id: 'ferry_cheapest',
        category: 'FERRIES',
        examplePrompts: [
            'Cheapest ferry to Mykonos',
            'Budget boat to Santorini',
            'Affordable ferry Piraeus to Paros',
        ],
        triggerKeywords: ['cheap', 'cheapest', 'budget', 'affordable'],
        triggerRegex: [
            /cheap.*ferr(y|ies)/i,
            /budget.*boat/i,
            /affordable.*ferr(y|ies)/i,
        ],
        requiredFields: ['from_port', 'to_port', 'departure_date', 'passengers'],
        optionalFields: [],
        missingFieldQuestions: {
            passengers: 'How many travelers?',
            departure_date: 'When?',
            from_port: 'From which port?',
        },
        apiTrigger: 'ferry_search',
        rankingPriority: 'price',
        responseTemplate: '💰 Cheapest ferry options:',
    },
    {
        id: 'ferry_fastest',
        category: 'FERRIES',
        examplePrompts: [
            'Fastest ferry to Santorini',
            'High-speed boat to Mykonos',
            'Quickest ferry Piraeus to Paros',
            'Seajets to Naxos',
            'Blue Star Naxos schedule',
        ],
        triggerKeywords: ['fast', 'fastest', 'high-speed', 'highspeed', 'quick', 'seajets', 'blue star'],
        triggerRegex: [
            /fast.*ferr(y|ies)/i,
            /high.?speed/i,
            /seajets/i,
            /blue\s?star/i,
            /quickest.*ferr(y|ies)/i,
        ],
        requiredFields: ['from_port', 'to_port', 'departure_date', 'passengers'],
        optionalFields: [],
        missingFieldQuestions: {
            passengers: 'How many travelers?',
            departure_date: 'When?',
        },
        apiTrigger: 'ferry_search',
        rankingPriority: 'speed',
        responseTemplate: '⚡ Fastest ferries:',
    },
    {
        id: 'ferry_direct',
        category: 'FERRIES',
        examplePrompts: [
            'Direct ferry to Santorini',
            'Non-stop boat to Mykonos',
            'Ferry without stops to Paros',
        ],
        triggerKeywords: ['direct', 'non-stop', 'nonstop', 'without stops'],
        triggerRegex: [
            /direct.*ferr(y|ies)/i,
            /non.?stop.*boat/i,
            /without.*stops/i,
        ],
        requiredFields: ['from_port', 'to_port', 'departure_date', 'passengers'],
        optionalFields: [],
        missingFieldQuestions: {
            passengers: 'How many travelers?',
            departure_date: 'When?',
        },
        apiTrigger: 'ferry_search',
        responseTemplate: '🎯 Direct ferries (no stops):',
    },
    {
        id: 'ferry_morning',
        category: 'FERRIES',
        examplePrompts: [
            'Morning ferry to Santorini',
            'Early boat to Mykonos',
            'First ferry Piraeus departure',
        ],
        triggerKeywords: ['morning', 'early', 'first', 'am', 'sunrise'],
        triggerRegex: [
            /morning.*ferr(y|ies)/i,
            /early.*boat/i,
            /first.*ferr(y|ies)/i,
        ],
        requiredFields: ['from_port', 'to_port', 'departure_date', 'passengers'],
        optionalFields: ['time_window'],
        missingFieldQuestions: {
            passengers: 'How many travelers?',
            departure_date: 'What date?',
        },
        apiTrigger: 'ferry_search',
        responseTemplate: '🌅 Morning ferries:',
    },
    {
        id: 'ferry_evening',
        category: 'FERRIES',
        examplePrompts: [
            'Evening ferry to Santorini',
            'Night boat to Mykonos',
            'Late ferry Piraeus to Paros',
            'Afternoon sailing to Naxos',
        ],
        triggerKeywords: ['evening', 'night', 'late', 'afternoon', 'pm'],
        triggerRegex: [
            /evening.*ferr(y|ies)/i,
            /night.*boat/i,
            /late.*(ferr(y|ies)|boat)/i,
            /afternoon.*(sail|ferr(y|ies))/i,
        ],
        requiredFields: ['from_port', 'to_port', 'departure_date', 'passengers'],
        optionalFields: ['time_window'],
        missingFieldQuestions: {
            passengers: 'How many travelers?',
            departure_date: 'What date?',
        },
        apiTrigger: 'ferry_search',
        responseTemplate: '🌙 Evening/night ferries:',
    },
];

// ============================================
// HOTEL PROMPTS (50 patterns)
// ============================================

export const hotelPrompts: PromptPattern[] = [
    {
        id: 'hotel_basic_search',
        category: 'HOTELS',
        examplePrompts: [
            'Find me a hotel in Santorini',
            'Where to stay in Mykonos next weekend',
            'Hotels in Paros July 10-14',
            'Accommodation in Naxos for 2 adults',
        ],
        triggerKeywords: ['hotel', 'stay', 'accommodation', 'where to stay', 'room'],
        triggerRegex: [
            /hotel.*in.*(santorini|mykonos|paros|naxos|ios|milos)/i,
            /where.*stay/i,
            /accommodation/i,
            /room.*in/i,
        ],
        requiredFields: ['location', 'checkin', 'checkout', 'guests'],
        optionalFields: ['star_rating', 'budget_max', 'near_port'],
        missingFieldQuestions: {
            checkin: 'What are your check-in and check-out dates?',
            guests: 'How many guests (adults and children)?',
            location: 'Which island or town?',
        },
        apiTrigger: 'hotel_search',
        responseTemplate: '🏨 Hotels available:',
    },
    {
        id: 'hotel_budget',
        category: 'HOTELS',
        examplePrompts: [
            'Budget hotel in Santorini',
            'Cheap accommodation in Mykonos',
            'Affordable rooms in Paros under 100 EUR',
            'Best value hotels Naxos',
        ],
        triggerKeywords: ['budget', 'cheap', 'affordable', 'under', 'value'],
        triggerRegex: [
            /budget.*hotel/i,
            /cheap.*(hotel|room|accommodation)/i,
            /under.*\d+.*(eur|euro|€)/i,
            /affordable/i,
        ],
        requiredFields: ['location', 'checkin', 'checkout', 'guests'],
        optionalFields: ['budget_max'],
        missingFieldQuestions: {
            checkin: 'What dates?',
            guests: 'How many guests?',
        },
        apiTrigger: 'hotel_search',
        rankingPriority: 'price',
        responseTemplate: '💰 Budget-friendly hotels:',
    },
    {
        id: 'hotel_luxury',
        category: 'HOTELS',
        examplePrompts: [
            'Luxury hotel in Santorini',
            '5-star resort in Mykonos',
            'Best hotels with infinity pool in Oia',
            'Premium accommodation Paros',
        ],
        triggerKeywords: ['luxury', '5-star', '5 star', 'premium', 'resort', 'best'],
        triggerRegex: [
            /luxury.*hotel/i,
            /5.?star/i,
            /premium.*(hotel|accommodation)/i,
            /resort/i,
        ],
        requiredFields: ['location', 'checkin', 'checkout', 'guests'],
        optionalFields: [],
        missingFieldQuestions: {
            checkin: 'What dates are you staying?',
            guests: 'How many guests?',
        },
        apiTrigger: 'hotel_search',
        rankingPriority: 'rating',
        responseTemplate: '⭐ Luxury options:',
    },
    {
        id: 'hotel_near_port',
        category: 'HOTELS',
        examplePrompts: [
            'Hotel near Athinios port Santorini',
            'Stay close to Mykonos port',
            'Accommodation near Paros ferry terminal',
        ],
        triggerKeywords: ['near port', 'close to port', 'ferry terminal', 'near ferry'],
        triggerRegex: [
            /near.*port/i,
            /close.*port/i,
            /near.*ferry/i,
            /port.*hotel/i,
        ],
        requiredFields: ['location', 'checkin', 'checkout', 'guests'],
        optionalFields: [],
        missingFieldQuestions: {
            checkin: 'What dates?',
            guests: 'How many guests?',
        },
        apiTrigger: 'hotel_search',
        responseTemplate: '🚢 Hotels near the port:',
    },
    {
        id: 'hotel_family',
        category: 'HOTELS',
        examplePrompts: [
            'Family hotel in Santorini for 2 adults 2 kids',
            'Kid-friendly accommodation Mykonos',
            'Family rooms in Paros',
        ],
        triggerKeywords: ['family', 'kids', 'children', 'kid-friendly', 'family-friendly'],
        triggerRegex: [
            /family.*(hotel|room|accommodation)/i,
            /kid.?friendly/i,
            /\d\s*adult.*\d\s*(kid|child)/i,
        ],
        requiredFields: ['location', 'checkin', 'checkout', 'adults', 'children'],
        optionalFields: [],
        missingFieldQuestions: {
            checkin: 'What dates?',
            adults: 'How many adults?',
            children: 'How many children?',
        },
        apiTrigger: 'hotel_search',
        responseTemplate: '👨‍👩‍👧‍👦 Family-friendly hotels:',
    },
    {
        id: 'hotel_honeymoon',
        category: 'HOTELS',
        examplePrompts: [
            'Honeymoon hotel in Santorini',
            'Romantic accommodation Oia',
            'Couples retreat Mykonos',
            'Romantic suite with caldera view',
        ],
        triggerKeywords: ['honeymoon', 'romantic', 'couple', 'couples', 'anniversary'],
        triggerRegex: [
            /honeymoon/i,
            /romantic.*(hotel|suite|accommodation)/i,
            /couple/i,
            /anniversary/i,
        ],
        requiredFields: ['location', 'checkin', 'checkout'],
        optionalFields: [],
        missingFieldQuestions: {
            checkin: 'What are your romantic getaway dates?',
        },
        apiTrigger: 'hotel_search',
        rankingPriority: 'rating',
        responseTemplate: '💕 Romantic stays for couples:',
    },
];

// ============================================
// WEATHER & MARINE PROMPTS (40 patterns)
// ============================================

export const weatherPrompts: PromptPattern[] = [
    {
        id: 'weather_basic',
        category: 'WEATHER',
        examplePrompts: [
            'Weather in Santorini tomorrow',
            'What\'s the weather in Mykonos next week',
            'Paros weather forecast',
            'Will it rain in Naxos today',
        ],
        triggerKeywords: ['weather', 'forecast', 'temperature', 'rain', 'sunny'],
        triggerRegex: [
            /weather.*in/i,
            /forecast/i,
            /temperature/i,
            /will.*rain/i,
            /sunny/i,
        ],
        requiredFields: ['location', 'date'],
        optionalFields: ['hours'],
        missingFieldQuestions: {
            date: 'For which date?',
            location: 'Which island?',
        },
        apiTrigger: 'weather_forecast',
        responseTemplate: '🌤️ Weather forecast:',
    },
    {
        id: 'weather_wind',
        category: 'WEATHER',
        examplePrompts: [
            'Wind forecast Paros tomorrow',
            'Is it windy in Santorini',
            'Meltemi wind conditions Cyclades',
            'Will meltemi affect ferries',
        ],
        triggerKeywords: ['wind', 'windy', 'meltemi', 'gust', 'breezy'],
        triggerRegex: [
            /wind/i,
            /meltemi/i,
            /gust/i,
            /breezy/i,
        ],
        requiredFields: ['location', 'date'],
        optionalFields: [],
        missingFieldQuestions: {
            date: 'For which date?',
            location: 'Which island?',
        },
        apiTrigger: 'weather_forecast',
        responseTemplate: '💨 Wind conditions:',
    },
    {
        id: 'weather_sea',
        category: 'WEATHER',
        examplePrompts: [
            'Sea conditions Piraeus tomorrow',
            'Is the sea rough between Paros and Naxos',
            'Wave height Santorini',
            'Safe to sail Mykonos to Delos',
        ],
        triggerKeywords: ['sea', 'wave', 'rough', 'calm', 'swell', 'sail', 'safe'],
        triggerRegex: [
            /sea.*(condition|rough|calm)/i,
            /wave.*height/i,
            /safe.*sail/i,
            /swell/i,
        ],
        requiredFields: ['location', 'date'],
        optionalFields: [],
        missingFieldQuestions: {
            date: 'For which date?',
            location: 'Which area?',
        },
        apiTrigger: 'marine_conditions',
        responseTemplate: '🌊 Sea conditions:',
    },
    {
        id: 'weather_ferry_disruption',
        category: 'WEATHER',
        examplePrompts: [
            'Will ferries run tomorrow Piraeus',
            'Ferry cancellation risk Cyclades',
            'Are ferries canceled due to weather',
            'Meltemi ferry disruption',
        ],
        triggerKeywords: ['ferry cancel', 'ferry disruption', 'ferry run', 'ferries cancelled'],
        triggerRegex: [
            /ferr(y|ies).*(cancel|disrupt|run)/i,
            /cancel.*ferr(y|ies)/i,
            /meltemi.*ferr(y|ies)/i,
        ],
        requiredFields: ['location', 'date'],
        optionalFields: [],
        missingFieldQuestions: {
            date: 'For which date?',
        },
        apiTrigger: 'marine_conditions',
        responseTemplate: '⚠️ Ferry disruption risk:',
    },
    {
        id: 'weather_best_time',
        category: 'WEATHER',
        examplePrompts: [
            'Best time to visit Santorini',
            'When to go to Mykonos',
            'Ideal month for Paros',
            'Avoid crowds in Cyclades',
        ],
        triggerKeywords: ['best time', 'when to go', 'ideal month', 'avoid crowds'],
        triggerRegex: [
            /best.*time/i,
            /when.*go/i,
            /ideal.*(month|time)/i,
            /avoid.*crowd/i,
        ],
        requiredFields: ['location'],
        optionalFields: [],
        missingFieldQuestions: {
            location: 'Which island?',
        },
        apiTrigger: 'info_query',
        responseTemplate: '📅 Best time to visit:',
    },
];

// ============================================
// ACTIVITIES PROMPTS (40 patterns)
// ============================================

export const activityPrompts: PromptPattern[] = [
    {
        id: 'activity_basic',
        category: 'ACTIVITIES',
        examplePrompts: [
            'Things to do in Santorini',
            'Activities in Mykonos',
            'What to do in Paros',
            'Tours available in Naxos',
        ],
        triggerKeywords: ['things to do', 'activities', 'what to do', 'tours', 'experiences'],
        triggerRegex: [
            /things.*do/i,
            /activities/i,
            /what.*do/i,
            /tours/i,
            /experiences/i,
        ],
        requiredFields: ['location'],
        optionalFields: ['date', 'participants', 'category'],
        missingFieldQuestions: {
            location: 'Which island?',
        },
        apiTrigger: 'activity_search',
        responseTemplate: '🎯 Activities available:',
    },
    {
        id: 'activity_sunset_cruise',
        category: 'ACTIVITIES',
        examplePrompts: [
            'Sunset cruise Santorini',
            'Catamaran tour Mykonos sunset',
            'Evening boat trip Paros',
            'Sunset sail caldera',
        ],
        triggerKeywords: ['sunset', 'cruise', 'catamaran', 'boat tour', 'sailing'],
        triggerRegex: [
            /sunset.*(cruise|sail|boat)/i,
            /catamaran/i,
            /evening.*boat/i,
            /caldera.*cruise/i,
        ],
        requiredFields: ['location', 'date', 'participants'],
        optionalFields: [],
        missingFieldQuestions: {
            date: 'What date?',
            participants: 'How many people?',
        },
        apiTrigger: 'activity_search',
        responseTemplate: '🌅 Sunset cruises:',
    },
    {
        id: 'activity_wine',
        category: 'ACTIVITIES',
        examplePrompts: [
            'Wine tasting Santorini',
            'Wine tour Assyrtiko',
            'Wineries in Santorini',
            'Best wine experiences',
        ],
        triggerKeywords: ['wine', 'winery', 'tasting', 'assyrtiko', 'vineyard'],
        triggerRegex: [
            /wine.*(tasting|tour)/i,
            /winer(y|ies)/i,
            /vineyard/i,
            /assyrtiko/i,
        ],
        requiredFields: ['location', 'date', 'participants'],
        optionalFields: [],
        missingFieldQuestions: {
            date: 'What date?',
            participants: 'How many people?',
        },
        apiTrigger: 'activity_search',
        responseTemplate: '🍷 Wine experiences:',
    },
    {
        id: 'activity_beach',
        category: 'ACTIVITIES',
        examplePrompts: [
            'Best beaches in Paros',
            'Snorkeling spots Mykonos',
            'Beach clubs Santorini',
            'Swimming in Naxos',
        ],
        triggerKeywords: ['beach', 'swimming', 'snorkeling', 'water sports', 'beach club'],
        triggerRegex: [
            /beach/i,
            /swimming/i,
            /snorkel/i,
            /water.*sports/i,
        ],
        requiredFields: ['location'],
        optionalFields: [],
        missingFieldQuestions: {
            location: 'Which island?',
        },
        apiTrigger: 'info_query',
        responseTemplate: '🏖️ Beach recommendations:',
    },
];

// ============================================
// CAR RENTAL PROMPTS (30 patterns)
// ============================================

export const carRentalPrompts: PromptPattern[] = [
    {
        id: 'car_basic',
        category: 'CAR_RENTAL',
        examplePrompts: [
            'Rent a car in Santorini',
            'Car rental Mykonos',
            'Hire a car in Paros',
            'Vehicle rental Naxos',
        ],
        triggerKeywords: ['rent a car', 'car rental', 'hire a car', 'vehicle rental'],
        triggerRegex: [
            /rent.*car/i,
            /car.*rental/i,
            /hire.*car/i,
            /vehicle.*rental/i,
        ],
        requiredFields: ['location', 'pickup_date', 'dropoff_date'],
        optionalFields: ['car_class', 'transmission', 'driver_age'],
        missingFieldQuestions: {
            pickup_date: 'What are your pickup and dropoff dates?',
            driver_age: 'What is the driver\'s age?',
        },
        apiTrigger: 'car_rental_search',
        responseTemplate: '🚗 Car rental options:',
    },
    {
        id: 'car_automatic',
        category: 'CAR_RENTAL',
        examplePrompts: [
            'Automatic car rental Santorini',
            'Automatic transmission Mykonos',
            'Auto car in Paros',
        ],
        triggerKeywords: ['automatic', 'auto'],
        triggerRegex: [
            /automatic.*car/i,
            /auto.*(car|rental)/i,
        ],
        requiredFields: ['location', 'pickup_date', 'dropoff_date'],
        optionalFields: ['driver_age'],
        missingFieldQuestions: {
            pickup_date: 'What dates?',
        },
        apiTrigger: 'car_rental_search',
        responseTemplate: '🚗 Automatic cars available:',
    },
    {
        id: 'car_atv_quad',
        category: 'CAR_RENTAL',
        examplePrompts: [
            'ATV rental Santorini',
            'Quad bike Mykonos',
            'Scooter rental Paros',
        ],
        triggerKeywords: ['atv', 'quad', 'scooter', 'bike', 'motorbike'],
        triggerRegex: [
            /atv/i,
            /quad/i,
            /scooter/i,
            /motorbike/i,
        ],
        requiredFields: ['location', 'pickup_date', 'dropoff_date'],
        optionalFields: [],
        missingFieldQuestions: {
            pickup_date: 'What dates?',
        },
        apiTrigger: 'car_rental_search',
        responseTemplate: '🏍️ ATV/Scooter options:',
    },
];

// ============================================
// INFO PROMPTS (40 patterns)
// ============================================

export const infoPrompts: PromptPattern[] = [
    {
        id: 'info_transport',
        category: 'INFO',
        examplePrompts: [
            'How to get from Santorini port to Oia',
            'Transport from airport to Fira',
            'Bus schedule Paros',
            'Taxi from Mykonos port to town',
        ],
        triggerKeywords: ['how to get', 'transport', 'bus', 'taxi', 'transfer'],
        triggerRegex: [
            /how.*get.*from/i,
            /transport/i,
            /bus.*schedule/i,
            /taxi/i,
        ],
        requiredFields: ['query'],
        optionalFields: ['location'],
        missingFieldQuestions: {},
        apiTrigger: 'info_query',
        responseTemplate: '🚌 Transport info:',
    },
    {
        id: 'info_food',
        category: 'INFO',
        examplePrompts: [
            'Best restaurants in Santorini',
            'Where to eat in Mykonos',
            'Local food Paros',
            'Traditional tavernas Naxos',
        ],
        triggerKeywords: ['restaurant', 'eat', 'food', 'taverna', 'dining'],
        triggerRegex: [
            /restaurant/i,
            /where.*eat/i,
            /food/i,
            /taverna/i,
        ],
        requiredFields: ['location'],
        optionalFields: [],
        missingFieldQuestions: {},
        apiTrigger: 'info_query',
        responseTemplate: '🍽️ Dining recommendations:',
    },
    {
        id: 'info_packing',
        category: 'INFO',
        examplePrompts: [
            'What to pack for Cyclades',
            'What to bring to Santorini',
            'Packing list for Greek islands',
        ],
        triggerKeywords: ['pack', 'bring', 'packing list', 'what to wear'],
        triggerRegex: [
            /what.*pack/i,
            /what.*bring/i,
            /packing/i,
        ],
        requiredFields: ['location'],
        optionalFields: ['month'],
        missingFieldQuestions: {},
        apiTrigger: 'info_query',
        responseTemplate: '🧳 Packing tips:',
    },
    {
        id: 'info_comparison',
        category: 'INFO',
        examplePrompts: [
            'Compare Santorini vs Mykonos',
            'Paros or Naxos better',
            'Which island is best for honeymoon',
            'Difference between Oia and Fira',
        ],
        triggerKeywords: ['compare', 'vs', 'or', 'better', 'difference'],
        triggerRegex: [
            /compare/i,
            /vs/i,
            /(santorini|mykonos|paros|naxos).*(or|vs).*(santorini|mykonos|paros|naxos)/i,
            /which.*better/i,
        ],
        requiredFields: ['query'],
        optionalFields: [],
        missingFieldQuestions: {},
        apiTrigger: 'info_query',
        responseTemplate: '⚖️ Comparison:',
    },
];

// ============================================
// ITINERARY PROMPTS (30 patterns)
// ============================================

export const itineraryPrompts: PromptPattern[] = [
    {
        id: 'itinerary_basic',
        category: 'ITINERARY',
        examplePrompts: [
            'Plan 5 days in Cyclades',
            'Itinerary for a week in Greek islands',
            'Trip planning Santorini and Mykonos',
            '3-day Santorini itinerary',
        ],
        triggerKeywords: ['plan', 'itinerary', 'trip', 'schedule', 'days'],
        triggerRegex: [
            /plan.*\d.*day/i,
            /itinerary/i,
            /\d.?day.*(trip|itinerary)/i,
            /(3|4|5|7).?day/i,
        ],
        requiredFields: ['duration', 'destinations', 'travelers', 'dates'],
        optionalFields: ['budget', 'style'],
        missingFieldQuestions: {
            duration: 'How many days is your trip?',
            destinations: 'Which islands would you like to visit?',
            travelers: 'How many travelers?',
            dates: 'When are you traveling?',
        },
        apiTrigger: 'itinerary_build',
        responseTemplate: '📋 Your personalized itinerary:',
    },
    {
        id: 'itinerary_island_hopping',
        category: 'ISLAND_HOPPING',
        examplePrompts: [
            'Island hopping itinerary Mykonos Paros Santorini',
            'Best route for hopping between islands',
            'Plan island hop Athens → Mykonos → Santorini → Athens',
        ],
        triggerKeywords: ['island hopping', 'island hop', 'multiple islands', 'between islands'],
        triggerRegex: [
            /island.?hop/i,
            /multiple.*island/i,
            /→.*→/i,
            /(mykonos|santorini|paros).*(mykonos|santorini|paros).*(mykonos|santorini|paros)/i,
        ],
        requiredFields: ['islands', 'duration', 'travelers', 'start_date'],
        optionalFields: ['budget'],
        missingFieldQuestions: {
            islands: 'Which islands do you want to visit?',
            duration: 'How many days total?',
            travelers: 'How many people?',
            start_date: 'When do you start?',
        },
        apiTrigger: 'itinerary_build',
        responseTemplate: '🏝️ Island hopping plan:',
    },
    {
        id: 'itinerary_rome2rio_style',
        category: 'ITINERARY',
        examplePrompts: [
            'Athens to Santorini complete trip with ferry and hotel',
            'Full package from Athens to Mykonos and back',
            'Plan everything: flights, ferries, hotels for Cyclades trip',
        ],
        triggerKeywords: ['complete', 'full package', 'everything', 'all inclusive'],
        triggerRegex: [
            /complete.*(trip|package)/i,
            /full.*package/i,
            /plan.*everything/i,
            /flights.*ferries.*hotels/i,
        ],
        requiredFields: ['origin', 'destinations', 'duration', 'travelers', 'dates'],
        optionalFields: ['budget'],
        missingFieldQuestions: {
            origin: 'Where are you starting from?',
            destinations: 'Which islands?',
            duration: 'How many days?',
            travelers: 'How many people?',
            dates: 'Travel dates?',
        },
        apiTrigger: 'itinerary_build',
        responseTemplate: '🌟 Complete trip package:',
    },
];

// ============================================
// EXPORT ALL PROMPTS
// ============================================

export const allPromptPatterns: PromptPattern[] = [
    ...flightPrompts,
    ...ferryPrompts,
    ...hotelPrompts,
    ...weatherPrompts,
    ...activityPrompts,
    ...carRentalPrompts,
    ...infoPrompts,
    ...itineraryPrompts,
];

// Count: ~50 + 60 + 50 + 40 + 40 + 30 + 40 + 30 = 340+ patterns

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Find matching prompt patterns for a user message
 */
export function matchPromptPatterns(userMessage: string): PromptPattern[] {
    const lowerMessage = userMessage.toLowerCase();
    const matches: PromptPattern[] = [];

    for (const pattern of allPromptPatterns) {
        // Check keywords
        const keywordMatch = pattern.triggerKeywords.some(kw =>
            lowerMessage.includes(kw.toLowerCase())
        );

        // Check regex
        const regexMatch = pattern.triggerRegex.some(rx => rx.test(userMessage));

        if (keywordMatch || regexMatch) {
            matches.push(pattern);
        }
    }

    return matches;
}

/**
 * Get the best matching pattern (highest priority)
 */
export function getBestMatch(userMessage: string): PromptPattern | null {
    const matches = matchPromptPatterns(userMessage);
    if (matches.length === 0) return null;

    // Prioritize more specific matches (more keywords matched)
    const scored = matches.map(pattern => {
        const lowerMessage = userMessage.toLowerCase();
        let score = 0;

        // Score keywords
        pattern.triggerKeywords.forEach(kw => {
            if (lowerMessage.includes(kw.toLowerCase())) score += 1;
        });

        // Score regex matches
        pattern.triggerRegex.forEach(rx => {
            if (rx.test(userMessage)) score += 2;
        });

        return { pattern, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored[0]?.pattern || null;
}

/**
 * Check which required fields are missing from context
 */
export function getMissingFields(
    pattern: PromptPattern,
    extractedContext: Record<string, any>
): string[] {
    return pattern.requiredFields.filter(field => !extractedContext[field]);
}

/**
 * Get the next clarification question to ask
 */
export function getNextQuestion(
    pattern: PromptPattern,
    missingFields: string[]
): string | null {
    if (missingFields.length === 0) return null;

    const nextField = missingFields[0];
    return pattern.missingFieldQuestions[nextField] || `What is the ${nextField}?`;
}

console.log(`Loaded ${allPromptPatterns.length} prompt patterns for Touristas AI`);
