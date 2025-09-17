// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOjHqevTFKTcMHn70fZQ3gCF9Odfxu4mY",
  authDomain: "final-deliverable-3e2f1.firebaseapp.com",
  projectId: "final-deliverable-3e2f1",
  storageBucket: "final-deliverable-3e2f1.firebasestorage.app",
  messagingSenderId: "19307162305",
  appId: "1:19307162305:web:f845ad766c4cce46250240",
  measurementId: "G-Q2G6KK976G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);