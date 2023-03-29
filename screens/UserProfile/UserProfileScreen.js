import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { auth, firestore, getUser, storage } from "../../firebase";
import Background from "../../components/UI/Background";
import Logo from "../../components/UI/Logo";
import Seperator from "../../components/UI/Seperator";
import Pfp from "../../assets/images/profile-photo.jpg";
import { Svg, Path } from "react-native-svg";
import ImageSelect from "../../components/UI/ImageSelect";
import { Skeleton } from "@rneui/themed";

export default function UserProfileScreen() {
  const [image, setImage] = useState();
  const [openImageSelect, setOpenImageSelect] = useState(false);

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

  const navigation = useNavigation();
  return (
    <Background additionalStyle={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Logo additionalStyle={styles.logo} height={120} width={120} />
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
          <View style={styles.curve} />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  authButtonsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 170,
  },
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
  googleImageIcon: {
    position: "absolute",
    left: 20,
  },
  signInContainer: {
    position: "absolute",
    bottom: 30,
  },
  signInText: {
    color: "#fff",
    fontSize: 18,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
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
