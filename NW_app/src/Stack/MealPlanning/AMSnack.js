import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ResultContext } from '../../Components/ResultContext';
import foodsData from '../../meals/foods.json';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mydatabase.db');

const AMSnack = () => {
  
  const {C_meal_titleID,C_exchangesID,milkChoice,breakfast} = useContext(ResultContext);
  const parsedbreakfast = typeof breakfast === 'string' ? JSON.parse(breakfast) : breakfast;
  const [tableData, setTableData] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFoodIds, setSelectedFoodIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [showHouseholdMeasure, setShowHouseholdMeasure] = useState(false);
  
  const { AMSnack, setAMSnack } = useContext(ResultContext);
  const { AvegetablesAMSnacks, AfruitAMSnacks, AriceAAMSnacks, AriceBAMSnacks, AriceCAMSnacks, AMilkAMSnacks, ALFAMSnacks, AMFAMSnacks,AHFAMSnacks, AFatAMSnacks, ASugarAMSnacks,
    setAvegetablesAMSnacks,
    setAfruitAMSnacks,
    setAriceAAMSnacks,
    setAriceBAMSnacks,
    setAriceCAMSnacks,
    setAMilkAMSnacks,
    setALFAMSnacks,
    setAMFAMSnacks,
    setAHFAMSnacks,
    setAFatAMSnacks,
    setASugarAMSnacks} = useContext(ResultContext);

  const { menuAmSnacks, setmenuAmSnacks ,householdMeasureAmSnacks, setHouseholdMeasureAmSnacks }= useContext(ResultContext);

  const fetchData = () => {
    if (selectedSection !== '') {
      const sectionData = foodsData.filter((food) => food.meal_group === selectedSection);
      setFoods(sectionData);
      setFilteredFoods(sectionData);
    }
  };

  const sectionsWithVal = [
    { name: 'Food Group', value: 'Exchange' },
    { name: 'Vegetable', value: AvegetablesAMSnacks },
    { name: 'Fruit', value: AfruitAMSnacks },
    { name: 'Rice A', value: AriceAAMSnacks },
    { name: 'Rice B', value: AriceBAMSnacks },
    { name: 'Rice C', value: AriceCAMSnacks },
    { name: milkChoice, value: AMilkAMSnacks },
    { name: 'Low Fat Meat', value: ALFAMSnacks },
    { name: 'Medium Fat Meat', value: AMFAMSnacks },
    { name: 'High Fat Meat', value: AHFAMSnacks },
    { name: 'Fat', value: AFatAMSnacks },
    { name: 'Sugar', value: ASugarAMSnacks },
  ].filter(section => section.value !== 0);


  useEffect(() => {
    fetchData();
    fetchDataFromDatabase();
    console.log("BF",parsedbreakfast)
  }, [selectedSection]);

  const fetchDataFromDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT id, food_group, am_snacks FROM distribution_exchange WHERE exchange_id = ?`,
        [C_exchangesID],
        (_, { rows }) => {
          const data = rows._array;
          setTableData(data);
          // Assign the fetched data to the respective variables
          data.forEach((item) => {
            const { am_snacks, food_group, id } = item;
            
            switch (food_group) {
              case 'Vegetable':
                setAvegetablesAMSnacks(am_snacks);
                break;
              case 'Fruit':
                setAfruitAMSnacks(am_snacks);
                break;
              case 'Rice A':
                setAriceAAMSnacks(am_snacks);
                break;
              case 'Rice B':
                setAriceBAMSnacks(am_snacks);
                break;
              case 'Rice C':
                setAriceCAMSnacks(am_snacks);
                break;
              case 'Milk':
                setAMilkAMSnacks(am_snacks);
                break;
              case 'LF Meat':
                setALFAMSnacks(am_snacks);
                break;
              case 'MF Meat':
                setAMFAMSnacks(am_snacks);
                break;
              case 'HF Meat':
                setAHFAMSnacks(am_snacks);
                break;
              case 'Fat':
                setAFatAMSnacks(am_snacks);
                break;
              case 'Sugar':
                setASugarAMSnacks(am_snacks);
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
    const updatedMealPlan = { ...AMSnack };
    if (updatedMealPlan[section]) {
      const isDuplicate = updatedMealPlan[section].some((item) => item.id === food.id);
      if (isDuplicate) {
        Alert.alert('Duplicate Food', 'You have already selected this food.');
        return;
      }
      let measurementInfo = '';
      if(food.household_measure == 0){
        measurementInfo = householdMeasureAmSnacks
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
        measurementInfo = householdMeasureAmSnacks
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
  
    setAMSnack(updatedMealPlan);
    
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
            let updatedMealPlan = { ...AMSnack };
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
              setAMSnack(updatedMealPlan);
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
              <Picker.Item key={section.name} label={`${section.name}   (${section.value})`} value={section.name} />
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
            value={menuAmSnacks}
            onChangeText={setmenuAmSnacks}
          >
          </TextInput>
        </View>
      </View>
      <FlatList
        style={styles.mealPlanContainer}
        data={Object.entries(AMSnack)}
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
                      value={householdMeasureAmSnacks}
                      onChangeText={setHouseholdMeasureAmSnacks}
                      placeholder="Household measure"
                    />
                  )}
                  <TouchableOpacity
                    style={styles.mealPlanFood}
                    onPress={() => deleteFoodFromMeal(item[0], food)}
                  >
                    <Text>
                      {food.meal_name}
                      {food.measurementInfo ? ` - ${food.measurementInfo}` : ''}
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
});

export default AMSnack;
