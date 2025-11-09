// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6ZhVGBM9ZFTNCF2DOKMTR1SC6ZAKXMMk",
  authDomain: "star-tracker-for-mxb-d2d6f.firebaseapp.com",
  projectId: "star-tracker-for-mxb-d2d6f",
  storageBucket: "star-tracker-for-mxb-d2d6f.firebasestorage.app",
  messagingSenderId: "296678838407",
  appId: "1:296678838407:web:f815ba62388a6d36fa6822"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { getAuth } from "firebase/auth";
export const auth = getAuth(app);
