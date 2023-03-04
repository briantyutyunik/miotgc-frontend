import React from "react";
import { StyleSheet, View } from "react-native";

export default function Line({ width }) {
  const widthStyle = {
    width: width,
  };
  return <View style={width ? [styles.line, widthStyle] : styles.line}></View>;
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: "#fff",
    height: 2,
    borderRadius: 10,
    // height: 20,
  },
});
