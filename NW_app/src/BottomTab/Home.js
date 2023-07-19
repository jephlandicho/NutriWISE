import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mydatabase.db');

const Home = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // fetchDataFromDatabase();
  }, []);

  const fetchDataFromDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT id, food_group, breakfast FROM distribution_exchange WHERE exchange_id = '2202914

        '`,
        [],
        (_, { rows }) => {
          const data = rows._array;
          setTableData(data);
          console.log(data);
        },
        (error) => {
          console.log('Error performing SELECT query:', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      {/* {tableData.map((row) => (
        <Text key={row.id}>{JSON.stringify(row)}</Text>
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
