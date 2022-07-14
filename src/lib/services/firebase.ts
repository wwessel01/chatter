import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyB26VFjmtN_eniiWxLKL4B5w0Uw1vIIFuc",
    authDomain: "chatter-23034.firebaseapp.com",
    projectId: "chatter-23034",
    storageBucket: "chatter-23034.appspot.com",
    messagingSenderId: "85095853032",
    appId: "1:85095853032:web:209997a82feaba6912d25d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

export {db, auth};