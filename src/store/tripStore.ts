import { create } from 'zustand';
import type { TripPlan, NewTripPlan } from '../types/island';

interface TripStore {
  trips: TripPlan[];
  addTrip: (trip: NewTripPlan) => Promise<TripPlan>;
  removeTrip: (tripId: string) => void;
  updateTrip: (tripId: string, updatedTrip: Partial<TripPlan>) => void;
  getTripsByUserId: (userId: string) => TripPlan[];
  getTrip: (tripId: string) => TripPlan | undefined;
  deleteTrip: (tripId: string) => void;
}

export const useTripStore = create<TripStore>((set, get) => ({
  trips: [],
  addTrip: async (trip) => {
    const newTrip = { ...trip, id: Math.random().toString(36).substr(2, 9) };
    set((state) => ({
      trips: [...state.trips, newTrip],
    }));
    return newTrip;
  },
  removeTrip: (tripId) => {
    set((state) => ({
      trips: state.trips.filter((trip) => trip.id !== tripId),
    }));
  },
  updateTrip: (tripId, updatedTrip) => {
    set((state) => ({
      trips: state.trips.map((trip) =>
        trip.id === tripId ? { ...trip, ...updatedTrip } : trip
      ),
    }));
  },
  getTripsByUserId: (userId) => {
    return get().trips.filter((trip) => trip.userId === userId);
  },
  getTrip: (tripId) => {
    return get().trips.find((trip) => trip.id === tripId);
  },
  deleteTrip: (tripId) => {
    set((state) => ({
      trips: state.trips.filter((trip) => trip.id !== tripId),
    }));
  },
}));
