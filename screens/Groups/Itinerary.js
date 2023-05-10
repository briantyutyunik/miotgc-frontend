import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Background from "../../components/UI/Background";
import Card from "../../components/UI/Card";

export default function Itinerary() {
  const route = useRoute();
  const { aiGeneratedResponse } = route.params;

  // helper function to render each part of the day
  const renderDayPart = (part, partData) => (
    <View>
      <Text>{part}</Text>
      <Text>{`Activity: ${partData.Activity}`}</Text>
      <Text>{`Meal: ${partData.Meal}`}</Text>
      <Text>{`Price: ${partData.Price}`}</Text>
      <Text>{`Transportation: ${partData.Transportation}`}</Text>
    </View>
  );

  // function to render each day's data
  const renderDay = (day, dayData) => (
    <View key={day}>
      <Text>{day}</Text>
      {renderDayPart("Morning", dayData.Morning)}
      {renderDayPart("Afternoon", dayData.Afternoon)}
      {renderDayPart("Evening", dayData.Evening)}
    </View>
  );

  // function to render all days
  const renderAllDays = () => {
    let days = [];
    for (let i = 1; i <= 5; i++) {
      const day = `Day${i}`;
      if (aiGeneratedResponse[day]) {
        days.push(
          <Card key={day}>{renderDay(day, aiGeneratedResponse[day])}</Card>
        );
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
