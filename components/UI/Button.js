import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Button({
  title,
  onPress,
  containerStyle,
  iconName,
  iconSize,
  iconPositionStyle,
  iconColor,
  textStyle,
}) {
  return (
    <TouchableOpacity
      style={
        containerStyle
          ? [styles.buttonContainer, containerStyle]
          : styles.buttonContainer
      }
      onPress={onPress}
    >
      {iconName && iconSize && (
        <View style={iconPositionStyle}>
          <Ionicons name={iconName} size={iconSize} color={iconColor} />
        </View>
      )}
      {title && (
        <Text
          style={textStyle ? [styles.buttonText, textStyle] : styles.buttonText}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
