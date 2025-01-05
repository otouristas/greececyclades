import { supabase } from '../supabase';

export async function getAllRentalCars() {
  const { data, error } = await supabase
    .from('rental_cars')
    .select('*')
    .order('price_per_day', { ascending: true });

  if (error) {
    console.error('Error fetching rental cars:', error);
    throw error;
  }

  return data;
}
