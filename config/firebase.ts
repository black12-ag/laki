import { initializeApp, getApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "REMOVED_KEY",
  authDomain: "ethio-viral-d509e.firebaseapp.com",
  databaseURL: "https://ethio-viral-d509e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ethio-viral-d509e",
  storageBucket: "ethio-viral-d509e.firebasestorage.app",
  messagingSenderId: "701952682899",
  appId: "1:701952682899:web:5c03107d9746e4afee1666",
  measurementId: "G-FMCCX98MJR"
};

// Initialize Firebase
let app;
let auth;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  // Initialize Auth with persistence for React Native
  try {
      auth = initializeAuth(app);
  } catch (e) {
      // Fallback if persistence/auth already initialized
      auth = getAuth(app);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

const db = getFirestore(app);

export { auth, db, app };
