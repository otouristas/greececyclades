import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Hotel } from '../types/hotel';

const HOTELS_COLLECTION = 'hotels';

export const hotelService = {
  // Get all hotels for a specific island
  async getHotelsByIsland(islandId: string): Promise<Hotel[]> {
    const hotelsRef = collection(db, HOTELS_COLLECTION);
    const q = query(
      hotelsRef,
      where('islandId', '==', islandId),
      orderBy('featured', 'desc'),
      orderBy('rating', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Hotel));
  },

  // Get featured hotels
  async getFeaturedHotels(limit: number = 6): Promise<Hotel[]> {
    const hotelsRef = collection(db, HOTELS_COLLECTION);
    const q = query(
      hotelsRef,
      where('featured', '==', true),
      orderBy('rating', 'desc'),
      limit(limit)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Hotel));
  },

  // Get a single hotel by ID
  async getHotelById(id: string): Promise<Hotel | null> {
    const hotelRef = doc(db, HOTELS_COLLECTION, id);
    const hotelDoc = await getDoc(hotelRef);
    
    if (!hotelDoc.exists()) {
      return null;
    }

    return {
      id: hotelDoc.id,
      ...hotelDoc.data()
    } as Hotel;
  },

  // Add a new hotel
  async addHotel(hotel: Omit<Hotel, 'id'>): Promise<string> {
    const hotelsRef = collection(db, HOTELS_COLLECTION);
    const docRef = await addDoc(hotelsRef, {
      ...hotel,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  },

  // Update an existing hotel
  async updateHotel(id: string, hotel: Partial<Hotel>): Promise<void> {
    const hotelRef = doc(db, HOTELS_COLLECTION, id);
    await updateDoc(hotelRef, {
      ...hotel,
      updatedAt: new Date()
    });
  },

  // Delete a hotel
  async deleteHotel(id: string): Promise<void> {
    const hotelRef = doc(db, HOTELS_COLLECTION, id);
    await deleteDoc(hotelRef);
  },

  // Search hotels by various criteria
  async searchHotels(criteria: {
    islandId?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    amenities?: string[];
  }): Promise<Hotel[]> {
    const hotelsRef = collection(db, HOTELS_COLLECTION);
    let q = query(hotelsRef);

    if (criteria.islandId) {
      q = query(q, where('islandId', '==', criteria.islandId));
    }

    if (criteria.minRating) {
      q = query(q, where('rating', '>=', criteria.minRating));
    }

    if (criteria.amenities && criteria.amenities.length > 0) {
      q = query(q, where('amenities', 'array-contains-any', criteria.amenities));
    }

    const querySnapshot = await getDocs(q);
    let hotels = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Hotel));

    // Client-side filtering for price range
    if (criteria.minPrice !== undefined || criteria.maxPrice !== undefined) {
      hotels = hotels.filter(hotel => {
        const { min: hotelMinPrice } = hotel.priceRange;
        return (
          (criteria.minPrice === undefined || hotelMinPrice >= criteria.minPrice) &&
          (criteria.maxPrice === undefined || hotelMinPrice <= criteria.maxPrice)
        );
      });
    }

    return hotels;
  }
};
