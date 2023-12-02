import React, { useEffect,useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation,useIsFocused  } from '@react-navigation/native';
import { Provider as PaperProvider, DataTable,Avatar,Button } from 'react-native-paper';
import MyTheme from '../Components/MyTheme';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import CustomInput from '../Components/CustomInput';
const db = SQLite.openDatabase('mydatabase.db');
import { useForm } from 'react-hook-form';
import Modal from 'react-native-modal';

function Client() {
  const { control,handleSubmit } = useForm();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    setPage(0);
    if (isFocused) {
      refreshTableData();
      syncDataWhenOnline();
    }
  }, [isFocused]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  const getClientData = async (data) => {
    const isConnected = await checkInternetConnectivity();
  
    if (isConnected) {
      try {
        const response = await fetch('https://nutriwise.website/api/getClient.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
        // Inserting client
        if (result.success) {
          
          if (result.clientData.length > 0) {
            console.log('Client Data:', result.clientData[0].lastName);
            db.transaction((tx) => {
              tx.executeSql(
                'INSERT INTO client (id, lastName,firstName,designation, birthdate, sex,syncData) VALUES (?,?,?,?,?,?,?)',
                [result.clientData[0].c_ID, result.clientData[0].lastName, result.clientData[0].firstName,result.clientData[0].designation, result.clientData[0].birthdate, result.clientData[0].sex,1],
                () => {
                  console.log('Data inserted into client successfully.');
                  // Inserting to client_measurements
                  tx.executeSql(
                    'INSERT INTO client_measurements (id, client_id, student_id, assessment_date, waistCircum, hipCircum, weight, height, physicalActLevel, WHR, BMI, remarks, DBW, TER, protein, carbs, fats,syncData) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)',
                    [
                      result.clientData[0].cm_ID,result.clientData[0].c_ID,result.clientData[0].s_ID,result.clientData[0].assessment_date,result.clientData[0].waistCircum,result.clientData[0].hipCircum,result.clientData[0].weight,result.clientData[0].height,result.clientData[0].physicalActLevel,result.clientData[0].WHR,result.clientData[0].BMI,result.clientData[0].remarks,result.clientData[0].DBW,result.clientData[0].cmTER,result.clientData[0].cmCarbs,result.clientData[0].cmProtein,result.clientData[0].cmFats,1],
                      () => {
                        console.log('Data inserted into client_measurements successfully.');
                        tx.executeSql(
                          'INSERT INTO exchanges (id, measurement_id, vegetables, fruit, wholeMilk, lfMilk,nfMilk, sugar, riceA, riceB, riceC, lfMeat, mfMeat,hfMeat, fat, TER, carbohydrates, protein, fats,syncData) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)',
                          [
                            result.clientData[0].e_ID,result.clientData[0].cm_ID,result.clientData[0].vegetables,result.clientData[0].fruit,result.clientData[0].wholeMilk,result.clientData[0].lfMilk,result.clientData[0].nfMilk,result.clientData[0].sugar,result.clientData[0].riceA,result.clientData[0].riceB,result.clientData[0].riceC,result.clientData[0].lfMeat,result.clientData[0].mfMeat,result.clientData[0].hfMeat,result.clientData[0].fat,result.clientData[0].exTER,result.clientData[0].exCarbs,result.clientData[0].exProtein,result.clientData[0].exFat,
                            1
                          ],() => {
                            console.log('Data inserted into exchanges successfully.');
                          },
                          (error) => {
                            console.log('Error inserting data into exchanges: ', error);
                          })
                      },
                      (error) => {
                        console.log('Error inserting data into client_measurements: ', error);
                      }
                    )
                },
                (error) => {
                  console.log('Error inserting data into client: ', error);
                }
              )
            })
          } else {
            console.log('No client data found');
          }

          const response2 = await fetch('https://nutriwise.website/api/getExDistrib.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          const result2 = await response2.json();
    
          if (result2.success) {

            if (result2.exdtrib.length > 0) {
              db.transaction((tx) => {
              result2.exdtrib.forEach(item => {
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
                      },
                      (error) => {
                        console.log('Error inserting data into distribution_exchange: ', error);
                      })
                });
              });
            } else {
              console.log('No food groups found');
            }


            const response3 = await fetch('https://nutriwise.website/api/getMealPlan.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
      
            const result3 = await response3.json();
      
            if (result3.success) {
              db.transaction((tx) => {
                result3.mealtitle.forEach(item => {
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
                  result3.meal.forEach(item => {
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

                    result3.mealplan.forEach(item => {
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

                });
                Alert.alert('Client Found', 'Client added successfully');
                refreshTableData();
                toggleModal();
              ;
            }
          }
        } else {
          // ID not found, display an alert
          Alert.alert('ID Not Found', result.message);
        }
        // refreshTableData();
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
    } else {
      Alert.alert('No Internet', 'No internet connection found');
    }
  }
  
  

  const syncDataWhenOnline = async () => {
    const isConnected = await checkInternetConnectivity();
    if (isConnected) {
      try {
        const clientData = await fetchClientData();
        const clientMeasurementsData = await fetchClientMeasurementsData();
        const exchangesData = await fetchExchangesData();
        const ExchangesDistrib = await fetchExchangesDistribData();
        const mealTitle = await fetchMealtitleData();
        const meal = await fetchMealData();
        const mealPlan = await fetchMealPlanData();

        // Create the expected data array for the PHP server
        const combinedData = {
          client: clientData,
          client_measurements: clientMeasurementsData,
          exchanges: exchangesData,
          distribution_exchange: ExchangesDistrib,
          meal_title: mealTitle,
          meal: meal,
          meal_plan: mealPlan,
        };

        await syncDataToMySQL(combinedData);

        console.log('All data synchronized successfully!');
      } catch (error) {
        console.log('Error synchronizing data:', error);
      }
    } else {
      Alert.alert('No Internet', 'No internet connection found');
    }
  };

  const syncDataToMySQL = async (combinedData) => {
    try {
      const endpoint = 'https://nutriwise.website/api/syncData.php';

      const response = await axios.post(endpoint, combinedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Data synchronization response:', response.data);
      await markRecordsAsSynced();
    } catch (error) {
      console.log('Data synchronization error:', error);
    }
  };

  const markRecordsAsSynced = async () => {
    try {
      await updateTable('client');
      await updateTable('client_measurements');
      await updateTable('exchanges');
      await updateTable('distribution_exchange');
      await updateTable('meal_title');
      await updateTable('meal');
      await updateTable('meal_plan');
      console.log('All records marked as synced');
    } catch (error) {
      console.log('Error marking records as synced:', error);
    }
  };

  const updateTable = async (tableName) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE ${tableName} SET syncData = 1 WHERE syncData = 0;`,
          [],
          (_, { rowsAffected }) => {
            console.log(`${rowsAffected} records in ${tableName} marked as synced`);
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const checkInternetConnectivity = async () => {
    const netInfoState = await NetInfo.fetch();
    return netInfoState.isConnected;
  };

  const fetchClientData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM client WHERE syncData = 0',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const fetchClientMeasurementsData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM client_measurements WHERE syncData = 0',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const fetchExchangesData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM exchanges WHERE syncData = 0',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const fetchExchangesDistribData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM distribution_exchange WHERE syncData = 0',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const fetchMealtitleData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM meal_title WHERE syncData = 0',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const fetchMealData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM meal WHERE syncData = 0',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const fetchMealPlanData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM meal_plan WHERE syncData = 0',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const handleDelete = (id) => {
    
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM client WHERE id = ?',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert('Success', 'Item deleted successfully');
            console.log('Item deleted successfully');
            refreshTableData(); // Call a function to refresh the table data
          }
        },
        (error) => {
          console.log('Error deleting item:', error);
        }
      );
    });
  };

  const handleView = (id) => {
    navigation.navigate('ClientMeasurements', { id });
  };

  const refreshTableData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM client ORDER BY lastName ASC',
        [],
        (_, { rows }) => {
          const data = rows._array;
          setTableData(data); // Update the table data state
        },
        (error) => {
          console.log('Error fetching table data: ', error);
        }
      );
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM client WHERE lastName LIKE '%${query}%'`,
        [],
        (_, { rows }) => {
          const data = rows._array;
          setTableData(data); // Update the table data state
        },
        (error) => {
          console.log('Error searching table data: ', error);
        }
      );
    });
  };


  const from = page * itemsPerPage;
  const to = from + itemsPerPage;
  const displayedData = tableData.slice(from, to);

  return (
    <PaperProvider theme={MyTheme}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search client's last name..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Button mode='contained' onPress={toggleModal}> Add existing Client </Button>
        <ScrollView style={styles.tableBodyContainer}>
          {displayedData.length > 0 ? (
            displayedData.map((item) => (
              <View key={item.id} style={styles.contactContainer}>
                <TouchableOpacity onPress={() => handleView(item.id)}>
                <View style={styles.avatarContainer}>
                <Avatar.Text
                size={50}
                label={item.lastName.charAt(0).toUpperCase() + item.firstName.charAt(0).toUpperCase()}
                color={MyTheme.colors.background}
              />
                </View>
                </TouchableOpacity>
                <View style={styles.contactInfo}>
                <Text>ID: {item.id}</Text>
                <TouchableOpacity onPress={() => handleView(item.id)}>
                  <Text style={styles.contactName}>{item.lastName}, {item.firstName}</Text>
                </TouchableOpacity>
                  {(() => {
                  const today = new Date();
                  const birthdateArray = item.birthdate.split('-');
                  const birthdateObj = new Date(
                    birthdateArray[0],
                    birthdateArray[1] - 1,
                    birthdateArray[2]
                  );
                  const ageDiff = today - birthdateObj;
                  const ageDate = new Date(ageDiff);
                  const years = Math.abs(ageDate.getUTCFullYear() - 1970);
                  const age = years.toString();
                  return <Text>{age} | {item.sex} | {item.designation}</Text>;
                })()}
                  
                </View>
                <View style={styles.contactActions}>
                  <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
                    <Ionicons name="md-trash-outline" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No Clients found</Text>
          )}
        </ScrollView>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(tableData.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${Math.min((page + 1) * itemsPerPage, tableData.length)} of ${
            tableData.length
          }`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          selectPageDropdownLabel={'Rows per page'}
        />
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <CustomInput
              title="Client ID"
              name="ClientID"
              label="Client ID"
              numeric='true'
              control={control}
              
            />
            <Button mode="contained"  onPress={handleSubmit(getClientData)}  style={styles.submitButton}>
              Submit
            </Button>
          </View>
        </Modal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchInput: {
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    marginLeft: 5,
    padding: 5,
    borderRadius: 5,
  },
  tableBodyContainer: {
    marginTop: '2%',
    maxHeight: '70%', // Adjust the height as needed
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fefdfd',
    borderRadius: 10,
    shadowColor: '#aaaaaa',
    shadowOffset: { width: 0, height: 2 }, // Adjust the shadow offset as needed
    shadowOpacity: 0.2, // Adjust the shadow opacity as needed
    shadowRadius: 100, // Adjust the shadow radius as needed
    elevation: 5, // Android shadow elevation
  },
  avatarContainer: {
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactActions: {
    justifyContent: 'center',
  },
  noDataText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
  },
  submitButton: {
    marginTop: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '100%', // Set the width of the modal content
  },
});

export default Client;