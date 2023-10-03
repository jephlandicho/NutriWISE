import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('client.db');

const MealPlan = () => {
  const [mealPlanData, setMealPlanData] = useState([]);
  const [filteredTitle, setFilteredTitle] = useState(null);

  useEffect(() => {
    // Fetch the data from the SQLite database
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM meal_planned ORDER BY meal_time',
        [],
        (_, { rows }) => {
          const data = rows._array;
          // Group the data by meal_title, meal_time, and meal_group
          const groupedData = groupMealData(data);
          setMealPlanData(groupedData);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }, []);

  // Function to group meal data by meal_title, meal_time, and meal_group
  const groupMealData = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const { meal_title, meal_time, meal_name, meal_group, food, household_measurement } = item;
      if (!groupedData[meal_title]) {
        groupedData[meal_title] = {};
      }
      if (!groupedData[meal_title][meal_time]) {
        groupedData[meal_title][meal_time] = {};
      }
      if (!groupedData[meal_title][meal_time][meal_group]) {
        groupedData[meal_title][meal_time][meal_group] = [];
      }

      groupedData[meal_title][meal_time][meal_group][meal_name].push({
        food,
        household_measurement,
      });
    });
    return groupedData;
  };

  // Function to get the order of meal_time
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

  // Render the grouped data as cards
// Render the grouped data as cards
// Render the grouped data as cards
const renderMealPlan = () => {
  const mealTitles = filteredTitle ? [filteredTitle] : Object.keys(mealPlanData);

  return mealTitles.map((title) => (
    <Card key={title} style={styles.mealTitleContainer}>
      <Card.Content>
        <Title style={styles.mealTitle}>{title}</Title>
        {Object.keys(mealPlanData[title]).sort((a, b) => getMealOrder(a) - getMealOrder(b)).map((time) => (
          <View key={time} style={styles.mealTimeContainer}>
            <Title style={styles.mealTime}>{time}</Title>
            {Object.keys(mealPlanData[title][time]).map((group) => (
              <View key={group} style={styles.mealGroupContainer}>
                <Title style={styles.mealGroup}>{group}</Title>
                {mealPlanData[title][time][group].map((item, index, arr) => (
                  <View key={index} style={styles.mealItemContainer}>
                    <Text style={styles.mealItem}>
                      {item.food} - {item.household_measurement}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </Card.Content>
    </Card>
  ));
};

  // Render meal title filter buttons
  const renderFilterButtons = () => {
    const mealTitles = Object.keys(mealPlanData);
    return mealTitles.map((title) => (
      <Button
        key={title}
        mode="outlined"
        style={styles.filterButton}
        onPress={() => setFilteredTitle(title)}
      >
        {title}
      </Button>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.filterContainer}>
        {renderFilterButtons()}
        <Button
          mode="outlined"
          onPress={() => setFilteredTitle(null)}
          disabled={!filteredTitle}
        >
          Clear Filter
        </Button>
      </View>
      {renderMealPlan()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  mealTitleContainer: {
    marginBottom: 16,
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mealTimeContainer: {
    marginBottom: 8,
  },
  mealTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mealGroupContainer: {
    marginBottom: 4,
  },
  mealGroup: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mealItemContainer: {
    marginLeft: 16,
  },
  mealName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mealItem: {
    fontSize: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default MealPlan;
