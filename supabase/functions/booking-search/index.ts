import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { ApifyClient } from "https://esm.sh/apify-client@2.20.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingSearchRequest {
  search: string;
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

    const requestData: BookingSearchRequest = await req.json();
    
    // Initialize Apify client
    const client = new ApifyClient({ token: APIFY_API_KEY });

    // Prepare Actor input
    const input = {
      search: requestData.search || "Santorini, Greece",
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

    console.log("Running Booking.com scraper with input:", input);

    // Run the Booking.com scraper Actor
    const run = await client.actor("voyager/booking-scraper").call(input);

    // Fetch results from the dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    console.log(`Fetched ${items.length} hotels from Booking.com`);

    // Transform data to match our format
    const transformedHotels = items.map((hotel: any) => ({
      id: hotel.url || hotel.name,
      name: hotel.name,
      location: hotel.address || requestData.search,
      price: hotel.price?.value || 0,
      currency: hotel.price?.currency || "EUR",
      rating: hotel.reviews?.score || 0,
      reviewCount: hotel.reviews?.count || 0,
      image: hotel.images?.[0] || "/placeholder.svg",
      url: hotel.url,
      description: hotel.description || "",
      amenities: hotel.facilities || [],
      stars: hotel.stars || 0,
      source: "booking.com",
      latitude: hotel.location?.lat || hotel.gps_coordinates?.latitude || null,
      longitude: hotel.location?.lon || hotel.location?.lng || hotel.gps_coordinates?.longitude || null
    }));

    return new Response(
      JSON.stringify({ 
        success: true, 
        hotels: transformedHotels,
        count: transformedHotels.length 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Booking search error:", error);
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
