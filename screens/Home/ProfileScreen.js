import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View, Text, Button } from "react-native";
export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title={"Go Back"} />
      <Text>Profile Page</Text>
    </View>
  );
}
