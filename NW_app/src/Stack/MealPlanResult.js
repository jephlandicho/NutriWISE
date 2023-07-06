import React, { useContext } from 'react';
import { DataTable } from 'react-native-paper';
import { ResultContext } from '../Components/ResultContext';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

const MealPlanResult = () => {
  const { breakfast,AMSnack,lunch,PMSnack,dinner } = useContext(ResultContext);
  const { householdMeasureBreakfast } = useContext(ResultContext);
  
  const { AvegetablesBreakfast,AvegetablesAMSnacks,AvegetablesLunch,AvegetablesPMSnacks,AvegetablesDinner,AfruitBreakfast,AfruitAMSnacks,AfruitLunch,AfruitPMSnacks,AfruitDinner,AriceABreakfast,AriceAAMSnacks,AriceALunch,AriceAPMSnacks,AriceADinner,AriceBBreakfast,AriceBAMSnacks,AriceBLunch,AriceBPMSnacks,AriceBDinner,AriceCBreakfast,AriceCAMSnacks,AriceCLunch,AriceCPMSnacks,AriceCDinner,AMilkBreakfast,AMilkAMSnacks,AMilkLunch,AMilkPMSnacks,AMilkDinner,ALFBreakfast,ALFAMSnacks,ALFLunch,ALFPMSnacks,ALFDinner,AMFBreakfast,AMFAMSnacks,AMFLunch,AMFPMSnacks,AMFDinner,AFatBreakfast,AFatAMSnacks,AFatLunch,AFatPMSnacks,AFatDinner,ASugarBreakfast,ASugarAMSnacks,ASugarLunch,ASugarPMSnacks,ASugarDinner } = useContext(ResultContext);

  const parsedbreakfast = typeof breakfast === 'string' ? JSON.parse(breakfast) : breakfast;
  let previousGroup = null;

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
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Breakfast</Text>
        </DataTable.Cell>
      </DataTable.Row>
      
      {Object.keys(parsedbreakfast).map((foodGroup, index) => {
        const mealGroupItems = parsedbreakfast[foodGroup];
        const isFirstGroup = index === 0;
        const shouldRenderGroupCell = foodGroup !== previousGroup;

        previousGroup = foodGroup;

        return (
          <React.Fragment key={index}>
{mealGroupItems.map((item, itemIndex) => (
  <DataTable.Row key={itemIndex}>
    {shouldRenderGroupCell && itemIndex === 0 && (
      <>
        <DataTable.Title rowSpan={mealGroupItems.length} style={styles.cellStyle}>
          <Text>{item.meal_group}</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.cellStyle}>
          {item.meal_group === 'Vegetable' && <Text>{AvegetablesBreakfast}</Text>}
          {item.meal_group === 'Fruit' && <Text>{AfruitBreakfast}</Text>}
          {item.meal_group === 'Sugar' && <Text>{ASugarBreakfast}</Text>}
          {item.meal_group === 'Milk' && <Text>{AMilkBreakfast}</Text>}
          {item.meal_group === 'Low Fat Meat' && <Text>{ALFBreakfast}</Text>}
          {item.meal_group === 'Medium Fat Meat' && <Text>{AMFBreakfast}</Text>}
          {item.meal_group === 'Rice A' && <Text>{AriceABreakfast}</Text>}
          {item.meal_group === 'Rice B' && <Text>{AriceBBreakfast}</Text>}
          {item.meal_group === 'Rice C' && <Text>{AriceCBreakfast}</Text>}
          {item.meal_group === 'Fat' && <Text>{AFatBreakfast}</Text>}
        </DataTable.Title>
      </>
    )}
    {shouldRenderGroupCell && itemIndex !== 0 && (
      <>
        <DataTable.Title style={{ borderWidthTopWidth: 0 }}></DataTable.Title>
        <DataTable.Title style={{ borderWidthTopWidth: 0 }}></DataTable.Title>
      </>
    )}
    <DataTable.Title style={styles.cellStyle} numberOfLines={2}>{item.meal_name}</DataTable.Title>
    <DataTable.Title style={styles.cellStyle} numberOfLines={2}>{item.household_measure}</DataTable.Title>
  </DataTable.Row>
))}

          </React.Fragment>
        );
      })}

      <DataTable.Row>
        <DataTable.Cell colSpan={3} style={styles.cellStyle}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>AM Snacks</Text>
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell colSpan={3} style={styles.cellStyle}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Lunch</Text>
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell colSpan={3} style={styles.cellStyle}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>PM Snacks</Text>
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell colSpan={3} style={styles.cellStyle}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Dinner</Text>
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
    backgroundColor: 'lightgray', // Example background color
  },
});
export default MealPlanResult;
