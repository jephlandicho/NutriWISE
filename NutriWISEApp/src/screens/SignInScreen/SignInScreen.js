import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import React, {useState} from 'react'
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm,Controller} from 'react-hook-form';

const SignInScreen = () => {
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const {control,handleSubmit,formState:{errors}} = useForm();

    const onSignInPressed = data => {
      console.log(data);
      navigation.navigate('HomeScreen');
      
    }

    const onForgotPassPressed = () => {

    }

    const onSignInGoogle = () => {

    }

    
    const onSignUpPressed = () => {
      navigation.navigate('SignUp');
    }
    

  return (
    <ScrollView>
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode='contain' />
      <Text style={styles.appname}>
        NutriWISE
      </Text>
      <CustomInput
        name="Username"
        placeholder="Username"
        control={control}
        rules={{required: 'Username is required!'}}
        icon="user"
      />
      <CustomInput
        name="password"
        placeholder="Password"
        control={control}
        secureTextEntry={true}
        rules={{required: 'Password is required!',minLength:{value:8,message: 'Password must be at least 8 characters'}}}
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
        paddingTop: 60,

    },
    logo: {
      width: '50%',
      maxWidth: 300,
      maxHeight: 200,
      
    },
    appname:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
    }
  });

export default SignInScreen