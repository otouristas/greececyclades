import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Island } from '../types';

interface TripPlan {
  id: string;
  islands: Island[];
  duration: number;
  month: string;
  aiSuggestions: string;
  createdAt: Date;
  userId: string;
}

interface TripStore {
  trips: TripPlan[];
  addTrip: (trip: Omit<TripPlan, 'id' | 'createdAt'>) => void;
  deleteTrip: (tripId: string) => void;
  getTripsByUserId: (userId: string) => TripPlan[];
}

export const useTripStore = create<TripStore>()(
  persist(
    (set, get) => ({
      trips: [],
      addTrip: (trip) => {
        const newTrip: TripPlan = {
          ...trip,
          id: Date.now().toString(),
          createdAt: new Date(),
        };
        set((state) => ({
          trips: [newTrip, ...state.trips],
        }));
      },
      deleteTrip: (tripId) => {
        set((state) => ({
          trips: state.trips.filter((trip) => trip.id !== tripId),
        }));
      },
      getTripsByUserId: (userId) => {
        return get().trips.filter((trip) => trip.userId === userId);
      },
    }),
    {
      name: 'trip-storage',
    }
  )
);
