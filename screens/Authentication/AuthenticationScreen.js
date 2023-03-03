import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Dimensions } from "react-native";
const { height } = Dimensions.get("window");
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import Background from "../components/Background";
import AuthenticationButton from "./AuthenticationButton";
import Line from "../components/Line";
import Logo from "../components/Logo";
import { GOOGLE_ICON } from "../../assets/icons/Logos";
WebBrowser.maybeCompleteAuthSession();

export default function AuthenticationScreen() {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

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

  const Seperator = () => {
    return (
      <View style={styles.seperatorContainer}>
        <Line width={120} />
        <Text style={styles.seperatorText}>or</Text>
        <Line width={120} />
      </View>
    );
  };

  const SignInButton = () => {
    return (
      <TouchableOpacity style={styles.signInButtonContainer}>
        <Text style={styles.signInButtonText}>Sign In</Text>
        <Line width={65} />
      </TouchableOpacity>
    );
  };

  const Slogan = () => {
    return (
      <View style={styles.sloganContainer}>
        <Text style={styles.sloganText}>Make Any Place Feel Like Home</Text>
      </View>
    );
  };

  return (
    <Background additionalStyle={styles.container}>
      <Logo additionalStyle={styles.logo} height={120} width={120} />
      <Slogan />
      <View style={styles.buttonContainer}>
        <AuthenticationButton
          // additionalStyle={styles.signInWithGoogleButton}
          title={"Sign in with Google"}
          iconImageSource={GOOGLE_ICON}
          onPressHandler={() => {
            console.log("pressed");
          }}
        />
        <Seperator />
        <AuthenticationButton title={"Sign Up"} />
      </View>
      <SignInButton />
      {/* {!userInfo && (
        <TouchableOpacity
          onPress={
            accessToken
              ? getUserData
              : () => {
                  promptAsync({ showInRecents: true });
                }
          }
        >
          <Text>{accessToken ? "Get User Data" : "Login"}</Text>
          <Image
            source={require("../../assets/images/google-icon.png")}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      )} */}
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
    marginTop: height * 0.1,
    marginBottom: height * 0.1
  },
  seperatorContainer: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  seperatorText: {
    fontSize: 16,
    marginLeft: 8,
    marginRight: 8,
    color: "#fff",
  },
  signInButtonContainer: {
    bottom: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: "18",
    marginBottom: 5,
  },
  logo: {
    position: "absolute",
    top: 50,
  },
  sloganContainer: {
    position: "absolute",
    top: 275,
    width: "80%",
    left: 15,
  },
  sloganText: {
    color: "#fff",
    fontSize: "30%",
    fontWeight: "bold",
  },
});
