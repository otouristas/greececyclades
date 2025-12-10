import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MappingResult {
    type: 'HOTEL' | 'GEO' | 'ATTRACTION';
    document_id: string;
    name: string;
    coords?: string;
    details: {
        address?: string;
        parent_name?: string;
        grandparent_name?: string;
        geo_name?: string;
    };
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

        const { query, type = 'all' } = await req.json();

        if (!query || query.length < 2) {
            return new Response(
                JSON.stringify({ error: 'Query must be at least 2 characters' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Build Makcorps Mapping API URL
        const url = new URL('https://api.makcorps.com/mapping');
        url.searchParams.append('api_key', MAKCORPS_API_KEY);
        url.searchParams.append('name', query);

        console.log('Calling Makcorps Mapping API for:', query);

        const makcorpsResponse = await fetch(url.toString());

        if (!makcorpsResponse.ok) {
            const errorText = await makcorpsResponse.text();
            console.error('Makcorps Mapping API error:', makcorpsResponse.status, errorText);
            return new Response(
                JSON.stringify({
                    error: 'Failed to lookup location',
                    details: errorText,
                }),
                {
                    status: makcorpsResponse.status,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                }
            );
        }

        const rawData = await makcorpsResponse.json();

        // Filter and transform results
        let results: MappingResult[] = [];

        if (Array.isArray(rawData)) {
            results = rawData
                .filter((item: MappingResult) => {
                    if (type === 'all') return true;
                    if (type === 'city') return item.type === 'GEO';
                    if (type === 'hotel') return item.type === 'HOTEL';
                    return true;
                })
                .map((item: MappingResult) => ({
                    type: item.type,
                    id: item.document_id,
                    name: item.name,
                    coords: item.coords,
                    address: item.details?.address,
                    city: item.details?.parent_name,
                    region: item.details?.grandparent_name,
                    geoName: item.details?.geo_name,
                }));
        }

        console.log(`Mapping API: Found ${results.length} results for "${query}"`);

        return new Response(
            JSON.stringify({
                results,
                query,
                resultCount: results.length,
            }),
            {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Error in hotel-mapping function:', error);
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
