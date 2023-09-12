import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView,Alert } from 'react-native';
import Logo from '../../assets/icon.png';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import { useForm, Controller } from 'react-hook-form';

const SignUpScreen = ({ closeSignInModal }) => {
  const { height } = useWindowDimensions();
  const { control, handleSubmit, formState: { errors },register } = useForm();

  const onRegPressed = async (data) => {
    const { password, repeatpassword } = data;
    if (password !== repeatpassword) {
      // Display an error message for repeatpassword
      Alert.alert('Password Error', 'Passwords do not match');
    } else {
      console.log(data);
      try {
        const response = await fetch('https://nutriwise.website/api/register.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      
        const textResponse = await response.text(); // Get the entire response as text
        console.log('Server Response:', textResponse);
        if( textResponse == "User registered successfully"){
          Alert.alert('Success', 'User Registered Successfully');
          closeSignInModal();
        }
        else if(textResponse == "User Already Exists"){
          Alert.alert('Error', 'Username or Email Already Exists');
        }
      } catch (error) {
        // Handle any network or other errors here
        console.error('Error:', error);
      }
    }
  };
  

  const onSignInPressed = () => {
    closeSignInModal();
  }


  return (
    <ScrollView>
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode='contain' />
        <Text style={styles.appname}>
          NutriWISE
        </Text>
        <Text style={styles.title}>
          Create an account
        </Text>

        <CustomInput
          name="Fullname"
          placeholder="Fullname"
          control={control}
          rules={{ required: 'Fullname is required!' }}
          icon="users"
          title="Fullname"
        />
        <CustomInput
          name="Username"
          placeholder="Username"
          control={control}
          rules={{ required: 'Username is required!' }}
          icon="user"
          title="Username"
        />

        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{ required: 'Email is required!' }}
          icon="mail"
          title="Email"
        />

        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          secureTextEntry={true}
          rules={{
            required: 'Password is required!',
            minLength: { value: 8, message: 'Password must be at least 8 characters' }
          }}
          icon="lock"
          title="Password"
        />

        <CustomInput
          name="repeatpassword"
          placeholder="Repeat Password"
          control={control}
          secureTextEntry={true}
          rules={{
            required: 'Repeat Password is required!',
            minLength: { value: 8, message: 'Password must be at least 8 characters' }
          }}
          icon="repeat"
          title="Repeat Password"
        />

        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegPressed)}
        />

        <CustomButton
          text="Have an account? Sign In"
          onPress={onSignInPressed}
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
    paddingTop: 5,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  }
});

export default SignUpScreen;
