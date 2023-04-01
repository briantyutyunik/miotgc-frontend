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
}) {
  const [secureIcon, setSecureIcon] = useState(secure);

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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginBottom: 25,
    borderColor: PRIMARY_COLOR,
    borderRadius: 10,
    borderWidth: 2,
    width: "95%",
  },
  inputText: {
    color: "#000",
    fontSize: 16,
    padding: 15,
    // paddingLeft: 10,
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
