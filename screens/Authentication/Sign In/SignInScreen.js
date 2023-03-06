import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { PRIMARY_COLOR } from "../../../assets/colors/Colors";
import AuthenticationButton from "../../../components/Authentication/AuthenticationButton";
import AuthInput from "../../../components/Authentication/Sign In/AuthInput";
import Background from "../../../components/UI/Background";
import Logo from "../../../components/UI/Logo";
import { auth, userSignIn } from "../../../firebase";
export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);

  const navigator = useNavigation();

  const handleSignUp = () => {
    // auth
    //   .createUserWithEmailAndPassword(auth.getAuth(), email, password)
    //   .then((userCredentials) => {
    //     const user = userCredentials.user;
    //     console.log(user.email);
    //   });
  };

  function SignInDirections() {
    return (
      <View style={styles.signInDirectionContainer}>
        <Text style={styles.signInDirectionText}>Log in to Miotgc</Text>
      </View>
    );
  }

  function handleAuthenticationRequest() {
    // use firebase function to sign in the user + handle error
    userSignIn(email, password);
  }

  return (
    <Background additionalStyle={styles.container}>
      <Logo additionalStyle={styles.logo} height={120} width={120} />
      <SignInDirections />
      <KeyboardAvoidingView
        style={styles.authInputContainer}
        behavior="padding"
      >
        <AuthInput
          placeholder="Email"
          onChangeTextHandler={(text) => setEmail(text)}
          inputType="email"
        />
        <AuthInput
          placeholder="Password"
          onChangeTextHandler={(text) => setPassword(text)}
          secureTextEntry
        />
        {
          //authError && <Error />
        }
        <AuthenticationButton
          additionalStyle={styles.authenticationButtonContainer}
          iconName="arrow-forward-outline"
          iconSize={40}
          iconStyle={styles.authIcon}
          iconColor={PRIMARY_COLOR}
          onPressHandler={handleAuthenticationRequest}
        />
      </KeyboardAvoidingView>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    position: "absolute",
    top: 50,
  },
  signInDirectionContainer: {
    position: "absolute",
    top: 220,
    width: "75%",

    // left: 15,
  },
  signInDirectionText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  authInputContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 300,
  },
  authenticationButtonContainer: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 35,
  },
});
