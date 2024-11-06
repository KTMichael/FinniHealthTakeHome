
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD6tSQtnU-pfbFSgZ0HSojgk7DNzPLrJJQ",
  authDomain: "finni-health-take-home.firebaseapp.com",
  projectId: "finni-health-take-home",
  storageBucket: "finni-health-take-home.appspot.com",
  messagingSenderId: "125009310989",
  appId: "1:125009310989:web:5b197eee0279c56c13ec44",
  measurementId: "G-VZPFXV2CC2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
