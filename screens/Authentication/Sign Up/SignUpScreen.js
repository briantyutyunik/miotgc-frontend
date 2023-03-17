import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { PRIMARY_COLOR } from "../../../constants/styles";

import Background from "../../../components/UI/Background";
import Logo from "../../../components/UI/Logo";

import { auth, userSignIn } from "../../../firebase";
import UserAvatar from "../../../components/UI/UserAvatar";
import User from "../../../models/User";
import AuthInput from "../../../components/Auth/Sign In/AuthInput";
import Button from "../../../components/UI/Button";
import Card from "../../../components/UI/Card";
import Line from "../../../components/UI/Line";

export default function SignUpScreen() {
  const [formValues, setFormValues] = useState(User);

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
            <AuthInput
              placeholder="First Name"
              containerStyle={[styles.nameContainerStyle, { marginRight: 5 }]}
            />
            <AuthInput
              placeholder="Last Name"
              containerStyle={[styles.nameContainerStyle, { marginLeft: 5 }]}
            />
          </View>
          <AuthInput placeholder="User Name" />
          <AuthInput placeholder="Phone Number" />
          <AuthInput placeholder="Birthdate (mm/dd/yyyy)" />
          <AuthInput placeholder="Email address" inputType="email" />
          <AuthInput placeholder="Password" inputType="password" secure />
        </ScrollView>
      </Card>
      <Button
        containerStyle={styles.signUpButtonContainer}
        iconName={"arrow-forward-outline"}
        iconSize={40}
        iconColor={PRIMARY_COLOR}
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
    width: "75%",
    justifyContent: "space-between",
  },
  avatarContainerStyle: {
    backgroundColor: PRIMARY_COLOR,
    marginBottom: 30,
    // position: "absolute",
  },
  authInputContainer: {
    width: "90%",
    top: "10%",
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
  signUpHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: PRIMARY_COLOR,
  },
});
