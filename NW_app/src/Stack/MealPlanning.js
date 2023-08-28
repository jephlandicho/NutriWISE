
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Animated, LayoutAnimation, UIManager } from 'react-native';
import { Card, Text, Provider as PaperProvider, Divider } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';
import MyTheme from '../Components/MyTheme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import meals from '../meals/foods.json';

const db = SQLite.openDatabase('mydatabase.db');

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MealPlanning = () => {
  // const titleColors = ['#397439', '#549355', '#306F35', '#044D15', '#002C00'];
  const navigation = useNavigation();
  const route = useRoute();
  const { id, e_ID } = route.params;
  const addMealPlan = () => {
    navigation.navigate('Breakfast', { id, e_ID });
  };
  const [mealData, setMealData] = useState([]);
  const [expandedStates, setExpandedStates] = useState({});

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT meal.*, meal_plan.exchange_distribution, meal_plan.food_id, meal_plan.household_measurement FROM meal ' +
          'INNER JOIN meal_plan ON meal.id = meal_plan.meal_name_id ' +
          'WHERE meal.meal_title_id = ?',
        [id],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setMealData(temp);
        }
      );
    });
  }, []);

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
  
  const getMealDataFromId = (foodId) => {
    const meal = meals.find((m) => m.id === foodId);
    return meal ? { mealName: meal.meal_name, mealGroup: meal.meal_group, mealMeasure: meal.household_measure } : { mealName: '', mealGroup: '', mealMeasure: '' };
  };

  const toggleCardExpansion = (cardKey) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedStates((prevState) => ({
      ...prevState,
      [cardKey]: !prevState[cardKey],
    }));
  };
  const generateSequentialColors = (baseColor, numberOfColors) => {
    const colors = [];
    const baseRGB = baseColor
      .replace('#', '')
      .match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16));

    const step = Math.floor(255 / (numberOfColors - 1));

    for (let i = 0; i < numberOfColors; i++) {
      const newRGB = baseRGB.map((channel) => Math.min(255, channel + step * i));
      const color = '#' + newRGB.map((channel) => channel.toString(16).padStart(2, '0')).join('');
      colors.push(color);
    }

    return colors;
  };

  const titleColors = generateSequentialColors('#044D15', 12);

  const renderMealPlanCard = ({ mealGroup, mealTime, mealName },index) => {
    const cardKey = `${mealTime}_${mealName}`;
    const isCardExpanded = expandedStates[cardKey] || false;

    const groupedFoods = mealGroup.reduce((acc, item) => {
      const mealGroup = getMealDataFromId(item.food_id).mealGroup;
      const mealName = getMealDataFromId(item.food_id).mealName;
      const mealMeasure = getMealDataFromId(item.food_id).mealMeasure;
      const exchangeDistribution = item.exchange_distribution;
      const key = `${mealGroup}`;

      if (!acc[key]) {
        acc[key] = { displayedExchangeDistribution: false, foods: [] };
      }

      if (!acc[key].displayedExchangeDistribution) {
        acc[key].foods.push({ item, mealName, mealGroup, mealMeasure, exchangeDistribution });
        acc[key].displayedExchangeDistribution = true;
      } else {
        acc[key].foods.push({ item, mealName, mealGroup, mealMeasure });
      }

      return acc;
    }, {});

    const colorIndex = Object.values(groupedFoods).length % titleColors.length;
    return (
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => toggleCardExpansion(cardKey)}>
          <Card.Title
            title={mealTime}
            titleVariant="headlineSmall"
            titleStyle={{
              color: 'white',
              fontWeight: 'bold',
            }}
            style={{
              backgroundColor: titleColors[index],
              padding: 10,
              borderTopStartRadius: 8,
              borderTopEndRadius: 8,
              marginBottom: 5,
            }}
          />
        </TouchableOpacity>

        <Animated.View style={{ height: isCardExpanded ? null : 0, overflow: 'hidden' }}>
          <Card.Content>
            {Object.values(groupedFoods).map((groupedFood, index) => {
              const { mealGroup, mealMeasure } = groupedFood.foods[0];
              const { exchangeDistribution } = groupedFood.foods[0];
              const showExchangeDistribution = groupedFood.displayedExchangeDistribution;

              return (
                <View key={index}>
                  <Text style={styles.mealTitle}>Food Group: {mealGroup}</Text>
                  {showExchangeDistribution && (
                    <View style={styles.row}>
                      <View style={styles.column}>
                        <Text style={styles.headerText}>Exchange Distribution</Text>
                        <Text style={styles.exchangeText}>{exchangeDistribution}</Text>
                      </View>
                    </View>
                  )}
                  {groupedFood.foods.map((food, foodIndex) => (
                    <View style={styles.row} key={foodIndex}>
                      <View style={styles.column}>
                        {foodIndex === 0 ? <Text style={styles.headerText}>Foods</Text> : <></>}
                        <Text style={styles.foodText}>{food.mealName}</Text>
                      </View>
                      {mealGroup === 'Vegetable' && foodIndex === 0 ? (
                        <View style={styles.column}>
                          <Text style={styles.headerText}>Household Measurement</Text>
                          <Text style={styles.exchangeText}>{food.item.household_measurement}</Text>
                        </View>
                      ) : mealGroup === 'Vegetable' && foodIndex === 1 ? (
                        <View style={styles.column}></View>
                      ) : (
                        <View style={styles.column}>
                          <Text style={styles.headerText}>Household Measurement</Text>
                          <Text style={styles.exchangeText}>{food.mealMeasure}</Text>
                        </View>
                      )}
                    </View>
                  ))}
                  <Divider />
                </View>
              );
            })}
          </Card.Content>
        </Animated.View>
      </Card>
    );
  };

  // Sort mealData based on the meal type order
  const sortedMealData = mealData.sort((a, b) => getMealOrder(a.meal_time) - getMealOrder(b.meal_time));

  const groupedMealData = Object.values(
    sortedMealData.reduce((acc, item) => {
      const key = `${item.meal_time}_${item.meal_name}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {})
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
            groupedMealData.map((mealGroup, index) => (
              <View key={index}>
                {renderMealPlanCard({ mealGroup, mealTime: mealGroup[0].meal_time, mealName: mealGroup[0].meal_name },index)}
              </View>
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
  row: {
    flexDirection: 'row',
    marginTop: 8,
  },
  column: {
    flex: 1,
    padding: 8,
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default MealPlanning;
