import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { auth } from "../../firebase";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(auth.getAuth(), email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      });
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.authBtns}>
          <TouchableOpacity
            style={styles.loginBtn}
            // onPress={(email) => setEmail("mogus")}
          >
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
            <Text style={styles.loginText}>wfewewef UP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
    width: "100%",
  },
  container: {
    // top: 500,
    flex: 1,
    // backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: 100,
  },
  image: {
    marginBottom: 40,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputView: {
    // backgroundColor: "#fff",
    borderRadius: 45,
    // borderWidth: 1,
    borderBottomWidth: 2,
    width: "70%",
    height: 45,
    marginBottom: 10,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    width: "100%",
    flex: 1,
    padding: 10,
    paddingLeft: 20,
    marginLeft: 20,
    borderWidth: 0,
  },
  forgot_button: {
    height: 20,
    fontSize: 12,
    // marginTop:
    // marginBottom: 50,
  },
  authBtns: {
    marginTop: 35,
    width: "65%",
  },
  loginBtn: {
    // width: "100%",
    margin: 10,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
