import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Hotel } from '../types/hotel';

const BATCH_SIZE = 500; // Firestore allows max 500 operations per batch

export async function importHotels(hotels: Omit<Hotel, 'id'>[]): Promise<void> {
  try {
    // Split hotels into chunks of BATCH_SIZE
    const chunks = [];
    for (let i = 0; i < hotels.length; i += BATCH_SIZE) {
      chunks.push(hotels.slice(i, i + BATCH_SIZE));
    }

    // Process each chunk
    for (let i = 0; i < chunks.length; i++) {
      const batch = writeBatch(db);
      const chunk = chunks[i];

      chunk.forEach((hotel) => {
        const hotelRef = doc(db, 'hotels'); // Firestore will auto-generate ID
        batch.set(hotelRef, {
          ...hotel,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });

      await batch.commit();
      console.log(`Processed batch ${i + 1} of ${chunks.length}`);
    }

    console.log('Successfully imported all hotels');
  } catch (error) {
    console.error('Error importing hotels:', error);
    throw error;
  }
}

// Helper function to validate hotel data before import
export function validateHotel(hotel: Partial<Hotel>): string[] {
  const errors: string[] = [];

  // Required fields
  const requiredFields = [
    'name',
    'description',
    'shortDescription',
    'islandId',
    'location',
    'rating',
    'priceRange',
    'images',
    'rooms'
  ];

  requiredFields.forEach(field => {
    if (!hotel[field as keyof Hotel]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Validate location
  if (hotel.location) {
    const { latitude, longitude, address, city } = hotel.location;
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      errors.push('Invalid coordinates in location');
    }
    if (!address || !city) {
      errors.push('Missing address or city in location');
    }
  }

  // Validate price range
  if (hotel.priceRange) {
    const { min, max, currency } = hotel.priceRange;
    if (typeof min !== 'number' || typeof max !== 'number' || min > max) {
      errors.push('Invalid price range');
    }
    if (!currency) {
      errors.push('Missing currency in price range');
    }
  }

  // Validate rating
  if (hotel.rating !== undefined && (hotel.rating < 0 || hotel.rating > 5)) {
    errors.push('Rating must be between 0 and 5');
  }

  // Validate images
  if (hotel.images && (!Array.isArray(hotel.images) || hotel.images.length === 0)) {
    errors.push('Hotel must have at least one image');
  }

  // Validate rooms
  if (hotel.rooms && (!Array.isArray(hotel.rooms) || hotel.rooms.length === 0)) {
    errors.push('Hotel must have at least one room');
  }

  return errors;
}
