import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Card from "../../components/UI/Card";
import { PRIMARY_COLOR } from "../../constants/styles";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("usd");
  const [pushNotifications, setPushNotifications] = useState(false);
  const appVersion = "1.0.0";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY_COLOR }}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.settingsTitle}>
          <Text style={styles.settingsText}>Settings</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.settingRow}>
            <Text style={styles.text}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={(value) => setDarkMode(value)}
            />
          </View>

          <View style={styles.settingRow}>
            <Text>Language</Text>
            <Picker
              selectedValue={language}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Spanish" value="es" />
              <Picker.Item label="Chinese" value="es" />
              <Picker.Item label="French" value="es" />
              <Picker.Item label="German" value="es" />
              <Picker.Item label="Arabic" value="es" />
              <Picker.Item label="Russian" value="es" />
            </Picker>
          </View>
          <View style={styles.settingRow}>
            <Text>Currency</Text>
            <Picker
              selectedValue={currency}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}
            >
              {/* Add your supported currencies here */}
              <Picker.Item label="USD" value="usd" />
              <Picker.Item label="EUR" value="eur" />
              <Picker.Item label="JPY" value="jpy" />
              <Picker.Item label="GBP" value="gbp" />
              <Picker.Item label="CAD" value="cad" />
            </Picker>
          </View>
          <View style={styles.settingRow}>
            <Text>Push Notifications</Text>
            <Switch
              value={pushNotifications}
              onValueChange={(value) => setPushNotifications(value)}
            />
          </View>

          <View
            style={{ //todo add shadow to fake card
              ...styles.touchableContainer,
              width: "80%",
              height: 200,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <View style={styles.touchableViewContainer}>
              <TouchableOpacity>
                <Text style={styles.link}>Terms and Conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.link}>Privacy Note</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.link}>Get Help</Text>
              </TouchableOpacity>
              <View style={styles.settingRow}>
                <Text Text style = {styles.linkVer}>Version</Text>
                <Text style = {styles.linkVer}>{appVersion}</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOut}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  settingsTitle: {

  },
  settingsText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FF5553",
    width: "100%"
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  touchableContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  touchableViewContainer: {},
  text: {
    color: "white",
  },
  link: {
    color: PRIMARY_COLOR,
    textDecorationLine: "underline",
    marginBottom: 10,
    fontSize: "16",
  },
  linkVer: {
    color: "#b01311",
    fontSize: "16",
  },
  picker: {
    width: 150,
    color: "white",
  },
  signOut: {
    color: "white",
    fontSize: 26,
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    paddingTop: 4,
    textAlignVertical: "center",
  },
  signOutButton: {
    borderColor: "white",
    backgroundColor: "#ff6966",
    borderWidth: 2,
    borderRadius: 50,
    width: "50%",
    height: "5%",
    marginBottom: 75,
  },
});

export default Settings;
