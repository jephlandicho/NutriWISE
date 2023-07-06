import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import foodsData from '../../meals/foods.json';

const Lunch = () => {
  const [mealPlan, setMealPlan] = useState({});
  const [selectedSection, setSelectedSection] = useState('Vegetable');
  const [selectedVegetables, setSelectedVegetables] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const sections = ['Vegetable', 'Fruit', 'Rice A', 'Rice B', 'Rice C', 'Milk', 'Low Fat Meat', 'Medium Fat Meat', 'Fat', 'Sugar'];
  const [vegetables, setVegetables] = useState([]);
  const [filteredVegetables, setFilteredVegetables] = useState([]);

  const fetchData = () => {
    if (selectedSection !== '') {
      const sectionData = foodsData.filter((food) => food.meal_group === selectedSection);
      setVegetables(sectionData);
      setFilteredVegetables(sectionData);
      const mealNames = sectionData.map((food) => food.meal_name);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedSection]);

  const addVegetableToMeal = (section, vegetable) => {
    const updatedMealPlan = { ...mealPlan };
    if (updatedMealPlan[section]) {
      // Check if the vegetable already exists in the selected section
      const isDuplicate = updatedMealPlan[section].some((item) => item.id === vegetable.id);
      if (isDuplicate) {
        Alert.alert('Duplicate Food', 'You have already selected this food.');
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredList = vegetables.filter((vegetable) =>
      vegetable.meal_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVegetables(filteredList);
  };

  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Search here..."
            />
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={selectedSection}
              onValueChange={(itemValue, itemIndex) => setSelectedSection(itemValue)}
            >
              {sections.map((section) => (
                <Picker.Item key={section} label={section} value={section} />
              ))}
            </Picker>
          </View>
        </View>


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
            <Text style={styles.vegetableButtonText}>
              {vegetable.meal_name} - {vegetable.household_measure}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.mealtextContainer}>
      <Text style={styles.mealPlanText}>Meal Plan:</Text>
      <View style={styles.searchContainer}>
      <TextInput 
      style={styles.menuBar}
      placeholder='Menu...'
      ></TextInput>
      </View>

      </View>

      <ScrollView style={styles.mealPlanContainer}>
        {Object.entries(mealPlan).map(([section, vegetables]) => (
          <View key={section} style={styles.mealPlanSection}>
            <Text style={styles.mealPlanSectionTitle}>{section}</Text>
            {vegetables.map((vegetable) => (
              <TouchableOpacity
                key={vegetable.id}
                style={styles.mealPlanVegetable}
                onPress={() => deleteVegetableFromMeal(section, vegetable)}
              >
                <Text>
                  {vegetable.meal_name} - {vegetable.household_measure}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
  },
  pickerContainer: {
    marginLeft: 5,
    width: 120, // Adjust the width as needed
  },
  picker: {
    flex: 1,
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
    marginBottom: 80,
  },
  mealtextContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuBar: {
    backgroundColor: '#ECECEC',
    padding: 5,
    marginBottom: 8,
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 10,
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

export default Lunch;
