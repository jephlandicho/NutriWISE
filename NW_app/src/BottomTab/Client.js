import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation,useIsFocused  } from '@react-navigation/native';
import { Provider as PaperProvider, DataTable,Avatar } from 'react-native-paper';
import MyTheme from '../Components/MyTheme';

const db = SQLite.openDatabase('mydatabase.db');

function Client() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    setPage(0);
    if (isFocused) {
      refreshTableData();
    }
  }, [isFocused]);

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
        'SELECT * FROM client',
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
        `SELECT * FROM client WHERE name LIKE '%${query}%'`,
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
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <ScrollView style={styles.tableBodyContainer}>
          {displayedData.length > 0 ? (
            displayedData.map((item) => (
              <View key={item.id} style={styles.contactContainer}>
                <TouchableOpacity onPress={() => handleView(item.id)}>
                <View style={styles.avatarContainer}>
                <Avatar.Text size={50} label={item.name.charAt(0).toUpperCase()} color={MyTheme.colors.background}/>
                </View>
                </TouchableOpacity>
                <View style={styles.contactInfo}>
                <Text>ID: {item.id}</Text>
                <TouchableOpacity onPress={() => handleView(item.id)}>
                  <Text style={styles.contactName}>{item.name}</Text>
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
                  return <Text>{age} | {item.sex}</Text>;
                })()}
                  
                </View>
                <View style={styles.contactActions}>
                  <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
                    <Ionicons name="md-trash" size={20} />
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
    maxHeight: '73%', // Adjust the height as needed
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
});

export default Client;
