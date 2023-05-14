import React from "react";
import { View, StyleSheet, Text } from "react-native";

const HotelHeadline = ({ segmentNumber = 1 }) => {
	return (
		<View style={styles.container}>
			<View style={styles.leftContainer}>
				<Text style={styles.flightText}>
					{Platform.OS === "ios" ? "\u{1F3E8}" : "\u2708"}
					Hotel
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.4,
		shadowRadius: 3.84,
		elevation: 5,
	},
	leftContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		flex: 1,
	},
	centerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		flex: 1,
	},
	flightText: {
		color: "white",
		fontSize: 32,
		marginLeft: 8,
		fontWeight: "bold",
	},
	segmentText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 18,
		marginRight: 20,
	},
});

export default HotelHeadline;
