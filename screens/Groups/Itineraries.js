import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Share,
  Modal,
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import Background from "../../components/UI/Background";
import Card from "../../components/UI/Card";
import { listenGroupName } from "../../firebase";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../../components/UI/Button";
import { getFirestore } from "firebase/firestore";
import { QUESTIONS } from "./questions";

import {
  firestore,
  updateGroupName,
  addTestUsersToGroup,
  getGroupMembers,
} from "../../firebase";
import AuthInput from "../../components/Auth/Sign In/AuthInput";
import { PRIMARY_COLOR } from "../../constants/styles";
import Logo from "../../components/UI/Logo";
export default function Itineraries() {
  const route = useRoute();
  const initialGroupName = route.params.groupName;
  const isNewGroupParam = route.params?.isNewGroup || false;
  const [isNewGroup, setIsNewGroup] = useState(isNewGroupParam);
  const [isEditingGroupName, setIsEditingGroupName] = useState(false);
  const [groupName, setGroupName] = useState(initialGroupName);
  const groupId = route.params.groupId;
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [answers, setAnswers] = useState(
    QUESTIONS.map((_, index) => ({ questionIndex: index, answer: "" }))
  );
  const [testGroupMembers, setTestGroupMembers] = useState([]);
  useEffect(() => {
    console.log("INPUT VALUE:", inputValue);
  }, [inputValue]);

  // *** THIS DOESN'T WORK FOR SOME REASON WILL FIX LATER ***
  // const copyToClipboard = () => {
  //   Clipboard.setString(`exp://exp.host/@tahir13/miotgc/group/${groupId}`);
  // };

  // *** THIS IS TO TEST THE GROUP MEMBERS FUNCTIONALITY ***
  // useEffect(() => {
  //   async function fetchData() {
  //     // await addTestUsersToGroup();
  //     const members = await getGroupMembers("fCo0N3buHNjoKVSMOVJ7");
  //     setTestGroupMembers(members);
  //     console.log("*******GROUP MEMBER FIRST NAME******: ", members);
  //   }

  //   fetchData();
  // }, []);

  const handleShare = async () => {
    // exp://exp.host/@yourusername/your-app-slug/some-path
    // exp://exp.host/@tahir13/miotgc/group/{groupId}
    try {
      const result = await Share.share({
        message: `Your invite link: exp://exp.host/@tahir13/miotgc/group/${groupId}`,
      });

      if (result.action === Share.sharedAction) {
        console.log("Link shared successfully");
      } else {
        console.log("Link sharing canceled");
      }
    } catch (error) {
      console.error("Error sharing link: ", error);
    }
  };
  const handleSubmitButtonPress = () => {
    console.log("ANSWER:", inputValue);
    const tempAnswers = [...answers];
    tempAnswers[currentQuestionIndex] = {
      questionIndex: currentQuestionIndex,
      answer: inputValue,
    };

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowShareModal(true);

      // Log the temporary answers array after the last question has been answered
      console.log("Final answers:", tempAnswers);
    }

    setAnswers(tempAnswers);
    setInputValue(""); // Reset the input value for the next question
  };

  function answerFieldChangeHandler(text) {
    setInputValue(text);
  }

  const handleEditGroupName = () => {
    setIsEditingGroupName(!isEditingGroupName);
    setIsNewGroup(false);
  };

  const groupNameUpdate = async (newGroupName) => {
    if (newGroupName === initialGroupName) {
      return;
    }

    console.log(
      "Updating group name with groupId:",
      groupId,
      "and newGroupName:",
      newGroupName
    ); // Add this line

    try {
      await updateGroupName(groupId, newGroupName);
      console.log("Group name updated successfully");
      setGroupName(newGroupName);
    } catch (error) {
      console.error("Error updating group name:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY_COLOR }}>
      <ScrollView>
        <Background additionalStyle={styles.container}>
          <View style={styles.itinerariesContainer}>
            {!isNewGroup ? (
              <>
                {isEditingGroupName ? (
                  <TextInput
                    style={styles.groupName}
                    value={groupName}
                    onChangeText={(text) => setGroupName(text)}
                    onSubmitEditing={() => {
                      groupNameUpdate(groupName);
                      setIsEditingGroupName(false);
                    }}
                    onBlur={() => {
                      groupNameUpdate(groupName);
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
                    {groupName}
                  </Text>
                )}
                <Card additionalStyles={styles.groupMembersCard}>
                  <Text style={styles.groupMembersText}>Group Members</Text>
                  <View style={styles.groupMembersList}>
                    {testGroupMembers.map((member, index) => (
                      <Text style={styles.groupMembersListText} key={index}>
                        {member.firstName}
                        {console.log(
                          "*******GROUP MEMBER FIRST NAME******: ",
                          member.firstName
                        )}
                      </Text>
                    ))}
                  </View>
                </Card>
              </>
            ) : (
              <View style={styles.newGroupContainer}>
                <Text style={styles.itinerarySurveyText}>Itinerary Survey</Text>
                <Logo additionalStyle={styles.logo} height={120} width={120} />
                <Card additionalStyles={styles.surveyCard}>
                  <Text style={[styles.textStyle, styles.surveyQuestion]}>
                    {QUESTIONS[currentQuestionIndex].text}
                  </Text>
                  <AuthInput
                    textInputBackgroundColor="white"
                    value={inputValue}
                    onChangeText={answerFieldChangeHandler}
                    disableCustomBehavior={true} // Add this prop here
                  />

                  <View style={styles.submitBtnContainer}>
                    <Button
                      containerStyle={styles.submitBtn}
                      title={
                        currentQuestionIndex === QUESTIONS.length - 1
                          ? "Submit"
                          : "Next"
                      }
                      textColor={PRIMARY_COLOR}
                      iconSize={40}
                      buttonText={PRIMARY_COLOR}
                      onPress={handleSubmitButtonPress}
                    />
                  </View>
                </Card>
              </View>
            )}
          </View>

          {/* // *** THIS WILL BE ADDED TO THE GROUP MEMBERS CARD *** */}
          {/* <TouchableOpacity
            style={styles.openModalButton}
            onPress={() => {
              setShowShareModal(true);
            }}
          >
            <Text style={styles.openModalButtonText}>Open Modal</Text>
          </TouchableOpacity> */}
        </Background>
      </ScrollView>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={showShareModal}
        onRequestClose={() => {
          setShowShareModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.linkInputContainer}>
              <TextInput
                style={styles.linkInput}
                value={`exp://exp.host/@tahir13/miotgc/group/${groupId}`}
                editable={false}
              />
              <TouchableOpacity
                style={styles.copyButtonInInput}
                // onPress={copyToClipboard}
              >
                <Text style={styles.copyButtonTextInInput}>Copy</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => {
                handleShare();
              }}
            >
              <Text style={styles.copyButtonText}>Copy & Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </SafeAreaView>
  );
}

const styles = {
  newGroupContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  tripLengthPadding: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 28,
    paddingLeft: 15,
    color: "white",
  },

  surveyCard: {
    width: "90%",
  },
  textContainer: {
    alignSelf: "stretch",
  },
  textStyle: {
    color: PRIMARY_COLOR,
    textAlign: "left",
  },
  itinerariesPadding: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 48,
    paddingLeft: 15,
    fontWeight: "bold",
    color: "white",
  },
  newTripButton: {
    flexDirection: "row",
    width: "100%",
  },

  newTripButtonCard: {
    width: "80%",
    alignSelf: "center",
    marginTop: "30%",
  },

  submitBtnContainer: {
    height: 50,
    top: 10,
    backgroundColor: "#fff",
    borderRadius: 100,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: "10%",
  },
  groupNameContainer: {
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row", // Add this line
  },

  newTripButtonText: {
    color: PRIMARY_COLOR,
    fontSize: 32,
    marginLeft: 10,
  },
  groupName: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
    marginRight: "5%",
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
  // open modal button styles
  openModalButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  openModalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  // modal styles

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  surveyQuestion: {
    marginBottom: "15%",
    fontSize: 32,
  },
  linkInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    width: 300,
    marginBottom: 20,
  },
  copyButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  copyButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  shareButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  itinerarySurveyText: {
    color: "white",
    fontSize: 45,
    fontWeight: "bold",
  },
  shareButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  linkInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    width: 300,
    marginBottom: 20,
  },
  linkInput: {
    flex: 1,
  },
  copyButtonInInput: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
  },
  copyButtonTextInInput: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  groupMembersCard: {
    width: 300,
    height: 200,
  },
  groupMembersText: {
    fontSize: 20,
    color: PRIMARY_COLOR,
  },
  groupMembersListText: {
    fontSize: 16,
    color: PRIMARY_COLOR,
  },
  itinerariesContainer: {
    width: "100%",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
};
