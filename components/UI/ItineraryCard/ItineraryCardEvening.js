import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ItineraryCardEvening = ({ activities }) => {
	{/*if (!activities) {
		return null;
	} */}
	return (
		<View style={styles.sectionsCard}>
			<View style={styles.container}>
				<View style={styles.row}>
					<View style={styles.leftColumn}>
						<View style={styles.inlineText}>
							<Text style={styles.labelText}>Activity:</Text>
							<Text style={styles.boldText}>
							</Text>
						</View>
						<View style={styles.inlineText}>
							<Text style={styles.labelText}>Meal:</Text>
						</View>
						<View style={styles.inlineText}>
							<Text style={styles.labelText}>Transparent #:</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	sectionsCard: {
		flex: 1,
		marginVertical: 0,
		height: "auto",
		width: "92%",
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 16,
		shadowColor: "black",
		shadowOffset: {
			width: 8,
			height: 4,
		},
		shadowOpacity: 0.4,
		shadowRadius: 5,
		elevation: 5,
		marginBottom: 10,
	},
	container: {
		margin: 5,
		flex: 1,
		flexDirection: "column",
	},
	row: {
		flex: 1,
		flexDirection: "row",
	},
	leftColumn: {
		flex: 1,
		padding: 5,
	},
	labelText: {
		fontWeight: "300",
		fontSize: 18,
	},
	boldText: {
		fontWeight: "500",
		fontSize: 18,
		textAlign: "right",
	},
	inlineText: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
});

export default ItineraryCardEvening;
