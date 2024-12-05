export enum VehicleType {
  CAR = 'car',
  BIKE = 'bike',
  MOTO = 'moto',
  SCOOTER = 'scooter',
  ATV = 'atv',
  BUGGY = 'buggy'
}

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  type: VehicleType;
  category: string;
  image: string;
  price: number;
  seats: number;
  transmission: string;
  fuelType: string;
  luggage: number;
  rating: number;
  reviews: number;
  features: string[];
  location: string;
  company: string;
  mileage: string;
}

export interface VehicleFilters {
  priceRange: {
    min: number;
    max: number;
  };
  vehicleType: VehicleType | null;
  transmission: string | null;
  passengers: number | null;
}