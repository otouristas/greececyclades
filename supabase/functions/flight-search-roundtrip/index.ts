// @ts-nocheck - Deno runtime types not available in VS Code
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RoundtripSearchRequest {
    departureAirport: string;
    arrivalAirport: string;
    departureDate: string;
    returnDate: string;
    adults: number;
    children: number;
    infants: number;
    cabinClass: "Economy" | "Business" | "First" | "Premium_Economy";
    currency: string;
}

interface TransformedFlight {
    id: string;
    price: number;
    currency: string;
    outbound: FlightLeg;
    inbound: FlightLeg;
    bookingUrl: string;
}

interface FlightLeg {
    airline: string;
    airlineLogo: string;
    departure: {
        airport: string;
        time: string;
        date: string;
    };
    arrival: {
        airport: string;
        time: string;
        date: string;
    };
    duration: number;
    stops: number;
    segments: Array<{
        flightNumber: string;
        departure: { airport: string; time: string };
        arrival: { airport: string; time: string };
        duration: number;
        airline: string;
    }>;
}

serve(async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const FLIGHTAPI_KEY = Deno.env.get("FLIGHTAPI_KEY");
        if (!FLIGHTAPI_KEY) {
            throw new Error("FLIGHTAPI_KEY is not configured");
        }

        const requestData: RoundtripSearchRequest = await req.json();

        const {
            departureAirport,
            arrivalAirport,
            departureDate,
            returnDate,
            adults = 1,
            children = 0,
            infants = 0,
            cabinClass = "Economy",
            currency = "EUR",
        } = requestData;

        // Validate required fields
        if (!departureAirport || !arrivalAirport || !departureDate || !returnDate) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Missing required fields: departureAirport, arrivalAirport, departureDate, returnDate",
                }),
                { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
            );
        }

        // Build API URL
        const apiUrl = `https://api.flightapi.io/roundtrip/${FLIGHTAPI_KEY}/${departureAirport}/${arrivalAirport}/${departureDate}/${returnDate}/${adults}/${children}/${infants}/${cabinClass}/${currency}`;

        console.log("Calling FlightAPI:", apiUrl.replace(FLIGHTAPI_KEY, "***"));

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "FlightAPI request failed");
        }

        // Transform the response
        const flights = transformRoundtripData(data);

        return new Response(
            JSON.stringify({
                success: true,
                flights,
                count: flights.length,
                searchParams: {
                    from: departureAirport,
                    to: arrivalAirport,
                    departureDate,
                    returnDate,
                    passengers: adults + children + infants,
                },
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
        );
    } catch (error) {
        console.error("Flight search error:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
        );
    }
});

function transformRoundtripData(data: any): TransformedFlight[] {
    if (!data.itineraries || !Array.isArray(data.itineraries)) {
        return [];
    }

    const places = new Map(data.places?.map((p: any) => [p.id, p]) || []);
    const carriers = new Map(data.carriers?.map((c: any) => [c.id, c]) || []);
    const legs = new Map(data.legs?.map((l: any) => [l.id, l]) || []);
    const segments = new Map(data.segments?.map((s: any) => [s.id, s]) || []);

    return data.itineraries.slice(0, 20).map((itinerary: any) => {
        const outboundLegId = itinerary.leg_ids?.[0];
        const inboundLegId = itinerary.leg_ids?.[1];

        const outboundLeg: any = legs.get(outboundLegId) || {};
        const inboundLeg: any = legs.get(inboundLegId) || {};

        const pricingOption = itinerary.pricing_options?.[0];
        const price = pricingOption?.price?.amount || itinerary.cheapest_price?.amount || 0;

        // Extract booking URL
        let bookingUrl = "";
        if (pricingOption?.items?.[0]?.url) {
            bookingUrl = pricingOption.items[0].url.startsWith("http")
                ? pricingOption.items[0].url
                : `https://www.skyscanner.com${pricingOption.items[0].url}`;
        }

        return {
            id: itinerary.id || `${outboundLegId}-${inboundLegId}-${Date.now()}`,
            price,
            currency: data.context?.currency || "EUR",
            outbound: transformLeg(outboundLeg, places, carriers, segments),
            inbound: transformLeg(inboundLeg, places, carriers, segments),
            bookingUrl,
        };
    });
}

function transformLeg(leg: any, places: Map<any, any>, carriers: Map<any, any>, segments: Map<any, any>): FlightLeg {
    const originPlace: any = places.get(leg.origin_place_id) || {};
    const destPlace: any = places.get(leg.destination_place_id) || {};

    const carrierIds = leg.marketing_carrier_ids || [];
    const mainCarrier: any = carriers.get(carrierIds[0]) || {};

    const flightSegments = (leg.segment_ids || []).map((segId: string) => {
        const seg: any = segments.get(segId) || {};
        const segOrigin: any = places.get(seg.origin_place_id) || {};
        const segDest: any = places.get(seg.destination_place_id) || {};
        const segCarrier: any = carriers.get(seg.marketing_carrier_id) || {};

        return {
            flightNumber: `${segCarrier.iata || ""}${seg.marketing_flight_number || ""}`,
            departure: {
                airport: segOrigin.iata || segOrigin.name || "",
                time: seg.departure || "",
            },
            arrival: {
                airport: segDest.iata || segDest.name || "",
                time: seg.arrival || "",
            },
            duration: seg.duration || 0,
            airline: segCarrier.name || "",
        };
    });

    return {
        airline: mainCarrier.name || "Unknown Airline",
        airlineLogo: mainCarrier.logo_url || `https://logos.skyscnr.com/images/airlines/favicon/${mainCarrier.iata || "XX"}.png`,
        departure: {
            airport: originPlace.iata || originPlace.name || "",
            time: formatTime(leg.departure),
            date: formatDate(leg.departure),
        },
        arrival: {
            airport: destPlace.iata || destPlace.name || "",
            time: formatTime(leg.arrival),
            date: formatDate(leg.arrival),
        },
        duration: leg.duration || 0,
        stops: leg.stop_count || 0,
        segments: flightSegments,
    };
}

function formatTime(dateStr: string): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(dateStr: string): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
}
