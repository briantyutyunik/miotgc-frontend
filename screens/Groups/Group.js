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
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Background from "../../components/UI/Background";
import Card from "../../components/UI/CardDarker";
import { listenGroupName, getCurrentUserProfilePicture } from "../../firebase";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../../components/UI/Button";
import { getFirestore } from "firebase/firestore";
import { testGPT } from "../../util/api/openaiApi";
import Itinerary from "./Itinerary";
import {
  firestore,
  updateGroupName,
  addTestUsersToGroup,
  getGroupMembers,
} from "../../firebase";
import AuthInput from "../../components/Auth/Sign In/AuthInput";
import { PRIMARY_COLOR } from "../../constants/styles";
import Logo from "../../components/UI/Logo";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function Group() {
  const QUESTIONS = [
    {
      field: "groupCount",
      question: "Question 1?",
      text: "What's the size of your group?",
    },
    {
      field: "ageGroup",
      question: "Question 2?",
      text: "What's the age group of your group?",
    },
    {
      field: "destination",
      question: "Question 3?",
      text: "What's your destination?",
    },
    { field: "dates", question: "Question 4?", text: "What are your dates?" },
    { field: "budget", question: "Question 5?", text: "What's your budget?" },
    {
      field: "departureAirport",
      question: "Question 6?",
      text: "What's your departure airport?",
    },
  ];
  const navigation = useNavigation();

  const route = useRoute();
  // const initialGroupName = route.params.groupName;
  const initialGroupName = "Group Name";
  const isNewGroupParam = route.params?.isNewGroup || false;
  const [isNewGroup, setIsNewGroup] = useState(isNewGroupParam);
  const [isEditingGroupName, setIsEditingGroupName] = useState(false);
  // const [groupName, setGroupName] = useState(initialGroupName);
  // for testing. this groupName will be replaced with the one above
  const [groupName, setGroupName] = useState("Group Name");
  const groupId = route.params.groupId;
  const [groupMembers, setGroupMembers] = useState([]);
  const [aiGeneratedResponse, setAiGeneratedResponse] = useState({});

  const [showShareModal, setShowShareModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [answers, setAnswers] = useState(
    QUESTIONS.map((question) => ({
      [question.field]: "",
      questionIndex: question.question,
    }))
  );

  const [testGroupMembers, setTestGroupMembers] = useState([]);
  console.log("***CURRENT GROUP ID***", groupId);
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

  useEffect(() => {
    async function fetchGroupMembers() {
      const members = await getGroupMembers(groupId);
      const promises = members.map((member) =>
        getCurrentUserProfilePicture(member.uid)
      );
      const pfpUrls = await Promise.all(promises);
      console.log("PFP URLS:", pfpUrls);
      const membersWithPfp = members.map((member, index) => ({
        ...member,
        pfpUrl: pfpUrls[index],
      }));
      console.log(membersWithPfp);
      console;
      setGroupMembers(membersWithPfp);
    }
    fetchGroupMembers();
  }, []);


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
      ...tempAnswers[currentQuestionIndex],
      [QUESTIONS[currentQuestionIndex].field]: inputValue,
    };
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // add loading spinner here
      console.log("Submitting answers...");
      console.log(answers);
      testGPT(answers).then((aiGeneratedResponse) => {
        setAiGeneratedResponse(aiGeneratedResponse);
        setIsNewGroup(false);
        console.log(aiGeneratedResponse);
      });
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


  const closeModal = () => {
    setShowShareModal(false);
  };

  const DESTINATION_IMAGE = require("../../assets/images/paris_night.jpg"); // replace with your destination image 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY_COLOR }}>
      <ScrollView>
        <Background additionalStyle={styles.container}>
          <View style = {styles.destinationImgContainer}>
            <Image
            source={DESTINATION_IMAGE}
            style={[
              styles.destinationsImg,
            ]}
            />       
          </View>
          <View style={styles.itinerariesContainer}>
            {!isNewGroup ? (
              <>
                {isEditingGroupName ? (
                  <View style={styles.groupNameContainer}>
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
                  </View>
                ) : (
                  <View style={styles.groupNameContainer}>
                    <Text
                      style={styles.groupName}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {groupName}
                    </Text>
                    <TouchableOpacity onPress={handleEditGroupName}>
                    <Icon name="pencil" size={35} color="white" />
                    </TouchableOpacity>
                  </View>
                )}

                <Card additionalStyles={styles.groupMembersCard}>
                  <View style={styles.groupMembersRow}>
                    {groupMembers.map((member, index) => (
                      <View key={index} style={styles.groupMember}>
                        <Image
                          source={{ uri: member.pfpUrl }}
                          style={styles.profilePhoto}
                        />
                        {/* <Text style={styles.groupMembersListText}>
                          John Doe
                        </Text> */}
                      </View>
                    ))}
                    <View style={styles.addNewGroupMemberContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          setShowShareModal(true);
                        }}
                      >
                        <Ionicons
                          name="add"
                          size={30}
                          color={PRIMARY_COLOR}
                          style={styles.icon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
                <Card
                  additionalStyles={[
                    styles.sectionsCard,
                    styles.itineraryTextContainer,
                  ]}
                >
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => {
                      navigation.navigate("Itinerary", { aiGeneratedResponse: aiGeneratedResponse });

                    }}
                  >
                    <Text style={styles.itineraryText}>Itinerary</Text>
                    <Ionicons
                        name="arrow-forward-outline"
                        size={30}
                        color={'black'}
                      ></Ionicons>
                  </TouchableOpacity>
                </Card>

                <Card additionalStyles={styles.sectionsCard}>
                  <View>
                    <Text style={styles.sectionsTitle}>Flight</Text>
                    <Text style={styles.sectionsText}>
                      {aiGeneratedResponse.FlightInformation.DepartureAirport} -
                      {aiGeneratedResponse.FlightInformation.ArrivalAirport}
                      {aiGeneratedResponse.FlightInformation.DepartureTime}
                    </Text>
                    <Text style={styles.sectionsText}>
                      Flight Number:{" "}
                      {aiGeneratedResponse.FlightInformation.FlightNumber}
                    </Text>
                    <Text style={styles.sectionsText}>
                      Departure Date:{" "}
                      {aiGeneratedResponse.FlightInformation.DepartureDate}
                    </Text>
                    <Text style={styles.sectionsText}>
                      Arrival Time:{" "}
                      {aiGeneratedResponse.FlightInformation.ArrivalTime}
                    </Text>
                    <Text style={styles.sectionsText}>
                      Return Date:{" "}
                      {aiGeneratedResponse.FlightInformation.ReturnDate}
                    </Text>
                    <Text style={styles.sectionsText}>
                      Airline: {aiGeneratedResponse.FlightInformation.Airline}
                    </Text>
                    <Text style={styles.sectionsText}>
                      Price: {aiGeneratedResponse.FlightInformation.Price}
                    </Text>
                  </View>
                </Card>

                <Card additionalStyles={styles.sectionsCard}>
                  <View>
                    <Text style={styles.sectionsTitle}>Hotel</Text>
                    <Text style={styles.sectionsText}>
                      {aiGeneratedResponse.Accommodation.Name}
                    </Text>
                    <Text style={styles.sectionsText}>
                      Address: {aiGeneratedResponse.Accommodation.Address}
                    </Text>
                    <Text style={styles.sectionsText}>
                      Price: {aiGeneratedResponse.Accommodation.Price}
                    </Text>
                  </View>
                </Card>

                <Card additionalStyles={styles.sectionsCard}></Card>
                <Card additionalStyles={styles.sectionsCard}></Card>
                <Card additionalStyles={styles.sectionsCard}></Card>
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
        </Background>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showShareModal}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeModal}
        >
          <View style={styles.centeredView}>
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
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
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = {
  destinationsImg: {
    width: '100%',
    height: undefined,
    aspectRatio: .9,
  },
  destinationImgContainer: {
    shadowColor: 'green',
    shadowOffset: 3,
  },
  sectionsText: {
    color: 'black',
  },
  sectionsTextAlt: {
    color: 'black',
    fontWeight: 600,
  },
  itineraryTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  itineraryText: {
    fontSize: 30,
    marginRight: "5%",
    color: 'black',
  },
  sectionsTitle: {
    color: 'black',
    fontSize: 40,
    marginBottom: "5%",
  },
  sectionsCard: {
    marginVertical: "10%",
    height: "auto",
    width: "90%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
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
    marginBottom: "10%",
    marginTop: "10%",
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
    width: "90%",
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
    width: "90%",
    height: "10%",
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
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
  },

  groupMembersRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
  },
  groupMember: {
    alignItems: "center",
    margin: 5,
  },

  groupMembersListText: {
    marginTop: 5,
    fontSize: 16,
  },
  addNewGroupMemberContainer: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "white",
    margin: 5,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    padding: 0,
    marginLeft: 2, // Adjust this value based on your requirements
  },
  groupNameContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row", // Add this line
  },
};
