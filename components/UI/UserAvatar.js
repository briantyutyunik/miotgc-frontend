import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar } from "@rneui/themed";
import { auth, firestore } from "../../firebase";
import { getFirestore, onSnapshot } from "firebase/firestore";
import { PRIMARY_COLOR } from "../../constants/styles";

export default function UserAvatar({ size, rounded, containerStyle }) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (auth.getAuth().currentUser) {
      // Get user data and set state to a variable userData
      // if user Avatar is there, use it. If not use FirstName initial for avatar title. If not use camera icon
      // Example Query: const userRef = firestore.doc(
      //   firestore.getFirestore(),
      //   `users/${auth.getAuth().currentUser.uid}`
      // );
      //  onSnapshot(userRef, (doc) => {
      //   console.log(doc.data().firstName);
      // setUserData(doc.data();
      // });
    }
  }, []);

  if (!userData) {
    // icon={{}} is the style for avatar icon
    return (
      <Avatar
        rounded={rounded}
        size={size}
        containerStyle={containerStyle}
        icon={{}}
        onPress={() => console.log("Pressed")}
      >
        <Avatar.Accessory
          // backgroundColor={PRIMARY_COLOR}
          onPress={() => console.log("Accessory Pressed")}
          size={size / 4}
        />
      </Avatar>
    );
  }

  if (!userData.avatarUrl && userData.firstName) {
    const firstInitial = userData.firstName.substring(0, 1);
    return (
      <Avatar
        title={firstInitial}
        size={size}
        rounded={rounded}
        containerStyle={containerStyle}
      >
        <Avatar.Accessory
          onPress={() => console.log("Accessory Pressed")}
          size={size / 4}
        />
      </Avatar>
    );
  }

  return (
    <Avatar
      source={userData.avatarUrl}
      size={size}
      rounded={rounded}
      containerStyle={containerStyle}
    >
      <Avatar.Accessory
        onPress={() => console.log("Accessory Pressed")}
        size={size / 4}
      />
    </Avatar>
  );
}

const styles = StyleSheet.create({});