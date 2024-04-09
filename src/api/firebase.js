import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPEQbm25kRiKoTltsPYe0fX-jf16MxYZU",
  authDomain: "web-51f52.firebaseapp.com",
  projectId: "web-51f52",
  storageBucket: "web-51f52.appspot.com",
  messagingSenderId: "328505442225",
  appId: "1:328505442225:web:b3176e19f5b2c94ef38790",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
