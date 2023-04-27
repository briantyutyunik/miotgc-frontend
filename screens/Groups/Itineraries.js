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
import {
  firestore,
  updateGroupName,
  addTestUsersToGroup,
  getGroupMembers,
} from "../../firebase";
import AuthInput from "../../components/Auth/Sign In/AuthInput";
import { PRIMARY_COLOR } from "../../constants/styles";

export default function Itineraries() {
  const route = useRoute();
  const initialGroupName = route.params.groupName;
  const isNewGroupParam = route.params?.isNewGroup || false;
  const [isNewGroup, setIsNewGroup] = useState(isNewGroupParam);
  const [isEditingGroupName, setIsEditingGroupName] = useState(false);
  const [groupName, setGroupName] = useState(initialGroupName);
  const groupId = route.params.groupId;
  const [isFormValid, setIsFormValid] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);

  const [testGroupMembers, setTestGroupMembers] = useState([]);

  function handleSubmitButtonPress() {}

  // *** THIS DOESN'T WORK FOR SOME REASON WILL FIX LATER ***
  // const copyToClipboard = () => {
  //   Clipboard.setString(`exp://exp.host/@tahir13/miotgc/group/${groupId}`);
  // };

  // *** THIS IS TO TEST THE GROUP MEMBERS FUNCTIONALITY ***
  useEffect(() => {
    async function fetchData() {
      // await addTestUsersToGroup();
      const members = await getGroupMembers("fCo0N3buHNjoKVSMOVJ7");
      setTestGroupMembers(members);
      console.log("*******GROUP MEMBER FIRST NAME******: ", members)
    }

    fetchData();
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
          <View style={styles.groupNameContainer}>
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
                {isNewGroup ? "Group Name" : groupName}
              </Text>
            )}
            <TouchableOpacity onPress={handleEditGroupName}>
              <Ionicons name="pencil-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
          <Card additionalStyles={styles.groupMembersCard}>
            <Text style={styles.groupMembersText}>Group Members</Text>
            <View style={styles.groupMembersList}>
              {testGroupMembers.map((member, index) => (
                <Text style={styles.groupMembersListText} key={index}>
                  {member.firstName}
                  {console.log("*******GROUP MEMBER FIRST NAME******: ", member.firstName)}
                </Text>
              ))}
            </View>
          </Card>

          <TouchableOpacity
            style={styles.openModalButton}
            onPress={() => {
              setShowShareModal(true);
            }}
          >
            <Text style={styles.openModalButtonText}>Open Modal</Text>
          </TouchableOpacity>

          {isNewGroup ? (
            <Card additionalStyles={styles.newTripButtonCard}>
              <TouchableOpacity
                onPress={() => {
                  setIsNewGroup(false);
                  setGroupName("Group Name");
                }}
              >
                <View style={styles.newTripButton}>
                  <Ionicons name="add" size={36} color={PRIMARY_COLOR} />
                  <Text style={styles.newTripButtonText}>New Trip</Text>
                </View>
              </TouchableOpacity>
            </Card>
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
          )}
        </Background>
      </ScrollView>
      <Modal
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
      </Modal>
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
    color: PRIMARY_COLOR
  },
  groupMembersListText:{
    fontSize: 16,
    color: PRIMARY_COLOR
  }
};
