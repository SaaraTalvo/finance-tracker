import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBj4h91Y16Vpivsit2Z1V9S2FyIRQtdqSU",
  authDomain: "mymoney-d3bf5.firebaseapp.com",
  projectId: "mymoney-d3bf5",
  storageBucket: "mymoney-d3bf5.appspot.com",
  messagingSenderId: "105951114578",
  appId: "1:105951114578:web:62c13b8e0ef7f60a35f68b",
};

//init firebase, the whole service
firebase.initializeApp(firebaseConfig);

//init each individual different services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
