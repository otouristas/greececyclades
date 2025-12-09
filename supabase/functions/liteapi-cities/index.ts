import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LITEAPI_KEY = Deno.env.get('LITEAPI_KEY');
    if (!LITEAPI_KEY) {
      throw new Error('LITEAPI_KEY not configured');
    }

    const url = new URL(req.url);
    const countryCode = url.searchParams.get('countryCode');
    const timeout = url.searchParams.get('timeout') || '4';

    // Build query parameters
    const params = new URLSearchParams({ timeout });
    if (countryCode) {
      params.append('countryCode', countryCode);
    }

    // Call LiteAPI Cities endpoint
    const response = await fetch(
      `https://api.liteapi.travel/v3.0/data/cities?${params.toString()}`,
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
    console.error('Error in liteapi-cities:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
