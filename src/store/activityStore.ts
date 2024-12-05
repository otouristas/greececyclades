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
  selectedActivity: Activity | null;
  loading: boolean;
  error: string | null;
  setActivities: (activities: Activity[]) => void;
  setFilters: (filters: Partial<ActivityFilters>) => void;
  resetFilters: () => void;
  setSelectedActivity: (activity: Activity | null) => void;
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
  selectedActivity: null,
  loading: false,
  error: null,

  setActivities: (activities) => set({ activities }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
  setSelectedActivity: (activity) => set({ selectedActivity: activity }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
