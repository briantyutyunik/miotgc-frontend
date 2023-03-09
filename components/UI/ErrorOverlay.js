import { View, StyleSheet, Text } from "react-native";



function ErrorOverlay({ message }) {
  return (
    <View><Text>Error Overlay</Text></View>
    // <View style={styles.container}>
    //   <Text style={[styles.text, styles.title]}>An error occurred!</Text>
    //   <Text style={styles.text}>{message}</Text>
    // </View>
  );
}

export default ErrorOverlay;

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});*/
