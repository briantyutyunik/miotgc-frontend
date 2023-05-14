import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { LOGO } from "../../assets/icons/Logos";
export default function Logo({ height, width, additionalStyle }) {
	return (
		<View style={additionalStyle}>
			<Image source={LOGO} style={{ height: height, width: width }} />
		</View>
	);
}
