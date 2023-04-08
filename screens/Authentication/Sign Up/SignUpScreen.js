import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import AuthInput from "../../../components/Auth/Sign In/AuthInput";
import { PRIMARY_COLOR } from "../../../constants/styles";
import Card from "../../../components/UI/Card";
import Logo from "../../../components/UI/Logo";
import Button from "../../../components/UI/Button";
import Background from "../../../components/UI/Background";
import { userSignUp } from "../../../firebase";
import UserAvatar from "../../../components/UI/UserAvatar";
import ImageSelect from "../../../components/UI/ImageSelect";
import { checkIfValueExists } from "../../../firebase";
const SignUpScreen = () => {
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [userNameError, setUserNameError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState(null);

  const [userName, setUserName] = useState("");

  const [image, setImage] = useState("");
  const [openImageSelect, setOpenImageSelect] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  async function handleEmailChange(text) {
    setEmail(text);
    const exists = await checkIfValueExists("users", "email", text);

    console.log("TESTING...", exists);
    if (!validateEmail(text)) {
      setEmailError("Invalid email format");
      setIsEmailValid(false);
    } else if (exists) {
      setEmailError(
        "There's an account registered with this email address already. Sign in below if you already have an account."
      );
      setIsEmailValid(false);
    } else {
      setEmailError(null);
      setIsEmailValid(true);
    }
  }

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (!validatePassword(text)) {
      setPasswordError(
        "Password must be at least 8 characters, contain one uppercase letter, one lowercase letter, one digit, and one special character."
      );
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (text !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError(null);
    }
  };

  const validateUserName = (userName) => {
    if (userName.length < 6) {
      return false;
    }
    return true;
  };

  async function checkIfUserNameExists(username) {
    const exists = await checkIfValueExists("users", "username", username);
    if (exists) {
      return true;
    } else {
      return false;
    }
  }

  async function checkIfEmailExists(email) {
    const exists = await checkIfValueExists("users", "email", email);
    setIsEmailValid(!exists);
  }

  async function handleUserNameChange(text) {
    setUserName(text);

    const exists = await checkIfValueExists("users", "userName", text);
    console.log("TESTING...", exists);
    if (!validateUserName(text)) {
      setUserNameError("The user name must be at least 6 characters.");
      setIsUsernameValid(false);
    } else if (exists) {
      setUserNameError("The username is already taken.");
      setIsUsernameValid(false);
    } else {
      setUserNameError(null);
      setIsUsernameValid(true);
    }
  }

  const handleDobChange = (text) => {
    setDob(text);
    if (!validateDob(text)) {
      setDobError("Please enter your date of birth as mm/dd/yyyy.");
    } else {
      setDobError(null);
    }
  };

  const validateDob = (date) => {
    const datePattern =
      /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
    return datePattern.test(date);
  };

  useEffect(() => {
    setIsFormValid(
      firstName.length > 0 &&
        lastName.length > 0 &&
        validateEmail(email) &&
        validatePassword(password) &&
        confirmPassword.length > 0 &&
        validateDob(dob) &&
        phoneNumber.length > 0 &&
        validateUserName(userName) &&
        isUsernameValid === true &&
        isEmailValid === true
    );
  }, [
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    dob,
    isUsernameValid,
    isEmailValid,
    phoneNumber,
  ]);

  const handleSignUpButtonPress = async () => {
    setIsLoading(true);
    setError("");
    // generate image name for user's avatarUrl so that when
    // they sign up a request doesn't go to firebase storage with no user id
    // causing error
    let imageName = "";
    if (image) {
      imageName = generateImageName();
      await uploadImage(image, imageName);
    }
    const newUser = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      dob: dob.toString(),
      userName: userName,
      avatarUrl: imageName,
      groupIds: [],
    };

    await userSignUp(formValues.email, formValues.password, newUser);
    setIsLoading(false);
    console.log(error);
  };

  return (
    <Background additionalStyle={styles.container}>
      <Logo additionalStyle={styles.logo} height={120} width={120} />
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.authInputContainer}
      >
        <Card additionalStyles={styles.cardContainer}>
          <View style={styles.signUpHeaderContainer}>
            {/* <Text style={styles.signUpHeader}>Sign up</Text>
            <Line width={70} color={PRIMARY_COLOR} height={1} /> */}
          </View>
          <UserAvatar
            rounded
            size={110}
            imageUri={image}
            containerStyle={styles.avatarContainerStyle}
            onPress={() => {
              setOpenImageSelect(!openImageSelect);
              console.log(openImageSelect);
            }}
          />
          <ImageSelect
            openImageSelect={openImageSelect}
            setOpenImageSelect={(openImageSelect) =>
              setOpenImageSelect(openImageSelect)
            }
            setImage={(image) => setImage(image)}
          />
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            style={{ width: "100%" }}
          >
            <AuthInput
              placeholder="First Name"
              onChangeTextHandler={(text) => setFirstName(text)}
            />
            <AuthInput
              placeholder="Last Name"
              onChangeTextHandler={(text) => setLastName(text)}
            />
            <AuthInput
              placeholder="User Name"
              onChangeTextHandler={handleUserNameChange}
              error={userNameError}
            />
            <AuthInput
              placeholder="Email Address"
              inputType="email"
              secure={false}
              onChangeTextHandler={handleEmailChange}
              error={emailError}
            />
            <AuthInput
              placeholder="Password"
              inputType="password"
              secure={true}
              onChangeTextHandler={handlePasswordChange}
              error={passwordError}
            />
            <AuthInput
              placeholder="Confirm Password"
              inputType="password"
              secure={true}
              onChangeTextHandler={handleConfirmPasswordChange}
              error={confirmPasswordError}
            />

            <AuthInput
              placeholder="dob mm/dd/yyyy"
              secure={false}
              onChangeTextHandler={handleDobChange}
              error={dobError}
            />
            <AuthInput
              placeholder="Phone Number"
              keyboardType="number-pad"
              secure={false}
              onChangeTextHandler={(text) => setPhoneNumber(text)}
            />
          </ScrollView>
        </Card>
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            useNative
            size="large"
            color={PRIMARY_COLOR}
          />
        ) : (
          <Button
            containerStyle={styles.signUpButtonContainer}
            iconName={"arrow-forward-outline"}
            iconSize={40}
            iconColor={PRIMARY_COLOR}
            onPress={handleSignUpButtonPress}
            disabled={!isFormValid}
            disabledStyle={styles.disabledButton}
          />
        )}
      </KeyboardAvoidingView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    top: 10,
  },
  authInputContainer: {
    alignItems: "center",
    top: "17%",
    width: "90%",
  },
  disabledButton: {
    opacity: 0.5,
  },
  scrollViewContainer: {
    width: "100%",
  },
  cardContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: "85%",
  },
  avatarContainerStyle: {
    backgroundColor: PRIMARY_COLOR,
    marginBottom: 30,
    // position: "absolute",
  },
  signUpButtonContainer: {
    height: 50,
    width: "35%",
    top: 20,
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: PRIMARY_COLOR,
  },
  signUpHeaderContainer: {
    marginBottom: 30,
  },
});

export default SignUpScreen;
