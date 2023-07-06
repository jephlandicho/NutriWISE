import React, { useContext } from 'react';
import { DataTable } from 'react-native-paper';
import { ResultContext } from '../Components/ResultContext';

const MealPlanResult = () => {
  const { breakfast } = useContext(ResultContext);

  // Check if mealPlan is already an object
  const parsedMealPlan = typeof breakfast === 'string' ? JSON.parse(breakfast) : breakfast;

  let previousGroup = null; // Track the previous meal group

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Meal Group</DataTable.Title>
        <DataTable.Title>Meal Name</DataTable.Title>
        <DataTable.Title>Household Measure</DataTable.Title>
      </DataTable.Header>

      {Object.keys(parsedMealPlan).map((foodGroup, index) => {
        const mealGroupItems = parsedMealPlan[foodGroup];
        const isFirstGroup = index === 0;
        const shouldRenderGroupCell = foodGroup !== previousGroup;

        previousGroup = foodGroup;

        return (
          <React.Fragment key={index}>
            {mealGroupItems.map((item, itemIndex) => (
              <DataTable.Row key={itemIndex}>
                {shouldRenderGroupCell && itemIndex === 0 && (
                  <DataTable.Cell rowSpan={mealGroupItems.length}>{item.meal_group}</DataTable.Cell>
                )}
                {!shouldRenderGroupCell && itemIndex === 0 && (
                  <DataTable.Cell rowSpan={mealGroupItems.length} style={{ borderWidth: 0 }}></DataTable.Cell>
                )}
                {shouldRenderGroupCell && itemIndex !== 0 && (
                  <DataTable.Cell style={{ borderWidthTopWidth: 0 }}></DataTable.Cell>
                )}
                <DataTable.Cell>{item.meal_name}</DataTable.Cell>
                <DataTable.Cell>{item.household_measure}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </React.Fragment>
        );
      })}
    </DataTable>
  );
};

export default MealPlanResult;
