import { StyleSheet, View, Text } from "react-native";

export default function Slogan() {
  return (
    <View style={styles.sloganContainer}>
      <Text style={styles.sloganText}>Make Any Place Feel Like Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sloganContainer: {
    position: "absolute",
    top: "30%",
    width: "80%",
    left: 30,
  },
  sloganText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
});
