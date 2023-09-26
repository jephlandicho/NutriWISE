import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import Home from '../BottomTab/Home';
import Settings from '../BottomTab/Settings';
import { ResultProvider } from '../Components/ResultContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function FloatingTabIcon({ name, size, focused, style, label }) {
  const sizeIncrease = focused ? 10 : 0; // Increase size by 10 when focused

  const translateY = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    let timeout;

    if (focused) {
      timeout = setTimeout(() => {
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: -20, // Adjust the floating distance as needed
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.spring(scale, {
              toValue: 1.2, // Increase scale by 20% when focused
              useNativeDriver: true,
            }),
            Animated.spring(scale, {
              toValue: 1, // Return scale to original size
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      }, 200); // Adjust the delay duration as needed
    } else {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => clearTimeout(timeout);
  }, [focused, translateY, scale]);

  const iconSize = size + sizeIncrease; // Apply size increase when focused
  const iconColor = focused ? '#78B878' : '#bcc7bc';
  const labelColor = focused ? '#78B878' : '#bcc7bc';
  const shadowStyle = focused ? styles.shadow : null;

  return (
    <Animated.View style={[styles.floatingTabIconContainer, shadowStyle, { transform: [{ translateY }, { scale }] }]}>
      <Ionicons name={name} size={iconSize} color={iconColor} style={style} />
      <Text style={[styles.tabLabel, { color: labelColor }]}>{label}</Text>
    </Animated.View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route, focused }) => ({
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
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          }

          return (
            <FloatingTabIcon
              name={iconName}
              size={size}
              color={color}
              focused={focused}
              style={styles.floatingTabIcon}
              label={route.name}
            />
          );
        },
      })}
    >
      <Tab.Screen name='Home' component={Home}
      options={{
          headerShown: false,
        }} />
      <Tab.Screen name='Settings' component={SettingsScreen} 
      options={{
        headerShown: false,
      }}/>
    </Tab.Navigator>
  );
}



function SettingsScreen(){
  return(
    <Stack.Navigator
    screenOptions={{
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center', // Center-align the header title
      headerLeftContainerStyle: { marginLeft: 10 }, // Add margin to the left of the header left component
    }}>
      <Stack.Screen
        name='Settingss'
        component={Settings}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={styles.headerTitleCon}>
              <Text style={styles.headerTitle}>
                Settings
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
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleCon:{
    flexDirection: 'row', alignItems: 'center'
  },
  headerTitle:{
    fontSize: 18, fontWeight: 'bold', marginRight: 5
  },
  floatingTabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#78B878',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  tabLabel: {
    fontSize: 12, // Adjust the font size as needed
    marginTop: 4, // Adjust the spacing between icon and label as needed
  },
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
});

export default Navigation;
