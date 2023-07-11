import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ResultContext } from '../../Components/ResultContext';
import { Ionicons } from '@expo/vector-icons';

import foodsData from '../../meals/foods.json';

const Dinner = () => {
  const [selectedSection, setSelectedSection] = useState('Vegetable');
  const [selectedFoodIds, setSelectedFoodIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const sections = ['Vegetable', 'Fruit', 'Rice A', 'Rice B', 'Rice C', 'Milk', 'Low Fat Meat', 'Medium Fat Meat', 'Fat', 'Sugar'];
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [showHouseholdMeasure, setShowHouseholdMeasure] = useState(false);
  
  const { Dinner, setDinner } = useContext(ResultContext);
  const { AvegetablesDinner, AfruitDinner, AriceADinner, AriceBDinner, AriceCDinner, AMilkDinner, ALFDinner, AMFDinner, AFatDinner, ASugarDinner } = useContext(ResultContext);
  const { menuDinner, setmenuDinner,householdMeasureDinner, setHouseholdMeasureDinner }= useContext(ResultContext);

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
    const updatedMealPlan = { ...Dinner };
    if (updatedMealPlan[section]) {
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
  
    setDinner(updatedMealPlan);
    
    // Add or remove the selected food ID from selectedFoodIds
    setSelectedFoodIds((prevSelectedFoodIds) => {
      if (prevSelectedFoodIds.includes(food.id)) {
        return prevSelectedFoodIds.filter((id) => id !== food.id);
      } else {
        return [...prevSelectedFoodIds, food.id];
      }
    });
  };
  
  

  const deleteFoodFromMeal = (section, food) => {
    Alert.alert(
      'Delete Food',
      'Are you sure you want to delete this food?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            let updatedMealPlan = { ...Dinner };
            let updatedSelectedFoodIds = [...selectedFoodIds];
  
            if (updatedMealPlan[section]) {
              updatedMealPlan[section] = updatedMealPlan[section].filter(
                (item) => item.id !== food.id
              );
  
              if (updatedMealPlan[section].length === 0) {
                delete updatedMealPlan[section];
              }
  
              updatedSelectedFoodIds = updatedSelectedFoodIds.filter(
                (id) => id !== food.id
              );
            }
  
            // Update the state after the Alert callback completes
            setTimeout(() => {
              setDinner(updatedMealPlan);
              setSelectedFoodIds(updatedSelectedFoodIds);
            }, 0);
          },
        },
      ],
      { cancelable: true }
    );
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

          if (AvegetablesDinner !== 0) {
            alertContent += `Vegetables: ${AvegetablesDinner}\n`;
          }
          if (AfruitDinner !== 0) {
            alertContent += `Fruit: ${AfruitDinner}\n`;
          }
          if (AriceADinner !== 0) {
            alertContent += `Rice A: ${AriceADinner}\n`;
          }
          if (AriceBDinner !== 0) {
            alertContent += `Rice B: ${AriceBDinner}\n`;
          }
          if (AriceCDinner !== 0) {
            alertContent += `Rice C: ${AriceCDinner}\n`;
          }
          if (AMilkDinner !== 0) {
            alertContent += `Milk: ${AMilkDinner}\n`;
          }
          if (ALFDinner !== 0) {
            alertContent += `LF Meat: ${ALFDinner}\n`;
          }
          if (AMFDinner !== 0) {
            alertContent += `MF Meat: ${AMFDinner}\n`;
          }
          if (AFatDinner !== 0) {
            alertContent += `Fat: ${AFatDinner}\n`;
          }
          if (ASugarDinner !== 0) {
            alertContent += `Sugar: ${ASugarDinner}\n`;
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

      <FlatList
        style={styles.foodsContainer}
        data={filteredFoods}
        keyExtractor={(food) => food.id.toString()}
        renderItem={({ item: food }) => (
          <TouchableOpacity
            key={food.id}
            style={[
              styles.foodButton,
              selectedFoodIds.includes(food.id) && styles.selectedFood,
            ]}
            onPress={() => addFoodToMeal(selectedSection, food)}
          >
            <Text style={styles.foodButtonText}>
              {food.meal_name}
              {food.household_measure ? ` - ${food.household_measure}` : ''}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.mealtextContainer}>
        <Text style={styles.mealPlanText}>Meal Plan:</Text>
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.menuBar}
            placeholder='Menu...'
            value={menuDinner}
            onChangeText={setmenuDinner}
          >
          </TextInput>
        </View>
      </View>
      <FlatList
        style={styles.mealPlanContainer}
        data={Object.entries(Dinner)}
        keyExtractor={(item) => item[0]} // Use the section as the key
        renderItem={({ item }) => (
          <View style={styles.mealPlanSection}>
            <Text style={styles.mealPlanSectionTitle}>{item[0]}</Text>
            <FlatList
              data={item[1]} // Foods for the section
              keyExtractor={(food) => food.id.toString()}
              renderItem={({ item: food, index }) => (
                <View key={food.id}>
                  {!food.household_measure && index === 0 && showHouseholdMeasure && (
                    <TextInput
                      style={styles.menuBar}
                      value={householdMeasureDinner}
                      onChangeText={setHouseholdMeasureDinner}
                      placeholder="Household measure"
                    />
                  )}
                  <TouchableOpacity
                    style={styles.mealPlanFood}
                    onPress={() => deleteFoodFromMeal(item[0], food)}
                  >
                    <Text>
                      {food.meal_name}
                      {food.household_measure ? ` - ${food.household_measure}` : ''}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
      />
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
    width: 120,
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
  mealtextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exchangesText: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding:16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  modalButton: {
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'lightgray',
  },
  mealPlanText: {
  fontSize: 16,
  marginBottom: 8,
},
});

export default Dinner;
