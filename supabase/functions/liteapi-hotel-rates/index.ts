import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LITEAPI_KEY = Deno.env.get("LITEAPI_KEY");
    if (!LITEAPI_KEY) {
      throw new Error("LITEAPI_KEY not configured");
    }

    const body = await req.json();

    const {
      // Required parameters
      occupancies,
      currency = "EUR",
      guestNationality = "GR",
      checkin,
      checkout,
      
      // Location search methods (at least one required)
      countryCode,
      cityName,
      placeId,
      hotelIds,
      aiSearch,
      iataCode,
      latitude,
      longitude,
      radius,
      
      // Room/rate options
      roomMapping = true,
      maxRatesPerHotel = 1,
      includeHotelData = true,
      stream = false,
      limit,
      offset,
      timeout = 10, // Request timeout in seconds (recommended 6-12)
      
      // Filtering options
      boardType, // RO (Room Only), BB (Bed & Breakfast), HB (Half Board), FB (Full Board), AI (All Inclusive)
      refundableRatesOnly, // Only show refundable rates
      starRating, // Array of star ratings e.g. [4, 5]
      minRating, // Minimum guest rating (0-5 scale)
      minReviewsCount, // Minimum number of reviews
      hotelName, // Search by hotel name
      hotelTypeIds, // Array of hotel type IDs
      chainIds, // Array of hotel chain IDs
      facilities, // Array of facility IDs
      strictFacilityFiltering, // Require ALL facilities (not just one)
      advancedAccessibilityOnly, // Only accessible hotels
      zip, // Filter by zip code
      
      // Sorting
      sort, // Array of {field: 'price'|'top_picks', direction: 'ascending'|'descending'}
    } = body;

    // Validate required fields
    if (!occupancies || !checkin || !checkout) {
      return new Response(JSON.stringify({ error: "occupancies, checkin, and checkout are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Must have at least one location method
    const hasLocationMethod = countryCode || cityName || placeId || hotelIds || aiSearch || iataCode || (latitude && longitude);
    if (!hasLocationMethod) {
      return new Response(
        JSON.stringify({ error: "At least one location method required: countryCode+cityName, placeId, hotelIds, aiSearch, iataCode, or latitude+longitude" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Normalize occupancies - ensure children is always an array (never a number)
    const normalizedOccupancies = occupancies.map((occ: any) => {
      let childrenArray: number[] = [];
      
      // Explicitly handle all cases
      if (occ.children === undefined || occ.children === null) {
        childrenArray = [];
      } else if (Array.isArray(occ.children)) {
        childrenArray = occ.children;
      } else if (typeof occ.children === 'number') {
        // If it's a number (including 0), convert to array
        // If number > 0, create array with that many zeros (ages)
        childrenArray = occ.children > 0 ? Array(occ.children).fill(0) : [];
      } else {
        // If it's something else, try to convert
        childrenArray = [occ.children];
      }
      
      const normalized = {
        adults: occ.adults,
        children: childrenArray
      };
      
      // Debug log to verify normalization
      if (typeof occ.children === 'number' || occ.children === 0) {
        console.log(`Normalized children from ${occ.children} (${typeof occ.children}) to array:`, childrenArray);
      }
      
      return normalized;
    });

    // Build request body with all supported parameters
    const requestBody: any = {
      occupancies: normalizedOccupancies,
      currency,
      guestNationality,
      checkin,
      checkout,
      roomMapping,
      maxRatesPerHotel,
      includeHotelData,
      timeout,
    };

    // Location parameters
    if (countryCode) requestBody.countryCode = countryCode;
    if (cityName) requestBody.cityName = cityName;
    if (placeId) requestBody.placeId = placeId;
    if (hotelIds) requestBody.hotelIds = hotelIds;
    if (aiSearch) requestBody.aiSearch = aiSearch;
    if (iataCode) requestBody.iataCode = iataCode;
    
    // Geo-search parameters
    if (latitude && longitude) {
      requestBody.latitude = latitude;
      requestBody.longitude = longitude;
      if (radius) requestBody.radius = radius;
    }
    
    // Pagination parameters
    if (limit) requestBody.limit = limit;
    if (offset) requestBody.offset = offset;
    
    // Filtering parameters
    if (boardType) requestBody.boardType = boardType;
    if (refundableRatesOnly === true) requestBody.refundableRatesOnly = true;
    if (starRating && Array.isArray(starRating)) requestBody.starRating = starRating;
    if (minRating !== undefined) requestBody.minRating = minRating;
    if (minReviewsCount !== undefined) requestBody.minReviewsCount = minReviewsCount;
    if (hotelName) requestBody.hotelName = hotelName;
    if (hotelTypeIds && Array.isArray(hotelTypeIds)) requestBody.hotelTypeIds = hotelTypeIds;
    if (chainIds && Array.isArray(chainIds)) requestBody.chainIds = chainIds;
    if (facilities && Array.isArray(facilities)) requestBody.facilities = facilities;
    if (strictFacilityFiltering === true) requestBody.strictFacilityFiltering = true;
    if (advancedAccessibilityOnly === true) requestBody.advancedAccessibilityOnly = true;
    if (zip) requestBody.zip = zip;
    
    // Sorting parameter
    if (sort && Array.isArray(sort)) requestBody.sort = sort;
    
    // Streaming parameter
    if (stream) requestBody.stream = true;

    // Final check: ensure children is always an array in the final request (defensive)
    if (requestBody.occupancies) {
      requestBody.occupancies = requestBody.occupancies.map((occ: any) => {
        // Force children to be an array - handle all edge cases
        let finalChildren: number[] = [];
        if (Array.isArray(occ.children)) {
          finalChildren = occ.children;
        } else if (typeof occ.children === 'number') {
          finalChildren = occ.children > 0 ? Array(occ.children).fill(0) : [];
        } else {
          finalChildren = [];
        }
        
        // Log if we had to fix something
        if (!Array.isArray(occ.children)) {
          console.log(`⚠️ Fixed children from ${JSON.stringify(occ.children)} (${typeof occ.children}) to array:`, finalChildren);
        }
        
        return {
          ...occ,
          children: finalChildren
        };
      });
    }

    // Verify before sending
    const hasInvalidChildren = requestBody.occupancies?.some((occ: any) => !Array.isArray(occ.children));
    if (hasInvalidChildren) {
      console.error("❌ CRITICAL: Found non-array children after normalization!", requestBody.occupancies);
    }

    console.log("Calling LiteAPI with request:", JSON.stringify(requestBody, null, 2));

    // If streaming, handle the stream response
    if (stream) {
      const response = await fetch("https://api.liteapi.travel/v3.0/hotels/rates", {
        method: "POST",
        headers: {
          "X-API-Key": LITEAPI_KEY,
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return new Response(
          JSON.stringify({
            error: errorData.error || errorData.message || "LiteAPI request failed",
            details: errorData,
          }),
          { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      // Stream the response back to the client
      return new Response(response.body, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Non-streaming response (original behavior)
    const response = await fetch("https://api.liteapi.travel/v3.0/hotels/rates", {
      method: "POST",
      headers: {
        "X-API-Key": LITEAPI_KEY,
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log("LiteAPI response status:", response.status);
    console.log("LiteAPI response data sample:", JSON.stringify(data, null, 2).substring(0, 1000));

    if (!response.ok) {
      console.error("LiteAPI error:", data);
      return new Response(
        JSON.stringify({
          error: data.error || data.message || "LiteAPI request failed",
          details: data,
        }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in liteapi-hotel-rates:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
