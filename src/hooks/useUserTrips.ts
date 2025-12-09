import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';

export interface TripActivity {
  id: string;
  trip_day_id: string;
  name: string;
  description: string | null;
  location: string | null;
  lat: number | null;
  lng: number | null;
  activity_type: string | null;
  start_time: string | null;
  duration_minutes: number | null;
  cost_estimate: number | null;
  image_url: string | null;
  booking_url: string | null;
  sort_order: number;
  created_at: string;
  metadata: Record<string, any>;
}

export interface TripDay {
  id: string;
  trip_id: string;
  day_number: number;
  title: string | null;
  description: string | null;
  created_at: string;
  activities?: TripActivity[];
}

export interface UserTrip {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  duration_days: number;
  budget_level: 'budget' | 'mid-range' | 'luxury' | null;
  trip_type: string | null;
  travelers_count: number;
  start_date: string | null;
  end_date: string | null;
  is_public: boolean;
  likes_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
  metadata: Record<string, any>;
  days?: TripDay[];
  user_profile?: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
}

export function useUserTrips() {
  const { user } = useAuth();
  const [myTrips, setMyTrips] = useState<UserTrip[]>([]);
  const [publicTrips, setPublicTrips] = useState<UserTrip[]>([]);
  const [currentTrip, setCurrentTrip] = useState<UserTrip | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user's own trips
  const fetchMyTrips = useCallback(async () => {
    if (!user) {
      setMyTrips([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_trips')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching my trips:', error);
        return;
      }

      setMyTrips(data || []);
    } catch (error) {
      console.error('Error in fetchMyTrips:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Fetch public trips (for explore section)
  const fetchPublicTrips = useCallback(async (limit = 12) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_trips')
        .select(`
          *,
          user_profile:user_profiles!user_trips_user_id_fkey(
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq('is_public', true)
        .order('likes_count', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching public trips:', error);
        return;
      }

      setPublicTrips(data || []);
    } catch (error) {
      console.error('Error in fetchPublicTrips:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch a single trip with all details
  const fetchTripDetails = useCallback(async (tripId: string): Promise<UserTrip | null> => {
    setIsLoading(true);
    try {
      // Fetch trip
      const { data: tripData, error: tripError } = await supabase
        .from('user_trips')
        .select('*')
        .eq('id', tripId)
        .single();

      if (tripError || !tripData) {
        console.error('Error fetching trip:', tripError);
        return null;
      }

      // Fetch days with activities
      const { data: daysData, error: daysError } = await supabase
        .from('trip_days')
        .select(`
          *,
          activities:trip_activities(*)
        `)
        .eq('trip_id', tripId)
        .order('day_number', { ascending: true });

      if (daysError) {
        console.error('Error fetching trip days:', daysError);
      }

      const trip: UserTrip = {
        ...tripData,
        days: daysData || [],
      };

      setCurrentTrip(trip);
      
      // Increment view count if not owner
      if (user?.id !== tripData.user_id) {
        await supabase
          .from('user_trips')
          .update({ views_count: tripData.views_count + 1 })
          .eq('id', tripId);
      }

      return trip;
    } catch (error) {
      console.error('Error in fetchTripDetails:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Create a new trip
  const createTrip = useCallback(async (trip: {
    title: string;
    description?: string;
    cover_image_url?: string;
    duration_days?: number;
    budget_level?: 'budget' | 'mid-range' | 'luxury';
    trip_type?: string;
    travelers_count?: number;
    start_date?: string;
    end_date?: string;
    is_public?: boolean;
  }): Promise<UserTrip | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_trips')
        .insert({
          user_id: user.id,
          ...trip,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating trip:', error);
        return null;
      }

      setMyTrips(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error in createTrip:', error);
      return null;
    }
  }, [user]);

  // Update a trip
  const updateTrip = useCallback(async (
    tripId: string,
    updates: Partial<Omit<UserTrip, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('user_trips')
        .update(updates)
        .eq('id', tripId);

      if (error) {
        console.error('Error updating trip:', error);
        return false;
      }

      setMyTrips(prev => 
        prev.map(t => t.id === tripId ? { ...t, ...updates } : t)
      );
      
      if (currentTrip?.id === tripId) {
        setCurrentTrip(prev => prev ? { ...prev, ...updates } : null);
      }

      return true;
    } catch (error) {
      console.error('Error in updateTrip:', error);
      return false;
    }
  }, [currentTrip]);

  // Delete a trip
  const deleteTrip = useCallback(async (tripId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('user_trips')
        .delete()
        .eq('id', tripId);

      if (error) {
        console.error('Error deleting trip:', error);
        return false;
      }

      setMyTrips(prev => prev.filter(t => t.id !== tripId));
      
      if (currentTrip?.id === tripId) {
        setCurrentTrip(null);
      }

      return true;
    } catch (error) {
      console.error('Error in deleteTrip:', error);
      return false;
    }
  }, [currentTrip]);

  // Add a day to a trip
  const addTripDay = useCallback(async (
    tripId: string,
    dayNumber: number,
    title?: string,
    description?: string
  ): Promise<TripDay | null> => {
    try {
      const { data, error } = await supabase
        .from('trip_days')
        .insert({
          trip_id: tripId,
          day_number: dayNumber,
          title,
          description,
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding trip day:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in addTripDay:', error);
      return null;
    }
  }, []);

  // Add an activity to a day
  const addActivity = useCallback(async (
    tripDayId: string,
    activity: {
      name: string;
      description?: string;
      location?: string;
      lat?: number;
      lng?: number;
      activity_type?: string;
      start_time?: string;
      duration_minutes?: number;
      cost_estimate?: number;
      image_url?: string;
      booking_url?: string;
      sort_order?: number;
    }
  ): Promise<TripActivity | null> => {
    try {
      const { data, error } = await supabase
        .from('trip_activities')
        .insert({
          trip_day_id: tripDayId,
          ...activity,
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding activity:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in addActivity:', error);
      return null;
    }
  }, []);

  // Like/unlike a trip
  const toggleLike = useCallback(async (tripId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // Check if already liked
      const { data: existing } = await supabase
        .from('trip_likes')
        .select('id')
        .eq('trip_id', tripId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        // Unlike
        await supabase
          .from('trip_likes')
          .delete()
          .eq('id', existing.id);
        return false;
      } else {
        // Like
        await supabase
          .from('trip_likes')
          .insert({ trip_id: tripId, user_id: user.id });
        return true;
      }
    } catch (error) {
      console.error('Error in toggleLike:', error);
      return false;
    }
  }, [user]);

  // Check if user has liked a trip
  const hasLiked = useCallback(async (tripId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { data } = await supabase
        .from('trip_likes')
        .select('id')
        .eq('trip_id', tripId)
        .eq('user_id', user.id)
        .maybeSingle();

      return !!data;
    } catch (error) {
      console.error('Error in hasLiked:', error);
      return false;
    }
  }, [user]);

  // Initial fetch
  useEffect(() => {
    fetchMyTrips();
  }, [fetchMyTrips]);

  return {
    myTrips,
    publicTrips,
    currentTrip,
    isLoading,
    fetchMyTrips,
    fetchPublicTrips,
    fetchTripDetails,
    createTrip,
    updateTrip,
    deleteTrip,
    addTripDay,
    addActivity,
    toggleLike,
    hasLiked,
    setCurrentTrip,
  };
}
