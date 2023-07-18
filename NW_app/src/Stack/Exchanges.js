import React, { useState, useRef,useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ScrollView,FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Card, IconButton, Provider as PaperProvider, Divider, DataTable, ThemeProvider  } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useRoute } from '@react-navigation/native';
import ExchangeComponent from '../Components/ExchangeComponent';
import { ResultContext } from '../Components/ResultContext';
import MyTheme from '../Components/MyTheme';

const db = SQLite.openDatabase('mydatabase.db');

function Exchanges() {
  const {
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
  } = useContext(ResultContext);
  const [to_Carbs, setto_carbs] = useState('');
  const [to_Pro, setto_pro] = useState('');
  const [to_Fat, setto_fat] = useState('');
  const [to_Kcal, setto_kcal] = useState('');

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([3, 4, 5]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [tableData, setTableData] = useState([]);

  const route = useRoute();
  const { id } = route.params;

  React.useEffect(() => {
    setPage(0);
    refreshTableData();
    fetchMeasurementData();
  }, []);

  const fetchMeasurementData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT TER, protein, carbs, fats FROM client_measurements WHERE id = ?',
        [id],
        (_, { rows }) => {
          const itemData = rows.item(0);
          const { TER, protein, carbs, fats } = itemData;

          // Assign the values to individual variables
          const fetchedTER = TER;
          const fetchedProtein = protein;
          const fetchedCarbs = carbs;
          const fetchedFats = fats;
            setto_carbs(fetchedCarbs)
            setto_pro(fetchedProtein)
            setto_fat(fetchedFats)
            setto_kcal(fetchedTER)
        },
        (error) => {
          console.log('Error fetching measurement data: ', error);
        }
      );
    });
  };
  const handleUpdate = (id) => {
    // Handle the update logic here using the item id
    console.log('Update item with id:', id);
    setModalVisible(false);
  };

  const handleDelete = (id) => {
    
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM exchanges WHERE id = ?',
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
    navigation.navigate('Breakfast', { id });
    setModalVisible(false);
  };

  const refreshTableData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM exchanges WHERE measurement_id = ?',
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
  
  const openMenu = (id) => {
    setSelectedItemId(id);
    setModalVisible(true);
  };

  const saveExchanges = () => {
    // const [ZvegetableEx, setZvegetableEx] = useState(); 
    // const [ZfruitEx, setZfruitEx] = useState();
    // const [ZmilkEx, setZmilkEx] = useState();
    // const [ZsugarEx, setZsugarEx] = useState();
    // const [ZriceAEx, setZriceAEx] = useState();
    // const [ZriceBEx, setZriceBEx] = useState();
    // const [ZriceCEx, setZriceCEx] = useState();
    // const [ZLFmeatEx, setZLFmeatEx] = useState();
    // const [ZMFmeatEx, setZMFmeatEx] = useState();
    // const [ZfatEx, setZfatEx] = useState();
    // const [ZCarbs, setZCarbs] = useState();
    // const [ZProtein, setZProtein] = useState();
    // const [ZFat, setZFat] = useState();
    // const [ZKcal, setZKcal] = useState();

    // const vegCarbs = vegetableEx * 3;
    // const vegProtein = vegetableEx * 1;
    // const vegKcal = vegetableEx * 16;

    // const fruitCarbs = fruitEx * 10;
    // const fruitKcal = fruitEx * 40;

    // const milkCarbs = milkEx * 12;
    // const milkProtein = milkEx * 8;
    // const milkFat = milkEx * 10;
    // const milkKcal = milkEx * 170;

    // const sugarCarbs = sugarEx * 5;
    // const sugarKcal = sugarEx * 20;
    // saved
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO exchanges (measurement_id, vegetables, fruit, milk, sugar, riceA, riceB, riceC, lfMeat, mfMeat, fat, TER, carbohydrates, protein, fats) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          id,
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
          refreshTableData()
          Alert.alert('New Exchanges added')
          console.log('Data inserted into Exchanges successfully.');
          setAnotherModalVisible(false);
        },
        (error) => {
          console.log('Error inserting data into distribution_exchange: ', error);
        }
        )
    })
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

  const renderCard = ({ item }) => {
    return (
      <ThemeProvider theme={MyTheme}>
      <Card style={styles.card}>
        <Card.Title title={`ID: ${item.id}`} />
        <Card.Content>
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
                <Text style={styles.header}>LF Meat</Text>
                <Text>{item.lfMeat}</Text>
                </View>
                <View style={styles.cell}>
                <Text style={styles.header}>MF Meat</Text>
                <Text>{item.mfMeat}</Text>
                </View>
                <View style={styles.cell}>
                <Text style={styles.header}>Fat</Text>
                <Text>{item.fat}</Text>
                </View>
                <View style={styles.cell}>
                <Text style={styles.header}>Sync</Text>
                <Text>{item.syncData}</Text>
                </View>
                
            </View>
            <View style={{ flexDirection: 'row' }}>
            <View style={styles.cell}>
                <Text style={styles.header}>Carbohydrates</Text>
                <Text>{item.carbohydrates}</Text>
                </View>
                <View style={styles.cell}>
                <Text style={styles.header}>Protein</Text>
                <Text>{item.protein}</Text>
                </View>
                <View style={styles.cell}>
                <Text style={styles.header}>Fats</Text>
                <Text>{item.fats}</Text>
                </View>
                <View style={styles.cell}>
                <Text style={styles.header}>TER</Text>
                <Text>{item.TER}</Text>
                </View>
            </View>
            </Card.Content>
        <Card.Actions>
          <IconButton icon="pencil" onPress={() => handleUpdate(item.id)} iconColor='black' style={{backgroundColor: 'transparent', borderColor: 'transparent'}}/>
          <IconButton icon="delete" onPress={() => handleDelete(item.id)} iconColor='black'  style={{backgroundColor: 'transparent' }}/>
          <IconButton icon="eye" onPress={() => handleView(item.id)} iconColor='black' style={{backgroundColor: 'transparent'}}/>
        </Card.Actions>
      </Card>
      </ThemeProvider>
    );
  };

  return (
    <PaperProvider theme={MyTheme}>
        <View style={styles.Maincontainer}>
      <View style={styles.container}>
        <View>
        <View style={styles.meabuttonContainer}>
        <TouchableOpacity style={styles.meabutton} onPress={openAnotherModal}>
          <Text style={styles.buttonText}>
            <Ionicons name="add-circle-outline" size={20} color="black" /> Add
          </Text>
        </TouchableOpacity>
      </View>
        </View>
        <FlatList
        data={displayedData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cardContainer}
      />
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(tableData.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${Math.min((page + 1) * itemsPerPage, tableData.length)} of ${
            tableData.length
          }`}
        //   numberOfItemsPerPageList={numberOfItemsPerPageList}
        //   numberOfItemsPerPage={itemsPerPage}
        //   onItemsPerPageChange={onItemsPerPageChange}
        //   showFastPaginationControls
        //   selectPageDropdownLabel={'Rows per page'}
        />
        <Modal isVisible={anotherModalVisible} onBackdropPress={closeAnotherModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Another Modal</Text>
            <ScrollView>
                
            <ExchangeComponent 
            tCarbs={to_Carbs}
            tProtein={to_Pro}
            tFats={to_Fat}
            tKcal={to_Kcal}
            />
            <View style={styles.savebuttonContainer}>
        <TouchableOpacity style={styles.savebutton} onPress={saveExchanges}>
          <Text style={styles.savebuttonText}>
            <Ionicons name="save-outline" size={25} color="black" /> Save
          </Text>
        </TouchableOpacity>
        </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
    Maincontainer:{
        backgroundColor: '#ffffff',
        flex: 1,
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 100,
  },
  cardContainer: {
    paddingBottom: 10,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#ffffff'
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 5,
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
  cell: {
    flex: 1,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
  },
  iconButton: {
    // Customize the icon color
    color: 'blue',
    
    // Customize the icon size
    fontSize: 24,
  }
});

export default Exchanges;
