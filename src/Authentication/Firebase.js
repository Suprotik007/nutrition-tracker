
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqMTIdk0pmgUY-ll8MjmK2L64VDVr6Vfo",
  authDomain: "nutrition-tracker-848ca.firebaseapp.com",
  projectId: "nutrition-tracker-848ca",
  storageBucket: "nutrition-tracker-848ca.firebasestorage.app",
  messagingSenderId: "519704426700",
  appId: "1:519704426700:web:00ca4c8cd5ccc5420a6a69"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)