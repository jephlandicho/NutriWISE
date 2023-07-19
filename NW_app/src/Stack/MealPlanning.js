import { StyleSheet, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card, Text } from 'react-native-paper';
import foodsData from '../meals/foods.json';
import { useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mydatabase.db');
// Assuming you have set up your SQLite database connection and exported it as 'db'

// Function to get all meal plans with their corresponding meal title
const getAllMealPlans = (mealTitleId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT mp.*, m.meal_title_id, m.meal_name AS meal_title_name FROM meal_plan mp
         JOIN meal m ON mp.meal_name_id = m.id
         WHERE m.meal_title_id = ?`,
        [mealTitleId],
        (tx, results) => {
          const mealPlans = [];
          for (let i = 0; i < results.rows.length; i++) {
            mealPlans.push(results.rows.item(i));
          }
          resolve(mealPlans);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const MealPlanning = () => {
  const route = useRoute();
  const { id,e_ID } = route.params;

  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    // Assuming you have the meal_title_id of the meal you want to fetch plans for.
    // Replace 'YOUR_MEAL_TITLE_ID' with the actual meal_title_id you want to fetch.

    // Fetch meal plans from the SQLite database based on meal_title_id
    getAllMealPlans(id)
      .then((plans) => setMealPlans(plans))
      .catch((error) => console.error('Error fetching meal plans:', error));
  }, []);

  // Function to get the food data based on food_id
  const getFoodData = (foodId) => {
    return foodsData.find((food) => food.id === foodId);
  };

  // Function to render each meal plan card
  const renderMealPlanCard = ({ item }) => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text>Meal Title: {item.meal_title_name}</Text>
          <Text>Meal: {item.meal_name_id}</Text>
          {item.exchange_distribution.map((distribution, index) => (
            <Text key={index}>Exchange Distribution {index + 1}: {distribution}</Text>
          ))}
          {item.food_id.map((foodId, index) => {
            const foodData = getFoodData(foodId);
            return (
              <Text key={index}>Food {index + 1}: {foodData ? foodData.meal_name : 'Not Found'}</Text>
            );
          })}
          {/* Add more details from the meal plan or food data as needed */}
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {mealPlans.length > 0 ? (
        <FlatList
          data={mealPlans}
          renderItem={renderMealPlanCard}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>No meal plans found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 16,
    borderRadius: 8,
    elevation: 4,
  },
});

export default MealPlanning;
