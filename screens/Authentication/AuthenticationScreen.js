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

  return (
    <View style={styles.container}>
      {showUserInfo()}
      {!userInfo && (
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
            source={require("../../assets/google-icon.png")}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
