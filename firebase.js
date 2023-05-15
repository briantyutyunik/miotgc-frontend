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




export async function getCurrentUserProfilePicture(uid) {
  try {
    const docRef = firestore.doc(firestore.getFirestore(), "users", uid);
    const docSnap = await firestore.getDoc(docRef);
    const user = docSnap.data();
    if (user.avatarUrl !== "") {
      const ref = storage.ref(storage.getStorage(), user.avatarUrl);
      const url = await storage.getDownloadURL(ref);
      console.log(url)

      return url;
    } else {
      throw new Error("User has no profile picture");
    }
  } catch (error) {
    throw new Error(`Failed to get user profile picture for uid ${uid}: ${error.message}`);
  }
}






export async function createGroup(groupName, groupAvatar) {
  const groupData = {
    groupName: groupName,
    createdAt: new Date(),
    groupAvatar: groupAvatar, // Add the image URL to the group data
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
  const testGroupId = 'zd2NVCOdmjyXuuamF7sQ'; 

  try {
    await addUserToGroup(testUserId1, testGroupId);
    console.log(`User ${testUserId1} was added to the group ${testGroupId}`);
    await addUserToGroup(testUserId2, testGroupId);
    console.log(`User ${testUserId2} was added to the group ${testGroupId}`);
  } catch (error) {
    console.error('Error adding test users to group:', error);
  }
}




export async function getUser(uid) {
  const docRef = doc(firestore.getFirestore(), "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export function cleanUpUser(user) {
  if (!user) return null;
  let { avatarUrl, dob, email, firstName, groupIds, groups } = user;

  if (groups) {
    groups = groups.map(group => group.id);
  }

  return { avatarUrl, dob, email, firstName, groupIds, groups };
}



export async function getGroupMembers(groupId) {
  const db = firestore.getFirestore();
  const groupRef = doc(db, "groups", groupId);
  const membersCollectionRef = collection(groupRef, "members");
  const membersSnap = await getDocs(membersCollectionRef);

  const members = [];

  for (let memberDoc of membersSnap.docs) {
    const memberId = memberDoc.id;  // this is the user ID
    let userData = await getUser(memberId);
    userData = cleanUpUser(userData);
    members.push({ uid: memberId, ...userData });
  }
  
  console.log("members list: " , members);

  return members;
}



export async function storeAiGeneratedResponse(groupId, aiGeneratedResponse) {
  // Check if groupId and aiGeneratedResponse are valid
  if (!groupId || !aiGeneratedResponse) {
    throw new Error("Invalid input to storeAiGeneratedResponse: groupId and aiGeneratedResponse are required");
  }

  // Reference to the 'trips' subcollection inside the specific group
  const tripsRef = collection(firestore.getFirestore(), "groups", groupId, "trips");

  try {
    // Add the response to Firestore and get the auto-generated ID
    const tripDocRef = await addDoc(tripsRef, aiGeneratedResponse);
    const tripId = tripDocRef.id;

    console.log(`AI Generated Trip stored with ID: ${tripId}`);
    return tripId;
  } catch (error) {
    console.error("Error storing AI Generated Trip:", error);
    throw error;  // Re-throw the error to let the caller handle it
  }
}

export async function getTripByGroupId(groupId) {
  console.log("*********88getTripByGroupId***********: ")
  // Check if groupId is valid
  if (!groupId) {
    throw new Error("Invalid input to getTripByGroupId: groupId is required");
  }

  // Reference to the 'trips' subcollection inside the specific group
  const tripsRef = collection(firestore.getFirestore(), "groups", groupId, "trips");
  
  try {
    // Query Firestore to get the documents in the 'trips' subcollection
    const querySnapshot = await getDocs(tripsRef);

    // Check if the group has a trip
    if (querySnapshot.empty) {
      console.log(`No trip found for group ID ${groupId}`);
      return null; // No trip found for this group
    } 
    
    // Get the first (and only) trip document
    const tripDoc = querySnapshot.docs[0];
    const tripData = tripDoc.data();
    
    //console.log("******TRIP DATA*******: ", tripData) // Log tripData here
    const trip = {
      id: tripDoc.id,
      ...tripData, // This will spread all the fields from the document into the new object
    };

    console.log(`Retrieved trip for group ID ${groupId}`);
    return trip;
  } catch (error) {
    console.error("Error retrieving trip:", error);
    throw error;  // Re-throw the error to let the caller handle it
  }
}

export { firebase, auth, firestore, storage };