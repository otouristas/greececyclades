const MARINE_TRAFFIC_API_KEY = process.env.REACT_APP_MARINE_TRAFFIC_API_KEY;
const BASE_URL = 'https://services.marinetraffic.com/api';

interface VesselPosition {
  mmsi: string;
  imo: string;
  ship_name: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  course: number;
  status: string;
  timestamp: string;
  destination: string;
  eta: string;
}

interface VesselInfo {
  mmsi: string;
  imo: string;
  name: string;
  type: string;
  company: string;
  flag: string;
  year_built: number;
  length: number;
  width: number;
}

export async function getVesselPositions(mmsiList: string[]): Promise<VesselPosition[]> {
  try {
    const params = new URLSearchParams({
      protocol: 'jsono',
      msgtype: 'simple',
      key: MARINE_TRAFFIC_API_KEY || '',
      mmsi: mmsiList.join(',')
    });

    const response = await fetch(`${BASE_URL}/exportvessel/v:5/${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch vessel positions');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching vessel positions:', error);
    throw error;
  }
}

export async function getVesselDetails(mmsi: string): Promise<VesselInfo> {
  try {
    const params = new URLSearchParams({
      protocol: 'jsono',
      msgtype: 'simple',
      key: MARINE_TRAFFIC_API_KEY || '',
      mmsi: mmsi
    });

    const response = await fetch(`${BASE_URL}/vesselmasterdata/v:3/${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch vessel details');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching vessel details:', error);
    throw error;
  }
}

// Ferry routes between Greek islands
export const FERRY_ROUTES = [
  {
    id: '1',
    from: 'Piraeus',
    to: 'Santorini',
    operator: 'Blue Star Ferries',
    vessels: ['234567890', '234567891'], // MMSI numbers
    duration: '8 hours',
    frequency: 'Daily'
  },
  {
    id: '2',
    from: 'Piraeus',
    to: 'Mykonos',
    operator: 'SeaJets',
    vessels: ['234567892', '234567893'],
    duration: '5 hours',
    frequency: 'Daily'
  },
  {
    id: '3',
    from: 'Santorini',
    to: 'Mykonos',
    operator: 'Hellenic Seaways',
    vessels: ['234567894'],
    duration: '2.5 hours',
    frequency: 'Daily'
  },
  {
    id: '4',
    from: 'Mykonos',
    to: 'Naxos',
    operator: 'Blue Star Ferries',
    vessels: ['234567895'],
    duration: '1 hour',
    frequency: 'Daily'
  }
];
