import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import { auth, firestore } from "../../firebase";
import Background from "../../components/UI/Background";
import Logo from "../../components/UI/Logo";
import Seperator from "../../components/UI/Seperator";
import Pfp from "../../assets/images/profile-photo.jpg";
import { Svg, Path } from 'react-native-svg';

export default function UserProfileScreen() {
  const navigation = useNavigation();
  return (
    <Background additionalStyle={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Logo additionalStyle={styles.logo} height={120} width={120} />
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <View style={styles.photoBackground}>
            <Image style={styles.profilePhoto} source={Pfp} />
          </View>
          <View style={{ backgroundColor: '#000000' }}>
          <Svg height="100%" width="100%">
            <Path d="M0 0 C 50 100, 150 100, 200 0 L 200 200 L 0 200 Z" fill="#f0f0f0" />
          </Svg>
          </View>
        </View>
        <View style={styles.profileContainer}>
        <Button
          onPress={() => {
            console.log(auth.getAuth().currentUser);
            auth.getAuth().signOut();
          }}
          title={"Log Out"}
        />
          {/* other profile information */}
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
    backgroundColor: 'white',
  },
  photoContainer: {
    alignItems: 'center',
  },
  photoBackground: {
    backgroundColor: '#007AFF',
    borderRadius: 100,
    padding: 10,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  curve: {
    height: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    overflow: 'hidden',
  },
});
