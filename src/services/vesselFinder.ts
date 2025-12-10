/**
 * VesselFinder API Client - Real-Time Ferry Tracking
 * Implements vessel tracking from readytoship.md
 * 
 * Provides live vessel positions, ETA predictions, and delay alerts
 */

import { supabase } from '@/lib/supabase';

// ============================================
// TYPES
// ============================================

export interface VesselPositionData {
  imo: string;
  mmsi?: string;
  name: string;
  latitude: number;
  longitude: number;
  speed: number; // knots
  heading: number; // degrees
  course: number;
  destination: string;
  eta: Date | null;
  status: VesselStatus;
  lastUpdate: Date;
  type: string;
  flag: string;
}

export interface VesselMasterData {
  imo: string;
  name: string;
  type: string;
  flag: string;
  grossTonnage: number;
  lengthM: number;
  beamM: number;
  yearBuilt: number;
  operator?: string;
}

export interface VesselTrackingResult {
  status: 'success' | 'cached' | 'error';
  data?: VesselPositionData;
  enrichment?: VesselEnrichment;
  error?: string;
  source: 'cache' | 'api' | 'fallback';
  creditsCost: number;
}

export interface VesselEnrichment {
  distanceToDestinationNm: number;
  predictedEta: string | null;
  timeToArrivalHours: number | null;
  weather: {
    beaufortScale: number;
    waveHeightM: number;
    windDirection: string;
    visibilityKm: number;
  };
  delayAssessment: {
    isDelayed: boolean;
    etaVarianceHours: number | null;
    historicalAvgDelayMin: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
}

export interface TrackedFerry {
  id: string;
  userId: string;
  bookingId: string;
  vesselName: string;
  vesselImo: string;
  operator: string;
  originPort: string;
  destinationPort: string;
  scheduledDeparture: string;
  scheduledArrival: string;
  isActive: boolean;
  lastPositionLat?: number;
  lastPositionLon?: number;
  currentSpeedKts?: number;
  vesselStatus?: VesselStatus;
  lastUpdatedAt: string;
}

export type VesselStatus = 
  | 'Underway' 
  | 'In Port' 
  | 'Moored' 
  | 'At Anchor' 
  | 'Not Under Command'
  | 'Unknown';

// ============================================
// CYCLADES PORT COORDINATES
// ============================================

export const PORT_COORDINATES: Record<string, { lat: number; lon: number; code: string }> = {
  'Piraeus': { lat: 37.9475, lon: 23.6447, code: 'PIR' },
  'Rafina': { lat: 38.0225, lon: 24.0097, code: 'RAF' },
  'Lavrio': { lat: 37.7125, lon: 24.0572, code: 'LAV' },
  'Santorini': { lat: 36.3932, lon: 25.4615, code: 'JTR' },
  'Mykonos': { lat: 37.4467, lon: 25.3289, code: 'JMK' },
  'Paros': { lat: 37.0853, lon: 25.1519, code: 'PAS' },
  'Naxos': { lat: 37.1033, lon: 25.3764, code: 'JNX' },
  'Ios': { lat: 36.7233, lon: 25.2833, code: 'IOS' },
  'Milos': { lat: 36.7264, lon: 24.4264, code: 'MLO' },
  'Syros': { lat: 37.4436, lon: 24.9417, code: 'JSY' },
  'Tinos': { lat: 37.5333, lon: 25.1667, code: 'TIN' },
  'Andros': { lat: 37.8333, lon: 24.9333, code: 'AND' },
  'Sifnos': { lat: 36.9333, lon: 24.7167, code: 'SIF' },
  'Serifos': { lat: 37.1500, lon: 24.5000, code: 'SER' },
  'Folegandros': { lat: 36.6167, lon: 24.9167, code: 'FOL' },
  'Sikinos': { lat: 36.6833, lon: 25.1167, code: 'SIK' },
  'Amorgos': { lat: 36.8333, lon: 25.8833, code: 'AMO' },
  'Koufonisia': { lat: 36.9333, lon: 25.6000, code: 'KOU' },
  'Donoussa': { lat: 37.0833, lon: 25.8000, code: 'DON' },
  'Schinoussa': { lat: 36.8667, lon: 25.5167, code: 'SCH' },
  'Iraklia': { lat: 36.8333, lon: 25.4667, code: 'IRA' },
  'Kea': { lat: 37.6167, lon: 24.3500, code: 'KEA' },
  'Kythnos': { lat: 37.3833, lon: 24.4167, code: 'KYT' },
  'Kimolos': { lat: 36.8000, lon: 24.5833, code: 'KIM' },
  'Anafi': { lat: 36.3667, lon: 25.7667, code: 'ANA' },
};

// ============================================
// CYCLADES FERRY OPERATORS & VESSELS
// ============================================

export const CYCLADES_FERRIES: Record<string, { imo: string; operator: string; type: string }> = {
  'Blue Star Delos': { imo: '9241786', operator: 'Blue Star Ferries', type: 'Conventional' },
  'Blue Star Naxos': { imo: '9241798', operator: 'Blue Star Ferries', type: 'Conventional' },
  'Blue Star Paros': { imo: '9426984', operator: 'Blue Star Ferries', type: 'Conventional' },
  'Blue Star Patmos': { imo: '9244871', operator: 'Blue Star Ferries', type: 'Conventional' },
  'Superferry': { imo: '8917294', operator: 'Blue Star Ferries', type: 'Conventional' },
  'Champions Jet 1': { imo: '9141871', operator: 'Seajets', type: 'High Speed' },
  'Champions Jet 2': { imo: '9176536', operator: 'Seajets', type: 'High Speed' },
  'WorldChampion Jet': { imo: '9215491', operator: 'Seajets', type: 'High Speed' },
  'SuperJet': { imo: '9141883', operator: 'Seajets', type: 'High Speed' },
  'Tera Jet': { imo: '8707581', operator: 'Seajets', type: 'High Speed' },
  'Naxos Jet': { imo: '9176524', operator: 'Seajets', type: 'High Speed' },
  'Paros Jet': { imo: '9176548', operator: 'Seajets', type: 'High Speed' },
  'Caldera Vista': { imo: '9855124', operator: 'SeaLink', type: 'High Speed' },
  'Express Skiathos': { imo: '9220360', operator: 'Hellenic Seaways', type: 'High Speed' },
  'Highspeed 4': { imo: '9203916', operator: 'Hellenic Seaways', type: 'High Speed' },
  'Highspeed 5': { imo: '9320286', operator: 'Hellenic Seaways', type: 'High Speed' },
  'Highspeed 6': { imo: '9356411', operator: 'Hellenic Seaways', type: 'High Speed' },
  'Flyingcat 4': { imo: '9082063', operator: 'Hellenic Seaways', type: 'Catamaran' },
  'Golden Star': { imo: '8917658', operator: 'Golden Star Ferries', type: 'Conventional' },
  'Superferry II': { imo: '8917270', operator: 'Golden Star Ferries', type: 'Conventional' },
  'Ekaterini P': { imo: '8000216', operator: 'Zante Ferries', type: 'Conventional' },
  'Dionisios Solomos': { imo: '7382786', operator: 'Zante Ferries', type: 'Conventional' },
  'Prevelis': { imo: '8501598', operator: 'Anek Lines', type: 'Conventional' },
  'Aqua Blue': { imo: '9312706', operator: 'Seajets', type: 'High Speed' },
};

// ============================================
// CACHE MANAGEMENT
// ============================================

const CACHE_MAX_AGE_MINUTES = 5;

interface CachedVesselData {
  data: VesselPositionData;
  cachedAt: Date;
}

const vesselCache = new Map<string, CachedVesselData>();

function isCacheFresh(cachedAt: Date): boolean {
  const now = new Date();
  const diffMinutes = (now.getTime() - cachedAt.getTime()) / (1000 * 60);
  return diffMinutes < CACHE_MAX_AGE_MINUTES;
}

// ============================================
// VESSEL LOOKUP
// ============================================

export function lookupVesselByName(name: string): { imo: string; operator: string } | null {
  // Exact match
  if (CYCLADES_FERRIES[name]) {
    return CYCLADES_FERRIES[name];
  }
  
  // Fuzzy match
  const lowerName = name.toLowerCase();
  for (const [vesselName, data] of Object.entries(CYCLADES_FERRIES)) {
    if (vesselName.toLowerCase().includes(lowerName) || 
        lowerName.includes(vesselName.toLowerCase())) {
      return data;
    }
  }
  
  return null;
}

export function lookupPortCoordinates(portName: string): { lat: number; lon: number } | null {
  // Exact match
  if (PORT_COORDINATES[portName]) {
    return PORT_COORDINATES[portName];
  }
  
  // Fuzzy match
  const lowerPort = portName.toLowerCase();
  for (const [port, coords] of Object.entries(PORT_COORDINATES)) {
    if (port.toLowerCase().includes(lowerPort) || 
        lowerPort.includes(port.toLowerCase())) {
      return coords;
    }
  }
  
  return null;
}

// ============================================
// DISTANCE CALCULATION
// ============================================

export function calculateNauticalDistance(
  from: { lat: number; lon: number },
  to: { lat: number; lon: number }
): number {
  const R = 3440.065; // Earth's radius in nautical miles
  const dLat = toRad(to.lat - from.lat);
  const dLon = toRad(to.lon - from.lon);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// ============================================
// VESSEL TRACKING SERVICE
// ============================================

export async function trackVessel(
  identifier: { imo?: string; name?: string; bookingId?: string; useLatest?: boolean },
  userId?: string
): Promise<VesselTrackingResult> {
  try {
    let vesselImo: string | undefined;
    let vesselName: string | undefined;
    
    // Resolve vessel identifier
    if (identifier.imo) {
      vesselImo = identifier.imo;
    } else if (identifier.name) {
      const lookup = lookupVesselByName(identifier.name);
      if (lookup) {
        vesselImo = lookup.imo;
        vesselName = identifier.name;
      }
    } else if (identifier.bookingId || identifier.useLatest) {
      // Look up from user's bookings in Supabase
      const booking = await lookupUserBooking(userId, identifier.bookingId);
      if (booking) {
        vesselImo = booking.vesselImo;
        vesselName = booking.vesselName;
      }
    }
    
    if (!vesselImo) {
      return {
        status: 'error',
        error: 'Could not identify vessel. Please provide vessel name or IMO number.',
        source: 'fallback',
        creditsCost: 0,
      };
    }
    
    // Check cache first
    const cached = vesselCache.get(vesselImo);
    if (cached && isCacheFresh(cached.cachedAt)) {
      const enrichment = await enrichVesselData(cached.data);
      return {
        status: 'cached',
        data: cached.data,
        enrichment,
        source: 'cache',
        creditsCost: 0,
      };
    }
    
    // Check Supabase cache
    const supabaseCache = await getSupabaseCache(vesselImo);
    if (supabaseCache && isCacheFresh(new Date(supabaseCache.fetchedAt))) {
      vesselCache.set(vesselImo, {
        data: supabaseCache.data,
        cachedAt: new Date(supabaseCache.fetchedAt),
      });
      
      const enrichment = await enrichVesselData(supabaseCache.data);
      return {
        status: 'cached',
        data: supabaseCache.data,
        enrichment,
        source: 'cache',
        creditsCost: 0,
      };
    }
    
    // Call VesselFinder API via Edge Function
    const apiResult = await callVesselFinderAPI(vesselImo);
    
    if (apiResult.status === 'success' && apiResult.data) {
      // Update cache
      vesselCache.set(vesselImo, {
        data: apiResult.data,
        cachedAt: new Date(),
      });
      
      // Save to Supabase cache
      await saveToSupabaseCache(vesselImo, apiResult.data);
      
      const enrichment = await enrichVesselData(apiResult.data);
      return {
        status: 'success',
        data: apiResult.data,
        enrichment,
        source: 'api',
        creditsCost: 5,
      };
    }
    
    return {
      status: 'error',
      error: apiResult.error || 'Failed to fetch vessel data',
      source: 'fallback',
      creditsCost: 0,
    };
    
  } catch (error) {
    console.error('Vessel tracking error:', error);
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      source: 'fallback',
      creditsCost: 0,
    };
  }
}

// ============================================
// SUPABASE OPERATIONS
// ============================================

async function lookupUserBooking(
  userId?: string, 
  bookingId?: string
): Promise<TrackedFerry | null> {
  if (!userId && !bookingId) return null;
  
  try {
    let query = supabase
      .from('ferries_tracked')
      .select('*')
      .eq('is_active', true);
    
    if (bookingId) {
      query = query.eq('booking_id', bookingId);
    } else if (userId) {
      query = query
        .eq('user_id', userId)
        .order('scheduled_departure', { ascending: true })
        .limit(1);
    }
    
    const { data, error } = await query.single();
    
    if (error || !data) return null;
    
    return {
      id: data.id,
      userId: data.user_id,
      bookingId: data.booking_id,
      vesselName: data.vessel_name,
      vesselImo: data.vessel_imo,
      operator: data.operator,
      originPort: data.origin_port,
      destinationPort: data.destination_port,
      scheduledDeparture: data.scheduled_departure,
      scheduledArrival: data.scheduled_arrival,
      isActive: data.is_active,
      lastPositionLat: data.last_position_lat,
      lastPositionLon: data.last_position_lon,
      currentSpeedKts: data.current_speed_kts,
      vesselStatus: data.vessel_status,
      lastUpdatedAt: data.last_updated_at,
    };
  } catch (error) {
    console.error('Error looking up booking:', error);
    return null;
  }
}

async function getSupabaseCache(vesselImo: string): Promise<{ data: VesselPositionData; fetchedAt: string } | null> {
  try {
    const { data, error } = await supabase
      .from('vessel_tracking_cache')
      .select('*')
      .eq('vessel_imo', vesselImo)
      .order('fetched_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error || !data) return null;
    
    return {
      data: {
        imo: data.vessel_imo,
        name: data.position_data?.name || 'Unknown',
        latitude: data.latitude,
        longitude: data.longitude,
        speed: data.speed_kts,
        heading: data.heading,
        course: data.heading,
        destination: data.destination_port,
        eta: data.eta ? new Date(data.eta) : null,
        status: data.position_data?.status || 'Unknown',
        lastUpdate: new Date(data.source_timestamp),
        type: data.position_data?.type || 'Ferry',
        flag: data.position_data?.flag || 'GR',
      },
      fetchedAt: data.fetched_at,
    };
  } catch (error) {
    console.error('Error getting Supabase cache:', error);
    return null;
  }
}

async function saveToSupabaseCache(vesselImo: string, data: VesselPositionData): Promise<void> {
  try {
    await supabase.from('vessel_tracking_cache').insert({
      vessel_imo: vesselImo,
      position_data: data,
      latitude: data.latitude,
      longitude: data.longitude,
      speed_kts: data.speed,
      heading: data.heading,
      destination_port: data.destination,
      eta: data.eta?.toISOString(),
      ais_coverage_available: true,
      source_timestamp: data.lastUpdate.toISOString(),
      request_cost_credits: 5,
    });
  } catch (error) {
    console.error('Error saving to Supabase cache:', error);
  }
}

// ============================================
// VESSELFINDER API CALL (via Edge Function)
// ============================================

async function callVesselFinderAPI(imo: string): Promise<{ status: string; data?: VesselPositionData; error?: string }> {
  try {
    const { data: session } = await supabase.auth.getSession();
    
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vessel-tracker`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.session?.access_token || ''}`,
        },
        body: JSON.stringify({ imo }),
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      return { status: 'error', error: error.message || 'API call failed' };
    }
    
    const result = await response.json();
    return { status: 'success', data: result.data };
  } catch (error) {
    console.error('VesselFinder API error:', error);
    return { status: 'error', error: 'Failed to contact vessel tracking service' };
  }
}

// ============================================
// DATA ENRICHMENT
// ============================================

async function enrichVesselData(vessel: VesselPositionData): Promise<VesselEnrichment> {
  const destCoords = lookupPortCoordinates(vessel.destination);
  
  let distanceNm = 0;
  let timeToArrival: number | null = null;
  let predictedEta: string | null = null;
  
  if (destCoords && vessel.latitude && vessel.longitude) {
    distanceNm = calculateNauticalDistance(
      { lat: vessel.latitude, lon: vessel.longitude },
      destCoords
    );
    
    if (vessel.speed > 0) {
      timeToArrival = distanceNm / vessel.speed;
      const arrival = new Date(Date.now() + timeToArrival * 60 * 60 * 1000);
      predictedEta = arrival.toISOString();
    }
  }
  
  // Basic weather assessment based on location
  const weather = {
    beaufortScale: 4, // Default moderate
    waveHeightM: 1.0,
    windDirection: 'N',
    visibilityKm: 10,
  };
  
  // Delay assessment
  let etaVariance: number | null = null;
  let isDelayed = false;
  
  if (vessel.eta && predictedEta) {
    const reportedEta = vessel.eta.getTime();
    const calculatedEta = new Date(predictedEta).getTime();
    etaVariance = (calculatedEta - reportedEta) / (1000 * 60 * 60); // hours
    isDelayed = etaVariance > 0.5; // More than 30 min late
  }
  
  const riskLevel: 'low' | 'medium' | 'high' = 
    weather.beaufortScale > 6 ? 'high' :
    weather.beaufortScale > 4 ? 'medium' : 'low';
  
  return {
    distanceToDestinationNm: Math.round(distanceNm * 10) / 10,
    predictedEta,
    timeToArrivalHours: timeToArrival ? Math.round(timeToArrival * 10) / 10 : null,
    weather,
    delayAssessment: {
      isDelayed,
      etaVarianceHours: etaVariance,
      historicalAvgDelayMin: 15, // Would come from historical data
      riskLevel,
    },
  };
}

// ============================================
// RESPONSE GENERATION
// ============================================

export function generateVesselTrackingResponse(result: VesselTrackingResult): string {
  if (result.status === 'error') {
    return `❌ I couldn't track your vessel right now. ${result.error}\n\nWould you like me to search for ferry schedules instead?`;
  }
  
  const v = result.data!;
  const e = result.enrichment!;
  
  let response = `🚢 **${v.name}** (IMO: ${v.imo})\n\n`;
  
  response += `**Current Status:**\n`;
  response += `• Position: ${v.latitude.toFixed(4)}°N, ${v.longitude.toFixed(4)}°E\n`;
  response += `• Speed: ${v.speed} knots\n`;
  response += `• Heading: ${v.heading}°\n`;
  response += `• Status: ${v.status}\n\n`;
  
  response += `**Route Information:**\n`;
  response += `• Destination: ${v.destination}\n`;
  response += `• Distance Remaining: ${e.distanceToDestinationNm} nautical miles\n`;
  
  if (e.timeToArrivalHours) {
    const hours = Math.floor(e.timeToArrivalHours);
    const mins = Math.round((e.timeToArrivalHours - hours) * 60);
    response += `• Time to Arrival: ${hours}h ${mins}m\n`;
  }
  
  if (e.predictedEta) {
    const eta = new Date(e.predictedEta);
    response += `• Predicted Arrival: ${eta.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}\n`;
  }
  
  // Weather warning
  if (e.weather.beaufortScale > 4) {
    response += `\n⚠️ **Weather Alert:**\n`;
    response += `• Wind: ${e.weather.beaufortScale} Beaufort\n`;
    response += `• Wave Height: ${e.weather.waveHeightM}m\n`;
    response += `• Risk Level: ${e.delayAssessment.riskLevel.toUpperCase()}\n`;
  }
  
  // Delay warning
  if (e.delayAssessment.isDelayed && e.delayAssessment.etaVarianceHours) {
    const delayMins = Math.round(e.delayAssessment.etaVarianceHours * 60);
    response += `\n⏱️ **Delay Alert:**\n`;
    response += `• Estimated delay: ~${delayMins} minutes\n`;
  }
  
  // Smart recommendations
  const tips: string[] = [];
  
  if (e.weather.beaufortScale > 4) {
    tips.push('🤢 Moderate waves expected—have motion sickness tablet handy');
  }
  
  if (e.timeToArrivalHours && e.timeToArrivalHours < 1) {
    tips.push('🎒 Start packing—arrival in less than 1 hour');
  }
  
  if (v.status === 'In Port') {
    tips.push('⚓ Ferry is currently in port—boarding may start soon');
  }
  
  if (tips.length > 0) {
    response += `\n💡 **Smart Tips:**\n`;
    tips.forEach(tip => response += `• ${tip}\n`);
  }
  
  return response;
}

// ============================================
// EXPORT
// ============================================

export default {
  trackVessel,
  generateVesselTrackingResponse,
  lookupVesselByName,
  lookupPortCoordinates,
  calculateNauticalDistance,
  CYCLADES_FERRIES,
  PORT_COORDINATES,
};
