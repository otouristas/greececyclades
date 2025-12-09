import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * LiteAPI Weather Edge Function
 * 
 * Get weather forecasts for specific locations.
 * Perfect for travel planning and destination information.
 * 
 * Parameters:
 * - latitude: Location latitude (required)
 * - longitude: Location longitude (required)
 * - startDate: Start date YYYY-MM-DD (required)
 * - endDate: End date YYYY-MM-DD (required)
 * - units: 'metric' or 'imperial' (optional, default: metric)
 * 
 * Note: Forecasts beyond one week have reduced accuracy.
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LITEAPI_KEY = Deno.env.get('LITEAPI_KEY');
    if (!LITEAPI_KEY) {
      throw new Error('LITEAPI_KEY not configured');
    }

    const url = new URL(req.url);
    const latitude = url.searchParams.get('latitude');
    const longitude = url.searchParams.get('longitude');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const units = url.searchParams.get('units') || 'metric';

    // Validate required parameters
    if (!latitude || !longitude || !startDate || !endDate) {
      return new Response(
        JSON.stringify({ error: 'latitude, longitude, startDate, and endDate are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build query parameters
    const params = new URLSearchParams({
      latitude,
      longitude,
      startDate,
      endDate,
      units,
    });

    console.log('LiteAPI Weather request:', params.toString());

    // Call LiteAPI Weather endpoint
    const response = await fetch(
      `https://api.liteapi.travel/v3.0/data/weather?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'X-API-Key': LITEAPI_KEY,
          'accept': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('LiteAPI Weather error:', data);
      return new Response(
        JSON.stringify({ error: data }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(data),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in liteapi-weather:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
