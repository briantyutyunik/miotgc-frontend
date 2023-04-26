import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import Background from "../../components/UI/Background";
import Card from "../../components/UI/Card";
import { getSectionsByGroupId, listenGroupName } from "../../firebase";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../../components/UI/Button";
import { getFirestore } from "firebase/firestore";
import { firestore, updateGroupName } from "../../firebase";
import AuthInput from "../../components/Auth/Sign In/AuthInput";
import { PRIMARY_COLOR } from "../../constants/styles";

export default function Itineraries() {
  const route = useRoute();
  const initialGroupName = route.params.groupName;
  const [updatedGroupName, setUpdatedGroupName] = useState(initialGroupName);

  const [showCard, setShowCard] = useState(true);

  const isNewGroup = route.params?.isNewGroup || false;
  const [isEditingGroupName, setIsEditingGroupName] = useState(false);
  const [groupName, setGroupName] = useState(initialGroupName);
  const groupId = route.params.groupId;
  const [isFormValid, setIsFormValid] = useState(true);
  // TO RENDER CONTDITIONALLY

  // if (isNewGroup) {
  //   return (
  //     <View>
  //       {/* Render the content for creating a new group */}
  //       <Text>Create a new group</Text>
  //     </View>
  //   );
  // } else {
  //   return (
  //     <View>
  //       {/* Render the content for existing group details */}
  //       <Text>Group details</Text>
  //     </View>
  //   );
  // }
  function handleSubmitButtonPress() {}
  // useEffect(() => {
  //   const unsubscribe = listenGroupName(groupId, (newGroupName) => {
  //     setGroupName(newGroupName);
  //   });
  //   // Cleanup function to unsubscribe when the component is unmounted
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [groupId]);

  const handleEditGroupName = () => {
    setIsEditingGroupName(!isEditingGroupName);
  };

  const groupNameUpdate = async () => {
    if (updatedGroupName === groupName) {
      return;
    }

    try {
      // Assuming you have groupId available in the component
      await updateGroupName(groupId, updatedGroupName);
      console.log("Group name updated successfully");
      setGroupName(updatedGroupName); // Add this line to update the groupName state variable
    } catch (error) {
      console.error("Error updating group name:", error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY_COLOR }}>
      <ScrollView>
        <Background additionalStyle={styles.container}>
          <View style={styles.groupNameContainer}>
            {isEditingGroupName ? (
              <TextInput
                style={styles.groupName}
                value={updatedGroupName}
                onChangeText={(text) => setUpdatedGroupName(text)}
                onSubmitEditing={() => {
                  groupNameUpdate(); // Call the groupNameUpdate function when the user presses return on the keyboard
                  setIsEditingGroupName(false);
                }}
                onBlur={() => {
                  groupNameUpdate();
                  setIsEditingGroupName(false);
                }}
                autoFocus={true}
              />
            ) : (
              <Text
                style={styles.groupName}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {isNewGroup ? "Undefined Group" : groupName}
              </Text>
            )}
            <TouchableOpacity onPress={handleEditGroupName}>
              <Ionicons name="pencil-outline" size={34} color="white" />
            </TouchableOpacity>
          </View>
          {!isNewGroup ? (
            !showCard ? (
              <TouchableOpacity onPress={() => setShowCard(true)}>
                <View style={styles.addButton}>
                  <Card additionalStyles={styles.cardContainer}>
                    <Ionicons name="add" size={36} color="#fff" />
                    <Text style={styles.addButtonText}>New Tfgsrip</Text>
                  </Card>
                </View>
              </TouchableOpacity>
            ) : (
              <Card additionalStyles={styles.cardContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.textStyle}>Age Group</Text>
                </View>
                <AuthInput />
                <View style={styles.textContainer}>
                  <Text style={styles.textStyle}>Date Of Travel</Text>
                </View>

                <AuthInput textInputBackgroundColor="white" />
                <View style={styles.textContainer}>
                  <Text style={styles.textStyle}>Number of people</Text>
                </View>
                <AuthInput />
                <View style={styles.textContainer}>
                  <Text style={styles.textStyle}>Destination</Text>
                </View>

                <AuthInput textInputBackgroundColor="white" />
                <View style={styles.textContainer}>
                  <Text style={styles.textStyle}>Budget</Text>
                </View>

                <AuthInput textInputBackgroundColor="white" />

                <Button
                  containerStyle={styles.submitBtnContainer}
                  iconName={"arrow-forward-outline"}
                  iconSize={40}
                  iconColor={PRIMARY_COLOR}
                  onPress={handleSubmitButtonPress}
                  disabled={!isFormValid}
                  disabledStyle={styles.disabledButton}
                />
              </Card>
            )
          ) : (
            <TouchableOpacity onPress={() => setShowCard(true)}>
              <View style={styles.addButton}>
                <Ionicons name="add" size={36} color="#fff" />
                <Text style={styles.addButtonText}>New Trip</Text>
              </View>
            </TouchableOpacity>
          )}
        </Background>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  tripLengthPadding: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 28,
    paddingLeft: 15,
    color: "white",
  },

  textContainer: {
    alignSelf: "stretch",
  },
  textStyle: {
    color: PRIMARY_COLOR,
    textAlign: "left",
    marginBottom: 20,
    fontSize: 24,
  },
  itinerariesPadding: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 48,
    paddingLeft: 15,
    fontWeight: "bold",
    color: "white",
  },
  submitBtnContainer: {
    height: 50,
    width: "35%",
    top: 10,
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10%",
  },
  groupNameContainer: {
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row", // Add this line
  },
  groupName: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
    marginRight: "10%",
    flexShrink: 1,
  },
  header: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginTop: "1%",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#fff",
    padding: 10,
  },
  childText: {
    marginTop: 10,
    marginLeft: 20,
    padding: 10,
  },
  container: {
    alignItems: "center",
  },
  cardContainer: {
    margin: "5%",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    maxHeight: "100%",
    marginTop: 100,
  },
  cardContainerTwo: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: "100%",
  },
};
