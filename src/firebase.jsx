import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpIJlHfFf59nRI_TxVKQwmRvw4ulyH71s",
  authDomain: "coda-7b4ba.firebaseapp.com",
  projectId: "coda-7b4ba",
  storageBucket: "coda-7b4ba.appspot.com",
  messagingSenderId: "124961766945",
  appId: "1:124961766945:web:df6210e903bc34c52c6d60"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();