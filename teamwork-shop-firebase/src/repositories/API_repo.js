//FIREBASE STORAGE CONFIG

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAtQZwq9SkV8oIEjh0su2f_5kx0XiUVi_A",
  authDomain: "webshop-project-a38cd.firebaseapp.com",
  databaseURL: "https://webshop-project-a38cd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "webshop-project-a38cd",
  storageBucket: "webshop-project-a38cd.appspot.com",
  messagingSenderId: "37485036364",
  appId: "1:37485036364:web:d34edf8791aa1c367905e9",
  measurementId: "G-6PJB9WY0VQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



export const API_URL =
// FIREBASE DB URL
	'https://webshop-project-a38cd-default-rtdb.europe-west1.firebasedatabase.app/';   // Firebase URL

// AUTHENTICATION DB URL
export const AUTH_LOGIN_API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtQZwq9SkV8oIEjh0su2f_5kx0XiUVi_A';

export const AUTH_REG_API_URL =
	'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtQZwq9SkV8oIEjh0su2f_5kx0XiUVi_A';