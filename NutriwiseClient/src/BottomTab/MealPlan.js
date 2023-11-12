import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Provider as PaperProvider,Card, Title, Button } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import MyTheme from '../Components/MyTheme';
import foodData from '../meals/foods.json';
const db = SQLite.openDatabase('client.db');

const MealPlan = () => {
  const [mealPlanData, setMealPlanData] = useState([]);
  const [filteredTitle, setFilteredTitle] = useState(null);

  useEffect(() => {
    // Fetch the data from the SQLite database
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM m_plans ORDER BY meal_time',
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
      const { meal_title, meal_time, meal_name, food, household_measurement } = item;

      const foodInfo = foodData.find((foodItem) => foodItem.id === food);
      const meal_group = foodInfo ? foodInfo.meal_group : 'Unknown';
      const foody = foodInfo ? foodInfo.meal_name : 'Unknown';

      if (!groupedData[meal_title]) {
        groupedData[meal_title] = {};
      }
      if (!groupedData[meal_title][meal_time]) {
        groupedData[meal_title][meal_time] = {};
      }
      if (!groupedData[meal_title][meal_time][meal_name]) {
        groupedData[meal_title][meal_time][meal_name] = {};
      }
      if (!groupedData[meal_title][meal_time][meal_name][meal_group]) {
        groupedData[meal_title][meal_time][meal_name][meal_group] = [];
      }
      groupedData[meal_title][meal_time][meal_name][meal_group].push({
        foody,
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

  const renderMealPlan = () => {
    const mealTitles = filteredTitle ? [filteredTitle] : Object.keys(mealPlanData);
    
    return mealTitles.map((title) => (
      <Card key={title} style={styles.mealTitleContainer}>
        <Card.Content>
          <Title style={styles.mealTitle}>{title}</Title>
          {Object.keys(mealPlanData[title])
            .sort((a, b) => getMealOrder(a) - getMealOrder(b))
            .map((time) => (
              <View key={time}>
                <Card style={styles.mealTimeContainer}>
                  <Card.Content>
                    <Title style={styles.mealTime}>{time}</Title>
                    {Object.keys(mealPlanData[title][time])
                      .sort((a, b) => a.localeCompare(b))
                      .map((meal_name) => (
                        <View key={meal_name} style={styles.mealGroupContainer}>
                          {meal_name ? (
                            <Text style={styles.mealGroup}>Menu: {meal_name}</Text>
                          ) : (
                            <></>
                          )}
                          {Object.keys(mealPlanData[title][time][meal_name])
                            .map((meal_group) => (
                              <View key={meal_group} style={styles.mealItemContainer}>
                                <Text style={styles.mealName}>{Array.isArray(meal_group) ? meal_group.join(', ') : meal_group}</Text>
                                {mealPlanData[title][time][meal_name][meal_group].map(
                                  (item, index) => (
                                    <View key={index} style={styles.mealItemContainer}>
                                      {meal_group === 'Vegetable' && index === 0 ? (
                                        
                                        <Text style={styles.mealItem}>
                                          {item.foody} - {item.household_measurement}
                                        </Text>
                                      ) : meal_group === 'Vegetable' && index >= 1 ? (
                                        <Text style={styles.mealItem}>
                                          {item.foody}
                                        </Text>
                                      ) : (
                                        <Text style={styles.mealItem}>
                                          {item.foody} - {item.household_measurement}
                                        </Text>
                                      )}
                                    </View>
                                  )
                                )}
                              </View>
                            ))}
                        </View>
                      ))}
                  </Card.Content>
                </Card>
              </View>
            ))}
        </Card.Content>
      </Card>
    ));
  };
  
  

  // Render meal title filter buttons
  const renderFilterButtons = () => {
    const mealTitles = Object.keys(mealPlanData);
    return (
      <ScrollView
        horizontal
        style={styles.filterButtonsContainer}
        contentContainerStyle={styles.filterButtonsContent}
      >
        {mealTitles.map((title) => (
          <Button
            key={title}
            mode="text"
            style={styles.filterButton}
            onPress={() => setFilteredTitle(title)}
            disabled={title === filteredTitle}
          >
            {title}
          </Button>
        ))}
      </ScrollView>
    );
  
  };

  return (
    <PaperProvider theme={MyTheme}>
      <View style={styles.container}>
      <ScrollView style={styles.scrollcontainer}>
      <View style={styles.filterContainer}>
        {renderFilterButtons()}
        <Button
          mode="outlined"
          onPress={() => setFilteredTitle(null)}
          disabled={!filteredTitle}
        >
          View All
        </Button>
      </View>
      {renderMealPlan()}
    </ScrollView>
      </View>
    
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  scrollcontainer:{
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 50,
  },
  mealTitleContainer: {
    marginBottom: 50,
    backgroundColor: '#fff',
  },
  mealTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mealTimeContainer: {
    marginBottom: 8,
  },
  mealTime: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mealGroupContainer: {
    marginBottom: 4,
  },
  mealGroup: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mealItemContainer: {
    marginLeft: 16,
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mealItem: {
    fontSize: 15,
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
  filterButtonsContainer: {
    flexDirection: 'row',
  },
  filterButtonsContent: {
    paddingHorizontal: 8, // Add padding to the content to space out buttons
  },
});

export default MealPlan;
