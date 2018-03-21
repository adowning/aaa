// import firebase from "firebase";

// Required for side-effects
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyDdspiJ0VAnGLeyRziofRCSld1bpBoms7E",
  authDomain: "andrewsadmin.firebaseapp.com",
  databaseURL: "https://andrewsadmin.firebaseio.com",
  projectId: "andrewsadmin",
  storageBucket: "andrewsadmin.appspot.com",
  messagingSenderId: "734746045873"
};
const firebase = require("firebase");
const firebaseApp = firebase.initializeApp(config);
export default firebaseApp;
