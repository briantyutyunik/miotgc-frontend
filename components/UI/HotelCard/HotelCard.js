import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import StarRating from "react-native-star-rating";

const HotelCard = ({ accommodation }) => {
	if (!accommodation) {
		return null;
	}

	const handlePressAddy = () => {
		Alert.alert("Full Address", accommodation.Address);
	};

	const handlePressWeb = () => {
		Alert.alert("Full Website", accommodation.Website);
	};

	return (
		<View style={styles.sectionsCard}>
			<View style={styles.container}>
				<View style={styles.row}>
					<View style={styles.leftColumn}>
						<View style={styles.inlineText}>
							<Text style={styles.labelText}>Name:</Text>
							<Text style={styles.boldText}>{accommodation.Name}</Text>
						</View>
						<View style={styles.inlineText}>
							<Text style={styles.labelText}>Room:</Text>
							<Text style={styles.boldText}>{accommodation.Room}</Text>
						</View>
						<View style={styles.inlineText}>
							<Text style={styles.labelText}>Price:</Text>
							<Text style={styles.boldText}>{accommodation.Price}</Text>
						</View>

						<View style={styles.inlineText}>
							<Text style={styles.labelText}>Address:</Text>
							<TouchableOpacity style={styles.address} onPress={handlePressAddy}>
								<Text style={[styles.boldTextAddy]} numberOfLines={1} ellipsizeMode="tail">
									{accommodation.Address}
								</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.inlineText}>
							<Text style={styles.labelText}>Phone #:</Text>
							<Text style={styles.boldText}>{accommodation.Phone}</Text>
						</View>
						<View style={styles.inlineText}>
							<Text style={styles.labelText}>Website:</Text>
							<TouchableOpacity style={styles.address} onPress={handlePressWeb}>
								<Text style={[styles.boldText]} numberOfLines={1} ellipsizeMode="tail">
									{accommodation.Website}
								</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.inlineText}>
							<Text style={styles.labelText}>Stars:</Text>
							<StarRating disabled={false} maxStars={5} rating={accommodation.Stars} starSize={22} fullStarColor={"gold"} emptyStarColor={"gray"} />
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
		width: "95%",
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
		fontSize: 20,
	},
	boldText: {
		fontWeight: "500",
		fontSize: 18,
		textAlign: "right",
	},
	boldTextAddy: {
		fontWeight: "500",
		textAlign: "right",
		fontSize: 18,
	},
	inlineText: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	address: {
		flex: 1,
		alignItems: "flex-end",
		maxWidth: "75%",
	},
});

export default HotelCard;
