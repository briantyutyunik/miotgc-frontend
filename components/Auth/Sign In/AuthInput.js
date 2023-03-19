import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { PRIMARY_COLOR } from "../../../constants/styles";
import Line from "../../UI/Line";
export default function AuthInput({
  placeholder,
  onChangeTextHandler,
  inputType,
  secure,
  containerStyle,
  error,
}) {
  const [secureIcon, setSecureIcon] = useState(secure);
  return (
    <>
      <View style={styles.errorMessageContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          placeholder={placeholder}
          placeholderTextColor="#708090"
          onChangeText={onChangeTextHandler}
          keyboardType={inputType === "email" ? "email-address" : "default"}
          secureTextEntry={secureIcon}
          autoCapitalize="none" // autoFocus={inputType === "email"}
        />
        
        {inputType === "password" && (
          <TouchableOpacity
            style={styles.showIconContainer}
            onPress={() => setSecureIcon(!secureIcon)}
          >
            <Ionicons name="eye-outline" size={20} color={"#fff"} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    justifyContent: "center",
    marginBottom: 25,
    borderColor: PRIMARY_COLOR,
    borderRadius: 10,
    borderWidth: 2,
  },
  inputText: {
    color: "#000",
    fontSize: 16,
    padding: 15,
  },
  showIconContainer: {
    position: "absolute",
    right: 5,
    top: 2,
  },
  showIconPressed: {
    color: "grey",
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
  errorMessageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
