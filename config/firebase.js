// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY0vJmJh-j_ZyiVYWFjG4x0MUIqKl2Jyo",
  authDomain: "codecache-32ec2.firebaseapp.com",
  projectId: "codecache-32ec2",
  storageBucket: "codecache-32ec2.firebasestorage.app",
  messagingSenderId: "401306821362",
  appId: "1:401306821362:web:4214ec9130a9d56a2ae66b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };