// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from '@firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnqsyM_gFULgd69NgYzsZJvGqM4BAPxTw",
  authDomain: "tapcoin-4f5f8.firebaseapp.com",
  projectId: "tapcoin-4f5f8",
  storageBucket: "tapcoin-4f5f8.appspot.com",
  messagingSenderId: "988298056770",
  appId: "1:988298056770:web:2e04b40575139a8e3f09db",
  measurementId: "G-D62M94DZX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); //refrence to the db
export const authentication = getAuth(app); //refrences to auth
