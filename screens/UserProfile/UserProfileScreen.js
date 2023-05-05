import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import CardDarker from "../../components/UI/CardDarker";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import {
  auth,
  firestore,
  getUser,
  storage,
  fetchGroups,
  userSignOut,
  getCurrentUser,
  createGroup,
  listenGroupNames,
  getCurrentUserProfilePicture,
} from "../../firebase";
import Background from "../../components/UI/Background";
import { Skeleton } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PRIMARY_COLOR } from "../../constants/styles";
import { testGPT } from "../../util/api/openaiApi";

const menuStyles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default function UserProfileScreen() {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [image, setImage] = useState();
  const [openImageSelect, setOpenImageSelect] = useState(false);
  const [groups, setGroups] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const navigation = useNavigation();

  async function anotherFunction() {
    console.log("calling testGPT...");
    const response = await testGPT(); // wait for the response from the OpenAI API
    if (response.hasOwnProperty("error")) {
      console.log("Error occurred:", response.error);
    } else {
      console.log("Response:", response);
    }

    console.log("testGPT done.");
  }

  const startShaking = () => {
    setShowDeleteIcon(true);

    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -2,
          duration: 150,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopShaking = () => {
    setShowDeleteIcon(false);
    Animated.timing(shakeAnimation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const unsubscribe = getCurrentUser((user) => {
    setCurrentUser(user);
  });

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const data = await getUser(currentUser.uid);
        setCurrentUserData(data);
        ////console.log(data);
        //console.log(data.firstName);
      };
      fetchUserData();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const data = await getUser(currentUser.uid);
        setCurrentUserData(data);
        //console.log(data);
        ////console.log(data.firstName);
      };
      fetchUserData();
    }
  }, [currentUser]);

  useFocusEffect(
    React.useCallback(() => {
      const uid = auth.getAuth().currentUser.uid;
      (async () => {
        const profilePictureURL = await getCurrentUserProfilePicture(uid);
        setImage(profilePictureURL);
      })();
      (async () => {
        const fetchedGroups = await fetchGroups();
        setGroups(fetchedGroups);
      })();

      const unsubscribeGroups = listenGroupNames((groupId, groupName) => {
        setGroups((prevGroups) =>
          prevGroups.map((group) =>
            group.id === groupId ? { ...group, name: groupName } : group
          )
        );
      });

      // Cleanup function to unsubscribe from both onSnapshot and listenGroupNames listeners
      return () => {
        unsubscribeGroups();
      };
    }, [])
  );

  const EditProfileButton = ({ onPress }) => {
    return (
      <TouchableOpacity 
        onPress={() =>
            navigation.navigate("EditProfile")} style={styles.button}>
        <Icon name="pencil" size={20} color="black" />
      </TouchableOpacity>
    );
  };

  const renderGroupCard = ({ item: group }) => {
    if (group.id === "add-new-group") {
      return (
        <TouchableOpacity
          onPress={async () => {
            const initialGroupName = "Group name";
            const groupId = await createGroup(initialGroupName);
            navigation.navigate("Group", {
              isNewGroup: true,
              groupId: groupId,
              groupName: initialGroupName, // Pass the initial group name
            });
          }}
          style={{
            marginHorizontal: 10,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            width: 150,
            height: 150,
            borderRadius: 10,
          }}
        >
          <Ionicons name="add" size={50} color={PRIMARY_COLOR} />
        </TouchableOpacity>
      );
    }

    return (
      <View style={{ marginHorizontal: 8 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Group", {
              groupName: group.name,
              groupId: group.id,
            })
          }
        >
          <Animated.View
            style={{
              transform: [{ translateX: shakeAnimation }],
            }}
          >
            <Image
              source={{ uri: group.image }}
              style={{ width: 150, height: 180, borderRadius: 10 }}
            />
            {showDeleteIcon && (
              <TouchableOpacity
                onPress={() => deleteGroup(group.id)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  padding: 5,
                  borderRadius: 50,
                  backgroundColor: "transparent", // Change this line
                }}
              >
                <Ionicons
                  name="ios-remove-circle-outline"
                  size={24}
                  color="red"
                />
              </TouchableOpacity>
            )}
          </Animated.View>
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", marginTop: 10, color: "white" }}>
          {group.name}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Background>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View style={styles.profileScreenContainer}>
            <View style={styles.logoutIcon}>
              <EditProfileButton></EditProfileButton>
            </View>
            <View style={styles.profilePictureContainer}>
              <View style={styles.photoContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setOpenImageSelect(!openImageSelect);
                  }}
                  style={styles.photoBackground}
                >
                  {!image && (
                    <Skeleton
                      animation="wave"
                      skeletonStyle={styles.skeletonContainer}
                      height={100}
                      circle
                    />
                  )}
                  {image && (
                    <Image
                      style={styles.profilePhoto}
                      source={{ uri: `${image}` }}
                    />
                  )}
                </TouchableOpacity>
                <View>
                  <Text style={styles.textName}>John Doe</Text>
                </View>
              </View>
            </View>

            {/* <View style={styles.curve} /> */}

            <View style={styles.parentListContainer}>
              <View style={styles.flatListContainer}>
                <CardDarker additionalStyles={styles.cardContainer}>
                  <View style={styles.dualCardTitles}>
                    <View style={styles.dualCardLeft}>
                      <Text style={styles.flatListTitle}>Groups</Text>
                    </View>
                    <View style={styles.dualCardRight}>
                      <TouchableOpacity onPress={startShaking}>
                        <Text style={styles.flatListTitleEdit}>
                          Edit {""}
                          <Icon
                            name="plus-square-o"
                            size={18}
                            color="#FF5553"
                          />{" "}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <FlatList
                    data={[...groups, { id: "add-new-group" }]}
                    renderItem={renderGroupCard}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={true}
                  />
                </CardDarker>
              </View>

              <View style={styles.flatListContainer}>
                <CardDarker additionalStyles={styles.cardContainer}>
                  <Text style={styles.flatListTitle}>Trip History</Text>
                  <FlatList
                    data={groups}
                    renderItem={renderGroupCard}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={true}
                  />
                </CardDarker>
              </View>
            </View>
          </View>
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: "0%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: "100%",
  },
  safe: {
    flex: 1,
    backgroundColor: "#FF5553",
  },
  deleteGroupIconStyle: {
    marginRight: "2%",
    marginTop: "2%",
  },

  buttonContainer: {
    height: 60,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  flatListContainer: {
    width: "100%",
    height: "52%", //change this setting to give more room between the cards
    padding: 5,
    backgroundColor: "#FF5553",
  },
  dualCardTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dualCardRight: {
    alignItems: "flex-end",
    padding: 5,
  },
  dualCardLeft: {
    alignItems: "flex-start",
    padding: 5,
  },
  flatListTitle: {
    marginLeft: 10,
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  flatListTitleEdit: {
    marginLeft: 10,
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "thin",
    color: "#FF5553",
    marginRight: 10,
  },
  profileScreenContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
  },
  parentListContainer: {
    flex: 1,
    height: "50%",
  },
  settingsIcon: {
    position: "absolute",
    top: "-5%", // Adjust this value if you need more or less spacing from the top
    right: "5%",
  },
  profilePictureContainer: {
    paddingBottom: "15%",
    flex: 1,
    height: "50%",
  },
  photoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  photoBackground: {
    backgroundColor: PRIMARY_COLOR,
    width: 130,
    height: 130,
    marginBottom: 10,
    alignSelf: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 100,
  },
  profilePhoto: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
  },
  skeletonContainer: {
    width: 100,
    borderRadius: 100,
  },
  profileContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  textName: {
    color: "white",
    fontWeight: "bold",
    fontSize: "30pt",
    shadowColor: "black",
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  logoutIcon: {
    position: "absolute",
    top: "-7%", // Adjust this value if you need more or less spacing from the top
    left: "4%", // Adjust this value if you need more or less spacing from the left
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
});
