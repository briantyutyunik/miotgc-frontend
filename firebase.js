// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import * as firebase from "firebase/app";
import { initializeApp } from "firebase/app";

import { getFirestore, query, where } from "firebase/firestore";
import * as auth from "firebase/auth";
import * as firestore from "firebase/firestore";
import { arrayUnion } from 'firebase/firestore';

import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import * as storage from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { useContext, useState } from "react";
import ErrorOverlay from "./components/UI/ErrorOverlay";
import { getBlobFromUri } from "./util/ImageUtils";
import { onAuthStateChanged } from "firebase/auth";
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
export async function userSignIn(input, password) {
  let isLoading = true;
  let error = "";
  try {
    let email = input;

    // Check if input is a username and get the corresponding email
    if (!input.includes("@")) {
      const userEmail = await getEmailByUsername(input);
      if (userEmail) {
        email = userEmail;
      } else {
        throw new Error("Username not found");
      }
    }

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

export function getCurrentUser(callback) {
  const authInstance = auth.getAuth();
  return onAuthStateChanged(authInstance, callback);
}

export async function getUser(uid) {
  const docRef = doc(firestore.getFirestore(), "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function getEmailByUsername(username) {
  const db = firestore.getFirestore();
  const query = firestore.query(
    firestore.collection(db, "users"),
    firestore.where("userName", "==", username)
  );
  const querySnapshot = await firestore.getDocs(query);

  if (querySnapshot.size > 0) {
    return querySnapshot.docs[0].data().email;
  } else {
    return null;
  }
}

export async function userSignOut() {
  try {
    await auth.signOut(auth.getAuth());
    console.log("User signed out");
  } catch (e) {
    console.error("Error signing out:", e);
  }
}

export async function updateGroupName(groupId, newGroupName) {
  console.log("Received groupId:", groupId, "and newGroupName:", newGroupName); // Add this line

  const docRef = doc(getFirestore(), "groups", groupId);
  try {
    await updateDoc(docRef, { groupName: newGroupName });
    console.log("Group name updated successfully");
  } catch (error) {
    console.error("Error updating group name:", error);
  }
}

export async function userSignUp(newUser) {
  let isLoading = true;
  let error = "";

  try {
    // Step 1: Sign up the new user using Firebase Authentication
    let userCredential = await auth.createUserWithEmailAndPassword(
      auth.getAuth(),
      newUser.email,
      newUser.password
    );

    // Get the unique user ID (UID) from the user object
    newUser.uid = userCredential.user.uid;

    // Step 2: Use the UID to store additional user data in Firestore
    addUser(newUser.uid, newUser);

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

export async function createGroup(groupName) {
  const groupData = {
    groupName: groupName,
    createdAt: new Date(),
  };

  // Add the group to Firestore and get the auto-generated ID
  const groupDocRef = await addDoc(
    collection(firestore.getFirestore(), "groups"),
    groupData
  );
  const groupId = groupDocRef.id;

  return groupId;
}

export async function createInvite(groupId, inviterId) {
  const inviteData = {
    groupId: groupId,
    inviterId: inviterId,
    createdAt: new Date(),
  };

  // Add the invite to Firestore and get the auto-generated ID
  const inviteDocRef = await addDoc(
    collection(firestore.getFirestore(), "invites"),
    inviteData
  );
  const inviteId = inviteDocRef.id;

  return inviteId;
}

// Add this function to your firebase.js

export async function getSectionsByGroupId(groupId) {
  const db = firestore.getFirestore();
  const querySnapshot = await firestore.getDocs(
    firestore.query(
      firestore.collection(db, "Itineraries"),
      firestore.where("groupId", "==", groupId)
    )
  );
  const sections = [];
  // const db = firestore.getFirestore();
  // const querySnapshot = await firestore.getDocs(
  //   firestore.collection(db, "Itineraries")
  // );

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    sections.push({
      id: doc.id,
      ...data, // This will spread all the fields from the document into the new object
    });
  });

  return sections;
} */

export async function getSections() {
  const sections = [];
  const db = firestore.getFirestore();
  const querySnapshot = await firestore.getDocs(
    firestore.collection(db, "Itinerary")
  );

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    let section = {
      id: doc.id,
    };

    for (const key in data) {
      section[key] = data[key];
    }
    console.log("\n\n\n\n\nAAAAAAAAAAAA" + section);
    sections.push(section);
  });

  return sections;
}

export const listenGroupNames = (onGroupNameUpdate) => {
  const uid = auth.getAuth().currentUser.uid;
  const groupsRef = firestore.collection(firestore.getFirestore(), "groups");

  // Listen for real-time updates
  const unsubscribe = onSnapshot(
    query(groupsRef, where("members", "array-contains", uid)),
    (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
          onGroupNameUpdate(change.doc.id, change.doc.data().name);
        }
      });
    }
  );

  // Return the unsubscribe function
  return unsubscribe;
};

export async function fetchGroups() {
  const groupData = [];
  const db = firestore.getFirestore();
  const querySnapshot = await firestore.getDocs(
    firestore.collection(db, "groups")
  );

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    groupData.push({
      id: doc.id,
      name: data.groupName,
      image: data.groupAvatar,
    });
  });

  return groupData;
}

export async function checkIfValueExists(collection, field, value) {
  const db = firestore.getFirestore();
  const query = firestore.query(
    firestore.collection(db, collection),
    firestore.where(field, "==", value)
  );
  const querySnapshot = await firestore.getDocs(query);
  return querySnapshot.size > 0;
}

export async function addUser(uid, data) {
  // Remove the password field before storing user data in Firestore
  const dataWithoutPassword = { ...data };
  delete dataWithoutPassword.password;

  const docRef = doc(firestore.getFirestore(), "users", uid);
  await setDoc(docRef, dataWithoutPassword);
}

export async function updateUser(uid, data) {
  const docRef = doc(firestore.getFirestore(), "users", uid);

  await updateDoc(docRef, data);
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

export function getCurrentUser(callback) {
  const authInstance = auth.getAuth();
  return onAuthStateChanged(authInstance, callback);
}

export async function getUser(uid) {
  const docRef = doc(firestore.getFirestore(), "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function uploadImage(uri, imageName) {
  let blob = await getBlobFromUri(uri);

  

  const storageRef = storage.ref(storage.getStorage(), imageName);

  const uploadTask = await storage.uploadBytesResumable(storageRef, blob);

 
}




export async function addUserToGroup(userId, groupId) {
  const userRef = doc(firestore.getFirestore(), 'users', userId);
  const groupRef = doc(firestore.getFirestore(), 'groups', groupId);

  // Add the user to the 'members' subcollection within the group
  await setDoc(doc(groupRef, 'members', userId), {
    userRef: userRef
  });

  // You might also want to add the group reference to the user document
  // This helps you to keep track of which groups a user is a part of
  await updateDoc(userRef, {
    groups: arrayUnion(groupRef)
  });
}




export async function addTestUsersToGroup() {
  const testUserId1 = 'GUz7LWZApIajKf2QHIm9t14SBNw2'; 
  const testUserId2 = 'HqKayQtQdwXv8zfHcUsggGCBjQS2'; 
  const testGroupId = 'fCo0N3buHNjoKVSMOVJ7'; 

  try {
    await addUserToGroup(testUserId1, testGroupId);
    console.log(`User ${testUserId1} was added to the group ${testGroupId}`);
    await addUserToGroup(testUserId2, testGroupId);
    console.log(`User ${testUserId2} was added to the group ${testGroupId}`);
  } catch (error) {
    console.error('Error adding test users to group:', error);
  }
}

// Add the getGroupMembers function
export async function getGroupMembers(groupId) {
  console.log("Getting group members for groupId:", groupId); // Add this line

  const groupRef = doc(firestore.getFirestore(), 'groups', groupId);
  const membersSnapshot = await getDocs(collection(groupRef, 'members'));

  const members = [];
  for (const memberDoc of membersSnapshot.docs) {
    console.log("Found memberDoc:", memberDoc); // Add this line

    const userRef = memberDoc.data().userRef;
    console.log("User reference:", userRef); // Add this line

    const userSnapshot = await getDoc(userRef);
    console.log("User snapshot:", userSnapshot); // Add this line

    const userData = userSnapshot.data();
    console.log("User data:", userData); // Add this line

    members.push(userData);
  }

  return members;
}


export { firebase, auth, firestore, storage };
