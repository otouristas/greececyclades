import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';

export default function AuthStateHandler() {
  const { login, logout, initialize } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Initialize auth state
    initialize();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session?.user) {
            const user = {
              id: session.user.id,
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              avatar: session.user.user_metadata?.avatar_url,
            };
            login(user);

            // If we were trying to access a protected route, redirect there
            const state = location.state as { from?: Location };
            if (state?.from) {
              navigate(state.from.pathname);
            } else if (location.pathname === '/signin' || location.pathname === '/signup') {
              // If user just signed in/up, redirect to profile
              navigate('/profile');
            }
          }
        } else if (event === 'SIGNED_OUT') {
          logout();
          
          // Only redirect if we're on a protected route
          const protectedRoutes = ['/profile', '/my-trips', '/nearby'];
          if (protectedRoutes.some(route => location.pathname.startsWith(route))) {
            navigate('/signin', { 
              state: { from: location },
              replace: true 
            });
          }
        } else if (event === 'USER_UPDATED') {
          // Handle user profile updates
          if (session?.user) {
            const user = {
              id: session.user.id,
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              avatar: session.user.user_metadata?.avatar_url,
            };
            login(user);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [login, logout, initialize, navigate, location]);

  return null;
}
