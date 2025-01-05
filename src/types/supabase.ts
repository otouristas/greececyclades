export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          price: number
          duration: number
          island_id: string
          category: string
          images: string[]
          available_dates: string[]
          location: string
          included: string[]
          not_included: string[]
          meeting_point: string
          requirements: string[]
          cancellation_policy: string
          provider: string
          rating: number
          reviews_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          price: number
          duration: number
          island_id: string
          category: string
          images: string[]
          available_dates: string[]
          location: string
          included: string[]
          not_included: string[]
          meeting_point: string
          requirements: string[]
          cancellation_policy: string
          provider: string
          rating?: number
          reviews_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          price?: number
          duration?: number
          island_id?: string
          category?: string
          images?: string[]
          available_dates?: string[]
          location?: string
          included?: string[]
          not_included?: string[]
          meeting_point?: string
          requirements?: string[]
          cancellation_policy?: string
          provider?: string
          rating?: number
          reviews_count?: number
        }
      }
      hotels: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          island_id: string
          category: string
          images: string[]
          address: string
          amenities: string[]
          room_types: {
            name: string
            description: string
            price: number
            capacity: number
            amenities: string[]
          }[]
          rating: number
          reviews_count: number
          latitude: number
          longitude: number
          booking_url: string
          cancellation_policy: string
          check_in_time: string
          check_out_time: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          island_id: string
          category: string
          images: string[]
          address: string
          amenities: string[]
          room_types: {
            name: string
            description: string
            price: number
            capacity: number
            amenities: string[]
          }[]
          rating?: number
          reviews_count?: number
          latitude: number
          longitude: number
          booking_url: string
          cancellation_policy: string
          check_in_time: string
          check_out_time: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          island_id?: string
          category?: string
          images?: string[]
          address?: string
          amenities?: string[]
          room_types?: {
            name: string
            description: string
            price: number
            capacity: number
            amenities: string[]
          }[]
          rating?: number
          reviews_count?: number
          latitude?: number
          longitude?: number
          booking_url?: string
          cancellation_policy?: string
          check_in_time?: string
          check_out_time?: string
        }
      }
      rental_cars: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          island_id: string
          category: string
          images: string[]
          price_per_day: number
          features: string[]
          transmission: string
          fuel_type: string
          seats: number
          luggage_capacity: number
          provider: string
          pickup_locations: string[]
          insurance_options: {
            name: string
            description: string
            price: number
          }[]
          available_dates: string[]
          rating: number
          reviews_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          island_id: string
          category: string
          images: string[]
          price_per_day: number
          features: string[]
          transmission: string
          fuel_type: string
          seats: number
          luggage_capacity: number
          provider: string
          pickup_locations: string[]
          insurance_options: {
            name: string
            description: string
            price: number
          }[]
          available_dates: string[]
          rating?: number
          reviews_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          island_id?: string
          category?: string
          images?: string[]
          price_per_day?: number
          features?: string[]
          transmission?: string
          fuel_type?: string
          seats?: number
          luggage_capacity?: number
          provider?: string
          pickup_locations?: string[]
          insurance_options?: {
            name: string
            description: string
            price: number
          }[]
          available_dates?: string[]
          rating?: number
          reviews_count?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
