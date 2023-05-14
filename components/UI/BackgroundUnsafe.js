import React from "react";
import { StatusBar, StyleSheet, View, SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { PRIMARY_COLOR } from "../../constants/styles";

export default function Background({ children, additionalStyle }) {
  const gradientColors = ['#ff4c49', PRIMARY_COLOR, '#fd625c', '#fa6e66', '#f7796f', '#f48379'];

  return (
    
    <LinearGradient
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      locations={[0, 0.2, 0.35, 0.45, 0.5, 0.6]}
      style={styles.container}
      colors={gradientColors}
    >
          <StatusBar backgroundColor={"transparent"} barStyle="light-content" /> 

      <View style={styles.contentContainer}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 0,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
});
