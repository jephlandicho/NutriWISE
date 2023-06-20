import React from 'react'
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ExchangeComputation from '../screens/MealPlanScreen/ExchangeComputation';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
            ></Stack.Screen>
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
            ></Stack.Screen>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
            ></Stack.Screen>
            <Stack.Screen
                name="ExchangeComputation"
                component={ExchangeComputation}
            ></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation