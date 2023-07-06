import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';


const FloatingButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <Icon name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      );
      
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
         // Adjust the percentage as per your preference
        right: '5%', // Adjust the percentage as per your preference
        width: '12%', // Adjust the percentage as per your preference
        height: '7%', // Adjust the percentage as per your preference
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
      },
      
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default FloatingButton;
