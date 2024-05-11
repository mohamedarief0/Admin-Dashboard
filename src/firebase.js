import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// areif firebase
const firebaseConfig = {
    apiKey: "AIzaSyAff9VF_OodCSS5iUeuVyJBJWhz6KgVoxA",
    authDomain: "web-firebase-24011.firebaseapp.com",
    projectId: "web-firebase-24011",
    storageBucket: "web-firebase-24011.appspot.com",
    messagingSenderId: "1059214379457",
    appId: "1:1059214379457:web:e41e7a0c078cdc79398740"
  };


// ahamed fire base
// const firebaseConfig = {
//     apiKey: "AIzaSyAb8X5cLpV8uOBnTLy3Ih9dCCsE8yB6qmg",
//     authDomain: "blockticket-app.firebaseapp.com",
//     projectId: "blockticket-app",
//     storageBucket: "blockticket-app.appspot.com",
//     messagingSenderId: "430430210730",
//     appId: "1:430430210730:web:222d4c0fe19c6d69b69ed3",
// }

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

export default db;