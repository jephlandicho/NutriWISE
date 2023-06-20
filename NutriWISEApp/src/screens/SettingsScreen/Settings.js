import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('nw.db');

const Settings = () => {
  const [mealNames, setMealNames] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='meals'",
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            db.transaction(tx => {
              tx.executeSql(
                'SELECT meal_name FROM meals',
                [],
                (_, { rows }) => {
                  if (rows.length > 0) {
                    const names = rows._array.map(item => item.meal_name);
                    setMealNames(names);
                  }
                },
                (_, error) => {
                  console.error('Error fetching meal names:', error);
                }
              );
            });
          }
        },
        (_, error) => {
          console.error('Error checking for meals table:', error);
        }
      );
    });
  }, []);

  return (
    <View>
      {mealNames.map((mealName, index) => (
        <Text key={index}>{mealName}</Text>
      ))}
    </View>
  );
};

export default Settings;
