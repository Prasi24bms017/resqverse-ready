import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmLwOcJLrUdfSoTQwUB0isZeRBhorcwjA",
  authDomain: "safealert-india.firebaseapp.com",
  projectId: "safealert-india",
  storageBucket: "safealert-india.firebasestorage.app",
  messagingSenderId: "251195067167",
  appId: "1:251195067167:web:54dbb8a19ce0e3c2233e2a",
  databaseURL: "https://safealert-india-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

export default app;