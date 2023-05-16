import React, { useState, useEffect } from "react";
import { StyleSheet, Text, KeyboardAvoidingView, ActivityIndicator, View, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

import Background from "../../../components/UI/Background";
import Logo from "../../../components/UI/Logo";
import Button from "../../../components/UI/Button";
import AuthInput from "../../../components/Auth/Sign In/AuthInput";
import Card from "../../../components/UI/Card";
import { PRIMARY_COLOR } from "../../../constants/styles";
import { userSignIn } from "../../../firebase";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const SignInScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);
	const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

	useEffect(() => {
		setIsFormValid(email.length > 0 && password.length > 0);
	}, [email, password]);

	const handleEmailChange = (text) => {
		setEmail(text);
	};

	const handlePasswordChange = (text) => {
		setPassword(text);
	};

	const handleSignInButtonPress = async () => {
		setIsLoading(true);
		setError("");
		const { error } = await userSignIn(email, password);
		setIsLoading(false);
		setError("Incorrect email or password.");

		if (error) {
			setIsErrorModalVisible(true);
		} else {
			console.log("success");
		}
	};
	const handleCloseErrorModal = () => {
		setIsErrorModalVisible(false);
	};

	return (
		<Background>
		<View style = {styles.container}>
		<View style = {styles.alignRow}>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<FontAwesome name="arrow-left" marginTop={30} marginLeft={30} size={35} color="#ffffff" />
			</TouchableOpacity>
		</View>
			<Logo additionalStyle={styles.logo} height={120} width={120} />
			<KeyboardAvoidingView behavior="padding" style={styles.authInputContainer}>
				<Card additionalStyles={styles.cardContainer}>
					<Text style={styles.signInHeader}>Welcome Back!</Text>

					{error !== "" && <Text style={styles.errorText}>{error}</Text>}

					<AuthInput placeholder="email or username" inputType="email" secure={false} onChangeTextHandler={(text) => setEmail(text)} />
					<AuthInput placeholder="password" inputType="password" secure={true} onChangeTextHandler={(text) => setPassword(text)} />

					<View style={styles.signUpHereContainer}>
						<Text style={styles.signUpHereText}>Not registered? Sign up </Text>
						<Button
							title="here"
							onPress={() => navigation.navigate("SignUp")}
							textStyle={{
								color: "#373737", // Custom text color
								fontSize: 16, // Custom text size
								textDecorationLine: "underline",
								fontWeight: "normal",
								shadowColor: "transparent",
							}}
							textColor="#373737"
							containerStyle={styles.noShadowSignUpHereButton}
						/>
					</View>
					{isLoading ? (
						<ActivityIndicator size="large" color={PRIMARY_COLOR} />
					) : (
						<Button
							containerStyle={styles.signInButtonContainer}
							iconName={"arrow-forward-outline"}
							iconSize={40}
							iconColor={PRIMARY_COLOR}
							onPress={handleSignInButtonPress}
							disabled={!isFormValid}
							disabledStyle={styles.disabledButton}
						/>
					)}
				</Card>
				<Modal visible={isErrorModalVisible} transparent={true} onRequestClose={handleCloseErrorModal} animationType="slide">
					<TouchableWithoutFeedback onPress={handleCloseErrorModal}>
						<View style={styles.modalContainer}>
							<TouchableWithoutFeedback>
								<Card additionalStyles={styles.modalContent}>
									<Text style={styles.modalErrorMessage}>{error}</Text>
									<TouchableOpacity style={styles.modalButtonContainer} activeOpacity={1} onPress={handleCloseErrorModal}>
										<Text style={styles.errorModalExitButton}>Close</Text>
									</TouchableOpacity>
								</Card>
							</TouchableWithoutFeedback>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</KeyboardAvoidingView>
			</View>
		</Background>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		// justifyContent: "flex-end",
	},
	alignRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	logo: {
		position: "absolute",
		top: 0,
	},
	signInHeaderContainer: {
		marginBottom: 40,
	},
	signInHeader: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 30,
		color: "#373737",
	},
	authInputContainer: {
		// marginBottom: "80%",
		top: "30%",
		width: "90%",
	},
	disabledButton: {
		opacity: 0.5,
	},
	cardContainer: {
		paddingTop: 30,
		paddingBottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		color: "red",
		marginBottom: 20,
	},
	enabledButton: {
		opacity: 1,
	},
	disabledButton: {
		opacity: 0.5,
	},
	signInButtonContainer: {
		height: 50,
		width: "35%",
		top: "35%",
		backgroundColor: "#fff",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	},

	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
	},
	modalContent: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		width: "80%",
		alignItems: "center",
	},
	modalErrorMessage: {
		fontSize: 18,
		fontWeight: "bold",
		color: PRIMARY_COLOR,
		marginBottom: 20,
	},
	modalButtonContainer: {
		marginTop: 20,

		borderColor: PRIMARY_COLOR,
		borderRadius: 10,
	},
	errorModalExitButton: {
		backgroundColor: PRIMARY_COLOR,
		color: "#fff",
		padding: 10,
		borderColor: "black",
		width: 80,
		textAlign: "center",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
	},
	modalContent: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		width: "80%",
		alignItems: "center",
	},
	modalErrorMessage: {
		fontSize: 18,
		fontWeight: "bold",
		color: PRIMARY_COLOR,
		marginBottom: 20,
	},
	modalButtonContainer: {
		marginTop: 20,
		borderColor: PRIMARY_COLOR,
		borderRadius: 10,
	},
	errorModalExitButton: {
		backgroundColor: PRIMARY_COLOR,
		color: "#fff",
		padding: 10,
		borderColor: "black",
		width: 80,
		textAlign: "center",
	},

	signUpHereButton: {
		color: PRIMARY_COLOR,
		fontSize: 16,
	},
	signUpHereContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	signUpHereText: {
		color: "#373737",
		fontSize: 16,
	},
	noShadowSignUpHereButton: {
		shadowColor: "transparent",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0,
		shadowRadius: 0,
		elevation: 0,
	},
});

export default SignInScreen;
