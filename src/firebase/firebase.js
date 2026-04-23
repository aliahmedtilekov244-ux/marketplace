import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdYGUcj-GZ5XO0gjymDhtsGui0Zq2UmJ4",
  authDomain: "marketplace-b8b82.firebaseapp.com",
  projectId: "marketplace-b8b82",
  storageBucket : "marketplace-b8b82.firebasestorage.app" , 
  messagingSenderId : "517426509601" , 
  appId : "1:517426509601:web:3f536a0b27508f7d56f060" , 
  measurementId : "G-C6QHBYLQPQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);