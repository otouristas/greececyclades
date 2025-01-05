import axios from 'axios';

const API_KEY = '5ae2e3f221c38a28845f05b6173224a629a140ad843593c1067cdad5';
const BASE_URL = 'https://api.opentripmap.com/0.1/en/places';

export const PlaceCategories = {
  CULTURAL: 'cultural',
  HISTORIC: 'historic',
  ARCHITECTURE: 'architecture',
  NATURAL: 'natural',
  BEACHES: 'beaches',
  AMUSEMENTS: 'amusements',
  FOODS: 'foods',
  SHOPS: 'shops',
  TRANSPORT: 'transport',
  SPORT: 'sport'
} as const;

export type PlaceCategory = typeof PlaceCategories[keyof typeof PlaceCategories];

export interface Place {
  xid: string;
  name: string;
  dist?: number;
  rate?: string;
  wikidata?: string;
  kinds?: string;
  point: {
    lat: number;
    lon: number;
  };
}

export interface PlaceDetails extends Place {
  info?: {
    descr?: string;
    image?: string;
    src?: string;
    src_id?: number;
    title?: string;
  };
  wikipedia_extracts?: {
    text?: string;
    html?: string;
    title?: string;
  };
  preview?: {
    source: string;
    height: number;
    width: number;
  };
  wikipedia?: string;
  url?: string;
  image?: string;
  address?: {
    city?: string;
    state?: string;
    suburb?: string;
    country?: string;
    county?: string;
    postcode?: string;
    pedestrian?: string;
    country_code?: string;
    house_number?: string;
    road?: string;
  };
}

export interface AutosuggestParams {
  name: string;
  lat: number;
  lon: number;
  radius?: string;
  limit?: number;
}

export interface NearbyParams {
  lat: number;
  lon: number;
  radius?: number;
  kinds?: PlaceCategory[];
  rate?: string;
  format?: string;
  limit?: number;
  offset?: number;
}

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
    format: 'json'
  }
});

export async function getAutosuggestions(params: AutosuggestParams): Promise<Place[]> {
  const response = await api.get('/autosuggest', {
    params: {
      ...params,
      radius: params.radius || '5000',
      lon: params.lon,
      lat: params.lat,
      format: 'json'
    }
  });
  return response.data;
}

export async function getPlacesNearby(params: NearbyParams): Promise<Place[]> {
  const response = await api.get('/radius', {
    params: {
      ...params,
      radius: params.radius || 2000,
      kinds: params.kinds?.join(','),
      format: 'json',
      limit: params.limit || 20,
      offset: params.offset || 0
    }
  });
  return response.data;
}

export async function getPlaceDetails(xid: string): Promise<PlaceDetails> {
  const response = await api.get(`/xid/${xid}`);
  return response.data;
}

export async function getPlacesByName(name: string): Promise<Place[]> {
  const response = await api.get('/geoname', {
    params: {
      name,
      format: 'json'
    }
  });
  return response.data;
}

export function getPlaceIcon(place: Place): string {
  const kinds = place.kinds?.split(',') || [];
  
  if (place.rate === '3' || kinds.includes('historic')) {
    return '🏺'; // Historic or highly rated
  } else if (kinds.includes('cultural')) {
    return '🏛️'; // Cultural
  } else if (kinds.includes('religion')) {
    return '⛪'; // Religious
  } else if (kinds.includes('natural')) {
    return '🌲'; // Natural
  } else if (kinds.includes('architecture')) {
    return '🏰'; // Architecture
  } else if (kinds.includes('museums')) {
    return '🏛️'; // Museums
  } else if (kinds.includes('amusements')) {
    return '🎡'; // Entertainment
  } else if (kinds.includes('foods')) {
    return '🍽️'; // Food & Drinks
  }
  
  return '📍'; // Default
}
