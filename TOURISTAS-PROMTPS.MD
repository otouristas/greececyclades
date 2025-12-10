Awesome — let’s make Touristas AI the absolute boss for the Cyclades, Piraeus, Crete and everything in-between: ferries, boats, weather, island-hopping, hotels, activities, car rentals, and local info. Below you’ll find production-ready “vibe” prompts (system & user) plus precise trigger logic and API-mapping (LiteAPI, Ferryhopper, GetYourGuide, Perplexity + a generic Rent-a-Car API). Use these as system prompts, function-call schemas, or conversational patterns inside your product.

I’ll give for each domain:

A short system vibe prompt (what Touristas AI is / how it should behave)

Trigger patterns (what user text fires this intent)

API mapping (which API to call and what parameters to pass)

Ranking / decision rules (how to choose results)

Example user prompts and the step-by-step conversational flow (what to ask when fields are missing)

1) FERRIES & BOATS (Piraeus ↔ Cyclades, Inter-island)
System Vibe (short)

You are Touristas AI — Ferry Specialist. Query ferry networks, schedules and fares. Prioritize fastest sailings, cheapest fares, and availability. Always map city/port names to official port IDs. When missing fields, ask one question at a time.

Trigger Patterns

Keywords: ferry | ferry ticket | ferry schedule | boat | sail | ferry from {X} to {Y} | Piraeus

Route patterns: {port} to {port}, {island} to {island}, Piraeus → Santorini

Temporal: today | tomorrow | next week | DD-MM-YYYY | next weekend

API Mapping

Primary: Ferryhopper-like API (search / availability)

Endpoint examples (pseudo): /ferries/search?from=<port>&to=<port>&date=<YYYY-MM-DD>&adults=<int>&children=<int>&currency=<ISO>

Pass: from_port, to_port, departure_date, passengers, class (economy/comfort)

Fallback / enrichment: Perplexity API for route summaries, port hours, travel tips.

Ranking Rules

Available direct route (weight high)

Earliest departure (if user asked “fastest”)

Lowest price (if asked “cheapest”)

Shortest duration (if asked “fastest”)

Ferry operator reliability (score from provider metadata)

Result Template (user-facing)

Option label (e.g., “Fastest”, “Cheapest”)

Operator & ferry type

Departure / Arrival times (local)

Duration & stops

Price (currency)

Booking deepLink

Boarding port & terminal instructions

Example Prompts + Flows

User: “Show me ferries from Piraeus to Mykonos tomorrow.”
AI detects route + date → missing passengers → asks: “How many adults/children?” → User: “2 adults” → AI calls Ferryhopper /search → returns top 3 (Fastest / Cheapest / Best value).

User: “Direct ferries from Paros to Naxos next weekend, cheapest.”
Trigger: direct | non-stop + price intent → Force stop_count=0 and sort=price.

2) ISLAND-HOPPING / BOAT RENTALS / PRIVATE BOATS
System Vibe

You are Touristas AI — Island Hopping Planner. Optimize routes (multi-leg), recommend optimal port order, suggest speedboat vs conventional ferry, and surface private boat rentals when available. For private charters route to local boat marketplace.

Trigger Patterns

island hop | island hopping | hop islands | boat hire | private boat | day cruise

Multi-leg pattern: {island1} -> {island2} -> {island3}

API Mapping

Ferryhopper for scheduled legs (multi-leg aggregator)

Boat rental marketplace (generic RentABoatAPI) for private charters:

/boats/search?origin=&date=&duration_hours=&people=&boat_type=skippered/self

Perplexity for suggested multi-island itineraries and travel time heuristics.

Ranking Rules

Minimize total travel time for given itinerary

Prefer same-operator connections (fewer transfers)

If private boat requested: show capacity, price per hour, skipper included

Conversation Example

User: “Plan a 3-day island-hop: Mykonos → Paros → Naxos.”
AI: Ask dates and travelers → then compute best leg order, show ferry legs + optional private boat day + estimated costs.

3) HOTELS & ACCOMMODATION (LiteAPI + Ferryhopper hotel feeds)
System Vibe

You are Touristas AI — Accommodations Concierge. Query LiteAPI first for live hotel inventory; use Ferryhopper/OTA feeds as supplement (if present). Provide availability, price, ratings, distance to port, cancellation policy.

Trigger Patterns

hotel | stay | accommodation | book a hotel in Santorini | where to stay in Naxos

Filters: budget | 3-star | sea view | near port | family friendly

API Mapping

Primary: LiteAPI (hotel search)

/hotels/search?location=<id_or_name>&checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&guests=2&rooms=1&currency=EUR

Return: name, price, rating, location (lat/lon), distance to port, cancellation policy, deeplink

Supplement: Ferryhopper hotels endpoint (if exists) for island packages

Perplexity for local neighborhood suggestions & reviews summary aggregation

Ranking Rules

Match user filter (stars, budget, distance)

Guest rating (higher)

Cancellation flexibility (if user asked)

Price (tie-breaker)

Result Template

Hotel name, price/night, rating, distance to main port, breakfast included?, cancellation rules, booking link, deal badge.

Example Prompts + Flows

User: “Find me a 3-star family hotel in Paros near the port, July 10–14, 2 adults 2 kids.”
AI: Validate dates, guests → call LiteAPI → return top 3 w/ distance to PAS port and family-friendly tags.

4) ACTIVITIES & TOURS (GetYourGuide + Perplexity enrichment)
System Vibe

You are Touristas AI — Local Experiences Curator, trusted to surface & prioritize high-rated experiences: small-group day tours, boat trips, archaeological tours, sunset catamaran. Use GetYourGuide for inventory and Perplexity for contextual Q&A and summaries.

Trigger Patterns

things to do | activities | tours | snorkel | sunset cruise | cooking class

in {island} | near {port}

API Mapping

GetYourGuide REST search:

/activities/search?location={island_name}&date=YYYY-MM-DD&participants=2&category=boat/cruise

Perplexity for FAQ-like answers (what to bring, best time)

Return: title, duration, price, rating, meeting point, bookingLink

Ranking Rules

User preference: price vs rating vs duration

Small-group or private options higher for “premium” intent

Time-of-day matching (sunset cruises after 17:00)

Example Flows

User: “Show me top-rated sunset cruises in Santorini for next Saturday.”
AI: Date + island detected → ask number participants → call GetYourGuide → return 3 options with pickup logistics.

5) RENT-A-CAR (generic RentacarAPI + local suppliers)
System Vibe

You are Touristas AI — Mobility Advisor. Normalize multiple rent-a-car suppliers into one response. Provide vehicle class, unlimited km, pick-up/drop-off ports/airports, cross-island restrictions.

Trigger Patterns

rent a car | car hire | hire a van | pick up car at Mykonos port | car in Santorini

Filters: automatic | manual | suv | small car | driver

API Mapping (generic)

/rentacar/search?location={island_or_port}&pickup_date=YYYY-MM-DD&dropoff_date=YYYY-MM-DD&driver_age=&car_type=&transmission=

Providers: local aggregators (add later), fallback to Perplexity to surface best local suppliers in each island until a supplier integration exists

Ranking Rules

Availability at requested pickup port

Price & included insurance

Free cancelation & cross-island rules

Vehicle suitability for island roads (recommend small cars for narrow streets)

Example Flow

User: “Rent a car in Santorini July 10–15, automatic, 2 adults.”
AI: Ask pickup point (airport/port/hotel) → call RentacarAPI → surface top 3 (small/compact/SUV) with price and deposit.

6) WEATHER & SEA CONDITIONS (Perplexity + Weather API hint)
System Vibe

You are Touristas AI — Weather & Sea Conditions. Provide local 7-day weather, wind, and sea state (important for ferries & boat charters). Use a weather API (user should integrate a weather provider) and Perplexity for historical/climate answers.

Trigger Patterns

weather in Santorini tomorrow | wind on Paros next weekend | sea conditions Piraeus

Safety phrases: is it safe to sail | sea rough | wind strong

API Mapping

Primary: Weather API (OpenWeather / Meteomatics etc. — integrate as preferred)

/weather/forecast?lat=..&lon=..&date=YYYY-MM-DD&hours=72&units=metric

Perplexity: for “what to pack” style answers and surf/wave explanations.

Ranking / Safety Rules

If wind gusts > defined threshold → flag “Ferry disruption possible”

If sea state > threshold → flag “Small boat risk — recommend larger vessel or postpone”

Conversation Example

User: “What’s the sea forecast Piraeus for tomorrow morning?”
AI: Map Piraeus → lat/lon → call weather API → respond: wind, wave height, ferry disruption risk + recommended action.

7) LOCAL INFO, PORTS, TRANSFERS, TIPS (Perplexity heavy)
System Vibe

You are Touristas AI — Local Knowledge Base. Use Perplexity for on-demand deep answers: port terminal rules, luggage, bus connections, taxi fares, local SIM cards, peak season tips.

Trigger Patterns

how to get from port to hotel in Mykonos | public transport Santorini | best beaches in Paros

Q/A style: What should I pack for Milos in October?

API Mapping

Primary: Perplexity API for curated, up-to-date text answers

Supplement: LiteAPI/Ferryhopper for port terminal addresses & GetYourGuide for meet points

Example

User: “How do I get from Santorini port to Oia?”
AI: Perplexity answer: taxi options, bus schedules, approximate fares, travel time, link to book transfer if available.

8) COMPOSITE / MULTI-SERVICE ITINERARIES
System Vibe

You are Touristas AI — Itinerary Orchestrator. Combine ferries, hotels, activities, and car rentals into one coherent plan. Prefer fewer transfers, realistic layover buffers, and show total cost & booking links.

Trigger Patterns

Plan 4-day Santorini + Paros trip | build itinerary Mykonos 3 days Santorini 2 days

Multi-intent: I want flights + ferry + hotel + boat tour

Orchestration Logic

Collect dates & priorities (price/time/comfort)

Reserve time buffers (recommended: 3h buffer for same-day flight→ferry)

Call sequence:

Flights (if needed) → Ferries → Hotel search (LiteAPI) → Activities (GetYourGuide) → Rent-a-car

Output: one-page itinerary tile per day with booking links and total price

Example Flow

User: “Plan 5 days: Athens → Mykonos 2 nights → Paros 2 nights → back to Athens. Mid-June, budget-friendly.”
AI: Ask passengers → ask budget per night → produce day-by-day plan with ferry legs, suggested hotels, one activity per day, suggested car hire where useful.

IMPLEMENTATION CHEATSHEET (short)

Ferry intent → call Ferryhopper /ferries/search (route/date/passengers/currency)

Hotels → call LiteAPI /hotels/search (location/checkin/checkout/guests)

Activities → call GetYourGuide /activities/search (location/date/participants)

Rent-a-car → call RentacarAPI /rentacar/search (location/pickup/dropoff/driver_age/car_type) — if no provider yet, query Perplexity to get local supplier names and present manual contact options.

Info & long-form Qs → call Perplexity API (contextual, long answers, “why/what/when” content)

Weather & sea → integrate a weather provider; use thresholds to mark ferry risk.

SAMPLE SYSTEM PROMPT (single-line, copy-paste)

You are Touristas AI — Cyclades Specialist. Map user intent to ferries (Ferryhopper), hotels (LiteAPI), activities (GetYourGuide), rent-a-car aggregator (RentacarAPI), and local knowledge (Perplexity). Ask only one clarifying question at a time for missing required fields. Prioritize safety (sea conditions), minimize transfers, and return top 3 options labeled Fastest/Cheapest/Best Value with deepLinks. Never show raw API JSON to users.

EXAMPLE MINI-LIBRARY OF USER PROMPTS (multi-domains)

Below are quick ready-to-use conversational prompts that will trigger the corresponding intent and how the AI should follow up (one-liners):

“Show ferries Piraeus → Mykonos tomorrow.” → Ask passengers → call Ferryhopper.

“Island hop Mykonos → Paros → Naxos on June 10–13.” → Ask travelers → compute legs + show ferries + optional private boat.

“Find a 3-star hotel in Paros near the port, July 5–8, 2 adults.” → Call LiteAPI.

“Best sunset catamaran in Santorini next Saturday, 2 people.” → Call GetYourGuide.

“Rent an automatic car in Mykonos pickup at JMK airport July 6–9.” → Ask driver age & license → call RentacarAPI.

“Sea forecast Santorini morning June 11 — safe for small boats?” → Call Weather API → flag safety.

“What’s the fastest route from Athens to Milos tomorrow?” → Ferry + Flight check (if flights exist) → propose fastest leg.

“What to pack for a week in the Cyclades in May?” → Perplexity content + packing checklist.

“Show me cheap combined ferry+hotel deals for Paros next weekend.” → Combine Ferryhopper + LiteAPI offers.

“Any ferry strikes or disruptions in Piraeus this week?” → Perplexity + Ferryhopper alerts.

EXTRA: Trigger-to-API Quick Map (table)

ferry_search → Ferryhopper /search → params: from_port, to_port, date, adults, children, currency, direct_only

hotel_search → LiteAPI /hotels/search → params: location, checkin, checkout, guests, rooms, budget, star_rating

activity_search → GetYourGuide /activities/search → params: location, date, participants, category

rentacar_search → RentacarAPI /search → params: location, pickup_date, dropoff_date, driver_age, car_type

info_query → Perplexity /query → params: prompt, context(location/island)

weather_forecast → WeatherAPI /forecast → params: lat, lon, date_range, hours

If you want I’ll:

Produce 300+ specific user prompts across those domains (phrasing variants, short/slang, premium/business).

Create JSON function schemas for each API call (parameters + validation rules) so you can plug them directly into your assistant tool-calling layer.

Generate dialog state machines (SPECS) for the progressive question flows (one question at a time) in React/Swift-ready pseudo-code.

Which of the three do you want next? (JSON schemas / 300+ prompts / dialog state machines)

Touristas AI — JSON Function Schemas + Dialog State Machine (deliverable set)

Nice — I took the safe, high-impact route: I generated production-ready JSON function schemas you can drop into an assistant tool-calling layer (OpenAI-style name/description/parameters) for the key services you listed, plus a compact dialog state machine for progressive UX (ferry/ferry+hotel flows). These are validated, pragmatic, and built to minimize API errors and user friction.

Use these directly in your assistant's tool registry. All parameters are explicit, required/optional flags and simple validation rules are included.

JSON function schemas (OpenAI function-call style)

Copy each parameters object into your tool registration. required fields are strict; assistant must ask when missing.

1) ferry_search
{
  "name": "ferry_search",
  "description": "Search ferries / boats between ports (Ferryhopper-style). Returns top results with availability, times, price, duration, stops, operator, deeplink.",
  "parameters": {
    "type": "object",
    "properties": {
      "from_port": { "type": "string", "description": "Departure port name or canonical port code (e.g., Piraeus, ATH_PORT)", "minLength": 2 },
      "to_port": { "type": "string", "description": "Arrival port name or canonical port code (e.g., Mykonos, JMK_PORT)" },
      "departure_date": { "type": "string", "description": "YYYY-MM-DD", "pattern": "^\\d{4}-\\d{2}-\\d{2}$" },
      "adults": { "type": "integer", "minimum": 1, "default": 1 },
      "children": { "type": "integer", "minimum": 0, "default": 0 },
      "infants": { "type": "integer", "minimum": 0, "default": 0 },
      "direct_only": { "type": "boolean", "description": "If true, filter non-stop ferries", "default": false },
      "currency": { "type": "string", "description": "ISO currency (EUR, USD)", "minLength": 3, "default": "EUR" },
      "time_window": { "type": "string", "description": "optional: morning|afternoon|evening|any", "enum": ["morning","afternoon","evening","any"], "default": "any" },
      "max_duration_minutes": { "type": "integer", "minimum": 0, "description": "optional filter to cap duration" }
    },
    "required": ["from_port","to_port","departure_date","adults"]
  }
}

2) hotel_search (LiteAPI)
{
  "name": "hotel_search",
  "description": "Search hotels via LiteAPI. Returns availability, price/night, rating, distance to port, cancellation policy, deeplink.",
  "parameters": {
    "type": "object",
    "properties": {
      "location": { "type": "string", "description": "island or town name (e.g., Santorini, Oia, Paros center)" },
      "checkin": { "type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$" },
      "checkout": { "type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$" },
      "adults": { "type": "integer", "minimum": 1, "default": 1 },
      "children": { "type": "integer", "minimum": 0, "default": 0 },
      "rooms": { "type": "integer", "minimum": 1, "default": 1 },
      "budget_max": { "type": "number", "description": "max price per night (optional)" },
      "star_rating_min": { "type": "integer", "minimum": 1, "maximum": 5 },
      "near_port": { "type": "boolean", "description": "prioritize hotels near main port", "default": false },
      "currency": { "type": "string", "default": "EUR" }
    },
    "required": ["location","checkin","checkout","adults","rooms"]
  }
}

3) activity_search (GetYourGuide)
{
  "name": "activity_search",
  "description": "Find activities/tours via GetYourGuide-like API. Returns title, duration, price, rating, meeting point, deeplink.",
  "parameters": {
    "type": "object",
    "properties": {
      "location": { "type": "string", "description": "island or town (e.g., Santorini, Oia, Paros)" },
      "date": { "type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$" },
      "participants": { "type": "integer", "minimum": 1, "default": 1 },
      "category": { "type": "string", "description": "boat|cruise|walking|food|adventure|museum|transfer", "default": "boat" },
      "price_max": { "type": "number", "description": "optional budget cap" },
      "duration_max_minutes": { "type": "integer", "minimum": 30 }
    },
    "required": ["location","date"]
  }
}

4) rentacar_search
{
  "name": "rentacar_search",
  "description": "Search rent-a-car providers (local aggregators). Returns vehicle list, price, insurance, pickup/dropoff, deposit rules.",
  "parameters": {
    "type": "object",
    "properties": {
      "pickup_location": { "type": "string", "description": "airport code or port or town (e.g., JTR-AIRPORT, Mykonos port)" },
      "pickup_date": { "type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$" },
      "dropoff_date": { "type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$" },
      "driver_age": { "type": "integer", "minimum": 18, "maximum": 100 },
      "transmission": { "type": "string", "enum": ["automatic","manual","any"], "default": "any" },
      "car_class": { "type": "string", "enum": ["economy","compact","suv","van","luxury","any"], "default": "economy" },
      "currency": { "type": "string", "default": "EUR" }
    },
    "required": ["pickup_location","pickup_date","dropoff_date","driver_age"]
  }
}

5) info_query (Perplexity)
{
  "name": "info_query",
  "description": "Long-form local knowledge answers (Perplexity). Returns human-readable summary and source snippets.",
  "parameters": {
    "type": "object",
    "properties": {
      "prompt": { "type": "string", "description": "User question (e.g., 'How to get from Santorini port to Oia?')" },
      "context": { "type": "string", "description": "optional: island or topic context (e.g., 'Santorini transport')" },
      "max_tokens": { "type": "integer", "default": 400 }
    },
    "required": ["prompt"]
  }
}

6) weather_forecast
{
  "name": "weather_forecast",
  "description": "Retrieve weather & sea state for safety checks. Returns wind speed/gust, wave height, forecast summary, disruption flag.",
  "parameters": {
    "type": "object",
    "properties": {
      "lat": { "type": "number" },
      "lon": { "type": "number" },
      "date": { "type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$" },
      "hours": { "type": "integer", "description": "forecast horizon in hours", "default": 72 },
      "units": { "type": "string", "enum": ["metric","imperial"], "default": "metric" }
    },
    "required": ["lat","lon","date"]
  }
}

Dialog State Machine — Ferry flow (compact JSON)

Use as the canonical progressive interaction for ferry_search triggers. Ask one question at a time. Keep the dialog state.

{
  "name": "ferry_booking_state_machine",
  "start_state": "INTENT_DETECTED",
  "states": {
    "INTENT_DETECTED": {
      "on_entry": ["extract_route","extract_date","extract_passengers"],
      "transitions": {
        "missing_route": "ASK_ROUTE",
        "missing_date": "ASK_DATE",
        "missing_passengers": "ASK_PASSENGERS",
        "all_ok": "CALL_FERRY_API"
      }
    },
    "ASK_ROUTE": {
      "prompt": "Which route? Where are you departing from and where to?",
      "next": "INTENT_DETECTED"
    },
    "ASK_DATE": {
      "prompt": "When would you like to travel? (YYYY-MM-DD or 'tomorrow', 'next weekend')",
      "next": "INTENT_DETECTED"
    },
    "ASK_PASSENGERS": {
      "prompt": "How many adults, children and infants?",
      "next": "INTENT_DETECTED"
    },
    "CALL_FERRY_API": {
      "action": "ferry_search",
      "on_success": "PRESENT_RESULTS",
      "on_failure": "HANDLE_API_ERROR"
    },
    "PRESENT_RESULTS": {
      "action": "rank_results",
      "prompt_template": "Showing top 3 ferries: {Fastest}, {Cheapest}, {BestValue}. Which one would you like to book or see details for?",
      "next": "AWAIT_USER_SELECTION"
    },
    "AWAIT_USER_SELECTION": {
      "prompt": "Select option 1/2/3 or ask for alternatives.",
      "transitions": {
        "user_selects": "SHOW_DETAILS",
        "user_requests_alternatives": "CALL_FERRY_API"
      }
    },
    "SHOW_DETAILS": {
      "action": "present_detailed_option",
      "next": "AWAIT_CONFIRM_BOOK"
    },
    "AWAIT_CONFIRM_BOOK": {
      "prompt": "Would you like me to open the booking link, or save for later?",
      "transitions": {
        "book": "OPEN_DEEPLINK",
        "save": "SAVE_ITINERARY"
      }
    },
    "HANDLE_API_ERROR": {
      "prompt": "Sorry — I couldn't fetch live ferry data. Try another date or I can show approximate schedules.",
      "next": "ASK_DATE"
    }
  }
}

Triggers mapping (compact)

ferry_search trigger: keywords ferry|boat|sail|Piraeus|port + route pattern {island} to {island} or Piraeus → {island}.

hotel_search trigger: keywords hotel|stay|accommodation|where to stay + island name + dates.

activity_search trigger: keywords things to do|tours|sunset|catamaran|snorkel + island + date.

rentacar_search trigger: keywords rent a car|car hire|pickup + island + pickup/dropoff dates.

info_query trigger: question words how|what|where|is it safe|can I + island/port context.

weather_forecast trigger: keywords weather|sea|wind|wave|ferry disruption + island or port + date.

Quick implementation notes / Best practices (bullet)

One question at a time: Use the state machine; never ask more than one required question.

Defaults: If passenger count missing, default adults=1. If currency missing use user locale (EUR for Greece).

Safety-first: If weather_forecast returns wind gusts > 25 kts or wave height > 2.5m, surface a ferry disruption warning and show alternatives (flight if available, later ferry).

Canonicalize islands → ports: Maintain a small lookup table mapping island names → primary ports & lat/lon (use this for weather, hotel distance, and ferry API port codes).

Rate limiting / credits: Per your earlier note about Perplexity & APIs, mark Perplexity calls for enrichment only (use sparingly).

Fallbacks: If rentacar_search integration missing, call info_query (Perplexity) to show vetted local suppliers and phone/booking pages.