
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyBIHmoLr4uYYb6jkyl9Jxo9d4DcQjU2AfY",
  authDomain: "inventory-management-sys-98587.firebaseapp.com",
  projectId: "inventory-management-sys-98587",
  storageBucket: "inventory-management-sys-98587.appspot.com",
  messagingSenderId: "464648963065",
  appId: "1:464648963065:web:083db1b08d5c706298b328",
  measurementId: "G-E8H4K4YBF9",
  databaseURL: "https://inventory-management-sys-98587-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { auth };
export { db };