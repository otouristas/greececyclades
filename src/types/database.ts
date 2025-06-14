export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          location: string | null;
          website: string | null;
          phone_number: string | null;
          interests: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          location?: string | null;
          website?: string | null;
          phone_number?: string | null;
          interests?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          location?: string | null;
          website?: string | null;
          phone_number?: string | null;
          interests?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          image_url: string;
          description: string;
          location: string | null;
          tags: string[] | null;
          likes_count: number;
          comments_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          image_url: string;
          description: string;
          location?: string | null;
          tags?: string[] | null;
          likes_count?: number;
          comments_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          image_url?: string;
          description?: string;
          location?: string | null;
          tags?: string[] | null;
          likes_count?: number;
          comments_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          item_type: 'island' | 'hotel' | 'activity';
          item_id: string;
          item_name: string;
          item_slug: string;
          item_image: string;
          item_location: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_type: 'island' | 'hotel' | 'activity';
          item_id: string;
          item_name: string;
          item_slug: string;
          item_image: string;
          item_location?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          item_type?: 'island' | 'hotel' | 'activity';
          item_id?: string;
          item_name?: string;
          item_slug?: string;
          item_image?: string;
          item_location?: string | null;
          created_at?: string;
        };
      };
      trip_plans: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          start_date: string;
          end_date: string;
          duration: number;
          islands: string[];
          estimated_budget: number;
          notes: string | null;
          status: 'draft' | 'planned' | 'completed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          start_date: string;
          end_date: string;
          duration: number;
          islands: string[];
          estimated_budget: number;
          notes?: string | null;
          status?: 'draft' | 'planned' | 'completed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          start_date?: string;
          end_date?: string;
          duration?: number;
          islands?: string[];
          estimated_budget?: number;
          notes?: string | null;
          status?: 'draft' | 'planned' | 'completed';
          created_at?: string;
          updated_at?: string;
        };
      };
      diary_entries: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          image_url: string | null;
          location: string | null;
          date: string;
          mood: string | null;
          weather: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: string;
          image_url?: string | null;
          location?: string | null;
          date: string;
          mood?: string | null;
          weather?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content?: string;
          image_url?: string | null;
          location?: string | null;
          date?: string;
          mood?: string | null;
          weather?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      follows: {
        Row: {
          id: string;
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          follower_id: string;
          following_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          follower_id?: string;
          following_id?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']; 