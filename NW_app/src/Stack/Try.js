import React, { useEffect, useState } from 'react';
import { View, Text, Alert,StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
  
    const db = SQLite.openDatabase("meals.db");
    return db;
  }
  
  const db = openDatabase();

// const openDatabase = async () => {
//   const dbDirectory = '${FileSystem.documentDirectory}SQLite';
//   const dbFilePath = '${dbDirectory}/meals.db';

//   if (!(await FileSystem.getInfoAsync(dbDirectory)).exists) {
//     await FileSystem.makeDirectoryAsync(dbDirectory);
//   }

//   const asset = Asset.fromModule(require(`SQLite/meals.db`));
//   if (!(await FileSystem.getInfoAsync(dbFilePath)).exists) {
//     await FileSystem.downloadAsync(asset.uri, dbFilePath);
//   }

//   return SQLite.openDatabase('meals.db');
// };

const Try = () => {
  const [mealNames, setMealNames] = useState([]);

  useEffect(() => {

        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM items',
            [],
            (_, result) => {
              const rows = result.rows;
              const names = [];
              for (let i = 0; i < rows.length; i++) {
                names.push(rows.item(i).name);
              }
              setMealNames(names);
            },
            (txObj, error) => {
              console.log('Query error:', error);
            }
          );
        });
  }, []);

  return (
    <View style={styles.container}>
      {mealNames.map((mealName, index) => (
        <Text key={index}>{mealName}</Text>
      ))}
    </View>
  );
};

export default Try;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
  });
