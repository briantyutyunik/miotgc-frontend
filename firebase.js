// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase/app";
import * as auth from "firebase/auth";
import { useState } from "react";
import ErrorOverlay from "./components/UI/ErrorOverlay";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWQM3Zo7XTLSRTZ9aTcCrD92vIP8NQm8E",
  authDomain: "miotgc-8e3f9.firebaseapp.com",
  databaseURL: "https://miotgc-8e3f9-default-rtdb.firebaseio.com",
  projectId: "miotgc-8e3f9",
  storageBucket: "miotgc-8e3f9.appspot.com",
  messagingSenderId: "392208476125",
  appId: "1:392208476125:web:2610fa051093ebc9e17834",
  measurementId: "G-PSTMPMFTMS",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export function userSignIn(email, password) {
  const navigation = useNavigation();
  const [error, setError] = setError();
  auth
    .signInWithEmailAndPassword(auth.getAuth(), email, password)
    .then(() => {
      // if valid sign in - navigate to profile screen (Use context or whatever you watch)
      // ex: navigator.navigate("Home", { name: "Profile" });
      navigation.navigate("Home");
    })
    .catch((error) => {
      // indicate the user that there is an error logging in - pass the error.message to your
      // <Error/> component in the way you want
      setError("Invalid email or password.");
      console.log(error.code, error.message);
    });
  // if (error) {
  //   return <ErrorOverlay message={error} />;
  // }
}

export { firebase, auth };
