import React, { useContext,useState } from 'react';
import { DataTable } from 'react-native-paper';
import { ResultContext } from '../Components/ResultContext';
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native';
import MealComponent from '../Components/MealComponent';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mydatabase.db');

const MealPlanResult = () => {
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

  const insertData = () => {
    const mealData = [
      { meal_name: menuBreakfast, meal_time: 'Breakfast', id: MealBreakfastID },
      { meal_name: menuAmSnacks, meal_time: 'AMSnacks', id: MealAMSnacksID },
      { meal_name: menuLunch, meal_time: 'Lunch', id: MealLunchID },
      { meal_name: menuPmSnacks, meal_time: 'PMSnacks', id: MealPMSnacksID },
      { meal_name: menuDinner, meal_time: 'Dinner', id: MealDinnerID },
    ];

    // const foodGroupToExchangeDistribution = {
    //   AvegetablesBreakfast,AvegetablesAMSnacks,AvegetablesLunch,AvegetablesPMSnacks,AvegetablesDinner,AfruitBreakfast,AfruitAMSnacks,AfruitLunch,AfruitPMSnacks,AfruitDinner,AriceABreakfast,AriceAAMSnacks,AriceALunch,AriceAPMSnacks,AriceADinner,AriceBBreakfast,AriceBAMSnacks,AriceBLunch,AriceBPMSnacks,AriceBDinner,AriceCBreakfast,AriceCAMSnacks,AriceCLunch,AriceCPMSnacks,AriceCDinner,AMilkBreakfast,AMilkAMSnacks,AMilkLunch,AMilkPMSnacks,AMilkDinner,ALFBreakfast,ALFAMSnacks,ALFLunch,ALFPMSnacks,ALFDinner,AMFBreakfast,AMFAMSnacks,AMFLunch,AMFPMSnacks,AMFDinner,AFatBreakfast,AFatAMSnacks,AFatLunch,AFatPMSnacks,AFatDinner,ASugarBreakfast,ASugarAMSnacks,ASugarLunch,ASugarPMSnacks,ASugarDinner,

    //   Vegetable: [AvegetablesBreakfast, AvegetablesAMSnacks, AvegetablesLunch, AvegetablesPMSnacks, AvegetablesDinner],
    //   Fruit: [AfruitBreakfast, AfruitAMSnacks, AfruitLunch, AfruitPMSnacks, AfruitDinner],
    //   Rice_A: [AriceABreakfast, AriceAAMSnacks, AriceALunch, AriceAPMSnacks, AriceADinner],
    //   Rice_B: [AriceBBreakfast, AriceBAMSnacks, AriceBLunch, AriceBPMSnacks, AriceBDinner],
    //   Rice_C: [AriceBBreakfast, AriceBAMSnacks, AriceBLunch, AriceBPMSnacks, AriceBDinner],
    //   Milk: [AriceBBreakfast, AriceBAMSnacks, AriceBLunch, AriceBPMSnacks, AriceBDinner],
    //   // and so on...
    // };

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
    
    })
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
      AriceA={AriceADinner}
      AriceB={AriceBDinner}
      AriceC={AriceCDinner}
      AFat={AFatDinner}
      householdMeasure={householdMeasureDinner}
      >
      </MealComponent>
      </View>
      <Button title="Save Meal Plan" onPress={insertData} />
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
