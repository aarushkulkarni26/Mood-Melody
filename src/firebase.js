import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDdXvwUR-RHAGBOXYvFT3zQRHbTjMWTyrA",
  authDomain: "neohacks-f9ad7.firebaseapp.com",
  projectId: "neohacks-f9ad7",
  storageBucket: "neohacks-f9ad7.appspot.com",
  messagingSenderId: "271735467770",
  appId: "1:271735467770:web:ec252423cb7343556b6343",
  measurementId: "G-559GKT8WEY"
};

firebase.initializeApp(firebaseConfig)
var provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth()
export {provider,auth}