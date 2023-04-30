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
  keyboardType,
  onBlurHandler,

  disableCustomBehavior,
  value,
  onChangeText,
  ...props
}) {
  const [secureIcon, setSecureIcon] = useState(secure);
  if (disableCustomBehavior) {
    return (
      <TextInput
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    );
  }
  return (
    <>
      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <View
        style={
          containerStyle ? [containerStyle, styles.container] : styles.container
        }
      >
        <TextInput
          style={styles.inputText}
          placeholder={placeholder}
          onBlur={onBlurHandler}
          placeholderTextColor="#708090"
          onChangeText={onChangeTextHandler}
          keyboardType={keyboardType}
          secureTextEntry={secureIcon}
          autoCapitalize="none"
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
    justifyContent: "center",
    marginBottom: 25,
    width: "95%",
  },
  inputText: {
    color: "#000",
    fontSize: 16,
    padding: 15,
    borderBottomWidth: 2, // Add this line
    borderBottomColor: PRIMARY_COLOR, // Add this line
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
