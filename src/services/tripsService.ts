import { TripPlan } from '../types/islands';

export const addTrip = async (tripPlan: Omit<TripPlan, 'id'>) => {
  // TODO: Implement trip saving functionality
  console.log('Saving trip:', tripPlan);
  return { ...tripPlan, id: Date.now().toString() };
};
