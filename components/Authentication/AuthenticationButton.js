import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AuthenticationButton({
  title,
  onPressHandler,
  iconImageSource,
  additionalStyle,
}) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPressHandler}>
      {iconImageSource && (
        <Image
          source={iconImageSource}
          style={
            additionalStyle
              ? [styles.iconImage, additionalStyle]
              : styles.iconImage
          }
        ></Image>
      )}
      <Text style={styles.buttonText}>{title}</Text>
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
  iconImage: {
    position: "absolute",
    left: 20,
    height: "70%",
    width: "10%",
  },
});
