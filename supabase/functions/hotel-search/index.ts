import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { ApifyClient } from "https://esm.sh/apify-client@2.20.0";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface HotelSearchRequest {
    search: string;
    island?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    rooms?: number;
    currency?: string;
    maxItems?: number;
}

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const APIFY_API_KEY = Deno.env.get("APIFY_API_KEY");
        if (!APIFY_API_KEY) {
            throw new Error("APIFY_API_KEY is not configured");
        }

        const requestData: HotelSearchRequest = await req.json();

        // Build search query - support island-specific or general search
        const searchQuery = requestData.island
            ? `${requestData.island}, Cyclades, Greece`
            : requestData.search || "Santorini, Greece";

        // Initialize Apify client
        const client = new ApifyClient({ token: APIFY_API_KEY });

        // Prepare Actor input for Booking.com scraper
        const input = {
            search: searchQuery,
            maxItems: requestData.maxItems || 20,
            checkIn: requestData.checkIn || "",
            checkOut: requestData.checkOut || "",
            propertyType: "none",
            sortBy: "review_score_and_price",
            currency: requestData.currency || "EUR",
            language: "en-gb",
            rooms: requestData.rooms || 1,
            adults: requestData.adults || 2,
            children: requestData.children || 0,
            minMaxPrice: "0-999999"
        };

        console.log("Running hotel search with input:", input);

        // Run the Booking.com scraper Actor
        const run = await client.actor("voyager/booking-scraper").call(input);

        // Fetch results from the dataset
        const { items } = await client.dataset(run.defaultDatasetId).listItems();

        console.log(`Fetched ${items.length} hotels`);

        // Transform data to match our schema
        const transformedHotels = items.map((hotel: Record<string, unknown>) => ({
            id: (hotel.url as string) || (hotel.name as string),
            name: hotel.name as string,
            island: requestData.island || extractIslandFromAddress(hotel.address as string),
            location: hotel.address as string || searchQuery,
            price: (hotel.price as { value?: number })?.value || 0,
            currency: (hotel.price as { currency?: string })?.currency || "EUR",
            rating: (hotel.reviews as { score?: number })?.score || 0,
            reviewCount: (hotel.reviews as { count?: number })?.count || 0,
            image: (hotel.images as string[])?.[0] || "/placeholder.svg",
            url: hotel.url as string,
            description: hotel.description as string || "",
            amenities: (hotel.facilities as string[]) || [],
            stars: (hotel.stars as number) || 0,
            source: "booking.com",
            latitude: (hotel.location as { lat?: number })?.lat ||
                (hotel.gps_coordinates as { latitude?: number })?.latitude || null,
            longitude: (hotel.location as { lon?: number })?.lon ||
                (hotel.location as { lng?: number })?.lng ||
                (hotel.gps_coordinates as { longitude?: number })?.longitude || null
        }));

        return new Response(
            JSON.stringify({
                success: true,
                hotels: transformedHotels,
                count: transformedHotels.length,
                island: requestData.island,
                searchQuery
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200
            }
        );

    } catch (error) {
        console.error("Hotel search error:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error"
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500
            }
        );
    }
});

// Helper to extract island name from address
function extractIslandFromAddress(address: string): string | null {
    if (!address) return null;

    const islands = [
        "santorini", "mykonos", "naxos", "paros", "milos", "ios",
        "sifnos", "folegandros", "koufonisia", "amorgos", "syros",
        "tinos", "serifos", "kimolos", "andros", "kea", "sikinos",
        "anafi", "thirassia", "donousa", "schinoussa", "iraklia"
    ];

    const lowerAddress = address.toLowerCase();
    for (const island of islands) {
        if (lowerAddress.includes(island)) {
            return island.charAt(0).toUpperCase() + island.slice(1);
        }
    }
    return null;
}
