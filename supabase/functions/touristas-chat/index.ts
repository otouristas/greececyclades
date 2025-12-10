import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface RequestBody {
    messages: ChatMessage[];
    userContext?: {
        favoriteIslands?: string[];
        travelStyle?: string;
        budget?: string;
        pastTrips?: string[];
    };
}

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { messages, userContext } = await req.json() as RequestBody;

        // Build system prompt with user context
        let systemPrompt = `You are Touristas, an expert AI travel assistant specialized in the Greek Cyclades islands.

PERSONALITY:
- Warm, enthusiastic, and genuinely passionate about Greek island travel
- Use occasional Greek phrases (with translations) like "Γεια σου!" (Hello!)
- Give specific, actionable recommendations with prices when relevant
- Be proactive in suggesting activities but respect user preferences

KNOWLEDGE:
- Expert on all 24 Cycladic islands: Santorini, Mykonos, Paros, Naxos, Milos, Sifnos, Ios, Tinos, Syros, Andros, Amorgos, Koufonisia, Serifos, Folegandros, Sikinos, Kimolos, Antiparos, Anafi, Thirasia, Kea, Kythnos, Donousa, Schinoussa, Iraklia
- Ferry schedules between islands (Blue Star, SeaJets, Golden Star, Fast Ferries)
- Beach conditions, restaurants, hotels, activities
- Greek culture, food, and customs

CAPABILITIES:
When user wants to book, respond with structured booking intent:
[BOOKING_INTENT: type=hotel|ferry|activity, destination=..., dates=..., guests=...]

FORMATTING:
- Use markdown for rich responses
- Use bullet points for lists
- Use **bold** for emphasis
- Keep responses concise but informative`;

        if (userContext) {
            systemPrompt += `\n\nUSER CONTEXT:
- Favorite Islands: ${userContext.favoriteIslands?.join(', ') || 'Not specified'}
- Travel Style: ${userContext.travelStyle || 'Not specified'}
- Budget: ${userContext.budget || 'Not specified'}
- Previous Trips: ${userContext.pastTrips?.join(', ') || 'First-time visitor'}

Use this context to personalize your recommendations!`;
        }

        const apiMessages = [
            { role: 'system', content: systemPrompt },
            ...messages
        ];

        // Call OpenAI API
        const openaiKey = Deno.env.get('OPENAI_API_KEY');

        if (!openaiKey) {
            // Fallback response if no API key
            return new Response(
                JSON.stringify({
                    response: generateFallbackResponse(messages[messages.length - 1].content),
                    success: true
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openaiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4-turbo-preview',
                messages: apiMessages,
                max_tokens: 1000,
                temperature: 0.7,
            }),
        });

        if (!openaiResponse.ok) {
            const error = await openaiResponse.text();
            console.error('OpenAI API error:', error);
            throw new Error('Failed to get AI response');
        }

        const data = await openaiResponse.json();
        const aiResponse = data.choices[0]?.message?.content || 'I apologize, I had trouble processing that. Could you try again?';

        // Check for booking intent
        const bookingIntent = extractBookingIntent(aiResponse);

        return new Response(
            JSON.stringify({
                response: aiResponse.replace(/\[BOOKING_INTENT:.*?\]/g, '').trim(),
                bookingIntent,
                success: true
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({
                error: error.message,
                success: false
            }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});

function extractBookingIntent(response: string): any | null {
    const match = response.match(/\[BOOKING_INTENT:\s*type=(\w+),\s*destination=([^,]+),?\s*dates?=([^,\]]*),?\s*guests?=(\d*)\]/i);
    if (match) {
        return {
            type: match[1],
            destination: match[2].trim(),
            dates: match[3].trim() || null,
            guests: match[4] ? parseInt(match[4]) : null,
        };
    }
    return null;
}

function generateFallbackResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();

    if (message.includes('hotel') || message.includes('stay') || message.includes('accommodation')) {
        return `I'd love to help you find the perfect place to stay! 🏨

**Popular choices in the Cyclades:**

🌅 **Santorini** - Caldera views, cave hotels (€150-500/night)
🎉 **Mykonos** - Boutique hotels, beach resorts (€120-400/night)
🏖️ **Paros** - Family-friendly, great value (€80-200/night)
🏛️ **Naxos** - Traditional villages (€60-150/night)
🌙 **Milos** - Unique landscapes (€90-250/night)

Which island interests you most? I can find specific recommendations based on your dates and preferences!`;
    }

    if (message.includes('ferry') || message.includes('boat') || message.includes('ticket')) {
        return `Let me help you with ferry tickets! ⛴️

**Main ferry companies:**
- **Blue Star Ferries** - Reliable, comfortable (4-5h to Santorini)
- **SeaJets** - Fast catamarans (2h to Mykonos)
- **Golden Star** - Good mid-range option

**Sample routes from Piraeus:**
• Santorini: €40-75 (2-5 hours)
• Mykonos: €35-70 (2-4.5 hours)
• Paros: €30-65 (2-4 hours)

Where are you traveling from and to? I'll find the best options for your dates!`;
    }

    if (message.includes('beach') || message.includes('swim')) {
        return `The Cyclades have some of the world's most beautiful beaches! 🏖️

**Top recommendations:**

🌙 **Sarakiniko, Milos** - Lunar landscape, white rocks
🔴 **Red Beach, Santorini** - Volcanic, dramatic cliffs
💎 **Kolimbithres, Paros** - Rock formations, calm water
🏄 **Mikri Vigla, Naxos** - Perfect for windsurfing
🎊 **Paradise Beach, Mykonos** - Famous beach parties

Would you like recommendations for calm family beaches or more adventurous spots?`;
    }

    if (message.includes('food') || message.includes('eat') || message.includes('restaurant')) {
        return `Greek island cuisine is amazing! 🍽️

**Must-try dishes:**
• **Fava** - Yellow split pea puree (Santorini specialty)
• **Kopanisti** - Spicy cheese spread (Mykonos)
• **Fresh seafood** - Everywhere! Try grilled octopus
• **Mastelo** - Lamb baked in wine (Sifnos)

**Restaurant tips:**
- Book sunset tables 2-3 days ahead in high season
- Ask locals for family tavernas away from tourist spots
- Budget €25-50 per person for a nice meal

Which island are you interested in? I can recommend specific restaurants!`;
    }

    return `Γεια σου! 👋 I'm Touristas, your Greek Cyclades travel expert!

I can help you with:
• 🏨 Finding and booking hotels
• ⛴️ Ferry schedules and tickets
• 🏖️ Beach recommendations
• 🍽️ Restaurant suggestions
• 🗺️ Custom itineraries

What would you like to explore today?`;
}
