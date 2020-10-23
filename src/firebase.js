import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCPZsYEp8S-ZieCvqlecL2w9gcb4AFj1ro",
  authDomain: "imessage-clone-85c13.firebaseapp.com",
  databaseURL: "https://imessage-clone-85c13.firebaseio.com",
  projectId: "imessage-clone-85c13",
  storageBucket: "imessage-clone-85c13.appspot.com",
  messagingSenderId: "936367738735",
  appId: "1:936367738735:web:fd7d2a8b37796a36bda29a",
  measurementId: "G-6C7042KHRL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
