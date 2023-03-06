import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AuthenticationButton({
  title,
  onPressHandler,
  iconImageSource,
  iconImageStyle,
  additionalStyle,
  iconName,
  iconSize,
  iconColor,
}) {
  return (
    <TouchableOpacity
      style={
        additionalStyle
          ? [styles.buttonContainer, additionalStyle]
          : styles.buttonContainer
      }
      onPress={onPressHandler}
    >
      {iconImageSource && (
        <Image source={iconImageSource} style={iconImageStyle}></Image>
      )}
      {iconName && iconSize && (
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      )}
      {title && <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
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
});
