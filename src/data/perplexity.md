Perfect. Now let me provide your comprehensive training and optimization strategy in a final summary response.

Training Touristas AI: Complete Strategy for Maximum Effectiveness
Your Touristas AI project is exceptionally well-structured. You have 300+ production-ready prompts mapped to 14 intent categories and 5 integrated APIs. Here's how to train and optimize it for excellence:

Core Training Pillars
**1. Intent Routing Architecture **

Your system needs a three-tier intent detection engine:

Tier 1: Classify into primary category (FERRIES, HOTELS, ACTIVITIES, WEATHER, GUIDES, RENT_CAR, EMERGENCY)

Tier 2: Sub-intent within category (SEARCH, FILTER, COMPARE, TROUBLESHOOT, ADVICE)

Tier 3: Context preservation for multi-turn flows

Use Perplexity API's function calling with structured outputs—not text instructions in prompts. This guarantees valid JSON routing and prevents parameter ambiguity.​

**2. Prompt Layering Strategy **

Don't use one monolithic system prompt. Instead, use specialized prompts for each function:

Detection Prompt: Identifies user intent and missing fields

Search Prompt: Executes API call with validated parameters

Enrichment Prompt: Adds context (weather, alternatives, recommendations)

Constraint Prompt: Enforces safety guardrails (prevents hallucinations)

This modular approach improves accuracy because each prompt focuses on one task.​

**3. Missing Field Resolution **

Your prompts intelligently identify missing fields. Train your system to resolve them naturally:

text
Bad: "Please provide: passengers, return date."
Good: "Just you or traveling with family/friends?"
Implement a field extraction logic that asks contextually and accepts partial responses. Don't re-ask for fields already provided in conversation history.​

**4. Hallucination Prevention: Zero-Tolerance Strategy **

Travel advice cannot have false information. Implement deterministic grounding:

API-First: Always fetch real data from Ferryhopper, LiteAPI, WeatherAPI

Source Attribution: Never claim information without citing the source

Constraint Enforcement: Use validation rules to catch bad requests early​

Example:

text
User: "What's the cheapest ferry company?"
AI checks: Ferryhopper API first
If available: "According to Ferryhopper, Seajets is often $2-5 cheaper than Blue Star"
If not: "I don't have real-time price comparisons. Here's what I found from reviews..."
Never: "Company X is cheapest" (without source)
Deploy a zero-hallucination testing process before launch. Test with queries like:

"Best kept secret beach in Milos?" (verify Perplexity citations)

"Can I bring my car on ferries?" (validate against ferry operator rules)

"Is Samaria Gorge open in December?" (check current seasonal closures)

**5. Context Management Across Turns **

Travel planning is multi-turn. Maintain a session object that persists:

User preferences (budget, group size, language)

Active search state (origin, destination, dates)

Conversation history (last 10 turns)

Saved searches (quick reference)

Train AI to infer implicit references: User says "And hotels there?" → AI knows "there" = destination from previous query.

Testing Framework: Three-Layer Validation
**Layer 1: Accuracy Testing **​

Run each of your 300 prompts through the routing system

Verify correct intent classification (>95% accuracy target)

Ensure API triggers are correct (Ferryhopper for ferries, LiteAPI for hotels, etc.)

Check no hallucinated data is returned

**Layer 2: Consistency Testing **​

Same query, multiple runs → identical routing

Different phrasings of same intent → same API trigger

Example test set: "Ferries Santorini to Ios" + "I need a boat Santorini to Ios" + "Ferry options: Santorini→Ios" → All trigger Ferryhopper

**Layer 3: Edge Case Testing **​

Typos: "Ferrys from Milos"

Invalid locations: "Ferry to Atlantis"

Ambiguous intents: "Show me boats" (ferry vs. boat tour?)

Conflicting requests: "Cheapest luxury hotels"

Multi-step flows: "Ferry + hotel + activity for 5 days"

Testing Tools:​

Custom ChatGPT: Simulate diverse personas (backpacker, couple, family)

Google Sheets + GPT-4: Automated test harness for 300 prompts

Staged Environment: Live user simulation before production

Prompt Optimization Checklist
For each of your 14 categories, validate:

✅ Clarity: Can Touristas instantly identify intent?

✅ Completeness: Does it tell AI what to ask next?

✅ Ambiguity Handling: Ferry vs. boat tour—how does it differentiate?

✅ Error Handling: Invalid islands, fake dates, vague queries?

✅ Fallback Logic: When does Perplexity take over?

✅ Tone Consistency: Expert travel agent, not generic chatbot?

✅ Source Attribution: All info verifiable by users?

API Integration Patterns
Use function calling to route to the right API deterministically:​

text
Intent: "Show ferries from Paros to Naxos"
→ Classify as FERRIES_SEARCH
→ Call function: search_ferries(origin="Paros", destination="Naxos", date=?, passengers=?)
→ Missing passengers → Ask clarification
→ Once complete → Call Ferryhopper API
→ Enrich with weather context
→ Return structured response
Error Recovery Pattern:

Attempt 1: Ferryhopper API

Attempt 2: Alternative ferry operators

Fallback 3: Perplexity for informational response

Domain-Specific Training Focus
Your AI should be obsessed with Cyclades knowledge:

Ferry companies (Blue Star, Seajets, Golden Star)

Island personalities (Mykonos=nightlife, Santorini=tourists, Naxos=food, Paros=beaches)

Meltemi season (July–Sept, affects ferry safety)

Seasonal patterns (July–Aug expensive/crowded, Nov–Feb rough seas)

Production Monitoring Dashboard
Track these metrics post-launch:

Metric	Target
Intent Accuracy	>95%
API Success Rate	>90%
Hallucination Rate	0%
Missing Field Resolution	<2 turns
User Satisfaction	>85%
Response Time	<2s
Your Immediate Next Steps
Map 300 prompts to intents: Categorize into 14 buckets, identify overlaps

Build intent detection prototype: Test with 20 prompts, verify routing accuracy

Create test suite: Use Google Sheets to validate all 300 against expected outcomes

Implement field resolution logic: Define required parameters per API trigger

Test hallucination risks: Ask 20 tricky questions, verify zero false info

Set up monitoring: Create metrics dashboard before launch

Two comprehensive guides have been created for you:

— The Touristas AI Training Framework covers system architecture, intent routing, prompt engineering, context management, testing methodology, hallucination prevention, and domain-specific knowledge.

— The Technical Integration Guide provides function calling patterns, handler implementation, multi-turn context management, error handling, structured outputs, and production deployment checklists.

Your 300 prompts are excellent seeds. Train systematically, test relentlessly, and deploy with zero tolerance for hallucinations. Touristas AI will become the most reliable Cyclades travel assistant on the market.

Touristas AI Training Framework
A Strategic Guide to Maximizing Your Cyclades-First Conversational Engine
PART 1: SYSTEM ARCHITECTURE & INTENT ROUTING
1.1 Intent Classification Layer
Your 300+ prompts naturally organize into 14 distinct intent categories (A–N). Before training, establish a robust intent detection system:

Multi-Tier Intent Detection:

Tier 1 (Primary): Detect category (Ferry, Hotel, Activity, Weather, etc.)

Tier 2 (Secondary): Detect sub-intent within category (booking vs. information)

Tier 3 (Contextual): Preserve conversation context across multi-turn flows

Implementation Strategy:
Use Perplexity API's function calling with structured outputs to route deterministically:

text
Intent Schema:
{
  "primary_intent": "FERRIES | HOTELS | ACTIVITIES | WEATHER | ...",
  "secondary_intent": "SEARCH | FILTER | TROUBLESHOOT | ADVICE",
  "required_parameters": {}, // departure, dates, passengers, etc.
  "api_trigger": "Ferryhopper | LiteAPI | GetYourGuide | Weather | Perplexity",
  "missing_fields": [] // Ask user to clarify
}
1.2 API Orchestration Logic
Your system has 5 primary API endpoints:

Ferryhopper: Ferry availability, pricing, scheduling

LiteAPI: Hotel search, availability, reviews

GetYourGuide: Activities, tours, bookings

Weather API: Meltemi, wind, conditions

Perplexity API: Information, comparisons, travel advice

Routing Rules:

Ferries → Ferryhopper first (real-time), fallback to Perplexity (info)

Hotels → LiteAPI first (inventory), fallback to Perplexity (advice)

Activities → GetYourGuide first (bookable), fallback to Perplexity (details)

Weather → Weather API always, contextualize with Ferryhopper/safety

Travel Advice → Perplexity (deep research with citations)

PART 2: PROMPT ENGINEERING FOR MAXIMUM ACCURACY
2.1 System Prompt Structure
Create a master system prompt that anchors Touristas AI's behavior:

text
You are Touristas AI, a Cyclades-travel specialist conversational engine. 
Your role is to provide accurate, real-time information about ferries, 
accommodations, activities, and travel conditions in the Cyclades, Piraeus, and Crete.

CORE DIRECTIVES:
1. Always ground responses in real data from APIs (Ferryhopper, LiteAPI, GetYourGuide, Weather).
2. When APIs don't have data, use Perplexity for context-grounded research.
3. Never hallucinate ferry schedules, hotel availability, or prices.
4. Ask clarifying questions for missing fields (passengers, dates, preferences).
5. Preserve conversation context across multi-turn exchanges.
6. Provide citations and sources for informational claims.
7. Tone: Friendly, enthusiastic about Cycladic travel, expert but approachable.

PERSONALITY:
- You're excited about helping travelers discover the Cyclades.
- You know the quirks: Meltemi winds, ferry delays, hidden beaches, local tavernas.
- You're honest when information isn't available.
2.2 Prompt Layering Strategy
For each category, use separate, specialized prompts rather than one monolithic prompt:

Example: Ferry Booking Intent

text
DETECTION PROMPT:
"Is this user asking about ferry availability, pricing, routes, or troubleshooting? 
Classify as: SEARCH | FILTER | COMPARE | TROUBLESHOOT. Respond in JSON."

SEARCH PROMPT:
"The user wants ferries from {origin} to {destination} on {date}. 
Call Ferryhopper with these parameters. If passengers are missing, ask the user."

ENRICHMENT PROMPT:
"The user selected a ferry. Now provide:
- Arrival/departure times
- Duration
- Passenger capacity
- Pricing tiers (standard, premium, cabin)
- Special amenities (AC, Wi-Fi, food)
- Booking link"

CONTEXT PROMPT:
"Given Meltemi winds of {beaufort_scale} and wave height {meters}, 
is this ferry safe? Should we suggest alternatives?"
This layered approach prevents prompt bloat and improves accuracy by letting each step focus on one task.

PART 3: HANDLING MISSING FIELDS & MULTI-TURN FLOWS
3.1 Graceful Field Resolution
Your prompts identify missing fields. Train Touristas AI to ask in natural, context-aware ways:

Bad: "Please provide: passengers, travel date, return date."
Good: "How many of you are traveling? And which Friday works best?"

Implementation:

text
FIELD RESOLUTION LOGIC:
1. Detect missing field (e.g., passengers for ferry search)
2. Craft contextual follow-up: 
   - For ferries: "Just you or bringing friends/family?"
   - For hotels: "Are you solo, couple, or group?"
   - For activities: "How many people will join the tour?"
3. Accept partial responses (user says "two" → mark passengers=2, proceed)
4. Don't re-ask fields already provided in conversation history
3.2 Context Management Across Turns
Travel planning is multi-turn. Preserve state aggressively:

Session Context Object:

json
{
  "conversation_id": "uuid",
  "user_preferences": {
    "origin": "Piraeus",
    "destinations_visited": ["Mykonos", "Naxos"],
    "budget_range": "mid",
    "travel_style": "island_hopping",
    "group_size": 2,
    "language": "en"
  },
  "current_search": {
    "category": "FERRIES",
    "from": "Paros",
    "to": "Naxos",
    "date": "2025-12-20",
    "passengers": 2
  },
  "previous_queries": [
    "Show ferries from Piraeus to Paros",
    "Hotels in Paros near Naousa"
  ],
  "conversation_turns": [
    {
      "user": "Show me ferries from Mykonos to Paros",
      "ai_intent": "FERRIES_SEARCH",
      "ai_response": "...",
      "timestamp": "2025-12-10T15:00:00Z"
    }
  ]
}
Best Practice: After each turn, update session context. Refer back to prior queries:

User: "What about hotels there?"

AI understands: "there" = Paros (from previous query)

PART 4: TESTING FRAMEWORK
4.1 Prompt Testing Methodology
Use prompt-driven testing with three evaluation layers:

Layer 1: Accuracy Testing

text
Test Scenario: Ferry Search
Input: "Show me ferries from Santorini to Ios tomorrow."
Expected Output:
  ✅ Calls Ferryhopper API
  ✅ Detects missing: passengers
  ✅ Asks: "How many travelers?"
  ✅ Returns real ferry options with times, prices
  ✅ No hallucinated schedules

Metrics:
- Accuracy: 100% (no false ferry info)
- Precision: All returned ferries actually exist
- Completeness: Includes departure, arrival, price
- Relevance: Only Santorini→Ios routes shown
Layer 2: Consistency Testing

text
Same input, multiple runs → identical routing logic
Same intent, different phrasing → same API trigger

Test Suite:
1. "Ferries Santorini to Ios"
2. "I need a boat from Santorini to Ios"
3. "Ferry options: Santorini→Ios"
4. "Show me ferries between Santorini and Ios"

All should → Ferryhopper API + missing passenger detection
Layer 3: Edge Case Testing

text
Test Difficult Scenarios:
1. Ambiguous intent: "Show me boats" → Ask: Ferry or boat tour?
2. Invalid location: "Ferries to Atlantis" → Respond: "Atlantis isn't a Cycladic island. Did you mean Mykonos?"
3. Conflicting filters: "Cheapest luxury hotels" → Clarify budget
4. Multi-step request: "Ferry + hotel + activity for 5 days" → Break into sub-requests
5. Vague dates: "Next month sometime" → Suggest specific dates based on weather/events
4.2 Testing Tools & Execution
Set up a testing workflow:

Tool 1: Custom ChatGPT Test Suite

Create a Custom GPT that simulates diverse user personas

Test personas: Budget backpacker, luxury couple, family, solo explorer, digital nomad

Each persona asks your 300 prompts in realistic conversational flows

Document failures and refinements

Tool 2: Automated Test Harness
Use Google Sheets + GPT-4 integration:

Column A: Your 300 prompts

Column B: Expected intent classification

Column C: Required API trigger

Column D: Test response

Column E: PASS/FAIL

Sample automated test:

text
Prompt: "Plan me an island-hopping route from Naxos → Paros → Santorini next week."
Expected Intent: FERRIES_MULTI_LEG_PLANNING
API Trigger: Ferryhopper (routes) + Perplexity (optimization)
Test Response: [API calls logged] ✅ PASS
Tool 3: Live User Simulation

Deploy Touristas AI to a staging environment

Simulate real user conversations with varying:

Language proficiency

Query clarity

Multi-turn complexity

Intent switching (start ferry search, then ask hotel advice)

Log all interactions and failures

PART 5: HALLUCINATION PREVENTION
5.1 The Zero-Hallucination Strategy
Travel advice cannot have false information. Implement deterministic grounding:

Strategy 1: API-First Answers
Never answer from LLM knowledge alone. Always:

Try to fetch real data from Ferryhopper, LiteAPI, WeatherAPI

If API returns results, present them with source attribution

If API has no data, use Perplexity with search_domain_filter to find credible sources

Example:

text
User: "What's the best ferry company?"
Touristas Response:
- Attempts: Ferryhopper (company ratings)
- If available: Show top-rated company from real data
- If not available: Perplexity search → "According to reviews from X source, Blue Star and Seajets are most reliable"
- Never: "Company Y is the best" (without source)
Strategy 2: Constraint-Based Responses
For knowledge-based prompts, enforce constraints:

text
HOTEL ADVICE PROMPT:
"The user asked for romantic hotels in Santorini.
Return ONLY hotels that exist in LiteAPI database.
For each, cite: Name, Location, Rating, Real Price.
If a user mentions a hotel not in database, say: 
'I couldn't verify [Hotel Name] in current listings. 
Here are verified romantic stays in your budget:'"
Strategy 3: Confidence Scoring
Train AI to signal uncertainty:

text
User: "Is the Samaria Gorge open in December?"
Response: 
"I'm checking current status... [Query Weather API + Perplexity]
Based on recent reports: Samaria typically closes November–March.
⚠️ For current conditions, I'd verify directly with Crete tourism board 
before planning, as conditions change seasonally."
5.2 Continuous Feedback Loop
After each response, log:

User satisfaction (thumbs up/down)

Factual accuracy (if user corrects you, learn)

Source citations (track what was verifiable)

Use feedback to refine prompts monthly.

PART 6: DOMAIN-SPECIFIC TRAINING FOCUS
6.1 Cyclades-Specific Knowledge Anchors
Your system should be obsessed with these facts:

Ferry Knowledge:

Ferry companies (Blue Star, Seajets, Golden Star Ferries, Hellenic Seaways)

Key ports (Piraeus, Rafina, Mykonos, Paros, Naxos, Santorini)

Meltemi season (July–September, winds affect ferries)

High-speed vs. conventional ferries (speed/comfort tradeoff)

Ferry delays common? Yes (especially in summer)

Island Characteristics:

Mykonos: Nightlife, expensive, party scene

Santorini: Tourists, sunset in Oia, volcanic beaches

Naxos: Quieter, good for families, best food, marble

Paros: Beach towns, Naousa, windsurfing

Ios: Party island, younger crowd

Milos: Remote, geological, hidden gems

Folegandros: Quiet, authentic, limited tourism

Weather Patterns:

Meltemi season strength varies by island

High UV (sunscreen essential)

Wet season November–February (not ideal ferries)

Summer peak: July–August (expensive, crowded)

6.2 Training Data Specificity
Your 300 prompts are excellent seeds. Expand them:

Expansion Strategy:

Linguistic Variation: For each prompt, generate 2–3 paraphrases

"Show me ferries from Piraeus to Mykonos this Friday"

"I need a boat Piraeus → Mykonos, Friday"

"Ferry options: Piraeus to Mykonos, coming Friday?"

Contextual Variants: Add prior context

Prompt alone: "Hotels in Paros"

With context: "I'm flying to Paros next week from Athens. Hotels in Paros?"

(AI should now infer arrival date, travel style)

Error Scenarios: Train on bad inputs

Typos: "Ferrys from Milos"

Vague dates: "Sometime next month"

Invalid islands: "Ferry to Cyprus" (not Cyclades)

Conflicting requests: "Cheapest luxury hotels"

Multi-Turn Chains: String together related prompts

Turn 1: "Ferry from Piraeus to Santorini?"

Turn 2: "What hotels near the port?"

Turn 3: "Activities in Fira?"

Turn 4: "Weather forecast?"

PART 7: PROMPT OPTIMIZATION CHECKLIST
7.1 Pre-Deployment Validation
For Each Prompt Category (A–N):

 Clarity: Can Touristas instantly identify the intent?

Test: "What API does this trigger?"

 Completeness: Does the prompt tell AI what to ask next?

Test: "If passengers aren't mentioned, what should AI ask?"

 Ambiguity Handling: Does it manage overlapping intents?

Test: "Ferry vs. boat tour—how does AI differentiate?"

 Error Handling: Does it handle invalid/missing data?

Test: "What if the user gives a fake island name?"

 Fallback Logic: Does it know when to use Perplexity?

Test: "If Ferryhopper has no results, does it explain why?"

 Tone Consistency: Is personality preserved?

Test: "Does AI sound like an expert travel agent or a chatbot?"

 Source Attribution: Does it cite where info comes from?

Test: "Can user verify ferry prices, hotel reviews, activity details?"

7.2 Performance Metrics Dashboard
Track these metrics post-launch:

Metric	Target	Method
Intent Accuracy	>95%	Compare detected vs. human-labeled intent
API Success Rate	>90%	Track successful API calls vs. failures
Missing Field Resolution	<2 turns	Avg. turns to get all required params
Hallucination Rate	0%	Human review of factual claims
User Satisfaction	>85%	Thumbs up/down post-response
Response Time	<2s	API call latency + response generation
Context Preservation	99%	Multi-turn flows maintain session state
PART 8: IMPLEMENTATION ROADMAP
Phase 1: Foundation (Weeks 1–2)
 Finalize intent taxonomy (14 categories verified)

 Build master system prompt

 Create API routing schema (functions, fallbacks)

 Set up testing harness (Google Sheets + Perplexity)

Phase 2: Training (Weeks 3–4)
 Test all 300 prompts against routing logic

 Fix ambiguous/overlapping intents

 Validate API trigger accuracy

 Test edge cases, typos, invalid inputs

 Refine system prompts based on failures

Phase 3: Refinement (Weeks 5–6)
 Deploy to staging environment

 Run live user simulations (diverse personas)

 Test multi-turn conversation flows

 Document hallucinations and fix via constraints

 Measure metrics from Section 7.2

Phase 4: Launch & Monitor (Week 7+)
 Deploy to production

 Monitor intent classification accuracy

 Track hallucination rate (should be 0%)

 Collect user feedback loops

 Monthly prompt refinement based on failure patterns

PART 9: YOUR NEXT STEPS
Map Your Prompts to Intents: Categorize all 300 into the 14 intent buckets. Identify overlaps.

Prototype Intent Detection: Build a small test: 20 prompts → intent classification → API routing. Verify accuracy.

Build Test Suite: Use the testing tools (Google Sheets, Custom GPT). Run Batch 1 (150 prompts) through it.

Define Missing Field Resolution: For each API trigger, list required parameters. Train AI to ask in natural ways.

Test Hallucination Risks: Ask Touristas AI tricky questions:

"What ferry company is cheapest?" (Should use Ferryhopper, not LLM knowledge)

"Best kept secret beach in Milos?" (Should use Perplexity with sources)

"Can I bring my car on ferries?" (Should answer accurately with rules)

Create Monitoring Dashboard: Implement the metrics from Section 7.2 before launch.

Conclusion
Touristas AI has the foundation to become the best Cyclades travel assistant on the market. Your 300 prompts are excellent seeds. Train your system by:

Routing intent correctly to the right API

Testing relentlessly against edge cases

Preventing hallucinations with constraints & real data

Preserving context across multi-turn flows

Monitoring continuously post-launch

The result: travelers trust Touristas AI because it's accurate, fast, and deeply knowledgeable about the Cyclades.

Touristas AI: Technical Integration Guide
API Handlers, Function Calling Patterns & Real-World Implementation
PART 1: FUNCTION CALLING ARCHITECTURE
1.1 Why Function Calling Over Prompt Instructions
Perplexity API's function calling is more reliable than embedding API instructions in prompts.

Why?

Parameters are guaranteed valid JSON

Router can validate schema before API call

Fallback handling is deterministic

Easier to test and audit

DO THIS:

json
{
  "type": "function_calling",
  "functions": [
    {
      "name": "search_ferries",
      "description": "Search for ferry routes between Cycladic islands",
      "parameters": {
        "type": "object",
        "properties": {
          "origin": {"type": "string", "enum": ["Piraeus", "Paros", "Mykonos", "Naxos", "Santorini", "Ios", "Milos", "Folegandros", "Serifos", "Syros", "Tinos", "Amorgos", "Koufonisia", "Sifnos"]},
          "destination": {"type": "string", "enum": [...]},
          "departure_date": {"type": "string", "format": "YYYY-MM-DD"},
          "passengers": {"type": "integer", "minimum": 1, "maximum": 10},
          "return_date": {"type": "string", "format": "YYYY-MM-DD", "nullable": true}
        },
        "required": ["origin", "destination", "departure_date", "passengers"]
      }
    },
    {
      "name": "search_hotels",
      "description": "Search for hotels in Cycladic islands",
      "parameters": {
        "type": "object",
        "properties": {
          "location": {"type": "string"},
          "check_in": {"type": "string", "format": "YYYY-MM-DD"},
          "check_out": {"type": "string", "format": "YYYY-MM-DD"},
          "guests": {"type": "integer", "minimum": 1},
          "max_price": {"type": "number", "nullable": true},
          "amenities": {"type": "array", "items": {"type": "string"}}
        },
        "required": ["location", "check_in", "check_out", "guests"]
      }
    }
  ]
}
DON'T DO THIS:

text
"Please search for ferries. Include origin, destination, date in your response."
(Unstructured, harder to validate, prone to format errors)
1.2 Handler Implementation Pattern
For each function, create a handler that:

Validates parameters

Calls the API

Enriches response with context

Catches errors gracefully

Example: Ferry Search Handler

python
async def handle_search_ferries(origin, destination, departure_date, passengers, return_date=None):
    """
    Handler for ferry searches.
    Calls Ferryhopper API, enriches with weather/safety context.
    """
    
    # Step 1: Validate parameters
    valid_islands = ["Piraeus", "Paros", "Mykonos", "Naxos", "Santorini", ...]
    if origin not in valid_islands or destination not in valid_islands:
        return {"error": f"Invalid island. Valid options: {valid_islands}"}
    
    if origin == destination:
        return {"error": "Origin and destination cannot be the same"}
    
    # Step 2: Call Ferryhopper API
    try:
        ferries = await ferryhopper_api.search_routes(
            origin=origin,
            destination=destination,
            date=departure_date,
            passengers=passengers,
            return_date=return_date
        )
    except APIError as e:
        return {"error": f"Ferry search failed: {e.message}", "fallback": "Perplexity"}
    
    # Step 3: Enrich with context (weather, route info)
    enriched_ferries = []
    weather = await weather_api.get_forecast(destination, departure_date)
    
    for ferry in ferries:
        enriched_ferries.append({
            "company": ferry.company,
            "departure": ferry.departure_time,
            "arrival": ferry.arrival_time,
            "duration": ferry.duration,
            "passengers_available": ferry.seats_available,
            "price": ferry.price,
            "amenities": ferry.amenities,
            "weather_impact": assess_weather_impact(ferry.route, weather),
            "booking_url": ferry.booking_link
        })
    
    # Step 4: Return with metadata
    return {
        "status": "success",
        "origin": origin,
        "destination": destination,
        "date": departure_date,
        "results": enriched_ferries,
        "result_count": len(enriched_ferries),
        "weather_warning": weather.beaufort_scale > 6
    }
PART 2: INTENT DETECTION & ROUTING
2.1 Intent Detection Prompt (Tier 1)
This runs first, before any API calls.

text
SYSTEM PROMPT - INTENT DETECTION:

You are an intelligent travel intent classifier for Touristas AI.
Your ONLY job is to identify what the user wants and determine which API to call.

USER MESSAGE: {user_input}
CONVERSATION HISTORY: {recent_messages}

Classify the intent as JSON. REQUIRED fields:

{
  "primary_category": "FERRIES" | "HOTELS" | "ACTIVITIES" | "WEATHER" | "GUIDES" | "RENT_CAR" | "EMERGENCY",
  "sub_intent": "SEARCH" | "FILTER" | "COMPARE" | "TROUBLESHOOT" | "ADVICE" | "BOOKING",
  "detected_parameters": {
    "origin": "Paros" or null,
    "destination": "Naxos" or null,
    "dates": ["2025-12-20"] or null,
    "passengers": 2 or null,
    "preferences": {...} or null
  },
  "missing_required_fields": ["passengers", "return_date"],
  "confidence": 0.95,
  "api_trigger": "Ferryhopper" | "LiteAPI" | "GetYourGuide" | "WeatherAPI" | "Perplexity",
  "next_action": "CALL_API" | "ASK_CLARIFICATION"
}

If the user's intent is unclear, return:
{
  "confidence": 0.45,
  "ambiguity": "User could want ferry search OR boat tour",
  "clarification_needed": "Are you looking for ferry routes or water activities?"
}

RULES:
- If required parameters are missing, return next_action="ASK_CLARIFICATION"
- Always extract location names, dates, and numbers from user message
- Preserve context from conversation history (don't re-ask for origin if already established)
- If intent matches multiple categories, pick the PRIMARY one
2.2 Router Logic (Pseudocode)
python
async def route_user_intent(user_message, session_context):
    """
    Main routing logic for Touristas AI.
    """
    
    # Step 1: Detect intent with Perplexity
    intent_response = await perplexity_api.classify_intent(
        user_message=user_message,
        conversation_history=session_context.recent_messages,
        system_prompt=INTENT_DETECTION_PROMPT
    )
    
    intent_data = json.loads(intent_response)
    
    # Step 2: Check if we have required parameters
    if intent_data["next_action"] == "ASK_CLARIFICATION":
        return {
            "action": "RESPOND",
            "response": f"I'd love to help! {intent_data['clarification_needed']}",
            "missing_fields": intent_data["missing_required_fields"]
        }
    
    # Step 3: Route to appropriate API handler
    if intent_data["api_trigger"] == "Ferryhopper":
        return await handle_search_ferries(**intent_data["detected_parameters"])
    
    elif intent_data["api_trigger"] == "LiteAPI":
        return await handle_search_hotels(**intent_data["detected_parameters"])
    
    elif intent_data["api_trigger"] == "GetYourGuide":
        return await handle_search_activities(**intent_data["detected_parameters"])
    
    elif intent_data["api_trigger"] == "WeatherAPI":
        return await handle_weather_query(**intent_data["detected_parameters"])
    
    elif intent_data["api_trigger"] == "Perplexity":
        return await handle_research_query(user_message, intent_data)
    
    else:
        return {"error": "Unknown API trigger"}
PART 3: MULTI-TURN CONTEXT MANAGEMENT
3.1 Session State Schema
Every conversation has a session object that persists across turns.

json
{
  "session_id": "uuid-1234-5678",
  "created_at": "2025-12-10T10:00:00Z",
  "user_profile": {
    "language": "en",
    "origin_country": "Germany",
    "travel_style": "budget" | "mid" | "luxury",
    "group_size": 2,
    "group_composition": "couple" | "family" | "friends" | "solo"
  },
  "active_search": {
    "type": "ferry" | "hotel" | "activity" | null,
    "origin": "Paros",
    "destination": "Naxos",
    "check_in": "2025-12-20",
    "check_out": "2025-12-24",
    "passengers": 2
  },
  "conversation_history": [
    {
      "turn": 1,
      "user_message": "Show me ferries from Paros to Naxos next week",
      "detected_intent": "FERRIES_SEARCH",
      "ai_response": "How many travelers? Just you or bringing family?",
      "timestamp": "2025-12-10T10:00:00Z"
    },
    {
      "turn": 2,
      "user_message": "Two of us",
      "detected_intent": "PARAMETER_CLARIFICATION",
      "extracted_parameter": {"passengers": 2},
      "ai_response": "[Calls Ferryhopper] Here are ferries for 2 passengers...",
      "timestamp": "2025-12-10T10:05:00Z"
    }
  ],
  "saved_searches": {
    "ferries_paros_naxos": {...},
    "hotels_naxos_town": {...}
  }
}
3.2 Context Preservation Rules
python
async def preserve_context(user_message, session_context):
    """
    Update session state after each turn.
    """
    
    # Rule 1: Extract new parameters from message
    new_params = extract_entities(user_message)
    session_context.active_search.update(new_params)
    
    # Rule 2: Infer implicit references
    if user_message == "And hotels there?":
        # "there" refers to active_search.destination
        return {"location": session_context.active_search.destination}
    
    # Rule 3: Track conversation flow
    session_context.conversation_history.append({
        "turn": len(session_context.conversation_history) + 1,
        "user_message": user_message,
        "timestamp": datetime.now()
    })
    
    # Rule 4: Keep last 10 turns (memory limit)
    if len(session_context.conversation_history) > 10:
        session_context.conversation_history = session_context.conversation_history[-10:]
    
    # Rule 5: Reset active_search if intent switches
    new_intent = await perplexity_api.detect_intent(user_message)
    if new_intent != session_context.active_search.type:
        session_context.active_search = {}
PART 4: ERROR HANDLING & FALLBACK LOGIC
4.1 API Failure Patterns & Recovery
python
async def handle_ferries_with_fallback(origin, destination, date, passengers):
    """
    Try Ferryhopper first. If it fails, use Perplexity as fallback.
    """
    
    try:
        # Attempt 1: Ferryhopper (real-time data)
        result = await ferryhopper_api.search_routes(...)
        if result["status"] == "success" and len(result["ferries"]) > 0:
            return result
        else:
            # No results found
            raise NoResultsError(f"No ferries found for {origin} → {destination} on {date}")
    
    except (APIError, TimeoutError, NoResultsError) as e:
        # Fallback 1: Try alternative ferry operators
        try:
            operators = ["BlueStarFerries", "Seajets", "GoldenStarFerries"]
            for op in operators:
                alt_result = await op.search(...)
                if alt_result:
                    return {
                        "status": "success_via_fallback",
                        "primary_api": "Ferryhopper",
                        "fallback_source": op,
                        "ferries": alt_result
                    }
        except:
            pass
        
        # Fallback 2: Perplexity (informational response)
        perplexity_response = await perplexity_api.query(
            f"What are ferry options from {origin} to {destination}? " \
            f"What companies operate this route? Typical prices and durations?",
            search_domain_filter=["ferryhopper.com", "bluestarferries.com", "seajets.gr"]
        )
        
        return {
            "status": "fallback_to_perplexity",
            "primary_api_status": str(e),
            "response": perplexity_response,
            "message": f"Real-time ferry data unavailable. Here's what I found about {origin}→{destination}:"
        }
4.2 Validation & Constraints
python
def validate_ferry_parameters(origin, destination, date, passengers):
    """
    Pre-flight checks before API call.
    Prevents hallucinations by catching bad requests early.
    """
    
    errors = []
    
    # Check 1: Valid islands
    valid_islands = CYCLADES_ISLANDS + ["Piraeus", "Crete"]
    if origin not in valid_islands:
        errors.append(f"'{origin}' is not a valid Cycladic island. Did you mean {find_closest_match(origin)}?")
    
    if destination not in valid_islands:
        errors.append(f"'{destination}' is not a valid Cycladic island. Did you mean {find_closest_match(destination)}?")
    
    # Check 2: Different origin/destination
    if origin == destination:
        errors.append("Origin and destination must be different islands")
    
    # Check 3: Valid date
    try:
        travel_date = datetime.fromisoformat(date)
        if travel_date < datetime.now():
            errors.append("Travel date cannot be in the past")
        if travel_date > datetime.now() + timedelta(days=365):
            errors.append("Travel date is too far in the future (max 365 days)")
    except ValueError:
        errors.append(f"Invalid date format. Use YYYY-MM-DD")
    
    # Check 4: Valid passengers
    if passengers < 1 or passengers > 10:
        errors.append(f"Passengers must be between 1 and 10. You specified: {passengers}")
    
    return {"valid": len(errors) == 0, "errors": errors}
PART 5: STRUCTURED OUTPUT FOR CONSISTENCY
5.1 Response Schema
Every API response follows this format:

json
{
  "request_id": "uuid",
  "api_source": "Ferryhopper",
  "status": "success" | "partial_results" | "error" | "fallback",
  "timestamp": "2025-12-10T10:05:00Z",
  
  "data": {
    "ferries": [
      {
        "id": "ferry_001",
        "company": "Blue Star Ferries",
        "route": "Paros → Naxos",
        "departure": "07:00",
        "arrival": "08:45",
        "duration": "1h 45m",
        "ferry_type": "conventional" | "highspeed",
        "capacity": {"total": 500, "available": 125},
        "price": {
          "amount": 25.50,
          "currency": "EUR",
          "per": "passenger"
        },
        "amenities": ["AC", "Restaurant", "WiFi"],
        "booking_url": "https://..."
      }
    ],
    "result_count": 5,
    "filters_applied": {
      "date": "2025-12-20",
      "passengers": 2
    }
  },
  
  "metadata": {
    "weather_impact": {
      "beaufort_scale": 4,
      "wave_height_m": 1.5,
      "recommendation": "Safe for all ferry types"
    },
    "time_to_fetch": "0.85s",
    "cache_hit": false
  },
  
  "error": null,
  "message": "Found 5 ferries for 2 passengers from Paros to Naxos on 2025-12-20"
}
PART 6: TESTING HANDLERS
6.1 Unit Tests
python
import pytest
from handlers import handle_search_ferries

@pytest.mark.asyncio
async def test_valid_ferry_search():
    result = await handle_search_ferries(
        origin="Paros",
        destination="Naxos",
        departure_date="2025-12-20",
        passengers=2
    )
    assert result["status"] == "success"
    assert len(result["data"]["ferries"]) > 0
    assert all(f["route"] == "Paros → Naxos" for f in result["data"]["ferries"])

@pytest.mark.asyncio
async def test_invalid_island():
    result = await handle_search_ferries(
        origin="Atlantis",
        destination="Naxos",
        departure_date="2025-12-20",
        passengers=2
    )
    assert result["status"] == "error"
    assert "Atlantis" in result["error"]

@pytest.mark.asyncio
async def test_same_origin_destination():
    result = await handle_search_ferries(
        origin="Naxos",
        destination="Naxos",
        departure_date="2025-12-20",
        passengers=2
    )
    assert result["status"] == "error"
    assert "cannot be the same" in result["error"]

@pytest.mark.asyncio
async def test_missing_passengers():
    # Should trigger clarification
    intent = await detect_intent("Show ferries from Paros to Naxos")
    assert intent["missing_required_fields"] == ["passengers"]
6.2 Integration Tests
python
@pytest.mark.asyncio
async def test_multi_turn_ferry_booking():
    session = create_session()
    
    # Turn 1: Initiate ferry search
    turn1 = await route_intent("Show me ferries from Paros to Naxos", session)
    assert turn1["missing_fields"] == ["passengers", "date"]
    
    # Turn 2: Clarify passengers
    turn2 = await route_intent("Two of us, next Friday", session)
    assert turn2["status"] == "success"
    assert turn2["data"]["result_count"] > 0
    assert session.active_search["passengers"] == 2
    
    # Turn 3: Switch to hotels
    turn3 = await route_intent("What about hotels in Naxos?", session)
    assert turn3["api_source"] == "LiteAPI"
    assert turn3["data"]["location"] == "Naxos"
PART 7: DEPLOYMENT CHECKLIST
 All handlers implement validation + error handling

 All API calls have timeout limits (max 5s)

 Session context persists across turns

 Intent detection confidence logged

 Fallback APIs tested for all primary routes

 Rate limiting configured (Ferryhopper, LiteAPI, Perplexity)

 Logging enabled for all API calls

 Monitoring dashboard shows success/error rates

 Test suite passes >95% of scenarios

 Zero hallucinations in top 50 queries

This technical guide bridges your 300 prompts to production-ready code. Build, test, and deploy with confidence!