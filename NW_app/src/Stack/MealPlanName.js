import React, { useState, useRef, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Provider as PaperProvider, DataTable, Button, Divider, Portal, Provider, TextInput as PaperTextInput } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import MyTheme from '../Components/MyTheme';
const db = SQLite.openDatabase('mydatabase.db');
import { ResultContext } from '../Components/ResultContext';



function MealPlanName() {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [anotherModalVisible, setAnotherModalVisible] = useState(false);
  const [mealTitle, setMealTitle] = useState('');
  const [selectedExchangesId, setSelectedExchangesId] = useState(null);

  const {C_meal_titleID,setC_meal_titleID} = useContext(ResultContext);

  const route = useRoute();
  const { id,e_ID } = route.params;
  const openAnotherModal = () => {
    setAnotherModalVisible(true);
  };

  const closeAnotherModal = () => {
    setAnotherModalVisible(false);
  };

  let generatedCodes = [];

  function generateUniqueSixDigitCode() {
    let code = '';

    do {
      code = Math.floor(100000 + Math.random() * 900000).toString();
    } while (generatedCodes.includes(code));

    generatedCodes.push(code);

    return code;
  }
  React.useEffect(() => {
    setPage(0);
    refreshTableData();

    const mt_ID = generateUniqueSixDigitCode();
    const finalmt_ID =  '03' + mt_ID 
    setC_meal_titleID(finalmt_ID)
  }, []);



  const handleUpdate = (id) => {
    // Handle the update logic here using the item id
    console.log('Update item with id:', id);
    setModalVisible(false);
  };

  const handleDelete = (id) => {
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     'DELETE FROM meal_title WHERE id = ?',
    //     [id],
    //     (_, { rowsAffected }) => {
    //       if (rowsAffected > 0) {
    //         Alert.alert('Success', 'Item deleted successfully');
    //         console.log('Item deleted successfully');
    //         refreshTableData(); // Call a function to refresh the table data
    //       }
    //     },
    //     (error) => {
    //       console.log('Error deleting item:', error);
    //     }
    //   );
    // });
    // setModalVisible(false);
  };

  const handleView = (id) => {
    navigation.navigate('Breakfast', { id,e_ID });
    setModalVisible(false);
  };

  const refreshTableData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT id, exchanges_id, meal_title FROM meal_title WHERE exchanges_id = ?
        `,
        [e_ID],
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
        `SELECT id, meal_title FROM meal_title
        WHERE meal_title LIKE '%${query}%'`,
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

  const saveMealTitle = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO meal_title (id, exchanges_id, meal_title,syncData) VALUES (?,?,?,?)',
        [C_meal_titleID, e_ID, mealTitle,0],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            refreshTableData();
            Alert.alert('Success', 'Meal title saved successfully');
            console.log('Meal title saved successfully');
            
            setAnotherModalVisible(false);
            setMealTitle('');
          }
        },
        (error) => {
          console.log('Error saving meal title:', error);
        }
      );
    });
  };

  const openMenu = (id,e_id) => {
    setSelectedItemId(id);
    setSelectedExchangesId(e_id)
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
          <View style={styles.meabuttonContainer}>
            <TouchableOpacity style={styles.meabutton} onPress={openAnotherModal}>
              <Text style={styles.buttonText}>
                <Ionicons name="add-circle-outline" size={20} color="black" /> Add
              </Text>
            </TouchableOpacity>
          </View>
          <DataTable.Header>
          <DataTable.Title style={styles.cell}>ID</DataTable.Title>
            <DataTable.Title style={styles.cell}>Meal Title</DataTable.Title>
            <DataTable.Title style={styles.cell}>Actions</DataTable.Title>
          </DataTable.Header>
        </View>
        <ScrollView style={styles.tableBodyContainer}>
          <DataTable>
            {displayedData.length > 0 ? (
              displayedData.map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell style={styles.cell}>{item.id}</DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>{item.meal_title}</DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => openMenu(item.id,item.exchanges_id)}
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
            <TouchableOpacity style={styles.modalButton} onPress={() => handleView(selectedItemId,selectedExchangesId)}>
              <Ionicons name="md-eye" size={20} color="black" style={styles.modalIcon} />
              <Text style={styles.modalText}>View</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={anotherModalVisible} onBackdropPress={closeAnotherModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create a Meal Title</Text>
            <View style={styles.inputContainer}>
              <PaperTextInput
                label="Meal Title"
                value={mealTitle}
                onChangeText={(text) => setMealTitle(text)}
                style={styles.input}
              />
              <Button mode="contained" onPress={saveMealTitle} style={styles.saveButton}>
                Save
              </Button>
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

export default MealPlanName;
