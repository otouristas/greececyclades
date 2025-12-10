Here’s a high-impact Vibe Prompt tailored for Touristas AI that converts your technical API into a product-ready, AI-native instruction set — optimized for clarity, speed, and travel-app intelligence:

🎯 Touristas AI – Vibe Prompt (Oneway Flight Search Engine)

You are Touristas AI, an intelligent travel concierge designed to match users with the best possible one-way flight experiences in real time.

Your role is to:

Think like a travel hacker.

Optimize for price, time efficiency, and user comfort.

Translate raw flight data into clear, human-friendly recommendations.

When a user asks for a flight, you must:

Build a request using this endpoint:
https://api.flightapi.io/onewaytrip

Always inject these intent signals into your thinking:

Departure Airport (IATA code)

Arrival Airport (IATA code)

Date of departure (YYYY-MM-DD)

Number of adults

Number of children

Number of infants

Cabin class (Economy, Business, First, Premium_Economy)

Currency (ISO format)

Region (ISO country code)

Construct the request in this exact schema:

https://api.flightapi.io/onewaytrip/{api_key}/{departure_airport_code}/{arrival_airport_code}/{departure_date}/{adults}/{children}/{infants}/{cabin_class}/{currency}


After receiving data, your output behavior must follow this logic:

Extract the cheapest, fastest, and most reliable itineraries

Prioritize:
• Lowest price
• Fewest stops
• Shortest duration
• Best agent trust score

Convert technical JSON into premium user experiences, such as:

“Fastest Route”

“Best Value”

“Cheapest Option”

“Most Comfortable Option”

Always provide:

Departure & arrival time

Total duration

Stops

Airline

Price

Smart booking link (deepLink)

Never expose raw JSON to the user.

Act as a premium travel brand:

Clean language

Confidence-driven tone

Zero hesitation

Zero technical leakage

When data is incomplete, intelligently infer:

Price ranges

Likely travel patterns

Probable airline behavior

When multiple similar options exist, behave like a personal travel strategist — recommend only the top 3 outcomes.

If you want, I can also generate:

A function-style prompt for direct AI → API execution

A system prompt version for OpenAI Assistants

A JSON-mode schema for strict AI tool calling

You said:
I don't conversation prompts
ChatGPT said:

Understood — no chatty fluff, no “conversation-style” prompts.

Here’s a clean, production-grade Vibe Prompt for Touristas AI that works as a system / engine instruction, not a dialogue prompt:

Touristas AI — Flight Search Engine (Oneway Trip)

Vibe Prompt — System Level

You are Touristas AI, a high-performance travel intelligence engine.

Your sole function is to convert structured user intent into real-time, optimized flight results.

Core Behavior

Treat all user input as structured travel intent, not conversation.

Operate in API-first mode.

Prioritize speed, price, reliability.

Endpoint

Use the following endpoint for all one-way flight queries:
https://api.flightapi.io/onewaytrip

Required Input Mapping

Map user intent into the following strict parameters:

Internal Variable	API Parameter
apiKey	api_key
fromAirport	departure_airport_code
toAirport	arrival_airport_code
departureDate	departure_date
adults	number_of_adults
children	number_of_childrens
infants	number_of_infants
cabinClass	cabin_class
currency	currency
region	region
Request Builder Logic

Construct the request strictly in this format:

https://api.flightapi.io/onewaytrip/{apiKey}/{fromAirport}/{toAirport}/{departureDate}/{adults}/{children}/{infants}/{cabinClass}/{currency}

Response Intelligence Layer

On API response:

Do NOT expose raw JSON.

Extract only decision-critical attributes:

price.amount

duration

stop_count

departure

arrival

carrier

booking deeplink

Ranking Algorithm (Internal)

Rank all itineraries by:

Lowest price (weight: highest)

Shortest duration

Fewest stops

Highest agent trust score

Output Rules

Output must always be:

Structured

Deterministic

Clean

Non-conversational

Output Template
Best Option:
- Price:
- Airline:
- Stops:
- Duration:
- Departure:
- Arrival:
- Booking Link:

Fastest Option:
...

Cheapest Option:
...

Error Handling Logic

If API returns incomplete data:

Run intelligent inference.

Provide fallback price ranges.

Do not expose internal failure states.

If you want, I can convert this into:

OpenAI Function Tool Schema

JSON-only strict mode

Next.js callable adapter

You said:
No I mean give conversation examples prompts to get flights in chay
ChatGPT said:

Got it — you want conversation-style example prompts that real users would type to Touristas AI to trigger the one-way flight search. Here are chat-ready examples you can use directly in your product:

✈️ Casual User Prompts (Chat Examples)

1.

Find me a cheap one-way flight from Athens to Paris on March 10 for 1 adult.

2.

I need a one-way flight from London to Rome tomorrow, economy, just me.

3.

Book me the cheapest flight from New York to Miami this Friday.

4.

Show me direct flights from Berlin to Barcelona on May 25.

5.

I want a one-way ticket from Dubai to Istanbul for 2 adults and 1 child.

🧠 Smart / Natural Prompts

6.

I’m flying from Athens to Milan next week. Find me the best one-way option.

7.

What’s the fastest flight from Paris to Madrid on February 18?

8.

I need the cheapest one-way ticket from Thessaloniki to London for tomorrow.

9.

Flying from Amsterdam to Lisbon on June 3 — show me the best deals.

10.

Can you find a budget flight from Vienna to Prague for one adult?

💼 Premium / Business-Style Prompts

11.

One-way business class flight from Frankfurt to Dubai on April 12.

12.

Find premium economy flights from Toronto to Vancouver for 2 adults.

13.

I need a fast one-way flight from Zurich to New York in business class.

🔥 Short Chat Prompts (Perfect for Mobile UX)

14.

ATH → BCN, March 20, 1 adult.

15.

LHR to JFK tomorrow, economy.

16.

CDG → FCO, next Monday.

17.

Cheapest flight from Berlin to Paris today.

👶 Family / Multi-Passenger Prompts

18.

One-way flight from Athens to London for 2 adults and 2 kids next Friday.

19.

I need tickets from Madrid to Amsterdam for 2 adults and 1 infant.

If you want, I can next give you:

Regex triggers to detect “flight intent”

Slang-to-IATA auto parser examples

AI fallback logic for missing dates/airports

You said:
Exactly. For each prompt give trigger instructions
ChatGPT said:

Alright — now we’re talking product logic, not fluff.

Below are chat-style user prompts + precise trigger instructions for Touristas AI’s one-way flight engine. This is built like an internal intent-to-API activation layer (enterprise-grade logic, zero chaos).

1. Prompt

User says:

Find me a cheap one-way flight from Athens to Paris on March 10 for 1 adult.

Trigger Logic:

Trigger API when:

Contains verb group: find | search | show | book

AND contains route pattern: from {city} to {city}

AND contains a date entity

Map:

ATH → departure_airport_code

PAR → arrival_airport_code

number_of_adults = 1

cabin_class = Economy (default)

2. Prompt

User says:

I need a one-way flight from London to Rome tomorrow, economy, just me.

Trigger Logic:

Trigger API when:

Contains "one-way" OR "tomorrow"

Detect {city} to {city} pattern

Map:

departure = LON

arrival = ROM

departure_date = current_date + 1

adults = 1

cabin = Economy

3. Prompt

User says:

Book me the cheapest flight from New York to Miami this Friday.

Trigger Logic:

Trigger when:

Keyword: cheapest

Temporal intent: this Friday

Map:

NYC → MIA

date = next Friday from current date

cabin = Economy (implicit)

4. Prompt

User says:

Show me direct flights from Berlin to Barcelona on May 25.

Trigger Logic:

Trigger if:

“direct flights” OR “non-stop” detected

Map:

filter.stop_count = 0

cabin = Economy

adults = 1 (default)

5. Prompt

User says:

I want a one-way ticket from Dubai to Istanbul for 2 adults and 1 child.

Trigger Logic:

Trigger when:

Passenger count entities detected

Map:

adults = 2

children = 1

infants = 0 (default)

6. Prompt

User says:

I’m flying from Athens to Milan next week. Find me the best one-way option.

Trigger Logic:

Trigger when:

“next week” detected

Map:

departure_date = next Monday (default anchor)

optimization_mode = "best_value"

7. Prompt

User says:

What’s the fastest flight from Paris to Madrid on February 18?

Trigger Logic:

Trigger when:

“fastest” keyword appears

Map ranking override:

weight.duration = highest

8. Prompt

User says:

I need the cheapest one-way ticket from Thessaloniki to London for tomorrow.

Trigger Logic:

Trigger when:

“cheapest” detected

“tomorrow” detected

Set ranking:

weight.price = maximum

9. Prompt

User says:

Flying from Amsterdam to Lisbon on June 3 — show me the best deals.

Trigger Logic:

Trigger when:

“best deals” → price optimization mode

10. Prompt

User says:

Find me a budget flight from Vienna to Prague for one adult.

Trigger Logic:

Trigger when:

“budget” keyword present

Map:

cabin = Economy

adults = 1

11. Prompt

User says:

One-way business class flight from Frankfurt to Dubai on April 12.

Trigger Logic:

Trigger when:

cabin_class explicitly mentioned

Map:

cabin_class = Business

12. Prompt

User says:

Find premium economy flights from Toronto to Vancouver for 2 adults.

Trigger Logic:

Trigger when:

“premium economy” detected

Map:

cabin_class = Premium_Economy

13. Prompt

User says:

I need a fast one-way flight from Zurich to New York in business class.

Trigger Logic:

Trigger when:

“fast” + “business class” co-exist

Ranking override:

duration > price

14. Short Prompt

User says:

ATH → BCN, March 20, 1 adult.

Trigger Logic:

Regex trigger:

[A-Z]{3}\s*(→|to|-)\s*[A-Z]{3}


Map:

Parse IATA directly

15. Short Prompt

User says:

LHR to JFK tomorrow, economy.

Trigger Logic:

Trigger when:

Valid IATA codes found

Relative date detected

16. Prompt

User says:

Cheapest flight from Berlin to Paris today.

Trigger Logic:

Trigger on:

“cheapest”

“today”

17. Prompt

User says:

CDG → FCO, next Monday.

Trigger Logic:

Regex trigger:

[A-Z]{3}\s*(→|to)\s*[A-Z]{3}


Date parser:

“next Monday” → next weekday

18. Prompt

User says:

One-way flight from Athens to London for 2 adults and 2 kids next Friday.

Trigger Logic:

Detect:

plural passengers

relative weekday

19. Prompt

User says:

I need tickets from Madrid to Amsterdam for 2 adults and 1 infant.

Trigger Logic:

Detect:

infant entity

route entity

If you want, I can also generate:

NLP entity extraction schema

Regex library for routes/dates/passengers

JSON tool-calling trigger spec


-------------


Perfect — now we’re moving into real product UX orchestration, not random chat.

Below are production-ready conversational flight flows for Touristas AI, showing how the system should behave when required parameters are missing and how it should progressively collect data before triggering the API.

This is written like a live app conversation spec, not marketing fluff.

Flow 1 — Missing Passengers

User:
Can you show me the cheapest flight from Athens to London next weekend?

Touristas AI (System Behavior):

Detects:

ATH → LON ✅

Date → next weekend ✅

Cabin class ❌ (default to Economy)

Passengers ❌ → REQUIRED

Touristas AI (User-facing reply):
How many travelers should I search for?

User:
Just 1 person.

System Action:

number_of_adults = 1

children = 0

infants = 0

Touristas AI:
Searching the best-priced flights from Athens to London for next weekend…

✅ Then shows results

Flow 2 — Adults + Children Missing

User:
Find me a flight from Paris to Rome tomorrow.

System State:

Date ✅

Route ✅

Passengers ❌

Touristas AI:
How many adults and children are traveling?

User:
2 adults and 1 child.

System Action:

adults = 2

children = 1

infants = 0

Touristas AI:
Here are the best flights from Paris to Rome for tomorrow.

✅ Results displayed

Flow 3 — Relative Date Missing

User:
I need a flight from Berlin to Barcelona.

System State:

Route ✅

Date ❌

Touristas AI:
When would you like to depart?

User:
Next Friday.

System Action:

Maps date → YYYY-MM-DD

Touristas AI:
Got it. Searching flights for next Friday.

✅ Results shown

Flow 4 — Cabin Class Missing

User:
Show me flights from New York to Los Angeles next week.

System State:

Route ✅

Date ✅

Cabin ❌

Touristas AI:
Do you prefer Economy, Business, or First Class?

User:
Economy.

Touristas AI:
Perfect. Finding the best Economy flights for you.

✅ Results shown

Flow 5 — Infant Clarification

User:
Find flights from Madrid to Amsterdam for a family.

System State:

“Family” detected but no breakdown

Touristas AI:
How many adults, children, and infants are traveling?

User:
2 adults and 1 infant.

Touristas AI:
Searching the best options for your family trip.

✅ Results shown

Flow 6 — Multi-Step Intent Completion (Full Example)

User:
Can you show me the cheapest flight from Athens to London next weekend?

Touristas AI:
How many travelers will be flying?

User:
2 adults and 1 child.

Touristas AI:
Do you prefer Economy, Business, or First Class?

User:
Economy.

Touristas AI:
Great. Here are the cheapest flights from Athens to London for next weekend.

✅ Results shown

Internal Logic (How Touristas AI Should Decide to Ask Questions)

Only ask questions when required data is missing:

Required Field	If Missing → Ask
Route	“Where are you flying from and to?”
Date	“When do you want to travel?”
Adults/Children/Infants	“How many travelers?”
Cabin Class	“Which class do you prefer?”

Rules:

Ask only one question at a time

Never dump raw JSON

After collecting missing fields → Trigger API

If you want, I can also give you:

JSON state machine for this flow

Frontend-ready logic (React / Swift / Flutter)

Tool-calling schema for OpenAI / Anthropic

This can run exactly like a real travel app now.

----------------


Perfect. Let’s design a comprehensive, production-ready conversational flow for Touristas AI that includes lots of prompts, step-by-step logic, triggers, and missing-field handling. I’ll structure this so you can use it directly for chat UX, AI prompt logic, or app orchestration.

Touristas AI Conversational Prompts & Trigger Logic (Step-by-Step)
1. Detecting Flight Intent

Trigger Keywords / Patterns:

flight | fly | ticket | plane | airfare | cheap flight | book

Route patterns: {city} to {city} OR {IATA} → {IATA}

Date patterns: today | tomorrow | next week | next weekend | YYYY-MM-DD

Cabin class: economy | business | first | premium economy

Passengers: adult | child | kid | infant | person | people | family | couple

Step 1 Logic:

If route + date + passengers + cabin are detected → Trigger API directly.

If any required field is missing → Ask user.

2. Step-by-Step Data Collection & Prompts
Step	Missing Field	User Prompt Example	Logic / Trigger
1	Departure/Arrival	“Where are you flying from and to?”	Detect {city} to {city} or IATA. Validate via airport list.
2	Date	“When would you like to depart?”	Detect relative date (tomorrow, next weekend) or absolute date. Map to YYYY-MM-DD.
3	Number of Adults	“How many adults are traveling?”	Parse integer ≥1. Default 1 if missing.
4	Number of Children	“Any children flying with you? How many?”	Parse integer ≥0. Default 0.
5	Number of Infants	“Any infants? How many?”	Parse integer ≥0. Default 0.
6	Cabin Class	“Which cabin class do you prefer? Economy, Business, First, or Premium Economy?”	Map to API string. Default = Economy.
7	Currency	Optional. “In which currency should I show prices?”	Default = USD if missing.
8	Region	Optional. “Which country’s prices should I show?”	Default = user locale.
3. Multi-Step Conversational Examples
Example A — Cheapest Flight, Missing Passengers

User:

Can you show me the cheapest flight from Athens to London next weekend?

System Logic:

Route detected → ATH → LON ✅

Date detected → next weekend ✅

Cabin missing → default Economy

Passengers missing → Ask

Touristas AI:

How many travelers are flying?

User:

1 adult and 1 child.

Touristas AI:

Perfect. Searching the cheapest Economy flights from Athens to London for next weekend… ✅

Example B — Missing Date

User:

I need a flight from Berlin to Barcelona.

System Logic:

Route detected ✅

Date missing → Ask

Touristas AI:

When would you like to depart?

User:

Next Friday.

Touristas AI:

Got it. How many travelers will be flying?

User:

Just me.

Touristas AI:

Searching for flights for 1 adult from Berlin to Barcelona next Friday… ✅

Example C — Multi-Field Missing

User:

Show me flights from New York to Miami.

System Logic:

Route detected ✅

Date missing → Ask

Cabin missing → Ask

Passengers missing → Ask

Touristas AI (Step-by-step):

When would you like to fly?

How many adults and children?

Which cabin class do you prefer?

After collecting all fields → Trigger API

Searching for flights from New York to Miami on [date], [passengers], [cabin]…

Example D — Family Trip

User:

I need tickets from Madrid to Amsterdam for a family.

Touristas AI:

How many adults, children, and infants are traveling?

User:

2 adults and 1 infant.

Touristas AI:

Great. Which cabin class do you prefer?

User:

Economy.

Touristas AI:

Searching the best options for your family trip from Madrid to Amsterdam… ✅

4. Short / Mobile-Friendly Prompts

Patterns:

ATH → BCN, next Monday, 2 adults

LHR to JFK tomorrow, economy

CDG → FCO, next weekend, 1 adult

System Logic:

Use Regex to extract: {IATA} → {IATA} OR {City} to {City}

Detect relative date (tomorrow, next weekend)

Detect passenger numbers (defaults if missing)

Detect cabin class (defaults to Economy)

If any required field missing → Ask next field.

5. Progressive Trigger Logic Diagram (Step-by-Step)
User Input
   |
   V
[Detect Intent & Route?] → No → Ask Route
   |
   V
[Detect Date?] → No → Ask Date
   |
   V
[Detect Passengers?] → No → Ask Adults/Children/Infants
   |
   V
[Detect Cabin?] → No → Ask Cabin
   |
   V
[Detect Currency / Region?] → Optional → Ask if needed
   |
   V
[All Required Fields Collected] → Trigger API
   |
   V
[Parse Response & Rank] → Cheapest / Fastest / Best Value
   |
   V
[Return Clean Results to User]

6. Ranking / Result Display Rules

Always output top 3 options

Include:

Price

Departure & Arrival times

Duration

Stops

Airline

Booking link

Do NOT show raw JSON

Apply ranking priority:

Cheapest (weight=highest)

Fastest (duration)

Fewest stops

Best agent score

If you want, I can now produce a massive library of 50+ conversational user prompts with triggers, covering:

All types of date references (tomorrow, next weekend, June 12, etc.)

All cabin classes

Single travelers, families, groups

Explicit vs. missing parameters

This would essentially give you a full UX-ready flight conversation dataset.

Do you want me to create that full library next?

Perfect — let’s build a full conversational prompt library for Touristas AI. I’ll structure it so each entry includes:

User Prompt (realistic way a user might ask)

Trigger Detection / Missing Field Logic

AI Response Step (how Touristas AI should respond, asking for missing info if needed)

I’ll give 50+ examples covering all types of flights, passengers, dates, cabin classes, and scenarios.

Touristas AI Conversational Prompts Library (50+)
A. Single Traveler, Simple Flights
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
1	Can you show me the cheapest flight from Athens to London next weekend?	Route + Date detected; Passengers missing	How many travelers are flying?
2	I need a flight from Paris to Rome tomorrow.	Route + Date detected; Passengers missing	How many adults and children are traveling?
3	Find me a one-way flight from Berlin to Barcelona on May 25.	All detected except cabin (optional)	Which cabin class do you prefer: Economy, Business, First, Premium Economy?
4	Show flights from New York to Miami next Friday.	Route + Date detected; Passengers missing	How many travelers should I search for?
5	Cheap ticket from Athens to Milan next week.	Route + Date detected; Passengers missing	How many adults and children are traveling?
6	Flight from Tokyo to Seoul tomorrow.	Route + Date detected; Passengers missing	How many adults and children are traveling?
7	I want a flight from Madrid to Lisbon.	Route detected; Date missing	When would you like to depart?
8	Flights from London to Dublin next Monday.	Route + Date detected; Passengers missing	How many travelers should I search for?
9	Show me flights from Zurich to New York on July 15.	Route + Date detected; Cabin missing	Which cabin class do you prefer?
10	Find the fastest flight from Paris to Madrid this Friday.	All detected; Rank by duration	Searching for the fastest flights from Paris to Madrid this Friday…
B. Family / Group Flights
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
11	One-way flight from Athens to London for a family next weekend.	Passengers missing	How many adults, children, and infants are traveling?
12	Flight from Madrid to Amsterdam for 2 adults and 1 child next Friday.	Cabin missing	Which cabin class do you prefer?
13	Show flights from Paris to Rome for 2 adults, 2 kids.	Date missing	When would you like to depart?
14	Book a flight from Berlin to Vienna for 3 adults and 2 children.	Date missing	When would you like to fly?
15	I need tickets from New York to Miami for 4 adults.	Date missing	When would you like to depart?
16	Flights from Tokyo to Osaka for a family of 5.	Date + Cabin missing	When would you like to fly?
17	Find flights from London to Paris for 2 adults and 1 infant.	Cabin missing	Which cabin class do you prefer?
18	Show flights from Athens to Santorini for 2 adults and 2 kids next month.	Cabin missing	Which cabin class do you prefer?
19	Family trip from Madrid to Barcelona for 3 adults, 2 children, 1 infant.	Date missing	When would you like to depart?
20	I want flights for 2 adults and 3 kids from Berlin to Munich next Friday.	Cabin missing	Which cabin class do you prefer?
C. Cabin-Specific Flights
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
21	One-way business class flight from Frankfurt to Dubai on April 12.	All detected	Searching for business class flights from Frankfurt to Dubai on April 12…
22	Find premium economy flights from Toronto to Vancouver for 2 adults.	Date missing	When would you like to depart?
23	Fastest first-class flight from Zurich to New York next Monday.	All detected	Searching for the fastest first-class flights from Zurich to New York next Monday…
24	Show business class flights from London to New York tomorrow.	Passengers missing	How many travelers should I search for?
25	Economy class flight from Paris to Berlin next Friday.	All detected	Searching for economy flights from Paris to Berlin next Friday…
26	Premium Economy from Madrid to Lisbon next weekend.	Passengers missing	How many travelers should I search for?
27	First-class ticket from Tokyo to Singapore next Monday.	Passengers missing	How many travelers are flying?
28	Business class flight from Berlin to Vienna tomorrow.	Passengers missing	How many adults and children are traveling?
29	Economy flight from Athens to Rome next Friday.	Passengers missing	How many travelers are flying?
30	Premium Economy flight from London to Dublin next weekend.	Passengers missing	How many travelers should I search for?
D. Short / Mobile-Friendly Prompts
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
31	ATH → BCN, March 20, 1 adult.	IATA detected; cabin missing	Which cabin class do you prefer?
32	LHR to JFK tomorrow, economy.	IATA + date detected; passengers missing	How many travelers should I search for?
33	CDG → FCO, next weekend, 1 adult.	Cabin missing	Which cabin class do you prefer?
34	NYC → MIA, next Friday.	Passengers + cabin missing	How many travelers and which cabin class?
35	FRA → DXB, April 10, Business, 2 adults.	Complete	Searching business flights from Frankfurt to Dubai on April 10 for 2 adults…
36	BER → VIE next Monday.	Passengers + cabin missing	How many travelers and which cabin class?
37	MAD → BCN, 2 adults, 1 child.	Date missing	When would you like to depart?
38	ATH → LHR, tomorrow.	Passengers + cabin missing	How many travelers and which cabin class?
39	PAR → MAD next weekend, 1 adult.	Cabin missing	Which cabin class do you prefer?
40	TYO → SEL next Friday.	Passengers + cabin missing	How many travelers and which cabin class?
E. Multi-Step / Progressive Flows
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
41	Cheapest flight from Athens to London next weekend.	Passengers missing	How many travelers?
42	1 adult and 1 child.	Cabin missing	Which cabin class do you prefer?
43	Economy.	Complete	Searching cheapest flights from Athens to London for 1 adult and 1 child in Economy…
44	Show me flights from Paris to Rome next Friday.	Passengers missing	How many travelers?
45	2 adults.	Cabin missing	Which cabin class do you prefer?
46	Business.	Complete	Searching flights from Paris to Rome next Friday for 2 adults in Business…
47	Family trip from Madrid to Amsterdam.	Passengers + Date missing	How many adults, children, and infants?
48	2 adults, 2 kids, 1 infant.	Date missing	When would you like to depart?
49	Next Monday.	Cabin missing	Which cabin class do you prefer?
50	Economy.	Complete	Searching flights from Madrid to Amsterdam for 2 adults, 2 children, 1 infant in Economy on next Monday…

✅ These 50 prompts cover:

Single travelers

Families and groups

Cabin-specific requests

Short/mobile prompts

Progressive multi-step conversations

Missing-field handling

If you want, I can create another 50+ prompts covering rare edge cases like:

Multiple stops / direct flights only

Multi-leg flights (layovers)

Explicit price ranges

Different currencies

International date formats

This would give you a full 100+ prompt library for Touristas AI, ready to implement in a chat interface.

Do you want me to make that next?

Perfect — let’s build the next 50+ prompts covering edge cases, advanced user intents, and rare scenarios for Touristas AI. This will complement the first 50 prompts, giving you a full 100+ prompt library for conversational flight booking.

Touristas AI Conversational Prompts Library (Advanced / Edge Cases)
A. Direct / Non-Stop Flights
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
51	Show me direct flights from Berlin to Paris next weekend.	Passengers missing	How many travelers are flying?
52	I want non-stop flights from Athens to Rome tomorrow.	Passengers missing	How many adults and children are traveling?
53	Direct flight from London to Dublin next Friday.	Passengers + cabin missing	How many travelers and which cabin class?
54	Cheapest direct flight from New York to Miami.	Date + passengers missing	When would you like to fly, and how many travelers?
55	Direct one-way flight from Madrid to Barcelona next Monday.	Passengers missing	How many travelers?
B. Multi-Leg / Layover Flights
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
56	I need a flight from Tokyo to London with one stop.	Date + passengers missing	When would you like to depart, and how many travelers?
57	Flights from Los Angeles to Singapore with 1 layover next week.	Passengers missing	How many travelers?
58	Show flights from Paris to Sydney with at most 2 stops.	Date + passengers missing	When would you like to depart, and how many travelers?
59	Cheapest flight from Dubai to New York with one stop next Friday.	Passengers missing	How many travelers are flying?
60	Flight from Madrid to Tokyo, allow 1 stop.	Passengers + cabin missing	How many travelers and which cabin class?
C. Price Range / Budget Focused
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
61	Show me flights from Athens to London under $300 next weekend.	Passengers missing	How many travelers are flying?
62	Budget flight from Paris to Rome next Friday under 150 EUR.	Passengers missing	How many adults and children?
63	Cheap one-way flight from Berlin to Barcelona this Friday.	Passengers missing	How many travelers?
64	Find flights from New York to Miami for less than $200.	Date + passengers missing	When would you like to fly, and how many travelers?
65	Athens to Milan, cheapest option, next month.	Passengers missing	How many travelers are flying?
D. Specific Dates / Flexible Dates
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
66	Flights from London to Paris on July 15.	Passengers missing	How many travelers?
67	One-way ticket from Madrid to Lisbon June 10.	Passengers missing	How many travelers?
68	I need a flight from Tokyo to Seoul next Monday.	Passengers missing	How many travelers?
69	Flights from Berlin to Vienna July 1-3, flexible dates.	Passengers missing	How many travelers?
70	Cheapest flight from Athens to Rome between August 10 and August 15.	Passengers missing	How many travelers?
E. Multi-Passenger / Group Focus
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
71	One-way flight from Paris to Rome for 5 adults next Friday.	Cabin missing	Which cabin class do you prefer?
72	Find flights from Berlin to Vienna for 3 adults and 2 children.	Date missing	When would you like to fly?
73	Flight from New York to Miami for 4 adults, 2 children, 1 infant.	Cabin missing	Which cabin class do you prefer?
74	Family trip from Madrid to Barcelona for 2 adults and 3 kids next weekend.	Cabin missing	Which cabin class do you prefer?
75	Group flight from Athens to Santorini for 6 adults and 2 children next month.	Cabin missing	Which cabin class do you prefer?
F. Cabin / Comfort-Specific Prompts
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
76	Business class flight from London to New York tomorrow.	Passengers missing	How many travelers?
77	Economy flight from Paris to Berlin next weekend.	Passengers missing	How many travelers?
78	First-class flight from Tokyo to Singapore next Monday.	Passengers missing	How many travelers?
79	Premium Economy from Madrid to Lisbon next Friday.	Passengers missing	How many travelers?
80	Cheapest business flight from Athens to Rome next month.	Passengers missing	How many travelers?
G. Currency / Regional Focus
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
81	Flights from Athens to London next weekend in EUR.	Passengers missing	How many travelers are flying?
82	Show flights from Paris to Rome next Friday in USD.	Passengers missing	How many travelers?
83	One-way ticket from Berlin to Barcelona in GBP.	Passengers missing	How many travelers?
84	Budget flight from New York to Miami under 200 USD.	Date + passengers missing	When would you like to fly, and how many travelers?
85	Cheapest flight from Tokyo to Seoul in JPY.	Passengers missing	How many travelers?
H. Short / Slang Prompts
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
86	ATH → BCN, March 20, 1 adult.	Cabin missing	Which cabin class do you prefer?
87	LHR → JFK tomorrow, economy.	Passengers missing	How many travelers should I search for?
88	CDG → FCO, next weekend, 1 adult.	Cabin missing	Which cabin class do you prefer?
89	NYC → MIA, next Friday.	Passengers + cabin missing	How many travelers and which cabin class?
90	FRA → DXB, April 10, Business, 2 adults.	Complete	Searching business flights from Frankfurt to Dubai on April 10 for 2 adults…
I. Multi-Step / Progressive Flows
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
91	Cheapest flight from Athens to London next weekend.	Passengers missing	How many travelers?
92	1 adult and 1 child.	Cabin missing	Which cabin class do you prefer?
93	Economy.	Complete	Searching cheapest flights from Athens to London for 1 adult and 1 child in Economy…
94	Family trip from Madrid to Amsterdam.	Passengers + Date missing	How many adults, children, and infants?
95	2 adults, 2 kids, 1 infant.	Date missing	When would you like to depart?
96	Next Monday.	Cabin missing	Which cabin class do you prefer?
97	Economy.	Complete	Searching flights from Madrid to Amsterdam for 2 adults, 2 children, 1 infant in Economy on next Monday…
98	Show me direct flights from Berlin to Paris next weekend.	Passengers missing	How many travelers are flying?
99	Direct flight from London to Dublin next Friday.	Passengers + cabin missing	How many travelers and which cabin class?
100	Fastest flight from Paris to Madrid next Friday.	Passengers missing	How many travelers?

✅ This completes a 100+ prompt library:

Single travelers

Families & groups

Cabin classes

Budget / cheapest options

Direct / multi-leg flights

Currency and regional variations

Short, mobile-friendly prompts

Multi-step conversations with missing-field handling

If you want, I can also map all 100 prompts into a JSON schema for automatic AI triggering, with:

Required fields detection

Step-by-step missing-field handling

API-ready output structure

This would be ready for production in Touristas AI.

Do you want me to create that JSON schema next?

Absolutely — here is the full rewritten 100-prompt conversational library, but now exclusively optimized for the Cyclades (flights and inter-island travel).
Everything is restructured so every prompt is only between Cycladic islands or from Athens → Cyclades / Cyclades → Athens, and the logic remains identical:

Trigger logic

Missing-field logic

Conversational flow

Cyclades-only routes (ATH → JMK, JTR → ATH, JTR → JMK, etc.)

You’ll get 100 Cyclades-focused prompts, ready to drop straight into Touristas AI.

✅ Touristas AI – 100 Conversational Prompts for Cyclades Flights Only

(Athens ↔ Cyclades & Inter-Cyclades flights)

I use the following Cyclades airports:

ATH Athens

JTR Santorini

JMK Mykonos

PAS Paros

MLO Milos

JNX Naxos

JTY Astypalea (semi-Cyclades)

SKU Skiathos (optional)

A. Athens → Cyclades (25 prompts)
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
1	Show me the cheapest flight from Athens to Santorini next weekend.	Passengers missing	How many travelers are flying to Santorini?
2	Flights from Athens to Mykonos tomorrow.	Passengers missing	How many adults and children?
3	I need a one-way flight from Athens to Paros on June 10.	Cabin missing	Which cabin class do you prefer?
4	ATH → JTR next Friday, cheapest possible.	Passengers missing	How many travelers?
5	Find a flight from Athens to Milos next month.	Date missing	What date would you like to travel?
6	I’m planning to fly from Athens to Naxos next Monday.	Passengers missing	How many travelers?
7	Athens to Mykonos flight soon.	Date missing	When would you like to fly?
8	Book a flight from ATH to PAS for 2 adults on July 5.	Cabin missing	Which cabin class do you prefer?
9	I need the fastest flight from Athens to Santorini tomorrow.	Passengers missing	How many travelers?
10	Cheapest flight ATH → MLO this Friday.	Passengers missing	How many adults and children?
11	Flight from Athens to Naxos, next weekend.	Passengers missing	How many travelers?
12	ATH → JMK, July 12.	Passengers missing	How many travelers should I search for?
13	Show me direct flights from Athens to Paros tomorrow.	Passengers missing	How many travelers?
14	Athens to Milos under 100 EUR next Friday.	Passengers missing	How many travelers?
15	I want a flight from ATH to JTR for 2 adults and 1 child.	Date missing	When would you like to fly?
16	ATH to Mykonos on June 15, business class.	Passengers missing	How many travelers?
17	Direct flight from Athens to Santorini next Monday.	Passengers missing	How many travelers?
18	Fly ATH → PAS anytime next week.	Passengers missing	How many adults and children are traveling?
19	Athens to Naxos tomorrow morning.	Passengers missing	How many travelers?
20	Last-minute flight from Athens to Milos.	Date missing	When would you like to depart?
21	Cheapest ATH to JTR for a couple next weekend.	Cabin missing	Which cabin class do you prefer?
22	Flight Athens → Mykonos today.	Passengers missing	How many travelers?
23	Athens to Paros for 4 adults next Friday.	Cabin missing	Which cabin class do they prefer?
24	One-way from ATH to Naxos next month.	Passengers missing	How many travelers?
25	Show me all flights from Athens to the Cyclades tomorrow.	Passengers + islands missing	Which island in the Cyclades are you flying to?
B. Cyclades → Athens (20 prompts)
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
26	Show me flights from Santorini to Athens tomorrow.	Passengers missing	How many travelers?
27	I need a one-way flight from Mykonos to Athens next Monday.	Passengers missing	How many adults and children?
28	JTR → ATH next weekend, cheapest fare.	Passengers missing	How many travelers?
29	Flight from Paros to Athens on June 20.	Passengers missing	How many travelers are flying?
30	PAS → ATH next Friday.	Passengers + cabin missing	How many travelers and which cabin class?
31	Mykonos to Athens in business class next Friday.	Passengers missing	How many travelers?
32	Milos to Athens next Thursday.	Passengers missing	How many travelers?
33	Naxos → Athens for 2 adults.	Date missing	When would you like to fly?
34	Cheapest flight from Santorini to Athens next month.	Passengers missing	How many travelers?
35	JMK → ATH tomorrow afternoon.	Passengers missing	How many adults and children?
36	Paros to Athens direct flight on July 2.	Passengers missing	How many travelers?
37	I need the earliest flight from Mykonos to Athens tomorrow.	Passengers missing	How many travelers?
38	Santorini to Athens under 80 EUR.	Date + passengers missing	When would you like to fly, and how many travelers?
39	PAS → ATH, 2 adults, business class.	Date missing	What day would you like to fly?
40	Fly from Naxos to Athens next Friday.	Passengers missing	How many travelers?
41	Last-minute JTR → ATH flight.	Passengers missing	How many travelers should I search for?
42	Mykonos to Athens for a family of four.	Date missing	When would you like to fly?
43	Cheapest Milos → Athens tomorrow.	Passengers missing	How many travelers?
44	JNX → ATH next weekend.	Passengers missing	How many travelers?
45	Santorini to Athens one-way, today.	Passengers missing	How many travelers?
C. Cyclades ↔ Cyclades (Inter-Island Flights)

(even though some are rare or route-limited, Touristas AI should support conversational intent)

25 prompts
#	User Prompt	Trigger / Missing Fields	Touristas AI Response
46	Show me flights from Santorini to Mykonos next weekend.	Passengers missing	How many travelers?
47	I need a flight from Paros to Naxos tomorrow.	Passengers missing	How many adults and children?
48	Mykonos → Santorini on July 10.	Passengers missing	How many travelers?
49	Cheapest flight from Milos to Paros next Friday.	Passengers missing	How many travelers?
50	Naxos to Santorini for 2 adults next weekend.	Cabin missing	Which cabin class do you prefer?
51	JTR → PAS tomorrow morning.	Passengers missing	How many travelers?
52	Paros to Mykonos next month.	Passengers missing	How many travelers?
53	I need a one-way flight from Mykonos to Milos.	Date + passengers missing	When would you like to fly, and how many travelers?
54	Cheapest flight from Santorini to Paros.	Date + passengers missing	When would you like to fly, and how many travelers?
55	Flight from Naxos to Milos next Friday.	Passengers missing	How many travelers?
56	JMK → JTR tomorrow.	Passengers missing	How many travelers?
57	Santorini to Naxos for 3 adults.	Date missing	When would you like to fly?
58	Paros to Mykonos on June 20.	Passengers missing	How many adults and children?
59	Show me direct flights from Paros to Santorini.	Date + passengers missing	When do you want to fly, and how many travelers?
60	Milos to Naxos next week.	Passengers missing	How many travelers?
61	Mykonos → Paros this Friday.	Passengers missing	How many travelers?
62	Fastest flight JTR → JMK tomorrow.	Passengers missing	How many travelers?
63	Cheapest Milos → Santorini next Monday.	Passengers missing	How many travelers?
64	Paros to Milos, 2 adults, next weekend.	Cabin missing	Which cabin class?
65	Naxos → Mykonos on July 5.	Passengers missing	How many travelers?
66	Inter-island Cyclades flight for 4 adults.	Island + date missing	Which islands and what date?
67	I want to fly from Santorini to Naxos sometime next month.	Passengers missing	How many travelers?
68	Mykonos → Milos next Sunday afternoon.	Passengers missing	How many travelers?
69	JTR → PAS, business class.	Date + passengers missing	When would you like to fly, and how many travelers?
70	Paros to Naxos for 2 adults and 2 kids.	Date missing	When would you like to fly?
D. Multi-Step Conversation Flows (15 prompts)

(These simulate real UX flows where AI asks for missing data)

Step	Conversation
71	User: Cheapest flight from Athens to Paros next weekend.
→	AI: How many travelers?
72	User: 2 adults.
→	AI: Which cabin class do you prefer?
Step	Conversation
73	User: I need a flight from Mykonos to Santorini.
→	AI: What date would you like to fly?
74	User: Next Friday.
→	AI: How many travelers?
75	User: 1 adult and 1 child.
→	AI: Which cabin class would you like?
Step	Conversation
76	User: Fly from Athens to Naxos tomorrow.
→	AI: How many travelers?
77	User: Just me.
→	AI: Which cabin class do you prefer?
Step	Conversation
78	User: Santorini to Mykonos, cheapest option.
→	AI: When would you like to travel?
79	User: Next weekend.
→	AI: How many travelers?
Step	Conversation
80	User: Paros → Milos for a family.
→	AI: How many adults, children, and infants?
81	User: 2 adults, 1 child.
→	AI: When would you like to travel?
E. Short / Mobile Cyclades Prompts (20 prompts)
#	User Prompt	Trigger / Missing	AI Response
82	ATH → JTR tomorrow.	Passengers	How many travelers?
83	JMK → ATH next Friday.	Passengers	How many travelers?
84	PAS → JTR, 2 adults.	Date	When would you like to fly?
85	MLO → ATH today.	Passengers	How many travelers?
86	JTR → JMK, June 10.	Passengers	How many travelers?
87	Naxos → Paros next Monday.	Passengers	How many travelers?
88	ATH → MLO, cheapest.	Date + passengers	When do you want to fly, and how many travelers?
89	Mykonos → Santorini, 1 adult.	Date	When would you like to fly?
90	PAS → ATH, tomorrow.	Passengers	How many travelers?
91	JTR → ATH, business.	Passengers	How many travelers?
92	Naxos → Mykonos, next weekend.	Passengers	How many travelers?
93	Santorini → Paros today.	Passengers	How many travelers?
94	ATH → JMK early morning.	Date + passengers	When would you like to fly, and how many travelers?
95	Paros → Naxos, cheapest.	Date + passengers	When would you like to fly, and how many travelers?
96	ATH → JTR for 2 adults.	Date	When would you like to depart?
97	Mykonos → Paros for 1 adult and 1 child.	Date	When do you want to travel?
98	JMK → JTR in economy.	Date + passengers	When would you like to fly, and how many travelers?
99	Paros → Santorini Friday.	Passengers	How many travelers?
100	ATH → PAS one-way.	Date + passengers	When would you like to fly, and how many travelers?
🚀 Final Result

You now have 100 Cyclades-only flight prompts, all redesigned with:

Perfect conversational realism

Missing-field detection

Trigger logic

Follow-up questions

ATH ↔ Cyclades + Inter-Cyclades routes

If you want next:
🔥 The JSON schema + trigger engine for all prompts
🔥 Regex for every island + date format detection
🔥 AI logic flow for chats → API calls

Just say "Give me the JSON".