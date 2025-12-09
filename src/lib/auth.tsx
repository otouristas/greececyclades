import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

// Define account type
export type AccountType = 'user' | 'hotel_business';

// Define user role
export type UserRole = 'admin' | 'hotel_owner' | 'user';

// Define types for our auth context
export type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (
    email: string, 
    password: string, 
    metadata?: { 
      first_name?: string; 
      last_name?: string;
      account_type?: AccountType;
      business_name?: string;
      business_phone?: string;
      business_address?: string;
    }
  ) => Promise<{ error: AuthError | null; data: { user: User | null } | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: Error | null }>;
  toggleFavorite: (hotelId: string) => Promise<boolean>;
  getFavorites: () => Promise<string[]>;
  checkIsFavorite: (hotelId: string) => Promise<boolean>;
  removeFavorite: (hotelId: string) => Promise<boolean>;
  isHotelOwner: () => Promise<boolean>;
  getOwnedHotels: () => Promise<string[]>;
  getUserRole: () => Promise<UserRole | null>;
  isHotelBusiness: () => boolean;
  canManageHotel: (hotelId: string) => Promise<boolean>;
  accountType: AccountType | null;
};

// Define user profile type
export type UserProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  account_type: AccountType;
  business_name: string | null;
  business_phone: string | null;
  business_address: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};

// Create the auth context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize auth state
  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;
    
    const initializeAuth = async () => {
      setIsLoading(true);
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
      
      if (session?.user) {
        // Fetch user profile
        await fetchUserProfile(session.user.id);
      }
      
      // Set up auth state change listener (only if available)
      if (supabase.auth && typeof supabase.auth.onAuthStateChange === 'function') {
        const authStateChangeResult = supabase.auth.onAuthStateChange(
          async (_event, session) => {
            setSession(session);
            setUser(session?.user || null);
            
            if (session?.user) {
              await fetchUserProfile(session.user.id);
            } else {
              setProfile(null);
            }
          }
        );
        
        // Handle both old and new Supabase API formats
        if (authStateChangeResult?.data?.subscription) {
          subscription = authStateChangeResult.data.subscription;
        } else if (authStateChangeResult?.subscription) {
          subscription = authStateChangeResult.subscription;
        }
      }
      setIsLoading(false);
    };
    
    initializeAuth();
    
    // Clean up subscription on unmount
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);
  
  // Fetch user profile from database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
      
      setProfile(data as UserProfile);
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };
  
  // Helper function to get user-friendly error messages
  const getAuthErrorMessage = (error: AuthError): string => {
    switch (error.message) {
      case 'Invalid login credentials':
        return 'The email or password you entered is incorrect. Please check your credentials and try again.';
      case 'Email not confirmed':
        return 'Please check your email and click the confirmation link before signing in.';
      case 'Too many requests':
        return 'Too many sign-in attempts. Please wait a moment before trying again.';
      case 'User not found':
        return 'No account found with this email address. Please check your email or sign up for a new account.';
      default:
        return error.message;
    }
  };
  
  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Sign in failed",
          description: getAuthErrorMessage(error),
          variant: "destructive"
        });
        return { error };
      }
      
      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      });
      
      return { error: null };
    } catch (error) {
      console.error('Error in signIn:', error);
      return { error: error as AuthError };
    }
  };
  
  // Sign up with email and password
  const signUp = async (
    email: string, 
    password: string, 
    metadata?: { 
      first_name?: string; 
      last_name?: string;
      account_type?: AccountType;
      business_name?: string;
      business_phone?: string;
      business_address?: string;
    }
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: metadata?.first_name,
            last_name: metadata?.last_name
          }
        }
      });
      
      if (error) {
        toast({
          title: "Sign up failed",
          description: getAuthErrorMessage(error),
          variant: "destructive"
        });
        return { error, data: null };
      }
      
      // After successful signup, update profile with additional fields
      if (data.user && metadata) {
        const profileUpdates: any = {};
        if (metadata.account_type) profileUpdates.account_type = metadata.account_type;
        if (metadata.business_name) profileUpdates.business_name = metadata.business_name;
        if (metadata.business_phone) profileUpdates.business_phone = metadata.business_phone;
        if (metadata.business_address) profileUpdates.business_address = metadata.business_address;
        
        if (Object.keys(profileUpdates).length > 0) {
          await supabase
            .from('user_profiles')
            .update(profileUpdates)
            .eq('id', data.user.id);
        }
      }
      
      toast({
        title: "Account created successfully",
        description: "Welcome to Hotels Santorini!",
      });
      
      return { error: null, data };
    } catch (error) {
      console.error('Error in signUp:', error);
      return { error: error as AuthError, data: null };
    }
  };
  
  // Sign out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
      });
    } catch (error) {
      console.error('Error in signOut:', error);
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };
  
  // Reset password
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast({
          title: "Password reset failed",
          description: getAuthErrorMessage(error),
          variant: "destructive"
        });
        return { error };
      }
      
      toast({
        title: "Password reset email sent",
        description: "Please check your email for further instructions",
      });
      
      return { error: null };
    } catch (error) {
      console.error('Error in resetPassword:', error);
      return { error: error as AuthError };
    }
  };
  
  // Update user profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id);
        
      if (error) {
        toast({
          title: "Profile update failed",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }
      
      // Refresh profile data
      await fetchUserProfile(user.id);
      
      toast({
        title: "Profile updated successfully",
      });
      
      return { error: null };
    } catch (error) {
      console.error('Error in updateProfile:', error);
      return { error: error as Error };
    }
  };
  
  // Remove a hotel from favorites
  const removeFavorite = async (hotelId: string): Promise<boolean> => {
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to manage favorites",
          variant: "destructive"
        });
        return false;
      }
      
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('hotel_id', hotelId);
        
      if (error) {
        console.error('Error removing favorite:', error);
        toast({
          title: "Error",
          description: "Failed to remove from favorites",
          variant: "destructive"
        });
        return false;
      }
      
      toast({
        title: "Removed from favorites",
      });
      
      return true;
    } catch (error) {
      console.error('Error in removeFavorite:', error);
      return false;
    }
  };
  
  // Toggle hotel favorite status
  const toggleFavorite = async (hotelId: string): Promise<boolean> => {
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save favorites",
          variant: "destructive"
        });
        return false;
      }
      
      // Check if hotel is already favorited
      const { data: existingFavorite, error: checkError } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', user.id)
        .eq('hotel_id', hotelId)
        .maybeSingle();
        
      if (checkError) {
        console.error('Error checking favorite status:', checkError);
        return false;
      }
      
      if (existingFavorite) {
        // Remove from favorites
        const { error: deleteError } = await supabase
          .from('user_favorites')
          .delete()
          .eq('id', existingFavorite.id);
          
        if (deleteError) {
          console.error('Error removing favorite:', deleteError);
          return false;
        }
        
        toast({
          title: "Removed from favorites",
        });
        
        return false; // Return false to indicate it's not a favorite anymore
      } else {
        // Add to favorites
        const { error: insertError } = await supabase
          .from('user_favorites')
          .insert({ user_id: user.id, hotel_id: hotelId });
          
        if (insertError) {
          console.error('Error adding favorite:', insertError);
          return false;
        }
        
        toast({
          title: "Added to favorites",
        });
        
        return true; // Return true to indicate it's now a favorite
      }
    } catch (error) {
      console.error('Error in toggleFavorite:', error);
      return false;
    }
  };
  
  // Get user's favorite hotels
  const getFavorites = async (): Promise<string[]> => {
    try {
      if (!user) {
        return [];
      }
      
      const { data, error } = await supabase
        .from('user_favorites')
        .select('hotel_id')
        .eq('user_id', user.id);
        
      if (error) {
        console.error('Error fetching favorites:', error);
        return [];
      }
      
      return data.map(item => item.hotel_id);
    } catch (error) {
      console.error('Error in getFavorites:', error);
      return [];
    }
  };
  
  // Check if a hotel is favorited by the user
  const checkIsFavorite = async (hotelId: string): Promise<boolean> => {
    try {
      if (!user) {
        return false;
      }
      
      const { data, error } = await supabase
        .from('user_favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('hotel_id', hotelId)
        .maybeSingle();
        
      if (error) {
        console.error('Error checking favorite status:', error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error('Error in checkIsFavorite:', error);
      return false;
    }
  };
  
  // Check if the user is a hotel owner
  const isHotelOwner = async (): Promise<boolean> => {
    try {
      if (!user) {
        return false;
      }
      
      const { data, error } = await supabase
        .from('hotel_owners')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);
        
      if (error) {
        console.error('Error checking hotel owner status:', error);
        return false;
      }
      
      return data && data.length > 0;
    } catch (error) {
      console.error('Error in isHotelOwner:', error);
      return false;
    }
  };
  
  // Get hotels owned by the user
  const getOwnedHotels = async (): Promise<string[]> => {
    try {
      if (!user) {
        return [];
      }
      
      const { data, error } = await supabase
        .from('hotel_owners')
        .select('hotel_id')
        .eq('user_id', user.id);
        
      if (error) {
        console.error('Error fetching owned hotels:', error);
        return [];
      }
      
      return data.map(item => item.hotel_id);
    } catch (error) {
      console.error('Error in getOwnedHotels:', error);
      return [];
    }
  };

  // Get user's role from database
  const getUserRole = async (): Promise<UserRole | null> => {
    try {
      if (!user) {
        return null;
      }
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
        
      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }
      
      return data?.role as UserRole || null;
    } catch (error) {
      console.error('Error in getUserRole:', error);
      return null;
    }
  };

  // Check if user has hotel_business account type
  const isHotelBusiness = (): boolean => {
    return profile?.account_type === 'hotel_business';
  };

  // Check if user can manage a specific hotel
  const canManageHotel = async (hotelId: string): Promise<boolean> => {
    try {
      if (!user) {
        return false;
      }
      
      // Check if user is the owner
      const { data: hotelData, error: hotelError } = await supabase
        .from('hotels')
        .select('owner_user_id')
        .eq('id', hotelId)
        .maybeSingle();
        
      if (hotelError) {
        console.error('Error checking hotel ownership:', hotelError);
        return false;
      }
      
      if (hotelData?.owner_user_id === user.id) {
        return true;
      }
      
      // Check if user is in hotel_owners table with appropriate role
      const { data: ownerData, error: ownerError } = await supabase
        .from('hotel_owners')
        .select('role')
        .eq('hotel_id', hotelId)
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (ownerError) {
        console.error('Error checking hotel_owners:', ownerError);
        return false;
      }
      
      return !!ownerData && ['owner', 'manager'].includes(ownerData.role);
    } catch (error) {
      console.error('Error in canManageHotel:', error);
      return false;
    }
  };

  // Provide auth context to children
  return (
    <AuthContext.Provider value={{
      session,
      user,
      profile,
      isLoading,
      signIn,
      signUp,
      signOut,
      resetPassword,
      updateProfile,
      toggleFavorite,
      getFavorites,
      checkIsFavorite,
      removeFavorite,
      isHotelOwner,
      getOwnedHotels,
      getUserRole,
      isHotelBusiness,
      canManageHotel,
      accountType: profile?.account_type || null
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}