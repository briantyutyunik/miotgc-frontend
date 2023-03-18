import React from "react";
import { StyleSheet, View } from "react-native";

export default function Line({ width, color, height }) {
  const additionalStyle = {
    width: width,
    backgroundColor: color,
    height: height,
  };
  return <View style={[styles.line, additionalStyle]}></View>;
}

const styles = StyleSheet.create({
  line: {
    // height: 2,
    borderRadius: 10,
    // height: 20,
  },
});
