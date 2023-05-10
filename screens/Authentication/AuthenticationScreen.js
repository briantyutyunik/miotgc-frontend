import React, { useContext, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Background from "../../components/UI/Background";
import Logo from "../../components/UI/Logo";
import { useNavigation } from "@react-navigation/native";
import Slogan from "../../components/UI/Slogan";
import Seperator from "../../components/UI/Seperator";
import Button from "../../components/UI/Button";
import { auth, userSignIn } from "Color../../../firebase";
import { PRIMARY_COLOR } from "../../constants/styles";
import Line from "../../components/UI/Line";
import { testGPT } from "../../util/api/openaiApi";

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
      // save user info
      // authCtx.authenticate(response.authentication.accessToken);
      // console.log(auth.getAuth().curr/entUser?.getIdToken);
      const credential = auth.GoogleAuthProvider.credential(
        response.authentication.idToken,
        response.authentication.accessToken
      );

      auth
        .signInWithCredential(auth.getAuth(), credential)
        .then(() => {
          console.log("User signed in with Google");
          console.log(auth.getAuth().currentUser.email);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(response?.type);
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

  function onTempScreen() {
    navigation.navigate("TempScreen");
  }

  return (
    <Background additionalStyle={styles.container}>
      <Logo additionalStyle={styles.logo} height={120} width={120} />
      <Slogan />
      <View style={styles.authButtonsContainer}>
      <Button
          containerStyle={styles.buttonContainer}
          title={"GPT"}
          onPress={() => {
            testGPT();
          }}
        />
        <Button
          containerStyle={styles.buttonContainer}
          title={"Sign in with Google"}
          iconName="logo-google"
          iconSize={35}
          iconColor={PRIMARY_COLOR}
          iconPositionStyle={styles.googleImageIcon}
          onPress={() => {
            promptAsync({ showInRecents: true });
          }}
        />
        <Seperator />
        <Button
          containerStyle={styles.buttonContainer}
          title={"Sign Up"}
          onPress={onSignUp}
        />
      </View>
      <Button
        containerStyle={styles.signInContainer}
        textStyle={styles.signInText}
        textColor={"white"}
        title="Sign In"
        onPress={onSignIn}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
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
    top: 50,
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
});
