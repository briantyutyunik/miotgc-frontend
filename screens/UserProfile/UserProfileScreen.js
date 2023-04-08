import { useNavigation } from "@react-navigation/native";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
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
import { auth, firestore, getUser, storage, fetchGroups } from "../../firebase";
import Background from "../../components/UI/Background";
import { Skeleton } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PRIMARY_COLOR } from "../../constants/styles";

export default function UserProfileScreen() {
  const [image, setImage] = useState();
  const [openImageSelect, setOpenImageSelect] = useState(false);
  const [groups, setGroups] = useState([]);
  const navigation = useNavigation();

  // const data = [
  //   { id: "1", name: "Group 1", image: "https://picsum.photos/201" },
  //   { id: "2", name: "Group 2", image: "https://picsum.photos/202" },
  //   { id: "3", name: "Group 3", image: "https://picsum.photos/204" },
  //   { id: "4", name: "Group 4", image: "https://picsum.photos/206" },
  // ];

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
      <View style={{ marginHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Itineraries", { groupName: group.name, groupId: group.id })
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

          {/* <View style={styles.curve} /> */}
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <View style={styles.flatListContainer}>
              <Text style={styles.flatListTitle}>Groups</Text>
              <FlatList
                data={groups}
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
    top: -20, // Adjust this value if you need more or less spacing from the top
    right: 20, // Adjus
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
});
