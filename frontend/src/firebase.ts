// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'real-estate-65a29.firebaseapp.com',
  projectId: 'real-estate-65a29',
  storageBucket: 'real-estate-65a29.appspot.com',
  messagingSenderId: '848038089161',
  appId: '1:848038089161:web:626cfce9a39c3b3f781818',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
