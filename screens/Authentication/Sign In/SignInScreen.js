import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";

import { PRIMARY_COLOR } from "../../../constants/styles";
// import Button from "../../../components/UI/Button";
import Background from "../../../components/UI/Background";
import Logo from "../../../components/UI/Logo";

import { auth, userSignIn } from "Color../../../firebase";
import { AuthContext } from "../../../store/auth-context";
import { GOOGLE_ICON } from "../../../assets/icons/Logos";
import Seperator from "../../../components/UI/Seperator";
import AuthInput from "../../../components/Auth/Sign In/AuthInput";
import Button from "../../../components/UI/Button";

export default function SignInScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [authError, setAuthError] = useState(false);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);

  function SignInDirections() {
    const navigator = useNavigation();

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

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  function handleEmailChange(text) {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  }

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Background additionalStyle={styles.container}>
      <Logo additionalStyle={styles.logo} height={120} width={120} />
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
          inputType="password"
          secure
        />

        <Button
          containerStyle={styles.signInButtonContainer}
          iconName={"arrow-forward-outline"}
          iconSize={40}
          iconColor={PRIMARY_COLOR}
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

  authInputContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 350,
  },
  signInButton: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 35,
  },

  signInButtonContainer: {
    marginTop: 50,
    height: 50,
    width: "35%",
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  signInButtonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
  },
});
