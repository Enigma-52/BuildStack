import { initializeApp } from 'firebase/app';
import { getCountFromServer, getFirestore, doc, setDoc , getDocs ,collection , query, orderBy, startAfter, limit} from 'firebase/firestore';
import { signOut, sendPasswordResetEmail,signInWithEmailAndPassword, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup,getAuth } from 'firebase/auth';

import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.APP_API_KEY,
  authDomain: process.env.APP_AUTH_DOMAIN,
  projectId: process.env.APP_PROJECT_ID,
  storageBucket: process.env.APP_STORAGE_BUCKET,
  messagingSenderId: process.env.APP_MESSAGING_SENDER_ID,
  appId: process.env.APP_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default { getCountFromServer,signOut,sendPasswordResetEmail,signInWithEmailAndPassword, createUserWithEmailAndPassword, firebaseConfig,firebaseApp, db, doc , setDoc ,getFirestore, getDocs, collection,auth, GoogleAuthProvider, signInWithPopup, query, orderBy, startAfter, limit};