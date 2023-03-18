// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase/app";
import * as auth from "firebase/auth";
import * as firestore from "firebase/firestore";
import { useContext, useState } from "react";
import ErrorOverlay from "./components/UI/ErrorOverlay";
import { AuthContext } from "./store/auth-context";

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
export async function userSignIn(email, password) {
  let isLoading = true;
  let error = '';
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('Signed in:', user);
  } catch (e) {
    setIsError(true);
    const errorCode = e.code;
    const errorMessage = e.message;
    console.log('Error:', errorCode, errorMessage);
    error = errorMessage;
  } finally {
    isLoading = false;
  }

  return { isLoading, error };
}

export { firebase, auth, firestore };
