import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Background from "../../components/UI/Background";
import Card from "../../components/UI/Card";
import ItinerarySwipe from "../../components/UI/ItineraryCard/ItinerarySwipe";
import { PRIMARY_COLOR } from "../../constants/styles";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";


export default function Itinerary() {
  const route = useRoute();
  const activities = route.params.activities; // Ensure 'activities' is an array

  // function to render all days
  const renderAllDays = () => {
    return activities.map((activity, index) => (
      <View key={index} additionalStyles={styles.card}>
        <View key={index}>
          <Text style={styles.dayText}>{`Day ${index + 1}`}</Text>
          <ItinerarySwipe style={styles.itinerarySwipe} activities={activity} />
        </View>
      </View>
    ));
  };

  const navigation = useNavigation();

  return (
    <Background>
      <ScrollView>
        <View style = {styles.container}>
          <View style = {styles.dailyAct}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
							<FontAwesome zIndex={1} name="arrow-left" marginTop={5} marginRight={10} size={35} color="#ffffff" paddingLeft="3%" />
						</TouchableOpacity>
            <Text style={styles.activitiesText}>Daily Activities</Text>
          </View>
          {renderAllDays()}
        </View>
      </ScrollView>
    </Background>
    
  );
}

const styles = StyleSheet.create({
  dailyAct: {
    flex:1,
    flexDirection: "row",
  },
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  itinerarySwipe: {
    margin: 20,
    backgroundColor: "transport",
  },
  activitiesText: {
    color: "white",
    fontSize: 40,
    shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.4,
		shadowRadius: 3.84,
		elevation: 5,
  },
  card: {
    backgroundColor: "=",
  },
  dayText: {
    marginTop: 15,
    color: "white",
		fontSize: 32,
		marginLeft: 8,
		fontWeight: "bold",
    shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.4,
		shadowRadius: 3.84,
		elevation: 5,
  },
});
