import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
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
import { auth, firestore, getUser, storage } from "../../firebase";
import Background from "../../components/UI/Background";
import Card from "../../components/UI/Card";
import Logo from "../../components/UI/Logo";
import { Skeleton } from "@rneui/themed";

export default function UserProfileScreen() {
  const [image, setImage] = useState();
  const [openImageSelect, setOpenImageSelect] = useState(false);
  const data = [
    { id: "1", name: "Group 1", image: "https://picsum.photos/201" },
    { id: "2", name: "Group 2", image: "https://picsum.photos/202" },
    { id: "3", name: "Group 3", image: "https://picsum.photos/204" },
    { id: "4", name: "Group 4", image: "https://picsum.photos/206" },
  ];

  useEffect(() => {
    // refactor later - onSnapshot is used for realtime updates
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
    return unsub;
  }, []);

  const renderGroupCard = ({ item }) => {
    return (
      <View style={{ marginHorizontal: 10 }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: 150, height: 150 }}
        />
        <Text style={{ fontWeight: "bold", marginTop: 10, color: "white" }}>
          {item.name}
        </Text>
      </View>
    );
  };

  const navigation = useNavigation();
  return (
    <Background additionalStyle={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15%",
        }}
      >
        <View style={styles.container}>
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
          <View style={styles.profileContainer}>
            <Button
              onPress={() => {
                auth.getAuth().signOut();
              }}
              title={"Log Out"}
            />
          </View>
          {/* <View style={styles.curve} /> */}
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <View
              style={{ width: "100%", height: 225, backgroundColor: "#FF5553" }}
            >
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Groups
              </Text>
              <FlatList
                data={data}
                renderItem={renderGroupCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={true}
              />
            </View>

            <View
              style={{ width: "100%", height: 225, backgroundColor: "#FF5553" }}
            >
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Trip Histories
              </Text>
              <FlatList
                data={data}
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
  logo: {
    position: "absolute",
    top: 5,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  container: {
    // backgroundColor: "white",
  },
  photoContainer: {
    alignItems: "center",
  },
  photoBackground: {
    backgroundColor: "#007AFF",
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
