import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Line from "../UI/Line";

export default function SignInButton({ onPressHandler }) {
  return (
    <TouchableOpacity
      style={styles.signInButtonContainer}
      onPress={onPressHandler}
    >
      <Text style={styles.signInButtonText}>Sign In</Text>
      <Line width={65} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  signInButtonContainer: {
    bottom: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
  },
});
