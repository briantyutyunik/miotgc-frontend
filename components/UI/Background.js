import React from "react";
import { StyleSheet, View } from "react-native";
import { PRIMARY_COLOR } from "../../constants/styles";

export default function Background({ children, additionalStyle }) {
  return (
    <View
      style={
        additionalStyle ? [styles.container, additionalStyle] : styles.container
      }
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    width: "100%",
  },
});
