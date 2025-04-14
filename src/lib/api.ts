import { supabase } from './supabase';
import type { Database } from '../types/supabase';

// Define types from Supabase database schema
export type Activity = Database['public']['Tables']['activities']['Row'];
export type Hotel = Database['public']['Tables']['hotels']['Row'];
export type RentalCar = Database['public']['Tables']['rental_cars']['Row'];
export type Agency = Database['public']['Tables']['agencies']['Row'];

// Activities
export async function getActivities(islandId?: string) {
  const query = supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false });

  if (islandId) {
    query.eq('island_id', islandId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getActivity(id: string) {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Hotels
export async function getHotels(islandId?: string) {
  const query = supabase
    .from('hotels')
    .select('*')
    .order('rating', { ascending: false });

  if (islandId) {
    query.eq('island_id', islandId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getHotel(id: string) {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Rental Cars
export async function getRentalCars(islandId?: string) {
  const query = supabase
    .from('rental_cars')
    .select('*')
    .order('price_per_day', { ascending: true });

  if (islandId) {
    query.eq('island_id', islandId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getRentalCar(id: string) {
  const { data, error } = await supabase
    .from('rental_cars')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Agencies
export async function getAgencies() {
  const query = supabase
    .from('agencies')
    .select('*')
    .order('name', { ascending: true });

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getAgency(id: string) {
  const { data, error } = await supabase
    .from('agencies')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Search functionality
export async function searchAll(query: string, islandId?: string) {
  const [activities, hotels, cars] = await Promise.all([
    supabase
      .from('activities')
      .select('*')
      .textSearch('name', query)
      .eq('island_id', islandId || '')
      .limit(5),
    supabase
      .from('hotels')
      .select('*')
      .textSearch('name', query)
      .eq('island_id', islandId || '')
      .limit(5),
    supabase
      .from('rental_cars')
      .select('*')
      .textSearch('name', query)
      .eq('island_id', islandId || '')
      .limit(5),
  ]);

  return {
    activities: activities.data || [],
    hotels: hotels.data || [],
    cars: cars.data || [],
  };
}
