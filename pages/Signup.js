import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
    console.log("App Executed");
    return (
        <View style = {styles.container}>
            <Text>Test</Text>
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#F7F7F7",
          alignItems: "center",
          color: "black",
          justifyContent: "flex-end",
          bottom: 100,
        }
});