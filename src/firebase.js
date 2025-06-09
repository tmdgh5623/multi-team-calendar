import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmKazNVKE4dEF7bkEsbBAYhRTQp94x4fo",
  authDomain: "team-calendar-6396c.firebaseapp.com",
  projectId: "team-calendar-6396c",
  storageBucket: "team-calendar-6396c",
  messagingSenderId: "258023333622",
  appId: "1:258023333622:web:90c98ec2cb49d0723f96d7",
  measurementId: "G-GXMSRX3CXT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };