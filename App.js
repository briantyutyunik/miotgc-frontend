import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "./firebase";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import Group from "./screens/Groups/Group";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Group from "./screens/Groups/Group";
import AuthenticationScreen from "./screens/Authentication/AuthenticationScreen";
import SignInScreen from "./screens/Authentication/Sign In/SignInScreen";
import SignUpScreen from "./screens/Authentication/Sign Up/SignUpScreen";
import UserProfileScreen from "./screens/UserProfile/UserProfileScreen";
import Settings from "./screens/UserProfile/Settings";
import TestScreen from "./screens/UserProfile/TestScreen.js";
import Itinerary from "./screens/Groups/Itinerary";
import EditProfile from "./screens/UserProfile/EditProfile.js";
import { PRIMARY_COLOR } from "./constants/styles";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); // Create the Tab variable

{
	/*export default function App() {
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
    }, []);*/
}

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
						bottom: 25,
						left: 20,
						right: 20,
						elevation: 0,
						borderRadius: 15,
						height: 80,
						paddingTop: "7%",
						backgroundColor: "#ffffff",
						position: "absolute",
						borderTopWidth: 0,
						justifyContent: "center",
						...styles.shadow,
					},
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === "UserProfile") {
							iconName = focused ? "person" : "person-outline";
						} else if (route.name === "TestScreen") {
							iconName = focused ? "document-text" : "document-text-outline";
						} else if (route.name === "Settings") {
							iconName = focused ? "settings" : "settings-outline";
						}

						return <Ionicons name={iconName} size={size} color={color} />;
					},
				})}
				tabBarOptions={{
					showLabel: false,
					activeTintColor: PRIMARY_COLOR,
					inactiveTintColor: "black",
					labelStyle: { fontSize: 14, fontWeight: "bold" },
					justifyContent: "center",
					style: {
						elevation: 5,
						shadowColor: "#000",
						borderTopColor: "transparent",
						backgroundColor: "transparent",
					},
				}}>
				<Tab.Screen name="UserProfile" component={UserProfileScreen} />
				{/*<Tab.Screen name="TestScreen" component={TestScreen} />*/}
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
				<Stack.Screen name="Itinerary" component={Itinerary} />
				<Stack.Screen name="EditProfile" component={EditProfile} />
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
const styles = StyleSheet.create({
	shadow: {
		shadowColor: "#000000",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
});
