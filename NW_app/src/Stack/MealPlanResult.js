import React, { useContext,useState } from 'react';
import { DataTable } from 'react-native-paper';
import { ResultContext } from '../Components/ResultContext';
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native';
import MealComponent from '../Components/MealComponent';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mydatabase.db');

const MealPlanResult = () => {
  const navigation = useNavigation();
  const {C_meal_titleID} = useContext(ResultContext);
  // ID for meal/menu
  const [MealBreakfastID, setMealBreakfastID] = useState(null);
  const [MealAMSnacksID, setMealAMSnacksID] = useState(null);
  const [MealLunchID, setMealLunchID] = useState(null);
  const [MealPMSnacksID, setMealPMSnacksID] = useState(null);
  const [MealDinnerID, setMealDinnerID] = useState(null);
  const { breakfast,AMSnack,lunch,PMSnack,Dinner } = useContext(ResultContext);

  const { menuBreakfast,menuAmSnacks,menuLunch,menuPmSnacks,menuDinner  } = useContext(ResultContext);
  const {householdMeasureBreakfast,householdMeasureAmSnacks,householdMeasureLunch,householdMeasurePmSnacks,householdMeasureDinner} = useContext(ResultContext);

  const { AvegetablesBreakfast,AvegetablesAMSnacks,AvegetablesLunch,AvegetablesPMSnacks,AvegetablesDinner,AfruitBreakfast,AfruitAMSnacks,AfruitLunch,AfruitPMSnacks,AfruitDinner,AriceABreakfast,AriceAAMSnacks,AriceALunch,AriceAPMSnacks,AriceADinner,AriceBBreakfast,AriceBAMSnacks,AriceBLunch,AriceBPMSnacks,AriceBDinner,AriceCBreakfast,AriceCAMSnacks,AriceCLunch,AriceCPMSnacks,AriceCDinner,AMilkBreakfast,AMilkAMSnacks,AMilkLunch,AMilkPMSnacks,AMilkDinner,ALFBreakfast,ALFAMSnacks,ALFLunch,ALFPMSnacks,ALFDinner,AMFBreakfast,AMFAMSnacks,AMFLunch,AMFPMSnacks,AMFDinner,AFatBreakfast,AFatAMSnacks,AFatLunch,AFatPMSnacks,AFatDinner,ASugarBreakfast,ASugarAMSnacks,ASugarLunch,ASugarPMSnacks,ASugarDinner, MeasurementID } = useContext(ResultContext);
  const { AHFBreakfast,AHFAMSnacks,AHFLunch,AHFPMSnacks,AHFDinner } = useContext(ResultContext);


  const parsedbreakfast = typeof breakfast === 'string' ? JSON.parse(breakfast) : breakfast;
  const parsedAMSnacks = typeof AMSnack === 'string' ? JSON.parse(AMSnack) : AMSnack;
  const parsedLunch = typeof lunch === 'string' ? JSON.parse(lunch) : lunch;
  const parsedPMSnacks = typeof PMSnack === 'string' ? JSON.parse(PMSnack) : PMSnack;
  const parsedDinner = typeof Dinner === 'string' ? JSON.parse(Dinner) : Dinner;

  console.log(parsedbreakfast)
  let generatedCodes = [];

  function generateUniqueSixDigitCode() {
    let code = '';

    do {
      code = Math.floor(100000 + Math.random() * 900000).toString();
    } while (generatedCodes.includes(code));

    generatedCodes.push(code);

    return code;
  }
  React.useEffect(() => {
    createTables();
    const b_ID = generateUniqueSixDigitCode();
    const a_ID = generateUniqueSixDigitCode();
    const l_ID = generateUniqueSixDigitCode();
    const p_ID = generateUniqueSixDigitCode();
    const d_ID = generateUniqueSixDigitCode();
    setMealBreakfastID(b_ID)
    setMealAMSnacksID(a_ID)
    setMealLunchID(l_ID)
    setMealPMSnacksID(p_ID)
    setMealDinnerID(d_ID)
  }, []);

  const createTables = () => {
    db.transaction((tx) => {

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS meal (
          id INTEGER PRIMARY KEY,
          meal_title_id INTEGER,
          meal_name TEXT,
          meal_time TEXT,
          syncData INTEGER,
          FOREIGN KEY (meal_title_id) REFERENCES meal_title (id)
        )`,
        [],
        () => {
          console.log('meal table created successfully.');
        },
        (error) => {
          console.log('Error creating meal table: ', error);
        }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS meal_plan (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          meal_name_id INTEGER,
          exchange_distribution FLOAT,
          food_id INTEGER,
          household_measurement TEXT,
          syncData INTEGER,
          FOREIGN KEY (meal_name_id) REFERENCES meal (id)
        )`,
        [],
        () => {
          console.log('meal_plan table created successfully.');
        },
        (error) => {
          console.log('Error creating meal_plan table: ', error);
        }
      );
    });
  };

  const insertMealPlan = (
    parsedData,
    householdMeasurement,
    setMealID,
    getExchangeDistribution) => {
      db.transaction((tx)=>{
        Object.keys(parsedData).forEach((mealGroup) => {
          parsedData[mealGroup].forEach((mealData) => {
            const { id, household_measure: householdMeasurementData } = mealData;
      
            // Get the exchange distribution for the current meal group
            const exchangeDistribution = getExchangeDistribution(mealGroup);
      
            // Determine the household_measurement to be used
            const finalHouseholdMeasurement = householdMeasurementData || householdMeasurement;
      
            tx.executeSql(
              "INSERT INTO meal_plan (meal_name_id, exchange_distribution, food_id, household_measurement, syncData) VALUES (?, ?, ?, ?, ?)",
              [setMealID, exchangeDistribution, id, finalHouseholdMeasurement, 0],
              (txObj, resultSet) => {
                // Handle success if needed
                console.log("Insertion successful:", resultSet);
              },
              (txObj, error) => {
                // Handle error if needed
                console.log("Error during insertion:", error);
              }
            );
          });
        });
      })

  }
  function getEDBreakfast(mealGroup) {
    switch (mealGroup) {
      case "Fruit":
        return AfruitBreakfast;
      case "Low Fat Meat":
        return ALFBreakfast;
      case "Milk":
        return AMilkBreakfast;
      case "Rice A":
        return AriceABreakfast;
      case "Rice B":
        return AriceBBreakfast;
      case "Rice C":
        return AriceCBreakfast;
      case "Medium Fat Meat":
        return AMFBreakfast;
      case "High Fat Meat":
        return AHFBreakfast
      case "Fat":
        return AFatBreakfast;
      case "Sugar":
        return ASugarBreakfast;
      case "Vegetable":
        return AvegetablesBreakfast;
      default:
        return 0; // You can set a default value here
    }
  }
  
  function getEDAMSnacks(mealGroup) {
    switch (mealGroup) {
      case "Fruit":
        return AfruitAMSnacks;
      case "Low Fat Meat":
        return ALFAMSnacks;
      case "Milk":
        return AMilkAMSnacks;
      case "Rice A":
        return AriceAAMSnacks;
      case "Rice B":
        return AriceBAMSnacks;
      case "Rice C":
        return AriceCAMSnacks;
      case "Medium Fat Meat":
        return AMFAMSnacks;
      case "High Fat Meat":
        return AHFAMSnacks
      case "Fat":
        return AFatAMSnacks;
      case "Sugar":
        return ASugarAMSnacks;
      case "Vegetable":
        return AvegetablesAMSnacks;
      default:
        return 0; // You can set a default value here
    }
  }
  
  function getEDLunch(mealGroup) {
    switch (mealGroup) {
      case "Fruit":
        return AfruitLunch;
      case "Low Fat Meat":
        return ALFLunch;
      case "Milk":
        return AMilkLunch;
      case "Rice A":
        return AriceALunch;
      case "Rice B":
        return AriceBLunch;
      case "Rice C":
        return AriceCLunch;
      case "Medium Fat Meat":
        return AMFLunch;
      case "High Fat Meat":
        return AHFLunch
      case "Fat":
        return AFatLunch;
      case "Sugar":
        return ASugarLunch;
      case "Vegetable":
        return AvegetablesLunch;
      default:
        return 0; // You can set a default value here
    }
  }
  
  function getEDPMSnacks(mealGroup) {
    switch (mealGroup) {
      case "Fruit":
        return AfruitPMSnacks;
      case "Low Fat Meat":
        return ALFPMSnacks;
      case "Milk":
        return AMilkPMSnacks;
      case "Rice A":
        return AriceAPMSnacks;
      case "Rice B":
        return AriceBPMSnacks;
      case "Rice C":
        return AriceCPMSnacks;
      case "Medium Fat Meat":
        return AMFPMSnacks;
      case "High Fat Meat":
        return AHFPMSnacks;
      case "Fat":
        return AFatPMSnacks;
      case "Sugar":
        return ASugarPMSnacks;
      case "Vegetable":
        return AvegetablesPMSnacks;
      default:
        return 0; // You can set a default value here
    }
  }
  function getEDDinner(mealGroup) {
    switch (mealGroup) {
      case "Fruit":
        return AfruitDinner;
      case "Low Fat Meat":
        return ALFDinner;
      case "Milk":
        return AMilkDinner;
      case "Rice A":
        return AriceADinner;
      case "Rice B":
        return AriceBDinner;
      case "Rice C":
        return AriceCDinner;
      case "Medium Fat Meat":
        return AMFDinner;
      case "High Fat Meat":
        return AHFDinner;
      case "Fat":
        return AFatDinner;
      case "Sugar":
        return ASugarDinner;
      case "Vegetable":
        return AvegetablesDinner;
      default:
        return 0; // You can set a default value here
    }
  }
  const insertData = () => {
    const mealData = [
      { meal_name: menuBreakfast, meal_time: 'Breakfast', id: MealBreakfastID },
      { meal_name: menuAmSnacks, meal_time: 'AMSnacks', id: MealAMSnacksID },
      { meal_name: menuLunch, meal_time: 'Lunch', id: MealLunchID },
      { meal_name: menuPmSnacks, meal_time: 'PMSnacks', id: MealPMSnacksID },
      { meal_name: menuDinner, meal_time: 'Dinner', id: MealDinnerID },
    ];

    db.transaction((tx) => {
      mealData.forEach((meal) => {
        tx.executeSql(
          // Save data to meal table
          'INSERT INTO meal (id, meal_title_id, meal_name, meal_time, syncData) VALUES (?, ?, ?, ?, ?)',
          [meal.id, C_meal_titleID, meal.meal_name, meal.meal_time, 0],
          () => {
            console.log(`Data inserted for ${meal.meal_time} successfully.`);
          },
          (error) => {
            console.log(`Error inserting data for ${meal.meal_time}: `, error);
          }
        );
      });
      insertMealPlan(
        parsedbreakfast,
        householdMeasureBreakfast,
        MealBreakfastID,
        getEDBreakfast
      )
      // Am Snacks
      insertMealPlan(
        parsedAMSnacks,
        householdMeasureAmSnacks,
        MealAMSnacksID,
        getEDAMSnacks
      )

      // Lunch
      insertMealPlan(
        parsedLunch,
        householdMeasureLunch,
        MealLunchID,
        getEDLunch
      )

      // PM Snacks
      insertMealPlan(
        parsedPMSnacks,
        householdMeasurePmSnacks,
        MealPMSnacksID,
        getEDPMSnacks
      )

      // Dinner
      insertMealPlan(
        parsedDinner,
        householdMeasureDinner,
        MealDinnerID,
        getEDDinner
      )

    })
    navigation.navigate('Client');
  }
  return (
    <>
    <DataTable>
    <View style={styles.headerContainer}>
      <DataTable.Header>
        <DataTable.Title style={styles.title}>Meal Group</DataTable.Title>
        <DataTable.Title style={styles.title} numberOfLines={2}>No. of Exchange</DataTable.Title>
        <DataTable.Title style={styles.title}>Meal Name</DataTable.Title>
        <DataTable.Title style={styles.title} numberOfLines={2}>Household Measure</DataTable.Title>
      </DataTable.Header>
    </View>
      <ScrollView>
      <View style={styles.resultContainer}>
      <DataTable.Row>
        <DataTable.Cell colSpan={3} style={styles.cellStyle}>
          <Text style={styles.mealTime}>Breakfast | </Text>
          <Text style={styles.meal}>Menu: {menuBreakfast}</Text>
        </DataTable.Cell>
      </DataTable.Row>
      <MealComponent
      parsedMeal={parsedbreakfast}
      Avegetables={AvegetablesBreakfast}
      Afruits={AfruitBreakfast}
      ASugar={ASugarBreakfast}
      AMilk={AMilkBreakfast}
      ALFMeat={ALFBreakfast}
      AMFMeat={AMFBreakfast}
      AHFMeat={AHFBreakfast}
      AriceA={AriceABreakfast}
      AriceB={AriceBBreakfast}
      AriceC={AriceCBreakfast}
      AFat={AFatBreakfast}
      householdMeasure={householdMeasureBreakfast}
      >
      </MealComponent>

      {/* AM SNACKS */}

      <DataTable.Row>
        <DataTable.Cell colSpan={3} style={styles.cellStyle}>
          <Text style={styles.mealTime}>AM Snacks | </Text>
          <Text style={styles.meal}>Menu: {menuAmSnacks}</Text>
        </DataTable.Cell>
      </DataTable.Row>
      <MealComponent
      parsedMeal={parsedAMSnacks}
      Avegetables={AvegetablesAMSnacks}
      Afruits={AfruitAMSnacks}
      ASugar={ASugarAMSnacks}
      AMilk={AMilkAMSnacks}
      ALFMeat={ALFAMSnacks}
      AMFMeat={AMFAMSnacks}
      AHFMeat={AHFAMSnacks}
      AriceA={AriceAAMSnacks}
      AriceB={AriceBAMSnacks}
      AriceC={AriceCAMSnacks}
      AFat={AFatAMSnacks}
      householdMeasure={householdMeasureAmSnacks}
      >
      </MealComponent>

      {/* Lunch */}

      <DataTable.Row>
        <DataTable.Cell colSpan={3} style={styles.cellStyle}>
          <Text style={styles.mealTime}>Lunch | </Text>
          <Text style={styles.meal}>Menu: {menuLunch}</Text>
        </DataTable.Cell>
      </DataTable.Row>

      <MealComponent
      parsedMeal={parsedLunch}
      Avegetables={AvegetablesLunch}
      Afruits={AfruitLunch}
      ASugar={ASugarLunch}
      AMilk={AMilkLunch}
      ALFMeat={ALFLunch}
      AMFMeat={AMFLunch}
      AHFMeat={AHFLunch}
      AriceA={AriceALunch}
      AriceB={AriceBLunch}
      AriceC={AriceCLunch}
      AFat={AFatLunch}
      householdMeasure={householdMeasureLunch}
      >
      </MealComponent>

      {/* PM Snacks */}

      <DataTable.Row>
        <DataTable.Cell colSpan={3} style={styles.cellStyle}>
          <Text style={styles.mealTime}>PM Snacks | </Text>
          <Text style={styles.meal}>Menu: {menuPmSnacks}</Text>
        </DataTable.Cell>
      </DataTable.Row>
      <MealComponent
      parsedMeal={parsedPMSnacks}
      Avegetables={AvegetablesPMSnacks}
      Afruits={AfruitPMSnacks}
      ASugar={ASugarPMSnacks}
      AMilk={AMilkPMSnacks}
      ALFMeat={ALFPMSnacks}
      AMFMeat={AMFPMSnacks}
      AHFMeat={AHFPMSnacks}
      AriceA={AriceAPMSnacks}
      AriceB={AriceBPMSnacks}
      AriceC={AriceCPMSnacks}
      AFat={AFatPMSnacks}
      householdMeasure={householdMeasurePmSnacks}
      >
      </MealComponent>

      {/* Dinner */}

      <DataTable.Row>
        <DataTable.Cell colSpan={3} style={styles.cellStyle}>
          <Text style={styles.mealTime}>Dinner | </Text>
          <Text style={styles.meal}>Menu: {menuDinner}</Text>
        </DataTable.Cell>
      </DataTable.Row>
      
      <MealComponent
      parsedMeal={parsedDinner}
      Avegetables={AvegetablesDinner}
      Afruits={AfruitDinner}
      ASugar={ASugarDinner}
      AMilk={AMilkDinner}
      ALFMeat={ALFDinner}
      AMFMeat={AMFDinner}
      AHFMeat={AHFDinner}
      AriceA={AriceADinner}
      AriceB={AriceBDinner}
      AriceC={AriceCDinner}
      AFat={AFatDinner}
      householdMeasure={householdMeasureDinner}
      >
      </MealComponent>
      <Button title="Save Meal Plan" onPress={insertData} />
      </View>
      
      </ScrollView>
      
    </DataTable>
    
    </>
  );
};

const styles = StyleSheet.create({
  cellStyle: {
    justifyContent: 'center', 
    alignItems: 'center'
  },
  resultContainer:{
    marginBottom:200
  },
  title: {
    justifyContent: 'center', 
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1
  },
  headerContainer: {
    backgroundColor: '#e9e9e9',
  },
  mealTime:{
    fontWeight: 'bold', 
    fontSize: 18
  },
  meal:{
    fontSize: 14
  }
});
export default MealPlanResult;
