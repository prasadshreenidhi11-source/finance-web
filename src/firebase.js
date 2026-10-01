// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBKB4GTv1YnUlZmKJOUay9bnr_w3ZBHDrE",
  authDomain: "orion-financial-intelligence.firebaseapp.com",
  projectId: "orion-financial-intelligence",
  storageBucket: "orion-financial-intelligence.firebasestorage.app",
  messagingSenderId: "784110613534",
  appId: "1:784110613534:web:9d9297666be544d5cd2a0f",
  measurementId: "G-F05YJY1Q09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);