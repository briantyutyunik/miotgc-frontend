import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthenticationScreen from "./screens/Authentication/AuthenticationScreen";
import SignInScreen from "./screens/Authentication/Sign In/SignInScreen";
import SignUpScreen from "./screens/Authentication/Sign Up/SignUpScreen";
import ProfileScreen from "./screens/Home/ProfileScreen";

const AuthenticationStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen
        name="Authentication"
        component={AuthenticationScreen}
      />
      <AuthenticationStack.Screen name="SignIn" component={SignInScreen} />
      <AuthenticationStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthenticationStack.Navigator>
  );
};

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Profile" component={UserProfileScreen} />
    </HomeStack.Navigator>
  );
};
