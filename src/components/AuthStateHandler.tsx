import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuthStore } from '../store/authStore';

export default function AuthStateHandler() {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        login({
          id: user.uid,
          name: user.displayName || 'User',
          email: user.email || '',
          avatar: user.photoURL || undefined,
        });
      } else {
        logout();
      }
    });

    return () => unsubscribe();
  }, [login, logout]);

  return null;
}
