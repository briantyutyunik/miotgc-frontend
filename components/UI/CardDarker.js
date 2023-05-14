import { StyleSheet, View } from "react-native";

export default function Card({ children, additionalStyles }) {
	return <View style={additionalStyles ? [styles.card, additionalStyles] : styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
	card: {
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
	},
});
