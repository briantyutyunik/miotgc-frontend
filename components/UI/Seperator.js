import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Line from "./Line";

export default function Seperator({ lineColor }) {
  return (
    <View style={styles.seperatorContainer}>
      <Line width={120} height={2} color={lineColor} />
      <Text style={styles.seperatorText}>or</Text>
      <Line width={120} height={2} color={lineColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  seperatorContainer: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  seperatorText: {
    fontSize: 16,
    marginLeft: 8,
    marginRight: 8,
    color: "#fff",
  },
});

