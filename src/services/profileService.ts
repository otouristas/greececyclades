import { supabase } from '../lib/supabase';

export interface Profile {
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
}

export interface Post {
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
}

export interface Favorite {
  id: string;
  user_id: string;
  item_type: 'island' | 'hotel' | 'activity';
  item_id: string;
  item_name: string;
  item_slug: string;
  item_image: string;
  item_location: string | null;
  created_at: string;
}

export interface TripPlan {
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
}

export interface DiaryEntry {
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
}

export class ProfileService {
  // Profile operations
  static async getProfile(userId: string): Promise<Profile | null> {
    console.log('ProfileService.getProfile called with userId:', userId);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        console.log('Profile not found, creating new profile for user:', userId);
        return await this.createProfile(userId);
      }
      console.error('Error fetching profile:', error);
      return null;
    }
    
    console.log('Profile found:', data);
    return data;
  }

  static async createProfile(userId: string, profileData?: Partial<Profile>): Promise<Profile | null> {
    console.log('ProfileService.createProfile called with:', { userId, profileData });
    
    const newProfile = {
      user_id: userId,
      full_name: profileData?.full_name || null,
      avatar_url: profileData?.avatar_url || null,
      bio: profileData?.bio || null,
      location: profileData?.location || null,
      website: profileData?.website || null,
      phone_number: profileData?.phone_number || null,
      interests: profileData?.interests || null,
    };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        throw error;
      }
      
      console.log('Profile created successfully:', data);
      return data;
    } catch (error) {
      console.error('ProfileService.createProfile error:', error);
      return null;
    }
  }

  static async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
    console.log('ProfileService.updateProfile called with:', { userId, updates });
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
      
      console.log('Profile updated successfully:', data);
      return data;
    } catch (error) {
      console.error('ProfileService.updateProfile error:', error);
      return null;
    }
  }

  // Posts operations
  static async getUserPosts(userId: string): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
    return data || [];
  }

  static async createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Promise<Post | null> {
    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      return null;
    }
    return data;
  }

  // Favorites operations
  static async getUserFavorites(userId: string): Promise<Favorite[]> {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
    return data || [];
  }

  // Trip plans operations
  static async getUserTripPlans(userId: string): Promise<TripPlan[]> {
    const { data, error } = await supabase
      .from('trip_plans')
      .select('*')
      .eq('user_id', userId)
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Error fetching trip plans:', error);
      return [];
    }
    return data || [];
  }

  static async createTripPlan(tripPlan: Omit<TripPlan, 'id' | 'created_at' | 'updated_at'>): Promise<TripPlan | null> {
    const { data, error } = await supabase
      .from('trip_plans')
      .insert(tripPlan)
      .select()
      .single();

    if (error) {
      console.error('Error creating trip plan:', error);
      return null;
    }
    return data;
  }

  // Diary entries operations
  static async getUserDiaryEntries(userId: string): Promise<DiaryEntry[]> {
    const { data, error } = await supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching diary entries:', error);
      return [];
    }
    return data || [];
  }

  static async createDiaryEntry(diaryEntry: Omit<DiaryEntry, 'id' | 'created_at' | 'updated_at'>): Promise<DiaryEntry | null> {
    const { data, error } = await supabase
      .from('diary_entries')
      .insert(diaryEntry)
      .select()
      .single();

    if (error) {
      console.error('Error creating diary entry:', error);
      return null;
    }
    return data;
  }

  // File upload operations
  static async uploadAvatar(userId: string, file: File): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error('Error uploading avatar:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  static async uploadPostImage(userId: string, file: File): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('posts')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading post image:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('posts')
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  // Statistics
  static async getUserStats(userId: string) {
    const [posts, favorites, tripPlans, diaryEntries] = await Promise.all([
      this.getUserPosts(userId),
      this.getUserFavorites(userId),
      this.getUserTripPlans(userId),
      this.getUserDiaryEntries(userId)
    ]);

    return {
      postsCount: posts.length,
      favoritesCount: favorites.length,
      tripPlansCount: tripPlans.length,
      diaryEntriesCount: diaryEntries.length,
      totalLikes: posts.reduce((sum, post) => sum + post.likes_count, 0),
      totalComments: posts.reduce((sum, post) => sum + post.comments_count, 0)
    };
  }
} 