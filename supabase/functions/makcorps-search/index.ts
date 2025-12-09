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
    const MAKCORPS_API_KEY = Deno.env.get('MAKCORPS_API_KEY');
    const SANTORINI_CITY_ID = Deno.env.get('MAKCORPS_SANTORINI_CITY_ID') || '189433';

    if (!MAKCORPS_API_KEY) {
      console.error('Makcorps API key not configured');
      return new Response(
        JSON.stringify({ error: 'Makcorps API credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const {
      checkInDate,
      checkOutDate,
      numberOfAdults = 2,
      numberOfChildren = 0,
      numberOfRooms = 1,
      currency = 'EUR',
      pagination = 0,
    } = await req.json();

    if (!checkInDate || !checkOutDate) {
      return new Response(
        JSON.stringify({ error: 'Check-in and check-out dates are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      return new Response(
        JSON.stringify({ error: 'Check-in date cannot be in the past' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (checkOut <= checkIn) {
      return new Response(
        JSON.stringify({ error: 'Check-out date must be after check-in date' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build Makcorps API URL
    const url = new URL('https://api.makcorps.com/city');
    url.searchParams.append('api_key', MAKCORPS_API_KEY);
    url.searchParams.append('cityid', SANTORINI_CITY_ID);
    url.searchParams.append('pagination', String(pagination));
    url.searchParams.append('cur', currency);
    url.searchParams.append('rooms', String(numberOfRooms));
    url.searchParams.append('adults', String(numberOfAdults));
    url.searchParams.append('checkin', checkInDate);
    url.searchParams.append('checkout', checkOutDate);
    if (numberOfChildren > 0) {
      url.searchParams.append('children', String(numberOfChildren));
    }

    console.log('Calling Makcorps City API:', url.toString());

    const makcorpsResponse = await fetch(url.toString());

    if (!makcorpsResponse.ok) {
      const errorText = await makcorpsResponse.text();
      console.error('Makcorps API error:', makcorpsResponse.status, errorText);
      return new Response(
        JSON.stringify({
          error: 'Failed to fetch hotels from Makcorps',
          details: errorText,
        }),
        {
          status: makcorpsResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await makcorpsResponse.json();
    console.log('Makcorps API response received, hotels count:', Array.isArray(data) ? data.length : 'unknown');

    // Return standardized response
    return new Response(
      JSON.stringify({
        makcorps_data: {
          results: data,
          pagination: pagination,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in makcorps-search function:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

