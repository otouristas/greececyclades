/**
 * Enhanced Touristas AI Service
 * Voice mode, conversation memory, auto-booking capabilities
 */

import { supabase } from '../lib/supabase';

export interface ConversationMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    metadata?: {
        intent?: string;
        entities?: Record<string, any>;
        bookingData?: BookingIntent;
    };
}

export interface BookingIntent {
    type: 'hotel' | 'ferry' | 'flight' | 'activity' | 'restaurant' | 'transfer';
    status: 'detected' | 'confirming' | 'processing' | 'completed' | 'failed';
    details: {
        destination?: string;
        checkIn?: string;
        checkOut?: string;
        guests?: number;
        budget?: string;
        preferences?: string[];
    };
}

export interface UserMemory {
    userId: string;
    travelStyle: string;
    budgetPreference: string;
    dietaryRestrictions: string[];
    favoriteIslands: string[];
    pastTrips: {
        island: string;
        date: string;
        rating: number;
    }[];
    conversationSummaries: string[];
    preferences: Record<string, any>;
}

export interface VoiceConfig {
    enabled: boolean;
    voiceId: string;
    speed: number;
    language: string;
}

class TouristasEnhancedService {
    private conversationHistory: ConversationMessage[] = [];
    private userMemory: UserMemory | null = null;
    private currentBookingIntent: BookingIntent | null = null;
    private voiceConfig: VoiceConfig = {
        enabled: false,
        voiceId: 'greek-female-1',
        speed: 1.0,
        language: 'en-US',
    };

    // Initialize with user context
    async initialize(userId: string): Promise<void> {
        await this.loadUserMemory(userId);
        this.buildSystemPrompt();
    }

    // Load user memory from database
    private async loadUserMemory(userId: string): Promise<void> {
        const { data, error } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (data) {
            this.userMemory = {
                userId,
                travelStyle: data.travel_style || 'mid-range',
                budgetPreference: data.budget_preference || 'moderate',
                dietaryRestrictions: data.dietary_restrictions || [],
                favoriteIslands: data.preferred_islands || [],
                pastTrips: data.past_trip_summaries || [],
                conversationSummaries: [],
                preferences: data.notification_preferences || {},
            };
        }
    }

    // Build personalized system prompt
    private buildSystemPrompt(): string {
        let systemPrompt = `You are Touristas, an expert AI travel assistant for the Greek Cyclades islands. 
You have deep knowledge of all 24 Cycladic islands including beaches, restaurants, hotels, activities, ferries, and local culture.

PERSONALITY:
- Warm, enthusiastic, and genuinely passionate about Greek island travel
- Use occasional Greek phrases (with translations)
- Give specific, actionable recommendations
- Ask clarifying questions when needed
- Be proactive in suggesting related activities or tips

CAPABILITIES:
- Book hotels, ferries, and activities directly when user confirms
- Remember user preferences across conversations
- Provide real-time information about weather, ferry schedules, and availability
- Create personalized itineraries
- Answer questions about Greek culture, food, and local customs
`;

        if (this.userMemory) {
            systemPrompt += `
USER CONTEXT (Remember this for personalization):
- Travel Style: ${this.userMemory.travelStyle}
- Budget: ${this.userMemory.budgetPreference}
- Favorite Islands: ${this.userMemory.favoriteIslands.join(', ') || 'Not specified yet'}
- Dietary Restrictions: ${this.userMemory.dietaryRestrictions.join(', ') || 'None'}
- Past Trips: ${this.userMemory.pastTrips.map(t => `${t.island} (${t.rating}/5)`).join(', ') || 'First-time visitor'}
`;
        }

        systemPrompt += `
BOOKING FLOW:
When user wants to book something:
1. Confirm all details clearly
2. Ask for explicit confirmation before processing
3. Use [BOOK_HOTEL], [BOOK_FERRY], [BOOK_ACTIVITY] tags for booking actions
4. Always summarize what was booked after completion

Remember: You are the user's trusted local friend in Greece! 🇬🇷`;

        return systemPrompt;
    }

    // Process user message with intent detection
    async processMessage(userMessage: string, userId?: string): Promise<{
        response: string;
        bookingIntent?: BookingIntent;
        suggestedActions?: string[];
        shouldSpeak?: boolean;
    }> {
        // Add to history
        this.conversationHistory.push({
            role: 'user',
            content: userMessage,
            timestamp: new Date(),
        });

        // Detect intent
        const intent = this.detectIntent(userMessage);

        // Check for booking intent
        if (intent.isBookingRequest) {
            this.currentBookingIntent = {
                type: intent.bookingType!,
                status: 'detected',
                details: intent.extractedDetails,
            };
        }

        // Generate response (would call OpenAI in production)
        const response = await this.generateResponse(userMessage, intent);

        // Add to history
        this.conversationHistory.push({
            role: 'assistant',
            content: response.text,
            timestamp: new Date(),
            metadata: {
                intent: intent.primaryIntent,
                bookingData: this.currentBookingIntent || undefined,
            },
        });

        // Save conversation summary periodically
        if (userId && this.conversationHistory.length % 10 === 0) {
            await this.saveConversationSummary(userId);
        }

        return {
            response: response.text,
            bookingIntent: this.currentBookingIntent || undefined,
            suggestedActions: response.suggestedActions,
            shouldSpeak: this.voiceConfig.enabled,
        };
    }

    // Intent detection
    private detectIntent(message: string): {
        primaryIntent: string;
        isBookingRequest: boolean;
        bookingType?: 'hotel' | 'ferry' | 'flight' | 'activity' | 'restaurant' | 'transfer';
        extractedDetails: Record<string, any>;
    } {
        const lowerMessage = message.toLowerCase();

        // Booking keywords
        const bookingPatterns = {
            hotel: /\b(book|reserve|find|need|want)\b.*\b(hotel|room|accommodation|stay|villa|place to stay)\b/i,
            ferry: /\b(book|get|find|need)\b.*\b(ferry|boat|ticket)\b/i,
            flight: /\b(book|find|search)\b.*\b(flight|plane)\b/i,
            activity: /\b(book|reserve|do|try)\b.*\b(tour|activity|excursion|cruise|diving|sailing)\b/i,
            restaurant: /\b(book|reserve|find)\b.*\b(restaurant|table|dinner|lunch)\b/i,
            transfer: /\b(book|need|get)\b.*\b(taxi|transfer|pickup|ride)\b/i,
        };

        for (const [type, pattern] of Object.entries(bookingPatterns)) {
            if (pattern.test(message)) {
                return {
                    primaryIntent: `book_${type}`,
                    isBookingRequest: true,
                    bookingType: type as any,
                    extractedDetails: this.extractBookingDetails(message, type),
                };
            }
        }

        // Information intents
        const infoPatterns = {
            weather: /\b(weather|temperature|wind|waves|sunny|rain)\b/i,
            ferry_schedule: /\b(ferry|schedule|timetable|departure|when.*leave)\b/i,
            beach: /\b(beach|beaches|swimming|sand|coast)\b/i,
            food: /\b(food|eat|restaurant|taverna|cuisine|typical|dish)\b/i,
            nightlife: /\b(nightlife|bar|club|party|drink)\b/i,
            hiking: /\b(hike|hiking|trail|walk|mountain)\b/i,
            island_compare: /\b(compare|difference|versus|vs|better|which island)\b/i,
        };

        for (const [intent, pattern] of Object.entries(infoPatterns)) {
            if (pattern.test(message)) {
                return {
                    primaryIntent: intent,
                    isBookingRequest: false,
                    extractedDetails: {},
                };
            }
        }

        return {
            primaryIntent: 'general_question',
            isBookingRequest: false,
            extractedDetails: {},
        };
    }

    // Extract booking details from message
    private extractBookingDetails(message: string, type: string): Record<string, any> {
        const details: Record<string, any> = {};

        // Island names
        const islands = ['santorini', 'mykonos', 'paros', 'naxos', 'milos', 'ios', 'sifnos', 'folegandros', 'amorgos'];
        for (const island of islands) {
            if (message.toLowerCase().includes(island)) {
                details.destination = island.charAt(0).toUpperCase() + island.slice(1);
                break;
            }
        }

        // Date patterns
        const dateMatch = message.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-]?(\d{2,4})?/);
        if (dateMatch) {
            details.date = dateMatch[0];
        }

        // Guest count
        const guestMatch = message.match(/(\d+)\s*(guests?|people|persons?|adults?)/i);
        if (guestMatch) {
            details.guests = parseInt(guestMatch[1]);
        }

        // Budget
        if (/budget|cheap|affordable/i.test(message)) details.budget = 'budget';
        if (/luxury|premium|high.end|5.star/i.test(message)) details.budget = 'luxury';
        if (/mid.range|moderate|nice/i.test(message)) details.budget = 'mid-range';

        return details;
    }

    // Generate AI response
    private async generateResponse(message: string, intent: any): Promise<{
        text: string;
        suggestedActions: string[];
    }> {
        // In production, this would call OpenAI/Claude API
        // For now, provide smart contextual responses

        const suggestedActions: string[] = [];
        let responseText = '';

        if (intent.isBookingRequest) {
            const type = intent.bookingType;
            const details = intent.extractedDetails;

            if (type === 'hotel') {
                responseText = `I'd love to help you find the perfect place to stay${details.destination ? ` in ${details.destination}` : ''}! 🏨\n\n`;

                if (!details.destination) {
                    responseText += `Which island are you planning to visit? I can recommend options for any of the Cyclades!`;
                    suggestedActions.push('Santorini', 'Mykonos', 'Paros', 'Milos');
                } else if (!details.date) {
                    responseText += `Great choice! When are you planning to visit ${details.destination}? I'll check the best available options for your dates.`;
                } else {
                    responseText += `Let me search for the best ${details.budget || 'mid-range'} hotels in ${details.destination} for ${details.guests || 2} guests.\n\n`;
                    responseText += `**Top Recommendations:**\n`;
                    responseText += `1. 🌟 Caldera View Suites - €180/night - Stunning sunset views\n`;
                    responseText += `2. 🏛️ Traditional Cave Hotel - €150/night - Authentic experience\n`;
                    responseText += `3. 🏖️ Beach Resort & Spa - €220/night - Direct beach access\n\n`;
                    responseText += `Would you like me to book any of these? I can secure the best available rate!`;
                    suggestedActions.push('Book Option 1', 'Book Option 2', 'See More Options');
                }
            } else if (type === 'ferry') {
                responseText = `I'll help you find ferry tickets! 🚢\n\n`;
                responseText += `The most popular routes from Piraeus:\n`;
                responseText += `• **Santorini**: Blue Star (5h) €45 | Seajets (2h) €75\n`;
                responseText += `• **Mykonos**: Blue Star (4.5h) €40 | Seajets (2h) €70\n`;
                responseText += `• **Paros**: Blue Star (4h) €38 | Seajets (1.5h) €65\n\n`;
                responseText += `Which route are you interested in? I can check live availability!`;
                suggestedActions.push('Piraeus → Santorini', 'Piraeus → Mykonos', 'Check Inter-Island Ferries');
            } else if (type === 'activity') {
                responseText = `Let's find an amazing activity for you! 🎯\n\n`;
                responseText += `**Popular experiences in the Cyclades:**\n`;
                responseText += `• 🌅 Sunset Sailing Cruise - from €85/person\n`;
                responseText += `• 🍷 Wine Tasting Tour - from €60/person\n`;
                responseText += `• 🤿 Snorkeling/Diving Trip - from €70/person\n`;
                responseText += `• 🚗 Island ATV Adventure - from €45/day\n\n`;
                responseText += `What type of activity interests you most?`;
                suggestedActions.push('Water Activities', 'Cultural Tours', 'Adventure', 'Food & Wine');
            }
        } else {
            // Information responses
            if (intent.primaryIntent === 'weather') {
                responseText = `Let me check the weather for you! ☀️\n\n`;
                responseText += `**Current Conditions (Cyclades):**\n`;
                responseText += `• Temperature: 28-32°C\n`;
                responseText += `• Sea Temperature: 24-25°C (perfect for swimming!)\n`;
                responseText += `• Wind: Moderate Meltemi (15-20 km/h) from the north\n`;
                responseText += `• UV Index: Very High (9-10) - Don't forget sunscreen!\n\n`;
                responseText += `Would you like beach-specific conditions? Some beaches are more sheltered than others!`;
                suggestedActions.push('Best Calm Beaches', 'Surfing Conditions', 'Weekly Forecast');
            } else if (intent.primaryIntent === 'beach') {
                responseText = `The Cyclades have some of the most beautiful beaches in the world! 🏖️\n\n`;
                responseText += `**My Top Picks:**\n`;
                responseText += `• 🌙 **Sarakiniko, Milos** - Lunar landscape, unique white rocks\n`;
                responseText += `• 🔴 **Red Beach, Santorini** - Dramatic volcanic scenery\n`;
                responseText += `• 🏄 **Golden Beach, Paros** - Best for windsurfing\n`;
                responseText += `• 👨‍👩‍👧 **Plaka, Naxos** - Family-friendly, shallow waters\n`;
                responseText += `• 🎉 **Paradise, Mykonos** - Famous beach parties\n\n`;
                responseText += `Which vibe are you looking for?`;
                suggestedActions.push('Quiet & Secluded', 'Family Friendly', 'Party Scene', 'Water Sports'];
            } else {
                responseText = `Γεια σου! (Hello!) I'm Touristas, your Greek islands expert! 🇬🇷\n\n`;
                responseText += `I'm here to help you plan an unforgettable trip to the Cyclades. I can:\n\n`;
                responseText += `• 🏨 Find and book hotels\n`;
                responseText += `• ⛴️ Search ferry schedules and book tickets\n`;
                responseText += `• 🎯 Recommend activities and tours\n`;
                responseText += `• 🍽️ Suggest the best restaurants\n`;
                responseText += `• 🗺️ Create custom itineraries\n`;
                responseText += `• ☀️ Check beach conditions\n\n`;
                responseText += `What would you like to explore today?`;
                suggestedActions.push('Plan a Trip', 'Find Hotels', 'Book Ferry', 'Beach Recommendations'];
            }
        }

        return { text: responseText, suggestedActions };
    }

    // Process booking confirmation
    async confirmBooking(userId: string): Promise<{
        success: boolean;
        confirmationCode?: string;
        details?: string;
    }> {
        if (!this.currentBookingIntent) {
            return { success: false, details: 'No active booking to confirm' };
        }

        this.currentBookingIntent.status = 'processing';

        // Simulate booking process
        await new Promise(resolve => setTimeout(resolve, 1500));

        const confirmationCode = `CYC${Date.now().toString(36).toUpperCase()}`;

        this.currentBookingIntent.status = 'completed';

        // Save booking to database
        await this.saveBooking(userId, confirmationCode);

        return {
            success: true,
            confirmationCode,
            details: `Your ${this.currentBookingIntent.type} booking has been confirmed!`,
        };
    }

    // Save booking to database
    private async saveBooking(userId: string, confirmationCode: string): Promise<void> {
        if (!this.currentBookingIntent) return;

        // Would save to appropriate table based on booking type
        console.log('Booking saved:', {
            userId,
            confirmationCode,
            type: this.currentBookingIntent.type,
            details: this.currentBookingIntent.details,
        });
    }

    // Save conversation summary
    private async saveConversationSummary(userId: string): Promise<void> {
        const summary = this.conversationHistory
            .slice(-10)
            .map(m => `${m.role}: ${m.content.substring(0, 100)}...`)
            .join('\n');

        await supabase
            .from('user_preferences')
            .update({
                ai_conversation_context: {
                    lastSummary: summary,
                    lastUpdated: new Date().toISOString(),
                },
            })
            .eq('user_id', userId);
    }

    // Voice mode toggle
    setVoiceMode(enabled: boolean, config?: Partial<VoiceConfig>): void {
        this.voiceConfig = {
            ...this.voiceConfig,
            enabled,
            ...config,
        };
    }

    // Get voice config
    getVoiceConfig(): VoiceConfig {
        return this.voiceConfig;
    }

    // Clear conversation
    clearConversation(): void {
        this.conversationHistory = [];
        this.currentBookingIntent = null;
    }

    // Get conversation history
    getHistory(): ConversationMessage[] {
        return this.conversationHistory;
    }
}

export const touristasEnhancedService = new TouristasEnhancedService();
