import { View, Text } from 'react-native'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator();

function MyTabs(){
    return (
        <Tab.Navigator
        initialRouteName='Home'
        tabBarPosition={{
            activeTintColor: '#e91e63',
            labelStyle: {fontSize: 12},
            style: {backgroundColor: 'white'}
        }}
        >
            <Tab.Screen
            name="Home"
            component={HomeTab}
            options={{tabBarLabel: "Home"}}
            />
        </Tab.Navigator>
    )
}