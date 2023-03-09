import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import Background from "../../components/UI/Background";
import Line from "../../components/UI/Line";
import Logo from "../../components/UI/Logo";
import { GOOGLE_ICON } from "../../assets/icons/Logos";
import { useNavigation } from "@react-navigation/native";
import Slogan from "../../components/UI/Slogan";
import Seperator from "../../components/UI/Seperator";
import AuthenticationButton from "../../components/Auth/AuthenticationButton";
WebBrowser.maybeCompleteAuthSession();

export default function AuthenticationScreen() {
  const navigation = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "533468859580-vouienq6fgo6bsih4cpomf7i2br8m54a.apps.googleusercontent.com",
    iosClientId:
      "533468859580-8c1uoi0s5q4vvk4upnlkeffpqaskq5ka.apps.googleusercontent.com",
    clientId:
      "533468859580-v0d4e330g8a71o0e01md27q1ob7rv76u.apps.googleusercontent.com",
  });

  // apparently doesnt work in android most of the time ... response seems to return 'dismiss' most of the time
  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      //save user data to firebase
      navigation.navigate("Home", { name: "Profile" });
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View>
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  function onSignIn() {
    // console.log("HERE");
    navigation.navigate("SignIn");
  }

  function onSignUp() {
    navigation.navigate("SignUp");
  }

  return (
    <Background additionalStyle={styles.container}>
      <Logo additionalStyle={styles.logo} height={120} width={120} />
      <Slogan />
      <View style={styles.buttonContainer}>
        <AuthenticationButton
          title={"Sign in with Google"}
          iconImageSource={GOOGLE_ICON}
          iconImageStyle={styles.googleImageIcon}
          onPressHandler={() => {
            promptAsync({ showInRecents: true });
          }}
        />
        <Seperator />
        <AuthenticationButton title={"Sign Up"} onPressHandler={onSignUp} />
      </View>
      <Button title="Sign In" onPress={onSignIn} />
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 170,
  },
  logo: {
    position: "absolute",
    top: 50,
  },
  googleImageIcon: {
    position: "absolute",
    left: 20,
    height: "70%",
    width: "10%",
  },
});
