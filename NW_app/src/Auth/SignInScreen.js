import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Logo from '../../assets/icon.png';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ setLoggedIn }) => {
  React.useEffect(() => {
    // Your refresh or reload logic here (if needed)
    // For example, you can reset form fields or clear any data on the screen.
    // If you need to fetch new data, you can do it here.

    // For instance, you can reset the form on each mount:
    // reset();
  }, []);
  const { height } = useWindowDimensions();

  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSignInPressed = async (data) => {
    try {
      const response = await fetch('https://nutriwise.website/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
  
      console.log('Result:', result);
      if (result.success) {
        await AsyncStorage.setItem('userAccountss', JSON.stringify({ username: data.username, password: data.password }));
        await AsyncStorage.setItem('userData', JSON.stringify(result.userData));
        setLoggedIn(true); // Update the isLoggedIn state
      } else {
        throw new Error(result.message); // Throw an error with the error message from the API response
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while signing in. Please try again later.');
    }
  };
  

  const onForgotPassPressed = () => {
    // Handle forgot password action
  };

  const onSignInGoogle = () => {
    // Handle sign in with Google action
  };

  const onSignUpPressed = () => {
    // navigation.navigate('SignUp');
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode='contain' />
        <Text style={styles.appname}>
          NutriWISE
        </Text>
        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{ required: 'Username is required!' }}
          icon="user"
          title="Username"
        />
        <CustomInput
          name="password"
          placeholder="Password"
          title="Password"
          control={control}
          secureTextEntry={true}
          rules={{ required: 'Password is required!', minLength: { value: 8, message: 'Password must be at least 8 characters' } }}
          icon="lock"
        />

        <CustomButton
          text="Sign In"
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Forgot Password?"
          onPress={onForgotPassPressed}
          type="tertiary"
        />

        <CustomButton
          text="Sign In with Google"
          onPress={onSignInGoogle}
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
        />

        <CustomButton
          text="Don't have an account? Sign Up"
          onPress={onSignUpPressed}
          type="tertiary"
        />
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
    marginTop: 5,
    marginBottom: 5,
  },
});

export default SignInScreen;
