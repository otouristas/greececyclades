import { useState, useEffect } from 'react';
import { getActivities, getHotels, getRentalCars, getAgencies } from '../lib/api';
import type { Database } from '../types/supabase';

type Activity = Database['public']['Tables']['activities']['Row'];
type Hotel = Database['public']['Tables']['hotels']['Row'];
type RentalCar = Database['public']['Tables']['rental_cars']['Row'];
type Agency = Database['public']['Tables']['agencies']['Row'];

export function useActivities(islandId?: string) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getActivities(islandId);
        setActivities(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [islandId]);

  return { activities, loading, error };
}

export function useHotels(islandId?: string) {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getHotels(islandId);
        setHotels(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [islandId]);

  return { hotels, loading, error };
}

export function useRentalCars(islandId?: string) {
  const [cars, setCars] = useState<RentalCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRentalCars(islandId);
        setCars(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [islandId]);

  return { cars, loading, error };
}

export function useAgencies() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAgencies() {
      try {
        setLoading(true);
        const data = await getAgencies();
        setAgencies(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchAgencies();
  }, []);

  return { agencies, loading, error };
}
