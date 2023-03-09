import { Pressable, Text, View, StyleSheet } from "react-native";

export default function Button({ children, onPress, booleanProp }) {
  <Pressable
    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
  >
    <View>
      <Text style={styles.buttonText}>{children}</Text>
    </View>
  </Pressable>;
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
})
