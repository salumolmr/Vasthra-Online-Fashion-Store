// firebase.js — compat style for CDN scripts

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgWB9_Ah7geMSCSKFkBtz3ELCjkReWTgs",
  authDomain: "vasthra-official.firebaseapp.com",
  projectId: "vasthra-official",
  storageBucket: "vasthra-official.firebasestorage.app",
  messagingSenderId: "234627028828",
  appId: "1:234627028828:web:e8721970dec49b386d9399",
  measurementId: "G-1XN19216JJ"
};

// Initialize Firebase (compat)
firebase.initializeApp(firebaseConfig);

// Expose services
const auth = firebase.auth();
const db   = firebase.firestore();
