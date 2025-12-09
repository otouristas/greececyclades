import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const AGODA_SITE_ID = Deno.env.get('AGODA_SITE_ID');
    const AGODA_API_KEY = Deno.env.get('AGODA_API_KEY');

    console.log('AGODA_SITE_ID exists:', !!AGODA_SITE_ID);
    console.log('AGODA_API_KEY exists:', !!AGODA_API_KEY);
    console.log('AGODA_SITE_ID length:', AGODA_SITE_ID?.length);
    console.log('AGODA_API_KEY length:', AGODA_API_KEY?.length);

    if (!AGODA_SITE_ID || !AGODA_API_KEY) {
      console.error('Agoda credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Agoda API credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { 
      checkInDate, 
      checkOutDate, 
      numberOfAdult = 2, 
      numberOfChildren = 0,
      currency = 'USD',
      language = 'en-us',
      maxResult = 30,
      sortBy = 'Recommended'
    } = await req.json();

    if (!checkInDate || !checkOutDate) {
      return new Response(
        JSON.stringify({ error: 'Check-in and check-out dates are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const requestBody = {
      criteria: {
        checkInDate,
        checkOutDate,
        cityId: 16084, // Santorini city ID
        additional: {
          currency,
          language,
          maxResult,
          sortBy,
          discountOnly: false,
          minimumReviewScore: 0,
          minimumStarRating: 0,
          occupancy: {
            numberOfAdult,
            numberOfChildren
          }
        }
      }
    };

    console.log('Calling Agoda API with:', JSON.stringify(requestBody));

    const agodaResponse = await fetch(
      'http://affiliateapi7643.agoda.com/affiliateservice/lt_v1',
      {
        method: 'POST',
        headers: {
          'Authorization': `${AGODA_SITE_ID}:${AGODA_API_KEY}`,
          'Accept-Encoding': 'gzip,deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!agodaResponse.ok) {
      const errorText = await agodaResponse.text();
      console.error('Agoda API error:', agodaResponse.status, errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch hotels from Agoda',
          details: errorText 
        }),
        { 
          status: agodaResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await agodaResponse.json();
    console.log('Agoda API response:', JSON.stringify(data));

    return new Response(
      JSON.stringify(data),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in agoda-search function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
