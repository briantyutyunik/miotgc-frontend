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
			<View style={styles.outHeader}>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<FontAwesome name="arrow-left" size={35} color="#ffffff" paddingLeft="3%" />
					</TouchableOpacity>
					<Text style={styles.title}>Edit Profile</Text>
				</View>
				<View></View>
			</View>
			<View style={styles.container}>
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
	container: {
		flex: 1,
	},
	outHeader: {
		marginTop: "7%",
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
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flex: 1,
	},
	title: {
		fontSize: 36,
		fontWeight: "bold",
		color: "white",
		backgroundColor: "transparent",
		textAlign: "center",
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
