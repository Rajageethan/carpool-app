// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ9slATmwrnIrrptaMmUYQ8yLB_BUmAv8",
  authDomain: "carpool-app-2ed91.firebaseapp.com",
  projectId: "carpool-app-2ed91",
  storageBucket: "carpool-app-2ed91.firebasestorage.app",
  messagingSenderId: "731836740745",
  appId: "1:731836740745:web:7255d5b339c78d26db0258",
  measurementId: "G-N7MDCC2653"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const firestore = getFirestore(app);

export { auth };