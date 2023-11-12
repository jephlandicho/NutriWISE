import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert, useWindowDimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import Logo from '../../assets/icon.png';

const db = SQLite.openDatabase('client.db');



const SignInScreen = ({ setLoggedIn }) => {
  React.useEffect(() => {
    // Create the meal_plan table if it doesn't exist
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS m_plans (
          meal_title TEXT,
          meal_name TEXT,
          meal_time TEXT,
          food REAL,
          household_measurement TEXT
        )`,
        [],
        () => {
          console.log('meal_plan table created successfully');
        },
        (error) => {
          console.error('Error creating meal_plan table:', error);
        }
      );
    });
  }, []);

  const { control, handleSubmit } = useForm();

  const onPressed = async (data) => {
    try {
      // Fetch meal plan data from the API
      const mealPlanResponse = await fetch('https://nutriwise.website/api/mealplan.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const mealPlanData = await mealPlanResponse.json();
      console.log(mealPlanData);

      // Insert the fetched data into the meal_plan table using SQLite
      db.transaction((tx) => {
        mealPlanData.clientMealPlan.forEach((mealPlanItem) => {
          tx.executeSql(
            'INSERT INTO m_plans (meal_title,meal_name,meal_time ,food, household_measurement) VALUES (?,?, ?, ?, ?);',
            [
              mealPlanItem.meal_title,
              mealPlanItem.meal_name,
              mealPlanItem.meal_time,
              mealPlanItem.food_id,
              mealPlanItem.household_measurement,
            ],
            () => {
              console.log('Meal plan data inserted successfully');
            },
            (error) => {
              console.error('Error inserting meal plan data:', error);
            }
          );
        });
      });

      // Now, fetch the client ID data
      const response = await fetch('https://nutriwise.website/api/clientID.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      console.log('Result:', result);
      if (result.success) {
        await AsyncStorage.setItem('infoClient', JSON.stringify(result.userData));
        setLoggedIn(true); // Update the isLoggedIn state
      } else {
        throw new Error(result.message); // Throw an error with the error message from the API response
      }
    } catch (error) {
      Alert.alert('Wrong Details', 'It seems like your client ID is incorrect, Please try again.');
    }
  };

  const { height } = useWindowDimensions();

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode='contain' />
        <Text style={styles.appname}>
          NutriWISE Client
        </Text>
        <Text style={styles.title}>
          Enter your ClientID to view your meal plan
        </Text>
        <CustomInput
          name="ClientID"
          placeholder="ClientID"
          control={control}
          rules={{ required: 'ClientID is required!' }}
          icon="user"
          title="ClientID"
          numeric='true'
        />
        <CustomButton
          text="Get Meal Plan"
          onPress={handleSubmit(onPressed)}
        />
        <View style={styles.line}></View>
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
    fontSize: 15,
    color: '#051C60',
    margin: 10,
    marginBottom: '50%',
  },
  line: {
    // Define your line styles here
  },
});

export default SignInScreen;
