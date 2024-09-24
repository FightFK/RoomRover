// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6N5owOJ24O4G7bgIDwKjZy1M9pp28ncs",
  authDomain: "roomrover-001.firebaseapp.com",
  projectId: "roomrover-001",
  storageBucket: "roomrover-001.appspot.com",
  messagingSenderId: "378572544333",
  appId: "1:378572544333:web:e2b300875e07e4473abf04",
  measurementId: "G-2DSTZDXNCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db , auth };