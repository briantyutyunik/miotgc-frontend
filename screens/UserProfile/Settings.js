import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PRIMARY_COLOR } from '../../constants/styles';
import Background from '../../components/UI/Background';
import CustomPicker from '../../components/UI/CustomPicker';

const languages = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
];

const currencies = [
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
  { label: 'GBP', value: 'gbp' },
];

export default function Settings() {
  const [language, setLanguage] = useState(languages[0].value);
  const [currency, setCurrency] = useState(currencies[0].value);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Background>
      <View style={styles.settingsScreenContainer}>
        <Text style={styles.heading}>Settings</Text>

        <Text style={styles.label}>Language</Text>
        <CustomPicker
          selectedValue={language}
          onValueChange={setLanguage}
          items={languages}
          style={styles.picker}
        />

        <Text style={styles.label}>Currency</Text>
        <CustomPicker
          selectedValue={currency}
          onValueChange={setCurrency}
          items={currencies}
          style={styles.picker}
        />

        <View style={styles.darkModeContainer}>
          <Text style={styles.label}>Dark Mode</Text>
          <TouchableOpacity
            style={[styles.darkModeSwitch, darkMode ? styles.darkModeOn : styles.darkModeOff]}
            onPress={() => setDarkMode(!darkMode)}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  settingsTitle: {},
  settingsText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FF5553",
    width: "100%",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  touchableContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 30,
  },
  darkModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  darkModeSwitch: {
    width: 40,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  darkModeOn: {
    backgroundColor: 'black',
  },
  darkModeOff: {
    backgroundColor: 'white',
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
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
