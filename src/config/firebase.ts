import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBAWmEo-vwtHhHPg6cNfUHEl2P43myJ_Tk",
  authDomain: "discover-cyclades.firebaseapp.com",
  projectId: "discover-cyclades",
  storageBucket: "discover-cyclades.firebasestorage.app",
  messagingSenderId: "618423915070",
  appId: "1:618423915070:web:afc641b68ebf2790a3b76f",
  measurementId: "G-9WLGJ3H2FT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
