// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSq2xTC_ZgDkaL2zFG_TDeYb6xsolA2os",
  authDomain: "easy-split-2a48b.firebaseapp.com",
  projectId: "easy-split-2a48b",
  storageBucket: "easy-split-2a48b.firebasestorage.app",
  messagingSenderId: "290465597940",
  appId: "1:290465597940:web:632149df79282f3c3c51a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}