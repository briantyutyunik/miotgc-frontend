
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Separator } from "react-native-btr";
import { PRIMARY_COLOR } from "../../../constants/styles";

const ItineraryCardEvening = ({ activities }) => {
	console.log("*****ACTIVITIES FROM MORNING*****", activities)
	if (!activities || activities.length === 0) {
		return null;
	}

	// Assuming you want to access the "Morning" activities of the first day
    const eveningActivities = activities["Evening"];

	return (
		<View style={styles.sectionsCard}>
			<View style={styles.container}>
				<View style={styles.row}>
					<View style={styles.leftColumn}>
						<Text style={styles.daytime}>Evening</Text>
						<Separator size = {1} color="#373737"/>
						<View style = {styles.spacer}/>
						<View style={styles.inlineText}>
                            <Text style={styles.labelText}>Activity </Text>
                            <View style={styles.boldTextContainer}>
                                <Text style={styles.boldText}>{eveningActivities.Activity}</Text>
                            </View>
                        </View>
						<View style={styles.inlineText}>
                            <Text style={styles.labelText}>Meal </Text>
                            <View style={styles.boldTextContainer}>
                                <Text style={styles.boldText}>{eveningActivities.Meal}</Text>
                            </View>
                        </View>
						<View style={styles.inlineText}>
                            <Text style={styles.labelText}>Transport </Text>
                            <View style={styles.boldTextContainer}>
                                <Text style={styles.boldText}>{eveningActivities.Transportation}</Text>
                            </View>
                        </View>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	daytime: {
		fontSize: 26,
		fontWeight: "600",
		paddingBottom: 5,
		color: "#373737",

	},
	spacer: {
		paddingBottom: "5%%",
	},
	sectionsCard: {
		flex: 1,
		marginVertical: 0,
		height: "100%",
		width: "95%",
		backgroundColor: "white",
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
		color: "#373737",
	},
	boldText: {
		fontWeight: "500",
		fontSize: 18,
		textAlign: "right",
		color: "#373737",

	},
	inlineText: {
		flexDirection: "row",			
		justifyContent: "space-between",
		alignItems: "flex-start", // Align items to the start of their container
		marginBottom: 10,
		color: "white",

	},
	boldTextContainer: {
		flex: 1,
		alignItems: 'flex-end', // Right align the text
	},
});

export default ItineraryCardEvening;
