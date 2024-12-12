export interface FerryRoute {
  id: string;
  operator: string;
  logo: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  type: string;
  amenities: string[];
  availableSeats: number;
}
