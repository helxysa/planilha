// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuhxHMHHLZepE_Kzyh47qNJVQJ_AW2AIk",
  authDomain: "finances-89159.firebaseapp.com",
  projectId: "finances-89159",
  storageBucket: "finances-89159.firebasestorage.app",
  messagingSenderId: "379122529339",
  appId: "1:379122529339:web:f6e082737e61e515eed81e",
  measurementId: "G-EYYC1NQ605"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



