import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      initialized: false,
      
      login: (user: User) => {
        set({ user, loading: false });
      },
      
      logout: async () => {
        set({ loading: true });
        try {
          await supabase.auth.signOut();
          set({ user: null, loading: false });
        } catch (error) {
          console.error('Logout error:', error);
          set({ loading: false });
        }
      },
      
      initialize: async () => {
        set({ loading: true });
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            const user: User = {
              id: session.user.id,
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              avatar: session.user.user_metadata?.avatar_url,
            };
            set({ user, loading: false, initialized: true });
          } else {
            set({ user: null, loading: false, initialized: true });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ user: null, loading: false, initialized: true });
        }
      },
      
      updateProfile: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
