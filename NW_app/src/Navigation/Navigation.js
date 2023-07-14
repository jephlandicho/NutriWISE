import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import Home from '../BottomTab/Home';
import Client from '../BottomTab/Client';
import MealPlan from '../BottomTab/MealPlan';
import Anthro from '../Stack/Anthro';
import Classes from '../BottomTab/Classes';
import Settings from '../BottomTab/Settings';
import ExchangeComputation from '../Stack/ExchangeComputation';
import ExchangeDistribution from '../Stack/ExchangeDistribution';
import MealPlanResult from '../Stack/MealPlanResult';
import MeasurementSummary from '../Stack/MeasurementSummary';
import ClientMeasurements from '../Stack/ClientMeasurements';
import Exchanges from '../Stack/Exchanges';

import Breakfast from '../Stack/MealPlanning/Breakfast';
import AMSnacks from '../Stack/MealPlanning/AMSnack';
import Lunch from '../Stack/MealPlanning/Lunch';
import PMSnacks from '../Stack/MealPlanning/PMSnacks';
import Dinner from '../Stack/MealPlanning/Dinner';

import { ResultProvider } from '../Components/ResultContext';

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
        name='Clients'
        component={StackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, { width: wp('30%') }]}>
              <Ionicons
                name={focused ? 'ios-person' : 'ios-person-outline'}
                size={wp('6%')} // Use responsive values
                style={{
                  color: focused ? '#78B878' : '#bcc7bc',
                }}
              />
              <Text style={{ color: focused ? '#78B878' : '#bcc7bc' }}>
                Clients
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='MealPlan'
        component={MealPlanScreens}
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
              MealPlan
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
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center', // Center-align the header title
        headerLeftContainerStyle: { marginLeft: 10 }, // Add margin to the left of the header left component
      }}
    >
    <Stack.Screen
        name='Client'
        component={Client}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Anthro')}>
              <Ionicons style={{ marginRight: 15 }} size={24} name="arrow-forward"/>
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
                Clients
              </Text>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name='Anthro'
        component={Anthro}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Exchange Computation')}>
              <Ionicons style={{ marginRight: 15 }} size={24} name="arrow-forward"/>
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
                Client Information
              </Text>
            </View>
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
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
              Exchange Computation
              </Text>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name='Exchange Distribution'
        component={ExchangeDistribution}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('MeasurementSummary')}>
              <Ionicons style={{ marginRight: 15 }} size={24} name="arrow-forward"/>
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
              Exchange Distribution
              </Text>
            </View>
          ),
        })}
      />
            <Stack.Screen
        name='MeasurementSummary'
        component={MeasurementSummary}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
                Client Assessment
              </Text>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name='ClientMeasurements'
        component={ClientMeasurements}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
                Client Measurements
              </Text>
            </View>
          ),
        })}
      />
        <Stack.Screen
        name='Exchanges'
        component={Exchanges}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
                Food Exchanges
              </Text>
            </View>
          ),
        })}
      />


    </Stack.Navigator>
  );
}

function MealPlanScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center', // Center-align the header title
        headerLeftContainerStyle: { marginLeft: 10 }, // Add margin to the left of the header left component
      }}

    >
      <Stack.Screen
        name='MealInfo'
        component={MealPlan}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Breakfast')}>
              <Ionicons style={{ marginRight: 15 }} size={24} name="arrow-forward"/>
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
                Meal Information
              </Text>
            </View>
          ),
        })}
      />
    <Stack.Screen
        name='Breakfast'
        component={Breakfast}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('MealPlanResult')}>
              <Ionicons style={{ marginRight: 15 }} size={24} name="arrow-forward"/>
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
                Breakfast
              </Text>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name='AMSnacks'
        component={AMSnacks}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Lunch')}>
              <Ionicons style={{ marginRight: 15 }} size={24} name="arrow-forward"/>
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
                AM Snacks
              </Text>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name='Lunch'
        component={Lunch}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('PMSnacks')}>
              <Ionicons style={{ marginRight: 15 }} size={24} name="arrow-forward"/>
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
                Lunch
              </Text>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name='PMSnacks'
        component={PMSnacks}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Dinner')}>
              <Ionicons style={{ marginRight: 15 }} size={24} name="arrow-forward"/>
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
                PM Snacks
              </Text>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name='Dinner'
        component={Dinner}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
                Dinner
              </Text>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name='MealPlanResult'
        component={MealPlanResult}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
                Meal Plan
              </Text>
            </View>
          ),
        })}
      />

    </Stack.Navigator>
  )
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <ResultProvider>
        <TabNavigator />
      </ResultProvider>
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
  headerTitleCon:{
    flexDirection: 'row', alignItems: 'center'
  },
  headerTitle:{
    fontSize: 18, fontWeight: 'bold', marginRight: 5
  }
});

export default Navigation;
