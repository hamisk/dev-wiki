require('dotenv').config();
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// const firebase = require('firebase');
const admin = require('firebase-admin');

const serviceAccount = require('./servicekey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dev-wiki-57987-default-rtdb.firebaseio.com',
});

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
// admin.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = admin.firestore();
// const database = app.firestore.getFirestore(firebaseApp);

module.exports = database;
