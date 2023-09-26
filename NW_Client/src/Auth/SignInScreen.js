import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert,Modal,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Logo from '../../assets/icon.png';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ setLoggedIn }) => {
  React.useEffect(() => {
  }, []);
  const { height } = useWindowDimensions();

  const { control, handleSubmit, formState: { errors } } = useForm();

  const onPressed = async (data) => {
    try {
      const response = await fetch('https://nutriwise.website/api/clientID.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
  
      console.log('Result:', result);
      if (result.success) {
        await AsyncStorage.setItem('clientDataaaa', JSON.stringify(result.userData));
        setLoggedIn(true); // Update the isLoggedIn state
      } else {
        throw new Error(result.message); // Throw an error with the error message from the API response
      }
    } catch (error) {
      Alert.alert('Wrong Details', 'It seems like your client ID is incorrect, Please try again.');
    }
  };
  

  const onForgotPassPressed = () => {
    // Handle forgot password action
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode='contain' />
        <Text style={styles.appname}>
          NutriWISE Client
        </Text>
        <Text style={styles.title}>
        Enter your ClientID to view your meal plan
      </Text>
        <CustomInput
          name="ClientID"
          placeholder="ClientID"
          control={control}
          rules={{ required: 'ClientID is required!' }}
          icon="user"
          title="ClientID"
          numeric='true'
        />
        <CustomButton
          text="Get Meal Plan"
          onPress={handleSubmit(onPressed)}
        />
        <View style={styles.line}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 50,
    paddingTop: 10,
    backgroundColor: 'white'
  },
  logo: {
    width: '50%',
    maxWidth: 300,
    maxHeight: 200,
  },
  appname: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  title:{
    fontSize: 15,
    color: '#051C60',
    margin: 10,
    marginBottom: '50%',
}
});

export default SignInScreen;
