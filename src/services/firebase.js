// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_XM25usDOZtu4zhfawXGK8Ziev-fM2kQ",
  authDomain: "todolist-90379.firebaseapp.com",
  databaseURL: "https://todolist-90379-default-rtdb.firebaseio.com",
  projectId: "todolist-90379",
  storageBucket: "todolist-90379.firebasestorage.app",
  messagingSenderId: "31753015625",
  appId: "1:31753015625:web:20a243c6f7dd3cba154a98",
  measurementId: "G-85DHQJQ6LB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const auth = getAuth(app);