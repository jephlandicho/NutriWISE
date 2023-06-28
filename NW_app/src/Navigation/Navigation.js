import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Home from '../BottomTab/Home';
import MealPlan from '../BottomTab/MealPlan';
import Classes from '../BottomTab/Classes';
import Settings from '../BottomTab/Settings';
import ExchangeComputation from '../Stack/ExchangeComputation';
import MealPlanning from '../Stack/MealPlanning';
import ExchangeDistribution from '../Stack/ExchangeDistribution';
import Try from '../Stack/Try';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            position: 'absolute',
            bottom: hp('2%'), // Use responsive values
            left: wp('5%'), // Use responsive values
            right: wp('5%'), // Use responsive values
            elevation: 0,
            backgroundColor: '#FFFFFF',
            borderRadius: wp('7%'), // Use responsive values
            height: hp('9%'), // Use responsive values
            ...styles.shadow,
          },
        ],
      })}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, { width: wp('20%') }]}>
              <Ionicons
                name={focused ? 'ios-home' : 'ios-home-outline'}
                size={wp('6%')} // Use responsive values
                style={{
                  color: focused ? '#78B878' : '#bcc7bc',
                }}
              />
              <Text style={{ color: focused ? '#78B878' : '#bcc7bc' }}>
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='MealPlan'
        component={StackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, { width: wp('30%') }]}>
              <Ionicons
                name={focused ? 'ios-restaurant' : 'ios-restaurant-outline'}
                size={wp('6%')} // Use responsive values
                style={{
                  color: focused ? '#78B878' : '#bcc7bc',
                }}
              />
              <Text style={{ color: focused ? '#78B878' : '#bcc7bc' }}>
                MEAL PLAN
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Classes'
        component={Classes}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, { width: wp('20%') }]}>
              <Ionicons
                name={focused ? 'ios-book' : 'ios-book-outline'}
                size={wp('6%')} // Use responsive values
                style={{
                  color: focused ? '#78B878' : '#bcc7bc',
                }}
              />
              <Text style={{ color: focused ? '#78B878' : '#bcc7bc' }}>
                CLASSES
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, { width: wp('20%') }]}>
              <Ionicons
                name={focused ? 'ios-settings' : 'ios-settings-outline'}
                size={wp('6%')} // Use responsive values
                style={{
                  color: focused ? '#78B878' : '#bcc7bc',
                }}
              />
              <Text style={{ color: focused ? '#78B878' : '#bcc7bc' }}>
                SETTINGS
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Meal Plan'
        component={MealPlan}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Exchange Computation')}>
              <Ionicons style={{ marginRight: 15 }} size={24} name="arrow-forward"/>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name='Exchange Computation'
        component={ExchangeComputation}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Exchange Distribution')}>
              <Ionicons style={{ marginRight: 15 }} size={24} name="arrow-forward"/>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name='Exchange Distribution'
        component={ExchangeDistribution}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Try')}>
              <Ionicons style={{ marginRight: 15 }} size={24} name="arrow-forward"/>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name='Meal Planning'
        component={MealPlanning}
      />
        <Stack.Screen
        name='Try'
        component={Try}
      />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#78B878',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Navigation;
