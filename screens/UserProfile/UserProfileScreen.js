import { useNavigation }  from "@react-navigation/native";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Card from "../../components/UI/Card";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import {
  auth,
  firestore,
  getUser,
  getCurrentUser,
  storage,
  fetchGroups,
  userSignOut,
} from "../../firebase";
import Background from "../../components/UI/Background";
import { Skeleton } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PRIMARY_COLOR } from "../../constants/styles";

export default function UserProfileScreen() {
  const [image, setImage] = useState();
  const [openImageSelect, setOpenImageSelect] = useState(false);
  const [groups, setGroups] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);

  const navigation = useNavigation();

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

    return unsub;
  }, []);

  const renderGroupCard = ({ item: group }) => {
    return (
      <View style={{ marginHorizontal: 8 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Itineraries", {
              groupName: group.name,
              groupId: group.id,
            })
          }>
          <Image
            source={{ uri: group.image }}
            style={{ width: 150, height: 180, borderRadius: 10 }}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: "3%", fontFamily: "roboto-medium", fontWeight: "bold", marginTop: 10, color: "black" }}>
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
          <Text>
            
          </Text>

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
                      <Text style={styles.flatListTitleEdit}>Edit {''}
                      <Icon name="plus-square-o" size={18} color="#FF5553" /> </Text>
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
  cardContainer: {
    margin: "0%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: "100%",
  },
  safe: {
    flex: 1,
    backgroundColor: '#FF5553',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dualCardRight: {
    alignItems: 'flex-end',
    padding: 5,
  },
  dualCardLeft: {
    alignItems: 'flex-start',
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
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  settingsIcon: {
    position: "absolute",
    top: "-5%", // Adjust this value if you need more or less spacing from the top
    right: "5%",
  },
  profilePictureContainer: {
    // backgroundColor: "white",
    paddingBottom: "5%",
  },
  photoContainer: {
    alignItems: "center",
    
  },
  photoBackground: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    
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
  logoutIcon: {
    position: "absolute",
    top: "-5%", // Adjust this value if you need more or less spacing from the top
    left: "5%", // Adjust this value if you need more or less spacing from the left
  },
});