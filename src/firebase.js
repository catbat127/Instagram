import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDczptFu0j7aqrA3mC8B5Cf8OBbCiAxiaQ",
    authDomain: "instagram-3-e571b.firebaseapp.com",
    projectId: "instagram-3-e571b",
    storageBucket: "instagram-3-e571b.appspot.com",
    messagingSenderId: "452489072973",
    appId: "1:452489072973:web:7d971cc6c7a20adb822704",
    measurementId: "G-3TC4EQ22BD"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

//use storage to upload pictures and store in the db
const storage = firebase.storage();

export { db, auth, storage };