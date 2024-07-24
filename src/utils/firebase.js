// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdGbrUF0hdWLIxR-6rEdmVw0sV5q49fug",
  authDomain: "netflixgpt-cdbad.firebaseapp.com",
  projectId: "netflixgpt-cdbad",
  storageBucket: "netflixgpt-cdbad.appspot.com",
  messagingSenderId: "40749713699",
  appId: "1:40749713699:web:8b4efd8e49cd9536f9e496",
  measurementId: "G-P5WN46MTN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
