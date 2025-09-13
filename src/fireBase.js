// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyDbY7i11-cUTH_65QbwxPQ5orzB_nBLGhQ',
//   authDomain: 'fir-app-2e139.firebaseapp.com',
//   projectId: 'fir-app-2e139',
//   storageBucket: 'fir-app-2e139.firebasestorage.app',
//   messagingSenderId: '632005998830',
//   appId: '1:632005998830:web:eb0c9e5eea01e2629e9bff',
//   measurementId: 'G-BNZ173Q4LX',
//Gauri's firebase
// };

//Gugan's firebase
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
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, googleProvider, db };
