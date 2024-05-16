import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAff9VF_OodCSS5iUeuVyJBJWhz6KgVoxA",
  authDomain: "web-firebase-24011.firebaseapp.com",
  projectId: "web-firebase-24011",
  storageBucket: "web-firebase-24011.appspot.com",
  messagingSenderId: "1059214379457",
  appId: "1:1059214379457:web:e41e7a0c078cdc79398740",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firestore database instance
export const db = getFirestore(app);
