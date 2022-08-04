
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARrgvOTXL9Prnb0LVuDFV_R0IXUMq1gug",
  authDomain: "final-bd033.firebaseapp.com",
  projectId: "final-bd033",
  storageBucket: "final-bd033.appspot.com",
  messagingSenderId: "634668007658",
  appId: "1:634668007658:web:fefb0c35a3653c8d6dd793"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);