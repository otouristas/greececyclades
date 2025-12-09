/**
 * Makcorps Hotel Price API Service
 * Provides interfaces and functions for interacting with Makcorps hotel price APIs
 */

// Mapping API Types
export interface MappingResponseItem {
  autobroadened: string;
  type: 'HOTEL' | 'GEO' | 'ATTRACTION';
  title: string;
  document_id: string;
  scope: string;
  name: string;
  data_type: string;
  details: {
    placetype: number;
    parent_name?: string;
    address?: string;
    grandparent_name?: string;
    grandparent_id?: number;
    parent_id?: number;
    grandparent_place_type?: number;
    highlighted_name: string;
    name: string;
    parent_place_type?: number;
    parent_ids?: number[];
    geo_name?: string;
  };
  value: number;
  coords?: string;
}

export type MappingResponse = MappingResponseItem[];

// City Search API Types
export interface CitySearchHotel {
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
  vendor1?: string;
  price1?: string;
  vendor2?: string;
  price2?: string;
  vendor3?: string;
  price3?: string;
  vendor4?: string;
  price4?: string;
}

export interface CitySearchMetadata {
  totalHotelCount: number;
  totalpageCount: number;
  currentPageHotelsCount: number;
  currentPageNumber: number;
}

export type CitySearchResponse = CitySearchHotel[] | [CitySearchHotel[], CitySearchMetadata];

// Hotel Price Comparison API Types
export interface VendorPrice {
  vendor: string;
  price: string | null;
  tax?: string | null;
}

export interface HotelPriceComparison {
  vendor1?: string;
  price1?: string;
  tax1?: string;
  vendor2?: string;
  price2?: string;
  tax2?: string;
  vendor3?: string;
  price3?: string;
  tax3?: string;
  vendor4?: string;
  price4?: string;
  tax4?: string;
  vendor5?: string;
  price5?: string;
  tax5?: string;
  vendor6?: string;
  price6?: string;
  tax6?: string;
  vendor7?: string;
  price7?: string;
  tax7?: string;
  vendor8?: string;
  price8?: string;
  tax8?: string;
  vendor9?: string;
  price9?: string;
  tax9?: string;
  vendor10?: string;
  price10?: string;
  tax10?: string;
  vendor11?: string;
  price11?: string;
  tax11?: string;
  vendor12?: string;
  price12?: string;
  tax12?: string;
  vendor13?: string;
  price13?: string;
  tax13?: string;
  vendor14?: string;
  price14?: string;
  tax14?: string;
  vendor15?: string;
  price15?: string;
  tax15?: string;
  vendor16?: string;
  price16?: string;
  tax16?: string;
  vendor17?: string;
  price17?: string;
  tax17?: string;
  vendor18?: string;
  price18?: string;
  tax18?: string;
  vendor19?: string;
  price19?: string;
  tax19?: string;
}

export interface HotelPriceResponse {
  comparison: HotelPriceComparison[][];
}

// API Request Parameters
export interface MappingParams {
  api_key: string;
  name: string;
}

export interface CitySearchParams {
  api_key: string;
  cityid: string;
  pagination: number;
  cur: string;
  rooms: number;
  adults: number;
  checkin: string;
  checkout: string;
  tax?: boolean;
  children?: number;
}

export interface HotelPriceParams {
  api_key: string;
  hotelid: string;
  rooms: number;
  adults: number;
  checkin: string;
  checkout: string;
  cur: string;
}

/**
 * Find city or hotel ID using Mapping API
 */
export async function findCityId(
  cityName: string,
  apiKey: string
): Promise<MappingResponseItem | null> {
  try {
    const url = new URL('https://api.makcorps.com/mapping');
    url.searchParams.append('api_key', apiKey);
    url.searchParams.append('name', cityName);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Mapping API error: ${response.status} ${response.statusText}`);
    }

    const data: MappingResponse = await response.json();

    // Find the first GEO type result (city) or HOTEL type
    const cityResult = data.find(
      (item) => item.type === 'GEO' && item.data_type === 'LOCATION'
    );
    const hotelResult = data.find(
      (item) => item.type === 'HOTEL' && item.data_type === 'LOCATION'
    );

    return cityResult || hotelResult || data[0] || null;
  } catch (error) {
    console.error('Error finding city ID:', error);
    throw error;
  }
}

/**
 * Search hotels by city ID
 */
export async function searchHotelsByCity(
  params: CitySearchParams
): Promise<{ hotels: CitySearchHotel[]; metadata?: CitySearchMetadata }> {
  try {
    const url = new URL('https://api.makcorps.com/city');
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`City Search API error: ${response.status} ${response.statusText}`);
    }

    const data: CitySearchResponse = await response.json();

    // Handle response format: array of hotels or [hotels, metadata]
    if (Array.isArray(data) && data.length > 0) {
      if (Array.isArray(data[0])) {
        // Format: [hotels[], metadata]
        const hotels = data[0] as CitySearchHotel[];
        const metadata = data[1] as CitySearchMetadata;
        return { hotels, metadata };
      } else {
        // Format: hotels[] (last item might be metadata)
        const lastItem = data[data.length - 1];
        if (lastItem && 'totalHotelCount' in lastItem) {
          const hotels = data.slice(0, -1) as CitySearchHotel[];
          const metadata = lastItem as unknown as CitySearchMetadata;
          return { hotels, metadata };
        }
        return { hotels: data as CitySearchHotel[] };
      }
    }

    return { hotels: [] };
  } catch (error) {
    console.error('Error searching hotels by city:', error);
    throw error;
  }
}

/**
 * Get hotel prices from multiple vendors
 */
export async function getHotelPrices(
  params: HotelPriceParams
): Promise<VendorPrice[]> {
  try {
    const url = new URL('https://api.makcorps.com/hotel');
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Hotel Price API error: ${response.status} ${response.statusText}`);
    }

    const data: HotelPriceResponse = await response.json();

    // Extract vendor prices from comparison array
    const vendorPrices: VendorPrice[] = [];

    if (data.comparison && data.comparison.length > 0) {
      const comparison = data.comparison[0][0]; // Get first comparison object

      // Extract all vendor-price pairs (vendor1-price1 through vendor19-price19)
      for (let i = 1; i <= 19; i++) {
        const vendor = (comparison as any)[`vendor${i}`];
        const price = (comparison as any)[`price${i}`];
        const tax = (comparison as any)[`tax${i}`];

        if (vendor && price) {
          vendorPrices.push({
            vendor,
            price,
            tax: tax || null,
          });
        }
      }
    }

    return vendorPrices;
  } catch (error) {
    console.error('Error getting hotel prices:', error);
    throw error;
  }
}

/**
 * Parse price string to number (removes currency symbols)
 */
export function parsePrice(priceString: string | undefined): number {
  if (!priceString) return 0;
  // Remove currency symbols and parse
  const cleaned = priceString.replace(/[^\d.,]/g, '').replace(',', '');
  return parseFloat(cleaned) || 0;
}

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, currency: string = 'EUR'): string {
  const symbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency;
  return `${symbol}${price.toFixed(2)}`;
}

