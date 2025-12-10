import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Pre-defined Cyclades Islands City IDs for MakCorps API
const CYCLADES_CITY_IDS: Record<string, string> = {
    'santorini': '189433',
    'mykonos': '189410',
    'naxos': '189418',
    'paros': '189421',
    'milos': '189408',
    'ios': '189400',
    'sifnos': '189430',
    'folegandros': '189393',
    'amorgos': '189379',
    'andros': '189380',
    'tinos': '189443',
    'syros': '189439',
    'kea': '189403',
    'kythnos': '189405',
    'serifos': '189428',
    'sikinos': '189431',
    'antiparos': '189385',
    'koufonisia': '505030',
    'schinoussa': '2633945',
    'iraklia': '2633946',
    'donousa': '2633947',
    'kimolos': '189404',
    'thirasia': '189442',
    'anafi': '189378',
};

interface HotelResult {
    geocode: {
        latitude: number;
        longitude: number;
    };
    telephone?: string;
    name: string;
    hotelId: number;
    reviews: {
        rating: number;
        count: number;
    };
    vendors: Array<{
        name: string;
        price: string;
        priceNumeric: number;
    }>;
    lowestPrice: number;
    lowestPriceVendor: string;
}

interface SearchMetadata {
    totalHotelCount: number;
    totalPageCount: number;
    currentPageHotelsCount: number;
    currentPageNumber: number;
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const MAKCORPS_API_KEY = Deno.env.get('MAKCORPS_API_KEY');

        if (!MAKCORPS_API_KEY) {
            console.error('Makcorps API key not configured');
            return new Response(
                JSON.stringify({ error: 'Makcorps API credentials not configured' }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const {
            destination,
            cityId: providedCityId,
            checkInDate,
            checkOutDate,
            adults = 2,
            children = 0,
            rooms = 1,
            currency = 'EUR',
            pagination = 0,
            includeTax = true,
        } = await req.json();

        // Get city ID from destination name or use provided cityId
        let cityId = providedCityId;
        if (!cityId && destination) {
            const normalizedDestination = destination.toLowerCase().trim();
            cityId = CYCLADES_CITY_IDS[normalizedDestination];

            if (!cityId) {
                return new Response(
                    JSON.stringify({
                        error: 'Unknown destination',
                        message: `"${destination}" is not a supported Cyclades island`,
                        supportedDestinations: Object.keys(CYCLADES_CITY_IDS)
                    }),
                    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }
        }

        if (!cityId) {
            return new Response(
                JSON.stringify({ error: 'Either destination or cityId is required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

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
        url.searchParams.append('cityid', cityId);
        url.searchParams.append('pagination', String(pagination));
        url.searchParams.append('cur', currency);
        url.searchParams.append('rooms', String(rooms));
        url.searchParams.append('adults', String(adults));
        url.searchParams.append('checkin', checkInDate);
        url.searchParams.append('checkout', checkOutDate);
        if (children > 0) {
            url.searchParams.append('children', String(children));
        }
        if (includeTax) {
            url.searchParams.append('tax', 'true');
        }

        console.log('Calling Makcorps City API for Hotel Marketplace');

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

        const rawData = await makcorpsResponse.json();

        // Parse and transform the response
        const hotels: HotelResult[] = [];
        let metadata: SearchMetadata | null = null;

        // Helper to parse price string to number
        const parsePrice = (priceStr: string | undefined): number => {
            if (!priceStr) return 0;
            const cleaned = priceStr.replace(/[^0-9.,]/g, '').replace(',', '');
            return parseFloat(cleaned) || 0;
        };

        if (Array.isArray(rawData)) {
            for (const item of rawData) {
                // Check if this is metadata (last item in array)
                if (Array.isArray(item) && item[0]?.totalHotelCount !== undefined) {
                    metadata = {
                        totalHotelCount: item[0].totalHotelCount,
                        totalPageCount: item[0].totalpageCount,
                        currentPageHotelsCount: item[0].currentPageHotelsCount,
                        currentPageNumber: item[0].currentPageNumber,
                    };
                    continue;
                }

                // Skip if not a hotel object
                if (!item.hotelId || !item.name) continue;

                // Extract vendors and prices
                const vendors: Array<{ name: string; price: string; priceNumeric: number }> = [];
                for (let i = 1; i <= 4; i++) {
                    const vendorKey = `vendor${i}` as keyof typeof item;
                    const priceKey = `price${i}` as keyof typeof item;
                    if (item[vendorKey] && item[priceKey]) {
                        const priceNumeric = parsePrice(item[priceKey] as string);
                        // Only add if price is valid (greater than 0)
                        if (priceNumeric > 0) {
                            vendors.push({
                                name: item[vendorKey] as string,
                                price: item[priceKey] as string,
                                priceNumeric,
                            });
                        }
                    }
                }

                // SKIP hotels with no available prices/vendors
                if (vendors.length === 0) {
                    continue;
                }

                // Sort vendors by price (lowest first)
                vendors.sort((a, b) => a.priceNumeric - b.priceNumeric);

                const hotel: HotelResult = {
                    geocode: item.geocode || { latitude: 0, longitude: 0 },
                    telephone: item.telephone,
                    name: item.name,
                    hotelId: item.hotelId,
                    reviews: item.reviews || { rating: 0, count: 0 },
                    vendors,
                    lowestPrice: vendors[0]?.priceNumeric || 0,
                    lowestPriceVendor: vendors[0]?.name || '',
                };

                hotels.push(hotel);
            }
        }

        // Sort hotels by lowest price (most affordable first)
        hotels.sort((a, b) => a.lowestPrice - b.lowestPrice);

        console.log(`Hotel Marketplace: Found ${hotels.length} hotels for city ${cityId}`);

        return new Response(
            JSON.stringify({
                hotels,
                metadata,
                destination: destination || Object.keys(CYCLADES_CITY_IDS).find(k => CYCLADES_CITY_IDS[k] === cityId),
                searchParams: {
                    cityId,
                    checkInDate,
                    checkOutDate,
                    adults,
                    children,
                    rooms,
                    currency,
                    pagination,
                },
            }),
            {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Error in hotel-marketplace function:', error);
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
