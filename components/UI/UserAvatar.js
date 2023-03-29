import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "@rneui/themed";
import { auth, firestore, getUser } from "../../firebase";
import { getFirestore, onSnapshot } from "firebase/firestore";
import { PRIMARY_COLOR } from "../../constants/styles";

export default function UserAvatar({
  size,
  rounded,
  containerStyle,
  onPress,
  imageUri,
}) {
  const [userData, setUserData] = useState();
  const [avatarPressed, setAvatarPressed] = useState(false);

  useEffect(() => {
    if (auth.getAuth().currentUser) {
      const uid = auth.getAuth().currentUser?.uid;
      const user = getUser(uid);
      setUserData(user);
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
    //
    return (
      <Avatar
        onPressIn={() => setAvatarPressed(!avatarPressed)}
        onPressOut={() => setAvatarPressed(!avatarPressed)}
        rounded={rounded}
        onPress={onPress}
        source={imageUri ? { uri: imageUri } : {}}
        size={size}
        containerStyle={
          avatarPressed ? [containerStyle, { opacity: 0.5 }] : containerStyle
        }
        icon={{}}
      >
        <Avatar.Accessory onPress={onPress} size={size / 4} />
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
        onPress={onPress}
        containerStyle={containerStyle}
      >
        <Avatar.Accessory onPress={onPress} size={size / 4} />
      </Avatar>
    );
  }

  return (
    <Avatar
      source={userData?.avatarUrl !== "" ? { uri: userData?.avatarUrl } : {}}
      size={size}
      rounded={rounded}
      onPress={onPress}
      containerStyle={containerStyle}
    >
      <Avatar.Accessory onPress={onPress} size={size / 4} />
    </Avatar>
  );
}

const styles = StyleSheet.create({});
