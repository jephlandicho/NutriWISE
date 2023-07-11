import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Constants from 'expo-constants';


function TableDisplay() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {

    const db = SQLite.openDatabase('mydatabase.db');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM clients',
        [],
        (_, { rows }) => {
          const data = rows._array;
          setTableData(data);
        },
        (error) => {
          console.log('Error fetching table data: ', error);
        }
      );
    });
  }, []);

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.age}</Text>
      <Text style={styles.cell}>{item.sex}</Text>
      <Text style={styles.cell}>{item.waistC}</Text>
      <Text style={styles.cell}>{item.hipC}</Text>
      <Text style={styles.cell}>{item.varweight}</Text>
      <Text style={styles.cell}>{item.varheight}</Text>
      <Text style={styles.cell}>{item.pal}</Text>
      <Text style={styles.cell}>{item.whr}</Text>
      <Text style={styles.cell}>{item.bmi}</Text>
      <Text style={styles.cell}>{item.dbw}</Text>
      <Text style={styles.cell}>{item.carbs}</Text>
      <Text style={styles.cell}>{item.protein}</Text>
      <Text style={styles.cell}>{item.fats}</Text>
      <Text style={styles.cell}>{item.TER}</Text>
      <Text style={styles.cell}>{item.normal}</Text>
      {/* name, age, sex, waistC, hipC, varweight, varheight, pal, whr, bmi, dbw, carbs, protein, fats, TER, normal */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Table Data:</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Age</Text>
        <Text style={styles.headerCell}>Sex</Text>
        <Text style={styles.headerCell}>waistC</Text>
        <Text style={styles.headerCell}>hipC</Text>
        <Text style={styles.headerCell}>varweight</Text>
        <Text style={styles.headerCell}>varheight</Text>
        <Text style={styles.headerCell}>pal</Text>
        <Text style={styles.headerCell}>whr</Text>
        <Text style={styles.headerCell}>bmi</Text>
        <Text style={styles.headerCell}>dbw</Text>
        <Text style={styles.headerCell}>carbs</Text>
        <Text style={styles.headerCell}>protein</Text>
        <Text style={styles.headerCell}>fats</Text>
        <Text style={styles.headerCell}>TER</Text>
        <Text style={styles.headerCell}>normal</Text>

        {/* Add headers for other fields as needed */}
      </View>
      <FlatList
        data={tableData}
        renderItem={renderRow}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cell: {
    flex: 1,
  },
});

export default TableDisplay;
