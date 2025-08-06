import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBNMkR7Vbr1Dv6Pv3wg5tn82QJG0RmKA-k",
  authDomain: "vechile-rent-app.firebaseapp.com",
  projectId: "vechile-rent-app",
  storageBucket: "vechile-rent-app.firebasestorage.app",
  messagingSenderId: "952055962961",
  appId: "1:952055962961:web:0d291dd596adedff394770",
  measurementId: "G-6MMYH4Y06V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;