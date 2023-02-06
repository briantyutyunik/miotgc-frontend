import React, { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

const MainComponent = () => {
  return (
    <View>
      <Signup />
    </View>
  );
};

export default MainComponent;
