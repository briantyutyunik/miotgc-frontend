import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Login from './pages/Login';
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
      <Login />
    </View>
  ); 
};

export default MainComponent;