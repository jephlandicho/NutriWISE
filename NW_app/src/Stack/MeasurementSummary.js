import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { ResultContext } from '../Components/ResultContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MeasurementSummary() {

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUserData(parsedUserData);
      } else {
        // User data doesn't exist in local storage
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const [userData, setUserData] = useState(null);
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
    birthdate,
    vegetableEx,
    fruitEx,
    milkEx,
    sugarEx,
    riceAEx,
    riceBEx,
    riceCEx,
    LFmeatEx,
    MFmeatEx,
    fatEx,
    totalCarbs,
    totalProtein,
    totalFat,
    totalKcal,
    ClientID,
    setClientID,
  } = useContext(ResultContext);

  let palText;
  if (pal === '30') {
    palText = 'Sedentary';
  } else if (pal === '35') {
    palText = 'Light';
  } else if (pal === '40') {
    palText = 'Moderate';
  } else {
    palText = 'Vigorous';
  }

  const [CAge, setCAge] = useState('');

  let generatedCodes = [];

  function generateUniqueSixDigitCode() {
    let code = '';

    do {
      code = Math.floor(100000 + Math.random() * 900000).toString();
    } while (generatedCodes.includes(code));

    generatedCodes.push(code);

    return code;
  }

  useEffect(() => {
    getUserData();
    setCAge(calculateAge(birthdate));
    const uniqueCode = generateUniqueSixDigitCode();
    setClientID(uniqueCode);

    // Print the unique code
    console.log(uniqueCode);
    const db = SQLite.openDatabase('mydatabase.db');
    // Open the database connection
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS client (id INTEGER PRIMARY KEY, name TEXT, birthdate TEXT, sex TEXT)',
        [],
        () => {
          console.log('client table created successfully.');
        },
        (error) => {
          console.log('Error creating client table: ', error);
        }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS client_measurements (
          id INTEGER PRIMARY KEY,
          client_id INTEGER,
          student_id REAL,
          assessment_date DATE DEFAULT (date('now')),
          waistCircum REAL,
          hipCircum REAL,
          weight REAL,
          height REAL,
          physicalActLevel TEXT,
          WHR REAL,
          BMI REAL,
          remarks TEXT,
          DBW REAL,
          TER REAL,
          protein REAL,
          carbs REAL,
          fats REAL,
          FOREIGN KEY (client_id) REFERENCES client (id)
        )`,
        [],
        () => {
          console.log('client_measurements table created successfully.');
        },
        (error) => {
          console.log('Error creating client_measurements table: ', error);
        }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS exchanges (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          measurement_id INTEGER,
          vegetables REAL,
          fruit REAL,
          milk REAL,
          sugar REAL,
          riceA REAL,
          riceB REAL,
          riceC REAL,
          lfMeat REAL,
          mfMeat REAL,
          fat REAL,
          TER REAL,
          carbohydrates REAL,
          protein REAL,
          fats REAL,
          FOREIGN KEY (measurement_id) REFERENCES client_measurements (id)
        )`,
        [],
        () => {
          console.log('exchanges table created successfully.');
        },
        (error) => {
          console.log('Error creating exchanges table: ', error);
        }
      );
    });

    return () => {
      // Close the database connection when the component unmounts
      db.close();
    };
  }, []);

  function calculateAge(birthdate) {
    const today = new Date();
    const birthdateArray = birthdate.split('-');
    const birthdateObj = new Date(
      birthdateArray[2],
      birthdateArray[0] - 1,
      birthdateArray[1]
    );
    const ageDiff = today - birthdateObj;
    const ageDate = new Date(ageDiff);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);

    return years.toString();
  }

  const insertData = () => {
    const db = SQLite.openDatabase('mydatabase.db');
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO client (id, name, birthdate, sex) VALUES (?, ?, ?, ?)',
        [ClientID, clientName, birthdate, clientSex],
        () => {
          console.log('Data inserted into client successfully.');
        },
        (error) => {
          console.log('Error inserting data into client: ', error);
        }
      );

      tx.executeSql(
        'INSERT INTO client_measurements (client_id, student_id, waistCircum, hipCircum, weight, height, physicalActLevel, WHR, BMI, remarks, DBW, TER, protein, carbs, fats) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
        [
          ClientID,
          userData.id,
          waistC,
          hipC,
          varweight,
          varheight,
          palText,
          whr,
          bmi,
          normal,
          dbw,
          TER,
          protein,
          carbs,
          fats,
        ],
        (tx, resultSet) => {
          const measurementId = resultSet.insertId;
          tx.executeSql(
            'INSERT INTO exchanges (measurement_id, vegetables, fruit, milk, sugar, riceA, riceB, riceC, lfMeat, mfMeat, fat, TER, carbohydrates, protein, fats) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
              measurementId,
              vegetableEx,
              fruitEx,
              milkEx,
              sugarEx,
              riceAEx,
              riceBEx,
              riceCEx,
              LFmeatEx,
              MFmeatEx,
              fatEx,
              totalKcal,
              totalCarbs,
              totalProtein,
              totalFat,
            ],
            () => {
              console.log('Data inserted into exchanges successfully.');
            },
            (error) => {
              console.log('Error inserting data into exchanges: ', error);
            }
          );
        },
        (error) => {
          console.log(
            'Error inserting data into client_measurements: ',
            error
          );
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text>Name: {clientName}</Text>
        </View>
        <View style={styles.column}>
          <Text>Age: {CAge}</Text>
        </View>
        <View style={styles.column}>
          <Text>Sex: {clientSex}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text>Waist</Text>
          <Text>{waistC} cm </Text>
        </View>
        <View style={styles.column}>
          <Text>Hip</Text>
          <Text>{hipC} cm </Text>
        </View>
        <View style={styles.column}>
          <Text>Weight</Text>
          <Text>{varweight} kg</Text>
        </View>
        <View style={styles.column}>
          <Text>Height</Text>
          <Text>{varheight} m</Text>
        </View>
        <View style={styles.column}>
          <Text>PAL</Text>
          <Text>{palText} </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text>Remarks</Text>
          <Text> {normal} </Text>
        </View>
        <View style={styles.column}>
          <Text>WHR</Text>
          <Text> {whr} cm</Text>
        </View>
        <View style={styles.column}>
          <Text>BMI</Text>
          <Text> {bmi} kg/m²</Text>
        </View>
        <View style={styles.column}>
          <Text>DBW</Text>
          <Text> {dbw} kg</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text>Carbohydrates</Text>
          <Text> {carbs} g</Text>
        </View>
        <View style={styles.column}>
          <Text>Protein</Text>
          <Text> {protein} g</Text>
        </View>
        <View style={styles.column}>
          <Text>Fats</Text>
          <Text> {fats} g</Text>
        </View>
        <View style={styles.column}>
          <Text>TER</Text>
          <Text> {TER} kcal</Text>
        </View>
      </View>
      <Button title="Save Data" onPress={insertData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFF',
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
  },
});

export default MeasurementSummary;
