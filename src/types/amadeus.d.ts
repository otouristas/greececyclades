declare module 'amadeus' {
  interface AmadeusOptions {
    clientId: string;
    clientSecret: string;
    hostname?: string;
    logLevel?: string;
  }

  interface FlightSearchParams {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    adults?: string;
    returnDate?: string;
  }

  interface FlightOffer {
    id: string;
    price: {
      total: string;
      currency: string;
    };
    itineraries: Array<{
      segments: Array<{
        departure: {
          iataCode: string;
          terminal?: string;
          at: string;
        };
        arrival: {
          iataCode: string;
          terminal?: string;
          at: string;
        };
        carrierCode: string;
        number: string;
        duration: string;
      }>;
    }>;
  }

  interface AmadeusResponse {
    data: any[];
    meta: any;
    warnings?: any[];
    result: any;
  }

  interface Client {
    get(path: string, params?: any): Promise<AmadeusResponse>;
    post(path: string, params?: any): Promise<AmadeusResponse>;
    delete(path: string, params?: any): Promise<AmadeusResponse>;
  }

  class FlightOffersSearch {
    get(params: FlightSearchParams): Promise<AmadeusResponse>;
  }

  interface Shopping {
    flightOffersSearch: FlightOffersSearch;
  }

  class Amadeus {
    constructor(options: AmadeusOptions);
    client: Client;
    shopping: Shopping;
  }

  export default Amadeus;
}
