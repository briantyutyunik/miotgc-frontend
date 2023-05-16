import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Separator } from "react-native-btr";
import { PRIMARY_COLOR } from "../../../constants/styles";

const ItineraryCardAfternoon = ({ activities }) => {
  console.log("*****ACTIVITIES FROM MORNING*****", activities);
  if (!activities || activities.length === 0) {
    return null;
  }

  // Assuming you want to access the "Morning" activities of the first day
  const afternoonActivities = activities["Afternoon"];

  return (
    <View style={styles.sectionsCard}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={[styles.daytime]}>Afternoon</Text>
            <Separator size={1} color="white" />
            <View style={styles.spacer} />
            <View style={styles.inlineText}>
              <Text style={styles.labelText}>Activity:</Text>
              <Text style={styles.boldText}>
                {afternoonActivities.Activity}
              </Text>
            </View>
            <View style={styles.inlineText}>
              <Text style={styles.labelText}>Meal:</Text>
              <Text style={styles.boldText}>{afternoonActivities.Meal}</Text>
            </View>
            <View style={styles.inlineText}>
              <Text style={styles.labelText}>Transportation:</Text>
              <Text style={styles.boldText}>
                {afternoonActivities.Transportation}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
	daytime: {
		color: "white",
		fontSize: 26,
		fontWeight: "600",
		paddingBottom: 5,
		color: "white",

	},
  sectionsCard: {
    flex: 1,
    marginVertical: 0,
    height: "auto",
    width: "92%",
    backgroundColor: PRIMARY_COLOR,
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
    marginBottom: 10,
  },
  container: {
    margin: 5,
    flex: 1,
    flexDirection: "column",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  leftColumn: {
    flex: 1,
    padding: 5,
  },
  labelText: {
    fontWeight: "300",
    fontSize: 18,
    color: "white",
  },
  boldText: {
    fontWeight: "500",
    fontSize: 18,
    textAlign: "right",
    color: "white",
  },
  inlineText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    color: "white",
  },
});

export default ItineraryCardAfternoon;
