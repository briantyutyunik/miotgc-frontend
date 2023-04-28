import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Card from "../../components/UI/Card";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ScrollView,FlatList, StyleSheet, View, Text, Image, Button, TouchableOpacity, SafeAreaView, } from "react-native";
import { auth,firestore,getUser,storage,fetchGroups,userSignOut,getCurrentUser,createGroup, listenGroupNames } from "../../firebase";
import Background from "../../components/UI/Background";
import { Skeleton } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PRIMARY_COLOR } from "../../constants/styles";

export default function UserProfileScreen() {
  const navigation = useNavigation();
  console.log("**********************  NEW LOG   ***********************")

  const [image, setImage] = useState();
  const [openImageSelect, setOpenImageSelect] = useState(false);
  const [groups, setGroups] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);

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
        console.log(data);
        console.log(data.firstName);
      };
      fetchUserData();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const data = await getUser(currentUser.uid);
        setCurrentUserData(data);
        console.log(data);
        console.log(data.firstName);
      };
      fetchUserData();
    }
  }, [currentUser]);

  useFocusEffect(
    React.useCallback(() => {
      const uid = auth.getAuth().currentUser.uid;
      let docRef = firestore.doc(firestore.getFirestore(), "users", uid);

      const unsub = onSnapshot(docRef, (docSnap) => {
        const user = docSnap.data();
        if (user.avatarUrl !== "") {
          let ref = storage.ref(storage.getStorage(), user.avatarUrl);
          storage.getDownloadURL(ref).then((res) => {
            setImage(res);
          });
        }
      });

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
        unsub();
        unsubscribeGroups();
      };
    }, [])
  );

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
            navigation.navigate("Itineraries", {
              groupName: group.name,
              groupId: group.id,
            })
          }
        >
          <Image
            source={{ uri: group.image }}
            style={{ width: 150, height: 180, borderRadius: 10 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: "3%",
            fontFamily: "roboto-medium",
            fontWeight: "bold",
            marginTop: 10,
            color: "black",
          }}
        >
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
            <TouchableOpacity
              onPress={async () => {
                await userSignOut();
                navigation.navigate("Sign In"); // Replace "SignIn" with the name of your sign-in screen in your navigation
              }}
              style={styles.logoutIcon}
            >
              <Ionicons name="log-out-outline" size={35} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Settings")}
              style={styles.settingsIcon}
            >
              <Ionicons name="settings-outline" size={30} color="white" />
            </TouchableOpacity>

            <View style={styles.profilePictureContainer}>
              {/*<View style={styles.photoContainer}>*/}
              <View style={styles.header}></View>
                <TouchableOpacity
                  onPress={() => {
                    setOpenImageSelect(!openImageSelect);
                  }}
                  //style={styles.photoBackground}
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
                <Text style={styles.username}>Username</Text>
                <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Test", {
                      })
                    }
                >
                  <View>
                    <Text>TEST SCREEN</Text>
                  </View>
                </TouchableOpacity>
              {/*</View>*/}
              <View style={styles.bottomContainer}>
                <View style={styles.bodyContent}>
                  <Text style={styles.name}>John Doe</Text>
                  <Text style={styles.info}>UX Designer / Mobile developer</Text>
                  <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis,
                    omittam deseruisse consequuntur ius an,
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.flatListContainer}>
                <Card additionalStyles={styles.cardContainer}>
                  <View style={styles.dualCardTitles}>
                    <View style={styles.dualCardLeft}>
                      <Text style={styles.flatListTitle}>Groups</Text>
                    </View>
                    <View style={styles.dualCardRight}>
                      <TouchableOpacity>
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
                    data={groups}
                    renderItem={renderGroupCard}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={true}
                  />
                </Card>
              </View>
              <View style={styles.flatListContainer}>
                <Card additionalStyles={styles.cardContainer}>
                  <Text style={styles.flatListTitle}>Trip History</Text>
                  <FlatList
                    data={groups}
                    renderItem={renderGroupCard}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={true}
                  />
                </Card>
              </View>
            </View>
          </View>
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },  
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
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
  },
  logo: {
    position: "absolute",
    top: 5,
  },
  profilePhoto: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  settingsIcon: {
    position: "absolute",
    top: "-5%", // Adjust this value if you need more or less spacing from the top
    right: "5%",
  },
  profilePictureContainer: {
    // backgroundColor: "white",
    //paddingBottom: "5%",
    flex: 1,
  },
  photoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  photoBackground: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 10,
    overflow: "hidden",
  },
  profilePhoto: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  skeletonContainer: {
    width: 100,
    borderRadius: 100,
  },
  profileContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  logoutIcon: {
    position: "absolute",
    top: "-5%", // Adjust this value if you need more or less spacing from the top
    left: "5%", // Adjust this value if you need more or less spacing from the left
  },
  bottomContainer: {
    /*flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
    alignItems: "center",
    paddingTop: 10, */
    marginTop: 40,
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
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  
});
