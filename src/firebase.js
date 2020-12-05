import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
// import "firebase/storage"

// const firebase = require("firebase/app")
// // const auth = require("firebase/auth")
// // const db = require("firebase/firestore")
// // const storage = require("firebase/storage")
require("firebase/auth")
require("firebase/firestore")
require("firebase/storage")

const firebaseConfig = {
    apiKey: "AIzaSyC302lZRSIB4C5WmEeRLPFcKLs0l1jIC8s",
    authDomain: "vue--fb.firebaseapp.com",
    projectId: "vue--fb",
    storageBucket: "vue--fb.appspot.com",
    messagingSenderId: "850521822271",
    appId: "1:850521822271:web:6b296157adde55c5dd948a"
  };
//   // Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()


// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

export {
   firebase, db, auth, storage 
}