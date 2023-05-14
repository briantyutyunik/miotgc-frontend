import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { PRIMARY_COLOR } from '../../constants/styles';
import Background from '../../components/UI/Background';
import CustomPicker from '../../components/UI/CustomPicker';
import CardDarker from "../../components/UI/CardDarker";
import Seperator from "../../components/UI/Seperator";
import { Separator } from 'react-native-btr';


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
          <Separator/> 
          <Text style={styles.heading}>Settings</Text>

          <CardDarker additionalStyles={styles.cardStyle}>
            <View>
              <Text style={styles.settingHeading}>App Settings</Text>
            </View>
            <Separator/>
            <View style={styles.rowContainer}>
              <Text style={styles.label}>Language</Text>
              <CustomPicker
                selectedValue={language}
                onValueChange={setLanguage}
                items={languages}
                style={styles.picker}
              />
            </View>
            <Separator/>

            <View style={styles.rowContainer}>
              <Text style={styles.label}>Currency</Text>
              <CustomPicker
                selectedValue={currency}
                onValueChange={setCurrency}
                items={currencies}
                style={styles.picker}
              />
            </View>
            <Separator/>

            <View style={styles.rowContainer}>
              <Text style={styles.label}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                style={styles.switch}
              />
            </View>
            <Separator/>
          </CardDarker>

          <CardDarker>
            <View>
              <Text style={styles.settingHeading}>Support</Text>
            </View>
            <Separator/>
            
            <View style={styles.rowContainer}>
              <TouchableOpacity>
                <Text style={styles.label}>Report a Bug</Text>
              </TouchableOpacity>
            </View>
            <Separator/>

            <View style={styles.rowContainer}>
              <TouchableOpacity>
                <Text style={styles.label}>Contact Us</Text>
              </TouchableOpacity>
            </View>
            <Separator/>

            <View style={styles.rowContainer}>
              <TouchableOpacity>
                <Text style={styles.label}>Visit Our Help Center</Text>
              </TouchableOpacity>
            </View>
            <Separator/>

            <View style={styles.rowContainer}>
              <TouchableOpacity>
                <Text style={styles.label}>Terms of Service</Text>
              </TouchableOpacity>
            </View>
            <Separator/>
          </CardDarker>

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </Background>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    marginBottom: 10,
  },
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
    //borderTopLeftRadius: 20,
    //borderTopRightRadius: 20,
  },
  heading: {
    color: "white",
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  settingHeading: {
    color: "black",
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  label: {
    color: "black",
    padding: "2.5%",
    fontSize: 17,
  },
  picker: {
    flex: 1,
    paddingLeft: 5,
    paddingBottom: 2,
    paddingTop: 2,
    paddingRight: 5,
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
   
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
