import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import meals from '../../meals/vegetables.json';

const MealPlanning = () => {
  const [mealPlan, setMealPlan] = useState({});
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedVegetables, setSelectedVegetables] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const sections = ['Breakfast', 'AM Snacks', 'Lunch', 'PM Snack', 'Dinner'];
  const [vegetables, setVegetables] = useState(meals);
  const [filteredVegetables, setFilteredVegetables] = useState(vegetables);

  const addVegetableToMeal = (section, vegetable) => {
    const updatedMealPlan = { ...mealPlan };
    if (updatedMealPlan[section]) {
      if (updatedMealPlan[section].find((item) => item.id === vegetable.id)) {
        Alert.alert('Warning', 'This vegetable is already added to the selected section.');
        return;
      }
      updatedMealPlan[section].push(vegetable);
    } else {
      updatedMealPlan[section] = [vegetable];
    }
    setMealPlan(updatedMealPlan);
  };

  const deleteVegetableFromMeal = (section, vegetable) => {
    const updatedMealPlan = { ...mealPlan };
    if (updatedMealPlan[section]) {
      updatedMealPlan[section] = updatedMealPlan[section].filter((item) => item.id !== vegetable.id);
      if (updatedMealPlan[section].length === 0) {
        delete updatedMealPlan[section];
      }
      setMealPlan(updatedMealPlan);
    }
  };

  const calculateSectionCalories = (section) => {
    if (mealPlan[section]) {
      const sectionVegetables = mealPlan[section];
      const totalCalories = sectionVegetables.reduce(
        (sum, vegetable) => sum + vegetable.meal_calories,
        0
      );
      return totalCalories;
    }
    return 0;
  };

  const calculateTotalCalories = () => {
    const totalCalories = Object.values(mealPlan)
      .flat()
      .reduce((sum, vegetable) => sum + vegetable.meal_calories, 0);
    return totalCalories;
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredList = vegetables.filter((vegetable) =>
      vegetable.meal_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVegetables(filteredList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Meal Planner</Text>

      <View style={styles.sectionContainer}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section}
            style={[styles.sectionButton, selectedSection === section && styles.selectedSection]}
            onPress={() => setSelectedSection(section)}
          >
            <Text style={styles.sectionButtonText}>{section}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search vegetables..."
      />

      <ScrollView style={styles.vegetablesContainer}>
        {filteredVegetables.map((vegetable) => (
          <TouchableOpacity
            key={vegetable.id}
            style={[
              styles.vegetableButton,
              selectedVegetables.includes(vegetable) && styles.selectedVegetable,
            ]}
            onPress={() => addVegetableToMeal(selectedSection, vegetable)}
          >
            <Text style={styles.vegetableButtonText}>{vegetable.meal_name}</Text>
            <Text style={styles.vegetableCalories}>{vegetable.meal_calories} cal</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.mealPlanContainer}>
        <Text style={styles.mealPlanText}>Meal Plan:</Text>
        {Object.entries(mealPlan).map(([section, vegetables]) => (
          <View key={section} style={styles.mealPlanSection}>
            <Text style={styles.mealPlanSectionTitle}>{section} Calories: {calculateSectionCalories(section)} cal</Text>
            {vegetables.map((vegetable) => (
              <TouchableOpacity
                key={vegetable.id}
                style={styles.mealPlanVegetable}
                onPress={() => deleteVegetableFromMeal(section, vegetable)}
              >
                <Text>{vegetable.meal_name}</Text>
                <Text style={styles.mealPlanVegetableCalories}>{vegetable.meal_calories} cal</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      <View style={styles.totalCaloriesContainer}>
        <Text style={styles.totalCaloriesText}>Total Calories: {calculateTotalCalories()} cal</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sectionButton: {
    backgroundColor: '#ECECEC',
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
  },
  selectedSection: {
    backgroundColor: 'lightblue',
  },
  sectionButtonText: {
    fontWeight: 'bold',
  },
  vegetablesContainer: {
    maxHeight: 200,
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#ECECEC',
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  vegetableButton: {
    backgroundColor: '#ECECEC',
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedVegetable: {
    backgroundColor: 'lightgreen',
  },
  vegetableButtonText: {
    fontWeight: 'bold',
  },
  vegetableCalories: {
    color: 'gray',
  },
  mealPlanContainer: {
    marginBottom: 16,
  },
  mealPlanText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mealPlanSection: {
    marginBottom: 8,
  },
  mealPlanSectionTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mealPlanVegetable: {
    backgroundColor: '#ECECEC',
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealPlanVegetableCalories: {
    color: 'gray',
  },
  totalCaloriesContainer: {
    marginBottom: 16,
  },
  totalCaloriesText: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
    borderRadius: 8,
    padding: 6,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
});

export default MealPlanning;