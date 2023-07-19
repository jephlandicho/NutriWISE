import React from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import SyncButton from '../Components/SyncButton';

// Open or create a new database
const db = SQLite.openDatabase('mydatabase.db');

const handleDeleteTables = () => {
  db.transaction((tx) => {
    // Replace 'table1', 'table2', 'table3', ... with the actual table names in your database.
    // Add more table names if you have additional tables to delete.
    
    const tablesToDelete = ['meal','meal_plan'];

    tablesToDelete.forEach((table) => {
      const query = `DROP TABLE IF EXISTS ${table};`;

      tx.executeSql(query, [], (_, resultSet) => {
        // Table successfully deleted
        console.log(`Table ${table} deleted.`);
      }, (error) => {
        // An error occurred while deleting the table
        console.error(`Error deleting ${table}:`, error);
      });
    });
  }, (error) => {
    // Transaction error
    console.error('Transaction error:', error);
  }, () => {
    // Transaction successful
    Alert.alert('Tables Deleted', 'All tables have been deleted.');
  });
};
const handleUpdateTables = () => {
  db.transaction((tx) => {
    // Add your ALTER TABLE statement here to update the syncData column
    // const updateQuery = `UPDATE client SET syncData = 0;`;
    const tablesToUpdate = ['client', 'client_measurements', 'exchanges','distribution_exchange'];
    tablesToUpdate.forEach((table) => {
      const query = `UPDATE ${table} SET syncData = 0;;`;

      tx.executeSql(query, [], (_, resultSet) => {
        // Table successfully deleted
        console.log(`Table ${table} updated.`);
      }, (error) => {
        // An error occurred while deleting the table
        console.error(`Error deleting ${table}:`, error);
      });
    });
  }, (error) => {
    // Transaction error
    console.error('Transaction error:', error);
  }, () => {
    // Transaction successful
    Alert.alert('Table Updated', 'Client table has been updated. syncData set to 0.');
  });
};



const Classes = () => {
  return (
    <View style={styles.container}>
      <Text>Classes</Text>
      {/* <TouchableOpacity onPress={handleDeleteTables}>
        <Text>Delete All Tables</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={handleUpdateTables}>
        <Text>Update Tables</Text>
      </TouchableOpacity> */}
      {/* <SyncButton/> */}
    </View>
  )
}

export default Classes
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });