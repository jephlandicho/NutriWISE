import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import React, {useState} from 'react'
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm,Controller} from 'react-hook-form';




const SignUpScreen = () => {
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const {control,handleSubmit,formState:{errors}} = useForm();

    const onRegPressed = data => {
      console.log(data);
    }

    const onRegGoogle = () => {

    }

    
    const onSignInPressed = () => {
      navigation.navigate('SignIn');
    }
    

  return (
    <ScrollView>
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode='contain' />
      <Text style={styles.appname}>
        NutriWISE
      </Text>
      <Text style={styles.title}>
        Create an account
      </Text>
      <CustomInput
        name="Username"
        placeholder="Username"
        control={control}
        rules={{required: 'Username is required!'}}
        icon="user"
      />

      <CustomInput
        name="email"
        placeholder="Email"
        control={control}
        rules={{required: 'Email is required!'}}
        icon="mail"
      />

      <CustomInput
        name="password"
        placeholder="Password"
        control={control}
        secureTextEntry={true}
        rules={{required: 'Password is required!',minLength:{value:8,message: 'Password must be at least 8 characters'}}}
        icon="lock"
      />

      <CustomInput
        name="repeatpassword"
        placeholder="Repeat Password"
        control={control}
        secureTextEntry={true}
        rules={{required: 'Repeat Password is required!',minLength:{value:8,message: 'Password must be at least 8 characters'}}}
        icon="repeat"
      />

    <Text>
      Lorem ipsum dolor sit amet, consectetur adip
    </Text>

      <CustomButton
      text="Register"
      onPress={handleSubmit(onRegPressed)}
      />

    <CustomButton
        text="Register with Google"
        onPress={onRegGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
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
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    }
  });

export default SignUpScreen