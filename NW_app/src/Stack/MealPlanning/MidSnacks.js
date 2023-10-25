import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ResultContext } from '../../Components/ResultContext';
import { Ionicons } from '@expo/vector-icons';
import foodsData from '../../meals/foods.json';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mydatabase.db');

const MidSnacks = () => {
  const {C_meal_titleID,C_exchangesID,milkChoice} = useContext(ResultContext);
  const [tableData, setTableData] = useState([]);
  const [selectedSection, setSelectedSection] = useState('Food Group');
  const [selectedFoodIds, setSelectedFoodIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [showHouseholdMeasure, setShowHouseholdMeasure] = useState(false);
  const [noRecommendedFoods, setNoRecommendedFoods] = useState(false);
  const [foodGroupSelected, setFoodGroupSelected] = useState(false);

  const { MidnightSnacks, setMidnightSnacks, } = useContext(ResultContext);
  const { AvegetablesMidnightSnacks,setAvegetablesMidnightSnacks,
    AfruitMidnightSnacks,setAfruitMidnightSnacks,
    AriceAMidnightSnacks,setAriceAMidnightSnacks,
    AriceBMidnightSnacks,setAriceBMidnightSnacks,
    AriceCMidnightSnacks,setAriceCMidnightSnacks,
    AWholeMilkMidnightSnacks,setAWholeMilkMidnightSnacks,
    ALFMilkMidnightSnacks,setALFMilkMidnightSnacks,
    ANFMilkMidnightSnacks,setANFMilkMidnightSnacks,
    ALFMidnightSnacks,setALFMidnightSnacks,
    AMFMidnightSnacks,setAMFMidnightSnacks,
    AHFMidnightSnacks,setAHFMidnightSnacks,
    AFatMidnightSnacks,setAFatMidnightSnacks,
    ASugarMidnightSnacks,setASugarMidnightSnacks } = useContext(ResultContext);

  const { menuMidnightSnacks, setmenuMidnightSnacks,
    householdMeasureMidnightSnacks, setHouseholdMeasureMidnightSnacks, }= useContext(ResultContext);

  const fetchData = () => {
    if (selectedSection !== '') {
      const sectionData = foodsData.filter((food) => food.meal_group === selectedSection);
      setFoods(sectionData);
      setFilteredFoods(sectionData);
    }
    if (selectedSection === 'Recommended') {
      const criteria = {
        'Fruit': AfruitMidnightSnacks,
        'Rice A': AriceAMidnightSnacks,
        'Rice B': AriceBMidnightSnacks,
        'Rice C': AriceCMidnightSnacks,
        'Low Fat Meat': ALFMidnightSnacks,
        'Medium Fat Meat': AMFMidnightSnacks,
        'High Fat Meat': AHFMidnightSnacks,
        'Fat': AFatMidnightSnacks,
        'Sugar': ASugarMidnightSnacks,
      };
    
      const filteredFoods = foodsData.filter((food) => {
        if (food.recom === 'Recommended') {
          const exchangeGroups = food.meal_group || [];
          const exchanges = food.exchange || [];
    
          // Check if any of the criteria match
          const meetsCriteria = Object.entries(criteria).every(([group, requiredValue]) => {
            const groupIndex = exchangeGroups.indexOf(group);
            
            // Check if the group is found in the exchangeGroups
            if (groupIndex !== -1) {
              return exchanges[groupIndex] === requiredValue;
            }
            
            // If the group is not found in the exchangeGroups, consider it as a match
            return true;
          });
    
          return meetsCriteria;
        }
        return false;
      });
    
      if (filteredFoods.length === 0) {
        setNoRecommendedFoods(true); // Step 2: Set the state variable
      } else {
        setNoRecommendedFoods(false);
      }
      setFoods(filteredFoods);
      setFilteredFoods(filteredFoods);
    } else if (selectedSection === 'Food Group') {
      setFoodGroupSelected(true); // Step 2: Set the state variable
    }
  };

  const sectionsWithVal = [
    { name: 'Food Group', value: 'Exchange' },
    { name: 'Recommended',value: 1},
    { name: 'Vegetable', value: AvegetablesMidnightSnacks},
    { name: 'Fruit', value: AfruitMidnightSnacks},
    { name: 'Rice A', value: AriceAMidnightSnacks},
    { name: 'Rice B', value: AriceBMidnightSnacks},
    { name: 'Rice C', value: AriceCMidnightSnacks},
    { name: 'Whole Milk', value: AWholeMilkMidnightSnacks },
    { name: 'Low-Fat Milk', value: ALFMilkMidnightSnacks },
    { name: 'Non-Fat Milk', value: ANFMilkMidnightSnacks },
    { name: 'Low Fat Meat', value: ALFMidnightSnacks},
    { name: 'Medium Fat Meat', value: AMFMidnightSnacks},
    { name: 'High Fat Meat', value: AHFMidnightSnacks},
    { name: 'Fat', value: AFatMidnightSnacks},
    { name: 'Sugar', value: ASugarMidnightSnacks},
  ].filter(section => section.value !== 0);

  useEffect(() => {
    fetchData();
    fetchDataFromDatabase();
  }, [selectedSection]);

  const fetchDataFromDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT id, food_group, midnight_snacks FROM distribution_exchange WHERE exchange_id = ?`,
        [C_exchangesID],
        (_, { rows }) => {
          const data = rows._array;
          setTableData(data);
          console.log(data)
          // Assign the fetched data to the respective variables
          data.forEach((item) => {
            const { midnight_snacks, food_group, id } = item;
            
            switch (food_group) {
              case 'Vegetable':
                setAvegetablesMidnightSnacks(midnight_snacks);
                break;
              case 'Fruit':
                setAfruitMidnightSnacks(midnight_snacks);
                break;
              case 'Rice A':
                setAriceAMidnightSnacks(midnight_snacks);
                break;
              case 'Rice B':
                setAriceBMidnightSnacks(midnight_snacks);
                break;
              case 'Rice C':
                setAriceCMidnightSnacks(midnight_snacks);
                break;
              case 'Whole Milk':
                setAWholeMilkMidnightSnacks(midnight_snacks);
                break;
              case 'Low-Fat Milk':
                setALFMilkMidnightSnacks(midnight_snacks);
                break
              case 'Non-Fat Milk':
                setANFMilkMidnightSnacks(midnight_snacks);
                break
              case 'LF Meat':
                setALFMidnightSnacks(midnight_snacks);
                break;
              case 'MF Meat':
                setAMFMidnightSnacks(midnight_snacks);
                break;
              case 'HF Meat':
                setAHFMidnightSnacks(midnight_snacks);
                break;
              case 'Fat':
                setAFatMidnightSnacks(midnight_snacks);
                break;
              case 'Sugar':
                setASugarMidnightSnacks(midnight_snacks);
                break;
              default:
                break;
            }
          });
        },
        (error) => {
          console.log('Error performing SELECT query:', error);
        }
      );
    });
  };
  const addFoodToMeal = (section, food) => {
    const updatedMealPlan = { ...MidnightSnacks };
    if (updatedMealPlan[section]) {
      const isDuplicate = updatedMealPlan[section].some((item) => item.id === food.id);
      if (isDuplicate) {
        Alert.alert('Duplicate Food', 'You have already selected this food.');
        return;
      }
      let measurementInfo = '';
      if(food.household_measure == 0){
        measurementInfo = householdMeasureMidnightSnacks
      }
      else{
        measurementInfo = food.measurement.map((measure, index) => {
          const value = measure * sectionsWithVal.find((s) => s.name === selectedSection)?.value;
          return `${value} ${food.label[index]}`;
  
        }).join(' or ');
      }
      
      updatedMealPlan[section].push({...food,measurementInfo});
    } else {
      let measurementInfo = '';
      if(food.household_measure == 0){
        measurementInfo = householdMeasureMidnightSnacks
      }
      else{
        measurementInfo = food.measurement.map((measure, index) => {
          const value = measure * sectionsWithVal.find((s) => s.name === selectedSection)?.value;
          return `${value} ${food.label[index]}`;
  
        }).join(' or ');
      }
      updatedMealPlan[section] = [{...food,measurementInfo}];
    }
  
    if (!food.household_measure) {
      setShowHouseholdMeasure(true);
    }
  
    setMidnightSnacks(updatedMealPlan);
    
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
            let updatedMealPlan = { ...MidnightSnacks };
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
              setMidnightSnacks(updatedMealPlan);
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
      <View style={styles.inputContainer}>
        <View>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedSection}
            onValueChange={(itemValue, itemIndex) => setSelectedSection(itemValue)}
          >
            {sectionsWithVal.map((section) => (
              <Picker.Item
              key={section.name}
              label={section.name === "Recommended" ? section.name : `${section.name} (${section.value})`}
              value={section.name}
            />
            ))}
          </Picker>
        </View>
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
      </View>

      {selectedSection === 'Recommended' && noRecommendedFoods ? (
        <>
        <Text style={styles.noMealMessageText}>No food to recommend</Text>
      <View style={styles.noMealMessageIcon}>
        <Ionicons name="restaurant" size={50} color="green" />
      </View>
      </>
      ) : selectedSection === 'Food Group' && foodGroupSelected ? ( // Step 3: Conditional rendering
        <>
        <Text style={styles.noMealMessageText}>Choose food group in the dropdown <Ionicons name="caret-down-outline" size={25} color="green" /></Text>
      </>
      ): (
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
                {food.recom === 'Recommended' && food.meal_group && food.meal_group.length > 0 ? (
                  ` ( ${food.meal_group.map((group, index) => (
                    `${group} = ${food.exchange[index]}`
                  )).join(', ')} )`
                ) : ''}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={styles.mealtextContainer}>
        <Text style={styles.mealPlanText}>Meal Plan:</Text>
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.menuBar}
            placeholder='Menu...'
            value={menuMidnightSnacks}
            onChangeText={setmenuMidnightSnacks}
          >
          </TextInput>
        </View>
      </View>
      <FlatList
        style={styles.mealPlanContainer}
        data={Object.entries(MidnightSnacks)}
        keyExtractor={(item) =>
          item[0] === "Recommended"
            ? item[1][0].meal_group.join(", ")
            : item[0]
        }
        renderItem={({ item }) => (
          <View style={styles.mealPlanSection}>
          {item[0] === "Recommended" ? (
            item[1].map((food) => (
              <View key={food.id}>
                <Text style={styles.mealPlanSectionTitle}>
                  {food.meal_group.join(", ")}
                </Text>
                {food.household_measure === false && showHouseholdMeasure && (
                  <TextInput
                    style={styles.menuBar}
                    value={householdMeasureBreakfast}
                    onChangeText={setHouseholdMeasureBreakfast}
                    placeholder="Household measure"
                  />
                )}
                <TouchableOpacity
                  style={styles.mealPlanFood}
                  onPress={() => deleteFoodFromMeal("Recommended", food)}
                >
                  <Text>
                    {food.meal_name}
                    {food.measurementInfo ? ` - ${food.measurementInfo}` : ""}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.mealPlanSectionTitle}>{item[0]}</Text>
              <FlatList
                data={item[1]}
                keyExtractor={(food) => food.id.toString()}
                renderItem={({ item: food, index }) => (
                  <View key={food.id}>
                    {!food.household_measure && index === 0 && showHouseholdMeasure && (
                      <TextInput
                        style={styles.menuBar}
                        value={householdMeasureMidnightSnacks}
                        onChangeText={setHouseholdMeasureMidnightSnacks}
                        placeholder="Household measure"
                      />
                    )}
                    <TouchableOpacity
                      style={styles.mealPlanFood}
                      onPress={() => deleteFoodFromMeal(item[0], food)}
                    >
                      <Text>
                        {food.meal_name}
                        {food.measurementInfo ? ` - ${food.measurementInfo}` : ""}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
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
    width: 227,
    marginTop: 10,
    marginBottom: 10
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
  marginBottom: 20,
},
});

export default MidSnacks;
