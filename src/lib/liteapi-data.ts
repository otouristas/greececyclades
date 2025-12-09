/**
 * LiteAPI Data endpoints for countries, cities, and IATA codes
 */

import { supabase } from '@/integrations/supabase/client';

const getSupabaseFunctionsUrl = () => {
  // Use the environment variable that's set in .env
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uhkyhakvvobszqghntqi.supabase.co';
  return `${supabaseUrl}/functions/v1`;
};

export interface Country {
  code: string;
  name: string;
}

export interface City {
  name: string;
}

/**
 * Get list of all countries
 */
export async function getCountries(): Promise<Country[]> {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    
    const response = await fetch(`${getSupabaseFunctionsUrl()}/liteapi-countries`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch countries');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching countries:', error);
    // Return empty array instead of throwing to prevent app crash
    return [];
  }
}

/**
 * Get list of cities for a specific country
 */
export async function getCities(countryCode: string): Promise<City[]> {
  if (!countryCode) return [];

  try {
    const { data: sessionData } = await supabase.auth.getSession();
    
    const response = await fetch(
      `${getSupabaseFunctionsUrl()}/liteapi-cities?countryCode=${countryCode}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch cities');
    }

    const data = await response.json();
    // Map response { city: "Name" } to { name: "Name" }
    return (data.data || []).map((item: any) => ({
      name: item.city
    }));
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}
