import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * LiteAPI Book Edge Function
 * 
 * Completes a hotel booking after payment. Supports:
 * - Guest details with occupancy numbers
 * - Client reference for your internal tracking
 * - Guest ID for loyalty program integration
 * 
 * Guest format (one per room):
 * { occupancyNumber: 1, firstName: "John", lastName: "Doe", email: "john@example.com" }
 * 
 * IMPORTANT: occupancyNumber starts at 1 and corresponds to each room (not guest count)
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

    const body = await req.json();
    
    const { 
      prebookId, 
      holder, 
      payment, 
      guests,
      clientReference, // Optional: Your internal booking reference
      guestId, // Optional: LiteAPI guest ID for loyalty program
    } = body;

    // Validate required fields
    if (!prebookId || !holder || !payment || !guests) {
      return new Response(
        JSON.stringify({ error: 'prebookId, holder, payment, and guests are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate holder
    if (!holder.firstName || !holder.lastName || !holder.email) {
      return new Response(
        JSON.stringify({ error: 'holder must have firstName, lastName, and email' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate payment
    if (!payment.method || !payment.transactionId) {
      return new Response(
        JSON.stringify({ error: 'payment must have method and transactionId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate guests array
    if (!Array.isArray(guests) || guests.length === 0) {
      return new Response(
        JSON.stringify({ error: 'guests must be a non-empty array with one guest per room' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate each guest has required fields
    for (const guest of guests) {
      if (!guest.occupancyNumber || !guest.firstName || !guest.lastName) {
        return new Response(
          JSON.stringify({ 
            error: 'Each guest must have occupancyNumber (starting from 1), firstName, and lastName',
            invalidGuest: guest 
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Build book request body
    const requestBody: any = {
      prebookId,
      holder: {
        firstName: holder.firstName,
        lastName: holder.lastName,
        email: holder.email,
        ...(holder.phone && { phone: holder.phone }),
      },
      payment: {
        method: 'TRANSACTION_ID',
        transactionId: payment.transactionId,
      },
      guests: guests.map((guest: any) => ({
        occupancyNumber: guest.occupancyNumber,
        firstName: guest.firstName,
        lastName: guest.lastName,
        ...(guest.email && { email: guest.email }),
        ...(guest.remarks && { remarks: guest.remarks }),
      })),
    };

    // Add optional client reference (for your internal tracking)
    if (clientReference) {
      requestBody.clientReference = clientReference;
    }

    // Add optional guest ID (for loyalty program)
    if (guestId) {
      requestBody.guestId = guestId;
    }

    console.log('LiteAPI Book request:', JSON.stringify(requestBody, null, 2));

    // Call LiteAPI Book endpoint
    const response = await fetch(
      'https://book.liteapi.travel/v3.0/rates/book',
      {
        method: 'POST',
        headers: {
          'X-API-Key': LITEAPI_KEY,
          'accept': 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();
    
    console.log('LiteAPI Book response status:', response.status);

    if (!response.ok) {
      console.error('LiteAPI Book error:', data);
      return new Response(
        JSON.stringify({ error: data }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Booking successful:', data.data?.bookingId);

    return new Response(
      JSON.stringify(data),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in liteapi-book:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

