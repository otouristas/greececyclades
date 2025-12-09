import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    const hotelId = url.searchParams.get('hotelId');
    const timeout = url.searchParams.get('timeout') || '4';

    if (!hotelId) {
      return new Response(
        JSON.stringify({ error: 'hotelId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call LiteAPI Hotel Details endpoint
    const response = await fetch(
      `https://api.liteapi.travel/v3.0/data/hotel?hotelId=${hotelId}&timeout=${timeout}`,
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
    console.error('Error in liteapi-hotel-details:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

