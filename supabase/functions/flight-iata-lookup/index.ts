// @ts-nocheck - Deno runtime types not available in VS Code
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface IataLookupRequest {
    name: string;
    type: "airport" | "airline";
}

interface IataResult {
    code: string;
    name: string;
}

serve(async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const FLIGHTAPI_KEY = Deno.env.get("FLIGHTAPI_KEY");
        if (!FLIGHTAPI_KEY) {
            throw new Error("FLIGHTAPI_KEY is not configured");
        }

        const requestData: IataLookupRequest = await req.json();
        const { name, type = "airport" } = requestData;

        if (!name || name.length < 2) {
            return new Response(
                JSON.stringify({
                    success: true,
                    results: [],
                }),
                { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
            );
        }

        // Build API URL
        const apiUrl = `https://api.flightapi.io/iata/${FLIGHTAPI_KEY}?name=${encodeURIComponent(name)}&type=${type}`;

        console.log("Calling FlightAPI IATA lookup for:", name, type);

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "FlightAPI IATA lookup failed");
        }

        // Transform the response
        const results: IataResult[] = (data.data || []).map((item: any) => ({
            code: item.fs || item.iata || "",
            name: item.name || "",
        }));

        return new Response(
            JSON.stringify({
                success: true,
                results,
                count: results.length,
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
        );
    } catch (error) {
        console.error("IATA lookup error:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
                results: [],
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
        );
    }
});
