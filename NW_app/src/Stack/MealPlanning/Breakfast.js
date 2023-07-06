import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ResultContext } from '../../Components/ResultContext';
import { Ionicons } from '@expo/vector-icons';

import foodsData from '../../meals/foods.json';

const Breakfast = () => {
  const [selectedSection, setSelectedSection] = useState('Vegetable');
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const sections = ['Vegetable', 'Fruit', 'Rice A', 'Rice B', 'Rice C', 'Milk', 'Low Fat Meat', 'Medium Fat Meat', 'Fat', 'Sugar'];
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const { breakfast, setBreakfast } = useContext(ResultContext);
  const [h_measure, sethmeasure] = useState();
  const [menuText, setMenuText] = useState('');
  const [showHouseholdMeasure, setShowHouseholdMeasure] = useState(false);
  const [householdMeasureText, setHouseholdMeasureText] = useState('');
  const { AvegetablesBreakfast,AfruitBreakfast,ASugarBreakfast,AMilkBreakfast,ALFBreakfast,AMFBreakfast,AriceABreakfast,AriceBBreakfast,AriceCBreakfast,AFatBreakfast ,householdMeasureBreakfast, setHouseholdMeasureBreakfast }= useContext(ResultContext);

  const fetchData = () => {
    if (selectedSection !== '') {
      const sectionData = foodsData.filter((food) => food.meal_group === selectedSection);
      setFoods(sectionData);
      setFilteredFoods(sectionData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedSection]);

  const addFoodToMeal = (section, food) => {
    const updatedMealPlan = { ...breakfast };
    if (updatedMealPlan[section]) {
      // Check if the food already exists in the selected section
      const isDuplicate = updatedMealPlan[section].some((item) => item.id === food.id);
      if (isDuplicate) {
        Alert.alert('Duplicate Food', 'You have already selected this food.');
        return;
      }
      updatedMealPlan[section].push(food);
    } else {
      updatedMealPlan[section] = [food];
    }

    if (!food.household_measure) {
      setShowHouseholdMeasure(true);
    }

    setBreakfast(updatedMealPlan);
  };

  const deleteFoodFromMeal = (section, food) => {
    const updatedMealPlan = { ...breakfast };
    if (updatedMealPlan[section]) {
      updatedMealPlan[section] = updatedMealPlan[section].filter((item) => item.id !== food.id);
      if (updatedMealPlan[section].length === 0) {
        delete updatedMealPlan[section];
      }
      setBreakfast(updatedMealPlan);
    }

    const updatedSelectedFoods = selectedFoods.filter((item) => item.id !== food.id);
    setSelectedFoods(updatedSelectedFoods);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredList = foods.filter((food) =>
      food.meal_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFoods(filteredList);
  };

  return (
    <View style={styles.container}>
<View style={styles.Alertcontainer}>
  <Text style={styles.exchangesText}>Exchanges</Text>
  <TouchableOpacity onPress={() => {
    let alertContent = '';

    if (AvegetablesBreakfast !== 0) {
      alertContent += `Vegetables: ${AvegetablesBreakfast}\n`;
    }
    if (AfruitBreakfast !== 0) {
      alertContent += `Fruit: ${AfruitBreakfast}\n`;
    }
    if (ASugarBreakfast !== 0) {
      alertContent += `Sugar: ${ASugarBreakfast}\n`;
    }
    if (AMilkBreakfast !== 0) {
      alertContent += `Milk: ${AMilkBreakfast}\n`;
    }
    if (ALFBreakfast !== 0) {
      alertContent += `LF Meat: ${ALFBreakfast}\n`;
    }
    if (AMFBreakfast !== 0) {
      alertContent += `MF Meat: ${AMFBreakfast}\n`;
    }
    if (AriceABreakfast !== 0) {
      alertContent += `Rice A: ${AriceABreakfast}\n`;
    }
    if (AriceBBreakfast !== 0) {
      alertContent += `Rice B: ${AriceBBreakfast}\n`;
    }
    if (AriceCBreakfast !== 0) {
      alertContent += `Rice C: ${AriceCBreakfast}\n`;
    }
    if (AFatBreakfast !== 0) {
      alertContent += `Fat: ${AFatBreakfast}\n`;
    }

    if (alertContent !== '') {
      Alert.alert(
        'Exchanges',
        alertContent.trim(),
        [
          { text: 'Close', style: 'cancel' }
        ],
        { cancelable: true }
      );
    }
  }}>
    <Ionicons name="ios-help-circle-outline" size={24} color="black" />
  </TouchableOpacity>
</View>
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

      <ScrollView style={styles.foodsContainer}>
        {filteredFoods.map((food) => (
          <TouchableOpacity
            key={food.id}
            style={[
              styles.foodButton,
              selectedFoods.includes(food) && styles.selectedFood,
            ]}
            onPress={() => addFoodToMeal(selectedSection, food)}
          >
            <Text style={styles.foodButtonText}>
              {food.meal_name}
              {food.household_measure ? ` - ${food.household_measure}` : ''}
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
          value={menuText}
          onChangeText={setMenuText}
          >
            
          </TextInput>
        </View>
      </View>
      <ScrollView style={styles.mealPlanContainer}>
        {Object.entries(breakfast).map(([section, foods]) => (
          <View key={section} style={styles.mealPlanSection}>
            <Text style={styles.mealPlanSectionTitle}>{section}</Text>
            {foods.map((food, index) => (
              <View key={food.id}>
                {!food.household_measure&& index === 0  && showHouseholdMeasure && (
                  <TextInput
                    style={styles.menuBar}
                    value={householdMeasureBreakfast}
                    onChangeText={setHouseholdMeasureBreakfast}
                    placeholder="Household measure"
                  />
                )}
                <TouchableOpacity
                  style={styles.mealPlanFood}
                  onPress={() => deleteFoodFromMeal(section, food)}
                >
                  <Text>
                    {food.meal_name}
                    {food.household_measure ? ` - ${food.household_measure}` : ''}
                  </Text>
                </TouchableOpacity>
                
              </View>
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
  foodsContainer: {
    maxHeight: 200,
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#ECECEC',
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  foodButton: {
    backgroundColor: '#ECECEC',
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedFood: {
    backgroundColor: 'lightgreen',
  },
  foodButtonText: {
    fontWeight: 'bold',
  },
  mealPlanContainer: {
    marginBottom: 80,
  },
  mealPlanSection: {
    marginBottom: 8,
  },
  mealPlanSectionTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mealPlanFood: {
    backgroundColor: '#ECECEC',
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  mealtextContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealPlanText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  menuBar: {
    backgroundColor: '#ECECEC',
    padding: 5,
    marginBottom: 8,
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 10,
  },
  Alertcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exchangesText: {
    marginRight: 5,
  },
});

export default Breakfast;