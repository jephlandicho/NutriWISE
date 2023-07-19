import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Provider as PaperProvider, DataTable, Button, Divider, Portal, Provider, TextInput as PaperTextInput } from 'react-native-paper';
import MyTheme from '../Components/MyTheme';

const db = SQLite.openDatabase('mydatabase.db');

function MealPlan() {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [e_ID, setE_ID] = useState(null);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [anotherModalVisible, setAnotherModalVisible] = useState(false);
  const [mealTitle, setMealTitle] = useState('');
  const [selectedExchangesId, setSelectedExchangesId] = useState(null);
  const [exchangesData, setExchangesData] = useState([]);

  const openAnotherModal = () => {
    setAnotherModalVisible(true);
  };

  const closeAnotherModal = () => {
    setAnotherModalVisible(false);
  };

  React.useEffect(() => {
    setPage(0);
    if (isFocused) {
      refreshTableData();
      createTables();
    }
  }, [isFocused]);

  const createTables = () => {
    db.transaction((tx) => {

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS meal (
          id INTEGER PRIMARY KEY,
          meal_title_id INTEGER,
          meal_name TEXT,
          meal_time TEXT,
          syncData INTEGER,
          FOREIGN KEY (meal_title_id) REFERENCES meal_title (id)
        )`,
        [],
        () => {
          console.log('meal table created successfully.');
        },
        (error) => {
          console.log('Error creating meal table: ', error);
        }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS meal_plan (
          id INTEGER PRIMARY KEY,
          meal_name_id INTEGER,
          exchange_distribution FLOAT,
          food_id INTEGER,
          household_measurement TEXT,
          syncData INTEGER,
          FOREIGN KEY (meal_name_id) REFERENCES meal (id)
        )`,
        [],
        () => {
          console.log('meal_plan table created successfully.');
        },
        (error) => {
          console.log('Error creating meal_plan table: ', error);
        }
      );
    });
  };

  const handleDelete = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM meal_title WHERE id = ?',
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
    navigation.navigate('MealPlanName', { id,e_ID });
    setModalVisible(false);
  };

  const refreshTableData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT e.id AS e_id, c.name AS client_name 
        FROM exchanges e
        JOIN client_measurements cm ON e.measurement_id = cm.id
        JOIN client c ON cm.client_id = c.id
        GROUP BY e.id;
        `,
        [],
        (_, { rows }) => {
          const data = rows._array;
          setTableData(data);
        },
        (error) => {
          console.log('Error performing join:', error);
        }
      );
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT e.id AS e_id, c.name AS client_name 
        FROM exchanges e
        JOIN client_measurements cm ON e.measurement_id = cm.id
        JOIN client c ON cm.client_id = c.id
        WHERE client_name LIKE '%${query}%'
        GROUP BY e.id;`,
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

  const openMenu = (id,e_id) => {
    setSelectedItemId(id);
    setE_ID(e_id)
    setModalVisible(true);
  };

  const closeMenu = () => {
    setModalVisible(false);
  };



  const from = page * itemsPerPage;
  const to = from + itemsPerPage;
  const displayedData = tableData.slice(from, to);


  return (
    <PaperProvider theme={MyTheme}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View>
          <DataTable.Header>
            <DataTable.Title style={styles.cell}>ID</DataTable.Title>
            <DataTable.Title style={styles.cell}>Client Name</DataTable.Title>
            <DataTable.Title style={styles.cell}>Actions</DataTable.Title>
          </DataTable.Header>
        </View>
        <ScrollView style={styles.tableBodyContainer}>
          <DataTable>
            {displayedData.length > 0 ? (
              displayedData.map((item) => (
                <DataTable.Row key={item.e_id}>
                  <DataTable.Cell style={styles.cell}>{item.e_id}</DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>{item.client_name}</DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => openMenu(item.id,item.e_id)}
                    >
                      <Ionicons name="md-reorder-three" size={20} />
                    </TouchableOpacity>
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
            <TouchableOpacity style={styles.modalButton} onPress={() => handleDelete(selectedItemId)}>
              <Ionicons name="md-trash" size={20} color="black" style={styles.modalIcon} />
              <Text style={styles.modalText}>Delete</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.modalButton} onPress={() => handleView(selectedItemId,e_ID)}>
              <Ionicons name="md-eye" size={20} color="black" style={styles.modalIcon} />
              <Text style={styles.modalText}>View</Text>
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  meabutton: {
    width: '25%',
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  meabuttonContainer: {
    alignItems: 'flex-end',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#aaaaaa',
    marginLeft: 5,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'transparent', // Set the background color to transparent
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  picker: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  saveButton: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#78B878',
    borderWidth: 1,
    alignItems: 'center',
  },
});

export default MealPlan;
