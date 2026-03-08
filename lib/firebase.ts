// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB92e3UL9LiLhHmSCGje_9RtoMsgDvXwU",
  authDomain: "bambu-e7abc.firebaseapp.com",
  projectId: "bambu-e7abc",
  storageBucket: "bambu-e7abc.firebasestorage.app",
  messagingSenderId: "269008213993",
  appId: "1:269008213993:web:97c5352c7b4c417a395d78",
  measurementId: "G-5BW7LWXPVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);