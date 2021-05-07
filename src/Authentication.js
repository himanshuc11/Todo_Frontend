import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyBQtglh2cTpq5t7zfdb9ym93IMsnSbOwv8",
  authDomain: "auth-development-b242a.firebaseapp.com",
  projectId: "auth-development-b242a",
  storageBucket: "auth-development-b242a.appspot.com",
  messagingSenderId: "73408745599",
  appId: "1:73408745599:web:04d498d90a22a47e996f4a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
