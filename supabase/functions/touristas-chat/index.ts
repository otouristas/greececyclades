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
        let systemPrompt = `You are Touristas AI, an expert travel assistant specialized in the Greek Cyclades islands.

PERSONALITY:
- Warm, enthusiastic, and genuinely passionate about Greek island travel
- Use occasional Greek phrases (with translations) like "Γεια σου!" (Hello!)
- Give specific, actionable recommendations with prices when relevant
- Be proactive in suggesting activities but respect user preferences

KNOWLEDGE:
- Expert on all 24 Cycladic islands: Santorini, Mykonos, Paros, Naxos, Milos, Sifnos, Ios, Tinos, Syros, Andros, Amorgos, Koufonisia, Serifos, Folegandros, Sikinos, Kimolos, Antiparos, Anafi, Thirasia, Kea, Kythnos, Donousa, Schinoussa, Iraklia
- Ferry schedules between islands (Blue Star, SeaJets, Golden Star, Fast Ferries, Hellenic Seaways)
- Beach conditions, restaurants, hotels, activities
- Greek culture, food, and customs
- Current prices (2024-2025):
  * Ferry tickets: €35-75 from Athens depending on speed
  * Hotels: €50-150 budget, €100-250 mid-range, €200-600 luxury
  * Meals: €15-30 per person at tavernas

FERRYHOPPER INTEGRATION:
When users ask about ferries, mention they can book via our partner Ferryhopper at ferryhopper.com

FORMATTING:
- Use markdown for rich responses
- Use bullet points for lists
- Use **bold** for emphasis
- Keep responses concise but informative (max 250 words)`;

        if (userContext) {
            systemPrompt += `

USER CONTEXT:
- Favorite Islands: ${userContext.favoriteIslands?.join(', ') || 'Not specified'}
- Travel Style: ${userContext.travelStyle || 'Not specified'}
- Budget: ${userContext.budget || 'Not specified'}
- Previous Trips: ${userContext.pastTrips?.join(', ') || 'First-time visitor'}

Use this context to personalize your recommendations!`;
        }

        // Try Gemini API first (preferred)
        const geminiKey = Deno.env.get('GEMINI_API_KEY');

        if (geminiKey) {
            const geminiMessages = [
                { role: 'user', parts: [{ text: systemPrompt }] },
                ...messages.map(m => ({
                    role: m.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: m.content }]
                }))
            ];

            const geminiResponse = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: geminiMessages,
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 1000,
                        }
                    })
                }
            );

            if (geminiResponse.ok) {
                const data = await geminiResponse.json();
                const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, I had trouble processing that. Could you try again?';

                return new Response(
                    JSON.stringify({
                        response: aiResponse,
                        success: true,
                        model: 'gemini-2.0-flash'
                    }),
                    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            } else {
                console.error('Gemini API error:', await geminiResponse.text());
            }
        }

        // Fallback to OpenAI if Gemini fails
        const openaiKey = Deno.env.get('OPENAI_API_KEY');

        if (openaiKey) {
            const apiMessages = [
                { role: 'system', content: systemPrompt },
                ...messages
            ];

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

            if (openaiResponse.ok) {
                const data = await openaiResponse.json();
                const aiResponse = data.choices[0]?.message?.content || 'I apologize, I had trouble processing that. Could you try again?';

                return new Response(
                    JSON.stringify({
                        response: aiResponse,
                        success: true,
                        model: 'gpt-4-turbo'
                    }),
                    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }
        }

        // Final fallback response
        return new Response(
            JSON.stringify({
                response: generateFallbackResponse(messages[messages.length - 1].content),
                success: true,
                model: 'fallback'
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

Book via our partner **Ferryhopper.com** for best prices! Where are you traveling from and to?`;
    }

    if (message.includes('weather') || message.includes('when') || message.includes('season')) {
        return `Here's the best times to visit the Cyclades! ☀️

**Peak Season (July-August):**
- 30-35°C, crowded, highest prices
- Perfect beach weather, lively nightlife

**Shoulder Season (May-June, Sept-Oct):**
- 22-28°C, fewer crowds, better prices
- **Best overall value!** Good swimming weather

**Off Season (Nov-April):**
- 12-18°C, many places closed
- Great for hiking, authentic experience

What dates are you considering?`;
    }

    return `Γεια σου! 👋 I'm Touristas AI, your Greek Cyclades travel expert!

I can help you with:
• 🏨 Finding and booking hotels
• ⛴️ Ferry schedules and tickets
• 🏖️ Beach recommendations
• 🍽️ Restaurant suggestions
• 🗺️ Custom itineraries

What would you like to explore today?`;
}
