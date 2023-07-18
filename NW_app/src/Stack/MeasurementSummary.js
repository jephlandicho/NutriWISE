import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button,Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { ResultContext } from '../Components/ResultContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const db = SQLite.openDatabase('mydatabase.db');
function MeasurementSummary() {

  const navigation = useNavigation();

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
    AvegetablesBreakfast,
    AvegetablesAMSnacks,
    AvegetablesLunch,
    AvegetablesPMSnacks,
    AvegetablesDinner,
    AfruitBreakfast,
    AfruitAMSnacks,
    AfruitLunch,
    AfruitPMSnacks,
    AfruitDinner,
    AriceABreakfast,
    AriceAAMSnacks,
    AriceALunch,
    AriceAPMSnacks,
    AriceADinner,
    AriceBBreakfast,
    AriceBAMSnacks,
    AriceBLunch,
    AriceBPMSnacks,
    AriceBDinner,
    AriceCBreakfast,
    AriceCAMSnacks,
    AriceCLunch,
    AriceCPMSnacks,
    AriceCDinner,
    AMilkBreakfast,
    AMilkAMSnacks,
    AMilkLunch,
    AMilkPMSnacks,
    AMilkDinner,
    ALFBreakfast,
    ALFAMSnacks,
    ALFLunch,
    ALFPMSnacks,
    ALFDinner,
    AMFBreakfast,
    AMFAMSnacks,
    AMFLunch,
    AMFPMSnacks,
    AMFDinner,
    AFatBreakfast,
    AFatAMSnacks,
    AFatLunch,
    AFatPMSnacks,
    AFatDinner,
    ASugarBreakfast,
    ASugarAMSnacks,
    ASugarLunch,
    ASugarPMSnacks,
    ASugarDinner,
    ClientID,
    setClientID,
    C_MeasurementID,setC_MeasurementID,
    C_exchangesID,setC_exchangesID,
    C_meal_titleID,setC_meal_titleID,
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

    const m_ID = generateUniqueSixDigitCode();
    const finalm_ID =  '01' + m_ID 
    setC_MeasurementID(finalm_ID)

    const e_ID = generateUniqueSixDigitCode();
    const finale_ID =  '02' + e_ID 
    setC_exchangesID(finale_ID)

    const mt_ID = generateUniqueSixDigitCode();
    const finalmt_ID =  '03' + mt_ID 
    setC_meal_titleID(finalmt_ID)

    // Check if the client table exists
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='client'",
        [],
        (_, resultSet) => {
          // If the table doesn't exist, create it
          if (resultSet.rows.length === 0) {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS client (id INTEGER PRIMARY KEY, name TEXT, birthdate TEXT, sex TEXT, syncData INTEGER)',
              [],
              () => {
                console.log('client table created successfully.');
              },
              (error) => {
                console.log('Error creating client table: ', error);
              }
            );
          }
        },
        (error) => {
          console.log('Error checking client table existence: ', error);
        }
      );
    });

    // Check if the client_measurements table exists
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='client_measurements'",
        [],
        (_, resultSet) => {
          // If the table doesn't exist, create it
          if (resultSet.rows.length === 0) {
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
                syncData INTEGER,
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
          }
        },
        (error) => {
          console.log('Error checking client_measurements table existence: ', error);
        }
      );
    });

    // Check if the exchanges table exists
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='exchanges'",
        [],
        (_, resultSet) => {
          // If the table doesn't exist, create it
          if (resultSet.rows.length === 0) {
            tx.executeSql(
              `CREATE TABLE IF NOT EXISTS exchanges (
                id INTEGER PRIMARY KEY,
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
                syncData INTEGER,
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
          }
        },
        (error) => {
          console.log('Error checking exchanges table existence: ', error);
        }
      );
    });

    // Check if the distribution_exchange table exists
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='distribution_exchange'",
        [],
        (_, resultSet) => {
          // If the table doesn't exist, create it
          if (resultSet.rows.length === 0) {
            tx.executeSql(
              `CREATE TABLE IF NOT EXISTS distribution_exchange (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                exchange_id INTEGER,
                food_group TEXT,
                breakfast REAL,
                am_snacks REAL,
                lunch REAL,
                pm_snacks REAL,
                dinner REAL,
                syncData INTEGER,
                FOREIGN KEY (exchange_id) REFERENCES exchanges(id)
              )`,
              [],
              () => {
                console.log('distribution_exchange table created successfully.');
              },
              (error) => {
                console.log('Error creating distribution_exchange table: ', error);
              }
            );
          }
        },
        (error) => {
          console.log('Error checking distribution_exchange table existence: ', error);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='meal_title'",
        [],
        (_, resultSet) => {
          // If the table doesn't exist, create it
          if (resultSet.rows.length === 0) {
            tx.executeSql(
              `CREATE TABLE IF NOT EXISTS meal_title (
                id INTEGER PRIMARY KEY,
                exchanges_id INTEGER,
                meal_title TEXT,
                syncData INTEGER,
                FOREIGN KEY (exchanges_id) REFERENCES exchanges (id)
              )`,
              [],
              () => {
                console.log('meal_title table created successfully.');
              },
              (error) => {
                console.log('Error creating meal_title table: ', error);
              }
            );
          }
        },
        (error) => {
          console.log('Error checking distribution_exchange table existence: ', error);
        }
      );
    });
  }, []);

  function calculateAge(birthdate) {
    const today = new Date();
    const birthdateArray = birthdate.split('-');
    const birthdateObj = new Date(
      birthdateArray[0],
      birthdateArray[1] - 1,
      birthdateArray[2]
    );
    const ageDiff = today - birthdateObj;
    const ageDate = new Date(ageDiff);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
  
    return years.toString();
  }
  

  const insertData = () => {
    
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO client (id, name, birthdate, sex,syncData) VALUES (?, ?, ?, ?,?)',
        [ClientID, clientName, birthdate, clientSex,0],
        () => {
          console.log('Data inserted into client successfully.');
          
        },
        (error) => {
          console.log('Error inserting data into client: ', error);
        }
      );
      
      tx.executeSql(
        'INSERT INTO client_measurements (id, client_id, student_id, waistCircum, hipCircum, weight, height, physicalActLevel, WHR, BMI, remarks, DBW, TER, protein, carbs, fats,syncData) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)',
        [
          C_MeasurementID,
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
          0
        ],
        (tx, resultSet) => {
          const measurementId = resultSet.insertId;
          tx.executeSql(
            'INSERT INTO exchanges (id, measurement_id, vegetables, fruit, milk, sugar, riceA, riceB, riceC, lfMeat, mfMeat, fat, TER, carbohydrates, protein, fats,syncData) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
            [
              C_exchangesID,
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
              0
            ],
            (tx, resultSet) => {
              const exchangeId = resultSet.insertId;
              console.log('Data inserted into exchanges successfully.');
              const distributionExchangeData = [
                {
                  food_group: 'Vegetable',
                  breakfast: AvegetablesBreakfast,
                  am_snacks: AvegetablesAMSnacks,
                  lunch: AvegetablesLunch,
                  pm_snacks: AvegetablesPMSnacks,
                  dinner: AvegetablesDinner,
                },
                {
                  food_group: 'Fruit',
                  breakfast: AfruitBreakfast,
                  am_snacks: AfruitAMSnacks,
                  lunch: AfruitLunch,
                  pm_snacks: AfruitPMSnacks,
                  dinner: AfruitDinner,
                },
                {
                  food_group: 'Rice A',
                  breakfast: AriceABreakfast,
                  am_snacks: AriceAAMSnacks,
                  lunch: AriceALunch,
                  pm_snacks: AriceAPMSnacks,
                  dinner: AriceADinner,
                },
                {
                  food_group: 'Rice B',
                  breakfast: AriceBBreakfast,
                  am_snacks: AriceBAMSnacks,
                  lunch: AriceBLunch,
                  pm_snacks: AriceBPMSnacks,
                  dinner: AriceBDinner,
                },
                {
                  food_group: 'Rice C',
                  breakfast: AriceCBreakfast,
                  am_snacks: AriceCAMSnacks,
                  lunch: AriceCLunch,
                  pm_snacks: AriceCPMSnacks,
                  dinner: AriceCDinner,
                },
                {
                  food_group: 'Milk',
                  breakfast: AMilkBreakfast,
                  am_snacks: AMilkAMSnacks,
                  lunch: AMilkLunch,
                  pm_snacks: AMilkPMSnacks,
                  dinner: AMilkDinner,
                },
                {
                  food_group: 'LF Meat',
                  breakfast: ALFBreakfast,
                  am_snacks: ALFAMSnacks,
                  lunch: ALFLunch,
                  pm_snacks: ALFPMSnacks,
                  dinner: ALFDinner,
                },
                {
                  food_group: 'MF Meat',
                  breakfast: AMFBreakfast,
                  am_snacks: AMFAMSnacks,
                  lunch: AMFLunch,
                  pm_snacks: AMFPMSnacks,
                  dinner: AMFDinner,
                },
                {
                  food_group: 'Fat',
                  breakfast: AFatBreakfast,
                  am_snacks: AFatAMSnacks,
                  lunch: AFatLunch,
                  pm_snacks: AFatPMSnacks,
                  dinner: AFatDinner,
                },
                {
                  food_group: 'Sugar',
                  breakfast: ASugarBreakfast,
                  am_snacks: ASugarAMSnacks,
                  lunch: ASugarLunch,
                  pm_snacks: ASugarPMSnacks,
                  dinner: ASugarDinner,
                },
              ];
      
              // Insert multiple rows into the distribution_exchange table
              distributionExchangeData.forEach((row,index) => {
                tx.executeSql(
                  'INSERT INTO distribution_exchange (exchange_id, food_group, breakfast, am_snacks, lunch, pm_snacks, dinner,syncData) VALUES (?, ?, ?, ?, ?, ?, ?,?)',
                  [
                    exchangeId,
                    row.food_group,
                    row.breakfast,
                    row.am_snacks,
                    row.lunch,
                    row.pm_snacks,
                    row.dinner,
                    0
                  ],
                  () => {
                    if (index === distributionExchangeData.length - 1) {
                      console.log('distributionExchangeData successfully');
                    }
                  },
                  (error) => {
                    console.log('Error inserting data into distribution_exchange: ', error);
                  })
                })

                  tx.executeSql(
                    'INSERT INTO meal_title (id,exchanges_id, meal_title,syncData) VALUES (?,?, ?,?)',
                    [C_meal_titleID,exchangeId, clientName +' One Day Menu',0],
                    (_, { rowsAffected, insertId }) => {
                      if (rowsAffected > 0) {
                        console.log('Meal title saved successfully');
                        Alert.alert('Success', 'Client Data Saved');
                      navigation.navigate('Client');
                      }
                    },
                    (error) => {
                      console.log('Error saving meal title:', error);
                    }
                  );

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
      <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
      </View>
      <View style={styles.row}>
      <Text>Measurements</Text>
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
      <View style={styles.row}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
      </View>
      <View style={styles.row}>
      <Text>Exchanges</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text>Vegetable</Text>
          <Text> {vegetableEx} </Text>
        </View>
        <View style={styles.column}>
          <Text>Fruit</Text>
          <Text> {fruitEx} </Text>
        </View>
        <View style={styles.column}>
          <Text>Milk</Text>
          <Text> {milkEx} </Text>
        </View>
        <View style={styles.column}>
          <Text>Sugar</Text>
          <Text> {sugarEx}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text>Rice A</Text>
          <Text> {riceAEx} </Text>
        </View>
        <View style={styles.column}>
          <Text>Rice B</Text>
          <Text> {riceBEx} </Text>
        </View>
        <View style={styles.column}>
          <Text>Rice C</Text>
          <Text> {riceCEx} </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text>LF Meat</Text>
          <Text> {LFmeatEx} </Text>
        </View>
        <View style={styles.column}>
          <Text>MF Meat</Text>
          <Text> {MFmeatEx} </Text>
        </View>
        <View style={styles.column}>
          <Text>Fat</Text>
          <Text> {fatEx} </Text>
        </View>
      </View>
      <View style={styles.row}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
      </View>
      <View style={styles.row}>
      <Text>Diet Presciption</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text>Carbohydrates</Text>
          <Text> {totalCarbs} g</Text>
        </View>
        <View style={styles.column}>
          <Text>Protein</Text>
          <Text> {totalProtein} g</Text>
        </View>
        <View style={styles.column}>
          <Text>Fats</Text>
          <Text> {totalFat} g</Text>
        </View>
        <View style={styles.column}>
          <Text>Energy</Text>
          <Text> {totalKcal} kcal</Text>
        </View>
      </View>
      <View style={styles.row}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
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
    marginVertical: 3
  },
  column: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default MeasurementSummary;
