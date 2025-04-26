import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuthStore } from '../store/authStore';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AuthStateHandler() {
  const { login, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Clear any stale auth state on mount
    const currentUser = auth.currentUser;
    if (!currentUser) {
      logout();
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        login({
          id: user.uid,
          name: user.displayName || user.email?.split('@')[0] || 'User',
          displayName: user.displayName || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          avatar: user.photoURL || undefined,
        });

        // If we were trying to access a protected route, redirect there
        const state = location.state as { from?: Location };
        if (state?.from) {
          navigate(state.from.pathname);
        }
      } else {
        // User is signed out
        logout();
        
        // Only redirect if we're on a protected route
        const protectedRoutes = ['/profile', '/my-trips'];
        if (protectedRoutes.some(route => location.pathname.startsWith(route))) {
          navigate('/signin', { 
            state: { from: location },
            replace: true 
          });
        }
      }
    });

    return () => unsubscribe();
  }, [login, logout, navigate, location]);

  return null;
}
