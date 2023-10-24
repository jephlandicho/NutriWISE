import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, FlatList, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ResultContext } from '../../Components/ResultContext';
import { useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import foodsData from '../../meals/foods.json';

const db = SQLite.openDatabase('mydatabase.db');

const Breakfast = () => {
  const {C_meal_titleID,setC_meal_titleID,C_exchangesID,setC_exchangesID,milkChoice,setMilkChoice} = useContext(ResultContext);
  const [tableData, setTableData] = useState([]);
  const route = useRoute();
  const { id,e_ID } = route.params;
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedFoodIds, setSelectedFoodIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [showHouseholdMeasure, setShowHouseholdMeasure] = useState(false);
  
  const { breakfast, setBreakfast } = useContext(ResultContext);
  // AHFDinner,setAHFDinner
  const { AvegetablesBreakfast, AfruitBreakfast, ASugarBreakfast, ALFBreakfast, AMFBreakfast, AriceABreakfast, AriceBBreakfast, AriceCBreakfast, AFatBreakfast,AHFBreakfast,setAvegetablesBreakfast,
    setAfruitBreakfast,
    setAriceABreakfast,
    setAriceBBreakfast,
    setAriceCBreakfast,
    setALFBreakfast,
    setAMFBreakfast,
    setAHFBreakfast,
    setAFatBreakfast,
    setASugarBreakfast,
    AWholeMilkBreakfast,
    ALFMilkBreakfast,
    ANFMilkBreakfast,setAWholeMilkBreakfast,
    setALFMilkBreakfast,
    setANFMilkBreakfast } = useContext(ResultContext);

  const { menuBreakfast, setmenuBreakfast ,householdMeasureBreakfast, setHouseholdMeasureBreakfast }= useContext(ResultContext);

  const fetchData = () => {
    if (selectedSection !== '') {
      const sectionData = foodsData.filter((food) => food.meal_group === selectedSection);
      setFoods(sectionData);
      setFilteredFoods(sectionData);
    }
    
    if (selectedSection === 'Recommended') {
      const criteria = {
        'Fruit': AfruitBreakfast,
        'Rice A': AriceABreakfast,
        'Rice B': AriceBBreakfast,
        'Rice C': AriceCBreakfast,
        'Low Fat Meat': ALFBreakfast,
        'Medium Fat Meat': AMFBreakfast,
        'High Fat Meat': AHFBreakfast,
        'Fat': AFatBreakfast,
        'Sugar': ASugarBreakfast,
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
    
      setFoods(filteredFoods);
      setFilteredFoods(filteredFoods);
    }
     else{
      const sectionData = foodsData.filter((food) => food.meal_group === selectedSection);
      setFoods(sectionData);
      setFilteredFoods(sectionData);
    }
    
  };

  const sectionsWithVal = [
    { name: 'Food Group',value: 'Exchanges'},
    { name: 'Recommended',value: 1},
    { name: 'Vegetable', value: AvegetablesBreakfast },
    { name: 'Fruit', value: AfruitBreakfast },
    { name: 'Rice A', value: AriceABreakfast },
    { name: 'Rice B', value: AriceBBreakfast },
    { name: 'Rice C', value: AriceCBreakfast },
    { name: 'Whole Milk', value: AWholeMilkBreakfast },
    { name: 'Low-Fat Milk', value: ALFMilkBreakfast },
    { name: 'Non-Fat Milk', value: ANFMilkBreakfast },
    { name: 'Low Fat Meat', value: ALFBreakfast },
    { name: 'Medium Fat Meat', value: AMFBreakfast },
    { name: 'High Fat Meat', value: AHFBreakfast },
    { name: 'Fat', value: AFatBreakfast },
    { name: 'Sugar', value: ASugarBreakfast },
  ].filter(section => section.value !== 0);
  

  useEffect(() => {
    fetchData();
    fetchDataFromDatabase();
    setC_meal_titleID(id)
    setC_exchangesID(e_ID)
  }, [selectedSection]);

  const fetchDataFromDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT id, food_group, breakfast FROM distribution_exchange WHERE exchange_id = ?`,
        [e_ID],
        (_, { rows }) => {
          const data = rows._array;
          setTableData(data);

  
          // Assign the fetched data to the respective variables
          data.forEach((item) => {
            const { breakfast, food_group, id } = item;
            
            switch (food_group) {
              case 'Vegetable':
                setAvegetablesBreakfast(breakfast);
                break;
              case 'Fruit':
                setAfruitBreakfast(breakfast);
                break;
              case 'Rice A':
                setAriceABreakfast(breakfast);
                break;
              case 'Rice B':
                setAriceBBreakfast(breakfast);
                break;
              case 'Rice C':
                setAriceCBreakfast(breakfast);
                break;
              case 'Whole Milk':
                setAWholeMilkBreakfast(breakfast);
                break;
              case 'Low-Fat Milk':
                setALFMilkBreakfast(breakfast);
                break
              case 'Non-Fat Milk':
                setANFMilkBreakfast(breakfast);
                break
              case 'LF Meat':
                setALFBreakfast(breakfast);
                break;
              case 'MF Meat':
                setAMFBreakfast(breakfast);
                break;
              case 'HF Meat':
                setAHFBreakfast(breakfast);
                break;
              case 'Fat':
                setAFatBreakfast(breakfast);
                break;
              case 'Sugar':
                setASugarBreakfast(breakfast);
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
    const updatedMealPlan = { ...breakfast };
    if (updatedMealPlan[section]) {
      const isDuplicate = updatedMealPlan[section].some((item) => item.id === food.id);
      if (isDuplicate) {
        Alert.alert('Duplicate Food', 'You have already selected this food.');
        return;
      }
      let measurementInfo = '';
      if(food.household_measure == 0){
        measurementInfo = householdMeasureBreakfast
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
        measurementInfo = householdMeasureBreakfast
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
  
    setBreakfast(updatedMealPlan);
    
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
            let updatedMealPlan = { ...breakfast };
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
              setBreakfast(updatedMealPlan);
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
      <View style={styles.mealtextContainer}>
        <Text style={styles.mealPlanText}>Meal Plan:</Text>
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.menuBar}
            placeholder='Menu...'
            value={menuBreakfast}
            onChangeText={setmenuBreakfast}
          >
          </TextInput>
        </View>
      </View>
      <FlatList
  style={styles.mealPlanContainer}
  data={Object.entries(breakfast)}
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
                    value={householdMeasureBreakfast}
                    onChangeText={setHouseholdMeasureBreakfast}
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
});

export default Breakfast;
