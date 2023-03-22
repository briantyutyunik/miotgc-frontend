import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker'; // Importing the image picker library

const navigation = useNavigation();

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  // Function to open the image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Function to handle the password change
  const handlePasswordChange = () => {
    if (password) {
      // TODO: Implement password change logic
      Alert.alert('Password changed successfully');
    } else {
      Alert.alert('Please enter a new password');
    }
  };

  // Function to handle the profile photo removal
  const handleRemovePhoto = () => {
    setImage(null);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {image ? (
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 75 }} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={{ width: 150, height: 150, borderRadius: 75 }} />
        </TouchableOpacity>
      )}
      <Text style={{ fontSize: 20 }}>{`${firstName} ${lastName}`}</Text>
      <Text>{email}</Text>
      <Text>{phoneNumber}</Text>
      <TextInput
        placeholder="New password"
        secureTextEntry
        style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: 20 }}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity onPress={handlePasswordChange}>
        <Text style={{ color: 'blue', marginTop: 10 }}>Change password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRemovePhoto}>
        <Text style={{ color: 'red', marginTop: 10 }}>Remove profile photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;