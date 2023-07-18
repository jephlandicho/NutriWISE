import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SyncComponent from './SyncComponent';

const SyncButton = () => {
  const handleSyncButtonClick = () => {
    // Call the synchronization function from SyncComponent when the button is clicked
    SyncComponent();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSyncButtonClick} style={styles.button}>
        <Text style={styles.buttonText}>Sync Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SyncButton;
