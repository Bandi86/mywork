// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBdj4ei_0Ttyie83HCh5qAMUrCTNv4CvQw',
	authDomain: 'webshop-next-projekt.firebaseapp.com',
	databaseURL:
		'https://webshop-next-projekt-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'webshop-next-projekt',
	storageBucket: 'webshop-next-projekt.appspot.com',
	messagingSenderId: '155310885097',
	appId: '1:155310885097:web:fef037650e9ff0d2f04878',
	measurementId: 'G-RXMK4H7X5J',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const API_URL =
	// FIREBASE DB URL
	'https://webshop-next-projekt-default-rtdb.europe-west1.firebasedatabase.app//'; // Firebase URL

// AUTHENTICATION DB URL
export const AUTH_LOGIN_API_URL =
	'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBdj4ei_0Ttyie83HCh5qAMUrCTNv4CvQw';

export const AUTH_REG_API_URL =
	'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdj4ei_0Ttyie83HCh5qAMUrCTNv4CvQw';
