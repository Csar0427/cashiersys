// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPVU5r__swMKTqFfoCE5UtyWJwLeateyI",
  authDomain: "orderingsystem-8e3b2.firebaseapp.com",
  databaseURL: "https://orderingsystem-8e3b2-default-rtdb.firebaseio.com",
  projectId: "orderingsystem-8e3b2",
  storageBucket: "orderingsystem-8e3b2.appspot.com",
  messagingSenderId: "918684651055",
  appId: "1:918684651055:web:9d7e0759ac9166309540da",
  measurementId: "G-3M8R2DSG69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, analytics, database };
