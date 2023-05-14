import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import Background from "./Background";

export default function LoadingScreen() {
	const [message, setMessage] = useState("Finishing this up for you...");
	const messages = ["Preparing you for the trip of a lifetime...", "Finishing this up for you...", "Wrapping things up...", "Its not boarding time yet...", "Dont fret!"];
	let index = 0;

	useEffect(() => {
		const interval = setInterval(() => {
			index = index + 1 === messages.length ? 0 : index + 1;
			setMessage(messages[index]);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Background>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="white" />
				<Text style={{ paddingTop: 40, fontSize: 20, color: "white" }}>{message}</Text>
			</View>
		</Background>
	);
}
