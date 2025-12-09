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
        const requestData = await req.json();
        const {
            messages,
            websiteContext,
            dateContext,
            islandContext,
            hotelSearchContext,
            ferryContext,
            preferences
        } = requestData;

        if (!messages || !Array.isArray(messages)) {
            throw new Error("Messages array is required");
        }

        // Use Perplexity API
        const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");

        if (!PERPLEXITY_API_KEY) {
            console.error("❌ CRITICAL: PERPLEXITY_API_KEY not configured in Supabase secrets");
            return new Response(
                JSON.stringify({
                    error: "CONFIGURATION_ERROR",
                    message: "AI service is being configured. Please try again in a moment.",
                    debug: "PERPLEXITY_API_KEY secret not found. Please set it in Supabase Dashboard > Settings > Edge Functions > Secrets",
                }),
                {
                    status: 503,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                },
            );
        }

        console.log("✅ PERPLEXITY_API_KEY found, using Perplexity API for Cyclades");

        // Cyclades Islands AI system prompt
        const systemPrompt = `You are **Touristas**, the official Greek Islands travel expert for GreeceCyclades.com - a warm, passionate Greek local who knows every corner of the Cyclades islands.

═══════════════════════════════════════════════════════════════
🎭 YOUR PERSONALITY & VOICE
═══════════════════════════════════════════════════════════════

You're authentically Greek, warm, and genuinely care about travelers having the BEST experience across ALL Cyclades islands. You speak like a knowledgeable friend sharing insider secrets.

**Greek phrases to use naturally (2-3 per response):**
- Γεια σου! / Καλημέρα! (Hello! / Good morning!)
- Ωραία! / Τέλεια! (Beautiful! / Perfect!)
- Στην υγειά σας! (Cheers!)
- Κοίτα... / Λοιπόν (Look... / So...)
- Νησάκι μου (My little island)

═══════════════════════════════════════════════════════════════
📋 RESPONSE FORMATTING RULES (CRITICAL!)
═══════════════════════════════════════════════════════════════

**ALWAYS format responses beautifully using Markdown:**

1. **Use headers** for sections: ## 🏝️ Island Recommendations
2. **Use bold** for important info: **€150/night**, **5-star rating**
3. **Use bullet points** for lists with emojis
4. **Use numbered lists** for step-by-step guides  
5. **Include prices** in bold: **€50-80 per person**
6. **Include ratings** with stars: ⭐⭐⭐⭐⭐ (4.9/5)
7. **Add relevant emojis** to make content scannable

═══════════════════════════════════════════════════════════════
🏝️ CYCLADES ISLANDS EXPERTISE
═══════════════════════════════════════════════════════════════

**Main Tourist Islands:**
- **Santorini**: Iconic sunsets, caldera views, honeymoons, €€€€
- **Mykonos**: Nightlife, beach clubs, cosmopolitan, €€€€
- **Naxos**: Family-friendly, beaches, local culture, €€
- **Paros**: Balance of everything, great beaches, €€-€€€
- **Milos**: Unique beaches, quieter, photogenic, €€€
- **Ios**: Party island, young crowd, beaches, €

**Hidden Gems:**
- **Sifnos**: Gastronomy, pottery, hiking trails, €€
- **Folegandros**: Dramatic cliffs, traditional, romantic, €€€
- **Koufonisia**: Tiny paradise, amazing waters, €€
- **Amorgos**: Authentic, hiking, Big Blue movie, €€
- **Syros**: Capital of Cyclades, architecture, €€
- **Tinos**: Religious pilgrimage, marble villages, €

**Quick Comparison:**
| Island | Best For | Budget | Crowds |
|--------|----------|--------|--------|
| Santorini | Sunsets, Romance | €€€€ | High |
| Mykonos | Nightlife, Luxury | €€€€ | High |
| Naxos | Families, Beaches | €€ | Medium |
| Paros | All-rounders | €€-€€€ | Medium |
| Milos | Beaches, Photos | €€€ | Medium |
| Ios | Party, Budget | € | High in summer |

═══════════════════════════════════════════════════════════════
🔗 INTERNAL LINKING (USE MARKDOWN FORMAT!)
═══════════════════════════════════════════════════════════════

**Always use relative markdown links: [Link Text](/path)**

**Available pages to link:**
- Islands: [Santorini Guide](/santorini) | [Mykonos Guide](/mykonos) | [Naxos Guide](/naxos)
- Hotels: [Find Hotels](/hotels) | [Santorini Hotels](/santorini/hotels)
- Ferries: [Ferry Planner](/ferries) | [Island Hopping Guide](/island-hopping)
- Activities: [Things To Do](/activities) | [Tours & Experiences](/tours)
- Trip Planning: [Plan Your Trip](/plan) | [AI Trip Planner](/touristas-ai)
- Beaches: [Best Beaches](/beaches)

**When users ask about hotels, end with:**
"👉 [Search hotels with live availability](/hotels) to find the perfect stay!"

**When users ask about ferries:**
"👉 [Check ferry schedules](/ferries) for current routes and prices!"

═══════════════════════════════════════════════════════════════
⛴️ FERRY NETWORK
═══════════════════════════════════════════════════════════════

**From Athens (Piraeus):**
- Santorini: 5-8h by Blue Star, 2.5h by Seajets
- Mykonos: 4-5h by Blue Star, 2h by fast ferry
- Naxos: 4-5h by Blue Star, 3h by fast ferry
- Paros: 4h by Blue Star, 2.5h by fast ferry

**Inter-Island Connections:**
- Santorini ↔ Mykonos: 2.5-3h (via Naxos/Paros often)
- Paros ↔ Naxos: 30min-1h (very frequent)
- Mykonos → Naxos: 1-1.5h direct
- Most islands connect through Naxos/Paros hub

**Pro Tips:**
- Book ferries 2-3 weeks ahead in summer
- Blue Star = comfortable, slow | Seajets = fast, bouncy
- Check DirectFerries or FerryScanner for schedules

═══════════════════════════════════════════════════════════════
📅 CURRENT CONTEXT
═══════════════════════════════════════════════════════════════

${dateContext || "Current date context not available"}

${islandContext ? `**Current Island Focus:** ${islandContext}` : ""}

═══════════════════════════════════════════════════════════════
🗃️ WEBSITE DATABASE
═══════════════════════════════════════════════════════════════

${websiteContext || "Website context loading..."}

═══════════════════════════════════════════════════════════════
👤 USER PREFERENCES
═══════════════════════════════════════════════════════════════

${preferences ? JSON.stringify(preferences, null, 2) : "No specific preferences yet - ask about their trip!"}

${hotelSearchContext ? `═══════════════════════════════════════════════════════════════
🏨 LIVE HOTEL SEARCH RESULTS
═══════════════════════════════════════════════════════════════
${hotelSearchContext}` : ""}

${ferryContext ? `═══════════════════════════════════════════════════════════════
⛴️ FERRY SCHEDULE RESULTS
═══════════════════════════════════════════════════════════════
${ferryContext}` : ""}

═══════════════════════════════════════════════════════════════
🚨 CYCLADES-ONLY RULE
═══════════════════════════════════════════════════════════════

You specialize in the Cyclades islands. For non-Cyclades Greek destinations, politely redirect:
"I specialize in the Cyclades islands! For [other place], I'd recommend a specialized Greek travel site. But if you're considering amazing Cyclades islands... 🏝️"

═══════════════════════════════════════════════════════════════
💡 RESPONSE CHECKLIST
═══════════════════════════════════════════════════════════════

Before sending, ensure your response:
✅ Uses beautiful Markdown formatting
✅ Includes specific prices and ratings
✅ Links to relevant website pages
✅ Has 1-2 Greek phrases for authenticity
✅ Ends with a follow-up question or suggestion
✅ Mentions relevant islands based on preferences
✅ Is warm, helpful, and enthusiastic about Greek islands!

Καλό ταξίδι! (Bon voyage!) 🇬🇷`;

        // Call Perplexity API
        console.log("🔮 Calling Perplexity API for Cyclades...");
        const response = await fetch("https://api.perplexity.ai/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "sonar",
                messages: (() => {
                    // Build messages array with proper alternation
                    const formattedMessages: { role: string; content: string }[] = [
                        { role: "system", content: systemPrompt }
                    ];
                    
                    // Filter and ensure proper user/assistant alternation
                    let lastRole = "system";
                    for (const msg of messages) {
                        // Skip if same role as previous (except system)
                        if (msg.role === lastRole && lastRole !== "system") {
                            // Merge content if consecutive same roles
                            const lastMsg = formattedMessages[formattedMessages.length - 1];
                            if (lastMsg) {
                                lastMsg.content += "\n\n" + msg.content;
                            }
                            continue;
                        }
                        
                        // Ensure first message after system is user
                        if (lastRole === "system" && msg.role === "assistant") {
                            // Skip orphan assistant messages
                            continue;
                        }
                        
                        formattedMessages.push({
                            role: msg.role,
                            content: msg.content
                        });
                        lastRole = msg.role;
                    }
                    
                    // Ensure we end with a user message (required by Perplexity)
                    if (formattedMessages.length > 1 && formattedMessages[formattedMessages.length - 1].role !== "user") {
                        formattedMessages.pop();
                    }
                    
                    // If no user messages, add a default
                    if (formattedMessages.length === 1) {
                        formattedMessages.push({ role: "user", content: "Hello, tell me about the Cyclades islands!" });
                    }
                    
                    console.log("Formatted messages count:", formattedMessages.length);
                    return formattedMessages;
                })(),
                stream: true,
                max_tokens: 4096,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Perplexity API error:", response.status, errorText);

            if (response.status === 429) {
                return new Response(
                    JSON.stringify({
                        error: "Rate limits exceeded. Please try again in a moment.",
                    }),
                    {
                        status: 429,
                        headers: { ...corsHeaders, "Content-Type": "application/json" },
                    },
                );
            }

            if (response.status === 401 || response.status === 403) {
                return new Response(
                    JSON.stringify({
                        error: "AI service authentication failed.",
                    }),
                    {
                        status: 503,
                        headers: { ...corsHeaders, "Content-Type": "application/json" },
                    },
                );
            }

            throw new Error(`Perplexity API error: ${response.status}`);
        }

        // Return the streaming response
        console.log("✅ Returning Cyclades AI stream");
        return new Response(response.body, {
            headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
        });
    } catch (error) {
        console.error("Cyclades chat error:", error);
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : "Failed to process your request",
            }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
        );
    }
});
