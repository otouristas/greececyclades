export type Stop = {
  port: string;
  arrivalTime: string;
  departureTime: string;
};

export type FerryRoute = {
  id: string;
  company: string;
  vessel: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  amenities: string[];
  availableSeats: number;
  intermediateStops?: Stop[];
  isIslandHopping?: boolean;
};
