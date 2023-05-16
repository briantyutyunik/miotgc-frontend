import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Card from "../CardDarker";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const ItineraryCard = ({ activities }) => {
	const navigation = useNavigation();


	const handlePress = () => {
		navigation.navigate("Itinerary", { activities });
	};

	return (
		<>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Text style={styles.flightText}>
						{Platform.OS === "ios" ? "\ud83d\udcdd" : "\ud83d\udcdd"}
						Itinerary
					</Text>
				</View>
			</View>
			<Card additionalStyles={[styles.sectionsCard, styles.itineraryTextContainer]}>
				<TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={handlePress}>
					<Text style={styles.itineraryText}>Tap</Text>
					<Ionicons name="arrow-forward-outline" size={30} color="black" />
				</TouchableOpacity>
			</Card>
		</>
	);
};

const styles = {
	container: {
		marginTop: "10%",
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
	flightText: {
		color: "white",
		fontSize: 32,
		marginLeft: 8,
		fontWeight: "bold",
	},
	sectionsCard: {
		marginVertical: "0%",
		height: "auto",
		width: "95%",
	},
	itineraryTextContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	itineraryText: {
		fontSize: 30,
		color: "black",
	},
};

export default ItineraryCard;