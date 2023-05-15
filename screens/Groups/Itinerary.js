import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Background from "../../components/UI/Background";
import Card from "../../components/UI/Card";


export default function Itinerary() {
	const route = useRoute();
	const activities = route.params.activities; // Ensure 'activities' is an array
	
	// helper function to render each part of the day
	const renderDayPart = (part, activities) => (
		<View>
			<Text>{part}</Text>
			<Text>{`Activity: ${activities.Activity}`}</Text>
			<Text>{`Meal: ${activities.Meal}`}</Text>
			<Text>{`Transportation: ${activities.Transportation}`}</Text>
		</View>
	);

	// function to render each day's data
	const renderDay = (day, activities) => (
		<View key={day}>
			<Text>{`Day ${day}`}</Text>
			{renderDayPart("Morning", activities.Morning)}
			{renderDayPart("Afternoon", activities.Afternoon)}
			{renderDayPart("Evening", activities.Evening)}
		</View>
	);

	// function to render all days
	const renderAllDays = () => {
		return activities.map((activity, index) => (
			<Card key={index}>
				{renderDay(index + 1, activity)}
			</Card>
		));
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