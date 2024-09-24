import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6N5owOJ24O4G7bgIDwKjZy1M9pp28ncs",
  authDomain: "roomrover-001.firebaseapp.com",
  projectId: "roomrover-001",
  storageBucket: "roomrover-001.appspot.com",
  messagingSenderId: "378572544333",
  appId: "1:378572544333:web:e2b300875e07e4473abf04",
  measurementId: "G-2DSTZDXNCP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { db, auth };
