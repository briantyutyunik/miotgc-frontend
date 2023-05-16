import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "@rneui/themed";
import {
  auth,
  firestore,
  generateImageName,
  getCurrentUserProfilePicture,
  getUser,
  getUserAvatarUrl,
  getUserSnapshot,
  updateUser,
  uploadImage,
} from "../../firebase";
import { getFirestore, onSnapshot } from "firebase/firestore";
import { PRIMARY_COLOR } from "../../constants/styles";
import ImageSelect from "./ImageSelect";

export default function UserAvatar({
  size,
  rounded,
  containerStyle,
  setImageName,
}) {
  const [avatarPressed, setAvatarPressed] = useState(false);

  const [openImageSelect, setOpenImageSelect] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    async function getUserData() {
      const currentUser = auth.getAuth().currentUser;
      if (currentUser) {
        let docRef = firestore.doc(
          firestore.getFirestore(),
          "users",
          currentUser.uid
        );
        //gets realtime update of user imageName in case of updated avatar
        try {
          const unsub = onSnapshot(docRef, async (docSnap) => {
            const user = docSnap.data();
            if (user.avatarUrl && user.avatarUrl !== "") {
              const userAvatarUrl = await getCurrentUserProfilePicture(
                user.uid
              );
              setImage(userAvatarUrl);
            }
          });
          return unsub;
        } catch (err) {
          console.log(err);
        }
      }
    }
    getUserData();
  }, []);

  function openImageSelectModal() {
    setOpenImageSelect(!openImageSelect);
  }

  function setAvatarPressedStyle() {
    setAvatarPressed(!avatarPressed);
  }
//change function name to handleAvatarImageUpload (best practice)
  async function handleImageUpload(image) {
    const currUserUid = auth.getAuth().currentUser?.uid;
    const imageName = generateImageName();
    await uploadImage(image, imageName);
    if (currUserUid) {
      try {
        // upload image to firebase storage
        // update user's avatar url
        updateUser(currUserUid, { avatarUrl: imageName });
      } catch (err) {
        console.log(err);
      }
    } else if (image) {
      // callback to SignUpScreen in the case that a user is not yet Signed up but
      // their image needs to be uploaded to firebase
      setImageName(imageName);
    }
  }
  async function handleGroupImageUpload(image) {
    const currUserUid = auth.getAuth().currentUser?.uid;
    const imageName = generateImageName();
    await uploadImage(image, imageName);
    if (currUserUid) {
      try {
        // upload image to firebase storage
        // update user's avatar url
        updateGroup(groupId, {groupUrl: imageName});
        updateUser(currUserUid, { avatarUrl: imageName });
      } catch (err) {roupId, {groupUrl: imageName};        console.log(err);
      }
    } else if (image) {
      // callback to SignUpScreen in the case that a user is not yet Signed up but
      // their image needs to be uploaded to firebase
      setImageName(imageName);
    }
  }

  return (
    <>
      <Avatar
        source={image !== "" ? { uri: image } : {}}
        size={size}
        rounded={rounded}
        onPressIn={setAvatarPressedStyle}
        onPressOut={setAvatarPressedStyle}
        onPress={openImageSelectModal}
        containerStyle={
          avatarPressed ? [containerStyle, { opacity: 0.5 }] : containerStyle
        }
        icon={image !== "" ? { uri: image } : {}}
      >
        <Avatar.Accessory onPress={openImageSelectModal} size={size / 4} />
      </Avatar>
      <ImageSelect
        openImageSelect={openImageSelect}
        setOpenImageSelect={setOpenImageSelect}
        setImage={setImage}
        handleImageUpload={handleImageUpload}
      />
    </>
  );
}

const styles = StyleSheet.create({});
