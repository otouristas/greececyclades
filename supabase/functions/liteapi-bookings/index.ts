import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
};

/**
 * LiteAPI Bookings Management Edge Function
 * 
 * Manage bookings: list, retrieve, and cancel.
 * 
 * GET /liteapi-bookings
 *   - List bookings by guestId or clientReference
 *   - Get specific booking by bookingId
 * 
 * PUT /liteapi-bookings
 *   - Cancel a booking by bookingId
 * 
 * Parameters:
 * - bookingId: Specific booking ID (for retrieve or cancel)
 * - guestId: Filter by guest ID
 * - clientReference: Filter by your internal reference
 * - timeout: Request timeout in seconds
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

    // Handle GET requests (list or retrieve bookings)
    if (req.method === 'GET') {
      const bookingId = url.searchParams.get('bookingId');
      const guestId = url.searchParams.get('guestId');
      const clientReference = url.searchParams.get('clientReference');
      const timeout = url.searchParams.get('timeout') || '4';

      let apiUrl: string;
      
      if (bookingId) {
        // Retrieve specific booking
        apiUrl = `https://book.liteapi.travel/v3.0/bookings/${bookingId}?timeout=${timeout}`;
      } else {
        // List bookings with optional filters
        const params = new URLSearchParams({ timeout });
        if (guestId) params.set('guestId', guestId);
        if (clientReference) params.set('clientReference', clientReference);
        apiUrl = `https://book.liteapi.travel/v3.0/bookings?${params.toString()}`;
      }

      console.log('LiteAPI Bookings GET:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'X-API-Key': LITEAPI_KEY,
          'accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('LiteAPI Bookings error:', data);
        return new Response(
          JSON.stringify({ error: data }),
          { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify(data),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle PUT requests (cancel booking)
    if (req.method === 'PUT') {
      const bookingId = url.searchParams.get('bookingId');
      
      if (!bookingId) {
        return new Response(
          JSON.stringify({ error: 'bookingId is required for cancellation' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('LiteAPI Cancel Booking:', bookingId);

      // Call LiteAPI Cancel endpoint
      const response = await fetch(
        `https://book.liteapi.travel/v3.0/bookings/${bookingId}`,
        {
          method: 'PUT',
          headers: {
            'X-API-Key': LITEAPI_KEY,
            'accept': 'application/json',
            'content-type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('LiteAPI Cancel error:', data);
        return new Response(
          JSON.stringify({ error: data }),
          { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify(data),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed. Use GET or PUT.' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in liteapi-bookings:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
