import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { Avatar, Card, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyTheme from '../Components/MyTheme';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mydatabase.db');

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('clientInfoo');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUserData(parsedUserData);
      } else {
        // User data doesn't exist in local storage
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const otherData = [
    {
      title: 'Nutritional Status',
      description: userData ? userData.remarks : '',
    },
    {
      title: 'Body Mass Index',
      description: userData ? userData.BMI + ' kg/m²' : '',
    }
  ];
  const otherData1 = [
    {
      title: 'Weight',
      description: userData ? userData.weight + ' kg' : '',
    },
    {
      title: 'Height',
      description: userData ? userData.height + ' m' : '',
    },
  ];

  return (
    <PaperProvider theme={MyTheme}>
      <View style={styles.container}>
        
          {userData && (
            <View style={styles.header}>
              <Avatar.Text size={64} label={userData.name.charAt(0).toUpperCase()} />
              <Text style={styles.userName}>{userData.name}</Text>
              <Text>   {userData.sex}</Text>
            </View>
          )}
        
        <Card style={styles.dietPresCard}>
            <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Diet Prescription</Text>
              <Text style={styles.cardText}>{userData ? userData.TER : ''} kcal</Text>
                <View style={styles.nutrientRow}>
                  <View style={styles.nutrientColumn}>
                    <Text style={styles.nutrientLabel}>Carbohydrates</Text>
                    <Text style={styles.nutrientValue}>
                      {userData ? userData.carbs : ''} g
                    </Text>
                  </View>
                  <View style={styles.nutrientColumn}>
                    <Text style={styles.nutrientLabel}>Protein</Text>
                    <Text style={styles.nutrientValue}>
                      {userData ? userData.protein : ''} g
                    </Text>
                  </View>
                  <View style={styles.nutrientColumn}>
                    <Text style={styles.nutrientLabel}>Fats</Text>
                    <Text style={styles.nutrientValue}>
                      {userData ? userData.fats : ''} g
                    </Text>
                  </View>
                </View>
            </View>
          </Card>
          <ScrollView>
          {/* Render the other cards */}
          <View style={styles.cardsRow}>
            {otherData.map((item) => (
              <Card key={item.title} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle1}>{item.title}</Text>
                  <Text style={styles.cardText}>{item.description}</Text>
                </View>
              </Card>
            ))}
            </View>
            <View style={styles.cardsRow}>
            {otherData1.map((item) => (
              <Card key={item.title} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle1}>{item.title}</Text>
                  <Text style={styles.cardText}>{item.description}</Text>
                </View>
              </Card>
            ))}
            </View>
          {/* Add more cards or components for the to-do list, announcements, attendance, resources, etc. */}
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Background color for the entire screen
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  userName: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // User name text color
  },
  dietPresCard: {
    margin: 10,
    borderRadius: 30,
    elevation: 4,
    backgroundColor: '#abc88f', // Card background color for "Diet Prescription"
    width: 370,
    height: 160,
  },
  card: {
    margin: 5,
    borderRadius: 20, // Increase card border radius for a modern look
    elevation: 4,
    backgroundColor: '#fff', // Card background color
    width: 160,
    height: 90
  },
  cardContent: {
    alignItems: 'center', // Center the content horizontally
    padding: 15,
  },
  cardTitle1:{
    textAlign: 'center', // Center the text horizontally
    fontSize: 18, // Increase font size for better readability
    color: '#000000', // Text color
    marginBottom: 10,
  },
  cardTitle:{
    fontSize: 25, // Increase font size for better readability
    color: '#ffffff', // Text color
    marginBottom: 10,
    fontWeight: 'bold',
  },
  cardText: {
    textAlign: 'center', // Center the text horizontally
    fontSize: 24, // Increase font size for better readability
    color: '#004e04',  // Text color
    fontWeight: 'bold',
  },
  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  nutrientColumn: {
    flex: 1,
    alignItems: 'center',
  },
  nutrientLabel: {
    fontSize: 16,
    color: '#ffffff',
  },
  nutrientValue: {
    fontSize: 18,
    color: '#000000',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default Home;
