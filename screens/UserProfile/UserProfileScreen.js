import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import SideMenu from "react-native-side-menu";

import {
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
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
} from "../../firebase";
import Background from "../../components/UI/Background";
import { Skeleton } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PRIMARY_COLOR } from "../../constants/styles";
import { testGPT } from "../../util/api/openaiApi";

const menuStyles = StyleSheet.create({
  // Other styles...
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

  useEffect(() => {
    const unsubscribe = getCurrentUser((user) => {
      setCurrentUser(user);
    });

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
            navigation.navigate("Itineraries", {
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
      <View style={{ marginHorizontal: 10 }}>
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
            style={{ width: 150, height: 150 }}
          />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", marginTop: 10, color: "white" }}>
          {group.name}
        </Text>
      </View>
    );
  };

  return (
    <Background>
      <View style={styles.profileScreenContainer}>
        <Button
          containerStyle={styles.buttonContainer}
          title={"GPT"}
          onPress={() => {
            anotherFunction();
          }}
        />
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={() => {
              setOpenImageSelect(!openImageSelect);
            }}
          >
            <View style={styles.photoBackground}>
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
            </View>
          </TouchableOpacity>

          {/* <View style={styles.curve} /> */}
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <View style={styles.flatListContainer}>
              <Text style={styles.flatListTitle}>Groups</Text>
              <FlatList
                data={[...groups, { id: "add-new-group" }]}
                renderItem={renderGroupCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={true}
              />
            </View>

            <View style={styles.flatListContainer}>
              <Text style={styles.flatListTitle}>Trip History</Text>
              <FlatList
                data={groups}
                renderItem={renderGroupCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={true}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 60,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  flatListContainer: {
    width: "100%",
    height: 255,
    padding: 10,
    backgroundColor: "#FF5553",
  },
  flatListTitle: {
    marginLeft: 10,
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
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
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  settingsIcon: {
    position: "absolute",
    top: "-5%", // Adjust this value if you need more or less spacing from the top
    right: "5%", // Adjus
  },
  profilePictureContainer: {
    // backgroundColor: "white",
  },
  photoContainer: {
    alignItems: "center",
  },
  photoBackground: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 100,
    padding: 10,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  skeletonContainer: {
    width: 100,
    borderRadius: 100,
  },
  profileContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  curve: {
    height: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    overflow: "hidden",
  },

  logoutIcon: {
    position: "absolute",
    top: "-5%", // Adjust this value if you need more or less spacing from the top
    left: "5%", // Adjust this value if you need more or less spacing from the left
  },
});
