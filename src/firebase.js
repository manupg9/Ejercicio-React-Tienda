import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBw012G8b5BjJAywW9F9rx_8NOuXeyuy2U",
  authDomain: "tienda-react-f3c5c.firebaseapp.com",
  projectId: "tienda-react-f3c5c",
  storageBucket: "tienda-react-f3c5c.firebasestorage.app",
  messagingSenderId: "159041201628",
  appId: "1:159041201628:web:fbd7215195bb08b2f1db19",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
