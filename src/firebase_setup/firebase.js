// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPEQbm25kRiKoTltsPYe0fX-jf16MxYZU",
  authDomain: "web-51f52.firebaseapp.com",
  projectId: "web-51f52",
  storageBucket: "web-51f52.appspot.com",
  messagingSenderId: "328505442225",
  appId: "1:328505442225:web:b3176e19f5b2c94ef38790",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
