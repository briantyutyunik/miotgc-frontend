import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Background from "../../components/UI/Background";
import Card from "../../components/UI/Card";
import ItinerarySwipe from "../../components/UI/ItineraryCard/ItinerarySwipe";
import { PRIMARY_COLOR } from "../../constants/styles";

export default function Itinerary() {
  const route = useRoute();
  const activities = route.params.activities; // Ensure 'activities' is an array

  // function to render all days
  const renderAllDays = () => {
    return activities.map((activity, index) => (
      <Card key={index} additionalStyles={styles.card}>
        <View key={index}>
          <Text style={styles.dayText}>{`Day ${index + 1}`}</Text>
          <ItinerarySwipe style={styles.itinerarySwipe} activities={activity} />
        </View>
      </Card>
    ));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.activitiesText}>Daily Activities</Text>
      </View>
      {renderAllDays()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itinerarySwipe: {
    margin: 20,
    backgroundColor: PRIMARY_COLOR,
  },
  activitiesText: {
    color: "white",
    fontSize: 40,
  },
  card: {
    backgroundColor: PRIMARY_COLOR,
  },
  dayText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});
