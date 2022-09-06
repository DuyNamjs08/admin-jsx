
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDD7NYOahnKoNu4ELb0MWGqTflyBhYEnGI",
  authDomain: "authentication-form-f5b02.firebaseapp.com",
  projectId: "authentication-form-f5b02",
  storageBucket: "authentication-form-f5b02.appspot.com",
  messagingSenderId: "237411547957",
  appId: "1:237411547957:web:5158b62893d377acbeaa7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);