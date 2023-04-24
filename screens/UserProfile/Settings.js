import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { PRIMARY_COLOR } from "../../constants/styles";
import Background from "../../components/UI/Background";

const SettingsPage = () => {
  const [isToggle1On, setIsToggle1On] = useState(false);
  const [isToggle2On, setIsToggle2On] = useState(true);
  const [currencyType, setCurrencyType] = useState('USD');
  const [name, setName] = useState('Tahir Wordington');

  const toggleSwitch1 = () => setIsToggle1On(!isToggle1On);
  const toggleSwitch2 = () => setIsToggle2On(!isToggle2On);

  const handleCurrencyTypeChange = (type) => setCurrencyType(type);
  const handleNameChange = (newName) => setName(newName);
 // rename the file to groupsettings
  return (
    <Background>
      <View style={styles.settingsScreenContainer}Text>
          <Text style={styles.settingsTitle}>
            Group Settings
          </Text>
          <View style={styles.settingsEntry}>
            <Text style = {styles.settingsLabel} >Setting 1</Text>
            <Switch
              trackColor={styles.trackColor}
              thumbColor={isToggle1On ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch1}
              value={isToggle1On}
            />
          </View>
          <View style={styles.settingsEntry}>
            <Text style = {styles.settingsLabel}>Setting 2</Text>
            <Switch
              trackColor={styles.trackColor}
              thumbColor={isToggle2On ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch2}
              value={isToggle2On}
            />
          </View>
          <TouchableOpacity onPress={() => handleCurrencyTypeChange('USD')} style={{ paddingBottom: 20 }}>
            <Text>{`Currency Type: ${currencyType}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNameChange('Tahir Wordington')}>
            <Text>{`Name: ${name}`}</Text>
          </TouchableOpacity>
        </View>      
    </Background>
  );
};

const styles = StyleSheet.create({
  settingsTitle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    paddingBottom: 20,
    color: 'white',
  },
  settingsLabel: {
    color: 'white',
    padding: 10,
  },
  trackColor: {
    false: '#767577', 
    true: '#81b0ff',
  },
  settingsScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsEntry: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingBottom: 20
  }
});
export default SettingsPage;