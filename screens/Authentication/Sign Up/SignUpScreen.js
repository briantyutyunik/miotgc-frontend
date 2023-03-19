import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import { PRIMARY_COLOR } from "../../../constants/styles";
import Background from "../../../components/UI/Background";
import Logo from "../../../components/UI/Logo";
import UserAvatar from "../../../components/UI/UserAvatar";
import User from "../../../models/User";
import AuthInput from "../../../components/Auth/Sign In/AuthInput";
import Button from "../../../components/UI/Button";
import Card from "../../../components/UI/Card";
import Line from "../../../components/UI/Line";

export default function SignUpScreen() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userName: "",
    phoneNumber: "",
    birthDate: "",
  });

  // Add a state variable to keep track of whether all the required fields are filled in or not
  const [isFormValid, setIsFormValid] = useState(false);

  // Update the state variable when a required field is filled in
  const handleInputChange = (inputName, inputValue) => {
    setFormValues({ ...formValues, [inputName]: inputValue });

    // Check if all the required fields have been filled in
    if (
      formValues.firstName !== "" &&
      formValues.lastName !== "" &&
      formValues.email !== "" &&
      formValues.password !== "" &&
      formValues.userName !== "" &&
      formValues.phoneNumber !== "" &&
      formValues.birthDate !== ""
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };
  return (
    <Background additionalStyle={styles.container}>
      <Logo additionalStyle={styles.logo} height={100} width={100} />

      <Card additionalStyles={styles.authInputContainer}>
        <View style={styles.signUpHeaderContainer}>
          <Text style={styles.signUpHeader}>Sign up</Text>
          <Line width={70} color={PRIMARY_COLOR} height={1} />
        </View>
        <UserAvatar
          rounded
          size={110}
          containerStyle={styles.avatarContainerStyle}
        />
        <ScrollView
          bounces
          style={styles.scrollViewStyle}
          contentContainerStyle={styles.formValueContainer}
        >
          <View style={styles.nameViewContainer}>
            <TextInput
              style={[styles.inputText, styles.nameInputFields]}
              placeholderTextColor="#708090"
              keyboardType={"default"}
              autoCapitalize="none" // autoFocus={inputType === "email"}
              placeholder="First Name"
              onChangeText={(text) => handleInputChange("firstName", text)}
              containerStyle={[styles.nameContainerStyle, { marginRight: 5 }]}
            />
            <TextInput
              style={[styles.inputText, styles.nameInputFields]}
              placeholderTextColor="#708090"
              keyboardType={"default"}
              autoCapitalize="none" // autoFocus={inputType === "email"}
              placeholder="Last Name"
              onChangeText={(text) => handleInputChange("lastName", text)}
              containerStyle={[styles.nameContainerStyle, { marginLeft: 5 }]}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.inputText, styles.inputField]}
              placeholderTextColor="#708090"
              keyboardType={"default"}
              autoCapitalize="none" // autoFocus={inputType === "email"}
              placeholder="User Name"
              onChangeText={(text) => handleInputChange("userName", text)}
            />
            <TextInput
              style={[styles.inputText, styles.inputField]}
              placeholderTextColor="#708090"
              keyboardType={"default"}
              autoCapitalize="none" // autoFocus={inputType === "email"}
              placeholder="Phone Number"
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
            />
            <TextInput
              style={[styles.inputText, styles.inputField]}
              placeholderTextColor="#708090"
              keyboardType={"default"}
              autoCapitalize="none" // autoFocus={inputType === "email"}
              placeholder="Birthdate (mm/dd/yyyy)"
              onChangeText={(text) => handleInputChange("birthDate", text)}
            />
            <TextInput
              style={[styles.inputText, styles.inputField]}
              placeholderTextColor="#708090"
              keyboardType={"default"}
              autoCapitalize="none" // autoFocus={inputType === "email"}
              placeholder="Email address"
              onChangeText={(text) => handleInputChange("email", text)}
            />
            <TextInput
              style={[styles.inputText, styles.inputField]}
              placeholderTextColor="#708090"
              keyboardType={"default"}
              autoCapitalize="none" // autoFocus={inputType === "email"}
              placeholder="Password"
              secure
              onChangeText={(text) => handleInputChange("password", text)}
            />
          </View>
        </ScrollView>
      </Card>
      <Button
        containerStyle={[
          styles.signUpButtonContainer,
          !isFormValid && styles.disabledButton,
        ]}
        disabled={!isFormValid}
        iconName={"arrow-forward-outline"}
        iconSize={40}
        iconColor={isFormValid ? PRIMARY_COLOR : "grey"}
        // onPress={handleAuthenticationRequest}
      />
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    top: 30,
  },
  nameViewContainer: {
    flexDirection: "row",

    width: 250,
    justifyContent: "space-between",
  },
  avatarContainerStyle: {
    backgroundColor: PRIMARY_COLOR,
    marginBottom: 30,
    // position: "absolute",
  },
  authInputContainer: {
    width: "90%",
    top: "15%",
    alignItems: "center",
    marginTop: 25,
  },
  formValueContainer: {
    alignItems: "center",
  },
  scrollViewStyle: {
    width: "95%",
  },

  signUpButtonContainer: {
    justifyContent: "flex-end",
    position: "absolute",
    marginTop: 20,
    top: "90%",
    height: 50,
    width: "35%",
    backgroundColor: "#fff",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  nameContainerStyle: {
    flex: 2,
    flexDirection: "row",
    marginHorizontal: -35,
  },
  signUpHeaderContainer: {
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: "#595959",
  },
  signUpHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: PRIMARY_COLOR,
  },
  inputContainer: {},
  nameInputFields: {
    width: 125,
    marginRight: 5,
    justifyContent: "center",
    marginBottom: 25,
    borderColor: PRIMARY_COLOR,
    borderRadius: 10,
    borderWidth: 2,
  },
  inputField: {
    width: 250,
    // height: "22%",
    justifyContent: "center",
    marginBottom: 25,
    borderColor: PRIMARY_COLOR,
    borderRadius: 10,
    borderWidth: 2,
  },
  inputText: {
    color: "#000",
    fontSize: 16,
    padding: 15,
    // marginBottom: 10,
    // paddingLeft: 10,
  },
  inputShowIconContainer: {
    position: "absolute",
    right: 5,
    top: 2,
  },
  inputShowIconPressed: {
    color: "grey",
  },
  inputError: {
    color: "red",
    marginBottom: 5,
  },
  inputErrorMessageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
