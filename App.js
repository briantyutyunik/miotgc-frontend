import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "./firebase";
import { View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
// import Group from "./screens/Groups/Group";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Font from "expo-font";
import Group from "./screens/Groups/Group";
import AuthenticationScreen from "./screens/Authentication/AuthenticationScreen";
import SignInScreen from "./screens/Authentication/Sign In/SignInScreen";
import SignUpScreen from "./screens/Authentication/Sign Up/SignUpScreen";
import UserProfileScreen from "./screens/UserProfile/UserProfileScreen";
import Settings from "./screens/UserProfile/Settings";
import TestScreen from "./screens/UserProfile/TestScreen.js";
import { PRIMARY_COLOR } from "./constants/styles"


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); // Create the Tab variable

  {/*export default function App() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const unsubscribe = auth.getAuth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }

      });
      // Unsubscribe from the listener when the component unmounts
      return () => unsubscribe();
    }, []);*/}

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  function AuthNavigator() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Authentication" component={AuthenticationScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    );
  }
  
  //https://www.youtube.com/watch?v=gPaBicMaib4

  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
          height: 85,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: PRIMARY_COLOR,
          position: 'absolute',
          borderTopWidth: 0,
        },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
    
            if (route.name === 'UserProfile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Today') {
              iconName = focused ? 'document-text' : 'document-text-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
    
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'black',
          labelStyle: { fontSize: 14, fontWeight: 'bold' },
          style: { elevation: 5, shadowColor: '#000', borderTopColor: 'transparent', backgroundColor: 'transparent' },
        }}
      >
        <Tab.Screen name="UserProfile" component={UserProfileScreen} />
        <Tab.Screen name="Today" component={TestScreen} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    );
  }

  function HomeNavigator() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Group" component={Group} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    );
  }

  function Navigation() {
    return (
      <NavigationContainer>
        {!user && <AuthNavigator />}
        {!!user && <HomeNavigator />}
      </NavigationContainer>
    );
  }

  // Font.loadAsync({
  //   roboto: require("./constants/fonts/Roboto-Regular.ttf"),
  //   "roboto-medium": require("./constants/fonts/Roboto-Medium.ttf"),
  //   "roboto-thin": require("./constants/fonts/Roboto-Thin.ttf"),
  //   "roboto-bold": require("./constants/fonts/Roboto-Bold.ttf"),
  //   "roboto-black": require("./constants/fonts/Roboto-Black.ttf"),
  // });

  return (
    <>
      <Navigation />
    </>
  );
}
