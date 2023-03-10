import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import * as React from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../../firebase";

export default function UserProfileScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => {
          console.log(auth.getAuth().currentUser);
          auth.getAuth().signOut();
        }}
        title={"Log Out"}
      />
      <Text>Profile Page</Text>
    </View>
  );
}
