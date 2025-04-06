import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAwnrZ4Au2twe5qh3VnS9TwQiE1PItx82o",
  authDomain: "fundezy-app.firebaseapp.com",
  projectId: "fundezy-app",
  storageBucket: "fundezy-app.firebasestorage.app",
  messagingSenderId: "1092822863538",
  appId: "1:1092822863538:web:3a3da71f429789db4b83ab",
  measurementId: "G-561CSLCPK1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);