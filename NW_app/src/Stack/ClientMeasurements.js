import React, { useState, useRef,useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Provider as PaperProvider, DataTable, Divider, Card, Paragraph } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Measurements from '../Components/Measurements';
import { ResultContext } from '../Components/ResultContext';
import MyTheme from '../Components/MyTheme';
const db = SQLite.openDatabase('mydatabase.db');


function ClientMeasurements() {
    const {waistC,hipC,varweight,varheight,pal,whr,bmi,dbw,carbs,protein,fats,TER,normal,
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
      const [numberOfItemsPerPageList] = useState([2, 4, 6]);
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
              id,userData.id,waistC,hipC,varweight,varheight,palText,whr,bmi,normal,dbw,TER,protein,carbs,fats,
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
            `SELECT cm.*,e.*,e.TER AS exchange_TER,
            e.carbohydrates AS exchange_carbohydrates,
            e.protein AS exchange_protein,
            e.fats AS exchange_fats, e.id AS e_ID FROM client_measurements as cm INNER JOIN exchanges AS e ON cm.id = e.measurement_id WHERE client_id = ?`,
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
      

  const openMenu = (id, e_ID) => {
    setSelectedItemId(id);
    setselectedExchangeID(e_ID);
    setModalVisible(true);
  };
  const closeMenu = () => {
    setModalVisible(false);
  };

  const [showExchanges, setShowExchanges] = useState(false);


  const viewExchanges = () => {
    setShowExchanges(!showExchanges); 
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
        <ScrollView style={styles.cardContainer}>
          {displayedData.length > 0 ? (
            displayedData.map((item) => (
              <Card key={item.id} style={styles.card}>
                <Card.Content>
                  <Paragraph style={styles.cardTitle}>Date: {item.assessment_date}</Paragraph>
                  <Paragraph style={styles.cardTitle2}>{item.remarks}</Paragraph>
                  <>
                  <View style={{ flexDirection: 'row' }}>
                      <View style={styles.cell}>
                      <Text style={styles.header}>BMI</Text>
                      <Text>{item.BMI} kg/m²</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>DBW</Text>
                      <Text>{item.DBW} kg</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Height</Text>
                      <Text>{item.height} m</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Weight</Text>
                      <Text>{item.weight} kg</Text>
                      </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Waist Circumference</Text>
                      <Text>{item.waistCircum} cm</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Hip Circumference</Text>
                      <Text>{item.hipCircum} cm</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Waist Hip Ratio</Text>
                      <Text>{item.WHR} cm</Text>
                      </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                  <View style={styles.cell}>
                      <Text style={styles.header}>Carbohydrates</Text>
                      <Text>{item.carbs} g</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Protein</Text>
                      <Text>{item.protein} g</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Fats</Text>
                      <Text>{item.fats} g</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>KCAL</Text>
                      <Text>{item.TER} kcal</Text>
                      </View>
                  </View>
                  </>
                  <TouchableOpacity onPress={() => viewExchanges(item.id)}>
                  <Text style={styles.header2}>Exchanges <Ionicons
                    name={showExchanges ? 'md-arrow-up' : 'md-arrow-down'}
                    size={18}
                  />
                  </Text>
                  </TouchableOpacity>
                  
                  {showExchanges && (
                    <View>
                  <View style={{ flexDirection: 'row' }}>
                  <View style={styles.cell}>
                      <Text style={styles.header}>Vegetable</Text>
                      <Text>{item.vegetables}</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Fruit</Text>
                      <Text>{item.fruit}</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Milk</Text>
                      <Text>{item.milk}</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Sugar</Text>
                      <Text>{item.sugar}</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Fat</Text>
                      <Text>{item.fat}</Text>
                      </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                  <View style={styles.cell}>
                      <Text style={styles.header}>Rice A</Text>
                      <Text>{item.riceA}</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Rice B</Text>
                      <Text>{item.riceB}</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Rice C</Text>
                      <Text>{item.riceC}</Text>
                      </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                  <View style={styles.cell}>
                      <Text style={styles.header}>Low Fat Meat</Text>
                      <Text>{item.lfMeat}</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Medium Fat Meat</Text>
                      <Text>{item.mfMeat}</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>High Fat Meat</Text>
                      <Text>{item.hfMeat}</Text>
                      </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                  <View style={styles.cell}>
                      <Text style={styles.header}>Carbohydrates</Text>
                      <Text>{item.exchange_carbohydrates} g</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Protein</Text>
                      <Text>{item.exchange_protein} g</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>Fats</Text>
                      <Text>{item.exchange_fats} g</Text>
                      </View>
                      <View style={styles.cell}>
                      <Text style={styles.header}>KCAL</Text>
                      <Text>{item.exchange_TER} kcal</Text>
                      </View>
                  </View>
                    </View>
                  )}

                </Card.Content>
                <Card.Actions style={styles.cardActions}>
                  
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleUpdate(item.id)}
                  >
                    <Ionicons name="md-pencil" size={25} />
                    
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Ionicons name="md-trash" size={25} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleViewMeal(item.e_ID)}
                  >
                    <Ionicons name="md-restaurant" size={25} />
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
    paddingHorizontal: 5,
    paddingVertical: 5,
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
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#aaaaaa',
    marginLeft: 5, // Add marginLeft to create space between icon and text
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
      maxHeight: '80%', // Adjust the height as needed
  },
  card: {
      marginBottom: 10,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      elevation: 4,
      shadowColor: '#aaaaaa',
  },
  cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
  },
  cardTitle2: {
    fontSize: 17,
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
  cell: {
    flex: 1,
    paddingHorizontal: 1,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
  },
  header2: {
    fontWeight: 'bold',
    marginVertical: 5,
    fontSize: 18,
  },
});

export default ClientMeasurements;
