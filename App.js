import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { auth } from "./firebase";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

import AuthenticationScreen from "./screens/Authentication/AuthenticationScreen";
import SignInScreen from "./screens/Authentication/Sign In/SignInScreen";
import SignUpScreen from "./screens/Authentication/Sign Up/SignUpScreen";
import UserProfileScreen from "./screens/UserProfile/UserProfileScreen";

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Authentication" component={AuthenticationScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthNavigator />}
      {authCtx.isAuthenticated && <HomeNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
