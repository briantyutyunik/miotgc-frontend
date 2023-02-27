<<<<<<< HEAD
import React, { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
=======
import React, { useEffect, useState } from "react";
import LoginScreen from "./screens/Authentication/LoginScreen";
>>>>>>> 1d539ecc1e912dce582a32a34de33ee54076067c
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthenticationScreen from "./screens/Authentication/AuthenticationScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Authentication" component={AuthenticationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
