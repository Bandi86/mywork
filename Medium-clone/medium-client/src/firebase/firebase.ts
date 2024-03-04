// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'medium-clone-dd500.firebaseapp.com',
  projectId: 'medium-clone-dd500',
  storageBucket: 'medium-clone-dd500.appspot.com',
  messagingSenderId: '223408645419',
  appId: '1:223408645419:web:49ebb9edc89478874c116e'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export const storage = getStorage()
export const db = getFirestore(app)
