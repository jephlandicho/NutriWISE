import React from 'react';
import { DataTable } from 'react-native-paper';
import { Text,StyleSheet } from 'react-native';
const MealComponent = ({ parsedMeal, Avegetables, Afruits, ASugar, AMilk, ALFMeat, AMFMeat,AHFMeat, AriceA, AriceB, AriceC, AFat, householdMeasure }) => {
  let previousGroup = null;

  return (
    <>
      {Object.keys(parsedMeal).map((foodGroup, index) => {
        const mealGroupItems = parsedMeal[foodGroup];
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
                      {item.meal_group === 'Vegetable' && <Text>{Avegetables}</Text>}
                      {item.meal_group === 'Fruit' && <Text>{Afruits}</Text>}
                      {item.meal_group === 'Sugar' && <Text>{ASugar}</Text>}
                      {(item.meal_group === 'Milk' || item.meal_group === 'Whole Milk' || item.meal_group === 'Low-Fat Milk' || item.meal_group === 'Non-Fat Milk') && <Text>{AMilk}</Text>}
                      {item.meal_group === 'Low Fat Meat' && <Text>{ALFMeat}</Text>}
                      {item.meal_group === 'Medium Fat Meat' && <Text>{AMFMeat}</Text>}
                      {item.meal_group === 'High Fat Meat' && <Text>{AHFMeat}</Text>}
                      {item.meal_group === 'Rice A' && <Text>{AriceA}</Text>}
                      {item.meal_group === 'Rice B' && <Text>{AriceB}</Text>}
                      {item.meal_group === 'Rice C' && <Text>{AriceC}</Text>}
                      {item.meal_group === 'Fat' && <Text>{AFat}</Text>}
                    </DataTable.Title>
                  </>
                )}
                {shouldRenderGroupCell && itemIndex !== 0 && (
                  <>
                    <DataTable.Title style={{ borderWidthTopWidth: 0 }}></DataTable.Title>
                    <DataTable.Title style={{ borderWidthTopWidth: 0 }}></DataTable.Title>
                  </>
                )}

                <DataTable.Title style={styles.cellStyle} numberOfLines={5}>{item.meal_name}</DataTable.Title>

                {item.meal_group === 'Vegetable' && !item.household_measure && itemIndex === 0 && (
                  <DataTable.Title rowSpan={mealGroupItems.length} style={styles.cellStyle}>
                    {householdMeasure}
                  </DataTable.Title>
                )}

                {item.meal_group === 'Vegetable' && !item.household_measure && itemIndex !== 0 && (
                  <DataTable.Title style={{ borderWidthTopWidth: 0 }}></DataTable.Title>
                )}

                {item.household_measure && (
                  <DataTable.Title style={styles.cellStyle} numberOfLines={2}>
                    {item.measurementInfo}
                  </DataTable.Title>
                )}
              </DataTable.Row>
            ))}
          </React.Fragment>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
    cellStyle: {
      justifyContent: 'center', 
      alignItems: 'center'
    }
})
export default MealComponent;

