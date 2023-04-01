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
  disabled,
  disabledStyle,
  enabledStyle,
  
  
}) {
  const buttonStyle = disabled
    ? [styles.buttonContainer, disabledStyle, containerStyle]
    : [styles.buttonContainer, enabledStyle, containerStyle];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
