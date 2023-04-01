// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase/app";
import * as auth from "firebase/auth";
import * as firestore from "firebase/firestore";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import * as storage from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { useContext, useState } from "react";
import ErrorOverlay from "./components/UI/ErrorOverlay";
import { AuthContext } from "./store/auth-context";
import { getBlobFromUri } from "./util/ImageUtils";

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
  let error = "";
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      auth.getAuth(),
      email,
      password
    );
    const user = userCredential.user;
    console.log("Signed in:", user);
  } catch (e) {
    const errorCode = e.code;
    const errorMessage = e.message;
    console.log("Error:", errorCode, errorMessage);
    error = errorMessage;
  } finally {
    isLoading = false;
  }

  return { isLoading, error };
}

export async function userSignUp(email, password, data) {
  let isLoading = true;
  let error = "";
  try {
    let userCredential = await auth.createUserWithEmailAndPassword(
      auth.getAuth(),
      email,
      password
    );
    data.uid = userCredential.user.uid;
    addUser(data.uid, data);
    console.log("Signed up:", userCredential.user);
  } catch (e) {
    const errorCode = e.code;
    const errorMessage = e.message;
    console.log("Error:", errorCode, errorMessage);
    error = errorMessage;
  } finally {
    isLoading = false;
  }

  return { isLoading, error };
}

// user queries
export async function addUser(uid, data) {
  const docRef = doc(firestore.getFirestore(), "users", uid);
  await setDoc(docRef, data);
}

export async function updateUser(uid, data) {
  const docRef = doc(firestore.getFirestore(), "users", uid);

  await updateDoc(docRef, data);
}

export async function getUser(uid) {
  const docRef = doc(firestore.getFirestore(), "users", uid);

  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

// Image
export function generateImageName() {
  const imageName = `images/img-${new Date().getTime()}.jpg`;
  return imageName;
}

export async function getImageUrl(uri) {
  let ref = storage.ref(storage.getStorage(), uri);
  const downloadUrl = await storage.getDownloadURL(ref);
  return downloadUrl;
}

export async function uploadImage(uri, imageName) {
  let blob = await getBlobFromUri(uri);

  // const newFile = new File([blob], `${imgName}.jpeg`, { type: "image/jpeg" });

  // name consists of current time - can add another part to string (Do not use
  // uid as can cause issues in sign up for)

  const storageRef = storage.ref(storage.getStorage(), imageName);

  // onStart && onStart();
  const uploadTask = await storage.uploadBytesResumable(storageRef, blob);

  // uploadTask.on(
  //   "state_changed",
  //   (snapshot) => {
  //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log("Upload is " + progress + "% done");
  //     switch (snapshot.state) {
  //       case "paused":
  //         console.log("Upload is paused");
  //         break;
  //       case "running":
  //         console.log("Upload is running");
  //         break;
  //     }
  //   },
  //   (error) => {
  //     this.setState({ isLoading: false });
  //     // A full list of error codes is available at
  //     // https://firebase.google.com/docs/storage/web/handle-errors
  //     switch (error.code) {
  //       case "storage/unauthorized":
  //         console.log("User doesn't have permission to access the object");
  //         break;
  //       case "storage/canceled":
  //         console.log("User canceled the upload");
  //         break;
  //       case "storage/unknown":
  //         console.log("Unknown error occurred, inspect error.serverResponse");
  //         break;
  //     }
  //   },
  //   async () => {
  //     // Upload completed successfully, now we can get the download URL
  //   }
  // );
}

export { firebase, auth, firestore, storage };
