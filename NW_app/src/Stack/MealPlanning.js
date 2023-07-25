import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Text, Provider as PaperProvider } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';
import MyTheme from '../Components/MyTheme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const db = SQLite.openDatabase('mydatabase.db');

const MealPlanning = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, e_ID } = route.params;
  const addMealPlan = () => {
    navigation.navigate('Breakfast', { id,e_ID });
  };
  const [mealData, setMealData] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM meal WHERE meal_title_id=?', [id], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setMealData(temp);
      });
    });
  }, []);

  // Custom function to get the order of meal types
  const getMealOrder = (mealType) => {
    switch (mealType) {
      case 'Breakfast':
        return 1;
      case 'AMSnacks':
        return 2;
      case 'Lunch':
        return 3;
      case 'PMSnacks':
        return 4;
      case 'Dinner':
        return 5;
      default:
        return 6;
    }
  };

  const renderMealPlanCard = ({ item }) => {
    return (
      <Card style={styles.card}>
        <Card.Content>
        <Text style={styles.mealName}>Meal Time: {item.id}</Text>
        <Text style={styles.mealName}>Meal Time: {item.meal_title_id}</Text>
          <Text style={styles.mealTitle}>Meal {item.meal_name}</Text>
          <Text style={styles.mealName}>Meal Time: {item.meal_time}</Text>
          {/* You can customize how you want to display the meal data */}
        </Card.Content>
      </Card>
    );
  };

  // Sort mealData based on the meal type order
  const sortedMealData = mealData.sort(
    (a, b) => getMealOrder(a.meal_time) - getMealOrder(b.meal_time)
  );

  return (
    <PaperProvider theme={MyTheme}>
      <View style={styles.container}>
        {mealData.length === 0 && (
          <View style={styles.meabuttonContainer}>
            <TouchableOpacity style={styles.meabutton} onPress={addMealPlan}>
              <Text style={styles.buttonText}>
                <Ionicons name="add-circle-outline" size={20} color="black" /> Add
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {mealData.length === 0 ? (
            <Text style={styles.noPlanText}>Meal Plan not found</Text>
          ) : (
            sortedMealData.map((meal, index) => (
              <View key={index}>{renderMealPlanCard({ item: meal })}</View>
            ))
          )}
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#ffffff',
  },
  mealTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  mealName: {
    fontSize: 16,
    marginBottom: 8,
  },
  exchangeText: {
    marginBottom: 2,
  },
  foodText: {
    marginBottom: 6,
  },
  noPlanText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  meabutton: {
    width: '25%',
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  meabuttonContainer: {
    alignItems: 'flex-end',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#aaaaaa',
    marginLeft: 5,
  },
});

export default MealPlanning;
