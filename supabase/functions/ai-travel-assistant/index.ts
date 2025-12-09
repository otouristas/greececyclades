import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const {
            messages,
            preferences = {},
            previousConversations = [],
            websiteContext = "",
            dateContext = "",
            ferryContext = "",
            currentQuery = "",
            hasFerryResults = false,
            capabilities = {},
        } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            throw new Error("Messages array is required");
        }

        // Try Lovable Gateway first, then Perplexity
        const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
        const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");

        if (!LOVABLE_API_KEY && !PERPLEXITY_API_KEY) {
            throw new Error("No AI API key configured. Set LOVABLE_API_KEY or PERPLEXITY_API_KEY");
        }

        // Build enhanced system prompt for Cyclades
        let systemPrompt = `You are Touristas AI, an expert travel assistant for the Cyclades Islands, Greece. You help travelers plan perfect island-hopping adventures, find hotels, ferries, activities, and hidden gems across all Cyclades islands.

CYCLADES ISLANDS COVERAGE:
- Major: Santorini, Mykonos, Naxos, Paros, Milos, Ios
- Hidden Gems: Sifnos, Folegandros, Koufonisia, Amorgos, Syros, Tinos, Serifos, Kimolos, Andros, Kea
- Small Islands: Sikinos, Anafi, Thirassia, Donousa, Schinoussa, Iraklia

CURRENT CAPABILITIES:
${capabilities.ferrySearch ? "- Ferry search and island-hopping planning" : ""}
${capabilities.hotelResearch ? "- Hotel research across all islands" : ""}
${capabilities.smartRecommendations ? "- AI-powered island matching based on preferences" : ""}
${capabilities.itineraryPlanning ? "- Multi-island itinerary creation" : ""}
- Activity recommendations via GetYourGuide integration
- Weather forecasts for travel planning
- Local insider tips and hidden gems

FERRY BOOKING (via FerryScanner integration):
The Cyclades have excellent ferry connections:
- Main hub ports: Piraeus (Athens), Rafina, Lavrio
- Inter-island hubs: Naxos, Paros (best connections)
- Ferry types: Blue Star (comfortable, slow), Seajets/Golden Star (fast, bouncy)
- Book 2-3 weeks ahead in summer (July-August)

ISLAND MATCHING GUIDE:
Help users find their perfect island based on:
- Romantic/Honeymoon → Santorini, Folegandros, Milos
- Party/Nightlife → Mykonos, Ios
- Family-friendly → Naxos, Paros
- Authentic/Local → Sifnos, Tinos, Amorgos
- Beaches → Milos, Koufonisia, Naxos
- Adventure → Amorgos (hiking), Santorini (volcano)
- Budget → Ios, Tinos, Serifos

ISLAND HOPPING TIPS:
- 7 days: 2-3 islands
- 10 days: 3-4 islands
- 14 days: 4-5 islands
- Always buffer time for ferry delays/weather
- Avoid moving every day - 2-3 nights minimum per island

`;

        // Add website context if provided
        if (websiteContext) {
            systemPrompt += `\nWEBSITE CONTEXT:\n${websiteContext}\n\n`;
        }

        // Add date context if provided
        if (dateContext) {
            systemPrompt += `\n${dateContext}\n\n`;
        }

        // Add ferry context if available
        if (ferryContext && hasFerryResults) {
            systemPrompt += `\nFERRY SEARCH RESULTS:\n${ferryContext}\n\n`;
            systemPrompt += "IMPORTANT: When discussing ferries, reference the ferry search results provided above. Include specific prices, companies, and durations.\n\n";
        }

        // Add conversation context
        if (previousConversations.length > 0) {
            systemPrompt += `\nPREVIOUS CONVERSATION:\n${previousConversations.map((c: { topic: string; summary: string }) => `- ${c.topic}: ${c.summary}`).join('\n')}\n\n`;
        }

        // Add user preferences
        if (Object.keys(preferences).length > 0) {
            systemPrompt += `\nUSER PREFERENCES:\n${JSON.stringify(preferences, null, 2)}\n\n`;
        }

        systemPrompt += `RESPONSE GUIDELINES:
- Be friendly, helpful, and conversational
- Use Greek phrases naturally (e.g., "Γεια σου!" for hello, "Ωραία!" for beautiful)
- Provide specific recommendations with prices when available
- Reference ferry results when discussing connections
- Ask about travel dates, budget, interests, and island preferences
- Suggest islands based on user's vibe (party vs quiet, beaches vs culture)
- Consider seasonality - some islands are very quiet in shoulder season
- Be honest about limitations (e.g., "Folegandros has fewer hotels, book early!")
- Format responses clearly with line breaks for readability
- Use emojis to make content scannable
- Include internal links like [Santorini Guide](/santorini) or [Ferry Planner](/ferries)
`;

        // Prepare messages for AI
        const aiMessages = [
            {
                role: "system",
                content: systemPrompt,
            },
            ...messages.map((msg: { role: string; content: string }) => ({
                role: msg.role,
                content: msg.content,
            })),
        ];

        // Use Lovable Gateway if available, otherwise Perplexity
        const useLovable = !!LOVABLE_API_KEY;

        let response: Response;

        if (useLovable) {
            console.log("Using Lovable Gateway API...");
            response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${LOVABLE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "google/gemini-2.5-flash",
                    messages: aiMessages,
                    stream: true,
                    temperature: 0.7,
                    max_tokens: 2000,
                }),
            });
        } else {
            console.log("Using Perplexity API...");
            response = await fetch("https://api.perplexity.ai/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama-3.1-sonar-large-128k-online",
                    messages: aiMessages,
                    stream: true,
                    temperature: 0.75,
                    max_tokens: 4096,
                }),
            });
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error("AI API error:", response.status, errorText);

            if (response.status === 429) {
                return new Response(
                    JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
                    { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
                );
            }

            if (response.status === 402) {
                return new Response(
                    JSON.stringify({ error: "Payment required. Please add credits." }),
                    { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
                );
            }

            throw new Error(`AI API error: ${response.status} - ${errorText}`);
        }

        // Return streaming response
        return new Response(response.body, {
            headers: {
                ...corsHeaders,
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });
    } catch (error) {
        console.error("AI travel assistant error:", error);
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : "Unknown error occurred",
            }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});
