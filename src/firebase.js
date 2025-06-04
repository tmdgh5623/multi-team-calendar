import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmKazNVKE4dEF7bkEsbBAYhRTQp94x4fo",
  authDomain: "team-calendar-6396c.firebaseapp.com",
  projectId: "team-calendar-6396c",
  storageBucket: "team-calendar-6396c.firebasestorage.app",
  messagingSenderId: "258023333622",
  appId: "1:258023333622:web:90c98ec2cb49d0723f96d7",
  measurementId: "G-GXMSRX3CXT"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
