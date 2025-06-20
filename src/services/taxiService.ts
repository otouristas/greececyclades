import { supabase } from '../lib/supabase';

// Types for the taxi system
export interface TaxiDriver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  location: string;
  isAvailable: boolean;
  rating: number;
  pricePerKm: number;
  languages: string[];
  specialties: string[];
}

export interface TaxiRequest {
  id?: string;
  userId?: string;
  userPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  requestedTime: string;
  passengerCount: number;
  specialRequests?: string;
  estimatedDistance?: number;
  estimatedPrice?: number;
  driverId?: string;
  status: 'pending' | 'confirmed' | 'en_route' | 'completed' | 'cancelled';
  createdAt?: string;
}

export interface TaxiBookingResponse {
  success: boolean;
  message: string;
  requestId?: string;
  estimatedPrice?: number;
  estimatedArrival?: string;
  driverInfo?: TaxiDriver;
}

// Sifnos locations database
const sifnosLocations = [
  'Apollonia', 'Artemonas', 'Kastro', 'Kamares', 'Plathys Gialos',
  'Vathi', 'Faros', 'Chrissopigi', 'Cheronissos', 'Exambela',
  'Narlis Hotel', 'Elies Resort', 'Windmill Bella Vista', 'Verina Astra',
  'Hotel Anthoussa', 'Kamares Port', 'Apollonia Center', 'Traditional Village'
];

// Mock taxi drivers database (in production, this would come from Supabase)
const mockTaxiDrivers: TaxiDriver[] = [
  {
    id: 'driver_001',
    name: 'Γιάννης Παπαδόπουλος',
    phone: '+30694XXXXXXX',
    vehicle: 'Mercedes E-Class',
    location: 'Apollonia',
    isAvailable: true,
    rating: 4.8,
    pricePerKm: 2.5,
    languages: ['Greek', 'English'],
    specialties: ['Airport transfers', 'Island tours']
  },
  {
    id: 'driver_002',
    name: 'Μαρία Νικολάου',
    phone: '+30697XXXXXXX',
    vehicle: 'Toyota Corolla',
    location: 'Kamares',
    isAvailable: true,
    rating: 4.9,
    pricePerKm: 2.0,
    languages: ['Greek', 'English', 'German'],
    specialties: ['Beach transfers', 'Shopping trips']
  },
  {
    id: 'driver_003',
    name: 'Κώστας Αντωνίου',
    phone: '+30698XXXXXXX',
    vehicle: 'Hyundai i30',
    location: 'Artemonas',
    isAvailable: true,
    rating: 4.7,
    pricePerKm: 2.2,
    languages: ['Greek', 'English'],
    specialties: ['Night rides', 'Restaurant transfers']
  }
];

export class TaxiService {
  /**
   * Parse natural language taxi request
   */
  static parseNaturalLanguageRequest(input: string): Partial<TaxiRequest> {
    const request: Partial<TaxiRequest> = {
      status: 'pending',
      passengerCount: 1
    };

    // Extract phone number
    const phoneMatch = input.match(/(\+30|0)?[67]\d{8}/);
    if (phoneMatch) {
      request.userPhone = phoneMatch[0];
    }

    // Extract time
    const timePatterns = [
      /at (\d{1,2}):?(\d{2})?\s*(am|pm)?/i,
      /στις (\d{1,2}):?(\d{2})?/i,
      /(\d{1,2}):(\d{2})/
    ];

    for (const pattern of timePatterns) {
      const timeMatch = input.match(pattern);
      if (timeMatch) {
        request.requestedTime = timeMatch[0];
        break;
      }
    }

    // Extract locations
    const fromMatch = input.match(/from\s+([^to]+?)(?:\s+to|\s+at|$)/i);
    const toMatch = input.match(/to\s+([^at]+?)(?:\s+at|$)/i);

    if (fromMatch) {
      request.pickupLocation = fromMatch[1].trim();
    }
    if (toMatch) {
      request.dropoffLocation = toMatch[1].trim();
    }

    // Extract passenger count
    const passengerMatch = input.match(/(\d+)\s*(?:people|passengers|persons)/i);
    if (passengerMatch) {
      request.passengerCount = parseInt(passengerMatch[1]);
    }

    return request;
  }

  /**
   * Find the best available taxi driver
   */
  static findBestDriver(request: TaxiRequest): TaxiDriver | null {
    const availableDrivers = mockTaxiDrivers.filter(driver => driver.isAvailable);
    
    if (availableDrivers.length === 0) {
      return null;
    }

    // Simple algorithm: find closest driver with highest rating
    // In production, this would use actual GPS coordinates
    return availableDrivers.sort((a, b) => b.rating - a.rating)[0];
  }

  /**
   * Calculate estimated price and distance
   */
  static calculateEstimate(pickupLocation: string, dropoffLocation: string, pricePerKm: number): {
    distance: number;
    price: number;
    duration: number;
  } {
    // Mock calculation - in production, use Google Maps API
    const mockDistances: { [key: string]: number } = {
      'Kamares-Apollonia': 5,
      'Apollonia-Kastro': 3,
      'Apollonia-Plathys Gialos': 12,
      'Kamares-Plathys Gialos': 15,
      'Narlis Hotel-Apollonia': 2,
      'default': 8
    };

    const routeKey = `${pickupLocation}-${dropoffLocation}`;
    const distance = mockDistances[routeKey] || mockDistances['default'];
    const price = Math.round(distance * pricePerKm * 100) / 100;
    const duration = Math.round(distance * 2); // 2 minutes per km

    return { distance, price, duration };
  }

  /**
   * Generate Greek text for voice call
   */
  static generateGreekCallScript(request: TaxiRequest, driverName: string): string {
    const script = `
Γεια σας ${driverName}. Αυτό είναι το Touristas AI.
Έχουμε μια παραγγελία για ταξί:

Παραλαβή: ${request.pickupLocation}
Προορισμός: ${request.dropoffLocation}
Ώρα: ${request.requestedTime}
Επιβάτες: ${request.passengerCount}
Τηλέφωνο πελάτη: ${request.userPhone}

Μπορείτε να αναλάβετε αυτή τη διαδρομή;
Πατήστε 1 για ναι, 2 για όχι.
    `.trim();

    return script;
  }

  /**
   * Main booking function
   */
  static async bookTaxi(naturalLanguageRequest: string): Promise<TaxiBookingResponse> {
    try {
      // Parse the request
      const parsedRequest = this.parseNaturalLanguageRequest(naturalLanguageRequest);
      
      if (!parsedRequest.userPhone || !parsedRequest.pickupLocation || !parsedRequest.dropoffLocation) {
        return {
          success: false,
          message: 'Παρακαλώ παρέχετε τον αριθμό τηλεφώνου σας, το σημείο παραλαβής και τον προορισμό.'
        };
      }

      // Find best driver
      const driver = this.findBestDriver(parsedRequest as TaxiRequest);
      if (!driver) {
        return {
          success: false,
          message: 'Δυστυχώς δεν υπάρχουν διαθέσιμα ταξί αυτή τη στιγμή.'
        };
      }

      // Calculate estimates
      const estimate = this.calculateEstimate(
        parsedRequest.pickupLocation!,
        parsedRequest.dropoffLocation!,
        driver.pricePerKm
      );

      // Create request record
      const taxiRequest: TaxiRequest = {
        ...parsedRequest as TaxiRequest,
        driverId: driver.id,
        estimatedDistance: estimate.distance,
        estimatedPrice: estimate.price,
        createdAt: new Date().toISOString()
      };

      // In production, save to database
      // await this.saveTaxiRequest(taxiRequest);

      // Generate call script
      const callScript = this.generateGreekCallScript(taxiRequest, driver.name);

      // In production, make actual calls
      // await this.makeVoiceCall(driver.phone, callScript);
      // await this.sendSMSConfirmation(taxiRequest);

      return {
        success: true,
        message: `Το ταξί έχει κληθεί! Ο οδηγός ${driver.name} θα σας καλέσει σύντομα.`,
        requestId: `REQ_${Date.now()}`,
        estimatedPrice: estimate.price,
        estimatedArrival: `${estimate.duration} λεπτά`,
        driverInfo: driver
      };

    } catch (error) {
      console.error('Taxi booking error:', error);
      return {
        success: false,
        message: 'Παρουσιάστηκε σφάλμα κατά την κράτηση. Παρακαλώ δοκιμάστε ξανά.'
      };
    }
  }

  /**
   * Get available drivers
   */
  static getAvailableDrivers(): TaxiDriver[] {
    return mockTaxiDrivers.filter(driver => driver.isAvailable);
  }

  /**
   * Get Sifnos locations
   */
  static getSifnosLocations(): string[] {
    return sifnosLocations;
  }
} 