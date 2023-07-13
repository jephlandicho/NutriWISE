import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Provider as PaperProvider, DataTable, Button, Divider } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ClientMeasurements() {
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
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleView = (id) => {
    // navigation.navigate('ClientMeasurements', { id });
    setModalVisible(false);
  };

  const refreshTableData = () => {
    const db = SQLite.openDatabase('mydatabase.db');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM client_measurements WHERE client_id = ?',
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
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    const db = SQLite.openDatabase('mydatabase.db');
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM client_measurements WHERE assessment_date LIKE '%${query}%'`,
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

  const generateFields = async (itemId) => {
    const db = SQLite.openDatabase('mydatabase.db');
    
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
  
  const openMenu = (id) => {
    setSelectedItemId(id);
    setModalVisible(true);
  };

  const closeMenu = () => {
    setModalVisible(false);
  };

  const from = page * itemsPerPage;
  const to = from + itemsPerPage;
  const displayedData = tableData.slice(from, to);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View>
          <DataTable.Header>
            <DataTable.Title style={styles.dateColumn}>Date</DataTable.Title>
            <DataTable.Title style={styles.actionCell}>TER</DataTable.Title>
            <DataTable.Title style={styles.actionCell}>Carbs</DataTable.Title>
            <DataTable.Title style={styles.actionCell}>Protein</DataTable.Title>
            <DataTable.Title style={styles.actionCell}>Fats</DataTable.Title>
            <DataTable.Title style={styles.actionCell}>Actions</DataTable.Title>
          </DataTable.Header>
        </View>
        <ScrollView style={styles.tableBodyContainer}>
          <DataTable>
            {displayedData.length > 0 ? (
              displayedData.map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell style={styles.dateColumn}>{item.assessment_date}</DataTable.Cell>
                  <DataTable.Cell style={styles.actionCell}>{item.TER}</DataTable.Cell>
                  <DataTable.Cell style={styles.actionCell}>{item.carbs}</DataTable.Cell>
                  <DataTable.Cell style={styles.actionCell}>{item.protein}</DataTable.Cell>
                  <DataTable.Cell style={styles.actionCell}>{item.fats}</DataTable.Cell>
                  <DataTable.Cell style={styles.actionCell}>
                  <View style={styles.buttonContainer}>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => openMenu(item.id)}
                    >
                      <Ionicons name="md-reorder-three" size={20} />
                    </TouchableOpacity>
                  </View>
                </DataTable.Cell>
                </DataTable.Row>
              ))
            ) : (
              <DataTable.Row>
                <DataTable.Cell style={styles.noDataCell} colSpan={5}>
                  No Client found
                </DataTable.Cell>
              </DataTable.Row>
            )}
          </DataTable>
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
            <TouchableOpacity style={styles.modalButton} onPress={() => handleView(selectedItemId)}>
              <Ionicons name="md-eye" size={20} color="black" style={styles.modalIcon} />
              <Text style={styles.modalText}>View</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.modalButton} onPress={() => generateFields(selectedItemId)}>
              <Ionicons name="information" size={20} color="black" style={styles.modalIcon} />
              <Text style={styles.modalText}>Other Information</Text>
            </TouchableOpacity>
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
  noDataCell: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
  },
  tableBodyContainer: {
    maxHeight: 300, // Adjust the height as needed
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
  dateColumn: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ClientMeasurements;
