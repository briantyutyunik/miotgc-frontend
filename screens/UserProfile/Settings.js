import { View, Text, StyleSheet } from "react-native";
import { PRIMARY_COLOR } from "../../constants/styles";
import Background from "../../components/UI/Background";

export default function Settings() {
  return (
    <Background>
      <View style={styles.settingsScreenContainer}>
        <Text style={styles.randomText}>Settings Page</Text>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  settingsScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  randomText: {
    color: "white",
    fontSize: 48,
  },
});
