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
import Button from "../../../components/UI/Button";
import Background from "../../../components/UI/Background";
import Logo from "../../../components/UI/Logo";

import { auth, userSignIn } from "Color../../../firebase";
import { AuthContext } from "../../../store/auth-context";
import { GOOGLE_ICON } from "../../../assets/icons/Logos";
import Seperator from "../../../components/UI/Seperator";

export default function SignInScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

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
        <TextInput
          placeholder="Email"
          onChangeTextHandler={handleAuthenticationRequest}
          value={email}
          inputType="email"
        />
        <View>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={handlePasswordChange}
            onChangeTextHandler={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <Text>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>

        <Button
          additionalStyle={styles.signInButton}
          iconName="arrow-forward-outline"
          iconSize={40}
          disabled={isLoginButtonDisabled}
          iconStyle={styles.authIcon}
          iconColor={PRIMARY_COLOR}
          onPressHandler={handleAuthenticationRequest}
        />
      </KeyboardAvoidingView>
      <View>
        <Text>Forgot your login details? Get help signing in.</Text>
      </View>
      <View>
        <Text>OR</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={"Sign in with Google"}
          iconImageSource={GOOGLE_ICON}
          iconImageStyle={styles.googleImageIcon}
          onPressHandler={() => {
            promptAsync({ showInRecents: true });
          }}
        />
        <Seperator />
      </View>
      <View>
        <Text>Don't have an account? Sign Up.</Text>
      </View>
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
    marginBottom: 300,
  },
  signInButton: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 35,
  },
  signUpButton: {
    signInButtonContainer: {
      bottom: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    signInButtonText: {
      fontWeight: "bold",
      color: "#fff",
      fontSize: 18,
      marginBottom: 5,
    },
  },
});
