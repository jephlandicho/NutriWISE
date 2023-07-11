import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { ResultContext } from '../Components/ResultContext';

function MeasurementSummary() {
  const {
    clientName,
    clientAge,
    clientSex,
    waistC,
    hipC,
    varweight,
    varheight,
    pal,
    whr,
    bmi,
    dbw,
    carbs,
    protein,
    fats,
    TER,
    normal,
  } = useContext(ResultContext);

  useEffect(() => {
    const db = SQLite.openDatabase('mydatabase.db');
    // Open the database connection
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS clients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, sex TEXT, waistC REAL, hipC REAL, varweight REAL, varheight REAL, pal REAL, whr REAL, bmi REAL, dbw REAL, carbs REAL, protein REAL, fats REAL, TER REAL, normal TEXT)',
        [],
        () => {
          console.log('Table created successfully.');
        },
        (error) => {
          console.log('Error creating table: ', error);
        }
      );
    });
    return () => {
      // Close the database connection when the component unmounts
      db.close();
    };
  }, []);

  const insertData = () => {
    const db = SQLite.openDatabase('mydatabase.db');
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO clients (name, age, sex, waistC, hipC, varweight, varheight, pal, whr, bmi, dbw, carbs, protein, fats, TER, normal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          clientName,
          clientAge,
          clientSex,
          waistC,
          hipC,
          varweight,
          varheight,
          pal,
          whr,
          bmi,
          dbw,
          carbs,
          protein,
          fats,
          TER,
          normal,
        ],
        () => {
          console.log('Data inserted successfully.');
        },
        (error) => {
          console.log('Error inserting data: ', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* Your component's UI */}
      <Button title="Save Data" onPress={insertData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MeasurementSummary;
