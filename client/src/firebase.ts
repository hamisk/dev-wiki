// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from '@firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJa2Z_n8UDddd3Sgk5UHQjT-ugZKHNfQk',
  authDomain: 'dev-wiki-57987.firebaseapp.com',
  databaseURL: 'https://dev-wiki-57987-default-rtdb.firebaseio.com',
  projectId: 'dev-wiki-57987',
  storageBucket: 'dev-wiki-57987.appspot.com',
  messagingSenderId: '718213395294',
  appId: '1:718213395294:web:b9642003c4055954fe95cf',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);
