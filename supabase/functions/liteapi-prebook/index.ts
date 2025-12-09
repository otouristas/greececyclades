import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * LiteAPI Prebook Edge Function
 * 
 * Creates a prebook session before payment. Supports:
 * - Voucher/discount codes
 * - Add-ons (Uber vouchers, eSIM packages)
 * 
 * Add-ons format:
 * - Uber: { addon: "uber", value: 20, currency: "USD" }
 * - eSIM: { addon: "esimply", value: 6.00, currency: "USD", addonDetails: { package_id: 1, destination_code: "GR", start_date: "2025-06-01", end_date: "2025-06-10" } }
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
      offerId,
      voucherCode, // Optional discount/voucher code
      addons, // Optional add-ons array (Uber vouchers, eSIM)
    } = body;

    if (!offerId) {
      return new Response(
        JSON.stringify({ error: 'offerId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build prebook request body
    const requestBody: any = {
      usePaymentSdk: true,
      offerId,
    };

    // Add voucher code if provided
    if (voucherCode) {
      requestBody.voucherCode = voucherCode;
    }

    // Add add-ons if provided (Uber vouchers, eSIM packages)
    if (addons && Array.isArray(addons) && addons.length > 0) {
      // Validate add-ons format
      const validAddons = addons.filter((addon: any) => {
        if (!addon.addon || !addon.value || !addon.currency) {
          return false;
        }
        // Uber vouchers: value must be $10-$100 in $10 increments
        if (addon.addon === 'uber') {
          return addon.value >= 10 && addon.value <= 100 && addon.value % 10 === 0;
        }
        // eSIM: must have addonDetails with package_id, destination_code, start_date, end_date
        if (addon.addon === 'esimply') {
          return addon.addonDetails?.package_id && 
                 addon.addonDetails?.destination_code && 
                 addon.addonDetails?.start_date && 
                 addon.addonDetails?.end_date;
        }
        return true;
      });
      
      if (validAddons.length > 0) {
        requestBody.addons = validAddons;
      }
    }

    console.log('LiteAPI Prebook request:', JSON.stringify(requestBody, null, 2));

    // Call LiteAPI Prebook endpoint
    const response = await fetch(
      'https://book.liteapi.travel/v3.0/rates/prebook',
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
    
    console.log('LiteAPI Prebook response status:', response.status);

    if (!response.ok) {
      console.error('LiteAPI Prebook error:', data);
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
    console.error('Error in liteapi-prebook:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

