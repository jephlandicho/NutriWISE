import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert,Modal,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Logo from '../../assets/icon.png';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpScreen from './SignUpScreen';

const SignInScreen = ({ setLoggedIn }) => {
  React.useEffect(() => {
  }, []);
  const { height } = useWindowDimensions();

  const { control, handleSubmit, formState: { errors } } = useForm();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
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
        await AsyncStorage.setItem('userAccountsss', JSON.stringify({ username: data.username, password: data.password }));
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


  const onSignUpPressed = () => {
    setShowSignUpModal(true); // Open the sign-up modal
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false); // Close the sign-up modal
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode='contain' />
        <Text style={styles.appname}>
          NutriWISE
        </Text>
        <Text style={styles.title}>
        Sign In your Account
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
        <View style={styles.line}></View>
        {/* <CustomButton
          text="Forgot Password?"
          onPress={onForgotPassPressed}
          type="tertiary"
        /> */}
        <CustomButton
            text="Don't have an account? Sign Up"
            onPress={onSignUpPressed}
            type="tertiary"
          />
      {/* Sign-up Modal */}
        <Modal
          animationType="fade" // You can choose other animation types
          transparent={false}
          visible={showSignUpModal}
          onRequestClose={closeSignUpModal}
        >
          <SignUpScreen closeSignInModal={closeSignUpModal}/>
        </Modal>    
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
}
});

export default SignInScreen;
