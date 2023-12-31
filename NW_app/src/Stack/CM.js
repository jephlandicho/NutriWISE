import React, { useState, useRef,useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Provider as PaperProvider, DataTable, Button, Divider, Card, Paragraph } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Measurements from '../Components/Measurements';
import { ResultContext } from '../Components/ResultContext';
import MyTheme from '../Components/MyTheme';
const db = SQLite.openDatabase('mydatabase.db');


function ClientMeasurements() {
    const {
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
    
      const [userData, setUserData] = useState(null);
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
    
      const navigation = useNavigation();
      const [modalVisible, setModalVisible] = useState(false);
      const [selectedItemId, setSelectedItemId] = useState(null);
      const [selectedExchangeID, setselectedExchangeID] = useState(null);
      const [page, setPage] = useState(0);
      const [numberOfItemsPerPageList] = useState([10, 20, 30]);
      const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
      const [tableData, setTableData] = useState([]);
    
      const route = useRoute();
      const { id } = route.params;
    
      React.useEffect(() => {
        setPage(0);
        refreshTableData();
        getUserData();
      }, []);
    
      const handleUpdate = (id) => {
        // Handle the update logic here using the item id
        console.log('Update item with id:', id);
        setModalVisible(false);
      };
    
      const handleDelete = (id) => {
        
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM client_measurements WHERE id = ?',
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
        setModalVisible(false);
      };
    
      const handleView = (id) => {
        navigation.navigate('Exchanges', { id });
        setModalVisible(false);
      };
    
      const handleViewMeal = (e_ID) => {
        navigation.navigate('MealPlanName', { e_ID });
        setModalVisible(false);
      }

      const saveMeasurement = () => {
        // saved
        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO client_measurements (client_id, student_id, waistCircum, hipCircum, weight, height, physicalActLevel, WHR, BMI, remarks, DBW, TER, protein, carbs, fats) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
            [
              id,
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
            () => {
              refreshTableData()
              Alert.alert('New client measurements added')
              console.log('Data inserted into client_measurements successfully.');
              setAnotherModalVisible(false);
            },
            (error) => {
              console.log('Error inserting data into distribution_exchange: ', error);
            }
            )
        })
      };
    
      const refreshTableData = () => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT cm.*, e.id AS e_ID FROM client_measurements as cm INNER JOIN exchanges AS e ON cm.id = e.measurement_id WHERE client_id = ?',
            [id],
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
      
    
      const generateFields = async (itemId) => {
        
        
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM client_measurements WHERE id = ?',
            [itemId],
            (_, { rows }) => {
              const itemData = rows.item(0);
              const { remarks, physicalActLevel, BMI, waistCircum, hipCircum, weight, height, WHR, DBW } = itemData;
        
              const generatedFields = `Remarks: ${remarks}\nPAL: ${physicalActLevel}\nBMI: ${BMI}\nWaist: ${waistCircum}\nHip: ${hipCircum}\nWeight: ${weight}\nHeight: ${height}\nWHR: ${WHR}\nDBW: ${DBW}`;
        
              Alert.alert('Other Information:', generatedFields);
            },
            (error) => {
              console.log('Error fetching item data: ', error);
            }
          );
        });
      };

  const openMenu = (id, e_ID) => {
    setSelectedItemId(id);
    setselectedExchangeID(e_ID);
    setModalVisible(true);
  };
  const closeMenu = () => {
    setModalVisible(false);
  };

  const from = page * itemsPerPage;
  const to = from + itemsPerPage;
  const displayedData = tableData.slice(from, to);

  // Second Modal State and Functions
  const [anotherModalVisible, setAnotherModalVisible] = useState(false);

  const openAnotherModal = () => {
    setAnotherModalVisible(true);
  };

  const closeAnotherModal = () => {
    setAnotherModalVisible(false);
  };
  return (
    <PaperProvider theme={MyTheme}>
      <View style={styles.container}>
        {/* ... (other code remains the same) */}
        <ScrollView style={styles.cardContainer}>
          {displayedData.length > 0 ? (
            displayedData.map((item) => (
              <Card key={item.id} style={styles.card}>
                <Card.Content>
                  <Paragraph style={styles.cardTitle}>{item.assessment_date}</Paragraph>
                  <Text>TER: {item.TER}</Text>
                  <Text>Carbs: {item.carbs}</Text>
                  <Text>Protein: {item.protein}</Text>
                  <Text>Fats: {item.fats}</Text>
                </Card.Content>
                <Card.Actions style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => openMenu(item.id, item.e_ID)}
                  >
                    <Ionicons name="md-reorder-three" size={20} />
                  </TouchableOpacity>
                </Card.Actions>
              </Card>
            ))
          ) : (
            <Card>
              <Card.Content>
                <Paragraph style={styles.noDataText}>No Measurement found</Paragraph>
              </Card.Content>
            </Card>
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
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
        <Modal isVisible={modalVisible} onBackdropPress={closeMenu}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleUpdate(selectedItemId)}>
              <Ionicons name="md-create" size={20} color="black" style={styles.modalIcon} />
              <Text style={styles.modalText}>Update</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.modalButton} onPress={() => handleDelete(selectedItemId)}>
              <Ionicons name="md-trash" size={20} color="black" style={styles.modalIcon} />
              <Text style={styles.modalText}>Delete</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.modalButton} onPress={() => handleView(selectedItemId)}>
              <Ionicons name="md-eye" size={20} color="black" style={styles.modalIcon} />
              <Text style={styles.modalText}>View</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.modalButton} onPress={() => handleViewMeal(selectedExchangeID)}>
              <Ionicons name="md-restaurant" size={20} color="black" style={styles.modalIcon} />
              <Text style={styles.modalText}>View MealPlan</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.modalButton} onPress={() => generateFields(selectedItemId)}>
              <Ionicons name="information" size={20} color="black" style={styles.modalIcon} />
              <Text style={styles.modalText}>Other Information</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={anotherModalVisible} onBackdropPress={closeAnotherModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Another Modal</Text>
            <Measurements/>
            <View style={styles.savebuttonContainer}>
        <TouchableOpacity style={styles.savebutton} onPress={saveMeasurement}>
          <Text style={styles.savebuttonText}>
            <Ionicons name="save-outline" size={25} color="black" /> Save
          </Text>
        </TouchableOpacity>
        </View>
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
      noDataCell: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#888',
      },
      tableBodyContainer: {
        maxHeight: 200, // Adjust the height as needed
      },
      modalContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 5,
      },
      modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
      },
      modalIcon: {
        marginRight: 10,
      },
      modalText: {
        fontSize: 16,
        color: 'black',
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      actionCell: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonContainer: {
        flexDirection: 'row',
      },
      button: {
        marginLeft: 5,
        padding: 5,
        borderRadius: 5,
      },
      meabutton: {
        width: '25%',
        marginVertical: 5,
        alignItems: 'center',
        flexDirection: 'row', // Add flexDirection: 'row' to align items horizontally
        justifyContent: 'center', // Add justifyContent: 'center' to align items vertically
        borderRadius: 5,
      },
      meabuttonContainer: {
        alignItems: 'flex-end',
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#aaaaaa',
        marginLeft: 5, // Add marginLeft to create space between icon and text
      },
      dateColumn: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      savebutton: {
        width: '25%',
        marginVertical: 5,
        alignItems: 'center',
        flexDirection: 'row', // Add flexDirection: 'row' to align items horizontally
        justifyContent: 'center', // Add justifyContent: 'center' to align items vertically
        borderRadius: 5,
      },
      savebuttonContainer: {
        alignItems: 'center',
      },
      savebuttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginLeft: 5, // Add marginLeft to create space between icon and text
      },
    cardContainer: {
        maxHeight: 200, // Adjust the height as needed
    },
    card: {
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardActions: {
        justifyContent: 'flex-end',
    },
    noDataText: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#888',
    },
});

export default ClientMeasurements;
