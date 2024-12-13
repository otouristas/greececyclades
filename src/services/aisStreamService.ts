// AIS Stream API key
const AIS_STREAM_API_KEY = '63c262135a39ae8777dbd353db2d0fc43849a3f9';

// Greek Cyclades bounding box coordinates
const CYCLADES_BOUNDING_BOX = [
  [36.5, 24.0], // Southwest corner
  [38.0, 26.0]  // Northeast corner
];

// Ferry MMSI numbers for major Greek ferry operators
export const GREEK_FERRY_MMSI = [
  "237583000", // Blue Star Ferries
  "237884000", // Hellenic Seaways
  "239235000", // SeaJets
  "237007900", // Aegean Speed Lines
  "237031800"  // Golden Star Ferries
];

export interface AISMessage {
  MessageType: string;
  MetaData: {
    MMSI: string;
    ShipName: string;
    latitude: number;
    longitude: number;
    time_utc: string;
  };
  Message: {
    PositionReport?: {
      Latitude: number;
      Longitude: number;
      Cog: number;
      Sog: number;
      TrueHeading: number;
      NavigationalStatus: number;
    };
    ShipStaticData?: {
      Name: string;
      CallSign: string;
      Type: number;
      Destination: string;
    };
  };
}

export class AISStreamService {
  private socket: WebSocket | null = null;
  private messageHandlers: ((message: AISMessage) => void)[] = [];

  constructor() {
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  connect() {
    if (this.socket?.readyState === WebSocket.OPEN) {
      console.log('Already connected to AIS Stream');
      return;
    }

    // Close any existing socket
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    try {
      console.log('Connecting to AIS Stream...');
      this.socket = new WebSocket('wss://stream.aisstream.io/v0/stream');

      this.socket.onopen = () => {
        console.log('Connected to AIS Stream, sending subscription message...');
        if (!this.socket) return;

        try {
          const subscriptionMessage = {
            APIKey: AIS_STREAM_API_KEY,
            BoundingBoxes: [[CYCLADES_BOUNDING_BOX[0][0], CYCLADES_BOUNDING_BOX[0][1], 
                            CYCLADES_BOUNDING_BOX[1][0], CYCLADES_BOUNDING_BOX[1][1]]],
            FiltersShipMMSI: GREEK_FERRY_MMSI,
            FilterMessageTypes: ["PositionReport", "ShipStaticData"]
          };

          console.log('Subscription message:', subscriptionMessage);
          this.socket.send(JSON.stringify(subscriptionMessage));
        } catch (error) {
          console.error('Error sending subscription message:', error);
        }
      };

      this.socket.onmessage = (event) => {
        try {
          const message: AISMessage = JSON.parse(event.data);
          console.log('Received AIS message:', message);
          this.messageHandlers.forEach(handler => handler(message));
        } catch (error) {
          console.error('Error parsing AIS message:', error);
        }
      };

      this.socket.onerror = (error) => {
        console.error('AIS Stream WebSocket error:', error);
      };

      this.socket.onclose = (event) => {
        console.log('Disconnected from AIS Stream:', event.code, event.reason);
        this.socket = null;
        // Attempt to reconnect after 5 seconds if not intentionally closed
        if (event.code !== 1000) {
          console.log('Connection closed unexpectedly, attempting to reconnect in 5 seconds...');
          setTimeout(() => this.connect(), 5000);
        }
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  subscribe(handler: (message: AISMessage) => void) {
    this.messageHandlers.push(handler);
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.connect();
    }
  }

  unsubscribe(handler: (message: AISMessage) => void) {
    this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    if (this.messageHandlers.length === 0) {
      this.disconnect();
    }
  }
}

export const aisStreamService = new AISStreamService();

// Ferry routes between Greek islands
export const FERRY_ROUTES = [
  {
    id: 'piraeus-santorini',
    operator: 'Blue Star Ferries',
    mmsi: ['237583000'],
    destinations: [
      { name: 'Piraeus', coordinates: [37.9475, 23.6247] },
      { name: 'Paros', coordinates: [37.0853, 25.1521] },
      { name: 'Naxos', coordinates: [37.1061, 25.3725] },
      { name: 'Santorini', coordinates: [36.3932, 25.4615] }
    ]
  },
  {
    id: 'piraeus-mykonos',
    operator: 'Hellenic Seaways',
    mmsi: ['237884000'],
    destinations: [
      { name: 'Piraeus', coordinates: [37.9475, 23.6247] },
      { name: 'Syros', coordinates: [37.4446, 24.9419] },
      { name: 'Mykonos', coordinates: [37.4467, 25.3289] }
    ]
  },
  {
    id: 'rafina-cyclades',
    operator: 'Golden Star Ferries',
    mmsi: ['237031800'],
    destinations: [
      { name: 'Rafina', coordinates: [38.0231, 24.0096] },
      { name: 'Andros', coordinates: [37.8418, 24.9432] },
      { name: 'Tinos', coordinates: [37.5360, 25.1583] },
      { name: 'Mykonos', coordinates: [37.4467, 25.3289] }
    ]
  },
  {
    id: 'piraeus-milos',
    operator: 'SeaJets',
    mmsi: ['239235000'],
    destinations: [
      { name: 'Piraeus', coordinates: [37.9475, 23.6247] },
      { name: 'Sifnos', coordinates: [36.9750, 24.7467] },
      { name: 'Milos', coordinates: [36.7225, 24.4292] }
    ]
  },
  {
    id: 'paros-naxos',
    operator: 'Aegean Speed Lines',
    mmsi: ['237007900'],
    destinations: [
      { name: 'Paros', coordinates: [37.0853, 25.1521] },
      { name: 'Naxos', coordinates: [37.1061, 25.3725] },
      { name: 'Koufonisia', coordinates: [36.9417, 25.6028] },
      { name: 'Amorgos', coordinates: [36.8241, 25.8867] }
    ]
  }
];
