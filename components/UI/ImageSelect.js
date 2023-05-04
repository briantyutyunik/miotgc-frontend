// import React in our code
import React, { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Button from "./Button";
import {
  pickImageFromCamera,
  pickImageFromLibrary,
} from "../../util/ImageUtils";
import {
  auth,
  generateImageName,
  updateUser,
  uploadImage,
} from "../../firebase";

//import to show social icons

export default function ImageSelect({
  openImageSelect,
  setOpenImageSelect,
  setImage,
  handleImageUpload,
}) {
  const handleCameraRollPress = async () => {
    // Code for selecting a photo from the camera roll

    let result = await pickImageFromLibrary();
    if (!result.canceled) {
      // set profile images
      const image = result.assets[0].uri;
      setImage(image);

      setOpenImageSelect(false);

      handleImageUpload(image);
    }
  };

  const handleCameraPress = async () => {
    let result = await pickImageFromCamera();
    if (!result.canceled) {
      const image = result.assets[0].uri;
      setImage(image);

      setOpenImageSelect(false);

      handleImageUpload(image);
    }
  };

  const handleCancelPress = () => {
    setOpenImageSelect(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={openImageSelect}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOpenImageSelect(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHeader}>
              <TouchableOpacity
                style={styles.bottomSheetHeaderButton}
                onPress={handleCancelPress}
              >
                <Ionicons name="md-close" size={24} color="gray" />
              </TouchableOpacity>
              <Text style={styles.bottomSheetHeaderText}>Select a Photo</Text>
            </View>
            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={handleCameraRollPress}
            >
              <Ionicons name="ios-images" size={24} color="gray" />
              <Text style={styles.bottomSheetOptionText}>Camera Roll</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={handleCameraPress}
            >
              <Ionicons name="ios-camera" size={24} color="gray" />
              <Text style={styles.bottomSheetOptionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={handleCancelPress}
            >
              <Ionicons name="close-outline" size={24}></Ionicons>
              <Text style={styles.bottomSheetOptionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  bottomSheetHeaderButton: {
    marginRight: 10,
  },
  bottomSheetHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomSheetOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  bottomSheetOptionText: {
    fontSize: 16,
    marginLeft: 20,
  },
});
