import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR } from '../../constants/styles';
import Background from '../../components/UI/Background';
import CustomPicker from '../../components/UI/CustomPicker';
import CardDarker from "../../components/UI/CardDarker";
import Card from '../../components/UI/CardDarker';

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
    <SafeAreaView style={styles.safe}>
      <Background>
        <View style={styles.settingsScreenContainer}>
          <Text style={styles.heading}>Settings</Text>
          <CardDarker>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Language</Text>
            <CustomPicker
              selectedValue={language}
              onValueChange={setLanguage}
              items={languages}
              style={styles.picker}
            />
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.label}>Currency</Text>
            <CustomPicker
              selectedValue={currency}
              onValueChange={setCurrency}
              items={currencies}
              style={styles.picker}
            />
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.label}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              style={styles.switch}
            />
          </View>
          </CardDarker>
          

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  settingsScreenContainer: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: PRIMARY_COLOR,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading: {
    color: "white",
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  label: {
    color: "black",
    padding: "2.5%",
    fontSize: 18,
  },
  picker: {
    width: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.425)',
  },
  switch: {
    width: '30%',
  },
  logoutButton: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 30,
  },
  logoutText: {
    color: "black",
    fontSize: 16,
  },
});
