import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { PRIMARY_COLOR } from "../../../constants/styles";

import Background from "../../../components/UI/Background";
import Logo from "../../../components/UI/Logo";
import { AuthContext } from "../../../store/auth-context";

import { auth, userSignIn } from "../../../firebase";

export default function SignUpScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signUpHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      await createUser(email, password);
      authCtx.authenticate();
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again."
      );
    }
  }
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [authError, setAuthError] = useState(false);

  // will only be enabled if the user enters valid username and password
  const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState(true);

  const onSignUp = () => {
    if (passwordsMatch()) {
      // auth
      //   .createUserWithEmailAndPassword(auth.getAuth(), email, password)
      //   .then((userCredentials) => {
      //     const user = userCredentials.user;
      //     console.log(user.email);
      //   });
    } else {
      // passwords do not match, show an error message
    }
  };

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  function handleEmailChange(text) {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  }

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one letter and one number
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };
  const passwordsMatch = () => {
    return password === confirmPassword;
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsPasswordValid(validatePassword(text));
  };

  function handleAuthenticationRequest() {}

  function toggleShowPassword() {}

  return (
    <Background additionalStyle={styles.container}>
      <Logo additionalStyle={styles.logo} height={120} width={120} />
      <KeyboardAvoidingView
        style={styles.authInputContainer}
        behavior="padding"
      >
        <View>
          <TextInput
            placeholder="Email"
            onChangeTextHandler={handleAuthenticationRequest}
            value={email}
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <Text>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            placeholder="Confirm Password"
            value={password}
            onChangeText={handlePasswordChange}
            onChangeTextHandler={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <Text>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>

        {/* <Button
          additionalStyle={styles.signUpButton}
          iconName="arrow-forward-outline"
          iconSize={40}
          disabled={isSignUpButtonDisabled}
          iconStyle={styles.authIcon}
          iconColor={PRIMARY_COLOR}
          onPress={onSignUp}
        /> */}
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
  ButtonContainer: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 35,
  },
});
