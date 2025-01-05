import { TripPlan } from '../types/island';

export const saveTripPlan = async (tripPlan: Omit<TripPlan, 'id'>) => {
  // Mock saving to database for now
  console.log('Saving trip plan:', tripPlan);
  return {
    ...tripPlan,
    id: Math.random().toString(36).substring(7)
  };
};
