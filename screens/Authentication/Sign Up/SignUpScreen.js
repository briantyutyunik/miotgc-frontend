import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import AuthInput from "../../../components/Auth/Sign In/AuthInput";
import { PRIMARY_COLOR } from "../../../constants/styles";
import DatePicker from "react-native-datepicker";
import Card from "../../../components/UI/Card";
import Logo from "../../../components/UI/Logo";
import Button from "../../../components/UI/Button";
import Background from "../../../components/UI/Background";
import { userSignUp } from "../../../firebase";

const SignUpScreen = () => {
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null); 

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(null); 

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const validateEmail = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  const handleEmailChange = (text) => {
    setEmail(text);
    if (!validateEmail(text)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError(null);
    }
  };

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

  useEffect(() => {
    setIsFormValid(
      firstName.length > 0 &&
        lastName.length > 0 &&
        validateEmail(email) && 
        validatePassword(password) && 
        confirmPassword.length > 0 &&
        selectedDate !== null &&
        phoneNumber.length > 0
    );
  }, [
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    selectedDate,
    phoneNumber,
  ]);

  const handleSignUpButtonPress = async () => {
    setIsLoading(true);
    setError("");
    const { error } = await userSignUp(email, password);
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
            <DatePicker
              style={{ width: "95%", marginBottom: 25 }}
              date={new Date()}
              mode="date"
              placeholder="Date of Birth"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  borderColor: PRIMARY_COLOR,
                  borderRadius: 10,
                  borderWidth: 2,
                },
              }}
              onDateChange={(selectedDate) => setSelectedDate(selectedDate)}
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
          <ActivityIndicator size="large" color={PRIMARY_COLOR} />
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
    paddingTop: 30,
    paddingBottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: "80%",
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
});

export default SignUpScreen;
