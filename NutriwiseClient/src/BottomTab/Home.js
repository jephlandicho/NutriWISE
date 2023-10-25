import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity } from "react-native";
import {
  Avatar,
  Card,
  Provider as PaperProvider,
  Title,
  Button,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyTheme from "../Components/MyTheme";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("client.db");
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const Home = () => {
  const [userData, setUserData] = useState(null);
  const [mealPlanData, setMealPlanData] = useState([]);
  const [filteredTitle, setFilteredTitle] = useState(null);
  const [currentMeal, setCurrentMeal] = useState(null);

  useEffect(() => {
    getCurrentMealTime()
    loadData()
    
    getUserData();
  }, []);

  const loadData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM meal_planned WHERE meal_time = ?",
        [currentMeal],
        (_, { rows }) => {
          const data = rows._array;
          const groupedData = groupMealData(data);
          setMealPlanData(groupedData);
        }
      );
    });
  }
  const getCurrentMealTime = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 10) {
      setCurrentMeal("Breakfast")
    } else if (hour >= 10 && hour < 11) {
      setCurrentMeal("AMSnacks")
    } else if (hour >= 12 && hour < 13) {
      setCurrentMeal("Lunch")
    } else if (hour >= 15 && hour < 16) {
      setCurrentMeal("PMSnacks")
    } else if (hour >= 18 && hour < 20) {
      setCurrentMeal("Dinner")
    } else {
      return null;
    }
  };

  const groupMealData = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const {
        meal_title,
        meal_time,
        meal_name,
        meal_group,
        food,
        household_measurement,
      } = item;
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
        food,
        household_measurement,
      });
    });
    return groupedData;
  };

  const renderMealPlan = () => {
    const mealTitles = filteredTitle
      ? [filteredTitle]
      : Object.keys(mealPlanData);

    return mealTitles.map((title) => (
      <Card key={title} style={styles.mealTitleContainer}>
        <Card.Content>
          <Title style={styles.mealTitle}>{title}</Title>
          {Object.keys(mealPlanData[title]).map((time) => (
            <View key={time}>
              <Card style={styles.mealTimeContainer}>
                <Card.Content>
                  {Object.keys(mealPlanData[title][time])
                    .sort((a, b) => a.localeCompare(b))
                    .map((group) => (
                      <View key={group} style={styles.mealGroupContainer}>
                        {group ? (
                          <Text style={styles.mealGroup}>Menu: {group}</Text>
                        ) : (
                          <></>
                        )}
                        {Object.keys(mealPlanData[title][time][group]).map(
                          (meal_name) => (
                            <View
                              key={meal_name}
                              style={styles.mealItemContainer}
                            >
                              <Text style={styles.mealName}>{meal_name}</Text>
                              {mealPlanData[title][time][group][meal_name].map(
                                (item, index) => (
                                  <View
                                    key={index}
                                    style={styles.mealItemContainer}
                                  >
                                    {meal_name === "Vegetable" &&
                                    index === 0 ? (
                                      <Text style={styles.mealItem}>
                                        {item.food} -{" "}
                                        {item.household_measurement}
                                      </Text>
                                    ) : meal_name === "Vegetable" &&
                                      index >= 1 ? (
                                      <Text style={styles.mealItem}>
                                        {item.food}
                                      </Text>
                                    ) : (
                                      <Text style={styles.mealItem}>
                                        {item.food} -{" "}
                                        {item.household_measurement}
                                      </Text>
                                    )}
                                  </View>
                                )
                              )}
                            </View>
                          )
                        )}
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

  const renderFilterButtons = () => {
    const mealTitles = Object.keys(mealPlanData);
    return mealTitles.map((title) => (
      <Button
        key={title}
        mode="text"
        style={styles.filterButton}
        onPress={() => setFilteredTitle(title)}
        disabled={title === filteredTitle} // Disable the button if it's the current selection
      >
        {title}
      </Button>
    ));
  };
  const noMealMessage = (
    <Card style={styles.noMealMessage}>
      <Text style={styles.noMealMessageText}>No meal at the moment</Text>
      <View style={styles.noMealMessageIcon}>
        <Ionicons name="restaurant" size={50} color="green" />
      </View>

      <Text style={styles.noMealMessageDesc}>
        See the Meal Plan section for the complete plan.
      </Text>
    </Card>
  );

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("clientInfoo");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUserData(parsedUserData);
      } else {
        // User data doesn't exist in local storage
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const otherData = [
    {
      title: "Nutritional Status",
      description: userData ? userData.remarks : "",
    },
    {
      title: "Body Mass Index",
      description: userData ? userData.BMI + " kg/m²" : "",
    },
  ];
  const otherData1 = [
    {
      title: "Weight",
      description: userData ? userData.weight + " kg" : "",
    },
    {
      title: "Height",
      description: userData ? userData.height + " m" : "",
    },
  ];

  return (
    <PaperProvider theme={MyTheme}>
      <View style={styles.container}>
        {userData && (
          <View style={styles.header}>
            <Avatar.Text
              size={64}
              label={userData.name.charAt(0).toUpperCase()}
            />
            <Text style={styles.userName}>{userData.name}</Text>
            <Text> {userData.sex}</Text>
            
          </View>
        )}

        <Card style={styles.dietPresCard}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Diet Prescription</Text>
            <Text style={styles.cardText}>
              {userData ? userData.TER : ""} kcal
            </Text>
            <View style={styles.nutrientRow}>
              <View style={styles.nutrientColumn}>
                <Text style={styles.nutrientLabel}>Carbohydrates</Text>
                <Text style={styles.nutrientValue}>
                  {userData ? userData.carbs : ""} g
                </Text>
              </View>
              <View style={styles.nutrientColumn}>
                <Text style={styles.nutrientLabel}>Protein</Text>
                <Text style={styles.nutrientValue}>
                  {userData ? userData.protein : ""} g
                </Text>
              </View>
              <View style={styles.nutrientColumn}>
                <Text style={styles.nutrientLabel}>Fats</Text>
                <Text style={styles.nutrientValue}>
                  {userData ? userData.fats : ""} g
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

          {currentMeal === null && Object.keys(mealPlanData).length === 0 ? (
            noMealMessage
          ) : (
            <Card style={styles.mealCard}>
              <Text style={styles.mealCardTitle}>
                Meal Plan for {currentMeal}
              </Text>
              <ScrollView style={styles.scrollcontainer}>
                <View style={styles.filterContainer}>
                <TouchableOpacity
                    onPress={() => {
                      loadData();
                      setFilteredTitle(null);
                    }}
                  >
                  <Ionicons name="refresh" size={30} color="green" />
                </TouchableOpacity>
                  {renderFilterButtons()}
                </View>
                {renderMealPlan()}
              </ScrollView>
            </Card>
          )}
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 30,
    paddingHorizontal: windowWidth * 0.05, // 5% padding on each side
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  userName: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // User name text color
  },
  dietPresCard: {
    borderRadius: 30,
    elevation: 4,
    backgroundColor: "#abc88f", // Card background color for "Diet Prescription"
    width: '100%', 
    height: '20%',
  },
  card: {
    margin: 10,
    borderRadius: 20, // Increase card border radius for a modern look
    elevation: 4,
    backgroundColor: "#fff", // Card background color
    width: '50%',
    height: '90%',
  },
  mealCard: {
    marginTop: '2%',
    padding: 10,
    borderRadius: 20, // Increase card border radius for a modern look
    elevation: 4,
    backgroundColor: "#fff", // Card background color
    width: "100%", //
  },
  mealCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignContent: "center",
    textAlign: "center",
    color: "green",
  },
  noMealMessage: {
    margin: 5,
    marginTop: '5%',
    padding: 20,
    borderRadius: 20, // Increase card border radius for a modern look
    elevation: 4,
    backgroundColor: "#fff", // Card background color
    width: "100%", //
    height: '45%',
  },
  noMealMessageIcon: {
    alignContent: "center",
    alignItems: "center",
    padding: 15,
  },
  noMealMessageText: {
    fontSize: 20,
    fontWeight: "bold",
    alignContent: "center",
    textAlign: "center",
    color: "green",
  },
  noMealMessageDesc: {
    fontSize: 15,
    textAlign: "center",
  },
  cardContent: {
    alignItems: "center", // Center the content horizontally
    padding: 5,
  },
  cardTitle1: {
    textAlign: "center", // Center the text horizontally
    fontSize: 18, // Increase font size for better readability
    color: "#000000", // Text color
  },
  cardTitle: {
    fontSize: 25, // Increase font size for better readability
    color: "#ffffff", // Text color
    marginBottom: 10,
    fontWeight: "bold",
  },
  cardText: {
    textAlign: "center", // Center the text horizontally
    fontSize: 24, // Increase font size for better readability
    color: "#004e04", // Text color
    fontWeight: "bold",
  },
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  nutrientColumn: {
    flex: 1,
    alignItems: "center",
  },
  nutrientLabel: {
    fontSize: 16,
    color: "#ffffff",
  },
  nutrientValue: {
    fontSize: 18,
    color: "#000000",
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  scrollcontainer: {
    flex: 1,
    
    backgroundColor: "#fff",
    marginBottom: '20%',
  },
  mealTitleContainer: {
    marginBottom: '10%',
    backgroundColor: "#fff",
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  mealTimeContainer: {
    marginBottom: 8,
  },
  mealTime: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  mealGroupContainer: {
    marginBottom: 4,
  },
  mealGroup: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  mealItemContainer: {
    marginLeft: 16,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  mealItem: {
    fontSize: 15,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default Home;
