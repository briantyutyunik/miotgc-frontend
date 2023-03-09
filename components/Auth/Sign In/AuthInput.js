import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Line from "../../UI/Line";

export default function AuthInput({
  placeholder,
  onChangeTextHandler,
  inputType,
  secureTextEntry,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputText}
        placeholder={placeholder}
        placeholderTextColor="#524d4d"
        onChangeText={onChangeTextHandler}
        keyboardType={inputType === "email" ? "email-address" : "default"}
        secureTextEntry={secureTextEntry}
        autoCapitalize={false}
        // autoFocus={inputType === "email"}
      />
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
});
