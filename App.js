import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthenticationNavigator, HomeNavigator } from "./navigation";
import { auth } from "./firebase";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  // useEffect(() => {
  //   // Check if the user is logged in
  //   const userIsLoggedIn = auth.getAuth().currentUser;
  //   console.log(userIsLoggedIn);
  //   setIsLoggedIn(userIsLoggedIn);
  // }, []);
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthenticationNavigator} />
          <Stack.Screen name="Home" component={HomeNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

export default App;
