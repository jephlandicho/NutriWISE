import React, { useContext } from 'react';
import { DataTable } from 'react-native-paper';
import { ResultContext } from '../Components/ResultContext';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import MealComponent from '../Components/MealComponent';

const MealPlanResult = () => {
  const { breakfast,AMSnack,lunch,PMSnack,dinner } = useContext(ResultContext);
  const { menuBreakfast, householdMeasureBreakfast } = useContext(ResultContext);
  
  const { AvegetablesBreakfast,AvegetablesAMSnacks,AvegetablesLunch,AvegetablesPMSnacks,AvegetablesDinner,AfruitBreakfast,AfruitAMSnacks,AfruitLunch,AfruitPMSnacks,AfruitDinner,AriceABreakfast,AriceAAMSnacks,AriceALunch,AriceAPMSnacks,AriceADinner,AriceBBreakfast,AriceBAMSnacks,AriceBLunch,AriceBPMSnacks,AriceBDinner,AriceCBreakfast,AriceCAMSnacks,AriceCLunch,AriceCPMSnacks,AriceCDinner,AMilkBreakfast,AMilkAMSnacks,AMilkLunch,AMilkPMSnacks,AMilkDinner,ALFBreakfast,ALFAMSnacks,ALFLunch,ALFPMSnacks,ALFDinner,AMFBreakfast,AMFAMSnacks,AMFLunch,AMFPMSnacks,AMFDinner,AFatBreakfast,AFatAMSnacks,AFatLunch,AFatPMSnacks,AFatDinner,ASugarBreakfast,ASugarAMSnacks,ASugarLunch,ASugarPMSnacks,ASugarDinner } = useContext(ResultContext);

  const parsedbreakfast = typeof breakfast === 'string' ? JSON.parse(breakfast) : breakfast;

  return (
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
          <Text style={styles.mealTime}>Breakfast</Text>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell colSpan={3} style={styles.cellStyle}>
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

      <DataTable.Row>
        <DataTable.Cell colSpan={3} style={styles.cellStyle}>
          <Text style={styles.mealTime}>AM Snacks</Text>
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell colSpan={3} style={styles.cellStyle}>
          <Text style={styles.mealTime}>Lunch</Text>
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell colSpan={3} style={styles.cellStyle}>
          <Text style={styles.mealTime}>PM Snacks</Text>
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell colSpan={3} style={styles.cellStyle}>
          <Text style={styles.mealTime}>Dinner</Text>
        </DataTable.Cell>
      </DataTable.Row>
      </View>
      </ScrollView>

    </DataTable>
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
