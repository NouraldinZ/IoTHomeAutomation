// Import the functions you need from the SDKs you need
import firebase from "firebase/compat";
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCoIrxJKHeo3tH-34Knfb-dsMbZlfLg1EE",
    authDomain: "iothomeautomation-e0c10.firebaseapp.com",
    databaseURL: "https://iothomeautomation-e0c10-default-rtdb.firebaseio.com",
    projectId: "iothomeautomation-e0c10",
    storageBucket: "iothomeautomation-e0c10.appspot.com",
    messagingSenderId: "1011866090752",
    appId: "1:1011866090752:web:5e5c4bbffcf7319abdc7e5",
    //measurementId: "G-HKEPD3PYT9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default firebase;