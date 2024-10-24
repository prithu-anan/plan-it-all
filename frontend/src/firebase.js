// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0lzX344bauMq1aOWujkUJUT8r-E-z9cU",
  authDomain: "plan-it-all-e6cab.firebaseapp.com",
  projectId: "plan-it-all-e6cab",
  storageBucket: "plan-it-all-e6cab.appspot.com",
  messagingSenderId: "166721043171",
  appId: "1:166721043171:web:ff9caee2207db4660aa3d6",
  measurementId: "G-H8JD758RS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);