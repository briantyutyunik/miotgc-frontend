import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Background from "../../components/UI/Background";
import { useNavigation } from "@react-navigation/native";
import { PRIMARY_COLOR } from "../../constants/styles.js";
import CardDarker from "../../components/UI/CardDarker";

const EditProfile = () => {
	const navigation = useNavigation();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const handleDeleteUser = () => {
		Alert.alert(
			"Confirm Account Deletion",
			"Are you sure you want to delete your account?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: () => console.log("Account deleted!"),
					style: "destructive",
				},
			],
			{ cancelable: false }
		);
	};

	return (
		<Background>
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<FontAwesome name="arrow-left" size={2} color="#333333" />
					</TouchableOpacity>
					<Text style={styles.title}>Edit Profile</Text>
				</View>
				<View style={styles.body}>
					<CardDarker>
						<TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
						<TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
						<TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
						<TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} />
					</CardDarker>
					<TouchableOpacity style={styles.deleteButton} onPress={handleDeleteUser}>
						<FontAwesome name="trash" size={20} color="#FFFFFF" />
						<Text style={styles.deleteButtonText}>Delete User</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Background>
	);
};

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: "white",
	},
	container: {
		backgroundColor: PRIMARY_COLOR,
		flex: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 50,
		paddingBottom: 10,
		backgroundColor: "white",
		borderBottomWidth: 1,
		borderBottomColor: "#CCCCCC",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333333",
	},
	body: {
		padding: 20,
	},
	input: {
		height: 40,
		marginBottom: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#CCCCCC",
	},
	deleteButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "transparent",
		borderRadius: 5,
		borderColor: "white",
		borderWidth: 1,
		padding: 10,
		marginTop: 40,
	},
	deleteButtonText: {
		color: "#FFFFFF",
		marginLeft: 5,
		fontWeight: "bold",
	},
});

export default EditProfile;
