import { StyleSheet, View } from "react-native";

export default function Card({ children, additionalStyles }) {
  return (
    <View
      style={additionalStyles ? [styles.card, additionalStyles] : styles.card}
    >
      {children}
    </View>
  );
}




const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
