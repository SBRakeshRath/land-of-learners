// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfpqLCUfbdMRkpWBVqtTIyhUNkDfYENEI",
  authDomain: "landoflearners-25598.firebaseapp.com",
  projectId: "landoflearners-25598",
  storageBucket: "landoflearners-25598.appspot.com",
  messagingSenderId: "793827887274",
  appId: "1:793827887274:web:5c0f993f9d71ed4005e8d3",
  measurementId: "G-4Q0TGJPPDM",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
setPersistence(auth, inMemoryPersistence);

const analytics = getAnalytics(app);

export default app;
export { auth, analytics };
