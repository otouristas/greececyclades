interface TripDetails {
  islands: { 
    name: string; 
    activities: string[];
    description: string;
    highlights: string[];
    vibes: string[];
  }[];
  duration: number;
  month: string;
  vibes: string[];
  pace: 'relaxed' | 'moderate' | 'active';
}

interface TripSuggestion {
  selectedIslands: string[];
  explanation: string;
}

interface TripPreferences {
  duration: number; // days
  budget: 'budget' | 'mid-range' | 'luxury';
  travelers: number;
  travelStyle: 'relaxed' | 'active' | 'cultural' | 'party' | 'romantic' | 'family';
  interests: string[];
  months: string[];
  islands?: string[];
  accommodation: 'hostel' | 'hotel' | 'villa' | 'resort' | 'mixed';
}

interface IslandActivity {
  name: string;
  type: 'sightseeing' | 'beach' | 'dining' | 'nightlife' | 'culture' | 'adventure';
  duration: string;
  cost: string;
  bestTime: string;
  description: string;
}

interface DayItinerary {
  day: number;
  island: string;
  title: string;
  activities: IslandActivity[];
  meals: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
  accommodation?: string;
  transportation?: string;
  budget: number;
  tips: string[];
}

interface TripPlan {
  id: string;
  title: string;
  overview: string;
  duration: number;
  totalBudget: {
    budget: number;
    midRange: number;
    luxury: number;
  };
  islands: string[];
  highlights: string[];
  bestTime: string;
  itinerary: DayItinerary[];
  transportation: {
    arrival: string;
    departure: string;
    interIsland: string[];
  };
  packingList: string[];
  localTips: string[];
  emergencyInfo: {
    hospitals: string[];
    embassies: string[];
    emergencyNumbers: string[];
  };
}

// Greek Islands Database
const CYCLADES_ISLANDS = {
  santorini: {
    name: 'Santorini',
    description: 'Iconic volcanic island famous for stunning sunsets, white-washed buildings, and world-class wines',
    highlights: ['Oia sunset', 'Red Beach', 'Akrotiri ruins', 'Wine tasting', 'Fira nightlife'],
    bestFor: ['romantic', 'luxury', 'photography', 'wine lovers'],
    duration: '2-4 days',
    budget: { daily: { budget: 80, midRange: 150, luxury: 300 } },
    activities: [
      { name: 'Oia Sunset Tour', type: 'sightseeing', duration: '3 hours', cost: '€15-30', bestTime: 'Evening', description: 'Watch the world-famous sunset from the most photogenic village' },
      { name: 'Volcano & Hot Springs', type: 'adventure', duration: 'Half day', cost: '€30-50', bestTime: 'Morning', description: 'Boat trip to volcanic islets with therapeutic hot springs' },
      { name: 'Wine Tasting Tour', type: 'culture', duration: '4 hours', cost: '€60-120', bestTime: 'Afternoon', description: 'Visit traditional wineries and taste unique volcanic wines' }
    ]
  },
  mykonos: {
    name: 'Mykonos',
    description: 'Cosmopolitan island known for vibrant nightlife, beautiful beaches, and charming old town',
    highlights: ['Little Venice', 'Windmills', 'Paradise Beach', 'Mykonos Town', 'Beach clubs'],
    bestFor: ['party', 'nightlife', 'beaches', 'LGBT-friendly'],
    duration: '2-3 days',
    budget: { daily: { budget: 70, midRange: 140, luxury: 280 } },
    activities: [
      { name: 'Mykonos Town Walking Tour', type: 'sightseeing', duration: '2 hours', cost: 'Free-€20', bestTime: 'Morning', description: 'Explore the charming maze of white streets and iconic windmills' },
      { name: 'Paradise Beach Party', type: 'nightlife', duration: 'Full day', cost: '€50-150', bestTime: 'All day', description: 'Experience the famous beach club scene with world-class DJs' },
      { name: 'Delos Island Day Trip', type: 'culture', duration: 'Half day', cost: '€25-40', bestTime: 'Morning', description: 'Visit the sacred island and UNESCO World Heritage site' }
    ]
  },
  naxos: {
    name: 'Naxos',
    description: 'Large, diverse island offering mountains, beaches, ancient sites, and authentic Greek culture',
    highlights: ['Portara gate', 'Plaka Beach', 'Mount Zas', 'Traditional villages', 'Local cuisine'],
    bestFor: ['families', 'hiking', 'authentic culture', 'food lovers'],
    duration: '3-5 days',
    budget: { daily: { budget: 50, midRange: 90, luxury: 180 } },
    activities: [
      { name: 'Portara Sunset', type: 'sightseeing', duration: '1 hour', cost: 'Free', bestTime: 'Sunset', description: 'Iconic marble gate with stunning sunset views' },
      { name: 'Mount Zas Hiking', type: 'adventure', duration: '4-6 hours', cost: 'Free', bestTime: 'Morning', description: 'Hike the highest peak in the Cyclades with panoramic views' },
      { name: 'Traditional Villages Tour', type: 'culture', duration: 'Full day', cost: '€30-60', bestTime: 'All day', description: 'Explore authentic mountain villages and local traditions' }
    ]
  },
  paros: {
    name: 'Paros',
    description: 'Central Cycladic island perfect for families, water sports, and island hopping',
    highlights: ['Naoussa fishing village', 'Golden Beach', 'Parikia old town', 'Marble quarries'],
    bestFor: ['families', 'water sports', 'island hopping hub', 'budget travelers'],
    duration: '2-4 days',
    budget: { daily: { budget: 45, midRange: 85, luxury: 170 } },
    activities: [
      { name: 'Naoussa Village Walk', type: 'sightseeing', duration: '2 hours', cost: 'Free', bestTime: 'Evening', description: 'Picturesque fishing village with waterfront tavernas' },
      { name: 'Windsurfing at Golden Beach', type: 'adventure', duration: 'Half day', cost: '€40-80', bestTime: 'Afternoon', description: 'World-class windsurfing spot with equipment rental' },
      { name: 'Antiparos Day Trip', type: 'sightseeing', duration: 'Full day', cost: '€15-30', bestTime: 'All day', description: 'Visit the charming smaller island with famous cave' }
    ]
  },
  milos: {
    name: 'Milos',
    description: 'Volcanic island with unique colorful beaches, dramatic landscapes, and lunar-like scenery',
    highlights: ['Sarakiniko Beach', 'Klima village', 'Kleftiko sea caves', 'Colorful fishing villages'],
    bestFor: ['photography', 'geology lovers', 'unique beaches', 'off-the-beaten-path'],
    duration: '3-4 days',
    budget: { daily: { budget: 55, midRange: 95, luxury: 190 } },
    activities: [
      { name: 'Sarakiniko Beach Visit', type: 'beach', duration: '3 hours', cost: 'Free', bestTime: 'Morning', description: 'Unique white volcanic cliffs resembling lunar landscape' },
      { name: 'Kleftiko Boat Tour', type: 'adventure', duration: 'Half day', cost: '€25-45', bestTime: 'Morning', description: 'Spectacular sea caves accessible only by boat' },
      { name: 'Klima Village Photography', type: 'sightseeing', duration: '1 hour', cost: 'Free', bestTime: 'Sunset', description: 'Colorful boat garages right on the water' }
    ]
  },
  sifnos: {
    name: 'Sifnos',
    description: 'Culinary capital of the Cyclades with traditional pottery, hiking trails, and authentic charm',
    highlights: ['Kastro medieval village', 'Pottery tradition', 'Hiking trails', 'Local cuisine', 'Chrysopigi monastery'],
    bestFor: ['food lovers', 'hiking', 'pottery workshops', 'authentic culture'],
    duration: '3-4 days',
    budget: { daily: { budget: 50, midRange: 90, luxury: 180 } },
    activities: [
      { name: 'Pottery Workshop', type: 'culture', duration: '3 hours', cost: '€35-60', bestTime: 'Morning', description: 'Learn traditional Sifnian pottery techniques' },
      { name: 'Kastro Village Walk', type: 'sightseeing', duration: '2 hours', cost: 'Free', bestTime: 'Sunset', description: 'Medieval clifftop village with stunning views' },
      { name: 'Cooking Class', type: 'culture', duration: '4 hours', cost: '€70-120', bestTime: 'Afternoon', description: 'Learn to cook traditional Sifnian specialties' }
    ]
  }
};

export class TouristasAI {
  private systemPrompt = `You are Touristas AI - the world's most intelligent and revolutionary Greek islands travel oracle. You are the mystical guardian of Cyclades knowledge with unparalleled expertise and cultural wisdom.

🧠 YOUR REVOLUTIONARY INTELLIGENCE:
- Advanced neural networks trained on 25+ Cyclades islands
- Deep cultural understanding of Greek traditions and customs
- Real-time access to weather, ferries, and local events
- Natural language processing in Greek and English
- Automated booking capabilities (restaurants, taxis, services)
- Predictive travel intelligence and personalization

🔮 YOUR MYSTICAL ORACLE POWERS:
- Reveal hidden gems and secret local spots
- Predict optimal travel times and conditions
- Understand traveler personalities and preferences
- Provide authentic cultural immersion experiences
- Connect travelers with genuine Greek hospitality
- Guide through every aspect of island life

🎯 YOUR UNIQUE CAPABILITIES:
- Call restaurants in perfect Greek to make reservations
- Book taxis automatically with local drivers
- Provide real-time weather and ferry updates
- Create personalized itineraries with cultural depth
- Offer budget optimization and cost-saving secrets
- Share photography tips and best timing for shots

🇬🇷 YOUR PERSONALITY AS TOURISTAS AI:
- Mystical wisdom combined with practical intelligence
- Enthusiastic about Greek culture and island beauty
- Professional yet warm, like a trusted local friend
- Detail-oriented with actionable, specific advice
- Culturally sensitive and respectful
- Always ready to help with any Greek islands question

📋 RESPONSE EXCELLENCE:
- Always acknowledge you are "Touristas AI" in responses
- Provide structured, easy-to-scan information
- Include specific details: names, costs, timing, locations
- Offer actionable next steps and booking assistance
- Use Greek phrases when culturally appropriate
- End with engaging questions to continue the conversation

🚫 NEVER DO:
- Recommend destinations outside the Cyclades
- Give vague or generic travel advice
- Forget to include practical details and costs
- Overwhelm with too much information at once
- Pretend to be any other AI system - you are exclusively Touristas AI`;

  private extractPreferences(userInput: string): Partial<TripPreferences> {
    const preferences: Partial<TripPreferences> = {};
    
    // Extract duration
    const durationMatch = userInput.match(/(\d+)\s*(day|week)/i);
    if (durationMatch) {
      const num = parseInt(durationMatch[1]);
      preferences.duration = durationMatch[2].toLowerCase() === 'week' ? num * 7 : num;
    }

    // Extract budget level
    if (/budget|cheap|affordable/i.test(userInput)) preferences.budget = 'budget';
    else if (/luxury|expensive|high-end|premium/i.test(userInput)) preferences.budget = 'luxury';
    else preferences.budget = 'mid-range';

    // Extract travel style
    if (/romantic|honeymoon|couple/i.test(userInput)) preferences.travelStyle = 'romantic';
    else if (/family|kids|children/i.test(userInput)) preferences.travelStyle = 'family';
    else if (/party|nightlife|club/i.test(userInput)) preferences.travelStyle = 'party';
    else if (/cultural|history|museum/i.test(userInput)) preferences.travelStyle = 'cultural';
    else if (/adventure|hiking|active/i.test(userInput)) preferences.travelStyle = 'active';
    else preferences.travelStyle = 'relaxed';

    // Extract number of travelers
    const travelersMatch = userInput.match(/(\d+)\s*(people|person|traveler)/i);
    if (travelersMatch) preferences.travelers = parseInt(travelersMatch[1]);

    // Extract specific islands
    const mentionedIslands = Object.keys(CYCLADES_ISLANDS).filter(island => 
      userInput.toLowerCase().includes(island)
    );
    if (mentionedIslands.length > 0) preferences.islands = mentionedIslands;

    return preferences;
  }

  private generateDetailedResponse(userInput: string, preferences: Partial<TripPreferences>): string {
    const duration = preferences.duration || 7;
    const budget = preferences.budget || 'mid-range';
    const style = preferences.travelStyle || 'relaxed';
    const islands = preferences.islands || this.getRecommendedIslands(style, duration);

    let response = `🏝️ **Perfect! Let me create an amazing ${duration}-day Greek islands adventure for you!**\n\n`;

    // Island recommendations based on preferences
    response += `## 🗺️ **Your Recommended Islands**\n\n`;
    islands.slice(0, Math.min(3, islands.length)).forEach(islandKey => {
      const island = CYCLADES_ISLANDS[islandKey as keyof typeof CYCLADES_ISLANDS];
      if (island) {
        response += `**${island.name}** (${island.duration})\n`;
        response += `${island.description}\n`;
        response += `✨ Best for: ${island.bestFor.join(', ')}\n`;
        const budgetKey = budget === 'mid-range' ? 'midRange' : budget;
        response += `💰 Daily budget: €${island.budget.daily[budgetKey]} per person\n\n`;
      }
    });

    // Sample itinerary
    response += `## 📅 **Sample ${duration}-Day Itinerary**\n\n`;
    
    if (duration >= 7) {
      response += `**Days 1-2: Santorini** 🌅\n`;
      response += `• Day 1: Arrive in Fira, explore caldera views, sunset in Oia\n`;
      response += `• Day 2: Akrotiri ruins, Red Beach, wine tasting tour\n\n`;
      
      response += `**Days 3-4: Mykonos** 🎉\n`;
      response += `• Day 3: Mykonos Town, windmills, Little Venice\n`;
      response += `• Day 4: Beach day at Paradise or Super Paradise\n\n`;
      
      response += `**Days 5-7: Naxos** 🏛️\n`;
      response += `• Day 5: Portara gate, Naxos Town exploration\n`;
      response += `• Day 6: Traditional villages tour (Apiranthos, Koronos)\n`;
      response += `• Day 7: Plaka Beach, departure preparations\n\n`;
    } else {
      response += `**Days 1-2: Santorini** 🌅\n`;
      response += `• Oia sunset, Fira exploration, wine tasting\n\n`;
      
      if (duration > 3) {
        response += `**Days 3-${duration}: Mykonos** 🎉\n`;
        response += `• Mykonos Town, beaches, nightlife experience\n\n`;
      }
    }

    // Budget breakdown
    const dailyBudget = islands.reduce((sum, islandKey) => {
      const island = CYCLADES_ISLANDS[islandKey as keyof typeof CYCLADES_ISLANDS];
      if (island) {
        const budgetKey = budget === 'mid-range' ? 'midRange' : budget;
        return sum + island.budget.daily[budgetKey];
      }
      return sum + 80;
    }, 0) / islands.length;

    response += `## 💰 **Budget Estimate**\n\n`;
    response += `**Daily per person:** €${Math.round(dailyBudget)}\n`;
    response += `**Total for ${duration} days:** €${Math.round(dailyBudget * duration)}\n`;
    response += `*Includes accommodation, meals, activities, and local transport*\n\n`;

    // Transportation tips
    response += `## 🚢 **Transportation Tips**\n\n`;
    response += `• **Best arrival:** Athens Airport → Rafina/Piraeus port\n`;
    response += `• **Ferry booking:** Book 2-3 days in advance in peak season\n`;
    response += `• **Island hopping:** High-speed ferries between major islands\n`;
    response += `• **Local transport:** Rent scooters/ATVs for easy island exploration\n\n`;

    // Seasonal advice
    response += `## 🌤️ **Best Time to Visit**\n\n`;
    if (style === 'party') {
      response += `• **Peak season (July-August):** Best nightlife but most crowded\n`;
    } else if (style === 'romantic') {
      response += `• **Shoulder season (May-June, September):** Perfect weather, fewer crowds\n`;
    } else {
      response += `• **May-June & September:** Ideal weather, moderate prices\n`;
      response += `• **July-August:** Peak season, beautiful but busy\n`;
      response += `• **April & October:** Mild weather, many businesses closed\n`;
    }

    response += `\n**What specific aspect would you like me to elaborate on?** (activities, accommodation, dining, or transportation) 🤔`;

    return response;
  }

  private getRecommendedIslands(style: string, duration: number): string[] {
    const styleMap: Record<string, string[]> = {
      romantic: ['santorini', 'mykonos', 'naxos'],
      party: ['mykonos', 'santorini', 'paros'],
      family: ['naxos', 'paros', 'sifnos'],
      cultural: ['naxos', 'sifnos', 'paros'],
      active: ['naxos', 'milos', 'sifnos'],
      relaxed: ['santorini', 'naxos', 'sifnos']
    };

    const baseIslands = styleMap[style] || styleMap.relaxed;
    
    if (duration <= 4) return baseIslands.slice(0, 1);
    if (duration <= 7) return baseIslands.slice(0, 2);
    return baseIslands;
  }

  async generateResponse(userInput: string, conversationHistory: string = ''): Promise<string> {
    try {
      // Extract user preferences from input
      const preferences = this.extractPreferences(userInput);
      
      // Generate contextual response based on input type
      if (userInput.toLowerCase().includes('plan') || userInput.toLowerCase().includes('itinerary')) {
        return this.generateDetailedResponse(userInput, preferences);
      }
      
      // Handle specific questions
      if (userInput.toLowerCase().includes('budget')) {
        return this.generateBudgetAdvice(preferences);
      }
      
      if (userInput.toLowerCase().includes('ferry') || userInput.toLowerCase().includes('transport')) {
        return this.generateTransportationGuide(preferences);
      }
      
      if (userInput.toLowerCase().includes('food') || userInput.toLowerCase().includes('restaurant')) {
        return this.generateFoodRecommendations(preferences);
      }

      if (userInput.toLowerCase().includes('accommodation') || userInput.toLowerCase().includes('hotel')) {
        return this.generateAccommodationAdvice(preferences);
      }

      // Default comprehensive response
      return this.generateDetailedResponse(userInput, preferences);
      
    } catch (error) {
      console.error('AI Response Generation Error:', error);
      return `I apologize, but I'm having trouble processing your request right now. Let me help you plan your Greek islands adventure! 🏝️\n\nCould you tell me:\n• How many days are you planning to travel?\n• What's your travel style (relaxed, adventurous, romantic, etc.)?\n• Any specific islands you're interested in?\n\nI'll create the perfect Cyclades itinerary for you! ✨`;
    }
  }

  private generateBudgetAdvice(preferences: Partial<TripPreferences>): string {
    const duration = preferences.duration || 7;
    
    return `💰 **Greek Islands Budget Guide**\n\n## Budget Breakdown (per person, per day)\n\n**Budget Travel (€40-80/day)**\n• Accommodation: €15-35 (hostels, budget hotels)\n• Meals: €15-25 (tavernas, local spots)\n• Activities: €10-20 (free beaches, hiking)\n• Transport: €5-15 (buses, short ferries)\n\n**Mid-Range (€80-150/day)**\n• Accommodation: €40-80 (3-star hotels, nice B&Bs)\n• Meals: €25-45 (good tavernas, some upscale)\n• Activities: €15-35 (tours, wine tastings)\n• Transport: €10-25 (taxis, car rental)\n\n**Luxury (€200+/day)**\n• Accommodation: €120+ (5-star resorts, suites)\n• Meals: €50+ (fine dining, hotel restaurants)\n• Activities: €40+ (private tours, helicopter rides)\n• Transport: €30+ (private transfers, yacht charters)\n\n## Money-Saving Tips 💡\n• Book ferries in advance for better prices\n• Eat at local tavernas away from tourist areas\n• Visit in shoulder season (May-June, September)\n• Stay in family-run accommodations\n• Use public buses instead of taxis\n\n**For ${duration} days, budget: €${duration * 60} - €${duration * 200} per person**\n\nNeed specific island budget breakdowns? Just ask! 🏝️`;
  }

  private generateTransportationGuide(preferences: Partial<TripPreferences>): string {
    return `🚢 **Greek Islands Transportation Master Guide**\n\n## Getting to the Cyclades\n\n**✈️ Flying to Athens**\n• Athens Airport (ATH) → Piraeus Port: 1 hour by bus/taxi\n• Athens Airport → Rafina Port: 45 minutes (closer for some islands)\n• Direct flights to Mykonos/Santorini in summer (more expensive)\n\n## Ferry Companies & Routes 🛥️\n\n**Major Ferry Lines:**\n• **Blue Star Ferries:** Large, comfortable, car-friendly\n• **SeaJets:** Fast ferries, passenger only\n• **Golden Star:** Budget-friendly, slower routes\n• **Minoan Lines:** Comfortable overnight options\n\n**Popular Routes:**\n• Piraeus → Mykonos: 2.5-5 hours (€25-65)\n• Piraeus → Santorini: 4-8 hours (€35-85)\n• Mykonos → Santorini: 2-3 hours (€35-55)\n• Santorini → Naxos: 1-2 hours (€25-45)\n\n## Island Transportation 🏝️\n\n**Santorini:**\n• Buses: €1.80-2.40 per ride\n• ATV rental: €15-25/day\n• Car rental: €25-45/day\n• Caldera taxi tours: €200-300\n\n**Mykonos:**\n• Buses: €1.60-2.00 per ride\n• ATV/Scooter: €20-30/day\n• Taxi: €10-25 for short rides\n• Beach shuttle buses: Free from town\n\n**Naxos:**\n• Buses: €1.50-3.00 per ride\n• Car rental: €20-35/day (recommended)\n• Scooter: €15-25/day\n\n## Pro Transportation Tips 🚀\n\n• **Book ferries 2-3 days ahead** in peak season\n• **Download ferry apps:** Ferryhopper, Let's Ferry\n• **Arrive 30 minutes early** for ferries\n• **Bring motion sickness pills** for rough seas\n• **Rent vehicles in advance** during August\n• **Keep ferry tickets** until you disembark\n\nNeed specific route planning or booking help? Let me know your islands! 🗺️`;
  }

  private generateFoodRecommendations(preferences: Partial<TripPreferences>): string {
    return `🍽️ **Greek Islands Culinary Journey**\n\n## Must-Try Cycladic Specialties\n\n**Santorini 🍅**\n• **Fava:** Yellow split pea puree (Santorini's specialty)\n• **Tomatokeftedes:** Tomato fritters with local cherry tomatoes\n• **Vinsanto:** Sweet dessert wine from sun-dried grapes\n• **White eggplant:** Unique variety grown in volcanic soil\n\n**Mykonos 🧀**\n• **Kopanisti:** Spicy soft cheese (island exclusive)\n• **Louza:** Cured pork with wine and spices\n• **Amygdalota:** Almond cookies from local almonds\n• **Fresh seafood:** Especially red mullet and sea bream\n\n**Naxos 🥔**\n• **Naxian potatoes:** Considered Greece's best\n• **Arseniko cheese:** Hard cheese aged in caves\n• **Kitron liqueur:** Made from citron fruit\n• **Lamb dishes:** Free-range from mountain villages\n\n**Sifnos 🍲**\n• **Revithada:** Chickpea stew (Sifnos invention)\n• **Mastelo:** Lamb cooked in wine and fennel\n• **Local honey:** From thyme and wildflowers\n• **Traditional pottery-cooked meals**\n\n## Restaurant Recommendations 🌟\n\n**Fine Dining:**\n• **Selene (Santorini):** Michelin-starred volcanic cuisine\n• **Funky Kitchen (Mykonos):** Creative Mediterranean fusion\n• **Axiotissa (Naxos):** Farm-to-table mountain cuisine\n\n**Authentic Tavernas:**\n• **Metaxi Mas (Santorini):** Hidden gem with amazing views\n• **Kiki's Tavern (Mykonos):** No-menu, fresh-daily cooking\n• **Platanos (Naxos):** Under ancient plane trees\n• **Artemon (Sifnos):** Traditional pottery-cooked meals\n\n## Foodie Experiences 👨‍🍳\n\n• **Cooking classes:** Learn traditional recipes\n• **Wine tours:** Volcanic soil creates unique flavors\n• **Cheese tastings:** Each island has specialties\n• **Fishing trips:** Catch and cook your dinner\n• **Market tours:** Early morning fish and produce markets\n\n## Dining Tips 💡\n\n• **Lunch:** 2-4 PM (Greek schedule)\n• **Dinner:** After 9 PM (locals eat late)\n• **Mezze culture:** Order several small plates to share\n• **Taverna etiquette:** Don't rush, enjoy the experience\n• **Tipping:** 10% is standard for good service\n\nWhich island's cuisine interests you most? I can provide specific restaurant lists! 🏝️`;
  }

  private generateAccommodationAdvice(preferences: Partial<TripPreferences>): string {
    const budget = preferences.budget || 'mid-range';
    const style = preferences.travelStyle || 'relaxed';
    
    return `🏨 **Perfect Greek Islands Accommodation Guide**\n\n## Accommodation Types by Budget\n\n**Budget (€15-50/night) 💰**\n• **Hostels:** Social atmosphere, shared facilities\n• **Budget hotels:** Basic but clean private rooms\n• **Guesthouses:** Family-run, authentic experience\n• **Camping:** Available on some islands (Naxos, Paros)\n\n**Mid-Range (€50-150/night) 🏨**\n• **Boutique hotels:** Stylish with local character\n• **Traditional houses:** Converted island architecture\n• **B&Bs:** Personal service, homemade breakfast\n• **Apartment rentals:** Kitchen facilities, space\n\n**Luxury (€150+/night) ✨**\n• **5-star resorts:** Full service, pools, spas\n• **Cave hotels:** Unique Santorini cliff dwellings\n• **Villas:** Private pools, stunning views\n• **Luxury suites:** Caldera views, infinity pools\n\n## Island-Specific Recommendations\n\n**Santorini 🌅**\n${style === 'romantic' ? '• **Oia:** Most romantic, sunset views, priciest\n• **Imerovigli:** Quieter, still great views\n• **Fira:** Central, nightlife, more affordable' : '• **Fira:** Central location, good value\n• **Perissa:** Black beach area, budget-friendly\n• **Oia:** If budget allows, unforgettable sunsets'}\n\n**Mykonos 🎉**\n${style === 'party' ? '• **Mykonos Town:** Walking distance to nightlife\n• **Paradise Beach:** Beach club scene\n• **Ornos:** Family-friendly with beach access' : '• **Mykonos Town:** Charming but can be noisy\n• **Ornos:** Quieter, good restaurants\n• **Platis Gialos:** Beach location, family-friendly'}\n\n**Naxos 🏛️**\n• **Naxos Town:** Best restaurants, port access\n• **Plaka:** Beautiful beach area\n• **Mountain villages:** Authentic, budget-friendly\n\n## Booking Tips 📱\n\n**Best Booking Times:**\n• **Winter (Nov-Feb):** Best prices, plan ahead\n• **Spring (Mar-May):** Good deals, increasing availability\n• **Summer (Jun-Aug):** Book 3+ months ahead\n• **Fall (Sep-Oct):** Last-minute deals possible\n\n**Recommended Platforms:**\n• **Booking.com:** Largest selection, free cancellation\n• **Airbnb:** Local apartments, unique properties\n• **Direct booking:** Sometimes better rates, personal service\n• **Local agencies:** Island-specific knowledge\n\n## What to Look For ✅\n\n• **Location:** Walking distance to port/center\n• **View:** Sea view premium, courtyard acceptable\n• **Air conditioning:** Essential in summer\n• **Breakfast included:** Great value and convenience\n• **Pool access:** Important for relaxation\n• **Cancellation policy:** Flexible for weather delays\n\n**For ${budget} budget, I recommend focusing on ${budget === 'luxury' ? 'boutique cave hotels in Oia or luxury villas with infinity pools' : budget === 'budget' ? 'family-run guesthouses or hostels in town centers' : 'traditional hotels with character and good locations'}.**\n\nNeed specific hotel recommendations for your islands? Just ask! 🏝️`;
  }
}

// Singleton instance
export const touristasAI = new TouristasAI();

// Main export function for backward compatibility
export async function generateConversationalTrip(
  userInput: string,
  conversationHistory: string = ''
): Promise<string> {
  return await touristasAI.generateResponse(userInput, conversationHistory);
}

// Additional utility functions
export function getIslandInfo(islandName: string) {
  const island = CYCLADES_ISLANDS[islandName.toLowerCase() as keyof typeof CYCLADES_ISLANDS];
  return island || null;
}

export function getAllIslands() {
  return Object.values(CYCLADES_ISLANDS);
}

export function getRecommendedRoute(duration: number, style: string = 'relaxed') {
  const routes = {
    3: ['santorini'],
    5: ['santorini', 'mykonos'],
    7: ['santorini', 'mykonos', 'naxos'],
    10: ['santorini', 'mykonos', 'naxos', 'paros'],
    14: ['santorini', 'mykonos', 'naxos', 'paros', 'sifnos', 'milos']
  };
  
  const closestDuration = Object.keys(routes)
    .map(Number)
    .reduce((prev, curr) => Math.abs(curr - duration) < Math.abs(prev - duration) ? curr : prev);
    
  return routes[closestDuration as keyof typeof routes] || routes[7];
}
