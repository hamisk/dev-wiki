// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from '@firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = process.env.APIKEY;
const authDomain = process.env.AUTHDOMAIN;
const databaseURL = process.env.DATABASEURL;
const projectId = process.env.PROJECTID;
const storageBucket = process.env.STORAGEBUCKET;
const messagingSenderId = process.env.MESSAGINGSENDERID;
const appId = process.env.APPID;

// Your web app's Firebase configuration
// Populate these variables from .env for security
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = getFirestore(app);
