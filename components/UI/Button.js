import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../constants/styles";

export default function Button({ title, onPress, containerStyle, iconName, iconSize, iconColor, textStyle, disabled, disabledStyle, enabledStyle, textColor, fontSize }) {
	const buttonStyle = disabled ? [styles.buttonContainer, disabledStyle, containerStyle] : [styles.buttonContainer, enabledStyle, containerStyle];

	return (
		<TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled}>
			{title && <Text style={textStyle ? [styles.buttonText, textStyle, { color: textColor, fontSize }] : [styles.buttonText, { color: textColor, fontSize }]}>{title}</Text>}
			{iconName && <Ionicons name={iconName} size={iconSize} color={iconColor} style={styles.icon} />}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: "row",
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
	icon: {
		marginLeft: 8,
	},
});
