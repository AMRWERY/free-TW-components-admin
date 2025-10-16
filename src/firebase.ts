import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbWNT-4vyCDSqB38KK2I-cdmW409lNkCw",
  authDomain: "free-tw-components.firebaseapp.com",
  projectId: "free-tw-components",
  storageBucket: "free-tw-components.firebasestorage.app",
  messagingSenderId: "140411028265",
  appId: "1:140411028265:web:530c043c9999df60382d38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
