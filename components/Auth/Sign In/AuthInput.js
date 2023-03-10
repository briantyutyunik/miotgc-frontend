import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Line from "../../UI/Line";

export default function AuthInput({
  placeholder,
  onChangeTextHandler,
  inputType,
  secure,
}) {
  const [secureIcon, setSecureIcon] = useState(secure);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputText}
        placeholder={placeholder}
        placeholderTextColor="#708090"
        onChangeText={onChangeTextHandler}
        keyboardType={inputType === "email" ? "email-address" : "default"}
        secureTextEntry={secureIcon}
        autoCapitalize={false}
        // autoFocus={inputType === "email"}
      />
      {inputType === "password" && (
        <TouchableOpacity
          style={styles.showIconContainer}
          onPress={() => setSecureIcon(!secureIcon)}
        >
          <Ionicons name="eye-outline" size={20} color={"#fff"} />
        </TouchableOpacity>
      )}
      <Line />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "75%",
    justifyContent: "center",
    marginBottom: 20,
  },
  inputText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 10,
  },
  showIconContainer: {
    position: "absolute",
    right: 5,
    top: 2,
  },
  showIconPressed: {
    color: "grey",
  },
});
