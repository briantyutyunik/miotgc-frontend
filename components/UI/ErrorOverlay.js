import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Button } from './Button';

export default function ErrorOverlay({ isVisible, errorMessage, onClose }){
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <Button
            title="OK"
            type="outline"
            onPress={onClose}
            containerStyle={styles.buttonContainer}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  errorMessage: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
});


