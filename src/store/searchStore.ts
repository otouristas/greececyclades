import { create } from 'zustand';

interface SearchFilters {
  location?: string;
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  categories?: string[];
}

interface SearchState {
  searchTerm: string;
  filters: SearchFilters;
  setSearchTerm: (term: string) => void;
  setFilters: (filters: SearchFilters) => void;
  resetFilters: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: '',
  filters: {},
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: {} }),
}));