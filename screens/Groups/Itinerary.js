import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Background from "../../components/UI/Background";
import Card from "../../components/UI/Card";

export default function Itinerary() {
	const route = useRoute();
	const { activities } = route.params;

	// helper function to render each part of the day
	const renderDayPart = (part, activities) => (
		<View>
			<Text>{part}</Text>
			<Text>{`Activity: ${activities.Activity}`}</Text>
			<Text>{`Meal: ${activities.Meal}`}</Text>
			<Text>{`Price: ${activities.Price}`}</Text>
			<Text>{`Transportation: ${activities.Transportation}`}</Text>
		</View>
	);

	// function to render each day's data
	const renderDay = (day, activities) => (
		<View key={day}>
			<Text>{day}</Text>
			{renderDayPart("Morning", activities.Morning)}
			{renderDayPart("Afternoon", activities.Afternoon)}
			{renderDayPart("Evening", activities.Evening)}
		</View>
	);

	// function to render all days
	const renderAllDays = () => {
		let days = [];
		for (let i = 1; i <= 5; i++) {
			const day = `Day${i}`;
			if (activities[day]) {
				days.push(<Card key={day}>{renderDay(day, activities[day])}</Card>);
			}
		}
		return days;
	};

	return (
		<Background>
			<ScrollView>
				<View style={styles.container}>
					<Text>Itinerary</Text>
				</View>
				{renderAllDays()}
			</ScrollView>
		</Background>
	);
}

const styles = StyleSheet.create({
	// Your styles here
});
