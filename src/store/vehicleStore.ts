import { create } from 'zustand';
import { Vehicle, VehicleType, VehicleFilters } from '../types/vehicle';

interface VehicleState {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  filters: VehicleFilters;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  fetchVehicleById: (id: number) => Promise<Vehicle | null>;
  setFilters: (filters: Partial<VehicleFilters>) => void;
  resetFilters: () => void;
}

const defaultFilters: VehicleFilters = {
  priceRange: { min: 0, max: 200 },
  vehicleType: null,
  transmission: null,
  passengers: null
};

const mockVehicles: Vehicle[] = [
  {
    id: 1,
    make: 'Mercedes',
    model: 'GLB 2022',
    type: VehicleType.CAR,
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80',
    price: 120,
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    luggage: 3,
    rating: 4.9,
    reviews: 156,
    features: ['7 Seats', 'GPS Navigation', 'Bluetooth', 'Cruise Control', 'Parking Sensors'],
    location: 'All Locations',
    company: 'AGGELOS Rentals',
    mileage: 'Unlimited'
  },
  {
    id: 2,
    make: 'Jeep',
    model: 'Renegade UPLAND 4xe',
    type: VehicleType.CAR,
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80',
    price: 110,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    luggage: 2,
    rating: 4.8,
    reviews: 142,
    features: ['4x4', 'Hybrid Engine', 'GPS Navigation', 'Bluetooth', 'Parking Sensors'],
    location: 'All Locations',
    company: 'AGGELOS Rentals',
    mileage: 'Unlimited'
  },
  {
    id: 3,
    make: 'Jeep',
    model: 'Renegade 4x4 Panorama',
    type: VehicleType.CAR,
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80',
    price: 100,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    luggage: 2,
    rating: 4.8,
    reviews: 134,
    features: ['4x4', 'Panoramic Roof', 'GPS Navigation', 'Bluetooth', 'Parking Sensors'],
    location: 'All Locations',
    company: 'AGGELOS Rentals',
    mileage: 'Unlimited'
  },
  {
    id: 4,
    make: 'Jeep',
    model: 'Renegade Automatic',
    type: VehicleType.CAR,
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80',
    price: 90,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    luggage: 2,
    rating: 4.7,
    reviews: 128,
    features: ['Air Conditioning', 'GPS Navigation', 'Bluetooth', 'Parking Sensors'],
    location: 'All Locations',
    company: 'AGGELOS Rentals',
    mileage: 'Unlimited'
  },
  {
    id: 5,
    make: 'Jeep',
    model: 'Renegade Manual',
    type: VehicleType.CAR,
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80',
    price: 80,
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Petrol',
    luggage: 2,
    rating: 4.7,
    reviews: 112,
    features: ['Air Conditioning', 'GPS Navigation', 'Bluetooth', 'Parking Sensors'],
    location: 'All Locations',
    company: 'AGGELOS Rentals',
    mileage: 'Unlimited'
  },
  {
    id: 6,
    make: 'Suzuki',
    model: 'Jimny 2018',
    type: VehicleType.CAR,
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80',
    price: 70,
    seats: 4,
    transmission: 'Manual',
    fuelType: 'Petrol',
    luggage: 1,
    rating: 4.6,
    reviews: 98,
    features: ['4x4', 'Air Conditioning', 'Bluetooth', 'Compact Size'],
    location: 'All Locations',
    company: 'AGGELOS Rentals',
    mileage: 'Unlimited'
  },
  {
    id: 7,
    make: 'Fiat',
    model: 'Doblo 7 pax',
    type: VehicleType.CAR,
    category: 'Van',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80',
    price: 85,
    seats: 7,
    transmission: 'Manual',
    fuelType: 'Diesel',
    luggage: 3,
    rating: 4.7,
    reviews: 86,
    features: ['7 Seats', 'Air Conditioning', 'Bluetooth', 'Large Cargo Space'],
    location: 'All Locations',
    company: 'AGGELOS Rentals',
    mileage: 'Unlimited'
  },
  {
    id: 8,
    make: 'Citroen',
    model: 'C3 Automatic',
    type: VehicleType.CAR,
    category: 'Economy',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80',
    price: 60,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    luggage: 1,
    rating: 4.6,
    reviews: 92,
    features: ['Air Conditioning', 'Bluetooth', 'Fuel Efficient', 'Easy Parking'],
    location: 'All Locations',
    company: 'AGGELOS Rentals',
    mileage: 'Unlimited'
  }
];

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicles: mockVehicles,
  selectedVehicle: null,
  filters: defaultFilters,
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
  fetchVehicleById: async (id) => {
    const vehicle = mockVehicles.find(v => v.id === id) || null;
    set({ selectedVehicle: vehicle });
    return vehicle;
  },
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  resetFilters: () => set({ filters: defaultFilters })
}));