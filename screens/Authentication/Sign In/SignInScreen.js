import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";

import { PRIMARY_COLOR } from "../../../constants/styles";
// import Button from "../../../components/UI/Button";
import Background from "../../../components/UI/Background";
import Logo from "../../../components/UI/Logo";
import { ActivityIndicator } from "react-native";

import { auth, userSignIn } from "Color../../../firebase";
import { AuthContext } from "../../../store/auth-context";
import { GOOGLE_ICON } from "../../../assets/icons/Logos";
import Seperator from "../../../components/UI/Seperator";
import AuthInput from "../../../components/Auth/Sign In/AuthInput";
import Button from "../../../components/UI/Button";
import Card from "../../../components/UI/Card";
import Line from "../../../components/UI/Line";
import ErrorOverlay from "../../../components/UI/ErrorOverlay";
export default function SignInScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [authError, setAuthError] = useState(false);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  // loading spinner and error overlay states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

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

    //commented out for testing
    /*setLoading(true);
    setError("");
    const { isLoading, error } = await userSignIn(email, password);
    setLoading(isLoading);*/

    // setLoading(true);
    setErrorMessage("Invalid email or password");
    setIsError(true);
    setLoading(false);
  }

  const handleSignInButtonPress = () => {
    userSignIn(email, password);
  };

  function validateEmail(email) {
    if (email === "") {
      return true;
    }
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
        behavior="padding"
        style={styles.authInputContainer}
      >
        <Card additionalStyles={styles.cardContainer}>
          <View style={styles.signInHeaderContainer}>
            <Text style={styles.signInHeader}>Welcome Back!</Text>
            <Line width={200} color={PRIMARY_COLOR} height={2} />
          </View>

          <AuthInput
            placeholder="Email"
            onChangeTextHandler={handleEmailChange}
            inputType="email"
            error={isEmailValid ? null : "Invalid email format"}
          />
          <AuthInput
            placeholder="Password"
            onChangeTextHandler={(text) => setPassword(text)}
            inputType="password"
            secure
          />
        </Card>
      </KeyboardAvoidingView>
      <Button
        containerStyle={styles.signInButtonContainer}
        iconName={"arrow-forward-outline"}
        iconSize={40}
        iconColor={PRIMARY_COLOR}
        onPress={handleAuthenticationRequest}
      />
      {loading && <ActivityIndicator size="large" color={PRIMARY_COLOR} />}
      {isError && (
        <Modal
          visible={true}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsError(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalErrorMessage}>{errorMessage}</Text>
              <Button
                containerStyle={styles.modalButtonContainer}
                title="OK"
                type="outline"
                textStyle={styles.errorModalExitButton}
                onPress={handleSignInButtonPress}
              />
            </View>
          </View>
        </Modal>
      )}
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // justifyContent: "flex-end",
  },
  logo: {
    position: "absolute",
    top: 50,
  },
  signInHeaderContainer: {
    marginBottom: 40,
  },
  signInHeader: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: PRIMARY_COLOR,
  },
  authInputContainer: {
    // marginBottom: "80%",
    top: "30%",
    width: "90%",
  },
  cardContainer: {
    paddingVertical: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonContainer: {
    height: 50,
    width: "35%",
    top: "35%",
    backgroundColor: "#fff",
    borderRadius: 100,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalErrorMessage: {
    fontSize: 18,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    marginBottom: 20,
  },
  modalButtonContainer: {
    marginTop: 20,

    borderColor: PRIMARY_COLOR,
    borderRadius: 10,
  },
  errorModalExitButton: {
    backgroundColor: PRIMARY_COLOR,
    color: "#fff",
    padding: 10,
    borderColor: "black",
    width: 80,
    textAlign: "center",
  },
});
