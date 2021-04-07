// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB_mUtrJzBcnf8FDmNcJKQwdxg9Q1mqB-A",
  authDomain: "chattingapp1-81802.firebaseapp.com",
  projectId: "chattingapp1-81802",
  storageBucket: "chattingapp1-81802.appspot.com",
  messagingSenderId: "1013831252498",
  appId: "1:1013831252498:web:e39f54b41d5de8b56236cb",
  measurementId: "G-2PT3RLS592"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;