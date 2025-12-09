import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';

export interface SavedPlace {
  id: string;
  user_id: string;
  name: string;
  location: string | null;
  lat: number | null;
  lng: number | null;
  place_type: string | null;
  image_url: string | null;
  notes: string | null;
  created_at: string;
  metadata: Record<string, any>;
}

export function useSavedPlaces() {
  const { user } = useAuth();
  const [places, setPlaces] = useState<SavedPlace[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all saved places for the user
  const fetchPlaces = useCallback(async () => {
    if (!user) {
      setPlaces([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_places')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching saved places:', error);
        return;
      }

      setPlaces(data || []);
    } catch (error) {
      console.error('Error in fetchPlaces:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Add a new saved place
  const addPlace = useCallback(async (place: {
    name: string;
    location?: string;
    lat?: number;
    lng?: number;
    place_type?: string;
    image_url?: string;
    notes?: string;
    metadata?: Record<string, any>;
  }): Promise<SavedPlace | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('saved_places')
        .insert({
          user_id: user.id,
          ...place,
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding place:', error);
        return null;
      }

      setPlaces(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error in addPlace:', error);
      return null;
    }
  }, [user]);

  // Update a saved place
  const updatePlace = useCallback(async (
    placeId: string,
    updates: Partial<Omit<SavedPlace, 'id' | 'user_id' | 'created_at'>>
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('saved_places')
        .update(updates)
        .eq('id', placeId);

      if (error) {
        console.error('Error updating place:', error);
        return false;
      }

      setPlaces(prev => 
        prev.map(p => p.id === placeId ? { ...p, ...updates } : p)
      );
      return true;
    } catch (error) {
      console.error('Error in updatePlace:', error);
      return false;
    }
  }, []);

  // Delete a saved place
  const deletePlace = useCallback(async (placeId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('saved_places')
        .delete()
        .eq('id', placeId);

      if (error) {
        console.error('Error deleting place:', error);
        return false;
      }

      setPlaces(prev => prev.filter(p => p.id !== placeId));
      return true;
    } catch (error) {
      console.error('Error in deletePlace:', error);
      return false;
    }
  }, []);

  // Check if a place is saved (by name or coordinates)
  const isPlaceSaved = useCallback((name: string, lat?: number, lng?: number): boolean => {
    return places.some(p => {
      if (lat && lng && p.lat && p.lng) {
        // Check by coordinates (within ~100m)
        const latDiff = Math.abs(p.lat - lat);
        const lngDiff = Math.abs(p.lng - lng);
        return latDiff < 0.001 && lngDiff < 0.001;
      }
      // Check by name
      return p.name.toLowerCase() === name.toLowerCase();
    });
  }, [places]);

  // Initial fetch
  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return {
    places,
    isLoading,
    fetchPlaces,
    addPlace,
    updatePlace,
    deletePlace,
    isPlaceSaved,
  };
}
