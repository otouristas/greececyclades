import { create } from 'zustand';
import { Activity } from '../types';

interface ActivityFilters {
  category: string | null;
  location: string | null;
  priceRange: { min: number; max: number } | null;
  duration: string | null;
  rating: number | null;
}

interface ActivityState {
  activities: Activity[];
  filters: ActivityFilters;
  loading: boolean;
  error: string | null;
  setActivities: (activities: Activity[]) => void;
  setFilters: (filters: Partial<ActivityFilters>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const defaultFilters: ActivityFilters = {
  category: null,
  location: null,
  priceRange: null,
  duration: null,
  rating: null,
};

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  filters: defaultFilters,
  loading: false,
  error: null,
  setActivities: (activities) => set({ activities }),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
