import React, { useEffect,useState } from 'react';
import axios from 'axios';
import * as SQLite from 'expo-sqlite';
import NetInfo from '@react-native-community/netinfo';
import { View,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = SQLite.openDatabase('mydatabase.db');

const GetClients = () => {

      useEffect(() => {
            syncDataWhenOnline();
      }, []);

      const syncDataWhenOnline = async () => {
    const isConnected = await checkInternetConnectivity();
    if (isConnected) {
      try {
        const userData = await AsyncStorage.getItem('userData');
        const parsedUserData = JSON.parse(userData);
        const response = await fetch('https://nutriwise.website/api/getAllClient.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ StudentID: parsedUserData.id }),
        });
  
          const result = await response.text(); // Get the response as text
  
          try {
            const parsedResult = JSON.parse(result); // Try parsing the result
            if (parsedResult.success) {
          if (parsedResult.clientData.length > 0) {
            db.transaction((tx) => {
                parsedResult.clientData.forEach((item) => {
                // Check if the client ID already exists in the client table
                tx.executeSql(
                  'SELECT * FROM client WHERE id = ?',
                  [item.c_ID],
                  (_, { rows }) => {
                    if (rows.length === 0) {
                      // Client ID does not exist, proceed with insertion
                      tx.executeSql(
                        'INSERT INTO client (id, lastName, firstName, designation, birthdate, sex, syncData) VALUES (?,?,?,?,?,?,?)',
                        [item.c_ID, item.lastName, item.firstName, item.designation, item.birthdate, item.sex, 1],
                        () => {
                          console.log('Data inserted into client successfully.');
  
                          // Check if the client ID already exists in the client_measurements table
                          tx.executeSql(
                            'SELECT * FROM client_measurements WHERE id = ?',
                            [item.cm_ID],
                            (_, { rows }) => {
                              if (rows.length === 0) {
                                // Client ID does not exist in client_measurements, proceed with insertion
                                tx.executeSql(
                                  'INSERT INTO client_measurements (id, client_id, student_id, assessment_date, waistCircum, hipCircum, weight, height, physicalActLevel, WHR, BMI, remarks, DBW, TER, protein, carbs, fats, syncData) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                                  [
                                    item.cm_ID, item.c_ID, item.s_ID, item.assessment_date, item.waistCircum, item.hipCircum, item.weight, item.height, item.physicalActLevel, item.WHR, item.BMI, item.remarks, item.DBW, item.cmTER, item.cmCarbs, item.cmProtein, item.cmFats, 1
                                  ],
                                  () => {
                              console.log('Data inserted into client_measurements successfully.');
                              tx.executeSql(
                                'INSERT INTO exchanges (id, measurement_id, vegetables, fruit, wholeMilk, lfMilk,nfMilk, sugar, riceA, riceB, riceC, lfMeat, mfMeat,hfMeat, fat, TER, carbohydrates, protein, fats,syncData) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)',
                                [
                                  item.e_ID,item.cm_ID,item.vegetables,item.fruit,item.wholeMilk,item.lfMilk,item.nfMilk,item.sugar,item.riceA,item.riceB,item.riceC,item.lfMeat,item.mfMeat,item.hfMeat,item.fat,item.exTER,item.exCarbs,item.exProtein,item.exFat,
                                  1
                                ],() => {
                                  console.log('Data inserted into exchanges successfully.');
                                  if (parsedResult.exDistrib.length > 0) {
                                      db.transaction((tx) => {
                                        parsedResult.exDistrib.forEach(item => {
                                            tx.executeSql(
                                              'INSERT INTO distribution_exchange (exchange_id, food_group, breakfast, am_snacks, lunch, pm_snacks, dinner,midnight_snacks,syncData) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)',
                                              [
                                                item.e_ID,
                                                item.food_group,
                                                item.breakfast,
                                                item.am_snacks,
                                                item.lunch,
                                                item.pm_snacks,
                                                item.dinner,
                                                item.midnight_snacks,
                                                1
                                              ],
                                              () => {
                                                console.log('Data inserted into distribution_exchange successfully.');
                                                parsedResult.mealtitle.forEach(item => {
                                                    tx.executeSql(
                                                      'INSERT INTO meal_title (id,exchanges_id, meal_title,syncData) VALUES (?,?, ?,?)',
                                                      [item.mt_ID,item.e_ID, item.meal_title,1],
                                                      () => {
                                                        console.log('Data inserted into meal_title successfully.');
                                                      },
                                                      (error) => {
                                                        console.log('Error inserting data into meal_title: ', error);
                                                      })
                                                    }),
                                                    parsedResult.meal.forEach(item => {
                                                      tx.executeSql(
                                                        'INSERT INTO meal (id, meal_title_id, meal_name, meal_time, syncData) VALUES (?, ?, ?, ?, ?)',
                                                        [item.m_ID, item.mt_ID, item.meal_name, item.meal_time, 1],
                                                        () => {
                                                          console.log('Data inserted into meal successfully.');
                                                        },
                                                        (error) => {
                                                          console.log('Error inserting data into meal: ', error);
                                                        })
                                                      }),
                                  
                                                      parsedResult.mealplan.forEach(item => {
                                    tx.executeSql(
                                      "SELECT * FROM meal_plan WHERE meal_name_id = ?",
                                      [item.m_ID],
                                      (_, { rows }) => {
                                        if (rows.length > 0) {
                                          // Record already exists, delete the existing record
                                          tx.executeSql(
                                            "DELETE FROM meal_plan WHERE meal_name_id = ?",
                                            [item.m_ID],
                                            () => {
                                              console.log('Existing record deleted successfully.');
                                              
                                              // Now, insert the new data
                                              tx.executeSql(
                                                "INSERT INTO meal_plan (meal_name_id, exchange_distribution, food_id, household_measurement, syncData) VALUES (?, ?, ?, ?, ?)",
                                                [item.m_ID, item.exchange_distribution, item.food_id, item.household_measurement, 1],
                                                () => {
                                                  console.log('Data inserted into meal_plan successfully.');
                                                },
                                                (error) => {
                                                  console.log('Error inserting data into meal_plan: ', error);
                                                }
                                              );
                                            },
                                            (error) => {
                                              console.log('Error deleting existing record: ', error);
                                            }
                                          );
                                        } else {
                                          // No record found, proceed with the insertion
                                          tx.executeSql(
                                            "INSERT INTO meal_plan (meal_name_id, exchange_distribution, food_id, household_measurement, syncData) VALUES (?, ?, ?, ?, ?)",
                                            [item.m_ID, item.exchange_distribution, item.food_id, item.household_measurement, 1],
                                            () => {
                                              console.log('Data inserted into meal_plan successfully.');
                                            },
                                            (error) => {
                                              console.log('Error inserting data into meal_plan: ', error);
                                            }
                                          );
                                        }
                                      },
                                      (error) => {
                                        console.log('Error checking for existing record: ', error);
                                      }
                                    );
                                  });
                                  
                                                 
                                              },
                                              (error) => {
                                                console.log('Error inserting data into distribution_exchange: ', error);
                                              })
                                        });
                                      });
                                    } else {
                                      console.log('No food groups found');
                                    }
                                },
                                (error) => {
                                  console.log('Error inserting data into exchanges: ', error);
                                })
                            },
                                  (error) => {
                                    console.log('Error inserting data into client_measurements: ', error);
                                  }
                                );
                              } else {
                                console.log('Client with ID', item.c_ID, 'already exists in client_measurements. Skipping insertion.');
                              }
                            },
                            (error) => {
                              console.log('Error checking for existing client_measurements record: ', error);
                            }
                          );
                        },
                        (error) => {
                          console.log('Error inserting data into client: ', error);
                        }
                      );
                    } else {
                      console.log('Client with ID', item.c_ID, 'already exists. Skipping insertion.');
                    }
                  },
                  (error) => {
                    console.log('Error checking for existing client record: ', error);
                  }
                );
              });
            });
          } else {
            console.log('No client data found');
          }
        } else {
              console.error('API Error:', parsedResult.message);
            }
          } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
          }
        // Inserting client if not already exists
        
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
    }
  };
  

  const checkInternetConnectivity = async () => {
    const netInfoState = await NetInfo.fetch();
    return netInfoState.isConnected;
  };




  return (
    <View>
      {/* You can add any UI elements related to the SyncComponent here */}
    </View>
  );
};

export default GetClients;